import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { contentStates, practiceBodies } from "@jamieburk-art/content-model";
import type { WorkItem } from "@/lib/types";

const privacyLevels = ["public", "public-safe", "redacted", "archived", "lab", "private"] as const;

const linkSchema = z.object({
  label: z.string(),
  url: z.string().url()
});

const workMetaSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  role: z.string(),
  dates: z.string(),
  format: z.string().optional(),
  contentState: z.enum(contentStates),
  practiceBody: z.enum(practiceBodies),
  featured: z.boolean(),
  priority: z.number(),
  privacyLevel: z.enum(privacyLevels),
  underlyingSystem: z.string().optional(),
  tags: z.array(z.string()),
  skills: z.array(z.string()),
  proof: z.array(z.string()).optional(),
  unclear: z.string().optional(),
  usable: z.string().optional(),
  links: z.array(linkSchema).optional(),
  caveat: z.string().optional(),
  heroImage: z.string().optional(),
  lastUpdated: z.string().optional()
});

const workDirectory = path.join(process.cwd(), "src/content/work");

function readWorkFile(fileName: string): WorkItem {
  const sourcePath = path.join(workDirectory, fileName);
  const file = fs.readFileSync(sourcePath, "utf8");
  const parsed = matter(file);
  const meta = workMetaSchema.parse(parsed.data);

  return {
    ...meta,
    body: parsed.content.trim(),
    sourcePath
  };
}

export function getAllWorkItems(): WorkItem[] {
  if (!fs.existsSync(workDirectory)) {
    return [];
  }

  return fs
    .readdirSync(workDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readWorkFile)
    .filter((item) => item.privacyLevel !== "private")
    .filter((item) => item.contentState !== "Draft / private")
    .sort((a, b) => a.priority - b.priority);
}

export function getFeaturedWorkItems(): WorkItem[] {
  return getAllWorkItems().filter((item) => item.featured);
}

export function getWorkItem(slug: string): WorkItem | undefined {
  return getAllWorkItems().find((item) => item.slug === slug);
}

export function groupWorkByPractice(): Map<string, WorkItem[]> {
  return getAllWorkItems().reduce((groups, item) => {
    const existing = groups.get(item.practiceBody) ?? [];
    groups.set(item.practiceBody, [...existing, item]);
    return groups;
  }, new Map<string, WorkItem[]>());
}
