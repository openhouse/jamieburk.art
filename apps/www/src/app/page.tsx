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
    label: "Technical Operations & Implementation",
    note: "The fastest role-fit proof surface for OTI, product operations, implementation, and delivery coordination."
  },
  {
    href: "/work/harry-j-epstein",
    label: "Harry J. Epstein Company",
    note: "Legacy e-commerce, analytics, content, marketing, and operations modernization."
  },
  {
    href: "/work/fair-rent-nyc",
    label: "FairRentNYC / Commercial Rent Stabilization",
    note: "Campaign memory, source maps, public-data framing, and coalition operations."
  },
  {
    href: "/work/callnyc",
    label: "CallNYC.org",
    note: "Civic open data translated into resident-facing guidance."
  },
  {
    href: "/resume",
    label: "Resume",
    note: "PDF for applications and hiring workflows."
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="jb-frame py-12">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="jb-reading">
            <p className="text-sm font-semibold uppercase text-jb-blue">Start here</p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink">
              Quick path through the portfolio
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              New to my work? These pages give the clearest route through the
              site for hiring managers, referrers, civic-tech peers, and
              collaborators.
            </p>
          </div>
          <div className="grid gap-3">
            {startHereLinks.map((item) => (
              <Link
                className="rounded-lg border border-jb-ink/12 bg-jb-warm p-4 hover:border-jb-blue/40 hover:bg-jb-sky/14"
                href={item.href as Route}
                key={item.href}
              >
                <span className="font-semibold text-jb-blue">{item.label}</span>
                <span className="mt-1 block text-sm leading-6 text-jb-ink/72">
                  {item.note}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ProofStrip />
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
              These projects show a recurring pattern: emerging, high-context
              situations becoming usable systems, public-facing tools,
              documentation, decision trails, and durable handoffs.
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
              What is still forming becomes usable
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
            I usually enter when the work is important but loosely defined. I
            listen across stakeholders, map what is known and unknown, create
            the workflows or documentation the team needs, support launch or
            adoption, and leave behind materials that make the work easier to
            maintain.
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
