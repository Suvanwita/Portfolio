"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  Terminal, 
  Layers, 
  Cpu, 
  ShieldAlert,
  Compass,
  Zap
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

const categoryLabels: Record<string, string> = {
  Programming: "Programming Languages",
  "Full-stack": "Full-stack Technologies",
  "AI/ML": "AI-ML & Data Science",
  DevOps: "DevOps & Developer Tools",
};

// Icons associated with each sector
const categoryIcons: Record<string, any> = {
  Programming: Terminal,
  "Full-stack": Layers,
  "AI/ML": Cpu,
  DevOps: ShieldAlert,
};

const planetStyles = [
  "from-cyan-400/10 via-cyan-500/5 to-transparent",
  "from-pink-400/10 via-pink-500/5 to-transparent",
  "from-violet-400/10 via-violet-500/5 to-transparent",
  "from-amber-400/10 via-amber-500/5 to-transparent",
];

const currentlyExploring = ["LangChain", "LangGraph", "Kubernetes", "Rust"];

function SkillChip({ 
  skill, 
  highlighted, 
  dimmed 
}: { 
  skill: string; 
  highlighted: boolean; 
  dimmed: boolean; 
}) {
  return (
    <motion.span
      className={cn(
        "inline-flex min-h-9 cursor-default items-center rounded-lg border border-white/5 bg-slate-950/60 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-all duration-300",
        highlighted && "border-cyan-400/60 bg-cyan-950/30 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.25)] text-glow-cyan scale-[1.05] z-10",
        dimmed && "opacity-30 scale-[0.95] border-white/5 bg-transparent text-slate-500"
      )}
      whileHover={{ 
        scale: 1.05, 
        borderColor: "rgba(34, 211, 238, 0.4)", 
        color: "#ffffff",
        boxShadow: "0 0 12px rgba(34, 211, 238, 0.15)"
      }}
    >
      {skill}
    </motion.span>
  );
}

export function SkillsGalaxy() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const visibleGroups = useMemo(() => {
    return portfolio.skills.filter(
      (group) => activeCategory === "All" || group.category === activeCategory
    );
  }, [activeCategory]);

  const hasSearch = query.trim().length > 0;

  const isMatch = (skill: string) => {
    if (!hasSearch) return false;
    return skill.toLowerCase().includes(query.trim().toLowerCase());
  };

  const tabs = ["All", ...portfolio.skills.map((group) => group.category)];

  return (
    <section id="skills" className="section-padding container-custom relative overflow-hidden">
      {/* Decorative sci-fi elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.06),transparent_50%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Constellation Constraints"
          title="Engineering Stack & Skills Constellation"
          description="Search or filter my technical ecosystem below. Matching skills illuminate immediately in the grid view."
        />
      </motion.div>

      {/* Cyber Search & Filter Toolbar */}
      <div className="relative mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        {/* Futuristic Terminal Search Prompt */}
        <div className="sci-fi-panel flex min-h-12 items-center gap-3 rounded-lg px-4 border border-cyan-500/20 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all">
          <div className="sci-fi-corner sci-fi-corner-tl" />
          <div className="sci-fi-corner sci-fi-corner-bl" />
          <Search className="h-4.5 w-4.5 shrink-0 text-cyan-400" aria-hidden="true" />
          <span className="text-[10px] font-mono text-cyan-600 font-bold shrink-0 tracking-wider">SYS_QUERY &gt;</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="TYPE TECHNOLOGY TO ILLUMINATE..."
            className="w-full bg-transparent text-xs font-mono font-bold uppercase tracking-wider text-cyan-100 outline-none placeholder:text-slate-600"
          />
        </div>

        {/* Constellation Filters */}
        <div className="sci-fi-panel flex flex-wrap gap-1 rounded-lg p-1.5 border border-cyan-500/20">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab;
            const label = tab === "All" ? "ALL_SECTORS" : tab.toUpperCase();

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveCategory(tab)}
                className={cn(
                  "relative rounded px-3 py-1.5 text-[10px] font-black tracking-widest text-slate-400 transition hover:text-white uppercase font-mono",
                  isActive && "text-white",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="active-skill-tab"
                    className="absolute inset-0 rounded bg-cyan-400/15 border border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Persistent Grid of Skills Sectors */}
      <div className="relative mt-8 grid gap-6 md:grid-cols-2">
        {visibleGroups.map((group, index) => {
          const IconComponent = categoryIcons[group.category] || Terminal;
          const bgStyle = planetStyles[index % planetStyles.length];

          // Check if sector has any search matches
          const hasMatchesInGroup = group.items.some(skill => isMatch(skill));

          return (
            <motion.article
              key={group.category}
              className={cn(
                "sci-fi-panel rounded-xl p-5 sm:p-6 overflow-hidden border transition-all duration-300",
                hasMatchesInGroup ? "border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]" : "border-cyan-500/10"
              )}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              {/* Corner brackets */}
              <div className="sci-fi-corner sci-fi-corner-tl" />
              <div className="sci-fi-corner sci-fi-corner-tr" />
              <div className="sci-fi-corner sci-fi-corner-bl" />
              <div className="sci-fi-corner sci-fi-corner-br" />

              {/* Decorative faint glow circle */}
              <div className={cn("absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br blur-3xl pointer-events-none opacity-40", bgStyle)} />

              {/* Sector Header */}
              <div className="relative flex items-center justify-between border-b border-cyan-950/60 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/20 text-cyan-400">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono font-bold tracking-[0.24em] text-cyan-500 uppercase block">
                      SECTOR_FEED_0{index + 1}
                    </span>
                    <h3 className="text-lg font-black tracking-wide text-white uppercase mt-0.5">
                      {categoryLabels[group.category] ?? group.category}
                    </h3>
                  </div>
                </div>

                {/* Telemetry Meter Arc Graphic */}
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">CAPACITY_NORM</span>
                  <svg className="h-8 w-8 text-cyan-400/40" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="5 15" className="animate-spin-slow" />
                    <circle cx="18" cy="18" r="11" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="30 10" className="animate-spin-reverse-slow" />
                  </svg>
                </div>
              </div>

              {/* Persistent Skills Chip Grid */}
              <div className="relative z-10 flex flex-wrap gap-2">
                {group.items.map((skill) => {
                  const matches = isMatch(skill);
                  const dimmed = hasSearch && !matches;
                  const highlighted = hasSearch && matches;

                  return (
                    <SkillChip 
                      key={skill} 
                      skill={skill} 
                      highlighted={highlighted}
                      dimmed={dimmed}
                    />
                  );
                })}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Animated R&D Rolling Marquee Ticker */}
      <div className="sci-fi-panel rounded-lg border border-pink-500/20 p-3 mt-8 overflow-hidden relative">
        <div className="sci-fi-corner sci-fi-corner-tl" />
        <div className="sci-fi-corner sci-fi-corner-br" />
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 rounded bg-pink-950/40 border border-pink-500/30 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-pink-400 shrink-0 font-mono">
            <Sparkles className="h-3.5 w-3.5 text-pink-400" />
            <span>R&amp;D_STATUS: TARGETS_ACQUIRED</span>
          </div>
          <div className="flex-1 overflow-hidden relative h-5 min-w-[200px]">
            <motion.div
              className="flex items-center gap-12 whitespace-nowrap absolute"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              {currentlyExploring.concat(currentlyExploring).map((skill, index) => (
                <span key={skill + "-" + index} className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-cyan-300">
                  <Zap className="h-3 w-3 text-cyan-400 animate-pulse" />
                  TRACKING_CORE: [ {skill.toUpperCase()} ]
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
