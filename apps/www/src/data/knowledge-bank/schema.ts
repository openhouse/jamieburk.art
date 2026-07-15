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

export const intakeItemSchema = z.object({
  id: stableIdSchema,
  kind: z.enum([
    "public-url",
    "recollection",
    "artifact-lead",
    "photo-lead",
    "collaborator-note",
    "claim-lead",
    "research-question"
  ]),
  capturedAt: z.iso.date(),
  capturedFrom: z.string().min(1),
  publicSafeSummary: z.string().min(1),
  projects: z.array(stableIdSchema).min(1),
  status: z.enum(["captured", "triaged", "decomposed", "integrated", "held"]),
  disposition: z.enum([
    "source-created",
    "claim-created",
    "research-queued",
    "media-review",
    "duplicate",
    "no-action"
  ]),
  sourceIds: z.array(stableIdSchema).default([]),
  claimIds: z.array(stableIdSchema).default([]),
  researchTaskIds: z.array(stableIdSchema).default([]),
  notes: z.array(z.string().min(1)).default([]),
  reviewedAt: z.iso.date(),
  reviewedBy: z.array(z.string().min(1)).min(1)
}).superRefine((item, context) => {
  const linked =
    item.sourceIds.length + item.claimIds.length + item.researchTaskIds.length;
  if (["decomposed", "integrated"].includes(item.status) && linked === 0) {
    context.addIssue({
      code: "custom",
      message: "Decomposed and integrated intake items require a linked disposition"
    });
  }
  if (item.status === "held" && item.notes.length === 0) {
    context.addIssue({ code: "custom", message: "Held intake items require a reason" });
  }
});

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

export const sourceAssertionSchema = z.object({
  id: stableIdSchema,
  sourceId: stableIdSchema,
  project: stableIdSchema,
  assertion: z.string().min(1),
  relationship: z.enum([
    "supports",
    "corroborates",
    "contextualizes",
    "bounds",
    "contradicts",
    "raises-question"
  ]),
  confidence: z.enum(["high", "moderate", "limited"]),
  candidateClaimIds: z.array(stableIdSchema).default([]),
  publicSafe: z.boolean(),
  reviewedAt: z.iso.date(),
  reviewedBy: z.array(z.string().min(1)).min(1)
});

export const claimProjectionSchema = z.object({
  key: z.enum([
    "case-study",
    "case-study-evidence",
    "work-card",
    "resume-html",
    "technical-operations",
    "homepage",
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
  maturity: z.enum([
    "research-needed",
    "partially-supported",
    "confirmed",
    "confirmed-with-boundary",
    "disallowed"
  ]),
  projectionEligibility: z.enum(["eligible", "hold", "disallowed"]),
  collectiveWork: z.boolean(),
  projections: z.array(claimProjectionSchema).superRefine((projections, context) => {
    const keys = new Set<string>();
    projections.forEach((projection, index) => {
      if (keys.has(projection.key)) {
        context.addIssue({
          code: "custom",
          message: `Projection key ${projection.key} must be unique within a claim`,
          path: [index, "key"]
        });
      }
      keys.add(projection.key);
    });
  }),
  evidence: z.array(evidenceRelationshipSchema),
  boundaries: z.array(z.string().trim().min(1)).default([]),
  antiClaims: z.array(z.string().trim().min(1)).default([]),
  researchInquiryIds: z.array(stableIdSchema).default([]),
  reviewedAt: z.iso.date(),
  reviewedBy: z.array(z.string().min(1)).default([])
});

export const researchTaskSchema = z.object({
  id: stableIdSchema,
  project: stableIdSchema,
  question: z.string().min(1),
  priority: z.enum(["high", "medium", "low"]),
  status: z.enum(["queued", "in-progress", "blocked", "completed"]),
  methodsPlanned: z.array(z.string().min(1)).min(1),
  successCriteria: z.array(z.string().min(1)).min(1),
  sourceIds: z.array(stableIdSchema).default([]),
  claimIds: z.array(stableIdSchema).default([]),
  publicSummary: z.string().min(1),
  reviewedAt: z.iso.date()
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

export const knowledgeBankSchema = z.object({
  intake: z.array(intakeItemSchema),
  sources: z.array(sourceRecordSchema),
  sourceAssertions: z.array(sourceAssertionSchema),
  claims: z.array(claimRecordSchema),
  researchTasks: z.array(researchTaskSchema),
  researchInquiries: z.array(researchInquirySchema),
  corrections: z.array(correctionRecordSchema),
  pages: z.array(citationPageSchema)
});

export type IntakeItem = z.infer<typeof intakeItemSchema>;
export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type SourceAssertion = z.infer<typeof sourceAssertionSchema>;
export type ClaimProjection = z.infer<typeof claimProjectionSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type ResearchTask = z.infer<typeof researchTaskSchema>;
export type ResearchInquiry = z.infer<typeof researchInquirySchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
export type KnowledgeBank = z.infer<typeof knowledgeBankSchema>;
