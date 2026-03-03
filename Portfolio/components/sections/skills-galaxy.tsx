import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { portfolio } from "@/data/portfolio";

export function SkillsGalaxy() {
  return (
    <SectionShell id="skills">
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="A full-stack skill galaxy orbiting AI and systems work."
          description="Grouped by practical working areas, from languages and UI craft to infrastructure and ML tooling."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {portfolio.skills.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.08}>
            <article className="glass-card h-full rounded-lg p-5">
              <h3 className="text-lg font-black text-white">{group.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
