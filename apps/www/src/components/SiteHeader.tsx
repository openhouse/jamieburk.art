import Link from "next/link";
import { site } from "@/data/site";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/work/technical-operations", label: "Operations" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-jb-ink/18 bg-white/95 backdrop-blur">
      <a className="skip-link btn btn-primary rounded" href="#main">
        Skip to content
      </a>
      <div className="jb-frame flex min-h-18 flex-col justify-center gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link className="group flex items-baseline gap-3" href="/">
          <span className="text-lg font-bold text-jb-ink group-hover:text-jb-blue">
            {site.name}
          </span>
          <span className="jb-meta-label hidden text-[0.68rem] text-jb-red lg:inline">
            Operating structure / public work
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-4 overflow-x-auto text-sm font-semibold sm:justify-end sm:gap-5">
            {navItems.map((item) => (
              <li className="shrink-0" key={item.href}>
                <Link
                  className="border-b-2 border-transparent py-2 text-jb-ink/78 hover:border-jb-red hover:text-jb-blue"
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
