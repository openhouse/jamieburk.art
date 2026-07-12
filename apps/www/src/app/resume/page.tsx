import type { Metadata } from "next";
import { Claim } from "@/components/citations";
import { JBButton } from "@/components/JBButton";
import { resumeProofHighlights } from "@/data/proofs";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resume - Jamie Burkart",
  description:
    "Resume page for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.",
  path: "/resume"
});

export default function ResumePage() {
  return (
    <div className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[0.68fr_0.32fr]">
        <div className="jb-reading">
          <h1 className="text-5xl font-bold text-jb-ink">Resume</h1>
          <p className="mt-4 text-2xl font-semibold text-jb-green">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <p className="mt-6 text-xl leading-8 text-jb-ink/76">
            I create operating structure for complex public-facing teams,
            turning ambiguous work into requirements, workflows, documentation,
            decision trails, launch support, onboarding materials, and durable
            handoffs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JBButton href={site.resumePath} download>
              Download resume PDF
            </JBButton>
            <JBButton href="/contact" variant="secondary">
              Contact Jamie
            </JBButton>
          </div>
        </div>
        <aside className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
          <h2 className="text-2xl font-semibold text-jb-ink">Selected impact</h2>
          <ul className="mt-5 space-y-4 text-jb-ink/76">
            {resumeProofHighlights.map((proof) => (
              <li className="flex gap-3" key={proof.id}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>
                  {proof.id === "callnyc-civic-data-guidance" ? (
                    <Claim
                      claimId="CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"
                      projection="resume-html"
                      surface="/resume"
                    />
                  ) : (
                    proof.shortWording ?? proof.publicWording
                  )}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
