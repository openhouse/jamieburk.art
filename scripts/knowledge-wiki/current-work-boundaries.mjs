#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const records = [
  ["docs/knowledge-bank/sources/action-lab-prepublication-review-2026-07.md", "summary-only"],
  ["docs/knowledge-bank/sources/crs-speech-rehearsal-2026-07.md", "prohibited-until-delivered-and-reviewed"],
  ["docs/knowledge-bank/sources/pre-launch-peer-review-2026-07.md", "summary-only"],
];

export function validateCurrentWorkBoundaries() {
  const failures = [];

  for (const [relativePath, useState] of records) {
    const source = fs.readFileSync(path.join(root, relativePath), "utf8");
    if (!source.includes(`public_use_status: ${useState}`)) failures.push(`${relativePath}: incorrect use state`);
    if (!source.includes("projection:\n  status: hold")) failures.push(`${relativePath}: projection hold missing`);
    if (!source.includes("opaque_locator: vault.")) failures.push(`${relativePath}: opaque locator missing`);
    if (/\/(Users|Volumes|private)\//.test(source)) failures.push(`${relativePath}: local absolute path leaked`);
    if (/\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/.test(source)) failures.push(`${relativePath}: telephone-like string leaked`);
  }

  const rehearsal = fs.readFileSync(path.join(root, records[1][0]), "utf8");
  if (!rehearsal.includes("Do not publish, quote, score as delivered testimony")) {
    failures.push(`${records[1][0]}: undelivered-speech boundary missing`);
  }

  return failures;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const failures = validateCurrentWorkBoundaries();
  if (failures.length) {
    console.error("Current-work boundaries FAIL");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(`Current-work boundaries PASS: ${records.length} protected source states.`);
}
