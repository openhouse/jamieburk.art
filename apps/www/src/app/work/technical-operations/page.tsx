import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

const operatingSections = [
  {
    title: "Operating backbone",
    text:
      "I build the planning rhythms, decision records, action trackers, source maps, runbooks, onboarding notes, and handoff materials teams need to stay oriented."
  },
  {
    title: "Delivery coordination",
    text:
      "I turn loosely defined goals into visible work, owners, dependencies, risks, approvals, launch steps, and next actions."
  },
  {
    title: "Risk surfacing",
    text:
      "I keep blockers, open questions, public/private boundaries, unresolved decisions, and escalation needs visible before they become surprises."
  },
  {
    title: "Cross-functional coordination",
    text:
      "I coordinate across technical and nontechnical stakeholders without flattening either side: product, design, engineering, leadership, legal, comms, contracts, city partners, and community collaborators."
  },
  {
    title: "Onboarding and team memory",
    text:
      "I make it easier for new people to understand what happened, why it happened, what remains open, and where source-backed context lives."
  },
  {
    title: "Status reporting and retros",
    text:
      "I report honestly on what is moving, what is blocked, what is unknown, and what needs escalation; then I turn retros into operating improvements."
  },
  {
    title: "Operating documentation",
    text:
      "I write documentation people actually use: handbooks, runbooks, source maps, action trackers, public guidance, onboarding notes, and handoff materials."
  },
  {
    title: "Public-facing launch support",
    text:
      "I help translate internal work into public-facing surfaces, adoption materials, guidance, and maintainable workflows."
  }
] as const;

const proves = [
  "I coordinate delivery by turning loosely defined goals into visible work, owners, risks, and next steps.",
  "I surface risks early by keeping open questions, dependencies, approvals, and blockers visible.",
  "I write operating documentation people actually use: handbooks, runbooks, source maps, action trackers, onboarding notes, and handoff materials.",
  "I coordinate across technical and nontechnical stakeholders without flattening either side.",
  "I report status with honesty about what is moving, what is blocked, what is unknown, and what needs escalation.",
  "I treat retros and documentation as operating infrastructure, not clerical aftercare."
] as const;

const roleProofCards = [
  {
    title: "Harry J. Epstein Company",
    text:
      "Legacy business implementation, e-commerce, analytics, workflows, launch support, and long-term handoffs."
  },
  {
    title: "FairRentNYC / NYC Artist Coalition",
    text:
      "Campaign-memory infrastructure, decision records, action trackers, source maps, public/private boundaries, and public campaign web surfaces."
  },
  {
    title: "CallNYC",
    text:
      "Public-data translation into resident-facing guidance, issue pathways, and archived civic-tech product shape."
  },
  {
    title: "WOWList",
    text:
      "Community platform delivery, organizer adoption, low-cost deployment, event workflows, and public-facing product operations."
  },
  {
    title: "196 / Sunday Dinner",
    text:
      "Onboarding, facilitation, trust-building routines, continuity, hospitality systems, and practical follow-through."
  },
  {
    title: "KC Town Hall",
    text:
      "Long-horizon documentation, public-benefit framing, funding/stakeholder context, and complex built-environment planning."
  }
] as const;

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          I build the operating backbone teams need to plan, coordinate,
          document, report, onboard, and ship. Across civic, cultural,
          small-business, and public-facing technical environments, my work
          turns emerging goals and scattered context into planning rhythms,
          decision records, action trackers, onboarding materials, stakeholder
          updates, launch support, and durable handoffs.
        </p>
      </div>

      <section className="mt-10" aria-labelledby="what-this-proves">
        <h2 className="text-3xl font-bold text-jb-ink" id="what-this-proves">
          What this proves for technical operations
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {proves.map((item) => (
            <li
              className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5 leading-7 text-jb-ink/76"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="operating-capabilities">
        <h2 className="text-3xl font-bold text-jb-ink" id="operating-capabilities">
          Operating capabilities
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {operatingSections.map((section) => (
            <JBCard key={section.title}>
              <h3 className="text-2xl font-semibold text-jb-ink">{section.title}</h3>
              <p className="mt-3 leading-7 text-jb-ink/76">{section.text}</p>
            </JBCard>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="proof-clusters">
        <h2 className="text-3xl font-bold text-jb-ink" id="proof-clusters">
          Proof clusters
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {technicalOperationsProofRows.map((row) => (
            <JBCard key={row.capability}>
              <h3 className="text-2xl font-semibold text-jb-ink">{row.capability}</h3>
              <p className="mt-3 text-sm leading-6 text-jb-ink/68">{row.toward}</p>
              <ul className="mt-5 space-y-3 text-jb-ink/76">
                {row.proofs.map((proof) => (
                  <li className="flex gap-3" key={proof.id}>
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 rounded-full bg-jb-ochre"
                    />
                    <span>{proof.shortWording ?? proof.publicWording}</span>
                  </li>
                ))}
              </ul>
            </JBCard>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="role-proof-cards">
        <h2 className="text-3xl font-bold text-jb-ink" id="role-proof-cards">
          Role-specific proof cards
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {roleProofCards.map((card) => (
            <JBCard key={card.title}>
              <h3 className="text-xl font-semibold text-jb-ink">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-jb-ink/72">{card.text}</p>
            </JBCard>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-jb-blue/20 bg-jb-sky/15 p-5">
        <h2 className="text-2xl font-semibold text-jb-ink">
          Hands-on technical translation
        </h2>
        <p className="mt-3 leading-7 text-jb-ink/76">
          I work across JavaScript / TypeScript, Node.js, React / Next.js,
          Ember.js, Python / Django, SQL, Git / GitHub, Docker / Dokku, QGIS,
          and open-data workflows when the project needs hands-on technical
          translation.
        </p>
      </section>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
