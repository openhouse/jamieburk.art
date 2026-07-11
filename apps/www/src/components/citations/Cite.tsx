import { getCitationOccurrence } from "@jamie-burkart/knowledge-bank";

type CiteProps = {
  pageId: string;
  id: string;
};

export function Cite({ pageId, id }: CiteProps) {
  const occurrence = getCitationOccurrence(pageId, id);

  return (
    <sup className="citation-ref">
      <a
        id={occurrence.anchorId}
        href={`#${occurrence.targetId}`}
        role="doc-noteref"
        aria-label={`Citation ${occurrence.number}: ${occurrence.group.title ?? occurrence.group.id}`}
      >
        {occurrence.number}
      </a>
    </sup>
  );
}
