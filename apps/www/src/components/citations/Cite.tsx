import type { CitationPageProps, CiteProps } from "./types";

export function Cite({ page, note: noteId, occurrence }: CiteProps & CitationPageProps) {
  const note = page.notesById.get(noteId);
  const occurrenceRecord = page.occurrences.get(occurrence);
  if (!note) throw new Error(`Citation note is absent from ${page.route}: ${noteId}`);
  if (!occurrenceRecord || occurrenceRecord.noteId !== noteId) {
    throw new Error(`Citation occurrence ${occurrence} does not resolve to ${noteId}`);
  }

  return (
    <sup className="citation-marker">
      <a
        aria-label={`Citation ${note.number}: ${note.title}`}
        href={`#${note.referenceId}`}
        id={occurrenceRecord.citationId}
        role="doc-noteref"
      >
        [{note.number}]
      </a>
    </sup>
  );
}
