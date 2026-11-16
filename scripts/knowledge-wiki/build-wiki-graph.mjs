#!/usr/bin/env node

import { compileWiki, writeGeneratedOutputs } from "./lib.mjs";
import { syncPublicPackets } from "../sync-opportunity-packets.mjs";

const result = compileWiki();
writeGeneratedOutputs(result, "graph");
syncPublicPackets(result);

console.log(
  `Wiki graph generated: ${result.graph.nodes.length} nodes, ${result.graph.edges.length} edges, ${result.graph.documentLinks.length} prose links.`
);

if (result.errors.length) {
  console.error(`Graph source has ${result.errors.length} blocking issue(s); run npm run wiki:check.`);
  process.exitCode = 1;
}
