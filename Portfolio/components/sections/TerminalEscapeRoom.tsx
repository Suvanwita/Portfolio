"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clipboard,
  Code2,
  Contact,
  FolderGit2,
  HelpCircle,
  Lock,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserRound,
  XCircle,
  Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type MissionKey = "identity" | "skills" | "projects" | "achievements" | "hire";

type TerminalLine = {
  id: string;
  type: "input" | "output" | "error" | "success" | "system";
  text: string;
};

type Mission = {
  key: MissionKey;
  title: string;
  command: string;
  description: string;
  icon: React.ReactNode;
};

const EMAIL = "dsuvanwita@gmail.com";

const initialLines: TerminalLine[] = [
  {
    id: "welcome-1",
    type: "system",
    text: "Welcome to Suvanwita's Portfolio Escape Room.",
  },
  {
    id: "welcome-2",
    type: "system",
    text: 'Type "help" to begin.',
  },
];

const missions: Mission[] = [
  {
    key: "identity",
    title: "Identity",
    command: "whoami",
    description: "Unlock candidate identity",
    icon: <UserRound className="h-4 w-4" aria-hidden="true" />,
  },
  {
    key: "skills",
    title: "Skills",
    command: "unlock skills",
    description: "Reveal technical stack",
    icon: <Code2 className="h-4 w-4" aria-hidden="true" />,
  },
  {
    key: "projects",
    title: "Projects",
    command: "inspect projects",
    description: "Scan featured builds",
    icon: <FolderGit2 className="h-4 w-4" aria-hidden="true" />,
  },
  {
    key: "achievements",
    title: "Achievements",
    command: "run achievements",
    description: "Load achievement badges",
    icon: <Award className="h-4 w-4" aria-hidden="true" />,
  },
  {
    key: "hire",
    title: "Hire Signal",
    command: "sudo hire suvanwita",
    description: "Generate recruiter verdict",
    icon: <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />,
  },
];

const helpOutput = `Available commands:
whoami              Unlock identity
unlock skills       Reveal technical stack
inspect projects    Scan featured projects
run achievements    Load achievement badges
sudo hire suvanwita Generate recruiter verdict
clear               Clear terminal
reset               Restart escape room`;

const commandOutputs: Record<MissionKey, string> = {
  identity:
    "Identity unlocked.\nSuvanwita Das is a B.Tech IT student at IIIT Allahabad, full-stack developer, AI/ML explorer, systems enthusiast, and open-source contributor.",

  skills:
    "Skills unlocked.\nCore stack detected:\nFrontend: React, Next.js, Tailwind CSS, TypeScript\nBackend: Node.js, Express.js, FastAPI\nDatabases: MongoDB, PostgreSQL, MySQL\nSystems & Tools: C++, Redis, Docker, GitHub Actions\nAI/ML: Python, Pandas, Scikit-learn, OpenCV",

  projects:
    "Project scan complete.\n\nSkillSync:\nAI-driven career path recommendation platform using React, Node.js, MongoDB, FastAPI, Scikit-learn, Pandas, and Joblib.\n\nSwiftCache:\nRedis-inspired in-memory datastore built in C++17 with TCP server, command registry, TTL expiration, typed storage, and metrics.",

  achievements:
    "Achievement badges loaded:\n- Flipkart Girls Wanna Code 7.0 Top Scholars Cohort\n- CodeChef Starters 227 Global Rank 446\n- OpenCode 2024 Rank 12\n- Out Of Context Hackathon Rank 9\n- JEE Mains AIR 5640",

  hire:
    "Permission granted.\nRecruiter verdict generated.\n\nCandidate Match: 95%\nSignal: Strong fit for frontend, full-stack, AI/ML product, open-source, and systems-oriented internship roles.\n\nOpening contact path...",
};

const finalMetrics = [
  { label: "Frontend Polish", value: 95 },
  { label: "Full Stack Readiness", value: 92 },
  { label: "AI/ML Exposure", value: 89 },
  { label: "Open Source Impact", value: 94 },
  { label: "Systems Curiosity", value: 90 },
];

const quickCommands = [
  "help",
  "whoami",
  "unlock skills",
  "inspect projects",
  "run achievements",
  "sudo hire suvanwita",
];

