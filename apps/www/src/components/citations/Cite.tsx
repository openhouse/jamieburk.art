import { resolveCitationOccurrence } from "@/lib/citations";

type CiteProps = {
  pageId: string;
  occurrenceId: string;
};

export function Cite({ pageId, occurrenceId }: CiteProps) {
  const occurrence = resolveCitationOccurrence(pageId, occurrenceId);

  return (
    <sup className="citation-marker">
      <a
        aria-label={`${occurrence.accessibleLabel}, citation ${occurrence.number}`}
        href={`#${occurrence.noteAnchor}`}
        id={occurrence.referenceAnchor}
        role="doc-noteref"
      >
        {occurrence.number}
      </a>
    </sup>
  );
}
