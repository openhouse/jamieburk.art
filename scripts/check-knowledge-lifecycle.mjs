#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { intakeAmendmentSchema, intakeReceiptSchema } from "../apps/www/src/data/knowledge-bank/lifecycle-schema.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { validateAppendOnlyGitHistory } from "./lib/append-only-history.mjs";
import { integrityArtifactPaths, validateIntegrityCheckpoints, validateRetirementLedger } from "./lib/knowledge-integrity-validation.mjs";
import { knowledgeLifecycleReport, validateIntakeReceipts, validateKnowledgeLifecycle } from "./lib/knowledge-lifecycle-validation.mjs";
import { renderProjectionMap } from "./lib/projection-map.mjs";
import { validateWowListFacebookAcquisition } from "./lib/wowlist-facebook-acquisition-validation.mjs";

const receipts = readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8").split("\n").filter(Boolean).map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
const amendments = readFileSync("docs/knowledge-bank/intake/amendments.jsonl", "utf8").split("\n").filter(Boolean).map((line) => intakeAmendmentSchema.parse(JSON.parse(line)));
const retirementPath = "docs/knowledge-bank/governance/retirements.jsonl";
const checkpointPath = "docs/knowledge-bank/governance/integrity-checkpoints.jsonl";
const acquisitionPath = "docs/knowledge-bank/corpora/wowlist-facebook-posts-acquisition-manifest.json";
const facebookFixturePath = "apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json";
const retirements = readFileSync(retirementPath, "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line));
const checkpoints = readFileSync(checkpointPath, "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line));
const artifactTexts = Object.fromEntries(integrityArtifactPaths.map((path) => [path, readFileSync(path, "utf8")]));
const acquisitionManifest = JSON.parse(readFileSync(acquisitionPath, "utf8"));
const facebookFixture = JSON.parse(readFileSync(facebookFixturePath, "utf8"));
const failures = [
  ...validateKnowledgeLifecycle(),
  ...validateIntakeReceipts(receipts, undefined, amendments),
  ...validateRetirementLedger(retirements, knowledgeLifecycle, knowledgeBank),
  ...validateIntegrityCheckpoints(checkpoints, artifactTexts),
  ...validateWowListFacebookAcquisition(acquisitionManifest, facebookFixture),
  ...[...integrityArtifactPaths, checkpointPath].flatMap((path) => validateAppendOnlyGitHistory(path)),
];
if (readFileSync("docs/knowledge-bank/projection-map.md", "utf8") !== renderProjectionMap()) {
  failures.push("Projection map is stale; run npm run generate:projection-map");
}
if (failures.length) {
  console.error("Knowledge lifecycle check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Knowledge lifecycle check passed:");
console.log(JSON.stringify(knowledgeLifecycleReport(), null, 2));
