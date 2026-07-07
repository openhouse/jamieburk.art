import type { Metadata } from "next";
import SourceBackedMemory from "@/content/lab/source-backed-team-memory.mdx";
import { JBButton } from "@/components/JBButton";
import { createMetadata } from "@/lib/metadata";

const firstSprint = [
  "Source inventory",
  "Current documentation map",
  "Decision-log template",
  "Meeting-to-minutes workflow",
  "Onboarding reader for new hires",
  "Human-reviewed AI summary pattern",
  "Privacy / permission boundary map",
  "Recommendations for what to document next"
];

export const metadata: Metadata = createMetadata({
  title: "Source-Backed Team Memory - Jamie Burkart",
  description:
    "A lab / proof-of-practice exploring source-backed operating memory, decision lineage, onboarding context, and human-correctable AI workflows.",
  path: "/lab/source-backed-team-memory"
});

export default function SourceBackedTeamMemoryPage() {
  return (
    <article className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">Lab / method</p>
        <h1 className="mt-3 text-5xl font-bold text-jb-ink">
          Source-Backed Team Memory
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          A bounded consulting / proof-of-practice method for helping growing
          teams preserve decisions, onboarding context, meeting memory, source
          trails, and open questions without leaving useful ideas on the
          cutting-room floor.
        </p>
        <div className="mt-6 rounded-lg border border-jb-ochre/50 bg-jb-lemon/25 p-5">
          <p className="leading-7 text-jb-ink/76">
            Early research / method / consulting practice. Not a finished
            production SaaS, AI replacement for judgment, private archive
            browser, or promise to summarize everything.
          </p>
        </div>
        <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
          <h2 className="text-2xl font-semibold text-jb-ink">
            A useful first sprint could produce
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {firstSprint.map((item) => (
              <li className="flex gap-3 text-sm leading-6 text-jb-ink/76" key={item}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-10 space-y-6">
          <SourceBackedMemory />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <JBButton href="/work" variant="secondary">
            View selected work
          </JBButton>
          <JBButton href="/contact">Contact Jamie</JBButton>
        </div>
      </div>
    </article>
  );
}
