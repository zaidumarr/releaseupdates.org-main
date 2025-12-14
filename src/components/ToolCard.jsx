import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { CategoryBadge } from './CategoryBadge.jsx';
import { ProviderIcon } from './ProviderIcon.jsx';
import { translateText } from '../services/translation.js';

const getLogoUrl = (tool) => {
  if (tool.logoUrl) return tool.logoUrl;
  if (tool.website) {
    try {
      const host = new URL(tool.website).hostname;
      return `https://logo.clearbit.com/${host}`;
    } catch (error) {
      return null;
    }
  }
  return null;
};

const formatNumber = (value) => {
  if (typeof value !== 'number' || Number.isNaN(value)) return null;
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1).replace(/\\.0$/, '')}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\\.0$/, '')}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\\.0$/, '')}K`;
  return value.toLocaleString();
};

export const ToolCard = ({ tool, onClick, categoryLabel, t, language, userCount }) => {
  const logoUrl = getLogoUrl(tool);
  const [localizedDescription, setLocalizedDescription] = useState(tool.description);
  const usersDisplay = formatNumber(userCount);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (language === 'en' || !tool.description) {
        setLocalizedDescription(tool.description);
        return;
      }
      const translated = await translateText(tool.description, language);
      if (!cancelled) setLocalizedDescription(translated);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [language, tool.description]);

  return (
    <div
      onClick={onClick}
      className="group liquid-glass-card liquid-glass-filter hover:border-white/20 rounded-2xl p-4 transition-all cursor-pointer flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 border border-zinc-200/50">
              <img src={logoUrl} alt={`${tool.name} logo`} className="w-full h-full object-contain" />
            </div>
          ) : (
            <ProviderIcon provider={tool.vendor} />
          )}
          <div>
            <h3 className="font-bold text-zinc-100 group-hover:text-white flex items-center gap-2">
              <span>{tool.name}</span>
              <span className="text-[11px] text-zinc-500 font-semibold">v{tool.version || t?.('latest') || 'Latest'}</span>
            </h3>
            <p className="text-xs text-zinc-500">{tool.vendor}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-200 border border-indigo-500/20">
          {tool.version || t?.('latest') || 'Latest'}
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-500/20">
          {tool.pricing || t?.('tieredPlans') || 'Tiered plans'}
        </span>
        {usersDisplay && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800/80 text-emerald-200 border border-emerald-500/30 flex items-center gap-1">
            <Users className="w-3 h-3" />
            {usersDisplay} {t?.('users') || 'users'}
          </span>
        )}
      </div>

      <div className="mb-3">
        <CategoryBadge category={tool.category} label={categoryLabel} />
      </div>

      <p className="text-sm text-zinc-200/80 line-clamp-3 mb-3 flex-grow">{localizedDescription}</p>

      <div className="flex flex-wrap gap-1.5 mb-3 text-[10px] text-zinc-300/80">
        {(tool.platforms || []).slice(0, 5).map((platform) => (
          <span key={platform} className="px-2 py-0.5 rounded-full bg-zinc-800/70 border border-zinc-700/60">
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
};
