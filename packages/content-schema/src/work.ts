import { z } from "zod";

export const workStatuses = [
  "Full case study",
  "Short proof page",
  "Archived prototype",
  "Client work",
  "Civic campaign infrastructure",
  "Community platform",
  "Residency / participation system",
  "Lab / research",
  "Public-safe summary only",
  "Draft / private"
] as const;

export const privacyLevels = [
  "public",
  "public-safe",
  "redacted",
  "archived",
  "lab",
  "private"
] as const;

export const workFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  role: z.string(),
  dates: z.string(),
  format: z.string().optional(),
  status: z.enum(workStatuses),
  featured: z.boolean().optional(),
  priority: z.number().optional(),
  privacyLevel: z.enum(privacyLevels),
  underlyingSystem: z.string().optional(),
  tags: z.array(z.string()),
  skills: z.array(z.string()).optional(),
  links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  caveat: z.string().optional(),
  heroImage: z.string().optional()
});

export type WorkStatus = (typeof workStatuses)[number];
export type PrivacyLevel = (typeof privacyLevels)[number];
export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>;
