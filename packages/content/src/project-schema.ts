import { z } from "zod";

export const workMetaSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  role: z.string(),
  dates: z.string(),
  format: z.string().optional(),
  status: z.enum([
    "Full case study",
    "Short proof page",
    "Archived prototype",
    "Client work",
    "Civic campaign infrastructure",
    "Community platform",
    "Residency / participation system",
    "Lab / research",
    "Public-safe summary only",
  ]),
  featured: z.boolean().default(false),
  priority: z.number().default(999),
  privacyLevel: z.enum([
    "public",
    "public-safe",
    "redacted",
    "archived",
    "lab",
  ]),
  underlyingSystem: z.string().optional(),
  tags: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      }),
    )
    .default([]),
  caveat: z.string().optional(),
  heroImage: z.string().optional(),
});

export type WorkMeta = z.infer<typeof workMetaSchema>;
