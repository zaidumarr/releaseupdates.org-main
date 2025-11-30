import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { text, targetLang = 'en' } = req.body || {};
  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'Missing text' });
    return;
  }

  const apiKey = process.env.GEMNI_TRANSLATION_API || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(200).json({ translated: text });
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `Translate the following text into ${targetLang}. Return ONLY the translated text with no quotes or extra words.\n\n${text}`;
    const result = await model.generateContent(prompt);
    const translated = result.response.text().trim();
    res.status(200).json({ translated: translated || text });
  } catch (error) {
    console.error('Translate failed', error);
    res.status(500).json({ translated: text, error: 'translation_error' });
  }
}
