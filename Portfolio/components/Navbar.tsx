"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  id: string;
};

const navItems: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Open Source", id: "open-source" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

const socialLinks = [
  { label: "GitHub profile", href: "https://github.com/Suvanwita", icon: FaGithub },
  { label: "LinkedIn profile", href: "https://www.linkedin.com/in/suvanwita-d-1ba7a9325/", icon: FaLinkedin },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 12);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.08, 0.18, 0.32, 0.48],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 px-4 py-4">
      <nav
        className={cn(
          "glass-card mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-3 py-2 transition duration-300",
          isScrolled && "neon-border bg-slate-950/80 shadow-neon backdrop-blur-2xl",
        )}
        aria-label="Primary navigation"
      >
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="shrink-0 rounded-full px-3 py-2 text-sm font-black text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Suvanwita.dev
        </button>

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="flex items-center rounded-full border border-white/10 bg-black/20 p-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-xs font-bold text-slate-300 transition hover:text-white",
                    isActive && "text-white",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300/22 via-blue-500/22 to-pink-400/22 shadow-[0_0_22px_rgba(34,211,238,0.18)]"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white"
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
          <a
            href="/resume.pdf"
            aria-label="Download resume"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-neon)] px-4 py-2 text-xs font-black text-white shadow-neon transition hover:brightness-110"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="glass-card neon-border mx-auto mt-3 max-w-7xl overflow-hidden rounded-2xl p-3 lg:hidden"
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="grid gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "rounded-lg px-3 py-3 text-left text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white",
                      isActive && "bg-cyan-300/10 text-cyan-100",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200"
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
              <a
                href="/resume.pdf"
                aria-label="Download resume"
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-4 py-2 text-xs font-black text-white"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Resume
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
