import type { Metadata } from "next";
import SourceBackedMemory from "@/content/lab/source-backed-team-memory.mdx";
import { JBButton } from "@/components/JBButton";
import { requireReadyOrCarefulProof } from "@/data/proofs";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Source-Backed Team Memory - Jamie Burkart",
  description:
    "A lab / proof-of-practice exploring source-backed operating memory, decision lineage, onboarding context, and human-correctable AI workflows.",
  path: "/lab/source-backed-team-memory"
});

export default function SourceBackedTeamMemoryPage() {
  const methodProof = requireReadyOrCarefulProof("source-backed-team-memory-method");
  const aiEvalProof = requireReadyOrCarefulProof("ai-evals-professional-development");

  return (
    <article className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">Lab / method</p>
        <h1 className="mt-3 text-5xl font-bold text-jb-ink">
          Source-Backed Team Memory
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          {methodProof.publicWording}
        </p>
        <div className="mt-6 rounded-lg border border-jb-ochre/50 bg-jb-lemon/25 p-5">
          <p className="leading-7 text-jb-ink/76">
            Early research / method / consulting practice. Not a finished
            production SaaS, chatbot, surveillance system, AI replacement for
            judgment, or private archive browser.
          </p>
        </div>
        <div className="mt-6 rounded-lg border border-jb-blue/20 bg-jb-sky/15 p-5">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Evaluation practice
          </p>
          <p className="mt-2 leading-7 text-jb-ink/76">
            {aiEvalProof.publicWording} {aiEvalProof.detailedPublicWording}
          </p>
          <p className="mt-3 text-sm leading-6 text-jb-ink/58">
            Framed as professional development: useful for human review,
            evaluation design, and AI-readiness work, not as instructor
            affiliation or a standalone credential claim.
          </p>
        </div>
        <div className="mt-10 space-y-6">
          <SourceBackedMemory />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <JBButton href="/work" variant="secondary">
            View selected work
          </JBButton>
          <JBButton href={site.emailHref}>
            Discuss a bounded source-backed memory sprint
          </JBButton>
        </div>
      </div>
    </article>
  );
}
