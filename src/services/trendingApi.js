export const getTrendingTools = async (category = 'IT / Dev / AI tools') => {
  const response = await fetch('/api/trending-tools', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch trending tools');
  }

  const data = await response.json();
  return {
    tools: data.tools || [],
    lastFetched: data.lastFetched || null,
    source: data.source || 'unknown',
  };
};
