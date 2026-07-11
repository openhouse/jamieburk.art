import { getCitationEvidence } from "@/lib/citations/registry";
import { getCitationNumber, type CitationScope } from "@/lib/citations/scope";

type ReferencesProps = {
  scope: CitationScope;
};

function sourceDateLabel({
  datePublished,
  dateCaptured
}: {
  datePublished?: string;
  dateCaptured?: string;
}) {
  if (datePublished) return `Published ${datePublished}`;
  if (dateCaptured) return `Captured ${dateCaptured}`;
  return null;
}

export function References({ scope }: ReferencesProps) {
  if (!scope.claims.length) return null;

  return (
    <section
      aria-labelledby={`references-${scope.key}-heading`}
      className="references-section"
      role="doc-bibliography"
    >
      <h2 id={`references-${scope.key}-heading`}>Notes &amp; sources</h2>
      <ol className="references-list">
        {scope.claims.map((claim) => {
          const number = getCitationNumber(scope, claim.id);
          const citationId = `citation-${scope.key}-${number}`;
          const referenceId = `reference-${scope.key}-${number}`;

          return (
            <li className="reference-item" id={referenceId} key={claim.id}>
              <p className="reference-claim">{claim.publicText}</p>
              {claim.caveat ? (
                <p className="reference-caveat">
                  <strong>Qualification:</strong> {claim.caveat}
                </p>
              ) : null}
              <ul className="reference-sources">
                {getCitationEvidence(claim).map(({ source, relation, note }) => {
                  const dateLabel = sourceDateLabel(source);

                  return (
                    <li key={`${claim.id}-${source.id}`}>
                      <p>
                        <strong>{source.publisher}</strong>, &quot;{source.title}.&quot;
                        {dateLabel ? ` ${dateLabel}.` : null}
                      </p>
                      <p className="reference-links">
                        {source.url ? <a href={source.url}>Source link</a> : null}
                        {source.url && source.archiveUrls?.length ? " · " : null}
                        {source.archiveUrls?.map((archiveUrl, index) => (
                          <span key={archiveUrl}>
                            {index > 0 ? " · " : null}
                            <a href={archiveUrl}>
                              Archived capture{source.archiveUrls?.length === 1 ? "" : ` ${index + 1}`}
                            </a>
                          </span>
                        ))}
                      </p>
                      <p>
                        <strong>{relation}:</strong> {note}
                      </p>
                      <p>
                        <strong>Scope:</strong> {source.scopeNote}
                      </p>
                      {source.doesNotSupport?.length ? (
                        <p>
                          <strong>Does not establish:</strong>{" "}
                          {source.doesNotSupport.join("; ")}.
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
              <a
                aria-label={`Back to citation ${number}`}
                className="reference-backlink"
                href={`#${citationId}`}
                role="doc-backlink"
              >
                Back to citation {number} ↩
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
