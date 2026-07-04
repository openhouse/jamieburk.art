import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { workMetaSchema, type WorkMeta } from "@jamieburkart/content";

export type WorkEntry = WorkMeta & {
  body: string;
  filePath: string;
};

const contentDirectory = path.join(process.cwd(), "src/content/work");

async function loadWorkFile(filePath: string): Promise<WorkEntry> {
  const source = await fs.readFile(filePath, "utf8");
  const parsed = matter(source);
  const meta = workMetaSchema.parse(parsed.data);

  return {
    ...meta,
    body: parsed.content.trim(),
    filePath,
  };
}

export const getAllWork = cache(async (): Promise<WorkEntry[]> => {
  const entries = await fg("*.mdx", {
    cwd: contentDirectory,
    absolute: true,
  });

  const work = await Promise.all(entries.map(loadWorkFile));

  return work.sort((a, b) => {
    if (a.priority === b.priority) {
      return a.title.localeCompare(b.title);
    }

    return a.priority - b.priority;
  });
});

export async function getFeaturedWork(): Promise<WorkEntry[]> {
  const work = await getAllWork();
  return work.filter((item) => item.featured);
}

export async function getWorkBySlug(
  slug: string,
): Promise<WorkEntry | undefined> {
  const work = await getAllWork();
  return work.find((item) => item.slug === slug);
}

export async function getAllWorkSlugs(): Promise<string[]> {
  const work = await getAllWork();
  return work.map((item) => item.slug);
}
