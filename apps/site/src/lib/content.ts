import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { WorkEntry, WorkMeta } from "./types";

const contentDirectory = path.join(process.cwd(), "src/content/work");

function normalizeArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function parseWorkFile(fileName: string): WorkEntry {
  const filePath = path.join(contentDirectory, fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  const meta = {
    ...data,
    artifactTypes: normalizeArray(data.artifactTypes),
    tags: normalizeArray(data.tags),
    capabilities: normalizeArray(data.capabilities),
    publicSafety: data.publicSafety,
    knownOpenProtected: data.knownOpenProtected
  } as WorkMeta;

  return {
    ...meta,
    body: content.trim()
  };
}

export function getAllWork(): WorkEntry[] {
  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith(".mdx") && fileName !== "technical-operations.mdx")
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
