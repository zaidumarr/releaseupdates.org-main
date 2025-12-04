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
import { TrendingRow } from './components/TrendingRow.jsx';
import { CATEGORIES } from './data/categories.js';
import { SEED_RELEASES } from './data/releases.js';
import { TOOLS_CATALOG } from './data/tools.js';
import { appId, auth, authToken, db, isFirebaseEnabled } from './services/firebase.js';
import { MockReleaseService } from './services/mockReleaseService.js';
import { getTrendingTools } from './services/trendingApi.js';
import { CURATED_TRENDING } from './data/trending.js';
import { ProviderIcon } from './components/ProviderIcon.jsx';

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
    searches: 'Searches',
    rank: 'Rank',
    aiToolsSection: 'AI Tools Spotlight',
    browseAll: 'Browse all',
    research: 'Research',
    liveViewNote: 'Live view refreshed on load',
    trackStack: 'Track My Stack',
    trackingFrom: 'Tracking updates from:',
    featuredRelease: 'Featured Release',
    fastestGrowing: 'Fastest Growing',
    readChangelog: 'Read Changelog',
    refreshingTrends: 'Refreshing live trends…',
    users: 'Users',
    heroTitleLead: "Don't miss the",
    heroTitleHighlight: 'next big update.',
    heroSubtitle:
      'The daily source of truth for software releases, changelogs, and features. Track 500+ tools in one dashboard.',
    heroSearchPlaceholder: 'Search for a tool (e.g. Cursor, Vercel, Figma)...',
    latest: 'Latest',
    tieredPlans: 'Tiered plans',
    researchSignificanceTool:
      '{tool} is a key player in the {category} space. Widely cited for {tag} capabilities.',
    researchSignificanceRelease:
      'This update significantly impacts workflows dependent on previous versions. Recommended for immediate review by DevOps and Engineering teams.',
    aboutTool: 'About this Tool',
    keyHighlights: 'Key Highlights:',
    researchSignificance: 'Research Significance',
    releaseImpact: 'Release Impact Analysis',
    latestUpdates: 'Latest Updates',
    updatedLabel: 'Updated',
    checkApi: 'Check API',
    noUpdatesFound: 'No recent updates found in database. Click "Check API" to fetch live data.',
    close: 'Close',
    visitWebsite: 'Visit Website',
    officialNotes: 'Official Notes',
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
    research: 'Аналитика',
    liveViewNote: 'Онлайн-лента обновляется при загрузке',
    trackStack: 'Отслеживать мой стек',
    trackingFrom: 'Обновления от:',
    featuredRelease: 'Главный релиз',
    fastestGrowing: 'Самый быстрый рост',
    readChangelog: 'Читать лог изменений',
    refreshingTrends: 'Обновляем тренды…',
    heroTitleLead: 'Не пропусти',
    heroTitleHighlight: 'следующее крупное обновление.',
    heroSubtitle:
      'Ежедневный источник правдивых данных о релизах, changelog и функциях. Отслеживаем 500+ инструментов в одной панели.',
    heroSearchPlaceholder: 'Искать инструмент (например, Cursor, Vercel, Figma)...',
    latest: 'Последний',
    tieredPlans: 'Тарифные планы',
    researchSignificanceTool:
      '{tool} — важный игрок в сфере {category}. Широко цитируется за возможности {tag}.',
    researchSignificanceRelease:
      'Это обновление влияет на процессы, зависящие от предыдущих версий. Рекомендуется срочный обзор командами DevOps и Engineering.',
    aboutTool: 'Об инструменте',
    keyHighlights: 'Ключевые особенности:',
    researchSignificance: 'Значимость для исследований',
    releaseImpact: 'Анализ влияния релиза',
    latestUpdates: 'Последние обновления',
    updatedLabel: 'Обновлено',
    checkApi: 'Проверить API',
    noUpdatesFound: 'Нет свежих обновлений в базе. Нажмите «Проверить API», чтобы получить данные.',
    close: 'Закрыть',
    visitWebsite: 'Перейти на сайт',
    officialNotes: 'Официальные заметки',
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
    research: 'Ricerca',
    liveViewNote: 'Vista live aggiornata al caricamento',
    trackStack: 'Traccia il mio stack',
    trackingFrom: 'Aggiornamenti da:',
    featuredRelease: 'Rilascio in evidenza',
    fastestGrowing: 'In crescita più rapida',
    readChangelog: 'Leggi changelog',
    refreshingTrends: 'Aggiornamento trend…',
    heroTitleLead: 'Non perdere il',
    heroTitleHighlight: 'prossimo grande update.',
    heroSubtitle:
      'La fonte quotidiana per versioni software, changelog e feature. Traccia oltre 500 tool in un’unica dashboard.',
    heroSearchPlaceholder: 'Cerca un tool (es. Cursor, Vercel, Figma)...',
    latest: 'Ultimo',
    tieredPlans: 'Piani a livelli',
    researchSignificanceTool: '{tool} è un protagonista nello spazio {category}. Citato spesso per le capacità di {tag}.',
    researchSignificanceRelease:
      "Questo update incide sui workflow basati su versioni precedenti. Si raccomanda una revisione immediata da DevOps e Engineering.",
    aboutTool: 'Informazioni su questo tool',
    keyHighlights: 'Punti chiave:',
    researchSignificance: 'Rilevanza per la ricerca',
    releaseImpact: 'Analisi di impatto del rilascio',
    latestUpdates: 'Ultimi aggiornamenti',
    updatedLabel: 'Aggiornato',
    checkApi: 'Controlla API',
    noUpdatesFound: 'Nessun aggiornamento recente nel database. Clicca “Controlla API” per ottenere dati live.',
    close: 'Chiudi',
    visitWebsite: 'Visita il sito',
    officialNotes: 'Note ufficiali',
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
    research: 'Recherche',
    liveViewNote: 'Vue en direct mise à jour au chargement',
    trackStack: 'Suivre mon stack',
    trackingFrom: 'Mises à jour de :',
    featuredRelease: 'Version mise en avant',
    fastestGrowing: 'Plus forte croissance',
    readChangelog: 'Lire le changelog',
    refreshingTrends: 'Actualisation des tendances…',
    heroTitleLead: 'Ne manquez pas',
    heroTitleHighlight: 'la prochaine mise à jour majeure.',
    heroSubtitle:
      'La source quotidienne pour les sorties logicielles, changelog et nouveautés. Suivez 500+ outils dans un seul tableau.',
    heroSearchPlaceholder: 'Rechercher un outil (ex. Cursor, Vercel, Figma)...',
    latest: 'Dernier',
    tieredPlans: 'Tarifs échelonnés',
    researchSignificanceTool:
      '{tool} est un acteur clé dans le domaine {category}. Souvent cité pour ses capacités {tag}.',
    researchSignificanceRelease:
      "Cette mise à jour impacte fortement les workflows dépendants des versions précédentes. Revue immédiate recommandée par les équipes DevOps et Engineering.",
    aboutTool: 'À propos de cet outil',
    keyHighlights: 'Points clés :',
    researchSignificance: 'Importance pour la recherche',
    releaseImpact: 'Analyse d’impact du release',
    latestUpdates: 'Dernières mises à jour',
    updatedLabel: 'Mis à jour',
    checkApi: 'Vérifier l’API',
    noUpdatesFound: 'Aucune mise à jour récente. Cliquez sur « Vérifier l’API » pour récupérer des données.',
    close: 'Fermer',
    visitWebsite: 'Visiter le site',
    officialNotes: 'Notes officielles',
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
    research: 'Investigación',
    liveViewNote: 'Vista en vivo actualizada al cargar',
    trackStack: 'Seguir mi stack',
    trackingFrom: 'Actualizaciones de:',
    featuredRelease: 'Lanzamiento destacado',
    fastestGrowing: 'Mayor crecimiento',
    readChangelog: 'Leer changelog',
    refreshingTrends: 'Actualizando tendencias…',
    heroTitleLead: 'No te pierdas la',
    heroTitleHighlight: 'próxima gran actualización.',
    heroSubtitle:
      'La fuente diaria para lanzamientos, changelogs y nuevas funciones. Sigue 500+ herramientas en un solo panel.',
    heroSearchPlaceholder: 'Busca una herramienta (ej. Cursor, Vercel, Figma)...',
    latest: 'Último',
    tieredPlans: 'Planes escalonados',
    researchSignificanceTool:
      '{tool} es un actor clave en el espacio de {category}. Muy citado por sus capacidades de {tag}.',
    researchSignificanceRelease:
      'Esta actualización impacta los flujos de trabajo que dependen de versiones anteriores. Revisión inmediata recomendada por DevOps e Ingeniería.',
    aboutTool: 'Acerca de esta herramienta',
    keyHighlights: 'Puntos clave:',
    researchSignificance: 'Importancia en investigación',
    releaseImpact: 'Análisis de impacto del lanzamiento',
    latestUpdates: 'Últimas actualizaciones',
    updatedLabel: 'Actualizado',
    checkApi: 'Consultar API',
    noUpdatesFound: 'No hay actualizaciones recientes. Haz clic en “Consultar API” para traer datos en vivo.',
    close: 'Cerrar',
    visitWebsite: 'Visitar sitio',
    officialNotes: 'Notas oficiales',
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
    research: 'Pesquisa',
    liveViewNote: 'Visão ao vivo atualizada ao carregar',
    trackStack: 'Acompanhar meu stack',
    trackingFrom: 'Atualizações de:',
    featuredRelease: 'Lançamento em destaque',
    fastestGrowing: 'Que mais cresce',
    readChangelog: 'Ler changelog',
    refreshingTrends: 'Atualizando tendências…',
    heroTitleLead: 'Não perca a',
    heroTitleHighlight: 'próxima grande atualização.',
    heroSubtitle:
      'A fonte diária para lançamentos de software, changelogs e novidades. Acompanhe 500+ ferramentas em um painel.',
    heroSearchPlaceholder: 'Busque uma ferramenta (ex. Cursor, Vercel, Figma)...',
    latest: 'Mais recente',
    tieredPlans: 'Planos escalonados',
    researchSignificanceTool:
      '{tool} é um ator importante em {category}. Amplamente citado pelas capacidades de {tag}.',
    researchSignificanceRelease:
      'Esta atualização afeta fluxos dependentes de versões anteriores. Revisão imediata recomendada por DevOps e Engenharia.',
    aboutTool: 'Sobre esta ferramenta',
    keyHighlights: 'Destaques:',
    researchSignificance: 'Relevância para pesquisa',
    releaseImpact: 'Análise de impacto do release',
    latestUpdates: 'Últimas atualizações',
    updatedLabel: 'Atualizado',
    checkApi: 'Verificar API',
    noUpdatesFound: 'Nenhuma atualização recente. Clique em “Verificar API” para buscar dados ao vivo.',
    close: 'Fechar',
    visitWebsite: 'Visitar site',
    officialNotes: 'Notas oficiais',
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
    research: '研究',
    liveViewNote: '加载时刷新实时视图',
    trackStack: '跟踪我的技术栈',
    trackingFrom: '更新来源：',
    featuredRelease: '精选发布',
    fastestGrowing: '增速最快',
    readChangelog: '查看更新日志',
    refreshingTrends: '正在刷新趋势…',
    heroTitleLead: '不要错过',
    heroTitleHighlight: '下一个重要更新。',
    heroSubtitle: '每日获取软件发布、更新日志和新功能。一个仪表盘跟踪 500+ 工具。',
    heroSearchPlaceholder: '搜索工具（如 Cursor, Vercel, Figma）...',
    latest: '最新',
    tieredPlans: '分级套餐',
    researchSignificanceTool: '{tool} 在 {category} 领域是关键参与者，经常因 {tag} 能力被引用。',
    researchSignificanceRelease: '此更新会影响依赖旧版本的工作流，建议 DevOps 与工程团队立即审核。',
    aboutTool: '关于此工具',
    keyHighlights: '关键亮点：',
    researchSignificance: '研究意义',
    releaseImpact: '发布影响分析',
    latestUpdates: '最新更新',
    updatedLabel: '已更新',
    checkApi: '检查 API',
    noUpdatesFound: '数据库中没有最近更新。点击“检查 API”获取实时数据。',
    close: '关闭',
    visitWebsite: '访问网站',
    officialNotes: '官方说明',
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
    research: 'リサーチ',
    liveViewNote: '読み込み時にライブを更新',
    trackStack: '自分のスタックを追跡',
    trackingFrom: '更新元:',
    featuredRelease: '注目リリース',
    fastestGrowing: '最速で伸びている',
    readChangelog: '変更履歴を読む',
    refreshingTrends: 'トレンドを更新中…',
    heroTitleLead: '次の',
    heroTitleHighlight: '大きなアップデートを見逃さないで。',
    heroSubtitle: 'ソフトウェアリリースやchangelogを毎日確認。500以上のツールを1つのダッシュボードで追跡。',
    heroSearchPlaceholder: 'ツールを検索 (例: Cursor, Vercel, Figma)...',
    latest: '最新',
    tieredPlans: '階層プラン',
    researchSignificanceTool: '{tool} は {category} 分野の重要プレイヤーで、{tag} 機能でよく引用されます。',
    researchSignificanceRelease: 'このアップデートは既存バージョンに依存するワークフローに影響します。DevOps/Engineering が早急に確認してください。',
    aboutTool: 'このツールについて',
    keyHighlights: '主なポイント:',
    researchSignificance: 'リサーチ上の重要性',
    releaseImpact: 'リリース影響分析',
    latestUpdates: '最新の更新',
    updatedLabel: '更新',
    checkApi: 'APIをチェック',
    noUpdatesFound: '最近の更新はありません。「APIをチェック」を押して最新データを取得してください。',
    close: '閉じる',
    visitWebsite: '公式サイト',
    officialNotes: '公式ノート',
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [activeView, setActiveView] = useState('home');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const localAuthEnabled = true;
  const [language, setLanguage] = useState('en');
  const [trendingTools, setTrendingTools] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingCategory, setTrendingCategory] = useState('IT / Dev / AI tools');
  const [trendingMeta, setTrendingMeta] = useState({ lastFetched: null, source: 'fallback' });
  const [stackVendors, setStackVendors] = useState(new Set());
  const [sentimentVotes, setSentimentVotes] = useState({});
  const [localUsers, setLocalUsers] = useState([]);

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
    try {
      const stored = localStorage.getItem('releasehub.localUsers');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setLocalUsers(parsed.slice(0, 50));
        }
      }
    } catch (error) {
      console.error('Failed to load local users', error);
    }
  }, []);

  const persistLocalUsers = (users) => {
    setLocalUsers(users);
    try {
      localStorage.setItem('releasehub.localUsers', JSON.stringify(users.slice(0, 50)));
    } catch (error) {
      console.error('Failed to persist local users', error);
    }
  };

  useEffect(() => {
    // Seed with curated, then try live Gemini fetch
    setTrendingTools(
      CURATED_TRENDING.map((tool, index) => ({
        ...tool,
        id: tool.id || `${tool.name}-${index}`,
        _rank: index + 1,
      })),
    );
    setTrendingMeta({ lastFetched: null, source: 'curated' });
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

  const LOGO_HOSTS = {
    OpenAI: 'openai.com',
    Anthropic: 'anthropic.com',
    Google: 'google.com',
    Microsoft: 'microsoft.com',
    Amazon: 'amazon.com',
    Anysphere: 'cursor.sh',
    Replit: 'replit.com',
    Perplexity: 'perplexity.ai',
    Stripe: 'stripe.com',
    Vercel: 'vercel.com',
  };

  const getLogoUrl = (item) => {
    if (item?.logoUrl) return item.logoUrl;
    const hostFromMap = LOGO_HOSTS[item?.vendor] || LOGO_HOSTS[item?.name];
    if (hostFromMap) {
      return `https://logo.clearbit.com/${hostFromMap}`;
    }
    if (item?.website || item?.url) {
      try {
        const host = new URL(item.website || item.url).hostname;
        return `https://logo.clearbit.com/${host}`;
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const localTrendingAll = useMemo(
    () =>
      CURATED_TRENDING.map((tool, index) => ({
        ...tool,
        id: tool.id || `${tool.name}-${index}`,
        _rank: index + 1,
        _usage: Math.floor(Math.random() * 90) + 10,
        users: typeof tool.users === 'number' ? tool.users : Math.floor(50_000 + Math.random() * 950_000),
        history: Array.from({ length: 10 }, (_, step) => 20 + Math.random() * 80 + step * 2),
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
    if (view === 'home') {
      setActiveFilter('All');
    }
    setMobileMenuOpen(false);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setMobileMenuOpen(false);
  };

  const CATEGORY_LABELS = {
    en: {
      chatbots: 'Chatbots & Assistants',
      search: 'Search & Research',
      coding: 'Coding & Dev Tools',
      image: 'Image Gen & Design',
      media: 'Video, Audio & Media',
      productivity: 'Productivity & Knowledge',
      automation: 'Automation & Agents',
      data: 'Data & Enterprise',
      health: 'HealthTech',
      product: 'Product & Strategy',
      marketing: 'Marketing',
      browsers: 'Browsers',
      mobile: 'Operating Systems',
    },
    ru: {
      chatbots: 'Чатботы и ассистенты',
      search: 'Поиск и аналитика',
      coding: 'Разработка и Dev Tools',
      image: 'Генерация изображений',
      media: 'Видео, аудио и медиа',
      productivity: 'Продуктивность и знания',
      automation: 'Автоматизация и агенты',
      data: 'Данные и Enterprise',
      health: 'Медтех',
      product: 'Продукт и стратегия',
      marketing: 'Маркетинг',
      browsers: 'Браузеры',
      mobile: 'Операционные системы',
    },
    it: {
      chatbots: 'Chatbot e assistenti',
      search: 'Ricerca',
      coding: 'Coding e Dev Tools',
      image: 'Immagini e Design',
      media: 'Video, Audio e Media',
      productivity: 'Produttività e Knowledge',
      automation: 'Automazione e Agent',
      data: 'Dati e Enterprise',
      health: 'HealthTech',
      product: 'Prodotto e Strategia',
      marketing: 'Marketing',
      browsers: 'Browser',
      mobile: 'Sistemi operativi',
    },
    fr: {
      chatbots: 'Chatbots et Assistants',
      search: 'Recherche',
      coding: 'Dev et Outils',
      image: 'Génération d’images',
      media: 'Vidéo, Audio et Media',
      productivity: 'Productivité et Connaissance',
      automation: 'Automatisation et Agents',
      data: 'Données et Entreprise',
      health: 'HealthTech',
      product: 'Produit et Stratégie',
      marketing: 'Marketing',
      browsers: 'Navigateurs',
      mobile: 'Systèmes d’exploitation',
    },
    es: {
      chatbots: 'Chatbots y Asistentes',
      search: 'Búsqueda e Investigación',
      coding: 'Coding y Dev Tools',
      image: 'Imagen y Diseño',
      media: 'Video, Audio y Media',
      productivity: 'Productividad y Conocimiento',
      automation: 'Automatización y Agentes',
      data: 'Datos y Empresa',
      health: 'HealthTech',
      product: 'Producto y Estrategia',
      marketing: 'Marketing',
      browsers: 'Navegadores',
      mobile: 'Sistemas operativos',
    },
    pt: {
      chatbots: 'Chatbots e Assistentes',
      search: 'Busca e Pesquisa',
      coding: 'Coding e Dev Tools',
      image: 'Imagens e Design',
      media: 'Vídeo, Áudio e Media',
      productivity: 'Produtividade e Conhecimento',
      automation: 'Automação e Agentes',
      data: 'Dados e Enterprise',
      health: 'HealthTech',
      product: 'Produto e Estratégia',
      marketing: 'Marketing',
      browsers: 'Navegadores',
      mobile: 'Sistemas Operacionais',
    },
    zh: {
      chatbots: '聊天机器人与助手',
      search: '搜索与研究',
      coding: '编程与开发工具',
      image: '图像生成与设计',
      media: '视频、音频与媒体',
      productivity: '效率与知识',
      automation: '自动化与智能体',
      data: '数据与企业',
      health: '医疗科技',
      product: '产品与战略',
      marketing: '营销',
      browsers: '浏览器',
      mobile: '操作系统',
    },
    ja: {
      chatbots: 'チャットボット・アシスタント',
      search: '検索・リサーチ',
      coding: 'コーディング・Devツール',
      image: '画像生成・デザイン',
      media: '動画・音声・メディア',
      productivity: '生産性・ナレッジ',
      automation: '自動化・エージェント',
      data: 'データ・エンタープライズ',
      health: 'ヘルステック',
      product: 'プロダクトと戦略',
      marketing: 'マーケティング',
      browsers: 'ブラウザ',
      mobile: 'オペレーティングシステム',
    },
  };

  const getCategoryLabel = (key) => {
    const labels = CATEGORY_LABELS[language] || CATEGORY_LABELS.en;
    return labels[key] || CATEGORIES[key]?.label?.split('&')[0]?.trim() || key;
  };

  const handleCategorySelect = (category) => {
    if (category === 'product') {
      setActiveView('pm');
    } else {
      setActiveView('directory');
    }
    handleFilterChange(category);
  };

  const handleAllTools = () => {
    setActiveView('directory');
    setActiveFilter('All');
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
      _usage:
        typeof tool._usage === 'number' || typeof tool.usage === 'number'
          ? tool._usage ?? tool.usage
          : Math.floor(Math.random() * 90) + 10,
      users:
        typeof tool.users === 'number'
          ? tool.users
          : typeof tool.userCount === 'number'
            ? tool.userCount
            : typeof tool.usersCount === 'number'
              ? tool.usersCount
              : Math.floor(50_000 + Math.random() * 950_000),
      history:
        tool.history && Array.isArray(tool.history) && tool.history.length >= 2
          ? tool.history
          : Array.from({ length: 10 }, (_, step) => 20 + Math.random() * 80 + step * 2),
    }));

  const formatTrendingUpdated = () => {
    if (!trendingMeta?.lastFetched) return 'Not updated yet';
    const parsed = new Date(trendingMeta.lastFetched);
    if (Number.isNaN(parsed.getTime())) return 'Last updated: unknown';
    const diffMs = Date.now() - parsed.getTime();
    if (diffMs < 60_000) return 'Updated just now';
    const minutes = Math.floor(diffMs / 60_000);
    if (minutes < 60) return `Updated ${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Updated ${hours} hour${hours === 1 ? '' : 's'} ago`;
    const days = Math.floor(hours / 24);
    return `Updated ${days} day${days === 1 ? '' : 's'} ago`;
  };

  const fetchTrending = async (category = trendingCategory) => {
    setTrendingLoading(true);
    try {
      const { tools, lastFetched, source } = await getTrendingTools(category);
      if (Array.isArray(tools) && tools.length > 0) {
        setTrendingTools(decorateTrending(tools));
        setTrendingMeta({ lastFetched, source });
      } else {
        setTrendingTools(localTrendingAll);
        setTrendingMeta({ lastFetched: null, source: 'fallback' });
      }
    } catch (error) {
      console.error('Failed to load trending tools, using fallback.', error);
      setTrendingTools(localTrendingAll);
      setTrendingMeta({ lastFetched: null, source: 'fallback' });
    } finally {
      setTrendingLoading(false);
    }
  };

  const fallbackToLocal = () => {
    setUser({ isAnonymous: true });
    seedLocalData();
    setLoading(false);
  };

  const toggleStackVendor = (vendor) => {
    setStackVendors((prev) => {
      const next = new Set(prev);
      if (next.has(vendor)) {
        next.delete(vendor);
      } else {
        next.add(vendor);
      }
      return next;
    });
  };

  const voteSentiment = (id, type) => {
    setSentimentVotes((prev) => {
      const current = prev[id] || { hype: 0, meh: 0 };
      const next = {
        hype: current.hype + (type === 'hype' ? 1 : 0),
        meh: current.meh + (type === 'meh' ? 1 : 0),
      };
      return { ...prev, [id]: next };
    });
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

  const handleLocalAuth = async (email, password, name = '', mode = 'login') => {
    const MAX_USERS = 50;
    const normalizedEmail = (email || '').toLowerCase();
    if (!normalizedEmail || !password) throw new Error('Missing credentials');

    // Seeded test user still works
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

    const existing = localUsers.find((entry) => entry.email === normalizedEmail);

    if (mode === 'signup') {
      if (localUsers.length >= MAX_USERS) {
        throw new Error('Local signup limit reached (50 users).');
      }
      if (existing) {
        throw new Error('Email already exists.');
      }
      const newUser = {
        email: normalizedEmail,
        password,
        displayName: name || normalizedEmail.split('@')[0],
      };
      const nextUsers = [...localUsers, newUser];
      persistLocalUsers(nextUsers);
      setUser({
        isAnonymous: false,
        displayName: newUser.displayName,
        email: newUser.email,
        isLocal: true,
      });
    } else {
      if (!existing || existing.password !== password) {
        throw new Error('Invalid email or password.');
      }
      setUser({
        isAnonymous: false,
        displayName: existing.displayName,
        email: existing.email,
        isLocal: true,
      });
    }

    setIsAuthModalOpen(false);
    setShowUserMenu(false);
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
        const matchesStack = stackVendors.size === 0 || stackVendors.has(release.provider);
        const matchesFilter =
          activeFilter === 'All' ||
          (activeFilter === 'AI Models' && ['OpenAI', 'Google', 'Anthropic'].includes(release.provider)) ||
          (['Mobile', 'mobile'].includes(activeFilter) &&
            ['Apple', 'Android', 'Microsoft', 'Google', 'Canonical', 'Red Hat', 'Debian', 'Fedora', 'Samsung'].includes(
              release.provider,
            ));
        return matchesSearch && matchesFilter && matchesStack;
      }),
    [releases, searchQuery, activeFilter, stackVendors],
  );

  const filteredTools = useMemo(
    () =>
      TOOLS_CATALOG.filter((tool) => {
        const normalizedName = tool.name?.toLowerCase() ?? '';
        const normalizedVendor = tool.vendor?.toLowerCase() ?? '';
        const normalizedTags = (tool.tags ?? []).map((tag) => tag.toLowerCase());
        const normalizedCategoryLabel = getCategoryLabel(tool.category)?.toLowerCase() ?? '';
        const normalizedDescription = tool.description?.toLowerCase() ?? '';
        const normalizedPlatforms = (tool.platforms ?? []).map((p) => p.toLowerCase());
        const normalizedQuery = searchQuery.toLowerCase();

        const matchesSearch =
          normalizedName.includes(normalizedQuery) ||
          normalizedVendor.includes(normalizedQuery) ||
          normalizedTags.some((tag) => tag.includes(normalizedQuery)) ||
          normalizedCategoryLabel.includes(normalizedQuery) ||
          normalizedDescription.includes(normalizedQuery) ||
          normalizedPlatforms.some((platform) => platform.includes(normalizedQuery));
        const matchesCategory = activeFilter === 'All' || tool.category === activeFilter;
        const matchesStack = stackVendors.size === 0 || stackVendors.has(tool.vendor);
        return matchesSearch && matchesCategory && matchesStack;
      }),
    [searchQuery, activeFilter, stackVendors],
  );

  const trendingAll = trendingTools.length ? trendingTools : localTrendingAll;
  const trendingDisplay = trendingAll.slice(0, 10);

  const tickerItems = useMemo(() => {
    if (releases.length > 0) {
      return releases.slice(0, 6).map((release) => ({
        title: release.title || `${release.provider} update`,
        time: release.date ? new Date(release.date).toLocaleDateString() : 'Just now',
      }));
    }
    return [
      { title: 'Stripe API v2024-11 released', time: 'Live' },
      { title: 'Tailwind CSS v4.0 Alpha announced', time: 'Today' },
      { title: 'Supabase adds Vector Search', time: 'Today' },
    ];
  }, [releases]);

  const liveUpdates = useMemo(() => {
    if (releases.length > 0) {
      return releases.slice(0, 6).map((release) => ({
        id: release.id || `${release.provider}-${release.title}`,
        title: release.title || release.product || 'Release',
        provider: release.provider || release.product || 'Vendor',
        date: release.date ? new Date(release.date).toLocaleDateString() : 'Today',
      }));
    }
    return [
      { id: 'lu1', title: 'GPT-4o mini brings 2x speed boost', provider: 'OpenAI', date: 'Today' },
      { id: 'lu2', title: 'Claude Code ships repo-aware terminal', provider: 'Anthropic', date: 'Today' },
      { id: 'lu3', title: 'Cursor Composer rolls out auto-plans', provider: 'Anysphere', date: 'Today' },
      { id: 'lu4', title: 'Supabase adds vector search', provider: 'Supabase', date: 'Today' },
      { id: 'lu5', title: 'LangChain launches agents toolkit', provider: 'LangChain', date: 'Today' },
      { id: 'lu6', title: 'Notion ships native charts', provider: 'Notion', date: 'Today' },
    ];
  }, [releases]);

  const featuredRelease = useMemo(() => releases[0] || tickerItems[0], [releases, tickerItems]);
  const fastestTool = trendingDisplay[0];

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
            onClick={() => handleViewChange('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-bold text-white tracking-tight hidden sm:block">ReleaseHub</span>
          </div>
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
              <SidebarItem
                icon={Layout}
                label={t('releaseFeed')}
                active={activeView === 'home'}
                onClick={() => handleViewChange('home')}
              />
              <SidebarItem
                icon={Grid}
                label={t('toolsDir')}
                active={activeView === 'directory' || activeView === 'pm'}
                count={TOOLS_CATALOG.length}
                onClick={() => handleViewChange('directory')}
              />
            </div>
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                {t('research')}
              </h3>
              {Object.entries(CATEGORIES).map(([key, category]) => (
                <SidebarItem
                  key={key}
                  icon={category.icon}
                  label={getCategoryLabel(key)}
                  active={activeFilter === key}
                  onClick={() => handleCategorySelect(key)}
                />
              ))}
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
          {activeView === 'home' && (
            <div className="mb-8 space-y-6">
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                <div className="text-xs text-slate-500 uppercase tracking-[0.08em] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  {t('liveViewNote')}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {liveUpdates.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur shadow-inner shadow-black/20"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-semibold text-white truncate">{item.title}</span>
                        <span className="text-[11px] text-slate-400 shrink-0">{item.date}</span>
                      </div>
                      <p className="text-xs text-slate-400">{item.provider}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 flex flex-col justify-center">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                    {t('heroTitleLead')}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {t('heroTitleHighlight')}
                    </span>
                  </h1>
                  <p className="text-slate-400 text-lg mb-6 max-w-xl">{t('heroSubtitle')}</p>

                    <div className="relative max-w-xl group mb-5">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-6 w-6 text-slate-500 group-focus-within:text-blue-500 transition" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-2xl"
                        placeholder={t('heroSearchPlaceholder')}
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                      />
                    </div>

                    <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-xs uppercase tracking-[0.08em] text-slate-400 font-semibold">{t('trackStack')}</span>
                        <div className="flex gap-2 flex-wrap">
                          {['OpenAI', 'Anthropic', 'Google', 'Microsoft', 'Amazon', 'Replit', 'Vercel', 'Stripe'].map((vendor) => {
                            const active = stackVendors.has(vendor);
                            return (
                              <button
                                key={vendor}
                                onClick={() => toggleStackVendor(vendor)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                  active
                                    ? 'bg-white text-black border-white shadow'
                                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                                }`}
                              >
                                {vendor}
                              </button>
                            );
                          })}
                          {stackVendors.size > 0 && (
                            <button
                              onClick={() => setStackVendors(new Set())}
                              className="px-3 py-1.5 rounded-full text-xs font-medium border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 opacity-70 text-slate-400 flex-wrap">
                        <span>{t('trackingFrom')}</span>
                        <div className="flex gap-3 grayscale hover:grayscale-0 transition duration-500 flex-wrap">
                          <span className="font-bold text-white">Google</span>
                          <span className="font-bold text-white">Microsoft</span>
                          <span className="font-bold text-white">AWS</span>
                          <span className="font-bold text-white">OpenAI</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 grid gap-4">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-1 border border-slate-700 hover:border-slate-500 transition group cursor-pointer">
                      <div className="bg-slate-900 rounded-xl p-6 h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10" />

                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-blue-500/10 text-blue-400 text-[11px] font-bold px-2 py-1 rounded border border-blue-500/20 uppercase tracking-wider">
                            {t('featuredRelease')}
                          </span>
                          <span className="text-slate-400 text-xs">{featuredRelease?.date ? new Date(featuredRelease.date).toLocaleDateString() : 'Today'}</span>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xl">
                            {(featuredRelease?.provider || 'N')[0]}
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg truncate">
                              {featuredRelease?.product || featuredRelease?.name || 'Spotlight Release'}
                            </h3>
                            <p className="text-slate-400 text-sm truncate">
                              {featuredRelease?.title || featuredRelease?.description || 'Fresh drop from the ecosystem.'}
                            </p>
                          </div>
                        </div>

                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                          {featuredRelease?.description || 'Stay ahead with real-time release intel sourced from vendors and live feeds.'}
                        </p>
                        <div className="text-blue-400 text-sm font-bold group-hover:translate-x-1 transition flex items-center gap-1">
                          {t('readChangelog')} →
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Dev Sentiment</div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => voteSentiment(featuredRelease?.id || 'featured', 'hype')}
                              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-orange-500/50 hover:bg-orange-500/10 transition"
                            >
                              <span className="text-sm group-hover:scale-110 transition">🔥</span>
                              <span className="text-xs font-bold text-slate-400 group-hover:text-orange-400">
                                {(sentimentVotes[featuredRelease?.id || 'featured']?.hype || 420)}
                              </span>
                            </button>

                            <button
                              onClick={() => voteSentiment(featuredRelease?.id || 'featured', 'meh')}
                              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition"
                            >
                              <span className="text-sm group-hover:scale-110 transition">🤔</span>
                              <span className="text-xs font-bold text-slate-400 group-hover:text-purple-400">
                                {(sentimentVotes[featuredRelease?.id || 'featured']?.meh || 12)}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-slate-500 text-[11px] uppercase font-bold mb-1">{t('fastestGrowing')}</div>
                        <div className="text-white font-bold text-lg">{fastestTool?.name || 'Cursor'}</div>
                        <div className="text-emerald-400 text-sm flex items-center gap-1">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          +{fastestTool?._usage || 24}% mentions
                        </div>
                      </div>
                      <div className="flex items-end gap-1 h-10">
                        <div className="w-2 bg-slate-700 h-4 rounded-t" />
                        <div className="w-2 bg-slate-700 h-6 rounded-t" />
                        <div className="w-2 bg-slate-700 h-5 rounded-t" />
                        <div className="w-2 bg-emerald-500 h-10 rounded-t" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {activeView === 'home' && (
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
          )}

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
                onClick={() => handleViewChange('home')}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  activeView === 'home'
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
                  { key: 'mobile', label: t('mobile') },
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

          {!loading && activeView === 'home' && (
            <>
              <div className="mb-8 flex lg:justify-end">
                <div className="w-full lg:max-w-[640px] bg-zinc-900/20 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-zinc-900/80 backdrop-blur-md p-4 border-b border-zinc-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-sm uppercase tracking-wider font-bold text-zinc-400">
                        {t('trendingLeaderboard')}
                      </h2>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                      </span>
                      <span className="text-[11px] text-zinc-500 hidden sm:inline">{formatTrendingUpdated()}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <span className="px-2 py-1 text-[11px] rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                        Source: {trendingMeta.source || 'unknown'}
                      </span>
                      <select
                        value={trendingCategory}
                        onChange={(event) => setTrendingCategory(event.target.value)}
                        className="text-xs bg-black/50 border border-zinc-700 text-zinc-300 rounded-md px-2 py-1.5 focus:outline-none focus:border-blue-500 focus:text-white transition-colors"
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
                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                        title="Refresh Trends"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${trendingLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-zinc-800/50 bg-black/20">
                    {trendingLoading ? (
                      <div className="p-8 text-center text-sm text-zinc-500 animate-pulse">{t('refreshingTrends')}</div>
                    ) : (
                      trendingDisplay.map((tool, index) => (
                        <TrendingRow key={tool.id} tool={tool} rank={index + 1} t={t} onClick={() => openDetail(tool, 'tool')} />
                      ))
                    )}
                  </div>

                  <div className="p-3 bg-zinc-900/50 border-t border-zinc-800 text-center">
                    <button
                      onClick={() => handleViewChange('directory')}
                      className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {t('browseAll')} →
                    </button>
                  </div>
                </div>
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
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      t={t}
                      language={language}
                      categoryLabel={getCategoryLabel(tool.category)}
                      onClick={() => openDetail(tool, 'tool')}
                    />
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

          {!loading && (activeView === 'directory' || activeView === 'pm') && (
            <>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {activeView === 'pm' ? 'Product & Strategy tools' : t('toolsDirectory')}
                </h2>
                <p className="text-zinc-500 text-sm">
                  {activeView === 'pm'
                    ? 'Curated stack for product managers, strategy, design, analytics, and AI disruptors.'
                    : t('directorySubtitle', TOOLS_CATALOG.length)}
                </p>
              </div>
              <div className="mb-4 max-w-xl relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder={t('search')}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={handleAllTools}
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
                    onClick={() => handleCategorySelect(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                      activeFilter === key
                        ? `${category.bg} ${category.color} ${category.border}`
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {getCategoryLabel(key)}
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
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      t={t}
                      categoryLabel={getCategoryLabel(tool.category)}
                      onClick={() => openDetail(tool, 'tool')}
                    />
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
          categoryLabel={selectedItem?.category ? getCategoryLabel(selectedItem.category) : undefined}
          t={t}
          language={language}
          onClose={() => {
            setSelectedItem(null);
            setSelectedType(null);
          }}
        />
      )}
    </div>
  );
}
