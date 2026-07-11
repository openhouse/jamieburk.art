import { z } from "zod";

export const sourceKindSchema = z.enum([
  "official-primary",
  "institutional-social-post",
  "archived-web-capture",
  "promotional-graphic",
  "independent-secondary",
  "participant-photograph",
  "image-metadata",
  "public-project",
  "research-log"
]);

export const sourceStatusSchema = z.enum([
  "live",
  "archived",
  "live-and-archived",
  "dead-link",
  "not-publicly-linked",
  "availability-unknown"
]);

export const sourceRecordSchema = z.object({
  id: z.string().min(1),
  kind: sourceKindSchema,
  title: z.string().min(1),
  creator: z.string().optional(),
  publisher: z.string().optional(),
  publishedAt: z.string().optional(),
  accessedAt: z.string().min(1),
  url: z.url().optional(),
  archiveUrls: z.array(z.url()).default([]),
  mediaUrls: z.array(z.url()).default([]),
  locator: z.string().optional(),
  sourceStatus: sourceStatusSchema,
  publicDescription: z.string().min(1),
  evidentiaryScope: z.array(z.string()).min(1),
  doesNotEstablish: z.array(z.string()).default([]),
  notes: z.string().optional()
});

export const knowledgeStatusSchema = z.enum([
  "confirmed",
  "attributed",
  "corroborated",
  "reconstructed",
  "inferred",
  "unresolved",
  "negative-research-finding"
]);

export const publicationStatusSchema = z.enum([
  "ready",
  "ready-with-attribution",
  "qualified",
  "internal-only",
  "protected"
]);

export const evidenceRelationSchema = z.enum([
  "directly-supports",
  "corroborates",
  "contextualizes",
  "qualifies",
  "contradicts",
  "visual-evidence",
  "metadata-evidence",
  "does-not-support"
]);

export const claimEvidenceSchema = z.object({
  sourceId: z.string().min(1),
  relation: evidenceRelationSchema,
  supports: z.array(z.string()).min(1),
  locator: z.string().optional(),
  note: z.string().optional()
});

const proofProjectionSchema = z.object({
  status: z.enum(["ready", "careful", "pending", "private"]),
  supportLevel: z.enum(["strong", "moderate", "careful", "pending"]),
  evidenceClass: z.array(z.string()).min(1),
  shortWording: z.string().optional(),
  detailedPublicWording: z.string().optional(),
  sourceBasis: z.string().min(1),
  sourceNote: z.string().optional(),
  whyItMatters: z.string().optional(),
  protectedBoundaries: z.array(z.string()).min(1),
  relatedProjects: z.array(z.string()),
  relatedCapabilities: z.array(z.string())
});

export const claimRecordSchema = z.object({
  id: z.string().min(1),
  canonicalStatement: z.string().min(1),
  publicProjections: z.object({
    homepage: z.string().optional(),
    workCard: z.string().optional(),
    caseStudy: z.string().optional(),
    resume: z.string().optional(),
    caption: z.string().optional(),
    archivalNote: z.string().optional()
  }),
  knowledgeStatus: knowledgeStatusSchema,
  publicationStatus: publicationStatusSchema,
  citationPolicy: z.enum(["required", "recommended", "not-needed"]),
  evidence: z.array(claimEvidenceSchema).min(1),
  publicCitationNote: z.string().min(1),
  qualifications: z.array(z.string()).default([]),
  antiClaims: z.array(z.string()).default([]),
  allowedSurfaces: z.array(z.string()).min(1),
  lastReviewedAt: z.string().min(1),
  reviewedBy: z.array(z.string()).default([]),
  proofProjection: proofProjectionSchema.optional()
});

export const researchRunSchema = z.object({
  id: z.string().min(1),
  subject: z.string().min(1),
  performedAt: z.string().min(1),
  method: z.string().min(1),
  scope: z.object({
    deduplicatedHtmlCaptures: z.number().int().nonnegative().optional(),
    originalUrls: z.number().int().nonnegative().optional(),
    eventUrlKeys: z.number().int().nonnegative().optional(),
    successfulPages: z.number().int().nonnegative().optional(),
    redirects: z.number().int().nonnegative().optional(),
    captured404s: z.number().int().nonnegative().optional()
  }),
  finding: z.string().min(1),
  limitations: z.array(z.string()).default([]),
  privateArtifactId: z.string().optional(),
  publicSummary: z.string().optional()
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type ResearchRun = z.infer<typeof researchRunSchema>;
