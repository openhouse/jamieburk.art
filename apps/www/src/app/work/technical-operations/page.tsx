import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofs } from "@/data/proofs";
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
      "Coordinate work across multiple concurrent projects.",
      "Clarify owners, next steps, dependencies, and launch constraints.",
      "Surface risks early enough that the team still has choices."
    ]
  },
  {
    title: "Operating practices",
    items: [
      "Build planning rhythms, decision records, action trackers, status updates, retrospectives, and handoff practices.",
      "Improve working systems over time without creating a heavy parallel bureaucracy.",
      "Report clearly on what is working, what is blocked, and what needs a decision."
    ]
  },
  {
    title: "Cross-functional unblocking",
    items: [
      "Translate between technical and nontechnical stakeholders.",
      "Coordinate across product, design, engineering, legal, communications, contracts, civic partners, and leadership.",
      "Escalate clearly when a decision, dependency, or risk needs attention."
    ]
  },
  {
    title: "Documentation people use",
    items: [
      "Create handbooks, runbooks, onboarding guides, source maps, public guidance, templates, and reusable reference systems.",
      "Make decisions, sources, open questions, and next steps easier to find after the meeting.",
      "Leave behind materials that help new contributors enter the work without relying on oral history."
    ]
  }
];

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="break-words text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding
          materials, stakeholder updates, documentation systems, launch
          support, and durable handoffs.
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
          <h2 className="text-3xl font-semibold text-jb-ink">
            Representative proof
          </h2>
          <p className="mt-4 leading-8 text-jb-ink/76">
            These examples are projected from the public-safe knowledge bank.
            Exact metrics stay governed there; this page uses V1-safe wording.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {technicalOperationsProofs.slice(0, 8).map((proof) => (
            <div className="rounded-lg border border-jb-ink/12 bg-jb-paper p-4" key={proof.id}>
              <h3 className="break-words text-xl font-semibold text-jb-ink">{proof.title}</h3>
              <p className="mt-2 leading-7 text-jb-ink/76">{proof.safeShortWording}</p>
            </div>
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
