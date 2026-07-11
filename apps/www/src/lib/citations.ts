import type { PageCitationSet, SourceRecord } from "../data/knowledge-bank/schemas.ts";

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
  label: "View source" | "View graphic" | "Original post" | "Archived copy";
  url: string;
};

export type PublicSourceProjection = {
  id: string;
  title: string;
  kind: SourceRecord["kind"];
  author?: string;
  publisher?: string;
  account?: string;
  issuedAt?: string;
  availability: SourceRecord["availability"];
  visibility: SourceRecord["visibility"];
  publicNote: string;
  links: PublicSourceLink[];
  isRestricted: boolean;
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
  if (source.visibility !== "public") return [];

  const links: PublicSourceLink[] = [];
  const seen = new Set<string>();
  const add = (label: PublicSourceLink["label"], url?: string) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    links.push({ label, url });
  };

  const primaryLabel =
    source.kind === "promotional-graphic"
      ? "View graphic"
      : source.kind === "official-social-post"
        ? "Original post"
        : "View source";

  add(primaryLabel, source.url);
  add("Archived copy", source.archivedUrl);
  return links;
}

export function projectPublicSource(source: SourceRecord): PublicSourceProjection {
  return {
    id: source.id,
    title: source.title,
    kind: source.kind,
    author: source.author,
    publisher: source.publisher,
    account: source.account,
    issuedAt: source.issuedAt,
    availability: source.availability,
    visibility: source.visibility,
    publicNote:
      source.publicNote ??
      "Source retained in the governed archive; public description is not approved.",
    links: getPublicSourceLinks(source),
    isRestricted: source.visibility !== "public"
  };
}
