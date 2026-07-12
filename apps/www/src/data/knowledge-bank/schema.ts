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
    "photo-brief",
    "archive-note"
  ]),
  text: z.string().min(1),
  status: z.enum(["active", "hold", "deprecated", "disallowed"]),
  citationRequired: z.boolean(),
  surfaces: z.array(z.string().min(1)),
  rationale: z.string().min(1).optional()
}).superRefine((projection, context) => {
  if (projection.status === "hold" && !projection.rationale) {
    context.addIssue({ code: "custom", message: "Held projection requires a rationale" });
  }
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
    "open",
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

export const intakeRecordSchema = z
  .object({
    id: stableIdSchema,
    receivedAt: z.iso.date(),
    kind: z.enum([
      "public-url",
      "public-artifact",
      "public-safe-memory",
      "claim-hypothesis",
      "photo-lead",
      "reader-feedback",
      "correction"
    ]),
    visibility: z.enum(["public-safe", "protected-summary"]),
    title: z.string().min(1),
    description: z.string().min(1),
    whyItMatters: z.string().min(1),
    projectIds: z.array(stableIdSchema).min(1),
    status: z.enum([
      "captured",
      "triaged",
      "researching",
      "matured",
      "deferred",
      "rejected"
    ]),
    disposition: z.enum([
      "source-recorded",
      "inquiry-opened",
      "claim-created",
      "correction-created",
      "governance-updated",
      "deferred-with-reason",
      "rejected-with-reason"
    ]),
    dispositionNote: z.string().min(1),
    sourceIds: z.array(stableIdSchema).default([]),
    claimIds: z.array(stableIdSchema).default([]),
    inquiryIds: z.array(stableIdSchema).default([]),
    correctionIds: z.array(stableIdSchema).default([]),
    relatedIntakeIds: z.array(stableIdSchema).default([]),
    artifactPaths: z.array(z.string().min(1).regex(/^(?!\/)(?!.*\.\.).+$/)).default([]),
    boundaries: z.array(z.string().min(1)).default([])
  })
  .superRefine((record, context) => {
    const links = [
      ...record.sourceIds,
      ...record.claimIds,
      ...record.inquiryIds,
      ...record.correctionIds,
      ...record.artifactPaths
    ];
    if (!links.length && !["deferred", "rejected"].includes(record.status)) {
      context.addIssue({
        code: "custom",
        message: "Active intake requires a source, claim, inquiry, or correction link"
      });
    }
    if (record.status === "matured" && !record.claimIds.length) {
      context.addIssue({ code: "custom", message: "Matured intake requires a claim link" });
    }
    if (record.status === "researching" && !record.inquiryIds.length) {
      context.addIssue({ code: "custom", message: "Researching intake requires an inquiry link" });
    }
    if (record.disposition === "source-recorded" && !record.sourceIds.length) {
      context.addIssue({ code: "custom", message: "Source disposition requires a source link" });
    }
    if (record.disposition === "claim-created" && !record.claimIds.length) {
      context.addIssue({ code: "custom", message: "Claim disposition requires a claim link" });
    }
    if (record.disposition === "inquiry-opened" && !record.inquiryIds.length) {
      context.addIssue({ code: "custom", message: "Inquiry disposition requires an inquiry link" });
    }
    if (record.disposition === "governance-updated" && !record.artifactPaths.length) {
      context.addIssue({ code: "custom", message: "Governance disposition requires an artifact path" });
    }
    if (record.kind === "reader-feedback" && record.claimIds.length) {
      context.addIssue({ code: "custom", message: "Reader feedback cannot link directly to an accomplishment claim" });
    }
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
  intake: z.array(intakeRecordSchema),
  sources: z.array(sourceRecordSchema),
  claims: z.array(claimRecordSchema),
  researchInquiries: z.array(researchInquirySchema),
  corrections: z.array(correctionRecordSchema),
  pages: z.array(citationPageSchema)
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type ClaimProjection = z.infer<typeof claimProjectionSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type ResearchInquiry = z.infer<typeof researchInquirySchema>;
export type IntakeRecord = z.infer<typeof intakeRecordSchema>;
export type IntakeRecordInput = z.input<typeof intakeRecordSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
export type KnowledgeBank = z.infer<typeof knowledgeBankSchema>;
export type KnowledgeBankInput = z.input<typeof knowledgeBankSchema>;
