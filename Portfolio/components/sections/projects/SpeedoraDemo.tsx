"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sparkles, Server, Zap, RefreshCw, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

type SpeedServer = {
  id: string;
  name: string;
  provider: string;
  ping: number;
  expectedDown: number;
  expectedUp: number;
};

const servers: SpeedServer[] = [
  { id: "delhi", name: "New Delhi, IN", provider: "Airtel Fiber", ping: 14, expectedDown: 412, expectedUp: 298 },
  { id: "mumbai", name: "Mumbai, IN", provider: "Jio Network", ping: 12, expectedDown: 342, expectedUp: 210 },
  { id: "frankfurt", name: "Frankfurt, DE", provider: "Serverest Cloud", ping: 124, expectedDown: 95, expectedUp: 68 },
];

type ConsoleLine = {
  text: string;
  type: "info" | "success" | "error" | "output" | "cmd";
};

export function SpeedoraDemo() {
  const [selectedServer, setSelectedServer] = useState<SpeedServer>(servers[0]!);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLine[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [testPhase, setTestPhase] = useState<"idle" | "ping" | "download" | "upload" | "finished">("idle");
  const [progress, setProgress] = useState(0);
  const [activeSpeed, setActiveSpeed] = useState(0);

  // Generate ASCII progress bar string
  const getProgressBar = (percent: number) => {
    const totalBars = 20;
    const filledBars = Math.round((percent / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return `[${"=".repeat(filledBars)}${">"}${" ".repeat(Math.max(0, emptyBars - 1))}] ${percent}%`;
  };

  const runSpeedtest = () => {
    setIsTesting(true);
    setTestPhase("ping");
    setProgress(0);
    setActiveSpeed(0);
    setConsoleLogs([
      { text: `user@iiita-laptop:~$ speedora --server ${selectedServer.id}`, type: "cmd" },
      { text: "speedora v1.0.0 - Asynchronous Rust Network speed test CLI", type: "info" },
      { text: "[tokio::main] Initializing multi-threaded async worker runtime...", type: "info" },
      { text: `[reqwest::Client] Reaching metadata target: ${selectedServer.name} (${selectedServer.provider})...`, type: "info" }
    ]);
  };

  // Speedtest animation tick triggers
  useEffect(() => {
    if (!isTesting) return;

    if (testPhase === "ping") {
      const timer = setTimeout(() => {
        setConsoleLogs(prev => [
          ...prev,
          { text: `[ping] RTT calculated: ${selectedServer.ping} ms (Server: ${selectedServer.name})`, type: "success" },
          { text: "[download] Establishing 4 socket connections...", type: "info" }
        ]);
        setTestPhase("download");
        setProgress(0);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (testPhase === "download") {
      if (progress < 100) {
        const timer = setTimeout(() => {
          const nextProg = Math.min(100, progress + 10);
          setProgress(nextProg);
          const currentMbit = Math.round((nextProg / 100) * selectedServer.expectedDown);
          setActiveSpeed(currentMbit);

          // Update console logs: remove last progress line if present and write new progress line
          setConsoleLogs(prev => {
            const filtered = prev.filter(line => !line.text.startsWith("[download] progress:"));
            return [
              ...filtered,
              { 
                text: `[download] progress: ${getProgressBar(nextProg)} (${currentMbit} Mbps)`, 
                type: "output" 
              }
            ];
          });
        }, 150);
        return () => clearTimeout(timer);
      } else {
        setConsoleLogs(prev => [
          ...prev,
          { text: `[download] Complete: ${selectedServer.expectedDown} Mbps (1.4s execution time)`, type: "success" },
          { text: "[upload] Launching reqwest POST stream...", type: "info" }
        ]);
        setTestPhase("upload");
        setProgress(0);
        setActiveSpeed(0);
      }
    }

    if (testPhase === "upload") {
      if (progress < 100) {
        const timer = setTimeout(() => {
          const nextProg = Math.min(100, progress + 12);
          setProgress(nextProg);
          const currentMbit = Math.round((nextProg / 100) * selectedServer.expectedUp);
          setActiveSpeed(currentMbit);

          setConsoleLogs(prev => {
            const filtered = prev.filter(line => !line.text.startsWith("[upload] progress:"));
            return [
              ...filtered,
              { 
                text: `[upload] progress: ${getProgressBar(nextProg)} (${currentMbit} Mbps)`, 
                type: "output" 
              }
            ];
          });
        }, 150);
        return () => clearTimeout(timer);
      } else {
        setConsoleLogs(prev => [
          ...prev,
          { text: `[upload] Complete: ${selectedServer.expectedUp} Mbps (1.1s execution time)`, type: "success" },
          { text: "------------------------------------------------", type: "info" },
          { text: "            SPEEDORA RESULT SUMMARY             ", type: "output" },
          { text: "------------------------------------------------", type: "info" },
          { text: `Server:      ${selectedServer.name} (${selectedServer.provider})`, type: "output" },
          { text: `Latency:     ${selectedServer.ping} ms`, type: "output" },
          { text: `Download:    ${selectedServer.expectedDown} Mbps`, type: "success" },
          { text: `Upload:      ${selectedServer.expectedUp} Mbps`, type: "success" },
          { text: "------------------------------------------------", type: "info" },
          { text: "STATUS: TEST COMPLETED SUCCESSFULLY.", type: "success" }
        ]);
        setTestPhase("finished");
        setIsTesting(false);
      }
    }

  }, [isTesting, testPhase, progress, selectedServer]);

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5">
      {/* Interactive Title */}
      <div className="mb-5 border-b border-cyan-950/60 pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Interactive Simulation</p>
        <h4 className="mt-1 text-lg font-black text-white">Speedora Rust CLI Terminal</h4>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        
        {/* Controls Panel */}
        <div className="flex flex-col gap-4">
          
          {/* Server Config list */}
          <div className="sci-fi-panel rounded-xl border border-cyan-500/20 bg-slate-950/40 p-4 relative">
            <div className="sci-fi-corner sci-fi-corner-tl" />
            <div className="sci-fi-corner sci-fi-corner-br" />
            
            <div className="flex items-center gap-2 mb-3">
              <Server className="h-4.5 w-4.5 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Select Host Server</span>
            </div>

            <div className="grid gap-2">
              {servers.map((srv) => (
                <button
                  key={srv.id}
                  type="button"
                  disabled={isTesting}
                  onClick={() => {
                    setSelectedServer(srv);
                    setConsoleLogs([]);
                    setTestPhase("idle");
                  }}
                  className={cn(
                    "w-full text-left rounded-lg p-2.5 border transition-all duration-300",
                    selectedServer.id === srv.id
                      ? "border-cyan-400 bg-cyan-950/20 text-cyan-100"
                      : "border-white/5 bg-slate-950/40 text-slate-400 hover:border-white/15 disabled:opacity-40"
                  )}
                >
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>{srv.name}</span>
                    <span className="text-[9px] font-mono text-cyan-300">{srv.ping} ms</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{srv.provider}</p>
                </button>
              ))}
            </div>

            {/* Run Button */}
            <button
              onClick={runSpeedtest}
              disabled={isTesting}
              className="mt-4 w-full cyber-btn inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-4 py-2 text-xs font-black uppercase text-white shadow-neon transition hover:brightness-110 disabled:opacity-50"
            >
              <Terminal className="h-4 w-4" />
              Run speedora test
            </button>
          </div>

          {/* Rust Diagnostics specs */}
          <div className="sci-fi-panel rounded-xl border border-cyan-500/20 bg-slate-950/40 p-4 relative">
            <div className="sci-fi-corner sci-fi-corner-tr" />
            <div className="sci-fi-corner sci-fi-corner-bl" />
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-4.5 w-4.5 text-pink-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Engine Blueprint</span>
            </div>
            <div className="space-y-1.5 font-mono text-[9px] text-slate-400">
              <p>RUNTIME: <b className="text-cyan-300">Tokio Asynchronous</b></p>
              <p>HTTP: <b className="text-cyan-300">Reqwest Connection Pool</b></p>
              <p>COMPILER: <b className="text-cyan-300">cargo build --release</b></p>
              <p>MEM: <b className="text-cyan-300">Safe, zero-cost memory allocations</b></p>
            </div>
          </div>
        </div>

        {/* CLI Terminal Output panel */}
        <div className="sci-fi-panel rounded-xl border border-cyan-500/25 bg-slate-950/50 p-4 min-h-[280px] flex flex-col relative overflow-hidden">
          <div className="sci-fi-corner sci-fi-corner-tl" />
          <div className="sci-fi-corner sci-fi-corner-tr" />
          <div className="sci-fi-corner sci-fi-corner-bl" />
          <div className="sci-fi-corner sci-fi-corner-br" />

          {/* Grid lines inside shell */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.01)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

          {/* Shell header bar */}
          <div className="border-b border-cyan-950/80 pb-2 mb-3 flex items-center justify-between text-[8px] font-mono tracking-widest text-slate-500 relative z-10">
            <span>RUST_CLI://SPEEDORA_SHELL</span>
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
              <span className={cn("h-1.5 w-1.5 rounded-full bg-green-500/60", isTesting && "animate-pulse")} />
            </div>
          </div>

          {/* Shell Logs View */}
          <div className="flex-1 font-mono text-[10px] leading-5 overflow-y-auto relative z-10 select-none">
            {consoleLogs.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full min-h-[180px] text-slate-600 text-center">
                <Terminal className="h-6 w-6 text-slate-700 mb-2" />
                <span>Console offline. Choose server configuration and execute test script.</span>
              </div>
            )}

            {consoleLogs.map((log, idx) => (
              <div 
                key={idx} 
                className={cn(
                  log.type === "cmd" && "text-slate-100",
                  log.type === "info" && "text-cyan-400/80",
                  log.type === "success" && "text-emerald-400 font-bold",
                  log.type === "output" && "text-cyan-300 font-bold"
                )}
              >
                {log.type === "cmd" ? <span className="text-pink-400 mr-1.5">$</span> : ""}
                {log.text}
              </div>
            ))}

            {isTesting && (
              <motion.span
                className="inline-block h-3.5 w-1.5 bg-cyan-300 ml-1 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>

          {/* Live Speed Overlay during active tests */}
          {isTesting && (testPhase === "download" || testPhase === "upload") && (
            <div className="absolute right-4 bottom-4 bg-slate-950/90 border border-cyan-500/30 rounded-lg p-3 text-right shadow-[0_0_15px_rgba(34,211,238,0.15)] relative z-20">
              <span className="text-[8px] font-mono text-slate-500 uppercase block">Current {testPhase}</span>
              <span className="text-xl font-black text-cyan-300">{activeSpeed}</span>
              <span className="text-[9px] font-mono text-cyan-400 ml-1">Mbps</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
