import Link from "next/link";
import type { Route } from "next";
import { mainNavigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-line)]/60 bg-[color:var(--color-bg)]/92 backdrop-blur">
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[color:var(--color-highlight)] focus:px-3 focus:py-2" href="#main">
        Skip to content
      </a>
      <div className="page-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link className="group flex items-center gap-3 text-sm font-bold" href="/">
          <span className="grid size-9 place-items-center rounded-[0.382rem] bg-[color:var(--color-primary)] text-white">JB</span>
          <span className="hidden leading-tight sm:block">
            {site.name}
            <span className="block text-xs font-medium text-[color:var(--color-muted)]">Product Operations & Implementation</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {mainNavigation.map((item) => (
            <Link
              className="rounded-[0.382rem] px-3 py-2 text-sm font-semibold text-[color:var(--color-muted)] hover:bg-[color:var(--color-surface)] hover:text-[color:var(--color-primary)]"
              href={item.href as Route}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-primary min-h-10 rounded-[0.382rem] px-4 text-sm normal-case" href="/contact">
          Contact
        </Link>
      </div>
      <nav aria-label="Mobile navigation" className="page-shell flex gap-2 overflow-x-auto pb-3 md:hidden">
        {mainNavigation.map((item) => (
          <Link
            className="shrink-0 rounded-[0.382rem] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-3 py-2 text-sm font-semibold"
            href={item.href as Route}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
