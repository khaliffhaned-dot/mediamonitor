import { useState } from "react";
import { ShieldCheck, Key, Lock, CheckCircle2, UserCheck, Shield, FileText } from "lucide-react";
import { UserRole } from "../types";

interface RbacSecurityViewProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function RbacSecurityView({ currentRole, onRoleChange }: RbacSecurityViewProps) {
  const [oauthStatus, setOauthStatus] = useState("Connected (OAuth 2.0 PKCE - Google Corporate SSO)");

  const rolesMatrix = [
    {
      role: "PR Director",
      permissions: ["View All Media Streams", "Run Gemini AI Crisis Briefs", "Export Executive Reports", "Manage Alert Thresholds"],
      color: "bg-purple-500/10 text-purple-600 border-purple-500/30"
    },
    {
      role: "Senior Analyst",
      permissions: ["View All Media Streams", "Run Gemini AI Sentiment Lab", "Query BigQuery Telemetry", "Export Raw Datasets"],
      color: "bg-blue-500/10 text-blue-600 border-blue-500/30"
    },
    {
      role: "Content Editor",
      permissions: ["View Regional Media Feeds", "Ingest Articles & Transcripts", "Bookmark Key Items", "Edit Local Summaries"],
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
    },
    {
      role: "System Admin",
      permissions: ["Full Cloud Pub/Sub & Cloud SQL Access", "RBAC & OAuth Policy Management", "Audit Log Monitoring", "System Configuration"],
      color: "bg-amber-500/10 text-amber-600 border-amber-500/30"
    }
  ];

  const auditLogs = [
    { id: "LOG-9921", timestamp: "2026-08-21 09:14:22", user: "khaliffhaned@gmail.com", role: "System Admin", action: "Refreshed Cloud Pub/Sub topics queue", ip: "10.140.0.12" },
    { id: "LOG-9920", timestamp: "2026-08-21 08:50:11", user: "analyst.kl@mediamalaysia.my", role: "Senior Analyst", action: "Executed Gemini 3.7 Flash sentiment batch", ip: "175.143.20.9" },
    { id: "LOG-9919", timestamp: "2026-08-21 08:22:45", user: "director.pr@gov.my", role: "PR Director", action: "Exported quarterly sentiment velocity report", ip: "42.153.88.2" },
    { id: "LOG-9918", timestamp: "2026-08-21 07:15:00", user: "editor.penang@mediamalaysia.my", role: "Content Editor", action: "Ingested new article ID MY-8844", ip: "219.92.14.88" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>OAuth 2.0 Authentication & Granular RBAC Security</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage enterprise single sign-on (SSO), OAuth scopes, role-based access permissions, and immutable security audit trails.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* OAuth 2.0 Status Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-600" />
              <span>OAuth 2.0 & SSO Identity Provider</span>
            </h3>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
              <div className="flex items-center justify-between font-semibold text-emerald-800 dark:text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Session Active</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded">PKCE Secured</span>
              </div>
              <p className="text-emerald-700 dark:text-emerald-300">
                {oauthStatus}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-500">Current Active Role</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{currentRole}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-500">Token Expiry</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">58 mins remaining</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-500">Encryption Standard</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">TLS 1.3 / AES-256</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert("Simulating OAuth 2.0 token revocation and re-authentication flow...")}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-semibold text-xs transition-colors"
              >
                Re-authenticate via Corporate SSO
              </button>
            </div>
          </div>
        </div>

        {/* Granular RBAC Matrix */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-600" />
              <span>Role-Based Access Control (RBAC) Matrix</span>
            </h3>

            <div className="space-y-3">
              {rolesMatrix.map((r, i) => {
                const isSelected = currentRole === r.role;
                return (
                  <div 
                    key={i}
                    className={`p-4 rounded-xl border text-xs transition-all ${
                      isSelected 
                        ? "bg-blue-50/60 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 shadow-sm" 
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-md border font-bold text-[11px] ${r.color}`}>
                          {r.role}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">
                            Active Role
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => onRoleChange(r.role as UserRole)}
                        className={`text-[11px] font-semibold px-3 py-1 rounded-lg transition-colors ${
                          isSelected 
                            ? "bg-blue-600 text-white" 
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected ? "Current" : "Switch to Role"}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {r.permissions.map((p, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] font-medium border border-slate-200 dark:border-slate-700">
                          ✓ {p}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Security Audit Logs */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-500" />
            <span>Immutable Security Audit Logs</span>
          </h3>
          <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full text-slate-500 font-medium">
            Cloud Logging Stream
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2.5">Timestamp</th>
                <th className="pb-2.5">User</th>
                <th className="pb-2.5">Role</th>
                <th className="pb-2.5">Action Executed</th>
                <th className="pb-2.5">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 font-mono text-slate-500">{log.timestamp}</td>
                  <td className="py-3 font-medium text-slate-900 dark:text-slate-100">{log.user}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[10px]">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3 text-slate-700 dark:text-slate-300">{log.action}</td>
                  <td className="py-3 font-mono text-slate-400">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
