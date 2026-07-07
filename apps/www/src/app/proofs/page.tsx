import type { Metadata } from "next";
import { JBCard } from "@/components/JBCard";
import { proofPrinciples, proofProjects } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Proof Bank - Jamie Burkart",
  description:
    "Public-safe proof bank for Jamie Burkart's professional accomplishments, evidence posture, and website claim discipline.",
  path: "/proofs"
});

export default function ProofsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">
          Proof bank
        </p>
        <h1 className="mt-3 text-5xl font-bold text-jb-ink">
          Public-safe claims, carefully projected
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          This site is built from a public-safe proof bank: a disciplined set of
          claims about Jamie&apos;s professional work, evidence posture, and
          publication boundaries. The repo holds the knowledge base; the website
          translates it for clarity, audience, and purpose.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-3xl font-semibold text-jb-ink">
          Claim discipline
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {proofPrinciples.map((principle) => (
            <JBCard key={principle.title}>
              <h3 className="text-xl font-semibold text-jb-blue">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-jb-ink/72">
                {principle.text}
              </p>
            </JBCard>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="jb-reading">
          <h2 className="text-3xl font-semibold text-jb-ink">
            Defensible professional proofs
          </h2>
          <p className="mt-4 leading-8 text-jb-ink/76">
            These are not raw archives. They are public-safe summaries of what
            the evidence can support today.
          </p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {proofProjects.map((project) => (
            <JBCard key={project.title}>
              <p className="text-xs font-semibold uppercase text-jb-blue">
                {project.category}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-jb-ink">
                {project.title}
              </h3>
              <dl className="mt-5 space-y-4 text-sm leading-6">
                <div>
                  <dt className="font-semibold text-jb-ink">Claim</dt>
                  <dd className="mt-1 text-jb-ink/74">{project.claim}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-jb-ink">Proof posture</dt>
                  <dd className="mt-1 text-jb-ink/74">{project.proof}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-jb-ink">Website use</dt>
                  <dd className="mt-1 text-jb-ink/74">{project.websiteUse}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-jb-ink">Boundary</dt>
                  <dd className="mt-1 text-jb-ink/74">{project.boundary}</dd>
                </div>
              </dl>
            </JBCard>
          ))}
        </div>
      </section>
    </div>
  );
}
