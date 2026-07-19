#!/usr/bin/env node

import path from "node:path";
import { generatedRoot, loadKnowledgeWiki, repoRoot, writeGeneratedArtifacts } from "./lib/knowledge-wiki.mjs";

const wiki = loadKnowledgeWiki({ failOnErrors: true, allowMissingGenerated: true });
const files = writeGeneratedArtifacts(wiki);

console.log(`Generated ${files.length} Knowledge Wiki artifacts:`);
for (const file of files) console.log(`- ${path.relative(repoRoot, file)}`);
console.log(`Source fingerprint: ${wiki.graph.sourceFingerprint}`);
console.log(`Output root: ${path.relative(repoRoot, generatedRoot)}`);
