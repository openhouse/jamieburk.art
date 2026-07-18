import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import {
  requireTechnicalOperationsProof,
  technicalOperationsClaimProjectionRefs,
  technicalOperationsProofRows
} from "@/data/proofs";
import { getClaimProjection } from "@/data/knowledge-bank";
import { createMetadata } from "@/lib/metadata";

const kcTownHallProof = requireTechnicalOperationsProof(
  "kc-town-hall-public-benefit-documentation"
);

const technicalProjection = (id: (typeof technicalOperationsClaimProjectionRefs)[number]["id"]) => {
  const reference = technicalOperationsClaimProjectionRefs.find((item) => item.id === id);
  if (!reference) throw new Error(`Unknown Technical Operations projection: ${id}`);
  return getClaimProjection(reference.claimId, reference.key, reference.route);
};

const commercialVacancyProof = technicalProjection("commercial-vacancy");

const commercialRentOperationsProof = requireTechnicalOperationsProof(
  "fair-rent-campaign-memory"
);

const sundayDinnerOperationsProof = technicalProjection("sunday-dinner-operations");

const kcSpacesFundOperationsProof = technicalProjection("kc-spaces-fund-operations");

const sourceBackedMemoryProof = requireTechnicalOperationsProof(
  "source-backed-team-memory-method"
);

const aiEvalsProof = requireTechnicalOperationsProof(
  "ai-evals-professional-development"
);

const technicalOperationsProjectionOverrides = new Map<string, string>([
  [
    "kc-spaces-fund-digital-infrastructure",
    kcSpacesFundOperationsProof.text
  ]
]);

const operationsMap = [
  "Clarify requirements and map workflows for public-facing technical work.",
  "Coordinate delivery from ambiguity toward launch.",
  "Surface risks and open questions early so teams can act on them.",
  "Maintain decision records and clear project-status reporting.",
  "Prepare onboarding materials, operating documentation, and durable handoffs.",
  "Improve working systems over time without overengineering."
];

const proofMap = [
  {
    project: "Harry J. Epstein Company",
    proof:
      "Jamie helped modernize e-commerce, analytics, marketing, content, and operations workflows in a legacy business."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    proof: commercialRentOperationsProof.publicWording
  },
  {
    project: "Commercial vacancy public-data framing",
    proof: commercialVacancyProof.text
  },
  {
    project: "CallNYC",
    proof:
      "Jamie built an archived, independent, and unofficial prototype that translated CouncilStat open data into resident-facing guidance."
  },
  {
    project: "WOWList",
    proof:
      "Jamie co-built a community-calendar platform using Python / Django, PostgreSQL / PostGIS, and Ember.js, with recorded activity across roughly 35 city ecosystems."
  },
  {
    project: "196 / Sunday Dinner",
    proof: sundayDinnerOperationsProof.text
  },
  {
    project: "KC Spaces Fund",
    proof: kcSpacesFundOperationsProof.text
  },
  {
    project: "KC Town Hall",
    proof: kcTownHallProof.shortWording ?? kcTownHallProof.publicWording
  },
  {
    project: "Source-Backed Team Memory",
    proof:
      "Jamie is developing a bounded lab method for decision lineage, onboarding context, meeting synthesis, and human-reviewed AI workflows."
  }
];

const currentPractice = [
  {
    period: "2026",
    title: "Source-backed team memory",
    text: sourceBackedMemoryProof.shortWording ?? sourceBackedMemoryProof.publicWording,
    href: "/lab/source-backed-team-memory" as Route
  },
  {
    period: "2026",
    title: "Public-data product framing",
    text: commercialVacancyProof.text,
    href: "/work/fair-rent-nyc" as Route
  },
  {
    period: "2026",
    title: "AI evaluation practice",
    text: aiEvalsProof.shortWording ?? aiEvalsProof.publicWording,
    href: "/about" as Route
  }
];

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
          Across 14+ years in civic, cultural, small-business, and public-facing
          technical environments, I have created the operating structure teams
          need to move: requirements, workflows, decision records, action
          trackers, onboarding materials, documentation systems, launch
          support, and durable handoffs.
        </p>
      </div>
      <section
        aria-labelledby="current-practice-heading"
        className="mt-10 border-y border-jb-ink/15 py-7"
      >
        <div className="grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-jb-blue">Current practice</p>
            <h2 className="mt-2 text-2xl font-semibold text-jb-ink" id="current-practice-heading">
              Recent evidence, clearly bounded
            </h2>
          </div>
          <dl className="grid gap-5 md:grid-cols-3">
            {currentPractice.map((item) => (
              <div className="border-l-4 border-jb-ochre pl-4" key={item.title}>
                <dt>
                  <span className="text-xs font-semibold text-jb-blue">{item.period}</span>
                  <Link className="mt-1 block font-semibold text-jb-ink hover:text-jb-blue" href={item.href}>
                    {item.title}
                  </Link>
                </dt>
                <dd className="mt-2 text-sm leading-6 text-jb-ink/72">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="mt-10 grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
        <JBCard>
          <h2 className="text-2xl font-semibold text-jb-ink">
            How this maps to team operations
          </h2>
          <ul className="mt-5 space-y-3 text-jb-ink/76">
            {operationsMap.map((item) => (
              <li className="flex gap-3" key={item}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-green" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </JBCard>
        <JBCard>
          <h2 className="text-2xl font-semibold text-jb-ink">Proof map</h2>
          <dl className="mt-5 space-y-4">
            {proofMap.map((item) => (
              <div key={item.project}>
                <dt className="font-semibold text-jb-ink">{item.project}</dt>
                <dd className="mt-1 leading-7 text-jb-ink/72">{item.proof}</dd>
              </div>
            ))}
          </dl>
        </JBCard>
      </section>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {technicalOperationsProofRows.map((row) => (
          <JBCard key={row.capability}>
            <h2 className="text-2xl font-semibold text-jb-ink">{row.capability}</h2>
            <p className="mt-3 text-sm leading-6 text-jb-ink/68">{row.toward}</p>
            <ul className="mt-5 space-y-3 text-jb-ink/76">
              {row.proofs.map((proof) => (
                <li className="flex gap-3" key={proof.id}>
                  <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                  <span>
                    {technicalOperationsProjectionOverrides.get(proof.id) ??
                      proof.shortWording ??
                      proof.publicWording}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-jb-ink/10 pt-4">
              <h3 className="text-sm font-semibold text-jb-ink">View related work</h3>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                {row.destinations.map((destination) => (
                  <li key={destination.href}>
                    <Link
                      className="text-jb-blue underline decoration-jb-blue/30 underline-offset-4 hover:text-jb-green"
                      href={destination.href as Route}
                    >
                      {destination.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </JBCard>
        ))}
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
