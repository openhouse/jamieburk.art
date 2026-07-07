import type { Metadata } from "next";
import SourceBackedMemory from "@/content/lab/source-backed-team-memory.mdx";
import { JBButton } from "@/components/JBButton";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Source-Backed Team Memory - Jamie Burkart",
  description:
    "A lab / method for preserving decisions, open questions, onboarding context, meeting memory, and source-linked team rationale in a human-reviewable way.",
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
          Source-Backed Team Memory is a lab / method for helping
          knowledge-heavy teams preserve decisions, open questions, onboarding
          context, meeting memory, and source-linked rationale in a
          human-reviewable way.
        </p>
        <div className="mt-6 rounded-lg border border-jb-ochre/50 bg-jb-lemon/25 p-5">
          <p className="leading-7 text-jb-ink/76">
            Early research / method / consulting practice. Not a finished
            production SaaS, AI replacement for judgment, or private archive
            browser.
          </p>
        </div>
        <section className="mt-8 rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
          <h2 className="text-2xl font-semibold text-jb-ink">
            What this is useful for
          </h2>
          <ul className="mt-5 grid gap-3 text-jb-ink/76 sm:grid-cols-2">
            {[
              "Fast-growing teams",
              "Decision lineage",
              "Onboarding context",
              "Meeting-to-memory workflows",
              "Source-linked summaries",
              "Human-reviewed AI drafts",
              "Preserving ideas that would otherwise be left on the cutting-room floor"
            ].map((item) => (
              <li className="flex gap-3" key={item}>
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
