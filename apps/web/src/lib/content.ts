import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

const schema = z.object({
  title: z.string(), slug: z.string(), summary: z.string(), role: z.string(), years: z.string(),
  tags: z.array(z.string()), contentState: z.string(), unclear: z.string(), usable: z.string(), featured: z.boolean().optional()
});
const dir = path.join(process.cwd(), 'src/content/work');
export function getAllWork() {
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    return schema.parse(matter(raw).data);
  }).sort((a,b) => a.title.localeCompare(b.title));
}
export function getWorkBySlug(slug: string) { return getAllWork().find((w) => w.slug === slug); }
