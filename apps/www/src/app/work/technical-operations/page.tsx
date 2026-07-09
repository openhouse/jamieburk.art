import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { JBButton } from "@/components/JBButton";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { requireReadyOrCarefulProof } from "@/data/proofs";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof for technical operations, delivery coordination, operating documentation, onboarding, reporting, public-facing systems, and durable handoffs.",
  path: "/work/technical-operations"
});

const sections = [
  {
    title: "Delivery coordination",
    items: [
      "Coordinate work across multiple concurrent projects.",
      "Clarify owners, next steps, dependencies, and launch constraints.",
      "Surface risks early enough that the team still has choices."
    ]
  },
  {
    title: "Operating practices",
    items: [
      "Build planning rhythms, decision records, action trackers, status updates, retrospectives, and handoff practices.",
      "Improve working systems over time without creating a heavy parallel bureaucracy.",
      "Report clearly on what is working, what is blocked, and what needs a decision."
    ]
  },
  {
    title: "Cross-functional unblocking",
    items: [
      "Translate between technical and nontechnical stakeholders.",
      "Coordinate across product, design, engineering, security, legal, communications, contracts, civic partners, and leadership.",
      "Escalate clearly when a decision, dependency, or risk needs attention."
    ]
  },
  {
    title: "Documentation people use",
    items: [
      "Create handbooks, runbooks, onboarding guides, source maps, public guidance, templates, and reusable reference systems.",
      "Make decisions, sources, open questions, and next steps easier to find after the meeting.",
      "Leave behind materials that help new contributors enter the work without relying on oral history."
    ]
  },
  {
    title: "Team durability",
    items: [
      "Turn repeated questions into reusable systems.",
      "Make onboarding less dependent on private memory.",
      "Support teams through transition, launch, and maintenance."
    ]
  }
];

const proofLinks = [
  { label: "HJE operations modernization", href: "/work/harry-j-epstein" },
  { label: "FairRentNYC campaign memory", href: "/work/fair-rent-nyc" },
  { label: "Source-Backed Team Memory", href: "/lab/source-backed-team-memory" },
  { label: "CallNYC civic-data prototype", href: "/work/callnyc" }
] as const;

const additionalProofs = [
  requireReadyOrCarefulProof("kc-spaces-fund-digital-infrastructure")
] as const;

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">Role proof</p>
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          I build the operational backbone teams need to stay focused,
          unblocked, and shipping: planning rhythms, delivery tracking,
          decision logs, action trackers, onboarding materials, handbooks,
          runbooks, status updates, retrospectives, and durable handoffs.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <JBButton href={site.resumePath} download>
            Download resume
          </JBButton>
          <JBButton href="/contact" variant="secondary">
            Contact Jamie
          </JBButton>
        </div>
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
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">Selected proof</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {proofLinks.map((link) => (
            <li key={link.href}>
              <Link className="font-semibold text-jb-blue hover:text-jb-green" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-jb-ink/12 pt-5">
          <h3 className="text-lg font-semibold text-jb-ink">
            Additional public-facing systems proof
          </h3>
          <ul className="mt-3 space-y-3 text-jb-ink/76">
            {additionalProofs.map((proof) => (
              <li className="flex gap-3" key={proof.id}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{proof.shortWording ?? proof.publicWording}</span>
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
