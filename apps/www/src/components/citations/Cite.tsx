import {
  citationAnchorId,
  getCitationNumber,
  getPageClaim,
  referenceAnchorId
} from "@/lib/citations";
import { getEvidence, getSource } from "@/data/knowledge-bank";

type CiteProps = {
  page: string;
  claimId: string;
};

export function Cite({ page, claimId }: CiteProps) {
  const claim = getPageClaim(page, claimId);

  return (
    <sup className="citation-cluster">
      {claim.evidenceIds.map((evidenceId, index) => {
        const evidence = getEvidence(evidenceId);
        const source = getSource(evidence.sourceId);
        const number = getCitationNumber(page, evidenceId);

        if (!evidence.publicCitationAllowed) {
          throw new Error(`Citation evidence ${evidenceId} cannot appear publicly`);
        }

        return (
          <span className="citation-item" key={evidenceId}>
            {index > 0 ? (
              <span aria-hidden="true" className="citation-separator">
                ,
              </span>
            ) : null}
            <a
              aria-label={`Citation ${number}: ${source.title}`}
              href={`#${referenceAnchorId(page, number)}`}
              id={citationAnchorId(page, claimId, evidenceId)}
              role="doc-noteref"
            >
              {number}
            </a>
          </span>
        );
      })}
    </sup>
  );
}
