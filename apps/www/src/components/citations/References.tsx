import {
  getAsset,
  getCitationGroup,
  getEvidence,
  getResearchRun,
  getSource,
  type AssetRecord,
  type CitationProjection,
  type EvidenceRecord,
  type SourceRecord
} from "@/data/knowledge-bank";

type ReferencesProps = {
  projection: CitationProjection;
  heading?: string;
};

function originalLinkLabel(source: SourceRecord) {
  if (source.sourceType === "institutional-social-post") return "Original post";
  if (source.sourceType === "independent-reporting") return "Archived PDF";
  if (source.sourceType === "public-code-repository") return "Public repository";
  if (source.sourceType === "official-web-page") return "Official page";
  if (source.sourceClass === "primary-attachment") return "Promotional graphic";
  return "Source";
}

function archiveLinkLabel(relationship: string) {
  if (relationship === "embedded-social-feed-context") return "Wayback context";

  return relationship
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function assetLinkLabel(asset: AssetRecord) {
  if (asset.mediaType === "promotional-graphic") return "Promotional graphic";
  if (asset.mediaType === "pdf") return "Archived PDF";
  if (asset.mediaType === "screenshot") return "Screenshot";
  return "Public asset";
}

function SourceLinks({ source }: { source: SourceRecord }) {
  if (source.citationMode === "description-only") {
    return null;
  }

  return (
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
  );
}

function SourceEvidence({ evidenceRecord }: { evidenceRecord: EvidenceRecord }) {
  const source = getSource(evidenceRecord.target.id);
  const privateDescription =
    source.visibility === "private" || source.citationMode === "description-only"
      ? " Private source; no public asset URL."
      : "";

  return (
    <li>
      <p>
        <span className="font-semibold">{source.publicCitation}</span>
        {privateDescription}
      </p>
      <SourceLinks source={source} />
      {source.caveats.length ? (
        <ul className="reference-caveats">
          {source.caveats.map((caveat) => (
            <li key={caveat}>{caveat}</li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function AssetEvidence({ evidenceRecord }: { evidenceRecord: EvidenceRecord }) {
  const asset = getAsset(evidenceRecord.target.id);
  const source = asset.sourceId ? getSource(asset.sourceId) : null;
  const privateDescription =
    asset.visibility === "private" || !asset.publicAssetUrl
      ? " Private source; no public asset URL."
      : "";

  return (
    <li>
      <p>
        <span className="font-semibold">{source?.publicCitation ?? asset.title}</span>
        {privateDescription}
      </p>
      {asset.publicAssetUrl && asset.rightsState !== "private-review" ? (
        <ul className="reference-links">
          <li>
            <a href={asset.publicAssetUrl}>{assetLinkLabel(asset)}</a>
          </li>
        </ul>
      ) : null}
      {asset.visibleText.length ? (
        <p className="reference-visible-text">
          Visible text: {asset.visibleText.join(" ")}
        </p>
      ) : null}
      {asset.caveats.length ? (
        <ul className="reference-caveats">
          {asset.caveats.map((caveat) => (
            <li key={caveat}>{caveat}</li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function ResearchRunEvidence({ evidenceRecord }: { evidenceRecord: EvidenceRecord }) {
  const researchRun = getResearchRun(evidenceRecord.target.id);

  return (
    <li>
      <p>
        <span className="font-semibold">{researchRun.publicCitation}</span>
      </p>
      <p>{researchRun.epistemicLimit}</p>
    </li>
  );
}

function EvidenceItem({ evidenceId }: { evidenceId: string }) {
  const evidenceRecord = getEvidence(evidenceId);

  if (evidenceRecord.target.kind === "source") {
    return <SourceEvidence evidenceRecord={evidenceRecord} />;
  }

  if (evidenceRecord.target.kind === "asset") {
    return <AssetEvidence evidenceRecord={evidenceRecord} />;
  }

  return <ResearchRunEvidence evidenceRecord={evidenceRecord} />;
}

export function References({ projection, heading = "Sources and notes" }: ReferencesProps) {
  const headingId = `sources-and-notes-${projection.page
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()}`;

  return (
    <section aria-labelledby={headingId} className="references-section" role="doc-endnotes">
      <h2 id={headingId}>{heading}</h2>
      <ol className="reference-list">
        {projection.references.map((reference) => {
          const group = getCitationGroup(reference.citationGroupId);

          return (
            <li
              className="reference-entry"
              id={reference.referenceId}
              key={reference.referenceId}
              role="doc-footnote"
            >
              <h3>{group.title}</h3>
              <p>{group.publicNote}</p>
              <ul className="reference-source-list">
                {group.sourceOrder.map((evidenceId) => (
                  <EvidenceItem evidenceId={evidenceId} key={evidenceId} />
                ))}
              </ul>
              {group.boundaryNote ? (
                <p className="reference-boundary">{group.boundaryNote}</p>
              ) : null}
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
          );
        })}
      </ol>
    </section>
  );
}
