import Link from "next/link";
import { navigation } from "@/data/navigation";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-chrome border-t border-base-300 bg-base-200">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-lg font-black">{site.name}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/70">
            Jamie creates operating structure for complex public-facing teams, with public-safe proof,
            durable documentation, and careful handoff.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-2 md:justify-end">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="btn btn-ghost min-h-10 rounded px-3 text-sm font-bold" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="btn btn-ghost min-h-10 rounded px-3 text-sm font-bold" href="/colophon">
                Colophon
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
