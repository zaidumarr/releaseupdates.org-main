export const StatsCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl flex-1 min-w-[140px]">
    <div className="flex justify-between items-start mb-2">
      <span className="text-zinc-500 text-[10px] md:text-xs font-medium uppercase tracking-wider">{title}</span>
      <Icon className="w-3 h-3 md:w-4 md:h-4 text-zinc-600" />
    </div>
    <div className="flex items-end gap-2">
      <span className="text-xl md:text-2xl font-bold text-white">{value}</span>
      {trend && <span className="text-xs text-emerald-400 mb-1">{trend}</span>}
    </div>
  </div>
);
