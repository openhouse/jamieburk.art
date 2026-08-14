#!/usr/bin/env node

import { evaluatePhotoKnowledge } from "./lib.mjs";

const privateBindingPath = process.argv[2];
if (!privateBindingPath) {
  console.error("Usage: node scripts/photo-knowledge/verify-private-binding.mjs <private-binding.json>");
  process.exit(2);
}

const { model } = await evaluatePhotoKnowledge(undefined, { privateBindingPath });
if (!model.privateBinding.passed) {
  console.error("Private source binding verification failed.");
  process.exit(1);
}

console.log("Private source binding verified without printing source identifiers, paths, or fingerprints.");
