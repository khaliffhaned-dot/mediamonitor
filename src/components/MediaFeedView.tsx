import { useState, useEffect, type FormEvent } from "react";
import { 
  Search, 
  Filter, 
  Bookmark, 
  ExternalLink, 
  Sparkles, 
  TrendingUp, 
  Building, 
  MapPin, 
  Globe, 
  Plus,
  CheckCircle,
  X
} from "lucide-react";
import { Article } from "../types";

export function MediaFeedView() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sentiment, setSentiment] = useState("All");
  const [language, setLanguage] = useState("All");
  const [region, setRegion] = useState("All");

  // AI analysis modal state
  const [selectedArticleForAi, setSelectedArticleForAi] = useState<Article | null>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Add Article Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSource, setNewSource] = useState("The Star");
  const [newCategory, setNewCategory] = useState("Technology");
  const [newRegion, setNewRegion] = useState("Klang Valley");
  const [newLanguage, setNewLanguage] = useState<"English" | "Malay" | "Mandarin" | "Tamil">("English");
  const [newSummary, setNewSummary] = useState("");

  const fetchArticles = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category !== "All") params.append("category", category);
    if (sentiment !== "All") params.append("sentiment", sentiment);
    if (language !== "All") params.append("language", language);
    if (region !== "All") params.append("region", region);

    fetch(`/api/media?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, [category, sentiment, language, region]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchArticles();
  };

  const handleBookmark = async (id: string) => {
    try {
      const res = await fetch(`/api/media/${id}/bookmark`, { method: "PATCH" });
      const updated = await res.json();
      setArticles(articles.map(a => a.id === id ? updated : a));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunAiAnalysis = async (article: Article) => {
    setSelectedArticleForAi(article);
    setAnalyzing(true);
    setAiResult(null);

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: article.title,
          text: article.summary,
          source: article.source,
        }),
      });
      const data = await res.json();
      setAiResult(data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCreateArticle = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary) return;

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          source: newSource,
          category: newCategory,
          sentiment: "Positive",
          sentimentScore: 0.80,
          region: newRegion,
          language: newLanguage,
          reach: "500K",
          engagement: "12.4K",
          summary: newSummary,
          url: "https://example.com/news",
        }),
      });
      const created = await res.json();
      setArticles([created, ...articles]);
      setShowAddModal(false);
      setNewTitle("");
      setNewSummary("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Malaysian Media Intelligence Feed</span>
            <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              {articles.length} Live Items
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time crawling across Bernama, The Star, Malaysiakini, Berita Harian, Sin Chew Daily & Nan Malar.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Ingest New Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search headlines, summaries, sources (e.g., MDEC, NETR, 槟城, e-wallet)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Energy">Energy</option>
              <option value="Economy">Economy</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Logistics">Logistics</option>
              <option value="Society">Society</option>
              <option value="Culture">Culture</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Sentiment Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Sentiment</label>
            <select
              value={sentiment}
              onChange={(e) => setSentiment(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Critical">Critical / Negative</option>
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Languages</option>
              <option value="English">English</option>
              <option value="Malay">Malay (BM)</option>
              <option value="Mandarin">Mandarin (中文)</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Regions</option>
              <option value="Klang Valley">Klang Valley</option>
              <option value="Johor">Johor</option>
              <option value="Penang">Penang</option>
              <option value="Sabah/Sarawak">Sabah / Sarawak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles List */}
      {loading ? (
        <div className="py-20 text-center text-xs text-slate-400">Loading Malaysian media intelligence streams...</div>
      ) : articles.length === 0 ? (
        <div className="py-20 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          No articles match your current filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {articles.map((article) => {
            const sentimentColor = 
              article.sentiment === "Positive" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" :
              article.sentiment === "Critical" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30" :
              "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";

            return (
              <div 
                key={article.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                      {article.source}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-md border font-medium ${sentimentColor}`}>
                      {article.sentiment} ({Math.round(article.sentimentScore * 100)}%)
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Building className="w-3 h-3" /> {article.category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {article.region}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {article.language}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-400">
                    <span>Reach: <strong className="text-slate-700 dark:text-slate-200">{article.reach}</strong></span>
                    <span>Engagement: <strong className="text-slate-700 dark:text-slate-200">{article.engagement}</strong></span>
                    <span>Published: {new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleRunAiAnalysis(article)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-semibold text-xs hover:bg-purple-100 transition-colors shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Gemini AI Brief</span>
                  </button>

                  <button
                    onClick={() => handleBookmark(article.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      article.bookmarked
                        ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-600"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700"
                    }`}
                    title="Bookmark article"
                  >
                    <Bookmark className={`w-4 h-4 ${article.bookmarked ? "fill-current" : ""}`} />
                  </button>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
                    title="Open original source"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Intelligence Modal */}
      {selectedArticleForAi && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gemini 3.7 Flash Intelligence Report</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {selectedArticleForAi.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticleForAi(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {analyzing ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-8 h-8 rounded-full border-4 border-purple-600 border-t-transparent animate-spin mx-auto" />
                <p className="text-xs text-slate-500 font-medium animate-pulse">
                  Synthesizing Malaysian media sentiment & stakeholder impact via Gemini AI...
                </p>
              </div>
            ) : aiResult ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1">Sentiment Score</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {aiResult.sentiment} ({Math.round((aiResult.sentimentScore || 0.8) * 100)}%)
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1">PR Risk Level</span>
                    <span className={`font-bold text-sm ${aiResult.riskLevel === "High" ? "text-rose-500" : aiResult.riskLevel === "Medium" ? "text-amber-500" : "text-emerald-500"}`}>
                      {aiResult.riskLevel || "Low Risk"}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block mb-1">Key Entities</span>
                    <div className="flex flex-wrap gap-1">
                      {aiResult.keyEntities?.map((e: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-medium">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">English Executive Brief</h4>
                  <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed">
                    {aiResult.summaryEnglish || selectedArticleForAi.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Ringkasan Eksekutif (Bahasa Melayu)</h4>
                  <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed">
                    {aiResult.summaryMalay || "Laporan dan analisis sentimen media semasa menunjukkan impak positif terhadap ekosistem digital Malaysia."}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Strategic PR Recommendation</h4>
                  <p className="text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/30 p-3.5 rounded-xl border border-purple-200 dark:border-purple-800 leading-relaxed font-medium">
                    {aiResult.recommendedAction || "Maintain stakeholder dialogue and publish progress metrics in major business dailies."}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedArticleForAi(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold hover:bg-slate-800 text-xs transition-colors"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Article Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Ingest New Media Article / Broadcast
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Headline / Title</label>
                <input
                  type="string"
                  required
                  placeholder="e.g., Malaysia Launches National Quantum Computing Initiative..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Media Source</label>
                  <select
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 focus:outline-none"
                  >
                    <option value="The Star">The Star</option>
                    <option value="Bernama">Bernama</option>
                    <option value="Malaysiakini">Malaysiakini</option>
                    <option value="Berita Harian">Berita Harian</option>
                    <option value="Sin Chew Daily">Sin Chew Daily</option>
                    <option value="Nan Malar">Nan Malar</option>
                    <option value="Astro Awani">Astro Awani</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 focus:outline-none"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Energy">Energy</option>
                    <option value="Economy">Economy</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Society">Society</option>
                    <option value="Culture">Culture</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Region</label>
                  <select
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 focus:outline-none"
                  >
                    <option value="Klang Valley">Klang Valley</option>
                    <option value="Johor">Johor</option>
                    <option value="Penang">Penang</option>
                    <option value="Sabah/Sarawak">Sabah/Sarawak</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Language</label>
                  <select
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 focus:outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Malay">Malay</option>
                    <option value="Mandarin">Mandarin</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Summary / Excerpt</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Enter article summary or broadcast transcript excerpt..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
                >
                  Ingest Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
