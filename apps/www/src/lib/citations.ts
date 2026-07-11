import type {
  PageCitationSet,
  PublicationStatus,
  SourceRecord
} from "../data/knowledge-bank/schemas.ts";

export type BuiltCitationReference = {
  refId: string;
  noteId: string;
  number: number;
  anchorId: string;
  noteAnchorId: string;
};

export type BuiltCitationNote = {
  noteId: string;
  number: number;
  noteAnchorId: string;
  referenceAnchorIds: string[];
};

export type BuiltCitationSet = {
  pageId: string;
  references: BuiltCitationReference[];
  notes: BuiltCitationNote[];
  referencesById: Record<string, BuiltCitationReference>;
};

export type PublicSourceLink = {
  label: "View source" | "View graphic" | "Original source" | "Archived capture";
  url: string;
};

export function buildCitationSet(pageSet: PageCitationSet): BuiltCitationSet {
  const noteNumbers = new Map<string, number>();
  const referencesById: Record<string, BuiltCitationReference> = {};
  const references: BuiltCitationReference[] = [];
  const notes: BuiltCitationNote[] = [];

  for (const reference of pageSet.references) {
    const number = noteNumbers.get(reference.noteId) ?? noteNumbers.size + 1;
    if (!noteNumbers.has(reference.noteId)) {
      noteNumbers.set(reference.noteId, number);
      notes.push({
        noteId: reference.noteId,
        number,
        noteAnchorId: `cite-note-${reference.noteId}`,
        referenceAnchorIds: []
      });
    }

    const builtReference = {
      ...reference,
      number,
      anchorId: `cite-ref-${reference.refId}`,
      noteAnchorId: `cite-note-${reference.noteId}`
    };

    references.push(builtReference);
    referencesById[reference.refId] = builtReference;
    notes[number - 1].referenceAnchorIds.push(builtReference.anchorId);
  }

  return { pageId: pageSet.pageId, references, notes, referencesById };
}

export function getPublicSourceLinks(source: SourceRecord): PublicSourceLink[] {
  if (
    source.publicationStatus === ("private" satisfies PublicationStatus) ||
    source.publicationStatus === ("unavailable" satisfies PublicationStatus)
  ) {
    return [];
  }

  const links: PublicSourceLink[] = [];
  const seen = new Set<string>();
  const add = (label: PublicSourceLink["label"], url?: string) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    links.push({ label, url });
  };

  add(source.mediaType === "image" ? "View graphic" : "View source", source.canonicalUrl);
  add("Archived capture", source.archiveUrl);
  add("Original source", source.originalUrl);

  return links;
}
