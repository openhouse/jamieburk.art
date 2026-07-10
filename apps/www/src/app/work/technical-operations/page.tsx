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
      "Turn ambiguous, stakeholder-heavy work into requirements, workflows, decision trails, and handoffs",
      "Set planning cycles, sprint rituals, decision frameworks, and status-reporting rhythms",
      "Report up with honesty about what is working, what is blocked, and what needs leadership attention"
    ]
  },
  {
    title: "Delivery coordination",
    items: [
      "Coordinate delivery across concurrent projects from concept through public launch",
      "Track status, surface risks early, and keep next steps visible across owners",
      "Run post-launch retros that identify recurring blockers and improve the system quarter over quarter"
    ]
  },
  {
    title: "Documentation and working memory",
    items: [
      "Create source maps, public guidance, resource libraries, templates, and decision records",
      "Synthesize meetings into durable next steps instead of private transcript piles",
      "Maintain operating documentation people actually use because it matches the work"
    ]
  },
  {
    title: "Onboarding and handoffs",
    items: [
      "Build handbooks, runbooks, onboarding guides, and lightweight training materials",
      "Help new hires or new collaborators understand context without relying on one person",
      "Leave behind reusable structures for maintenance, adoption, and continuity"
    ]
  },
  {
    title: "Cross-functional coordination",
    items: [
      "Coordinate across platform, security, legal, communications, contracts, and leadership lanes",
      "Translate between technical and nontechnical stakeholders without flattening the real constraints",
      "Hold team health and operational metrics alongside delivery milestones"
    ]
  },
  {
    title: "Tools and technical environments",
    items: [
      "JavaScript / TypeScript, Node.js, React / Next.js, Ember.js, and Python / Django",
      "SQL, Git / GitHub, Docker / Dokku, QGIS, APIs, and open-data workflows",
      "Dataset documentation, requirements writing, QA / UAT support, and launch-readiness checklists"
    ]
  }
];

const proofLinks = [
  { href: "/work/harry-j-epstein", label: "Harry J. Epstein Company" },
  { href: "/work/fair-rent-nyc", label: "FairRentNYC / Commercial Rent Stabilization" },
  { href: "/work/callnyc", label: "CallNYC" },
  { href: "/work/wowlist", label: "WOWList" },
  { href: "/work/196-sunday-dinner", label: "196 Artists Residency / Sunday Dinner" },
  { href: "/lab/source-backed-team-memory", label: "Source-Backed Team Memory" }
] as const;

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <p className="jb-eyebrow text-sm text-jb-blue">Role fit</p>
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          delivery coordination, planning rhythms, risk visibility, decision
          logs, action trackers, onboarding materials, launch support, retros,
          and durable handoffs.
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
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <h2 className="jb-display-condensed text-2xl font-semibold text-jb-ink">
          Proof links
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {proofLinks.map((link) => (
            <li key={link.href}>
              <Link className="font-semibold text-jb-blue hover:text-jb-green" href={link.href}>
                {link.label}
              </Link>
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
