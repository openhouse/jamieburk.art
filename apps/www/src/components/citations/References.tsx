import { resolveCitationPage } from "@/lib/citations";
import { SourceEntry } from "./SourceEntry";

type ReferencesProps = {
  pageId: string;
};

export function References({ pageId }: ReferencesProps) {
  const resolved = resolveCitationPage(pageId);
  const headingId = `sources-and-notes-${resolved.page.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className="citation-endnotes"
      role="doc-endnotes"
    >
      <h2 id={headingId}>{resolved.page.referenceHeading}</h2>
      <ol>
        {resolved.notes.map(({ note, noteAnchor, number, occurrences, sources }) => (
          <li id={noteAnchor} key={note.id}>
            <p>{note.publicNote}</p>
            {note.publicCaveat ? (
              <p className="citation-caveat">Limit: {note.publicCaveat}</p>
            ) : null}
            <ul className="citation-source-list">
              {sources.map((source) => (
                <SourceEntry key={source.id} source={source} />
              ))}
            </ul>
            <span className="citation-backlinks" aria-label={`Backlinks for citation ${number}`}>
              {occurrences.map((occurrence, index) => (
                <a
                  aria-label={`Return to citation ${number}${
                    occurrences.length > 1 ? `, occurrence ${index + 1}` : ""
                  } in the text`}
                  href={`#${occurrence.referenceAnchor}`}
                  key={occurrence.referenceAnchor}
                  role="doc-backlink"
                >
                  Back to {number}
                  {occurrences.length > 1 ? `.${index + 1}` : ""}
                </a>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
