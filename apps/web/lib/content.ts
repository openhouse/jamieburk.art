import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  workFrontmatterSchema,
  type WorkFrontmatter
} from "@jamie/content-schema";

const workDirectory = path.join(process.cwd(), "content", "work");
const labDirectory = path.join(process.cwd(), "content", "lab");

export type WorkEntry = WorkFrontmatter & {
  body: string;
};

function readMdxFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

export function getAllWork(): WorkEntry[] {
  return fs
    .readdirSync(workDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const parsed = readMdxFile(path.join(workDirectory, fileName));
      const frontmatter = workFrontmatterSchema.parse(parsed.data);

      return {
        ...frontmatter,
        body: parsed.content.trim()
      };
    })
    .sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title));
}

export function getFeaturedWork() {
  return getAllWork().filter((work) => work.featured);
}

export function getWorkBySlug(slug: string) {
  return getAllWork().find((work) => work.slug === slug);
}

export function getLabPage(slug: string) {
  const filePath = path.join(labDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const parsed = readMdxFile(filePath);

  return {
    data: parsed.data as Record<string, string>,
    body: parsed.content.trim()
  };
}
