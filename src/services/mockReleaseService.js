export const MockReleaseService = {
  fetchUpdates: async () =>
    new Promise((resolve) => {
      setTimeout(() => {
        const count = Math.random() > 0.5 ? 1 : 0;
        if (count === 0) return resolve([]);

        const products = ['Linear', 'Midjourney', 'Notion', 'Zapier'];
        const types = ['feature', 'fix', 'security'];
        const product = products[Math.floor(Math.random() * products.length)];

        const item = {
          provider: product,
          product,
          version: `2025.${Math.floor(Math.random() * 12) + 1}`,
          date: new Date().toISOString(),
          type: types[Math.floor(Math.random() * types.length)],
          title: `${product} Updates AI Capabilities`,
          description:
            'New automated workflows and improved reasoning capabilities rolled out to all enterprise users.',
          features: [
            'Enhanced reasoning capabilities for complex tasks.',
            'New API endpoints for automated reporting.',
            'Security patches for role-based access control.',
          ],
          tags: ['AI', 'Update'],
          url: '#',
          id: Math.random().toString(36).substr(2, 9),
        };
        resolve([item]);
      }, 1500);
    }),

  fetchToolUpdate: async (tool) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date();
        const item = {
          provider: tool.vendor,
          product: tool.name,
          version: `Live Patch ${now.getHours()}:${now.getMinutes()}`,
          date: now.toISOString(),
          type: 'announcement',
          title: `Breaking: New ${tool.name} Capabilities Detected`,
          description: 'Just now: Official API documentation updated with new endpoints.',
          features: [
            'New "Thinking" mode enabled for API users.',
            'Latency reduced by 15% in US-East region.',
            'Updated safety guidelines for autonomous agents.',
          ],
          tags: ['Live', 'API', 'Breaking'],
          url: '#',
          id: Math.random().toString(36).substr(2, 9),
        };
        resolve(item);
      }, 2000);
    }),
};
