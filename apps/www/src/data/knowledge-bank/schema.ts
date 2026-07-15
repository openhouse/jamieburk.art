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

export const intakePropositionSchema = z
  .object({
    id: stableIdSchema,
    text: z.string().min(1),
    status: z.enum([
      "direct-support",
      "supported-with-boundary",
      "synthesis-with-boundary",
      "context-only",
      "memory-lead",
      "research-only"
    ]),
    sourceIds: z.array(stableIdSchema).default([]),
    sourceSupport: z.array(z.string().min(1)).default([]),
    boundaries: z.array(z.string().min(1)).min(1),
    decisionUse: z.string().min(1),
    nextStep: z.string().min(1).optional()
  })
  .superRefine((proposition, context) => {
    if (
      [
        "direct-support",
        "supported-with-boundary",
        "synthesis-with-boundary",
        "context-only"
      ].includes(proposition.status) &&
      !proposition.sourceIds.length
    ) {
      context.addIssue({
        code: "custom",
        message: `${proposition.status} propositions require a source`
      });
    }
    if (
      ["memory-lead", "research-only", "context-only"].includes(
        proposition.status
      ) &&
      !proposition.nextStep
    ) {
      context.addIssue({
        code: "custom",
        message: `${proposition.status} propositions require a next step`
      });
    }
  });

export const intakeCorrectionTriggerSchema = z
  .object({
    id: stableIdSchema,
    targetProofId: stableIdSchema,
    condition: z.string().min(1),
    action: z.enum(["confirm", "narrow", "hold", "replace", "retire"]),
    requiredEvidence: z.array(z.string().min(1)).min(1),
    reason: z.string().min(1),
    replacementGuidance: z.string().min(1).optional()
  })
  .superRefine((trigger, context) => {
    if (trigger.action !== "confirm" && !trigger.replacementGuidance) {
      context.addIssue({
        code: "custom",
        message: `${trigger.action} triggers require replacement guidance`
      });
    }
  });

export const intakeTensionSchema = z
  .object({
    id: stableIdSchema,
    propositionIds: z.array(stableIdSchema).min(1),
    relatedProofIds: z.array(stableIdSchema).min(1),
    description: z.string().min(1),
    currentPosition: z.string().min(1),
    status: z.enum(["open", "reconciled"]),
    correctionTriggers: z.array(intakeCorrectionTriggerSchema).min(2)
  })
  .superRefine((tension, context) => {
    if (!tension.correctionTriggers.some((trigger) => trigger.action === "confirm")) {
      context.addIssue({
        code: "custom",
        message: "Tensions require a confirmation trigger"
      });
    }
    if (
      !tension.correctionTriggers.some((trigger) =>
        ["narrow", "hold", "replace", "retire"].includes(trigger.action)
      )
    ) {
      context.addIssue({
        code: "custom",
        message: "Tensions require a corrective trigger"
      });
    }
  });

export const intakeItemSchema = z
  .object({
    id: stableIdSchema,
    title: z.string().min(1),
    project: stableIdSchema.optional(),
    kind: z.enum([
      "memory-fragment",
      "source-link",
      "metric-lead",
      "project-lead",
      "claim-candidate"
    ]),
    summary: z.string().min(1),
    status: z.enum([
      "captured",
      "source-associated",
      "researching",
      "claim-candidate",
      "integrated",
      "held"
    ]),
    sourceIds: z.array(stableIdSchema).default([]),
    relatedClaimIds: z.array(stableIdSchema).default([]),
    relatedProofIds: z.array(stableIdSchema).default([]),
    candidateClaims: z.array(z.string().min(1)).default([]),
    propositions: z.array(intakePropositionSchema).default([]),
    tensions: z.array(intakeTensionSchema).default([]),
    researchQuestions: z.array(z.string().min(1)).default([]),
    boundaries: z.array(z.string().min(1)).min(1),
    projectionStatus: z.literal("no-public-projection"),
    receivedAt: z.iso.date(),
    reviewedAt: z.iso.date(),
    reviewedBy: z.array(z.string().min(1)).default([])
  })
  .superRefine((item, context) => {
    if (item.status === "source-associated" && !item.sourceIds.length) {
      context.addIssue({
        code: "custom",
        message: "Source-associated intake requires at least one source"
      });
    }
    if (item.status === "claim-candidate" && !item.candidateClaims.length) {
      context.addIssue({
        code: "custom",
        message: "Claim-candidate intake requires candidate claim language"
      });
    }
    const candidatePropositionTexts = new Set(
      item.propositions
        .filter((proposition) =>
          [
            "direct-support",
            "supported-with-boundary",
            "synthesis-with-boundary"
          ].includes(proposition.status)
        )
        .map((proposition) => proposition.text)
    );
    for (const claim of item.candidateClaims) {
      if (!candidatePropositionTexts.has(claim)) {
        context.addIssue({
          code: "custom",
          message: "Candidate claims must resolve to a supported proposition"
        });
      }
    }
    if (item.status === "integrated" && !item.relatedClaimIds.length) {
      context.addIssue({
        code: "custom",
        message: "Integrated intake requires at least one related claim"
      });
    }
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
  sources: z.array(sourceRecordSchema),
  claims: z.array(claimRecordSchema),
  researchInquiries: z.array(researchInquirySchema),
  corrections: z.array(correctionRecordSchema),
  intakeItems: z.array(intakeItemSchema),
  pages: z.array(citationPageSchema)
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type EvidenceRelationship = z.infer<typeof evidenceRelationshipSchema>;
export type ClaimProjection = z.infer<typeof claimProjectionSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type ResearchInquiry = z.infer<typeof researchInquirySchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type IntakeProposition = z.infer<typeof intakePropositionSchema>;
export type IntakeCorrectionTrigger = z.infer<typeof intakeCorrectionTriggerSchema>;
export type IntakeTension = z.infer<typeof intakeTensionSchema>;
export type IntakeItem = z.infer<typeof intakeItemSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type CitationPage = z.infer<typeof citationPageSchema>;
export type KnowledgeBank = z.infer<typeof knowledgeBankSchema>;
