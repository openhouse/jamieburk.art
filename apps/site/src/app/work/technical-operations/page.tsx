import type { Metadata } from "next";
import { LinkButton } from "@/components/link-button";
import { PublicSafetyNote } from "@/components/public-safety-note";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Technical Operations & Implementation",
  description:
    "Technical operations proof page for operating systems, documentation, launch support, onboarding, and durable handoffs.",
};

const systems = [
  "THICK ARTS implementation and handoff systems",
  "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure",
  "196 / Sunday Dinner onboarding and continuity systems",
];

const delivery = [
  "CallNYC civic-data prototype",
  "WOWList community-calendar platform",
  "Harry J. Epstein e-commerce and web operations",
];

const documentation = [
  "source maps",
  "public guidance",
  "resource libraries",
  "handbooks and templates",
  "meeting synthesis",
  "decision records",
  "onboarding materials",
  "runbooks",
  "stakeholder updates",
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
  "AI eval and human-in-the-loop review practices",
];

function ProofList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-md border border-base-300 bg-base-100 p-5">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function TechnicalOperationsPage() {
  return (
    <section className="container-page section-pad">
      <SectionHeading
        eyebrow="Proof page"
        title="Technical Operations & Implementation"
        body="Across civic, cultural, small-business, and public-facing technical environments, I build the operating backbone teams need to move: planning rhythms, decision logs, action trackers, onboarding materials, documentation systems, launch support, and durable handoffs."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <ProofList title="Operating systems built" items={systems} />
        <ProofList title="Delivery and launch" items={delivery} />
        <ProofList
          title="Documentation and working memory"
          items={documentation}
        />
        <section className="rounded-md border border-base-300 bg-base-100 p-5">
          <h2 className="text-xl font-bold">
            Tools and technical environments
          </h2>
          <div className="mt-4">
            <TagList tags={tools} tone="quiet" />
          </div>
        </section>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-[1.618fr_1fr]">
        <div className="rounded-md border border-base-300 bg-base-100 p-6">
          <h2 className="text-2xl font-bold">What this proves</h2>
          <p className="mt-4 leading-7 text-neutral">
            Jamie can translate ambiguous, stakeholder-heavy work into concrete
            implementation structure: source-backed decisions, shared planning
            rhythms, clear documentation, careful launch support, and handoffs
            that a team can keep using after the first push.
          </p>
          <div className="mt-6">
            <LinkButton href={site.resumePath}>Download resume</LinkButton>
          </div>
        </div>
        <PublicSafetyNote />
      </div>
    </section>
  );
}
