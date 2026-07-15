import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import {
  requireReadyOrCarefulProof,
  technicalOperationsProofRows
} from "@/data/proofs";
import { getClaimProjection } from "@/data/knowledge-bank";
import { createMetadata } from "@/lib/metadata";

const kcTownHallProof = requireReadyOrCarefulProof(
  "kc-town-hall-public-benefit-documentation"
);

const commercialVacancyProof = getClaimProjection(
  "CLM-COMMERCIAL-VACANCY-PILOT-BRIEF-2026",
  "technical-operations",
  "/work/technical-operations"
);

const sundayDinnerOperationsProof = getClaimProjection(
  "CLM-SUNDAY-DINNER-RESIDENCY-OPERATING-RECORDS",
  "technical-operations",
  "/work/technical-operations"
);

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
    project: "HJE",
    proof:
      "Jamie helped modernize e-commerce, analytics, marketing, content, and operations workflows in a legacy business."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    proof:
      "Jamie built and stewarded 30+ pages of campaign memory, including decision records, source maps, action trackers, and public/private boundary management."
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
      "Jamie co-built a community-calendar platform using Python / Django, PostgreSQL / PostGIS, and Ember.js across roughly 35 city ecosystems."
  },
  {
    project: "196 / Sunday Dinner",
    proof: sundayDinnerOperationsProof.text
  },
  {
    project: "KC Spaces Fund",
    proof:
      "Jamie built behind-the-scenes web infrastructure for a 2020 mutual-aid campaign, while organizer credit remains with the campaign's named organizers."
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
                  <span>{proof.shortWording ?? proof.publicWording}</span>
                </li>
              ))}
            </ul>
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
