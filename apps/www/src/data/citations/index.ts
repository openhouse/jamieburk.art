import claimsData from "./claims.json";
import correctionsData from "./corrections.json";
import mediaData from "./media.json";
import notesData from "./notes.json";
import pagesData from "./pages.json";
import findingsData from "./research-findings.json";
import sourcesData from "./sources.json";
import {
  citationNotesSchema,
  claimRecordsSchema,
  correctionRecordsSchema,
  mediaRecordsSchema,
  pageCitationProjectionsSchema,
  researchFindingsSchema,
  sourceRecordsSchema
} from "./schema";

export type {
  CitationNote,
  ClaimRecord,
  CorrectionRecord,
  MediaRecord,
  PageCitationItem,
  PageCitationProjection,
  ResearchFinding,
  SourceRecord
} from "./schema";

export const citationSources = sourceRecordsSchema.parse(sourcesData);
export const citationClaims = claimRecordsSchema.parse(claimsData);
export const citationNotes = citationNotesSchema.parse(notesData);
export const citationPages = pageCitationProjectionsSchema.parse(pagesData);
export const citationResearchFindings = researchFindingsSchema.parse(findingsData);
export const citationMedia = mediaRecordsSchema.parse(mediaData);
export const citationCorrections = correctionRecordsSchema.parse(correctionsData);

export const citationSourceById = new Map(
  citationSources.map((source) => [source.id, source])
);

export const citationClaimById = new Map(
  citationClaims.map((claim) => [claim.id, claim])
);

export const citationNoteById = new Map(citationNotes.map((note) => [note.id, note]));

export const citationPageById = new Map(citationPages.map((page) => [page.pageId, page]));

export const citationMediaById = new Map(citationMedia.map((media) => [media.id, media]));

export const citationCorrectionById = new Map(
  citationCorrections.map((correction) => [correction.id, correction])
);
