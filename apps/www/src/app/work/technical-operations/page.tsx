import type { Metadata } from "next";
import Link from "next/link";
import { JBButton } from "@/components/JBButton";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

const roleFitBullets = [
  "Coordinate delivery across multiple concurrent projects from concept through public launch.",
  "Surface risks early and turn recurring blockers into process improvements.",
  "Build planning cycles, sprint rituals, decision frameworks, status reporting, and post-launch retrospectives.",
  "Coordinate across product, engineering, design, communications, legal, security, contracts, leadership, and external stakeholder contexts.",
  "Onboard new collaborators with guides, templates, source maps, and early-week context.",
  "Write and maintain handbooks, runbooks, operating documentation, and principles that codify how a team works.",
  "Report honestly on team health, project status, operational metrics, and what is or is not working.",
  "Improve working systems quarter over quarter without overengineering."
];

const relevantProofLinks = [
  { label: "Harry J. Epstein Company", href: "/work/harry-j-epstein" },
  { label: "FairRentNYC / Commercial Rent Stabilization", href: "/work/fair-rent-nyc" },
  { label: "CallNYC.org", href: "/work/callnyc" },
  { label: "Source-Backed Team Memory", href: "/lab/source-backed-team-memory" },
  { label: "WOWList.org", href: "/work/wowlist" },
  { label: "196 Artists Residency / Sunday Dinner", href: "/work/196-sunday-dinner" }
] as const;

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
          I build the operating backbone that helps public-facing technical
          teams stay focused, unblocked, and shipping: delivery tracking, risk
          surfacing, planning rhythms, decision frameworks, onboarding guides,
          handbooks, runbooks, reporting, retrospectives, operational metrics,
          and durable handoffs.
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
      <section className="mt-12 rounded-lg border border-jb-ink/12 bg-jb-paper p-6">
        <h2 className="text-3xl font-bold text-jb-ink">
          Role fit for Technical Operations Manager
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {roleFitBullets.map((item) => (
            <li className="flex gap-3 leading-7 text-jb-ink/76" key={item}>
              <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-jb-ink">Relevant proof</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relevantProofLinks.map((item) => (
            <Link
              className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5 font-semibold text-jb-blue hover:border-jb-blue hover:text-jb-green"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
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
          Use this page for OTI / technical operations referrals.
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
