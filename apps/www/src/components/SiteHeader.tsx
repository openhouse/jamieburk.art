import Link from "next/link";
import { site } from "@/data/site";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/work/technical-operations", label: "Technical Operations" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-jb-ink/10 bg-jb-paper/92 backdrop-blur">
      <a className="skip-link btn btn-primary rounded-lg" href="#main">
        Skip to content
      </a>
      <div className="jb-frame flex min-h-18 flex-col items-start justify-between gap-3 py-3 sm:flex-row sm:items-center">
        <Link className="font-semibold text-jb-ink hover:text-jb-blue" href="/">
          {site.name}
        </Link>
        <nav aria-label="Primary navigation" className="w-full sm:w-auto">
          <ul className="flex flex-wrap items-center gap-1 text-xs sm:justify-end sm:gap-2 sm:text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="jb-label inline-flex rounded-lg px-3 py-2 text-jb-ink/78 hover:bg-jb-sky/18 hover:text-jb-blue"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
