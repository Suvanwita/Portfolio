"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GitPullRequest, Sparkles, UsersRound } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
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

const prCards = [
  { title: "fix: leaderboard sync", status: "reviewed" },
  { title: "feat: mentor dashboard", status: "approved" },
  { title: "docs: contributor guide", status: "merged" },
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

function ContributionGraph() {
  const cells = useMemo(
    () =>
      Array.from({ length: 52 }, (_, index) => ({
        id: index,
        level: (index * 7 + index * index) % 5,
      })),
    [],
  );

  return (
    <div className="glass-card flex min-h-44 flex-col justify-center rounded-xl p-4">
      <div className="mb-2 flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cyan-200">Contribution Graph</p>
          <h3 className="mt-1 text-sm font-black text-white">Open-source activity pulse</h3>
        </div>
        <Sparkles className="h-4 w-4 text-pink-200" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1">
        {cells.map((cell, index) => (
          <motion.span
            key={cell.id}
            className={cn(
              "aspect-square rounded-[3px]",
              cell.level === 0 && "bg-white/5",
              cell.level === 1 && "bg-cyan-300/20",
              cell.level === 2 && "bg-cyan-300/35",
              cell.level === 3 && "bg-violet-300/45",
              cell.level === 4 && "bg-pink-300/55",
            )}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: index * 0.006 }}
          />
        ))}
      </div>
    </div>
  );
}

function PullRequestAnimation() {
  return (
    <div className="glass-card flex min-h-32 flex-col justify-center rounded-xl p-3.5">
      <div className="mb-2 flex items-center gap-3">
        <GitPullRequest className="h-4 w-4 text-pink-200" aria-hidden="true" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-100">PR Review Flow</p>
          <h3 className="mt-1 text-base font-black text-white">Fake review queue</h3>
        </div>
      </div>
      <div className="grid gap-1.5">
        {prCards.map((card, index) => (
          <motion.div
            key={card.title}
            className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-1.5"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              opacity: { duration: 0.35, delay: index * 0.12 },
              x: { duration: 0.35, delay: index * 0.12 },
              y: { duration: 2.4, repeat: Infinity, delay: index * 0.22 },
            }}
          >
            <p className="font-mono text-sm font-bold text-white">#{index + 42} {card.title}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">{card.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ResponsibilitiesSection() {
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

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          className="grid content-start gap-3 sm:grid-cols-2"
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
              className="group glass-card relative overflow-hidden rounded-xl p-4"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6, rotateX: 3 }}
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
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.badges.map((badge) => (
                    <span key={badge} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-slate-100">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="grid content-start gap-4 sm:grid-cols-2">
          <FreshersCounter />
          <ContributionGraph />
          <div className="sm:col-span-2">
            <PullRequestAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
