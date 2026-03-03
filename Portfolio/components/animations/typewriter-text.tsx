"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterTextProps = {
  text?: string;
  texts?: string[];
  className?: string;
  speed?: number;
  pauseMs?: number;
};

export function TypewriterText({
  text,
  texts,
  className,
  speed = 55,
  pauseMs = 1400,
}: TypewriterTextProps) {
  const phrases = useMemo(() => (texts?.length ? texts : text ? [text] : [""]), [text, texts]);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const activePhrase = phrases[activePhraseIndex] ?? "";

  useEffect(() => {
    const isComplete = visibleCharacters === activePhrase.length;
    const isEmpty = visibleCharacters === 0;
    const delay = isComplete && !isDeleting ? pauseMs : isDeleting ? speed / 2 : speed;

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setActivePhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      setVisibleCharacters((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [activePhrase.length, isDeleting, pauseMs, phrases.length, speed, visibleCharacters]);

  return (
    <span className={cn("inline-flex items-baseline", className)} aria-label={phrases.join(", ")}>
      <span aria-hidden="true">{activePhrase.slice(0, visibleCharacters)}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.9em] w-[0.08em] animate-pulse bg-cyan-200 align-[-0.08em]"
      />
    </span>
  );
}
