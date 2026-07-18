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
      <div className="jb-frame flex min-h-16 items-center justify-between gap-4 py-3 sm:min-h-18">
        <Link className="whitespace-nowrap font-semibold text-jb-ink hover:text-jb-blue" href="/">
          {site.name}
        </Link>
        <nav aria-label="Primary navigation" className="hidden sm:block">
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
        <details className="group relative sm:hidden">
          <summary
            aria-label="Open navigation"
            className="flex size-11 cursor-pointer list-none items-center justify-center rounded-lg text-jb-ink hover:bg-jb-sky/18 hover:text-jb-blue focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-jb-ochre [&::-webkit-details-marker]:hidden"
          >
            <span aria-hidden="true" className="grid w-5 gap-1.5">
              <span className="h-0.5 bg-current" />
              <span className="h-0.5 bg-current" />
              <span className="h-0.5 bg-current" />
            </span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 mt-2 w-64 rounded-lg border border-jb-ink/12 bg-jb-paper p-2 shadow-lg"
          >
            <ul className="text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="block rounded-lg px-3 py-3 text-jb-ink/78 hover:bg-jb-sky/18 hover:text-jb-blue"
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
