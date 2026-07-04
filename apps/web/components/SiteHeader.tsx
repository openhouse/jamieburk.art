import Link from "next/link";

import { site } from "@/lib/site";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/work/technical-operations", label: "Technical Operations" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-base-300 bg-base-100/90 backdrop-blur">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-base-200 focus:px-4 focus:py-2 focus:text-primary"
        href="#main"
      >
        Skip to content
      </a>
      <div className="container flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <Link className="no-underline" href="/">
          <span className="block text-base font-black text-base-content">
            {site.name}
          </span>
          <span className="block text-sm font-semibold text-muted">
            {site.role}
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-base-content no-underline hover:text-primary"
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
