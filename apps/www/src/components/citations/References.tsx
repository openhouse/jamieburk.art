import Link from "next/link";
import { resolveCitationReferences } from "@/data/knowledge-bank";
import { SourceNote } from "./SourceNote";

type ReferencesProps = {
  pageId: string;
};

export function References({ pageId }: ReferencesProps) {
  const references = resolveCitationReferences(pageId);
  if (!references.length) return null;

  return (
    <section aria-labelledby="sources-and-notes" className="jb-endnotes" role="doc-endnotes">
      <h2 id="sources-and-notes">Sources and notes</h2>
      <p className="jb-endnotes-intro">
        These notes preserve what each source supports, where its limits remain,
        and how the public wording was bounded. See something that needs
        correction? <Link href="/contact">Contact Jamie</Link>.
      </p>
      <ol>
        {references.map((reference) => (
          <SourceNote key={reference.source.id} {...reference} />
        ))}
      </ol>
    </section>
  );
}
