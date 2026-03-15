"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, 
  Database, 
  Brain, 
  Terminal, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Layers,
  Copy,
  Mail,
  RefreshCw,
  FolderCode
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

// TypeScript interfaces
export type RoleOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type StrengthOption = {
  id: string;
  label: string;
};

export type ProjectInterest = {
  id: string;
  title: string;
  description: string;
  mapTarget: string;
  technologies: string[];
};

export type MatchResult = {
  score: number;
  reasons: string[];
  nextSectionId: string;
  nextSectionLabel: string;
};

// Store data arrays at the top of the file for modularity
const ROLE_OPTIONS: RoleOption[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Polished interfaces, responsive layouts, animations, and Next.js experiences.",
    icon: Code
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    description: "End-to-end products using React, Next.js, Node.js, Express, MongoDB, PostgreSQL, and APIs.",
    icon: Layers
  },
  {
    id: "ai_ml",
    title: "AI/ML Intern",
    description: "ML workflows, Scikit-learn, Pandas, FastAPI services, and intelligent product ideas.",
    icon: Brain
  },
  {
    id: "open_source",
    title: "Open Source Contributor",
    description: "Community work, PR reviews, mentoring, workshops, and collaborative development.",
    icon: FaGithub
  },
  {
    id: "systems",
    title: "Systems-Oriented Developer",
    description: "C++, Redis-inspired cache systems, TCP server concepts, and developer tooling.",
    icon: Terminal
  }
];

const STRENGTH_OPTIONS: StrengthOption[] = [
  { id: "ui", label: "Interactive UI" },
  { id: "frontend_arch", label: "Clean Frontend Architecture" },
  { id: "api", label: "API Integration" },
  { id: "backend", label: "Backend Understanding" },
  { id: "ml", label: "ML Integration" },
  { id: "db", label: "Database Design" },
  { id: "devops", label: "DevOps Basics" },
  { id: "oss", label: "Open Source Collaboration" },
  { id: "docs", label: "Technical Documentation" },
  { id: "problemsolving", label: "Problem Solving" }
];

const PROJECT_INTERESTS: ProjectInterest[] = [
  {
    id: "skillsync",
    title: "AI Career Platform",
    description: "AI-driven career recommendation, user profiles, dashboard, and analysis.",
    mapTarget: "SkillSync Project",
    technologies: ["React", "FastAPI", "Pandas", "Scikit-Learn"]
  },
  {
    id: "swiftcache",
    title: "Cache / Systems Tool",
    description: "High-performance Redis-inspired server supporting TTL expiration and custom protocol.",
    mapTarget: "SwiftCache Project",
    technologies: ["C++17", "TCP Sockets", "TTL Engine", "Metrics"]
  },
  {
    id: "dashboard",
    title: "Developer Dashboard",
    description: "Dynamic frontend controls, active monitoring charts, and neon responsive grids.",
    mapTarget: "Portfolio & Dashboards",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"]
  },
  {
    id: "opensource",
    title: "Open Source Platform",
    description: "Git integration, mentoring hubs, workshop resources, and reviewer templates.",
    mapTarget: "Geekhaven & GSSoC repositories",
    technologies: ["Git", "GitHub Actions", "Markdown", "Community"]
  }
];

// Mapping results dynamically based on role selections
const RESULT_MAPPING: Record<string, MatchResult> = {
  frontend: {
    score: 94,
    reasons: [
      "Strong React, Next.js, Tailwind CSS, and TypeScript foundation.",
      "Can build animated, responsive, visually polished interfaces.",
      "Has frontend contribution experience through IIITA ERP Portal and portfolio work."
    ],
    nextSectionId: "projects",
    nextSectionLabel: "Featured Projects"
  },
  fullstack: {
    score: 92,
    reasons: [
      "Skilled in React/Next.js, Node.js, Express, MongoDB, PostgreSQL, JWT, and APIs.",
      "Built SkillSync with separated user management and ML prediction architecture.",
      "Understands scalable full-stack project structure."
    ],
    nextSectionId: "projects",
    nextSectionLabel: "Featured Projects"
  },
  ai_ml: {
    score: 89,
    reasons: [
      "Experience with Python, Pandas, Scikit-learn, FastAPI, and ML workflows.",
      "Built SkillSync as an AI-driven career recommendation platform.",
      "Worked on computational genomics features during SDE internship."
    ],
    nextSectionId: "projects",
    nextSectionLabel: "SkillSync Project"
  },
  open_source: {
    score: 95,
    reasons: [
      "GSSoC 2026 Mentor & Contributor.",
      "Geekhaven FOSS Wing member and OpenCode 2025 mentor.",
      "Conducted workshops for 100+ freshers and reviewed/guided contributors."
    ],
    nextSectionId: "open-source",
    nextSectionLabel: "Open Source Activity"
  },
  systems: {
    score: 88,
    reasons: [
      "Built SwiftCache, a Redis-inspired in-memory datastore using C++17.",
      "Worked with command registry, TTL expiration, TCP server design, and metrics.",
      "Strong C/C++ and problem-solving background."
    ],
    nextSectionId: "projects",
    nextSectionLabel: "SwiftCache Project"
  }
};

