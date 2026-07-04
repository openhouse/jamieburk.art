import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { workItemSchema, type WorkEntry } from "./types";

function contentRoot() {
  const localPath = path.join(process.cwd(), "src/content/work");
  if (fs.existsSync(localPath)) {
    return localPath;
  }

  return path.join(process.cwd(), "apps/web/src/content/work");
}

const contentDirectory = contentRoot();

function parseWorkFile(fileName: string): WorkEntry {
  const filePath = path.join(contentDirectory, fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const parsed = workItemSchema.parse(data);

  return {
    ...parsed,
    body: content.trim()
  };
}

export function getAllWork(): WorkEntry[] {
  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(parseWorkFile)
    .sort((a, b) => a.priority - b.priority);
}

export function getFeaturedWork(): WorkEntry[] {
  return getAllWork().filter((entry) => entry.featured);
}

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return getAllWork().find((entry) => entry.slug === slug);
}

export function getWorkSlugs(): string[] {
  return getAllWork().map((entry) => entry.slug);
}

export function getWorkHref(entry: Pick<WorkEntry, "slug" | "status">): string {
  if (entry.slug === "source-backed-team-memory") {
    return "/lab/source-backed-team-memory";
  }

  return `/work/${entry.slug}`;
}
