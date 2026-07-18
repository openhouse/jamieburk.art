#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { compileKnowledgeWiki, reportsRoot, serializeBacklinks, serializeGraph } from "./lib.mjs";

const compiled = compileKnowledgeWiki();
mkdirSync(reportsRoot, { recursive: true });
writeFileSync(path.join(reportsRoot, "wiki-graph.json"), serializeGraph(compiled));
writeFileSync(path.join(reportsRoot, "wiki-backlinks.json"), serializeBacklinks(compiled));
console.log(`Knowledge Wiki graph: ${compiled.graph.nodes.length} nodes, ${compiled.graph.edges.length} edges, ${compiled.health.errors.length} errors.`);
if (compiled.health.errors.length) process.exitCode = 1;
