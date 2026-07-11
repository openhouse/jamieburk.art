import claimsData from "./claims.json";
import pagesData from "./pages.json";
import findingsData from "./research-findings.json";
import sourcesData from "./sources.json";
import {
  claimRecordsSchema,
  pageCitationProjectionsSchema,
  researchFindingsSchema,
  sourceRecordsSchema
} from "./schema";

export type {
  ClaimRecord,
  PageCitationItem,
  PageCitationProjection,
  ResearchFinding,
  SourceRecord
} from "./schema";

export const citationSources = sourceRecordsSchema.parse(sourcesData);
export const citationClaims = claimRecordsSchema.parse(claimsData);
export const citationPages = pageCitationProjectionsSchema.parse(pagesData);
export const citationResearchFindings = researchFindingsSchema.parse(findingsData);

export const citationSourceById = new Map(
  citationSources.map((source) => [source.id, source])
);

export const citationClaimById = new Map(
  citationClaims.map((claim) => [claim.id, claim])
);

export const citationPageById = new Map(citationPages.map((page) => [page.pageId, page]));
