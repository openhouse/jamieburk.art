#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  validateDonorInventory,
  validateDonorBehaviors,
  validateHumanStatus,
  validateIntegrationLedger,
  validatePackageContract,
  validatePlanningMaps,
  validateRubricLock,
  validateWorkflow
} from "./lib/composite-readiness.mjs";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));
const requiredFiles = [
  ".github/workflows/portfolio-readiness.yml",
  "docs/evals/artistic-continuity-map.md",
  "docs/evals/outcome-transfer-matrix.md",
  "docs/evals/recent-capability-map.md",
  "docs/evals/release-status.md",
  "docs/qa/feature-knowledge-k/baseline.md",
  "docs/qa/feature-knowledge-k/composite-integration-ledger.md",
  "evals/composite-readiness/README.md",
  "evals/composite-readiness/donor-inventory.json",
  "evals/composite-readiness/donor-behaviors.json",
  "evals/composite-readiness/human-status.json",
  "evals/composite-readiness/judge-prompt.md",
  "evals/composite-readiness/rubric-lock.json",
  "evals/composite-readiness/rubric.json",
  "evals/composite-readiness/scorecard.schema.json",
  "scripts/tests/composite-readiness.test.mjs"
];

const failures = [];
for (const relativePath of requiredFiles) {
  if (!existsSync(path.join(repoRoot, relativePath))) failures.push(`Missing ${relativePath}.`);
}

if (failures.length === 0) {
  const inventory = readJson("evals/composite-readiness/donor-inventory.json");
  const donorBehaviors = readJson("evals/composite-readiness/donor-behaviors.json");
  const humanStatus = readJson("evals/composite-readiness/human-status.json");
  const rubricText = read("evals/composite-readiness/rubric.json");
  failures.push(
    ...validateDonorInventory(inventory),
    ...validateDonorBehaviors(donorBehaviors, inventory, {
      readCurrentEvidence: read,
      resolveDonorBlob: (revision, donorPath) => execFileSync(
        "git",
        ["rev-parse", `${revision}:${donorPath}`],
        { cwd: repoRoot, encoding: "utf8" }
      ).trim()
    }),
    ...validateHumanStatus(humanStatus),
    ...validateIntegrationLedger(
      read("docs/qa/feature-knowledge-k/composite-integration-ledger.md"),
      inventory
    ),
    ...validatePackageContract(readJson("package.json")),
    ...validateWorkflow(read(".github/workflows/portfolio-readiness.yml")),
    ...validateRubricLock(
      readJson("evals/composite-readiness/rubric-lock.json"),
      rubricText
    ),
    ...validatePlanningMaps(
      {
        recentCapability: read("docs/evals/recent-capability-map.md"),
        outcomeTransfer: read("docs/evals/outcome-transfer-matrix.md"),
        artisticContinuity: read("docs/evals/artistic-continuity-map.md"),
        releaseStatus: read("docs/evals/release-status.md")
      },
      new Set(knowledgeLifecycle.projects.map(({ id }) => id))
    )
  );
}

if (failures.length > 0) {
  console.error("Composite readiness failures:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Composite readiness governance: 100/100");
console.log("- Frozen donors dispositioned: 14/14");
console.log("- Frozen donor artifacts and current behavior assertions: 14/14");
console.log("- False human or external closures: 0");
console.log("- Rubric lock: current");
console.log("- Planning maps: 4/4");
console.log("- CI and root-check wiring: present");
console.log("Composite readiness criterion met; semantic and human stop conditions remain separate.");
