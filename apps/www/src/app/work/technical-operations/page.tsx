import type { Metadata } from "next";
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

const sections = [
  {
    title: "Delivery coordination",
    body:
      "Coordinate work across multiple projects, clarify ownership, surface risks early, and keep teams oriented from concept through launch."
  },
  {
    title: "Planning cycles and status rhythms",
    body:
      "Create planning cycles, decision frameworks, action trackers, and meeting rhythms that make work easier to prioritize and continue."
  },
  {
    title: "Risk surfacing and unblocking",
    body:
      "Name unclear requirements, stalled dependencies, missing source context, review needs, and adoption risks early enough for the team to act."
  },
  {
    title: "Cross-team dependencies",
    body:
      "Translate dependencies across product, engineering, design, security, legal, communications, contracts, leadership, and external stakeholders."
  },
  {
    title: "Onboarding and ramp support",
    body:
      "Write onboarding guides, context pages, templates, and handoff materials so new contributors can ramp quickly and the team does not depend on private memory."
  },
  {
    title: "Handbooks, runbooks, and operating documentation",
    body:
      "Turn repeated decisions and workflows into documentation people can actually use: handbooks, runbooks, source maps, status templates, and decision records."
  },
  {
    title: "Team health, reporting, and operational metrics",
    body:
      "Prepare clear updates on project status, team health, operational risks, delivery blockers, adoption signals, and what is or is not working."
  },
  {
    title: "Retrospectives and continuous improvement",
    body:
      "Use launches, meetings, and project transitions to capture what changed, what was learned, what needs repair, and what should become the next operating habit."
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

const proofLinks = [
  ["Harry J. Epstein Company", "/work/harry-j-epstein"],
  ["FairRentNYC / Commercial Rent Stabilization", "/work/fair-rent-nyc"],
  ["CallNYC.org", "/work/callnyc"],
  ["Source-Backed Team Memory", "/lab/source-backed-team-memory"],
  ["196 / Sunday Dinner", "/work/196-sunday-dinner"],
  ["WOWList", "/work/wowlist"]
] as const;

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          I build the operating backbone that helps public-facing technical
          teams stay focused, unblocked, accountable, and able to hand off work.
          That means delivery coordination, planning rhythms, decision logs,
          action trackers, onboarding materials, handbooks, runbooks, status
          reporting, risk notes, retrospectives, launch support, and durable
          handoffs.
        </p>
      </div>
      <section className="mt-10 border-y border-jb-ink/12 py-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr]">
          <div>
            <h2 className="text-2xl font-semibold text-jb-ink">
              Role fit for Technical Operations Manager
            </h2>
            <ul className="mt-5 space-y-3 text-jb-ink/76">
              {roleFitBullets.map((bullet) => (
                <li className="flex gap-3" key={bullet}>
                  <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-green" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-jb-ink">Proof links</h3>
            <ul className="mt-4 space-y-3">
              {proofLinks.map(([label, href]) => (
                <li key={href}>
                  <Link className="font-semibold text-jb-blue hover:text-jb-green" href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <JBCard key={section.title}>
            <h2 className="text-2xl font-semibold text-jb-ink">{section.title}</h2>
            <p className="mt-4 leading-7 text-jb-ink/76">{section.body}</p>
          </JBCard>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-jb-ink">Selected proof</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {technicalOperationsProofRows.map((row) => (
            <JBCard key={row.capability}>
              <h3 className="text-xl font-semibold text-jb-ink">{row.capability}</h3>
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
      <p className="mt-10 max-w-3xl text-xl leading-8 text-jb-ink/76">
        For public technology teams, the work is not only shipping tools. It is
        building the practices that let a team keep shipping responsibly: clear
        decisions, visible risks, durable handoffs, and documentation people
        actually use.
      </p>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
