import { z } from "zod";
import claimsInput from "./claims.json";
import evidenceInput from "./evidence.json";
import pagesInput from "./pages.json";
import researchRunsInput from "./research-runs.json";
import sourcesInput from "./sources.json";
import {
  claimRecordSchema,
  evidenceRecordSchema,
  pageCitationSchema,
  researchRunSchema,
  sourceRecordSchema,
  type CitationPage,
  type ClaimRecord,
  type EvidenceRecord,
  type ResearchRun,
  type SourceRecord
} from "./schema";

function parseCollection<T>(label: string, schema: z.ZodType<T>, input: unknown): T[] {
  const result = z.array(schema).safeParse(input);
  if (!result.success) {
    throw new Error(`Invalid citation ${label}: ${z.prettifyError(result.error)}`);
  }
  return result.data;
}

function createUniqueMap<T extends { id: string }>(label: string, records: T[]) {
  const map = new Map<string, T>();
  for (const record of records) {
    if (map.has(record.id)) {
      throw new Error(`Duplicate citation ${label} ID: ${record.id}`);
    }
    map.set(record.id, record);
  }
  return map;
}

export const sources: SourceRecord[] = parseCollection(
  "sources",
  sourceRecordSchema,
  sourcesInput
);
export const evidence: EvidenceRecord[] = parseCollection(
  "evidence",
  evidenceRecordSchema,
  evidenceInput
);
export const claims: ClaimRecord[] = parseCollection("claims", claimRecordSchema, claimsInput);
export const citationPages: CitationPage[] = parseCollection(
  "pages",
  pageCitationSchema,
  pagesInput
);
export const researchRuns: ResearchRun[] = parseCollection(
  "research runs",
  researchRunSchema,
  researchRunsInput
);

export const sourceById = createUniqueMap("source", sources);
export const evidenceById = createUniqueMap("evidence", evidence);
export const claimById = createUniqueMap("claim", claims);
export const citationPageById = createUniqueMap("page", citationPages);
export const researchRunById = createUniqueMap("research run", researchRuns);

for (const record of evidence) {
  if (!sourceById.has(record.sourceId)) {
    throw new Error(`Citation evidence ${record.id} references missing source ${record.sourceId}`);
  }
}

for (const claim of claims) {
  if (new Set(claim.evidenceIds).size !== claim.evidenceIds.length) {
    throw new Error(`Citation claim ${claim.id} has duplicate evidence IDs`);
  }
  for (const evidenceId of claim.evidenceIds) {
    if (!evidenceById.has(evidenceId)) {
      throw new Error(`Citation claim ${claim.id} references missing evidence ${evidenceId}`);
    }
  }
}

for (const page of citationPages) {
  if (new Set(page.claimOrder).size !== page.claimOrder.length) {
    throw new Error(`Citation page ${page.id} has duplicate claim IDs`);
  }

  for (const claimId of page.claimOrder) {
    const claim = claimById.get(claimId);
    if (!claim) {
      throw new Error(`Citation page ${page.id} references missing claim ${claimId}`);
    }
    if (!claim.allowedSurfaces.includes(page.path)) {
      throw new Error(`Citation claim ${claimId} is not allowed on ${page.path}`);
    }
  }
}

for (const source of sources) {
  const hasPublicHref = Boolean(source.url || source.archiveUrl);
  if (source.publicLinkAllowed && !hasPublicHref) {
    throw new Error(`Public citation source ${source.id} has no public URL`);
  }
  if (source.accessStatus === "private" && hasPublicHref) {
    throw new Error(`Private citation source ${source.id} must not contain a public URL`);
  }
}

export function getSource(id: string): SourceRecord {
  const source = sourceById.get(id);
  if (!source) throw new Error(`Unknown citation source: ${id}`);
  return source;
}

export function getEvidence(id: string): EvidenceRecord {
  const record = evidenceById.get(id);
  if (!record) throw new Error(`Unknown citation evidence: ${id}`);
  return record;
}

export function getClaim(id: string): ClaimRecord {
  const claim = claimById.get(id);
  if (!claim) throw new Error(`Unknown citation claim: ${id}`);
  return claim;
}

export function getCitationPage(id: string): CitationPage {
  const page = citationPageById.get(id);
  if (!page) throw new Error(`Unknown citation page: ${id}`);
  return page;
}

export type { CitationPage, ClaimRecord, EvidenceRecord, ResearchRun, SourceRecord };
export type CitationPageId = CitationPage["id"];
