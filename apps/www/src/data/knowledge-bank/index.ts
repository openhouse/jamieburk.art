import { citationPages } from "./citation-pages.ts";
import { claimRecords } from "./claims.ts";
import { sourceRecords } from "./sources.ts";
import type { CitationOccurrence, ClaimRecord, SourceRecord } from "./schema.ts";

export * from "./schema.ts";
export { citationPages, claimRecords, sourceRecords };

export const sourceRecordsById = Object.fromEntries(
  sourceRecords.map((source) => [source.id, source])
) as Record<string, SourceRecord>;

export const claimRecordsById = Object.fromEntries(
  claimRecords.map((claim) => [claim.id, claim])
) as Record<string, ClaimRecord>;

export const citationPagesById = Object.fromEntries(
  citationPages.map((page) => [page.id, page])
);

function domId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function citationReferenceId(
  pageId: string,
  occurrenceId: string,
  sourceId: string
) {
  return `cite-ref-${domId(pageId)}-${domId(occurrenceId)}-${domId(sourceId)}`;
}

export function citationNoteId(pageId: string, number: number) {
  return `cite-${domId(pageId)}-${number}`;
}

function resolveOccurrenceSources(
  pageId: string,
  occurrence: CitationOccurrence
) {
  const page = citationPagesById[pageId];
  const claim = claimRecordsById[occurrence.claimId];

  if (!claim) throw new Error(`Unknown claim ${occurrence.claimId} on ${pageId}`);

  const renderableEvidence = claim.evidence.filter((item) => item.renderCitation);
  const renderableSourceIds = new Set(renderableEvidence.map((item) => item.sourceId));
  const sourceIds = occurrence.sourceIds ?? [...renderableSourceIds];

  return sourceIds.map((sourceId) => {
    if (!renderableSourceIds.has(sourceId)) {
      throw new Error(
        `Source ${sourceId} is not renderable evidence for ${occurrence.claimId}`
      );
    }

    const source = sourceRecordsById[sourceId];
    const sourceIndex = page.sourceOrder.indexOf(sourceId);
    if (!source) throw new Error(`Unknown source ${sourceId} on ${pageId}`);
    if (sourceIndex < 0) throw new Error(`Source ${sourceId} is missing from ${pageId} order`);

    return {
      source,
      number: sourceIndex + 1,
      referenceId: citationReferenceId(pageId, occurrence.id, sourceId),
      noteId: citationNoteId(pageId, sourceIndex + 1)
    };
  });
}

export function resolveCitationOccurrence(pageId: string, occurrenceId: string) {
  const page = citationPagesById[pageId];
  if (!page) throw new Error(`Unknown citation page ${pageId}`);

  const occurrence = page.occurrences.find((item) => item.id === occurrenceId);
  if (!occurrence) throw new Error(`Unknown citation occurrence ${pageId}/${occurrenceId}`);

  return {
    occurrence,
    claim: claimRecordsById[occurrence.claimId],
    sources: resolveOccurrenceSources(pageId, occurrence)
  };
}

export function resolveCitationReferences(pageId: string) {
  const page = citationPagesById[pageId];
  if (!page) return [];

  const bySourceId = new Map<
    string,
    {
      source: SourceRecord;
      number: number;
      noteId: string;
      backlinks: Array<{ id: string; occurrenceId: string }>;
    }
  >();

  for (const occurrence of page.occurrences) {
    for (const resolved of resolveOccurrenceSources(pageId, occurrence)) {
      const existing = bySourceId.get(resolved.source.id);
      const backlink = { id: resolved.referenceId, occurrenceId: occurrence.id };
      if (existing) existing.backlinks.push(backlink);
      else {
        bySourceId.set(resolved.source.id, {
          source: resolved.source,
          number: resolved.number,
          noteId: resolved.noteId,
          backlinks: [backlink]
        });
      }
    }
  }

  return [...bySourceId.values()].sort((a, b) => a.number - b.number);
}
