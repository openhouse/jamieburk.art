import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { StartHere } from "@/components/StartHere";
import { technicalOperationsProofItems } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

const operatingBackbone = [
  {
    title: "Delivery coordination",
    text:
      "I clarify scope, surface blockers, track next steps, and coordinate across technical and nontechnical collaborators so delivery does not depend on private memory."
  },
  {
    title: "Planning rhythms and status reporting",
    text:
      "I turn recurring questions into planning cadences, status updates, action trackers, decision logs, retrospectives, and review lanes."
  },
  {
    title: "Knowledge systems and handoffs",
    text:
      "I create source maps, handbooks, runbooks, onboarding context, public guidance, and continuity materials that help future collaborators safely continue the work."
  },
  {
    title: "Risk surfacing",
    text:
      "I make boundaries explicit: what is known, what is open, what needs approval, what is protected, and what should not become public."
  }
];

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">
          Role proof
        </p>
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding materials,
          documentation systems, launch support, and durable handoffs.
        </p>
      </div>
      <div className="mt-10">
        <StartHere />
      </div>
      <section className="mt-12" aria-labelledby="operating-backbone">
        <h2 className="text-3xl font-semibold text-jb-ink" id="operating-backbone">
          Operating backbone
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {operatingBackbone.map((section) => (
            <JBCard key={section.title}>
              <h3 className="text-2xl font-semibold text-jb-ink">{section.title}</h3>
              <p className="mt-4 leading-7 text-jb-ink/76">{section.text}</p>
            </JBCard>
          ))}
        </div>
      </section>
      <section className="mt-12" aria-labelledby="proof-items">
        <h2 className="text-3xl font-semibold text-jb-ink" id="proof-items">
          Proof by system
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {technicalOperationsProofItems.map((item) => (
            <JBCard key={item.label}>
              <h3 className="text-xl font-semibold text-jb-ink">{item.label}</h3>
              <p className="mt-3 leading-7 text-jb-ink/76">{item.text}</p>
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
