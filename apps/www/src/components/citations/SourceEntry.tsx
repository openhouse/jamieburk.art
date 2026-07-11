import type { SourceRecord } from "@/data/knowledge-bank";
import { getPublicSourceLinks } from "@/lib/citations";

type SourceEntryProps = {
  source: SourceRecord;
};

export function SourceEntry({ source }: SourceEntryProps) {
  const links = getPublicSourceLinks(source);
  const primaryUrl = links[0]?.href;

  return (
    <li className="citation-source-entry">
      <span>
        {primaryUrl ? (
          <cite>
            <a href={primaryUrl}>{source.title}</a>
          </cite>
        ) : (
          <cite>{source.title}</cite>
        )}
        {source.authorOrAccount ? `, ${source.authorOrAccount}` : ""}
        {source.publisher ? `, ${source.publisher}` : ""}
        {source.datePublished ? `, ${source.datePublished}` : ""}. {source.publicSourceNote}
      </span>
      {primaryUrl ? (
        <span className="citation-source-links">
          {links.map((link) => (
            <a href={link.href} key={`${link.kind}-${link.href}`}>
              {link.label}
            </a>
          ))}
        </span>
      ) : (
        <span className="citation-protected-label">Protected source; no public link</span>
      )}
    </li>
  );
}
