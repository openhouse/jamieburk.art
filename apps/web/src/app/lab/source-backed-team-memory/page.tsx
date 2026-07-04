import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnownOpenProtected } from "@/components/known-open-protected";
import { MdxBody } from "@/components/mdx-body";
import { SourceLayer } from "@/components/source-layer";
import { StatusPill } from "@/components/status-pill";
import { TagList } from "@/components/tag-list";
import { VisibilityNote } from "@/components/visibility-note";
import { getWorkBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Source-Backed Team Memory",
  description: "A lab and method page for source-backed, human-reviewed operating memory.",
  path: "/lab/source-backed-team-memory"
});

export default function SourceBackedTeamMemoryPage() {
  const entry = getWorkBySlug("source-backed-team-memory");

  if (!entry) {
    notFound();
  }

  return (
    <article className="section-y">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
          <div>
            <div className="flex flex-wrap gap-2">
              <StatusPill status={entry.status} />
              <span className="badge rounded border-base-300 bg-base-200 text-xs font-bold">Lab</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              {entry.title}
            </h1>
            <p className="mt-4 text-2xl font-black text-primary">{entry.poeticTagline}</p>
            <p className="mt-6 prose-measure text-lg leading-8 text-base-content/75">{entry.summary}</p>
            <div className="mt-8">
              <TagList tags={entry.tags} />
            </div>
          </div>
          <div className="grid gap-4 self-start">
            <VisibilityNote publicSafety={entry.publicSafety} whatIsOmitted={entry.whatIsOmitted} />
            <SourceLayer
              items={[
                "Meetings, documents, transcripts, and decisions enter as inspectable sources.",
                "AI drafts summaries, action trails, and memory structures.",
                "Humans review, correct, and approve what becomes shared record.",
                "The output remains traceable, bounded, and useful for handoff."
              ]}
            />
          </div>
        </div>
        <div className="mt-12">
          <MdxBody source={entry.body} />
        </div>
        <KnownOpenProtected
          known={entry.proof}
          open={[entry.futureReaderNote ?? "Create public demo materials after review."]}
          protectedItems={[entry.whatIsOmitted ?? "Private source material remains omitted."]}
        />
      </div>
    </article>
  );
}
