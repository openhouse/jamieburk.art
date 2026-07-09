import type { Metadata } from "next";
import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resume - Jamie Burkart",
  description:
    "Resume page for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.",
  path: "/resume"
});

const selectedImpact = [
  "Led web, e-commerce, marketing, analytics, and operations improvements for Harry J. Epstein Company, contributing to 2x revenue growth while helping an 80+ year-old legacy industrial business adapt to e-commerce.",
  "Built CallNYC.org after the New York City Council's first civic-data hackathon, translating constituent-services open data into resident-facing find help / next steps guidance.",
  "Built and stewarded 30+ pages of shared campaign-memory and coordination infrastructure for a 2026 Commercial Rent Stabilization collaboration.",
  "Created a legislative source map and provenance redline tracing Commercial Rent Stabilization bill language across city and state sources.",
  "Co-built WOWList.org with Richard Caceres, a Python / Django + Ember.js community-calendar platform adopted by DIY arts and music organizers across roughly 35 city ecosystems.",
  "Created Sunday Dinner / 196 Artists Residency as a repeatable trust-building and participation structure, documenting 300+ gatherings and supporting 20+ resident artists."
] as const;

const technicalOperationsFit = [
  "delivery coordination across concurrent projects",
  "risk surfacing and stakeholder updates",
  "planning rhythms, decision logs, and action trackers",
  "handbooks, runbooks, onboarding guides, and adoption materials",
  "cross-functional coordination across technical and nontechnical teams",
  "public-facing launch support and durable handoffs"
] as const;

export default function ResumePage() {
  return (
    <div className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[0.68fr_0.32fr]">
        <div className="jb-reading">
          <h1 className="text-5xl font-bold text-jb-ink">Resume</h1>
          <p className="mt-4 text-2xl font-semibold text-jb-green">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <p className="mt-6 text-xl leading-8 text-jb-ink/76">
            Public resume for Technical Project Manager, Product Operations,
            Implementation, and Technical Operations roles.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JBButton href={site.resumePath} download>
              Download resume PDF
            </JBButton>
            <JBButton href="/contact" variant="secondary">
              Contact Jamie
            </JBButton>
          </div>
          <p className="mt-4 text-sm text-jb-ink/62">
            Current public resume PDF with phone number, email, LinkedIn, and
            GitHub included for employment review.
          </p>
        </div>
        <aside className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
          <h2 className="text-2xl font-semibold text-jb-ink">Selected impact</h2>
          <ul className="mt-5 space-y-4 text-jb-ink/76">
            {selectedImpact.map((impact) => (
              <li className="flex gap-3" key={impact}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{impact}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-paper p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">
          Technical operations fit
        </h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {technicalOperationsFit.map((capability) => (
            <li className="flex gap-3 text-jb-ink/76" key={capability}>
              <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
