import type { SourceRecord } from "@/data/knowledge-bank";
import { getPublicSourceLinks } from "@/lib/citations";

export function SourceEntry({ source }: { source: SourceRecord }) {
  const links = getPublicSourceLinks(source);
  const [primaryLink] = links;

  return (
    <li className="citation-source-entry">
      <p>
        <cite>
          {primaryLink ? (
            <a href={primaryLink.url}>{source.title}</a>
          ) : (
            source.title
          )}
        </cite>
        {source.authorOrAccount ? `, ${source.authorOrAccount}` : ""}
        {source.publisher ? `, ${source.publisher}` : ""}
        {source.datePublished ? ` (${source.datePublished})` : ""}.
      </p>
      <p className="citation-source-note">{source.publicSourceNote}</p>
      {links.length ? (
        <p className="citation-source-links">
          {links.map((link) => (
            <a href={link.url} key={`${link.label}-${link.url}`}>
              {link.label}
            </a>
          ))}
        </p>
      ) : null}
      {source.publicationStatus === "private" ? (
        <p className="citation-private-label">Private source; no public link</p>
      ) : null}
    </li>
  );
}
