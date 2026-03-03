import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 disabled:pointer-events-none disabled:opacity-60",
        variant === "primary" &&
          "bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 text-white shadow-[0_0_28px_rgba(34,211,238,0.28)] hover:brightness-110",
        variant === "ghost" &&
          "border border-white/15 bg-white/5 text-white hover:border-cyan-300/60 hover:bg-cyan-300/10",
        className,
      )}
      {...props}
    />
  );
}
