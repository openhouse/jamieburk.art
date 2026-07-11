import {
  getResearchRun,
  getSource,
  type CitationProjection,
  type CitationReference,
  type SourceRecord
} from "@/data/knowledge-bank";

type ReferencesProps = {
  projection: CitationProjection;
  heading?: string;
};

function originalLinkLabel(source: SourceRecord) {
  if (source.sourceType === "institutional-social-post") return "Original social post";
  if (source.sourceType === "promotional-graphic") return "Promotional graphic";
  if (source.sourceType === "independent-reporting") return "Archived PDF";
  if (source.sourceType === "public-code-repository") return "Public code repository";
  return "Original source";
}

function archiveLinkLabel(relationship: string) {
  if (relationship === "embedded-social-feed-context") {
    return "Wayback page containing the embedded post";
  }

  return relationship
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function SourceReference({ reference }: { reference: CitationReference }) {
  const source = getSource(reference.entryId);
  const hasPublicUrl = source.originalUrl || source.archiveUrls.length > 0;

  return (
    <>
      <p>
        <span className="font-semibold">{source.publicCitation}</span>
        {source.accessStatus === "private" ? " Private source; no public asset URL." : null}
      </p>
      {hasPublicUrl ? (
        <ul className="reference-links">
          {source.originalUrl ? (
            <li>
              <a href={source.originalUrl}>{originalLinkLabel(source)}</a>
            </li>
          ) : null}
          {source.archiveUrls.map((archiveUrl) => (
            <li key={archiveUrl.url}>
              <a href={archiveUrl.url}>{archiveLinkLabel(archiveUrl.relationship)}</a>
            </li>
          ))}
        </ul>
      ) : null}
      {source.caveats.length ? (
        <ul className="reference-caveats">
          {source.caveats.map((caveat) => (
            <li key={caveat}>{caveat}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function ResearchRunReference({ reference }: { reference: CitationReference }) {
  const researchRun = getResearchRun(reference.entryId);

  return (
    <>
      <p>
        <span className="font-semibold">{researchRun.publicCitation}</span>
      </p>
      <p>{researchRun.epistemicLimit}</p>
    </>
  );
}

export function References({ projection, heading = "Sources and notes" }: ReferencesProps) {
  return (
    <section
      aria-labelledby="sources-and-notes"
      className="references-section"
      role="doc-bibliography"
    >
      <h2 id="sources-and-notes">{heading}</h2>
      <ol className="reference-list">
        {projection.references.map((reference) => (
          <li className="reference-entry" id={reference.referenceId} key={reference.referenceId}>
            {reference.entryType === "source" ? (
              <SourceReference reference={reference} />
            ) : (
              <ResearchRunReference reference={reference} />
            )}
            <p className="reference-backlinks">
              {reference.citationAnchors.map((anchor, index) => (
                <a
                  aria-label={`Return to citation ${reference.number}${
                    reference.citationAnchors.length > 1 ? `, occurrence ${index + 1}` : ""
                  }`}
                  href={`#${anchor}`}
                  key={anchor}
                  role="doc-backlink"
                >
                  Back to citation
                  {reference.citationAnchors.length > 1 ? ` ${index + 1}` : ""}
                </a>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
