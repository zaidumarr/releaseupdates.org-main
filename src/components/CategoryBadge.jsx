import { CATEGORIES } from '../data/categories.js';

export const CategoryBadge = ({ category, label }) => {
  const cat = CATEGORIES[category] || {};
  const Icon = cat.icon;
  const text = label || cat.label || category;

  return (
    <span
      className={`flex items-center gap-1.5 px-2 py-1 text-[10px] font-medium rounded-md border ${cat.bg || 'bg-zinc-800/60'} ${cat.color || 'text-zinc-200'} ${cat.border || 'border-zinc-700/60'}`}
    >
      {Icon ? <Icon className="w-3 h-3" /> : null}
      {text}
    </span>
  );
};
