import assetsData from "./assets.json";
import claimsData from "./claims.json";
import callNycPageData from "./pages/callnyc.json";
import researchRunsData from "./research-runs.json";
import sourcesData from "./sources.json";
import { resolveCitationPage } from "@/lib/citations/resolve-citation-page";
import {
  assetRecordSchema,
  claimRecordSchema,
  pageManifestSchema,
  researchRunRecordSchema,
  sourceRecordSchema
} from "./schema";

export const sourceRecords = sourceRecordSchema.array().parse(sourcesData);
export const claimRecords = claimRecordSchema.array().parse(claimsData);
export const researchRunRecords = researchRunRecordSchema.array().parse(researchRunsData);
export const assetRecords = assetRecordSchema.array().parse(assetsData);
export const callNycPageManifest = pageManifestSchema.parse(callNycPageData);

export const callNycCitationPage = resolveCitationPage(callNycPageManifest, {
  claims: claimRecords,
  researchRuns: researchRunRecords,
  sources: sourceRecords
});

export type {
  AssetRecord,
  CitationSurface,
  ClaimRecord,
  PageManifest,
  ResearchRunRecord,
  SourceRecord
} from "./schema";
