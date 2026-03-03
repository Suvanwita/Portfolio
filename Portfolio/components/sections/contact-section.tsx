import { Mail, Send } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { profile } from "@/data/portfolio";

export function ContactSection() {
  return (
    <SectionShell id="contact" className="pb-24">
      <Reveal>
        <div className="rounded-lg border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 via-violet-500/10 to-pink-400/10 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">Contact</p>
              <h2 className="text-3xl font-black text-white sm:text-4xl">Let&apos;s build something electric.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Available for frontend projects, portfolio collaborations, and UI engineering opportunities.
              </p>
            </div>
            <a href={`mailto:${profile.email}`}>
              <Button className="w-full sm:w-auto">
                <Mail className="h-4 w-4" />
                Start a Conversation
                <Send className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
