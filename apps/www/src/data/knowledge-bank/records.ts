import claimsData from "./claims.json";
import correctionsData from "./corrections.json";
import callnycProjectionData from "./projections/callnyc.json";
import researchRunsData from "./research-runs.json";
import sourcesData from "./sources.json";
import {
  citationProjectionRecordSchema,
  claimRecordSchema,
  correctionRecordSchema,
  researchRunRecordSchema,
  sourceRecordSchema
} from "./schema";

export const sources = sourceRecordSchema.array().parse(sourcesData);
export const claims = claimRecordSchema.array().parse(claimsData);
export const researchRuns = researchRunRecordSchema.array().parse(researchRunsData);
export const corrections = correctionRecordSchema.array().parse(correctionsData);
export const callnycProjectionRecord = citationProjectionRecordSchema.parse(
  callnycProjectionData
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
export const claimById = mapById(claims, "claim");
export const researchRunById = mapById(researchRuns, "research run");
export const correctionById = mapById(corrections, "correction");

export function getSource(id: string) {
  const source = sourceById.get(id);

  if (!source) {
    throw new Error(`Unknown source ID: ${id}`);
  }

  return source;
}

export function getClaim(id: string) {
  const claim = claimById.get(id);

  if (!claim) {
    throw new Error(`Unknown claim ID: ${id}`);
  }

  return claim;
}

export function getResearchRun(id: string) {
  const researchRun = researchRunById.get(id);

  if (!researchRun) {
    throw new Error(`Unknown research run ID: ${id}`);
  }

  return researchRun;
}
