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

const proofMap = [
  {
    need: "Delivery coordination",
    evidence: [
      { label: "Harry J. Epstein", href: "/work/harry-j-epstein" },
      { label: "CallNYC", href: "/work/callnyc" },
      { label: "WOWList", href: "/work/wowlist" }
    ]
  },
  {
    need: "Operating documentation",
    evidence: [
      { label: "FairRentNYC / CRS", href: "/work/fair-rent-nyc" },
      { label: "Source-Backed Team Memory", href: "/lab/source-backed-team-memory" }
    ]
  },
  {
    need: "Onboarding and handoffs",
    evidence: [
      { label: "196 / Sunday Dinner", href: "/work/196-sunday-dinner" },
      { label: "Technical Operations", href: "/work/technical-operations" }
    ]
  },
  {
    need: "Public-facing launch",
    evidence: [
      { label: "CallNYC", href: "/work/callnyc" },
      { label: "Harry J. Epstein", href: "/work/harry-j-epstein" },
      { label: "WOWList", href: "/work/wowlist" }
    ]
  },
  {
    need: "Risk and ambiguity",
    evidence: [
      { label: "FairRentNYC / CRS", href: "/work/fair-rent-nyc" },
      { label: "KC Town Hall", href: "/work/kc-town-hall" }
    ]
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
          Across civic, cultural, small-business, and public-facing technical
          environments, I create the operating backbone teams need to keep work
          moving: planning rhythms, delivery coordination, decision trails,
          documentation, onboarding, launch support, risk visibility, and durable
          handoffs.
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
      <section className="mt-12" aria-labelledby="role-fit-proof-map">
        <div className="jb-reading">
          <p className="jb-eyebrow text-sm text-jb-blue">Proof map</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink" id="role-fit-proof-map">
            Role needs mapped to evidence
          </h2>
          <p className="mt-3 leading-8 text-jb-ink/76">
            The same operating pattern shows up across different contexts. These
            links route a hiring reader from a role need to public-safe proof.
          </p>
        </div>
        <div className="mt-6 overflow-x-auto rounded-lg border border-jb-ink/12 bg-jb-paper">
          <table className="min-w-full text-left">
            <thead className="border-b border-jb-ink/12 bg-jb-warm">
              <tr>
                <th className="jb-meta-label px-4 py-3 text-sm text-jb-blue" scope="col">
                  Role need
                </th>
                <th className="jb-meta-label px-4 py-3 text-sm text-jb-blue" scope="col">
                  Public-safe evidence
                </th>
              </tr>
            </thead>
            <tbody>
              {proofMap.map((row) => (
                <tr className="border-b border-jb-ink/10 last:border-b-0" key={row.need}>
                  <th className="px-4 py-4 font-semibold text-jb-ink" scope="row">
                    {row.need}
                  </th>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {row.evidence.map((item) => (
                        <Link
                          className="rounded-full border border-jb-blue/20 px-3 py-1 text-sm font-semibold text-jb-blue hover:border-jb-green/30 hover:text-jb-green"
                          href={item.href}
                          key={item.href}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
