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
    title: "Operating backbone",
    items: [
      "Planning rhythms",
      "Decision records",
      "Action trackers",
      "Risk notes",
      "Status reporting",
      "Runbooks and handoff documentation"
    ]
  },
  {
    title: "Delivery coordination",
    items: [
      "Cross-functional coordination",
      "Launch support",
      "Quality assurance (QA)",
      "User acceptance testing (UAT)",
      "Retros and improvement loops"
    ]
  },
  {
    title: "Documentation people use",
    items: [
      "Source maps",
      "Public guidance",
      "Resource libraries",
      "Onboarding materials",
      "Meeting synthesis",
      "Known / Open / Protected boundaries"
    ]
  },
  {
    title: "Proof clusters",
    items: [
      "HJE e-commerce and operating-workflow systems",
      "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure",
      "CallNYC resident-facing civic-data prototype",
      "WOWList community web systems",
      "Source-backed team-memory lab / method"
    ]
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
          I build the operating backbone teams need to plan, coordinate,
          document, report, onboard, and ship. Across civic, cultural,
          small-business, and public-facing technical environments, my work
          turns emerging goals and scattered context into planning rhythms,
          decision records, action trackers, onboarding materials, stakeholder
          updates, launch support, and durable handoffs.
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
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
