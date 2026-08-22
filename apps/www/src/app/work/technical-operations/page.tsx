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
    lifecycleNote:
      "Historical 2009–2015 engagement; growth is contribution framing, and the successor site is context—not my current work. The public-safe reconstruction preserves the reusable operating pattern."
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
    lifecycleNote:
      "Current coordination practice: I maintain the record, action ownership stays explicit, and no policy outcome is attributed to the documentation."
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
    lifecycleNote:
      "Delivered prototype with verified public coverage; archived and unofficial, with no current-service adoption or resident outcome claimed."
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
                {primarySituation.lifecycleNote}
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
                  <p className="mt-5 leading-7 text-jb-ink/76">
                    {item.situation}
                  </p>
                  <p className="mt-4 leading-7 text-jb-ink/76">
                    <span className="font-semibold text-jb-ink">My role:</span>{" "}
                    {item.responsibility}
                  </p>
                  <ul className="mt-4 space-y-3 text-jb-ink/76">
                    {item.results.map((proof) => (
                      <li className="leading-7" key={proof.id}>
                        {resultWording(proof)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 leading-7 text-jb-ink/76">
                    <span className="font-semibold text-jb-ink">
                      How it worked:
                    </span>{" "}
                    {item.operatingMechanics}
                  </p>
                  <p className="mt-5 border-l-2 border-jb-ink/16 pl-3 text-sm leading-6 text-jb-ink/62">
                    {item.lifecycleNote}
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
        <div>
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
          <nav aria-label="Evidence by capability" className="mt-8">
            <p className="font-label text-sm uppercase tracking-[0.055em] text-jb-green">
              Evidence by capability
            </p>
            <ul className="mt-3 grid gap-x-6 border-t border-jb-ink/16 sm:grid-cols-2">
              {technicalOperationsProofRows.map((row) => {
                const destination =
                  featuredCapabilityDestinations[row.capability];

                return (
                  <li
                    className="border-b border-jb-ink/16 py-4"
                    id={row.capability.toLowerCase().replaceAll(" ", "-")}
                    key={row.capability}
                  >
                    <Link
                      className="group block min-h-11 text-jb-blue hover:text-jb-green"
                      href={destination.href}
                    >
                      <span className="block font-semibold">
                        {row.capability}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-jb-ink/62 group-hover:text-jb-green">
                        {destination.linkLabel}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      <div className="grid gap-8 py-14 lg:grid-cols-[0.38fr_0.62fr]">
        <ResumeCTA compact />
        <ContactCTA showResumeLink={false} />
      </div>
    </article>
  );
}
