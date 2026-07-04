import type { Metadata } from "next";

import { ButtonLink } from "@/components/ButtonLink";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { SectionHeading } from "@/components/SectionHeading";
import { TagList } from "@/components/TagList";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation",
  description:
    "Technical operations proof page for Jamie Burkart: operating systems, delivery, launch, documentation, tools, and durable handoffs.",
  path: "/work/technical-operations"
});

const operatingSystems = [
  "THICK ARTS implementation and handoff systems",
  "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure",
  "196 / Sunday Dinner onboarding and continuity systems"
];

const delivery = [
  "CallNYC",
  "WOWList",
  "Harry J. Epstein e-commerce and web operations"
];

const documentation = [
  "source maps",
  "public guidance",
  "resource libraries",
  "handbooks / templates",
  "meeting synthesis",
  "decision records",
  "onboarding materials",
  "runbooks",
  "stakeholder updates"
];

const tools = [
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
];

function BulletSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card p-6">
      <h2 className="h3">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function TechnicalOperationsPage() {
  return (
    <div>
      <header className="section">
        <div className="container copy">
          <SectionHeading
            eyebrow="Proof sheet"
            title="Technical Operations & Implementation"
          >
            <p>
              Across civic, cultural, small-business, and public-facing
              technical environments, I build the operating backbone teams need
              to move: planning rhythms, decision logs, action trackers,
              onboarding materials, documentation systems, launch support, and
              durable handoffs.
            </p>
          </SectionHeading>
          <div className="mt-8">
            <ButtonLink download href={site.resumePath}>
              Download résumé
            </ButtonLink>
          </div>
        </div>
      </header>
      <div className="container grid gap-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <BulletSection title="Operating systems built" items={operatingSystems} />
          <BulletSection title="Delivery and launch" items={delivery} />
          <BulletSection
            title="Documentation and working memory"
            items={documentation}
          />
        </div>
        <section className="card p-6">
          <h2 className="h3">Tools and technical environments</h2>
          <div className="mt-5">
            <TagList tags={tools} />
          </div>
        </section>
        <PublicSafetyNote>
          <p>
            This page summarizes public-safe patterns across client, civic,
            community, and lab work. Private client analytics, legal-review
            materials, private stakeholder lists, and raw community records are
            intentionally omitted.
          </p>
        </PublicSafetyNote>
      </div>
    </div>
  );
}
