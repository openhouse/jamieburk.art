import {
  citationClaimById,
  citationPageById,
  citationSourceById,
  type ClaimRecord,
  type PageCitationProjection,
  type SourceRecord
} from "@/data/citations";

export type CitationAnchorIds = {
  number: number;
  noteId: string;
  citationId: string;
};

export type CitationReferenceEntry = {
  number: number;
  noteId: string;
  claim: ClaimRecord;
  note: string;
  sources: SourceRecord[];
  backlinks: Array<{
    occurrenceId: string;
    citationId: string;
  }>;
};

export function getCitationProjection(pageId: string): PageCitationProjection {
  const projection = citationPageById.get(pageId);

  if (!projection) {
    throw new Error(`Unknown citation page: ${pageId}`);
  }

  return projection;
}

export function getCitationAnchorIds(
  pageId: string,
  claimId: string,
  occurrenceId: string
): CitationAnchorIds {
  const projection = getCitationProjection(pageId);
  const citationIndex = projection.citationOrder.findIndex((item) => item.claimId === claimId);

  if (citationIndex === -1) {
    throw new Error(`Claim ${claimId} is not projected on ${pageId}`);
  }

  const item = projection.citationOrder[citationIndex];

  if (!item.occurrences.includes(occurrenceId)) {
    throw new Error(`Occurrence ${occurrenceId} is not registered for ${claimId} on ${pageId}`);
  }

  const number = citationIndex + 1;

  return {
    number,
    noteId: `ref-${pageId}-${number}`,
    citationId: `cite-${pageId}-${number}-${occurrenceId}`
  };
}

export function getCitationReferenceEntries(pageId: string): CitationReferenceEntry[] {
  const projection = getCitationProjection(pageId);

  return projection.citationOrder.map((item, index) => {
    const claim = citationClaimById.get(item.claimId);

    if (!claim) {
      throw new Error(`Unknown citation claim: ${item.claimId}`);
    }

    const number = index + 1;
    const sources = claim.supports.map((support) => {
      const source = citationSourceById.get(support.sourceId);

      if (!source) {
        throw new Error(`Unknown citation source: ${support.sourceId}`);
      }

      return source;
    });

    return {
      number,
      noteId: `ref-${pageId}-${number}`,
      claim,
      note: item.noteOverride ?? claim.canonicalWording,
      sources,
      backlinks: item.occurrences.map((occurrenceId) => ({
        occurrenceId,
        citationId: `cite-${pageId}-${number}-${occurrenceId}`
      }))
    };
  });
}
