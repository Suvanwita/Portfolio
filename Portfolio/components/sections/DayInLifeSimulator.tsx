"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Clock, Activity, Play, CheckCircle2, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type TimeBlock = {
  time: string;
  title: string;
  tag: string;
  tagColor: string;
  logs: string[];
};

const schedule: TimeBlock[] = [
  {
    time: "09:30 AM",
    title: "System Telemetry & Audits",
    tag: "TELEMETRY",
    tagColor: "border-cyan-500/20 bg-cyan-950/20 text-cyan-400",
    logs: [
      "[telemetry] Initializing daily system diagnostics...",
      "[telemetry] Prometheus metrics: SheCare API instances reporting healthy state.",
      "[telemetry] Redis caching checks: hit ratio = 94.22%, average latency = 0.8ms.",
      "[telemetry] Kafka event queue: EventPulse audit logs topic fully synchronized.",
      "[standup] Syncing with FOSS wing on OpenCode task distribution and issue priorities."
    ]
  },
  {
    time: "11:00 AM",
    title: "Deep Work Coding",
    tag: "ARCHITECTURE",
    tagColor: "border-indigo-500/20 bg-indigo-950/20 text-indigo-400",
    logs: [
      "[deep-work] Vim workspace active. Target: SwiftCache Datastore core.cpp.",
      "[architecture] Designing multithreaded TCP connection listener using epoll system calls.",
      "[concurrency] Preventing transaction race conditions during registration spikes.",
      "[benchmark] Executing memory layout comparisons. Target benchmark: 100,000 reqs/sec.",
      "[system] Memory constraints checked. Zero memory leaks detected."
    ]
  },
  {
    time: "03:00 PM",
    title: "Mentoring & Open Source Review",
    tag: "COMMUNITY",
    tagColor: "border-pink-500/20 bg-pink-950/20 text-pink-400",
    logs: [
      "[github] Reviewing pull requests on CareerCraft repository (OpenCode 2025).",
      "[review] PR #142: Audited Zod validation schema on JWT auth endpoints. Approved.",
      "[mentorship] Live debugger session with contributors on solving stack overflow errors in Node.",
      "[mentorship] Answering community queries on PCOS prediction confidence scores in FEM-CARE."
    ]
  },
  {
    time: "05:30 PM",
    title: "CI/CD & Production Releases",
    tag: "DEPLOYMENT",
    tagColor: "border-emerald-500/20 bg-emerald-950/20 text-emerald-400",
    logs: [
      "[pipeline] Triggering production CI/CD tests for TrustCart Streamlit app.",
      "[test] Running Jest unit specifications & Supertest integration checks: 42 passed.",
      "[build] Compiling targets and minifying assets... OK",
      "[deploy] Dispatching release payload to remote stream runner. Target: trustcart.streamlit.app",
      "[system] Live server reporting status = ONLINE."
    ]
  },
  {
    time: "09:00 PM",
    title: "Rust R&D Exploration",
    tag: "SANDBOX",
    tagColor: "border-amber-500/20 bg-amber-950/20 text-amber-400",
    logs: [
      "[r&d] Benchmarking Speedora async network socket reusability in Rust.",
      "[tokio] Benchmarking Tokio multi-threaded work-stealing executors vs single-core.",
      "[system] Performance profiles gathered. Compilation optimized.",
      "[daily] Committing local code branches. System standby activated."
    ]
  }
];

