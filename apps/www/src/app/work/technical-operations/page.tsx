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
    title: "Delivery coordination",
    items: [
      "Jamie clarifies requirements, owners, next steps, risks, and launch dependencies so work can move from concept to public release.",
      "He turns scattered stakeholder context into visible status rhythms, action trackers, and handoffs that make blockers harder to hide."
    ]
  },
  {
    title: "Operating processes",
    items: [
      "Planning cycles, sprint rituals, decision frameworks, weekly updates, and retrospectives become simple enough for teams to keep using.",
      "The goal is not process for its own sake. The goal is a shared operating rhythm that helps people make decisions and see what changed."
    ]
  },
  {
    title: "Onboarding and team durability",
    items: [
      "Jamie creates handbooks, runbooks, onboarding guides, templates, and source maps that help new collaborators understand the work faster.",
      "He treats handoff quality as part of delivery, not a cleanup step after launch."
    ]
  },
  {
    title: "Documentation and operating memory",
    items: [
      "Meeting synthesis, decision records, public guidance, resource libraries, and source-backed notes make context reviewable.",
      "Known / Open / Protected boundaries keep public-safe claims separate from questions and protected material."
    ]
  },
  {
    title: "Cross-team coordination",
    items: [
      "The work often sits between platform, security, legal, communications, contracts, leadership, operators, and public audiences.",
      "Jamie translates between technical and nontechnical needs so teams can decide what to do next without losing source context."
    ]
  },
  {
    title: "Reporting, retrospectives, and improvement",
    items: [
      "Clear updates name what is done, what is blocked, what changed, what needs a decision, and what is not working.",
      "Retrospectives turn recurring friction into better runbooks, planning rhythms, and handoffs."
    ]
  },
  {
    title: "Public-sector and civic-technology evidence",
    items: [
      "FairRentNYC shows civic campaign-memory infrastructure with source maps, action trackers, decision records, and protected boundaries.",
      "CallNYC shows open-data translation into a resident-facing prototype with clear disclaimers and no official-service overclaiming."
    ]
  },
  {
    title: "Tools and technical environments",
    items: [
      "JavaScript / TypeScript, Node.js, React / Next.js, Ember.js, Python / Django, SQL, Git / GitHub, Docker / Dokku, QGIS, and open-data workflows.",
      "These are useful because Jamie connects tools to requirements, users, public surfaces, documentation, and operating handoffs."
    ]
  }
];

const selectedProof = [
  {
    title: "Harry J. Epstein Company",
    text: "Jamie helped translate legacy product knowledge, customer language, analytics, marketing, and e-commerce operations into maintainable workflows for an 80+ year-old business."
  },
  {
    title: "FairRentNYC / Commercial Rent Stabilization",
    text: "Jamie built and stewarded shared campaign-memory infrastructure so collaborators could see decisions, action items, source trails, open questions, and protected context."
  },
  {
    title: "CallNYC",
    text: "Jamie turned constituent-services open data into an archived resident-facing prototype while making the unofficial, historical status clear."
  },
  {
    title: "WOWList",
    text: "Jamie co-built community-calendar workflows around followable keyword communities so organizers could distribute events through language their scenes already used."
  },
  {
    title: "196 / Sunday Dinner",
    text: "Jamie created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across recurring gatherings without exposing private community records."
  },
  {
    title: "KC Town Hall",
    text: "Jamie helped shape redevelopment planning and public-benefit documentation so a long-horizon adaptive-reuse effort was easier to explain, fund, discuss, and continue."
  },
  {
    title: "Source-Backed Team Memory",
    text: "Jamie is developing a bounded lab method for preserving decisions, onboarding context, source trails, and open questions with human-reviewed AI drafts and inspectable sources."
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
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding
          materials, documentation systems, stakeholder updates, launch support,
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
      <section className="mt-12">
        <div className="jb-reading">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Selected proof
          </p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            What the work shows
          </h2>
          <p className="mt-4 leading-8 text-jb-ink/76">
            These examples are deliberately public-safe. They show the operating
            behavior without publishing private dashboards, raw transcripts,
            legal-review materials, internal strategy, guest records, or
            unapproved artifacts.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {selectedProof.map((proof) => (
            <JBCard key={proof.title}>
              <h3 className="text-xl font-semibold text-jb-ink">
                {proof.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-jb-ink/74">
                {proof.text}
              </p>
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
