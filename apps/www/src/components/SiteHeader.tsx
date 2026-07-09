import Link from "next/link";
import { site } from "@/data/site";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/work/technical-operations", label: "Technical Operations" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-jb-ink/10 bg-jb-paper/92 backdrop-blur">
      <a className="skip-link btn btn-primary rounded-lg" href="#main">
        Skip to content
      </a>
      <div className="jb-frame flex min-h-18 items-center justify-between gap-4 py-3">
        <Link className="font-semibold text-jb-ink hover:text-jb-blue" href="/">
          {site.name}
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center justify-end gap-1 text-sm font-medium sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-lg px-3 py-2 text-jb-ink/78 hover:bg-jb-sky/18 hover:text-jb-blue"
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
