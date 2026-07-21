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
        These notes preserve what each source supports and where its limits
        remain. See something that needs correction? <Link href="/contact">Contact Jamie</Link>.
      </p>
      <details className="mt-4">
        <summary className="cursor-pointer font-semibold text-jb-blue">
          View {references.length} source {references.length === 1 ? "note" : "notes"}
        </summary>
        <ol>
          {references.map((reference) => (
            <SourceNote key={reference.source.id} {...reference} />
          ))}
        </ol>
      </details>
    </section>
  );
}
