#!/usr/bin/env node

import { compileWiki, writeGeneratedOutputs } from "./lib.mjs";

const result = compileWiki();
writeGeneratedOutputs(result, "graph");

console.log(
  `Wiki graph generated: ${result.graph.nodes.length} nodes, ${result.graph.edges.length} edges, ${result.graph.documentLinks.length} prose links.`
);

if (result.errors.length) {
  console.error(`Graph source has ${result.errors.length} blocking issue(s); run npm run wiki:check.`);
  process.exitCode = 1;
}
