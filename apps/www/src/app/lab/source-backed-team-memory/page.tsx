import type { Metadata } from "next";
import SourceBackedMemory from "@/content/lab/source-backed-team-memory.mdx";
import { JBButton } from "@/components/JBButton";
import { createMetadata } from "@/lib/metadata";

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
        <h1 className="mt-3 text-4xl font-bold text-jb-ink sm:text-5xl">
          Source-Backed Team Memory
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          This method is for knowledge-heavy teams that are moving quickly and
          losing useful ideas, decisions, open questions, onboarding context, or
          source material across meetings, documents, chat, and AI summaries.
        </p>
        <div className="mt-6 rounded-lg border border-jb-ochre/50 bg-jb-lemon/25 p-5">
          <p className="leading-7 text-jb-ink/76">
            The goal is not an omniscient AI layer or a giant
            knowledge-management platform. The goal is a practical, reviewable
            structure that reduces context loss without creating a heavy
            parallel bureaucracy.
          </p>
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