export function DayInLifeSimulator() {
  const [activeSlot, setActiveSlot] = useState<TimeBlock>(schedule[0]!);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Trigger console printing animation when timeslot changes
  useEffect(() => {
    setVisibleLogs([]);
    setLogIndex(0);
    setIsRunning(true);
  }, [activeSlot]);

  useEffect(() => {
    if (!isRunning) return;

    if (logIndex < activeSlot.logs.length) {
      const timer = setTimeout(() => {
        setVisibleLogs(prev => [...prev, activeSlot.logs[logIndex]!]);
        setLogIndex(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, logIndex, activeSlot]);

  return (
    <section id="workflow" className="section-padding container-custom relative overflow-hidden">
      {/* Background glow flares */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-violet-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-pink-500/10 to-indigo-500/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Developer Telemetry"
          title="SDE Workflow Logs: A Day in the Life"
          description="Interactive SDE process audits. Select time milestones to monitor production loops, concurrency audits, code reviews, and compiler optimizations."
        />
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        
        {/* Left Side: Timeline Slots Selector */}
        <div className="flex flex-col gap-3">
          {schedule.map((block, index) => {
            const isActive = activeSlot.time === block.time;
            return (
              <motion.button
                key={block.time}
                type="button"
                onClick={() => setActiveSlot(block)}
                className={cn(
                  "group relative w-full text-left rounded-xl border p-4 transition-all duration-300 flex items-center justify-between",
                  isActive
                    ? "border-cyan-300/40 bg-cyan-950/15 shadow-[0_0_24px_rgba(34,211,238,0.1)]"
                    : "border-white/10 bg-slate-950/40 hover:border-white/20 hover:bg-slate-950/70"
                )}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                {/* Visual active indicator bar on left side */}
                {isActive && (
                  <motion.div
                    layoutId="active-workflow-bar"
                    className="absolute inset-y-0 left-0 w-1 bg-cyan-400 rounded-l-xl"
                  />
                )}

                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center transition border shrink-0",
                    isActive ? "border-cyan-400/40 bg-cyan-950/30 text-cyan-300" : "border-white/5 bg-white/5 text-slate-500"
                  )}>
                    <Clock className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{block.time}</span>
                      <span className={cn("rounded border px-1.5 py-0.5 text-[8px] font-mono font-bold tracking-wider uppercase", block.tagColor)}>
                        {block.tag}
                      </span>
                    </div>
                    <h4 className="mt-1 text-sm font-black text-white group-hover:text-cyan-200 transition-colors">
                      {block.title}
                    </h4>
                  </div>
                </div>

                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform duration-300 shrink-0",
                  isActive ? "text-cyan-300 translate-x-0.5" : "text-slate-600 group-hover:text-slate-400"
                )} />
              </motion.button>
            );
          })}
        </div>

        {/* Right Side: UNIX Telemetry Shell Terminal */}
        <div className="sci-fi-panel rounded-xl border border-cyan-500/25 bg-slate-950/50 p-4 min-h-[300px] flex flex-col relative overflow-hidden">
          <div className="sci-fi-corner sci-fi-corner-tl" />
          <div className="sci-fi-corner sci-fi-corner-tr" />
          <div className="sci-fi-corner sci-fi-corner-bl" />
          <div className="sci-fi-corner sci-fi-corner-br" />

          {/* Grid panel screen overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.01)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

          {/* Terminal Console Header bar */}
          <div className="border-b border-cyan-950/80 pb-2.5 mb-3 flex items-center justify-between text-[8px] font-mono tracking-widest text-slate-500 relative z-10">
            <span className="flex items-center gap-1">
              <Terminal className="h-3 w-3 text-cyan-400" />
              <span>SDE_FLOW_TELEMETRY://SHELL</span>
            </span>
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
              <span className={cn("h-1.5 w-1.5 rounded-full bg-green-500/60", isRunning && "animate-pulse")} />
            </div>
          </div>

          {/* Terminal Console Output view */}
          <div className="flex-1 font-mono text-[10px] leading-5 overflow-y-auto relative z-10 select-none">
            <div className="text-slate-500 mb-1.5">
              $ tail -f /var/log/geekhaven/sde_workflow.log
            </div>

            <div className="space-y-1">
              {visibleLogs.map((log, index) => {
                const isSuccess = log.includes("[SUCCESS]") || log.includes("[telemetry] Prometheus");
                const isError = log.includes("[ERROR]") || log.includes("[concurrency]");
                const isCommand = log.startsWith("$");
                return (
                  <div
                    key={index}
                    className={cn(
                      isSuccess && "text-emerald-400 font-bold",
                      isError && "text-rose-400 font-bold",
                      !isSuccess && !isError && "text-cyan-300",
                      isCommand && "text-slate-100"
                    )}
                  >
                    {log}
                  </div>
                );
              })}
            </div>

            {/* Blinking Console Cursor */}
            {isRunning ? (
              <motion.span
                className="inline-block h-3.5 w-1.5 bg-cyan-300 ml-1 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            ) : (
              <div className="flex items-center gap-1.5 mt-4 text-[9px] text-slate-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>PROCESS_STREAM_IDLE. AWAITING TELEMETRY SELECTION.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
