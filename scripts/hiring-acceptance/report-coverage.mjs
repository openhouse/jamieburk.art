#!/usr/bin/env node

import { loadHiringContext, writeCoverageArtifacts } from "./lib.mjs";

const result = writeCoverageArtifacts(loadHiringContext());
console.log(`Wrote ${result.paths.length} generated coverage artifacts.`);
for (const path of result.paths) console.log(`- ${path}`);
