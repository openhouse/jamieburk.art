import { evidenceNoteRecordsById } from "@/data/knowledge-bank";
import type { BuiltCitationReference, BuiltCitationSet } from "@/lib/citations";

type SingleCitationProps = {
  set: BuiltCitationSet;
  noteId: string;
  noteIds?: never;
  refId?: string;
  refIds?: never;
};

type GroupedCitationProps = {
  set: BuiltCitationSet;
  noteId?: never;
  noteIds: string[];
  refId?: never;
  refIds?: string[];
};

type CiteProps = SingleCitationProps | GroupedCitationProps;

function resolveReference(
  set: BuiltCitationSet,
  noteId: string,
  refId?: string
): BuiltCitationReference {
  const reference = refId
    ? set.referencesById[refId]
    : set.references.find((candidate) => candidate.noteId === noteId);

  if (!reference || reference.noteId !== noteId) {
    throw new Error(
      `Unknown citation occurrence for note ${noteId}${refId ? ` (${refId})` : ""}`
    );
  }

  return reference;
}

export function Cite(props: CiteProps) {
  const noteIds = props.noteIds ?? [props.noteId];
  const refIds = props.refIds ?? (props.refId ? [props.refId] : []);

  return (
    <span className="citation-group">
      {noteIds.map((noteId, index) => {
        const reference = resolveReference(props.set, noteId, refIds[index]);
        const note = evidenceNoteRecordsById[noteId];

        if (!note) throw new Error(`Unknown evidence note: ${noteId}`);

        return (
          <sup className="citation-marker" key={`${reference.refId}-${noteId}`}>
            <a
              aria-label={`Citation ${reference.number}: ${note.title}`}
              href={`#${reference.noteAnchorId}`}
              id={reference.anchorId}
              role="doc-noteref"
            >
              [{reference.number}]
            </a>
          </sup>
        );
      })}
    </span>
  );
}
