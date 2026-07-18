import Link from "next/link";
import { resolveCitationReferences } from "@/data/knowledge-bank";
import { SourceNote } from "./SourceNote";

type ReferencesProps = { pageId: string };

export function References({ pageId }: ReferencesProps) {
  const references = resolveCitationReferences(pageId);
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
        Sources supporting the claims above. Expand a source to review
        its scope and limits. See something that needs correction? <Link href="/contact">Contact Jamie</Link>.
      </p>
      <ol>
        {references.map((reference) => (
          <SourceNote key={reference.source.id} {...reference} />
        ))}
      </ol>
    </section>
  );
}
