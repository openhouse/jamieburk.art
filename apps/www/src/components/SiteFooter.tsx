import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-jb-ink/12 bg-jb-neutral text-white">
      <div className="jb-frame grid gap-8 py-12 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-2xl font-semibold">{site.name}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68">
            Technical Project Manager - Product Operations & Implementation.
            Operating structure for complex public-facing teams.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-4 text-sm font-medium text-white/78">
            <li>
              <Link className="hover:text-white" href="/work">
                Work
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/work/technical-operations">
                Technical Operations
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/resume">
                Resume
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/colophon">
                Colophon
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
