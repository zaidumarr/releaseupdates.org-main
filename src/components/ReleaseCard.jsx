import { ChevronRight } from 'lucide-react';
import { Badge } from './Badge.jsx';
import { ProviderIcon } from './ProviderIcon.jsx';

export const ReleaseCard = ({ release, onClick }) => (
  <div
    onClick={onClick}
    className="group relative bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-all cursor-pointer duration-200"
  >
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-3">
        <ProviderIcon provider={release.provider} />
        <div>
          <h3 className="font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {release.product}
            <span className="ml-2 text-zinc-500 text-sm font-normal">v{release.version}</span>
          </h3>
          <p className="text-xs text-zinc-500 flex items-center mt-0.5">
            {release.provider} • {new Date(release.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Badge type={release.type}>{release.type}</Badge>
    </div>

    <h4 className="text-base font-medium text-zinc-200 mb-2 leading-snug">{release.title}</h4>
    <p className="text-sm text-zinc-400 line-clamp-2 mb-4">{release.description}</p>

    <div className="flex items-center justify-between mt-auto">
      <div className="flex gap-2">
        {release.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[10px] text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
    </div>
  </div>
);
