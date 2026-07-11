import {
  getPageCitationEntries,
  getPublicSourceLinks,
  type SourceRecord
} from "@jamie-burkart/knowledge-bank";

type ReferenceListProps = {
  pageId: string;
};

function anchorSafe(value: string) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}

function SourceLinks({ source }: { source: SourceRecord }) {
  const links = getPublicSourceLinks(source);

  if (!links.length) {
    return (
      <p className="mt-1 text-sm leading-6 text-jb-ink/68">
        Private or unlinked source. {source.publicNote}
      </p>
    );
  }

  return (
    <ul className="mt-2 flex flex-wrap gap-2 text-sm" aria-label={`Links for ${source.shortLabel}`}>
      {links.map((link) => (
        <li key={`${source.id}-${link.label}`}>
          <a
            className="inline-flex rounded-lg border border-jb-blue/25 px-3 py-1.5 font-semibold text-jb-blue hover:bg-jb-sky/20"
            href={link.url}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ReferenceList({ pageId }: ReferenceListProps) {
  const pageAnchor = anchorSafe(pageId);
  const entries = getPageCitationEntries(pageId);

  return (
    <section
      aria-labelledby={`${pageAnchor}-references-heading`}
      className="citation-endnotes"
      role="doc-endnotes"
    >
      <h2 id={`${pageAnchor}-references-heading`}>Sources and notes</h2>
      <ol>
        {entries.map(({ number, citation, sources }) => (
          <li id={`citation-note-${pageAnchor}-${number}`} key={citation.id}>
            <p className="citation-note-text">{citation.publicNote}</p>
            {citation.publicCaveat ? (
              <p className="citation-note-caveat">
                <strong>Limit:</strong> {citation.publicCaveat}
              </p>
            ) : null}
            <ul className="citation-source-list" aria-label={`Sources for citation ${number}`}>
              {sources.map((source) => (
                <li key={source.id}>
                  <p className="font-semibold text-jb-ink">{source.shortLabel}</p>
                  <p className="mt-1 text-sm leading-6 text-jb-ink/70">{source.publicNote}</p>
                  <SourceLinks source={source} />
                </li>
              ))}
            </ul>
            <p className="citation-backlink">
              <a
                aria-label={`Return to citation ${number} in the text`}
                href={`#citation-ref-${pageAnchor}-${number}-1`}
              >
                Return to citation {number}
              </a>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
