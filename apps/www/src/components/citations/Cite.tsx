import { resolveCitationOccurrence } from "@/data/knowledge-bank";

type CiteProps = {
  pageId: string;
  occurrenceId: string;
};

export function Cite({ pageId, occurrenceId }: CiteProps) {
  const citation = resolveCitationOccurrence(pageId, occurrenceId);

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
