import claimsJson from "@/data/knowledge-bank/claims.json";
import pageCitationsJson from "@/data/knowledge-bank/page-citations.json";
import sourcesJson from "@/data/knowledge-bank/sources.json";
import {
  claimRecordSchema,
  pageCitationsSchema,
  sourceRecordSchema,
  type ClaimRecord,
  type SourceRecord
} from "@/lib/citations/schema";

export const citationSources = sourceRecordSchema.array().parse(sourcesJson);
export const citationClaims = claimRecordSchema.array().parse(claimsJson);
export const pageCitations = pageCitationsSchema.parse(pageCitationsJson);

const sourceById = new Map(citationSources.map((source) => [source.id, source]));
const claimById = new Map(citationClaims.map((claim) => [claim.id, claim]));

export function getCitationSource(sourceId: string): SourceRecord {
  const source = sourceById.get(sourceId);

  if (!source) {
    throw new Error(`Missing citation source: ${sourceId}`);
  }

  return source;
}

export function getCitationClaim(claimId: string): ClaimRecord {
  const claim = claimById.get(claimId);

  if (!claim) {
    throw new Error(`Missing citation claim: ${claimId}`);
  }

  return claim;
}

export function getCitationEvidence(claim: ClaimRecord) {
  return claim.evidence.map((evidence) => ({
    ...evidence,
    source: getCitationSource(evidence.sourceId)
  }));
}
