import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function GradientButton({
  className,
  variant = "primary",
  type = "button",
  ...props
}: GradientButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan disabled:pointer-events-none disabled:opacity-55",
        variant === "primary" &&
          "bg-[image:var(--gradient-neon)] text-white shadow-neon hover:brightness-110 active:scale-[0.99]",
        variant === "outline" &&
          "neon-border text-white hover:bg-white/10 active:scale-[0.99]",
        className,
      )}
      {...props}
    />
  );
}
