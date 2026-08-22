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
      "I coordinated day-to-day web and e-commerce work: sequencing releases, maintaining analytics and content operations, and translating legacy knowledge into clear requirements.",
    operatingMechanics:
      "Incremental releases connected public content, e-commerce, analytics, marketing, and internal workflows; this was sustained stewardship rather than a one-time launch.",
    resultProofIds: [
      "hje-modernization-stewardship",
      "hje-revenue-growth-contribution"
    ],
    evidenceStatus:
      "Sustained implementation; the contribution to business growth is carefully framed. The historical engagement ended in 2015. Its public-safe handoff reconstruction preserves clear requirements, verification practices, reusable patterns, and owned next actions, while the successor website is current business context—not Jamie's present stewardship."
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
      "The shared memory documents a current coordination practice: I maintain decision records and concrete artifacts while action ownership stays explicit and neither I nor the documentation is assigned sole coalition authority. No policy outcome is attributed to the documentation alone."
  },
  {
    project: "CallNYC",
    href: "/work/callnyc" as Route,
    linkLabel: "Read the CallNYC case study",
    situation:
      "Open constituent-services data needed to become resident-facing issue paths and next-step guidance.",
    responsibility:
      "I independently framed the prototype, modeled issue paths and possible next steps from open records, and kept its relationship to the Council and current service status explicit.",
    operatingMechanics:
      "Public records became issue paths, district context, and possible next steps.",
    resultProofIds: ["callnyc-civic-data-guidance"],
    evidenceStatus:
      "Delivered a resident-facing prototype with verified public coverage. Its lifecycle ends in an explicit archived, unofficial state; current-service adoption and resident outcomes are not claimed."
  }
].map((item) => ({
  ...item,
  results: item.resultProofIds.map(requireReadyOrCarefulProof)
}));

const [primarySituation, ...supportingSituations] = signatureSituations;

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
    term: "Prepare for adoption",
    detail:
      "Prepare the interface, guidance, launch support, and a way to collect feedback before broader use is established.",
    evidence: "the CallNYC prototype",
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
    href: "/work/fair-rent-nyc" as Route,
    linkLabel: "See working memory in FairRentNYC"
  },
  "Public-facing launch and adoption readiness": {
    href: "/work/callnyc" as Route,
    linkLabel: "See the resident-facing CallNYC prototype"
  }
};

function resultWording(proof: ReturnType<typeof requireReadyOrCarefulProof>) {
  return proof.id === "fair-rent-source-map"
    ? proof.shortWording
    : proof.publicWording;
}

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
          <div className="border-y border-jb-ink/16">
            <article className="py-8" key={primarySituation.project}>
              <p className="font-label text-sm uppercase tracking-[0.055em] text-jb-green">
                Sustained implementation
              </p>
              <h3 className="mt-2 text-4xl leading-tight text-jb-ink">
                <Link
                  className="text-jb-blue hover:text-jb-green"
                  href={primarySituation.href}
                >
                  {primarySituation.project}
                </Link>
              </h3>
              <dl className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-[9rem_1fr]">
                <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                  Situation
                </dt>
                <dd className="leading-7 text-jb-ink/76">
                  {primarySituation.situation}
                </dd>
                <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                  My responsibility
                </dt>
                <dd className="leading-7 text-jb-ink/76">
                  {primarySituation.responsibility}
                </dd>
                <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                  What became usable
                </dt>
                <dd>
                  <ul className="space-y-3 text-jb-ink/76">
                    {primarySituation.results.map((proof) => (
                      <li className="leading-7" key={proof.id}>
                        {resultWording(proof)}
                      </li>
                    ))}
                  </ul>
                </dd>
                <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                  Operating mechanics
                </dt>
                <dd className="leading-7 text-jb-ink/76">
                  {primarySituation.operatingMechanics}
                </dd>
              </dl>
              <p className="mt-6 max-w-[72ch] border-l-2 border-jb-ink/16 pl-4 text-sm leading-6 text-jb-ink/62">
                <span className="font-semibold text-jb-ink/72">
                  Lifecycle and evidence:
                </span>{" "}
                {primarySituation.evidenceStatus}
              </p>
              <Link
                className="mt-6 inline-flex min-h-11 items-center border-b border-jb-blue font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
                href={primarySituation.href}
              >
                {primarySituation.linkLabel}
              </Link>
            </article>

            <div className="grid border-t border-jb-ink/16 md:grid-cols-2 md:divide-x md:divide-jb-ink/16">
              {supportingSituations.map((item, index) => (
                <article
                  className={`py-8 ${index === 0 ? "md:pr-8" : "border-t border-jb-ink/16 md:border-t-0 md:pl-8"}`}
                  key={item.project}
                >
                  <p className="font-label text-sm uppercase tracking-[0.055em] text-jb-green">
                    Complementary proof
                  </p>
                  <h3 className="mt-2 text-2xl leading-tight text-jb-ink">
                    <Link
                      className="text-jb-blue hover:text-jb-green"
                      href={item.href}
                    >
                      {item.project}
                    </Link>
                  </h3>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="font-label text-xs uppercase tracking-[0.055em] text-jb-blue">
                        Situation
                      </dt>
                      <dd className="mt-1 leading-7 text-jb-ink/76">
                        {item.situation}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-label text-xs uppercase tracking-[0.055em] text-jb-blue">
                        My responsibility
                      </dt>
                      <dd className="mt-1 leading-7 text-jb-ink/76">
                        {item.responsibility}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-label text-xs uppercase tracking-[0.055em] text-jb-blue">
                        What became usable
                      </dt>
                      <dd className="mt-1">
                        <ul className="space-y-3 text-jb-ink/76">
                          {item.results.map((proof) => (
                            <li className="leading-7" key={proof.id}>
                              {resultWording(proof)}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-label text-xs uppercase tracking-[0.055em] text-jb-blue">
                        Operating mechanics
                      </dt>
                      <dd className="mt-1 leading-7 text-jb-ink/76">
                        {item.operatingMechanics}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-5 border-l-2 border-jb-ink/16 pl-3 text-sm leading-6 text-jb-ink/62">
                    <span className="font-semibold text-jb-ink/72">
                      Lifecycle and evidence:
                    </span>{" "}
                    {item.evidenceStatus}
                  </p>
                  <Link
                    className="mt-5 inline-flex min-h-11 items-center border-b border-jb-blue text-sm font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
                    href={item.href}
                  >
                    {item.linkLabel}
                  </Link>
                </article>
              ))}
            </div>
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
            Four compact routes to the project evidence behind each
            capability.
          </p>
        </div>
        <div className="grid border-t border-jb-ink/16 sm:grid-cols-2">
          {technicalOperationsProofRows.map((row) => {
            const destination = featuredCapabilityDestinations[row.capability];

            return (
              <section
                className="border-b border-jb-ink/16 py-6 sm:odd:pr-6 sm:even:border-l sm:even:border-jb-ink/16 sm:even:pl-6"
                id={row.capability.toLowerCase().replaceAll(" ", "-")}
                key={row.capability}
              >
                <h3 className="text-xl font-semibold leading-7 text-jb-ink">
                  {row.capability}
                </h3>
                <p className="mt-2 leading-7 text-jb-ink/72">{row.toward}</p>
                <Link
                  className="mt-3 inline-flex min-h-11 items-center border-b border-jb-blue text-sm font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
                  href={destination.href}
                >
                  {destination.linkLabel}
                </Link>
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
