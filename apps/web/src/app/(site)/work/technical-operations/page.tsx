import { ButtonLink } from "@/components/ButtonLink";
import { Tag } from "@/components/Tag";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata(
  "Technical Operations & Implementation",
  "Technical operations proof page for Jamie Burkart's planning systems, decision logs, documentation, launch support, and durable handoffs."
);

const operatingSystems = [
  "THICK ARTS implementation and handoff systems",
  "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure",
  "196 / Sunday Dinner onboarding and continuity systems"
];

const deliveryLaunch = [
  "CallNYC civic-data prototype",
  "WOWList organizer-facing community-calendar platform",
  "Harry J. Epstein e-commerce and web operations"
];

const documentationMemory = [
  "Source maps",
  "Public guidance",
  "Resource libraries",
  "Handbooks / templates",
  "Meeting synthesis",
  "Decision records",
  "Onboarding materials",
  "Runbooks",
  "Stakeholder updates"
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

function ProofSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="case-section">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function TechnicalOperationsPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Proof page</p>
        <h1>Technical Operations & Implementation</h1>
        <p className="lede">
          Across civic, cultural, small-business, and public-facing technical environments, I
          build the operating backbone teams need to move: planning rhythms, decision logs,
          action trackers, onboarding materials, documentation systems, launch support, and
          durable handoffs.
        </p>
        <div className="hero-actions">
          <ButtonLink href={site.resumePath}>Download resume</ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            View selected systems
          </ButtonLink>
        </div>
      </section>

      <div className="case-main">
        <ProofSection items={operatingSystems} title="Operating systems built" />
        <ProofSection items={deliveryLaunch} title="Delivery and launch" />
        <ProofSection items={documentationMemory} title="Documentation and working memory" />
        <section className="case-section">
          <h2>Tools and technical environments</h2>
          <div className="role-tags">
            {tools.map((tool) => (
              <Tag key={tool}>{tool}</Tag>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
