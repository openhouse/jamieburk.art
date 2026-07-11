import { getCitation, getCitationNumber } from "@jamie-burkart/knowledge-bank";

type CiteProps = {
  pageId: string;
  citationId: string;
  occurrence?: number;
};

function anchorSafe(value: string) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}

export function Cite({ pageId, citationId, occurrence = 1 }: CiteProps) {
  const number = getCitationNumber(pageId, citationId);
  const citation = getCitation(citationId);
  const pageAnchor = anchorSafe(pageId);
  const referenceId = `citation-ref-${pageAnchor}-${number}-${occurrence}`;
  const noteId = `citation-note-${pageAnchor}-${number}`;

  return (
    <sup className="citation-ref">
      <a
        aria-label={`Citation ${number}: ${citation.shortLabel}`}
        href={`#${noteId}`}
        id={referenceId}
        role="doc-noteref"
      >
        [{number}]
      </a>
    </sup>
  );
}
