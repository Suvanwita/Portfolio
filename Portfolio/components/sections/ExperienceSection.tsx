"use client";

import { motion } from "framer-motion";
import { BarChart3, BookOpen, DatabaseZap, FileCheck2 } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type FocusKey = "imputation" | "validation" | "volcano" | "docs";

const focusCards = [
  {
    key: "imputation",
    title: "Missing-data imputation",
    description: "Improved genomics workflows by filling gaps in sparse datasets.",
    icon: DatabaseZap,
  },
  {
    key: "validation",
    title: "Dataset validation",
    description: "Automated checks to catch malformed or incomplete input data.",
    icon: FileCheck2,
  },
  {
    key: "volcano",
    title: "Volcano Plot enhancements",
    description: "Refined scientific visualization for clearer exploratory analysis.",
    icon: BarChart3,
  },
  {
    key: "docs",
    title: "Documentation",
    description: "Wrote technical notes for validation behavior and platform updates.",
    icon: BookOpen,
  },
] satisfies Array<{
  key: FocusKey;
  title: string;
  description: string;
  icon: typeof DatabaseZap;
}>;

export function ExperienceSection() {
  const [activeFocus, setActiveFocus] = useState<FocusKey>("volcano");

  return (
    <section id="experience" className="section-padding container-custom">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Experience"
          title="Research platform engineering for computational genomics."
          description="A focused internship building data reliability, visualization, and documentation improvements into the TRACES platform."
        />
      </motion.div>

      <div className="mt-10">
        <motion.article
          className="glass-card neon-border rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-pink-100">
                Jan 2026 - Feb 2026
              </p>
              <h3 className="mt-3 text-3xl font-black text-white">Software Development Engineer Intern</h3>
              <p className="mt-2 text-lg font-bold text-cyan-100">University of Missouri</p>
            </div>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
              TRACES
            </span>
          </div>

          <p className="mt-6 text-base leading-8 text-slate-300">
            Worked on the TRACES computational genomics platform, implementing missing-data
            imputation, automated dataset validation, Volcano Plot enhancements, and technical
            documentation.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {focusCards.map((card, index) => (
              <motion.button
                key={card.key}
                type="button"
                onMouseEnter={() => setActiveFocus(card.key)}
                onFocus={() => setActiveFocus(card.key)}
                onClick={() => setActiveFocus(card.key)}
                className={cn(
                  "group rounded-xl border p-4 text-left transition",
                  activeFocus === card.key
                    ? "border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_28px_rgba(34,211,238,0.16)]"
                    : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]",
                )}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <card.icon className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <h4 className="mt-4 text-base font-black text-white">{card.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
