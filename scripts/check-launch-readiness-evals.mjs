#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateBlindSpotEvals } from "./lib/blind-spot-eval-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const suitePath = path.join(repoRoot, "evals/launch-readiness/v23/evals.json");
const suite = JSON.parse(readFileSync(suitePath, "utf8"));
const failures = [];

function requireValue(condition, message) {
  if (!condition) failures.push(message);
}

requireValue(suite.suite === "jamieburk-art-launch-readiness", "unexpected suite name");
requireValue(Number.isInteger(suite.version) && suite.version > 0, "version must be a positive integer");
requireValue(Array.isArray(suite.criteria) && suite.criteria.length > 0, "criteria must be non-empty");
requireValue(Array.isArray(suite.protectedInvariants) && suite.protectedInvariants.length >= 5, "protected invariants are incomplete");
requireValue(Array.isArray(suite.optimizationOrder) && suite.optimizationOrder.length === 4, "optimization order must be explicit");

const ids = new Set();
const allowedLayers = new Set(["deterministic", "browser", "semantic", "runtime", "human"]);
const allowedGates = new Set(["hard", "scored"]);
let scoredWeight = 0;

for (const criterion of suite.criteria ?? []) {
  requireValue(typeof criterion.id === "string" && /^[A-Z][A-Z0-9]+-\d{3}$/.test(criterion.id), `invalid criterion id: ${criterion.id}`);
  requireValue(!ids.has(criterion.id), `duplicate criterion id: ${criterion.id}`);
  ids.add(criterion.id);

  requireValue(allowedLayers.has(criterion.layer), `${criterion.id} has invalid layer`);
  requireValue(allowedGates.has(criterion.gate), `${criterion.id} has invalid gate`);
  requireValue(typeof criterion.intent === "string" && criterion.intent.length >= 24, `${criterion.id} needs a specific intent`);
  requireValue(typeof criterion.passCondition === "string" && criterion.passCondition.length >= 32, `${criterion.id} needs a measurable pass condition`);
  requireValue(Array.isArray(criterion.evidence) && criterion.evidence.length > 0, `${criterion.id} needs evidence requirements`);
  requireValue(Array.isArray(criterion.antiGaming) && criterion.antiGaming.length >= 2, `${criterion.id} needs anti-gaming rules`);

  if (criterion.gate === "hard") {
    requireValue(criterion.weight === 0, `${criterion.id} hard gates must not be traded through weighting`);
  } else {
    requireValue(typeof criterion.weight === "number" && criterion.weight > 0, `${criterion.id} needs positive weight`);
    requireValue(criterion.rubric && criterion.rubric["0"] && criterion.rubric["0.8"] && criterion.rubric["1"], `${criterion.id} needs 0, 0.8, and 1 rubric anchors`);
    scoredWeight += criterion.weight;
  }

  if (criterion.layer === "human") {
    requireValue(criterion.antiGaming.some((rule) => /agent|human|consent|approval/i.test(rule)), `${criterion.id} must prevent agent self-approval`);
  }
}

requireValue(Math.abs(scoredWeight - 1) < 1e-9, `scored criterion weights must total 1; received ${scoredWeight}`);
requireValue(suite.target?.hardGatePolicy === "all-pass", "hard gates must use all-pass policy");
requireValue(suite.target?.minimumScoredCriterion >= 0.8, "minimum scored criterion must be at least 0.8");
requireValue(suite.target?.minimumWeightedScore >= 0.9, "minimum weighted score must be at least 0.9");
requireValue(suite.target?.requiredConsecutivePassingRuns >= 2, "at least two passing runs are required");
requireValue(suite.target?.requiredIndependentSemanticGraders >= 2, "at least two semantic graders are required");

for (const key of ["unitOfChange", "acceptWhen", "rejectWhen", "stopWhen"]) {
  requireValue(suite.hillClimb?.[key], `hillClimb.${key} is required`);
}

const blindSpotValidation = validateBlindSpotEvals();
for (const error of blindSpotValidation.errors) failures.push(`blind spots: ${error}`);

if (failures.length) {
  console.error("Launch-readiness eval contract failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Launch-readiness eval contract passed: ${suite.criteria.length} criteria, ${suite.protectedInvariants.length} protected invariants.`);
console.log(blindSpotValidation.evidence);
