import { CapabilityBand } from "@/components/CapabilityBand";
import { ResumeDownload } from "@/components/ResumeDownload";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Technical Operations & Implementation",
  description:
    "Proof page for Jamie Burkart's technical operations, implementation, documentation, delivery, onboarding, and handoff work.",
  pathname: "/work/technical-operations"
});

const systems = [
  {
    title: "Operating systems built",
    body: "THICK ARTS implementation and handoff systems; FairRentNYC / NYC Artist Coalition campaign-memory infrastructure; 196 / Sunday Dinner onboarding and continuity systems."
  },
  {
    title: "Delivery and launch",
    body: "CallNYC, WOWList, and Harry J. Epstein e-commerce and web operations."
  },
  {
    title: "Documentation and working memory",
    body: "Source maps, public guidance, resource libraries, handbooks, templates, meeting synthesis, decision records, onboarding materials, runbooks, and stakeholder updates."
  },
  {
    title: "Tools and technical environments",
    body: "JavaScript, TypeScript, Node.js, React, Next.js, Ember.js, Python, Django, SQL, Git, GitHub, Docker, Dokku, QGIS, open-data workflows, Markdown, MDX, AI eval, and human-in-the-loop review."
  }
];

export default function TechnicalOperationsPage() {
  return (
    <div className="plain-stack">
      <header className="plain-page">
        <p className="eyebrow">Role proof</p>
        <h1>Technical Operations & Implementation</h1>
        <p>
          Across civic, cultural, small-business, and public-facing technical environments, Jamie builds the operating backbone teams need to move: planning rhythms, decision logs, action trackers, onboarding materials, documentation systems, launch support, and durable handoffs.
        </p>
      </header>
      <section className="page-section">
        <SectionHeading title="Operating backbone" />
        <CapabilityBand items={systems} />
      </section>
      <section className="page-section">
        <ResumeDownload />
      </section>
    </div>
  );
}
