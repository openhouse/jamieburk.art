import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { z } from "zod";
import type { WorkGroup, WorkItem } from "@jamie/site-content/types";
import { workGroupOrder } from "@jamie/site-content/work";

const visibilitySchema = z.enum(["public", "public-safe", "redacted", "summary-only", "private"]);
const statusSchema = z.enum([
  "Full case study",
  "Short proof page",
  "Lab / research",
  "Archived prototype",
  "Public-safe summary only",
  "Draft"
]);
const artifactSchema = z.enum([
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
  "press",
  "platform"
]);
const groupSchema = z.enum(workGroupOrder);

const workSchema = z.object({
  title: z.string(),
  slug: z.string(),
  series: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  role: z.string(),
  years: z.string(),
  status: statusSchema,
  featured: z.boolean(),
  priority: z.number(),
  group: groupSchema,
  visibility: visibilitySchema,
  whatWasUnclear: z.string(),
  whatBecameUsable: z.string(),
  systemProduced: z.string(),
  artifactTypes: z.array(artifactSchema),
  tags: z.array(z.string()),
  capabilities: z.array(z.string()),
  links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  careNote: z.string().optional(),
  sourceLayer: z.string().optional(),
  credits: z.array(z.string()).default([]),
  known: z.array(z.string()).default([]),
  openQuestions: z.array(z.string()).default([]),
  protected: z.array(z.string()).default([]),
  publicSafety: z.object({ note: z.string() })
});

const contentDirectory = path.join(process.cwd(), "src/content/work");

function readWorkFile(fileName: string): WorkItem {
  const filePath = path.join(contentDirectory, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const parsed = workSchema.parse(data);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    ...parsed,
    body: content.trim(),
    readingMinutes: Math.max(1, Math.round(wordCount / 220))
  };
}

export const getAllWork = cache((): WorkItem[] => {
  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readWorkFile)
    .sort((a, b) => a.priority - b.priority);
});

export function getFeaturedWork() {
  return getAllWork().filter((work) => work.featured);
}

export function getWorkBySlug(slug: string) {
  return getAllWork().find((work) => work.slug === slug);
}

export function getWorkGroups(): Record<WorkGroup, WorkItem[]> {
  const groups: Record<WorkGroup, WorkItem[]> = {
    "Business / operations": [],
    "Civic / public-facing systems": [],
    "Community / cultural infrastructure": [],
    "Source-backed memory / lab": []
  };

  return getAllWork().reduce((groupedWork, work) => {
    groupedWork[work.group].push(work);
    return groupedWork;
  }, groups);
}
