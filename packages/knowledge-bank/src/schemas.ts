import { z } from "zod";

export const stableIdSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/, "Use stable dot/kebab-case IDs");

const publicUrlSchema = z
  .url()
  .refine((value) => !/^(?:file:)|localhost|127\.0\.0\.1/i.test(value), {
    message: "Use public web URLs only"
  });

export const reviewStatusSchema = z.enum([
  "approved-public",
  "approved-summary-only",
  "needs-review",
  "restricted"
]);

export const rightsPermissionStatusSchema = z.enum([
  "public-link-only",
  "approved-for-publication",
  "summary-only",
  "permission-required",
  "restricted"
]);

export const publicCitationStatusSchema = z.enum([
  "link",
  "describe-without-link",
  "do-not-project"
]);

export const sourceRecordSchema = z
  .object({
    id: stableIdSchema,
    type: z.enum([
      "web-page",
      "archived-web-page",
      "social-post",
      "press-article",
      "document",
      "dataset",
      "code-repository",
      "image",
      "other"
    ]),
    creator: z.string().min(1),
    title: z.string().min(1),
    publishedAt: z.iso.date().optional(),
    capturedAt: z.iso.date().optional(),
    url: publicUrlSchema.optional(),
    archiveUrl: publicUrlSchema.optional(),
    visibility: z.enum(["public", "public-archived", "private-primary-evidence", "restricted"]),
    publicLinkable: z.boolean(),
    publicDescription: z.string().min(1),
    authority: z.object({
      class: z.enum(["primary", "secondary"]),
      relationship: z.string().min(1)
    }),
    rights: z
      .object({
        holder: z.string().min(1).optional(),
        permissionStatus: rightsPermissionStatusSchema,
        publicCitationStatus: publicCitationStatusSchema
      })
      .optional(),
    reviewedBy: z.array(z.string().min(1)).default([]),
    reviewedAt: z.iso.date().optional(),
    reviewedBasis: z.string().min(1).optional(),
    reviewStatus: reviewStatusSchema,
    notes: z.string().min(1).optional()
  })
  .superRefine((source, context) => {
    if (source.publicLinkable && !source.url && !source.archiveUrl) {
      context.addIssue({
        code: "custom",
        message: "publicLinkable sources need a public URL or archiveUrl"
      });
    }

    if (
      source.visibility === "private-primary-evidence" &&
      (source.url || source.archiveUrl || source.publicLinkable)
    ) {
      context.addIssue({
        code: "custom",
        message: "private primary evidence cannot expose URLs or public links"
      });
    }
  });

export const artifactRecordSchema = z
  .object({
    id: stableIdSchema,
    sourceId: stableIdSchema.optional(),
    type: z.enum(["photograph", "screenshot", "graphic", "document", "other"]),
    publicDescription: z.string().min(1),
    credit: z.string().min(1).optional(),
    rights: z.object({
      holder: z.string().min(1).optional(),
      permissionStatus: z.enum([
        "approved-for-publication",
        "summary-only",
        "permission-required",
        "restricted"
      ])
    }),
    consent: z
      .object({
        status: z.enum([
          "not-applicable",
          "approved",
          "unknown",
          "permission-required",
          "restricted"
        ]),
        notes: z.string().min(1).optional()
      })
      .optional(),
    publicAssetUrl: publicUrlSchema.optional(),
    publicLinkable: z.boolean(),
    allowedPages: z.array(stableIdSchema).optional(),
    prohibitedPages: z.array(stableIdSchema).optional(),
    supports: z.array(stableIdSchema).optional(),
    doesNotSupport: z.array(z.string().min(1)).optional(),
    reviewedBy: z.array(z.string().min(1)).default([]),
    reviewedAt: z.iso.date().optional(),
    reviewedBasis: z.string().min(1).optional()
  })
  .superRefine((artifact, context) => {
    if (
      artifact.rights.permissionStatus !== "approved-for-publication" &&
      artifact.publicAssetUrl
    ) {
      context.addIssue({
        code: "custom",
        message: "summary-only or restricted artifacts cannot expose public assets"
      });
    }

    if (!artifact.publicLinkable && artifact.publicAssetUrl) {
      context.addIssue({
        code: "custom",
        message: "non-linkable artifacts cannot expose publicAssetUrl"
      });
    }
  });

