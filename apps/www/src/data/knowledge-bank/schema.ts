import { z } from "zod";

export const citationSurfaceSchema = z.enum([
  "homepage",
  "resume",
  "technical-operations",
  "work-card",
  "case-study",
  "lab",
  "about",
  "internal-only"
]);

export const publicUseStatusSchema = z.enum([
  "approved-public",
  "approved-public-summary",
  "qualified-public",
  "private-background",
  "approval-required"
]);

export const sourceRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  sourceType: z.string(),
  originKind: z.string(),
  evidenceClass: z.array(z.string()),
  originDescription: z.string(),
  publicUrl: z.url().optional(),
  archiveUrl: z.url().optional(),
  preservationDescription: z.string().optional(),
  publiclyLinkable: z.boolean(),
  publicUseStatus: publicUseStatusSchema,
  citationLabel: z.string(),
  rightsReview: z.string().optional(),
  guardrail: z.string(),
  protectedBoundaries: z.array(z.string()),
  lastReviewed: z.string()
});

export const claimSupportSchema = z.object({
  sourceId: z.string(),
  locator: z.string().optional(),
  note: z.string(),
  includeInPublicCitation: z.boolean()
});

export const claimRecordSchema = z.object({
  id: z.string(),
  status: publicUseStatusSchema,
  supportLevel: z.enum(["strong", "moderate", "careful", "pending"]),
  evidenceClass: z.array(z.string()),
  publicWording: z.string(),
  sourceBasis: z.string(),
  guardrail: z.string(),
  publicUseBoundary: z.string(),
  requiredPublicQualifications: z.array(z.string()).default([]),
  doNotSay: z.array(z.string()),
  protectedBoundaries: z.array(z.string()),
  allowedSurfaces: z.array(citationSurfaceSchema),
  support: z.array(claimSupportSchema),
  lastReviewed: z.string()
});

export const researchRunRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  runDate: z.string(),
  scope: z.string(),
  method: z.string(),
  counts: z.record(z.string(), z.number().int().nonnegative()),
  findings: z.array(z.string()),
  sourceIds: z.array(z.string()),
  publicUseStatus: publicUseStatusSchema,
  guardrail: z.string(),
  protectedBoundaries: z.array(z.string()),
  lastReviewed: z.string()
});

export const assetRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  assetType: z.string(),
  sourceId: z.string(),
  publicUseStatus: publicUseStatusSchema,
  publicDescription: z.string(),
  guardrail: z.string(),
  protectedBoundaries: z.array(z.string()),
  lastReviewed: z.string()
});

export const pageManifestSchema = z.object({
  id: z.string(),
  path: z.string(),
  title: z.string(),
  surface: citationSurfaceSchema,
  claimOrder: z.array(z.string()),
  referenceHeading: z.string().default("Sources & notes"),
  publicBoundary: z.string()
});

export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type ClaimRecord = z.infer<typeof claimRecordSchema>;
export type ResearchRunRecord = z.infer<typeof researchRunRecordSchema>;
export type AssetRecord = z.infer<typeof assetRecordSchema>;
export type PageManifest = z.infer<typeof pageManifestSchema>;
export type CitationSurface = z.infer<typeof citationSurfaceSchema>;
