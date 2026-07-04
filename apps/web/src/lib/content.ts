import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import type { WorkEntry } from './types';

const workDirectory = path.join(process.cwd(), 'src/content/work');

const contentStateSchema = z.enum([
  'Full case study',
  'Short proof page',
  'Lab note',
  'Archived prototype',
  'Public-safe summary',
  'Draft / private'
]);

const visibilitySchema = z.enum(['public', 'public-safe', 'redacted', 'summary-only', 'private']);

const workMetaSchema = z.object({
  title: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  role: z.string(),
  years: z.string(),
  contentState: contentStateSchema,
  visibility: visibilitySchema,
  featured: z.boolean(),
  priority: z.number(),
  tags: z.array(z.string()),
  capabilities: z.array(z.string()),
  proof: z.array(z.string()),
  whatWasUnclear: z.string(),
  whatBecameUsable: z.string(),
  underlyingSystem: z.string().optional(),
  links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  publicSafety: z.object({ note: z.string() }).optional(),
  knownOpenProtected: z
    .object({
      known: z.array(z.string()),
      open: z.array(z.string()),
      protected: z.array(z.string())
    })
    .optional()
});

function getWorkFileNames() {
  return fs.readdirSync(workDirectory).filter((fileName) => fileName.endsWith('.mdx'));
}

function readWorkFile(fileName: string): WorkEntry {
  const filePath = path.join(workDirectory, fileName);
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const meta = workMetaSchema.parse(parsed.data);

  return {
    ...meta,
    body: parsed.content.trim()
  };
}

export function getWorkEntries() {
  return getWorkFileNames()
    .map(readWorkFile)
    .sort((a, b) => a.priority - b.priority);
}

export function getPublicWorkEntries() {
  return getWorkEntries().filter((entry) => entry.contentState !== 'Draft / private' && entry.visibility !== 'private');
}

export function getFeaturedWorkEntries() {
  return getPublicWorkEntries().filter((entry) => entry.featured);
}

export function getWorkEntryBySlug(slug: string) {
  return getPublicWorkEntries().find((entry) => entry.slug === slug);
}

export function getWorkTags() {
  const tags = new Set<string>();
  for (const entry of getPublicWorkEntries()) {
    entry.tags.forEach((tag) => tags.add(tag));
  }
  return ['All', ...Array.from(tags).sort()];
}

