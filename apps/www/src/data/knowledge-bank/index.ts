import claimsJson from "./claims.json";
import researchRunsJson from "./research-runs.json";
import sourcesJson from "./sources.json";
import {
  claimRecordSchema,
  researchRunSchema,
  sourceRecordSchema,
  type ClaimRecord,
  type ResearchRun,
  type SourceRecord
} from "./schema";

export const knowledgeClaims: ClaimRecord[] = claimRecordSchema.array().parse(claimsJson);
export const knowledgeSources: SourceRecord[] = sourceRecordSchema.array().parse(sourcesJson);
export const researchRuns: ResearchRun[] = researchRunSchema.array().parse(researchRunsJson);

export const claimsById = new Map(knowledgeClaims.map((claim) => [claim.id, claim]));
export const sourcesById = new Map(knowledgeSources.map((source) => [source.id, source]));

export function getKnowledgeClaim(id: string): ClaimRecord | undefined {
  return claimsById.get(id);
}

export function requirePublicKnowledgeClaim(id: string): ClaimRecord {
  const claim = getKnowledgeClaim(id);

  if (!claim || claim.publicationStatus === "internal-only" || claim.publicationStatus === "protected") {
    throw new Error(`Knowledge-bank claim is not public: ${id}`);
  }

  return claim;
}
