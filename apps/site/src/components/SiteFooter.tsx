import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--color-line)] bg-neutral text-neutral-content">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-lg font-black">Jamie Burkart</p>
          <p className="mt-2 max-w-xl text-sm leading-6 opacity-85">
            A selected proof system for technical project management, product operations,
            implementation, documentation, civic technology, and public-facing tools.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-3 md:justify-end">
            <li>
              <Link className="link-hover link" href="/lab/source-backed-team-memory">
                Lab
              </Link>
            </li>
            <li>
              <Link className="link-hover link" href="/colophon">
                Colophon
              </Link>
            </li>
            <li>
              <a className="link-hover link" href={site.repoUrl}>
                GitHub
              </a>
            </li>
            <li>
              <a className="link-hover link" href={`mailto:${site.email}`}>
                Email
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
