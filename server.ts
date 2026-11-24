import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy-key",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Mock Malaysian Media Database
let mediaArticles = [
  {
    id: "MY-8841",
    title: "Malaysia's Digital Economy Blueprint Accelerates AI Adoption in SMEs",
    source: "The Star",
    category: "Technology",
    sentiment: "Positive",
    sentimentScore: 0.85,
    region: "Klang Valley",
    language: "English",
    publishedAt: "2026-08-20T14:30:00Z",
    reach: "1.4M",
    engagement: "42.8K",
    summary: "MDEC reports over 15,000 SMEs successfully integrated cloud and AI tooling this quarter, boosted by government matching grants.",
    url: "https://thestar.com.my/tech/digital-economy",
    bookmarked: false,
  },
  {
    id: "MY-8842",
    title: "Pelan Peralihan Tenaga Negara (NETR) Tarik Pelaburan Hijau RM24 Bilion",
    source: "Berita Harian",
    category: "Energy",
    sentiment: "Positive",
    sentimentScore: 0.92,
    region: "Johor",
    language: "Malay",
    publishedAt: "2026-08-20T12:15:00Z",
    reach: "2.1M",
    engagement: "68.3K",
    summary: "Projek tenaga solar berskala besar di Pengerang dan Iskandar Malaysia mula menarik konsortium antarabangsa dari Jepun dan Singapura.",
    url: "https://bharian.com.my/bisnes/nasional/netr",
    bookmarked: true,
  },
  {
    id: "MY-8843",
    title: "Fitch Ratings Affirms Malaysia’s Sovereign Rating at A- with Stable Outlook",
    source: "Bernama",
    category: "Economy",
    sentiment: "Neutral",
    sentimentScore: 0.60,
    region: "Klang Valley",
    language: "English",
    publishedAt: "2026-08-20T10:00:00Z",
    reach: "3.5M",
    engagement: "19.5K",
    summary: "Robust fiscal consolidation and diversified economic structure cushion global headwinds, notes Fitch report released today.",
    url: "https://bernama.com/en/business/fitch-rating",
    bookmarked: false,
  },
  {
    id: "MY-8844",
    title: "槟州政府推介智能交通系统 舒缓槟威大桥及市区交通拥堵",
    source: "Sin Chew Daily",
    category: "Infrastructure",
    sentiment: "Positive",
    sentimentScore: 0.78,
    region: "Penang",
    language: "Mandarin",
    publishedAt: "2026-08-20T08:45:00Z",
    reach: "980K",
    engagement: "31.2K",
    summary: "槟城地方政府与科技企业合作，利用AI电眼与即时车流感测器优化红绿灯秒数，通勤时间预计缩短18%。",
    url: "https://sinchew.com.my/penang/smart-traffic",
    bookmarked: false,
  },
  {
    id: "MY-8845",
    title: "Sabah & Sarawak Logistik Digital Hub Siap Sedia Hubungkan Pasangan BIMP-EAGA",
    source: "Utusan Borneo",
    category: "Logistics",
    sentiment: "Neutral",
    sentimentScore: 0.55,
    region: "Sabah/Sarawak",
    language: "Malay",
    publishedAt: "2026-08-19T22:10:00Z",
    reach: "650K",
    engagement: "14.1K",
    summary: "Pembangunan infrastruktur gentian optik bawah laut memperkukuh kedudukan Borneo sebagai pintu gerbang digital rantau Borneo-Indonesia-Brunei.",
    url: "https://utusanborneo.com.my/digital-hub",
    bookmarked: false,
  },
  {
    id: "MY-8846",
    title: "Kritikan Terhadap Kos Sara Hidup Bandar: Suara Belia Minta Langkah Kawalan Harga Lebih Tegas",
    source: "Malaysiakini",
    category: "Society",
    sentiment: "Critical",
    sentimentScore: 0.25,
    region: "Klang Valley",
    language: "Malay",
    publishedAt: "2026-08-19T18:00:00Z",
    reach: "1.8M",
    engagement: "95.4K",
    summary: "Persatuan pengguna mendesak intervensi pasaran lebih proaktif bagi membendung kenaikan harga sewa rumah dan barangan makanan asas di Kuala Lumpur.",
    url: "https://malaysiakini.com/news/sara-hidup",
    bookmarked: false,
  },
  {
    id: "MY-8847",
    title: "தமிழர் திருநாள் கொண்டாட்டங்களில் பாரம்பரிய கலைகளுக்கு இணையவழி ஆதரவு பெருக்கம்",
    source: "Nan Malar",
    category: "Culture",
    sentiment: "Positive",
    sentimentScore: 0.90,
    region: "Klang Valley",
    language: "Tamil",
    publishedAt: "2026-08-19T16:20:00Z",
    reach: "420K",
    engagement: "22.6K",
    summary: "மலேசியாவில் பரதநாட்டியம் மற்றும் ஒயிலாட்டம் போன்ற பாரம்பரிய கலைகள் டிஜிட்டல் மேடைகள் மூலம் இளம் தலைமுறையினரை ஈர்த்து வருகின்றன.",
    url: "https://nanmalar.com.my/culture/arts",
    bookmarked: false,
  },
  {
    id: "MY-8848",
    title: "Astro Awani Special: E-Wallets and Central Bank Digital Currency (RM-CBDC) Readiness",
    source: "Astro Awani",
    category: "Finance",
    sentiment: "Neutral",
    sentimentScore: 0.68,
    region: "Klang Valley",
    language: "English",
    publishedAt: "2026-08-19T11:00:00Z",
    reach: "2.9M",
    engagement: "51.0K",
    summary: "Bank Negara Malaysia panel discusses cybersecurity frameworks and cryptographic resilience as retail CBDC trials progress.",
    url: "https://astroawani.com/finance/cbdc-readiness",
    bookmarked: false,
  }
];

