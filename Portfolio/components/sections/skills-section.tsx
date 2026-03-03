import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { skills } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <SectionShell id="skills">
      <Reveal>
        <SectionHeading
          eyebrow="Stack"
          title="Tools for fast, expressive product interfaces."
          description="A focused frontend stack for building responsive, maintainable, and animated web applications."
        />
      </Reveal>
      <div className="mt-8 flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <Reveal key={skill} delay={index * 0.03}>
            <span className="inline-flex rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-slate-100 shadow-[0_0_20px_rgba(59,130,246,0.08)] backdrop-blur transition hover:border-fuchsia-300/50 hover:text-fuchsia-100">
              {skill}
            </span>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
