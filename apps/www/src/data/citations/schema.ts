import { z } from "zod";

export const sourceTypeSchema = z.enum([
  "official-contemporaneous",
  "official-retrospective",
  "independent-reporting",
  "project-artifact",
  "social-post",
  "promotional-graphic",
  "web-archive-container",
  "participant-archive",
  "public-safe-aggregate",
  "research-log"
]);

export const sourceStatusSchema = z.enum([
  "live",
  "archived",
  "unstable",
  "private",
  "pending-rights"
]);

export const evidenceClassSchema = z.enum([
  "direct",
  "corroborating",
  "contextual",
  "participant-record"
]);

export const sourceRecordSchema = z.object({
  id: z.string(),
  type: sourceTypeSchema,
  title: z.string(),
  creator: z.string().optional(),
  publisher: z.string().optional(),
  publishedAt: z.string().optional(),
  eventDate: z.string().optional(),
  accessedAt: z.string(),
  url: z.string().url().optional(),
  archiveUrl: z.string().url().optional(),
  preferredUrl: z.enum(["url", "archiveUrl"]).optional(),
  status: sourceStatusSchema,
  evidenceClass: evidenceClassSchema,
  locator: z.string().optional(),
  publicCitation: z.boolean(),
  publicNote: z.string().optional(),
  caveat: z.string().optional(),
  rights: z
    .object({
      holder: z.string().optional(),
      permission: z.enum(["approved", "pending", "not-required", "do-not-publish"])
    })
    .optional(),
  lastReviewed: z.string()
});

export const supportRelationshipSchema = z.enum([
  "direct",
  "corroborating",
  "contextual",
  "participant-record",
  "contradictory"
]);

export const claimRecordSchema = z.object({
  id: z.string(),
  canonicalWording: z.string(),
  shortWording: z.string().optional(),
  detailedWording: z.string().optional(),
  status: z.enum(["Ready", "Careful", "Pending", "Protected"]),
  confidence: z.enum(["high", "medium", "low"]),
  supports: z.array(
    z.object({
      sourceId: z.string(),
      relationship: supportRelationshipSchema,
      locator: z.string().optional(),
      note: z.string().optional()
    })
  ),
  allowedPages: z.array(z.string()),
  prohibitedPages: z.array(z.string()).optional(),
  guardrail: z.string().optional(),
  antiClaims: z.array(z.string()).optional(),
  citationRequired: z.boolean(),
  reviewedBy: z.array(z.string()),
  lastReviewed: z.string()
});

export const pageCitationProjectionSchema = z.object({
  pageId: z.string(),
  citationOrder: z.array(
    z.object({
      claimId: z.string(),
      occurrences: z.array(z.string()),
      noteOverride: z.string().optional()
    })
  ),
  notesHeading: z.literal("Notes & sources"),
  includeArchiveLinks: z.boolean(),
  includeBacklinks: z.boolean()
});

export const researchFindingSchema = z.object({
  id: z.string(),
  subject: z.string(),
  status: z.enum(["not-recovered", "partially-recovered", "recovered"]),
  method: z.string(),
  scope: z.string(),
  conclusion: z.string(),
  limitation: z.string(),
  publicProjection: z.enum(["none", "source-note", "research-note"]),
  lastReviewed: z.string()
});

export const sourceRecordsSchema = z.array(sourceRecordSchema);
export const claimRecordsSchema = z.array(claimRecordSchema);
export const pageCitationProjectionsSchema = z.array(pageCitationProjectionSchema);
export const researchFindingsSchema = z.array(researchFindingSchema);

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type PageCitationProjection = z.infer<typeof pageCitationProjectionSchema>;
export type PageCitationItem = PageCitationProjection["citationOrder"][number];
export type ResearchFinding = z.infer<typeof researchFindingSchema>;
