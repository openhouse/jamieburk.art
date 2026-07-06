import type { Metadata } from "next";
import Link from "next/link";
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
      "Planning cycles, sprint rituals, decision frameworks, status reporting, and post-launch retros",
      "Recurring blockers identified early enough to change the plan",
      "Honest reporting up about what is working, what is stuck, and what needs a decision"
    ]
  },
  {
    title: "Delivery coordination",
    items: [
      "Concurrent project work kept visible from concept through public launch",
      "Status, risk, and dependency tracking that helps teams decide what to do next",
      "Launch support, QA/UAT rhythms, adoption notes, and post-launch handoffs"
    ]
  },
  {
    title: "Documentation and working memory",
    items: [
      "Source maps, decision trails, meeting synthesis, public guidance, and resource libraries",
      "Handbooks, runbooks, templates, and operating documentation people actually use",
      "Known / open / protected boundaries that make shared records useful without overexposing private context"
    ]
  },
  {
    title: "Onboarding and handoffs",
    items: [
      "Onboarding guides and context packs for new hires, collaborators, and project successors",
      "Durable handoffs that preserve decisions, risks, rituals, and next steps",
      "Team-health and operational signals translated into practical quarter-over-quarter improvements"
    ]
  },
  {
    title: "Cross-functional coordination",
    items: [
      "Coordination across platform, security, legal, communications, contracts, leadership, and community contexts",
      "Shared language between technical and nontechnical stakeholders",
      "Decision frameworks that make tradeoffs visible without pretending every constraint is equal"
    ]
  },
  {
    title: "Tools and technical environments",
    items: [
      "JavaScript / TypeScript",
      "Node.js",
      "React / Next.js",
      "Ember.js",
      "Python / Django",
      "SQL",
      "Git / GitHub",
      "Docker / Dokku",
      "QGIS",
      "Open-data workflows"
    ]
  }
];

const proofLinks = [
  {
    title: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein",
    note: "Long-term web, e-commerce, analytics, content, and operations stewardship."
  },
  {
    title: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc",
    note: "Campaign-memory infrastructure, source maps, action tracking, and public-safe coordination."
  },
  {
    title: "CallNYC",
    href: "/work/callnyc",
    note: "Archived civic-data prototype translating open data into resident-facing guidance."
  },
  {
    title: "WOWList",
    href: "/work/wowlist",
    note: "Co-built community-calendar platform with organizer-facing distribution workflows."
  },
  {
    title: "196 Artists Residency / Sunday Dinner",
    href: "/work/196-sunday-dinner",
    note: "Repeatable participation, onboarding, hosting, and continuity systems."
  },
  {
    title: "Source-Backed Team Memory",
    href: "/lab/source-backed-team-memory",
    note: "Lab / method / proof-of-practice for inspectable, human-correctable team memory."
  }
] as const;

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <p className="jb-eyebrow text-sm text-jb-blue">Role-fit proof page</p>
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical environments,
          I create the operating backbone teams need to keep work moving: planning
          rhythms, delivery coordination, decision trails, documentation, onboarding,
          launch support, risk visibility, and durable handoffs.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <JBCard key={section.title}>
            <h2 className="jb-display-condensed text-2xl font-semibold text-jb-ink">
              {section.title}
            </h2>
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
      <section className="mt-12" aria-labelledby="proof-links">
        <div className="jb-reading">
          <h2 className="jb-display-condensed text-3xl font-semibold text-jb-ink" id="proof-links">
            Proof links
          </h2>
          <p className="mt-3 leading-8 text-jb-ink/76">
            Selected pages that show the same operating pattern in different contexts.
            Each page is intentionally public-safe and omits private source material.
          </p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {proofLinks.map((proof) => (
            <JBCard key={proof.href}>
              <h3 className="text-xl font-semibold text-jb-ink">
                <Link className="hover:text-jb-blue" href={proof.href}>
                  {proof.title}
                </Link>
              </h3>
              <p className="mt-3 leading-7 text-jb-ink/74">{proof.note}</p>
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
