import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

const roleFitBullets = [
  "Coordinate delivery across multiple concurrent projects from concept through public launch.",
  "Surface risks early and turn recurring blockers into process improvements.",
  "Build planning cycles, decision frameworks, status updates, meeting rituals, and retrospectives.",
  "Coordinate across product, engineering, design, communications, legal, security, contracts, and leadership contexts.",
  "Write handbooks, runbooks, onboarding guides, source maps, decision records, and adoption materials people actually use.",
  "Report honestly on team health, project status, operational metrics, and what is or is not working.",
  "Improve working systems quarter over quarter without overengineering."
];

const relevantProofLinks = [
  {
    href: "/work/harry-j-epstein",
    title: "Harry J. Epstein Company",
    description:
      "Legacy operations, e-commerce, implementation, and stakeholder translation."
  },
  {
    href: "/work/fair-rent-nyc",
    title: "FairRentNYC / Commercial Rent Stabilization",
    description:
      "Civic documentation, coalition memory, decision records, and source maps."
  },
  {
    href: "/work/callnyc",
    title: "CallNYC.org",
    description:
      "Open-data translation into archived resident-facing guidance."
  },
  {
    href: "/lab/source-backed-team-memory",
    title: "Source-Backed Team Memory",
    description:
      "Decision lineage, onboarding context, and human-reviewed knowledge systems."
  }
];

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
      <section className="mt-10 rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">
          Role fit for Technical Operations Manager
        </h2>
        <ul className="mt-5 grid gap-3 text-jb-ink/76 md:grid-cols-2">
          {roleFitBullets.map((item) => (
            <li className="flex gap-3" key={item}>
              <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-blue" />
              <span>{item}</span>
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
        <h2 className="text-2xl font-semibold text-jb-ink">Relevant proof</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {relevantProofLinks.map((proof) => (
            <Link
              className="rounded-lg border border-jb-ink/12 bg-jb-paper p-5 hover:border-jb-blue/40 hover:bg-jb-sky/10"
              href={proof.href as Route}
              key={proof.href}
            >
              <h3 className="text-lg font-semibold text-jb-blue">{proof.title}</h3>
              <p className="mt-2 text-sm leading-6 text-jb-ink/72">
                {proof.description}
              </p>
            </Link>
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
