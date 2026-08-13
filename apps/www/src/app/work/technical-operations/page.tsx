import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { Claim, References } from "@/components/citations";
import { ResumeCTA } from "@/components/ResumeCTA";
import { getProofById } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const roleFitPaths = [
  {
    href: "#public-product-delivery",
    label: "Public product delivery",
    note: "Problem framing, participatory discovery, implementation, adoption, instrumentation, and stewardship."
  },
  {
    href: "#product-operations",
    label: "Product operations",
    note: "Requirements, incremental releases, verification, operating patterns, business impact, and handoff."
  },
  {
    href: "#campaign-project-operations",
    label: "Campaign project operations",
    note: "Coalition coordination, public communications, testimony, source maps, decisions, and follow-through."
  }
] as const;

const deliverySequence = [
  {
    label: "Frame",
    text: "Turn a recurring question or lived problem into a bounded requirement, with evidence and limits visible."
  },
  {
    label: "Decide",
    text: "Name the owner, tradeoff, risk, next action, and information still needed."
  },
  {
    label: "Deliver",
    text: "Coordinate the smallest useful release, public action, or operating change across the people involved."
  },
  {
    label: "Verify",
    text: "Inspect the real path, distinguish activity from outcome, and report what the evidence can and cannot establish."
  },
  {
    label: "Transfer",
    text: "Leave reusable patterns, decision history, ownership, and next steps so the work can continue without me."
  }
] as const;

