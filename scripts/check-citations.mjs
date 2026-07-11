import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  knowledgeBundle,
  resolveCitationPage,
  validateKnowledgeBundle
} from "../apps/www/src/data/knowledge/index.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(repoRoot, "apps/www/src/content/work");
const failures = [];
const warnings = [];

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const absolute = path.join(directory, entry);
    return statSync(absolute).isDirectory() ? walk(absolute) : [absolute];
  });
}

try {
  validateKnowledgeBundle(knowledgeBundle);
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
}

const manifestByRoute = new Map(knowledgeBundle.pages.map((page) => [page.route, page]));
for (const file of walk(contentRoot).filter((candidate) => candidate.endsWith(".mdx"))) {
  const source = readFileSync(file, "utf8");
  const relative = path.relative(repoRoot, file);
  const slug = path.basename(file, ".mdx");
  const route = `/work/${slug}`;
  const citeTags = [...source.matchAll(/<Cite\b[^>]*>/g)].map((match) => match[0]);

  for (const tag of citeTags) {
    if (/\b(?:number|url)\s*=/.test(tag)) {
      failures.push(`${relative} contains a manual citation number or URL: ${tag}`);
    }
  }

  if (!citeTags.length) {
    if (/<SourceNotes\b/.test(source)) {
      failures.push(`${relative} renders SourceNotes without citation references.`);
    }
    continue;
  }

  const manifest = manifestByRoute.get(route);
  if (!manifest) {
    failures.push(`${relative} contains citations but ${route} has no citation manifest.`);
    continue;
  }

  const authoredOccurrences = citeTags.flatMap((tag) => {
    const match = tag.match(/\boccurrence="([^"]+)"/);
    if (!match) {
      failures.push(`${relative} has a Cite without a literal occurrence ID: ${tag}`);
      return [];
    }
    return [match[1]];
  });
  const duplicateOccurrences = authoredOccurrences.filter(
    (id, index) => authoredOccurrences.indexOf(id) !== index
  );
  if (duplicateOccurrences.length) {
    failures.push(`${relative} repeats occurrence IDs: ${[...new Set(duplicateOccurrences)].join(", ")}`);
  }

  const manifestIds = new Set(manifest.occurrences.map((occurrence) => occurrence.id));
  for (const id of authoredOccurrences) {
    if (!manifestIds.has(id)) failures.push(`${relative} uses unknown occurrence ${id}.`);
  }
  for (const id of manifestIds) {
    if (!authoredOccurrences.includes(id)) failures.push(`${relative} has orphaned manifest occurrence ${id}.`);
  }
  if ((source.match(/<SourceNotes\b/g) ?? []).length !== 1) {
    failures.push(`${relative} must render exactly one Sources section.`);
  }

  try {
    const resolved = resolveCitationPage(route);
    const ids = [
      ...resolved.occurrences.flatMap((occurrence) =>
        occurrence.sources.map((citationSource) => citationSource.refId)
      ),
      ...resolved.sources.map((sourceNote) => sourceNote.targetId)
    ];
    if (new Set(ids).size !== ids.length) {
      failures.push(`${relative} resolves duplicate citation HTML IDs.`);
    }
  } catch (error) {
    failures.push(`${relative}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const citedClaimIds = new Set(knowledgeBundle.pages.flatMap((page) => page.occurrences.map((item) => item.claimId)));
for (const claim of knowledgeBundle.claims) {
  const sourceCount = new Set(
    knowledgeBundle.evidence
      .filter((item) => item.claimId === claim.id && item.publicCitation)
      .map((item) => item.sourceId)
  ).size;
  if (citedClaimIds.has(claim.id) && sourceCount === 1) {
    warnings.push(`Claim ${claim.id} has one public source.`);
  }
}

for (const source of knowledgeBundle.sources) {
  if (!source.lastCheckedAt && source.visibility !== "protected") {
    warnings.push(`Source ${source.id} has not been link-checked.`);
  }
  if (!source.publishedAt && !source.capturedAt && source.visibility !== "protected") {
    warnings.push(`Source ${source.id} has no publication or capture date.`);
  }
  if (source.visibility === "public-metadata-only") {
    warnings.push(`Source ${source.id} is public-metadata-only.`);
  }
  const hasSocialOriginal = source.links.some(
    (link) => link.kind === "original" && /(?:x\.com|twitter\.com)/.test(link.url)
  );
  const hasArchive = source.links.some((link) => ["archive", "archive-context"].includes(link.kind));
  if (hasSocialOriginal && !hasArchive) {
    warnings.push(`Source ${source.id} has a fragile social link and no archive context.`);
  }
}

for (const warning of warnings) console.warn(`Citation warning: ${warning}`);

if (failures.length) {
  console.error(`Citation checks failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Citation checks passed: ${knowledgeBundle.pages.length} cited page, ${citedClaimIds.size} cited claims, ${knowledgeBundle.sources.length} sources, ${warnings.length} warnings.`
);
