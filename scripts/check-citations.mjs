#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import {
  extractMdxCitations,
  loadKnowledge,
  repoRoot,
  resolveCitationPage,
  validateKnowledge
} from "./lib/citation-domain.mjs";

const bundle = loadKnowledge();
let result;
try {
  result = validateKnowledge(bundle);
} catch (error) {
  console.error("Citation check failed:");
  console.error(error.message);
  process.exit(1);
}

const failures = [];
const mdxPath = path.join(repoRoot, "apps/www/src/content/work/callnyc.mdx");
const mdx = readFileSync(mdxPath, "utf8");
const rendered = extractMdxCitations(mdx);
const page = bundle.pages.find((item) => item.route === "/work/callnyc");

if (JSON.stringify(rendered) !== JSON.stringify(page.occurrences)) {
  failures.push("CallNYC MDX citation occurrences disagree with the page manifest");
}
if (!mdx.includes("<References />")) failures.push("CallNYC does not render <References />");
if (/Digital District/i.test(mdx)) failures.push("CallNYC publicly renders protected participant-photo context");
if (/built during the hackathon|official Council product|first civic-data hackathon/i.test(mdx)) {
  failures.push("CallNYC contains a prohibited chronology or status claim");
}
if (/\/private\/tmp\/|\/Users\/|\/Volumes\/|\b[A-Za-z]:\\/.test(mdx)) {
  failures.push("CallNYC contains a machine-local path");
}

const resolved = resolveCitationPage("/work/callnyc", bundle);
const renderedText = JSON.stringify(resolved);
if (/photo-metadata|internalNote|participant photograph metadata/i.test(renderedText)) {
  failures.push("Resolved public citation output exposes a protected locator or participant-photo source");
}

if (failures.length) {
  console.error("Citation check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

if (result.warnings.length) {
  console.warn("Citation warnings:");
  result.warnings.forEach((warning) => console.warn(`- ${warning}`));
}

console.log(
  `Citation check passed for ${bundle.sources.length} sources, ${bundle.assertions.length} assertions, ${bundle.evidence.length} evidence relationships, ${bundle.citationNotes.length} notes, ${bundle.corrections.length} corrections, and ${bundle.pages.length} page.`
);
