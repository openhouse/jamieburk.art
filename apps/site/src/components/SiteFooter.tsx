import Link from "next/link";
import { site } from "@/lib/site";

const footerLinks = [
  ["Work", "/work"],
  ["Technical Operations", "/work/technical-operations"],
  ["Source-Backed Team Memory", "/work/source-backed-team-memory"],
  ["Colophon", "/colophon"],
  ["LinkedIn", site.linkedin],
  ["GitHub", site.github],
  ["Email", `mailto:${site.email}`],
  ["Resume", "/resume"]
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--color-line)]">
      <div className="site-shell grid gap-6 py-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="mt-2 max-w-lg text-sm text-[var(--color-muted)]">{site.shortThesis}</p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => (
            <Link href={href} key={`${label}-${href}`}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
