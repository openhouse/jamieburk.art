import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const teamNeeds = [
  "Coordinate delivery across multiple concurrent projects from concept through public launch.",
  "Surface risks early and turn recurring blockers into process improvements.",
  "Build planning rhythms, decision frameworks, weekly updates, and retrospectives.",
  "Coordinate across product, engineering, design, communications, legal, security, contracts, leadership, and partner contexts.",
  "Write handbooks, runbooks, onboarding guides, source maps, decision records, and adoption materials people actually use.",
  "Report honestly on team health, project status, operational metrics, and what is or is not working.",
  "Improve working systems quarter over quarter without overengineering."
];

const relevantProof = [
  {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein",
    proof:
      "Legacy operations, e-commerce, implementation, analytics, content, and stakeholder translation."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc",
    proof:
      "Civic documentation, coalition memory, decision records, action trackers, source maps, and public/internal boundaries."
  },
  {
    project: "CallNYC.org",
    href: "/work/callnyc",
    proof:
      "Open-data translation into archived resident-facing guidance."
  },
  {
    project: "Source-Backed Team Memory",
    href: "/lab/source-backed-team-memory",
    proof:
      "Decision lineage, onboarding context, useful ideas, source-linked notes, and human-reviewed knowledge systems."
  }
] as const;

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
          I build the operating backbone that helps public-facing technical
          teams stay focused, unblocked, and shipping: planning rhythms,
          delivery tracking, risk notes, decision frameworks, onboarding guides,
          handbooks, runbooks, reporting, retrospectives, and durable handoffs.
        </p>
      </div>
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">
          Role fit for Technical Operations Manager
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
        <h2 className="text-3xl font-semibold text-jb-ink">Relevant proof</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {relevantProof.map((item) => (
            <JBCard key={item.project}>
              <h3 className="text-xl font-semibold text-jb-ink">{item.project}</h3>
              <p className="mt-3 leading-7 text-jb-ink/76">{item.proof}</p>
              <Link
                className="mt-4 inline-block font-semibold text-jb-blue hover:text-jb-green"
                href={item.href}
              >
                View proof
              </Link>
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
