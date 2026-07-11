import {
  citationClaimById,
  citationNoteById,
  citationPageById,
  citationSourceById,
  type CitationNote,
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
  citationNote: CitationNote;
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
  noteId: string,
  occurrenceId: string
): CitationAnchorIds {
  const projection = getCitationProjection(pageId);
  const citationIndex = projection.citationOrder.findIndex((item) => item.noteId === noteId);

  if (citationIndex === -1) {
    throw new Error(`Citation note ${noteId} is not projected on ${pageId}`);
  }

  const item = projection.citationOrder[citationIndex];

  if (!item.occurrences.includes(occurrenceId)) {
    throw new Error(`Occurrence ${occurrenceId} is not registered for ${noteId} on ${pageId}`);
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
    const citationNote = citationNoteById.get(item.noteId);

    if (!citationNote) {
      throw new Error(`Unknown citation note: ${item.noteId}`);
    }

    const claim = citationClaimById.get(citationNote.claimId);

    if (!claim) {
      throw new Error(`Unknown citation claim: ${citationNote.claimId}`);
    }

    const number = index + 1;
    const sources = citationNote.sourceIds.map((sourceId) => {
      const source = citationSourceById.get(sourceId);

      if (!source) {
        throw new Error(`Unknown citation source: ${sourceId}`);
      }

      return source;
    });

    return {
      number,
      noteId: `ref-${pageId}-${number}`,
      citationNote,
      claim,
      note: citationNote.publicText ?? claim.canonicalWording,
      sources,
      backlinks: item.occurrences.map((occurrenceId) => ({
        occurrenceId,
        citationId: `cite-${pageId}-${number}-${occurrenceId}`
      }))
    };
  });
}
