import Link from "next/link";
import {
  evidenceNoteRecordsById,
  sourceRecordsById
} from "@/data/knowledge-bank";
import { builtCitationSetsById } from "@/lib/citations";
import { SourceEntry } from "./SourceEntry";

export function References({ pageId }: { pageId: string }) {
  const set = builtCitationSetsById[pageId];
  if (!set) throw new Error(`Unknown citation page: ${pageId}`);

  return (
    <section
      aria-labelledby={`${pageId}-references-heading`}
      className="citation-endnotes"
      role="doc-endnotes"
    >
      <h2 id={`${pageId}-references-heading`}>References</h2>
      <p className="citation-intro">
        These notes preserve what the evidence supports and where its limits remain.
        See something that needs correction? <Link href="/contact">Contact Jamie</Link>.
      </p>
      <ol className="references-list">
        {set.notes.map((builtNote) => {
          const note = evidenceNoteRecordsById[builtNote.noteId];
          if (!note) throw new Error(`Unknown evidence note: ${builtNote.noteId}`);

          return (
            <li id={builtNote.noteAnchorId} key={builtNote.noteId}>
              <p className="citation-note-title">{note.title}</p>
              <p className="citation-note-text">{note.publicSummary}</p>
              {note.qualification ? (
                <p className="citation-note-caveat">
                  <strong>Qualification:</strong> {note.qualification}
                </p>
              ) : null}
              {note.renderMode === "full" ? (
                <ul aria-label={`Sources for citation ${builtNote.number}`}>
                  {note.sourceIds.map((sourceId) => {
                    const source = sourceRecordsById[sourceId];
                    if (!source) throw new Error(`Unknown citation source: ${sourceId}`);
                    return <SourceEntry key={sourceId} source={source} />;
                  })}
                </ul>
              ) : (
                <p className="citation-summary-only">
                  Governed summary only; underlying restricted or private evidence is not linked.
                </p>
              )}
              <p className="citation-backlinks">
                {builtNote.referenceAnchorIds.map((anchorId, index) => (
                  <a
                    aria-label={`Return to citation ${builtNote.number}, occurrence ${index + 1}`}
                    href={`#${anchorId}`}
                    key={anchorId}
                    role="doc-backlink"
                  >
                    Back to citation {builtNote.number}
                    {builtNote.referenceAnchorIds.length > 1
                      ? `, occurrence ${index + 1}`
                      : ""}
                  </a>
                ))}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
