import {
  getCitationNote,
  getCitationPage,
  getClaim,
  getEvidence,
  getSource,
  type CitationNoteRecord,
  type SourceRecord
} from "@/data/knowledge-bank";

export type ResolvedSource = { source: SourceRecord; locator?: string };

export type ResolvedCitationNote = {
  number: number;
  note: CitationNoteRecord;
  sources: ResolvedSource[];
  backlinks: Array<{ occurrence: string; anchorId: string }>;
};

export function getCitationOccurrence(pageId: string, occurrenceId: string) {
  const page = getCitationPage(pageId);
  const occurrence = page.occurrences.find((item) => item.id === occurrenceId);
  if (!occurrence) {
    throw new Error(`Citation page ${pageId} has no occurrence ${occurrenceId}`);
  }
  return occurrence;
}

export function getPageNotes(pageId: string): ResolvedCitationNote[] {
  const page = getCitationPage(pageId);
  const noteIds = [...new Set(page.occurrences.map((item) => item.noteId))];

  return noteIds.map((noteId, index) => {
    const note = getCitationNote(noteId);
    if (note.publicationState !== "public") {
      throw new Error(`Citation page ${pageId} cannot render withheld note ${noteId}`);
    }

    const sources = note.evidenceIds.map((evidenceId) => {
      const evidence = getEvidence(evidenceId);
      if (evidence.publicUseStatus !== "approved") {
        throw new Error(`Citation note ${noteId} cannot render evidence ${evidenceId}`);
      }
      const source = getSource(evidence.sourceId);
      if (source.publicationMode === "not-public") {
        throw new Error(`Citation note ${noteId} cannot render source ${source.id}`);
      }
      return { source, locator: evidence.locator };
    });

    return {
      number: index + 1,
      note,
      sources,
      backlinks: page.occurrences
        .filter((item) => item.noteId === noteId)
        .map((item) => ({
          occurrence: item.id,
          anchorId: citationAnchorId(pageId, item.id)
        }))
    };
  });
}

export function getNoteNumber(pageId: string, noteId: string): number {
  const resolved = getPageNotes(pageId).find((item) => item.note.id === noteId);
  if (!resolved) throw new Error(`Citation note ${noteId} is not projected on page ${pageId}`);
  return resolved.number;
}

export function getNoteSources(noteId: string): ResolvedSource[] {
  const note = getCitationNote(noteId);
  return note.evidenceIds.map((evidenceId) => {
    const evidence = getEvidence(evidenceId);
    return { source: getSource(evidence.sourceId), locator: evidence.locator };
  });
}

export function getOccurrenceBacklinks(pageId: string, noteId: string) {
  return getPageNotes(pageId).find((item) => item.note.id === noteId)?.backlinks ?? [];
}

export function getPublicSourceLinks(sourceId: string) {
  const source = getSource(sourceId);
  if (source.publicationMode !== "link") return [];
  return [
    source.url ? { label: "Source", href: source.url } : undefined,
    source.archiveUrl ? { label: "Archive", href: source.archiveUrl } : undefined,
    source.assetUrl ? { label: "Media", href: source.assetUrl } : undefined
  ].filter((item): item is { label: string; href: string } => Boolean(item));
}

export function assertCitationOccurrence(pageId: string, occurrenceId: string, noteId: string) {
  const occurrence = getCitationOccurrence(pageId, occurrenceId);
  if (occurrence.noteId !== noteId) {
    throw new Error(
      `Citation occurrence ${pageId}/${occurrenceId} expects ${occurrence.noteId}, received ${noteId}`
    );
  }
  const page = getCitationPage(pageId);
  const note = getCitationNote(noteId);
  for (const claimId of note.claimIds) {
    const claim = getClaim(claimId);
    if (!claim.allowedSurfaces.includes(page.path)) {
      throw new Error(`Citation claim ${claimId} is not allowed on ${page.path}`);
    }
  }
  return { occurrence, note, number: getNoteNumber(pageId, noteId) };
}

export function citationAnchorId(pageId: string, occurrenceId: string) {
  return `cite-${pageId}-${occurrenceId}`;
}

export function referenceAnchorId(pageId: string, number: number) {
  return `reference-${pageId}-${number}`;
}
