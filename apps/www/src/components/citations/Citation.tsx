import { getCitationAnchorIds } from "@/lib/citations";

type CitationProps = {
  pageId: string;
  claimId: string;
  occurrenceId: string;
};

export function Citation({ pageId, claimId, occurrenceId }: CitationProps) {
  const { number, noteId, citationId } = getCitationAnchorIds(
    pageId,
    claimId,
    occurrenceId
  );

  return (
    <sup className="citation-ref">
      <a
        id={citationId}
        href={`#${noteId}`}
        role="doc-noteref"
        aria-label={`Citation ${number}`}
      >
        [{number}]
      </a>
    </sup>
  );
}
