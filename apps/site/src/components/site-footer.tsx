import Link from "next/link";
import { footerNavigation } from "@/data/navigation";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.618fr_1fr]">
        <div>
          <p className="font-bold">{site.name}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral">
            Technical project management, product operations, implementation,
            documentation, civic technology, and public-facing systems.
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-3 md:justify-end"
          aria-label="Footer"
        >
          {footerNavigation.map((item) => (
            <Link
              className="link-hover text-sm"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
