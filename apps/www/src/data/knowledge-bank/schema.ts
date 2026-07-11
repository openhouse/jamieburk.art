import { z } from "zod";

export const sourceKindSchema = z.enum([
  "official-page",
  "official-document",
  "social-post",
  "archived-page",
  "news-report",
  "public-artifact",
  "promotional-graphic",
  "participant-photograph",
  "participant-archive",
  "dataset",
  "project-website",
  "research-run"
]);

export const sourceVisibilitySchema = z.enum([
  "public-linkable",
  "public-archived",
  "public-unlinked",
  "private-review-only",
  "not-recovered"
]);

export const sourceClassSchema = z.enum([
  "primary-contemporaneous",
  "primary-retrospective",
  "official-institutional",
  "independent-secondary",
  "participant-archive",
  "contextual",
  "research-finding"
]);

export const publicCitationModeSchema = z.enum([
  "link",
  "label-only",
  "summary-only",
  "not-public"
]);

export const sourceRecordSchema = z.object({
  id: z.string(),
  kind: sourceKindSchema,
  sourceClass: sourceClassSchema,
  visibility: sourceVisibilitySchema,
  publicCitationMode: publicCitationModeSchema,
  title: z.string(),
  shortLabel: z.string(),
  author: z.string().optional(),
  publisher: z.string().optional(),
  publishedAt: z.string().optional(),
  capturedAt: z.string().optional(),
  accessedAt: z.string(),
  lastCheckedAt: z.string().optional(),
  originalUrl: z.string().optional(),
  archivedUrl: z.string().optional(),
  mediaUrl: z.string().optional(),
  supportSummary: z.string(),
  limitations: z.array(z.string()),
  availability: z.enum([
    "live",
    "archived",
    "dead-original-archive-available",
    "private",
    "not-recovered"
  ]),
  rights: z.enum(["link-only", "publishable", "conditional", "private-review"])
});

export const claimStatusSchema = z.enum([
  "ready",
  "careful",
  "pending",
  "private",
  "superseded"
]);

export const confidenceSchema = z.enum(["strong", "moderate", "careful", "uncertain"]);

export const evidenceRelationshipSchema = z.enum([
  "directly-supports",
  "corroborates",
  "contextualizes",
  "partially-supports",
  "qualifies",
  "contradicts",
  "negative-search-finding"
]);

export const evidenceEdgeSchema = z.object({
  sourceId: z.string(),
  relationship: evidenceRelationshipSchema,
  locator: z.string().optional(),
  supportSummary: z.string(),
  publicNote: z.string().optional()
});

export const claimSurfaceSchema = z.enum([
  "homepage",
  "work-card",
  "case-study",
  "technical-operations",
  "resume",
  "lab",
  "internal-only"
]);

export const claimRecordSchema = z.object({
  id: z.string(),
  status: claimStatusSchema,
  confidence: confidenceSchema,
  canonicalPublicWording: z.string(),
  detailedPublicWording: z.string().optional(),
  evidence: z.array(evidenceEdgeSchema),
  caveat: z.string().optional(),
  doNotSay: z.array(z.string()),
  protectedBoundaries: z.array(z.string()),
  surfaces: z.array(claimSurfaceSchema),
  supersedes: z.array(z.string()).optional(),
  revisedAt: z.string(),
  reviewedBy: z.array(z.string())
});

export const citationGroupSchema = z.object({
  id: z.string(),
  claimIds: z.array(z.string()),
  sourceIds: z.array(z.string()),
  shortLabel: z.string(),
  note: z.string(),
  includeOriginalLinks: z.boolean(),
  includeArchiveLinks: z.boolean(),
  includeMediaLinks: z.boolean(),
  status: z.enum(["ready", "careful", "pending", "private"]),
  lastReviewedAt: z.string()
});

export const researchRunSchema = z.object({
  id: z.string(),
  subject: z.string(),
  conductedAt: z.string(),
  method: z.string(),
  corpusSummary: z.string(),
  querySummary: z.string(),
  counts: z
    .object({
      deduplicatedHtmlCaptures: z.number().optional(),
      originalUrls: z.number().optional(),
      eventUrlKeys: z.number().optional(),
      successfulPages: z.number().optional(),
      redirects: z.number().optional(),
      notFoundCaptures: z.number().optional()
    })
    .optional(),
  findings: z.array(z.string()),
  notRecovered: z.array(z.string()),
  limitations: z.array(z.string()),
  publicSummaryAllowed: z.boolean(),
  privateArtifactsRemainOutsideRepo: z.boolean()
});

export const pageCitationOrdersSchema = z.record(z.string(), z.array(z.string()));

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type CitationGroup = z.infer<typeof citationGroupSchema>;
export type ResearchRun = z.infer<typeof researchRunSchema>;
