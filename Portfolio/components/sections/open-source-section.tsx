import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { portfolio } from "@/data/portfolio";

export function OpenSourceSection() {
  return (
    <SectionShell id="open-source">
      <Reveal>
        <SectionHeading
          eyebrow="Open Source"
          title="Community work, mentorship, and campus engineering."
          description="Responsibilities across contributor programs, IIITA communities, and student-led product work."
        />
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {portfolio.responsibilities.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <article className="glass-card h-full rounded-lg p-5">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
