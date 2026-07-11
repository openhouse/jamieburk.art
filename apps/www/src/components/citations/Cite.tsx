import {
  getResearchRun,
  getSource,
  type CitationEntry,
  type CitationProjection
} from "@/data/knowledge-bank";

function labelForEntry(entry: CitationEntry) {
  if (entry.entryType === "source") {
    const source = getSource(entry.entryId);
    return source.title;
  }

  const researchRun = getResearchRun(entry.entryId);
  return researchRun.subject;
}

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

  return (
    <sup className={`citation ${className}`.trim()} id={citation.anchorId}>
      {citation.entries.map((entry) => (
        <a
          aria-label={`Citation ${entry.number}: ${labelForEntry(entry)}`}
          href={`#${entry.referenceId}`}
          key={`${entry.entryType}-${entry.entryId}`}
          role="doc-noteref"
        >
          [{entry.number}]
        </a>
      ))}
    </sup>
  );
}