export function TerminalEscapeRoom() {
  const [inputValue, setInputValue] = useState("");
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>(initialLines);
  const [unlockedMissions, setUnlockedMissions] = useState<Record<MissionKey, boolean>>({
    identity: false,
    skills: false,
    projects: false,
    achievements: false,
    hire: false,
  });
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [finalUnlocked, setFinalUnlocked] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy Email");
  const inputRef = useRef<HTMLInputElement>(null);

  const completedCount = useMemo(
    () => Object.values(unlockedMissions).filter(Boolean).length,
    [unlockedMissions]
  );

  const progress = completedCount * 20;

  const addLine = (type: TerminalLine["type"], text: string) => {
    setTerminalLines((prev) => [
      ...prev,
      {
        id: `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type,
        text,
      },
    ]);
  };

  const unlockMission = (key: MissionKey) => {
    setUnlockedMissions((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy Email"), 1400);
    } catch {
      setCopyLabel("Copy failed");
      setTimeout(() => setCopyLabel("Copy Email"), 1400);
    }
  };

  const resetGame = () => {
    setInputValue("");
    setTerminalLines(initialLines);
    setUnlockedMissions({
      identity: false,
      skills: false,
      projects: false,
      achievements: false,
      hire: false,
    });
    setCommandHistory([]);
    setHistoryIndex(null);
    setIsExecuting(false);
    setFinalUnlocked(false);
  };

  const executeMission = (key: MissionKey) => {
    setIsExecuting(true);
    addLine("system", "executing command...");

    window.setTimeout(() => {
      unlockMission(key);
      addLine("success", commandOutputs[key]);

      if (key === "hire") {
        setFinalUnlocked(true);
      }

      setIsExecuting(false);
    }, key === "projects" ? 750 : 500);
  };

  const handleCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();

    if (!command || isExecuting) return;

    addLine("input", `suvanwita@portfolio:~$ ${rawCommand.trim()}`);
    setCommandHistory((prev) => [...prev, rawCommand.trim()]);
    setHistoryIndex(null);
    setInputValue("");

    if (command === "help") {
      addLine("output", helpOutput);
      return;
    }

    if (command === "clear") {
      setTerminalLines([]);
      return;
    }

    if (command === "reset") {
      resetGame();
      return;
    }

    if (command === "whoami") {
      if (unlockedMissions.identity) {
        addLine("system", "Identity mission is already unlocked.");
        return;
      }

      executeMission("identity");
      return;
    }

    if (command === "unlock skills") {
      if (!unlockedMissions.identity) {
        addLine("error", 'Access denied. Unlock identity first using "whoami".');
        return;
      }

      if (unlockedMissions.skills) {
        addLine("system", "Skills mission is already unlocked.");
        return;
      }

      executeMission("skills");
      return;
    }

    if (command === "inspect projects") {
      if (!unlockedMissions.skills) {
        addLine("error", 'Access denied. Unlock skills first using "unlock skills".');
        return;
      }

      if (unlockedMissions.projects) {
        addLine("system", "Projects mission is already unlocked.");
        return;
      }

      executeMission("projects");
      return;
    }

    if (command === "run achievements") {
      if (!unlockedMissions.projects) {
        addLine("error", 'Access denied. Inspect projects first using "inspect projects".');
        return;
      }

      if (unlockedMissions.achievements) {
        addLine("system", "Achievements mission is already unlocked.");
        return;
      }

      executeMission("achievements");
      return;
    }

    if (command === "sudo hire suvanwita") {
      if (!unlockedMissions.achievements) {
        addLine("error", 'Access denied. Load achievements first using "run achievements".');
        return;
      }

      if (unlockedMissions.hire) {
        addLine("system", "Hire signal already generated.");
        return;
      }

      executeMission("hire");
      return;
    }

    addLine("error", 'Command not recognized. Type "help" to see available commands.');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCommand(inputValue);
      return;
    }

    if (event.key === "Escape") {
      setInputValue("");
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!commandHistory.length) return;

      const nextIndex =
        historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === null) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInputValue("");
        return;
      }

      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex]);
    }
  };

  const lineClassName = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-pink-200";
      case "error":
        return "text-rose-300";
      case "success":
        return "text-emerald-200";
      case "system":
        return "text-cyan-200";
      default:
        return "text-slate-200";
    }
  };

  return (
    <section
      id="escape-room"
      aria-label="Terminal Portfolio Escape Room"
      className="section-padding container-custom relative overflow-hidden"
    >
      <div className="pointer-events-none absolute left-8 top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 right-8 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Recruiter Game Mode"
          title="Terminal Portfolio Escape Room"
          description="Unlock Suvanwita’s developer profile by running the right commands."
        />
      </motion.div>

      <div className="relative mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          className="glass-card neon-border overflow-hidden rounded-2xl"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            className="block w-full text-left"
            onClick={() => inputRef.current?.focus()}
            aria-label="Focus terminal input"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                <Terminal className="h-4 w-4" aria-hidden="true" />
                suvanwita@portfolio:~$
              </div>

              <Sparkles className="h-4 w-4 text-pink-200" aria-hidden="true" />
            </div>
          </button>

          <div className="relative min-h-[28rem] bg-black/45 p-4 font-mono text-sm leading-6 sm:p-5">
            <AnimatePresence>
              {isExecuting && (
                <motion.div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_24px_rgba(103,232,249,0.9)]"
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 420, opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>

            <div className="max-h-[24rem] space-y-3 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {terminalLines.map((line) => (
                  <motion.pre
                    key={line.id}
                    className={`whitespace-pre-wrap break-words ${lineClassName(line.type)}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {line.text}
                  </motion.pre>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
              <span className="shrink-0 text-pink-200">&gt;</span>
              <label htmlFor="escape-room-command" className="sr-only">
                Enter terminal command
              </label>
              <input
                ref={inputRef}
                id="escape-room-command"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isExecuting}
                placeholder={isExecuting ? "executing command..." : "type a command..."}
                className="min-w-0 flex-1 bg-transparent text-cyan-100 outline-none placeholder:text-slate-500 disabled:cursor-not-allowed"
              />
              <motion.span
                className="h-5 w-2 bg-cyan-200"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => handleCommand(inputValue)}
                disabled={isExecuting || !inputValue.trim()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-cyan-300/10 text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Run terminal command"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickCommands.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => handleCommand(command)}
                  disabled={isExecuting}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {command}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.aside
          className="space-y-5"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass-card neon-border rounded-2xl p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
                  Mission Progress
                </p>
                <h3 className="mt-1 text-2xl font-black text-white">{progress}% unlocked</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300/20 to-pink-400/20 text-cyan-100">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {missions.map((mission) => {
                const isUnlocked = unlockedMissions[mission.key];

                return (
                  <motion.div
                    key={mission.key}
                    className={`relative overflow-hidden rounded-xl border p-4 transition ${
                      isUnlocked
                        ? "border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_24px_rgba(34,211,238,0.16)]"
                        : "border-white/10 bg-white/[0.035] opacity-70"
                    }`}
                    animate={isUnlocked ? { scale: [1, 1.025, 1] } : { scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    {isUnlocked && (
                      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-300/20 blur-2xl" />
                    )}

                    <div className="relative flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isUnlocked
                            ? "bg-gradient-to-br from-cyan-300 to-pink-400 text-slate-950"
                            : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {isUnlocked ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : mission.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="font-black text-white">{mission.title}</h4>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] ${
                              isUnlocked
                                ? "bg-emerald-300/10 text-emerald-200"
                                : "bg-white/10 text-slate-400"
                            }`}
                          >
                            {isUnlocked ? (
                              <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                            ) : (
                              <Lock className="h-3 w-3" aria-hidden="true" />
                            )}
                            {isUnlocked ? "Unlocked" : "Locked"}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-300">{mission.description}</p>
                        <p className="mt-2 rounded-lg bg-black/25 px-2 py-1 font-mono text-xs text-cyan-100">
                          {mission.command}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {finalUnlocked ? (
              <motion.div
                className="glass-card neon-border relative overflow-hidden rounded-2xl p-5"
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-pink-400/20 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />

                <div className="relative">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
                    <Zap className="h-4 w-4" aria-hidden="true" />
                    Access Granted
                  </div>

                  <h3 className="text-2xl font-black text-white">Suvanwita’s profile is fully unlocked.</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Suvanwita combines polished frontend development, full-stack execution, AI/ML
                    exposure, open-source mentoring, and systems-level curiosity, making her a strong
                    candidate for internship opportunities.
                  </p>

                  <div className="mt-5 space-y-3">
                    {finalMetrics.map((metric, index) => (
                      <div key={metric.label}>
                        <div className="mb-1 flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-300">{metric.label}</span>
                          <span className="text-cyan-100">{metric.value}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-pink-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 0.65, delay: index * 0.07 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => scrollToSection("projects")}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
                    >
                      <FolderGit2 className="h-4 w-4" aria-hidden="true" />
                      View Projects
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection("contact")}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-pink-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
                    >
                      <Contact className="h-4 w-4" aria-hidden="true" />
                      Contact Suvanwita
                    </button>

                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-black text-white transition hover:border-pink-300/60 hover:bg-pink-300/10"
                    >
                      <Clipboard className="h-4 w-4" aria-hidden="true" />
                      {copyLabel}
                    </button>

                    <button
                      type="button"
                      onClick={resetGame}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-black text-white transition hover:border-amber-300/60 hover:bg-amber-300/10"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Restart Mission
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="glass-card rounded-2xl border border-white/10 p-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
              >
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-100">
                    <HelpCircle className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-black text-white">Escape Room Objective</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Run commands in order to unlock all missions:
                    </p>
                    <p className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-xs leading-6 text-cyan-100">
                      whoami → unlock skills → inspect projects → run achievements → sudo hire
                      suvanwita
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>
      </div>
    </section>
  );
}