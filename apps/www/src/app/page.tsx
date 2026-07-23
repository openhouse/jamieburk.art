import Link from "next/link";
import type { Route } from "next";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { WorkCard } from "@/components/WorkCard";
import { featuredWork } from "@/data/work";

const transformations = [
  ["Scattered stakeholder context", "Shared decision records"],
  ["Fragmented public data", "Civic guidance and source maps"],
  ["Legacy operations", "Maintainable e-commerce workflows"],
  ["Recurring community gatherings", "Repeatable participation infrastructure"]
];

const startHereLinks = [
  {
    href: "/work/technical-operations",
    label: "Technical Operations & Implementation",
    note: "The fastest role-fit proof surface for public-sector technical operations, product operations, implementation, and delivery coordination."
  },
  {
    href: "/work/harry-j-epstein",
    label: "Harry J. Epstein Company",
    note: "Legacy e-commerce, analytics, content, marketing, and operations modernization."
  },
  {
    href: "/work/fair-rent-nyc",
    label: "NYC Artist Coalition / FairRentNYC",
    note: "Campaign infrastructure, public interfaces, source maps, coalition memory, and civic implementation."
  },
  {
    href: "/resume",
    label: "Resume",
    note: "A concise PDF for applications, referrals, and hiring workflows."
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="jb-frame grid gap-10 py-14 lg:grid-cols-[0.3fr_0.7fr]">
        <div className="jb-reading">
          <p className="jb-section-index">Start here</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            A direct route through the work
          </h2>
          <p className="mt-4 leading-7 text-jb-ink/74">
            For hiring managers, referrers, civic-technology peers, and
            collaborators who need the clearest evidence first.
          </p>
        </div>
        <ol className="border-b border-jb-ink/20">
          {startHereLinks.map((item, index) => (
            <li className="border-t border-jb-ink/20" key={item.href}>
              <Link
                className="group grid gap-2 py-5 sm:grid-cols-[2.5rem_0.38fr_0.62fr_auto] sm:items-baseline"
                href={item.href as Route}
              >
                <span className="jb-meta-label text-xs text-jb-red">0{index + 1}</span>
                <span className="font-semibold text-jb-blue group-hover:text-jb-green">
                  {item.label}
                </span>
                <span className="text-sm leading-6 text-jb-ink/70">{item.note}</span>
                <span aria-hidden="true" className="text-xl text-jb-red">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <ProofStrip />

      <section className="border-y border-jb-ink/15 bg-jb-warm py-16">
        <div className="jb-frame grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="jb-section-index">Structure and material</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight text-jb-ink">
              Structure grows out of the work.
            </h2>
          </div>
          <div className="jb-reading">
            <p className="text-xl leading-8 text-jb-ink/78">
              I often enter while the form is still emerging. I listen for the
              relationships already present, then help them become requirements,
              interfaces, operating rhythms, documentation, and handoffs people
              can inhabit.
            </p>
            <p className="mt-5 leading-7 text-jb-ink/72">
              The goal is not to impose certainty. It is to reduce avoidable
              suffering during transition and give collaborators greater agency,
              connection, and continuity.
            </p>
          </div>
        </div>
      </section>

      <CapabilityGrid />

      <section className="jb-frame py-16">
        <div className="grid gap-6 lg:grid-cols-[0.32fr_0.68fr] lg:items-end">
          <div>
            <p className="jb-section-index">Selected systems</p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink">
              Proof across operating, civic, and community systems
            </h2>
          </div>
          <div className="flex items-end justify-between gap-5">
            <p className="max-w-2xl leading-7 text-jb-ink/74">
              Each project asks what was unclear, what I did, what became
              usable, how other people shaped the work, and what the evidence
              can honestly support.
            </p>
            <Link className="shrink-0 font-semibold text-jb-blue hover:text-jb-green" href="/work">
              All work →
            </Link>
          </div>
        </div>
        <div className="mt-8">
          {featuredWork.map((item) => (
            <WorkCard compact item={item} key={item.slug} />
          ))}
        </div>
      </section>

      <section className="border-y border-jb-ink/15 bg-jb-warm py-16">
        <div className="jb-frame grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="jb-reading">
            <p className="jb-section-index">Operating motif</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight text-jb-ink">
              What was unclear becomes usable.
            </h2>
            <p className="mt-5 leading-8 text-jb-ink/76">
              Clarify what is known, keep uncertainty visible, protect what
              should remain private, and leave material people can act on.
            </p>
          </div>
          <dl className="border-b border-jb-ink/20">
            {transformations.map(([from, to], index) => (
              <div
                className="grid gap-2 border-t border-jb-ink/20 py-5 sm:grid-cols-[2.5rem_1fr_auto_1fr] sm:items-center"
                key={from}
              >
                <dt className="contents">
                  <span className="jb-meta-label text-xs text-jb-red">0{index + 1}</span>
                  <span className="font-semibold text-jb-ink">{from}</span>
                </dt>
                <dd className="text-jb-red" aria-hidden="true">→</dd>
                <dd className="font-semibold text-jb-green">{to}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="jb-frame grid gap-10 py-16 lg:grid-cols-[0.38fr_0.62fr]">
        <div>
          <p className="jb-section-index">How I work</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            Clarify / Structure / Build / Document / Transfer
          </h2>
        </div>
        <div className="space-y-7">
          <p className="text-xl leading-9 text-jb-ink/78">
            I listen across stakeholders, map what is known and unknown, create
            the workflows or documentation the team needs, support launch and
            adoption, and leave behind materials that make the work easier to
            maintain.
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
