import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const operationsMap = [
  "Coordinate delivery across concurrent projects and keep work moving from concept through public launch.",
  "Track status, surface risks early, and name recurring blockers before they become patterns.",
  "Build planning cycles, team rituals, decision frameworks, status reporting, and retrospectives.",
  "Coordinate dependencies across product, engineering, security, legal, communications, contracts, and external stakeholders.",
  "Onboard collaborators with handbooks, runbooks, operating documentation, source maps, and decision records.",
  "Report team health, project status, and operational metrics with honesty about what is and is not working.",
  "Improve working systems over time without overengineering."
];

const proofMap = [
  {
    project: "HJE",
    proof:
      "Jamie helped translate legacy product and operating knowledge into customer-facing e-commerce and maintainable digital workflows."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    proof:
      "Jamie helped coalition collaborators keep sensitive civic work coordinated by building shared campaign memory, source maps, action trackers, and public/private review lanes."
  },
  {
    project: "CallNYC",
    proof:
      "Jamie independently turned CouncilStat records into issue pathways and next-step guidance residents could navigate; the prototype remains archived and unofficial."
  },
  {
    project: "WOWList",
    proof:
      "Jamie co-built a community calendar that let DIY organizers publish and distribute events through followable local-interest feeds."
  },
  {
    project: "196 / Sunday Dinner",
    proof:
      "Jamie created hosting, onboarding, and continuity systems that helped recurring gatherings and resident-artist work continue without publishing private community records."
  },
  {
    project: "KC Spaces Fund",
    proof:
      "Jamie supported organizers behind the scenes by building campaign-site, fundraising-display, application, and sign-up infrastructure for a 2020 mutual-aid fund."
  },
  {
    project: "KC Town Hall",
    proof:
      "Jamie supported a long-horizon adaptive-reuse effort by structuring public-benefit documentation and municipal-review materials."
  },
  {
    project: "Source-Backed Team Memory",
    proof:
      "Jamie developed a human-reviewed method that turns meetings and source trails into correctable decision records, onboarding context, and team memory."
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
        <h1 className="break-words text-4xl font-bold text-jb-ink sm:text-5xl">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          I coordinate ambiguous public-facing technical work from scoping
          through launch: clarifying ownership and requirements, keeping
          dependencies and decisions visible, and leaving teams with workflows,
          onboarding, and handoffs they can continue using.
        </p>
        <p className="mt-4 leading-8 text-jb-ink/72">
          The proof below shows that operating role in e-commerce, civic data,
          coalition work, community platforms, and source-backed knowledge
          systems, with collective credit and public/private limits kept visible.
        </p>
        <p className="mt-4 leading-8 text-jb-ink/72">
          I also treat implementation as social-system design: identify who can
          enter, what each person can contribute, how those signals become
          decisions or next steps, and what documentation lets another person
          continue the loop. WOWList made community vocabulary a publishing and
          discovery mechanism; FairRentNYC made meetings and sources reusable
          coalition memory; Sunday Dinner made hosting rhythms and handoffs part
          of continuity.
        </p>
      </div>
      <section className="mt-10 grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
        <JBCard>
          <h2 className="text-2xl font-semibold text-jb-ink">
            How this maps to team operations
          </h2>
          <ul className="mt-5 space-y-3 text-jb-ink/76">
            {operationsMap.map((item) => (
              <li className="flex gap-3" key={item}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-green" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </JBCard>
        <JBCard>
          <h2 className="text-2xl font-semibold text-jb-ink">Proof map</h2>
          <dl className="mt-5 space-y-4">
            {proofMap.map((item) => (
              <div key={item.project}>
                <dt className="font-semibold text-jb-ink">{item.project}</dt>
                <dd className="mt-1 leading-7 text-jb-ink/72">{item.proof}</dd>
              </div>
            ))}
          </dl>
        </JBCard>
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
                  <span>{proof.detailedPublicWording ?? proof.publicWording}</span>
                </li>
              ))}
            </ul>
          </JBCard>
        ))}
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
