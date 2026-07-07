import Link from "next/link";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { WorkCard } from "@/components/WorkCard";
import { featuredWork } from "@/data/work";

const transformations = [
  ["Scattered stakeholder context", "shared decision records"],
  ["Fragmented public information", "civic guidance and source maps"],
  ["Legacy operations", "maintainable e-commerce workflows"],
  ["Recurring community gatherings", "repeatable participation infrastructure"]
];

const operatingBackbone = [
  {
    title: "Coordinate delivery",
    text: "Keep status visible, surface risks early, and move work from concept through launch."
  },
  {
    title: "Build operating processes",
    text: "Planning cycles, sprint rituals, decision frameworks, status reporting, and retrospectives."
  },
  {
    title: "Onboard and document",
    text: "Handbooks, runbooks, onboarding guides, and principles people actually use."
  },
  {
    title: "Report honestly",
    text: "Clear weekly updates, team-health notes, operational metrics, and visible what is and is not working."
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <CapabilityGrid />
      <section className="bg-jb-blue py-16 text-jb-paper">
        <div className="jb-frame">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <p className="font-display text-sm font-semibold uppercase text-jb-paper/72">
                Opportunity fit
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold">
                Operating backbone for public-facing technical teams
              </h2>
              <p className="mt-4 leading-8 text-jb-paper/78">
                I build the team practices that help delivery stay visible:
                planning rhythms, decision logs, action trackers, onboarding
                guides, stakeholder updates, risk notes, runbooks,
                retrospectives, and durable handoffs.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {operatingBackbone.map((item) => (
                <article
                  className="rounded-lg border border-jb-paper/20 bg-jb-paper/10 p-4"
                  key={item.title}
                >
                  <h3 className="font-display text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-jb-paper/76">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
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
              These projects show a recurring pattern: ambiguous situations
              becoming usable systems, public-facing tools, documentation,
              decision trails, and durable handoffs that other people can use.
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
            adoption, and leave behind materials that make the work easier for
            the next person to maintain.
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
