import {
  resolveCitationPage,
  type ResearchRun,
  type SourceRecord
} from "@jamie-burkart/knowledge-bank";

type ReferencesProps = {
  pageId: string;
};

function displayDate(value?: string) {
  if (!value) return null;
  const [year, month, day] = value.slice(0, 10).split("-");
  if (!month) return year;
  if (!day) return `${year}-${month}`;
  return `${month}/${day}/${year}`;
}

function SourceSummary({ source }: { source: SourceRecord }) {
  const sourceDate = displayDate(source.publishedAt ?? source.capturedAt);
  return (
    <li>
      {source.authorOrOrganization ? `${source.authorOrOrganization}. ` : null}
      <cite className="not-italic">{source.title}</cite>
      {sourceDate ? ` (${sourceDate}).` : "."} {source.publicNote}{" "}
      {source.links.length ? (
        <span className="citation-source-links">
          {source.links.map((link) => (
            <a key={`${source.id}-${link.kind}`} href={link.url} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </span>
      ) : source.visibility === "public-metadata-only" ? (
        <span className="citation-no-link">No public asset link.</span>
      ) : null}
    </li>
  );
}

function ResearchSummary({ run }: { run: ResearchRun }) {
  return (
    <li>
      <strong>Research audit.</strong> {run.result} {run.interpretation}
    </li>
  );
}

export function References({ pageId }: ReferencesProps) {
  const page = resolveCitationPage(pageId);
  if (!page.references.length) return null;

  const headingId = `${page.pageId}-sources-heading`;
  return (
    <section className="citation-sources" role="doc-endnotes" aria-labelledby={headingId}>
      <h2 id={headingId}>{page.heading}</h2>
      <ol>
        {page.references.map((reference) => (
          <li id={reference.targetId} key={reference.group.id} className="citation-source-note">
            {reference.group.title ? <h3>{reference.group.title}</h3> : null}
            <p>{reference.group.publicNote}</p>
            {reference.sources.length || reference.researchRuns.length ? (
              <ul className="citation-source-list" aria-label={`Evidence for citation ${reference.number}`}>
                {reference.sources.map((source) => (
                  <SourceSummary key={source.id} source={source} />
                ))}
                {reference.researchRuns.map((run) => (
                  <ResearchSummary key={run.id} run={run} />
                ))}
              </ul>
            ) : null}
            <p className="citation-limit">
              <strong>Limits:</strong> {reference.group.materialLimitations.join(" ")}
            </p>
            <span className="citation-backlinks" aria-label={`Backlinks for citation ${reference.number}`}>
              {reference.backlinks.map((backlink, index) => (
                <a
                  key={backlink.anchorId}
                  href={`#${backlink.anchorId}`}
                  role="doc-backlink"
                  aria-label={backlink.label}
                >
                  <span aria-hidden="true">↩</span>
                  {reference.backlinks.length > 1 ? (
                    <span className="sr-only"> occurrence {index + 1}</span>
                  ) : null}
                </a>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
