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
    title: "Operating backbone",
    description:
      "Planning rhythms, decision logs, action trackers, operating documentation, and handoff materials that help teams keep moving.",
    items: [
      "Build planning rhythms that turn ambiguous goals into next actions",
      "Maintain decision logs, action trackers, and source-backed records",
      "Create practical, low-overhead operating systems teams can keep using"
    ]
  },
  {
    title: "Delivery coordination",
    description:
      "Cross-functional coordination across technical and nontechnical stakeholders, with visible next steps and launch support.",
    items: [
      "Coordinate small releases across web, content, operations, and stakeholders",
      "Translate technical constraints into plain next steps",
      "Support launch, adoption, maintenance, and post-launch adjustment"
    ]
  },
  {
    title: "Risk and status visibility",
    description:
      "Honest reporting about what is known, blocked, unresolved, or waiting for review.",
    items: [
      "Surface risks early instead of burying them in meeting memory",
      "Separate decisions, open questions, and protected context",
      "Report status in language hiring managers, staff, and partners can scan"
    ]
  },
  {
    title: "Team documentation",
    description:
      "Handbooks, runbooks, source maps, public guidance, and working-memory systems that reduce repeated explanation.",
    items: [
      "Write handbooks, templates, onboarding guides, and runbooks",
      "Synthesize meetings into decisions, action items, and owner-ready next steps",
      "Keep documentation connected to real delivery, not separate from it"
    ]
  },
  {
    title: "Onboarding and handoffs",
    description:
      "Materials that help new contributors understand the work without needing every private conversation replayed.",
    items: [
      "Create onboarding context for new hires, collaborators, and contributors",
      "Preserve decision lineage so handoffs do not lose the why",
      "Turn recurring questions into reusable guidance"
    ]
  },
  {
    title: "Cross-functional coordination",
    description:
      "Public-facing work often sits between policy, product, engineering, operations, and community context.",
    items: [
      "Coordinate across technical and nontechnical stakeholders",
      "Translate open-data, civic, operational, and product context",
      "Keep collective work credited carefully and claims bounded"
    ]
  },
  {
    title: "Retros and continuous improvement",
    description:
      "A team operating system should improve over time as evidence, constraints, and people change.",
    items: [
      "Run practical retrospectives and turn lessons into process updates",
      "Improve workflows without overengineering the team",
      "Leave behind materials that make maintenance easier"
    ]
  },
  {
    title: "Documentation and working memory",
    description:
      "The repeated pattern is delivery memory: what was decided, what is blocked, what happens next, who needs to know, and how the team keeps moving after the meeting ends.",
    items: [
      "Source maps",
      "Public guidance",
      "Resource libraries",
      "Handbooks / templates",
      "Meeting synthesis",
      "Decision records"
    ]
  },
  {
    title: "Tools and technical environments",
    description:
      "I use technical tools to build public-facing tools, implementation plans, documentation systems, and durable handoffs.",
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
  },
  {
    title: "Public-sector / civic delivery fit",
    description:
      "This work is strongest where public-facing systems need clarity, privacy judgment, implementation discipline, and plain-language continuity.",
    items: [
      "Open-data translation and resident-facing public guidance",
      "Status reporting, risk surfacing, and stakeholder updates",
      "Documentation practices that protect sensitive context while making work usable"
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
          runbooks, status updates, launch support, reporting habits, and durable
          handoffs.
        </p>
        <p className="mt-5 text-lg leading-8 text-jb-ink/72">
          The repeated pattern is not simply documentation. It is delivery
          memory: what was decided, what is blocked, what needs to happen next,
          who needs to know, and how the team can keep moving after the meeting
          ends.
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
