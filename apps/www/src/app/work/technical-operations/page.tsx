import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { ResumeCTA } from "@/components/ResumeCTA";
import {
  requireReadyOrCarefulProof,
  technicalOperationsProofRows
} from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const signatureSituations = [
  {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein" as Route,
    linkLabel: "Read the Harry J. Epstein Company case study",
    situation:
      "An 80+ year-old industrial business needed to adapt online without losing the knowledge and voice that made it distinctive.",
    responsibility:
      "I maintained and improved the web and e-commerce presence, coordinated incremental releases, and translated legacy operating knowledge into searchable content, analytics, marketing, and operational workflows.",
    operatingMechanics:
      "Incremental releases connected public content, e-commerce, analytics, marketing, and internal workflows; this was sustained stewardship rather than a one-time launch.",
    resultProofIds: [
      "hje-modernization-stewardship",
      "hje-revenue-growth-contribution"
    ],
    evidenceStatus:
      "Sustained implementation with a carefully framed contribution to business growth."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc" as Route,
    linkLabel: "Read the FairRentNYC case study",
    situation:
      "A coalition working across public advocacy, policy research, press, and direct engagement with elected officials needed shared memory without exposing private context.",
    responsibility:
      "I synthesized meetings, decisions, action items, public sources, policy questions, and stakeholder next steps into shared memory and actionable workstreams.",
    operatingMechanics:
      "Public sources and publishable summaries stayed distinct from private coalition context; decision records, review questions, and next-step lanes made shared work reviewable.",
    resultProofIds: ["fair-rent-campaign-memory", "fair-rent-source-map"],
    evidenceStatus:
      "Maintained coordination and source-trace resources for shared work; no policy outcome is attributed to the documentation alone."
  },
  {
    project: "CallNYC",
    href: "/work/callnyc" as Route,
    linkLabel: "Read the CallNYC case study",
    situation:
      "Open constituent-services data needed to become resident-facing issue paths and next-step guidance.",
    responsibility:
      "I built an independent follow-on to the New York City Council's first CouncilStat hackathon and made its archived, unofficial status clear.",
    operatingMechanics:
      "Public records became issue paths, district context, and possible next steps; the lifecycle now ends in an explicit archived, unofficial state rather than a current-service claim.",
    resultProofIds: ["callnyc-civic-data-guidance"],
    evidenceStatus:
      "Delivered resident-facing prototype with verified public coverage; current-service adoption and resident outcomes are not claimed."
  }
].map((item) => ({
  ...item,
  results: item.resultProofIds.map(requireReadyOrCarefulProof)
}));

const operatingMethod = [
  {
    term: "Frame the work",
    detail:
      "Clarify the need, the people involved, the constraints, and what remains unknown.",
    evidence: "CallNYC",
    href: "/work/callnyc" as Route
  },
  {
    term: "Make ownership visible",
    detail:
      "Map responsibilities, dependencies, decisions, and the paths that require review.",
    evidence: "FairRentNYC",
    href: "/work/fair-rent-nyc" as Route
  },
  {
    term: "Create a delivery rhythm",
    detail:
      "Use plans, working sessions, status signals, and documentation to keep parallel work moving.",
    evidence: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein" as Route
  },
  {
    term: "Support adoption",
    detail:
      "Prepare the interface, guidance, launch support, and feedback loops people need to use the work.",
    evidence: "CallNYC",
    href: "/work/callnyc" as Route
  },
  {
    term: "Leave a useful handoff",
    detail:
      "Transfer source maps, decision records, runbooks, and open questions—or make archival status explicit—so the next person knows what can continue.",
    evidence: "FairRentNYC and CallNYC",
    href: "/work/fair-rent-nyc" as Route
  }
];

const featuredCapabilityDestinations: Record<
  string,
  { href: Route | `https://${string}`; linkLabel: string }
