import {
  getCitationNumber,
  getPageCitationIds,
  requireCitationGroup
} from "@/data/knowledge-bank";
import type { CitationRefProps } from "./types";

function getNumber(pageKey: string, id: string, citationIds?: readonly string[]) {
  if (citationIds) {
    const index = citationIds.indexOf(id);
    if (index === -1) throw new Error(`Citation group ${id} is not registered`);
    return index + 1;
  }

  return getCitationNumber(pageKey, id);
}

function refId(pageKey: string, id: string, instance?: string) {
  return `cite-ref-${pageKey}-${id}${instance ? `-${instance}` : ""}`;
}

export function CitationRef({ id, pageKey, citationIds, instance }: CitationRefProps) {
  const group = requireCitationGroup(id);
  const knownIds = citationIds ?? getPageCitationIds(pageKey);

  if (!knownIds.includes(id)) {
    throw new Error(`Citation group ${id} is not registered for ${pageKey}`);
  }

  const number = getNumber(pageKey, id, citationIds);

  return (
    <sup className="citation-ref">
      <a
        aria-label={`Citation ${number}: ${group.shortLabel}`}
        href={`#cite-note-${pageKey}-${id}`}
        id={refId(pageKey, id, instance)}
        role="doc-noteref"
      >
        [{number}]
      </a>
    </sup>
  );
}
