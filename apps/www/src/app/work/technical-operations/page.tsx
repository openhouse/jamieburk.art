import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

const roleFitSections = [
  {
    title: "Operating backbone",
    summary:
      "Planning rhythms, decision logs, action trackers, operating documentation, and handoff materials that help teams keep moving.",
    bullets: [
      "Turn ambiguous goals into owner-ready next actions.",
      "Maintain decision logs, action trackers, and source-backed records.",
      "Create practical, low-overhead systems teams can keep using."
    ]
  },
  {
    title: "Delivery coordination",
    summary:
      "Cross-functional coordination across technical and nontechnical stakeholders, with visible next steps and launch support.",
    bullets: [
      "Coordinate small releases across web, content, operations, and stakeholders.",
      "Translate technical constraints into plain next steps.",
      "Support launch, adoption, maintenance, and post-launch adjustment."
    ]
  },
  {
    title: "Risk and status visibility",
    summary:
      "Honest reporting about what is known, blocked, unresolved, or waiting for review.",
    bullets: [
      "Surface risks early instead of burying them in meeting memory.",
      "Separate decisions, open questions, assumptions, and protected context.",
      "Use Known / Open / Protected boundaries on sensitive public-facing work."
    ]
  },
  {
    title: "Onboarding, handbooks, and runbooks",
    summary:
      "Reusable materials that reduce repeated explanation and help new contributors enter the work.",
    bullets: [
      "Write onboarding guides, handbooks, templates, source maps, and runbooks.",
      "Preserve decision lineage so handoffs do not lose the why.",
      "Turn recurring questions into practical team guidance."
    ]
  },
  {
    title: "Retrospectives, metrics, and team health",
    summary:
      "Feedback loops that help the operating system improve as people, evidence, and constraints change.",
    bullets: [
      "Run practical retrospectives and turn lessons into process updates.",
      "Track useful operating signals without inventing vanity metrics.",
      "Protect team capacity by making ownership, risk, and review needs explicit."
    ]
  },
  {
    title: "Technical environments",
    summary:
      "Technical fluency used in service of public-facing tools, implementation plans, documentation systems, and durable handoffs.",
    bullets: [
      "JavaScript / TypeScript",
      "Node.js",
      "React / Next.js",
      "Ember.js",
      "Python / Django",
      "SQL",
      "Git / GitHub",
      "Docker / Dokku",
      "QGIS",
      "Open-data workflows",
      "Dataset documentation",
      "API / data-product requirements",
      "Human-reviewed AI-assisted documentation"
    ]
  }
] as const;

const representativeProof = [
  { href: "/work/harry-j-epstein", label: "HJE operations modernization" },
  { href: "/work/fair-rent-nyc", label: "FairRentNYC campaign memory" },
  { href: "/work/callnyc", label: "CallNYC civic-data translation" },
  { href: "/lab/source-backed-team-memory", label: "Source-Backed Team Memory" }
] as const;

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          I build the operating backbone teams need to stay focused, unblocked,
          accountable, and able to hand off work.
        </p>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, small-business, cultural, and public-facing technical
          environments, I turn ambiguous goals into planning rhythms, decision
          logs, action trackers, onboarding materials, handbooks, runbooks,
          status updates, retrospectives, launch support, and durable handoffs.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {roleFitSections.map((section) => (
          <JBCard key={section.title}>
            <h2 className="text-2xl font-semibold text-jb-ink">{section.title}</h2>
            <p className="mt-3 leading-7 text-jb-ink/76">{section.summary}</p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-jb-ink/76">
              {section.bullets.map((bullet) => (
                <li className="flex gap-3" key={bullet}>
                  <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </JBCard>
        ))}
      </div>
      <div className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
        <h2 className="text-2xl font-semibold text-jb-ink">
          Representative proof
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          {representativeProof.map((proof) => (
            <li key={proof.href}>
              <Link className="text-jb-blue hover:text-jb-green" href={proof.href}>
                {proof.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
