import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <SectionShell id="projects">
      <Reveal>
        <SectionHeading
          eyebrow="Selected Work"
          title="Project concepts with production-ready structure."
          description="A compact showcase area ready for real case studies, live links, repository URLs, and richer media."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.1}>
            <article className="group h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] backdrop-blur-md">
              <div className={`h-2 bg-gradient-to-r ${project.accent}`} />
              <div className="p-6">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-black text-white">{project.title}</h3>
                  <ExternalLink className="h-5 w-5 shrink-0 text-cyan-200 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <p className="text-sm leading-6 text-slate-300">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
