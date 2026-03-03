"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Open Source", href: "#open-source" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 px-4 py-4">
      <nav className="glass-card mx-auto flex max-w-7xl items-center justify-between rounded-xl px-4 py-3">
        <a href="#home" className="text-sm font-black uppercase tracking-[0.24em] text-white">
          S.Das
        </a>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
      <div
        className={cn(
          "glass-card mx-auto mt-2 grid max-w-7xl gap-1 rounded-xl p-2 md:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
