import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

export const WorkStatusSchema = z.enum([
  "Full case study",
  "Short proof page",
  "Lab / research",
  "Archived prototype",
  "Public-safe summary only",
  "Draft"
]);

export const VisibilitySchema = z.enum([
  "public",
  "public-safe",
  "redacted",
  "summary-only",
  "private"
]);

export const WorkMetaSchema = z.object({
  title: z.string(),
  slug: z.string(),
  series: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  role: z.string(),
  years: z.string(),
  status: WorkStatusSchema,
  featured: z.boolean().default(false),
  priority: z.number().default(99),
  visibility: VisibilitySchema,
  whatWasUnclear: z.string(),
  whatBecameUsable: z.string(),
  artifactTypes: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  capabilities: z.array(z.string()).default([]),
  links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  careNote: z.string().optional(),
  sourceLayer: z.string().optional(),
  credits: z.array(z.string()).default([]),
  publicSafety: z.object({ note: z.string() }).optional()
});

export const LabMetaSchema = z.object({
  title: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  status: z.string(),
  priority: z.number().default(99),
  tags: z.array(z.string()).default([])
});

export type WorkMeta = z.infer<typeof WorkMetaSchema>;
export type LabMeta = z.infer<typeof LabMetaSchema>;

export type ContentDocument<TMeta> = {
  meta: TMeta;
  body: string;
};

const contentRoot = path.join(process.cwd(), "content");

async function readMdxCollectionFile<TMeta>(
  collection: string,
  fileName: string,
  schema: z.ZodType<TMeta>
): Promise<ContentDocument<TMeta>> {
  const filePath = path.join(contentRoot, collection, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);

  return {
    meta: schema.parse(parsed.data),
    body: parsed.content.trim()
  };
}

async function listMdxFiles(collection: string): Promise<string[]> {
  const collectionPath = path.join(contentRoot, collection);
  const entries = await fs.readdir(collectionPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort();
}

export async function getWorkItems(): Promise<Array<ContentDocument<WorkMeta>>> {
  const files = await listMdxFiles("work");
  const documents = await Promise.all(
    files.map((fileName) => readMdxCollectionFile("work", fileName, WorkMetaSchema))
  );

  return documents.sort((a, b) => a.meta.priority - b.meta.priority);
}

export async function getFeaturedWorkItems(): Promise<Array<ContentDocument<WorkMeta>>> {
  const workItems = await getWorkItems();

  return workItems.filter((item) => item.meta.featured);
}

export async function getWorkItem(slug: string): Promise<ContentDocument<WorkMeta> | undefined> {
  const workItems = await getWorkItems();

  return workItems.find((item) => item.meta.slug === slug);
}

export async function getLabPage(slug: string): Promise<ContentDocument<LabMeta> | undefined> {
  const fileName = `${slug}.mdx`;

  try {
    return await readMdxCollectionFile("lab", fileName, LabMetaSchema);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined;
    }

    throw error;
  }
}
