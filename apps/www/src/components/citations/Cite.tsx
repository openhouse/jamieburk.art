import type { ResolvedCitationPage } from "@/data/knowledge-bank";

type CiteProps = {
  page: ResolvedCitationPage;
  occurrence: string;
};

export function Cite({ page, occurrence }: CiteProps) {
  const citation = page.occurrenceById.get(occurrence);
  if (!citation) throw new Error(`Unknown citation occurrence on ${page.route}: ${occurrence}`);

  return (
    <sup className="citation-marker">
      <a
        aria-label={`Citation ${citation.number}: ${citation.note.title}`}
        data-citation-note={citation.note.id}
        href={`#${citation.referenceId}`}
        id={citation.citationId}
        role="doc-noteref"
      >
        {citation.number}
      </a>
    </sup>
  );
}
