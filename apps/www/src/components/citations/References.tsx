import {
  evidenceNoteRecordsById,
  sourceRecordsById
} from "@/data/knowledge-bank";
import type { BuiltCitationSet } from "@/lib/citations";
import { SourceEntry } from "./SourceEntry";

export function References({ set }: { set: BuiltCitationSet }) {
  return (
    <section
      aria-labelledby={`${set.pageId}-references-heading`}
      className="citation-endnotes"
      role="doc-endnotes"
    >
      <h2 id={`${set.pageId}-references-heading`}>References</h2>
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
              <ul aria-label={`Sources for citation ${builtNote.number}`}>
                {note.sourceIds.map((sourceId) => {
                  const source = sourceRecordsById[sourceId];
                  if (!source) throw new Error(`Unknown citation source: ${sourceId}`);
                  return <SourceEntry key={sourceId} source={source} />;
                })}
              </ul>
              <p className="citation-backlinks">
                {builtNote.referenceAnchorIds.map((anchorId, index) => (
                  <a
                    aria-label={`Return to citation ${builtNote.number}${
                      builtNote.referenceAnchorIds.length > 1
                        ? `, occurrence ${index + 1}`
                        : ""
                    } in the text`}
                    href={`#${anchorId}`}
                    key={anchorId}
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
