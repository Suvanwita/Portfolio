"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { portfolio, mentoredProjects } from "@/data/portfolio";
import { SkillSyncDemo } from "@/components/sections/projects/SkillSyncDemo";
import { SheCareDemo } from "@/components/sections/projects/SheCareDemo";
import { SwiftCacheTerminal } from "@/components/sections/projects/SwiftCacheTerminal";
import { TrustCartDemo } from "@/components/sections/projects/TrustCartDemo";
import { EventPulseDemo } from "@/components/sections/projects/EventPulseDemo";
import { SpeedoraDemo } from "@/components/sections/projects/SpeedoraDemo";
import { CareerCraftDemo } from "@/components/sections/projects/CareerCraftDemo";
import { FemCareDemo } from "@/components/sections/projects/FemCareDemo";

type ProjectCategory = "AI/ML" | "Full Stack" | "Systems" | "Open Source";

type FeaturedProject = {
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  categories: ProjectCategory[];
  githubUrl: string;
  liveUrl?: string;
  accent: string;
};

const filters = ["All", "AI/ML", "Full Stack", "Systems", "Open Source"] as const;

const codeSnippets = [
  "const path = recommend(skills)",
  "cache.set(key, value, ttl)",
  "model.predict(userVector)",
  "server.metrics()",
  "jwt.verify(token)",
  "redis-cli GET profile",
];

const featuredProjects: FeaturedProject[] = portfolio.projects.map((project) => {
  if (project.title === "SkillSync") {
    return {
      name: project.title,
      description: project.description,
      longDescription:
        "SkillSync is an AI-driven career path recommendation platform that combines a full-stack web experience with Python ML services to map skills, goals, and learning pathways into practical career suggestions.",
      tech: project.tech,
      features: [
        "Personalized career path recommendations",
        "JWT-secured full-stack dashboard",
        "FastAPI ML service with Scikit-learn models",
        "MongoDB-backed profile and skill data",
      ],
      categories: ["AI/ML", "Full Stack", "Open Source"],
      githubUrl: "https://github.com/suvanwita/skill_Sync",
      accent: project.accent,
    };
  }

  if (project.title === "SheCare") {
    return {
      name: project.title,
      description: project.description,
      longDescription:
        "SheCare is a full-stack women's health platform for cycle tracking, health logging, reminders, appointments, medical reports, educational content, analytics, and admin operations. It combines a Next.js dashboard, an Express/MongoDB backend, Redis/BullMQ background jobs, Kafka event streaming, and FastAPI ML services for PCOS, cycle, and article intelligence.",
      tech: project.tech,
      features: project.features ?? [
        "Complete patient care workspace with cycle tracking & wellness logging",
        "FastAPI ML services predicting PCOS risk & cycle irregularities",
        "BullMQ queues powered by Redis for background reminders & notifications",
        "Kafka event streams connecting domain actions to Audit & Activity Timelines",
        "Comprehensive role-based admin workflows & analytics dashboards",
      ],
      categories: ["Full Stack", "AI/ML"],
      githubUrl: "https://github.com/suvanwita/shecare",
      accent: project.accent,
    };
  }

  if (project.title === "TrustCart") {
    return {
      name: project.title,
      description: project.description,
      longDescription:
        "TrustCart is a Streamlit-based NLP product review analyzer that detects suspicious review patterns, extracts product aspects, calculates trust scores, and generates buy-or-avoid recommendations.",
      tech: project.tech,
      features: project.features ?? [
        "Linguistic signals & IsolationForest spam detection",
        "Aspect mining into performance, battery, display, support, etc.",
        "Weighted scoring (sentiment, rating consistency, authenticity)",
        "Automated final report with pros/cons and verdict recommendations",
      ],
      categories: ["AI/ML", "Full Stack"],
      githubUrl: "https://github.com/Suvanwita/TrustCart",
      liveUrl: "https://trustcart.streamlit.app/",
      accent: project.accent,
    };
  }

  if (project.title === "EventPulse") {
    return {
      name: project.title,
      description: project.description,
      longDescription:
        "EventPulse is a campus event operations platform supporting capacity-safe registrations, QR-based entry, automated waitlists, venue scheduling, duplicate check-in prevention, and real-time crowd-flow tracking.",
      tech: project.tech,
      features: project.features ?? [
        "Capacity-safe registrations and automated waitlist queues",
        "Event-driven broker layer using Kafka and transactional integrity in PG",
        "Eliminated registration race conditions under high load using Redis distributed locking",
        "Optimized statistics lookups via Fenwick Tree metrics aggregation",
      ],
      categories: ["Full Stack", "Systems"],
      githubUrl: "https://github.com/suvanwita/eventpulse",
      accent: project.accent,
    };
  }

  if (project.title === "Speedora") {
    return {
      name: project.title,
      description: project.description,
      longDescription:
        "Speedora is a fast, elegant, and lightweight command-line tool written in Rust for measuring network performance (ping, download, and upload speeds) directly from the console. It utilizes reqwest connection pooling, Tokio async multi-threading, and Clap command parsing to deliver highly accurate results with zero overhead.",
      tech: project.tech,
      features: project.features ?? [
        "Accurate download & upload bandwidth measurement metrics",
        "Ping latency reporting with RTT calculations",
        "Asynchronous Tokio-based multi-threaded engine",
        "Clean terminal CLI layout featuring ASCII progress bars",
      ],
      categories: ["Systems", "Open Source"],
      githubUrl: "https://github.com/Suvanwita/Speedora",
      accent: project.accent,
    };
  }

  return {
    name: project.title,
    description: project.description,
    longDescription:
      "SwiftCache is a Redis-inspired in-memory datastore written in C++17, focused on command design, typed storage, TTL expiration, server metrics, and a threaded TCP server architecture.",
    tech: project.tech,
    features: project.features ?? [
      "Threaded TCP server",
      "Typed storage engine",
      "TTL expiration",
      "Server metrics",
    ],
    categories: ["Systems", "Open Source"],
    githubUrl: "https://github.com/Suvanwita/SwiftCache",
    accent: project.accent,
  };
});

