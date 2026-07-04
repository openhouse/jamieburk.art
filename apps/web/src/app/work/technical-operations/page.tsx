import type { Metadata } from "next";
import { LinkButton } from "@/components/LinkButton";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Technical Operations & Implementation",
  description: "Operating systems, documentation, delivery, onboarding, and handoffs across civic, cultural, small-business, and public-facing environments.",
  path: "/work/technical-operations"
});

const sections = [
  {
    title: "Operating systems built",
    items: [
      "THICK ARTS implementation and handoff systems.",
      "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure.",
      "196 / Sunday Dinner onboarding and continuity systems."
    ]
  },
  {
    title: "Delivery and launch",
    items: ["CallNYC.", "WOWList.", "Harry J. Epstein e-commerce and web operations."]
  },
  {
    title: "Documentation and working memory",
    items: [
      "Source maps",
      "Public guidance",
      "Resource libraries",
      "Handbooks and templates",
      "Meeting synthesis",
      "Decision records",
      "Onboarding materials",
      "Runbooks",
      "Stakeholder updates"
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
      "Open-data workflows",
      "Markdown / MDX documentation",
      "AI eval and human-in-the-loop review practices"
    ]
  }
];

export default function TechnicalOperationsPage() {
  return (
    <div className="page-shell py-14">
      <SectionHeading
        eyebrow="Proof page"
        title="Technical Operations & Implementation"
        body="Across civic, cultural, small-business, and public-facing technical environments, I build the operating backbone teams need to move: planning rhythms, decision logs, action trackers, onboarding materials, documentation systems, launch support, and durable handoffs."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <section className="surface p-5" key={section.title}>
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <ul className="mt-4 space-y-3 leading-7 text-[color:var(--color-muted)]">
              {section.items.map((item) => (
                <li className="border-l-2 border-[color:var(--color-primary)] pl-4" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="mt-10">
        <LinkButton href="/resume" variant="primary">
          Download resume
        </LinkButton>
      </div>
    </div>
  );
}
