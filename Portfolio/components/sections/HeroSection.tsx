"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  ArrowDown, 
  FileText, 
  Mail, 
  Send, 
  Sparkles, 
  Cpu, 
  Layers, 
  Terminal, 
  Database, 
  Network,
  Shield,
  Activity,
  CheckCircle2,
  GitCommit
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TypewriterText } from "@/components/animations/typewriter-text";
import { profile, stats } from "@/data/portfolio";
import toast from "react-hot-toast";

const roles = [
  "Full Stack Developer",
  "AI/ML Explorer",
  "Open Source Contributor",
  "Systems Enthusiast",
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Suvanwita", icon: FaGithub, color: "hover:border-cyan-300/60 hover:text-cyan-400 hover:bg-cyan-300/10" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/suvanwita-d-1ba7a9325/", icon: FaLinkedin, color: "hover:border-violet-300/60 hover:text-violet-400 hover:bg-violet-300/10" },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, color: "hover:border-pink-300/60 hover:text-pink-400 hover:bg-pink-300/10" },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  
  // Real-time telemetry resource loads
  const [cpuLoad, setCpuLoad] = useState(42);
  const [memLoad, setMemLoad] = useState(64.2);
  const [activeTab, setActiveTab] = useState<"systems" | "cognition" | "git">("systems");

  // System calibration state
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);

  // Fluctuating values logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(40 + Math.floor(Math.random() * 12));
      setMemLoad(64.0 + Math.random() * 0.4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // System Calibration handler
  const handleCalibrate = () => {
    if (isCalibrating) return;
    setIsCalibrating(true);
    setCalibrationProgress(0);

    toast.success("Calibration initiated. Tuning neural systems...", {
      icon: "⚙️",
      style: {
        background: "#0a1022",
        color: "#22d3ee",
        border: "1px solid rgba(34, 211, 238, 0.3)",
      }
    });
  };

  useEffect(() => {
    if (!isCalibrating) return;
    if (calibrationProgress < 100) {
      const timer = setTimeout(() => {
        setCalibrationProgress(prev => Math.min(100, prev + 20));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsCalibrating(false);
      toast.success("All systems calibrated. Diagnostic: OPTIMAL", {
        icon: "🛡️",
        style: {
          background: "#0a1022",
          color: "#10b981",
          border: "1px solid rgba(16, 185, 129, 0.3)",
        }
      });
    }
  }, [isCalibrating, calibrationProgress]);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-5 py-16 sm:px-8 lg:px-10"
    >
      {/* Grid Scanline Overlay */}
      <div className="animate-scanline absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(34,211,238,0.12),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.1),transparent_40%)] pointer-events-none" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        
        {/* Left Side: Biography, Roles, Live Terminal */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          {/* Signal Header Badge */}
          <div className="inline-flex max-w-max items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span>SYSTEM SIGNAL: OPERATIONAL</span>
          </div>

          {/* Glitch-effect Main Title */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400 block mb-1">
              [DEVELOPER_PORTAL]
            </span>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Hi, I&apos;m{" "}
              <span className="text-gradient hover:animate-cyber-flicker cursor-default">
                Suvanwita Das
              </span>
            </h1>
          </div>

          {/* Typewriter text roles */}
          <div className="min-h-12 text-2xl font-black text-cyan-300 sm:min-h-16 sm:text-4xl">
            <TypewriterText texts={roles} speed={50} pauseMs={1500} />
          </div>

          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            I engineer high-performance web systems, integrate AI/ML intelligence pipelines, and participate in active open-source ecosystems. Let&apos;s build tomorrow&apos;s tech interface.
          </p>

          {/* Status Metrics Ribbon */}
          <div className="flex flex-wrap gap-3 font-mono text-[10px]">
            <span className="border border-white/5 bg-slate-900/60 rounded px-2.5 py-1 text-slate-400">
              UPTIME: <b className="text-cyan-300">99.98%</b>
            </span>
            <span className="border border-white/5 bg-slate-900/60 rounded px-2.5 py-1 text-slate-400">
              PING: <b className="text-pink-300">12ms</b>
            </span>
            <span className="border border-white/5 bg-slate-900/60 rounded px-2.5 py-1 text-slate-400">
              LOC: <b className="text-violet-300">IIIT-A</b>
            </span>
            <span className="border border-white/5 bg-slate-900/60 rounded px-2.5 py-1 text-slate-400">
              TARGET: <b className="text-emerald-300">SDE_2026</b>
            </span>
          </div>

          {/* Cyber action buttons */}
          <div className="mt-2 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="cyber-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-neon hover:brightness-110 active:scale-95"
            >
              <Send className="h-4 w-4" />
              Launch Projects
            </a>
            <a
              href="/Portfolio/resume.pdf"
              className="cyber-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 active:scale-95"
            >
              <FileText className="h-4 w-4" />
              Access Resume
            </a>
          </div>

          {/* Cyber Ports (Social Links) */}
          <div className="mt-2 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              [PORTS]:
            </span>
            <div className="flex gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-950/60 text-slate-300 transition-all duration-300 ${item.color}`}
                >
                  <item.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive Telemetry HUD Card & Diagnostics deck */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="sci-fi-panel rounded-2xl border border-cyan-500/25 bg-slate-950/50 p-5 flex flex-col justify-between overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.06)] relative min-h-[440px]"
        >
          {/* Decorative sci-fi corners */}
          <div className="sci-fi-corner sci-fi-corner-tl" />
          <div className="sci-fi-corner sci-fi-corner-tr" />
          <div className="sci-fi-corner sci-fi-corner-bl" />
          <div className="sci-fi-corner sci-fi-corner-br" />

          {/* Core HUD diagnostics header */}
          <div className="flex items-center justify-between border-b border-cyan-950/80 pb-4 mb-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg border border-cyan-500/20 bg-cyan-950/30 flex items-center justify-center text-cyan-300">
                <Activity className="h-4 w-4 animate-pulse" />
              </div>
              <div>
                <p className="text-[8px] font-mono tracking-widest text-slate-500">DIAGNOSTICS_HOST</p>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Neural Deck v2.6</h3>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 rounded px-2 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE FEED</span>
            </div>
          </div>

          {/* Live system resource counters */}
          <div className="grid gap-3 sm:grid-cols-2 mb-4 shrink-0">
            <div className="border border-white/5 bg-white/[0.02] rounded-xl p-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-cyan-300" /> CPU CORE LOAD
                </span>
                <span className="text-cyan-300 font-bold">{cpuLoad}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500" 
                  style={{ width: `${cpuLoad}%` }}
                />
              </div>
            </div>

            <div className="border border-white/5 bg-white/[0.02] rounded-xl p-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-pink-300" /> RAM CAPACITY
                </span>
                <span className="text-pink-300 font-bold">{memLoad.toFixed(2)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-pink-400 to-violet-500 transition-all duration-500" 
                  style={{ width: `${memLoad}%` }}
                />
              </div>
            </div>
          </div>

          {/* Inner interactive tabs panel */}
          <div className="flex-1 flex flex-col justify-between min-h-0">
            
            {/* Tab selectors */}
            <div className="flex border-b border-cyan-950/60 pb-1 gap-4 font-mono text-[10px] shrink-0">
              {[
                { id: "systems", label: "SYSTEMS", icon: Network },
                { id: "cognition", label: "COGNITION", icon: Layers },
                { id: "git", label: "GIT FEED", icon: GitCommit }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex items-center gap-1.5 pb-2 border-b-2 transition ${
                    activeTab === t.id 
                      ? "border-cyan-400 text-white font-bold" 
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab viewport */}
            <div className="flex-1 py-4 text-xs font-mono min-h-[140px]">
              <AnimatePresence mode="wait">
                {activeTab === "systems" && (
                  <motion.div
                    key="systems"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-2 text-slate-300 leading-5"
                  >
                    <div className="flex justify-between items-center bg-slate-900/30 p-2 rounded border border-white/5">
                      <span>DATALINK EXCHANGER</span>
                      <span className="text-emerald-400 font-bold uppercase">CONNECTED</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-900/30 p-2 rounded border border-white/5">
                      <span>REDIS CACHE MUTEX</span>
                      <span className="text-cyan-300 font-bold uppercase">MUTUAL_LOCK_OK</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-900/30 p-2 rounded border border-white/5">
                      <span>SOCKET LEAK STATUS</span>
                      <span className="text-emerald-400 font-bold">0 LEAKS (ACTIVE)</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "cognition" && (
                  <motion.div
                    key="cognition"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-2.5 text-slate-300"
                  >
                    <div className="flex items-center justify-between border border-cyan-500/20 bg-cyan-950/15 rounded p-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="font-bold text-white">PCOS Severity Model</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase">Random Forest</span>
                    </div>
                    <div className="flex items-center justify-between border border-pink-500/20 bg-pink-950/15 rounded p-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
                        <span className="font-bold text-white">TrustCart NLP Parser</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase">HF Transformers</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "git" && (
                  <motion.div
                    key="git"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2 text-[10px] text-slate-400 leading-4"
                  >
                    <div>
                      <span className="text-cyan-400 font-bold">commit f8a12bc</span> - suvanwita: merged Zod validators
                    </div>
                    <div>
                      <span className="text-pink-400 font-bold">commit 9c78ea2</span> - suvanwita: updated Mizzou remote stats
                    </div>
                    <div>
                      <span className="text-violet-400 font-bold">commit 3b40d12</span> - suvanwita: calibrated radar console
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* System reboot / calibrate trigger */}
            <div className="pt-3 border-t border-cyan-950/40 shrink-0">
              {isCalibrating ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-cyan-300">
                    <span>CALIBRATING SDE NODES...</span>
                    <span>{calibrationProgress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full bg-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${calibrationProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCalibrate}
                  className="w-full flex items-center justify-center gap-2 rounded border border-cyan-500/20 hover:border-cyan-400/50 bg-cyan-950/30 hover:bg-cyan-500/10 text-cyan-300 py-2.5 text-xs font-black uppercase tracking-wider transition font-mono"
                >
                  <Shield className="h-4 w-4" />
                  <span>[ Calibrate Neural Deck ]</span>
                </button>
              )}
            </div>

          </div>

        </motion.div>
      </div>

      {/* Downward navigation indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-cyan-300 sm:inline-flex"
      >
        <motion.span
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-11 w-7 items-start justify-center rounded-full border border-cyan-500/40 p-1 bg-slate-950/40 backdrop-blur shadow-[0_0_15px_rgba(34,211,238,0.15)]"
        >
          <ArrowDown className="h-4 w-4 text-cyan-400" aria-hidden="true" />
        </motion.span>
      </a>
    </section>
  );
}
