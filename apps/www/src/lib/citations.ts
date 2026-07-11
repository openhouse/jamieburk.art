import {
  citationNotes,
  claims,
  pageProjections,
  sources,
  type CitationNoteRecord,
  type CitationOccurrence,
  type ClaimRecord,
  type PageProjection,
  type SourceRecord
} from "../data/knowledge-bank/index.ts";

export type ResolvedOccurrence = CitationOccurrence & {
  number: number;
  referenceAnchor: string;
  noteAnchor: string;
};

export type ResolvedNote = {
  note: CitationNoteRecord;
  number: number;
  noteAnchor: string;
  occurrences: ResolvedOccurrence[];
  claims: ClaimRecord[];
  sources: SourceRecord[];
};

export type ResolvedCitationPage = {
  page: PageProjection;
  occurrences: ResolvedOccurrence[];
  notes: ResolvedNote[];
};

export type PublicSourceLink = {
  href: string;
  label: string;
  kind: "primary" | "archive" | "original";
};

function primarySourceLabel(source: SourceRecord) {
  if (source.mediaType === "image") return "View graphic";
  if (source.mediaType === "repository") return "View repository";
  if (source.mediaType === "pdf") return "Read archived article";
  return "Original source";
}

export function getPublicSourceLinks(source: SourceRecord): PublicSourceLink[] {
  if (source.publicUseStatus === "protected") return [];

  const primaryUrl = source.canonicalUrl ?? source.archiveUrl;
  if (!primaryUrl) return [];

  const primaryIsArchive = !source.canonicalUrl && source.archiveUrl === primaryUrl;
  const links: PublicSourceLink[] = [
    {
      href: primaryUrl,
      label: primaryIsArchive ? "Archived capture" : primarySourceLabel(source),
      kind: primaryIsArchive ? "archive" : "primary"
    }
  ];

  if (source.archiveUrl && source.archiveUrl !== primaryUrl) {
    links.push({ href: source.archiveUrl, label: "Archived capture", kind: "archive" });
  }

  if (source.originalUrl && source.originalUrl !== primaryUrl) {
    links.push({ href: source.originalUrl, label: "Original source", kind: "original" });
  }

  return links;
}

const makeAnchorPart = (value: string) => value.replace(/[^a-z0-9-]/g, "-");

export function resolveCitationPage(pageId: string): ResolvedCitationPage {
  const page = pageProjections.find((candidate) => candidate.id === pageId);
  if (!page) {
    throw new Error(`Unknown citation page: ${pageId}`);
  }

  const noteNumbers = new Map<string, number>();
  const occurrenceCounts = new Map<string, number>();
  const occurrences = page.occurrences.map((occurrence) => {
    const number = noteNumbers.get(occurrence.noteId) ?? noteNumbers.size + 1;
    noteNumbers.set(occurrence.noteId, number);

    const occurrenceCount = (occurrenceCounts.get(occurrence.noteId) ?? 0) + 1;
    occurrenceCounts.set(occurrence.noteId, occurrenceCount);

    return {
      ...occurrence,
      number,
      referenceAnchor: `cite-ref-${makeAnchorPart(page.id)}-${makeAnchorPart(occurrence.id)}`,
      noteAnchor: `cite-note-${makeAnchorPart(page.id)}-${makeAnchorPart(occurrence.noteId)}`
    };
  });

  const notes = [...noteNumbers.entries()]
    .sort((left, right) => left[1] - right[1])
    .map(([noteId, number]) => {
      const note = citationNotes.find((candidate) => candidate.id === noteId);
      if (!note) {
        throw new Error(`Unknown citation note: ${noteId}`);
      }

      return {
        note,
        number,
        noteAnchor: `cite-note-${makeAnchorPart(page.id)}-${makeAnchorPart(noteId)}`,
        occurrences: occurrences.filter((occurrence) => occurrence.noteId === noteId),
        claims: note.claimIds.map((claimId) => {
          const claim = claims.find((candidate) => candidate.id === claimId);
          if (!claim) throw new Error(`Unknown claim: ${claimId}`);
          return claim;
        }),
        sources: note.sourceIds.map((sourceId) => {
          const source = sources.find((candidate) => candidate.id === sourceId);
          if (!source) throw new Error(`Unknown source: ${sourceId}`);
          return source;
        })
      };
    });

  return { page, occurrences, notes };
}

export function resolveCitationOccurrence(pageId: string, occurrenceId: string) {
  const resolved = resolveCitationPage(pageId);
  const occurrence = resolved.occurrences.find(
    (candidate) => candidate.id === occurrenceId
  );

  if (!occurrence) {
    throw new Error(`Unknown citation occurrence: ${pageId}/${occurrenceId}`);
  }

  return occurrence;
}
