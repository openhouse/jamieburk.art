import { z } from "zod";
import citationNotesInput from "./citation-notes.json";
import claimsInput from "./claims.json";
import correctionsInput from "./corrections.json";
import evidenceInput from "./evidence.json";
import mediaInput from "./media.json";
import pagesInput from "./pages.json";
import researchRunsInput from "./research-runs.json";
import sourcesInput from "./sources.json";
import {
  citationNoteRecordSchema,
  citationPageSchema,
  claimRecordSchema,
  correctionRecordSchema,
  evidenceRecordSchema,
  mediaRecordSchema,
  researchRunSchema,
  sourceRecordSchema,
  type CitationNoteRecord,
  type CitationPage,
  type ClaimRecord,
  type CorrectionRecord,
  type EvidenceRecord,
  type MediaRecord,
  type ResearchRun,
  type SourceRecord
} from "./schema";

function parseCollection<T>(label: string, schema: z.ZodType<T>, input: unknown): T[] {
  const result = z.array(schema).safeParse(input);
  if (!result.success) {
    throw new Error(`Invalid Knowledge Bank ${label}: ${z.prettifyError(result.error)}`);
  }
  return result.data;
}

function uniqueMap<T extends { id: string }>(label: string, records: T[]) {
  const map = new Map<string, T>();
  for (const record of records) {
    if (map.has(record.id)) throw new Error(`Duplicate Knowledge Bank ${label} ID: ${record.id}`);
    map.set(record.id, record);
  }
  return map;
}

export const sources = parseCollection("sources", sourceRecordSchema, sourcesInput);
export const evidence = parseCollection("evidence", evidenceRecordSchema, evidenceInput);
export const claims = parseCollection("claims", claimRecordSchema, claimsInput);
export const citationNotes = parseCollection(
  "citation notes",
  citationNoteRecordSchema,
  citationNotesInput
);
export const media = parseCollection("media", mediaRecordSchema, mediaInput);
export const researchRuns = parseCollection(
  "research runs",
  researchRunSchema,
  researchRunsInput
);
export const corrections = parseCollection(
  "corrections",
  correctionRecordSchema,
  correctionsInput
);
export const citationPages = parseCollection("pages", citationPageSchema, pagesInput);

export const sourceById = uniqueMap("source", sources);
export const evidenceById = uniqueMap("evidence", evidence);
export const claimById = uniqueMap("claim", claims);
export const citationNoteById = uniqueMap("citation note", citationNotes);
export const mediaById = uniqueMap("media", media);
export const researchRunById = uniqueMap("research run", researchRuns);
export const correctionById = uniqueMap("correction", corrections);
export const citationPageById = uniqueMap("page", citationPages);

export function getSource(id: string): SourceRecord {
  const record = sourceById.get(id);
  if (!record) throw new Error(`Unknown Knowledge Bank source: ${id}`);
  return record;
}

export function getEvidence(id: string): EvidenceRecord {
  const record = evidenceById.get(id);
  if (!record) throw new Error(`Unknown Knowledge Bank evidence: ${id}`);
  return record;
}

export function getClaim(id: string): ClaimRecord {
  const record = claimById.get(id);
  if (!record) throw new Error(`Unknown Knowledge Bank claim: ${id}`);
  return record;
}

export function getCitationNote(id: string): CitationNoteRecord {
  const record = citationNoteById.get(id);
  if (!record) throw new Error(`Unknown Knowledge Bank citation note: ${id}`);
  return record;
}

export function getCitationPage(id: string): CitationPage {
  const record = citationPageById.get(id);
  if (!record) throw new Error(`Unknown Knowledge Bank citation page: ${id}`);
  return record;
}

export type {
  CitationNoteRecord,
  CitationPage,
  ClaimRecord,
  CorrectionRecord,
  EvidenceRecord,
  MediaRecord,
  ResearchRun,
  SourceRecord
};
