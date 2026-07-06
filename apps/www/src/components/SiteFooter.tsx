import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-jb-ink/12 bg-jb-warm/80">
      <div className="jb-frame grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-semibold text-jb-ink">{site.name}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-jb-ink/70">
            Technical Project Manager — Product Operations & Implementation.
            Public-safe, referral-ready proof site for selected professional work.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-3 text-sm font-medium">
            <li>
              <Link className="hover:text-jb-blue" href="/work">
                Work
              </Link>
            </li>
            <li>
              <Link className="hover:text-jb-blue" href="/resume">
                Resume
              </Link>
            </li>
            <li>
              <Link className="hover:text-jb-blue" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-jb-blue" href="/colophon">
                Colophon
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
