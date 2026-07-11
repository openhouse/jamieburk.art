import type { ClaimRecord, ResearchRun, SourceRecord } from "@/data/knowledge-bank/schema";

export const positiveEvidenceRelations: Set<string>;
export function loadKnowledgeBank(): {
  sources: SourceRecord[];
  claims: ClaimRecord[];
  researchRuns: ResearchRun[];
  sourcesById: Map<string, SourceRecord>;
  claimsById: Map<string, ClaimRecord>;
};
export function isPublicClaim(claim: ClaimRecord | undefined): boolean;
export function requirePublicClaim(claimsById: Map<string, ClaimRecord>, id: string): ClaimRecord;
export function createCitationPlan(ids: string[], claimsById: Map<string, ClaimRecord>): {
  ids: string[];
  numberFor(id: string): number;
};
export function publicSourcesForClaim(
  claim: ClaimRecord,
  sourcesById: Map<string, SourceRecord>
): SourceRecord[];
export function sourceLinks(source: SourceRecord): Array<{ href: string; label: string }>;
export function buildCitationNote(
  claim: ClaimRecord,
  sourcesById: Map<string, SourceRecord>
): {
  text: string;
  links: Array<{ href: string; label: string }>;
  qualifications: string[];
  accessibleLabel: string;
};
