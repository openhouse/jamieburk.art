import { z } from "zod";

export const sourceVisibilitySchema = z.enum([
  "public",
  "public_with_limits",
  "protected",
  "private"
]);

export const sourceStatusSchema = z.enum([
  "live",
  "archived",
  "unavailable",
  "redirected",
  "not_recovered"
]);

export const evidenceStatusSchema = z.enum([
  "verified_primary",
  "corroborated",
  "independently_reported",
  "archive_supported",
  "responsible_inference",
  "not_recovered",
  "unresolved"
]);

export const evidenceSupportSchema = z.enum([
  "direct",
  "corroborating",
  "contextual",
  "limiting",
  "contradicting"
]);

const safeIdSchema = z.string().regex(/^[a-z0-9-]+$/);
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const sourceSchema = z.object({
  id: safeIdSchema,
  sourceType: z.string().min(1),
  title: z.string().min(1),
  creator: z.string().min(1).optional(),
  publisher: z.string().min(1).optional(),
  publishedAt: dateSchema.optional(),
  accessedAt: dateSchema,
  originalUrl: z.url().optional(),
  archiveUrl: z.url().optional(),
  preferredPublicUrl: z.url().optional(),
  locator: z.string().min(1).optional(),
  shortCitation: z.string().min(1),
  fullCitation: z.string().min(1),
  status: sourceStatusSchema,
  visibility: sourceVisibilitySchema,
  publicNote: z.string().min(1).optional()
});

export const claimSchema = z.object({
  id: safeIdSchema,
  proofId: safeIdSchema.optional(),
  canonicalText: z.string().min(1),
  publicVariants: z.record(z.string(), z.string().min(1)).optional(),
  evidenceStatus: evidenceStatusSchema,
  evidence: z.array(
    z.object({
      sourceId: safeIdSchema,
      locator: z.string().min(1).optional(),
      support: evidenceSupportSchema,
      note: z.string().min(1).optional()
    })
  ),
  qualifier: z.string().min(1).optional(),
  limitations: z.array(z.string().min(1)).optional(),
  antiClaims: z.array(z.string().min(1)).optional(),
  prohibitedWording: z.array(z.string().min(1)).optional(),
  approvedSurfaces: z.array(z.string().min(1)),
  publicApproved: z.boolean(),
  recordStatus: z.enum(["active", "superseded"]).optional(),
  reviewedAt: dateSchema.optional(),
  reviewedBy: z.string().min(1).optional()
});

export const researchInquirySchema = z.object({
  id: safeIdSchema,
  question: z.string().min(1),
  method: z.string().min(1),
  performedAt: dateSchema,
  corpus: z.record(z.string(), z.number().int().nonnegative()).optional(),
  recovered: z.array(z.string().min(1)),
  notRecovered: z.array(z.string().min(1)),
  conclusion: z.string().min(1),
  limitation: z.string().min(1),
  publicSummary: z.string().min(1).optional()
});

export const citationSetSchema = z.object({
  id: safeIdSchema,
  pagePath: z.string().startsWith("/"),
  entries: z.array(
    z.object({
      claimId: safeIdSchema,
      occurrences: z.number().int().positive()
    })
  )
});

export const correctionSchema = z.object({
  id: safeIdSchema,
  subjectId: safeIdSchema,
  previousValue: z.string().min(1),
  correctedValue: z.string().min(1),
  reason: z.string().min(1),
  requiredBeforeProduction: z.boolean(),
  resolvedAt: dateSchema.optional()
});

export const assetSchema = z.object({
  id: safeIdSchema,
  sourceId: safeIdSchema.optional(),
  kind: z.enum([
    "photograph",
    "promotional_graphic",
    "screenshot",
    "document",
    "diagram"
  ]),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  visibleText: z.string().min(1).optional(),
  capturedAt: z.string().min(1).optional(),
  visibility: sourceVisibilitySchema,
  rightsStatus: z.enum([
    "cleared",
    "review_required",
    "not_cleared",
    "not_applicable"
  ]),
  consentStatus: z.enum([
    "cleared",
    "review_required",
    "not_required",
    "not_cleared"
  ]),
  publicUseStatus: z.enum(["approved", "metadata_only", "withheld"]),
  allowedSurfaces: z.array(z.string().min(1)),
  publicAltText: z.string().min(1).optional(),
  publicCaption: z.string().min(1).optional(),
  cropReviewStatus: z
    .enum(["not_started", "review_required", "approved"])
    .optional()
});

export const sourcesSchema = z.array(sourceSchema);
export const claimsSchema = z.array(claimSchema);
export const researchInquiriesSchema = z.array(researchInquirySchema);
export const citationSetsSchema = z.array(citationSetSchema);
export const correctionsSchema = z.array(correctionSchema);
export const assetsSchema = z.array(assetSchema);

export type CitationSource = z.infer<typeof sourceSchema>;
export type CitationClaim = z.infer<typeof claimSchema>;
export type CitationSet = z.infer<typeof citationSetSchema>;
export type CorrectionRecord = z.infer<typeof correctionSchema>;
export type KnowledgeAsset = z.infer<typeof assetSchema>;
