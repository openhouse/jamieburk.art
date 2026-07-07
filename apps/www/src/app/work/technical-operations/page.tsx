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
    title: "Delivery coordination",
    items: [
      "Planning rhythms and action trackers",
      "Cross-functional coordination across technical and nontechnical stakeholders",
      "Risk surfacing before launch or handoff",
      "Stakeholder updates that make status, blockers, and next steps clear"
    ]
  },
  {
    title: "Operating documentation",
    items: [
      "Decision records and source maps",
      "Handbooks, runbooks, templates, and reusable checklists",
      "Public guidance and internal working memory",
      "Documentation systems that survive beyond a meeting or launch"
    ]
  },
  {
    title: "Onboarding and handoff",
    items: [
      "Contributor onboarding materials",
      "Resident-artist and community continuity systems",
      "Implementation notes for legacy business workflows",
      "Durable handoffs for future maintainers and operators"
    ]
  },
  {
    title: "Public-facing launch support",
    items: ["CallNYC", "WOWList", "HJE e-commerce", "Public-safe coalition materials"]
  },
  {
    title: "Source-backed team memory",
    items: [
      "Structured meeting memory",
      "Synthesized decisions and open questions",
      "Human-reviewed AI-assisted notes",
      "Privacy and trust checks before anything becomes shared memory"
    ]
  },
  {
    title: "Tools and technical environments",
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
      "Open-data workflows"
    ]
  }
];

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding materials,
          stakeholder updates, documentation systems, launch support, and durable
          handoffs.
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
