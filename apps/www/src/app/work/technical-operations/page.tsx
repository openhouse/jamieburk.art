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
    "Proof page for Jamie Burkart's technical operations, delivery coordination, documentation, onboarding, implementation, and public-facing systems work.",
  path: "/work/technical-operations"
});

const teamEaseItems = [
  "Coordinate delivery across concurrent projects.",
  "Track status, dependencies, and risks before they become blockers.",
  "Build planning rhythms, meeting practices, decision logs, and status updates.",
  "Write handbooks, runbooks, onboarding guides, source maps, and handoff documentation.",
  "Translate between technical and nontechnical stakeholders.",
  "Support launch, adoption, UAT / QA, and post-launch maintenance.",
  "Report honestly on what is working, what is not working, and what needs a decision.",
  "Improve operating systems over time without overengineering the team."
];

const roleFitRows = [
  {
    need: "Coordinate delivery across concurrent work",
    proof: "Harry J. Epstein Company, CallNYC.org, WOWList.org",
    line:
      "Translated stakeholder needs into requirements, launch plans, public tools, and handoff documentation."
  },
  {
    need: "Surface risks and clarify blockers",
    proof: "FairRentNYC / Commercial Rent Stabilization, KC Town Hall",
    line:
      "Made assumptions, dependencies, open questions, ownership, and decision points visible before they became blockers."
  },
  {
    need: "Write operating documentation people use",
    proof: "FairRentNYC, 196 / Sunday Dinner, Source-Backed Team Memory",
    line:
      "Created decision records, source maps, action trackers, onboarding materials, and continuity documents that help people re-enter the work."
  },
  {
    need: "Onboard people into context",
    proof: "196 / Sunday Dinner, Source-Backed Team Memory, Harry J. Epstein Company",
    line:
      "Built practical invitation, onboarding, continuity, and documentation patterns so new collaborators can understand norms, decisions, and next steps."
  },
  {
    need: "Keep public-facing work moving toward launch",
    proof: "CallNYC.org, WOWList.org, Harry J. Epstein Company",
    line:
      "Built or supported public-facing systems where data, content, user needs, implementation details, and maintenance had to meet."
  },
  {
    need: "Improve systems without overengineering",
    proof: "THICK ARTS, Harry J. Epstein Company, CallNYC.org, FairRentNYC",
    line:
      "Started with the smallest useful structure, tested it in real conditions, and left behind maintainable workflows."
  }
];

const evidenceLinks = [
  { href: "/work/harry-j-epstein", label: "Harry J. Epstein Company" },
  { href: "/work/fair-rent-nyc", label: "FairRentNYC / Commercial Rent Stabilization" },
  { href: "/work/callnyc", label: "CallNYC.org" },
  { href: "/work/wowlist", label: "WOWList.org" },
  { href: "/work/196-sunday-dinner", label: "196 Artists Residency / Sunday Dinner" },
  { href: "/lab/source-backed-team-memory", label: "Source-Backed Team Memory" },
  { href: "/resume", label: "Resume" }
];

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to coordinate
          delivery, track status, surface risks early, document decisions,
          onboard people, and keep work moving from ambiguity toward public
          launch, adoption, and durable handoff.
        </p>
        <p className="mt-5 leading-8 text-jb-ink/76">
          This page is meant for hiring managers, referrers, and technical /
          civic teams evaluating my fit for technical operations, product
          operations, implementation, business analysis, and knowledge-systems
          roles.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-jb-ink">
          What I make easier for teams
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {teamEaseItems.map((item) => (
            <li
              className="rounded-lg border border-jb-ink/12 bg-jb-paper p-4 text-jb-ink/78"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-semibold text-jb-ink">Role-fit proof map</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {roleFitRows.map((row) => (
            <JBCard key={row.need}>
              <p className="text-sm font-semibold uppercase text-jb-blue">Need</p>
              <h3 className="mt-2 text-2xl font-semibold text-jb-ink">{row.need}</h3>
              <p className="mt-4 text-sm font-semibold uppercase text-jb-green">
                Proof
              </p>
              <p className="mt-2 leading-7 text-jb-ink/76">{row.proof}</p>
              <p className="mt-4 text-sm font-semibold uppercase text-jb-blue">
                Operating line
              </p>
              <p className="mt-2 leading-7 text-jb-ink/76">{row.line}</p>
            </JBCard>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-semibold text-jb-ink">Selected proof signals</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
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
      </section>

      <section className="mt-14 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <h2 className="text-3xl font-semibold text-jb-ink">
          Representative evidence
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {evidenceLinks.map((link) => (
            <Link
              className="rounded-lg border border-jb-ink/12 bg-jb-paper px-4 py-2 text-sm font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
              href={link.href as Route}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-6 leading-7 text-jb-ink/76">
          The public pages summarize the defensible evidence. Private records,
          unedited meeting records, internal analytics, legal-review context,
          stakeholder lists, customer data, and unapproved source material stay
          offline.
        </p>
      </section>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
