import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

const roleFitItems = [
  "Planning cycles, delivery tracking, status updates, and recurring meeting rhythms",
  "Decision frameworks, decision records, action trackers, and risk surfacing",
  "Onboarding paths, handbooks, runbooks, templates, and durable handoff materials",
  "Cross-functional coordination across technical, policy, communications, stakeholder, and public-facing contexts",
  "Post-launch retros, operational metrics, team-health habits, and steady improvement without overengineering"
];

const proofMap = [
  {
    project: "Harry J. Epstein Company",
    proof:
      "Legacy operations, e-commerce workflows, analytics, content, marketing, and long-running implementation stewardship."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    proof:
      "Shared campaign memory, source maps, action trackers, decision records, and public/private boundary management."
  },
  {
    project: "CallNYC.org",
    proof:
      "Civic open data translated into archived resident-facing guidance and a working prototype."
  },
  {
    project: "WOWList.org",
    proof:
      "Community-platform product work, low-cost deployment patterns, and organizer-facing workflows."
  },
  {
    project: "196 / Sunday Dinner",
    proof:
      "Onboarding, facilitation, participation systems, and continuity across recurring gatherings."
  },
  {
    project: "Source-Backed Team Memory",
    proof:
      "Lab method for decision trails, onboarding context, human review, and source-backed operating memory."
  }
];

const toolUses = [
  "JavaScript / TypeScript, React / Next.js, Node.js, Python / Django, SQL, Git / GitHub, Docker / Dokku",
  "Open-data workflows, dataset documentation, API and data-product requirements, QGIS, and public-data framing",
  "Documentation systems, source maps, meeting synthesis, decision logs, onboarding guides, templates, and handoff packages"
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
          environments, I build the operating backbone teams need to stay
          focused, unblocked, documented, and shipping: requirements, delivery
          coordination, planning cycles, risk surfacing, decision records,
          onboarding materials, handoffs, and operating documentation people
          actually use.
        </p>
      </div>
      <section className="mt-12 grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
        <div>
          <h2 className="text-3xl font-bold text-jb-ink">
            What I bring to Technical Operations
          </h2>
          <p className="mt-4 leading-7 text-jb-ink/76">
            I build the operating backbone that helps small, high-output teams
            stay focused, unblocked, documented, and shipping.
          </p>
        </div>
        <div className="space-y-5">
          <p className="text-lg leading-8 text-jb-ink/78">
            That means planning cycles, decision frameworks, delivery tracking,
            onboarding paths, status updates, meeting rhythms, handbooks,
            runbooks, retros, stakeholder communication, and the quiet
            follow-through that keeps ambiguous work from becoming recurring
            confusion.
          </p>
          <ul className="grid gap-3">
            {roleFitItems.map((item) => (
              <li
                className="rounded-lg border border-jb-ink/12 bg-jb-paper px-4 py-3 text-jb-ink/78"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mt-12">
        <div className="jb-reading">
          <h2 className="text-3xl font-bold text-jb-ink">Proof map</h2>
          <p className="mt-4 leading-7 text-jb-ink/76">
            The work looks different by setting, but the operating pattern is
            consistent: clarify what needs to happen, create usable structure,
            keep stakeholders oriented, and leave behind materials people can
            actually use.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {proofMap.map((item) => (
            <JBCard key={item.project}>
              <h3 className="text-xl font-semibold text-jb-ink">{item.project}</h3>
              <p className="mt-3 leading-7 text-jb-ink/76">{item.proof}</p>
            </JBCard>
          ))}
        </div>
      </section>
      <section className="mt-12 rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-5">
        <h2 className="text-2xl font-semibold text-jb-ink">Role-fit summary</h2>
        <p className="mt-3 text-lg leading-8 text-jb-ink/78">
          I am strongest where the work is important, ambiguous, and
          cross-functional: I clarify what needs to happen, create the operating
          documentation and rhythms, keep stakeholders oriented, and leave behind
          systems people actually use.
        </p>
      </section>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
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
      <section className="mt-12">
        <div className="jb-reading">
          <h2 className="text-3xl font-bold text-jb-ink">
            Tools I use to support the work
          </h2>
          <p className="mt-4 leading-7 text-jb-ink/76">
            These tools matter because I use them to build public-facing
            systems, structure workflows, maintain documentation, coordinate
            implementation, and support handoffs across technical and
            nontechnical teams.
          </p>
        </div>
        <ul className="mt-6 grid gap-3">
          {toolUses.map((item) => (
            <li
              className="rounded-lg border border-jb-ink/12 bg-jb-warm px-4 py-3 text-jb-ink/76"
              key={item}
            >
              {item}
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
