import assetsData from "./assets.json";
import claimsData from "./claims.json";
import correctionsData from "./corrections.json";
import evidenceData from "./evidence.json";
import callNycProjectionData from "./projections/callnyc.json";
import technicalOperationsProjectionData from "./projections/technical-operations.json";
import researchRunsData from "./research-runs.json";
import sourcesData from "./sources.json";
import { resolveCitationPage } from "@/lib/citations/resolve-citation-page";
import {
  assetRecordSchema,
  claimRecordSchema,
  correctionRecordSchema,
  evidenceRelationshipSchema,
  pageCitationProjectionSchema,
  researchRunRecordSchema,
  sourceRecordSchema
} from "./schema";

export const sourceRecords = sourceRecordSchema.array().parse(sourcesData);
export const claimRecords = claimRecordSchema.array().parse(claimsData);
export const evidenceRelationships = evidenceRelationshipSchema.array().parse(evidenceData);
export const researchRunRecords = researchRunRecordSchema.array().parse(researchRunsData);
export const assetRecords = assetRecordSchema.array().parse(assetsData);
export const correctionRecords = correctionRecordSchema.array().parse(correctionsData);

export const pageCitationProjections = pageCitationProjectionSchema.array().parse([
  callNycProjectionData,
  technicalOperationsProjectionData
]);

export const citationRegistry = {
  assets: assetRecords,
  claims: claimRecords,
  corrections: correctionRecords,
  evidence: evidenceRelationships,
  projections: pageCitationProjections,
  researchRuns: researchRunRecords,
  sources: sourceRecords
};

export const callNycCitationPage = resolveCitationPage("page.work.callnyc", citationRegistry);
export const technicalOperationsCitationPage = resolveCitationPage(
  "page.work.technical-operations",
  citationRegistry
);

export type {
  AssetRecord,
  CitationSurface,
  ClaimRecord,
  CorrectionRecord,
  EvidenceRelationship,
  PageCitationProjection,
  ResearchRunRecord,
  SourceRecord
} from "./schema";
