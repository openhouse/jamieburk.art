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
        <p className="mt-4 text-sm text-jb-ink/62">
          Current public resume PDF. Phone remains inside the approved resume
          artifact; email is available on the contact page.
        </p>
      </div>
      <section aria-labelledby="selected-impact" className="mt-12 border-y border-jb-ink/18 py-7">
        <h2 className="text-3xl font-semibold text-jb-ink" id="selected-impact">
          Selected impact
        </h2>
        <ul className="mt-6 grid gap-x-10 gap-y-0 sm:grid-cols-2">
          {resumeProofHighlights.map((proof) => (
            <li className="border-t border-jb-ink/12 py-4 leading-7 text-jb-ink/76" key={proof.id}>
              {proof.id === "callnyc-civic-data-guidance" ? (
                <Claim
                  claimId="CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"
                  projection="resume-html"
                  surface="/resume"
                />
              ) : proof.id === "kc-town-hall-public-benefit-documentation" ? (
                <Claim
                  claimId="CLM-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION"
                  projection="resume-html"
                  surface="/resume"
                />
              ) : (
                proof.shortWording ?? proof.publicWording
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
