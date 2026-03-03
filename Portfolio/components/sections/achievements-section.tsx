import { Trophy } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { portfolio } from "@/data/portfolio";

export function AchievementsSection() {
  return (
    <SectionShell id="achievements">
      <Reveal>
        <SectionHeading
          eyebrow="Achievements"
          title="Signals from coding, academics, and competitive programs."
        />
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.achievements.map((achievement, index) => (
          <Reveal key={achievement.title} delay={index * 0.06}>
            <article className="glass-card flex h-full gap-4 rounded-lg p-5">
              <Trophy className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
              <div>
                <h3 className="text-base font-bold text-white">{achievement.title}</h3>
                {achievement.description ? (
                  <p className="mt-2 text-sm leading-6 text-slate-300">{achievement.description}</p>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
