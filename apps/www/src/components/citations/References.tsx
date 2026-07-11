import { getCitationProjection, getCitationReferenceEntries } from "@/lib/citations";
import { SourceLinks } from "./SourceLinks";

type ReferencesProps = {
  pageId: string;
};

export function References({ pageId }: ReferencesProps) {
  const projection = getCitationProjection(pageId);
  const entries = getCitationReferenceEntries(pageId);
  const headingId = `${pageId}-notes-and-sources`;

  return (
    <section className="references" aria-labelledby={headingId}>
      <h2 id={headingId}>{projection.notesHeading}</h2>
      <ol>
        {entries.map((entry) => (
          <li key={entry.noteId} id={entry.noteId} role="doc-footnote" tabIndex={-1}>
            <p>{entry.note}</p>
            <SourceLinks
              sources={entry.sources}
              includeOriginalLinks={entry.citationNote.includeOriginalLinks}
              includeArchiveLinks={entry.citationNote.includeArchiveLinks}
            />
            {entry.citationNote.caveatOverride ?? entry.claim.guardrail ? (
              <p className="reference-caveat">
                {entry.citationNote.caveatOverride ?? entry.claim.guardrail}
              </p>
            ) : null}
            {entry.sources.some((source) => source.caveat) ? (
              <ul className="reference-caveats">
                {entry.sources
                  .filter((source) => source.caveat)
                  .map((source) => (
                    <li key={source.id}>{source.caveat}</li>
                  ))}
              </ul>
            ) : null}
            {projection.includeBacklinks ? (
              <span className="reference-backlinks" aria-label={`Back to citation ${entry.number}`}>
                {entry.backlinks.map((backlink) => (
                  <a
                    key={backlink.citationId}
                    href={`#${backlink.citationId}`}
                    role="doc-backlink"
                    aria-label={`Back to citation ${entry.number}`}
                  >
                    Back
                  </a>
                ))}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
