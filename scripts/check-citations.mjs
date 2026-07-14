import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getClaimProjection,
  resolveCitationOccurrence
} from "../apps/www/src/data/knowledge-bank/public.ts";
import { validateKnowledgeBank } from "./lib/citation-validation.mjs";

execFileSync(process.execPath, ["scripts/generate-public-citations.mjs", "--check"], { stdio: "inherit" });
const errors = validateKnowledgeBank();

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workContentRoot = path.join(repoRoot, "apps/www/src/content/work");
const attributePattern = /(claimId|projection|surface|pageId|occurrenceId)="([^"]+)"/g;

for (const filename of readdirSync(workContentRoot).filter((item) => item.endsWith(".mdx"))) {
  const relativePath = path.join("apps/www/src/content/work", filename);
  const source = readFileSync(path.join(repoRoot, relativePath), "utf8");

  for (const match of source.matchAll(/<Claim\b([\s\S]*?)\/>/g)) {
    const attributes = Object.fromEntries(
      [...match[1].matchAll(attributePattern)].map((item) => [item[1], item[2]])
    );

    for (const required of ["claimId", "projection", "surface"]) {
      if (!attributes[required]) errors.push(`${relativePath} has a Claim without ${required}`);
    }
    if (!attributes.claimId || !attributes.projection || !attributes.surface) continue;

    let projection;
    try {
      projection = getClaimProjection(
        attributes.claimId,
        attributes.projection,
        attributes.surface
      );
    } catch (error) {
      errors.push(`${relativePath} cannot resolve ${attributes.claimId}: ${error.message}`);
      continue;
    }

    if (!projection.citationRequired) continue;
    if (!attributes.pageId || !attributes.occurrenceId) {
      errors.push(`${relativePath} must cite ${attributes.claimId} with pageId and occurrenceId`);
      continue;
    }

    try {
      const resolved = resolveCitationOccurrence(attributes.pageId, attributes.occurrenceId);
      if (resolved.occurrence.claimId !== attributes.claimId) {
        errors.push(
          `${relativePath} maps ${attributes.pageId}/${attributes.occurrenceId} to ` +
            `${resolved.occurrence.claimId}, not ${attributes.claimId}`
        );
      }
    } catch (error) {
      errors.push(
        `${relativePath} cannot resolve ${attributes.pageId}/${attributes.occurrenceId}: ` +
          error.message
      );
    }
  }
}

if (errors.length) {
  console.error("Citation validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Citation check passed: canonical records, public projection, boundaries, and page plans are consistent.");
