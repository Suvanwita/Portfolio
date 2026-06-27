"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sparkles, Server, Cpu, CheckCircle2, AlertTriangle, ArrowRight, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

type JobRole = {
  title: string;
  requiredSkills: string[];
};

const roles: JobRole[] = [
  { title: "Frontend Engineer", requiredSkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"] },
  { title: "Full Stack Engineer", requiredSkills: ["Node.js", "Express", "MongoDB", "React", "TypeScript", "Redis"] },
  { title: "Machine Learning Engineer", requiredSkills: ["Python", "FastAPI", "NLP", "Scikit-learn", "PyTorch"] },
];

export function CareerCraftDemo() {
  const [selectedRole, setSelectedRole] = useState<JobRole>(roles[0]!);
  const [skillsInput, setSkillsInput] = useState("React, Tailwind CSS, JavaScript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState<number>(-1);

  const steps = [
    { label: "Next.js Frontend", desc: "PDF text serialization & client dispatch" },
    { label: "Express.js Backend", desc: "JWT session auth & validation checks" },
    { label: "FastAPI ML-Service", desc: "NLP token parsing & keyword intersections" },
    { label: "MongoDB Database", desc: "Audit logging & history indexing" }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAtsScore(null);
    setMissingSkills([]);
    setActiveStep(0);
  };

  // Microservice path animation ticks
  useEffect(() => {
    if (!isAnalyzing) return;

    if (activeStep < steps.length) {
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      // Evaluate score based on input overlap
      const enteredWords = skillsInput
        .toLowerCase()
        .split(",")
        .map(w => w.trim())
        .filter(Boolean);

      const matched = selectedRole.requiredSkills.filter(skill => 
        enteredWords.some(word => word.includes(skill.toLowerCase()) || skill.toLowerCase().includes(word))
      );

      const missing = selectedRole.requiredSkills.filter(skill => !matched.includes(skill));
      const score = Math.round((matched.length / selectedRole.requiredSkills.length) * 100);

      setAtsScore(score);
      setMissingSkills(missing);
      setIsAnalyzing(false);
    }
  }, [isAnalyzing, activeStep, selectedRole, skillsInput]);

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5">
      {/* Title */}
      <div className="mb-5 border-b border-cyan-950/60 pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Interactive Simulation</p>
        <h4 className="mt-1 text-lg font-black text-white">CareerCraft ATS Analyzer & Architecture Flow</h4>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Left Column: ATS keyword analyzer sandbox */}
        <div className="sci-fi-panel rounded-xl border border-cyan-500/20 bg-slate-950/40 p-4 relative flex flex-col justify-between">
          <div className="sci-fi-corner sci-fi-corner-tl" />
          <div className="sci-fi-corner sci-fi-corner-br" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-4.5 w-4.5 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">ATS Keyword Scanner</span>
            </div>

            {/* Select Target Role */}
            <div className="mb-3">
              <p className="mb-1 text-[9px] font-mono tracking-widest text-slate-500 uppercase">Target Job Profile</p>
              <div className="flex flex-wrap gap-1.5">
                {roles.map((role) => (
                  <button
                    key={role.title}
                    type="button"
                    disabled={isAnalyzing}
                    onClick={() => {
                      setSelectedRole(role);
                      setAtsScore(null);
                    }}
                    className={cn(
                      "rounded px-2.5 py-1 text-[10px] font-bold border transition",
                      selectedRole.title === role.title
                        ? "border-cyan-400 bg-cyan-950/20 text-cyan-200"
                        : "border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/10 disabled:opacity-50"
                    )}
                  >
                    {role.title.split(" ")[0]} ML/Eng
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs skills */}
            <div className="mb-4">
              <p className="mb-1.5 text-[9px] font-mono tracking-widest text-slate-500 uppercase">Paste Resume Skills (Comma Separated)</p>
              <textarea
                value={skillsInput}
                onChange={(e) => {
                  setSkillsInput(e.target.value);
                  setAtsScore(null);
                }}
                disabled={isAnalyzing}
                className="w-full h-16 bg-slate-950/80 rounded border border-cyan-500/30 p-2 text-xs text-cyan-100 placeholder:text-slate-600 outline-none font-mono focus:border-cyan-400/60 disabled:opacity-50"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !skillsInput.trim()}
            className="w-full cyber-btn inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-4 py-2 text-xs font-black uppercase text-white shadow-neon transition hover:brightness-110 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            Evaluate ATS Compatibility
          </button>
        </div>

        {/* Right Column: Microservice Pipeline Visualizer & Score Output */}
        <div className="sci-fi-panel rounded-xl border border-cyan-500/25 bg-slate-950/50 p-4 min-h-[250px] flex flex-col justify-between relative overflow-hidden">
          <div className="sci-fi-corner sci-fi-corner-tr" />
          <div className="sci-fi-corner sci-fi-corner-bl" />
          
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.01)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

          {/* Steps Pipeline View */}
          <div className="relative z-10 flex flex-col gap-2.5 font-mono text-[9px] leading-5">
            <span className="text-[8px] tracking-widest text-pink-400 uppercase font-bold border-b border-cyan-950/60 pb-1">
              Microservice Pipeline execution
            </span>
            
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isDone = idx < activeStep;
              return (
                <div key={idx} className={cn(
                  "flex items-center gap-2.5 p-1 rounded transition-all duration-300",
                  isActive ? "bg-cyan-950/40 border border-cyan-500/20 text-cyan-200 font-bold translate-x-1" :
                  isDone ? "text-cyan-600/70" : "text-slate-600"
                )}>
                  <div className={cn(
                    "h-1.5 w-1.5 rounded-full shrink-0",
                    isActive ? "bg-cyan-400 animate-ping" : isDone ? "bg-emerald-400" : "bg-slate-700"
                  )} />
                  <div>
                    <span>{step.label}</span>
                    <span className="text-slate-500 font-normal ml-2">({step.desc})</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Results Summary block */}
          <div className="relative z-10 min-h-[90px] border-t border-cyan-950/50 pt-3 mt-3">
            <AnimatePresence mode="wait">
              {atsScore !== null && (
                <motion.div
                  key="score"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-[auto_1fr] gap-4"
                >
                  {/* Score badge */}
                  <div className="flex flex-col items-center justify-center border border-cyan-500/30 bg-cyan-950/20 rounded-lg p-2 min-w-[70px]">
                    <span className="text-2xl font-black text-white">{atsScore}%</span>
                    <span className="text-[7px] font-mono text-slate-500 uppercase mt-0.5">ATS Match</span>
                  </div>

                  {/* Missing details info */}
                  <div className="text-[10px] leading-4">
                    {missingSkills.length > 0 ? (
                      <div>
                        <span className="text-[8px] font-mono text-rose-400 font-bold uppercase tracking-wider block">
                          Missing Skill Gap
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {missingSkills.map(skill => (
                            <span key={skill} className="rounded bg-rose-950/30 border border-rose-500/20 px-1.5 py-0.5 text-[9px] font-mono text-rose-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-[8px] text-slate-500 font-mono mt-1">Tip: Add missing skills to improve ATS keyword intersection.</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>ATS OPTIMIZED: 100% SKILLS MATCH!</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div
                  key="analyzing"
                  className="flex items-center justify-center gap-2 text-slate-500 text-xs font-mono py-2"
                >
                  <RefreshCw className="h-4 w-4 animate-spin text-cyan-400" />
                  <span>Processing neural token matching...</span>
                </motion.div>
              )}

              {atsScore === null && !isAnalyzing && (
                <motion.div
                  key="standby"
                  className="text-center text-slate-600 text-[10px] font-mono italic py-4"
                >
                  Ready for evaluation. Select a job role and input resume skillsets.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}

function RefreshCw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
