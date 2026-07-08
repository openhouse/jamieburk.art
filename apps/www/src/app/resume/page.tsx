import type { Metadata } from "next";
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
          I create operating structure for complex public-facing teams, turning
          emerging, loosely defined work into requirements, workflows,
          documentation, decision trails, launch support, onboarding materials,
          and durable handoffs.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <JBButton href={site.resumePath} download>
            Download resume PDF
          </JBButton>
          <JBButton href={site.emailHref} variant="secondary">
            Email Jamie
          </JBButton>
        </div>
        <p className="mt-4 text-sm leading-6 text-jb-ink/70">
          The PDF is the current public resume artifact and includes the direct
          contact details intended for hiring conversations.
        </p>
      </div>
      <section className="mt-12 border-y border-jb-ink/12 py-7">
        <div className="grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <div>
            <h2 className="text-2xl font-semibold text-jb-ink">
              Selected impact
            </h2>
            <p className="mt-3 text-sm leading-6 text-jb-ink/74">
              Public-safe claims from the portfolio proof bank, phrased to keep
              causality, collective work, and privacy boundaries intact.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {resumeProofHighlights.map((proof) => (
              <li className="flex gap-3 text-jb-ink/78" key={proof.id}>
                <span
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-jb-ochre"
                />
                <span>{proof.publicWording}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
