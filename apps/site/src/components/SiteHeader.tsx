import Link from "next/link";
import type { Route } from "next";
import { site } from "@/data/site";

const navItems: Array<{ href: Route; label: string }> = [
  { href: "/work", label: "Work" },
  { href: "/work/technical-operations", label: "Technical Operations" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-line)] bg-base-100/95 backdrop-blur">
      <div className="container-page flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
        <Link className="font-black leading-tight" href="/">
          <span className="block text-lg">Jamie Burkart</span>
          <span className="block text-xs font-semibold text-[color:var(--color-muted)]">{site.role}</span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="btn btn-ghost btn-sm rounded-md" href={item.href}>
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
