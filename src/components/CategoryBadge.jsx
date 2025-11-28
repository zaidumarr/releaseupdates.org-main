import { CATEGORIES } from '../data/categories.js';

export const CategoryBadge = ({ category }) => {
  const cat = CATEGORIES[category] || CATEGORIES.data;
  const Icon = cat.icon;

  return (
    <span
      className={`flex items-center gap-1.5 px-2 py-1 text-[10px] font-medium rounded-md border ${cat.bg} ${cat.color} ${cat.border}`}
    >
      <Icon className="w-3 h-3" />
      {cat.label}
    </span>
  );
};
