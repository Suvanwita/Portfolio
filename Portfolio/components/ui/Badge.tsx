import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "cyan" | "violet" | "pink" | "blue";
};

const toneStyles = {
  cyan: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  violet: "border-violet-300/30 bg-violet-300/10 text-violet-100",
  pink: "border-pink-300/30 bg-pink-300/10 text-pink-100",
  blue: "border-blue-300/30 bg-blue-300/10 text-blue-100",
};

export function Badge({ className, tone = "cyan", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-md border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]",
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}
