import { getCitationAnchorIds } from "@/lib/citations";

type CitationProps = {
  pageId: string;
  noteId: string;
  occurrenceId: string;
};

export function Citation({ pageId, noteId, occurrenceId }: CitationProps) {
  const { number, noteId: referenceId, citationId } = getCitationAnchorIds(
    pageId,
    noteId,
    occurrenceId
  );

  return (
    <sup className="citation-ref">
      <a
        id={citationId}
        href={`#${referenceId}`}
        role="doc-noteref"
        aria-label={`Citation ${number}`}
      >
        [{number}]
      </a>
    </sup>
  );
}
