import { useEffect, useMemo, useState } from 'react';
import {
  Archive,
  Cpu,
  ExternalLink,
  History,
  Loader2,
  MonitorSmartphone,
  Users,
  RefreshCw,
  X,
} from 'lucide-react';
import { Badge } from './Badge.jsx';
import { CategoryBadge } from './CategoryBadge.jsx';
import { ProviderIcon } from './ProviderIcon.jsx';
import { CATEGORIES } from '../data/categories.js';
import { translateText } from '../services/translation.js';

const getLogoUrl = (item) => {
  if (item.logoUrl) return item.logoUrl;
  if (item.website || item.url) {
    try {
      const host = new URL(item.website || item.url).hostname;
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

export const DetailModal = ({ item, type, onClose, allReleases, onFetchUpdate, t, categoryLabel, language }) => {
  const [fetching, setFetching] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [localizedDescription, setLocalizedDescription] = useState(item?.description);

  if (!item) return null;
  const isTool = type === 'tool';

  const formatTemplate = (template, replacements) => {
    if (!template) return '';
    return Object.entries(replacements || {}).reduce(
      (acc, [key, value]) => acc.replaceAll(`{${key}}`, value ?? ''),
      template,
    );
  };

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!item?.description || language === 'en') {
        setLocalizedDescription(item?.description);
        return;
      }
      const translated = await translateText(item.description, language);
      if (!cancelled) setLocalizedDescription(translated);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [item?.description, language]);

  const toolReleases = useMemo(() => {
    if (!isTool) return [];
    const normalizedName = (item?.name || '').toLowerCase();
    const normalizedVendor = (item?.vendor || '').toLowerCase();
    return allReleases
      .filter((release) => {
        const product = (release.product || '').toLowerCase();
        const provider = (release.provider || '').toLowerCase();
        const title = (release.title || '').toLowerCase();
        return (
          (normalizedName && product === normalizedName) ||
          (normalizedVendor && provider === normalizedVendor) ||
          (normalizedName && title.includes(normalizedName))
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [allReleases, item?.name, item?.vendor, isTool]);

  const { latestReleases, archivedReleases } = useMemo(() => {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const latest = [];
    const archived = [];
    toolReleases.forEach((release) => {
      const timestamp = new Date(release?.date || 0).getTime();
      if (Number.isFinite(timestamp) && timestamp >= cutoff) {
        latest.push(release);
      } else {
        archived.push(release);
      }
    });
    return { latestReleases: latest, archivedReleases: archived };
  }, [toolReleases]);

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

  const summarizeRelease = (release) => {
    if (!release) return '';
    const description = release.description?.trim() || '';
    const features = Array.isArray(release.features) ? release.features.filter(Boolean) : [];
    const featureSummary = features.length ? features.slice(0, 3).join(' • ') : '';
    if (description && featureSummary) return `${description} — ${featureSummary}`;
    return description || featureSummary || 'No summary provided.';
  };

  const usersDisplay = isTool && typeof item?.users === 'number' ? formatNumber(item.users) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl liquid-glass-card liquid-glass-filter rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-zinc-800">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {getLogoUrl(item) ? (
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-2 border border-zinc-200/60">
                  <img src={getLogoUrl(item)} alt={`${isTool ? item.name : item.product} logo`} className="w-full h-full object-contain" />
                </div>
              ) : (
                <ProviderIcon provider={isTool ? item.vendor : item.provider} size="lg" />
              )}
              <div>
                <h2 className="text-2xl font-bold text-white">{isTool ? item.name : item.product}</h2>
                <div className="flex items-center gap-2 text-zinc-400 mt-1 text-sm">
                  <span>{isTool ? item.vendor : `v${item.version}`}</span>
                  {!isTool && <span>• {new Date(item.date).toLocaleDateString()}</span>}
                  {isTool && item.version && <span className="text-indigo-300">• {item.version}</span>}
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {isTool ? <CategoryBadge category={item.category} label={categoryLabel} /> : <Badge type={item.type}>{item.type.toUpperCase()}</Badge>}
            {item.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium text-zinc-400 bg-zinc-900 rounded-full border border-zinc-800"
              >
                {tag}
              </span>
            ))}
            {isTool && item.pricing && (
              <span className="px-2 py-0.5 text-xs font-medium text-emerald-200 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                {item.pricing}
              </span>
            )}
            {usersDisplay && (
              <span className="px-2 py-0.5 text-xs font-medium text-emerald-200 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {usersDisplay} {t?.('users') || 'users'}
              </span>
            )}
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <h3 className="text-lg font-semibold text-zinc-200 mb-2">{isTool ? t?.('aboutTool') || 'About this Tool' : item.title}</h3>
            <p className="text-zinc-400 leading-relaxed text-base">{localizedDescription}</p>

            {item.features && item.features.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">{t?.('keyHighlights') || 'Key Highlights:'}</h4>
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
                  {isTool ? t?.('researchSignificance') || 'Research Significance' : t?.('releaseImpact') || 'Release Impact Analysis'}
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {isTool
                    ? formatTemplate(t?.('researchSignificanceTool'), {
                        tool: item.name,
                        category: CATEGORIES[item.category]?.label || 'AI',
                        tag: item.tags?.[0] || 'AI',
                      }) ||
                      `${item.name} is a key player in the ${CATEGORIES[item.category]?.label || 'AI'} space. Widely cited for ${
                        item.tags?.[0] || 'AI'
                      } capabilities.`
                    : t?.('researchSignificanceRelease') ||
                      'This update significantly impacts workflows dependent on previous versions. Recommended for immediate review by DevOps and Engineering teams.'}
                </p>
                {isTool && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
                    <span className="px-2 py-1 rounded bg-zinc-800/70 border border-zinc-700/60 flex items-center gap-1">
                      <MonitorSmartphone className="w-3 h-3 text-indigo-300" /> Platforms:
                    </span>
                    {(item.platforms || []).map((platform) => (
                      <span
                        key={platform}
                        className="px-2 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400"
                      >
                        {platform}
                      </span>
                    ))}
                    {item.pricing && (
                      <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
                        {item.pricing}
                      </span>
                    )}
                    {item.version && (
                      <span className="px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-200">
                        {item.version}
                      </span>
                    )}
                  </div>
                )}
              </div>

            {isTool && (
              <div className="mt-10 border-t border-zinc-800 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <History className="w-5 h-5 text-zinc-400" />
                      <h3 className="text-lg font-bold text-white m-0">
                        {t?.('latest24hTitle') || t?.('latestUpdates') || 'Latest from last 24 hours'}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-500 m-0">
                      {t?.('archiveHelper') || 'Fresh drops from the last day. Older releases stay archived below.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {lastChecked && (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        {(t?.('updatedLabel') || 'Updated')} {getTimeAgo(lastChecked)}
                      </span>
                    )}
                    <button
                      onClick={handleFetch}
                      disabled={fetching}
                      className="text-xs flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-all border border-zinc-700"
                    >
                      {fetching ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                      {t?.('latestUpdatesAction') || t?.('latestUpdates') || 'Latest Updates'}
                    </button>
                  </div>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
                  {latestReleases.length === 0 ? (
                    <div className="pl-8 py-2 text-sm text-zinc-500 italic">
                      {t?.('noUpdatesFound') || 'No updates in the last 24 hours. Archive below keeps previous releases.'}
                    </div>
                  ) : (
                    latestReleases.map((release) => {
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

                {archivedReleases.length > 0 && (
                  <div className="mt-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Archive className="w-4 h-4 text-zinc-500" />
                      <h4 className="text-sm font-semibold text-white m-0">
                        {t?.('releaseArchive') || 'Release archive'}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-500 mb-3">
                      {t?.('archiveHelper') || 'Older releases stay below so you never lose context.'}
                    </p>
                    <div className="space-y-3">
                      {archivedReleases.map((release) => (
                        <div
                          key={`${release.product}-${release.date}-archive`}
                          className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-3 shadow-inner shadow-black/30"
                        >
                          <div className="flex items-center gap-2 mb-1 text-xs text-zinc-500">
                            <span className="font-semibold text-zinc-200 text-sm">
                              {release.title || release.product || release.name || 'Release'}
                            </span>
                            {release.version && <span>• v{release.version}</span>}
                            {release.date && <span>• {new Date(release.date).toLocaleDateString()}</span>}
                          </div>
                          <p className="text-sm text-zinc-400 m-0">{summarizeRelease(release)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 md:p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-end gap-3">
          {isTool && (
            <button className="px-4 py-2 text-sm font-medium bg-emerald-500/10 text-emerald-200 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors">
              Claim this page
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            {t?.('close') || 'Close'}
          </button>
          <a
            href={item.website || item.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2"
          >
            {isTool ? t?.('visitWebsite') || 'Visit Website' : t?.('officialNotes') || 'Official Notes'} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
