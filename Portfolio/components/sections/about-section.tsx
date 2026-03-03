import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { strengths } from "@/data/portfolio";

export function AboutSection() {
  return (
    <SectionShell id="about">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="Clean engineering with a luminous interface instinct."
            description="Suvanwita brings structure and style together: typed React components, thoughtful layouts, crisp states, and interfaces that scale from phone screens to wide desktops."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {strengths.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="h-full rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-md transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.07]">
                <item.icon className="mb-5 h-7 w-7 text-cyan-200" />
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
