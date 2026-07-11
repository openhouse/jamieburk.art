import {
  getCitationSources,
  getPageCitationIds,
  requireCitationGroup
} from "@/data/knowledge-bank";
import type { CitationNotesProps } from "./types";

function sourceHref(
  source: ReturnType<typeof getCitationSources>[number],
  group: ReturnType<typeof requireCitationGroup>
) {
  if (source.publicCitationMode !== "link") return undefined;
  if (group.includeOriginalLinks && source.originalUrl) return source.originalUrl;
  if (group.includeArchiveLinks && source.archivedUrl) return source.archivedUrl;
  if (group.includeMediaLinks && source.mediaUrl) return source.mediaUrl;
  return undefined;
}

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
          const sources = getCitationSources(id);

          return (
            <li id={`cite-note-${pageKey}-${id}`} key={id}>
              <span>{group.note}</span>
              {sources.length ? (
                <span className="citation-source-links">
                  {sources.map((source) => {
                    const href = sourceHref(source, group);

                    if (!href) {
                      return (
                        <span className="citation-source-label" key={source.id}>
                          {source.shortLabel}
                        </span>
                      );
                    }

                    return (
                      <a href={href} key={source.id}>
                        {source.shortLabel}
                      </a>
                    );
                  })}
                </span>
              ) : null}
              <a
                aria-label={`Return to citation ${index + 1}`}
                className="citation-backref"
                href={`#cite-ref-${pageKey}-${id}`}
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