export function HireMeWorkflow() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [selectedProjectInterest, setSelectedProjectInterest] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState("Analyzing skills...");
  const [showResult, setShowResult] = useState(false);
  const [warningText, setWarningText] = useState<string | null>(null);

  // Circular Score Animation state
  const [animatedScore, setAnimatedScore] = useState(0);

  // Quick Action: scroll helper
  const scrollToSection = (id: string) => {
    const targetElement = 
      document.getElementById(id) || 
      document.getElementById(id.replace("-", "")) ||
      document.getElementById(id.replace("open-source", "opensource"));

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Validation before changing steps
  const validateAndProceed = () => {
    setWarningText(null);

    if (currentStep === 1) {
      if (!selectedRole) {
        setWarningText("Please select a developer role to continue.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (selectedStrengths.length === 0) {
        setWarningText("Please select at least one required strength.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!selectedProjectInterest) {
        setWarningText("Please select a project of interest.");
        return;
      }
      triggerMatchGeneration();
    }
  };

  // Multi-select strength pill handler
  const toggleStrength = (id: string) => {
    setWarningText(null);
    setSelectedStrengths(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Simulate loader scanning sequence
  const triggerMatchGeneration = () => {
    setIsGenerating(true);
    setLoadingStepText("Analyzing skills...");
    
    // Cycle text
    const textTimer1 = setTimeout(() => setLoadingStepText("Matching projects..."), 400);
    const textTimer2 = setTimeout(() => setLoadingStepText("Checking achievements..."), 800);
    const textTimer3 = setTimeout(() => setLoadingStepText("Preparing recruiter summary..."), 1200);

    const finishTimer = setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
      setCurrentStep(4);
    }, 1600);

    return () => {
      clearTimeout(textTimer1);
      clearTimeout(textTimer2);
      clearTimeout(textTimer3);
      clearTimeout(finishTimer);
    };
  };

  // Reset/Restart Workflow
  const handleRestart = () => {
    setSelectedRole(null);
    setSelectedStrengths([]);
    setSelectedProjectInterest(null);
    setCurrentStep(1);
    setIsGenerating(false);
    setShowResult(false);
    setWarningText(null);
    setAnimatedScore(0);
  };

  // Count up score animation when results reveal
  useEffect(() => {
    if (!showResult || !selectedRole) {
      return;
    }
    const matchDetails = RESULT_MAPPING[selectedRole] || RESULT_MAPPING.frontend;
    const target = matchDetails.score;
    
    let count = 0;
    const interval = setInterval(() => {
      count += 2;
      if (count >= target) {
        setAnimatedScore(target);
        clearInterval(interval);
      } else {
        setAnimatedScore(count);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [showResult, selectedRole]);

  // Selected details
  const currentRoleData = ROLE_OPTIONS.find(x => x.id === selectedRole);
  const currentProjectData = PROJECT_INTERESTS.find(x => x.id === selectedProjectInterest);
  const matchDetails = selectedRole ? (RESULT_MAPPING[selectedRole] || RESULT_MAPPING.frontend) : null;

  return (
    <section 
      id="hire-me" 
      className="relative w-full max-w-7xl mx-auto px-5 py-24 sm:px-8 lg:px-10 overflow-hidden"
    >
      {/* Absolute Decorative Floating Elements in Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <motion.div 
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-12 left-10 text-violet-400"
        >
          <Code className="h-16 w-16" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-12 text-cyan-400"
        >
          <Database className="h-20 w-20" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-16 left-1/4 text-fuchsia-400"
        >
          <Brain className="h-14 w-14" />
        </motion.div>
      </div>

      {/* Grid Container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Side: Wizard Interface */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl bg-slate-950/65 border border-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.1)] p-6 md:p-8 backdrop-blur-xl">
          
          <div>
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2 text-cyan-400 font-semibold tracking-wider text-xs uppercase">
                <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                <span>Interactive Recruiter System</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Find Your Developer Match
              </h2>
              <p className="mt-2 text-slate-400 text-sm md:text-base leading-relaxed">
                Select what you need and see how Suvanwita fits the role.
              </p>
            </div>

            {/* Steps Navigation Indicator */}
            <div className="mb-10 select-none">
              <div className="flex items-center justify-between relative max-w-md">
                {[
                  { num: 1, label: "Role" },
                  { num: 2, label: "Strengths" },
                  { num: 3, label: "Project" },
                  { num: 4, label: "Match" }
                ].map((s, idx, arr) => {
                  const isCompleted = currentStep > s.num;
                  const isActive = currentStep === s.num;
                  
                  return (
                    <React.Fragment key={s.num}>
                      <div className="flex flex-col items-center relative z-10">
                        <button
                          disabled={s.num > 3 && !showResult}
                          onClick={() => {
                            if (s.num <= 3) {
                              setWarningText(null);
                              setCurrentStep(s.num);
                            }
                          }}
                          aria-label={`Go to step ${s.num}: ${s.label}`}
                          className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 ${
                            isCompleted
                              ? "bg-violet-600 border-violet-500 text-white"
                              : isActive
                              ? "bg-slate-900 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.4)] font-extrabold"
                              : "bg-slate-950 border-white/10 text-slate-500"
                          }`}
                        >
                          {isCompleted ? <Check className="h-4.5 w-4.5" /> : s.num}
                        </button>
                        <span className={`mt-2 text-[10.5px] font-medium tracking-wide uppercase ${
                          isActive ? "text-cyan-400 font-bold" : "text-slate-500"
                        }`}>
                          {s.label}
                        </span>
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="flex-1 h-[2px] mx-2 bg-slate-900 self-center -translate-y-3 relative overflow-hidden">
                          <div 
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300"
                            style={{ width: isCompleted ? "100%" : isActive ? "50%" : "0%" }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Error Message alert */}
            <AnimatePresence>
              {warningText && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-6 rounded-xl border border-red-500/30 bg-red-950/20 px-4 py-3 text-xs font-medium text-red-300"
                  role="alert"
                >
                  ⚠️ {warningText}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wizard Slides */}
            <div className="min-h-[260px] flex items-center">
              <AnimatePresence mode="wait">
                
                {/* Step 1: Choose Role Need */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="w-full space-y-4"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">Step 1: Choose Your Hiring Target</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ROLE_OPTIONS.map((role) => {
                        const Icon = role.icon;
                        const isSelected = selectedRole === role.id;
                        
                        return (
                          <button
                            key={role.id}
                            onClick={() => {
                              setWarningText(null);
                              setSelectedRole(role.id);
                            }}
                            aria-pressed={isSelected}
                            className={`group relative flex flex-col justify-between items-start rounded-2xl p-4.5 text-left border transition-all duration-300 outline-none focus:ring-2 focus:ring-cyan-400 ${
                              isSelected
                                ? "bg-gradient-to-br from-violet-950/40 to-slate-900 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                : "bg-slate-900/40 border-white/5 hover:border-violet-500/30 hover:bg-slate-900/60"
                            }`}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/80 text-violet-400 border border-white/5 transition-transform group-hover:scale-110">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="mt-4">
                              <h4 className="text-xs md:text-sm font-bold text-white">{role.title}</h4>
                              <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{role.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Choose Required Strengths */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="w-full space-y-4"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white">Step 2: Define Core Strengths Needed</h3>
                      <p className="text-xs text-slate-500 mt-1">Select all keywords that match your development project priorities.</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {STRENGTH_OPTIONS.map((strength) => {
                        const isSelected = selectedStrengths.includes(strength.id);
                        
                        return (
                          <button
                            key={strength.id}
                            onClick={() => toggleStrength(strength.id)}
                            aria-pressed={isSelected}
                            className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide border transition-all duration-300 outline-none focus:ring-2 focus:ring-violet-400 ${
                              isSelected
                                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 border-violet-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.25)] scale-[1.03]"
                                : "bg-slate-900/60 border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
                            }`}
                          >
                            {strength.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Choose Project Interest */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="w-full space-y-4"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">Step 3: Highlight Your Primary Project Area</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {PROJECT_INTERESTS.map((proj) => {
                        const isSelected = selectedProjectInterest === proj.id;
                        
                        return (
                          <button
                            key={proj.id}
                            onClick={() => {
                              setWarningText(null);
                              setSelectedProjectInterest(proj.id);
                            }}
                            aria-pressed={isSelected}
                            className={`relative rounded-2xl p-4.5 text-left border transition-all duration-300 outline-none focus:ring-2 focus:ring-cyan-400 ${
                              isSelected
                                ? "bg-gradient-to-br from-violet-950/40 to-slate-900 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                : "bg-slate-900/40 border-white/5 hover:border-violet-500/30 hover:bg-slate-900/60"
                            }`}
                          >
                            <h4 className="text-xs md:text-sm font-bold text-white">{proj.title}</h4>
                            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{proj.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1">
                              {proj.technologies.map(tech => (
                                <span key={tech} className="rounded bg-slate-950 px-1.5 py-0.5 text-[9px] font-medium text-cyan-400">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 4 & Loader Overlay during calculation */}
                {currentStep === 4 && showResult && matchDetails && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full space-y-6"
                  >
                    <div className="flex flex-col md:flex-row items-stretch gap-6">
                      
                      {/* Left: Dynamic Match Score Circular Animation */}
                      <div className="flex flex-col items-center justify-center bg-slate-900/40 border border-white/5 rounded-2xl p-6 min-w-[200px]">
                        <div className="relative h-28 w-28 flex items-center justify-center">
                          <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                            {/* Track circle */}
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              stroke="rgba(255,255,255,0.05)" 
                              strokeWidth="7" 
                              fill="transparent" 
                            />
                            {/* Progress circle with neon gradient */}
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              stroke="url(#neonGradient)" 
                              strokeWidth="7.5" 
                              fill="transparent" 
                              strokeDasharray="251.2"
                              strokeDashoffset={251.2 - (251.2 * animatedScore) / 100}
                              strokeLinecap="round"
                              className="transition-all duration-100 ease-out"
                            />
                            <defs>
                              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#22d3ee" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="flex flex-col items-center z-10">
                            <span className="text-3xl font-black tracking-tight text-white">{animatedScore}%</span>
                            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">Match</span>
                          </div>
                        </div>
                        <h4 className="mt-4 text-xs font-bold text-center text-slate-300">
                          {currentRoleData?.title} Match
                        </h4>
                      </div>

                      {/* Right: Why She Fits details */}
                      <div className="flex-1 space-y-3">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Why She Fits the Role</h4>
                        <div className="space-y-2">
                          {matchDetails.reasons.map((reason, i) => (
                            <div key={i} className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-slate-900/35 p-3 text-xs leading-normal">
                              <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-violet-950 text-violet-400 font-bold border border-violet-500/20">
                                {i + 1}
                              </span>
                              <p className="text-slate-300">{reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Bottom Row controls */}
          <div className="mt-10 border-t border-white/10 pt-5 flex items-center justify-between">
            <div>
              {currentStep > 1 && currentStep < 4 && (
                <button
                  onClick={() => {
                    setWarningText(null);
                    setCurrentStep(prev => prev - 1);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-900 hover:text-white outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              )}
            </div>
            
            <div>
              {currentStep < 3 && (
                <button
                  onClick={validateAndProceed}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_4px_15px_rgba(139,92,246,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(34,211,238,0.4)] outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              {currentStep === 3 && (
                <button
                  onClick={validateAndProceed}
                  disabled={isGenerating}
                  className="group relative flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_15px_rgba(139,92,246,0.3)] transition-all hover:scale-[1.02] outline-none focus:ring-2 focus:ring-fuchsia-400 disabled:opacity-50"
                >
                  <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 opacity-20 blur-md transition-opacity group-hover:opacity-40" />
                  <span>Generate Match</span>
                  <Sparkles className="h-4 w-4 text-cyan-300 animate-spin" style={{ animationDuration: "3s" }} />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Active Previews or Calculated Action summaries */}
        <div className="lg:col-span-4 flex flex-col items-stretch justify-between rounded-3xl bg-slate-950/45 border border-white/5 p-6 backdrop-blur-xl">
          
          <AnimatePresence mode="wait">
            
            {/* Loading/Scanning state simulation */}
            {isGenerating && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center py-16 space-y-6 relative overflow-hidden"
              >
                {/* Visual horizontal glowing scanning line effect */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-[bounce_1.5s_infinite_linear]" />
                
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 border border-cyan-400/50">
                  <RefreshCw className="h-6 w-6 text-cyan-400 animate-spin" />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-white animate-pulse">Calculating Score...</h4>
                  <p className="mt-1 text-[11px] text-slate-500 tracking-wide">{loadingStepText}</p>
                </div>
              </motion.div>
            )}

            {/* If NOT loading, show visual summary preview cards */}
            {!isGenerating && !showResult && (
              <motion.div
                key="summary-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2 text-violet-400">
                    Match parameters
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Role need */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Selected Role</span>
                      <div className="mt-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
                        {currentRoleData ? (
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400"><Check className="h-4.5 w-4.5" /></span>
                            <span className="text-xs font-semibold text-white">{currentRoleData.title}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-600 italic">None selected</span>
                        )}
                      </div>
                    </div>

                    {/* Core strengths */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Strengths Selected ({selectedStrengths.length})</span>
                      <div className="mt-1.5 flex flex-wrap gap-1 max-h-[120px] overflow-y-auto p-1.5 rounded-xl bg-slate-900/30 border border-white/5">
                        {selectedStrengths.length > 0 ? (
                          selectedStrengths.map(id => {
                            const strength = STRENGTH_OPTIONS.find(x => x.id === id);
                            return (
                              <span key={id} className="rounded-full bg-violet-950/50 border border-violet-500/20 px-2 py-0.5 text-[10px] font-medium text-violet-300">
                                {strength?.label}
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-xs text-slate-600 italic">None selected</span>
                        )}
                      </div>
                    </div>

                    {/* Project Interest */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Target Area</span>
                      <div className="mt-1.5 p-3.5 rounded-2xl bg-slate-900/60 border border-white/5">
                        {currentProjectData ? (
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-fuchsia-400"><FolderCode className="h-4.5 w-4.5" /></span>
                              <span className="text-xs font-semibold text-white">{currentProjectData.title}</span>
                            </div>
                            <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
                              {currentProjectData.description}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-600 italic">None selected</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-slate-950/60 border border-white/5 text-[11px] leading-relaxed text-slate-500">
                  ⚡ Complete all 3 wizard parameters on the left to activate full recruiter candidate analysis.
                </div>
              </motion.div>
            )}

            {/* Calculated Report Summary Actions card */}
            {!isGenerating && showResult && matchDetails && (
              <motion.div
                key="final-report"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col justify-between py-2 space-y-6"
              >
                <div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2 text-cyan-400">
                    Recommendations
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-violet-500/20 bg-violet-950/15 p-4.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Recommended Next Step
                      </span>
                      <h4 className="mt-1 text-sm font-extrabold text-white">
                        {`Review Suvanwita's ${matchDetails.nextSectionLabel}`}
                      </h4>
                      <p className="mt-1.5 text-xs text-slate-400 leading-normal">
                        Based on your interest in {currentProjectData?.title || "projects"}, explore this core area to see active codebase structures, systems designs, or community assets.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-slate-900/30 p-3.5 space-y-2">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Role Target</span>
                        <span className="font-semibold text-slate-300">{currentRoleData?.title}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Primary Strength</span>
                        <span className="font-semibold text-slate-300">
                          {selectedStrengths.length > 0 
                            ? STRENGTH_OPTIONS.find(x => x.id === selectedStrengths[0])?.label 
                            : "Interactive UI"
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recruiter Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => scrollToSection(matchDetails.nextSectionId)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-xs font-bold text-white transition-all hover:bg-violet-500 hover:scale-[1.01]"
                  >
                    <FolderCode className="h-4.5 w-4.5" />
                    <span>View Projects</span>
                  </button>
                  
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-xs font-bold text-slate-200 transition-all hover:bg-slate-800 hover:text-white"
                  >
                    <Mail className="h-4.5 w-4.5" />
                    <span>Contact Suvanwita</span>
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText("dsuvanwita@gmail.com");
                        toast.success("Email copied: dsuvanwita@gmail.com", {
                          icon: "📧",
                          style: {
                            background: "rgba(10, 14, 30, 0.96)",
                            border: "1px solid rgba(139, 92, 246, 0.5)",
                            color: "#f8fbff",
                          }
                        });
                      }
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-950/10 px-4 py-3 text-xs font-bold text-cyan-400 transition-all hover:bg-cyan-950/20 hover:border-cyan-500/40"
                  >
                    <Copy className="h-4.5 w-4.5" />
                    <span>Copy Email</span>
                  </button>

                  <button
                    onClick={handleRestart}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/5 bg-transparent px-4 py-2.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-300"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Restart Match</span>
                  </button>
                </div>
                
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
