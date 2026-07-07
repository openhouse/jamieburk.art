import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { operationsProofs, proofBankPrinciples } from "@/data/proofs";
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
      "Planning rhythms and action trackers",
      "Cross-functional coordination across technical and nontechnical stakeholders",
      "Risk surfacing before launch or handoff",
      "Stakeholder updates that make status, blockers, and next steps clear"
    ]
  },
  {
    title: "Operating documentation",
    items: [
      "Decision records and source maps",
      "Handbooks, runbooks, templates, and reusable checklists",
      "Public guidance and internal working memory",
      "Documentation systems that survive beyond a meeting or launch"
    ]
  },
  {
    title: "Onboarding and handoff",
    items: [
      "Contributor onboarding materials",
      "Resident-artist and community continuity systems",
      "Implementation notes for legacy business workflows",
      "Durable handoffs for future maintainers and operators"
    ]
  },
  {
    title: "Public-facing launch support",
    items: ["CallNYC", "WOWList", "HJE e-commerce", "Public-safe coalition materials"]
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
    need: "Coordinate delivery across loosely defined work",
    evidence: [
      { label: "Harry J. Epstein", href: "/work/harry-j-epstein" },
      { label: "CallNYC", href: "/work/callnyc" },
      { label: "WOWList", href: "/work/wowlist" }
    ],
    line:
      "Translated stakeholder needs into requirements, public tools, workflow changes, launch support, and handoff documentation."
  },
  {
    need: "Surface risks and clarify blockers",
    evidence: [
      { label: "FairRentNYC / CRS", href: "/work/fair-rent-nyc" },
      { label: "KC Town Hall", href: "/work/kc-town-hall" }
    ],
    line:
      "Made assumptions, dependencies, decisions, open questions, and next steps visible before they became background noise."
  },
  {
    need: "Write documentation people use",
    evidence: [
      { label: "FairRentNYC / CRS", href: "/work/fair-rent-nyc" },
      { label: "196 / Sunday Dinner", href: "/work/196-sunday-dinner" },
      { label: "Source-Backed Team Memory", href: "/lab/source-backed-team-memory" }
    ],
    line:
      "Created decision records, source maps, action trackers, onboarding materials, and continuity documents that help people re-enter the work."
  },
  {
    need: "Keep AI-assisted memory reviewable",
    evidence: [{ label: "Source-Backed Team Memory", href: "/lab/source-backed-team-memory" }],
    line:
      "Uses source grounding, attribution, open-question preservation, privacy boundaries, and human review before anything becomes accepted team memory."
  }
] as const;

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">Role-fit proof</p>
        <h1 className="text-4xl font-bold text-jb-ink sm:text-5xl">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to coordinate
          delivery, surface risks early, document decisions, onboard people,
          report clearly, and help emerging work move from concept through
          public launch.
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
            <p className="text-sm font-semibold uppercase text-jb-blue">Evidence posture</p>
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
          <p className="text-sm font-semibold uppercase text-jb-blue">Proof map</p>
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
                <p className="text-xs font-semibold uppercase text-jb-blue">Role need</p>
                <h3 className="mt-2 font-semibold text-jb-ink">{row.need}</h3>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-jb-blue">Public-safe evidence</p>
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
                <p className="text-xs font-semibold uppercase text-jb-blue">Why it matters</p>
                <p className="mt-2 leading-7 text-jb-ink/76">{row.line}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-12" aria-labelledby="proof-bank-projection">
        <div className="jb-reading">
          <p className="text-sm font-semibold uppercase text-jb-blue">Knowledge bank projection</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink" id="proof-bank-projection">
            Public proof with review boundaries
          </h2>
          <p className="mt-3 leading-8 text-jb-ink/76">
            These are selected public-safe projections from the knowledge bank,
            not the private source archive.
          </p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {operationsProofs.map((proof) => (
            <JBCard key={proof.id}>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-jb-ink">{proof.title}</h3>
                <span className="rounded-full border border-jb-blue/20 px-2 py-1 text-xs font-semibold uppercase text-jb-blue">
                  {proof.status}
                </span>
              </div>
              <p className="mt-3 leading-7 text-jb-ink/76">{proof.publicSummary}</p>
              <p className="mt-3 text-sm font-semibold text-jb-green">{proof.roleFit}</p>
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
