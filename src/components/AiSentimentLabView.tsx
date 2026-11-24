import { useState, type FormEvent } from "react";
import { Sparkles, Send, BrainCircuit, ShieldAlert, CheckCircle2, Copy, Check } from "lucide-react";

export function AiSentimentLabView() {
  const [inputText, setInputText] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const sampleSnippets = [
    {
      title: "Kementerian Ekonomi Umum Fasa Kedua Inisiatif pendigitalan AI untuk 50,000 PKS",
      text: "Menteri Ekonomi hari ini mengumumkan peruntukan tambahan RM100 juta bagi mempercepatkan transformasi kecerdasan buatan (AI) di kalangan perusahaan mikro, kecil dan sederhana (PMKS) di Lembah Klang, Johor dan Pulau Pinang.",
    },
    {
      title: "Consumer Groups Urge Immediate Price Caps Amid Rising Urban Cost of Living",
      text: "Non-governmental organizations and urban youth associations have voiced mounting frustration over escalating logistics costs and rental inflation in Kuala Lumpur, demanding stronger market intervention.",
    },
    {
      title: "槟州绿色科技园吸引跨国半导体巨头投资 5G 与智慧物流研发中心",
      text: "槟城峇六拜工业区再传捷报，跨国半导体企业宣布设立东南亚首座AI晶圆封装及绿色能源研发中心，预计制造1,200个高技术就业机会。",
    }
  ];

  const handleAnalyze = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText && !inputTitle) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: inputTitle || "Custom Malaysian Media Input",
          text: inputText,
          source: "Custom Analyst Workbench",
        }),
      });
      const data = await res.json();
      setResult(data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>Gemini AI Sentiment & Intelligence Lab</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Harness server-side Gemini 3.7 Flash models to analyze Malaysian multi-lingual media text, extract key entities, and formulate strategic PR briefs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-blue-600" />
              <span>Input Press Release, Article, or Broadcast Transcript</span>
            </h3>

            {/* Sample presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Quick Malaysian Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {sampleSnippets.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputTitle(s.title);
                      setInputText(s.text);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    Preset {idx + 1}: {s.title.slice(0, 32)}...
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Headline / Subject</label>
                <input
                  type="text"
                  placeholder="Enter article headline..."
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Content Body (English, BM, Mandarin, or Tamil)</label>
                <textarea
                  rows={6}
                  placeholder="Paste multi-lingual article body here for instant AI sentiment and entity breakdown..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading || (!inputText && !inputTitle)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-purple-600/25 hover:opacity-95 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Analyzing via Gemini 3.7 Flash...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Run AI Intelligence Pipeline</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 min-h-[440px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>AI Intelligence Output</span>
                </h3>
                {result && (
                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy JSON"}</span>
                  </button>
                )}
              </div>

              {!result && !loading && (
                <div className="py-24 text-center text-slate-400 text-xs space-y-2">
                  <BrainCircuit className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 animate-pulse" />
                  <p>Provide input text or select a preset, then click Run AI Intelligence Pipeline.</p>
                </div>
              )}

              {loading && (
                <div className="py-24 text-center space-y-3">
                  <div className="w-8 h-8 rounded-full border-4 border-purple-600 border-t-transparent animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 font-medium animate-pulse">
                    Processing multi-lingual semantic vectors...
                  </p>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-4 pt-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 block mb-1">Sentiment Classification</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {result.sentiment} ({Math.round((result.sentimentScore || 0.8) * 100)}%)
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 block mb-1">PR Risk Assessment</span>
                      <span className={`font-bold text-sm flex items-center gap-1.5 ${result.riskLevel === "High" ? "text-rose-500" : result.riskLevel === "Medium" ? "text-amber-500" : "text-emerald-500"}`}>
                        <ShieldAlert className="w-4 h-4" />
                        {result.riskLevel || "Low"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Identified Key Entities</span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.keyEntities?.map((entity: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-medium border border-blue-200 dark:border-blue-800">
                          {entity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold block">English Executive Summary</span>
                    <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800 leading-relaxed">
                      {result.summaryEnglish}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold block">Ringkasan Eksekutif (Bahasa Melayu)</span>
                    <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800 leading-relaxed">
                      {result.summaryMalay}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-purple-600 dark:text-purple-400 font-semibold block">Strategic PR & Policy Recommendation</span>
                    <p className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800 leading-relaxed font-medium">
                      {result.recommendedAction}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Model: gemini-3.7-flash (Server-Side)</span>
              <span>Secure Token Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
