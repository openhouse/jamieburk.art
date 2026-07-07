import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofs } from "@/data/proofs";
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

const roleFit = [
  "Delivery coordination across concurrent projects",
  "Planning cycles, meeting rhythms, decision logs, and retrospectives",
  "Team handbooks, runbooks, onboarding guides, and operating principles",
  "Cross-functional coordination across product, design, engineering, legal, security, comms, contracts, civic, and public-facing stakeholders",
  "Honest status reporting, risk surfacing, and operational metrics",
  "Documentation that people actually use"
];

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          I build the operating backbone teams need to keep important work
          focused, documented, unblocked, and moving toward public launch.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <JBCard>
          <h2 className="text-2xl font-semibold text-jb-ink">Role fit</h2>
          <ul className="mt-5 space-y-3 text-jb-ink/76">
            {roleFit.map((item) => (
              <li className="flex gap-3" key={item}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </JBCard>
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
        <h2 className="text-3xl font-semibold text-jb-ink">
          Proof mapped to operating needs
        </h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {technicalOperationsProofs.map((item) => (
            <JBCard key={item.id}>
              <p className="font-display text-sm font-bold uppercase text-jb-blue">
                {item.title}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-jb-ink">
                {item.publicSafeWording}
              </h3>
              <p className="mt-4 leading-7 text-jb-ink/76">
                {item.publicUsePurpose}
              </p>
              <p className="mt-4 text-sm leading-6 text-jb-ink/64">
                Boundary: {item.boundaries}
              </p>
            </JBCard>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-jb-ink">
          What this means in practice
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Clarify",
              text:
                "Translate loosely defined work into requirements, ownership, risks, and next decisions."
            },
            {
              title: "Coordinate",
              text:
                "Keep people aligned across product, design, engineering, legal, security, comms, contracts, leadership, and public-facing partners."
            },
            {
              title: "Transfer",
              text:
                "Leave behind runbooks, onboarding guides, decision records, status summaries, and handoffs."
            }
          ].map((item) => (
            <JBCard key={item.title}>
              <h3 className="text-2xl font-semibold text-jb-ink">{item.title}</h3>
              <p className="mt-4 leading-7 text-jb-ink/76">{item.text}</p>
            </JBCard>
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
