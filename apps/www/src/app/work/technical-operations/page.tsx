import type { Metadata } from "next";
import { JBButton } from "@/components/JBButton";
import { JBCard } from "@/components/JBCard";
import { technicalOperationsProofRows } from "@/data/proofs";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

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
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move public
          work from ambiguity to launch: requirements, planning cycles, risk
          surfacing, decision records, onboarding materials, handoffs, and
          operating documentation people actually use.
        </p>
        <p className="mt-5 text-lg leading-8 text-jb-ink/76">
          This page maps selected work to the core responsibilities of technical
          operations: coordinating delivery, surfacing risks early, building
          planning cycles, improving meeting and decision practices, onboarding
          new collaborators, maintaining useful documentation, and reporting
          honestly on status, team health, and what is not working.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {technicalOperationsProofRows.map((row) => (
          <JBCard key={row.capability}>
            <h2 className="text-2xl font-semibold text-jb-ink">{row.capability}</h2>
            <p className="mt-4 text-sm font-semibold uppercase text-jb-blue">
              Proof: {row.proofLine}
            </p>
            <p className="mt-3 leading-7 text-jb-ink/76">{row.toward}</p>
          </JBCard>
        ))}
      </div>
      <div className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <p className="max-w-3xl text-lg leading-8 text-jb-ink/76">
          For technical operations, product operations, implementation, or
          public-facing digital service roles, start with the resume and the
          three full case studies: Harry J. Epstein, FairRentNYC, and CallNYC.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <JBButton href={site.resumePath} download>
            Download resume
          </JBButton>
          <JBButton href="/work/harry-j-epstein" variant="secondary">
            Read HJE case study
          </JBButton>
          <JBButton href="/work/fair-rent-nyc" variant="secondary">
            Read FairRentNYC case study
          </JBButton>
          <JBButton href="/work/callnyc" variant="secondary">
            Read CallNYC case study
          </JBButton>
          <JBButton href="/contact" variant="ghost">
            Contact Jamie
          </JBButton>
        </div>
      </div>
    </div>
  );
}
