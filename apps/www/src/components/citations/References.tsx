import Link from "next/link";
import { citationPagesById, resolveCitationReferences } from "@/data/knowledge-bank";
import { SourceNote } from "./SourceNote";

type ReferencesProps = { pageId: string };

export function References({ pageId }: ReferencesProps) {
  const references = resolveCitationReferences(pageId);
  const page = citationPagesById[pageId];
  if (!references.length) return null;

  return (
    <section
      aria-labelledby="sources-and-notes-heading"
      className="jb-endnotes"
      id="sources-and-notes"
      role="doc-endnotes"
    >
      <h2 id="sources-and-notes-heading">Sources and notes</h2>
      <p className="jb-endnotes-intro">
        These notes preserve what each source supports and where its limits
        remain. See something that needs correction? <Link href="/contact">Contact Jamie</Link>.
      </p>
      {page.sharedBoundary ? (
        <p className="jb-endnotes-intro">
          <strong>Shared boundary:</strong> {page.sharedBoundary}
        </p>
      ) : null}
      <ol>
        {references.map((reference) => (
          <SourceNote
            boundaryOmissions={page.sourceBoundaryOmissions?.[reference.source.id]}
            key={reference.source.id}
            {...reference}
          />
        ))}
      </ol>
    </section>
  );
}
