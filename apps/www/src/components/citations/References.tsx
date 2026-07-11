import type { CitationSource } from "@/data/citations/schemas";
import {
  citationMarkerId,
  citationNoteId,
  getCitationClaim,
  getCitationSet,
  getCitationSources
} from "@/data/citations";

function primaryLinkLabel(source: CitationSource) {
  if (source.sourceType === "promotional graphic") return "Promotional graphic";
  if (source.sourceType === "source-code repository") return "Public repository";
  if (source.archiveUrl && source.preferredPublicUrl === source.archiveUrl) {
    return source.sourceType === "news article" ? "Archived article" : "Archived source";
  }
  return "Public source";
}

function SourceLinks({ source }: { source: CitationSource }) {
  if (source.visibility === "protected" || source.visibility === "private") {
    return null;
  }

  const preferred = source.preferredPublicUrl;
  const original = source.originalUrl;

  if (!preferred && !original) return null;

  return (
    <span className="citation-source-links">
      {preferred ? (
        <a className="citation-source-link" href={preferred}>
          {primaryLinkLabel(source)}
        </a>
      ) : null}
      {original && original !== preferred ? (
        <a className="citation-source-link" href={original}>
          Original post
        </a>
      ) : null}
    </span>
  );
}

export function References({ setId }: { setId: string }) {
  const set = getCitationSet(setId);
  const headingId = `sources-and-notes-${setId}`;

  return (
    <section
      className="citation-references"
      aria-labelledby={headingId}
      role="doc-endnotes"
    >
      <h2 id={headingId}>Sources and notes</h2>
      <ol>
        {set.entries.map((entry, index) => {
          const number = index + 1;
          const claim = getCitationClaim(entry.claimId);
          const sources = getCitationSources(entry.claimId);

          return (
            <li
              className="citation-note"
              id={citationNoteId(setId, number)}
              key={entry.claimId}
            >
              <p className="citation-note-claim">{claim.canonicalText}</p>
              <ul className="citation-source-list">
                {sources.map(({ relationship, source }) => (
                  <li key={source.id}>
                    <span>{source.fullCitation}</span>
                    {relationship.note ? <span> {relationship.note}</span> : null}
                    {source.publicNote ? <span> {source.publicNote}</span> : null}
                    <SourceLinks source={source} />
                  </li>
                ))}
              </ul>
              {claim.qualifier ? (
                <p className="citation-note-limit">Limit: {claim.qualifier}</p>
              ) : null}
              <span className="citation-backlinks" aria-label={`Citation ${number} backlinks`}>
                {Array.from({ length: entry.occurrences }, (_, occurrenceIndex) => {
                  const occurrence = occurrenceIndex + 1;
                  return (
                    <a
                      href={`#${citationMarkerId(setId, number, occurrence)}`}
                      aria-label={`Return to citation ${number}, occurrence ${occurrence}`}
                      key={occurrence}
                    >
                      Back to {number}.{occurrence}
                    </a>
                  );
                })}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
