import { refreshTrendingCache } from './lib.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const payload = await refreshTrendingCache();
    res.status(200).json({ ok: true, ...payload });
  } catch (error) {
    console.error('Cron refresh failed', error);
    res.status(500).json({ ok: false, error: 'cron_refresh_failed' });
  }
}

