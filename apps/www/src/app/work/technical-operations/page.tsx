import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const operatingBackboneFit = [
  {
    need: "Coordinate delivery across concurrent projects",
    proof:
      "THICK ARTS client work; HJE e-commerce and operations; CallNYC; WOWList; FairRentNYC coordination systems"
  },
  {
    need: "Surface risks and blockers early",
    proof:
      "FairRentNYC Known / Open / Protected framing; KC Town Hall public-benefit documentation; source-backed memory practices"
  },
  {
    need: "Build planning rhythms and decision records",
    proof:
      "NYC Artist Coalition / FairRentNYC running minutes, action trackers, decision records, and source maps"
  },
  {
    need: "Onboard and support new collaborators",
    proof:
      "196 Artists Residency / Sunday Dinner intake, hosting, onboarding, facilitation, documentation, and continuity systems"
  },
  {
    need: "Write usable operating documentation",
    proof:
      "HJE handoffs; FairRentNYC campaign memory; Source-Backed Team Memory templates and source maps"
  },
  {
    need: "Report honestly on what is and is not working",
    proof:
      "Public-safe summaries, open questions, protected context, and continue / revise / stop recommendations"
  },
  {
    need: "Improve working systems over time",
    proof:
      "14+ years of recurring web, civic, cultural, documentation, and implementation work"
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
          environments, I build the operating backbone teams need to move public
          work from ambiguity to launch: requirements, planning cycles, risk
          surfacing, decision records, onboarding materials, handoffs, and
          operating documentation people actually use.
        </p>
      </div>
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <div className="jb-reading">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Operating backbone fit
          </p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            What technical operations teams need
          </h2>
          <p className="mt-4 leading-8 text-jb-ink/76">
            The repeated pattern is practical: coordinate delivery, surface
            blockers, document decisions, support onboarding, and leave a team
            with a system it can keep using.
          </p>
        </div>
        <div className="mt-6 overflow-hidden rounded-lg border border-jb-ink/12 bg-jb-paper">
          <div className="grid gap-px bg-jb-ink/10">
            {operatingBackboneFit.map((row) => (
              <div
                className="grid gap-3 bg-jb-paper p-4 md:grid-cols-[0.42fr_0.58fr]"
                key={row.need}
              >
                <h3 className="font-semibold text-jb-ink">{row.need}</h3>
                <p className="leading-7 text-jb-ink/76">{row.proof}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
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
      <section className="mt-10 rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">For hiring readers</h2>
        <p className="mt-4 text-xl leading-9 text-jb-ink/78">
          I am strongest where the work is important, cross-functional, and not
          yet fully operationalized. I clarify requirements, map workflows,
          coordinate stakeholders, surface risks, write the documentation people
          actually use, and leave behind handoffs that help a team keep moving
          after launch.
        </p>
      </section>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
