import {
  getCitationGroup,
  type CitationProjection
} from "@/data/knowledge-bank";

type CiteProps = {
  projection: CitationProjection;
  citationKey: string;
  className?: string;
};

export function Cite({ projection, citationKey, className = "" }: CiteProps) {
  const citation = projection.citationsByKey[citationKey];

  if (!citation) {
    throw new Error(`Unknown citation key on ${projection.page}: ${citationKey}`);
  }

  const group = getCitationGroup(citation.citationGroupId);

  return (
    <sup className={`citation ${className}`.trim()} id={citation.occurrenceAnchor}>
      <a
        aria-label={`Citation ${citation.number}: ${group.title}`}
        href={`#${citation.referenceId}`}
        role="doc-noteref"
      >
        [{citation.number}]
      </a>
    </sup>
  );
}
