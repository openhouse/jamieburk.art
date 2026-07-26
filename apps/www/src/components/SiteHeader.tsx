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
    <header className="sticky top-0 z-40 border-b border-jb-ink/12 bg-white">
      <a className="skip-link btn btn-primary rounded" href="#main">
        Skip to content
      </a>
      <div className="jb-frame flex min-h-16 items-center justify-between gap-2 py-2 sm:gap-5">
        <Link className="group min-w-fit text-jb-ink" href="/">
          <span className="block font-bold group-hover:text-jb-blue sm:hidden">
            Jamie B.
          </span>
          <span className="hidden font-bold group-hover:text-jb-blue sm:block">
            {site.name}
          </span>
          <span className="jb-label hidden text-[0.65rem] text-jb-ink/68 sm:block">
            Technical project management
          </span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="jb-primary-nav min-w-0 overflow-x-hidden"
        >
          <ul className="flex min-w-max items-center justify-end gap-0 text-sm font-semibold sm:gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="block rounded px-1.5 py-2 text-jb-ink/76 hover:bg-jb-sky/35 hover:text-jb-blue sm:px-3"
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
