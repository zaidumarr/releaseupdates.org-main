const memoryCache = new Map();
const API_BASE = import.meta.env.VITE_API_BASE || '';

const cacheKey = (text, targetLang) => `${targetLang}::${text}`;

const readLocal = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const writeLocal = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
};

export const translateText = async (text, targetLang = 'en') => {
  if (!text || targetLang === 'en') return text;
  const key = cacheKey(text, targetLang);

  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }

  const localHit = readLocal(key);
  if (localHit) {
    memoryCache.set(key, localHit);
    return localHit;
  }

  try {
    const response = await fetch(`${API_BASE}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang }),
    });
    const data = await response.json();
    const translated = data?.translated || text;
    memoryCache.set(key, translated);
    writeLocal(key, translated);
    return translated;
  } catch (error) {
    console.error('translateText failed, falling back to source text', error);
    return text;
  }
};
