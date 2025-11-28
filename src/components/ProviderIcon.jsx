const getColor = (str) => {
  const colors = [
    'bg-indigo-900/30 text-indigo-400 border-indigo-800',
    'bg-emerald-900/30 text-emerald-400 border-emerald-800',
    'bg-rose-900/30 text-rose-400 border-rose-800',
    'bg-amber-900/30 text-amber-400 border-amber-800',
    'bg-cyan-900/30 text-cyan-400 border-cyan-800',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const ProviderIcon = ({ provider, size = 'md' }) => {
  const classes = size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const styleClass = getColor(provider || 'Default');

  return (
    <div className={`${classes} ${styleClass} rounded-lg border shrink-0 flex items-center justify-center`}>
      <span className="font-bold text-sm">{provider?.[0] || 'A'}</span>
    </div>
  );
};