export const claimRecordSchema = z.object({
  id: stableIdSchema,
  subject: z.string().min(1),
  approvedPublicText: z.string().min(1),
  status: z.enum([
    "confirmed",
    "corroborated",
    "participant-archive-supported",
    "strong-inference",
    "not-recovered",
    "superseded",
    "retired"
  ]),
  confidence: z.enum(["high", "medium", "low"]),
  risk: z.enum(["high", "medium", "low"]),
  citationRequired: z.boolean(),
  allowedPages: z.array(stableIdSchema).optional(),
  prohibitedPages: z.array(stableIdSchema).optional(),
  guardrails: z.array(z.string().min(1)).optional(),
  antiClaims: z.array(z.string().min(1)).optional(),
  evidenceEdgeIds: z.array(stableIdSchema).min(1),
  correctionIds: z.array(stableIdSchema).optional(),
  reviewedBy: z.array(z.string().min(1)).default([]),
  reviewedAt: z.iso.date().optional(),
  reviewedBasis: z.string().min(1).optional(),
  reviewStatus: z.enum(["approved-public", "needs-review", "restricted"])
});

export const evidenceEdgeSchema = z.object({
  id: stableIdSchema,
  claimId: stableIdSchema,
  target: z.union([
    z.object({ kind: z.literal("source"), id: stableIdSchema }),
    z.object({ kind: z.literal("artifact"), id: stableIdSchema }),
    z.object({ kind: z.literal("research-run"), id: stableIdSchema })
  ]),
  relation: z.enum([
    "supports",
    "corroborates",
    "preserves",
    "contextualizes",
    "qualifies",
    "contradicts",
    "does-not-support"
  ]),
  locator: z.string().min(1).optional(),
  publicExplanation: z.string().min(1).optional(),
  internalNote: z.string().min(1).optional()
});

export const citationGroupSchema = z.object({
  id: stableIdSchema,
  claimIds: z.array(stableIdSchema).min(1),
  evidenceEdgeIds: z.array(stableIdSchema).min(1),
  shortLabel: z.string().min(1),
  publicNote: z.string().min(1),
  publicCaveat: z.string().min(1).optional()
});

export const researchRunSchema = z.object({
  id: stableIdSchema,
  type: z.string().min(1),
  visibility: z.literal("private"),
  publicSummary: z.string().min(1),
  scope: z.record(z.string(), z.union([z.string(), z.number()])),
  finding: z.string().min(1),
  limitation: z.string().min(1),
  reviewedBy: z.array(z.string().min(1)).default([]),
  reviewedAt: z.iso.date().optional(),
  reviewedBasis: z.string().min(1).optional()
});

export const correctionRecordSchema = z.object({
  id: stableIdSchema,
  targetClaimId: stableIdSchema,
  correctedAt: z.iso.date(),
  priorPublicText: z.string().min(1),
  revisedPublicText: z.string().min(1),
  reason: z.string().min(1),
  evidenceEdgeIds: z.array(stableIdSchema).min(1),
  status: z.enum(["applied", "pending-review", "rejected"]),
  reviewedBy: z.array(z.string().min(1)).default([])
});

export const citationOccurrenceSchema = z.object({
  occurrenceId: stableIdSchema,
  citationGroupId: stableIdSchema
});

export const pageProjectionSchema = z.object({
  id: stableIdSchema,
  path: z.string().startsWith("/"),
  occurrences: z.array(citationOccurrenceSchema).min(1)
});

export const knowledgeBankSchema = z.object({
  sources: z.array(sourceRecordSchema),
  artifacts: z.array(artifactRecordSchema),
  claims: z.array(claimRecordSchema),
  evidenceEdges: z.array(evidenceEdgeSchema),
  citationGroups: z.array(citationGroupSchema),
  researchRuns: z.array(researchRunSchema),
  corrections: z.array(correctionRecordSchema),
  pageProjections: z.array(pageProjectionSchema)
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ArtifactRecord = z.infer<typeof artifactRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type EvidenceEdge = z.infer<typeof evidenceEdgeSchema>;
export type CitationGroup = z.infer<typeof citationGroupSchema>;
export type ResearchRun = z.infer<typeof researchRunSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationOccurrence = z.infer<typeof citationOccurrenceSchema>;
export type PageProjection = z.infer<typeof pageProjectionSchema>;
export type KnowledgeBank = z.infer<typeof knowledgeBankSchema>;
