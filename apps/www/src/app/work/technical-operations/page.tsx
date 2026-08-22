import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { ResumeCTA } from "@/components/ResumeCTA";
import { getClaimProjection } from "@/data/knowledge-bank";
import { requireReadyOrCarefulProof } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const signatureSituations = [
  {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein" as Route,
    linkLabel: "Read the Harry J. Epstein Company case study",
    situation: getClaimProjection(
      "CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015",
      "technical-operations-situation",
      "/work/technical-operations"
    ).text,
    responsibility: getClaimProjection(
      "CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015",
      "technical-operations-role",
      "/work/technical-operations"
    ).text,
    resultSummary: null,
    method:
      "Incremental releases connected public content, e-commerce, analytics, marketing, and internal workflows; this was sustained stewardship rather than a one-time launch.",
    resultProofIds: [
      "hje-modernization-stewardship",
      "hje-revenue-growth-contribution"
    ],
    lifecycleNote:
      getClaimProjection(
        "CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015",
        "technical-operations",
        "/work/technical-operations"
      ).text
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc" as Route,
    linkLabel: "Read the FairRentNYC case study",
    situation: getClaimProjection(
      "CLM-CRS-CAMPAIGN-MEMORY-SYSTEM-2026",
      "technical-operations-situation",
      "/work/technical-operations"
    ).text,
    responsibility: getClaimProjection(
      "CLM-CRS-CAMPAIGN-MEMORY-SYSTEM-2026",
      "technical-operations-role",
      "/work/technical-operations"
    ).text,
    resultSummary:
      getClaimProjection(
        "CLM-CRS-CAMPAIGN-MEMORY-SYSTEM-2026",
        "technical-operations-result",
        "/work/technical-operations"
      ).text,
    method:
      "Public sources and publishable summaries stayed distinct from private coalition context; decision records, review questions, and assigned next steps made shared work reviewable.",
    resultProofIds: [],
    lifecycleNote:
      getClaimProjection(
        "CLM-CRS-CAMPAIGN-MEMORY-SYSTEM-2026",
        "technical-operations",
        "/work/technical-operations"
      ).text
  },
  {
    project: "CallNYC",
    href: "/work/callnyc" as Route,
    linkLabel: "Read the CallNYC case study",
    situation: getClaimProjection(
      "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      "technical-operations-situation",
      "/work/technical-operations"
    ).text,
    responsibility: getClaimProjection(
      "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      "technical-operations-role",
      "/work/technical-operations"
    ).text,
    resultSummary:
      getClaimProjection(
        "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
        "technical-operations-result",
        "/work/technical-operations"
      ).text,
    method:
      "Public records became issue paths, district context, and possible next steps.",
    resultProofIds: [],
    lifecycleNote:
      getClaimProjection(
        "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
        "technical-operations",
        "/work/technical-operations"
      ).text
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
    evidence: "FairRentNYC",
    href: "/work/fair-rent-nyc" as Route
  }
];

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "How Jamie Burkart turns complex public-facing technical work into coordinated delivery, usable systems, and clear handoffs.",
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
        </div>
      </header>

      <section className="border-b border-jb-ink/16 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
          <div>
            <h2 className="text-4xl leading-tight text-jb-ink">
              Three situations, one operating practice
            </h2>
            <p className="mt-5 max-w-[32ch] leading-7 text-jb-ink/72">
              Sustained business operations, coalition coordination, and a
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
                  My role
                </dt>
                <dd className="leading-7 text-jb-ink/76">
                  {primarySituation.responsibility}
                </dd>
                <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                  Result
                </dt>
                <dd>
                  <ul className="space-y-3 text-jb-ink/76">
                    {primarySituation.results.map((proof) => (
                      <li className="leading-7" key={proof.id}>
                        {proof.publicWording}
                      </li>
                    ))}
                  </ul>
                </dd>
                <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                  Method
                </dt>
                <dd className="leading-7 text-jb-ink/76">
                  {primarySituation.method}
                </dd>
              </dl>
              <p className="mt-6 max-w-[72ch] border-l-2 border-jb-ink/16 pl-4 text-sm leading-6 text-jb-ink/62">
                <span className="font-semibold text-jb-ink/72">
                  Status:
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
                    {item.situation} {item.responsibility}{" "}
                    <span className="font-semibold text-jb-ink/86">
                      {item.resultSummary}
                    </span>
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
                    Case evidence: {item.evidence}.
                  </Link>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="grid gap-8 py-14 lg:grid-cols-[0.38fr_0.62fr]">
        <ResumeCTA compact />
        <ContactCTA showResumeLink={false} />
      </div>
    </article>
  );
}
