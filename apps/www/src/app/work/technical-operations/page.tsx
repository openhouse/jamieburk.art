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
      "Jamie structured HJE catalog, search, checkout, content, analytics, and handoff systems for long-term e-commerce operations",
      "Jamie helped build FairRentNYC campaign-memory infrastructure: running minutes, action trackers, source maps, open-question lists, and follow-up notes",
      "Jamie helped create 196 / Sunday Dinner onboarding, hosting, facilitation, and continuity systems"
    ]
  },
  {
    title: "Delivery and launch",
    items: [
      "Translated open civic data into CallNYC issue pathways and resident-facing next steps",
      "Co-built WOWList organizer publishing, digest email, embeddable calendar, and event-discovery workflows",
      "Supported HJE e-commerce releases across product, content, marketing, analytics, and operations"
    ]
  },
  {
    title: "Documentation and working memory",
    items: [
      "Maintains source maps that separate public evidence, open questions, and protected context",
      "Writes public guidance, stakeholder updates, resource libraries, handbooks, and reusable templates",
      "Turns meeting synthesis into decision records, action trackers, retrospectives, and durable handoffs"
    ]
  },
  {
    title: "Tools and technical environments",
    items: [
      "Coordinates work across product, design, engineering, leadership, legal, communications, and external stakeholders",
      "Works in JavaScript / TypeScript, Node.js, React / Next.js, Ember.js, Python / Django, SQL, Git / GitHub, Docker / Dokku, QGIS, and open-data workflows",
      "Uses tools as implementation support: requirements, planning cycles, launch checks, status reporting, onboarding, and measurement"
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
          I build the operating backbone teams need to move: planning rhythms,
          decision logs, action trackers, onboarding materials, documentation
          systems, risk surfacing, status updates, launch support,
          retrospectives, and durable handoffs.
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
