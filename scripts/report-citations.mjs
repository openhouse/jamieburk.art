import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBundle, resolveCitationPage } from "../apps/www/src/data/knowledge/index.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(repoRoot, "reports/citations.md");
const citedClaimIds = new Set();
const citedSourceIds = new Set();
const lines = [
  "# Citation Report",
  "",
  "Generated from the public-safe citation knowledge records. No external links were fetched.",
  "",
  "## Cited pages",
  ""
];

for (const page of knowledgeBundle.pages) {
  const resolved = resolveCitationPage(page.route);
  const claimIds = resolved.occurrences.map((occurrence) => occurrence.claim.id);
  const sourceIds = resolved.sources.map((note) => note.source.id);
  claimIds.forEach((id) => citedClaimIds.add(id));
  sourceIds.forEach((id) => citedSourceIds.add(id));
  lines.push(`### ${page.route}`, "", `Claims (${claimIds.length}): ${claimIds.join(", ")}`, "");
  lines.push(`Sources (${sourceIds.length}): ${sourceIds.join(", ")}`, "");
}

const uncitedDefensible = knowledgeBundle.claims.filter(
  (claim) => claim.status === "defensible" && !citedClaimIds.has(claim.id)
);
const restrictedClaims = knowledgeBundle.claims.filter((claim) =>
  ["open", "protected"].includes(claim.status)
);
const liveAndArchived = knowledgeBundle.sources.filter(
  (source) => source.availability === "live-and-archived"
);
const missingArchive = knowledgeBundle.sources.filter(
  (source) =>
    source.visibility !== "protected" &&
    source.links.some((link) => ["canonical", "original", "media"].includes(link.kind)) &&
    !source.links.some((link) => ["archive", "archive-context"].includes(link.kind))
);

lines.push(
  "## Uncited defensible claims",
  "",
  ...(uncitedDefensible.length ? uncitedDefensible.map((claim) => `- ${claim.id}`) : ["- None"]),
  "",
  "## Open or protected claims",
  "",
  ...(restrictedClaims.length
    ? restrictedClaims.map((claim) => `- ${claim.id}: ${claim.status}`)
    : ["- None"]),
  "",
  "## Sources with live and archive links",
  "",
  ...(liveAndArchived.length ? liveAndArchived.map((source) => `- ${source.id}`) : ["- None"]),
  "",
  "## Sources missing archive links",
  "",
  ...(missingArchive.length ? missingArchive.map((source) => `- ${source.id}`) : ["- None"]),
  "",
  "## Last checked",
  "",
  ...knowledgeBundle.sources.map(
    (source) => `- ${source.id}: ${source.lastCheckedAt ?? "not link-checked"}`
  ),
  "",
  "## Warnings",
  "",
  "- Original social links are treated as fragile even when archive context exists.",
  "- Link health is not a production-build dependency.",
  "- The participant photograph remains protected and cannot render.",
  ""
);

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
console.log(path.relative(repoRoot, outputPath));
