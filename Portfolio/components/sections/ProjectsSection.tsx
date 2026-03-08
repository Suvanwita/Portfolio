"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";
import { SkillSyncDemo } from "@/components/sections/projects/SkillSyncDemo";
import { SwiftCacheTerminal } from "@/components/sections/projects/SwiftCacheTerminal";

type ProjectCategory = "AI/ML" | "Full Stack" | "Systems" | "Open Source";

type FeaturedProject = {
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  categories: ProjectCategory[];
  githubUrl: string;
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
      githubUrl: "https://github.com",
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
    githubUrl: "https://github.com",
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
            <h3 id="project-modal-title" className="mt-3 text-3xl font-black text-white">
              {project.name}
            </h3>
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
        {project.name === "SwiftCache" ? <SwiftCacheTerminal /> : null}
      </motion.article>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

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
          description="Two focused builds that show Suvanwita's range across AI-backed product work and low-level systems engineering."
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

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-black text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
                >
                  <FaGithub className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-5 py-2.5 text-sm font-black text-white shadow-neon transition hover:brightness-110"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Case Study
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
