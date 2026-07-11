import type { ResolvedSource } from "@/lib/knowledge-bank/resolve-page-citations";

export function SourceLinks({ sources }: { sources: ResolvedSource[] }) {
  const seen = new Set<string>();
  const links = sources.flatMap((source) =>
    source.publicLinks.filter((link) => {
      if (seen.has(link.url)) return false;
      seen.add(link.url);
      return true;
    })
  );

  if (!links.length) return null;

  return (
    <p aria-label="Public source links" className="citation-links">
      {links.map((link) => (
        <a href={link.url} key={`${link.kind}-${link.url}`}>
          {link.label}
        </a>
      ))}
    </p>
  );
}
