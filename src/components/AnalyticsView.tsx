import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid, 
  Legend 
} from "recharts";
import { BarChart3, TrendingUp, PieChart as PieIcon, Activity } from "lucide-react";

export function AnalyticsView() {
  const shareOfVoiceData = [
    { source: "The Star", reach: 3500 },
    { source: "Berita Harian", reach: 2900 },
    { source: "Malaysiakini", reach: 2400 },
    { source: "Sin Chew Daily", reach: 1800 },
    { source: "Astro Awani", reach: 2100 },
    { source: "Nan Malar", reach: 950 },
  ];

  const sentimentData = [
    { name: "Positive", value: 58, color: "#10b981" },
    { name: "Neutral", value: 27, color: "#3b82f6" },
    { name: "Critical", value: 15, color: "#f43f5e" },
  ];

  const sentimentVelocityData = [
    { day: "Mon", positive: 45, critical: 12 },
    { day: "Tue", positive: 52, critical: 15 },
    { day: "Wed", positive: 48, critical: 22 },
    { day: "Thu", positive: 65, critical: 10 },
    { day: "Fri", positive: 70, critical: 14 },
    { day: "Sat", positive: 55, critical: 8 },
    { day: "Sun", positive: 60, critical: 9 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span>Share of Voice & Sentiment Velocity Analytics</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Comprehensive analytical dashboards tracking Malaysian media channel dominance, public sentiment trends, and regional engagement metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Share of Voice Bar Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Malaysian Media Share of Voice (Reach in Thousands)</span>
            </h3>
            <span className="text-[11px] bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              Live BigQuery Stream
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shareOfVoiceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                <XAxis dataKey="source" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#f8fafc", fontSize: "12px" }}
                />
                <Bar dataKey="reach" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Breakdown Pie Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-500" />
              <span>Overall Sentiment Breakdown</span>
            </h3>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#f8fafc", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            {sentimentData.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block mr-1" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{item.name}</span>
                <span className="block font-bold text-xs text-slate-900 dark:text-slate-100">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sentiment Velocity Trend */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-600" />
            <span>Weekly Sentiment Velocity (Positive vs Critical Mentions)</span>
          </h3>
          <span className="text-[11px] bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
            Real-time Telemetry
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sentimentVelocityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#f8fafc", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="positive" name="Positive Mentions" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="critical" name="Critical Mentions" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
