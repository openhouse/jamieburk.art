import Link from "next/link";
import type { Metadata, Route } from "next";
import { JBCard } from "@/components/JBCard";
import { proofCategories, proofClaims, proofPrinciples } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Proofs - Jamie Burkart",
  description:
    "Public-safe proof bank for selected Jamie Burkart accomplishments, with claim limits, source layers, and portfolio-safe framing.",
  path: "/proofs"
});

const statusLabel = {
  known: "Known",
  "use-with-care": "Use with care"
} as const;

export default function ProofsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_0.28fr]">
        <div className="jb-reading">
          <h1 className="text-5xl font-bold text-jb-ink">Proofs</h1>
          <p className="mt-5 text-xl leading-8 text-jb-ink/76">
            This page projects selected claims from a public-safe proofs bank.
            It is built for fast review: what can be said, what supports it,
            and what limit keeps the claim honest.
          </p>
        </div>
        <aside className="rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-5">
          <h2 className="text-xl font-semibold text-jb-ink">Claim standard</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-jb-ink/76">
            {proofPrinciples.map((principle) => (
              <li className="flex gap-3" key={principle}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-12 space-y-12">
        {proofCategories.map((category) => {
          const claims = proofClaims.filter((claim) => claim.category === category);
          if (!claims.length) return null;

          return (
            <section key={category}>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h2 className="text-3xl font-semibold text-jb-ink">{category}</h2>
                <p className="max-w-xl text-sm leading-6 text-jb-ink/68">
                  Public copy should use these claims with their evidence basis
                  and limit intact.
                </p>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {claims.map((claim) => (
                  <JBCard key={claim.id}>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase">
                      <span className="rounded-full bg-jb-blue px-3 py-1 text-jb-paper">
                        {statusLabel[claim.status]}
                      </span>
                      <span className="text-jb-ink/56">{claim.id}</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-jb-ink">
                      {claim.short}
                    </h3>
                    <p className="mt-3 leading-7 text-jb-ink/76">{claim.claim}</p>
                    <dl className="mt-5 grid gap-4 text-sm">
                      <div>
                        <dt className="font-semibold text-jb-ink">Evidence basis</dt>
                        <dd className="mt-1 text-jb-ink/72">
                          {claim.evidenceBasis.join("; ")}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-jb-ink">Limit</dt>
                        <dd className="mt-1 leading-6 text-jb-ink/72">{claim.limit}</dd>
                      </div>
                    </dl>
                    {claim.href ? (
                      <Link
                        className="mt-5 inline-block text-sm font-semibold text-jb-blue hover:text-jb-green"
                        href={claim.href as Route}
                      >
                        See related page
                      </Link>
                    ) : null}
                  </JBCard>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-14 rounded-lg border border-jb-ink/12 bg-jb-warm/88 p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">What stays out</h2>
        <p className="mt-3 max-w-4xl leading-8 text-jb-ink/76">
          The public site does not publish private emails, raw transcripts,
          private coalition notes, legal-review materials, health or financial
          details, private correspondence, unapproved photos, client-private
          materials, raw community records, or stakeholder lists. When a claim
          needs more approval, it stays off the website or is marked as a
          careful public-safe summary.
        </p>
      </section>
    </div>
  );
}
