import {
  citationAnchorId,
  getPublicSourceHref,
  getReferenceEntries,
  referenceAnchorId
} from "@/lib/citations";

const sourceClassLabels = {
  "official-record": "Official record",
  "official-social-post": "Official social post",
  "archival-capture": "Archived capture",
  "independent-reporting": "Independent reporting",
  "participant-archive": "Participant archive",
  "project-artifact": "Project artifact",
  "research-log": "Research log"
} as const;

const accessStatusLabels = {
  live: "Live",
  archived: "Archived",
  dead: "Unavailable",
  private: "Private",
  "not-recovered": "Not recovered"
} as const;

export function References({ page }: { page: string }) {
  const references = getReferenceEntries(page);
  const headingId = `references-${page}-heading`;

  return (
    <section aria-labelledby={headingId} className="references" role="doc-endnotes">
      <h2 className="text-2xl font-semibold text-jb-ink" id={headingId}>
        References
      </h2>
      <ol className="references-list">
        {references.map(({ number, evidence, source, claimIds }) => {
          const primaryHref = getPublicSourceHref(source);
          return (
            <li id={referenceAnchorId(page, number)} key={evidence.id}>
              <div className="reference-number" aria-hidden="true">
                {number}
              </div>
              <div className="reference-body">
                <p className="reference-title">
                  {primaryHref ? <a href={primaryHref}>{source.title}</a> : source.title}
                </p>
                <p className="reference-citation-label">{source.citationLabel}</p>
                <p className="reference-meta">
                  <span>{sourceClassLabels[source.sourceClass]}</span>
                  <span>{accessStatusLabels[source.accessStatus]}</span>
                </p>
                {source.publicNote ? (
                  <p className="reference-note">{source.publicNote}</p>
                ) : null}
                <div className="reference-actions">
                  {source.archiveUrl && source.archiveUrl !== primaryHref ? (
                    <a href={source.archiveUrl}>Archived capture</a>
                  ) : null}
                  {source.assetUrl && source.assetUrl !== primaryHref ? (
                    <a href={source.assetUrl}>Promotional graphic</a>
                  ) : null}
                  {!primaryHref ? <span>No public link</span> : null}
                </div>
                <div className="reference-backlinks">
                  {claimIds.map((claimId, index) => (
                    <a
                      aria-label={`Return to the claim supported by citation ${number}`}
                      href={`#${citationAnchorId(page, claimId, evidence.id)}`}
                      key={claimId}
                      role="doc-backlink"
                    >
                      {claimIds.length > 1 ? `Back to claim ${index + 1}` : "Back to claim"}
                    </a>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
