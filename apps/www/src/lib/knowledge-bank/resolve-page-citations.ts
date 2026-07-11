import {
  assertionsById,
  citationNotesById,
  citationPagesByRoute,
  type SourceRecord
} from "@/data/knowledge-bank";
import { validatePublicCitation } from "./validate-public-citation";

export type ResolvedSource = SourceRecord & {
  publicLinks: SourceRecord["links"];
};

export type ResolvedCitationNote = {
  id: string;
  number: number;
  title: string;
  publicText: string;
  boundaryNote?: string;
  assertionIds: string[];
  supportNotes: string[];
  sources: ResolvedSource[];
  backlinks: Array<{ occurrence: string; citationId: string }>;
  referenceId: string;
};

export type ResolvedCitationPage = {
  id: string;
  route: string;
  slug: string;
  publicBoundary: string;
  notes: ResolvedCitationNote[];
  notesById: ReadonlyMap<string, ResolvedCitationNote>;
  occurrences: ReadonlyMap<string, { noteId: string; citationId: string }>;
};

function permittedLinks(source: SourceRecord) {
  if (source.publicCitationPolicy === "cite-without-link") return [];
  if (source.publicCitationPolicy === "link-canonical") {
    return source.links.filter((link) => link.kind === "canonical" || link.kind === "media");
  }
  if (source.publicCitationPolicy === "link-archive") {
    return source.links.filter((link) => link.kind === "archive");
  }
  return source.links;
}

export function resolveCitationPage(route: string): ResolvedCitationPage {
  const page = citationPagesByRoute.get(route);
  if (!page) throw new Error(`Unknown citation page: ${route}`);

  const occurrences = new Map<string, { noteId: string; citationId: string }>();
  for (const item of page.occurrences) {
    if (occurrences.has(item.occurrence)) throw new Error(`Duplicate citation occurrence: ${item.occurrence}`);
    occurrences.set(item.occurrence, {
      noteId: item.noteId,
      citationId: `citation-${page.slug}-${item.occurrence}`
    });
  }

  const notes = page.citationOrder.map((noteId, index): ResolvedCitationNote => {
    const note = citationNotesById.get(noteId);
    if (!note) throw new Error(`Page ${route} references unknown citation note ${noteId}`);
    const relationships = validatePublicCitation(note);
    const sourceMap = new Map<string, ResolvedSource>();
    const assertionIds = new Set<string>();

    for (const { evidence, source } of relationships) {
      if (!assertionsById.has(evidence.assertionId)) {
        throw new Error(`Evidence ${evidence.id} references unknown assertion ${evidence.assertionId}`);
      }
      assertionIds.add(evidence.assertionId);
      sourceMap.set(source.id, { ...source, publicLinks: permittedLinks(source) });
    }

    const number = index + 1;
    return {
      id: note.id,
      number,
      title: note.title ?? relationships[0].source.shortLabel,
      publicText: note.publicText,
      boundaryNote: note.boundaryNote,
      assertionIds: [...assertionIds],
      supportNotes: [
        ...new Set(
          relationships
            .map(({ evidence }) => evidence.publicNote)
            .filter((publicNote): publicNote is string => Boolean(publicNote))
        )
      ],
      sources: [...sourceMap.values()],
      backlinks: page.occurrences
        .filter((item) => item.noteId === note.id)
        .map((item) => ({
          occurrence: item.occurrence,
          citationId: `citation-${page.slug}-${item.occurrence}`
        })),
      referenceId: `reference-${page.slug}-${number}`
    };
  });

  return {
    id: page.id,
    route: page.route,
    slug: page.slug,
    publicBoundary: page.publicBoundary,
    notes,
    notesById: new Map(notes.map((note) => [note.id, note])),
    occurrences
  };
}
