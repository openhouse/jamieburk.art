import Link from "next/link";
import { site } from "@/lib/site";

const navItems = [
  ["Work", "/work"],
  ["Technical Operations", "/work/technical-operations"],
  ["About", "/about"],
  ["Resume", "/resume"],
  ["Contact", "/contact"]
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-bg)_90%,white)]">
      <nav className="site-shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between" aria-label="Primary navigation">
        <Link className="text-xl font-semibold text-[var(--color-ink)] no-underline" href="/">
          {site.name}
        </Link>
        <div className="flex flex-wrap gap-1">
          {navItems.map(([label, href]) => (
            <Link className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--color-ink)] no-underline hover:bg-[var(--color-accent-soft)]" href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
