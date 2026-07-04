import { z } from "zod";

export const contentStates = [
  "Full case study",
  "Short proof page",
  "Lab note",
  "Field note",
  "Archive item",
  "Draft / private",
  "Public-safe summary",
  "Archived prototype"
] as const;

export const visibilities = [
  "public",
  "public-safe",
  "redacted",
  "summary-only",
  "private"
] as const;

export const workFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  role: z.string(),
  dates: z.string(),
  format: z.string().optional(),
  contentState: z.enum(contentStates),
  featured: z.boolean(),
  priority: z.number(),
  visibility: z.enum(visibilities),
  underlyingSystem: z.string().optional(),
  tags: z.array(z.string()).default([]),
  skills: z.array(z.string()).optional(),
  proof: z.array(z.string()).optional(),
  links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  caveat: z.string().optional(),
  publicSafety: z.object({ note: z.string() }).optional(),
  known: z.array(z.string()).optional(),
  open: z.array(z.string()).optional(),
  protected: z.array(z.string()).optional(),
  shown: z.array(z.string()).optional(),
  omitted: z.array(z.string()).optional(),
  related: z.array(z.string()).optional(),
  updatedAt: z.string().optional()
});

export type ContentState = (typeof contentStates)[number];
export type Visibility = (typeof visibilities)[number];
export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>;
