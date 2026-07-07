import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { proofBankPrinciples } from "@/data/proofs";
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
      "Coordinate delivery across concurrent projects from early concept through public launch",
      "Use planning cycles, sprint rituals, decision frameworks, status reporting, and post-launch retros to keep work visible",
      "Track status and surface risks early enough for teams to change the plan"
    ]
  },
  {
    title: "Cross-functional unblocking",
    items: [
      "Identify recurring blockers before they become accepted background noise",
      "Coordinate across platform, security, legal, communications, contracts, leadership, and external stakeholders",
      "Report honestly about what is working, what is stuck, and what needs a decision"
    ]
  },
  {
    title: "Documentation people use",
    items: [
      "Source maps, decision trails, meeting synthesis, public guidance, and resource libraries",
      "Handbooks, runbooks, templates, and operating documentation people actually use",
      "Known / open / protected boundaries that keep shared records useful without overexposing private context"
    ]
  },
  {
    title: "Onboarding and handoffs",
    items: [
      "Onboarding guides and context packs for new hires, collaborators, and project successors",
      "Durable handoffs that preserve decisions, risks, rituals, and next steps",
      "Team-health and operational signals translated into practical quarter-over-quarter improvements"
    ]
  }
];

const proofMap = [
  {
    need: "Coordinate delivery across concurrent work",
    evidence: [
      { label: "Harry J. Epstein", href: "/work/harry-j-epstein" },
      { label: "CallNYC", href: "/work/callnyc" },
      { label: "WOWList", href: "/work/wowlist" }
    ],
    line:
      "Translated stakeholder needs into requirements, launch plans, public tools, workflow changes, and handoff documentation."
  },
  {
    need: "Surface risks and clarify blockers",
    evidence: [
      { label: "FairRentNYC / CRS", href: "/work/fair-rent-nyc" },
      { label: "KC Town Hall", href: "/work/kc-town-hall" }
    ],
    line:
      "Made assumptions, dependencies, decisions, open questions, and stakeholder next steps visible before they became blockers."
  },
  {
    need: "Write operating documentation people use",
    evidence: [
      { label: "FairRentNYC / CRS", href: "/work/fair-rent-nyc" },
      { label: "196 / Sunday Dinner", href: "/work/196-sunday-dinner" },
      { label: "Source-Backed Team Memory", href: "/lab/source-backed-team-memory" }
    ],
    line:
      "Created decision records, source maps, action trackers, onboarding materials, and continuity documents that help people re-enter the work."
  },
  {
    need: "Onboard people into context",
    evidence: [
      { label: "196 / Sunday Dinner", href: "/work/196-sunday-dinner" },
      { label: "Source-Backed Team Memory", href: "/lab/source-backed-team-memory" }
    ],
    line:
      "Built practical onboarding and memory structures so new participants can understand norms, decisions, and next steps."
  },
  {
    need: "Improve systems without overengineering",
    evidence: [
      { label: "196 / Sunday Dinner", href: "/work/196-sunday-dinner" },
      { label: "Harry J. Epstein", href: "/work/harry-j-epstein" },
      { label: "CallNYC", href: "/work/callnyc" }
    ],
    line:
      "Started with the smallest useful structure, tested it in real conditions, and left behind maintainable workflows."
  }
] as const;

const representativeSystems = [
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
];

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
          environments, I build the operating backbone teams need to coordinate
          delivery, track status, surface risks early, document decisions,
          onboard people, and keep work moving from concept through public
          launch.
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
      <section className="mt-12 border-y border-jb-ink/10 py-8" aria-labelledby="evidence-posture">
        <div className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <div className="jb-reading">
            <p className="jb-eyebrow text-sm text-jb-blue">Evidence posture</p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink" id="evidence-posture">
              Strong claims, clear boundaries
            </h2>
            <p className="mt-3 leading-8 text-jb-ink/76">
              The proof below is intentionally conservative: each claim has to
              be clear to a hiring reader, accurate about Jamie&apos;s role, and
              bounded enough to protect private source material.
            </p>
          </div>
          <ul className="grid gap-3">
            {proofBankPrinciples.map((principle) => (
              <li className="flex gap-3 rounded-lg border border-jb-ink/12 bg-jb-paper p-4" key={principle}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span className="leading-7 text-jb-ink/76">{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
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
        <div className="mt-6 grid gap-3">
          {proofMap.map((row) => (
            <div
              className="grid gap-4 rounded-lg border border-jb-ink/12 bg-jb-paper p-4 lg:grid-cols-[0.8fr_0.9fr_1.3fr]"
              key={row.need}
            >
              <div>
                <p className="jb-meta-label text-xs text-jb-blue">Role need</p>
                <h3 className="mt-2 font-semibold text-jb-ink">{row.need}</h3>
              </div>
              <div>
                <p className="jb-meta-label text-xs text-jb-blue">Public-safe evidence</p>
                <div className="mt-2 flex flex-wrap gap-2">
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
              </div>
              <div>
                <p className="jb-meta-label text-xs text-jb-blue">Why it matters</p>
                <p className="mt-2 leading-7 text-jb-ink/76">{row.line}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-12" aria-labelledby="representative-systems">
        <div className="jb-reading">
          <p className="jb-eyebrow text-sm text-jb-blue">Representative systems</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink" id="representative-systems">
            Technical environments I can translate across
          </h2>
          <p className="mt-3 leading-8 text-jb-ink/76">
            The throughline is not one tool. It is comfort with loosely defined
            operating problems, enough technical fluency to understand the work,
            and enough restraint to avoid overengineering the fix.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {representativeSystems.map((system) => (
            <span
              className="rounded-full border border-jb-ink/12 bg-jb-paper px-3 py-1 text-sm font-semibold text-jb-ink/76"
              key={system}
            >
              {system}
            </span>
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
