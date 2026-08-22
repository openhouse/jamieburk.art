import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { ResumeCTA } from "@/components/ResumeCTA";
import {
  requireReadyOrCarefulProof,
  technicalOperationsProofRows
} from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const signatureSituations = [
  {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein" as Route,
    situation:
      "An 80+ year-old industrial business needed to adapt online without losing the knowledge and voice that made it distinctive.",
    responsibility:
      "I maintained and improved the web and e-commerce presence, coordinated incremental releases, and translated legacy operating knowledge into searchable content, analytics, marketing, and operational workflows.",
    resultProofIds: [
      "hje-modernization-stewardship",
      "hje-revenue-growth-contribution"
    ],
    evidenceStatus:
      "Sustained implementation with a carefully framed contribution to business growth."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc" as Route,
    situation:
      "A coalition working across public advocacy, policy research, press, and direct engagement with elected officials needed shared memory without exposing private context.",
    responsibility:
      "I synthesized meetings, decisions, action items, public sources, policy questions, and stakeholder next steps into shared memory and actionable workstreams.",
    resultProofIds: ["fair-rent-campaign-memory", "fair-rent-source-map"],
    evidenceStatus:
      "Maintained coordination and source-trace resources for shared work; no policy outcome is attributed to the documentation alone."
  },
  {
    project: "CallNYC",
    href: "/work/callnyc" as Route,
    situation:
      "Open constituent-services data needed to become resident-facing issue paths and next-step guidance.",
    responsibility:
      "I built an independent follow-on to the New York City Council's first CouncilStat hackathon and made its archived, unofficial status clear.",
    resultProofIds: ["callnyc-civic-data-guidance"],
    evidenceStatus:
      "Delivered resident-facing prototype with verified public coverage; current-service adoption and resident outcomes are not claimed."
  }
].map((item) => ({
  ...item,
  results: item.resultProofIds.map(requireReadyOrCarefulProof)
}));

const operatingMethod = [
  {
    term: "Frame the work",
    detail:
      "Clarify the need, the people involved, the constraints, and what remains unknown."
  },
  {
    term: "Make ownership visible",
    detail:
      "Map responsibilities, dependencies, decisions, and the paths that require review."
  },
  {
    term: "Create a delivery rhythm",
    detail:
      "Use plans, working sessions, status signals, and documentation to keep parallel work moving."
  },
  {
    term: "Support adoption",
    detail:
      "Prepare the interface, guidance, launch support, and feedback loops people need to use the work."
  },
  {
    term: "Leave a useful handoff",
    detail:
      "Transfer source maps, decision records, runbooks, and open questions so the next person can continue."
  }
];

const proofDestinations: Record<string, { project: string; href: string }> = {
  "technical-operations-operating-backbone": {
    project: "Cross-project operating pattern",
    href: "/work"
  },
  "hje-modernization-stewardship": {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein"
  },
  "hje-revenue-growth-contribution": {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein"
  },
  "fair-rent-campaign-memory": {
    project: "FairRentNYC",
    href: "/work/fair-rent-nyc"
  },
  "fair-rent-source-map": {
    project: "FairRentNYC",
    href: "/work/fair-rent-nyc"
  },
  "nyc-artist-coalition-public-web-infrastructure": {
    project: "NYC Artist Coalition",
    href: "/work/fair-rent-nyc"
  },
  "nyc-artist-coalition-civic-systems": {
    project: "NYC Artist Coalition",
    href: "/work/fair-rent-nyc"
  },
  "callnyc-civic-data-guidance": {
    project: "CallNYC",
    href: "/work/callnyc"
  },
  "wowlist-community-platform": {
    project: "WOWList",
    href: "/work/wowlist"
  },
  "sunday-dinner-196-participation-infrastructure": {
    project: "196 / Sunday Dinner",
    href: "/work/196-sunday-dinner"
  },
  "kc-town-hall-public-benefit-documentation": {
    project: "KC Town Hall",
    href: "/work/kc-town-hall"
  },
  "kc-spaces-fund-digital-infrastructure": {
    project: "KC Spaces Fund",
    href: "https://kcspacesfund.com/"
  },
  "source-backed-team-memory-method": {
    project: "Source-Backed Team Memory",
    href: "/lab/source-backed-team-memory"
  }
};

function destinationsFor(proofIds: string[]) {
  return proofIds.reduce<Array<{ project: string; href: string }>>((items, id) => {
    const destination = proofDestinations[id];

    if (
      destination &&
      !items.some(
        (item) => item.project === destination.project && item.href === destination.href
      )
    ) {
      items.push(destination);
    }

    return items;
  }, []);
}

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

