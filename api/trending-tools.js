import { getTrendingToolsResponse } from './lib.js';

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
};

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  const body = req.method === 'POST' ? parseBody(req) : {};
  const category = (req.method === 'POST' ? body.category : req.query?.category) || undefined;

  try {
    const payload = await getTrendingToolsResponse(category);
    const status = payload.source === 'fallback' && !payload.lastFetched ? 500 : 200;
    res.status(status).json(payload);
  } catch (error) {
    console.error('Trending tools API failed', error);
    res.status(500).json({
      tools: [],
      source: 'error',
      lastFetched: null,
      error: 'trending_tools_failed',
    });
  }
}

