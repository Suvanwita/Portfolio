import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { portfolio } from "@/data/portfolio";

export function EducationTimeline() {
  return (
    <SectionShell id="education">
      <Reveal>
        <SectionHeading
          eyebrow="Education"
          title="Academic foundations with consistent excellence."
          description="A strong technical base from IIIT Allahabad, supported by standout school-level performance."
        />
      </Reveal>
      <div className="mt-10 grid gap-4">
        {portfolio.education.map((item, index) => (
          <Reveal key={`${item.degree}-${item.institution}`} delay={index * 0.08}>
            <article className="glass-card neon-border rounded-lg p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.institution}</p>
                  {item.details ? <p className="mt-2 text-sm font-semibold text-cyan-100">{item.details}</p> : null}
                </div>
                <div className="md:text-right">
                  {item.period ? <p className="text-sm font-bold text-pink-100">{item.period}</p> : null}
                  <p className="mt-1 text-sm font-black text-white">{item.score}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
