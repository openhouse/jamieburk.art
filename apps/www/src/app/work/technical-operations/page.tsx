import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const teamNeeds = [
  "Coordinate delivery across multiple concurrent projects.",
  "Track status, clarify owners, and surface risks early.",
  "Build planning rhythms, decision frameworks, weekly updates, and retrospectives.",
  "Coordinate across product, design, engineering, communications, legal / policy, contracts, leadership, and external partners.",
  "Onboard new contributors with enough context to become useful quickly.",
  "Write handbooks, runbooks, onboarding guides, decision records, source maps, and handoff materials people actually use.",
  "Report honestly on what is moving, what is blocked, what needs a decision, and what should improve next cycle."
];

const representativeProof = [
  {
    project: "Harry J. Epstein Company",
    proof:
      "Long-running web, e-commerce, analytics, content, marketing, and operational workflow improvements."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    proof:
      "Campaign-memory infrastructure, meeting synthesis, action tracking, source maps, and public/internal boundaries."
  },
  {
    project: "CallNYC",
    proof:
      "Constituent-services open data translated into resident-facing next-step guidance."
  },
  {
    project: "196 / Sunday Dinner",
    proof:
      "Onboarding, hosting, facilitation, documentation, and continuity systems for recurring cultural work."
  },
  {
    project: "Source-Backed Team Memory",
    proof:
      "Decision lineage, onboarding context, source-linked notes, and human-reviewed AI-assisted workflows."
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
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding
          materials, stakeholder updates, documentation systems, launch support,
          and durable handoffs.
        </p>
      </div>
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">
          What I help teams do
        </h2>
        <ul className="mt-5 grid gap-3 text-jb-ink/76 md:grid-cols-2">
          {teamNeeds.map((need) => (
            <li className="flex gap-3" key={need}>
              <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
              <span>{need}</span>
            </li>
          ))}
        </ul>
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
      <section className="mt-10">
        <h2 className="text-3xl font-semibold text-jb-ink">Representative proof</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {representativeProof.map((item) => (
            <JBCard key={item.project}>
              <h3 className="text-xl font-semibold text-jb-ink">{item.project}</h3>
              <p className="mt-3 leading-7 text-jb-ink/76">{item.proof}</p>
            </JBCard>
          ))}
        </div>
      </section>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
