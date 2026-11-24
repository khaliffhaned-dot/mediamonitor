export interface Article {
  id: string;
  title: string;
  source: string;
  category: string;
  sentiment: "Positive" | "Neutral" | "Critical";
  sentimentScore: number;
  region: string;
  language: "English" | "Malay" | "Mandarin" | "Tamil";
  publishedAt: string;
  reach: string;
  engagement: string;
  summary: string;
  url: string;
  bookmarked: boolean;
}

export interface SystemAlert {
  id: string;
  title: string;
  severity: "info" | "warning" | "critical";
  time: string;
  read: boolean;
}

export interface CloudTelemetryData {
  pubsub: {
    topics: {
      name: string;
      messagesPerSec: number;
      backlog: number;
      status: string;
    }[];
    totalThroughputToday: string;
  };
  cloudSql: {
    instance: string;
    region: string;
    cpuUtilization: string;
    memoryUsage: string;
    activeConnections: number;
    queryLatencyAvgMs: number;
    status: string;
  };
  bigQuery: {
    datasetsScannedToday: string;
    activeQueries: number;
    avgJobDurationSec: number;
    costEstimateToday: string;
  };
  cloudStorage: {
    bucketName: string;
    totalObjects: string;
    storageUsed: string;
    lastBackup: string;
  };
}

export type UserRole = "PR Director" | "Senior Analyst" | "Content Editor" | "System Admin";
export type LanguageCode = "en" | "ms" | "zh" | "ta";
