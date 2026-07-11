import { getCitationClaim } from "@/lib/citations/registry";
import { getCitationNumber, type CitationScope } from "@/lib/citations/scope";

type CiteProps = {
  scope: CitationScope;
  claimId: string;
  label?: string;
};

export function Cite({ scope, claimId, label }: CiteProps) {
  const number = getCitationNumber(scope, claimId);
  const claim = getCitationClaim(claimId);
  const citationId = `citation-${scope.key}-${number}`;
  const referenceId = `reference-${scope.key}-${number}`;

  return (
    <sup className="citation-marker">
      <a
        aria-label={label ?? `Citation ${number}: ${claim.publicText}`}
        href={`#${referenceId}`}
        id={citationId}
        role="doc-noteref"
      >
        {number}
      </a>
    </sup>
  );
}
