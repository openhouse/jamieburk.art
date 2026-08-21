import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-jb-ink text-white">
      <div className="jb-frame grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-identity text-2xl">{site.name}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/68">
            Technical Project Manager - Product Operations & Implementation.
            Public-safe portfolio, civic notebook, and future living archive.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <li>
              <Link className="hover:text-jb-sky" href="/work">
                Work
              </Link>
            </li>
            <li>
              <Link className="hover:text-jb-sky" href="/work/technical-operations">
                Technical Operations
              </Link>
            </li>
            <li>
              <Link className="hover:text-jb-sky" href="/resume">
                Resume
              </Link>
            </li>
            <li>
              <Link className="hover:text-jb-sky" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-jb-sky" href="/colophon">
                Colophon
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
