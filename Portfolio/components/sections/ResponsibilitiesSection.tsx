"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { GitPullRequest, Sparkles, UsersRound, Calendar, ArrowRight, Check } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const responsibilities = [
  {
    title: "GirlScript Summer of Code 2026",
    role: "Mentor & Contributor",
    description:
      "Mentored contributors, reviewed PRs, contributed to and guided open-source development.",
    badges: ["Mentor", "Contributor", "Open Source"],
  },
  {
    title: "Geekhaven FOSS Wing",
    role: "FOSS Wing Member",
    description:
      "Conducted workshops for 100+ freshers, maintained OpenCode website/leaderboard, Mentor OpenCode 2025.",
    badges: ["Community", "Mentor", "Contributor"],
  },
  {
    title: "Club of Professionals",
    role: "Frontend Contributor",
    description: "Enhanced frontend features of the IIITA ERP Portal.",
    badges: ["Frontend", "Community"],
  },
  {
    title: "Rangtarangini Dramatics Society",
    role: "Writer & Performer",
    description: "Scriptwriting and acting for institute productions.",
    badges: ["Creative", "Community"],
  },
];

type PR = {
  id: number;
  title: string;
  status: "reviewing" | "approved" | "merged";
  author: string;
};

const initialPrs: PR[] = [
  { id: 142, title: "fix: leaderboard sync", status: "merged", author: "contributor_12" },
  { id: 145, title: "feat: mentor dashboard", status: "approved", author: "developer_04" },
  { id: 148, title: "docs: contributor guide", status: "reviewing", author: "git_explorer" }
];

const mockPrTitles = [
  "feat: pcos severity Random Forest models",
  "fix: epoll event loop connection drops",
  "docs: added supertest validation specs",
  "feat: trustcart NLP rule based fallbacks",
  "fix: zod schema validator exclusions",
  "refactor: redis locking redlock routines"
];

function FreshersCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 70, damping: 20 });
  const displayValue = useTransform(springValue, (latest) => `${Math.round(latest)}+`);

  useEffect(() => {
    if (isInView) {
      motionValue.set(100);
    }
  }, [isInView, motionValue]);

  return (
    <div ref={ref} className="glass-card flex min-h-44 flex-col items-center justify-center rounded-xl p-4 text-center">
      <UsersRound className="h-6 w-6 text-cyan-200" aria-hidden="true" />
      <motion.p className="mt-3 text-5xl font-black text-white">{displayValue}</motion.p>
      <p className="mt-2 max-w-40 text-sm font-bold leading-5 text-slate-300">freshers reached through workshops</p>
    </div>
  );
}

