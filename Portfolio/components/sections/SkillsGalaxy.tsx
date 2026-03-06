"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

const categoryLabels: Record<string, string> = {
  Programming: "Programming Languages",
  "Full-stack": "Full-stack Technologies",
  "AI/ML": "AI-ML & Data Science",
  DevOps: "DevOps & Developer Tools",
};

const planetStyles = [
  "from-cyan-300/24 via-blue-500/14 to-violet-500/24",
  "from-pink-300/24 via-fuchsia-500/14 to-violet-500/24",
  "from-emerald-300/20 via-cyan-500/14 to-blue-500/22",
  "from-amber-300/18 via-pink-500/12 to-cyan-500/20",
];

const currentlyExploring = ["LangChain", "LangGraph", "Kubernetes", "Rust"];

function SkillChip({ skill }: { skill: string }) {
  return (
    <motion.span
      className="inline-flex min-h-9 cursor-default items-center rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-100 shadow-[0_0_18px_rgba(34,211,238,0.08)] backdrop-blur"
      whileHover={{ scale: 1.08, y: -4, rotate: -1 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
    >
      {skill}
    </motion.span>
  );
}

export function SkillsGalaxy() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCategory, setExpandedCategory] = useState(portfolio.skills[0]?.category ?? "");
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return portfolio.skills
      .filter((group) => activeCategory === "All" || group.category === activeCategory)
      .map((group) => ({
        ...group,
        items: group.items.filter((skill) => skill.toLowerCase().includes(normalizedQuery)),
      }))
      .filter((group) => group.items.length > 0 || !normalizedQuery);
  }, [activeCategory, query]);

  const tabs = ["All", ...portfolio.skills.map((group) => group.category)];

  return (
    <section id="skills" className="section-padding container-custom relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-cyan-100/60"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 19) % 100}%`,
            }}
            animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.8, 1] }}
            transition={{ duration: 2.4 + (index % 5) * 0.4, repeat: Infinity, delay: index * 0.08 }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Skills Galaxy"
          title="Explore the tools orbiting my engineering work."
          description="Search across the stack, switch constellations, and expand each planet to reveal the skills inside."
        />
      </motion.div>

      <div className="relative mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="glass-card flex min-h-12 items-center gap-3 rounded-xl px-4">
          <Search className="h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
          <span className="sr-only">Search skills</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills..."
            className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500"
          />
        </label>

        <div className="glass-card flex flex-wrap gap-2 rounded-xl p-2">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab;
            const label = tab === "All" ? "All" : categoryLabels[tab] ?? tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveCategory(tab)}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-xs font-bold text-slate-300 transition hover:text-white",
                  isActive && "text-white",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="active-skill-tab"
                    className="absolute inset-0 rounded-lg bg-cyan-300/12"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-pink-100">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Currently exploring
        </span>
        {currentlyExploring.map((skill) => (
          <span key={skill} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold text-cyan-100">
            {skill}
          </span>
        ))}
      </div>

      <div className="relative mt-10 grid gap-5 lg:grid-cols-2">
        {filteredGroups.map((group, index) => {
          const isExpanded = expandedCategory === group.category;

          return (
            <motion.article
              key={group.category}
              className={cn(
                "glass-card relative overflow-hidden rounded-2xl p-5 sm:p-6",
                isExpanded && "neon-border",
              )}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
            >
              <button
                type="button"
                onClick={() => setExpandedCategory(isExpanded ? "" : group.category)}
                className="block w-full text-left"
                aria-expanded={isExpanded}
              >
                <div className={cn("absolute -right-14 -top-16 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl", planetStyles[index % planetStyles.length])} />
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                      Planet {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-2xl font-black text-white">
                      {categoryLabels[group.category] ?? group.category}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">{group.items.length} matched skills</p>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0, scale: isExpanded ? 1.08 : 1 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-2xl font-light text-white"
                  >
                    +
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="relative overflow-hidden"
                  >
                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <SkillChip key={skill} skill={skill} />
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
