import { getCitationClaim } from "@/lib/citations/registry";
import type { ClaimRecord } from "@/lib/citations/schema";

export type CitationScope = {
  key: string;
  claimIds: string[];
  claims: ClaimRecord[];
  numberByClaimId: Record<string, number>;
};

function normalizeScopeKey(key: string) {
  return key.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
}

export function createCitationScope(key: string, claimIds: readonly string[]): CitationScope {
  const normalizedKey = normalizeScopeKey(key);
  const firstAppearanceClaimIds = [...new Set(claimIds)];
  const numberByClaimId = Object.fromEntries(
    firstAppearanceClaimIds.map((claimId, index) => [claimId, index + 1])
  );

  return {
    key: normalizedKey,
    claimIds: firstAppearanceClaimIds,
    claims: firstAppearanceClaimIds.map((claimId) => getCitationClaim(claimId)),
    numberByClaimId
  };
}

export function getCitationNumber(scope: CitationScope, claimId: string) {
  const number = scope.numberByClaimId[claimId];

  if (!number) {
    throw new Error(`Citation claim ${claimId} is not in scope ${scope.key}`);
  }

  return number;
}
