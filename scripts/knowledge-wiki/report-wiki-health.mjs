#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { compileKnowledgeWiki, reportsRoot, serializeHealthJson, serializeHealthMarkdown } from "./lib.mjs";

const compiled = compileKnowledgeWiki();
mkdirSync(reportsRoot, { recursive: true });
writeFileSync(path.join(reportsRoot, "wiki-health.json"), serializeHealthJson(compiled));
writeFileSync(path.join(reportsRoot, "wiki-health.md"), serializeHealthMarkdown(compiled));
console.log(`Knowledge Wiki health: ${compiled.health.status}; ${compiled.health.errors.length} errors, ${compiled.health.warnings.length} warnings.`);
if (compiled.health.errors.length) process.exitCode = 1;