export function ResponsibilitiesSection() {
  // Shared States for interactivity
  const [prList, setPrList] = useState<PR[]>(initialPrs);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [cells, setCells] = useState(() => Array.from({ length: 52 }, (_, i) => (i * 7 + i * i) % 5));
  const [hoveredCell, setHoveredCell] = useState<{ id: number; level: number; date: string } | null>(null);

  // Helper to map index to mock date
  const getCellDate = (id: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const month = months[Math.floor(id / 9) % months.length]!;
    const day = (id % 28) + 1;
    return `${month} ${day}, 2026`;
  };

  // Simulate merging a PR and updating the graph
  const handleSimulatePRMerge = () => {
    if (isSimulationActive) return;
    setIsSimulationActive(true);

    const newId = Math.round(150 + Math.random() * 80);
    const randomTitle = mockPrTitles[Math.floor(Math.random() * mockPrTitles.length)]!;
    
    // Add new reviewing PR at top
    const newPr: PR = {
      id: newId,
      title: randomTitle,
      status: "reviewing",
      author: "open_coder"
    };

    setPrList(prev => [newPr, ...prev.slice(0, 2)]);

    // Phase 2: Approve after 800ms
    setTimeout(() => {
      setPrList(prev => prev.map(p => p.id === newId ? { ...p, status: "approved" as const } : p));
      
      // Phase 3: Merge after another 800ms
      setTimeout(() => {
        setPrList(prev => prev.map(p => p.id === newId ? { ...p, status: "merged" as const } : p));
        
        // Light up a random cell in the contribution graph
        const targetIdx = Math.floor(Math.random() * 52);
        setCells(prev => {
          const next = [...prev];
          next[targetIdx] = Math.min(4, (next[targetIdx] || 0) + 1);
          return next;
        });

        setIsSimulationActive(false);
      }, 800);
    }, 800);
  };

  return (
    <section id="open-source" className="section-padding container-custom">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Responsibilities"
          title="Positions that mix mentorship, product work, and creative energy."
          description="Leadership across open source, campus engineering, community workshops, and institute productions."
        />
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        
        {/* Left column: Responsibilities cards list */}
        <motion.div
          className="grid content-start gap-4 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {responsibilities.map((item) => (
            <motion.article
              key={item.title}
              className="group glass-card relative overflow-hidden rounded-xl p-4 flex flex-col justify-between min-h-[190px]"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[image:var(--gradient-neon)] opacity-70" />
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-cyan-300/15 blur-2xl transition group-hover:bg-pink-300/20" />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">{item.role}</p>
                <h3 className="mt-2 text-lg font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 relative">
                {item.badges.map((badge) => (
                  <span key={badge} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-slate-100">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Right column: Interactive Graph & simulator widgets */}
        <div className="grid content-start gap-4 sm:grid-cols-2">
          
          <FreshersCounter />

          {/* Contribution Graph widget */}
          <div className="glass-card flex min-h-44 flex-col justify-center rounded-xl p-4 relative overflow-visible">
            <div className="mb-2 flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cyan-200">Contribution Graph</p>
                <h3 className="mt-1 text-sm font-black text-white">Open-source activity pulse</h3>
              </div>
              <Sparkles className="h-4 w-4 text-pink-200" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1 relative">
              {cells.map((lvl, index) => (
                <motion.span
                  key={index}
                  onMouseEnter={() => setHoveredCell({ id: index, level: lvl, date: getCellDate(index) })}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={cn(
                    "aspect-square rounded-[3px] cursor-pointer transition-colors duration-200",
                    lvl === 0 && "bg-white/5 hover:bg-white/20",
                    lvl === 1 && "bg-cyan-300/20 hover:bg-cyan-400/40",
                    lvl === 2 && "bg-cyan-300/35 hover:bg-cyan-400/60",
                    lvl === 3 && "bg-violet-300/45 hover:bg-violet-400/70",
                    lvl === 4 && "bg-pink-300/65 hover:bg-pink-400/90 shadow-[0_0_10px_rgba(236,72,153,0.3)]",
                  )}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.006 }}
                />
              ))}

              {/* Tooltip render */}
              {hoveredCell && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 bg-slate-950/95 border border-cyan-500/35 rounded px-2 py-1 text-[8px] font-mono text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)] whitespace-nowrap">
                  {hoveredCell.level} commits on {hoveredCell.date}
                </div>
              )}
            </div>
          </div>

          {/* Pull Request merger Simulation widget */}
          <div className="sm:col-span-2 glass-card flex min-h-32 flex-col justify-center rounded-xl p-4">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-950/40 pb-3">
              <div className="flex items-center gap-3">
                <GitPullRequest className="h-5 w-5 text-pink-200" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-100">PR Review Flow</p>
                  <h3 className="mt-0.5 text-sm font-black text-white">Active Mentor Ledger</h3>
                </div>
              </div>

              {/* Simulated merge trigger */}
              <button
                type="button"
                onClick={handleSimulatePRMerge}
                disabled={isSimulationActive}
                className="rounded border border-pink-500/30 bg-pink-950/20 px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-pink-300 hover:bg-pink-500/10 transition disabled:opacity-50"
              >
                {isSimulationActive ? "Merging PR..." : "Simulate PR Merge"}
              </button>
            </div>

            <div className="grid gap-2">
              <AnimatePresence mode="popLayout">
                {prList.map((card) => (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={cn(
                      "rounded-lg border p-2.5 flex items-center justify-between font-mono text-[9px]",
                      card.status === "reviewing" && "border-amber-500/20 bg-amber-950/10 text-amber-300",
                      card.status === "approved" && "border-violet-500/20 bg-violet-950/10 text-violet-300",
                      card.status === "merged" && "border-emerald-500/20 bg-emerald-950/10 text-emerald-400"
                    )}
                  >
                    <div>
                      <p className="font-bold text-white text-xs">#{card.id} {card.title}</p>
                      <p className="text-slate-500 text-[8px] mt-0.5">Author: @{card.author}</p>
                    </div>
                    <span className={cn(
                      "rounded px-2 py-0.5 text-[8px] font-black uppercase tracking-wider border",
                      card.status === "reviewing" && "border-amber-500/30 bg-amber-950/20",
                      card.status === "approved" && "border-violet-500/30 bg-violet-950/20",
                      card.status === "merged" && "border-emerald-500/30 bg-emerald-950/20"
                    )}>
                      {card.status}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
