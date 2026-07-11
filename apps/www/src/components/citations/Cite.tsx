import { evidenceNoteRecordsById } from "@/data/knowledge-bank";
import { resolveCitationOccurrence } from "@/lib/citations";

export function Cite({ noteId, refId }: { noteId: string; refId?: string }) {
  const occurrence = resolveCitationOccurrence(noteId, refId);
  const note = evidenceNoteRecordsById[noteId];
  if (!note) throw new Error(`Unknown evidence note: ${noteId}`);

  return (
    <sup className="citation-marker">
      <a
        aria-label={`Citation ${occurrence.number}: ${note.title}`}
        href={`#${occurrence.noteAnchorId}`}
        id={occurrence.anchorId}
        role="doc-noteref"
      >
        [{occurrence.number}]
      </a>
    </sup>
  );
}
