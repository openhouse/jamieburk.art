import Link from "next/link";
import type { Route } from "next";

const startHereLinks = [
  {
    href: "/work/technical-operations",
    label: "Technical Operations & Implementation"
  },
  {
    href: "/work/harry-j-epstein",
    label: "Harry J. Epstein Company"
  },
  {
    href: "/work/fairrentnyc-commercial-rent-stabilization",
    label: "FairRentNYC / Commercial Rent Stabilization"
  },
  {
    href: "/work/callnyc",
    label: "CallNYC.org"
  },
  {
    href: "/resume",
    label: "Resume"
  }
] as const;

export function StartHere() {
  return (
    <section className="bg-jb-paper py-12">
      <div className="jb-frame grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
        <div className="jb-reading">
          <p className="jb-condensed-label text-base font-semibold text-jb-blue">
            Start here
          </p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            New to my work?
          </h2>
          <p className="mt-4 leading-7 text-jb-ink/76">
            These pages give the quickest path through the portfolio.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {startHereLinks.map((item) => (
            <Link
              className="rounded-lg border border-jb-ink/15 bg-jb-warm/88 p-4 font-semibold text-jb-ink hover:border-jb-blue hover:text-jb-blue"
              href={item.href as Route}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
