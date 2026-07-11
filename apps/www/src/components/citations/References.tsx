import type { ResolvedCitationPage, SourceRecord } from "@/data/knowledge-bank";

type ReferencesProps = { page: ResolvedCitationPage };

function SourceDetails({ source }: { source: SourceRecord }) {
  const byline = [source.authorOrOrganization, source.publisher, source.publishedAt]
    .filter((item, index, all) => item && all.indexOf(item) === index)
    .join(" / ");

  return (
    <li className="reference-source">
      <p>
        <strong>{source.title}</strong>
        {byline ? <span className="reference-byline"> {byline}.</span> : null}
      </p>
      <p>{source.publicNote}</p>
      {source.links.length ? (
        <p className="reference-links">
          {source.links.map((link) => (
            <a href={link.url} key={`${source.id}-${link.kind}-${link.url}`}>
              {link.label}
            </a>
          ))}
        </p>
      ) : null}
    </li>
  );
}

export function References({ page }: ReferencesProps) {
  const headingId = `${page.slug}-references-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="citation-references"
      data-citation-references
      role="doc-endnotes"
    >
      <h2 id={headingId}>{page.referenceHeading}</h2>
      <ol>
        {page.references.map((reference) => (
          <li
            className="reference-note"
            data-citation-number={reference.number}
            id={reference.referenceId}
            key={reference.note.id}
            role="doc-endnote"
            tabIndex={-1}
          >
            <h3>{reference.note.title}</h3>
            <p>{reference.note.publicText}</p>
            <ul className="reference-sources">
              {reference.sources.map((source) => (
                <SourceDetails key={source.id} source={source} />
              ))}
            </ul>
            {reference.note.qualification ? (
              <p className="reference-qualification">
                <strong>Limit:</strong> {reference.note.qualification}
              </p>
            ) : null}
            <p className="reference-backlinks">
              {reference.backlinks.map((backlink, index) => (
                <a
                  aria-label={`Back to citation ${reference.number}${
                    reference.backlinks.length > 1 ? `, occurrence ${index + 1}` : ""
                  }`}
                  href={`#${backlink.citationId}`}
                  key={backlink.citationId}
                  role="doc-backlink"
                >
                  Back to citation{reference.backlinks.length > 1 ? ` ${index + 1}` : ""}
                </a>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
