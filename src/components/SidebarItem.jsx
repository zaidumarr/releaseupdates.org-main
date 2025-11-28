export const SidebarItem = ({ icon: Icon, label, active, onClick, count }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
      active
        ? 'bg-zinc-800 text-white font-medium shadow-sm ring-1 ring-white/10'
        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon className={`w-4 h-4 ${active ? 'text-indigo-400' : 'text-zinc-500'}`} />
      <span>{label}</span>
    </div>
    {count !== undefined && (
      <span className="text-xs bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-800">{count}</span>
    )}
  </button>
);
