import { CategoryBadge } from './CategoryBadge.jsx';
import { ProviderIcon } from './ProviderIcon.jsx';

export const ToolCard = ({ tool, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-zinc-900/40 hover:bg-zinc-900 border border-indigo-500/10 hover:border-indigo-400/30 rounded-xl p-4 transition-all cursor-pointer flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
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

    <div className="flex items-center justify-between gap-2 mb-3">
      <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-200 border border-indigo-500/20">
        {tool.version || 'Latest'}
      </span>
      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-500/20">
        {tool.pricing || 'See pricing'}
      </span>
    </div>

    <div className="mb-3">
      <CategoryBadge category={tool.category} />
    </div>

    <p className="text-sm text-zinc-200/80 line-clamp-3 mb-3 flex-grow">{tool.description}</p>

    <div className="flex flex-wrap gap-1.5 mb-3 text-[10px] text-zinc-300/80">
      {(tool.platforms || []).slice(0, 5).map((platform) => (
        <span
          key={platform}
          className="px-2 py-0.5 rounded-full bg-zinc-800/70 border border-zinc-700/60"
        >
          {platform}
        </span>
      ))}
    </div>

    <div className="flex flex-wrap gap-1.5 mt-auto">
      {tool.tags?.map((tag) => (
        <span key={tag} className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700/50">
          {tag}
        </span>
      ))}
    </div>
  </div>
);
