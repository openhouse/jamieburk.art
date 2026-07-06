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
    title: "Operating systems built",
    items: [
      "HJE implementation and handoff systems",
      "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure",
      "196 / Sunday Dinner onboarding and continuity systems"
    ]
  },
  {
    title: "Delivery and launch",
    items: ["CallNYC", "WOWList", "HJE e-commerce"]
  },
  {
    title: "Documentation and working memory",
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
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding materials,
          documentation systems, launch support, and durable handoffs.
        </p>
        <section className="mt-8 border-y border-jb-ink/12 py-6">
          <h2 className="text-3xl font-bold text-jb-ink">
            Why this maps to Technical Operations
          </h2>
          <div className="mt-4 space-y-4 leading-8 text-jb-ink/76">
            <p>
              Technical Operations work is the operating backbone of a team: how
              work is planned, tracked, documented, reported, onboarded, handed
              off, and improved over time.
            </p>
            <p>
              Across civic, cultural, small-business, and public-facing technical
              environments, I have built the structures teams need to keep work
              moving: planning rhythms, decision records, action trackers,
              onboarding paths, runbooks, stakeholder updates, launch support,
              and durable handoffs.
            </p>
          </div>
        </section>
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