> = {
  "Delivery coordination": {
    href: "/work/harry-j-epstein" as Route,
    linkLabel: "See sustained delivery at Harry J. Epstein Company"
  },
  "Risk surfacing and decision clarity": {
    href: "/work/fair-rent-nyc" as Route,
    linkLabel: "See decision clarity in FairRentNYC"
  },
  "Operating documentation people use": {
    href: "/lab/source-backed-team-memory",
    linkLabel: "See the team-memory method"
  },
  "Public-facing launch and adoption": {
    href: "https://kcspacesfund.com/",
    linkLabel: "See public-facing launch at KC Spaces Fund"
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
    <article className="jb-frame py-14">
      <header className="grid gap-8 border-b border-jb-ink/16 pb-14 lg:grid-cols-[0.32fr_0.68fr]">
        <h1 className="text-4xl leading-[0.98] text-jb-ink xl:text-5xl">
          Technical Operations &amp; Implementation
        </h1>
        <div className="max-w-[68ch] space-y-5 text-xl leading-8 text-jb-ink/78">
          <p>
            I create the operating structure complex teams need to move
            public-facing technical work from ambiguity to launch.
          </p>
          <p>
            I clarify requirements, map workflows, coordinate delivery, surface
            risk, maintain decision records, prepare onboarding and handoff
            materials, and improve working systems over time.
          </p>
        </div>
      </header>

      <section className="border-b border-jb-ink/16 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
          <div>
            <h2 className="text-4xl leading-tight text-jb-ink">
              Three situations, one operating practice
            </h2>
            <p className="mt-5 max-w-[32ch] leading-7 text-jb-ink/72">
              Sustained business operations, coalition memory, and a
              resident-facing civic prototype show the practice in different
              conditions.
            </p>
          </div>
          <div className="divide-y divide-jb-ink/16 border-y border-jb-ink/16">
            {signatureSituations.map((item) => (
              <article className="py-8 first:pt-0 last:pb-0" key={item.project}>
                <h3 className="text-3xl leading-tight text-jb-ink">
                  <Link
                    className="text-jb-blue hover:text-jb-green"
                    href={item.href}
                  >
                    {item.project}
                  </Link>
                </h3>
                <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                    Situation
                  </dt>
                  <dd className="leading-7 text-jb-ink/76">{item.situation}</dd>
                  <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                    My responsibility
                  </dt>
                  <dd className="leading-7 text-jb-ink/76">
                    {item.responsibility}
                  </dd>
                  <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                    What became usable
                  </dt>
                  <dd>
                    <ul className="space-y-3 text-jb-ink/76">
                      {item.results.map((proof) => (
                        <li className="leading-7" key={proof.id}>
                          {proof.publicWording}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm leading-6 text-jb-ink/62">
                      <span className="font-semibold text-jb-ink/72">
                        Evidence status:
                      </span>{" "}
                      {item.evidenceStatus}
                    </p>
                  </dd>
                  <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                    Operating mechanics
                  </dt>
                  <dd className="leading-7 text-jb-ink/76">
                    {item.operatingMechanics}
                  </dd>
                </dl>
                <Link
                  className="mt-6 inline-flex min-h-11 items-center border-b border-jb-blue font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
                  href={item.href}
                >
                  {item.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-jb-ink/16 py-14 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <h2 className="text-4xl leading-tight text-jb-ink">
            How I move the work
          </h2>
          <p className="mt-5 max-w-[32ch] leading-7 text-jb-ink/72">
            The tools change with the team. The operating sequence stays
            recognizable.
          </p>
        </div>
        <ol className="border-t border-jb-ink/16">
          {operatingMethod.map((item) => (
            <li
              className="grid gap-2 border-b border-jb-ink/16 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8"
              key={item.term}
            >
              <span className="font-semibold text-jb-ink">{item.term}</span>
              <span className="leading-7 text-jb-ink/74">
                {item.detail}{" "}
                <Link
                  className="font-semibold text-jb-blue underline decoration-jb-blue/45 underline-offset-4 hover:text-jb-green"
                  href={item.href}
                >
                  Seen in {item.evidence}.
                </Link>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-8 border-b border-jb-ink/16 py-14 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <h2 className="text-4xl leading-tight text-jb-ink">
            Evidence by capability
          </h2>
          <p className="mt-5 max-w-[32ch] leading-7 text-jb-ink/72">
            A compact route into the broader portfolio. Each link opens the
            project evidence behind the capability.
          </p>
        </div>
        <div className="border-t border-jb-ink/16">
          {technicalOperationsProofRows.map((row) => {
            const destination = featuredCapabilityDestinations[row.capability];

            return (
              <section
                className="grid gap-4 border-b border-jb-ink/16 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8"
                id={row.capability.toLowerCase().replaceAll(" ", "-")}
                key={row.capability}
              >
                <h3 className="text-xl font-semibold leading-7 text-jb-ink">
                  {row.capability}
                </h3>
                <div>
                  <p className="leading-7 text-jb-ink/72">{row.toward}</p>
                  <Link
                    className="mt-4 inline-flex min-h-11 items-center border-b border-jb-blue text-sm font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
                    href={destination.href}
                  >
                    {destination.linkLabel}
                  </Link>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <div className="grid gap-8 py-14 lg:grid-cols-[0.38fr_0.62fr]">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </article>
  );
}
