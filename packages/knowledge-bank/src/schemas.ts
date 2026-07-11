import { z } from "zod";

const stableIdSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/, "Use stable dot/kebab-case IDs");

const publicUrlSchema = z
  .url()
  .refine((value) => !/^(?:file:)|localhost|127\.0\.0\.1/i.test(value), {
    message: "Use public web URLs only"
  });

export const sourceKindSchema = z.enum([
  "official-organizational-social",
  "independent-journalism",
  "primary-project",
  "participant-archive",
  "web-archive",
  "research-reconstruction"
]);

export const sourceAccessSchema = z.enum([
  "public",
  "public-with-caveat",
  "private",
  "unavailable"
]);

export const sourceMediaSchema = z.enum([
  "web-page",
  "social-post",
  "image",
  "pdf",
  "repository",
  "photograph",
  "research-note"
]);

export const claimStatusSchema = z.enum(["approved", "provisional", "private", "rejected"]);

export const supportLevelSchema = z.enum([
  "direct",
  "corroborated",
  "reconstructed",
  "contextual",
  "unresolved"
]);

export const evidenceRelationSchema = z.enum([
  "supports",
  "corroborates",
  "contextualizes",
  "limits",
  "does-not-support"
]);

export const sourceRecordSchema = z
  .object({
    id: stableIdSchema,
    title: z.string().min(1),
    shortLabel: z.string().min(1),
    authorOrAccount: z.string().min(1).optional(),
    publisher: z.string().min(1).optional(),
    datePublished: z.iso.date().optional(),
    kind: sourceKindSchema,
    media: sourceMediaSchema,
    access: sourceAccessSchema,
    publicLinkable: z.boolean(),
    url: publicUrlSchema.optional(),
    archiveUrl: publicUrlSchema.optional(),
    originalUrl: publicUrlSchema.optional(),
    linkStatus: z.enum(["live", "archived", "unchecked", "unavailable"]),
    accessedAt: z.iso.date(),
    lastVerifiedAt: z.iso.date().optional(),
    rightsNote: z.string().min(1).optional(),
    publicNote: z.string().min(1),
    internalNote: z.string().min(1).optional()
  })
  .superRefine((source, context) => {
    if (source.publicLinkable && !source.url && !source.archiveUrl) {
      context.addIssue({
        code: "custom",
        message: "publicLinkable sources need a public url or archiveUrl"
      });
    }

    if (source.access === "private" && (source.url || source.archiveUrl || source.originalUrl)) {
      context.addIssue({
        code: "custom",
        message: "private sources cannot expose public URLs"
      });
    }
  });

export const claimEvidenceSchema = z.object({
  sourceId: stableIdSchema,
  relation: evidenceRelationSchema,
  locator: z.string().min(1).optional(),
  supports: z.string().min(1),
  doesNotSupport: z.string().min(1).optional()
});

export const claimRecordSchema = z.object({
  id: stableIdSchema,
  projectId: stableIdSchema,
  publicText: z.string().min(1),
  status: claimStatusSchema,
  supportLevel: supportLevelSchema,
  mustCite: z.boolean(),
  publicSurfaces: z.array(stableIdSchema),
  evidence: z.array(claimEvidenceSchema).min(1),
  guardrail: z.string().min(1),
  antiClaims: z.array(z.string().min(1)).default([]),
  reviewedBy: z.array(z.string().min(1)).default(["Jamie"]),
  reviewedAt: z.iso.date()
});

export const citationRecordSchema = z.object({
  id: stableIdSchema,
  shortLabel: z.string().min(1),
  claimIds: z.array(stableIdSchema).min(1),
  sourceIds: z.array(stableIdSchema).min(1),
  publicNote: z.string().min(1),
  publicCaveat: z.string().min(1).optional()
});

export const researchRunSchema = z.object({
  id: stableIdSchema,
  topic: z.string().min(1),
  conductedAt: z.iso.date(),
  conductedBy: z.string().min(1),
  sourcesConsulted: z.array(stableIdSchema).min(1),
  findings: z.array(z.string().min(1)).min(1),
  negativeFindings: z.array(z.string().min(1)),
  publicSummary: z.string().min(1),
  publicUseBoundary: z.string().min(1)
});

export const pageCitationPlanSchema = z.object({
  pageId: stableIdSchema,
  path: z.string().startsWith("/"),
  citationIds: z.array(stableIdSchema).min(1)
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimEvidence = z.infer<typeof claimEvidenceSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type CitationRecord = z.infer<typeof citationRecordSchema>;
export type ResearchRun = z.infer<typeof researchRunSchema>;
export type PageCitationPlan = z.infer<typeof pageCitationPlanSchema>;
