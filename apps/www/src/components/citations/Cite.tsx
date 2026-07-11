import {
  assertCitationOccurrence,
  citationAnchorId,
  referenceAnchorId
} from "@/lib/citations";

type CiteProps = {
  page: string;
  occurrence: string;
  noteId: string;
};

export function Cite({ page, occurrence, noteId }: CiteProps) {
  const { note, number } = assertCitationOccurrence(page, occurrence, noteId);

  return (
    <sup className="citation-marker">
      <a
        aria-label={`Citation ${number}: ${note.shortLabel}`}
        href={`#${referenceAnchorId(page, number)}`}
        id={citationAnchorId(page, occurrence)}
        role="doc-noteref"
      >
        {number}
      </a>
    </sup>
  );
}
