import type { Metadata } from "next";
import SourceBackedMemory from "@/content/lab/source-backed-team-memory.mdx";
import { JBButton } from "@/components/JBButton";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Source-Backed Team Memory - Jamie Burkart",
  description:
    "A bounded lab / method for source-backed operating memory, decision lineage, onboarding context, and human-reviewed AI workflows.",
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
          A lab / method for helping growing teams preserve decision lineage,
          meeting context, onboarding knowledge, open questions, and
          source-backed answers without turning private archives into unsafe
          surfaces.
        </p>
        <div className="mt-6 rounded-lg border border-jb-ochre/50 bg-jb-lemon/25 p-5">
          <p className="leading-7 text-jb-ink/76">
            AI drafts. Humans review. The shared record remains inspectable and
            correctable.
          </p>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-jb-ink/72 sm:grid-cols-2">
            <li>Not production SaaS.</li>
            <li>Not a private archive browser.</li>
            <li>Not an AI replacement for judgment.</li>
            <li>Not a page for raw notes or transcripts.</li>
          </ul>
        </div>
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
