import {
  citationNoteRecordsById,
  sourceRecordsById
} from "@/data/knowledge-bank";
import type { BuiltCitationSet } from "@/lib/citations";
import { SourceEntry } from "./SourceEntry";

export function CitationList({ set }: { set: BuiltCitationSet }) {
  return (
    <section
      aria-labelledby={`${set.pageId}-sources-heading`}
      className="citation-endnotes"
      role="doc-endnotes"
    >
      <h2 id={`${set.pageId}-sources-heading`}>Sources and notes</h2>
      <ol>
        {set.notes.map((builtNote) => {
          const note = citationNoteRecordsById[builtNote.noteId];

          if (!note) {
            throw new Error(`Unknown citation note: ${builtNote.noteId}`);
          }

          return (
            <li id={builtNote.noteAnchorId} key={builtNote.noteId}>
              <p className="citation-note-text">{note.publicNote}</p>
              {note.publicCaveat ? (
                <p className="citation-note-caveat">
                  <strong>Limit:</strong> {note.publicCaveat}
                </p>
              ) : null}
              <ul aria-label={`Sources for citation ${builtNote.number}`}>
                {note.sourceIds.map((sourceId) => {
                  const source = sourceRecordsById[sourceId];

                  if (!source) {
                    throw new Error(`Unknown citation source: ${sourceId}`);
                  }

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
                    Return{builtNote.referenceAnchorIds.length > 1 ? ` ${index + 1}` : ""}
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
