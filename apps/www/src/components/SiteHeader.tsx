import Link from "next/link";
import { site } from "@/data/site";
import { ROBOTS_INDEXABLE } from "@/lib/site-url";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-jb-ink/10 bg-jb-paper/92 backdrop-blur">
      {!ROBOTS_INDEXABLE ? (
        <div className="border-b border-jb-paper/15 bg-jb-blue text-jb-paper">
          <div className="jb-frame py-1.5 text-xs font-semibold">
            Staging review - not indexed
          </div>
        </div>
      ) : null}
      <a className="skip-link btn btn-primary rounded-lg" href="#main">
        Skip to content
      </a>
      <div className="jb-frame flex min-h-18 items-center justify-between gap-4 py-3">
        <Link
          className="inline-flex min-h-11 items-center rounded-lg pr-2 font-semibold text-jb-ink hover:text-jb-blue"
          href="/"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center justify-start gap-x-1 gap-y-3 text-sm font-medium sm:justify-end sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-11 items-center rounded-lg px-3 text-jb-ink/78 hover:bg-jb-sky/18 hover:text-jb-blue"
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
