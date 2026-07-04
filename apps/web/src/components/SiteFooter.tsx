import Link from "next/link";
import type { Route } from "next";
import { footerNavigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[color:var(--color-primary-deep)] text-[color:var(--color-bg)]">
      <div className="page-shell grid gap-8 py-12 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-lg font-bold">{site.name}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/78">
            Technical Project Manager focused on product operations, implementation, documentation, civic technology, and public-facing systems.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-3">
          {footerNavigation.map((item) =>
            item.href ? (
              item.href.startsWith("http") ? (
                <a className="text-sm font-semibold underline" href={item.href} key={item.label}>
                  {item.label}
                </a>
              ) : (
                <Link className="text-sm font-semibold underline" href={item.href as Route} key={item.label}>
                  {item.label}
                </Link>
              )
            ) : (
              <span className="text-sm text-white/60" key={item.label}>
                {item.label} pending
              </span>
            )
          )}
        </nav>
      </div>
    </footer>
  );
}
