import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { FieldPhoto } from "@/components/FieldPhoto";
import { ResumeCTA } from "@/components/ResumeCTA";
import { portfolioPhotos } from "@/data/photography";
import { technicalOperationsProofRows } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const stages = [
  {
    title: "Frame",
    body: "Research the resident and operator context. Define the outcome, constraints, risk, decision owners, and smallest useful release."
  },
  {
    title: "Deliver",
    body: "Translate across product, engineering, policy, legal, communications, and executive stakeholders. Keep dependencies and tradeoffs visible."
  },
  {
    title: "Learn",
    body: "Launch publicly, measure what happens, repair failure modes, and transfer ownership through documentation and operating practice."
  }
];

const flagshipCases = [
  {
    name: "WOW List",
    href: "/work/wowlist",
    problem: "Local cultural activity was rich but difficult to follow through conventional listings.",
    product: "A keyword- and place-based community platform co-built around existing social behavior.",
    signal: "Product model, platform delivery, public operation, and city-region use."
  },
  {
    name: "CallNYC",
    href: "/work/callnyc",
    problem: "Constituent-services records existed, but residents still had to interpret them alone.",
    product: "An independent civic prototype that organized public data into issue- and place-based routes.",
    signal: "Research synthesis, information architecture, implementation, and public communication."
  },
  {
    name: "Fair Rent NYC",
    href: "/work/fair-rent-nyc",
    problem: "Policy, public data, coalition decisions, and current advocacy risked becoming fragmented.",
    product: "Campaign web infrastructure, governed team memory, public materials, source maps, and recent report review and speaking work.",
    signal: "Stakeholder translation, public launch, coalition operations, and evidence governance."
  }
] as const;

const proofDestinations: Record<string, { project: string; href: Route }> = {
  "technical-operations-operating-backbone": { project: "Cross-project practice", href: "/work" },
  "hje-modernization-stewardship": { project: "Harry J. Epstein Company", href: "/work/harry-j-epstein" as Route },
  "hje-revenue-growth-contribution": { project: "Harry J. Epstein Company", href: "/work/harry-j-epstein" as Route },
  "fair-rent-campaign-memory": { project: "Fair Rent NYC", href: "/work/fair-rent-nyc" as Route },
  "fair-rent-source-map": { project: "Fair Rent NYC", href: "/work/fair-rent-nyc" as Route },
  "nyc-artist-coalition-public-web-infrastructure": { project: "NYC Artist Coalition", href: "/work/fair-rent-nyc" as Route },
  "nyc-artist-coalition-civic-systems": { project: "NYC Artist Coalition", href: "/work/fair-rent-nyc" as Route },
  "callnyc-civic-data-guidance": { project: "CallNYC", href: "/work/callnyc" as Route },
  "wowlist-community-platform": { project: "WOW List", href: "/work/wowlist" as Route },
  "sunday-dinner-196-participation-infrastructure": { project: "196 / Sunday Dinner", href: "/work/196-sunday-dinner" as Route },
  "kc-town-hall-public-benefit-documentation": { project: "KC Town Hall", href: "/work/kc-town-hall" as Route },
  "source-backed-team-memory-method": { project: "Source-Backed Team Memory", href: "/lab/source-backed-team-memory" }
};

export const metadata: Metadata = createMetadata({
  title: "Product Delivery & Technical Operations - Jamie Burkart",
  description:
    "Senior product management and technical delivery proof across discovery, prototyping, public launch, measurement, documentation, and handoff.",
  path: "/work/technical-operations"
});

export default function TechnicalOperationsPage() {
  return (
    <>
      <section className="jb-role-hero">
        <div className="jb-frame grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
          <div>
            <h1>I lead public-facing products from problem framing through launch and handoff.</h1>
            <p>
              My strongest work lives between product strategy and implementation:
              listening deeply, turning policy and operating context into a usable
              path, coordinating delivery, and making the result maintainable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="jb-action jb-action-primary" href="/resume">View resume</Link>
              <Link className="jb-action jb-action-secondary" href="/contact">Start a conversation</Link>
            </div>
          </div>
          <FieldPhoto
            imageClassName="aspect-[3/2] object-[52%_45%]"
            photo={portfolioPhotos.publicWorkConversation}
            priority
            sizes="(max-width: 1023px) 100vw, 44vw"
          />
        </div>
      </section>

      <section className="jb-frame jb-role-stages" aria-labelledby="product-practice">
        <h2 id="product-practice">A product practice built for consequential work</h2>
        <ol>
          {stages.map((stage, index) => (
            <li key={stage.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="jb-role-proof" aria-labelledby="product-proof">
        <div className="jb-frame">
          <h2 id="product-proof">The proof is in three different kinds of public product.</h2>
          <div className="jb-role-proof-list">
            {flagshipCases.map((item) => (
              <article key={item.name}>
                <div>
                  <h3>{item.name}</h3>
                  <dl>
                    <div><dt>Problem</dt><dd>{item.problem}</dd></div>
                    <div><dt>Product move</dt><dd>{item.product}</dd></div>
                    <div><dt>Hiring signal</dt><dd>{item.signal}</dd></div>
                  </dl>
                  <Link href={item.href as Route}>Open case study <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="jb-frame jb-delivery-ledger" aria-labelledby="delivery-ledger">
        <div className="jb-product-section-intro">
          <h2 id="delivery-ledger">What that practice looks like across the portfolio</h2>
          <p>
            A deeper evidence ledger for readers evaluating delivery operations,
            technical coordination, public launch, and institutional memory.
          </p>
        </div>
        <div className="jb-delivery-ledger-rows">
          {technicalOperationsProofRows.map((row) => (
            <article id={row.capability.toLowerCase().replaceAll(" ", "-")} key={row.capability}>
              <div>
                <h3>{row.capability}</h3>
                <p>{row.toward}</p>
              </div>
              <ul>
                {row.proofs.map((proof) => {
                  const destination = proofDestinations[proof.id];
                  return (
                    <li key={proof.id}>
                      {destination ? (
                        <Link href={destination.href}>{destination.project}</Link>
                      ) : (
                        <strong>KC Spaces Fund</strong>
                      )}
                      <span>{proof.shortWording ?? proof.publicWording}</span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="jb-frame grid gap-5 pb-16 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </section>
    </>
  );
}
