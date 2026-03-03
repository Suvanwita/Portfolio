import { Sparkles } from "lucide-react";

export function LoaderIntro() {
  return (
    <div
      id="intro"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 py-4"
      aria-hidden="true"
    >
      <div className="glass-card flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
        <Sparkles className="h-4 w-4" />
        Loading portfolio
      </div>
    </div>
  );
}
