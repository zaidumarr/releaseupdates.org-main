import { useEffect, useMemo, useState } from 'react';
import {
  Clock,
  Database,
  Grid,
  Layout,
  Menu,
  RefreshCw,
  Search,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  writeBatch,
  doc,
  limit,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken,
  signOut,
} from 'firebase/auth';
import { AuthModal } from './components/AuthModal.jsx';
import { DetailModal } from './components/DetailModal.jsx';
import { ReleaseCard } from './components/ReleaseCard.jsx';
import { SidebarItem } from './components/SidebarItem.jsx';
import { StatsCard } from './components/StatsCard.jsx';
import { ToolCard } from './components/ToolCard.jsx';
import { CATEGORIES } from './data/categories.js';
import { SEED_RELEASES } from './data/releases.js';
import { TOOLS_CATALOG } from './data/tools.js';
import { appId, auth, authToken, db, isFirebaseEnabled } from './services/firebase.js';
import { MockReleaseService } from './services/mockReleaseService.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [activeView, setActiveView] = useState('feed');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const seedLocalData = () => {
    setReleases(
      SEED_RELEASES.map((release, index) => ({
        id: release.id ?? `${release.provider}-${release.product}-${index}`,
        ...release,
      })),
    );
  };

  const fallbackToLocal = () => {
    setUser({ isAnonymous: true });
    seedLocalData();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    let unsubscribeSnapshot;

    if (!isFirebaseEnabled) {
      fallbackToLocal();
      return undefined;
    }

    const initAuth = async () => {
      if (typeof authToken !== 'undefined' && authToken) {
        try {
          await signInWithCustomToken(auth, authToken);
        } catch (error) {
          console.error('Custom token auth failed', error);
        }
      } else if (!auth?.currentUser) {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error('Anonymous auth failed', error);
          fallbackToLocal();
        }
      }
    };

    initAuth();

    let unsubscribeAuth;
    try {
      unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);

        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
        }

        if (currentUser) {
          const releasesQuery = query(
            collection(db, 'artifacts', appId, 'public', 'data', 'releases'),
            orderBy('date', 'desc'),
            limit(100),
          );

          unsubscribeSnapshot = onSnapshot(
            releasesQuery,
            (snapshot) => {
              const data = snapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
              if (data.length === 0) {
                seedDatabase();
              } else {
                setReleases(data);
                setLoading(false);
              }
            },
            (error) => {
              console.error('Realtime sync failed, switching to local data.', error);
              fallbackToLocal();
            },
          );
        } else {
          fallbackToLocal();
        }
      });
    } catch (error) {
      console.error('Auth listener failed, switching to local data.', error);
      fallbackToLocal();
    }

    return () => {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
    };
  }, []);

  const seedDatabase = async () => {
    if (!isFirebaseEnabled) return;
    const batch = writeBatch(db);
    SEED_RELEASES.forEach((release) => {
      const docRef = doc(collection(db, 'artifacts', appId, 'public', 'data', 'releases'));
      batch.set(docRef, release);
    });
    await batch.commit();
  };

  const handleSync = async () => {
    if (syncing) return;
    setSyncing(true);
    try {
      const newUpdates = await MockReleaseService.fetchUpdates();
      if (newUpdates.length > 0) {
        const updatesWithIds = newUpdates.map((update, index) => ({
          id: update.id ?? `${update.product || update.provider}-live-${Date.now()}-${index}`,
          ...update,
        }));

        if (isFirebaseEnabled) {
          const collectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'releases');
          await Promise.all(updatesWithIds.map((update) => addDoc(collectionRef, update)));
        } else {
          setReleases((current) => [...updatesWithIds, ...current]);
        }
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncing(false);
    }
  };

  const handleToolUpdateFetch = async (tool) => {
    try {
      const update = await MockReleaseService.fetchToolUpdate(tool);
      if (update) {
        const updateWithId = { id: update.id ?? `${tool.name}-${Date.now()}`, ...update };
        if (isFirebaseEnabled) {
          const collectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'releases');
          await addDoc(collectionRef, updateWithId);
        } else {
          setReleases((current) => [updateWithId, ...current]);
        }
      }
    } catch (error) {
      console.error('Tool update check failed', error);
    }
  };

  const handleLogout = async () => {
    if (!isFirebaseEnabled) {
      setShowUserMenu(false);
      return;
    }
    await signOut(auth);
    setShowUserMenu(false);
    await signInAnonymously(auth);
  };

  const filteredReleases = useMemo(
    () =>
      releases.filter((release) => {
        const normalizedTitle = release.title?.toLowerCase() ?? '';
        const normalizedProduct = release.product?.toLowerCase() ?? '';
        const normalizedTags = (release.tags ?? []).map((tag) => tag.toLowerCase());
        const normalizedQuery = searchQuery.toLowerCase();

        const matchesSearch =
          normalizedTitle.includes(normalizedQuery) ||
          normalizedProduct.includes(normalizedQuery) ||
          normalizedTags.some((tag) => tag.includes(normalizedQuery));
        const matchesFilter =
          activeFilter === 'All' ||
          (activeFilter === 'AI Models' && ['OpenAI', 'Google', 'Anthropic'].includes(release.provider)) ||
          (activeFilter === 'Mobile' && ['Apple', 'Android'].includes(release.provider));
        return matchesSearch && matchesFilter;
      }),
    [releases, searchQuery, activeFilter],
  );

  const filteredTools = useMemo(
    () =>
      TOOLS_CATALOG.filter((tool) => {
        const normalizedName = tool.name?.toLowerCase() ?? '';
        const normalizedVendor = tool.vendor?.toLowerCase() ?? '';
        const normalizedTags = (tool.tags ?? []).map((tag) => tag.toLowerCase());
        const normalizedQuery = searchQuery.toLowerCase();

        const matchesSearch =
          normalizedName.includes(normalizedQuery) ||
          normalizedVendor.includes(normalizedQuery) ||
          normalizedTags.some((tag) => tag.includes(normalizedQuery));
        const matchesCategory = activeFilter === 'All' || tool.category === activeFilter;
        return matchesSearch && matchesCategory;
      }),
    [searchQuery, activeFilter],
  );

  const trendingTools = useMemo(
    () =>
      [...TOOLS_CATALOG]
        .sort((a, b) => (b.tags?.length || 0) - (a.tags?.length || 0))
        .slice(0, 5),
    [],
  );

  const openDetail = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-indigo-500/30 flex flex-col">
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-zinc-800 z-40 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-zinc-800 rounded">
            <Menu className="w-5 h-5" />
          </button>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setActiveView('feed');
              setActiveFilter('All');
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-bold text-white tracking-tight hidden sm:block">ReleaseHub</span>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-4 relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search updates or tools..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={syncing}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              syncing
                ? 'bg-zinc-800 border-zinc-800 text-zinc-400 cursor-not-allowed'
                : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/20'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span className="hidden lg:inline">{syncing ? 'Syncing...' : 'Check Updates'}</span>
          </button>

          {user && !user.isAnonymous ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-full border border-zinc-700 flex items-center justify-center text-sm font-medium text-white transition-colors"
              >
                {user.displayName ? user.displayName[0].toUpperCase() : user.email?.[0]?.toUpperCase() || 'U'}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-3 border-b border-zinc-800">
                    <p className="text-sm font-medium text-white truncate">{user.displayName || 'User'}</p>
                    <p className="text-xs text-zinc-500 truncate">{user.email || 'No email'}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-800 flex items-center gap-2 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                disabled={!isFirebaseEnabled}
                className="text-xs font-medium text-zinc-300 hover:text-white px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
                disabled={!isFirebaseEnabled}
                className="text-xs font-medium bg-white text-black px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign Up
              </button>
              {!isFirebaseEnabled && (
                <span className="text-[11px] text-amber-400 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  Offline demo
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="pt-16 flex flex-1 overflow-hidden">
        <aside
          className={`fixed md:sticky top-16 left-0 h-[calc(100vh-64px)] w-64 bg-black border-r border-zinc-800 z-30 transition-transform duration-300 flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-800">
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Research</h3>
              <SidebarItem
                icon={Layout}
                label="Release Feed"
                active={activeView === 'feed'}
                onClick={() => {
                  setActiveView('feed');
                  setActiveFilter('All');
                }}
              />
              <SidebarItem
                icon={Grid}
                label="Tools Directory"
                active={activeView === 'directory'}
                count={TOOLS_CATALOG.length}
                onClick={() => {
                  setActiveView('directory');
                  setActiveFilter('All');
                }}
              />
            </div>
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                {activeView === 'feed' ? 'Filter Feed' : 'Categories'}
              </h3>
              {activeView === 'feed' ? (
                <>
                  <SidebarItem
                    icon={Sparkles}
                    label="AI Models"
                    active={activeFilter === 'AI Models'}
                    onClick={() => setActiveFilter('AI Models')}
                  />
                  <SidebarItem
                    icon={Smartphone}
                    label="Mobile & OS"
                    active={activeFilter === 'Mobile'}
                    onClick={() => setActiveFilter('Mobile')}
                  />
                </>
              ) : (
                Object.entries(CATEGORIES).map(([key, category]) => (
                  <SidebarItem
                    key={key}
                    icon={category.icon}
                    label={category.label.split('&')[0].trim()}
                    active={activeFilter === key}
                    onClick={() => setActiveFilter(key)}
                  />
                ))
              )}
            </div>
            <div className="pt-4 border-t border-zinc-800">
              <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                <h4 className="text-sm font-medium text-white mb-1">Pro Insights</h4>
                <p className="text-xs text-zinc-500 mb-3">Get detailed impact analysis for 240+ AI tools.</p>
                <button className="w-full py-1.5 text-xs font-medium bg-white text-black rounded hover:bg-zinc-200 transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {activeView === 'feed' ? 'Release Dashboard' : 'AI Tools Directory'}
              </h1>
              <p className="text-zinc-500 mt-1">
                {activeView === 'feed'
                  ? 'Track the latest software updates across your ecosystem.'
                  : `Browsing ${TOOLS_CATALOG.length} verified AI research tools and platforms.`}
              </p>
            </div>
            {activeView === 'feed' && (
              <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <StatsCard
                  title="Updates (24h)"
                  value={releases.filter((release) => new Date(release.date) > new Date(Date.now() - 86400000)).length}
                  icon={Clock}
                  trend="+New"
                />
                <StatsCard title="Total Tracked" value={releases.length} icon={Database} />
              </div>
            )}
          </div>

          <div className="md:hidden mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
              <p className="text-zinc-500 text-sm">Synchronizing database...</p>
            </div>
          )}

          {!loading && activeView === 'feed' && (
            <>
              <div className="mb-6 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 md:p-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs uppercase text-zinc-500 tracking-[0.08em] font-semibold">Top Trending</p>
                    <p className="text-sm text-zinc-400">Most-mentioned tools right now</p>
                  </div>
                  <span className="px-2 py-1 text-[11px] rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    Auto-curated
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {trendingTools.map((tool, index) => (
                    <button
                      key={tool.id}
                      onClick={() => openDetail(tool, 'tool')}
                      className="group text-left bg-zinc-950/60 border border-zinc-800 hover:border-indigo-500/30 hover:bg-zinc-900/60 rounded-lg p-3 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-zinc-500">#{index + 1}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white group-hover:text-indigo-100">{tool.name}</p>
                      <p className="text-xs text-zinc-500 mb-2">{tool.vendor}</p>
                      <div className="flex flex-wrap gap-1">
                        {tool.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {filteredReleases.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                  <p className="text-zinc-500">No updates found matching your filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('All');
                    }}
                    className="mt-2 text-indigo-400 text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredReleases.map((release) => (
                    <ReleaseCard key={release.id} release={release} onClick={() => openDetail(release, 'release')} />
                  ))}
                </div>
              )}
            </>
          )}

          {!loading && activeView === 'directory' && (
            <>
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setActiveFilter('All')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                    activeFilter === 'All'
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  All Tools
                </button>
                {Object.entries(CATEGORIES).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                      activeFilter === key
                        ? `${category.bg} ${category.color} ${category.border}`
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {category.label.split('&')[0]}
                  </button>
                ))}
              </div>

              {filteredTools.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                  <p className="text-zinc-500">No tools found matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} onClick={() => openDetail(tool, 'tool')} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <AuthModal
        isOpen={isFirebaseEnabled && isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      />

      {selectedItem && (
        <DetailModal
          item={selectedItem}
          type={selectedType}
          allReleases={releases}
          onFetchUpdate={handleToolUpdateFetch}
          onClose={() => {
            setSelectedItem(null);
            setSelectedType(null);
          }}
        />
      )}
    </div>
  );
}
