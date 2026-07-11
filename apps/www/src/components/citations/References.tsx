import { SourceLinks } from "./SourceLinks";
import type { CitationPageProps } from "./types";

export function References({ page }: CitationPageProps) {
  const headingId = `${page.slug}-sources-heading`;

  return (
    <section aria-labelledby={headingId} className="citation-sources" role="doc-endnotes">
      <h2 id={headingId}>Sources</h2>
      <ol>
        {page.notes.map((note) => (
          <li
            className="citation-reference"
            id={note.referenceId}
            key={note.id}
            role="doc-endnote"
            tabIndex={-1}
          >
            <h3>{note.title}</h3>
            <p>{note.publicText}</p>
            <SourceLinks sources={note.sources} />
            <p>
              <strong>Supports:</strong>{" "}
              {note.supportNotes.join(" ")}
            </p>
            {note.boundaryNote ? (
              <p className="citation-boundary">
                <strong>Where the evidence stops:</strong> {note.boundaryNote}
              </p>
            ) : null}
            <p className="citation-status">
              Source status: {note.sources.map((source) => source.availability).join(", ")}.
            </p>
            <span aria-label={`Return links for citation ${note.number}`} className="citation-backlinks">
              {note.backlinks.map((backlink, index) => (
                <a
                  aria-label={`Return to citation ${note.number}${note.backlinks.length > 1 ? `, occurrence ${index + 1}` : ""}`}
                  href={`#${backlink.citationId}`}
                  key={backlink.citationId}
                  role="doc-backlink"
                >
                  Return{note.backlinks.length > 1 ? ` ${index + 1}` : ""}
                </a>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
