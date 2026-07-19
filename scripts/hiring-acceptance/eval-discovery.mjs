#!/usr/bin/env node

import { loadHiringContext, runTitleBlindDiscovery, writeArtifact } from "./lib.mjs";

const result = runTitleBlindDiscovery(loadHiringContext());
writeArtifact("opportunity-discovery.json", result);
console.log(`Title-blind top-K recall: ${result.recall}`);
console.log(`Top K: ${result.topK.join(", ")}`);
console.log(`Eligible decoys rejected: ${result.decoysRejected}`);
console.log(`Incompatible controls rejected: ${result.negativeControlsRejected}`);
if (!result.passed) {
  console.error(result.reason);
  process.exit(1);
}
