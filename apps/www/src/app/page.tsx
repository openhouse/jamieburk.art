import Link from "next/link";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { WorkCard } from "@/components/WorkCard";
import { featuredWork } from "@/data/work";

const transformations = [
  ["Scattered stakeholder context", "shared decision records"],
  ["Fragmented public-data context", "civic guidance and source maps"],
  ["Legacy operations", "maintainable e-commerce workflows"],
  ["Recurring community gatherings", "repeatable participation infrastructure"]
];

export default function HomePage() {
  return (
    <>
      <Hero />
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
              These projects show a recurring pattern: emerging work becoming
              usable systems, public-facing tools, documentation, decision
              trails, and durable handoffs.
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
              Operating backbone
            </p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink">
              What is emerging becomes usable
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              Across civic, cultural, small-business, and public-facing
              technical environments, I build the practices that help teams stay
              oriented: planning rhythms, decision logs, action trackers, risk
              notes, onboarding materials, stakeholder updates, public guidance,
              runbooks, and handoff documentation.
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
            Surface to Structure to Build to Document to Transfer
          </h2>
        </div>
        <div className="space-y-7">
          <p className="text-xl leading-9 text-jb-ink/78">
            I usually enter when important work is emerging faster than its
            decisions, ownership, documentation, and handoffs can hold. I listen
            across stakeholders, map what is known and open, create the
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
