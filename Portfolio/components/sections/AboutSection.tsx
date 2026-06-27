"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Brain, Code2, GitBranch, Server } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
};

const identityFields = [
  { label: "Name", value: "Suvanwita Das" },
  { label: "Institute", value: "IIIT Allahabad" },
  { label: "Branch", value: "B.Tech Information Technology" },
  { label: "CGPA", value: "8.92" },
  { label: "Interests", value: "Full-stack, AI/ML, Systems, Open Source" },
  { label: "Location", value: "Prayagraj, India" },
];

const counters = [
  { value: 8.92, decimals: 2, label: "CGPA" },
  { value: 95.4, suffix: "%", decimals: 1, label: "Class 12" },
  { value: 98.8, suffix: "%", decimals: 1, label: "Class 10" },
  { value: 5640, prefix: "AIR ", label: "JEE Mains" },
];

const focusCards = [
  {
    title: "Full Stack",
    description: "Fast interfaces, APIs, databases, and product-ready web architecture.",
    icon: Code2,
  },
  {
    title: "AI/ML",
    description: "Recommendation systems, Python ML tooling, and data-focused workflows.",
    icon: Brain,
  },
  {
    title: "Systems",
    description: "C++ internals, TCP services, cache behavior, typed storage, and metrics.",
    icon: Server,
  },
  {
    title: "Open Source",
    description: "Mentorship, community programs, contributor workflows, and FOSS culture.",
    icon: GitBranch,
  },
];

function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 80, damping: 24 });
  const displayValue = useTransform(springValue, (latest) => `${prefix}${latest.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <div ref={ref} className="glass-card rounded-lg p-5 text-center">
      <motion.p className="text-3xl font-black text-white sm:text-4xl">{displayValue}</motion.p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">{label}</p>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-padding container-custom">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="About"
          title="A builder at the intersection of web, intelligence, and systems."
          description="Suvanwita Das is a B.Tech IT student at IIIT Allahabad with a strong academic foundation, practical full-stack experience, and a growing footprint in AI/ML, DevOps, and open-source communities."
        />
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.article
          className="glass-card neon-border rounded-2xl p-5 sm:p-6"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-pink-100">Identity Card</p>
            <h3 className="mt-2 text-2xl font-black text-white">Suvanwita.dev profile</h3>
          </div>
          <div className="grid gap-3">
            {identityFields.map((field) => (
              <div
                key={field.label}
                className="grid gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-[8rem_1fr]"
              >
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  {field.label}
                </span>
                <span className="text-sm font-semibold leading-6 text-white">{field.value}</span>
              </div>
            ))}
          </div>
        </motion.article>

        <div>
          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {counters.map((counter) => (
              <AnimatedCounter key={counter.label} {...counter} />
            ))}
          </motion.div>

          <motion.div
            className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-base leading-8 text-slate-300">
              I&apos;m interested in full-stack development, AI/ML, systems programming,
              open source, and developer-focused products. I&apos;ve worked across frontend,
              backend, AI/ML, DevOps tooling, and open-source communities, with a CGPA of{" "}
              <span className="font-bold text-white">{portfolio.education[0]?.score.replace("CGPA ", "")}</span>.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {focusCards.map((card, index) => (
          <motion.article
            key={card.title}
            className="group glass-card relative min-h-44 overflow-hidden rounded-xl p-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[image:var(--gradient-neon)] opacity-70" />
            <card.icon className="h-7 w-7 text-cyan-200" aria-hidden="true" />
            <h3 className="mt-5 text-lg font-black text-white">{card.title}</h3>
            <motion.p
              className="mt-3 text-sm leading-6 text-slate-300 opacity-100 sm:translate-y-3 sm:opacity-0 sm:transition sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
            >
              {card.description}
            </motion.p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
