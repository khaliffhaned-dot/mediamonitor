import { useState } from "react";
import { Award, Target, Layers, FileText, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function AmecFrameworkView() {
  const [activeStep, setActiveStep] = useState(0);
  const [campaignName, setCampaignName] = useState("National AI & Digital Economy SME Push 2026");
  const [targetAudience, setTargetAudience] = useState("Malaysian SMEs, Tech Founders, Government Policy Makers");
  const [objective, setObjective] = useState("Increase positive sentiment on AI adoption by 35% across Klang Valley & Penang media.");

  const amecSteps = [
    {
      title: "1. Objectives & KPIs",
      subtitle: "Aligning communication goals with organizational strategy",
      description: "Define measurable outcomes rather than outdated output metrics like AVE (Advertising Value Equivalency). Set clear benchmarks for Malaysian market penetration.",
      metricExample: "Target: 80% positive tone in Bernama & The Star tech columns by Q3.",
      status: "Completed",
    },
    {
      title: "2. Inputs & Planning",
      subtitle: "Research, audience mapping & resource allocation",
      description: "Assess multi-lingual audience segments across English, Bahasa Malaysia, Mandarin, and Tamil media channels.",
      metricExample: "Allocated RM250K PR budget across 4 regional media hubs.",
      status: "Completed",
    },
    {
      title: "3. Execution & Activities",
      subtitle: "Content creation & multi-channel pitching",
      description: "Deploy press releases through cloud-backed Pub/Sub pipelines to media desks in KL, Penang, Johor, and Borneo.",
      metricExample: "14 press releases published, 48 journalist briefings conducted.",
      status: "Completed",
    },
    {
      title: "4. Outputs",
      subtitle: "Volume, reach & channel presence",
      description: "Track raw publication volume and estimated audience reach across verified news portals and social listening channels.",
      metricExample: "Total Reach: 12.4 Million impressions across 6 major dailies.",
      status: "Verified",
    },
    {
      title: "5. Out-takes",
      subtitle: "Target audience reception & comprehension",
      description: "Measure whether key messages about government matching grants and AI readiness were understood and retained by readers.",
      metricExample: "74% message pull-through on 'digital grant' keyword.",
      status: "Evaluated",
    },
    {
      title: "6. Outcomes",
      subtitle: "Attitude, opinion & behavior shift",
      description: "Analyze sentiment velocity and shifts in stakeholder perception using Gemini AI multi-lingual sentiment models.",
      metricExample: "+42% positive sentiment shift among SME business owners.",
      status: "Verified",
    },
    {
      title: "7. Impact",
      subtitle: "Business results & organizational value",
      description: "Evaluate direct correlation with cloud adoption rates, MDEC grant applications, and economic productivity metrics in BigQuery.",
      metricExample: "15,200 SME digital onboarding applications recorded (ROI 3.8x).",
      status: "Achieved",
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          <span>Strict AMEC / AMAC Principles & Integrated Evaluation Framework (IEF)</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Adhering to Barcelona Principles 3.0 and global media intelligence evaluation standards. Replacing obsolete AVE with robust, outcome-driven metrics.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Active Campaign</label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Primary Objective</label>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
            />
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {amecSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/25"
                    : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-purple-700 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"}`}>
                    Step {idx + 1}
                  </span>
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-emerald-500"}`} />
                </div>
                <div className="text-xs font-bold line-clamp-1">{step.title.split(". ")[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Details */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
            <div>
              <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                {amecSteps[activeStep].subtitle}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {amecSteps[activeStep].title}
              </h3>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              {amecSteps[activeStep].status}
            </span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {amecSteps[activeStep].description}
          </p>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
            <span className="font-semibold text-slate-500">Evaluated Metric / Outcome:</span>
            <span className="font-bold text-purple-700 dark:text-purple-300">{amecSteps[activeStep].metricExample}</span>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold disabled:opacity-40"
            >
              Previous Step
            </button>
            <button
              onClick={() => setActiveStep(Math.min(amecSteps.length - 1, activeStep + 1))}
              disabled={activeStep === amecSteps.length - 1}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-md disabled:opacity-40"
            >
              Next AMEC Principle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
