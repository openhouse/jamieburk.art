#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import { validateNamedReaderAcceptance } from "./named-reader-acceptance-lib.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const requirePass = process.argv.includes("--require-pass");
const result = validateNamedReaderAcceptance(repoRoot);

if (result.issues.length) {
  for (const issue of result.issues) console.error(`- ${issue}`);
  process.exit(1);
}

const { overall, passedPairCount, requiredPairCount, availabilityGate } = result.summary;
console.log(
  `Named public-reader acceptance: ${overall.toUpperCase()} (${passedPairCount}/${requiredPairCount}); availability ${availabilityGate}.`
);

if (requirePass && overall !== "pass") process.exit(1);
