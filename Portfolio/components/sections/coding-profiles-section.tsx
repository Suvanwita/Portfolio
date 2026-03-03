import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { portfolio } from "@/data/portfolio";

export function CodingProfilesSection() {
  return (
    <SectionShell id="coding-profiles">
      <Reveal>
        <SectionHeading
          eyebrow="Profiles"
          title="Competitive programming and practice platforms."
        />
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {portfolio.codingProfiles.map((profile, index) => (
          <Reveal key={profile.platform} delay={index * 0.08}>
            <article className="glass-card flex items-center justify-between rounded-lg p-5">
              <h3 className="text-lg font-black text-white">{profile.platform}</h3>
              <ExternalLink className="h-5 w-5 text-pink-200" />
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
