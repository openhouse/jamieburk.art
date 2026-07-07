import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, delivery coordination, onboarding, reporting, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

const sections = [
  {
    title: "Delivery coordination",
    items: [
      "Coordinate work across multiple concurrent projects.",
      "Clarify owners, next steps, dependencies, and launch constraints.",
      "Surface risks early enough that the team still has choices."
    ]
  },
  {
    title: "Operating practices",
    items: [
      "Build planning rhythms, decision records, action trackers, status updates, retrospectives, and handoff practices.",
      "Improve working systems over time without creating a heavy parallel bureaucracy.",
      "Report clearly on what is working, what is blocked, and what needs a decision."
    ]
  },
  {
    title: "Cross-functional unblocking",
    items: [
      "Translate between technical and nontechnical stakeholders.",
      "Coordinate across product, design, engineering, legal, communications, contracts, civic partners, and leadership.",
      "Escalate clearly when a decision, dependency, or risk needs attention."
    ]
  },
  {
    title: "Documentation people use",
    items: [
      "Create handbooks, runbooks, onboarding guides, source maps, public guidance, templates, and reusable reference systems.",
      "Make decisions, sources, open questions, and next steps easier to find after the meeting.",
      "Leave behind materials that help new contributors enter the work without relying on oral history."
    ]
  }
];

const proofExamples = [
  {
    title: "Harry J. Epstein Company",
    text: "Legacy e-commerce, analytics, marketing, operational workflows, and handoffs for an 80+ year-old business."
  },
  {
    title: "FairRentNYC / Commercial Rent Stabilization",
    text: "Coalition memory, meeting synthesis, decision records, source maps, stakeholder follow-up, and public/internal boundaries."
  },
  {
    title: "CallNYC",
    text: "Public-facing civic tool translating constituent-services open data into resident-facing guidance."
  },
  {
    title: "196 Artists Residency / Sunday Dinner",
    text: "Onboarding, participation systems, hospitality, continuity documentation, and recurring operations."
  },
  {
    title: "Source-Backed Team Memory",
    text: "Lab method for decision lineage, onboarding context, and human-reviewed AI-assisted documentation workflows."
  }
];

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-4xl font-bold text-jb-ink sm:text-5xl">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to coordinate
          delivery, surface risks early, document decisions, onboard
          contributors, report clearly, and keep work moving from concept
          through launch.
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
      <section className="mt-12">
        <div className="jb-reading">
          <h2 className="text-3xl font-semibold text-jb-ink">
            Representative proof
          </h2>
          <p className="mt-4 leading-8 text-jb-ink/76">
            The work differs by setting, but the role pattern is consistent:
            Jamie clarifies goals, coordinates people and constraints,
            structures the record, supports launch or adoption, and leaves
            usable operating material behind.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {proofExamples.map((example) => (
            <div className="rounded-lg border border-jb-ink/12 bg-jb-paper p-4" key={example.title}>
              <h3 className="text-xl font-semibold text-jb-ink">{example.title}</h3>
              <p className="mt-2 leading-7 text-jb-ink/76">{example.text}</p>
            </div>
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
