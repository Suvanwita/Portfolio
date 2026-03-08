"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Database, Play } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CacheEntry = {
  value: string;
  expiresAt?: number;
};

type HistoryLine = {
  id: number;
  command: string;
  output: string[];
};

type SwiftCacheTerminalProps = {
  compact?: boolean;
};

const supportedCommands = [
  "SET name Suvanwita",
  "GET name",
  "DEL name",
  "EXPIRE name 10",
  "TTL name",
  "STATS",
  "HELP",
  "CLEAR",
];

const initialHistory: HistoryLine[] = [
  {
    id: 1,
    command: "HELP",
    output: [
      "SwiftCache demo ready.",
      "Try: SET name Suvanwita, GET name, EXPIRE name 10, TTL name, STATS",
    ],
  },
];

function formatUptime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

export function SwiftCacheTerminal({ compact = false }: SwiftCacheTerminalProps) {
  const [cache, setCache] = useState<Record<string, CacheEntry>>({});
  const [history, setHistory] = useState<HistoryLine[]>(initialHistory);
  const [command, setCommand] = useState("");
  const [commandsProcessed, setCommandsProcessed] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [now, setNow] = useState(0);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const nextNow = Date.now();
      setNow(nextNow);
      setUptime((current) => current + 1);
      setCache((current) =>
        Object.fromEntries(
          Object.entries(current).filter(([, entry]) => !entry.expiresAt || entry.expiresAt > nextNow),
        ),
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const cacheEntries = useMemo(() => Object.entries(cache), [cache]);

  const getTtl = (key: string) => {
    const entry = cache[key];

    if (!entry) {
      return -2;
    }

    if (!entry.expiresAt) {
      return -1;
    }

    return Math.max(0, Math.ceil((entry.expiresAt - now) / 1000));
  };

  const pushHistory = (input: string, output: string[]) => {
    setHistory((current) => [
      ...current,
      {
        id: Date.now(),
        command: input,
        output,
      },
    ]);
  };

  const runCommand = (input: string) => {
    const normalizedInput = input.trim();
    const parts = normalizedInput.split(/\s+/);
    const action = parts[0]?.toUpperCase();
    const key = parts[1];
    const value = parts.slice(2).join(" ");

    if (!normalizedInput) {
      return;
    }

    if (action === "CLEAR") {
      setHistory([]);
      setCommand("");
      return;
    }

    setCommandsProcessed((current) => current + 1);

    if (action === "HELP") {
      pushHistory(normalizedInput, supportedCommands);
      setCommand("");
      return;
    }

    if (action === "SET" && key && value) {
      setCache((current) => ({
        ...current,
        [key]: { value },
      }));
      pushHistory(normalizedInput, ["OK"]);
      setCommand("");
      return;
    }

    if (action === "GET" && key) {
      const entry = cache[key];
      pushHistory(normalizedInput, [entry ? `"${entry.value}"` : "(nil)"]);
      setCommand("");
      return;
    }

    if (action === "DEL" && key) {
      const existed = Boolean(cache[key]);
      setCache((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
      pushHistory(normalizedInput, [`(integer) ${existed ? 1 : 0}`]);
      setCommand("");
      return;
    }

    if (action === "EXPIRE" && key && parts[2]) {
      const seconds = Number(parts[2]);

      if (!cache[key] || Number.isNaN(seconds)) {
        pushHistory(normalizedInput, ["(integer) 0"]);
      } else {
        setCache((current) => ({
          ...current,
          [key]: {
            ...current[key],
            expiresAt: Date.now() + seconds * 1000,
          },
        }));
        pushHistory(normalizedInput, ["(integer) 1", `TTL countdown started: ${seconds}s`]);
      }
      setCommand("");
      return;
    }

    if (action === "TTL" && key) {
      pushHistory(normalizedInput, [`(integer) ${getTtl(key)}`]);
      setCommand("");
      return;
    }

    if (action === "STATS") {
      pushHistory(normalizedInput, [
        `keys: ${Object.keys(cache).length}`,
        `uptime: ${formatUptime(uptime)}`,
        `commands_processed: ${commandsProcessed + 1}`,
      ]);
      setCommand("");
      return;
    }

    pushHistory(normalizedInput, ["ERR unknown command. Type HELP for supported commands."]);
    setCommand("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(command);
  };

  return (
    <div className={cn("rounded-2xl border border-white/10 bg-black/25 p-4", compact ? "mt-6" : "mt-8")}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Interactive Terminal</p>
          <h4 className="mt-1 text-lg font-black text-white">SwiftCache Redis-like Console</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {["SET name Suvanwita", "GET name", "STATS"].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => runCommand(sample)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:border-cyan-300/50 hover:text-white"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      <div className={cn("grid gap-4", compact ? "" : "lg:grid-cols-[1.15fr_0.85fr]")}>
        <div className="glass-card overflow-hidden rounded-xl border border-cyan-300/15 bg-slate-950/80">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-300" />
            <span className="ml-2 font-mono text-xs font-bold text-slate-400">swiftcache-cli</span>
          </div>

          <div ref={historyRef} className="max-h-80 min-h-72 overflow-y-auto p-4 font-mono text-sm leading-6 text-cyan-100">
            <AnimatePresence initial={false}>
              {history.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4"
                >
                  <p>
                    <span className="text-pink-200">127.0.0.1:6379&gt;</span> {line.command}
                  </p>
                  {line.output.map((output, index) => (
                    <p key={`${line.id}-${output}-${index}`} className="text-slate-300">
                      {output}
                    </p>
                  ))}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 px-4 py-3 font-mono text-sm">
            <span className="text-pink-200">127.0.0.1:6379&gt;</span>
            <input
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder="Type HELP..."
              className="min-w-0 flex-1 bg-transparent text-cyan-100 outline-none placeholder:text-slate-600"
              aria-label="SwiftCache command"
            />
            <motion.span
              className="h-5 w-2 bg-cyan-200"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              aria-hidden="true"
            />
            <button
              type="submit"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Run command"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Cache blocks</p>
              <p className="mt-1 text-sm font-bold text-white">{cacheEntries.length} active keys</p>
            </div>
            <Database className="h-6 w-6 text-cyan-200" aria-hidden="true" />
          </div>

          <div className="grid min-h-64 content-start gap-3">
            <AnimatePresence mode="popLayout">
              {cacheEntries.length ? (
                cacheEntries.map(([key, entry]) => {
                  const ttl = getTtl(key);

                  return (
                    <motion.div
                      key={key}
                      layout
                      initial={{ opacity: 0, scale: 0.92, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -10 }}
                      className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-sm font-black text-white">{key}</p>
                          <p className="mt-1 font-mono text-xs text-slate-300">{entry.value}</p>
                        </div>
                        <span className="rounded-full bg-white/10 px-2 py-1 font-mono text-[0.65rem] font-bold text-cyan-100">
                          {ttl >= 0 ? `${ttl}s` : "persist"}
                        </span>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-[image:var(--gradient-neon)]"
                          animate={{ width: ttl >= 0 ? `${Math.max(0, Math.min(100, ttl * 10))}%` : "100%" }}
                          transition={{ duration: 0.25 }}
                        />
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  key="empty-cache"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-white/10 text-center text-sm leading-6 text-slate-400"
                >
                  No keys yet. Run SET name Suvanwita.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-white/5 p-2">
              <p className="text-lg font-black text-white">{cacheEntries.length}</p>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-500">keys</p>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <p className="text-lg font-black text-white">{formatUptime(uptime)}</p>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-500">uptime</p>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <p className="text-lg font-black text-white">{commandsProcessed}</p>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-500">cmds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
