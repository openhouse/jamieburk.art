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
    title: "Delivery rhythm",
    items: [
      "Coordinate delivery and track status from concept through public launch.",
      "Surface risks early and keep work on schedule through clear planning cycles.",
      "Use sprint rituals, decision frameworks, status reporting, and post-launch retros to keep teams aligned."
    ]
  },
  {
    title: "Cross-functional unblocker",
    items: [
      "Unblock recurring blockers before they become project lore.",
      "Coordinate across platform, security, legal, comms, and contracts when public-facing work needs shared answers.",
      "Report up with honesty about what is and is not working."
    ]
  },
  {
    title: "Documentation people use",
    items: [
      "Create handbooks, runbooks, onboarding guides, source maps, templates, and decision records.",
      "Onboard new hires with operating documentation people actually use.",
      "Improve working systems quarter over quarter instead of letting launch materials decay."
    ]
  },
  {
    title: "Representative systems",
    items: [
      "HJE implementation and handoff systems.",
      "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure.",
      "196 / Sunday Dinner onboarding and continuity systems.",
      "CallNYC, WOWList, and HJE public-launch support."
    ]
  }
];

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <p className="jb-eyebrow text-sm text-jb-blue">Role-specific proof page</p>
        <h1 className="mt-3 text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to coordinate
          delivery, track status, surface risks early, and keep work on schedule
          from concept through public launch.
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
