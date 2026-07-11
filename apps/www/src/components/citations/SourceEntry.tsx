import type { ResolvedSource } from "@/lib/citations";
import { getPublicSourceLinks } from "@/lib/citations";

const sourceClassLabels = {
  "official-record": "Official source",
  "official-social-post": "Official social post",
  "archival-capture": "Archived capture",
  "independent-reporting": "Independent reporting",
  "participant-archive": "Participant archive",
  "project-artifact": "Project artifact",
  "research-log": "Research log"
} as const;

export function SourceEntry({ resolved }: { resolved: ResolvedSource }) {
  const { source, locator } = resolved;
  if (source.publicationMode === "not-public") return null;
  const links = getPublicSourceLinks(source.id);

  if (source.publicationMode === "summary-only") {
    return (
      <li className="reference-source">
        <p>{source.publicNote}</p>
        <span className="reference-source-meta">Not publicly linked</span>
      </li>
    );
  }

  return (
    <li className="reference-source">
      <p className="reference-source-title">
        {links[0] ? <a href={links[0].href}>{source.title}</a> : source.title}
      </p>
      <p className="reference-source-meta">
        {source.authors.length ? `${source.authors.join(", ")}. ` : null}
        {source.publisher ? `${source.publisher}. ` : null}
        {source.issued ? `${source.issued}. ` : null}
        {sourceClassLabels[source.sourceClass]}.
      </p>
      {locator ? <p className="reference-source-locator">{locator}</p> : null}
      <p>{source.publicNote}</p>
      {links.length > 1 ? (
        <p className="reference-source-links">
          {links.slice(1).map((link) => (
            <a href={link.href} key={`${source.id}-${link.label}`}>
              {link.label}
            </a>
          ))}
        </p>
      ) : null}
      {source.publicationMode === "label-only" ? (
        <span className="reference-source-meta">Not publicly linked</span>
      ) : null}
    </li>
  );
}
