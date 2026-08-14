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
    <header className="sticky top-0 z-40 border-b border-jb-ink/15 bg-white">
      <a className="skip-link btn btn-primary" href="#main">
        Skip to content
      </a>
      <div className="jb-frame flex min-h-18 items-center justify-between gap-5 py-3">
        <Link className="font-display text-xl text-jb-ink hover:text-jb-blue" href="/">
          <span className="sm:hidden">JB</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center justify-end gap-5 text-sm font-semibold">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-11 items-center border-b-2 border-transparent text-jb-ink/78 hover:border-jb-blue hover:text-jb-blue"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <details className="group relative md:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center border border-jb-ink/25 px-4 text-sm font-semibold text-jb-ink">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close menu</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-[calc(100%+0.75rem)] w-64 border border-jb-ink/20 bg-white p-2 shadow-lg"
          >
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="flex min-h-11 items-center border-b border-jb-ink/10 px-3 text-sm font-semibold text-jb-ink hover:bg-jb-warm hover:text-jb-blue"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
