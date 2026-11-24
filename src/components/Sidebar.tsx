import { 
  Newspaper, 
  Sparkles, 
  CloudRain, 
  ShieldCheck, 
  BarChart3, 
  Layers,
  Award
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: "feed", label: "Media Feed & News", icon: Newspaper, desc: "Live Malaysian News & Social Trends" },
    { id: "lab", label: "AI Sentiment Lab", icon: Sparkles, desc: "Gemini AI PR & Entity Analysis" },
    { id: "amec", label: "AMEC / AMAC Principles", icon: Award, desc: "Integrated Evaluation Framework" },
    { id: "cloud", label: "Cloud Pub/Sub & Infra", icon: CloudRain, desc: "BigQuery & Cloud SQL Monitoring" },
    { id: "rbac", label: "OAuth & Security RBAC", icon: ShieldCheck, desc: "Access Control & Audit Logs" },
    { id: "analytics", label: "Share of Voice Analytics", icon: BarChart3, desc: "Metrics & Sentiment Velocity" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 select-none transition-colors">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Layers className="w-3.5 h-3.5" />
          <span>Platform Modules</span>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-start gap-3 px-3.5 py-3 rounded-xl text-left transition-all group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"}`} />
              <div>
                <div className="text-xs font-medium leading-tight">{item.label}</div>
                <div className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? "text-blue-100" : "text-slate-400 dark:text-slate-500"}`}>
                  {item.desc}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Malaysian market badge */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
        <div className="rounded-xl p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-slate-100 mb-1">
            <span>🇲🇾 Malaysia Region</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Kuala Lumpur Edge Node connected to BigQuery analytics warehouse.
          </p>
        </div>
      </div>
    </aside>
  );
}
