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

const proofCategories = [
  {
    title: "Delivery coordination",
    text:
      "Coordinated web, civic, community, and documentation work across technical and nontechnical collaborators."
  },
  {
    title: "Planning cycles and team rituals",
    text:
      "Created recurring rhythms for meetings, follow-ups, documentation, releases, and adoption support."
  },
  {
    title: "Decision records and action trackers",
    text:
      "Synthesized meetings into decisions, action items, open questions, source context, and next steps."
  },
  {
    title: "Runbooks, handbooks, and onboarding guides",
    text:
      "Built reusable materials that helped people understand workflows, responsibilities, launch steps, and handoffs."
  },
  {
    title: "Status reporting and stakeholder updates",
    text:
      "Translated messy work into readable progress notes, public-safe summaries, and stakeholder-ready updates."
  },
  {
    title: "Cross-team dependencies",
    text:
      "Mapped where product, policy, content, engineering, operations, and community needs affected each other."
  },
  {
    title: "Post-launch retrospectives",
    text:
      "Turned launches, prototypes, and ongoing operations into lessons, fixes, maintenance habits, and reusable documentation."
  },
  {
    title: "Operational metrics and honest reporting",
    text:
      "Used analytics and evidence carefully, including what numbers could say, what they could not say, and what should stay private."
  },
  {
    title: "Durable handoffs",
    text:
      "Left behind decision context, source maps, workflow notes, adoption materials, and public-safe guidance that could outlast one meeting."
  }
];

const environments = [
  "Harry J. Epstein implementation and handoff systems",
  "FairRentNYC / NYC Artist Coalition shared campaign documentation",
  "196 / Sunday Dinner onboarding and continuity systems",
  "CallNYC civic-data prototype",
  "WOWList community-calendar platform",
  "Source-backed team-memory lab"
];

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-4xl font-bold text-jb-ink sm:text-5xl">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          I build the operating backbone teams need to stay focused, unblocked,
          documented, and shipping: planning rhythms, decision logs, action
          trackers, onboarding materials, runbooks, stakeholder updates,
          retrospectives, and durable handoffs.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {proofCategories.map((section) => (
          <JBCard key={section.title}>
            <h2 className="text-2xl font-semibold text-jb-ink">{section.title}</h2>
            <p className="mt-4 leading-7 text-jb-ink/76">{section.text}</p>
          </JBCard>
        ))}
      </div>
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
        <h2 className="text-2xl font-semibold text-jb-ink">
          Representative environments
        </h2>
        <ul className="mt-5 grid gap-3 text-jb-ink/76 md:grid-cols-2">
          {environments.map((item) => (
            <li className="flex gap-3" key={item}>
              <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
