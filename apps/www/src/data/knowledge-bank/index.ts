import artifactsJson from "./artifacts.json";
import citationNotesJson from "./citation-notes.json";
import claimsJson from "./claims.json";
import correctionsJson from "./corrections.json";
import evidenceJson from "./evidence.json";
import pagesJson from "./pages.json";
import researchRunsJson from "./research-runs.json";
import sourcesJson from "./sources.json";
import { assertNoDuplicateDomIds, resolveCitationPage } from "./resolve-citations.mjs";
import {
  artifactRecordSchema,
  citationNoteSchema,
  citationPageSchema,
  claimRecordSchema,
  correctionRecordSchema,
  evidenceRelationshipSchema,
  researchRunSchema,
  sourceRecordSchema
} from "./schema";

export const citationSources = sourceRecordSchema.array().parse(sourcesJson);
export const citationClaims = claimRecordSchema.array().parse(claimsJson);
export const citationEvidence = evidenceRelationshipSchema.array().parse(evidenceJson);
export const citationNotes = citationNoteSchema.array().parse(citationNotesJson);
export const citationPages = citationPageSchema.array().parse(pagesJson);
export const citationArtifacts = artifactRecordSchema.array().parse(artifactsJson);
export const citationResearchRuns = researchRunSchema.array().parse(researchRunsJson);
export const citationCorrections = correctionRecordSchema.array().parse(correctionsJson);

export const citationSourcesById = new Map(citationSources.map((source) => [source.id, source]));
export const citationClaimsById = new Map(citationClaims.map((claim) => [claim.id, claim]));
export const citationEvidenceById = new Map(citationEvidence.map((item) => [item.id, item]));
export const citationNotesById = new Map(citationNotes.map((note) => [note.id, note]));

const registry = {
  sourcesById: citationSourcesById,
  claimsById: citationClaimsById,
  evidenceById: citationEvidenceById,
  notesById: citationNotesById
};

export const resolvedCitationPages = citationPages.map((page) => {
  const resolved = resolveCitationPage(page, registry);
  assertNoDuplicateDomIds(resolved);
  return resolved;
});

export const callnycCitationPage = resolvedCitationPages.find((page) => page.route === "/work/callnyc");
if (!callnycCitationPage) throw new Error("CallNYC citation page is missing");

export type { ResolvedCitationPage } from "./resolve-citations.mjs";
export type {
  ArtifactRecord,
  CitationNote,
  CitationPage,
  ClaimRecord,
  CorrectionRecord,
  EvidenceRelationship,
  ResearchRun,
  SourceRecord
} from "./schema";
