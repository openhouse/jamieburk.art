import { getPublicReferences, type PublicReferenceTarget } from "@jamie-burkart/knowledge-bank";

type ReferencesProps = {
  pageId: string;
};

function targetLabel(target: PublicReferenceTarget) {
  if (target.kind === "source") return "Source";
  if (target.kind === "artifact") return "Artifact";
  return "Research note";
}

function SupportTarget({ target }: { target: PublicReferenceTarget }) {
  return (
    <li>
      <p className="citation-source-heading">
        {targetLabel(target)}: {target.label}
      </p>
      <p className="citation-source-description">{target.description}</p>
      {target.explanation ? <p className="citation-edge">{target.explanation}</p> : null}
      {target.links.length ? (
        <ul className="citation-link-list" aria-label={`Links for ${target.label}`}>
          {target.links.map((link) => (
            <li key={`${target.id}-${link.url}`}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="citation-private-note">
          Private, summary-only, or unlinked evidence; no public asset or private locator is
          published here.
        </p>
      )}
    </li>
  );
}

export function References({ pageId }: ReferencesProps) {
  const references = getPublicReferences(pageId);

  return (
    <section
      aria-labelledby="sources-and-notes-heading"
      className="reference-list"
      role="doc-endnotes"
    >
      <h2 id="sources-and-notes-heading">Sources and notes</h2>
      <ol>
        {references.map((reference) => (
          <li id={reference.occurrences[0]?.noteId} key={reference.citationGroup.id}>
            <p className="citation-note-text">{reference.citationGroup.publicNote}</p>
            {reference.citationGroup.publicCaveat ? (
              <p className="citation-note-caveat">
                <strong>Limit:</strong> {reference.citationGroup.publicCaveat}
              </p>
            ) : null}
            <ul className="citation-source-list" aria-label={`Support for citation ${reference.number}`}>
              {reference.targets.map((target) => (
                <SupportTarget key={target.edgeId} target={target} />
              ))}
            </ul>
            {reference.corrections.length ? (
              <details className="citation-corrections">
                <summary>Correction history</summary>
                <ul>
                  {reference.corrections.map((correction) => (
                    <li key={correction.id}>
                      <p>{correction.reason}</p>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
            <p className="citation-backlink">
              {reference.occurrences.map((occurrence, index) => (
                <a
                  aria-label={`Back to citation ${reference.number} occurrence ${index + 1} in the text`}
                  href={`#${occurrence.refId}`}
                  key={occurrence.occurrenceId}
                  role="doc-backlink"
                >
                  Back {index + 1}
                </a>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export const ReferenceList = References;
