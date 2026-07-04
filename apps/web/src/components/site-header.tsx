import Link from "next/link";
import { navigation } from "@/data/navigation";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-chrome border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="page-shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link className="max-w-fit text-lg font-black leading-tight no-underline" href="/">
          <span className="block">{site.name}</span>
          <span className="block text-xs font-bold uppercase tracking-[0.14em] text-primary">
            Product Ops & Implementation
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="btn btn-ghost min-h-10 rounded px-3 text-sm font-bold" href={item.href}>
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
