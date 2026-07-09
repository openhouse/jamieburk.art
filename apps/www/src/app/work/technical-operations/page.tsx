import type { Metadata } from "next";
import Link from "next/link";
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

const roleFit = [
  "Coordinating delivery across multiple concurrent projects from concept through public launch.",
  "Tracking status, surfacing risks early, and turning recurring blockers into process improvements.",
  "Building planning cycles, sprint rituals, decision frameworks, structured meetings, status reporting, and post-launch retrospectives.",
  "Coordinating across product, engineering, design, communications, legal, security, contracts, leadership, and external stakeholders.",
  "Onboarding new collaborators with practical guides, context, and first-week support.",
  "Writing and maintaining handbooks, runbooks, onboarding guides, source maps, decision records, and operating documentation people actually use.",
  "Reporting honestly on team health, project status, operational metrics, and what is or is not working.",
  "Improving working systems over time without overengineering."
] as const;

const relevantProof = [
  {
    title: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein",
    summary:
      "Legacy operations, e-commerce, implementation, stakeholder translation, and operating workflow improvement."
  },
  {
    title: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc",
    summary:
      "Civic documentation, coalition memory, decision records, source maps, and careful public/private boundaries."
  },
  {
    title: "CallNYC.org",
    href: "/work/callnyc",
    summary:
      "Civic open-data translation into resident-facing guidance with clear unofficial and archived boundaries."
  },
  {
    title: "WOWList.org",
    href: "/work/wowlist",
    summary:
      "Community platform operations and organizer-facing distribution workflows."
  },
  {
    title: "Source-Backed Team Memory",
    href: "/lab/source-backed-team-memory",
    summary:
      "Decision lineage, onboarding context, meeting synthesis, and human-reviewed knowledge systems."
  }
] as const;

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
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <h2 className="text-3xl font-semibold text-jb-ink">
          Role fit for Technical Operations Manager
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-jb-ink/76">
          Jamie has direct experience with the operating backbone this role
          requires.
        </p>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {roleFit.map((item) => (
            <li className="flex gap-3 text-sm leading-6 text-jb-ink/76" key={item}>
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-jb-ochre" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm font-semibold text-jb-green">
          This page is written for roles that need someone to keep a small,
          high-output team focused, unblocked, documented, and improving over
          time.
        </p>
      </section>
      <section className="mt-10">
        <h2 className="text-3xl font-semibold text-jb-ink">Relevant proof</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {relevantProof.map((proof) => (
            <Link
              className="rounded-lg border border-jb-ink/12 bg-jb-paper p-4 hover:border-jb-blue"
              href={proof.href}
              key={proof.href}
            >
              <h3 className="text-lg font-semibold text-jb-blue">{proof.title}</h3>
              <p className="mt-3 text-sm leading-6 text-jb-ink/72">{proof.summary}</p>
            </Link>
          ))}
        </div>
      </section>
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
