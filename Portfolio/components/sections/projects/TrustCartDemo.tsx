"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ShieldAlert, 
  CheckCircle, 
  ExternalLink, 
  Terminal, 
  Gauge, 
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewSample = {
  id: string;
  name: string;
  ratingLabel: string;
  text: string;
  result: {
    verdict: "STRONG BUY" | "BUY WITH CAUTION" | "AVOID";
    verdictColor: string;
    trustScore: number;
    sentiment: "POSITIVE" | "MIXED" | "SPAM_EXAGGERATED";
    spamAnomalies: string[];
    pros: string[];
    cons: string[];
    aspects: { aspect: string; type: "positive" | "negative"; score: number }[];
  };
};

const samples: ReviewSample[] = [
  {
    id: "strong-buy",
    name: "Standard Verified Purchase Review",
    ratingLabel: "High Trust (Positive)",
    text: "The display is incredible, vibrant colors, extremely crisp. Performance is super smooth, no lag during heavy coding. The battery life is decent, getting about 8 hours of active use. Delivery was very fast and arrived in perfect packaging. Highly recommend this!",
    result: {
      verdict: "STRONG BUY",
      verdictColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
      trustScore: 94,
      sentiment: "POSITIVE",
      spamAnomalies: [],
      pros: ["Incredible crisp display", "Smooth performance under load", "Decent battery (~8 hrs)", "Fast, clean delivery"],
      cons: [],
      aspects: [
        { aspect: "display", type: "positive", score: 96 },
        { aspect: "performance", type: "positive", score: 92 },
        { aspect: "battery", type: "positive", score: 78 },
        { aspect: "delivery", type: "positive", score: 95 }
      ]
    }
  },
  {
    id: "caution",
    name: "Mixed User Experience Review",
    ratingLabel: "Moderate Trust (Mixed)",
    text: "Good laptop for the price. The keyboard is comfortable and performance handles daily tasks fine. However, the battery drains extremely quickly (lasts 3 hours max) and the speakers are quiet and tinny. Delivery took over a week.",
    result: {
      verdict: "BUY WITH CAUTION",
      verdictColor: "text-yellow-400 border-yellow-500/30 bg-yellow-950/20",
      trustScore: 62,
      sentiment: "MIXED",
      spamAnomalies: ["Negative aspect dominance"],
      pros: ["Comfortable keyboard layout", "Handles general daily workload"],
      cons: ["Extreme battery drain (3 hr limit)", "Weak speaker audio quality", "Slow delivery timeline"],
      aspects: [
        { aspect: "comfort", type: "positive", score: 85 },
        { aspect: "performance", type: "positive", score: 70 },
        { aspect: "battery", type: "negative", score: 25 },
        { aspect: "support", type: "negative", score: 30 },
        { aspect: "delivery", type: "negative", score: 40 }
      ]
    }
  },
  {
    id: "spam",
    name: "Suspicious Commercial Spam Review",
    ratingLabel: "High Suspicion (Spam)",
    text: "WOW AMAZING PRODUCT BEST BUY EVER!!!!!!!!!!! MUST BUY RIGHT NOW!!!!!!!!!!! VERY CHEAP PRICE BEST BEST BEST BEST BEST BEST BEST QUALITY!!!!!!!!! I got this super fast amazing seller A+!!!!!!!!! BUY BUY BUY.",
    result: {
      verdict: "AVOID",
      verdictColor: "text-rose-400 border-rose-500/30 bg-rose-950/20",
      trustScore: 18,
      sentiment: "SPAM_EXAGGERATED",
      spamAnomalies: [
        "IsolationForest: Anomaly detected",
        "Linguistic signals: Repeated words (BEST, BUY)",
        "Linguistic signals: Punctuation abuse (!!!)",
        "Linguistic signals: Uppercase ratio: 68%",
        "Unrealistic positive bias"
      ],
      pros: ["Cheapest price claims"],
      cons: ["High linguistic spam signatures", "Possible non-authentic reviewer"],
      aspects: [
        { aspect: "price", type: "positive", score: 90 },
        { aspect: "quality", type: "positive", score: 85 }
      ]
    }
  }
];

