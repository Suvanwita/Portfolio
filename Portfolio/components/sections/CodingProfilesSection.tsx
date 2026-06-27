"use client";

import { motion } from "framer-motion";
import { ExternalLink, Terminal, Shield, Compass } from "lucide-react";
import { SiCodechef, SiCodeforces, SiLeetcode } from "react-icons/si";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ProfileItem = {
  platform: string;
  label: string;
  href: string;
  icon: any;
  accent: string;
  rank: string;
  rankClass: string;
};

const profiles: ProfileItem[] = [
  {
    platform: "LeetCode",
    label: "DSA practice and interview-style problem solving",
    href: "https://leetcode.com/",
    icon: SiLeetcode,
    accent: "from-amber-300 via-orange-500 to-pink-500",
    rank: "Knight",
    rankClass: "border-amber-500/30 bg-amber-950/20 text-amber-400",
  },
  {
    platform: "Codeforces",
    label: "Contest programming and rating-focused challenges",
    href: "https://codeforces.com/",
    icon: SiCodeforces,
    accent: "from-cyan-300 via-blue-500 to-violet-500",
    rank: "Pupil",
    rankClass: "border-cyan-500/30 bg-cyan-950/40 text-cyan-400",
  },
  {
    platform: "CodeChef",
    label: "Starters contests, rankings, and competitive growth",
    href: "https://www.codechef.com/",
    icon: SiCodechef,
    accent: "from-pink-300 via-fuchsia-500 to-violet-500",
    rank: "3 Star",
    rankClass: "border-pink-500/30 bg-pink-950/40 text-pink-400",
  },
];

const terminalLines = ["solving problem...", "compiling...", "accepted OK"];

function ProfileRankBadge({ platform, rank }: { platform: string; rank: string }) {
  if (platform === "LeetCode") {
    return (
      <div className="relative flex flex-col items-center justify-center h-24 w-full sm:w-36 shrink-0 rounded-xl border border-amber-500/25 bg-amber-950/40 overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.15)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
        <div className="sci-fi-corner sci-fi-corner-tl !border-amber-500/50" />
        <div className="sci-fi-corner sci-fi-corner-br !border-amber-500/50" />
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
          <Shield className="h-4.5 w-4.5" />
        </div>
        <span className="mt-1.5 text-lg sm:text-xl font-black tracking-wider text-amber-300 uppercase drop-shadow-[0_0_8px_rgba(245,158,11,0.65)] font-mono">
          {rank}
        </span>
      </div>
    );
  }
  
  if (platform === "Codeforces") {
    return (
      <div className="relative flex flex-col items-center justify-center h-24 w-full sm:w-36 shrink-0 rounded-xl border border-cyan-500/25 bg-cyan-950/40 overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.15)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
        <div className="sci-fi-corner sci-fi-corner-tr !border-cyan-500/50" />
        <div className="sci-fi-corner sci-fi-corner-bl !border-cyan-500/50" />
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Compass className="h-4.5 w-4.5 animate-spin-slow" />
        </div>
        <span className="mt-1.5 text-lg sm:text-xl font-black tracking-wider text-cyan-300 uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.65)] font-mono">
          {rank}
        </span>
      </div>
    );
  }

  // CodeChef (3 Star)
  return (
    <div className="relative flex flex-col items-center justify-center h-24 w-full sm:w-36 shrink-0 rounded-xl border border-pink-500/25 bg-pink-950/40 overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.15)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.02)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
      <div className="sci-fi-corner sci-fi-corner-tl !border-pink-500/50" />
      <div className="sci-fi-corner sci-fi-corner-br !border-pink-500/50" />
      <div className="relative flex gap-1 items-center justify-center h-8">
        {[1, 2, 3].map((i) => (
          <motion.span
            key={i}
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
            className="text-pink-400 text-sm drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
          >
            ★
          </motion.span>
        ))}
      </div>
      <span className="mt-1 text-lg sm:text-xl font-black tracking-wider text-pink-300 uppercase drop-shadow-[0_0_8px_rgba(236,72,153,0.65)] font-mono">
        {rank}
      </span>
    </div>
  );
}

export function CodingProfilesSection() {
  return (
    <section id="coding-profiles" className="section-padding container-custom overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Coding Arena"
          title="Competitive Coding Arena"
          description="Contest platforms, solved targets, and ranks in our neural diagnostic logs."
        />
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="glass-card neon-border rounded-2xl p-5"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center gap-3">
            <Terminal className="h-5 w-5 text-cyan-200" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Judge Terminal</p>
              <h3 className="mt-1 text-xl font-black text-white">Run submission</h3>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/45 p-4 font-mono text-sm leading-7">
            {terminalLines.map((line, index) => (
              <motion.p
                key={line}
                className={line.includes("accepted") ? "text-emerald-200" : "text-cyan-100"}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.45, duration: 0.28 }}
              >
                <span className="text-pink-200">&gt;</span> {line}
              </motion.p>
            ))}
            <motion.span
              className="mt-2 inline-block h-5 w-2 bg-cyan-200"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              aria-hidden="true"
            />
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Submission / rating pulse
            </p>
            <div className="flex h-36 items-end gap-2">
              {[42, 58, 76, 61, 88, 72, 94, 80, 66, 90].map((height, index) => (
                <motion.span
                  key={`${height}-${index}`}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-cyan-400/35 to-pink-300/80"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: index * 0.05, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {profiles.map((profile, index) => (
            <motion.article
              key={profile.platform}
              className="group glass-card relative overflow-hidden rounded-2xl p-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${profile.accent}`} />
              <div className={`absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br ${profile.accent} opacity-15 blur-3xl transition group-hover:opacity-35`} />
              
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${profile.accent} text-white shadow-neon`}>
                    <profile.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{profile.platform}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{profile.label}</p>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-black text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
                    >
                      Open Profile
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Cyber Rank Badge instead of Bar-Chart Heatmap */}
                <ProfileRankBadge platform={profile.platform} rank={profile.rank} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
