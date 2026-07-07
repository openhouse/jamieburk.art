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
    text:
      "Coordinate work across multiple projects, clarify ownership, surface risks early, and keep teams oriented from concept through launch."
  },
  {
    title: "Planning cycles and status rhythms",
    text:
      "Create planning cycles, decision frameworks, action trackers, and status reporting that make work easier to prioritize and continue."
  },
  {
    title: "Risk surfacing and unblocking",
    text:
      "Name what is blocked, uncertain, late, or ownerless early enough for teams and leadership to act."
  },
  {
    title: "Cross-team dependencies",
    text:
      "Translate dependencies across product, engineering, design, security, legal, communications, contracts, leadership, and external stakeholders."
  },
  {
    title: "Campaign web infrastructure",
    text:
      "Build public campaign sites, action pages, resource libraries, and advocacy flows that make complex civic work findable and actionable."
  },
  {
    title: "Onboarding and ramp support",
    text:
      "Write onboarding guides, templates, context pages, and handoff materials so new contributors can ramp quickly."
  },
  {
    title: "Handbooks, runbooks, and operating documentation",
    text:
      "Turn repeated questions, launch steps, decision rules, and maintenance work into simple reference systems the team can reuse."
  },
  {
    title: "Team health, reporting, and operational metrics",
    text:
      "Prepare clear updates on project status, team health, operational risks, and what is or is not working."
  },
  {
    title: "Retrospectives and continuous improvement",
    text:
      "Run practical retrospectives, preserve what was learned, and improve the working system after launches, blockers, and handoffs."
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
          I build the operating backbone teams need to move: planning rhythms,
          delivery tracking, decision records, risk notes, onboarding materials,
          handbooks, runbooks, stakeholder updates, retrospectives, and durable
          handoffs.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <JBCard key={section.title}>
            <h2 className="text-2xl font-semibold text-jb-ink">{section.title}</h2>
            <p className="mt-4 leading-7 text-jb-ink/76">{section.text}</p>
          </JBCard>
        ))}
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
