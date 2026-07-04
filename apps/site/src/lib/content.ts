import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { parseMdxSections } from "@/lib/mdx";
import type { ArtifactType, Visibility, WorkContent, WorkMeta, WorkStatus } from "@/lib/types";

const contentDirectory = path.join(process.cwd(), "src/content/work");

const visibilitySchema = z.enum(["public", "public-safe", "redacted", "summary-only", "private"]);
const statusSchema = z.enum(["full-case-study", "short-proof-page", "lab", "archived", "draft"]);
const artifactTypeSchema = z.enum([
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

const workMetaSchema = z.object({
  title: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  role: z.string(),
  years: z.string(),
  status: statusSchema,
  featured: z.boolean(),
  priority: z.number(),
  visibility: visibilitySchema,
  whatWasUnclear: z.string(),
  whatBecameUsable: z.string(),
  selectedProof: z.string(),
  artifactTypes: z.array(artifactTypeSchema),
  tags: z.array(z.string()),
  capabilities: z.array(z.string()),
  links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  careNote: z.string().optional(),
  sourceLayer: z.string().optional(),
  credits: z.array(z.string()).optional(),
  publicSafety: z.object({ note: z.string() }).optional(),
  knownOpenProtected: z
    .object({
      known: z.array(z.string()),
      open: z.array(z.string()),
      protected: z.array(z.string())
    })
    .optional()
});

function readWorkFile(fileName: string): WorkContent {
  const fullPath = path.join(contentDirectory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(file);
  const meta = workMetaSchema.parse(parsed.data) as WorkMeta;

  return {
    meta,
    sections: parseMdxSections(parsed.content),
    rawBody: parsed.content
  };
}

export function getAllWorkItems(): WorkContent[] {
  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readWorkFile)
    .sort((a, b) => a.meta.priority - b.meta.priority);
}

export function getFeaturedWorkItems(): WorkContent[] {
  return getAllWorkItems().filter((item) => item.meta.featured);
}

export function getWorkItem(slug: string): WorkContent | undefined {
  return getAllWorkItems().find((item) => item.meta.slug === slug);
}

export function getWorkHref(item: WorkContent) {
  if (item.meta.slug === "source-backed-team-memory") {
    return "/lab/source-backed-team-memory";
  }

  return `/work/${item.meta.slug}`;
}

export function formatStatus(status: WorkStatus) {
  return status
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatVisibility(visibility: Visibility) {
  return visibility
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export type { ArtifactType, Visibility, WorkContent, WorkMeta, WorkStatus };
