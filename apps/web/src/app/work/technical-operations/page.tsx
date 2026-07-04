import type { Metadata } from "next";
import { siteConfig } from "@jamie/site-content/site";
import { CTAButton } from "@/components/ui";
import { Section } from "@/components/sections";

export const metadata: Metadata = {
  title: "Technical Operations & Implementation",
  description:
    "Role-specific proof for technical operations, product operations, documentation, handoffs, launch support, and implementation."
};

const sections = [
  {
    title: "Operating systems built",
    items: [
      "HJE implementation and handoff systems for web, e-commerce, analytics, marketing, and operational workflows.",
      "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure with source maps, action trackers, and meeting synthesis.",
      "196 / Sunday Dinner onboarding, hosting, facilitation, and continuity systems."
    ]
  },
  {
    title: "Delivery and launch",
    items: [
      "CallNYC civic-data prototype translating open data into resident-facing guidance.",
      "WOWList community-calendar platform adoption across roughly 35 city ecosystems.",
      "HJE e-commerce modernization and public-facing web systems stewardship."
    ]
  },
  {
    title: "Documentation and working memory",
    items: [
      "Source maps, public guidance, resource libraries, templates, and operating notes.",
      "Meeting synthesis, decision records, stakeholder follow-up notes, and launch support.",
      "Known / Open / Protected framing for work that needs both clarity and restraint."
    ]
  },
  {
    title: "Tools and technical environments",
    items: [
      "JavaScript / TypeScript, Node.js, React / Next.js, Ember.js, Python / Django, SQL.",
      "Git / GitHub, Docker / Dokku, QGIS, open-data workflows, analytics, and public-facing web systems.",
      "Human-reviewed AI workflows and source-backed memory patterns where appropriate."
    ]
  }
];

export default function TechnicalOperationsPage() {
  return (
    <>
      <section className="section">
        <div className="container stack-lg">
          <div className="prose-container stack">
            <p className="eyebrow">Role proof</p>
            <h1>Technical Operations & Implementation</h1>
            <p className="lead">
              Across civic, cultural, small-business, and public-facing technical environments,
              I build the operating backbone teams need to move: planning rhythms, decision
              logs, action trackers, onboarding materials, documentation systems, launch
              support, and durable handoffs.
            </p>
          </div>
        </div>
      </section>

      <Section title="Proof surface">
        <div className="grid grid-2">
          {sections.map((section) => (
            <article className="card" key={section.title}>
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Next step">
        <div className="cluster">
          <CTAButton href={siteConfig.resumePath}>Download resume</CTAButton>
          <CTAButton href={`mailto:${siteConfig.email}`} variant="secondary">
            Contact Jamie
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
