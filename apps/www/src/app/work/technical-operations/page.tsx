import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { FieldPhoto } from "@/components/FieldPhoto";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { portfolioPhotos } from "@/data/photography";
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
    href: "/work/harry-j-epstein",
    proof:
      "Jamie led long-running e-commerce and operations improvements that helped a legacy industrial business adapt online while preserving its voice."
  },
  {
    project: "FairRentNYC / Commercial Rent Stabilization",
    href: "/work/fair-rent-nyc",
    proof:
      "Jamie built and stewarded shared campaign memory so collaborators could recover decisions, track next steps, and protect private context."
  },
  {
    project: "CallNYC",
    href: "/work/callnyc",
    proof:
      "Jamie translated constituent-services data into issue pathways and next-step guidance residents could use."
  },
  {
    project: "WOWList",
    href: "/work/wowlist",
    proof:
      "Jamie co-built a community-calendar platform that helped local arts and music organizers distribute events across roughly 35 city ecosystems."
  },
  {
    project: "196 / Sunday Dinner",
    href: "/work/196-sunday-dinner",
    proof:
      "Jamie created onboarding, hosting, facilitation, and continuity systems supporting 300+ gatherings and 20+ resident artists."
  },
  {
    project: "KC Spaces Fund",
    href: "/work/technical-operations#public-facing-launch-and-adoption",
    proof:
      "Jamie built campaign web infrastructure and supported an available cross-channel identity for a collaborator-led mutual-aid campaign."
  },
  {
    project: "KC Town Hall",
    href: "/work/kc-town-hall",
    proof:
      "Jamie co-led redevelopment planning and public-benefit documentation for the proposed adaptive reuse of a long-vacant historic building."
  },
  {
    project: "Source-Backed Team Memory",
    href: "/lab/source-backed-team-memory",
    proof:
      "Jamie is developing a bounded lab method to preserve decision lineage, onboarding context, and human-reviewed operating memory."
  }
];

const proofDestinations: Record<string, { project: string; href: Route }> = {
  "technical-operations-operating-backbone": {
    project: "Cross-project operating pattern",
    href: "/work"
  },
  "hje-modernization-stewardship": {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein" as Route
  },
  "hje-revenue-growth-contribution": {
    project: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein" as Route
  },
  "fair-rent-campaign-memory": {
    project: "FairRentNYC",
    href: "/work/fair-rent-nyc" as Route
  },
  "fair-rent-source-map": {
    project: "FairRentNYC",
    href: "/work/fair-rent-nyc" as Route
  },
  "nyc-artist-coalition-public-web-infrastructure": {
    project: "NYC Artist Coalition",
    href: "/work/fair-rent-nyc" as Route
  },
  "nyc-artist-coalition-civic-systems": {
    project: "NYC Artist Coalition",
    href: "/work/fair-rent-nyc" as Route
  },
  "callnyc-civic-data-guidance": {
    project: "CallNYC",
    href: "/work/callnyc" as Route
  },
  "wowlist-community-platform": {
    project: "WOWList",
    href: "/work/wowlist" as Route
  },
  "sunday-dinner-196-participation-infrastructure": {
    project: "196 / Sunday Dinner",
    href: "/work/196-sunday-dinner" as Route
  },
  "kc-town-hall-public-benefit-documentation": {
    project: "KC Town Hall",
    href: "/work/kc-town-hall" as Route
  },
  "source-backed-team-memory-method": {
    project: "Source-Backed Team Memory",
    href: "/lab/source-backed-team-memory"
  }
};

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-14">
      <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
        <div>
          <p className="jb-section-label">Role-fit proof surface</p>
          <h1 className="mt-3 text-4xl leading-tight text-jb-ink sm:text-5xl">
            Technical Operations & Implementation
          </h1>
        </div>
        <p className="max-w-3xl text-xl leading-8 text-jb-ink/76">
          I create the operating backbone complex teams need to move: clear
          requirements, delivery rhythms, decision records, risk signals,
          onboarding materials, operating documentation, launch support, and
          durable handoffs.
        </p>
      </div>
      <FieldPhoto
        className="mt-12"
        crop="aspect-[16/9] object-cover"
        photoId="photo.paper-trimming"
        placementId="placement.technical-operations.paper-trimming.layout-b"
        photo={portfolioPhotos.paperTrimming}
        priority
        route="/work/technical-operations"
        sizes="(max-width: 1280px) 100vw, 1240px"
      />
      <section className="mt-10 grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
        <section className="border-y border-jb-ink/15 py-6">
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
        </section>
        <section className="border-y border-jb-ink/15 py-6">
          <h2 className="text-2xl font-semibold text-jb-ink">Proof map</h2>
          <dl className="mt-5 space-y-4" id="proof-map">
            {proofMap.map((item) => (
              <div key={item.project}>
                <dt className="font-semibold">
                  <Link
                    className="text-jb-blue hover:text-jb-green"
                    href={item.href as Route}
                  >
                    {item.project}
                  </Link>
                </dt>
                <dd className="mt-1 leading-7 text-jb-ink/72">{item.proof}</dd>
              </div>
            ))}
          </dl>
        </section>
      </section>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {technicalOperationsProofRows.map((row) => (
          <JBCard id={row.capability.toLowerCase().replaceAll(" ", "-")} key={row.capability}>
            <h2 className="text-2xl font-semibold text-jb-ink">{row.capability}</h2>
            <p className="mt-3 text-sm leading-6 text-jb-ink/68">{row.toward}</p>
            <ul className="mt-5 space-y-3 text-jb-ink/76">
              {row.proofs.map((proof) => {
                const destination = proofDestinations[proof.id];
                return (
                  <li className="flex gap-3" key={proof.id}>
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 rounded-full bg-jb-ochre"
                    />
                    <span>
                      {destination ? (
                        <Link
                          className="font-semibold text-jb-blue hover:text-jb-green"
                          href={destination.href}
                        >
                          {destination.project}
                        </Link>
                      ) : (
                        <span className="font-semibold text-jb-ink">
                          KC Spaces Fund
                        </span>
                      )}
                      <span className="mt-1 block text-sm leading-6 text-jb-ink/72">
                        {proof.shortWording ?? proof.publicWording}
                      </span>
                    </span>
                  </li>
                );
              })}
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
