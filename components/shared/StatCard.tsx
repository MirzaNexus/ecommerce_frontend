import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  colorClassName?: string; // For different icon/bg colors
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  colorClassName = "text-indigo-600 bg-indigo-50",
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-4 rounded-2xl ${colorClassName} transition-colors group-hover:bg-indigo-600 group-hover:text-white`}
        >
          <Icon size={24} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Live Updates
        </span>
      </div>
      <div>
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
          {value}
        </h3>
        <p className="text-sm font-bold text-slate-500 mt-1">{title}</p>
        {description && (
          <p className="text-[10px] text-slate-400 mt-2 font-medium">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
