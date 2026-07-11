import { z } from "zod";

export const surfaceSchema = z.enum([
  "homepage",
  "resume",
  "technical-operations",
  "work-card",
  "case-study",
  "lab",
  "about",
  "colophon",
  "internal-only"
]);

export const sourceRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortCitation: z.string(),
  fullCitation: z.string(),
  publisher: z.string(),
  sourceType: z.enum([
    "official_institutional_page",
    "official_institutional_social_post",
    "partner_institution_social_post",
    "promotional_graphic",
    "independent_reporting",
    "public_code_repository",
    "participant_archive",
    "research_run"
  ]),
  medium: z.enum([
    "web_page",
    "social_post",
    "image",
    "pdf",
    "code_repository",
    "photograph",
    "research_log"
  ]),
  publishedAt: z.string().optional(),
  accessedAt: z.string(),
  originalUrl: z.url().optional(),
  archiveUrl: z.url().optional(),
  publiclyLinkable: z.boolean(),
  accessStatus: z.enum(["public", "archived", "private", "unavailable"]),
  publicNote: z.string(),
  establishes: z.array(z.string()),
  doesNotEstablish: z.array(z.string()),
  preservation: z
    .object({
      provider: z.string(),
      method: z.string(),
      captureUrl: z.url().optional(),
      capturedAt: z.string().optional(),
      caution: z.string().optional()
    })
    .optional()
});

export const claimRecordSchema = z.object({
  id: z.string(),
  canonicalAssertion: z.string(),
  publicText: z.string(),
  status: z.enum(["verified", "qualified", "provisional", "protected"]),
  confidence: z.enum(["high", "medium", "low"]),
  publiclyUsable: z.boolean(),
  allowedSurfaces: z.array(surfaceSchema),
  approval: z.object({
    status: z.enum(["approved", "review_required", "protected"]),
    owner: z.string(),
    approvedAt: z.string().optional()
  }),
  requiredQualifiers: z.array(z.string()).default([]),
  antiClaims: z.array(z.string()).default([])
});

export const evidenceRelationshipSchema = z.object({
  id: z.string(),
  claimId: z.string(),
  sourceId: z.string(),
  relationship: z.enum([
    "direct_support",
    "corroboration",
    "context",
    "qualification",
    "contradiction",
    "negative_search_result"
  ]),
  locator: z.string().optional(),
  note: z.string(),
  publicCitation: z.boolean(),
  publicNoteOverride: z.string().optional()
});

export const researchRunRecordSchema = z.object({
  id: z.string(),
  subject: z.string(),
  performedAt: z.string(),
  status: z.enum(["complete", "ongoing"]),
  methodSummary: z.string(),
  counts: z.record(z.string(), z.number().int().nonnegative()).optional(),
  findings: z.array(z.string()),
  negativeFindings: z.array(z.string()),
  publicSummary: z.string(),
  privateArtifacts: z.object({
    storedInPublicRepo: z.literal(false),
    status: z.enum(["retained_outside_public_repo", "not_retained"])
  })
});

export const assetRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  assetClass: z.enum(["photograph", "promotional_graphic", "screenshot", "document"]),
  sourceId: z.string(),
  date: z.string().optional(),
  time: z.string().optional(),
  rightsStatus: z.enum(["cleared", "review_required", "protected"]),
  consentStatus: z.enum(["cleared", "review_required", "not_applicable", "protected"]),
  publicationStatus: z.enum(["public", "summary_only", "not_public"]),
  publiclyLinkable: z.boolean(),
  supports: z.array(z.string()),
  doesNotSupport: z.array(z.string()),
  publicNote: z.string()
});

export const correctionRecordSchema = z.object({
  id: z.string(),
  surface: z.string(),
  field: z.string(),
  previousValue: z.string(),
  correctedValue: z.string(),
  reason: z.string(),
  sourceClaimIds: z.array(z.string()),
  status: z.enum(["resolved", "open"]),
  resolvedAt: z.string().optional()
});

export const pageCitationProjectionSchema = z.object({
  id: z.string(),
  surface: surfaceSchema,
  path: z.string(),
  title: z.string(),
  occurrences: z.array(
    z.object({
      occurrenceId: z.string(),
      claimId: z.string(),
      groupId: z.string().optional(),
      treatment: z.enum(["linked", "summary_only"]).optional()
    })
  )
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type ResearchRunRecord = z.infer<typeof researchRunRecordSchema>;
export type AssetRecord = z.infer<typeof assetRecordSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type PageCitationProjection = z.infer<typeof pageCitationProjectionSchema>;
export type CitationSurface = z.infer<typeof surfaceSchema>;
