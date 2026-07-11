import { getCitationOccurrence } from "@jamie-burkart/knowledge-bank";

type CiteProps = {
  pageId: string;
  occurrenceId: string;
  citationGroupId: string;
};

export function Cite({ pageId, occurrenceId, citationGroupId }: CiteProps) {
  const citation = getCitationOccurrence(pageId, occurrenceId, citationGroupId);

  return (
    <sup className="citation-ref">
      <a
        aria-label={`Citation ${citation.number}: ${citation.shortLabel}`}
        href={`#${citation.noteId}`}
        id={citation.refId}
        role="doc-noteref"
      >
        [{citation.number}]
      </a>
    </sup>
  );
}
