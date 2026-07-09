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
  "delivery coordination across multiple projects",
  "planning cycles, sprint rituals, and status reporting",
  "decision records, action trackers, and risk surfacing",
  "onboarding guides, handbooks, runbooks, and handoff documentation",
  "cross-team coordination across technical, legal/policy, communications, stakeholder, and public-facing contexts",
  "honest reporting on what moved, what is blocked, what decision is needed, and what happens next",
  "post-launch retros, team health habits, operational metrics, and continuous improvement without overengineering"
];

const proofMap = [
  {
    title: "Coordinate delivery and surface risks early",
    body:
      "FairRentNYC / Commercial Rent Stabilization shows shared campaign memory, action trackers, source maps, decision records, and follow-up systems across many stakeholders."
  },
  {
    title: "Build operating processes that scale",
    body:
      "Harry J. Epstein Company shows long-term web, e-commerce, analytics, content, marketing, and workflow stewardship for a real operating business."
  },
  {
    title: "Write documentation people actually use",
    body:
      "Across FairRentNYC, CallNYC, HJE, WOWList, and Source-Backed Team Memory, the work leaves behind source maps, public guidance, meeting memory, resource libraries, templates, and handoffs."
  },
  {
    title: "Onboard and support people into complex work",
    body:
      "196 Artists Residency / Sunday Dinner and WOWList show onboarding, participation systems, organizer workflows, and continuity practices."
  },
  {
    title: "Improve the operation over time",
    body:
      "The repeated pattern is: clarify what is known, name what is open, protect what should stay private, and leave a system the next person can keep using."
  }
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
      <div className="mt-8 rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-5">
        <p className="text-lg font-semibold leading-7 text-jb-ink">
          This page is the fastest role-fit surface for Technical Operations
          Manager, Technical Project Manager, Product Operations,
          Implementation, and public-sector digital service roles.
        </p>
      </div>
      <section className="mt-12 grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
        <div>
          <h2 className="text-3xl font-bold text-jb-ink">
            Role fit for Technical Operations Manager
          </h2>
          <p className="mt-4 leading-7 text-jb-ink/76">
            I build the operating backbone teams need to stay focused,
            unblocked, documented, and shipping.
          </p>
        </div>
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
      </section>
      <section className="mt-12">
        <div className="jb-reading">
          <h2 className="text-3xl font-bold text-jb-ink">
            How my proof maps to the role
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {proofMap.map((item) => (
            <JBCard key={item.title}>
              <h3 className="text-xl font-semibold text-jb-ink">{item.title}</h3>
              <p className="mt-3 leading-7 text-jb-ink/76">{item.body}</p>
            </JBCard>
          ))}
        </div>
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
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
