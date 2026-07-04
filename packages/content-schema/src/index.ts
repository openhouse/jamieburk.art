import { z } from "zod";

export const visibilitySchema = z.enum([
  "public",
  "public-safe",
  "redacted",
  "summary-only",
  "private"
]);

export const workStatusSchema = z.enum([
  "Full case study",
  "Short proof page",
  "Lab / research",
  "Archived prototype",
  "Public-safe summary only",
  "Draft"
]);

export const artifactTypeSchema = z.enum([
  "website",
  "workflow",
  "source map",
  "decision record",
  "public handout",
  "meeting memory",
  "guide",
  "prototype",
  "photo sequence",
  "diagram",
  "download",
  "analytics summary",
  "public-safe screenshot",
  "template",
  "script",
  "map",
  "press"
]);

export const workFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  series: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  role: z.string(),
  years: z.string(),
  status: workStatusSchema,
  featured: z.boolean().default(false),
  priority: z.number().default(999),
  visibility: visibilitySchema,
  whatWasUnclear: z.string(),
  whatBecameUsable: z.string(),
  artifactTypes: z.array(artifactTypeSchema).default([]),
  tags: z.array(z.string()).default([]),
  capabilities: z.array(z.string()).default([]),
  careNote: z.string().optional(),
  sourceLayer: z.string().optional(),
  known: z.array(z.string()).optional(),
  open: z.array(z.string()).optional(),
  protected: z.array(z.string()).optional(),
  credits: z.array(z.string()).optional()
});

export type Visibility = z.infer<typeof visibilitySchema>;
export type WorkStatus = z.infer<typeof workStatusSchema>;
export type ArtifactType = z.infer<typeof artifactTypeSchema>;
export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>;
