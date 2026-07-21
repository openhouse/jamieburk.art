import { z } from "zod";

const stableIdSchema = z
  .string()
  .min(1)
  .regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, "Use a stable hyphenated ID");

const publicUrlSchema = z
  .url()
  .refine((value) => /^https?:\/\//.test(value), "Use an HTTP(S) public URL");

export const knowledgeStatusSchema = z.enum([
  "confirmed",
  "confirmed-with-boundary",
  "use-with-care",
  "inference",
  "not-recovered",
  "disallowed"
]);

export const publicationStatusSchema = z.enum([
  "public",
  "qualified",
  "internal-only",
  "protected"
]);

export const editorialStatusSchema = z.enum([
  "unused",
  "candidate",
  "active",
  "retired",
  "superseded"
]);

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

export const intakeItemSchema = z
  .object({
    id: stableIdSchema,
    kind: z.enum([
      "url",
      "memory",
      "metric",
      "artifact",
      "photograph",
      "lead",
      "correction"
    ]),
    capturedAt: z.iso.date(),
    submittedBy: z.string().min(1),
    publicSafeDescription: z.string().min(1),
    submittedUrl: publicUrlSchema.optional(),
    projectIds: z.array(stableIdSchema).min(1),
    entityIds: z.array(stableIdSchema).default([]),
    dateHints: z.array(z.string().min(1)).default([]),
    sensitivity: z.enum(["public-safe", "private-reference", "protected-reference"]),
    availability: z.enum(["live", "dead", "archived", "local-private", "unknown"]),
    status: z.enum(["captured", "triaged", "promoted", "deferred", "closed"]),
    sourceIds: z.array(stableIdSchema).default([]),
    claimIds: z.array(stableIdSchema).default([]),
    inquiryIds: z.array(stableIdSchema).default([]),
    protectedLocatorId: stableIdSchema.optional(),
    dispositionReason: z.string().min(1).optional()
  })
  .superRefine((item, context) => {
    if (
      item.status === "promoted" &&
      item.sourceIds.length + item.claimIds.length + item.inquiryIds.length === 0
    ) {
      context.addIssue({
        code: "custom",
        message: "Promoted intake must point to a source, claim, or inquiry"
      });
    }

    if (["deferred", "closed"].includes(item.status) && !item.dispositionReason) {
      context.addIssue({
        code: "custom",
        message: `${item.status} intake requires a disposition reason`
      });
    }

    if (item.sensitivity !== "public-safe" && !item.protectedLocatorId) {
      context.addIssue({
        code: "custom",
        message: "Non-public intake requires an opaque protected locator"
      });
    }
  });

export const entityRecordSchema = z.object({
  id: stableIdSchema,
  kind: z.enum([
    "person",
    "organization",
    "campaign",
    "law",
    "public-office",
    "event",
    "place",
    "publication",
    "venue"
  ]),
  name: z.string().min(1),
  aliases: z.array(z.string().min(1)).default([]),
  publicDescription: z.string().min(1)
});

export const projectRecordSchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  status: z.enum(["historical", "active", "ongoing", "research"]),
  period: z.object({
    start: z.string().min(1).optional(),
    end: z.string().min(1).optional()
  }),
  entityIds: z.array(stableIdSchema).default([]),
  publicSurfaceCandidates: z.array(z.string().min(1)).default([]),
  photoResearchPrompts: z.array(z.string().min(1)).default([])
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
    locator: z.string().min(1).optional(),
    projectIds: z.array(stableIdSchema).min(1),
    intakeIds: z.array(stableIdSchema).default([]),
    reviewStatus: z.enum(["candidate", "reviewed", "blocked"]),
    reviewDepth: z.enum(["metadata", "close-reading"]).optional(),
    reviewedAt: z.iso.date().optional(),
    reviewedBy: z.array(z.string().min(1)).default([]),
    legacyImportedAt: z.iso.date().optional(),
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

    if (!source.intakeIds.length && !source.legacyImportedAt) {
      context.addIssue({
        code: "custom",
        message: "Source must point to intake or declare a legacy import date"
      });
    }

    if (source.reviewStatus === "reviewed" && (!source.reviewedAt || !source.reviewedBy.length)) {
      context.addIssue({
        code: "custom",
        message: "Reviewed source requires date and reviewer"
      });
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
  claimType: z.enum([
    "role",
    "activity",
    "outcome",
    "metric",
    "chronology",
    "attributed-description",
    "negative-research-finding"
  ]),
  internalClaim: z.string().min(1),
  status: knowledgeStatusSchema,
  publicationStatus: publicationStatusSchema,
  editorialStatus: editorialStatusSchema,
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
  intakeIds: z.array(stableIdSchema).default([]),
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

export const pressPlacementSchema = z.object({
  position: z.number().int().positive(),
  sourceId: stableIdSchema,
  listedPublisher: z.string().min(1),
  listedTitle: z.string().min(1),
  listedUrl: publicUrlSchema
});

export const pressCollectionSchema = z.object({
  id: stableIdSchema,
  project: stableIdSchema,
  campaignEntityId: stableIdSchema,
  title: z.string().min(1),
  indexSourceId: stableIdSchema,
  capturedAt: z.iso.date(),
  captureKind: z.enum(["live", "archived"]),
  captureDigest: z.string().regex(/^sha256:[a-f0-9]{64}$/),
  expectedArticleCount: z.number().int().positive(),
  articles: z.array(pressPlacementSchema).min(1)
});

export const knowledgeBankSchema = z.object({
  intakeItems: z.array(intakeItemSchema),
  entities: z.array(entityRecordSchema),
  projects: z.array(projectRecordSchema),
  sources: z.array(sourceRecordSchema),
  claims: z.array(claimRecordSchema),
  researchInquiries: z.array(researchInquirySchema),
  corrections: z.array(correctionRecordSchema),
  pages: z.array(citationPageSchema),
  pressCollections: z.array(pressCollectionSchema).default([])
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type IntakeItem = z.infer<typeof intakeItemSchema>;
export type EntityRecord = z.infer<typeof entityRecordSchema>;
export type ProjectRecord = z.infer<typeof projectRecordSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type ClaimProjection = z.infer<typeof claimProjectionSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type ResearchInquiry = z.infer<typeof researchInquirySchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
export type PressCollection = z.infer<typeof pressCollectionSchema>;
export type KnowledgeBank = z.infer<typeof knowledgeBankSchema>;
