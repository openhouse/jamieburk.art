import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { getClaimProjection } from "@/data/knowledge-bank/public";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const sharedDriveHandoff = getClaimProjection(
  "CLM-GDRIVE-PORTABLE-HANDOFF-PRACTICE",
  "technical-operations",
  "/work/technical-operations"
).text;

const archiveOverviewWorkflow = getClaimProjection(
  "CLM-GDRIVE-ARCHIVE-OVERVIEW-WORKFLOW",
  "technical-operations",
  "/work/technical-operations"
).text;

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
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein",
    proof:
      "long-running e-commerce, analytics, marketing, content, and operations modernization in a legacy business."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc",
    proof:
      "collaborative campaign memory, decision records, source maps, action trackers, and a collaborator-edited public-guidance working draft."
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
      "onboarding, facilitation, continuity, hosting rhythms, and a template-based 2023 residency acceptance and access handoff."
  },
  {
    project: "KC Spaces Fund",
    href: null,
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

const projectLabels: Record<string, string> = {
  "harry-j-epstein": "Harry J. Epstein case study",
  "fair-rent-nyc": "FairRentNYC case study",
  callnyc: "CallNYC case study",
  wowlist: "WOWList case study",
  "196-sunday-dinner": "196 / Sunday Dinner case study",
  "kc-town-hall": "KC Town Hall case study",
  "source-backed-team-memory": "Source-Backed Team Memory lab"
};

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

export default function TechnicalOperationsPage() {
  const proofHref = (project: string) =>
    project === "source-backed-team-memory"
      ? "/lab/source-backed-team-memory"
      : `/work/${project}`;

  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="break-words text-4xl font-bold text-jb-ink sm:text-5xl">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding
          materials, documentation systems, launch support, and durable
          handoffs.
        </p>
        <p className="mt-5 leading-7 text-jb-ink/72">
          {sharedDriveHandoff} {archiveOverviewWorkflow}
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
                <dt className="font-semibold text-jb-ink">
                  {item.href ? (
                    <Link className="text-jb-blue underline-offset-4 hover:underline" href={item.href as Route}>
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
                    {proof.shortWording ?? proof.publicWording}
                    {proof.relatedProjects[0] ? (
                      <>
                        {" "}
                        <Link
                          className="font-semibold text-jb-blue underline-offset-4 hover:underline"
                          href={proofHref(proof.relatedProjects[0]) as Route}
                        >
                          View {projectLabels[proof.relatedProjects[0]] ?? "project evidence"}
                        </Link>
                      </>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </JBCard>
        ))}
      </div>
      <section className="mt-12 max-w-4xl border-y border-jb-ink/15 py-8">
        <h2 className="text-3xl font-semibold text-jb-ink">
          Where I can help next
        </h2>
        <p className="mt-4 text-lg leading-8 text-jb-ink/76">
          I am ready to own the connective work between a consequential goal
          and a reliable launch: clarify emerging requirements, coordinate
          technical and business dependencies, surface risk, keep decisions
          inspectable, support implementation, and build the operating records
          that let a team continue with confidence.
        </p>
        <p className="mt-4 leading-7 text-jb-ink/72">
          That work can sit inside a public service, a growing product, a
          legacy business, or a cross-functional program. The common need is a
          practical operator who can translate across people and systems while
          keeping delivery moving.
        </p>
      </section>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
