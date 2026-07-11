import type { SourceRecord } from "@/data/knowledge-bank";
import { projectPublicSource } from "@/lib/citations";

export function SourceEntry({ source }: { source: SourceRecord }) {
  const projected = projectPublicSource(source);
  const [primaryLink] = projected.links;
  const credit = projected.author ?? projected.account;

  return (
    <li className="citation-source-entry">
      <p>
        <cite>
          {primaryLink ? <a href={primaryLink.url}>{projected.title}</a> : projected.title}
        </cite>
        {credit ? `, ${credit}` : ""}
        {projected.publisher ? `, ${projected.publisher}` : ""}
        {projected.issuedAt ? ` (${projected.issuedAt})` : ""}.
      </p>
      <p className="citation-source-note">{projected.publicNote}</p>
      {projected.links.length ? (
        <p className="citation-source-links">
          {projected.links.map((link) => (
            <a href={link.url} key={`${link.label}-${link.url}`}>
              {link.label}
            </a>
          ))}
        </p>
      ) : null}
      {projected.doesNotEstablish.length ? (
        <p className="citation-source-boundary">
          <strong>Does not establish:</strong> {projected.doesNotEstablish.join("; ")}.
        </p>
      ) : null}
      {projected.isRestricted ? (
        <p className="citation-private-label">{projected.visibility} source; no public link</p>
      ) : null}
    </li>
  );
}
