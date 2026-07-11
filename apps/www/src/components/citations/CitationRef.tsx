import { citationNoteRecordsById } from "@/data/knowledge-bank";
import type { BuiltCitationSet } from "@/lib/citations";

export function CitationRef({
  set,
  refId,
  label
}: {
  set: BuiltCitationSet;
  refId: string;
  label?: string;
}) {
  const reference = set.referencesById[refId];

  if (!reference) {
    throw new Error(`Unknown citation reference: ${refId}`);
  }

  const note = citationNoteRecordsById[reference.noteId];
  const context = label ?? note?.shortLabel ?? "source note";

  return (
    <sup className="citation-marker">
      <a
        aria-label={`Citation ${reference.number}: ${context}`}
        href={`#${reference.noteAnchorId}`}
        id={reference.anchorId}
        role="doc-noteref"
      >
        {reference.number}
      </a>
    </sup>
  );
}