let systemAlerts = [
  { id: "ALT-101", title: "Sentiment Spike: Energy & NETR", severity: "info", time: "10m ago", read: false },
  { id: "ALT-102", title: "High Volume Social Mention: #KosSaraHidup", severity: "warning", time: "35m ago", read: false },
  { id: "ALT-103", title: "Pub/Sub Consumer Lag Detected in 'media-ingestion-v2'", severity: "critical", time: "2h ago", read: true },
];

let cloudTelemetry = {
  pubsub: {
    topics: [
      { name: "media-ingestion-v2", messagesPerSec: 1420, backlog: 12, status: "Healthy" },
      { name: "nlp-sentiment-pipeline", messagesPerSec: 1380, backlog: 5, status: "Optimal" },
      { name: "alert-dispatcher-my", messagesPerSec: 45, backlog: 0, status: "Active" }
    ],
    totalThroughputToday: "124.8M messages"
  },
  cloudSql: {
    instance: "my-media-intel-prod-pg16",
    region: "asia-southeast1 (Singapore/Malaysia Edge)",
    cpuUtilization: "34.2%",
    memoryUsage: "64.8%",
    activeConnections: 142,
    queryLatencyAvgMs: 3.8,
    status: "Healthy"
  },
  bigQuery: {
    datasetsScannedToday: "4.8 TB",
    activeQueries: 8,
    avgJobDurationSec: 1.2,
    costEstimateToday: "$14.20 USD"
  },
  cloudStorage: {
    bucketName: "gs://my-media-intel-vault-backup",
    totalObjects: "1,420,892",
    storageUsed: "48.2 TB",
    lastBackup: "2026-08-20T04:00:00Z (Success)"
  }
};

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/media", (req, res) => {
  const { category, sentiment, search, language, region } = req.query;
  let result = [...mediaArticles];

  if (category && category !== "All") {
    result = result.filter(m => m.category.toLowerCase() === String(category).toLowerCase());
  }
  if (sentiment && sentiment !== "All") {
    result = result.filter(m => m.sentiment.toLowerCase() === String(sentiment).toLowerCase());
  }
  if (language && language !== "All") {
    result = result.filter(m => m.language.toLowerCase() === String(language).toLowerCase());
  }
  if (region && region !== "All") {
    result = result.filter(m => m.region.toLowerCase() === String(region).toLowerCase());
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(m => m.title.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q) || m.source.toLowerCase().includes(q));
  }

  res.json(result);
});

app.post("/api/media", (req, res) => {
  const newArticle = {
    id: `MY-${Math.floor(1000 + Math.random() * 9000)}`,
    ...req.body,
    publishedAt: new Date().toISOString(),
    bookmarked: false
  };
  mediaArticles.unshift(newArticle);
  res.json(newArticle);
});

app.patch("/api/media/:id/bookmark", (req, res) => {
  const { id } = req.params;
  const article = mediaArticles.find(m => m.id === id);
  if (article) {
    article.bookmarked = !article.bookmarked;
    res.json(article);
  } else {
    res.status(404).json({ error: "Article not found" });
  }
});

// AI Intelligence Analysis using Gemini API
app.post("/api/ai/analyze", async (req, res) => {
  try {
    const { text, title, source } = req.body;
    if (!text && !title) {
      return res.status(400).json({ error: "Text or title required for analysis." });
    }

    const prompt = `Analyze the following Malaysian media text/article for executive intelligence:
Title: ${title || "N/A"}
Source: ${source || "General Media"}
Content: ${text || title}

Provide a JSON response with:
1. sentiment: "Positive" | "Neutral" | "Critical"
2. sentimentScore: number between 0 and 1
3. keyEntities: array of string (politicians, corporations, agencies like MDEC, Bank Negara, Petronas, etc.)
4. summaryEnglish: concise executive summary in English (max 2 sentences)
5. summaryMalay: ringkasan eksekutif dalam Bahasa Melayu (max 2 sentences)
6. riskLevel: "Low" | "Medium" | "High"
7. recommendedAction: strategic PR or policy recommendation for Malaysian stakeholders.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawText = response.text || "{}";
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = { raw: rawText };
    }

    res.json({
      success: true,
      analysis: parsed,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error("Gemini AI Analysis Error:", err);
    res.status(500).json({ error: err.message || "Failed to generate AI intelligence." });
  }
});

app.get("/api/telemetry", (req, res) => {
  res.json(cloudTelemetry);
});

app.get("/api/alerts", (req, res) => {
  res.json(systemAlerts);
});

app.post("/api/alerts/:id/read", (req, res) => {
  const alert = systemAlerts.find(a => a.id === req.params.id);
  if (alert) {
    alert.read = true;
    res.json(alert);
  } else {
    res.status(404).json({ error: "Alert not found" });
  }
});

// Vite middleware setup in development, static in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Malaysian Media Intelligence Platform running on http://localhost:${PORT}`);
  });
}

startServer();
