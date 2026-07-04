import Link from "next/link";

import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="border-b quiet-rule bg-base-100/90 backdrop-blur">
      <div className="main flex min-h-16 items-center justify-between gap-4 py-3">
        <Link className="leading-tight no-underline" href="/">
          <span className="block text-sm font-bold uppercase tracking-wide text-primary">{site.name}</span>
          <span className="block text-xs text-base-content/70">Product operations + implementation</span>
        </Link>
        <nav aria-label="Primary navigation" className="flex flex-wrap items-center justify-end gap-1">
          {navigation.map((item) => (
            <Link className="btn btn-ghost btn-sm rounded-lg" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
