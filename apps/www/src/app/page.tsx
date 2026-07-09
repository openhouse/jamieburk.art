import Link from "next/link";
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
    title: "Technical Operations & Implementation",
    href: "/work/technical-operations",
    description: "Role-fit proof for delivery, risk, documentation, onboarding, and handoffs."
  },
  {
    title: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein",
    description: "Legacy operations, e-commerce, analytics, content, and stakeholder translation."
  },
  {
    title: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc",
    description: "Civic documentation, campaign memory, decision records, and public boundaries."
  },
  {
    title: "CallNYC.org",
    href: "/work/callnyc",
    description: "Open-data translation into archived resident-facing guidance."
  },
  {
    title: "Résumé",
    href: "/resume",
    description: "Current résumé for Technical Project Manager and implementation roles."
  }
] as const;

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <section className="jb-frame py-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-jb-blue">Start here</p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink">
              Fastest paths through the portfolio
            </h2>
          </div>
          <p className="max-w-2xl leading-7 text-jb-ink/72">
            New to my work? These are the clearest routes for hiring managers,
            referrers, and field peers.
          </p>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-5">
          {startHereLinks.map((item) => (
            <Link
              className="rounded-lg border border-jb-ink/12 bg-jb-paper p-4 transition hover:border-jb-blue/45 hover:bg-jb-sky/12"
              href={item.href}
              key={item.href}
            >
              <span className="font-semibold text-jb-blue">{item.title}</span>
              <span className="mt-3 block text-sm leading-6 text-jb-ink/72">
                {item.description}
              </span>
            </Link>
          ))}
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
              These projects show a recurring pattern: loosely defined
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
            I usually enter when the work is important but not yet clear enough
            to carry: requirements, ownership, workflows, documentation, and
            handoffs need structure. I listen across stakeholders, map what is
            known and unknown, support launch or adoption, and leave behind
            materials that make the work easier to maintain.
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
