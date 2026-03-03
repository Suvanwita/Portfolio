"use client";

import { ArrowDown, Mail, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast";
import { OrbitField } from "@/components/animations/orbit-field";
import { Reveal } from "@/components/animations/reveal";
import { TypewriterText } from "@/components/animations/typewriter-text";
import { Button } from "@/components/ui/button";
import { profile, stats } from "@/data/portfolio";

export function HeroSection() {
  const handlePulse = () => {
    toast.success("Thanks for exploring Suvanwita's portfolio.");
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center px-5 py-24 sm:px-8 lg:px-10">
      <OrbitField />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.16)]">
              <Sparkles className="h-4 w-4" />
              Portfolio signal online
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              {profile.name}
              <TypewriterText
                texts={["Full Stack Developer", "AI/ML Explorer", "Open Source Contributor"]}
                className="text-gradient block min-h-[1.15em] pt-3"
              />
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {profile.summary} Built for speed, clarity, motion, and memorable visual energy.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={handlePulse}>
                <Sparkles className="h-4 w-4" />
                Activate Pulse
              </Button>
              <a
                href="#projects"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                View Work
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3">
              {[
                { label: "GitHub", icon: FaGithub, href: "https://github.com" },
                { label: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com" },
                { label: "Email", icon: Mail, href: `mailto:${profile.email}` },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:border-pink-300/60 hover:bg-pink-300/10 hover:text-white"
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-fuchsia-500 opacity-70 blur-3xl" />
            <div className="relative flex h-full items-center justify-center rounded-[2rem] border border-white/15 bg-slate-950/70 p-6 shadow-[0_0_70px_rgba(99,102,241,0.28)] backdrop-blur-xl">
              <div className="w-full rounded-2xl border border-cyan-300/20 bg-black/30 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Identity</p>
                    <p className="mt-1 text-xl font-black text-white">S.DAS</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-300 to-fuchsia-500 shadow-[0_0_28px_rgba(217,70,239,0.45)]" />
                </div>
                <div className="space-y-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <span className="text-sm text-slate-400">{stat.label}</span>
                      <span className="text-sm font-bold text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-300 via-blue-500 to-pink-400" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
