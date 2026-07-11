import {
  citationMarkerId,
  citationNoteId,
  getCitationClaim,
  getCitationNumber,
  getCitationSet
} from "@/data/citations";

type CiteProps = {
  setId: string;
  claimId: string;
  occurrence: number;
};

export function Cite({ setId, claimId, occurrence }: CiteProps) {
  const set = getCitationSet(setId);
  const entry = set.entries.find((item) => item.claimId === claimId);
  const claim = getCitationClaim(claimId);

  if (!entry || occurrence < 1 || occurrence > entry.occurrences) {
    throw new Error(
      `Invalid citation occurrence ${occurrence} for ${claimId} in ${setId}`
    );
  }

  const number = getCitationNumber(setId, claimId);

  return (
    <sup className="citation-marker">
      <a
        id={citationMarkerId(setId, number, occurrence)}
        href={`#${citationNoteId(setId, number)}`}
        aria-label={`Citation ${number}: ${claim.canonicalText}`}
        role="doc-noteref"
      >
        [{number}]
      </a>
    </sup>
  );
}
