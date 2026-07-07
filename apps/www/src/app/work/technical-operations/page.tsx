import type { Metadata } from "next";
import type { Route } from "next";
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

const operatingAreas = [
  {
    title: "Delivery coordination",
    text:
      "I clarify scope, surface blockers, track next steps, and coordinate work across technical and nontechnical collaborators so delivery does not depend on private memory."
  },
  {
    title: "Operating processes",
    text:
      "I turn repeated questions into planning rhythms, action trackers, workflow maps, templates, and documentation that teams can reuse."
  },
  {
    title: "Cross-team dependencies",
    text:
      "I translate between public-facing stakeholders, internal operators, technical implementers, civic partners, and small-business teams."
  },
  {
    title: "Onboarding and team durability",
    text:
      "I create handbooks, source maps, role context, gathering rhythms, and continuity materials so new collaborators can enter the work with less friction."
  },
  {
    title: "Documentation people actually use",
    text:
      "I write decision records, public-safe summaries, guides, issue pathways, runbooks, and handoffs with enough structure for people to act."
  },
  {
    title: "Reporting and continuous improvement",
    text:
      "I use status updates, Known / Open / Protected notes, retrospectives, and careful evidence language to show what is done, what is uncertain, and what needs approval."
  }
];

const proofRows = [
  {
    need: "Coordinate delivery",
    proof: "Harry J. Epstein, CallNYC, WOWList, FairRentNYC, and KC Town Hall show delivery across business, civic, community, built-environment, and public-facing technical contexts."
  },
  {
    need: "Build operating processes",
    proof: "HJE catalog/dealer workflows, 196 / Sunday Dinner continuity, WOWList event workflows, and coalition-memory systems show repeatable process design."
  },
  {
    need: "Unblock recurring problems",
    proof: "Legacy e-commerce workflows, open-data translation, and meeting-memory systems turned ambiguous work into clearer next steps."
  },
  {
    need: "Coordinate across functions",
    proof: "Work spans civic partners, small-business stakeholders, technical collaborators, organizers, artists, and public-facing users."
  },
  {
    need: "Onboard and support people",
    proof: "196 Residency, Sunday Dinner, and source-backed team memory show onboarding, context-setting, source maps, templates, and durable participation support."
  },
  {
    need: "Write operating documentation",
    proof: "Running minutes, source maps, decision records, legislative provenance materials, public guidance, templates, and handoffs appear across selected systems."
  },
  {
    need: "Report honestly on status",
    proof: "The Known / Open / Protected pattern separates what is public-safe, what needs approval, and what must remain protected."
  },
  {
    need: "Improve systems over time",
    proof: "Long-running stewardship across 14+ years shows iteration, maintenance, adoption support, and practical judgment."
  }
];

const proofLinks = [
  ["HJE operations modernization", "/work/harry-j-epstein"],
  ["FairRentNYC campaign memory", "/work/fair-rent-nyc"],
  ["Source-backed team memory", "/lab/source-backed-team-memory"]
] as const;

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">
          Role proof
        </p>
        <h1 className="mt-3 text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          I build the operational backbone teams need to stay focused,
          unblocked, and shipping: planning rhythms, delivery tracking,
          decision logs, action trackers, onboarding materials, handbooks,
          runbooks, status updates, retrospectives, and durable handoffs.
        </p>
        <p className="mt-5 leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, my work turns loosely defined needs into systems people
          can use, review, maintain, and safely transfer.
        </p>
      </div>

      <section className="mt-12" aria-labelledby="operating-backbone">
        <h2 className="text-3xl font-semibold text-jb-ink" id="operating-backbone">
          Operating backbone
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {operatingAreas.map((area) => (
            <JBCard key={area.title}>
              <h3 className="text-xl font-semibold text-jb-ink">{area.title}</h3>
              <p className="mt-3 leading-7 text-jb-ink/74">{area.text}</p>
            </JBCard>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="oti-proof">
        <h2 className="text-3xl font-semibold text-jb-ink" id="oti-proof">
          Operational need to Jamie proof
        </h2>
        <div className="mt-6 overflow-hidden rounded-lg border border-jb-ink/12 bg-jb-paper">
          <div className="grid bg-jb-blue px-5 py-3 text-sm font-semibold uppercase text-jb-paper md:grid-cols-[0.34fr_0.66fr]">
            <span>Need</span>
            <span>Proof</span>
          </div>
          {proofRows.map((row) => (
            <div
              className="grid gap-2 border-t border-jb-ink/12 px-5 py-4 md:grid-cols-[0.34fr_0.66fr]"
              key={row.need}
            >
              <h3 className="font-semibold text-jb-ink">{row.need}</h3>
              <p className="leading-7 text-jb-ink/74">{row.proof}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-3" aria-label="Selected proof links">
        {proofLinks.map(([label, href]) => (
          <Link
            className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5 font-semibold text-jb-blue hover:text-jb-green"
            href={href as Route}
            key={href}
          >
            {label}
          </Link>
        ))}
      </section>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
