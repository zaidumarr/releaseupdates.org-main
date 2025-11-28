import { CategoryBadge } from './CategoryBadge.jsx';
import { ProviderIcon } from './ProviderIcon.jsx';

export const ToolCard = ({ tool, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-zinc-900/30 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 transition-all cursor-pointer flex flex-col h-full"
  >
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-3">
        <ProviderIcon provider={tool.vendor} />
        <div>
          <h3 className="font-bold text-zinc-100 group-hover:text-white">{tool.name}</h3>
          <p className="text-xs text-zinc-500">{tool.vendor}</p>
        </div>
      </div>
    </div>

    <div className="mb-3">
      <CategoryBadge category={tool.category} />
    </div>

    <p className="text-sm text-zinc-400 line-clamp-3 mb-4 flex-grow">{tool.description}</p>

    <div className="flex flex-wrap gap-1.5 mt-auto">
      {tool.tags?.map((tag) => (
        <span key={tag} className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700/50">
          {tag}
        </span>
      ))}
    </div>
  </div>
);