export default function TechnicalOperationsPage() {
  return (
    <article className="jb-frame py-14">
      <header className="grid gap-8 border-b border-jb-ink/16 pb-14 lg:grid-cols-[0.32fr_0.68fr]">
        <h1 className="text-4xl leading-[0.98] text-jb-ink xl:text-5xl">
          Technical Operations &amp; Implementation
        </h1>
        <div className="max-w-[68ch] space-y-5 text-xl leading-8 text-jb-ink/78">
          <p>
            I create the operating structure complex teams need to move
            public-facing technical work from ambiguity to launch.
          </p>
          <p>
            I clarify requirements, map workflows, coordinate delivery, surface
            risk, maintain decision records, prepare onboarding and handoff
            materials, and improve working systems over time.
          </p>
        </div>
      </header>

      <section className="border-b border-jb-ink/16 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
          <div>
            <h2 className="text-4xl leading-tight text-jb-ink">
              Three situations, one operating practice
            </h2>
            <p className="mt-5 max-w-[32ch] leading-7 text-jb-ink/72">
              Sustained business operations, coalition memory, and a
              resident-facing civic prototype show the practice in different
              conditions.
            </p>
          </div>
          <div className="divide-y divide-jb-ink/16 border-y border-jb-ink/16">
            {signatureSituations.map((item) => (
              <article className="py-8 first:pt-0 last:pb-0" key={item.project}>
                <h3 className="text-3xl leading-tight text-jb-ink">
                  <Link
                    className="text-jb-blue hover:text-jb-green"
                    href={item.href}
                  >
                    {item.project}
                  </Link>
                </h3>
                <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                    Situation
                  </dt>
                  <dd className="leading-7 text-jb-ink/76">{item.situation}</dd>
                  <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                    My responsibility
                  </dt>
                  <dd className="leading-7 text-jb-ink/76">
                    {item.responsibility}
                  </dd>
                  <dt className="font-label text-sm uppercase tracking-[0.055em] text-jb-blue">
                    What became usable
                  </dt>
                  <dd>
                    <ul className="space-y-3 text-jb-ink/76">
                      {item.results.map((proof) => (
                        <li className="leading-7" key={proof.id}>
                          {proof.publicWording}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm leading-6 text-jb-ink/62">
                      <span className="font-semibold text-jb-ink/72">
                        Evidence status:
                      </span>{" "}
                      {item.evidenceStatus}
                    </p>
                  </dd>
                </dl>
                <Link
                  className="mt-6 inline-flex min-h-11 items-center border-b border-jb-blue font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
                  href={item.href}
                >
                  Read case study
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-jb-ink/16 py-14 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <h2 className="text-4xl leading-tight text-jb-ink">
            How I move the work
          </h2>
          <p className="mt-5 max-w-[32ch] leading-7 text-jb-ink/72">
            The tools change with the team. The operating sequence stays
            recognizable.
          </p>
        </div>
        <ol className="border-t border-jb-ink/16">
          {operatingMethod.map((item) => (
            <li
              className="grid gap-2 border-b border-jb-ink/16 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8"
              key={item.term}
            >
              <span className="font-semibold text-jb-ink">{item.term}</span>
              <span className="leading-7 text-jb-ink/74">{item.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-8 border-b border-jb-ink/16 py-14 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <h2 className="text-4xl leading-tight text-jb-ink">
            Evidence by capability
          </h2>
          <p className="mt-5 max-w-[32ch] leading-7 text-jb-ink/72">
            A compact route into the broader portfolio. Each link opens the
            project evidence behind the capability.
          </p>
        </div>
        <div className="border-t border-jb-ink/16">
          {technicalOperationsProofRows.map((row) => {
            const destinations = destinationsFor(row.proofIds);

            return (
              <section
                className="grid gap-4 border-b border-jb-ink/16 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8"
                id={row.capability.toLowerCase().replaceAll(" ", "-")}
                key={row.capability}
              >
                <h3 className="text-xl font-semibold leading-7 text-jb-ink">
                  {row.capability}
                </h3>
                <div>
                  <p className="leading-7 text-jb-ink/72">{row.toward}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
                    {destinations.map((destination) => (
                      <li key={`${destination.project}-${destination.href}`}>
                        <Link
                          className="inline-flex min-h-11 items-center border-b border-jb-blue text-jb-blue hover:border-jb-green hover:text-jb-green"
                          href={destination.href as Route}
                        >
                          {destination.project}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <div className="grid gap-8 py-14 lg:grid-cols-[0.38fr_0.62fr]">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </article>
  );
}
