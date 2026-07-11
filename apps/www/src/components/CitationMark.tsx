import { claimsById, sourcesById } from "@/data/knowledge-bank";
import { buildCitationNote, requirePublicClaim } from "@/lib/knowledge-bank-runtime.mjs";

type CitationMarkProps = {
  claimId: string;
  number: number;
};

export function CitationMark({ claimId, number }: CitationMarkProps) {
  const claim = requirePublicClaim(claimsById, claimId);
  const note = buildCitationNote(claim, sourcesById);

  return (
    <sup>
      <a
        aria-label={`Citation ${number}: ${note.accessibleLabel.replace(/^Citation:\s*/, "")}`}
        data-citation-claim={claimId}
        data-citation-number={number}
        data-footnote-ref
        href={`#citation-note-${claimId}`}
        id={`citation-ref-${claimId}`}
      >
        {number}
      </a>
    </sup>
  );
}