function proofText(id: string, detailed = false) {
  const proof = getProofById(id);
  if (!proof) throw new Error(`Missing governed proof ${id}`);
  return detailed
    ? proof.detailedPublicWording ?? proof.publicWording
    : proof.shortWording ?? proof.publicWording;
}

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Concrete role-fit evidence across public product delivery, product operations, campaign project operations, and durable handoffs.",
  path: "/work/technical-operations"
});

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="max-w-4xl">
        <p className="jb-section-label">Role-fit evidence</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/78">
          I turn high-context work into decisions a team can execute: a clear
          requirement, an owned next step, a usable release, an honest check of
          the result, and enough documentation for the work to continue.
        </p>
      </div>

      <nav aria-label="Role-fit evidence" className="mt-10 border-t border-jb-ink/20">
        {roleFitPaths.map((item, index) => (
          <Link
            className="jb-index-link group sm:grid-cols-[3rem_0.36fr_0.64fr] sm:items-baseline"
            href={item.href as Route}
            key={item.href}
          >
            <span className="font-label text-sm text-jb-blue">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-lg font-semibold text-jb-blue group-hover:text-jb-green">
              {item.label}
            </span>
            <span className="text-sm leading-6 text-jb-ink/72">{item.note}</span>
          </Link>
        ))}
      </nav>

      <section className="scroll-mt-28 border-t-4 border-jb-blue py-12" id="public-product-delivery">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="jb-section-label">01 / Product</p>
            <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
              Public product delivery
            </h2>
            <p className="mt-4 leading-7 text-jb-ink/74">
              Strongest evidence: a working community product and a resident-facing
              civic-data prototype.
            </p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-jb-ink">
                Build, learn, operate, continue
              </h3>
              <div className="mt-3 leading-8 text-jb-ink/78">
                <Claim
                  as="p"
                  claimId="CLM-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026"
                  projection="case-study"
                  surface="/work/technical-operations"
                  pageId="technical-operations"
                  occurrenceId="wowlist-senior-product-practice"
                />
              </div>
              <Link className="mt-3 inline-block font-semibold text-jb-blue hover:text-jb-green" href="/work/wowlist">
                Inspect the WOW List case
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-jb-ink">
                Translate an administrative dataset into a resident pathway
              </h3>
              <p className="mt-3 leading-8 text-jb-ink/78">
                {proofText("callnyc-civic-data-guidance", true)}
              </p>
              <Link className="mt-3 inline-block font-semibold text-jb-blue hover:text-jb-green" href="/work/callnyc">
                Inspect the CallNYC case
              </Link>
            </div>
            <div className="grid gap-5 border-y border-jb-ink/20 py-6 md:grid-cols-2">
              <div>
                <h3 className="font-label text-sm uppercase tracking-wide text-jb-green">
                  What this proves
                </h3>
                <p className="mt-2 leading-7 text-jb-ink/76">
                  Product definition, implementation, participatory discovery,
                  organizer adoption, communications, instrumentation, data
                  translation, and long-term stewardship.
                </p>
              </div>
              <div>
                <h3 className="font-label text-sm uppercase tracking-wide text-jb-blue">
                  Scope boundary
                </h3>
                <p className="mt-2 leading-7 text-jb-ink/76">
                  WOW List was co-built with Richard Caceres and wider community
                  labor. CallNYC is archived, unofficial, and independently built.
                  These cases do not claim government product authority or historic
                  accessibility compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 border-t-4 border-jb-green py-12" id="product-operations">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="jb-section-label">02 / Operations</p>
            <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
              Product operations
            </h2>
            <p className="mt-4 leading-7 text-jb-ink/74">
              Strongest evidence: long-running commercial implementation and a
              public-safe release-to-handoff specimen.
            </p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-jb-ink">
                From recurring question to maintainable release
              </h3>
              <p className="mt-3 leading-8 text-jb-ink/78">
                {proofText("hje-modernization-stewardship", true)}
              </p>
              <p className="mt-3 leading-8 text-jb-ink/78">
                The public specimen follows a real operating sequence: listen to a
                customer or team question, frame a bounded requirement, ship an
                incremental change, inspect the customer path, and preserve reusable
                patterns, ownership, and next actions.
              </p>
              <p className="mt-3 font-semibold leading-7 text-jb-green">
                {proofText("hje-revenue-growth-contribution")}
              </p>
              <Link className="mt-3 inline-block font-semibold text-jb-blue hover:text-jb-green" href="/work/harry-j-epstein">
                Inspect the release-to-handoff specimen
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-jb-ink">
                Preserve operating decisions after the meeting
              </h3>
              <p className="mt-3 leading-8 text-jb-ink/78">
                {proofText("fair-rent-campaign-memory", true)}
              </p>
            </div>
            <div className="grid gap-5 border-y border-jb-ink/20 py-6 md:grid-cols-2">
              <div>
                <h3 className="font-label text-sm uppercase tracking-wide text-jb-green">
                  What this proves
                </h3>
                <p className="mt-2 leading-7 text-jb-ink/76">
                  Requirements framing, incremental implementation, verification,
                  analytics judgment, reusable operating patterns, documentation,
                  explicit ownership, and business contribution.
                </p>
              </div>
              <div>
                <h3 className="font-label text-sm uppercase tracking-wide text-jb-blue">
                  Scope boundary
                </h3>
                <p className="mt-2 leading-7 text-jb-ink/76">
                  The workflow is a faithful public-safe reconstruction, not a
                  company document. Private dashboards and operating materials stay
                  private; this page does not invent a formal go/no-go decision or
                  runbook-adoption metric.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-28 border-t-4 border-jb-ochre py-12" id="campaign-project-operations">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div>
            <p className="jb-section-label">03 / Campaigns</p>
            <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
              Campaign project operations
            </h2>
            <p className="mt-4 leading-7 text-jb-ink/74">
              Strongest evidence: coalition planning, public communications,
              testimony, source review, and shared follow-through.
            </p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-jb-ink">
                Turn coalition listening into coordinated action
              </h3>
              <p className="mt-3 leading-8 text-jb-ink/78">
                {proofText("nyc-artist-coalition-civic-systems", true)}
              </p>
              <p className="mt-3 leading-8 text-jb-ink/78">
                {proofText("fair-rent-source-map", true)}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-jb-ink">
                Review a public report before release
              </h3>
              <div className="mt-3 leading-8 text-jb-ink/78">
                <Claim
                  as="p"
                  claimId="CLM-NYCAC-SBU-REPORT-REVIEW-2026"
                  projection="case-study"
                  surface="/work/technical-operations"
                  pageId="technical-operations"
                  occurrenceId="sbu-report-review"
                />
              </div>
              <Link className="mt-3 inline-block font-semibold text-jb-blue hover:text-jb-green" href="/work/fair-rent-nyc">
                Inspect the coalition and campaign case
              </Link>
            </div>
            <div className="grid gap-5 border-y border-jb-ink/20 py-6 md:grid-cols-2">
              <div>
                <h3 className="font-label text-sm uppercase tracking-wide text-jb-green">
                  What this proves
                </h3>
                <p className="mt-2 leading-7 text-jb-ink/76">
                  Facilitation, priority-setting, run-of-show and call-script
                  production, testimony planning, public web implementation,
                  legislative source review, campaign memory, and careful public
                  communication.
                </p>
              </div>
              <div>
                <h3 className="font-label text-sm uppercase tracking-wide text-jb-blue">
                  Scope boundary
                </h3>
                <p className="mt-2 leading-7 text-jb-ink/76">
                  Coalition outcomes are collective. The public record does not turn
                  this into sole campaign leadership, national portfolio experience,
                  legislative authority, or an advocacy budget-management claim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-jb-ink/20 bg-jb-warm py-10">
        <div className="px-5 sm:px-8">
          <p className="jb-section-label">Delivery sequence</p>
          <h2 className="mt-3 text-3xl leading-tight text-jb-ink">
            How I make a plan inspectable
          </h2>
          <ol className="mt-8 grid border-t border-jb-ink/20 md:grid-cols-5">
            {deliverySequence.map((item, index) => (
              <li className="border-b border-jb-ink/20 py-5 md:border-r md:px-4 md:last:border-r-0" key={item.label}>
                <span className="font-label text-sm text-jb-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-jb-ink">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-jb-ink/74">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="prose mt-10 max-w-none prose-headings:text-jb-ink prose-a:text-jb-blue">
        <References pageId="technical-operations" />
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
