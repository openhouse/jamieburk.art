import { SourceEntry } from "@/components/citations/SourceEntry";
import { getPageNotes, referenceAnchorId } from "@/lib/citations";

export function References({ page }: { page: string }) {
  const notes = getPageNotes(page);
  const headingId = `references-${page}-heading`;

  return (
    <section aria-labelledby={headingId} className="references" role="doc-endnotes">
      <h2 id={headingId}>References</h2>
      <ol className="references-list">
        {notes.map(({ number, note, sources, backlinks }) => (
          <li id={referenceAnchorId(page, number)} key={note.id}>
            <div className="reference-number" aria-hidden="true">
              {number}
            </div>
            <div className="reference-body">
              <h3>{note.title}</h3>
              <p>{note.publicSummary}</p>
              <ul className="reference-boundaries">
                {note.boundaries.map((boundary) => (
                  <li key={boundary}>{boundary}</li>
                ))}
              </ul>
              <ul className="reference-sources">
                {sources.map((source) => (
                  <SourceEntry key={source.source.id} resolved={source} />
                ))}
              </ul>
              <p className="reference-backlinks">
                {backlinks.map((backlink, index) => (
                  <a
                    aria-label={`Return to citation ${number}, occurrence ${index + 1}`}
                    href={`#${backlink.anchorId}`}
                    key={backlink.occurrence}
                    role="doc-backlink"
                  >
                    {backlinks.length > 1 ? `Back to claim ${index + 1}` : "Back to claim"}
                  </a>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
