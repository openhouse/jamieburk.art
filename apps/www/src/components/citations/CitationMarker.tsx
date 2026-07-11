import { getPublicCitation } from "@/lib/knowledge-bank/citations";
import type { CitationMap, CiteProps } from "./types";

type CitationMarkerProps = CiteProps & {
  citationMap: CitationMap;
};

export function CitationMarker({ citationMap, evidence }: CitationMarkerProps) {
  const evidenceIds = typeof evidence === "string" ? [evidence] : [...evidence];

  return (
    <sup className="citation-marker">
      {evidenceIds.map((evidenceId) => {
        const number = citationMap.get(evidenceId);
        if (!number) throw new Error(`Citation is absent from the page manifest: ${evidenceId}`);
        const { source } = getPublicCitation(evidenceId);

        return (
          <a
            aria-label={`Citation ${number}: ${source.shortLabel}`}
            href={`#reference-${number}`}
            id={`citation-${number}`}
            key={evidenceId}
          >
            [{number}]
          </a>
        );
      })}
    </sup>
  );
}
