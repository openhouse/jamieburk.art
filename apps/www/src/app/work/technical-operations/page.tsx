import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
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
    href: "/work/harry-j-epstein",
    proof:
      "long-running e-commerce, analytics, marketing, content, and operations modernization in a legacy business."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc",
    proof:
      "shared campaign memory, decision records, source maps, action trackers, stakeholder follow-up, and public/private boundary management."
  },
  {
    project: "CallNYC",
    href: "/work/callnyc",
    proof:
      "open-data translation into resident-facing guidance after a New York City Council civic-data hackathon."
  },
  {
    project: "WOWList",
    href: "/work/wowlist",
    proof:
      "public-facing community event distribution system using Python / Django, PostgreSQL / PostGIS, and Ember.js."
  },
  {
    project: "196 / Sunday Dinner",
    href: "/work/196-sunday-dinner",
    proof:
      "onboarding, facilitation, continuity, hosting rhythms, and documentation for recurring human systems."
  },
  {
    project: "KC Spaces Fund",
    href: undefined,
    proof:
      "behind-the-scenes digital infrastructure for a 2020 mutual-aid campaign supporting grassroots arts and culture spaces."
  },
  {
    project: "KC Town Hall",
    href: "/work/kc-town-hall",
    proof: "long-horizon project planning and public-benefit documentation."
  },
  {
    project: "Source-Backed Team Memory",
    href: "/lab/source-backed-team-memory",
    proof:
      "lab method for decision lineage, onboarding context, meeting synthesis, and human-reviewed AI workflows."
  }
];

const strongestProofs = [
  {
    href: "/work/harry-j-epstein",
    label: "Private-sector implementation",
    proof: "Legacy e-commerce and operations modernization, with careful contribution language for a period of 2x revenue growth."
  },
  {
    href: "/work/callnyc",
    label: "Civic product delivery",
    proof: "An independent CouncilStat follow-on that translated public data into resident-facing issue pathways and guidance."
  },
  {
    href: "/work/fair-rent-nyc",
    label: "Coalition operations",
    proof: "Shared campaign memory, source mapping, decision context, and public/private boundary management."
  }
];

function FullRoleMap() {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
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
        <h2 className="text-2xl font-semibold text-jb-ink">Full proof map</h2>
        <dl className="mt-5 space-y-4">
          {proofMap.map((item) => (
            <div key={item.project}>
              <dt className="font-semibold text-jb-ink">
                {item.href ? (
                  <Link className="text-jb-blue hover:text-jb-green" href={item.href as Route}>
                    {item.project}
                  </Link>
                ) : (
                  item.project
                )}
              </dt>
              <dd className="mt-1 leading-7 text-jb-ink/72">{item.proof}</dd>
            </div>
          ))}
        </dl>
      </JBCard>
    </section>
  );
}

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
        <h1 className="text-balance text-4xl font-bold text-jb-ink sm:text-5xl">
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
      <section className="mt-10" aria-labelledby="strongest-proof-heading">
        <h2 className="text-2xl font-semibold text-jb-ink" id="strongest-proof-heading">
          Strongest role-fit proof
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {strongestProofs.map((item) => (
            <Link
              className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5 hover:border-jb-blue/40"
              href={item.href as Route}
              key={item.href}
            >
              <span className="font-semibold text-jb-blue">{item.label}</span>
              <span className="mt-2 block text-sm leading-6 text-jb-ink/72">{item.proof}</span>
            </Link>
          ))}
        </div>
      </section>
      <details className="mt-8 lg:hidden">
        <summary className="cursor-pointer font-semibold text-jb-blue hover:text-jb-green">
          Full team-operations and project map
        </summary>
        <div className="mt-5"><FullRoleMap /></div>
      </details>
      <div className="mt-10 hidden lg:block"><FullRoleMap /></div>
      <details className="mt-8 lg:hidden">
        <summary className="cursor-pointer font-semibold text-jb-blue hover:text-jb-green">
          More capability evidence
        </summary>
        <div className="mt-5 grid gap-5">
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
      </details>
      <div className="mt-10 hidden gap-5 md:grid-cols-2 lg:grid">
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
