import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { Claim } from "@/components/citations";
import { JBButton } from "@/components/JBButton";
import { getProofHref, resumeProofHighlights } from "@/data/proofs";
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
            I coordinate complex public-facing work from an unclear starting
            point through launch and handoff. I clarify the goal, make ownership
            and dependencies visible, and build the workflows and decision
            records people need to deliver and maintain the work.
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
            The downloadable PDF includes Jamie&apos;s phone number; email is
            available on the contact page.
          </p>
        </div>
        <aside className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
          <h2 className="text-2xl font-semibold text-jb-ink">Selected impact</h2>
          <ul className="mt-5 space-y-4 text-jb-ink/76">
            {resumeProofHighlights.map((proof) => {
              const href = getProofHref(proof);

              return (
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
                      proof.detailedPublicWording ?? proof.publicWording
                    )}
                    {href ? (
                      <Link className="ml-2 font-semibold text-jb-blue hover:text-jb-green" href={href as Route}>
                        View evidence
                      </Link>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
