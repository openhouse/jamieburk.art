import { defineCitationProjection } from "./define-citation-projection";
import {
  callnycProjectionRecord,
  technicalOperationsProjectionRecord
} from "./records";

export {
  assets,
  assetById,
  callnycProjectionRecord,
  citationGroupById,
  citationGroups,
  claimById,
  claims,
  correctionById,
  corrections,
  evidence,
  evidenceById,
  getAsset,
  getCitationGroup,
  getClaim,
  getCorrection,
  getEvidence,
  getResearchRun,
  getSource,
  researchRunById,
  researchRuns,
  sourceById,
  sources,
  technicalOperationsProjectionRecord
} from "./records";
export { defineCitationProjection } from "./define-citation-projection";
export type {
  CitationOccurrence,
  CitationProjection,
  CitationReference
} from "./define-citation-projection";
export type {
  AssetRecord,
  CitationGroupRecord,
  ClaimRecord,
  CorrectionRecord,
  EvidenceRecord,
  EvidenceTarget,
  PageProjectionRecord,
  ResearchRunRecord,
  SourceRecord
} from "./schema";

export const callnycProjection = defineCitationProjection(callnycProjectionRecord);
export const technicalOperationsProjection = defineCitationProjection(
  technicalOperationsProjectionRecord
);
