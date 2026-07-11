import { getCitationOccurrence, type ResolvedCitationPage } from "@/data/knowledge";

type CitationRefProps = {
  page: ResolvedCitationPage;
  occurrence: string;
};

export function CitationRef({ page, occurrence: occurrenceId }: CitationRefProps) {
  const occurrence = getCitationOccurrence(page, occurrenceId);

  return (
    <sup className="citation-ref">
      {occurrence.sources.map(({ source, number, targetId, refId }) => (
        <a
          id={refId}
          key={source.id}
          href={`#${targetId}`}
          role="doc-noteref"
          aria-label={`Citation ${number}: ${source.shortTitle}`}
        >
          {number}
        </a>
      ))}
    </sup>
  );
}

export const Cite = CitationRef;
