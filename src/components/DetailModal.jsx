import { useMemo, useState } from 'react';
import {
  Cpu,
  ExternalLink,
  History,
  Loader2,
  RefreshCw,
  X,
} from 'lucide-react';
import { Badge } from './Badge.jsx';
import { CategoryBadge } from './CategoryBadge.jsx';
import { ProviderIcon } from './ProviderIcon.jsx';
import { CATEGORIES } from '../data/categories.js';

export const DetailModal = ({ item, type, onClose, allReleases, onFetchUpdate }) => {
  const [fetching, setFetching] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  if (!item) return null;
  const isTool = type === 'tool';

  const toolReleases = useMemo(() => {
    if (!isTool) return [];
    return allReleases
      .filter(
        (release) =>
          release.product === item.name || release.provider === item.vendor || release.title.includes(item.name),
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [allReleases, item, isTool]);

  const handleFetch = async () => {
    setFetching(true);
    await onFetchUpdate(item);
    setFetching(false);
    setLastChecked(new Date());
  };

  const getTimeAgo = (date) => {
    const diff = Math.floor((new Date() - date) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return 'Today';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-zinc-800">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <ProviderIcon provider={isTool ? item.vendor : item.provider} size="lg" />
              <div>
                <h2 className="text-2xl font-bold text-white">{isTool ? item.name : item.product}</h2>
                <div className="flex items-center gap-2 text-zinc-400 mt-1 text-sm">
                  <span>{isTool ? item.vendor : `v${item.version}`}</span>
                  {!isTool && <span>• {new Date(item.date).toLocaleDateString()}</span>}
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {isTool ? <CategoryBadge category={item.category} /> : <Badge type={item.type}>{item.type.toUpperCase()}</Badge>}
            {item.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium text-zinc-400 bg-zinc-900 rounded-full border border-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <h3 className="text-lg font-semibold text-zinc-200 mb-2">{isTool ? 'About this Tool' : item.title}</h3>
            <p className="text-zinc-400 leading-relaxed text-base">{item.description}</p>

            {item.features && item.features.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">Key Highlights:</h4>
                <ul className="space-y-2">
                  {item.features.map((feature, index) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-zinc-400">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/60">
              <h4 className="text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                {isTool ? 'Research Significance' : 'Release Impact Analysis'}
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {isTool
                  ? `${item.name} is a key player in the ${CATEGORIES[item.category]?.label || 'AI'} space. Widely cited in 2025 research for its ${
                      item.tags?.[0]
                    } capabilities.`
                  : 'This update significantly impacts workflows dependent on previous API versions. Recommended for immediate review by DevOps and Engineering teams.'}
              </p>
            </div>

            {isTool && (
              <div className="mt-10 border-t border-zinc-800 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-zinc-400" />
                    <h3 className="text-lg font-bold text-white m-0">Latest Updates</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {lastChecked && (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        Updated {getTimeAgo(lastChecked)}
                      </span>
                    )}
                    <button
                      onClick={handleFetch}
                      disabled={fetching}
                      className="text-xs flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-all border border-zinc-700"
                    >
                      {fetching ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                      Check API
                    </button>
                  </div>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
                  {toolReleases.length === 0 ? (
                    <div className="pl-8 py-2 text-sm text-zinc-500 italic">
                      No recent updates found in database. Click "Check API" to fetch live data.
                    </div>
                  ) : (
                    toolReleases.map((release) => {
                      const isNew = lastChecked && new Date() - new Date(release.date) < 60000;
                      return (
                        <div
                          key={`${release.product}-${release.date}`}
                          className={`relative flex items-start group ${
                            isNew ? 'animate-in slide-in-from-left-4 duration-500' : ''
                          }`}
                        >
                          <div
                            className={`absolute left-0 mt-1.5 w-5 h-5 rounded-full border-2 ${
                              isNew
                                ? 'bg-emerald-500 border-emerald-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                                : 'bg-zinc-900 border-zinc-700'
                            } z-10`}
                          />
                          <div className="ml-8 w-full">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-semibold ${isNew ? 'text-emerald-400' : 'text-zinc-200'}`}>
                                v{release.version}
                              </span>
                              <span className="text-xs text-zinc-500">• {new Date(release.date).toLocaleDateString()}</span>
                              {isNew && (
                                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] rounded font-medium">
                                  NEW
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-medium text-zinc-300 mb-2">{release.title}</h4>
                            {release.features && (
                              <ul className="space-y-1 mb-2">
                                {release.features.slice(0, 3).map((feature) => (
                                  <li key={feature} className="text-xs text-zinc-500 flex items-start gap-2">
                                    <span className="w-1 h-1 bg-zinc-600 rounded-full mt-1.5 shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Close
          </button>
          <a
            href={item.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2"
          >
            {isTool ? 'Visit Website' : 'Official Notes'} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
