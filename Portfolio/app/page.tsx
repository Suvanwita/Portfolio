import { LoaderIntro } from "@/components/animations/LoaderIntro";
import { Navbar } from "@/components/Navbar";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { AboutSection } from "@/components/sections/about-section";
import { CodingProfilesSection } from "@/components/sections/coding-profiles-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationTimeline } from "@/components/sections/education-timeline";
import { ExperienceSection } from "@/components/sections/experience-section";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpenSourceSection } from "@/components/sections/open-source-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsGalaxy } from "@/components/sections/skills-galaxy";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="animated-grid-bg absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(34,211,238,0.2),transparent_30%),radial-gradient(ellipse_at_84%_18%,rgba(236,72,153,0.18),transparent_28%),radial-gradient(ellipse_at_50%_82%,rgba(139,92,246,0.18),transparent_34%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12)_0_1px,transparent_1px),radial-gradient(circle_at_75%_48%,rgba(34,211,238,0.12)_0_1px,transparent_1px),radial-gradient(circle_at_45%_76%,rgba(236,72,153,0.1)_0_1px,transparent_1px)] bg-[length:72px_72px,96px_96px,128px_128px] opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,17,0.14),rgba(4,7,17,0.78))]" />
      </div>
      <div className="relative z-10">
        <LoaderIntro />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <EducationTimeline />
        <SkillsGalaxy />
        <ProjectsSection />
        <ExperienceSection />
        <OpenSourceSection />
        <AchievementsSection />
        <CodingProfilesSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
