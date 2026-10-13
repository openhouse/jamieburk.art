#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import { validateNamedReaderAcceptance } from "./named-reader-acceptance-lib.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
let requirePass = false;
let expectedOrigin;
for (let index = 0; index < args.length; index += 1) {
  if (args[index] === "--require-pass") {
    requirePass = true;
  } else if (args[index] === "--expected-origin") {
    const value = args[++index];
    if (!value || value.startsWith("--")) {
      console.error("--expected-origin requires an HTTPS origin.");
      process.exit(1);
    }
    expectedOrigin = value;
  } else if (args[index].startsWith("--expected-origin=")) {
    expectedOrigin = args[index].slice("--expected-origin=".length);
  } else {
    console.error("Unknown argument. Use --require-pass and --expected-origin <https://host>.");
    process.exit(1);
  }
}
const result = validateNamedReaderAcceptance(repoRoot, { expectedOrigin });

if (result.issues.length) {
  for (const issue of result.issues) console.error(`- ${issue}`);
  process.exit(1);
}

const { overall, passedPairCount, requiredPairCount, availabilityGate, gatePassed } = result.summary;
console.log(
  `Named public-reader acceptance: ${overall.toUpperCase()} (${passedPairCount}/${requiredPairCount}); availability ${availabilityGate}.`
);
console.log(
  `Receipt binding: ${result.currentness.status.toUpperCase()}; ` +
    `current-candidate gate ${gatePassed ? "PASS" : "FAIL"}` +
    (result.currentness.reasons.length ? `; ${result.currentness.reasons.join("; ")}.` : ".")
);

if (requirePass && !gatePassed) process.exit(1);
