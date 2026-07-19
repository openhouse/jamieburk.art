#!/usr/bin/env node

import path from "node:path";
import { writeFileSync } from "node:fs";

import { compileWiki, formatFailures, REPO_ROOT } from "./lib.mjs";

const result = compileWiki();
if (result.health.hardFailures.length) {
  console.error("Wiki graph was not written because hard failures remain:");
  for (const line of formatFailures(result.health.hardFailures)) console.error(`- ${line}`);
  process.exit(1);
}

const output = path.join(REPO_ROOT, "reports/wiki-graph.json");
writeFileSync(output, `${JSON.stringify(result.graph, null, 2)}\n`);
console.log(`Wrote reports/wiki-graph.json with ${result.graph.nodes.length} nodes and ${result.graph.edges.length} edges.`);
