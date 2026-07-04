import Link from "next/link";
import { navRoutes } from "@/lib/routes";

export function SiteHeader() {
  return (
    <header className="border-b hairline bg-base-100/92 backdrop-blur">
      <div className="main-field flex min-h-16 items-center justify-between gap-4 py-3">
        <Link className="text-base font-semibold text-jamie-ink no-underline" href="/">
          Jamie Burkart
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-sm font-medium">
            {navRoutes.map((route) => (
              <li key={route.href}>
                <Link className="text-jamie-ink no-underline hover:underline" href={route.href}>
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
