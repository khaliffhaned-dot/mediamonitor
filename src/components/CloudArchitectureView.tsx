import { useState, useEffect } from "react";
import { CloudRain, Database, HardDrive, Cpu, Radio, CheckCircle2, RefreshCw } from "lucide-react";
import { CloudTelemetryData } from "../types";

export function CloudArchitectureView() {
  const [telemetry, setTelemetry] = useState<CloudTelemetryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTelemetry = () => {
    setLoading(true);
    fetch("/api/telemetry")
      .then(res => res.json())
      .then(data => {
        setTelemetry(data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTelemetry();
  };

  if (loading && !telemetry) {
    return <div className="py-20 text-center text-xs text-slate-400">Loading Google Cloud Architecture telemetry...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-blue-600" />
            <span>Google Cloud Architecture & Pub/Sub Telemetry</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Event-driven streaming pipeline powered by Google Cloud Pub/Sub, Cloud Functions, BigQuery, and Cloud SQL PostgreSQL.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-sm ${refreshing ? "opacity-75" : ""}`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pub/Sub Topics Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>Cloud Pub/Sub Streaming Topics</span>
            </h3>
            <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {telemetry?.pubsub.totalThroughputToday}
            </span>
          </div>

          <div className="space-y-3">
            {telemetry?.pubsub.topics.map((topic, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">{topic.name}</span>
                  <span className="text-slate-400 text-[10px]">Backlog: {topic.backlog} messages</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-blue-600 dark:text-blue-400 block">{topic.messagesPerSec} msgs/sec</span>
                  <span className="text-[10px] text-emerald-600 font-medium">{topic.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud SQL PostgreSQL Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              <span>Cloud SQL (PostgreSQL 16)</span>
            </h3>
            <span className="text-[11px] bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              {telemetry?.cloudSql.status}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Instance ID</span>
              <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{telemetry?.cloudSql.instance}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Region</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{telemetry?.cloudSql.region}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">CPU Utilization</span>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{telemetry?.cloudSql.cpuUtilization}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">Avg Query Latency</span>
                <span className="font-bold text-sm text-emerald-600">{telemetry?.cloudSql.queryLatencyAvgMs} ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* BigQuery Analytics Warehouse */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>BigQuery Data Warehouse</span>
            </h3>
            <span className="text-[11px] bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
              Active Analytics
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Datasets Scanned Today</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{telemetry?.bigQuery.datasetsScannedToday}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Active Concurrent Queries</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{telemetry?.bigQuery.activeQueries}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Estimated Cost Today</span>
              <span className="font-bold text-emerald-600">{telemetry?.bigQuery.costEstimateToday}</span>
            </div>
          </div>
        </div>

        {/* Cloud Storage Backups */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-amber-500" />
              <span>Cloud Storage Vault & Backups</span>
            </h3>
            <span className="text-[11px] bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              Automated Daily
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Bucket Destination</span>
              <span className="font-mono font-medium text-blue-600 dark:text-blue-400">{telemetry?.cloudStorage.bucketName}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Total Archival Objects</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{telemetry?.cloudStorage.totalObjects}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Last Successful Snapshot</span>
              <span className="font-medium text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {telemetry?.cloudStorage.lastBackup}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
