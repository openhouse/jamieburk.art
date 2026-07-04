import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Technical Operations & Implementation",
  description: "Role-specific proof surface for Jamie Burkart's technical operations, implementation, documentation, and handoff work.",
  path: "/work/technical-operations"
});

const operatingSystems = [
  "THICK ARTS implementation and handoff systems",
  "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure",
  "196 / Sunday Dinner onboarding and continuity systems"
];

const delivery = [
  "Harry J. Epstein e-commerce and operations improvements",
  "CallNYC civic-data tool",
  "WOWList community platform"
];

const documentation = [
  "source maps",
  "public guidance",
  "resource libraries",
  "handbooks / templates",
  "meeting synthesis",
  "decision records",
  "action trackers",
  "stakeholder follow-up materials"
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
  "open-data workflows",
  "dataset documentation",
  "API / data-product requirements"
];

function BulletPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="surface p-5">
      <h2 className="text-xl font-black">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm leading-6 text-[color:var(--color-muted)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function TechnicalOperationsPage() {
  return (
    <>
      <section className="section-pad source-map">
        <div className="container-page">
          <p className="eyebrow mb-4">Role proof</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Technical Operations & Implementation
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-[color:var(--color-muted)]">
            Across civic, cultural, small-business, and public-facing technical environments, I
            build the operating backbone teams need to move: planning rhythms, decision logs,
            action trackers, onboarding materials, documentation systems, launch support, and
            durable handoffs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/resume" icon="download">
              Download resume
            </ButtonLink>
            <ButtonLink href="/contact" icon="mail" variant="secondary">
              Contact Jamie
            </ButtonLink>
          </div>
        </div>
      </section>
      <Section title="Operating backbone" ruled>
        <div className="balanced-grid">
          <BulletPanel items={operatingSystems} title="Operating systems built" />
          <BulletPanel items={delivery} title="Delivery and launch" />
          <BulletPanel items={documentation} title="Documentation and working memory" />
          <BulletPanel items={tools} title="Tools and technical environments" />
        </div>
      </Section>
      <Section eyebrow="Capability pattern" title="Reusable strengths" ruled>
        <CapabilityGrid />
      </Section>
    </>
  );
}
