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
    note: "See how Jamie moves ambiguous work toward launch and leaves teams with workflows, decision records, onboarding, and handoffs they can keep using."
  },
  {
    href: "/work/harry-j-epstein",
    label: "Harry J. Epstein Company",
    note: "See how Jamie helped translate legacy product knowledge into customer-facing e-commerce and maintainable operating workflows."
  },
  {
    href: "/work/fair-rent-nyc",
    label: "FairRentNYC / Commercial Rent Stabilization",
    note: "See how Jamie helped coalition collaborators turn fragmented context into shared campaign memory, source maps, and public-safe coordination."
  },
  {
    href: "/work/callnyc",
    label: "CallNYC.org",
    note: "See how Jamie independently translated CouncilStat records into issue pathways and next-step guidance residents could navigate."
  },
  {
    href: "/resume",
    label: "Resume",
    note: "Review Jamie's role history, selected impact, and application-ready PDF."
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
              These projects show a recurring pattern: ambiguous, high-context
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
            I usually enter when the work is important but loosely defined. I
            listen across stakeholders, map what is known and unknown, create
            the workflows or documentation the team needs, support launch or
            adoption, and leave behind materials that make the work easier to
            maintain.
          </p>
          <p className="leading-8 text-jb-ink/72">
            The method grew from participatory art and social-software
            practice: design conditions people can enter, make feedback
            legible, and leave structures others can adapt together. The
            source-backed throughline is documented on the{" "}
            <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/about">
              About page
            </Link>
            .
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
