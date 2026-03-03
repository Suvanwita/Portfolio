import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { portfolio } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <SectionShell id="experience">
      <Reveal>
        <SectionHeading
          eyebrow="Experience"
          title="Applied engineering in research-grade platforms."
        />
      </Reveal>
      <div className="mt-10 grid gap-4">
        {portfolio.experience.map((item, index) => (
          <Reveal key={`${item.role}-${item.organization}`} delay={index * 0.08}>
            <div className="grid gap-4 rounded-lg border border-white/10 bg-slate-950/60 p-5 backdrop-blur md:grid-cols-[10rem_1fr]">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-pink-200">{item.period}</p>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {item.role}, {item.organization}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
