import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionShell({ children, className, id }: SectionShellProps) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10", className)}>
      {children}
    </section>
  );
}
