import { useState, useEffect } from "react";
import { 
  Bell, 
  Globe, 
  Shield, 
  Sun, 
  Moon, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  Radio
} from "lucide-react";
import { UserRole, LanguageCode, SystemAlert } from "../types";

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({
  currentRole,
  onRoleChange,
  language,
  onLanguageChange,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  useEffect(() => {
    fetch("/api/alerts")
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(err => console.error("Failed to fetch alerts", err));
  }, []);

  const unreadCount = alerts.filter(a => !a.read).length;

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`/api/alerts/${id}/read`, { method: "POST" });
      setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
    } catch (err) {
      console.error(err);
    }
  };

  const roleColors: Record<UserRole, string> = {
    "PR Director": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    "Senior Analyst": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    "Content Editor": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    "System Admin": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-slate-100 text-base tracking-tight flex items-center gap-2">
              Malaysian Media Pulse
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                MY-CORE v3.2
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              AI Intelligence & Cloud Pub/Sub Pipeline
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Live Cloud Status Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Cloud SQL & Pub/Sub Live</span>
        </div>

        {/* Language selector */}
        <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 text-xs">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
            className="bg-transparent text-slate-700 dark:text-slate-200 font-medium focus:outline-none pr-2 cursor-pointer"
          >
            <option value="en" className="dark:bg-slate-900">EN (English)</option>
            <option value="ms" className="dark:bg-slate-900">BM (Bahasa Melayu)</option>
            <option value="zh" className="dark:bg-slate-900">中文 (Mandarin)</option>
            <option value="ta" className="dark:bg-slate-900">தமிழ் (Tamil)</option>
          </select>
        </div>

        {/* Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${roleColors[currentRole]}`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{currentRole}</span>
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Select RBAC Role
              </div>
              {(["PR Director", "Senior Analyst", "Content Editor", "System Admin"] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                    currentRole === role ? "font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span>{role}</span>
                  {currentRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
            title="System Alerts"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {showAlerts && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Real-time System & Media Alerts
                </span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500 font-medium">
                  {unreadCount} unread
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {alerts.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">No active alerts</div>
                ) : (
                  alerts.map(alert => (
                    <div
                      key={alert.id}
                      className={`p-3 text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                        !alert.read ? "bg-blue-50/40 dark:bg-blue-950/20" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          {alert.severity === "critical" ? (
                            <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                          )}
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{alert.title}</p>
                            <span className="text-[10px] text-slate-400">{alert.time}</span>
                          </div>
                        </div>
                        {!alert.read && (
                          <button
                            onClick={() => handleMarkAsRead(alert.id)}
                            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-inner">
            KH
          </div>
        </div>
      </div>
    </header>
  );
}
