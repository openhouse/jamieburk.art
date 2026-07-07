import type { Metadata } from "next";
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

const sections = [
  {
    title: "Planning and status rhythms",
    description:
      "Planning cycles, status reporting, decision logs, and action trackers that help teams see what changed and what happens next.",
    items: [
      "Turn ambiguous goals into owner-ready next actions",
      "Maintain status rhythms that make blockers visible",
      "Connect planning cycles to decisions, handoffs, and follow-through"
    ]
  },
  {
    title: "Risk and decision frameworks",
    description:
      "Clear ways to separate what is known, blocked, unresolved, waiting for review, or protected.",
    items: [
      "Surface risks early instead of burying them in meeting memory",
      "Separate decisions, open questions, assumptions, and protected context",
      "Use Known / Open / Protected boundaries on sensitive public-facing work"
    ]
  },
  {
    title: "Onboarding, handbooks, and runbooks",
    description:
      "Reusable materials that reduce repeated explanation and help new contributors enter the work.",
    items: [
      "Write handbooks, templates, onboarding guides, and runbooks",
      "Preserve decision lineage so handoffs do not lose the why",
      "Turn recurring questions into practical team guidance"
    ]
  },
  {
    title: "Cross-team coordination and launch support",
    description:
      "Implementation support across technical and nontechnical stakeholders, especially where the work becomes public.",
    items: [
      "Coordinate small releases across web, content, operations, and stakeholders",
      "Translate technical constraints into plain next steps",
      "Support QA/UAT, launch, adoption, maintenance, and post-launch adjustment"
    ]
  },
  {
    title: "Retrospectives, metrics, and team health",
    description:
      "Feedback loops that let operating systems improve as evidence, constraints, and people change.",
    items: [
      "Run practical retrospectives and turn lessons into process updates",
      "Track useful operational signals without inventing vanity metrics",
      "Protect team capacity by making ownership, risk, and review needs explicit"
    ]
  },
  {
    title: "Tools and technical environments",
    description:
      "Technical fluency used in service of public-facing tools, implementation plans, documentation systems, and durable handoffs.",
    items: [
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
      "API / data-product requirements"
    ]
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
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding materials,
          handbooks, runbooks, retrospectives, status reporting, launch support,
          and durable handoffs.
        </p>
        <p className="mt-5 text-lg leading-8 text-jb-ink/72">
          The repeated pattern is delivery memory: what was decided, what is
          blocked, what needs to happen next, who needs to know, and how the team
          keeps moving after the meeting ends.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <JBCard key={section.title}>
            <h2 className="text-2xl font-semibold text-jb-ink">{section.title}</h2>
            <p className="mt-3 text-sm leading-6 text-jb-ink/72">
              {section.description}
            </p>
            <ul className="mt-5 space-y-3 text-jb-ink/76">
              {section.items.map((item) => (
                <li className="flex gap-3" key={item}>
                  <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                  <span>{item}</span>
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
