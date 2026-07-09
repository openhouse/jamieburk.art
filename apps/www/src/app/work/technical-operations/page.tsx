import type { Metadata } from "next";
import { JBButton } from "@/components/JBButton";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

const roleFitSections = [
  {
    title: "Delivery coordination",
    items: [
      "Coordinated public-facing launches and prototypes including CallNYC, WOWList, and Harry J. Epstein e-commerce workflows.",
      "Tracked work from idea to public surface: requirements, user pathways, implementation, QA / UAT support, launch, and handoff."
    ]
  },
  {
    title: "Operating backbone",
    items: [
      "Built shared documentation, decision records, action trackers, and source maps for FairRentNYC / Commercial Rent Stabilization and NYC Artist Coalition work.",
      "Helped teams retain what was decided, what remained open, who needed follow-up, and what could safely be explained publicly."
    ]
  },
  {
    title: "Onboarding, runbooks, and handoffs",
    items: [
      "Created onboarding, invitation, hosting, continuity, and follow-through systems for 196 Artists Residency / Sunday Dinner.",
      "Created maintainable handoff materials for web, content, campaign, and community systems."
    ]
  },
  {
    title: "Status reporting and honest escalation",
    items: [
      "Use Known / Open / Protected as a practical reporting model: Known is evidence-backed and safe to act on; Open needs review, decision, owner, or additional source; Protected should not be exposed because of privacy, consent, legal sensitivity, client trust, or community safety.",
      "This is directly useful for team health, stakeholder reporting, risk visibility, and decision-making."
    ]
  },
  {
    title: "Cross-functional dependencies",
    items: [
      "Coordinated across civic, policy, legal-review, public-data, cultural, web, content, marketing, operations, and community contexts.",
      "Translated between technical and nontechnical stakeholders without turning the documentation layer into bureaucracy."
    ]
  }
];

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to stay
          focused, unblocked, accountable, and able to hand off work.
        </p>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          My strongest pattern is turning ambiguous or loosely defined operating
          problems into planning rhythms, decision logs, action trackers,
          onboarding materials, runbooks, status updates, public-safe
          documentation, risk visibility, and durable handoffs.
        </p>
        <div className="mt-8 rounded-lg border border-jb-blue/20 bg-jb-sky/15 p-5">
          <p className="font-semibold text-jb-ink">
            For technical operations, product operations, implementation, and
            public-sector digital service roles:
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <JBButton href={site.resumePath} download>
              Download resume
            </JBButton>
            <JBButton href={site.emailHref} variant="secondary">
              Contact Jamie
            </JBButton>
          </div>
        </div>
      </div>
      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {roleFitSections.map((section) => (
          <JBCard key={section.title}>
            <h2 className="text-2xl font-semibold text-jb-ink">
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
      </section>
      <section className="mt-14">
        <h2 className="text-3xl font-bold text-jb-ink">Proof bank highlights</h2>
        <p className="mt-3 max-w-3xl leading-7 text-jb-ink/72">
          These claims project from the public-safe knowledge bank and preserve
          contribution, stewardship, and collective-work boundaries.
        </p>
      </section>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {technicalOperationsProofRows.map((row) => (
          <JBCard key={row.capability}>
            <h2 className="text-2xl font-semibold text-jb-ink">{row.capability}</h2>
            <p className="mt-3 text-sm leading-6 text-jb-ink/68">{row.toward}</p>
            <ul className="mt-5 space-y-3 text-jb-ink/76">
              {row.proofs.map((proof) => (
                <li className="flex gap-3" key={proof.id}>
                  <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                  <span>{proof.shortWording ?? proof.publicWording}</span>
                </li>
              ))}
            </ul>
          </JBCard>
        ))}
      </div>
      <div className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
        <p className="font-semibold text-jb-ink">
          For technical operations, product operations, implementation, and
          public-sector digital service roles:
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <JBButton href={site.resumePath} download>
            Download resume
          </JBButton>
          <JBButton href={site.emailHref} variant="secondary">
            Contact Jamie
          </JBButton>
        </div>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
