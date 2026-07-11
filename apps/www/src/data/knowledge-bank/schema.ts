import { z } from "zod";

const httpsUrlSchema = z.string().url().refine(
  (value) => value.startsWith("https://"),
  "Public source URLs must use https://"
);

export const archiveUrlSchema = z.object({
  url: httpsUrlSchema,
  relationship: z.string().min(1),
  capturedAt: z.string().nullable()
});

export const sourceRecordSchema = z.object({
  id: z.string().min(1),
  sourceType: z.enum([
    "institutional-social-post",
    "promotional-graphic",
    "official-web-page",
    "independent-reporting",
    "participant-photograph",
    "public-code-repository",
    "archived-web-context"
  ]),
  sourceClass: z.enum([
    "primary",
    "primary-attachment",
    "secondary",
    "participant-archive"
  ]),
  publisher: z.string().min(1),
  title: z.string().min(1),
  publicationDate: z.string().nullable(),
  originalUrl: httpsUrlSchema.nullable(),
  archiveUrls: z.array(archiveUrlSchema),
  accessStatus: z.enum(["public", "private", "restricted"]),
  recoveryStatus: z.enum(["recovered", "not-recovered", "unverified"]),
  publicCitation: z.string().min(1),
  supportsFacets: z.array(z.string().min(1)),
  caveats: z.array(z.string()),
  lastChecked: z.string().nullable()
});

const sourceSupportSchema = z.object({
  kind: z.literal("source"),
  sourceId: z.string().min(1),
  relationship: z.enum([
    "direct",
    "corroborating",
    "contextual",
    "visible-text",
    "metadata"
  ])
});

const researchRunSupportSchema = z.object({
  kind: z.literal("research-run"),
  researchRunId: z.string().min(1),
  relationship: z.literal("documented-search-result")
});

export const claimSupportSchema = z.discriminatedUnion("kind", [
  sourceSupportSchema,
  researchRunSupportSchema
]);

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
  support: z.array(claimSupportSchema),
  publicWording: z.record(z.string(), z.string()),
  caveats: z.array(z.string()),
  prohibitedWording: z.array(z.string())
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
  status: z.enum(["required-before-production", "resolved", "deferred"]),
  resolvedAt: z.string().nullable()
});

export const citationProjectionRecordSchema = z.object({
  page: z.string().min(1),
  citations: z.array(
    z.object({
      key: z.string().min(1),
      claimId: z.string().min(1)
    })
  )
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type ClaimSupport = z.infer<typeof claimSupportSchema>;
export type ResearchRunRecord = z.infer<typeof researchRunRecordSchema>;
export type CorrectionRecord = z.infer<typeof correctionRecordSchema>;
export type CitationProjectionRecord = z.infer<typeof citationProjectionRecordSchema>;
