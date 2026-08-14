import type { PublicSourceRecord } from "@/data/knowledge-bank/public";

type SourceNoteProps = {
  source: PublicSourceRecord;
  number: number;
  noteId: string;
  backlinks: Array<{ id: string; occurrenceId: string }>;
};

function preferredUrl(source: PublicSourceRecord) {
  if (source.visibility !== "public") return undefined;
  if (source.preferredPublicUrl === "canonical") return source.canonicalUrl;
  if (source.preferredPublicUrl === "archive") return source.archiveUrl;
  if (source.preferredPublicUrl === "asset") return source.assetUrl;
  return source.canonicalUrl ?? source.archiveUrl ?? source.assetUrl;
}

export function SourceNote({ backlinks, noteId, number, source }: SourceNoteProps) {
  const primaryUrl = preferredUrl(source);
  const secondaryLinks = [
    { label: "Original post", url: source.canonicalUrl },
    { label: "Archived copy", url: source.archiveUrl },
    {
      label: source.kind === "government-record" ? "Official document" : "Image",
      url: source.assetUrl
    }
  ].filter(
    (item, index, items) =>
      item.url &&
      item.url !== primaryUrl &&
      items.findIndex((candidate) => candidate.url === item.url) === index
  );

  return (
    <li id={noteId}>
      <p>
        <span className="font-semibold text-jb-ink">[{number}] </span>
        {primaryUrl ? <a href={primaryUrl}>{source.publicCitation}</a> : source.publicCitation}
      </p>
      {secondaryLinks.length ? (
        <p className="jb-endnote-links">
          {secondaryLinks.map((link) => (
            <a href={link.url} key={link.label}>{link.label}</a>
          ))}
        </p>
      ) : null}
      {source.publicNote ? <p className="jb-endnote-boundary">{source.publicNote}</p> : null}
      {source.doesNotEstablish.length ? (
        <p className="jb-endnote-boundary">
          <strong>Boundary:</strong> This source does not establish {source.doesNotEstablish.join(", ")}.
        </p>
      ) : null}
      <p className="jb-endnote-backlinks">
        {backlinks.map((backlink, index) => (
          <a
            aria-label={`Return to citation ${number}, occurrence ${index + 1}`}
            href={`#${backlink.id}`}
            key={backlink.id}
            role="doc-backlink"
          >
            Return {index + 1}
          </a>
        ))}
      </p>
    </li>
  );
}
