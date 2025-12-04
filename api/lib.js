import { GoogleGenerativeAI } from '@google/generative-ai';

const DEFAULT_CATEGORY = 'IT / Dev / AI tools';
const CACHE_TTL_MS = 55 * 60 * 1000; // refresh roughly hourly
const GEMINI_TIMEOUT_MS = 4000;

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
    description: "Anthropic's balanced flag model for coding and analysis",
    website: 'https://claude.ai',
    tags: ['ai', 'chat', 'analysis'],
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
  },
  {
    name: 'Replit Agent',
    category: 'Dev Tools',
    description: 'Autonomous coding agent on Replit infra',
    website: 'https://replit.com/agent',
    tags: ['automation', 'coding'],
  },
];

let cachedTools = [];
let lastFetched = null;

const withTimeout = (promise, ms) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Gemini request timed out after ${ms}ms`)), ms);
    promise
      .then((value) => resolve(value))
      .catch((error) => reject(error))
      .finally(() => clearTimeout(timer));
  });

const parseJsonResponse = (text) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini JSON parse failed. Raw text:', text);
    throw new Error('invalid_json');
  }
};

export const fetchTrendingFromGemini = async (category = DEFAULT_CATEGORY) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not set; returning fallback trending tools.');
    return { tools: FALLBACK_TOOLS, source: 'fallback' };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
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
  "tags": ["tag1","tag2"]
}
Respond with: [ { ... }, { ... }, ... ]
  `;

  const result = await withTimeout(model.generateContent(prompt), GEMINI_TIMEOUT_MS);
  const text = result.response.text().trim();
  const tools = parseJsonResponse(text);
  if (!Array.isArray(tools)) {
    throw new Error('Gemini returned invalid JSON payload');
  }
  return { tools, source: 'gemini' };
};

const isCacheFresh = () => {
  if (!cachedTools.length || !lastFetched) return false;
  const ageMs = Date.now() - lastFetched.getTime();
  return ageMs < CACHE_TTL_MS;
};

const saveCache = (tools, source = 'cache') => {
  cachedTools = tools;
  lastFetched = new Date();
  return { tools, source, lastFetched };
};

export const getCachedTools = () =>
  isCacheFresh() ? { tools: cachedTools, source: 'cache', lastFetched } : null;

export const getTrendingToolsResponse = async (
  category = DEFAULT_CATEGORY,
  { forceRefresh = false } = {},
) => {
  if (!forceRefresh) {
    const cached = getCachedTools();
    if (cached) return cached;
  }

  try {
    const { tools, source } = await fetchTrendingFromGemini(category);
    return saveCache(tools, source);
  } catch (error) {
    console.error('Trending tools fetch failed', error);
    if (cachedTools.length) {
      return { tools: cachedTools, source: 'cache', lastFetched };
    }
    return { tools: FALLBACK_TOOLS, source: 'fallback', lastFetched: null };
  }
};

export const refreshTrendingCache = async (category = DEFAULT_CATEGORY) =>
  getTrendingToolsResponse(category, { forceRefresh: true });

export const getTrendingState = () => ({
  cachedCount: cachedTools.length,
  lastFetched,
});

export const FALLBACK_RESPONSE = { tools: FALLBACK_TOOLS, source: 'fallback', lastFetched: null };
