import { z } from "zod";

const stableIdSchema = z
  .string()
  .min(1)
  .regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, "Use a stable hyphenated ID");

const publicUrlSchema = z
  .url()
  .refine((value) => /^https?:\/\//.test(value), "Use an HTTP(S) public URL");

export const sourceVisibilitySchema = z.enum([
  "public",
  "public-metadata-only",
  "private",
  "protected"
]);

export const sourceKindSchema = z.enum([
  "government-record",
  "government-social-post",
  "institutional-web-page",
  "institutional-social-post",
  "archived-web-capture",
  "promotional-graphic",
  "published-article",
  "project-archive",
  "participant-photograph",
  "photo-metadata",
  "research-run"
]);

export const preservationStatusSchema = z.enum([
  "live",
  "archived",
  "live-and-archived",
  "dead",
  "private"
]);

const mediaSchema = z.object({
  mediaKind: z.enum(["photograph", "screenshot", "graphic", "document", "other"]),
  photographer: z.string().min(1).optional(),
  rightsHolder: z.string().min(1).optional(),
  rightsStatus: z.enum([
    "cleared",
    "permission-needed",
    "unknown",
    "do-not-publish"
  ]),
  consentStatus: z.enum([
    "cleared",
    "review-needed",
    "not-applicable",
    "do-not-publish"
  ]),
  publicDisplayStatus: z.enum([
    "cleared",
    "metadata-only",
    "hold",
    "do-not-publish"
  ]),
  visibleText: z.array(z.string().min(1)).optional(),
  captureTimestamp: z.string().min(1).optional(),
  timestampConfidence: z.enum(["high", "moderate", "limited"]).optional()
});

export const sourceRecordSchema = z
  .object({
    id: stableIdSchema,
    title: z.string().min(1),
    organization: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    kind: sourceKindSchema,
    visibility: sourceVisibilitySchema,
    preservationStatus: preservationStatusSchema,
    publishedAt: z.iso.date().optional(),
    capturedAt: z.string().min(1).optional(),
    accessedAt: z.iso.date().optional(),
    canonicalUrl: publicUrlSchema.optional(),
    archiveUrl: publicUrlSchema.optional(),
    assetUrl: publicUrlSchema.optional(),
    preferredPublicUrl: z.enum(["canonical", "archive", "asset"]).optional(),
    publicCitation: z.string().min(1),
    publicNote: z.string().min(1).optional(),
    supportsGenerally: z.array(z.string().min(1)).default([]),
    doesNotEstablish: z.array(z.string().min(1)).default([]),
    protectedLocatorId: stableIdSchema.optional(),
    media: mediaSchema.optional()
  })
  .superRefine((source, context) => {
    const hasPublicUrl = Boolean(
      source.canonicalUrl || source.archiveUrl || source.assetUrl
    );

    if (source.visibility !== "public" && hasPublicUrl) {
      context.addIssue({
        code: "custom",
        message: `${source.visibility} sources cannot expose an underlying URL`
      });
    }

    if (
      source.visibility === "public" &&
      ["archived", "live-and-archived"].includes(source.preservationStatus) &&
      !source.archiveUrl
    ) {
      context.addIssue({ code: "custom", message: "Archived public sources require an archive URL" });
    }

    if (source.preferredPublicUrl === "canonical" && !source.canonicalUrl) {
      context.addIssue({ code: "custom", message: "Preferred canonical URL is missing" });
    }
    if (source.preferredPublicUrl === "archive" && !source.archiveUrl) {
      context.addIssue({ code: "custom", message: "Preferred archive URL is missing" });
    }
    if (source.preferredPublicUrl === "asset" && !source.assetUrl) {
      context.addIssue({ code: "custom", message: "Preferred asset URL is missing" });
    }
  });

export const evidenceRelationshipSchema = z.object({
  sourceId: stableIdSchema,
  relationship: z.enum([
    "direct-support",
    "corroborating",
    "context",
    "supports-boundary",
    "contradicts",
    "private-support"
  ]),
  supports: z.array(z.string().min(1)).min(1),
  locator: z.string().min(1).optional(),
  internalExcerpt: z.string().min(1).optional(),
  publicNote: z.string().min(1).optional(),
  confidence: z.enum(["high", "moderate", "limited"]),
  renderCitation: z.boolean()
});

export const claimProjectionSchema = z.object({
  key: z.enum([
    "case-study",
    "work-card",
    "resume-html",
    "technical-operations",
    "homepage",
    "about",
    "photo-caption",
    "archive-note"
  ]),
  text: z.string().min(1),
  status: z.enum(["active", "hold", "deprecated", "disallowed"]),
  citationRequired: z.boolean(),
  surfaces: z.array(z.string().min(1))
});

export const claimRecordSchema = z.object({
  id: stableIdSchema,
  project: stableIdSchema,
  internalClaim: z.string().min(1),
  status: z.enum([
    "confirmed",
    "confirmed-with-boundary",
    "use-with-care",
    "inference",
    "not-recovered",
    "disallowed"
  ]),
  projections: z.array(claimProjectionSchema),
  evidence: z.array(evidenceRelationshipSchema),
  boundaries: z.array(z.string().min(1)).default([]),
  antiClaims: z.array(z.string().min(1)).default([]),
  researchInquiryIds: z.array(stableIdSchema).default([]),
  reviewedAt: z.iso.date(),
  reviewedBy: z.array(z.string().min(1)).default([])
});

export const researchInquirySchema = z.object({
  id: stableIdSchema,
  project: stableIdSchema,
  question: z.string().min(1),
  methods: z.array(z.string().min(1)).min(1),
  runAt: z.iso.date(),
  resultStatus: z.enum([
    "recovered",
    "partially-recovered",
    "not-recovered",
    "inconclusive"
  ]),
  findings: z.array(z.string().min(1)).min(1),
  limitations: z.array(z.string().min(1)).min(1),
  sourceIds: z.array(stableIdSchema).default([]),
  publicSummary: z.string().min(1).optional(),
  protectedLocatorId: stableIdSchema.optional()
});

export const correctionRecordSchema = z.object({
  id: stableIdSchema,
  claimId: stableIdSchema,
  previousText: z.string().min(1),
  replacementText: z.string().min(1),
  reason: z.string().min(1),
  decidedAt: z.iso.date(),
  affectedSurfaces: z.array(z.string().min(1)).min(1),
  status: z.enum(["active", "superseded"])
});

export const citationOccurrenceSchema = z.object({
  id: stableIdSchema,
  claimId: stableIdSchema,
  projection: claimProjectionSchema.shape.key,
  sourceIds: z.array(stableIdSchema).min(1).optional()
});

export const citationPageSchema = z.object({
  id: stableIdSchema,
  surface: z.string().min(1),
  sourceOrder: z.array(stableIdSchema),
  occurrences: z.array(citationOccurrenceSchema)
});

export const intakeItemSchema = z
  .object({
    id: stableIdSchema,
    receivedAt: z.iso.date(),
    submittedBy: z.string().min(1),
    kind: z.enum(["url", "memory", "claim", "artifact", "repository", "photo-lead"]),
    visibility: z.enum(["public", "public-safe", "protected"]),
    summary: z.string().min(1),
    sourceUrl: publicUrlSchema.optional(),
    projectHints: z.array(stableIdSchema).default([]),
    status: z.enum(["captured", "triaged", "researching", "processed", "deferred"]),
    disposition: z.string().min(1),
    linkedRecordIds: z.array(stableIdSchema).default([]),
    protectedLocatorId: stableIdSchema.optional()
  })
  .superRefine((item, context) => {
    if (item.visibility === "protected" && item.sourceUrl) {
      context.addIssue({ code: "custom", message: "Protected intake cannot expose a source URL" });
    }
  });

const atomicAssertionSchema = z.object({
  id: stableIdSchema,
  statement: z.string().min(1),
  locator: z.string().min(1).optional(),
  confidence: z.enum(["high", "moderate", "limited"]),
  publicSafe: z.boolean()
});

export const sourceReadingSchema = z.object({
  id: stableIdSchema,
  sourceId: stableIdSchema,
  readAt: z.iso.date(),
  reader: z.string().min(1),
  assertions: z.array(atomicAssertionSchema).min(1),
  limitations: z.array(z.string().min(1)).min(1),
  entityIds: z.array(stableIdSchema).default([]),
  themeIds: z.array(stableIdSchema).default([]),
  candidateClaimIds: z.array(stableIdSchema).default([])
});

export const candidateClaimSchema = z.object({
  id: stableIdSchema,
  project: stableIdSchema,
  text: z.string().min(1),
  status: z.enum([
    "captured",
    "research-needed",
    "partially-supported",
    "ready-for-promotion",
    "promoted",
    "hold",
    "contradicted",
    "retired"
  ]),
  sourceIds: z.array(stableIdSchema).default([]),
  researchInquiryIds: z.array(stableIdSchema).default([]),
  supportSummary: z.string().min(1),
  missingEvidence: z.array(z.string().min(1)).default([]),
  boundaries: z.array(z.string().min(1)).default([]),
  promotedClaimId: stableIdSchema.optional(),
  reviewedAt: z.iso.date()
});

export const promotionRecordSchema = z
  .object({
    id: stableIdSchema,
    candidateClaimId: stableIdSchema,
    claimId: stableIdSchema.optional(),
    decision: z.enum(["promoted", "held", "rejected"]),
    reason: z.string().min(1),
    decidedAt: z.iso.date(),
    decidedBy: z.array(z.string().min(1)).min(1)
  })
  .superRefine((promotion, context) => {
    if (promotion.decision === "promoted" && !promotion.claimId) {
      context.addIssue({ code: "custom", message: "Promoted decisions require a claim ID" });
    }
    if (promotion.decision !== "promoted" && promotion.claimId) {
      context.addIssue({ code: "custom", message: "Held or rejected decisions cannot assign a claim ID" });
    }
  });

export const editorialBriefSchema = z.object({
  id: stableIdSchema,
  audience: z.string().min(1),
  goal: z.string().min(1),
  argument: z.string().min(1),
  selectedClaimIds: z.array(stableIdSchema),
  heldCandidateClaimIds: z.array(stableIdSchema),
  rationale: z.array(z.string().min(1)).min(1),
  createdAt: z.iso.date()
});

export const discoveryNoteSchema = z.object({
  id: stableIdSchema,
  kind: z.enum(["photo-editor", "archive-research", "agent-research", "collaborator-note"]),
  summary: z.string().min(1),
  projectHints: z.array(stableIdSchema).default([]),
  sourceIds: z.array(stableIdSchema).default([]),
  candidateClaimIds: z.array(stableIdSchema).min(1),
  rightsReviewRequired: z.boolean(),
  status: z.enum(["captured", "researching", "processed", "hold"]),
  createdAt: z.iso.date()
});

export const knowledgeBankSchema = z.object({
  sources: z.array(sourceRecordSchema),
  claims: z.array(claimRecordSchema),
  researchInquiries: z.array(researchInquirySchema),
  corrections: z.array(correctionRecordSchema),
  pages: z.array(citationPageSchema),
  intakeItems: z.array(intakeItemSchema),
  sourceReadings: z.array(sourceReadingSchema),
  candidateClaims: z.array(candidateClaimSchema),
  promotions: z.array(promotionRecordSchema),
  editorialBriefs: z.array(editorialBriefSchema),
  discoveryNotes: z.array(discoveryNoteSchema)
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type ClaimProjection = z.infer<typeof claimProjectionSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type ResearchInquiry = z.infer<typeof researchInquirySchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
export type IntakeItem = z.infer<typeof intakeItemSchema>;
export type SourceReading = z.infer<typeof sourceReadingSchema>;
export type CandidateClaim = z.infer<typeof candidateClaimSchema>;
export type PromotionRecord = z.infer<typeof promotionRecordSchema>;
export type EditorialBrief = z.infer<typeof editorialBriefSchema>;
export type DiscoveryNote = z.infer<typeof discoveryNoteSchema>;
export type KnowledgeBank = z.infer<typeof knowledgeBankSchema>;
