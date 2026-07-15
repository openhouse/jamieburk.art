import type { Metadata, Route } from "next";
import Link from "next/link";
import { Claim } from "@/components/citations/Claim";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const operationsMap = [
  "Turn emerging requirements into bounded plans, owners, milestones, releases, and handoffs.",
  "Make status, risks, decisions, and recurring blockers visible before teams lose time or context.",
  "Coordinate dependencies across technical, legal, communications, contracts, and external-stakeholder work.",
  "Create decision records, runbooks, source maps, and onboarding materials people can use without replaying every meeting.",
  "Report what is working, what remains open, and what needs human judgment so teams can improve without overengineering."
];

const technicalOperationsClaimIds = [
  "CLM-CRS-SHARED-MEMORY-SYSTEM",
  "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE",
  "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT",
  "CLM-SOURCE-BACKED-MEMORY-BOUNDED-SPRINT",
  "CLM-FAIRRENT-WEB-RELAUNCH-2023",
  "CLM-196-RESIDENCY-ONBOARDING-WORKFLOW",
  "CLM-VACANCY-QUARTERLY-CORPUS"
];

const proofMap = [
  {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein",
    action:
      "I helped translate legacy operating knowledge into web, e-commerce, analytics, marketing, content, and workflow improvements.",
    result:
      "Customers gained a clearer way to find and order products, while internal stakeholders gained more repeatable digital workflows."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc",
    action:
      "I built and stewarded shared campaign memory, helped coordinate and implement a versioned website relaunch, organized a 20-year HUD-USPS vacancy-data corpus, and scoped a privacy-preserving commercial-data pilot for collective civic work.",
    result:
      "Collaborators could trace decisions and source lineage, launch public action tools, and evaluate a smallest-serious data-product scope while protected strategy, legal-review context, and confidential records stayed private."
  },
  {
    project: "CallNYC.org",
    href: "/work/callnyc",
    action:
      "I built an independent prototype that translated constituent-services records into issue-oriented public guidance.",
    result:
      "The public interface made issue pathways, district context, and possible next steps legible without requiring people to decode the complete dataset first."
  },
  {
    project: "196 Artists Residency / Sunday Dinner",
    href: "/work/196-sunday-dinner",
    action:
      "I created repeatable hosting practices and a documented residency acceptance and onboarding workflow, supported by dedicated collaboration workspaces.",
    result:
      "The participation structure supported 300+ gatherings, 20+ resident artists, and reusable project and media handoffs without publishing private community records."
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
        <h1 className="text-4xl font-bold text-jb-ink sm:text-5xl">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I clarify requirements, coordinate delivery, and build
          decision, onboarding, and handoff materials so teams can make
          decisions, launch public work, and transfer ownership without losing
          context.
        </p>
      </div>
      <section className="mt-10 grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
        <JBCard>
          <h2 className="text-2xl font-semibold text-jb-ink">
            Operating work I deliver
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
          <h2 className="text-2xl font-semibold text-jb-ink">
            Selected proof: my work and what became usable
          </h2>
          <dl className="mt-5 space-y-4">
            {proofMap.map((item) => (
              <div
                className="border-t border-jb-ink/12 pt-4 first:border-t-0 first:pt-0"
                key={item.project}
              >
                <dt className="font-semibold text-jb-ink">
                  <Link
                    className="text-jb-blue hover:text-jb-green"
                    href={item.href as Route}
                  >
                    {item.project}
                  </Link>
                </dt>
                <dd className="mt-2 text-sm leading-6 text-jb-ink/72">
                  <span className="font-semibold text-jb-ink">My work:</span>{" "}
                  {item.action}
                </dd>
                <dd className="mt-2 text-sm leading-6 text-jb-ink/72">
                  <span className="font-semibold text-jb-ink">
                    What became usable:
                  </span>{" "}
                  {item.result}
                </dd>
              </div>
            ))}
          </dl>
        </JBCard>
      </section>
      <section className="mt-10 border-y border-jb-ink/12 py-8">
        <h2 className="text-2xl font-semibold text-jb-ink">
          Source-backed operating proof
        </h2>
        <ul className="mt-5 grid gap-x-8 gap-y-4 text-jb-ink/76 md:grid-cols-2">
          {technicalOperationsClaimIds.map((claimId) => (
            <li className="flex gap-3" key={claimId}>
              <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-green" />
              <Claim
                claimId={claimId}
                projection="technical-operations"
                surface="/work/technical-operations"
              />
            </li>
          ))}
        </ul>
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
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
