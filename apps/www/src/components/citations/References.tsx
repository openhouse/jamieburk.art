import {
  citationMarkerId,
  citationNoteId,
  getCitationClaim,
  getCitationSet,
  getCitationSources
} from "@/data/citations";
import { SourceLinks } from "./SourceLinks";

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
              role="doc-footnote"
              tabIndex={-1}
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
                      role="doc-backlink"
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