function ProjectModal({
  project,
  onClose,
}: {
  project: FeaturedProject;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <motion.article
        className="glass-card neon-border max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6 sm:p-8"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Case Study</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <h3 id="project-modal-title" className="text-3xl font-black text-white">
                {project.name}
              </h3>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Live Site</span>
                </a>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Close case study"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-5 text-base leading-8 text-slate-300">{project.longDescription}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-pink-100">Highlights</h4>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-pink-100">Tech Stack</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-100">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {project.name === "SkillSync" ? <SkillSyncDemo /> : null}
        {project.name === "SheCare" ? <SheCareDemo /> : null}
        {project.name === "SwiftCache" ? <SwiftCacheTerminal /> : null}
        {project.name === "TrustCart" ? <TrustCartDemo /> : null}
        {project.name === "EventPulse" ? <EventPulseDemo /> : null}
        {project.name === "Speedora" ? <SpeedoraDemo /> : null}
      </motion.article>
    </motion.div>
  );
}

function MentoredProjectModal({
  project,
  onClose,
}: {
  project: any;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.article
        className="glass-card neon-border max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6 sm:p-8"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-pink-300">Mentored Case Study</p>
            <h3 className="mt-3 text-3xl font-black text-white">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Close case study"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-5 text-base leading-8 text-slate-300">{project.description}</p>

        <div className="mt-6 grid grid-cols-3 gap-4 border border-cyan-500/25 bg-cyan-950/15 rounded-xl p-4 text-center font-mono">
          <div>
            <span className="text-xl font-black text-cyan-300 block">{project.stats.issues}</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Issues Opened</span>
          </div>
          <div>
            <span className="text-xl font-black text-pink-300 block">{project.stats.prs}</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">PRs Merged</span>
          </div>
          <div>
            <span className="text-xl font-black text-violet-300 block">{project.stats.contributors}</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Contributors</span>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-pink-100">Key Features</h4>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              {project.features.map((feature: string) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-pink-100">Tech Stack</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-100">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {project.title === "CareerCraft" ? <CareerCraftDemo /> : null}
        {project.title === "FEM-CARE" ? <FemCareDemo /> : null}
      </motion.article>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [selectedMentoredProject, setSelectedMentoredProject] = useState<any>(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") {
      return featuredProjects;
    }

    return featuredProjects.filter((project) => project.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="section-padding container-custom relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {codeSnippets.map((snippet, index) => (
          <motion.span
            key={snippet}
            className="absolute hidden rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-xs text-cyan-100/45 backdrop-blur sm:block"
            style={{
              left: `${(index * 19) % 82}%`,
              top: `${12 + ((index * 17) % 70)}%`,
            }}
            animate={{ y: [0, -14, 0], opacity: [0.22, 0.55, 0.22] }}
            transition={{ duration: 4 + index * 0.45, repeat: Infinity, ease: "easeInOut" }}
          >
            {snippet}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Featured Projects"
          title="Systems, intelligence, and full-stack products with teeth."
          description="Focused builds that show Suvanwita's range across AI-backed product work, low-level systems, and microservice/event-driven architectures."
        />
      </motion.div>

      <div className="glass-card relative mt-8 flex flex-wrap gap-2 rounded-xl p-2">
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
                  layoutId="active-project-filter"
                  className="absolute inset-0 rounded-lg bg-cyan-300/12"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                />
              ) : null}
              <span className="relative">{filter}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-10 grid gap-6 lg:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <motion.article
            key={project.name}
            className="group glass-card relative min-h-[30rem] overflow-hidden rounded-2xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, rotateX: 3, rotateY: index % 2 === 0 ? -3 : 3 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
            <div className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br ${project.accent} opacity-20 blur-3xl transition group-hover:opacity-35`} />
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition group-hover:border-cyan-300/40 group-hover:shadow-neon" />

            <div className="relative flex h-full flex-col">
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <span key={category} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                    {category}
                  </span>
                ))}
              </div>

              <h3 className="mt-6 text-4xl font-black text-white">{project.name}</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-100">
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="mt-7 grid gap-3 text-sm leading-6 text-slate-300">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-black text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
                >
                  <FaGithub className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 min-h-11 items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/20 px-4 py-2.5 text-xs font-black text-emerald-400 transition hover:border-emerald-400/60 hover:bg-emerald-500/10"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Live Site
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex flex-1 min-h-11 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-4 py-2.5 text-xs font-black text-white shadow-neon transition hover:brightness-110"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Case Study
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Mentor, OpenCode 2025 Projects Section */}
      <div className="mt-24 border-t border-cyan-950/60 pt-16 relative">
        <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 opacity-10 blur-3xl animate-pulse" />
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-pink-400">Geekhaven FOSS Wing</p>
        <h3 className="mt-2 text-4xl font-black text-white">Mentor, OpenCode 2025</h3>
        <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
          Projects designed, maintained, and mentored during IIITA&apos;s annual month-long open source mentorship program. Guided 100+ contributors across core codebases.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {mentoredProjects.map((project) => (
            <article
              key={project.title}
              className="group glass-card relative overflow-hidden rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition group-hover:border-pink-500/20 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.1)]" />

              <div>
                {/* Mentorship stats header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-950/60 pb-3.5 mb-5 text-[10px] font-mono">
                  <span className="rounded bg-pink-950/20 border border-pink-500/20 px-2 py-0.5 text-pink-300 font-bold uppercase tracking-wider">
                    Mentor, OpenCode 2025
                  </span>
                  <span className="text-slate-500 uppercase tracking-widest font-bold">
                    {project.stats.contributors} Contributors
                  </span>
                </div>

                <h4 className="text-2xl font-black text-white">{project.title}</h4>
                <p className="text-xs text-pink-300 font-medium mt-1">{project.subtitle}</p>
                <p className="mt-3.5 text-sm leading-6 text-slate-400">{project.description}</p>

                {/* Quick contributions telemetry */}
                <div className="mt-4 flex gap-4 text-[10px] font-mono text-slate-400">
                  <span>Issues: <b className="text-cyan-300">{project.stats.issues}</b></span>
                  <span>PRs: <b className="text-pink-300">{project.stats.prs}</b></span>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tech.map((t: string) => (
                    <span key={t} className="rounded bg-slate-900/60 border border-white/5 px-2.5 py-0.5 text-[10px] font-bold text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-950/35 flex gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-1/3 items-center justify-center gap-2 rounded border border-white/10 bg-white/5 text-[10px] font-black uppercase text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
                  >
                    <FaGithub className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedMentoredProject(project)}
                  className="flex-1 flex justify-center items-center gap-2 rounded bg-pink-950/30 hover:bg-pink-500/10 text-pink-300 py-2.5 text-xs font-black uppercase tracking-wider transition duration-300 border border-pink-500/20"
                >
                  <span>Case Study & Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        ) : null}
        {selectedMentoredProject ? (
          <MentoredProjectModal project={selectedMentoredProject} onClose={() => setSelectedMentoredProject(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
