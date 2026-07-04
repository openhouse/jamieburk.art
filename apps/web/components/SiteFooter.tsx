import Link from "next/link";
import { siteMetadata } from "@/lib/metadata";
import { futureRoutes } from "@/lib/routes";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-base-100/86">
      <div className="main-field grid gap-8 py-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-semibold text-jamie-ink">Jamie Burkart</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-jamie-muted">
            Technical Project Manager - Product Operations & Implementation. Building operating
            structure for ambiguous public-facing technical work.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
              Contact
            </p>
            <a className="mt-2 block text-sm" href={`mailto:${siteMetadata.email}`}>
              {siteMetadata.email}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
              Later
            </p>
            <p className="mt-2 text-sm leading-6 text-jamie-muted">
              V2-ready routes are reserved for writing, patterns, field notes, artifacts, library,
              images, rooms, archive, now, colophon, and work-with-me.
            </p>
          </div>
        </div>
        <div className="md:col-span-2">
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-jamie-muted">
            {futureRoutes.map((route) => (
              <li key={route}>{route}</li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-jamie-muted">
            Public-safe portfolio scaffold. Private materials are intentionally omitted.
          </p>
          <Link className="mt-3 inline-block text-sm" href="/contact">
            Contact Jamie
          </Link>
        </div>
      </div>
    </footer>
  );
}
