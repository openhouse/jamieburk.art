import assetsData from "./assets.json";
import citationGroupsData from "./citation-groups.json";
import claimsData from "./claims.json";
import correctionsData from "./corrections.json";
import evidenceData from "./evidence.json";
import callnycProjectionData from "./page-projections/callnyc.json";
import technicalOperationsProjectionData from "./page-projections/technical-operations.json";
import researchRunsData from "./research-runs.json";
import sourcesData from "./sources.json";
import {
  assetRecordSchema,
  citationGroupRecordSchema,
  claimRecordSchema,
  correctionRecordSchema,
  evidenceRecordSchema,
  pageProjectionRecordSchema,
  researchRunRecordSchema,
  sourceRecordSchema
} from "./schema";

export const sources = sourceRecordSchema.array().parse(sourcesData);
export const assets = assetRecordSchema.array().parse(assetsData);
export const claims = claimRecordSchema.array().parse(claimsData);
export const evidence = evidenceRecordSchema.array().parse(evidenceData);
export const researchRuns = researchRunRecordSchema.array().parse(researchRunsData);
export const corrections = correctionRecordSchema.array().parse(correctionsData);
export const citationGroups = citationGroupRecordSchema.array().parse(citationGroupsData);
export const callnycProjectionRecord = pageProjectionRecordSchema.parse(callnycProjectionData);
export const technicalOperationsProjectionRecord = pageProjectionRecordSchema.parse(
  technicalOperationsProjectionData
);

function mapById<T extends { id: string }>(records: T[], label: string) {
  const mapped = new Map<string, T>();

  for (const record of records) {
    if (mapped.has(record.id)) {
      throw new Error(`Duplicate ${label} ID: ${record.id}`);
    }

    mapped.set(record.id, record);
  }

  return mapped;
}

export const sourceById = mapById(sources, "source");
export const assetById = mapById(assets, "asset");
export const claimById = mapById(claims, "claim");
export const evidenceById = mapById(evidence, "evidence");
export const researchRunById = mapById(researchRuns, "research run");
export const correctionById = mapById(corrections, "correction");
export const citationGroupById = mapById(citationGroups, "citation group");

function requireRecord<T>(record: T | undefined, label: string, id: string) {
  if (!record) {
    throw new Error(`Unknown ${label} ID: ${id}`);
  }

  return record;
}

export function getSource(id: string) {
  return requireRecord(sourceById.get(id), "source", id);
}

export function getAsset(id: string) {
  return requireRecord(assetById.get(id), "asset", id);
}

export function getClaim(id: string) {
  return requireRecord(claimById.get(id), "claim", id);
}

export function getEvidence(id: string) {
  return requireRecord(evidenceById.get(id), "evidence", id);
}

export function getResearchRun(id: string) {
  return requireRecord(researchRunById.get(id), "research run", id);
}

export function getCorrection(id: string) {
  return requireRecord(correctionById.get(id), "correction", id);
}

export function getCitationGroup(id: string) {
  return requireRecord(citationGroupById.get(id), "citation group", id);
}
