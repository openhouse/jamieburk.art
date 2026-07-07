import type { Metadata } from "next";
import { JBButton } from "@/components/JBButton";
import { resumeHighlights } from "@/data/proofs";
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
            {site.role}
          </p>
          <p className="mt-6 text-xl leading-8 text-jb-ink/76">
            I build the operating backbone complex public-facing teams need to
            plan, document, decide, onboard, report, and ship: requirements,
            workflows, decision records, status rhythms, runbooks, launch
            support, onboarding materials, and durable handoffs.
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
            Current public resume PDF, with Jamie-approved contact details for
            this review branch.
          </p>
        </div>
        <aside className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
          <h2 className="text-2xl font-semibold text-jb-ink">Selected impact</h2>
          <ul className="mt-5 space-y-4 text-jb-ink/76">
            {resumeHighlights.map((highlight) => (
              <li className="flex gap-3" key={highlight}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
