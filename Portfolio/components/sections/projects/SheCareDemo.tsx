"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, Brain, Clock, Heart, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type KafkaEvent = {
  id: string;
  timestamp: string;
  topic: string;
  payload: string;
};

type SheCareDemoProps = {
  compact?: boolean;
};

export function SheCareDemo({ compact = false }: SheCareDemoProps) {
  const [activeTab, setActiveTab] = useState<"predictor" | "scheduler">("predictor");
  
  // PCOS Predictor inputs
  const [cycleRegular, setCycleRegular] = useState(true);
  const [weightGain, setWeightGain] = useState(false);
  const [acne, setAcne] = useState(false);
  const [hairGrowth, setHairGrowth] = useState(false);
  
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<{ risk: number; category: string } | null>(null);

  // BullMQ Scheduler inputs
  const [reminderType, setReminderType] = useState("hydration");
  const [mood, setMood] = useState("energetic");
  const [isScheduling, setIsScheduling] = useState(false);
  const [queueLogs, setQueueLogs] = useState<string[]>([]);
  
  // Kafka Live Event timeline
  const [kafkaEvents, setKafkaEvents] = useState<KafkaEvent[]>([
    {
      id: "init",
      timestamp: new Date().toLocaleTimeString(),
      topic: "analytics.events",
      payload: "USER_SESSION_STARTED: dashboard active",
    },
  ]);

  const kafkaEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    kafkaEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [kafkaEvents]);

  const emitKafkaEvent = (topic: string, payload: string) => {
    const newEvent: KafkaEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      topic,
      payload,
    };
    setKafkaEvents((prev) => [...prev, newEvent]);
  };

  const handlePredict = () => {
    setIsPredicting(true);
    setPredictionResult(null);
    emitKafkaEvent("pcos.events", "ASSESSMENT_TRIGGERED: calculating features");

    setTimeout(() => {
      // Calculate a mockup score
      let riskScore = 15;
      if (!cycleRegular) riskScore += 35;
      if (weightGain) riskScore += 20;
      if (acne) riskScore += 15;
      if (hairGrowth) riskScore += 15;

      let category = "Low Risk";
      if (riskScore > 60) {
        category = "High Risk";
      } else if (riskScore > 35) {
        category = "Moderate Risk";
      }

      setIsPredicting(false);
      setPredictionResult({ risk: riskScore, category });
      emitKafkaEvent(
        "pcos.events",
        `ASSESSMENT_COMPLETED: Risk calculated as ${riskScore}% (${category})`
      );
      emitKafkaEvent("analytics.events", "METRICS_PERSISTED: pcos_risk_assessment_run");
    }, 1200);
  };

  const handleSchedule = () => {
    setIsScheduling(true);
    setQueueLogs([]);
    emitKafkaEvent("reminder.events", `REMINDER_REQUESTED: type=${reminderType}`);

    const logs = [
      "BullMQ: reminderQueue -> Job scheduled with ID: " + Math.floor(Math.random() * 1000),
      "Redis: Cache storage lock acquired...",
      "Worker: Processing reminder job (1000ms delay)...",
      "Worker: Dispatching notifications to BullMQ notificationQueue...",
      "BullMQ: Job completed successfully!",
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setQueueLogs((prev) => [...prev, log]);
        if (index === 0) emitKafkaEvent("admin.events", "QUEUE_JOB_SCHEDULED: reminderQueue");
        if (index === 3) emitKafkaEvent("reminder.events", "NOTIFICATION_DISPATCHED");
        if (index === 4) {
          setIsScheduling(false);
          emitKafkaEvent("analytics.events", `REMINDER_JOB_RESOLVED: type=${reminderType}`);
        }
      }, (index + 1) * 350);
    });
  };

  return (
    <div className={cn("rounded-2xl border border-white/10 bg-black/25 p-4", compact ? "mt-6" : "mt-8")}>
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/5 pb-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-300">Interactive Demo</p>
          <h4 className="mt-1 text-lg font-black text-white">SheCare Services Console</h4>
        </div>
        <Heart className="h-6 w-6 text-rose-400 animate-pulse" aria-hidden="true" />
      </div>

      <div className={cn("grid gap-4", compact ? "" : "lg:grid-cols-[1.1fr_0.9fr]")}>
        {/* Left Interactive Control Panel */}
        <div className="flex flex-col justify-between">
          <div className="flex gap-2 rounded-xl bg-white/[0.03] p-1.5 border border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab("predictor")}
              className={cn(
                "flex-1 rounded-lg py-2 text-center text-xs font-bold transition-all",
                activeTab === "predictor"
                  ? "bg-rose-500/15 text-rose-300 border border-rose-500/20"
                  : "text-slate-400 hover:text-white border border-transparent"
              )}
            >
              AI PCOS Predictor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("scheduler")}
              className={cn(
                "flex-1 rounded-lg py-2 text-center text-xs font-bold transition-all",
                activeTab === "scheduler"
                  ? "bg-rose-500/15 text-rose-300 border border-rose-500/20"
                  : "text-slate-400 hover:text-white border border-transparent"
              )}
            >
              Daily Log & Queue
            </button>
          </div>

          <div className="mt-4 flex-1 min-h-[220px]">
            <AnimatePresence mode="wait">
              {activeTab === "predictor" ? (
                <motion.div
                  key="predictor"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="space-y-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    FastAPI ML Symptoms Vector
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCycleRegular((prev) => !prev);
                        setPredictionResult(null);
                      }}
                      className={cn(
                        "rounded-lg border p-3 text-left transition",
                        !cycleRegular
                          ? "border-rose-400/50 bg-rose-400/10 text-rose-100"
                          : "border-white/5 bg-white/5 text-slate-300 hover:border-white/15"
                      )}
                    >
                      <span className="block text-[10px] font-bold uppercase text-slate-500">Menses Regularity</span>
                      <span className="mt-1 block text-xs font-black">{cycleRegular ? "Regular" : "Irregular"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setWeightGain((prev) => !prev);
                        setPredictionResult(null);
                      }}
                      className={cn(
                        "rounded-lg border p-3 text-left transition",
                        weightGain
                          ? "border-rose-400/50 bg-rose-400/10 text-rose-100"
                          : "border-white/5 bg-white/5 text-slate-300 hover:border-white/15"
                      )}
                    >
                      <span className="block text-[10px] font-bold uppercase text-slate-500">Rapid Weight Gain</span>
                      <span className="mt-1 block text-xs font-black">{weightGain ? "Yes" : "No"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAcne((prev) => !prev);
                        setPredictionResult(null);
                      }}
                      className={cn(
                        "rounded-lg border p-3 text-left transition",
                        acne
                          ? "border-rose-400/50 bg-rose-400/10 text-rose-100"
                          : "border-white/5 bg-white/5 text-slate-300 hover:border-white/15"
                      )}
                    >
                      <span className="block text-[10px] font-bold uppercase text-slate-500">Acne / Skin Flares</span>
                      <span className="mt-1 block text-xs font-black">{acne ? "Yes" : "No"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setHairGrowth((prev) => !prev);
                        setPredictionResult(null);
                      }}
                      className={cn(
                        "rounded-lg border p-3 text-left transition",
                        hairGrowth
                          ? "border-rose-400/50 bg-rose-400/10 text-rose-100"
                          : "border-white/5 bg-white/5 text-slate-300 hover:border-white/15"
                      )}
                    >
                      <span className="block text-[10px] font-bold uppercase text-slate-500">Hirsutism (Hair Growth)</span>
                      <span className="mt-1 block text-xs font-black">{hairGrowth ? "Yes" : "No"}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handlePredict}
                    disabled={isPredicting}
                    className="w-full flex min-h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-xs font-black text-white transition hover:brightness-110 disabled:opacity-50"
                  >
                    <Brain className="h-4 w-4" />
                    Run AI PCOS Prediction
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="scheduler"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="space-y-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Daily Health Logging Context
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-500">Wellness Mood</span>
                      <div className="mt-1.5 flex gap-1.5">
                        {["energetic", "anxious", "fatigued"].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMood(m)}
                            className={cn(
                              "flex-1 rounded-lg border py-1.5 text-center text-xs font-bold capitalize transition",
                              mood === m
                                ? "border-rose-400/50 bg-rose-400/10 text-rose-100"
                                : "border-white/5 bg-white/5 text-slate-400 hover:text-white"
                            )}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-500">Queue Task Action</span>
                      <div className="mt-1.5 flex gap-1.5">
                        {[
                          { id: "hydration", label: "Water Reminder" },
                          { id: "medicine", label: "Pills Notification" },
                        ].map((rem) => (
                          <button
                            key={rem.id}
                            type="button"
                            onClick={() => setReminderType(rem.id)}
                            className={cn(
                              "flex-1 rounded-lg border py-1.5 text-center text-xs font-bold transition",
                              reminderType === rem.id
                                ? "border-rose-400/50 bg-rose-400/10 text-rose-100"
                                : "border-white/5 bg-white/5 text-slate-400 hover:text-white"
                            )}
                          >
                            {rem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSchedule}
                    disabled={isScheduling}
                    className="w-full flex min-h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-xs font-black text-white transition hover:brightness-110 disabled:opacity-50"
                  >
                    <Clock className="h-4 w-4" />
                    Trigger Redis/BullMQ Queue
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Console: PCOS Results, BullMQ Logging & Kafka Live Stream */}
        <div className="flex flex-col gap-3">
          {/* Main Visual Display */}
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 flex-1 min-h-[160px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isPredicting ? (
                <motion.div
                  key="loading-prediction"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-4"
                >
                  <motion.div
                    className="h-10 w-10 rounded-full border-2 border-rose-300/20 border-t-rose-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="mt-3 text-xs font-bold text-rose-200">Querying FastAPI PCOS ML Service...</p>
                </motion.div>
              ) : predictionResult ? (
                <motion.div
                  key="prediction-result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                      ML Service Results
                    </span>
                    <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/15">
                      {predictionResult.category}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-white">Estimated PCOS Risk Factor</h5>
                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${predictionResult.risk}%` }}
                          transition={{ duration: 0.75, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-xs font-black text-rose-100">{predictionResult.risk}%</span>
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400 bg-white/[0.02] border border-white/5 rounded-lg p-2.5">
                    {predictionResult.risk > 60
                      ? "Recommendation: High probability indicators. Suggesting medical check-up scheduling through SheCare directory."
                      : predictionResult.risk > 35
                      ? "Recommendation: Moderate flags detected. Suggesting wellness cycle trackers and daily health logging review."
                      : "Recommendation: Normal baseline indicators. Suggesting continued healthy wellness metrics logging."}
                  </p>
                </motion.div>
              ) : isScheduling ? (
                <motion.div
                  key="loading-scheduler"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2 py-2"
                >
                  <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 animate-spin" />
                    Redis & BullMQ Active Logs
                  </span>
                  <div className="space-y-1.5 font-mono text-[10px] text-slate-300 max-h-[140px] overflow-y-auto bg-black/35 rounded-lg p-2.5 border border-white/5">
                    {queueLogs.map((log, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          log.startsWith("BullMQ") && "text-amber-300",
                          log.startsWith("Redis") && "text-rose-300",
                          log.startsWith("Worker") && "text-cyan-300",
                          log.endsWith("successfully!") && "text-green-400"
                        )}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="status-inactive"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6 text-slate-500"
                >
                  <Activity className="h-8 w-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-xs leading-normal">
                    {activeTab === "predictor"
                      ? "Configure symptoms on the left and run AI prediction to test FastAPI service simulator."
                      : "Choose mood, reminder target and click button to inspect BullMQ jobs & Redis state."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Apache Kafka Event Streaming Terminal */}
          <div className="rounded-xl border border-white/10 bg-slate-950/80 p-3 h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">
                Apache Kafka Live Event Stream
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 font-mono text-[9px] text-slate-400 pt-1.5 scrollbar-thin max-h-[80px]">
              {kafkaEvents.map((evt) => (
                <div key={evt.id} className="leading-relaxed">
                  <span className="text-slate-600">[{evt.timestamp}]</span>{" "}
                  <span className="text-violet-400 font-bold">{evt.topic}</span>{" "}
                  <span className="text-slate-500">-&gt;</span>{" "}
                  <span className="text-slate-200">{evt.payload}</span>
                </div>
              ))}
              <div ref={kafkaEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
