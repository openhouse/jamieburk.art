import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const operatingPractice = [
  "Coordinate delivery across concurrent projects and keep work moving from concept through public launch.",
  "Track status, surface risks early, and name recurring blockers before they become patterns.",
  "Build planning cycles, team rituals, decision frameworks, status reporting, and retrospectives.",
  "Coordinate dependencies across product, engineering, security, legal, communications, contracts, and external stakeholders.",
  "Onboard collaborators with handbooks, runbooks, operating documentation, source maps, and decision records.",
  "Report team health, project status, and operational metrics with honesty about what is and is not working.",
  "Improve working systems over time without overengineering."
];

const decisionEvidence = [
  {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein",
    question: "How does recurring customer and team friction become a maintainable release?",
    decision:
      "Jamie translated the question into a well-scoped requirement, coordinated an incremental change, inspected the public customer path and available signals, then preserved ownership and next actions.",
    artifact: "Maintenance-to-handoff workflow specimen",
    result:
      "Repeatable patterns across product information, marketing, e-commerce operations, and customer follow-up."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc",
    question: "How can a coalition keep sensitive, shifting work recoverable without overexposing it?",
    decision:
      "Jamie separated public sources, protected context, open policy questions, decisions, and next actions across 30+ pages of shared campaign memory.",
    artifact: "Campaign-memory spine and source map",
    result:
      "Collaborators could recover decision context, review public evidence, and continue work across city and state strategy lanes."
  },
  {
    project: "CallNYC",
    href: "/work/callnyc",
    question: "How can administrative data become a pathway a resident can recognize and use?",
    decision:
      "Jamie organized constituent-services records around recognizable issues and possible next steps rather than requiring people to understand the source dataset first.",
    artifact: "Issue-page information architecture and public implementation",
    result:
      "A small, complete civic product with source data, issue pathways, public documentation, and explicit limits."
  }
];

const evidenceBoundaries = [
  {
    label: "Demonstrated here",
    text:
      "Requirements framing, stakeholder translation, incremental implementation, public-facing systems, decision and source records, onboarding patterns, continuity, and handoffs."
  },
  {
    label: "Needs stronger public proof",
    text:
      "An end-to-end bug and regression-test lifecycle, direct budget and resource authority, quantified Ops-to-Product prioritization, formal resident research, and product-level accessibility decisions."
  },
  {
    label: "Not claimed",
    text:
      "Government employment, procurement authority, PMP certification, sole causation for collective outcomes, or any named leader's private view of this work."
  }
];

