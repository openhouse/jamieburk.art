import {
  pageCitationManifests,
  type PageCitationManifest,
  type SourceRecord
} from "../data/knowledge-bank/index.ts";

export type BuiltCitationOccurrence = {
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
  path: string;
  occurrences: BuiltCitationOccurrence[];
  notes: BuiltCitationNote[];
  occurrencesById: Record<string, BuiltCitationOccurrence>;
};

export type PublicSourceLink = {
  label: "View source" | "Original post" | "Archived copy" | "View image" | "Contextual carrier";
  url: string;
};

export function buildCitationSet(manifest: PageCitationManifest): BuiltCitationSet {
  const noteNumbers = new Map<string, number>();
  const notes: BuiltCitationNote[] = [];
  const occurrencesById: Record<string, BuiltCitationOccurrence> = {};

  const occurrences = manifest.occurrences.map((occurrence) => {
    const number = noteNumbers.get(occurrence.noteId) ?? noteNumbers.size + 1;
    if (!noteNumbers.has(occurrence.noteId)) {
      noteNumbers.set(occurrence.noteId, number);
      notes.push({
        noteId: occurrence.noteId,
        number,
        noteAnchorId: `cite-note-${manifest.pageId}-${occurrence.noteId}`,
        referenceAnchorIds: []
      });
    }

    const built = {
      ...occurrence,
      number,
      anchorId: `cite-ref-${manifest.pageId}-${occurrence.refId}`,
      noteAnchorId: `cite-note-${manifest.pageId}-${occurrence.noteId}`
    };
    occurrencesById[occurrence.refId] = built;
    notes[number - 1].referenceAnchorIds.push(built.anchorId);
    return built;
  });

  return {
    pageId: manifest.pageId,
    path: manifest.path,
    occurrences,
    notes,
    occurrencesById
  };
}

export const builtCitationSets = pageCitationManifests.map(buildCitationSet);
export const builtCitationSetsById = Object.fromEntries(
  builtCitationSets.map((set) => [set.pageId, set])
) as Record<string, BuiltCitationSet>;

export function resolveCitationOccurrence(noteId: string, refId?: string) {
  const matches = builtCitationSets.flatMap((set) =>
    set.occurrences.filter((occurrence) =>
      refId ? occurrence.refId === refId && occurrence.noteId === noteId : occurrence.noteId === noteId
    )
  );
  if (matches.length !== 1) {
    throw new Error(
      `Citation ${noteId}${refId ? ` (${refId})` : ""} resolves to ${matches.length} occurrences`
    );
  }
  return matches[0];
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

  if (source.kind === "official-social-post") add("Original post", source.url);
  else if (source.kind === "promotional-graphic") add("View image", source.url);
  else add("View source", source.url);

  add(source.kind === "archived-carrier-page" ? "Contextual carrier" : "Archived copy", source.archivedUrl);
  return links;
}

export function projectPublicSource(source: SourceRecord) {
  return {
    id: source.id,
    title: source.title,
    kind: source.kind,
    visibility: source.visibility,
    availability: source.availability,
    author: source.author,
    publisher: source.publisher,
    account: source.account,
    issuedAt: source.issuedAt,
    publicNote:
      source.publicNote ?? "Source retained in the governed archive; no public description approved.",
    establishes: source.establishes,
    doesNotEstablish: source.doesNotEstablish,
    links: getPublicSourceLinks(source),
    isRestricted: source.visibility !== "public"
  };
}
