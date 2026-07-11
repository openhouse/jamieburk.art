import { Cite } from "@/components/citations/Cite";
import { getCitationClaim } from "@/lib/citations/registry";
import type { CitationScope } from "@/lib/citations/scope";

type ClaimProps = {
  scope: CitationScope;
  claimId: string;
};

export function Claim({ scope, claimId }: ClaimProps) {
  const claim = getCitationClaim(claimId);

  return (
    <>
      {claim.publicText}
      <Cite scope={scope} claimId={claimId} />
    </>
  );
}
