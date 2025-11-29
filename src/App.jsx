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
import { getTrendingTools } from './services/trendingApi.js';
import { CURATED_TRENDING } from './data/trending.js';

const LOCAL_TEST_USER = {
  email: 'zaid5044@gmail.com',
  password: 'Gujjar930$',
  displayName: 'Zaid Test',
};

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
];

const TRANSLATIONS = {
  en: {
    releaseDashboard: 'Release Dashboard',
    toolsDirectory: 'AI Tools Directory',
    releaseSubtitle: 'Track the latest software updates across your ecosystem.',
    directorySubtitle: (count) => `Browsing ${count} verified AI research tools and platforms.`,
    searchUpdates: 'Search updates or tools...',
    search: 'Search...',
    checkUpdates: 'Check Updates',
    syncing: 'Syncing...',
    releaseFeed: 'Release Feed',
    allUpdates: 'All updates',
    toolsDir: 'Tools Directory',
    filterFeed: 'Filter Feed',
    categories: 'Categories',
    aiModels: 'AI Models',
    mobile: 'Mobile & OS',
    proInsights: 'Pro Insights',
    proCopy: 'Get detailed impact analysis for 240+ AI tools.',
    upgradePlan: 'Upgrade Plan',
    updates24h: 'Updates (24h)',
    totalTracked: 'Total Tracked',
    noUpdates: 'No updates found matching your filters.',
    clearFilters: 'Clear filters',
    noTools: 'No tools found matching your search.',
    allTools: 'All Tools',
    topTrending: 'Top Trending',
    mostMentioned: 'Most-mentioned tools right now',
    autoCurated: 'Auto-curated',
    syncingDb: 'Synchronizing database...',
    login: 'Log In',
    signup: 'Sign Up',
    logout: 'Sign Out',
    offlineDemo: 'Offline demo',
    trendingLeaderboard: 'Trending Leaderboard',
    usage: 'Usage',
    rank: 'Rank',
    aiToolsSection: 'AI Tools Spotlight',
    browseAll: 'Browse all',
  },
  ru: {
    releaseDashboard: 'Панель релизов',
    toolsDirectory: 'Каталог AI инструментов',
    releaseSubtitle: 'Отслеживайте последние обновления ПО в вашей экосистеме.',
    directorySubtitle: (count) => `Просмотр ${count} проверенных AI инструментов и платформ.`,
    searchUpdates: 'Поиск обновлений или инструментов...',
    search: 'Поиск...',
    checkUpdates: 'Проверить обновления',
    syncing: 'Синхронизация...',
    releaseFeed: 'Лента релизов',
    allUpdates: 'Все обновления',
    toolsDir: 'Каталог инструментов',
    filterFeed: 'Фильтр ленты',
    categories: 'Категории',
    aiModels: 'AI Модели',
    mobile: 'Мобильные & ОС',
    proInsights: 'Pro аналитика',
    proCopy: 'Глубокий анализ влияния для 240+ AI инструментов.',
    upgradePlan: 'Обновить план',
    updates24h: 'Обновления (24ч)',
    totalTracked: 'Всего отслеживается',
    noUpdates: 'Нет обновлений по вашим фильтрам.',
    clearFilters: 'Сбросить фильтры',
    noTools: 'Нет инструментов по запросу.',
    allTools: 'Все инструменты',
    topTrending: 'Топ тренды',
    mostMentioned: 'Самые упоминаемые сейчас',
    autoCurated: 'Авто-подбор',
    syncingDb: 'Синхронизация базы...',
    login: 'Войти',
    signup: 'Регистрация',
    logout: 'Выйти',
    offlineDemo: 'Оффлайн демо',
    trendingLeaderboard: 'Рейтинг трендов',
    usage: 'Использование',
    rank: 'Ранг',
    aiToolsSection: 'Витрина AI инструментов',
    browseAll: 'Смотреть все',
  },
  it: {
    releaseDashboard: 'Dashboard Rilasci',
    toolsDirectory: 'Directory AI Tools',
    releaseSubtitle: 'Monitora gli ultimi aggiornamenti software nel tuo ecosistema.',
    directorySubtitle: (count) => `Stai consultando ${count} strumenti e piattaforme AI verificati.`,
    searchUpdates: 'Cerca aggiornamenti o strumenti...',
    search: 'Cerca...',
    checkUpdates: 'Verifica aggiornamenti',
    syncing: 'Sincronizzazione...',
    releaseFeed: 'Feed Rilasci',
    allUpdates: 'Tutti gli aggiornamenti',
    toolsDir: 'Directory Strumenti',
    filterFeed: 'Filtra feed',
    categories: 'Categorie',
    aiModels: 'Modelli AI',
    mobile: 'Mobile & OS',
    proInsights: 'Approfondimenti Pro',
    proCopy: 'Analisi di impatto per oltre 240 strumenti AI.',
    upgradePlan: 'Aggiorna piano',
    updates24h: 'Aggiornamenti (24h)',
    totalTracked: 'Totale tracciati',
    noUpdates: 'Nessun aggiornamento per questi filtri.',
    clearFilters: 'Pulisci filtri',
    noTools: 'Nessuno strumento trovato.',
    allTools: 'Tutti gli strumenti',
    topTrending: 'Top trend',
    mostMentioned: 'Più menzionati ora',
    autoCurated: 'Auto-curato',
    syncingDb: 'Sincronizzazione database...',
    login: 'Accedi',
    signup: 'Registrati',
    logout: 'Esci',
    offlineDemo: 'Demo offline',
    trendingLeaderboard: 'Classifica trend',
    usage: 'Utilizzo',
    rank: 'Posizione',
    aiToolsSection: 'Vetrina AI Tools',
    browseAll: 'Vedi tutto',
  },
  fr: {
    releaseDashboard: 'Tableau des versions',
    toolsDirectory: 'Annuaire des outils IA',
    releaseSubtitle: 'Suivez les dernières mises à jour logicielles de votre écosystème.',
    directorySubtitle: (count) => `Parcours de ${count} outils et plateformes IA vérifiés.`,
    searchUpdates: 'Rechercher des mises à jour ou outils...',
    search: 'Recherche...',
    checkUpdates: 'Vérifier les mises à jour',
    syncing: 'Synchronisation...',
    releaseFeed: 'Flux des versions',
    allUpdates: 'Toutes les mises à jour',
    toolsDir: 'Annuaire',
    filterFeed: 'Filtrer le flux',
    categories: 'Catégories',
    aiModels: 'Modèles IA',
    mobile: 'Mobile & OS',
    proInsights: 'Insights Pro',
    proCopy: "Analyse d'impact détaillée pour 240+ outils IA.",
    upgradePlan: 'Améliorer le plan',
    updates24h: 'Mises à jour (24h)',
    totalTracked: 'Total suivi',
    noUpdates: 'Aucune mise à jour pour ces filtres.',
    clearFilters: 'Effacer les filtres',
    noTools: 'Aucun outil trouvé.',
    allTools: 'Tous les outils',
    topTrending: 'Tendances',
    mostMentioned: 'Les plus cités',
    autoCurated: 'Auto-sélection',
    syncingDb: 'Synchronisation de la base...',
    login: 'Connexion',
    signup: 'Créer un compte',
    logout: 'Déconnexion',
    offlineDemo: 'Démo hors ligne',
    trendingLeaderboard: 'Classement tendances',
    usage: 'Usage',
    rank: 'Rang',
    aiToolsSection: 'Sélection d’outils IA',
    browseAll: 'Voir tout',
  },
  es: {
    releaseDashboard: 'Panel de lanzamientos',
    toolsDirectory: 'Directorio de herramientas IA',
    releaseSubtitle: 'Sigue las últimas actualizaciones de software en tu ecosistema.',
    directorySubtitle: (count) => `Explorando ${count} herramientas y plataformas IA verificadas.`,
    searchUpdates: 'Buscar actualizaciones o herramientas...',
    search: 'Buscar...',
    checkUpdates: 'Buscar actualizaciones',
    syncing: 'Sincronizando...',
    releaseFeed: 'Feed de lanzamientos',
    allUpdates: 'Todas las actualizaciones',
    toolsDir: 'Directorio',
    filterFeed: 'Filtrar feed',
    categories: 'Categorías',
    aiModels: 'Modelos IA',
    mobile: 'Móvil & OS',
    proInsights: 'Insights Pro',
    proCopy: 'Análisis de impacto para 240+ herramientas IA.',
    upgradePlan: 'Mejorar plan',
    updates24h: 'Actualizaciones (24h)',
    totalTracked: 'Total rastreados',
    noUpdates: 'No hay actualizaciones con estos filtros.',
    clearFilters: 'Limpiar filtros',
    noTools: 'No se encontraron herramientas.',
    allTools: 'Todas las herramientas',
    topTrending: 'Tendencias',
    mostMentioned: 'Más mencionadas ahora',
    autoCurated: 'Auto-curado',
    syncingDb: 'Sincronizando base de datos...',
    login: 'Iniciar sesión',
    signup: 'Crear cuenta',
    logout: 'Cerrar sesión',
    offlineDemo: 'Demo sin conexión',
    trendingLeaderboard: 'Ranking de tendencias',
    usage: 'Uso',
    rank: 'Ranking',
    aiToolsSection: 'Escaparate de herramientas IA',
    browseAll: 'Ver todas',
  },
  pt: {
    releaseDashboard: 'Painel de lançamentos',
    toolsDirectory: 'Diretório de ferramentas IA',
    releaseSubtitle: 'Acompanhe as últimas atualizações de software do seu ecossistema.',
    directorySubtitle: (count) => `Explorando ${count} ferramentas e plataformas de IA verificadas.`,
    searchUpdates: 'Buscar atualizações ou ferramentas...',
    search: 'Buscar...',
    checkUpdates: 'Verificar atualizações',
    syncing: 'Sincronizando...',
    releaseFeed: 'Feed de lançamentos',
    allUpdates: 'Todas as atualizações',
    toolsDir: 'Diretório',
    filterFeed: 'Filtrar feed',
    categories: 'Categorias',
    aiModels: 'Modelos IA',
    mobile: 'Mobile & OS',
    proInsights: 'Insights Pro',
    proCopy: 'Análise de impacto para 240+ ferramentas de IA.',
    upgradePlan: 'Atualizar plano',
    updates24h: 'Atualizações (24h)',
    totalTracked: 'Total rastreado',
    noUpdates: 'Sem atualizações para estes filtros.',
    clearFilters: 'Limpar filtros',
    noTools: 'Nenhuma ferramenta encontrada.',
    allTools: 'Todas as ferramentas',
    topTrending: 'Em alta',
    mostMentioned: 'Mais mencionadas agora',
    autoCurated: 'Auto-curado',
    syncingDb: 'Sincronizando base...',
    login: 'Entrar',
    signup: 'Criar conta',
    logout: 'Sair',
    offlineDemo: 'Demo offline',
    trendingLeaderboard: 'Ranking de tendências',
    usage: 'Uso',
    rank: 'Posição',
    aiToolsSection: 'Vitrine de ferramentas IA',
    browseAll: 'Ver todas',
  },
  zh: {
    releaseDashboard: '发布看板',
    toolsDirectory: 'AI 工具目录',
    releaseSubtitle: '跟踪生态中的最新软件更新。',
    directorySubtitle: (count) => `浏览 ${count} 个已验证的 AI 工具与平台。`,
    searchUpdates: '搜索更新或工具...',
    search: '搜索...',
    checkUpdates: '检查更新',
    syncing: '同步中...',
    releaseFeed: '发布动态',
    allUpdates: '所有更新',
    toolsDir: '工具目录',
    filterFeed: '筛选动态',
    categories: '分类',
    aiModels: 'AI 模型',
    mobile: '移动 & 系统',
    proInsights: '专业洞察',
    proCopy: '获取 240+ AI 工具的影响分析。',
    upgradePlan: '升级方案',
    updates24h: '24h 更新',
    totalTracked: '跟踪总数',
    noUpdates: '没有符合条件的更新。',
    clearFilters: '清除筛选',
    noTools: '未找到相关工具。',
    allTools: '全部工具',
    topTrending: '热门趋势',
    mostMentioned: '当前最常提及',
    autoCurated: '自动推荐',
    syncingDb: '数据库同步中...',
    login: '登录',
    signup: '注册',
    logout: '退出',
    offlineDemo: '离线演示',
    trendingLeaderboard: '趋势榜',
    usage: '使用率',
    rank: '排名',
    aiToolsSection: 'AI 工具精选',
    browseAll: '查看全部',
  },
  ja: {
    releaseDashboard: 'リリースダッシュボード',
    toolsDirectory: 'AI ツールディレクトリ',
    releaseSubtitle: 'エコシステム内の最新アップデートを追跡。',
    directorySubtitle: (count) => `${count} 件の検証済みAIツールとプラットフォームを閲覧中。`,
    searchUpdates: 'アップデートやツールを検索...',
    search: '検索...',
    checkUpdates: '更新を確認',
    syncing: '同期中...',
    releaseFeed: 'リリースフィード',
    allUpdates: 'すべてのアップデート',
    toolsDir: 'ツールディレクトリ',
    filterFeed: 'フィードを絞り込み',
    categories: 'カテゴリ',
    aiModels: 'AIモデル',
    mobile: 'モバイル & OS',
    proInsights: 'プロインサイト',
    proCopy: '240以上のAIツールの影響分析を入手。',
    upgradePlan: 'プランをアップグレード',
    updates24h: '更新 (24h)',
    totalTracked: '総トラッキング数',
    noUpdates: '該当する更新がありません。',
    clearFilters: 'フィルターをクリア',
    noTools: '該当ツールがありません。',
    allTools: 'すべてのツール',
    topTrending: 'トレンド',
    mostMentioned: '今注目',
    autoCurated: '自動キュレーション',
    syncingDb: 'データベース同期中...',
    login: 'ログイン',
    signup: 'サインアップ',
    logout: 'ログアウト',
    offlineDemo: 'オフラインデモ',
    trendingLeaderboard: 'トレンドランキング',
    usage: '利用率',
    rank: '順位',
    aiToolsSection: 'AIツール特集',
    browseAll: 'すべて見る',
  },
};

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
  const localAuthEnabled = !isFirebaseEnabled;
  const [language, setLanguage] = useState('en');
  const [trendingTools, setTrendingTools] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingCategory, setTrendingCategory] = useState('IT / Dev / AI tools');

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Seed with curated, then try live Gemini fetch
    setTrendingTools(
      CURATED_TRENDING.map((tool, index) => ({
        ...tool,
        id: tool.id || `${tool.name}-${index}`,
        _rank: index + 1,
      })),
    );
    fetchTrending();
  }, []);

  const t = (key, ...args) => {
    const langPack = TRANSLATIONS[language] || TRANSLATIONS.en;
    const value = langPack[key] ?? TRANSLATIONS.en[key] ?? key;
    if (typeof value === 'function') {
      return value(...args);
    }
    return value;
  };

  const localTrendingAll = useMemo(
    () =>
      CURATED_TRENDING.map((tool, index) => ({
        ...tool,
        id: tool.id || `${tool.name}-${index}`,
        _rank: index + 1,
      })),
    [],
  );

  const seedLocalData = () => {
    setReleases(
      SEED_RELEASES.map((release, index) => ({
        id: release.id ?? `${release.provider}-${release.product}-${index}`,
        ...release,
      })),
    );
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setActiveFilter('All');
    setMobileMenuOpen(false);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setMobileMenuOpen(false);
  };

  const decorateTrending = (tools) =>
    (tools || []).map((tool, index) => ({
      id: tool.id || `${tool.name || 'tool'}-${index}`,
      name: tool.name || tool.title || 'Untitled tool',
      category: tool.category || tool.tags?.[0] || 'AI',
      description: tool.description || tool.summary || 'Trending tool',
      vendor: tool.vendor || tool.provider || tool.category || 'Trending',
      website: tool.website || tool.url,
      pricing: tool.pricing,
      version: tool.version,
      tags: tool.tags || [],
      platforms: tool.platforms || [],
      _rank: index + 1,
      _usage: typeof tool._usage === 'number' || typeof tool.usage === 'number' ? tool._usage ?? tool.usage : undefined,
    }));

  const fetchTrending = async (category = trendingCategory) => {
    setTrendingLoading(true);
    try {
      const tools = await getTrendingTools(category);
      if (Array.isArray(tools) && tools.length > 0) {
        setTrendingTools(decorateTrending(tools));
      } else {
        setTrendingTools(localTrendingAll);
      }
    } catch (error) {
      console.error('Failed to load trending tools, using fallback.', error);
      setTrendingTools(localTrendingAll);
    } finally {
      setTrendingLoading(false);
    }
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
      setUser({ isAnonymous: true });
      return;
    }
    await signOut(auth);
    setShowUserMenu(false);
    await signInAnonymously(auth);
  };

  const handleLocalAuth = async (email, password) => {
    if (email === LOCAL_TEST_USER.email && password === LOCAL_TEST_USER.password) {
      setUser({
        isAnonymous: false,
        displayName: LOCAL_TEST_USER.displayName,
        email: LOCAL_TEST_USER.email,
        isLocal: true,
      });
      setIsAuthModalOpen(false);
      setShowUserMenu(false);
      return;
    }
    throw new Error('Invalid credentials');
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

  const trendingAll = trendingTools.length ? trendingTools : localTrendingAll;
  const trendingDisplay = trendingAll.slice(0, 10);

  const spotlightTools = useMemo(() => TOOLS_CATALOG.slice(0, 8), []);

  const openDetail = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1024] to-[#120920] text-zinc-300 font-sans selection:bg-indigo-500/30 flex flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-[32rem] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <header className="fixed top-0 left-0 right-0 h-16 bg-black/60 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-4 md:px-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-zinc-800 rounded">
            <Menu className="w-5 h-5" />
          </button>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleViewChange('feed')}
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
            placeholder={t('searchUpdates')}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <label className="text-[11px] uppercase tracking-[0.08em] text-zinc-500 font-semibold">Lang</label>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-2 py-1 focus:outline-none focus:border-indigo-500/50"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
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
            <span className="hidden lg:inline">{syncing ? t('syncing') : t('checkUpdates')}</span>
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
                {t('logout')}
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
                disabled={!isFirebaseEnabled && !localAuthEnabled ? true : false}
                className="text-xs font-medium text-zinc-300 hover:text-white px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('login')}
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
                disabled={!isFirebaseEnabled && !localAuthEnabled ? true : false}
                className="text-xs font-medium bg-white text-black px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('signup')}
              </button>
              {!isFirebaseEnabled && (
                <span className="text-[11px] text-amber-400 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  {t('offlineDemo')}
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

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
                label={t('releaseFeed')}
                active={activeView === 'feed'}
                onClick={() => handleViewChange('feed')}
              />
              <SidebarItem
                icon={Grid}
                label={t('toolsDir')}
                active={activeView === 'directory'}
                count={TOOLS_CATALOG.length}
                onClick={() => handleViewChange('directory')}
              />
            </div>
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                {activeView === 'feed' ? t('filterFeed') : t('categories')}
              </h3>
              {activeView === 'feed' ? (
                <>
                  <SidebarItem
                    icon={Sparkles}
                    label={t('aiModels')}
                    active={activeFilter === 'AI Models'}
                    onClick={() => handleFilterChange('AI Models')}
                  />
                  <SidebarItem
                    icon={Smartphone}
                    label={t('mobile')}
                    active={activeFilter === 'Mobile'}
                    onClick={() => handleFilterChange('Mobile')}
                  />
                </>
              ) : (
                Object.entries(CATEGORIES).map(([key, category]) => (
                  <SidebarItem
                    key={key}
                    icon={category.icon}
                    label={category.label.split('&')[0].trim()}
                    active={activeFilter === key}
                    onClick={() => handleFilterChange(key)}
                  />
                ))
              )}
            </div>
            <div className="pt-4 border-t border-zinc-800">
              <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                <h4 className="text-sm font-medium text-white mb-1">{t('proInsights')}</h4>
                <p className="text-xs text-zinc-500 mb-3">{t('proCopy')}</p>
                <button className="w-full py-1.5 text-xs font-medium bg-white text-black rounded hover:bg-zinc-200 transition-colors">
                  {t('upgradePlan')}
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {activeView === 'feed' ? t('releaseDashboard') : t('toolsDirectory')}
              </h1>
              <p className="text-zinc-500 mt-1">
                {activeView === 'feed'
                  ? t('releaseSubtitle')
                  : t('directorySubtitle', TOOLS_CATALOG.length)}
              </p>
            </div>
            {activeView === 'feed' && (
              <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <StatsCard
                  title={t('updates24h')}
                  value={releases.filter((release) => new Date(release.date) > new Date(Date.now() - 86400000)).length}
                  icon={Clock}
                  trend="+New"
                />
                <StatsCard title={t('totalTracked')} value={releases.length} icon={Database} />
              </div>
            )}
          </div>

          <div className="md:hidden mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder={t('search')}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          <div className="md:hidden space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleViewChange('feed')}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  activeView === 'feed'
                    ? 'bg-white text-black border-white shadow-lg shadow-indigo-500/10'
                    : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <Layout className="w-4 h-4" />
                {t('releaseFeed')}
              </button>
              <button
                onClick={() => handleViewChange('directory')}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  activeView === 'directory'
                    ? 'bg-white text-black border-white shadow-lg shadow-indigo-500/10'
                    : 'bg-zinc-900 text-zinc-200 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <Grid className="w-4 h-4" />
                {t('toolsDir')}
              </button>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="text-[11px] uppercase tracking-[0.08em] text-zinc-500 font-semibold mb-1 block">
                  Lang
                </label>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white px-3 py-2 focus:outline-none focus:border-indigo-500/50"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSync}
                disabled={syncing}
                className={`h-11 w-12 flex items-center justify-center rounded-lg border transition-all sm:hidden ${
                  syncing
                    ? 'bg-zinc-800 border-zinc-800 text-zinc-400 cursor-not-allowed'
                    : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/20'
                }`}
                aria-label={t('checkUpdates')}
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {activeView === 'feed' && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { key: 'All', label: t('allUpdates') },
                  { key: 'AI Models', label: t('aiModels') },
                  { key: 'Mobile', label: t('mobile') },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => handleFilterChange(filter.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                      activeFilter === filter.key
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
              <p className="text-zinc-500 text-sm">{t('syncingDb')}</p>
            </div>
          )}

          {!loading && activeView === 'feed' && (
            <>
              <div className="mb-6 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 md:p-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-xs uppercase text-zinc-500 tracking-[0.08em] font-semibold">{t('trendingLeaderboard')}</p>
                    <span className="px-2 py-1 text-[11px] rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {t('autoCurated')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <span className="text-[11px] text-zinc-500 hidden sm:inline">{t('mostMentioned')}</span>
                    <select
                      value={trendingCategory}
                      onChange={(event) => setTrendingCategory(event.target.value)}
                      className="text-xs bg-zinc-900 border border-zinc-800 text-white rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500/50"
                    >
                      {[
                        'IT / Dev / AI tools',
                        'AI / DevOps tools',
                        'AI Models',
                        'AI Security',
                        'AI Productivity',
                      ].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => fetchTrending(trendingCategory)}
                      disabled={trendingLoading}
                      className={`text-[11px] px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-colors ${
                        trendingLoading
                          ? 'bg-zinc-800 border-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500'
                      }`}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${trendingLoading ? 'animate-spin' : ''}`} />
                      {trendingLoading ? 'Updating' : 'Gemini sync'}
                    </button>
                  </div>
                </div>
                {trendingLoading && (
                  <div className="text-sm text-zinc-500 mb-3">Refreshing live trends…</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {trendingDisplay.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => openDetail(tool, 'tool')}
                      className="group text-left bg-zinc-950/60 border border-zinc-800 hover:border-indigo-500/30 hover:bg-zinc-900/60 rounded-lg p-3 transition-all flex items-start gap-3"
                    >
                      <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 font-bold">
                        <span className="text-[11px]">{t('rank')} #{tool._rank}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-white group-hover:text-indigo-100 truncate">{tool.name}</p>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                            {tool.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mb-1 truncate">{tool.vendor || tool.category || 'Trending'}</p>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-200 border border-indigo-500/20">
                          {tool.version || 'Latest'}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-500/20">
                          {tool.pricing || 'Pricing'}
                        </span>
                        {typeof tool._usage === 'number' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-200 border border-purple-500/20">
                            {t('usage')}: {tool._usage}%
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 text-[10px] text-zinc-300/80 mb-1">
                        {(tool.platforms || tool.tags || []).slice(0, 3).map((platform) => (
                          <span
                            key={platform}
                              className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                        {typeof tool._usage === 'number' && (
                          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400"
                              style={{ width: `${tool._usage}%` }}
                            />
                          </div>
                        )}
                    </div>
                  </button>
                ))}
              </div>
                <p className="mt-3 text-[11px] text-zinc-500">Showing top 10 results.</p>
              </div>

              <div className="mb-6 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 md:p-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-xs uppercase text-zinc-500 tracking-[0.08em] font-semibold">{t('aiToolsSection')}</p>
                  <button
                    onClick={() => handleViewChange('directory')}
                    className="text-[11px] px-2 py-1 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {t('browseAll')}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  {spotlightTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} onClick={() => openDetail(tool, 'tool')} />
                  ))}
                </div>
              </div>

              {filteredReleases.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                  <p className="text-zinc-500">{t('noUpdates')}</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('All');
                    }}
                    className="mt-2 text-indigo-400 text-sm"
                  >
                    {t('clearFilters')}
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
                  {t('allTools')}
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
                  <p className="text-zinc-500">{t('noTools')}</p>
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
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
        isLocalMode={localAuthEnabled}
        onLocalAuth={handleLocalAuth}
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
