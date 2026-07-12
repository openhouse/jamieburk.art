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

export const entityKindSchema = z.enum([
  "project",
  "campaign",
  "program",
  "organization",
  "institution",
  "law",
  "place",
  "person"
]);

export const entityRecordSchema = z.object({
  id: stableIdSchema,
  kind: entityKindSchema,
  label: z.string().min(1),
  publicSafeSummary: z.string().min(1),
  aliases: z.array(z.string().min(1)).default([]),
  projectKey: stableIdSchema.optional(),
  relatedEntityIds: z.array(stableIdSchema).default([]),
  status: z.enum(["active", "historical", "conceptual"])
});

export const intakeRecordSchema = z.object({
  id: stableIdSchema,
  receivedAt: z.iso.date(),
  kind: z.enum([
    "public-url",
    "public-memory",
    "private-archive-pointer",
    "photo-observation",
    "correction",
    "migration"
  ]),
  publicSafeSummary: z.string().min(1),
  submittedBy: z.string().min(1),
  sourceUrl: publicUrlSchema.optional(),
  entityIds: z.array(stableIdSchema).min(1),
  disposition: z.enum([
    "queued",
    "source-created",
    "claim-seed-created",
    "research-open",
    "held"
  ]),
  sourceIds: z.array(stableIdSchema).default([]),
  claimIds: z.array(stableIdSchema).default([]),
  researchTaskIds: z.array(stableIdSchema).default([]),
  rawMaterialPolicy: z.enum(["public-source-only", "protected-outside-repo"])
}).superRefine((record, context) => {
  if (record.kind === "public-url" && !record.sourceUrl) {
    context.addIssue({ code: "custom", message: "Public URL intake requires sourceUrl" });
  }
  if (record.kind === "public-url" && record.rawMaterialPolicy !== "public-source-only") {
    context.addIssue({ code: "custom", message: "Public URL intake must use public-source-only policy" });
  }
  if (record.kind !== "public-url" && record.sourceUrl) {
    context.addIssue({ code: "custom", message: "Only public URL intake may expose sourceUrl" });
  }
});

const atomicPropositionSchema = z.object({
  id: stableIdSchema,
  text: z.string().min(1),
  relationToJamie: z.enum([
    "direct-role",
    "collective-role",
    "project-context",
    "outcome-context",
    "limitation"
  ]),
  supportTags: z.array(stableIdSchema).min(1),
  confidence: z.enum(["high", "moderate", "limited"]),
  locator: z.string().min(1).optional()
});

export const sourceReadingSchema = z.object({
  id: stableIdSchema,
  sourceId: stableIdSchema,
  status: z.enum(["queued", "closely-read", "needs-access", "revisit"]),
  readAt: z.iso.date().optional(),
  propositions: z.array(atomicPropositionSchema).default([]),
  limitations: z.array(z.string().min(1)).default([]),
  researchTaskIds: z.array(stableIdSchema).default([])
}).superRefine((reading, context) => {
  if (reading.status === "closely-read" && (!reading.readAt || !reading.propositions.length || !reading.limitations.length)) {
    context.addIssue({ code: "custom", message: "Close reading requires date, propositions, and limitations" });
  }
  if (reading.status === "needs-access" && reading.propositions.length) {
    context.addIssue({ code: "custom", message: "Needs-access reading cannot assert propositions" });
  }
});

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
    intakeIds: z.array(stableIdSchema).default([]),
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
  propositionIds: z.array(stableIdSchema).default([]),
  locator: z.string().min(1).optional(),
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
    "claim-seed",
    "researching",
    "confirmed",
    "confirmed-with-boundary",
    "use-with-care",
    "inference",
    "not-recovered",
    "disallowed",
    "rejected",
    "superseded"
  ]),
  maturity: z.enum([
    "captured",
    "researching",
    "corroborated",
    "public-ready",
    "projected",
    "rejected",
    "superseded"
  ]),
  intakeIds: z.array(stableIdSchema).default([]),
  requiredSupportTags: z.array(stableIdSchema).default([]),
  composition: z.object({
    action: z.string().min(1),
    intendedEnd: z.string().min(1),
    usableResult: z.string().min(1),
    audience: z.string().min(1),
    collectiveCredit: z.string().min(1),
    causalBoundary: z.string().min(1)
  }).optional(),
  projections: z.array(claimProjectionSchema),
  evidence: z.array(evidenceRelationshipSchema),
  boundaries: z.array(z.string().min(1)).default([]),
  antiClaims: z.array(z.string().min(1)).default([]),
  disposition: z.object({
    reason: z.string().min(1),
    predecessorClaimIds: z.array(stableIdSchema).default([]),
    successorClaimIds: z.array(stableIdSchema).default([]),
    decidedAt: z.iso.date()
  }).optional(),
  researchInquiryIds: z.array(stableIdSchema).default([]),
  reviewedAt: z.iso.date(),
  reviewedBy: z.array(z.string().min(1)).default([])
});

export const researchTaskSchema = z.object({
  id: stableIdSchema,
  project: stableIdSchema,
  question: z.string().min(1),
  status: z.enum(["open", "in-progress", "blocked", "resolved", "closed-no-finding"]),
  priority: z.enum(["critical", "high", "medium", "low"]),
  openedAt: z.iso.date(),
  intakeIds: z.array(stableIdSchema).default([]),
  sourceIds: z.array(stableIdSchema).default([]),
  claimIds: z.array(stableIdSchema).default([]),
  nextActions: z.array(z.string().min(1)).min(1),
  resolutionSummary: z.string().min(1).optional()
});

export const projectionDecisionSchema = z.object({
  id: stableIdSchema,
  claimId: stableIdSchema,
  surface: z.string().min(1),
  decision: z.enum(["publish", "defer", "retire", "disallow"]),
  rationale: z.string().min(1),
  decidedAt: z.iso.date(),
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
  status: z.enum(["active", "superseded"]),
  intakeIds: z.array(stableIdSchema).default([])
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
  entities: z.array(entityRecordSchema),
  intake: z.array(intakeRecordSchema),
  sources: z.array(sourceRecordSchema),
  sourceReadings: z.array(sourceReadingSchema),
  claims: z.array(claimRecordSchema),
  researchTasks: z.array(researchTaskSchema),
  researchInquiries: z.array(researchInquirySchema),
  projectionDecisions: z.array(projectionDecisionSchema),
  corrections: z.array(correctionRecordSchema),
  pages: z.array(citationPageSchema)
});

export type EntityRecord = z.infer<typeof entityRecordSchema>;
export type IntakeRecord = z.infer<typeof intakeRecordSchema>;
export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type SourceReading = z.infer<typeof sourceReadingSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type ClaimProjection = z.infer<typeof claimProjectionSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type ResearchTask = z.infer<typeof researchTaskSchema>;
export type ResearchInquiry = z.infer<typeof researchInquirySchema>;
export type ProjectionDecision = z.infer<typeof projectionDecisionSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
export type KnowledgeBankInput = z.input<typeof knowledgeBankSchema>;
export type KnowledgeBank = z.infer<typeof knowledgeBankSchema>;
