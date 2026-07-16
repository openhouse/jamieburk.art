import { resolveCitationOccurrence } from "@/data/knowledge-bank";

type CiteProps = {
  pageId: string;
  occurrenceId: string;
};

export function Cite({ pageId, occurrenceId }: CiteProps) {
  const citation = resolveCitationOccurrence(pageId, occurrenceId);

  if (citation.sources.length === 0) return null;

  return (
    <sup className="jb-citation">
      {citation.sources.map(({ noteId, number, referenceId, source }) => (
        <a
          aria-label={`Citation ${number}: ${source.title}`}
          href={`#${noteId}`}
          id={referenceId}
          key={source.id}
          role="doc-noteref"
        >
          [{number}]
        </a>
      ))}
    </sup>
  );
}
