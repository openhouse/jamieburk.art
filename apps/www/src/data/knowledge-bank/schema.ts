import { z } from "zod";

const httpsUrlSchema = z.string().url().refine(
  (value) => value.startsWith("https://"),
  "Public source URLs must use https://"
);

const nullableHttpsUrlSchema = httpsUrlSchema.nullable();

export const archiveUrlSchema = z.object({
  url: httpsUrlSchema,
  relationship: z.string().min(1),
  capturedAt: z.string().nullable()
});

export const visibilitySchema = z.enum(["public", "restricted", "private"]);
export const rightsStateSchema = z.enum([
  "publishable",
  "link-only",
  "conditional",
  "private-review",
  "unknown"
]);

export const sourceRecordSchema = z.object({
  id: z.string().min(1),
  sourceType: z.enum([
    "official-web-page",
    "institutional-social-post",
    "independent-reporting",
    "public-code-repository",
    "archived-web-context",
    "participant-archive",
    "other"
  ]),
  sourceClass: z.enum(["primary", "primary-attachment", "secondary", "participant"]),
  publisher: z.string().min(1),
  title: z.string().min(1),
  publicationDate: z.string().nullable(),
  originalUrl: nullableHttpsUrlSchema,
  archiveUrls: z.array(archiveUrlSchema),
  visibility: visibilitySchema,
  rightsState: rightsStateSchema,
  citationMode: z.enum(["link", "citation-only", "description-only"]),
  recoveryStatus: z.enum(["recovered", "not-recovered", "unverified"]),
  publicCitation: z.string().min(1),
  caveats: z.array(z.string()),
  lastChecked: z.string().nullable()
});

export const assetRecordSchema = z.object({
  id: z.string().min(1),
  sourceId: z.string().nullable(),
  mediaType: z.enum([
    "photograph",
    "promotional-graphic",
    "screenshot",
    "pdf",
    "scan",
    "audio",
    "video",
    "other"
  ]),
  title: z.string().min(1),
  creator: z.string().nullable(),
  captureDate: z.string().nullable(),
  captureDateBasis: z.enum([
    "embedded-metadata",
    "participant-record",
    "published-date",
    "inferred",
    "unknown"
  ]),
  visibility: visibilitySchema,
  rightsState: rightsStateSchema,
  permissionStatus: z.enum([
    "confirmed",
    "not-required",
    "pending",
    "not-cleared",
    "unknown"
  ]),
  publicAssetUrl: nullableHttpsUrlSchema,
  visibleText: z.array(z.string()),
  supportsFacets: z.array(z.string()),
  caveats: z.array(z.string()),
  allowedSurfaces: z.array(z.string())
});

export const claimRecordSchema = z.object({
  id: z.string().min(1),
  canonical: z.string().min(1),
  status: z.enum([
    "verified",
    "verified-attribution",
    "verified-visible-text",
    "supported-negative-search-finding",
    "inference",
    "unresolved",
    "superseded"
  ]),
  confidence: z.enum(["high", "medium", "low", "not-applicable"]),
  publicWording: z.record(z.string(), z.string()),
  caveats: z.array(z.string()),
  prohibitedWording: z.array(z.string()),
  allowedSurfaces: z.array(z.string()),
  relatedProofIds: z.array(z.string())
});

export const evidenceTargetSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("source"), id: z.string().min(1) }),
  z.object({ kind: z.literal("asset"), id: z.string().min(1) }),
  z.object({ kind: z.literal("research-run"), id: z.string().min(1) })
]);

export const evidenceRecordSchema = z.object({
  id: z.string().min(1),
  claimId: z.string().min(1),
  target: evidenceTargetSchema,
  relationship: z.enum([
    "direct",
    "corroborating",
    "contextual",
    "visible-text",
    "metadata",
    "documented-search-result",
    "contradicting"
  ]),
  supports: z.string().min(1),
  doesNotSupport: z.array(z.string()),
  publicSafe: z.boolean()
});

export const researchRunRecordSchema = z.object({
  id: z.string().min(1),
  subject: z.string().min(1),
  performedAt: z.string().nullable(),
  method: z.string().min(1),
  counts: z.record(z.string(), z.number()),
  findings: z.array(z.string().min(1)),
  epistemicLimit: z.string().min(1),
  publicCitation: z.string().min(1),
  privateResearchArtifacts: z.boolean()
});

export const correctionRecordSchema = z.object({
  id: z.string().min(1),
  surface: z.string().min(1),
  previousValue: z.string().min(1),
  correctedValue: z.string().min(1),
  reason: z.string().min(1),
  supportingClaimIds: z.array(z.string().min(1)),
  status: z.enum(["required-before-production", "resolved", "deferred"]),
  resolvedAt: z.string().nullable()
});

export const citationGroupRecordSchema = z.object({
  id: z.string().min(1),
  claimIds: z.array(z.string().min(1)),
  evidenceIds: z.array(z.string().min(1)),
  title: z.string().min(1),
  publicNote: z.string().min(1),
  sourceOrder: z.array(z.string().min(1)),
  boundaryNote: z.string().nullable(),
  visibility: z.enum(["public", "restricted"])
});

export const pageProjectionRecordSchema = z.object({
  page: z.string().min(1),
  occurrences: z.array(
    z.object({
      citationKey: z.string().min(1),
      citationGroupId: z.string().min(1)
    })
  )
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type AssetRecord = z.infer<typeof assetRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type EvidenceRecord = z.infer<typeof evidenceRecordSchema>;
export type EvidenceTarget = z.infer<typeof evidenceTargetSchema>;
export type ResearchRunRecord = z.infer<typeof researchRunRecordSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationGroupRecord = z.infer<typeof citationGroupRecordSchema>;
export type PageProjectionRecord = z.infer<typeof pageProjectionRecordSchema>;
