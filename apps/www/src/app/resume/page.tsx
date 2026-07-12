import Link from "next/link";
import type { Metadata } from "next";
import { Claim } from "@/components/citations";
import { JBButton } from "@/components/JBButton";
import { resumeProofHighlights } from "@/data/proofs";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

const leadProofIds = new Set([
  "hje-revenue-growth-contribution",
  "fair-rent-campaign-memory",
  "callnyc-civic-data-guidance"
]);

const leadProofs = resumeProofHighlights.filter((proof) => leadProofIds.has(proof.id));
const supportingProofs = resumeProofHighlights.filter((proof) => !leadProofIds.has(proof.id));

function ProofWording({ proof }: { proof: (typeof resumeProofHighlights)[number] }) {
  return proof.id === "callnyc-civic-data-guidance" ? (
    <Claim
      claimId="CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"
      projection="resume-html"
      surface="/resume"
    />
  ) : (
    proof.shortWording ?? proof.publicWording
  );
}

export const metadata: Metadata = createMetadata({
  title: "Resume - Jamie Burkart",
  description:
    "Resume page for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.",
  path: "/resume"
});

export default function ResumePage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Resume</h1>
        <p className="mt-4 text-2xl font-semibold text-jb-green">
          Technical Project Manager - Product Operations & Implementation
        </p>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          I create operating structure for complex public-facing teams, turning
          ambiguous work into requirements, workflows, documentation, decision
          trails, launch support, onboarding materials, and durable handoffs.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <JBButton href={site.resumePath} download>
            Download resume PDF
          </JBButton>
          <JBButton href="/contact" variant="secondary">
            Contact Jamie
          </JBButton>
        </div>
        <p className="mt-4 text-sm text-jb-ink/62">
          Current public resume PDF. Phone remains inside the approved resume
          artifact; email is available on the contact page.
        </p>
      </div>
      <nav aria-label="Recommended application path" className="mt-10 border-l-4 border-jb-blue pl-5">
        <h2 className="text-xl font-semibold text-jb-ink">Recommended application path</h2>
        <p className="mt-2 leading-7 text-jb-ink/74">
          Start with <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/work/technical-operations">Technical Operations</Link>, then see <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/work/harry-j-epstein">Harry J. Epstein Company</Link> for private-sector implementation and <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/work/callnyc">CallNYC</Link> for source-backed civic delivery.
        </p>
      </nav>
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">Selected impact</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {leadProofs.map((proof) => {
            const project = proof.relatedProjects[0];
            return (
              <li className="rounded-lg border border-jb-ink/12 bg-jb-paper p-5" key={proof.id}>
                <p className="leading-7 text-jb-ink/78">
                  <ProofWording proof={proof} />
                </p>
                {project ? (
                  <Link
                    className="mt-4 inline-block text-sm font-semibold text-jb-blue hover:text-jb-green"
                    href={`/work/${project}`}
                  >
                    View source-backed case study
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
        <details className="mt-6 border-t border-jb-ink/12 pt-5">
          <summary className="cursor-pointer font-semibold text-jb-blue hover:text-jb-green">
            More selected impact
          </summary>
          <ul className="mt-5 grid gap-x-10 gap-y-5 text-jb-ink/76 md:grid-cols-2">
            {supportingProofs.map((proof) => (
              <li className="flex gap-3" key={proof.id}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-jb-ochre" />
                <span><ProofWording proof={proof} /></span>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </div>
  );
}
