#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

const [manifestInput, artifactInput, extractionInput] = process.argv.slice(2);

if (!manifestInput || !artifactInput || !extractionInput) {
  console.error(
    "Usage: node scripts/verify-source-receipt.mjs <manifest.json> <source-artifact> <text-extraction>"
  );
  process.exit(2);
}

const manifestPath = path.resolve(manifestInput);
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const artifactSha256 = sha256File(path.resolve(artifactInput));
const extractionSha256 = sha256File(path.resolve(extractionInput));
const checks = [
  {
    label: "source artifact",
    actual: artifactSha256,
    expected: manifest.sourceArtifactSha256
  },
  {
    label: "text extraction",
    actual: extractionSha256,
    expected: manifest.sourceTextExtractionSha256
  }
];
const failures = checks.filter((check) => check.actual !== check.expected);

for (const check of checks) {
  console.log(`${check.label}: ${check.actual} ${check.actual === check.expected ? "PASS" : "FAIL"}`);
}

if (failures.length) {
  console.error(`Source receipt verification failed for: ${failures.map((item) => item.label).join(", ")}`);
  process.exit(1);
}

console.log(`Source receipt verified: ${manifest.sourceId}`);
