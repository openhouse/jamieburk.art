import Link from "next/link";
import { site } from "@/data/site";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-jb-ink/16 bg-jb-paper">
      <a className="skip-link btn btn-primary" href="#main">
        Skip to content
      </a>
      <div className="jb-frame flex min-h-16 items-center justify-between gap-2 py-2 sm:gap-4">
        <Link className="group flex shrink-0 items-baseline gap-3 whitespace-nowrap" href="/">
          <span className="text-sm font-semibold text-jb-ink group-hover:text-jb-blue sm:text-base">
            {site.name}
          </span>
          <span className="hidden text-xs font-medium text-jb-ink/70 md:inline">
            Operational production
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center justify-end text-xs font-medium sm:text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-11 items-center border-l border-jb-ink/10 px-1.5 text-jb-ink/76 hover:bg-jb-warm hover:text-jb-blue sm:px-3"
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
