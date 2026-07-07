import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { operationsProofs } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

const sections = [
  {
    title: "Operating systems built",
    items: [
      "HJE implementation and handoff systems",
      "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure",
      "196 / Sunday Dinner onboarding and continuity systems"
    ]
  },
  {
    title: "Delivery and launch",
    items: ["CallNYC", "WOWList", "HJE e-commerce"]
  },
  {
    title: "Documentation and working memory",
    items: [
      "Source maps",
      "Public guidance",
      "Resource libraries",
      "Handbooks / templates",
      "Meeting synthesis",
      "Decision records"
    ]
  },
  {
    title: "Tools and technical environments",
    items: [
      "Use web, open-data, and documentation tools to build public-facing systems",
      "Translate JavaScript / TypeScript, React / Next.js, Python / Django, SQL, Docker, Dokku, Git, and QGIS work into maintainable workflows",
      "Create source maps, handoff materials, operating records, and implementation documentation for mixed technical and nontechnical teams"
    ]
  }
];

const operationsMap = [
  "Coordinate delivery across multiple concurrent projects.",
  "Track status and surface risks early.",
  "Build planning cycles, team rituals, decision frameworks, status reporting, and retrospectives.",
  "Unblock recurring blockers before they become patterns.",
  "Coordinate dependencies across product, engineering, security, legal, communications, contracts, and external stakeholders.",
  "Onboard new collaborators with handbooks, runbooks, and operating documentation.",
  "Report team health, project status, and operational metrics honestly.",
  "Improve working systems quarter over quarter without overengineering."
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
          planning rhythms, decision logs, action trackers, onboarding materials,
          documentation systems, launch support, and durable handoffs.
        </p>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          I build the operating backbone teams need to stay focused, unblocked,
          accountable, and able to hand off work.
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
      <section className="mt-10">
        <div className="jb-reading">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Defensible proof signals
          </p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            Evidence that the pattern repeats
          </h2>
          <p className="mt-4 leading-8 text-jb-ink/76">
            These proof points are phrased for public use: strong enough to be
            useful, narrow enough to avoid overstating Jamie&apos;s role or exposing
            protected material.
          </p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {operationsProofs.map((proof) => (
            <JBCard key={proof.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-jb-ink">{proof.area}</h3>
                <span className="rounded-full border border-jb-green/30 px-3 py-1 text-xs font-semibold uppercase text-jb-green">
                  {proof.status}
                </span>
              </div>
              <p className="mt-4 leading-7 text-jb-ink/78">
                {proof.publicWording}
              </p>
              <p className="mt-4 text-sm leading-6 text-jb-ink/62">
                {proof.boundary}
              </p>
            </JBCard>
          ))}
        </div>
      </section>
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-paper p-6">
        <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
          <div>
            <h2 className="text-3xl font-bold text-jb-ink">
              How this maps to team operations
            </h2>
            <p className="mt-3 leading-7 text-jb-ink/74">
              The same pattern shows up across the work: make delivery visible,
              name what needs attention, and leave teams with reusable ways to
              keep moving.
            </p>
          </div>
          <ul className="grid gap-3 text-jb-ink/76">
            {operationsMap.map((item) => (
              <li className="flex gap-3" key={item}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