const proofDestinations: Record<string, { project: string; href: Route }> = {
  "technical-operations-operating-backbone": {
    project: "Cross-project operating pattern",
    href: "/work"
  },
  "hje-modernization-stewardship": {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein" as Route
  },
  "hje-revenue-growth-contribution": {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein" as Route
  },
  "fair-rent-campaign-memory": {
    project: "FairRentNYC",
    href: "/work/fair-rent-nyc" as Route
  },
  "fair-rent-source-map": {
    project: "FairRentNYC",
    href: "/work/fair-rent-nyc" as Route
  },
  "nyc-artist-coalition-public-web-infrastructure": {
    project: "NYC Artist Coalition",
    href: "/work/fair-rent-nyc" as Route
  },
  "nyc-artist-coalition-civic-systems": {
    project: "NYC Artist Coalition",
    href: "/work/fair-rent-nyc" as Route
  },
  "callnyc-civic-data-guidance": {
    project: "CallNYC",
    href: "/work/callnyc" as Route
  },
  "wowlist-community-platform": {
    project: "WOWList",
    href: "/work/wowlist" as Route
  },
  "sunday-dinner-196-participation-infrastructure": {
    project: "196 / Sunday Dinner",
    href: "/work/196-sunday-dinner" as Route
  },
  "kc-town-hall-public-benefit-documentation": {
    project: "KC Town Hall",
    href: "/work/kc-town-hall" as Route
  },
  "source-backed-team-memory-method": {
    project: "Source-Backed Team Memory",
    href: "/lab/source-backed-team-memory"
  }
};

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-4xl font-bold text-jb-ink sm:text-5xl">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          I create the operating backbone complex teams need to move: clear
          requirements, delivery rhythms, decision records, risk signals,
          onboarding materials, operating documentation, launch support, and
          durable handoffs.
        </p>
      </div>
      <section aria-labelledby="decision-evidence" className="mt-12">
        <div className="jb-reading">
          <h2 className="text-3xl font-semibold text-jb-ink" id="decision-evidence">
            Start with the decisions
          </h2>
          <p className="mt-4 leading-8 text-jb-ink/76">
            These are the clearest public-safe traces of how I frame work,
            make it executable, verify what changed, and leave it maintainable.
          </p>
        </div>
        <div className="mt-7 divide-y divide-jb-ink/14 border-y border-jb-ink/18">
          {decisionEvidence.map((item) => (
            <article className="grid gap-5 py-7 lg:grid-cols-[0.3fr_0.7fr]" key={item.project}>
              <div>
                <h3 className="text-2xl font-semibold">
                  <Link className="text-jb-blue hover:text-jb-green" href={item.href as Route}>
                    {item.project}
                  </Link>
                </h3>
                <p className="mt-3 leading-7 text-jb-ink/72">{item.question}</p>
              </div>
              <dl className="grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="font-semibold text-jb-ink">Decision and action</dt>
                  <dd className="mt-2 text-sm leading-6 text-jb-ink/72">{item.decision}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-jb-ink">Inspectable artifact</dt>
                  <dd className="mt-2 text-sm leading-6 text-jb-ink/72">{item.artifact}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-jb-ink">What became usable</dt>
                  <dd className="mt-2 text-sm leading-6 text-jb-ink/72">{item.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
      <section aria-labelledby="capability-evidence" className="mt-14">
        <div className="jb-reading">
          <h2 className="text-3xl font-semibold text-jb-ink" id="capability-evidence">
            Capability evidence
          </h2>
          <p className="mt-4 leading-8 text-jb-ink/76">
            Follow a capability to the project and public wording that support it.
            The links carry the case context, evidence, credits, and limits.
          </p>
        </div>
        <div className="mt-7 divide-y divide-jb-ink/14 border-y border-jb-ink/18">
        {technicalOperationsProofRows.map((row) => (
          <section
            className="grid gap-5 py-7 lg:grid-cols-[0.32fr_0.68fr]"
            id={row.capability.toLowerCase().replaceAll(" ", "-")}
            key={row.capability}
          >
            <div>
              <h3 className="text-2xl font-semibold text-jb-ink">{row.capability}</h3>
              <p className="mt-3 text-sm leading-6 text-jb-ink/68">{row.toward}</p>
            </div>
            <ul className="grid gap-4 text-jb-ink/76 sm:grid-cols-2">
              {row.proofs.map((proof) => {
                const destination = proofDestinations[proof.id];
                return (
                  <li className="border-t border-jb-ink/12 pt-3" key={proof.id}>
                    {destination ? (
                      <Link
                        className="font-semibold text-jb-blue hover:text-jb-green"
                        href={destination.href}
                      >
                        {destination.project}
                      </Link>
                    ) : (
                      <a
                        className="font-semibold text-jb-blue hover:text-jb-green"
                        href="https://kcspacesfund.com/"
                      >
                        KC Spaces Fund
                      </a>
                    )}
                    <span className="mt-1 block text-sm leading-6 text-jb-ink/72">
                      {proof.shortWording ?? proof.publicWording}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        </div>
      </section>
      <details className="mt-10 border-y border-jb-ink/18 py-5">
        <summary className="cursor-pointer text-xl font-semibold text-jb-blue hover:text-jb-green">
          Where the public evidence stops
        </summary>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.46fr_0.54fr]">
          <dl className="divide-y divide-jb-ink/12 border-y border-jb-ink/12">
            {evidenceBoundaries.map((item) => (
              <div className="py-4" key={item.label}>
                <dt className="font-semibold text-jb-ink">{item.label}</dt>
                <dd className="mt-2 text-sm leading-6 text-jb-ink/72">{item.text}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h2 className="text-xl font-semibold text-jb-ink">Full operating practice</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-jb-ink/72">
              {operatingPractice.map((item) => (
                <li className="border-t border-jb-ink/12 pt-3" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </details>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA showWorkingSession />
      </div>
    </div>
  );
}
