"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileText, Mail, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TechOrbit } from "@/components/animations/TechOrbit";
import { TypewriterText } from "@/components/animations/typewriter-text";
import { profile } from "@/data/portfolio";

const roles = [
  "Full Stack Developer",
  "AI/ML Explorer",
  "Open Source Contributor",
  "Systems Enthusiast",
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x, y });
  };

  const resetParallax = () => setParallax({ x: 0, y: 0 });

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetParallax}
      className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-5 py-20 sm:px-8 lg:px-10"
    >
      <div className="animated-grid-bg pointer-events-none absolute inset-0 opacity-45" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[6%] top-[18%] h-56 w-72 rounded-[42%_58%_63%_37%] bg-cyan-400/20 blur-3xl"
        animate={shouldReduceMotion ? undefined : { x: [0, 24, -10, 0], y: [0, -18, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[12%] right-[4%] h-64 w-80 rounded-[58%_42%_36%_64%] bg-fuchsia-500/20 blur-3xl"
        animate={shouldReduceMotion ? undefined : { x: [0, -20, 14, 0], y: [0, 16, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.14)] sm:text-sm">
            <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Available for internships, open source, and frontend/full-stack opportunities</span>
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I&apos;m Suvanwita Das
          </h1>

          <div className="mt-4 min-h-12 text-3xl font-black sm:min-h-16 sm:text-5xl lg:text-6xl">
            <TypewriterText texts={roles} className="gradient-text" speed={58} pauseMs={1200} />
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            I build fast interfaces, intelligent systems, and developer-focused products.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-5 py-2.5 text-sm font-black text-white shadow-neon transition hover:brightness-110"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              View Projects
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-black text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              View Resume
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-black text-white transition hover:border-pink-300/60 hover:bg-pink-300/10"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact Me
            </a>
          </div>

          <div className="mt-7 flex items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-white"
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[28rem]"
          style={{
            transform: shouldReduceMotion
              ? undefined
              : `translate3d(${parallax.x * -18}px, ${parallax.y * -18}px, 0)`,
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <TechOrbit>
            <motion.div
              className="glass-card neon-border mx-auto flex h-full max-h-[13rem] w-full max-w-[13rem] flex-col items-center justify-center rounded-[1.25rem] p-3 text-center sm:max-h-[14.5rem] sm:max-w-[14.5rem] sm:p-4"
              style={{
                transform: shouldReduceMotion
                  ? undefined
                  : `translate3d(${parallax.x * 24}px, ${parallax.y * 24}px, 0)`,
              }}
            >
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[image:var(--gradient-neon)] text-lg font-black text-white shadow-neon sm:h-16 sm:w-16 sm:text-xl">
                  SD
                </div>
                <h2 className="mt-3 text-base font-black text-white sm:text-lg">Suvanwita Das</h2>
                <p className="mt-1.5 text-xs leading-5 text-slate-300 sm:text-sm">{profile.location}</p>
              </div>
            </motion.div>
          </TechOrbit>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-cyan-100 sm:inline-flex"
      >
        <motion.span
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-11 w-7 items-start justify-center rounded-full border border-cyan-200/40 p-1"
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </a>
    </section>
  );
}
