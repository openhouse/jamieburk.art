import type { ResolvedCitationPage, ResolvedReference } from "@/lib/citations/types";

type ReferencesProps = {
  page: ResolvedCitationPage;
  heading?: string;
};

function SourceLinks({ reference }: { reference: ResolvedReference }) {
  const shouldLink = reference.treatment === "linked" && reference.source.publiclyLinkable;

  if (!shouldLink) {
    return <span>Summary-only note; no public source link is exposed.</span>;
  }

  return (
    <>
      {reference.source.originalUrl ? (
        <a href={reference.source.originalUrl} rel="noreferrer" target="_blank">
          Original source
        </a>
      ) : null}
      {reference.source.originalUrl && reference.source.archiveUrl ? <span> / </span> : null}
      {reference.source.archiveUrl ? (
        <a href={reference.source.archiveUrl} rel="noreferrer" target="_blank">
          Archived context
        </a>
      ) : null}
      {!reference.source.originalUrl && !reference.source.archiveUrl ? (
        <span>Public reference</span>
      ) : null}
    </>
  );
}

export function References({ page, heading = "Sources & notes" }: ReferencesProps) {
  return (
    <section className="citation-references" aria-labelledby={`${page.id}-references-heading`}>
      <h2 id={`${page.id}-references-heading`}>{heading}</h2>
      <ol className="citation-reference-list">
        {page.references.map((reference) => (
          <li id={`reference-${reference.number}`} key={reference.number} role="doc-footnote">
            <p>
              <span className="citation-reference-number">[{reference.number}]</span>{" "}
              <strong>{reference.source.shortCitation}.</strong> <SourceLinks reference={reference} />
            </p>
            <p>{reference.note}</p>
            {reference.qualifierNotes.length ? (
              <ul className="citation-qualifier-list">
                {reference.qualifierNotes.map((qualifier) => (
                  <li key={qualifier}>{qualifier}</li>
                ))}
              </ul>
            ) : null}
            <p className="citation-reference-boundary">
              Does not establish: {reference.source.doesNotEstablish.join("; ")}.
            </p>
            <p className="citation-backlinks">
              {reference.backlinks.map((backlink, index) => (
                <a
                  aria-label={backlink.label}
                  href={`#${backlink.anchorId}`}
                  key={backlink.anchorId}
                  role="doc-backlink"
                >
                  {index > 0 ? " " : ""}
                  ↩
                </a>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