export function TrustCartDemo() {
  const [selectedSample, setSelectedSample] = useState<ReviewSample>(samples[0]!);
  const [customText, setCustomText] = useState("");
  const [isInputtingCustom, setIsInputtingCustom] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ReviewSample["result"] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const pipelineSteps = [
    "Loading text vectors & preprocessing filters...",
    "Running Hugging Face Sentiment & Emotion pipelines...",
    "Extracting KeyBERT metadata & YAKE aspects...",
    "Evaluating linguistic frequencies & spam anomalies...",
    "Computing IsolationForest and weighted trust scores..."
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setCurrentStep(0);

    // Simulate pipeline step ticks
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < pipelineSteps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          // If custom text, evaluate simple rules to mock results
          if (isInputtingCustom) {
            const hasCapitalExclamation = /[!A-Z]{5,}/.test(customText) || (customText.match(/!/g) || []).length > 6;
            if (hasCapitalExclamation) {
              setAnalysisResult(samples[2]!.result); // Return spam result
            } else if (customText.toLowerCase().includes("however") || customText.toLowerCase().includes("but")) {
              setAnalysisResult(samples[1]!.result); // Return mixed result
            } else {
              setAnalysisResult({
                verdict: "STRONG BUY",
                verdictColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
                trustScore: 88,
                sentiment: "POSITIVE",
                spamAnomalies: [],
                pros: ["User-defined positive signals"],
                cons: [],
                aspects: [{ aspect: "product", type: "positive", score: 85 }]
              });
            }
          } else {
            setAnalysisResult(selectedSample.result);
          }
        }, 600);
      }
    }, 600);
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5">
      {/* Demo Header */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-950/60 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Interactive Simulation</p>
          <h4 className="mt-1 text-lg font-black text-white">TrustCart Review NLP Analyzer</h4>
        </div>
        
        {/* Streamlit Deploy Button */}
        <a
          href="https://trustcart.streamlit.app/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-2 text-xs font-black text-emerald-400 transition hover:bg-emerald-500/10"
        >
          <span>Streamlit Web App</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Controls Column */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Input Mode Selection</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsInputtingCustom(false);
                  setAnalysisResult(null);
                }}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-bold transition",
                  !isInputtingCustom ? "bg-cyan-400/15 border border-cyan-400/40 text-cyan-200" : "bg-white/5 border border-white/10 text-slate-400"
                )}
              >
                Sample Datasets
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsInputtingCustom(true);
                  setAnalysisResult(null);
                }}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-bold transition",
                  isInputtingCustom ? "bg-cyan-400/15 border border-cyan-400/40 text-cyan-200" : "bg-white/5 border border-white/10 text-slate-400"
                )}
              >
                Custom Reviews
              </button>
            </div>
          </div>

          {/* Sample Dataset Mode */}
          {!isInputtingCustom ? (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Select Sample Feed</p>
              <div className="grid gap-2">
                {samples.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      setSelectedSample(sample);
                      setAnalysisResult(null);
                    }}
                    className={cn(
                      "w-full text-left rounded-lg p-3 border transition-all duration-300",
                      selectedSample.id === sample.id 
                        ? "border-cyan-400/40 bg-cyan-950/20 text-cyan-100" 
                        : "border-white/5 bg-slate-950/40 text-slate-400 hover:border-white/15"
                    )}
                  >
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span>{sample.name}</span>
                      <span className={cn(
                        "text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border",
                        sample.id === "strong-buy" && "text-emerald-400 border-emerald-500/20 bg-emerald-950/30",
                        sample.id === "caution" && "text-yellow-400 border-yellow-500/20 bg-yellow-950/30",
                        sample.id === "spam" && "text-rose-400 border-rose-500/20 bg-rose-950/30"
                      )}>
                        {sample.ratingLabel}
                      </span>
                    </div>
                    <p className="mt-2 text-[10px] font-mono leading-4 line-clamp-2 text-slate-500">
                      &quot;{sample.text}&quot;
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Custom Text Input Mode */
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Enter Review Text</p>
              <textarea
                value={customText}
                onChange={(e) => {
                  setCustomText(e.target.value);
                  setAnalysisResult(null);
                }}
                placeholder="Paste products reviews (e.g. Try adding CAPS and excessive exclamation marks to trigger spam detection)..."
                className="w-full h-32 rounded-lg border border-cyan-500/20 bg-slate-950/60 p-3 font-mono text-xs text-cyan-100 outline-none focus:border-cyan-400/50"
              />
            </div>
          )}

          {/* Trigger Button */}
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || (isInputtingCustom && !customText.trim())}
            className="cyber-btn inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-neon hover:brightness-110 disabled:pointer-events-none disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            Analyze NLP Models
          </button>
        </div>

        {/* Results / Screen Column */}
        <div className="sci-fi-panel rounded-xl border border-cyan-500/25 bg-slate-950/40 p-4 min-h-[300px] flex flex-col justify-center relative overflow-hidden">
          <div className="sci-fi-corner sci-fi-corner-tl" />
          <div className="sci-fi-corner sci-fi-corner-tr" />
          <div className="sci-fi-corner sci-fi-corner-bl" />
          <div className="sci-fi-corner sci-fi-corner-br" />

          {/* Grid Background in Screen */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.01)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

          <AnimatePresence mode="wait">
            
            {/* Step 1: Idle Screen */}
            {!isAnalyzing && !analysisResult && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center p-4"
              >
                <Terminal className="h-8 w-8 text-cyan-500/50 mb-3 animate-pulse" />
                <p className="text-xs font-mono text-cyan-300">
                  SYSTEM READY. SELECT REVIEW INPUT AND LAUNCH MODEL PIPELINE.
                </p>
                <div className="mt-4 flex gap-1.5 items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/40 animate-ping" />
                  <span className="text-[9px] font-mono text-slate-500">STANDBY_FEED_LISTENING</span>
                </div>
              </motion.div>
            )}

            {/* Step 2: Analyzing Pipeline Screen */}
            {isAnalyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col justify-center min-h-[250px] font-mono text-[10px] leading-6 text-cyan-200"
              >
                <div className="border-b border-cyan-950/80 pb-2 mb-3 flex items-center justify-between text-[8px] tracking-widest text-pink-400">
                  <span>PIPELINE_FLOW://RUNNING_ANALYTICS</span>
                  <span className="animate-pulse">●</span>
                </div>
                
                {pipelineSteps.map((step, idx) => {
                  const isActive = idx === currentStep;
                  const isDone = idx < currentStep;
                  return (
                    <div key={idx} className={cn(
                      "flex items-center gap-2 transition-all",
                      isActive ? "text-cyan-300 font-bold scale-[1.02]" : isDone ? "text-cyan-600/70" : "text-slate-600"
                    )}>
                      {isDone ? (
                        <CheckCircle className="h-3 w-3 text-emerald-400" />
                      ) : isActive ? (
                        <motion.div
                          className="h-2 w-2 rounded-full bg-cyan-400"
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                      )}
                      <span>{step}</span>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Step 3: Finished Analysis Results Screen */}
            {!isAnalyzing && analysisResult && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full"
              >
                {/* Diagnostics Header */}
                <div className="flex justify-between items-start border-b border-cyan-950/60 pb-3 mb-4">
                  <div>
                    <span className="text-[8px] font-mono tracking-widest text-slate-500 block">ANALYSIS_VERDICT</span>
                    <span className={cn(
                      "inline-block rounded px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider border mt-1",
                      analysisResult.verdictColor
                    )}>
                      {analysisResult.verdict}
                    </span>
                  </div>

                  {/* Radial score gauge */}
                  <div className="relative flex items-center justify-center">
                    <svg className="h-12 w-12 text-cyan-500/20" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeWidth="2.5" />
                      <motion.circle 
                        cx="18" cy="18" r="15.915" fill="none" 
                        stroke={analysisResult.trustScore > 75 ? "#10b981" : analysisResult.trustScore > 50 ? "#f59e0b" : "#f43f5e"} 
                        strokeWidth="2.5" 
                        strokeDasharray={`${analysisResult.trustScore} 100`}
                        initial={{ strokeDasharray: "0 100" }}
                        animate={{ strokeDasharray: `${analysisResult.trustScore} 100` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                      <span className="text-[10px] font-black text-white">{analysisResult.trustScore}%</span>
                      <span className="text-[6px] text-slate-500 uppercase -mt-0.5">TRUST</span>
                    </div>
                  </div>
                </div>

                {/* Warnings / Red Flags Box */}
                {analysisResult.spamAnomalies.length > 0 && (
                  <div className="rounded bg-rose-950/30 border border-rose-500/30 p-2.5 mb-4 text-[10px] leading-4 text-rose-300">
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-rose-400 mb-1">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                      <span>Warning: Suspicious Patterns Detected</span>
                    </div>
                    <ul className="list-disc pl-3.5 space-y-0.5">
                      {analysisResult.spamAnomalies.map((flag) => (
                        <li key={flag}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Aspect Extraction breakdown */}
                <div className="mb-4">
                  <span className="text-[8px] font-mono tracking-widest text-slate-500 block mb-2">EXTRACTED_PRODUCT_ASPECTS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.aspects.map((asp) => (
                      <span 
                        key={asp.aspect}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border",
                          asp.type === "positive" 
                            ? "border-emerald-500/20 bg-emerald-950/20 text-emerald-400" 
                            : "border-rose-500/20 bg-rose-950/20 text-rose-400"
                        )}
                      >
                        {asp.aspect}: {asp.type === "positive" ? "+" : "-"}{asp.score}%
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pros and Cons lists */}
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 text-[10px] leading-4">
                  <div>
                    <span className="text-[8px] font-mono tracking-widest text-emerald-500 uppercase block mb-1">Pro Aspects</span>
                    {analysisResult.pros.length > 0 ? (
                      <ul className="space-y-1 text-slate-300">
                        {analysisResult.pros.map((p) => (
                          <li key={p} className="flex gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-500 italic font-mono">No clear pros mined</span>
                    )}
                  </div>

                  <div>
                    <span className="text-[8px] font-mono tracking-widest text-rose-500 uppercase block mb-1">Con Aspects</span>
                    {analysisResult.cons.length > 0 ? (
                      <ul className="space-y-1 text-slate-300">
                        {analysisResult.cons.map((c) => (
                          <li key={c} className="flex gap-1.5">
                            <span className="text-rose-400 font-bold">✗</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-500 italic font-mono">No clear cons mined</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
