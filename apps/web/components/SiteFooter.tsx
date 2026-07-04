import Link from "next/link";

import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="rule-top bg-base-200/75">
      <div className="container grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <p className="font-black">{site.name}</p>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Technical project management, product operations, implementation,
            documentation, civic technology, and source-backed team memory.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-4 text-sm font-bold md:justify-end">
            <li>
              <a href={`mailto:${site.email}`}>Email</a>
            </li>
            <li>
              <a href={site.githubUrl} rel="noreferrer" target="_blank">
                GitHub
              </a>
            </li>
            {site.linkedinUrl ? (
              <li>
                <a href={site.linkedinUrl} rel="noreferrer" target="_blank">
                  LinkedIn
                </a>
              </li>
            ) : null}
            <li>
              <Link href="/colophon">Colophon</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
