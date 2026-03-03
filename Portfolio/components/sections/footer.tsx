import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-white/10 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 {profile.name}. All rights reserved.</p>
        <a href={`mailto:${profile.email}`} className="font-semibold text-cyan-100 hover:text-white">
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
