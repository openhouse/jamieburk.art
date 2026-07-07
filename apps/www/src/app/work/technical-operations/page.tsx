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
    items: [
      "I turn ambiguous goals and scattered context into requirements, user stories, acceptance criteria, planning rhythms, decision records, action trackers, stakeholder updates, and durable handoffs.",
      "I surface risks early by making open questions, dependencies, ownership, and next actions visible.",
      "I treat documentation as operating infrastructure, not clerical aftercare."
    ]
  },
  {
    title: "Delivery coordination",
    items: [
      "I coordinate across technical and nontechnical stakeholders without flattening either side.",
      "I support public-facing launches with requirements, quality assurance (QA), user acceptance testing (UAT), adoption materials, and follow-up.",
      "I report status honestly so teams can stay focused, unblocked, and shipping."
    ]
  },
  {
    title: "Onboarding and team memory",
    items: [
      "I write operating documents teams actually use: handbooks, runbooks, onboarding guides, action trackers, source maps, and weekly updates.",
      "I synthesize meetings into decision records, risk notes, open questions, and stakeholder follow-up.",
      "I preserve enough context that someone can join later and understand what happened, why it matters, what source supports it, and what comes next."
    ]
  },
  {
    title: "Public-facing systems",
    items: [
      "Harry J. Epstein Company e-commerce and operations handoff systems",
      "FairRentNYC / NYC Artist Coalition campaign-memory and provenance infrastructure",
      "CallNYC resident-facing open-data guidance",
      "WOWList followable event-community workflows across 35+ active city scenes",
      "196 / Sunday Dinner onboarding, hosting, and continuity systems"
    ]
  },
  {
    title: "Tools and environments",
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
      "AI evals and human-in-the-loop documentation"
    ]
  },
  {
    title: "Role fit",
    items: [
      "Technical Operations Manager",
      "Technical Project Manager",
      "Product Operations Manager",
      "Implementation Lead",
      "Business Analyst",
      "Civic Technology Program Manager",
      "Knowledge Systems / Documentation Lead"
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
          I build the operating backbone teams need to plan, coordinate,
          document, report, onboard, and ship. Across civic, cultural,
          small-business, and public-facing technical environments, my work
          turns ambiguous goals and scattered context into requirements, user
          stories, acceptance criteria, planning rhythms, decision records,
          action trackers, onboarding materials, stakeholder updates, launch
          support, and durable handoffs.
        </p>
        <p className="mt-5 text-lg leading-8 text-jb-ink/72">
          This is public-sector-adjacent civic work, public-facing tools,
          coalition coordination, source maps, public-data framing, and
          documentation systems. It does not claim formal government hiring,
          procurement, budget, or civil-service authority.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <JBCard key={section.title}>
            <h2 className="text-2xl font-semibold text-jb-ink">{section.title}</h2>
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
