"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaDocker, FaPython, FaReact } from "react-icons/fa";
import { SiCplusplus, SiNextdotjs, SiRedis } from "react-icons/si";

const bootLines = [
  "Initializing Suvanwita.dev...",
  "Loading projects...",
  "Connecting GitHub...",
  "Rendering portfolio...",
  "Launching developer dashboard...",
];

const techIcons = [
  { label: "React", icon: FaReact, className: "text-cyan-200" },
  { label: "Next.js", icon: SiNextdotjs, className: "text-white" },
  { label: "Python", icon: FaPython, className: "text-blue-200" },
  { label: "C++", icon: SiCplusplus, className: "text-violet-200" },
  { label: "Docker", icon: FaDocker, className: "text-sky-200" },
  { label: "Redis", icon: SiRedis, className: "text-rose-200" },
];

export function LoaderIntro() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const startTimeout = window.setTimeout(() => {
        setVisibleLines(bootLines.length);
        setProgress(100);
      }, 0);
      const finishTimeout = window.setTimeout(() => setIsVisible(false), 700);

      return () => {
        window.clearTimeout(startTimeout);
        window.clearTimeout(finishTimeout);
      };
    }

    const lineInterval = window.setInterval(() => {
      setVisibleLines((current) => Math.min(current + 1, bootLines.length));
    }, 520);

    const progressInterval = window.setInterval(() => {
      setProgress((current) => Math.min(current + 2, 100));
    }, 72);

    const finishTimeout = window.setTimeout(() => {
      setVisibleLines(bootLines.length);
      setProgress(100);
      setIsVisible(false);
    }, 4300);

    return () => {
      window.clearInterval(lineInterval);
      window.clearInterval(progressInterval);
      window.clearTimeout(finishTimeout);
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[#02040a] px-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.75, ease: "easeInOut" }}
          role="status"
          aria-live="polite"
          aria-label="Portfolio loading"
        >
          <div className="pointer-events-none absolute inset-0 animated-grid-bg opacity-35" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_78%_26%,rgba(236,72,153,0.16),transparent_26%),radial-gradient(circle_at_50%_88%,rgba(139,92,246,0.16),transparent_30%)]" />

          <motion.div
            className="glass-card neon-border relative w-full max-w-3xl rounded-xl p-5 shadow-neon sm:p-7"
            initial={prefersReducedMotion ? false : { y: 18, scale: 0.98 }}
            animate={prefersReducedMotion ? undefined : { y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">
                  Terminal Boot
                </p>
                <h1 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  Suvanwita.dev
                </h1>
              </div>
              <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                {progress}%
              </span>
            </div>

            <div className="min-h-48 rounded-lg border border-white/10 bg-black/35 p-4 font-mono text-sm leading-7 text-cyan-100 sm:text-base">
              {bootLines.slice(0, visibleLines).map((line) => (
                <motion.p
                  key={line}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="text-pink-200">&gt;</span> {line}
                </motion.p>
              ))}
              <span className="inline-flex items-center">
                <span className="text-pink-200">&gt;</span>
                <motion.span
                  className="ml-2 h-5 w-2 bg-cyan-200"
                  animate={prefersReducedMotion ? undefined : { opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              </span>
            </div>

            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                <span>Boot progress</span>
                <span>{progress}/100</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[image:var(--gradient-neon)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "linear" }}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {techIcons.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/10"
                  title={item.label}
                  aria-label={item.label}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { rotate: 360, y: [0, -4, 0] }
                  }
                  transition={{
                    rotate: { duration: 5 + index * 0.4, repeat: Infinity, ease: "linear" },
                    y: { duration: 1.8, repeat: Infinity, delay: index * 0.12 },
                  }}
                >
                  <item.icon className={`h-5 w-5 ${item.className}`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
