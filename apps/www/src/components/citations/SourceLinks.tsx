import type { SourceRecord } from "@/data/citations";

type SourceLinksProps = {
  sources: SourceRecord[];
  includeArchiveLinks: boolean;
};

function sourceLabel(source: SourceRecord) {
  if (source.type === "project-artifact") return "Public repository";
  if (source.type === "independent-reporting") return "Archived PDF";
  if (source.type === "promotional-graphic") return "Promotional graphic";
  if (source.type === "web-archive-container") return "Wayback capture";
  if (source.type === "social-post") return "Original post";
  if (source.type === "official-contemporaneous") return "Original post";
  return "Source";
}

export function SourceLinks({ sources, includeArchiveLinks }: SourceLinksProps) {
  const seen = new Set<string>();
  const links = sources.flatMap((source) => {
    const sourceLinks: Array<{ href: string; label: string; key: string }> = [];

    if (includeArchiveLinks && source.archiveUrl && !seen.has(source.archiveUrl)) {
      seen.add(source.archiveUrl);
      sourceLinks.push({
        href: source.archiveUrl,
        label: "Archived source",
        key: `${source.id}-archive`
      });
    }

    if (source.url && !seen.has(source.url)) {
      seen.add(source.url);
      sourceLinks.push({
        href: source.url,
        label: sourceLabel(source),
        key: `${source.id}-url`
      });
    }

    return sourceLinks;
  });

  if (!links.length) return null;

  return (
    <span className="source-links" aria-label="Public source links">
      {links.map((link) => (
        <a key={link.key} href={link.href}>
          {link.label}
        </a>
      ))}
    </span>
  );
}
