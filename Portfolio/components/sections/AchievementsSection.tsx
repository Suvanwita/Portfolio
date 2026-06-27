"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, GraduationCap, Medal, Rocket, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type AchievementCategory = "Coding" | "Open Source" | "Hackathon" | "Academic";

type Achievement = {
  title: string;
  category: AchievementCategory;
  rankLabel: string;
  rankValue?: number;
  prefix?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent: string;
};

const filters = ["All", "Coding", "Open Source", "Hackathon", "Academic"] as const;

const achievements: Achievement[] = [
  {
    title: "Code-X-Culture 2026 Rank 14, annual coding contest of IIITA",
    category: "Coding",
    rankLabel: "Rank",
    rankValue: 14,
    prefix: "#",
    icon: Trophy,
    accent: "from-cyan-300 via-blue-500 to-violet-500",
  },
  {
    title: "Three Musketeers 2026 Rank 7 (best girl's team), team coding contest conducted by Aparoksha, IIITA",
    category: "Coding",
    rankLabel: "Rank",
    rankValue: 7,
    prefix: "#",
    icon: Medal,
    accent: "from-pink-400 via-fuchsia-500 to-violet-500",
  },
  {
    title: "Flipkart Girls Wanna Code 7.0 Top Scholars Cohort",
    category: "Coding",
    rankLabel: "Top Scholars",
    icon: Trophy,
    accent: "from-cyan-300 via-blue-500 to-violet-500",
  },
  {
    title: "CodeChef Starters 227 Global Rank 446",
    category: "Coding",
    rankLabel: "Global Rank",
    rankValue: 446,
    prefix: "#",
    icon: Code2,
    accent: "from-pink-400 via-fuchsia-500 to-violet-500",
  },
  {
    title: "OpenCode 2024 Rank 12",
    category: "Open Source",
    rankLabel: "Rank",
    rankValue: 12,
    prefix: "#",
    icon: Medal,
    accent: "from-emerald-300 via-cyan-500 to-blue-500",
  },
  {
    title: "Out Of Context Hackathon Rank 9",
    category: "Hackathon",
    rankLabel: "Rank",
    rankValue: 9,
    prefix: "#",
    icon: Rocket,
    accent: "from-amber-300 via-pink-500 to-fuchsia-500",
  },
  {
    title: "JEE Mains AIR 5640",
    category: "Academic",
    rankLabel: "AIR",
    rankValue: 5640,
    prefix: "AIR ",
    icon: GraduationCap,
    accent: "from-violet-300 via-indigo-500 to-cyan-400",
  },
];

function CountUpRank({
  value,
  prefix = "",
  fallback,
}: {
  value?: number;
  prefix?: string;
  fallback: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 80, damping: 22 });
  const displayValue = useTransform(springValue, (latest) =>
    value === undefined ? fallback : `${prefix}${Math.round(latest)}`,
  );

  useEffect(() => {
    if (isInView && value !== undefined) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <motion.p ref={ref} className="text-3xl font-black text-white sm:text-4xl">
      {displayValue}
    </motion.p>
  );
}

function ConfettiBurst({ burstKey }: { burstKey: number }) {
  if (burstKey === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, index) => {
        const angle = (index / 16) * Math.PI * 2;
        const distance = 54 + (index % 4) * 12;

        return (
          <motion.span
            key={`${burstKey}-${index}`}
            className={cn(
              "absolute left-1/2 top-1/2 h-2 w-2 rounded-sm",
              index % 3 === 0 && "bg-cyan-300",
              index % 3 === 1 && "bg-pink-300",
              index % 3 === 2 && "bg-violet-300",
            )}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.7, rotate: 0 }}
            animate={{
              opacity: 0,
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: 1,
              rotate: 180,
            }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const [burstKey, setBurstKey] = useState(0);

  const triggerBurst = () => setBurstKey((current) => current + 1);

  return (
    <motion.article
      className="group glass-card relative min-h-64 overflow-hidden rounded-2xl p-5"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.52, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, rotateX: 3 }}
      onHoverStart={triggerBurst}
      onClick={triggerBurst}
    >
      <ConfettiBurst burstKey={burstKey} />
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${achievement.accent}`} />
      <div className={`absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br ${achievement.accent} opacity-20 blur-3xl transition group-hover:opacity-35`} />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${achievement.accent} text-white shadow-neon`}>
            <achievement.icon className="h-7 w-7" aria-hidden="true" />
          </div>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
            {achievement.category}
          </span>
        </div>

        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-pink-100">
            {achievement.rankLabel}
          </p>
          <CountUpRank
            value={achievement.rankValue}
            prefix={achievement.prefix}
            fallback={achievement.rankLabel}
          />
        </div>

        <h3 className="mt-6 text-lg font-black leading-7 text-white">{achievement.title}</h3>
        <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-slate-100">
          Achievement Unlocked
        </p>
      </div>
    </motion.article>
  );
}

export function AchievementsSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  const visibleAchievements =
    activeFilter === "All"
      ? achievements
      : achievements.filter((achievement) => achievement.category === activeFilter);

  return (
    <section id="achievements" ref={sectionRef} className="section-padding container-custom">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Achievements"
          title="An unlocked badge wall for competitive and academic wins."
          description="Filtered highlights across coding contests, open source programs, hackathons, and academics."
        />
      </motion.div>

      <motion.div
        className="glass-card mt-8 inline-flex items-center gap-3 rounded-full px-4 py-2"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Trophy className="h-5 w-5 text-cyan-200" aria-hidden="true" />
        <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
          Achievement Unlocked
        </span>
      </motion.div>

      <div className="glass-card mt-6 flex flex-wrap gap-2 rounded-xl p-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "relative rounded-lg px-4 py-2 text-sm font-bold text-slate-300 transition hover:text-white",
                isActive && "text-white",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="active-achievement-filter"
                  className="absolute inset-0 rounded-lg bg-cyan-300/12"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                />
              ) : null}
              <span className="relative">{filter}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleAchievements.map((achievement, index) => (
          <AchievementCard key={achievement.title} achievement={achievement} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
