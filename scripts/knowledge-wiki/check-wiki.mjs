#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  compileKnowledgeWiki,
  reportsRoot,
  serializeBacklinks,
  serializeGraph,
  serializeHealthJson,
  serializeHealthMarkdown,
} from "./lib.mjs";

const compiled = compileKnowledgeWiki();
const expected = new Map([
  ["wiki-graph.json", serializeGraph(compiled)],
  ["wiki-backlinks.json", serializeBacklinks(compiled)],
  ["wiki-health.json", serializeHealthJson(compiled)],
  ["wiki-health.md", serializeHealthMarkdown(compiled)],
]);
for (const [file, contents] of expected) {
  const absolute = path.join(reportsRoot, file);
  if (!existsSync(absolute)) compiled.health.errors.push({ code: "missing-generated-report", message: `Run npm run wiki:report to create reports/${file}` });
  else if (readFileSync(absolute, "utf8") !== contents) compiled.health.errors.push({ code: "stale-generated-report", message: `Run npm run wiki:report to refresh reports/${file}` });
}

if (compiled.health.errors.length) {
  for (const error of compiled.health.errors) console.error(`ERROR ${error.code}${error.file ? ` (${error.file})` : ""}: ${error.message}`);
  process.exitCode = 1;
} else {
  console.log(`Knowledge Wiki check passed: ${compiled.health.counts.authored_pages} authored pages, ${compiled.graph.nodes.length} graph nodes, ${compiled.health.counts.wanted_pages} wanted page.`);
}
