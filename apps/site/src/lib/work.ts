import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

import type { WorkFrontmatter } from "@jamie/content-schema/work";
import { workFrontmatterSchema } from "@jamie/content-schema/work";
import matter from "gray-matter";

export type WorkItem = WorkFrontmatter & {
  body: string;
  href: `/work/${string}`;
};

const workDirectory = path.join(process.cwd(), "src/content/work");

function isVisible(item: WorkItem) {
  return item.visibility !== "private" && item.contentState !== "Draft / private";
}

function readWorkFile(fileName: string): WorkItem {
  const fullPath = path.join(workDirectory, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  const legacyStatusMap: Record<string, string> = {
    "full-case-study": "Full case study",
    "short-proof-page": "Short proof page",
    lab: "Lab note",
    archived: "Archived prototype",
    draft: "Draft / private"
  };
  const data = parsed.data;
  const knownOpenProtected = data.knownOpenProtected as
    | { known?: string[]; open?: string[]; protected?: string[] }
    | undefined;
  const normalized = {
    ...data,
    dates: data.dates ?? data.years,
    format: data.format ?? data.subtitle,
    contentState:
      data.contentState ??
      (typeof data.status === "string" ? legacyStatusMap[data.status] : undefined),
    underlyingSystem: data.underlyingSystem ?? data.systemType ?? data.whatBecameUsable,
    skills: data.skills ?? data.capabilities,
    proof: data.proof ?? (data.selectedProof ? [data.selectedProof] : undefined),
    known: data.known ?? knownOpenProtected?.known,
    open: data.open ?? knownOpenProtected?.open,
    protected: data.protected ?? knownOpenProtected?.protected
  };
  const frontmatter = workFrontmatterSchema.parse(normalized);

  return {
    ...frontmatter,
    body: parsed.content.trim(),
    href: `/work/${frontmatter.slug}`
  };
}

export const getAllWorkItems = cache(() => {
  if (!fs.existsSync(workDirectory)) {
    return [];
  }

  return fs
    .readdirSync(workDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readWorkFile)
    .sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title));
});

export const getVisibleWorkItems = cache(() => getAllWorkItems().filter(isVisible));

export const getFeaturedWorkItems = cache(() =>
  getVisibleWorkItems().filter((item) => item.featured)
);

export function getWorkItem(slug: string) {
  return getVisibleWorkItems().find((item) => item.slug === slug);
}

export function getStartHereItems() {
  const order = [
    "technical-operations",
    "harry-j-epstein",
    "fairrentnyc-commercial-rent-stabilization",
    "callnyc"
  ];
  const items = getVisibleWorkItems();

  return order
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is WorkItem => Boolean(item));
}

export function getWorkGroups() {
  const groups = [
    {
      title: "Business / operations",
      slugs: ["harry-j-epstein", "kc-town-hall"]
    },
    {
      title: "Civic / public-facing systems",
      slugs: ["fairrentnyc-commercial-rent-stabilization", "callnyc", "wowlist"]
    },
    {
      title: "Community / cultural infrastructure",
      slugs: ["196-sunday-dinner"]
    },
    {
      title: "Knowledge systems / AI lab",
      slugs: ["source-backed-team-memory"]
    }
  ];
  const items = getVisibleWorkItems();

  return groups.map((group) => ({
    ...group,
    items: group.slugs
      .map((slug) => items.find((item) => item.slug === slug))
      .filter((item): item is WorkItem => Boolean(item))
  }));
}
