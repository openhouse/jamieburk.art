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
  originalUrl: z.string().url().optional(),
  archiveUrl: z.string().url().optional(),
  preferredPublicUrl: z.enum(["original", "archive"]).optional(),
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

export const citationNoteSchema = z.object({
  id: z.string(),
  claimId: z.string(),
  publicText: z.string().optional(),
  sourceIds: z.array(z.string()),
  caveatOverride: z.string().optional(),
  includeOriginalLinks: z.boolean(),
  includeArchiveLinks: z.boolean()
});

export const pageCitationProjectionSchema = z.object({
  pageId: z.string(),
  citationOrder: z.array(
    z.object({
      noteId: z.string(),
      occurrences: z.array(z.string())
    })
  ),
  notesHeading: z.literal("Notes & sources"),
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

export const mediaRecordSchema = z.object({
  id: z.string(),
  kind: z.enum(["photograph", "screenshot", "document", "promotional-graphic", "map", "diagram"]),
  title: z.string(),
  sourceId: z.string().optional(),
  relatedClaimIds: z.array(z.string()).optional(),
  eventId: z.string().optional(),
  photographer: z.string().optional(),
  rightsHolder: z.string().optional(),
  rightsStatus: z.enum(["approved", "pending", "not-required", "do-not-publish"]),
  peoplePictured: z.array(z.string()).optional(),
  consentStatus: z
    .enum(["approved", "pending", "not-identifiable", "do-not-publish"])
    .optional(),
  publicCitation: z.boolean(),
  publicAssetPath: z.string().optional(),
  caption: z.string().optional(),
  altText: z.string().optional(),
  cropNotes: z.string().optional(),
  redactionNotes: z.string().optional(),
  lastReviewed: z.string()
});

export const correctionRecordSchema = z.object({
  id: z.string(),
  subject: z.string(),
  previousWording: z.string(),
  correctedWording: z.string(),
  reason: z.string(),
  supportClaimIds: z.array(z.string()),
  correctedAt: z.string(),
  reviewedBy: z.array(z.string()),
  publicNoteRequired: z.boolean()
});

export const sourceRecordsSchema = z.array(sourceRecordSchema);
export const claimRecordsSchema = z.array(claimRecordSchema);
export const citationNotesSchema = z.array(citationNoteSchema);
export const pageCitationProjectionsSchema = z.array(pageCitationProjectionSchema);
export const researchFindingsSchema = z.array(researchFindingSchema);
export const mediaRecordsSchema = z.array(mediaRecordSchema);
export const correctionRecordsSchema = z.array(correctionRecordSchema);

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type CitationNote = z.infer<typeof citationNoteSchema>;
export type PageCitationProjection = z.infer<typeof pageCitationProjectionSchema>;
export type PageCitationItem = PageCitationProjection["citationOrder"][number];
export type ResearchFinding = z.infer<typeof researchFindingSchema>;
export type MediaRecord = z.infer<typeof mediaRecordSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
