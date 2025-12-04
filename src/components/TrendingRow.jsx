import React from 'react';
import { Sparkline } from './Sparkline.jsx';
import { ProviderIcon } from './ProviderIcon.jsx';

const getLogoUrl = (tool) => {
  if (tool?.logoUrl) return tool.logoUrl;
  if (tool?.website) {
    try {
      const host = new URL(tool.website).hostname;
      return `https://logo.clearbit.com/${host}`;
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const TrendingRow = ({ tool, rank, onClick, t }) => {
  const history =
    tool?.history && Array.isArray(tool.history) && tool.history.length >= 2
      ? tool.history
      : Array.from({ length: 10 }, () => 20 + Math.random() * 80);
  const volume = typeof tool?._usage === 'number' ? `${tool._usage}K+` : '10K+';
  const rankColor = rank === 1 ? 'text-blue-400' : rank <= 3 ? 'text-indigo-400' : 'text-zinc-500';

  return (
    <div
      onClick={onClick}
      className="group relative flex items-center justify-between p-4 bg-zinc-900/40 hover:bg-zinc-800/60 border-b border-zinc-800/50 hover:border-zinc-700 transition-all cursor-pointer first:rounded-t-xl last:rounded-b-xl last:border-b-0"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <span className={`text-2xl font-bold w-8 text-center shrink-0 ${rankColor}`}>{rank}</span>

        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0">
            {getLogoUrl(tool) ? (
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 border border-zinc-200/50">
                <img src={getLogoUrl(tool)} alt={tool.name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <ProviderIcon provider={tool?.vendor || tool?.name} size="lg" />
            )}
          </div>

          <div className="truncate">
            <h3 className="font-semibold text-zinc-100 text-base truncate group-hover:text-blue-400 transition-colors">
              {tool?.name}
            </h3>
            <p className="text-xs text-zinc-500 truncate">
              {(tool?.vendor || 'Trending')} • {tool?.category || 'AI'}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden sm:block px-4 shrink-0 w-32">
        <Sparkline data={history} color={rank <= 3 ? '#60a5fa' : '#71717a'} width={100} height={32} />
      </div>

      <div className="text-right shrink-0 min-w-[60px]">
        <div className="text-sm font-bold text-zinc-200">{volume}</div>
        <div className="text-[10px] text-zinc-500">{t?.('searches') || 'mentions'}</div>
      </div>
    </div>
  );
};

