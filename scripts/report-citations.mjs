import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBundle, resolveCitationPage } from "../packages/knowledge-bank/src/index.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "reports/citations.md");
const citedClaims = new Set();
const lines = [
  "# Citation Report",
  "",
  "Generated from the canonical knowledge package. No external links were fetched.",
  "",
  "## Cited pages",
  ""
];

for (const plan of knowledgeBundle.pagePlans) {
  const page = resolveCitationPage(plan.pageId);
  const claimIds = [...new Set(page.references.flatMap((item) => item.claims.map((claim) => claim.id)))];
  claimIds.forEach((id) => citedClaims.add(id));
  const sourceIds = [...new Set(page.references.flatMap((item) => item.sources.map((source) => source.id)))];
  lines.push(
    `### ${page.route}`,
    "",
    `Groups (${page.references.length}): ${page.references.map((item) => item.group.id).join(", ")}`,
    "",
    `Claims (${claimIds.length}): ${claimIds.join(", ")}`,
    "",
    `Sources (${sourceIds.length}): ${sourceIds.join(", ") || "None"}`,
    ""
  );
}

const uncited = knowledgeBundle.claims.filter(
  (claim) => ["defensible", "use-with-care"].includes(claim.status) && !citedClaims.has(claim.id)
);
const restricted = knowledgeBundle.claims.filter((claim) => ["open", "protected"].includes(claim.status));
const missingArchive = knowledgeBundle.sources.filter(
  (source) =>
    source.visibility !== "protected" &&
    source.links.some((link) => ["canonical", "original", "media"].includes(link.kind)) &&
    !source.links.some((link) => ["archive", "archive-context"].includes(link.kind))
);

lines.push(
  "## Uncited defensible claims",
  "",
  ...(uncited.length ? uncited.map((item) => `- ${item.id}`) : ["- None"]),
  "",
  "## Open or protected claims",
  "",
  ...(restricted.length ? restricted.map((item) => `- ${item.id}: ${item.status}`) : ["- None"]),
  "",
  "## Correction history",
  "",
  ...knowledgeBundle.corrections.map(
    (item) => `- ${item.id}: \`${item.previousValue}\` -> \`${item.correctedValue}\` (${item.status})`
  ),
  "",
  "## Governed artifacts",
  "",
  ...knowledgeBundle.artifacts.map((item) => `- ${item.id}: ${item.visibility}; ${item.rightsStatus}`),
  "",
  "## Sources missing archive links",
  "",
  ...(missingArchive.length ? missingArchive.map((item) => `- ${item.id}`) : ["- None"]),
  "",
  "## Last checked",
  "",
  ...knowledgeBundle.sources.map((item) => `- ${item.id}: ${item.lastCheckedAt ?? "not link-checked"}`),
  "",
  "## Boundaries",
  "",
  "- The Digital District participant photograph remains protected and cannot render.",
  "- The Civic Hall archive is an embedded-feed carrier, not a recovered event listing.",
  "- Link health is not an ordinary-build dependency."
);

mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, `${lines.join("\n")}\n`, "utf8");
console.log(path.relative(root, output));
