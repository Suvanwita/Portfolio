"use client";

import type { MouseEvent } from "react";
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
  Activity
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

const bootLogs = [
  "SYSTEM BOOT: v2.6.27-alpha",
  "establishing connection to proxy node [IIIT-A]...",
  "security check: credentials verified.",
  "initializing full-stack engineering logs...",
  "loading developer tools & packages...",
  "status check: open source pipelines active.",
  "AI/ML recommendation modules loaded.",
  "warning: heavy talent detected in this sector.",
  "interactive terminal online. user mode: ready."
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  
  // Parallax / Hover coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Live Terminal Logs
  const [logs, setLogs] = useState<string[]>([]);
  
  // Interactive Pulse Scan state
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    let logIndex = 0;
    setLogs([bootLogs[0]]);
    
    const timer = setInterval(() => {
      logIndex++;
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]].slice(-6));
      } else {
        // Periodic telemetry statements
        const randomTicks = [
          `db latency: ${10 + Math.floor(Math.random() * 12)}ms | core: active`,
          `cpu temp: ${36 + Math.floor(Math.random() * 8)}°C | fan: auto`,
          "memory load: 43.1% | cache optimal",
          "listening for recruitment signals...",
          "projects online: SkillSync, SwiftCache, SheCare",
          "internship search queue: active"
        ];
        const randomLine = randomTicks[Math.floor(Math.random() * randomTicks.length)];
        setLogs(prev => [...prev, `[sync] ${randomLine}`].slice(-6));
      }
    }, 1600);

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePos({ x: 0, y: 0 });
  };

  const handlePulse = () => {
    setIsPulsing(true);
    toast.success("Cyber Pulse Scan Complete: 0 vulnerabilities found.", {
      icon: "🛡️",
      style: {
        background: "#0a1022",
        color: "#22d3ee",
        border: "1px solid rgba(34, 211, 238, 0.3)",
      }
    });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-5 py-16 sm:px-8 lg:px-10"
    >
      {/* Scanline Sweep Animation */}
      <div className="animate-scanline absolute inset-0 z-0 pointer-events-none" />

      {/* Cyber Grid overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(34,211,238,0.15),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.12),transparent_40%)] pointer-events-none" />

      {/* Futuristic Background Circles */}
      <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] border border-cyan-500/5 rounded-full pointer-events-none hidden lg:block" />
      <div className="absolute top-[20%] right-[15%] w-[380px] h-[380px] border border-dashed border-violet-500/5 rounded-full pointer-events-none hidden lg:block" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        
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

          {/* Simulated Cyber Terminal Logger */}
          <div className="sci-fi-panel rounded-lg overflow-hidden border border-cyan-500/20 max-w-xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-cyan-950 bg-cyan-950/40 px-3 py-2 text-[10px] font-mono tracking-widest text-cyan-400">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5" />
                <span>TERMINAL://BIOMETRY_FEED</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
            {/* Terminal Logs View */}
            <div className="bg-slate-950/80 p-3 font-mono text-[11px] leading-5 text-cyan-100/90 min-h-[142px]">
              <AnimatePresence mode="popLayout">
                {logs.map((log, index) => (
                  <motion.div
                    key={log + index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={
                      log.startsWith("SYSTEM") || log.startsWith("Status")
                        ? "text-pink-400 font-bold"
                        : log.startsWith("[sync]")
                        ? "text-violet-400"
                        : "text-cyan-300"
                    }
                  >
                    <span className="text-cyan-600 mr-1.5">&gt;</span>
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Cyber action buttons */}
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="cyber-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-neon hover:brightness-110 active:scale-95"
            >
              <Send className="h-4 w-4" />
              Launch Projects
            </a>
            <a
              href="/resume.pdf"
              className="cyber-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 active:scale-95"
            >
              <FileText className="h-4 w-4" />
              Access Resume
            </a>
            <button
              onClick={handlePulse}
              className="cyber-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-pink-500/30 bg-pink-950/20 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-pink-300 hover:border-pink-400/60 hover:bg-pink-500/10 active:scale-95"
            >
              <Activity className="h-4 w-4" />
              Pulse Scan
            </button>
          </div>

          {/* Cyber Ports (Social Links) */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              [PORTS]:
            </span>
            <div className="flex gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-950/60 text-slate-300 transition-all duration-300 ${item.color}`}
                >
                  <item.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive Telemetry HUD Card & Rings */}
        <div className="relative flex justify-center items-center h-[460px] lg:h-[500px]">
          
          {/* Pulse Ripple Scan Circle */}
          <AnimatePresence>
            {isPulsing && (
              <motion.div
                initial={{ opacity: 0.8, scale: 0.2 }}
                animate={{ opacity: 0, scale: 2.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute z-0 h-[280px] w-[280px] rounded-full border-2 border-cyan-400 bg-cyan-400/5 shadow-[0_0_80px_rgba(34,211,238,0.4)] pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Concentric Rotating Telemetry Rings */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            {/* Outer dotted dial */}
            <div className="absolute w-[360px] h-[360px] sm:w-[410px] sm:h-[410px] rounded-full border border-dashed border-cyan-300/15 animate-spin-slow" />
            
            {/* Inner telemetry ring with SVG notches */}
            <svg 
              className="absolute w-[290px] h-[290px] sm:w-[330px] sm:h-[330px] text-cyan-400/20 animate-spin-reverse-slow" 
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="25 8" />
            </svg>

            {/* Radar Sweep Arc line */}
            <div className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border-l-2 border-t-2 border-cyan-400/30 animate-spin-slow" />
          </div>

          {/* Specialty Badge A: AI/ML (Top-Left) */}
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [-6, 6, -6], x: [-3, 3, -3] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[8%] left-[4%] sm:left-[12%] z-20 sci-fi-panel rounded-lg border border-cyan-500/30 p-2.5 flex items-center gap-2.5 backdrop-blur shadow-[0_0_20px_rgba(34,211,238,0.1)]"
          >
            <div className="sci-fi-corner sci-fi-corner-tl" />
            <div className="sci-fi-corner sci-fi-corner-br" />
            <div className="p-1.5 rounded bg-cyan-950/60 text-cyan-300">
              <Cpu className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">COGNITION_CORE</p>
              <p className="text-xs font-black text-white">AI / ML Expert</p>
            </div>
          </motion.div>

          {/* Specialty Badge B: Full Stack (Top-Right) */}
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [6, -6, 6], x: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[16%] right-[2%] sm:right-[8%] z-20 sci-fi-panel rounded-lg border border-pink-500/30 p-2.5 flex items-center gap-2.5 backdrop-blur shadow-[0_0_20px_rgba(236,72,153,0.1)]"
          >
            <div className="sci-fi-corner sci-fi-corner-tr" />
            <div className="sci-fi-corner sci-fi-corner-bl" />
            <div className="p-1.5 rounded bg-pink-950/60 text-pink-300">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-pink-400">ENGINE_STACK</p>
              <p className="text-xs font-black text-white">Full Stack Dev</p>
            </div>
          </motion.div>

          {/* Specialty Badge C: Systems (Bottom-Right) */}
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [-5, 5, -5], x: [3, -3, 3] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[6%] sm:right-[15%] z-20 sci-fi-panel rounded-lg border border-violet-500/30 p-2.5 flex items-center gap-2.5 backdrop-blur shadow-[0_0_20px_rgba(139,92,246,0.1)]"
          >
            <div className="sci-fi-corner sci-fi-corner-tl" />
            <div className="sci-fi-corner sci-fi-corner-br" />
            <div className="p-1.5 rounded bg-violet-950/60 text-violet-300">
              <Database className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-violet-400">DATALINK_SYSTEM</p>
              <p className="text-xs font-black text-white">Redis / C++17</p>
            </div>
          </motion.div>

          {/* Interactive 3D Parallax Hologram Card Container */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] cursor-pointer"
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="w-full h-full sci-fi-panel rounded-[1.75rem] border border-cyan-400/25 p-5 flex flex-col justify-between overflow-hidden"
              style={{
                rotateX: shouldReduceMotion ? 0 : mousePos.y * -20,
                rotateY: shouldReduceMotion ? 0 : mousePos.x * 20,
                transformStyle: "preserve-3d",
              }}
              animate={{
                boxShadow: isHovering 
                  ? "0 0 45px rgba(34, 211, 238, 0.35), inset 0 0 15px rgba(34, 211, 238, 0.15)"
                  : "0 24px 60px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.05)"
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Internal decorative holographic lines & grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

              {/* Card Brackets */}
              <div className="sci-fi-corner sci-fi-corner-tl" />
              <div className="sci-fi-corner sci-fi-corner-tr" />
              <div className="sci-fi-corner sci-fi-corner-bl" />
              <div className="sci-fi-corner sci-fi-corner-br" />

              {/* Holographic Header */}
              <div className="flex justify-between items-start" style={{ transform: "translateZ(30px)" }}>
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-cyan-400 block">IDENTITY</span>
                  <h2 className="text-xl font-black tracking-wider text-white">S.DAS</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_20px_rgba(34,211,238,0.4)] text-sm font-black text-white">
                  SD
                </div>
              </div>

              {/* Radial HUD Telemetry Graphic in center */}
              <div className="relative flex justify-center items-center my-4 h-28" style={{ transform: "translateZ(40px)" }}>
                <svg className="w-24 h-24 text-cyan-400/30 animate-spin-slow absolute" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="30, 10" />
                </svg>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">LOC_SECTOR</span>
                  <span className="text-[11px] font-bold text-cyan-200 mt-0.5">IIIT-A, IND</span>
                </div>
              </div>

              {/* Stats Diagnostics list */}
              <div className="space-y-2.5" style={{ transform: "translateZ(35px)" }}>
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-lg border border-cyan-500/10 bg-cyan-950/20 px-3.5 py-2.5 transition-all hover:bg-cyan-950/40 hover:border-cyan-500/20"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
                    </div>
                    <span className="text-xs font-black text-cyan-300">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Telemetry diagnostics bar */}
              <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-cyan-500/60" style={{ transform: "translateZ(20px)" }}>
                <span>DECV_MODE: ON</span>
                <span>SEC_LATENCY: 12ms</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

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
