import { TOOLS_CATALOG } from './tools.js';

// Simple plain list: tool name and its category
export const TOOL_LIST = TOOLS_CATALOG.map(({ name, category }) => ({
  name,
  category,
}));
