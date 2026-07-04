import { z } from "zod";

export const workStatusSchema = z.enum([
  "Full case study",
  "Short proof page",
  "Lab / method",
  "Archived prototype",
  "Public-safe summary only"
]);

export const publicSafetyLevelSchema = z.enum([
  "public",
  "public-safe summary",
  "redacted",
  "private",
  "approval required"
]);

export const workItemSchema = z.object({
  title: z.string(),
  slug: z.string(),
  subtitle: z.string().optional(),
  summary: z.string(),
  role: z.string(),
  years: z.string(),
  lastUpdated: z.string().optional(),
  status: workStatusSchema,
  featured: z.boolean().default(false),
  priority: z.number().default(99),
  practiceGroup: z.string().optional(),
  systemType: z.string(),
  artifactTypes: z.array(z.string()).default([]),
  whatWasUnclear: z.string().optional(),
  whatBecameUsable: z.string(),
  whatIsOmitted: z.string().optional(),
  publicSafety: z
    .object({
      level: publicSafetyLevelSchema,
      note: z.string()
    })
    .optional(),
  poeticTagline: z.string().optional(),
  futureReaderNote: z.string().optional(),
  tags: z.array(z.string()).default([]),
  capabilities: z.array(z.string()).default([]),
  proof: z.array(z.string()).default([]),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string()
      })
    )
    .default([]),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional()
});

export type WorkStatus = z.infer<typeof workStatusSchema>;
export type PublicSafetyLevel = z.infer<typeof publicSafetyLevelSchema>;
export type WorkItem = z.infer<typeof workItemSchema>;
export type WorkEntry = WorkItem & {
  body: string;
};
