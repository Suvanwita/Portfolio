"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const skillOptions = [
  "React",
  "Node.js",
  "Python",
  "Machine Learning",
  "MongoDB",
  "FastAPI",
  "Data Science",
  "UI Design",
];

const profileTypes = ["Analytical", "Creative", "Logical", "Collaborative"];

const suggestedSkills = ["FastAPI", "Scikit-learn", "System Design", "Docker"];
const suggestedProjects = ["AI Career Recommender", "Analytics Dashboard", "ML API Service"];

type SkillSyncDemoProps = {
  compact?: boolean;
};

export function SkillSyncDemo({ compact = false }: SkillSyncDemoProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "Python"]);
  const [profileType, setProfileType] = useState("Analytical");
  const [isThinking, setIsThinking] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) =>
      current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill],
    );
    setHasResult(false);
  };

  const generatePath = () => {
    setIsThinking(true);
    setHasResult(false);

    window.setTimeout(() => {
      setIsThinking(false);
      setHasResult(true);
    }, 1100);
  };

  return (
    <div className={cn("rounded-2xl border border-white/10 bg-black/25 p-4", compact ? "mt-6" : "mt-8")}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Interactive Demo</p>
          <h4 className="mt-1 text-lg font-black text-white">SkillSync AI Path Generator</h4>
        </div>
        <Brain className="h-6 w-6 text-pink-200" aria-hidden="true" />
      </div>

      <div className={cn("grid gap-4", compact ? "" : "lg:grid-cols-[1fr_0.9fr]")}>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Select skills</p>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => {
              const isSelected = selectedSkills.includes(skill);

              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-bold transition",
                    isSelected
                      ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white",
                  )}
                >
                  {skill}
                </button>
              );
            })}
          </div>

          <p className="mb-3 mt-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Intelligence profile
          </p>
          <div className="grid grid-cols-2 gap-2">
            {profileTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setProfileType(type);
                  setHasResult(false);
                }}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-bold transition",
                  profileType === type
                    ? "border-pink-300/50 bg-pink-300/15 text-pink-100"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white",
                )}
              >
                {type}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={generatePath}
            disabled={selectedSkills.length === 0 || isThinking}
            className="mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-4 py-2 text-xs font-black text-white shadow-neon transition hover:brightness-110 disabled:pointer-events-none disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Generate Career Path
          </button>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <AnimatePresence mode="wait">
            {isThinking ? (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex min-h-56 flex-col items-center justify-center text-center"
              >
                <motion.div
                  className="h-12 w-12 rounded-full border-2 border-cyan-300/20 border-t-cyan-200"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-sm font-bold text-cyan-100">AI is mapping your career graph...</p>
              </motion.div>
            ) : hasResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Recommended Path</p>
                <h5 className="mt-2 text-2xl font-black text-white">AI Full Stack Developer</h5>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs font-bold text-slate-300">
                    <span>Match Score</span>
                    <span>92%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-[image:var(--gradient-neon)]"
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-pink-100">Suggested Skills</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {suggestedSkills.map((skill) => (
                        <span key={skill} className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-pink-100">Suggested Projects</p>
                    <div className="mt-2 grid gap-2">
                      {suggestedProjects.map((project, index) => (
                        <motion.div
                          key={project}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                        >
                          {project}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-56 flex-col justify-center"
              >
                <p className="text-sm leading-6 text-slate-300">
                  Choose a skill mix and intelligence profile, then generate a fake AI career path preview.
                </p>
                <div className="mt-5 space-y-3">
                  {[72, 58, 84].map((width, index) => (
                    <div key={width} className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-cyan-300/30"
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.8, delay: index * 0.12 }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
