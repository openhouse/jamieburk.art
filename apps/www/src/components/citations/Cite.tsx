import type { ResolvedCitationPage } from "@/lib/citations/types";

type CiteProps = {
  page: ResolvedCitationPage;
  occurrence: string;
};

export function Cite({ page, occurrence }: CiteProps) {
  const resolvedOccurrence = page.occurrences[occurrence];

  if (!resolvedOccurrence) {
    throw new Error(`Unknown citation occurrence ${occurrence} on ${page.path}`);
  }

  return (
    <>
      {resolvedOccurrence.citations.map((citation) => (
        <sup className="citation" key={citation.anchorId}>
          <a
            aria-label={`Citation ${citation.referenceNumber}`}
            href={`#${citation.referenceId}`}
            id={citation.anchorId}
            role="doc-noteref"
          >
            [{citation.referenceNumber}]
          </a>
        </sup>
      ))}
    </>
  );
}
