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

export const intakeKindSchema = z.enum([
  "public-url",
  "public-artifact",
  "analysis-note",
  "memory-lead",
  "photo-lead",
  "collaborator-note"
]);

export const intakeDispositionSchema = z.enum([
  "captured",
  "triaged",
  "researching",
  "integrated",
  "deferred",
  "duplicate",
  "protected"
]);

export const intakeItemSchema = z.object({
  id: stableIdSchema,
  kind: intakeKindSchema,
  title: z.string().min(1),
  submittedAt: z.iso.date(),
  submittedBy: z.string().min(1),
  projectIds: z.array(stableIdSchema).min(1),
  reason: z.string().min(1),
  sourceUrl: publicUrlSchema.optional(),
  visibility: z.enum(["public-safe", "protected"]),
  disposition: intakeDispositionSchema,
  duplicateOfIntakeId: stableIdSchema.optional(),
  sourceIds: z.array(stableIdSchema).default([]),
  observationIds: z.array(stableIdSchema).default([]),
  researchInquiryIds: z.array(stableIdSchema).default([]),
  boundaries: z.array(z.string().min(1)).default([])
}).superRefine((item, context) => {
  if (item.disposition === "duplicate" && !item.duplicateOfIntakeId) {
    context.addIssue({
      code: "custom",
      path: ["duplicateOfIntakeId"],
      message: "Duplicate intake items must identify the retained intake"
    });
  }
  if (item.disposition !== "duplicate" && item.duplicateOfIntakeId) {
    context.addIssue({
      code: "custom",
      path: ["duplicateOfIntakeId"],
      message: "Only duplicate intake items may identify a retained intake"
    });
  }
});

export const observationSchema = z.object({
  id: stableIdSchema,
  intakeId: stableIdSchema,
  sourceId: stableIdSchema.optional(),
  comparisonSourceIds: z.array(stableIdSchema).default([]),
  project: stableIdSchema,
  kind: z.enum([
    "source-fact",
    "bounded-inference",
    "context",
    "limitation",
    "research-lead",
    "participant-memory",
    "visual-observation"
  ]),
  text: z.string().min(1),
  locator: z.string().min(1).optional(),
  status: z.enum([
    "captured",
    "extracted",
    "corroborated",
    "verified",
    "contested",
    "superseded"
  ]),
  publicSafe: z.boolean(),
  claimIds: z.array(stableIdSchema).default([]),
  researchInquiryIds: z.array(stableIdSchema).default([]),
  limitations: z.array(z.string().min(1)).default([])
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

export const knowledgeEntitySchema = z.object({
  id: stableIdSchema,
  name: z.string().min(1),
  kind: z.enum([
    "person",
    "collective",
    "project",
    "system",
    "campaign",
    "program",
    "event",
    "public-body",
    "public-institution",
    "organization",
    "law",
    "policy"
  ]),
  aliases: z.array(z.string().min(1)).default([]),
  publicSafe: z.boolean()
});

export const agencyRelationSchema = z.object({
  id: stableIdSchema,
  project: stableIdSchema,
  actorIds: z.array(stableIdSchema).min(1),
  action: z.enum([
    "originated",
    "spearheaded",
    "initiated",
    "co-governed",
    "co-created",
    "co-led",
    "founding-member-of",
    "implemented-and-maintained",
    "organized",
    "advocated-for",
    "testified-for",
    "spoke-at",
    "co-hosted",
    "convened",
    "recommended-for-funding",
    "accepted-recommendation",
    "appropriated",
    "withdrew-from",
    "reclaimed-unused-appropriation",
    "cited-as-public-process-outcome",
    "chaired-hearing-for",
    "enacted"
  ]),
  objectId: stableIdSchema,
  purpose: z.string().min(1),
  result: z.string().min(1),
  creditScope: z.enum(["individual", "shared", "collective", "institutional"]),
  status: z.enum(["confirmed", "confirmed-with-boundary", "use-with-care"]),
  claimIds: z.array(stableIdSchema).min(1),
  sourceIds: z.array(stableIdSchema).min(1),
  sourceSupportKeys: z.array(z.string().min(1)).default([]),
  boundaries: z.array(z.string().min(1)).min(1),
  reviewedAt: z.iso.date(),
  reviewedBy: z.array(z.string().min(1)).min(1)
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

export const proofCoverageTargetSchema = z.object({
  proofId: stableIdSchema,
  status: z.enum([
    "source-backed",
    "partially-source-backed",
    "resume-backed",
    "protected-support",
    "research-needed"
  ]),
  sourceIds: z.array(stableIdSchema).default([]),
  researchInquiryIds: z.array(stableIdSchema).default([]),
  nextAction: z.string().min(1),
  reviewedAt: z.iso.date()
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
  intakeItems: z.array(intakeItemSchema),
  observations: z.array(observationSchema),
  sources: z.array(sourceRecordSchema),
  claims: z.array(claimRecordSchema),
  entities: z.array(knowledgeEntitySchema),
  agencyRelations: z.array(agencyRelationSchema),
  researchInquiries: z.array(researchInquirySchema),
  proofCoverageTargets: z.array(proofCoverageTargetSchema),
  corrections: z.array(correctionRecordSchema),
  pages: z.array(citationPageSchema)
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type IntakeItem = z.infer<typeof intakeItemSchema>;
export type KnowledgeObservation = z.infer<typeof observationSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type ClaimProjection = z.infer<typeof claimProjectionSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type KnowledgeEntity = z.infer<typeof knowledgeEntitySchema>;
export type AgencyRelation = z.infer<typeof agencyRelationSchema>;
export type ResearchInquiry = z.infer<typeof researchInquirySchema>;
export type ProofCoverageTarget = z.infer<typeof proofCoverageTargetSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
export type KnowledgeBank = z.infer<typeof knowledgeBankSchema>;
