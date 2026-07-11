#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { loadKnowledge, repoRoot, resolveCitationPage } from "./lib/citation-domain.mjs";

const bundle = loadKnowledge();
const lines = [
  "# Citation Report",
  "",
  "Generated from the public-safe citation knowledge records. External links were not fetched.",
  ""
];

for (const page of bundle.pages) {
  const resolved = resolveCitationPage(page.route, bundle);
  lines.push(`## ${page.route}`, "");
  lines.push(
    "| # | Citation note | Assertions | Sources | Visibility / policy | Original | Archive | Rights | Qualification / limit | Reviewed |",
    "| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |"
  );
  for (const note of resolved.notes) {
    const original = note.sources.some((source) =>
      source.publicLinks.some((link) => ["canonical", "media"].includes(link.kind))
    );
    const archive = note.sources.some((source) =>
      source.publicLinks.some((link) => link.kind === "archive")
    );
    lines.push(
      `| ${note.number} | ${note.id} | ${note.assertionIds.join("<br>")} | ${note.sources.map((source) => source.id).join("<br>")} | ${note.sources.map((source) => `${source.visibility} / ${source.publicCitationPolicy}`).join("<br>")} | ${original ? "yes" : "no"} | ${archive ? "yes" : "no"} | ${note.sources.map((source) => source.rights?.permission ?? "not recorded").join("<br>")} | ${note.boundaryNote ?? "None"} | ${note.lastReviewed} |`
    );
  }
  lines.push("", `Public boundary: ${page.publicBoundary}`, "");
}

lines.push(
  "## Protected and follow-up records",
  "",
  ...bundle.sources
    .filter((source) => source.visibility !== "public")
    .map((source) => `- ${source.id}: ${source.visibility}; ${source.publicCitationPolicy}; rights ${source.rights?.permission ?? "not recorded"}`),
  ...bundle.corrections
    .filter((correction) => correction.status === "follow-up-required")
    .map((correction) => `- ${correction.id}: ${correction.surface} remains follow-up-required.`),
  ""
);

const output = path.join(repoRoot, "reports/citations.md");
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, `${lines.join("\n").trimEnd()}\n`, "utf8");
console.log(path.relative(repoRoot, output));
