import Link from "next/link";
import type { Route } from "next";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { WorkCard } from "@/components/WorkCard";
import { featuredWork } from "@/data/work";

const transformations = [
  ["Scattered stakeholder context", "shared decision records"],
  ["Fragmented public data", "civic guidance and source maps"],
  ["Legacy operations", "maintainable e-commerce workflows"],
  ["Recurring community gatherings", "repeatable participation infrastructure"]
];

const startHereLinks = [
  {
    href: "/work/technical-operations",
    label: "Technical Operations proof page"
  },
  {
    href: "/resume",
    label: "Resume"
  },
  {
    href: "/work/harry-j-epstein",
    label: "Harry J. Epstein Company"
  },
  {
    href: "/work/fair-rent-nyc",
    label: "FairRentNYC / Commercial Rent Stabilization"
  },
  {
    href: "/lab/source-backed-team-memory",
    label: "Source-Backed Team Memory"
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <section className="border-b border-jb-ink/10 bg-jb-sky/15">
        <div className="jb-frame grid gap-5 py-8 md:grid-cols-[0.55fr_1.45fr] md:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-jb-blue">
              New to my work?
            </p>
            <h2 className="mt-2 text-2xl font-bold text-jb-ink">Start here</h2>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {startHereLinks.map((link, index) => (
              <li key={link.href}>
                <Link
                  className="block h-full rounded-lg border border-jb-ink/12 bg-jb-paper p-4 font-semibold text-jb-blue hover:border-jb-blue/40 hover:bg-jb-sky/20 hover:text-jb-green"
                  href={link.href as Route}
                >
                  <span className="block text-xs uppercase text-jb-ink/56">
                    0{index + 1}
                  </span>
                  <span className="mt-3 block leading-6">{link.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CapabilityGrid />
      <section className="jb-frame py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="jb-reading">
            <p className="text-sm font-semibold uppercase text-jb-blue">
              Selected systems
            </p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink">
              Proof across operating, civic, and community systems
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              These projects show a recurring pattern: situations with unclear
              requirements, ownership, documentation, or handoffs becoming usable
              systems, public-facing tools, decision records, and durable
              handoffs.
            </p>
          </div>
          <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/work">
            View all work
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {featuredWork.map((item) => (
            <WorkCard item={item} key={item.slug} />
          ))}
        </div>
      </section>
      <section className="bg-jb-warm/80 py-16">
        <div className="jb-frame grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="jb-reading">
            <p className="text-sm font-semibold uppercase text-jb-blue">
              Operating motif
            </p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink">
              What was unclear becomes usable
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              The projects differ, but the move is consistent: clarify what is
              known, protect what should stay private, and leave behind material
              people can act on.
            </p>
          </div>
          <dl className="grid gap-3">
            {transformations.map(([from, to]) => (
              <div
                className="grid gap-2 rounded-lg border border-jb-ink/12 bg-jb-paper p-4 sm:grid-cols-[1fr_auto_1fr]"
                key={from}
              >
                <dt className="font-semibold text-jb-ink">{from}</dt>
                <dd className="hidden text-jb-blue sm:block">to</dd>
                <dd className="font-semibold text-jb-green">{to}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="jb-frame grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-jb-blue">How I work</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            Clarify to Structure to Build to Document to Transfer
          </h2>
        </div>
        <div className="space-y-7">
          <p className="text-xl leading-9 text-jb-ink/78">
            I usually enter when the work is important but requirements,
            ownership, documentation, or handoffs are not yet clear. I listen
            across stakeholders, map what is known and unknown, create the
            workflows or documentation the team needs, support launch or
            adoption, and leave behind materials that make the work easier to
            maintain.
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
