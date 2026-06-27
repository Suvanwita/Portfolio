"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Heart, Sparkles, MessageCircle, AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

type Question = {
  q: string;
  a: string;
};

const chatPrompts: Question[] = [
  { q: "I feel stressed about my PCOS symptoms.", a: "I hear you, and it's completely normal to feel this way. Remember, tracking symptoms is a tool for understanding your body, not a final diagnosis. Be gentle with yourself today. Let's try a 2-minute breathing exercise." },
  { q: "What workouts are best for insulin resistance?", a: "Gentle strength training and low-impact cardiovascular exercises (like walking or swimming) are excellent. They help muscles absorb glucose without elevating cortisol levels too heavily." },
  { q: "Are there simple dietary changes I can make?", a: "Focusing on whole foods, fiber, and lean proteins helps maintain stable blood sugar. Try pairing complex carbs with healthy fats to prevent insulin spikes." }
];

export function FemCareDemo() {
  // Severity Calculator states
  const [cycleVal, setCycleVal] = useState<"low" | "medium" | "high">("medium");
  const [acneVal, setAcneVal] = useState<"none" | "moderate" | "severe">("moderate");
  const [weightVal, setWeightVal] = useState<"stable" | "increased" | "high">("stable");
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictResult, setPredictResult] = useState<{ risk: string; confidence: number; color: string } | null>(null);

  // Chatbot states
  const [chatLog, setChatLog] = useState<{ sender: "user" | "bot"; text: string }[]>([]);

  const runClassifier = () => {
    setIsPredicting(true);
    setPredictResult(null);

    setTimeout(() => {
      // Simple mock classifier logic
      let score = 0;
      if (cycleVal === "medium") score += 1;
      if (cycleVal === "high") score += 2;
      if (acneVal === "moderate") score += 1;
      if (acneVal === "severe") score += 2;
      if (weightVal === "increased") score += 1;
      if (weightVal === "high") score += 2;

      let risk = "MILD (LOW RISK)";
      let color = "text-emerald-400 border-emerald-500/20 bg-emerald-950/20";
      if (score >= 2 && score <= 4) {
        risk = "MODERATE RISK";
        color = "text-yellow-400 border-yellow-500/20 bg-yellow-950/20";
      } else if (score > 4) {
        risk = "SEVERE (HIGH RISK)";
        color = "text-rose-400 border-rose-500/20 bg-rose-950/20";
      }

      setPredictResult({
        risk,
        confidence: Math.round(75 + Math.random() * 20),
        color
      });
      setIsPredicting(false);
    }, 900);
  };

  const selectChatPrompt = (prompt: Question) => {
    setChatLog([
      { sender: "user", text: prompt.q },
      { sender: "bot", text: prompt.a }
    ]);
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5">
      {/* Title */}
      <div className="mb-5 border-b border-rose-950/60 pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-300">Interactive Simulation</p>
        <h4 className="mt-1 text-lg font-black text-white">FEM-CARE Predictor & Chatbot</h4>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Left Column: Symptom Input Random Forest Predictor */}
        <div className="sci-fi-panel rounded-xl border border-rose-500/20 bg-slate-950/40 p-4 relative flex flex-col justify-between">
          <div className="sci-fi-corner sci-fi-corner-tl" />
          <div className="sci-fi-corner sci-fi-corner-br" />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-rose-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Symptom Severity Predictor</span>
            </div>

            {/* Cycle Select */}
            <div>
              <p className="mb-1 text-[9px] font-mono tracking-widest text-slate-500 uppercase">Cycle Irregularity</p>
              <div className="flex gap-1.5">
                {["low", "medium", "high"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    disabled={isPredicting}
                    onClick={() => {
                      setCycleVal(v as any);
                      setPredictResult(null);
                    }}
                    className={cn(
                      "flex-1 rounded py-1 text-[10px] font-bold border transition uppercase",
                      cycleVal === v
                        ? "border-rose-400 bg-rose-950/20 text-rose-200"
                        : "border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/10 disabled:opacity-50"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Acne / Hirsutism */}
            <div>
              <p className="mb-1 text-[9px] font-mono tracking-widest text-slate-500 uppercase">Androgen Symptoms (Acne/Hair)</p>
              <div className="flex gap-1.5">
                {["none", "moderate", "severe"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    disabled={isPredicting}
                    onClick={() => {
                      setAcneVal(v as any);
                      setPredictResult(null);
                    }}
                    className={cn(
                      "flex-1 rounded py-1 text-[10px] font-bold border transition uppercase",
                      acneVal === v
                        ? "border-rose-400 bg-rose-950/20 text-rose-200"
                        : "border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/10 disabled:opacity-50"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight gain */}
            <div>
              <p className="mb-1 text-[9px] font-mono tracking-widest text-slate-500 uppercase">Weight / Metabolic Shift</p>
              <div className="flex gap-1.5">
                {["stable", "increased", "high"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    disabled={isPredicting}
                    onClick={() => {
                      setWeightVal(v as any);
                      setPredictResult(null);
                    }}
                    className={cn(
                      "flex-1 rounded py-1 text-[10px] font-bold border transition uppercase",
                      weightVal === v
                        ? "border-rose-400 bg-rose-950/20 text-rose-200"
                        : "border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/10 disabled:opacity-50"
                    )}
                  >
                    {v === "high" ? "Critical Shift" : v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={runClassifier}
            disabled={isPredicting}
            className="mt-4 w-full cyber-btn inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-4 py-2 text-xs font-black uppercase text-white shadow-neon transition hover:brightness-110 disabled:opacity-50"
          >
            <Brain className="h-4 w-4" />
            Traverse Random Forest Models
          </button>
        </div>

        {/* Right Column: Chatbot Support / Predict Output */}
        <div className="flex flex-col gap-4">
          
          {/* Output Predictions details */}
          <div className="sci-fi-panel rounded-xl border border-rose-500/20 bg-slate-950/40 p-4 relative min-h-[90px] flex items-center justify-center font-mono">
            <div className="sci-fi-corner sci-fi-corner-tr" />
            <div className="sci-fi-corner sci-fi-corner-bl" />
            
            <AnimatePresence mode="wait">
              {predictResult && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Model Decision:</span>
                    <span className={cn("inline-block rounded px-2 py-0.5 mt-1 border text-[9px] font-bold tracking-wide uppercase", predictResult.color)}>
                      {predictResult.risk}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block">Forest Confidence:</span>
                    <span className="text-sm font-black text-rose-300 block mt-0.5">{predictResult.confidence}%</span>
                  </div>
                </motion.div>
              )}

              {isPredicting && (
                <motion.div
                  key="loading"
                  className="flex items-center gap-2 text-slate-500 text-[10px] py-1"
                >
                  <span className="animate-spin text-rose-400">⚡</span>
                  <span>Running Gini Impurity split path checks...</span>
                </motion.div>
              )}

              {predictResult === null && !isPredicting && (
                <motion.span
                  key="standby"
                  className="text-slate-600 text-[10px] italic"
                >
                  Standalone ML model standby. Adjust symptoms and predict.
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Calming mental health Chatbot */}
          <div className="sci-fi-panel rounded-xl border border-rose-500/20 bg-slate-950/40 p-4 relative">
            <div className="sci-fi-corner sci-fi-corner-tl" />
            <div className="sci-fi-corner sci-fi-corner-br" />

            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-4.5 w-4.5 text-rose-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Empathetic Chatbot Assistant</span>
            </div>

            {/* Prompt templates buttons */}
            <div className="flex flex-col gap-1.5 mb-3">
              {chatPrompts.map((cp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectChatPrompt(cp)}
                  className="text-left w-full rounded bg-slate-950/60 border border-white/5 p-2 text-[9px] text-slate-400 hover:border-rose-500/20 hover:text-rose-200 transition font-mono"
                >
                  ? &quot;{cp.q}&quot;
                </button>
              ))}
            </div>

            {/* Simulated Chat Feed */}
            <div className="rounded bg-slate-950/80 border border-rose-950 p-2.5 min-h-[90px] font-mono text-[9px] leading-4 text-rose-200">
              {chatLog.length === 0 ? (
                <p className="text-slate-600 text-center italic mt-6">Select a wellness inquiry above to converse.</p>
              ) : (
                <div className="space-y-2">
                  {chatLog.map((chat, idx) => (
                    <div key={idx} className={cn(
                      "rounded p-2 max-w-[85%] border",
                      chat.sender === "user" 
                        ? "bg-slate-900/60 border-white/5 ml-auto text-slate-300"
                        : "bg-rose-950/20 border-rose-500/20 mr-auto text-rose-200"
                    )}>
                      <p className="font-bold text-[8px] text-slate-500 uppercase mb-0.5">{chat.sender}</p>
                      <p>{chat.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
