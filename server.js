import express from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const translationKey = process.env.GEMNI_TRANSLATION_API || process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('Warning: GEMINI_API_KEY not set. /api/trending-tools will return fallback data.');
}
if (!translationKey) {
  console.warn('Warning: GEMNI_TRANSLATION_API not set. /api/translate will echo source text.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
let geminiBlocked = false;

let cachedTools = [];
let lastFetched = null;

const withTimeout = (promise, ms) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Gemini request timed out')), ms);
    promise
      .then((value) => resolve(value))
      .catch((error) => reject(error))
      .finally(() => clearTimeout(timer));
  });

const FALLBACK_TOOLS = [
  {
    name: 'OpenAI o1',
    category: 'AI Models',
    description: 'Reasoning-first frontier model for complex tasks',
    website: 'https://openai.com',
    tags: ['ai', 'models', 'reasoning'],
  },
  {
    name: 'Claude 3.5 Sonnet',
    category: 'AI Models',
    description: 'Anthropic’s balanced flag model for coding and analysis',
    website: 'https://claude.ai',
    tags: ['ai', 'chat', 'analysis'],
    logoUrl: 'https://assets.releaseupdates.org/logos/anthropic.png',
  },
  {
    name: 'Cursor',
    category: 'Dev Tools',
    description: 'AI pair-programmer IDE for codebases',
    website: 'https://cursor.sh',
    tags: ['devtools', 'ai', 'coding'],
  },
  {
    name: 'Windsurf',
    category: 'Dev Tools',
    description: 'AI coding workspace with agentic plans',
    website: 'https://windsurf.ai',
    tags: ['devtools', 'agents'],
    logoUrl: 'https://assets.releaseupdates.org/logos/windsurf.png',
  },
  {
    name: 'Replit Agent',
    category: 'Dev Tools',
    description: 'Autonomous coding agent on Replit infra',
    website: 'https://replit.com/agent',
    tags: ['automation', 'coding'],
  },
];

const parseJsonResponse = (text) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini JSON parse failed. Raw text:', text);
    return null;
  }
};

const fetchTrendingFromGemini = async (category = 'IT / Dev / AI tools') => {
  if (!genAI || geminiBlocked) {
    return { tools: FALLBACK_TOOLS, source: 'fallback' };
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const prompt = `
Return ONLY valid JSON.

Give me 20 trending ${category}.
Each item should be:
{
  "name": "string",
  "category": "string",
  "description": "short one line",
  "website": "https://...",
  "tags": ["tag1","tag2"],
  "users": number, // total or monthly active users, numeric
  "searches_today": number // estimated searches or mentions today, numeric
}
Respond with: [ { ... }, { ... }, ... ]
  `;

  try {
    const result = await withTimeout(model.generateContent(prompt), 4000);
    const text = result.response.text().trim();
    const tools = parseJsonResponse(text);
    if (!tools || !Array.isArray(tools)) {
      throw new Error('Gemini returned invalid JSON payload');
    }
    geminiBlocked = false;
    return { tools, source: 'gemini' };
  } catch (error) {
    const normalize = (value) => {
      if (!value) return '';
      if (typeof value === 'string') return value.toLowerCase();
      try {
        return JSON.stringify(value).toLowerCase();
      } catch {
        return String(value).toLowerCase();
      }
    };

    const message = normalize(error?.message);
    const details = normalize(error?.errorDetails || error?.statusText);
    const isForbidden = error?.status === 403 || message.includes('leaked');
    const isApiKeyInvalid =
      message.includes('api key') || message.includes('expired') || details.includes('api key');
    if (isForbidden || isApiKeyInvalid) {
      geminiBlocked = true;
      console.warn('Gemini API disabled after key error (forbidden/expired/leak). Using fallback data.');
    } else {
      console.error('Gemini trending fetch failed:', error);
    }
    return { tools: FALLBACK_TOOLS, source: 'fallback' };
  }
};

app.post('/api/trending-tools', async (req, res) => {
  try {
    const { category = 'IT / Dev / AI tools' } = req.body || {};
    console.log(`[api] POST /api/trending-tools category="${category}"`);
    const { tools, source } = await fetchTrendingFromGemini(category);
    cachedTools = tools;
    lastFetched = new Date();
    console.log(`[api] served ${tools.length} tools from ${source}`);
    res.json({ tools, source, lastFetched });
  } catch (error) {
    console.error('Trending tools fetch failed:', error);
    const response = {
      tools: cachedTools.length ? cachedTools : FALLBACK_TOOLS,
      source: cachedTools.length ? 'cache' : 'fallback',
      lastFetched,
    };
    res.status(cachedTools.length ? 200 : 500).json(response);
  }
});

app.get('/api/trending-tools', async (req, res) => {
  try {
    if (cachedTools.length) {
      return res.json({ tools: cachedTools, source: 'cache', lastFetched });
    }
    const { tools, source } = await fetchTrendingFromGemini(req.query.category);
    cachedTools = tools;
    lastFetched = new Date();
    res.json({ tools, source, lastFetched });
  } catch (error) {
    console.error('Trending tools fetch failed:', error);
    res.status(500).json({ tools: FALLBACK_TOOLS, source: 'fallback', lastFetched });
  }
});

app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLang = 'en' } = req.body || {};
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Missing text' });
    }
    if (!translationKey) {
      return res.json({ translated: text });
    }
    const translatorAI = new GoogleGenerativeAI(translationKey);
    const model = translatorAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `Translate the following text into ${targetLang}. Return ONLY the translated text with no quotes or extra words.\n\n${text}`;
    const result = await withTimeout(model.generateContent(prompt), 5000);
    const translated = result.response.text().trim();
    res.json({ translated: translated || text });
  } catch (error) {
    console.error('Translation failed:', error);
    res.status(500).json({ translated: req.body?.text || '', error: 'Translation error' });
  }
});

cron.schedule('* * * * *', async () => {
  try {
    const { tools, source } = await fetchTrendingFromGemini();
    cachedTools = tools;
    lastFetched = new Date();
    console.log(`[cron] Refreshed trending tools from ${source} at ${lastFetched.toISOString()}`);
  } catch (error) {
    console.error('[cron] Failed to refresh trending tools', error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
