import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const operationsMap = [
  "Coordinate delivery across concurrent projects and keep work moving from concept through public launch.",
  "Track status, surface risks early, and name recurring blockers before they become patterns.",
  "Build planning cycles, team rituals, decision frameworks, status reporting, and retrospectives.",
  "Coordinate dependencies across product, engineering, security, legal, communications, contracts, and external stakeholders.",
  "Onboard collaborators with handbooks, runbooks, operating documentation, source maps, and decision records.",
  "Report team health, project status, and operational metrics with honesty about what is and is not working.",
  "Improve working systems over time without overengineering."
];

const proofMap = [
  {
    project: "HJE",
    proof:
      "I helped modernize e-commerce, analytics, marketing, content, and operating workflows for a legacy industrial business."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    proof:
      "I designed and maintained a lightweight operating backbone for multi-organization policy work: running minutes, decision records, action ownership, open questions, source boundaries, and coordinated city/state work."
  },
  {
    project: "Commercial Vacancy Data",
    proof:
      "I translated administrative-data constraints into a practical proposal for privacy-preserving commercial vacancy and lease-cost indicators, including coverage, suppression, and methods requirements."
  },
  {
    project: "CallNYC",
    proof:
      "I built an independent civic-data follow-on that translated constituent-services records into resident-facing guidance and a public-engagement layer spanning 61 issue pathways and 26 Council-member accounts."
  },
  {
    project: "Project identity systems",
    proof:
      "I established public-facing identities for CallNYC, WOW List, NYC Artist Coalition, and KC Town Hall, including shared systems collaborators carried across campaigns, programs, and changing stewardship."
  },
  {
    project: "WOWList",
    proof:
      "I co-built a public-facing community event distribution platform using Python / Django, PostgreSQL / PostGIS, and Ember.js."
  },
  {
    project: "196 / Sunday Dinner",
    proof:
      "I created repeatable onboarding, facilitation, hosting, documentation, and continuity practices for recurring gatherings."
  },
  {
    project: "KC Spaces Fund",
    proof:
      "I supported a 2020 mutual-aid campaign through behind-the-scenes web infrastructure, theme, donation, application, and sign-up work."
  },
  {
    project: "KC Town Hall",
    proof:
      "I co-led long-horizon redevelopment planning and public-benefit documentation tied to a municipal funding recommendation."
  },
  {
    project: "Source-Backed Team Memory",
    proof:
      "I am developing a bounded lab method for decision lineage, onboarding context, meeting synthesis, and human-reviewed AI workflows."
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
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding
          materials, documentation systems, launch support, and durable
          handoffs.
        </p>
      </div>
      <section
        aria-labelledby="role-fit-at-a-glance"
        className="mt-10 border-y border-jb-ink/15 py-7"
      >
        <p className="text-sm font-semibold uppercase text-jb-blue">
          Role fit at a glance
        </p>
        <div className="mt-5 grid gap-7 md:grid-cols-3">
          <div>
            <h2 id="role-fit-at-a-glance" className="text-xl font-semibold text-jb-ink">
              Where I enter
            </h2>
            <p className="mt-3 leading-7 text-jb-ink/76">
              A public-facing project has multiple stakeholders, consequential
              details, and useful work already emerging, but no shared operating
              structure yet.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-jb-ink">What I coordinate</h2>
            <p className="mt-3 leading-7 text-jb-ink/76">
              I coordinate requirements, owners, dependencies, status, risks,
              decisions, documentation, launch work, and follow-through.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-jb-ink">
              What teams can use afterward
            </h2>
            <p className="mt-3 leading-7 text-jb-ink/76">
              Teams leave with clearer plans, current records, maintainable
              workflows, public guidance, and handoff materials that keep the
              work moving.
            </p>
          </div>
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
