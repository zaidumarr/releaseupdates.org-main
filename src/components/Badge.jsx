const BADGE_STYLES = {
  feature: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  fix: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  security: 'bg-red-500/10 text-red-400 border-red-500/20',
  announcement: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  default: 'bg-zinc-800 text-zinc-400 border-zinc-700',
};

export const Badge = ({ type, children }) => {
  const style = BADGE_STYLES[type] || BADGE_STYLES.default;
  return (
    <span className={`px-2 py-0.5 text-[10px] md:text-xs font-medium rounded-full border ${style}`}>
      {children}
    </span>
  );
};
