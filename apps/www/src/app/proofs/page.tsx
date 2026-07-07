import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { JBCard } from "@/components/JBCard";
import { publicProofs, type ProofDomain } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Public Proof Bank - Jamie Burkart",
  description:
    "A public-safe proof bank of defensible professional claims for Jamie Burkart's portfolio.",
  path: "/proofs"
});

const domainLabels: Record<ProofDomain, string> = {
  "career-pattern": "Career Pattern",
  "nyc-artist-coalition": "NYC Artist Coalition",
  fairrentnyc: "FairRentNYC / Commercial Rent Stabilization",
  "harry-j-epstein": "Harry J. Epstein Company",
  wowlist: "WOWList",
  "community-infrastructure": "Community Infrastructure",
  "built-environment": "Built Environment",
  "civic-technology": "Civic Technology"
};

const domainOrder = Object.keys(domainLabels) as ProofDomain[];

export default function ProofsPage() {
  const groupedProofs = domainOrder
    .map((domain) => ({
      domain,
      proofs: publicProofs.filter((proof) => proof.domain === domain)
    }))
    .filter((group) => group.proofs.length > 0);

  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">
          Public proof bank
        </p>
        <h1 className="mt-3 text-5xl font-bold text-jb-ink">
          Defensible claims, source basis, and limits
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          This page is the public projection of the portfolio proof bank. It is
          not the archive. It is the claim layer: what can be said, why it is
          defensible, how it should be used, and where the boundaries are.
        </p>
      </div>

      <div className="mt-12 space-y-14">
        {groupedProofs.map((group) => (
          <section key={group.domain}>
            <h2 className="text-3xl font-semibold text-jb-ink">
              {domainLabels[group.domain]}
            </h2>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {group.proofs.map((proof) => (
                <JBCard key={proof.id}>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-jb-blue">
                    <span>{proof.confidence} confidence</span>
                    <span>/</span>
                    <span>{proof.visibility}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold text-jb-ink">
                    {proof.headline}
                  </h3>
                  <p className="mt-4 leading-7 text-jb-ink/76">
                    {proof.projection.card}
                  </p>
                  <dl className="mt-5 space-y-4 text-sm leading-6 text-jb-ink/72">
                    <div>
                      <dt className="font-semibold text-jb-ink">Source basis</dt>
                      <dd className="mt-2">
                        <ul className="space-y-2">
                          {proof.sourceBasis.map((source) => (
                            <li key={`${proof.id}-${source.label}`}>
                              {source.url ? (
                                <a
                                  className="text-jb-blue hover:text-jb-green"
                                  href={source.url}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {source.label}
                                </a>
                              ) : (
                                source.label
                              )}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-jb-ink">Use rule</dt>
                      <dd className="mt-1">{proof.publicUse}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-jb-ink">Guardrails</dt>
                      <dd className="mt-2">
                        <ul className="space-y-2">
                          {proof.guardrails.map((guardrail) => (
                            <li key={`${proof.id}-${guardrail}`}>{guardrail}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                  {proof.workSlug ? (
                    <Link
                      className="mt-5 inline-block text-sm font-semibold text-jb-blue hover:text-jb-green"
                      href={`/work/${proof.workSlug}` as Route}
                    >
                      View related case page
                    </Link>
                  ) : null}
                </JBCard>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
