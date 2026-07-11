import { getPublicCitation } from "@/lib/knowledge-bank/citations";

import type { SourceRecord } from "@/lib/knowledge-bank/schema";

function linkLabel(source: SourceRecord, kind: SourceRecord["links"][number]["kind"]) {
  if (kind === "archive") return "Archived preservation";
  if (kind === "media") return "Promotional graphic";
  if (kind === "local-public-artifact") return "Public artifact";
  if (source.sourceClass === "press") return "Press coverage";
  if (source.sourceClass === "public-repository") return "Public repository";
  if (source.sourceClass === "official-government-post" || source.sourceClass === "organizer-social-post") {
    return "Original post";
  }
  return "Original source";
}

export function SourcesList({ citationOrder }: { citationOrder: readonly string[] }) {
  return (
    <section aria-labelledby="sources-heading" className="citation-sources">
      <h2 id="sources-heading">Sources</h2>
      <ol>
        {citationOrder.map((evidenceId, index) => {
          const number = index + 1;
          const { evidence, source } = getPublicCitation(evidenceId);

          return (
            <li className="citation-reference" id={`reference-${number}`} key={evidenceId}>
              <p>
                <strong>{source.shortLabel}.</strong> {source.publicCitation}
              </p>
              {source.links.length > 0 ? (
                <p className="citation-links">
                  {source.links.map((link) => (
                    <a href={link.url} key={`${link.kind}-${link.url}`}>
                      {linkLabel(source, link.kind)}
                    </a>
                  ))}
                </p>
              ) : null}
              <p>
                <strong>Supports:</strong> {evidence.publicNote ?? source.summary}
              </p>
              {source.limitations.length > 0 ? (
                <p>
                  <strong>Limits:</strong> {source.limitations.join(" ")}
                </p>
              ) : null}
              {source.caveats.length > 0 ? (
                <p>
                  <strong>Caveat:</strong> {source.caveats.join(" ")}
                </p>
              ) : null}
              <p className="citation-status">
                Source status: {source.availability}; citation policy: {source.publicCitationPolicy.replaceAll("-", " ")}.
              </p>
              <a
                aria-label={`Return to citation ${number}`}
                className="citation-backlink"
                href={`#citation-${number}`}
              >
                Return to citation {number}
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
