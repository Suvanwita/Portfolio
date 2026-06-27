"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Gauge, 
  QrCode, 
  Zap,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

type StepLog = {
  time: string;
  source: "client" | "redis" | "postgres" | "kafka" | "bullmq";
  message: string;
};

type Booking = {
  venue: string;
  slot: string;
  event: string;
};

const venues = ["Auditorium 1", "CC-3", "Senate Hall"];
const slots = ["10:00 AM - 12:00 PM", "12:00 PM - 02:00 PM", "02:00 PM - 04:00 PM"];

export function EventPulseDemo() {
  // Concurrency states
  const [capacity, setCapacity] = useState(5);
  const [waitlist, setWaitlist] = useState(0);
  const [simLogs, setSimLogs] = useState<StepLog[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simComplete, setSimComplete] = useState(false);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);

  // Venue Conflict Simulator states
  const [selectedVenue, setSelectedVenue] = useState("Auditorium 1");
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM - 12:00 PM");
  const [scheduleLogs, setScheduleLogs] = useState<string[]>([]);
  const [scheduleStatus, setScheduleStatus] = useState<"idle" | "checking" | "success" | "conflict">("idle");
  const [activeBookings, setActiveBookings] = useState<Booking[]>([
    { venue: "Auditorium 1", slot: "10:00 AM - 12:00 PM", event: "Geekhaven Hackathon" },
    { venue: "CC-3", slot: "02:00 PM - 04:00 PM", event: "FOSS Workshop" }
  ]);

  // QR Checkin states
  const [isScanned, setIsScanned] = useState(false);
  const [scanResult, setScanResult] = useState<"granted" | "duplicate" | null>(null);
  const [scanTime, setScanTime] = useState("");

  // Concurrency logs stream definition
  const rawSimLogs: StepLog[] = [
    { time: "0.0ms", source: "client", message: "Received 100 simultaneous registration requests..." },
    { time: "0.8ms", source: "redis", message: "Acquiring distributed lock 'event_lock:hack2026' (Redlock)..." },
    { time: "1.2ms", source: "redis", message: "Lock secured successfully. Latency: 0.4ms" },
    { time: "1.5ms", source: "postgres", message: "Opened ACID database transaction." },
    { time: "2.1ms", source: "postgres", message: "SELECT capacity FROM events WHERE id=1 FOR UPDATE (Locked 5 slots remain)" },
    { time: "2.8ms", source: "postgres", message: "INSERT INTO registrants: Registered first 5 requests (Ticket IDs #125 to #129)" },
    { time: "3.2ms", source: "postgres", message: "Capacity reached! 95 registration requests remaining." },
    { time: "3.5ms", source: "kafka", message: "Publishing 'event_sold_out' payload to Kafka analytics topic..." },
    { time: "4.1ms", source: "bullmq", message: "Offloading remaining 95 registrants to Redis BullMQ Waitlist Queue..." },
    { time: "4.8ms", source: "postgres", message: "Committed transaction. Registry updated." },
    { time: "5.2ms", source: "redis", message: "Releasing distributed lock 'event_lock:hack2026'." },
    { time: "5.5ms", source: "client", message: "All 100 requests processed. 0 race conditions allowed. Data strict and consistent." }
  ];

  // Concurrency Simulation Tick
  useEffect(() => {
    if (!isSimulating) return;

    if (currentLogIdx < rawSimLogs.length) {
      const timer = setTimeout(() => {
        setSimLogs(prev => [...prev, rawSimLogs[currentLogIdx]!]);
        
        // Update capacity / waitlist dynamically
        if (rawSimLogs[currentLogIdx]?.message.includes("Registered first 5")) {
          setCapacity(0);
        }
        if (rawSimLogs[currentLogIdx]?.message.includes("Offloading remaining 95")) {
          setWaitlist(95);
        }

        setCurrentLogIdx(prev => prev + 1);
      }, 550);
      return () => clearTimeout(timer);
    } else {
      setIsSimulating(false);
      setSimComplete(true);
    }
  }, [isSimulating, currentLogIdx]);

  const startConcurrencySim = () => {
    setCapacity(5);
    setWaitlist(0);
    setSimLogs([]);
    setSimComplete(false);
    setIsSimulating(true);
    setCurrentLogIdx(0);
  };

  // Venue conflict booking handler
  const handleBookVenue = () => {
    setScheduleStatus("checking");
    setScheduleLogs([`[sch] Requesting lock for ${selectedVenue} at ${selectedSlot}...`]);

    setTimeout(() => {
      // Find overlap
      const conflict = activeBookings.find(
        (b) => b.venue === selectedVenue && b.slot === selectedSlot
      );

      if (conflict) {
        setScheduleStatus("conflict");
        setScheduleLogs(prev => [
          ...prev,
          `[sch] Querying active reservation ledger...`,
          `[CONFLICT] Double-booking blocked! Occupied by: "${conflict.event}"`,
          `[sch] Transaction rolled back. Lock released.`
        ]);
      } else {
        setScheduleStatus("success");
        setScheduleLogs(prev => [
          ...prev,
          `[sch] Querying active reservation ledger...`,
          `[sch] Capacity check: OK. Acquiring lock...`,
          `[SUCCESS] Booking confirmed for "New Campus Event".`,
          `[sch] Calendar ledger synchronized.`
        ]);
        setActiveBookings(prev => [
          ...prev,
          { venue: selectedVenue, slot: selectedSlot, event: "New Campus Event" }
        ]);
      }
    }, 900);
  };

  // QR scanner checkpoint check-in
  const scanTicket = () => {
    const now = new Date().toLocaleTimeString();
    if (!isScanned) {
      setIsScanned(true);
      setScanResult("granted");
      setScanTime(now);
    } else {
      setScanResult("duplicate");
    }
  };

  const resetScanner = () => {
    setIsScanned(false);
    setScanResult(null);
    setScanTime("");
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5">
      {/* Interactive Title */}
      <div className="mb-5 border-b border-cyan-950/60 pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Interactive Simulation</p>
        <h4 className="mt-1 text-lg font-black text-white">EventPulse Operations & Lock Core</h4>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Left Column: Concurrency Storm registry lock & Latencies */}
        <div className="flex flex-col gap-4">
          <div className="sci-fi-panel rounded-xl border border-cyan-500/20 bg-slate-950/40 p-4 relative">
            <div className="sci-fi-corner sci-fi-corner-tl" />
            <div className="sci-fi-corner sci-fi-corner-br" />

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Event Registry Lock</span>
              </div>
              <div className="flex gap-3 text-[10px] font-mono">
                <span className="text-slate-400">Slots: <b className="text-cyan-300">{capacity}</b></span>
                <span className="text-slate-400">Waitlist: <b className="text-pink-300">{waitlist}</b></span>
              </div>
            </div>

            <div className="bg-slate-950/80 rounded-lg p-3 border border-cyan-950 font-mono text-[10px] leading-5 text-cyan-100 min-h-[160px]">
              <div className="flex justify-between items-center text-[8px] text-pink-400 tracking-widest border-b border-cyan-950/60 pb-1 mb-2">
                <span>CONCURRENCY_FLOW_STREAM</span>
                {isSimulating && <span className="animate-pulse">● LOCKED</span>}
              </div>

              {simLogs.length === 0 && !isSimulating && (
                <div className="flex flex-col items-center justify-center min-h-[120px] text-slate-500 text-center">
                  <span>STANDBY: ready to trigger concurrency surge</span>
                </div>
              )}

              <AnimatePresence>
                {simLogs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex justify-between gap-2",
                      log.source === "redis" && "text-amber-300",
                      log.source === "postgres" && "text-cyan-300",
                      log.source === "kafka" && "text-violet-400",
                      log.source === "bullmq" && "text-pink-400"
                    )}
                  >
                    <span>&gt; [{log.source}] {log.message}</span>
                    <span className="text-slate-600 text-[8px]">{log.time}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button
              onClick={startConcurrencySim}
              disabled={isSimulating}
              className="mt-3.5 w-full cyber-btn inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-4 py-2 text-xs font-black uppercase text-white shadow-neon transition hover:brightness-110 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              Surge 100 Registrations (Concurrent)
            </button>
          </div>

          {/* Performance diagnostics comparisons */}
          <div className="sci-fi-panel rounded-xl border border-cyan-500/20 bg-slate-950/40 p-4 relative">
            <div className="sci-fi-corner sci-fi-corner-tr" />
            <div className="sci-fi-corner sci-fi-corner-bl" />
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="h-4.5 w-4.5 text-pink-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Data Structure Latency Profiles</span>
            </div>
            
            <div className="space-y-2.5 font-mono text-[10px]">
              {/* Caching live counter queries offload */}
              <div className="border border-white/5 bg-slate-950/50 rounded-lg p-2.5">
                <div className="flex justify-between mb-1 text-slate-400 uppercase text-[9px] tracking-wider font-bold">
                  <span>Live Counter Query Caching</span>
                  <span className="text-cyan-300">&gt;99.9% Faster</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-xs mt-1.5">
                  <div className="bg-rose-950/20 border border-rose-500/20 rounded p-1">
                    <p className="text-slate-500 text-[8px]">PostgreSQL Read Scan</p>
                    <p className="text-rose-400 font-bold">6,772.7ms</p>
                  </div>
                  <div className="bg-emerald-950/20 border border-emerald-500/20 rounded p-1 shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                    <p className="text-slate-500 text-[8px]">Redis Offload Cash</p>
                    <p className="text-emerald-400 font-bold">1.2ms</p>
                  </div>
                </div>
              </div>

              {/* Autocomplete prefix tree efficiency comparison */}
              <div className="border border-white/5 bg-slate-950/50 rounded-lg p-2.5">
                <div className="flex justify-between mb-1 text-slate-400 uppercase text-[9px] tracking-wider font-bold">
                  <span>Trie Prefix Autocomplete Speed</span>
                  <span className="text-cyan-300">98.6% Faster</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-xs mt-1.5">
                  <div className="bg-rose-950/20 border border-rose-500/20 rounded p-1">
                    <p className="text-slate-500 text-[8px]">DB Linear Scan</p>
                    <p className="text-rose-400 font-bold">3,106.5ms</p>
                  </div>
                  <div className="bg-emerald-950/20 border border-emerald-500/20 rounded p-1 shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                    <p className="text-slate-500 text-[8px]">Trie Prefix Lookup</p>
                    <p className="text-emerald-400 font-bold">42.9ms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scheduling Sandbox & QR Entry scanning checkpoint */}
        <div className="flex flex-col gap-4">
          
          {/* Venue Conflict Scheduler */}
          <div className="sci-fi-panel rounded-xl border border-cyan-500/20 bg-slate-950/40 p-4 relative">
            <div className="sci-fi-corner sci-fi-corner-tr" />
            <div className="sci-fi-corner sci-fi-corner-bl" />
            
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4.5 w-4.5 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Campus Venue Conflict Scheduler</span>
            </div>

            {/* Target Selectors */}
            <div className="space-y-3">
              {/* Venue Selector */}
              <div>
                <p className="mb-1 text-[9px] font-mono tracking-widest text-slate-500 uppercase">Select Target Room</p>
                <div className="flex gap-1.5">
                  {venues.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setSelectedVenue(v);
                        setScheduleStatus("idle");
                        setScheduleLogs([]);
                      }}
                      className={cn(
                        "flex-1 rounded p-1.5 text-[10px] font-bold border transition",
                        selectedVenue === v 
                          ? "border-cyan-400 bg-cyan-950/20 text-cyan-200" 
                          : "border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/10"
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot Selector */}
              <div>
                <p className="mb-1 text-[9px] font-mono tracking-widest text-slate-500 uppercase">Select Time Window</p>
                <div className="flex flex-col gap-1 sm:flex-row">
                  {slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(s);
                        setScheduleStatus("idle");
                        setScheduleLogs([]);
                      }}
                      className={cn(
                        "flex-1 rounded p-1.5 text-[9px] font-bold border transition text-center",
                        selectedSlot === s 
                          ? "border-cyan-400 bg-cyan-950/20 text-cyan-200" 
                          : "border-white/5 bg-slate-950/60 text-slate-400 hover:border-white/10"
                      )}
                    >
                      {s.split(" - ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trigger booking */}
            <button
              onClick={handleBookVenue}
              disabled={scheduleStatus === "checking"}
              className="mt-3.5 w-full border border-cyan-500/30 bg-cyan-950/30 hover:bg-cyan-500/10 text-cyan-300 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase transition active:scale-[0.99] disabled:opacity-50"
            >
              Check Availability & Book
            </button>

            {/* Simulation feedback screen */}
            {scheduleLogs.length > 0 && (
              <div className="mt-3 rounded border border-cyan-950 bg-slate-950/90 p-2.5 font-mono text-[9px] leading-4">
                {scheduleLogs.map((log, idx) => (
                  <div key={idx} className={cn(
                    log.includes("[CONFLICT]") ? "text-rose-400 font-bold" :
                    log.includes("[SUCCESS]") ? "text-emerald-400 font-bold" :
                    "text-cyan-300"
                  )}>
                    {log}
                  </div>
                ))}

                {/* Status visuals */}
                {scheduleStatus === "conflict" && (
                  <div className="flex items-center gap-1.5 text-rose-400 mt-2 border-t border-rose-950/60 pt-2 font-mono">
                    <AlertTriangle className="h-3 w-3 text-rose-400 animate-bounce" />
                    <span>DOUBLE BOOKING PREVENTED VIA DB LEDGER</span>
                  </div>
                )}
                {scheduleStatus === "success" && (
                  <div className="flex items-center gap-1.5 text-emerald-400 mt-2 border-t border-emerald-950/60 pt-2 font-mono">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span>VENUE COMMITTED: RESERVATION COMPLETED</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Active Bookings Cheat Sheet list */}
            <div className="mt-3 border-t border-cyan-950/50 pt-2 text-[8px] font-mono text-slate-500">
              <span className="uppercase tracking-wider font-bold">Ledger Bookings (Causes Conflict):</span>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                {activeBookings.slice(0, 3).map((ab, idx) => (
                  <div key={idx} className="bg-slate-950/30 border border-white/5 rounded p-1">
                    <p className="text-cyan-400/80 font-bold">{ab.venue}</p>
                    <p className="text-slate-400 mt-0.5">{ab.slot}</p>
                    <p className="text-[7px] text-pink-400 mt-0.5 line-clamp-1">{ab.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QR Ticket Entry scanning checkpoint */}
          <div className="sci-fi-panel rounded-xl border border-cyan-500/20 bg-slate-950/40 p-4 relative">
            <div className="sci-fi-corner sci-fi-corner-tl" />
            <div className="sci-fi-corner sci-fi-corner-br" />

            <div className="flex items-center gap-2 mb-3">
              <QrCode className="h-4.5 w-4.5 text-pink-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">QR Entry Scanner Checkpoint</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 border border-cyan-950 bg-slate-950/80 rounded-lg">
              {/* Glowing QR Symbol */}
              <div className={cn(
                "h-24 w-24 border-2 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.15)]",
                scanResult === "granted" ? "border-emerald-500 bg-emerald-950/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : 
                scanResult === "duplicate" ? "border-rose-500 bg-rose-950/20 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-shake" : 
                "border-pink-500/50 bg-pink-950/10 text-pink-400 hover:border-pink-400"
              )}
                onClick={scanTicket}
              >
                <QrCode className="h-16 w-16" />
              </div>
              <span className="text-[8px] font-mono text-slate-500 mt-2">CLICK QR CODE TO SCAN TICKET</span>

              {/* Status Report details */}
              <div className="w-full mt-4 h-16 flex flex-col items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  {scanResult === "granted" && (
                    <motion.div
                      key="granted"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-emerald-400 text-xs font-mono"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <div>
                        <p className="font-bold">ACCESS GRANTED</p>
                        <p className="text-[9px] text-slate-400">Scanned at: {scanTime}</p>
                      </div>
                    </motion.div>
                  )}

                  {scanResult === "duplicate" && (
                    <motion.div
                      key="duplicate"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-rose-400 text-xs font-mono"
                    >
                      <XCircle className="h-4 w-4" />
                      <div>
                        <p className="font-bold">ACCESS DENIED</p>
                        <p className="text-[9px] text-rose-500 font-bold uppercase">DUPLICATE scan blocked! (First scan at {scanTime})</p>
                      </div>
                    </motion.div>
                  )}

                  {!scanResult && (
                    <motion.span
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-slate-500 text-[10px] font-mono italic"
                    >
                      Scanner: STANDBY. Awaiting ticket signal.
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {scanResult && (
                <button
                  type="button"
                  onClick={resetScanner}
                  className="mt-1 text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition"
                >
                  [Reset Scanner Checkpoint]
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
