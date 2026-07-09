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

const roleFitProofRows = [
  {
    need: "Coordinate delivery across projects",
    proof: "HJE, FairRentNYC, CallNYC",
    evidence:
      "Work pages show implementation, civic documentation, and prototype launch support."
  },
  {
    need: "Build operating processes that scale",
    proof: "HJE, FairRentNYC, Source-Backed Team Memory",
    evidence:
      "Workflow maps, decision records, source maps, and repeatable documentation patterns."
  },
  {
    need: "Surface risks early",
    proof: "FairRentNYC, CallNYC, HJE",
    evidence:
      "Known / Open / Protected boundaries, public-safety notes, archived/unofficial disclaimers, and careful contribution language."
  },
  {
    need: "Onboard new people",
    proof: "196 / Sunday Dinner, Source-Backed Team Memory, HJE",
    evidence:
      "Onboarding rhythms, participation infrastructure, handoff materials, and documentation patterns."
  },
  {
    need: "Write handbooks, runbooks, and operating docs",
    proof: "FairRentNYC, Source-Backed Team Memory, THICK ARTS",
    evidence:
      "Source maps, decision logs, public guidance, reusable templates, and documentation architecture."
  },
  {
    need: "Report honestly on what is and is not working",
    proof: "This portfolio",
    evidence:
      "Knowledge-bank claim discipline, public-safety boundaries, noindex staging, and protected-material omissions."
  }
];

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
  },
  {
    href: "/work/196-sunday-dinner",
    title: "196 / Sunday Dinner",
    description:
      "Onboarding, hosting, facilitation, documentation, and continuity systems."
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
          teams stay focused, unblocked, documented, and shipping: planning
          rhythms, delivery tracking, risk notes, decision frameworks,
          onboarding guides, handbooks, runbooks, reporting, retrospectives, and
          durable handoffs.
        </p>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          This work is strongest where the mission is real, the stakeholders are
          many, and the team needs enough structure to stay focused without
          overengineering the process.
        </p>
      </div>
      <section className="mt-10">
        <h2 className="text-3xl font-semibold text-jb-ink">
          Role fit for Technical Operations Manager
        </h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {roleFitBullets.map((item) => (
            <li
              className="rounded-lg border border-jb-ink/12 bg-jb-paper p-4 leading-7 text-jb-ink/78"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="text-3xl font-semibold text-jb-ink">Role-fit proof map</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {roleFitProofRows.map((row) => (
            <JBCard key={row.need}>
              <p className="text-sm font-semibold uppercase text-jb-blue">
                Operational need
              </p>
              <h3 className="mt-2 text-xl font-semibold text-jb-ink">{row.need}</h3>
              <p className="mt-5 text-sm font-semibold uppercase text-jb-green">
                Jamie proof
              </p>
              <p className="mt-2 leading-7 text-jb-ink/76">{row.proof}</p>
              <p className="mt-5 text-sm font-semibold uppercase text-jb-brown">
                Public evidence
              </p>
              <p className="mt-2 leading-7 text-jb-ink/76">{row.evidence}</p>
            </JBCard>
          ))}
        </div>
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
      <section className="mt-10 rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">First 30 days</h2>
        <p className="mt-4 text-lg leading-8 text-jb-ink/78">
          In a first month, I listen for how the team currently plans, tracks
          delivery, reports status, escalates risk, documents decisions,
          onboards people, and learns from retrospectives. I look for the
          smallest changes that make the work clearer without adding process for
          its own sake.
        </p>
      </section>
      <section className="mt-10 rounded-lg border border-jb-green/30 bg-jb-green/[0.08] p-6">
        <p className="text-xl font-semibold leading-8 text-jb-ink">
          I work well in ambiguity, but I do not romanticize it. My pattern is
          to name what is known, what is open, what needs a decision, and what
          should remain protected, then build the lightest structure that lets
          the team act.
        </p>
      </section>
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
