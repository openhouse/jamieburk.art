import { getPageCitationIds, requireCitationGroup } from "@/data/knowledge-bank";
import { SourceLinks } from "./SourceLinks";
import type { CitationNotesProps } from "./types";

export function CitationNotes({
  pageKey,
  citationIds,
  heading = "Sources & notes"
}: CitationNotesProps) {
  const ids = citationIds ?? getPageCitationIds(pageKey);

  if (!ids.length) return null;

  return (
    <section
      aria-labelledby={`${pageKey}-sources-heading`}
      className="citation-notes"
      role="doc-endnotes"
    >
      <h2 id={`${pageKey}-sources-heading`}>{heading}</h2>
      <ol>
        {ids.map((id, index) => {
          const group = requireCitationGroup(id);

          return (
            <li id={`cite-note-${pageKey}-${id}`} key={id}>
              <span>{group.note}</span>
              <SourceLinks groupId={id} />
              <a
                aria-label={`Return to citation ${index + 1}`}
                className="citation-backref"
                href={`#cite-ref-${pageKey}-${id}`}
                role="doc-backlink"
              >
                Return
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
