import type { CitationSource } from "@/data/citations/schemas";

function primaryLinkLabel(source: CitationSource) {
  if (source.sourceType === "promotional graphic") return "Promotional graphic";
  if (source.sourceType === "source-code repository") return "Public repository";
  if (source.archiveUrl && source.preferredPublicUrl === source.archiveUrl) {
    return source.sourceType === "news article" ? "Archived article" : "Archived source";
  }
  return "Public source";
}

export function SourceLinks({ source }: { source: CitationSource }) {
  if (source.visibility === "protected" || source.visibility === "private") {
    return null;
  }

  const preferred = source.preferredPublicUrl;
  const original = source.originalUrl;

  if (!preferred && !original) return null;

  return (
    <span className="citation-source-links" aria-label="Public source links">
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
