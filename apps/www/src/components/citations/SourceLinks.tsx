import {
  getCitationSources,
  requireCitationGroup
} from "@/data/knowledge-bank";

type CitationSource = ReturnType<typeof getCitationSources>[number];
type CitationGroup = ReturnType<typeof requireCitationGroup>;

function sourceHref(source: CitationSource, group: CitationGroup) {
  if (source.publicCitationMode !== "link") return undefined;
  if (group.includeOriginalLinks && source.originalUrl) return source.originalUrl;
  if (group.includeArchiveLinks && source.archivedUrl) return source.archivedUrl;
  if (group.includeMediaLinks && source.mediaUrl) return source.mediaUrl;
  return undefined;
}

export function SourceLinks({ groupId }: { groupId: string }) {
  const group = requireCitationGroup(groupId);
  const sources = getCitationSources(groupId);

  if (!sources.length) return null;

  return (
    <span className="citation-source-links">
      {sources.map((source) => {
        const href = sourceHref(source, group);

        if (!href) {
          return (
            <span className="citation-source-label" key={source.id}>
              {source.shortLabel}
            </span>
          );
        }

        return (
          <a href={href} key={source.id}>
            {source.shortLabel}
          </a>
        );
      })}
    </span>
  );
}
