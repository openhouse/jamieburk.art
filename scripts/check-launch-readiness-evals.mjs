#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateBlindSpotEvals } from "./lib/blind-spot-eval-validation.mjs";
import { loadLaunchReadinessSuite } from "./lib/launch-readiness-contract.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const versionIndex = args.indexOf("--version");
const requestedVersion = versionIndex >= 0 ? Number(args[versionIndex + 1]) : undefined;
const { suite, active, fingerprint } = loadLaunchReadinessSuite(repoRoot, requestedVersion);
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

if (suite.version >= 24) {
  requireValue(active.version === suite.version, "v24+ contract must be the active suite");
  requireValue(suite.contractPolicy?.candidateBinding === "exact-current-git-sha", "candidate binding must use the exact current Git SHA");
  requireValue(suite.contractPolicy?.contractBinding === "sha256-canonical-suite", "contract binding must use the canonical suite fingerprint");
  requireValue(suite.contractPolicy?.invalidEvidencePolicy === "fail-closed", "invalid observation evidence must fail closed");
  requireValue(/^sha256:[a-f0-9]{64}$/.test(fingerprint), "contract fingerprint must be SHA-256");

  const allowedDomains = new Set([
    "accuracy-and-public-safety",
    "knowledge-lifecycle",
    "archival-production",
    "evaluation-integrity",
    "experience-and-accessibility",
    "narrative-and-positioning",
    "human-and-social-truth",
    "release"
  ]);
  const mappedCriterionIds = [];
  for (const [domain, criterionIds] of Object.entries(suite.criterionDomains ?? {})) {
    requireValue(allowedDomains.has(domain), `unknown criterion domain ${domain}`);
    requireValue(Array.isArray(criterionIds) && criterionIds.length > 0, `${domain} must map criteria`);
    mappedCriterionIds.push(...criterionIds);
  }
  requireValue(mappedCriterionIds.length === suite.criteria.length, "criterion domains must map every criterion exactly once");
  requireValue(new Set(mappedCriterionIds).size === mappedCriterionIds.length, "criterion domains contain duplicate mappings");
  for (const criterion of suite.criteria) {
    requireValue(mappedCriterionIds.includes(criterion.id), `${criterion.id} is missing a criterion domain`);
  }

  for (const [layer, graderType] of Object.entries({
    browser: "browser",
    semantic: "llm",
    runtime: "runtime",
    human: "human"
  })) {
    requireValue(suite.observerPolicy?.[layer]?.graderType === graderType, `${layer} observer policy requires grader type ${graderType}`);
  }
  requireValue(suite.observerPolicy?.semantic?.independentOfOptimizer === true, "semantic observers must be independent of the optimizer");
  requireValue(suite.observerPolicy?.human?.independentOfOptimizer === true, "human observers must be independent of the optimizer");
  requireValue(suite.observerPolicy?.human?.isAgent === false, "human observers must be non-agent people");
  requireValue(ids.has("EVALSYS-001"), "v24 requires EVALSYS-001");
  requireValue(ids.has("KNOWOPS-001"), "v24 requires KNOWOPS-001");
}

for (const key of ["unitOfChange", "acceptWhen", "rejectWhen", "stopWhen"]) {
  requireValue(suite.hillClimb?.[key], `hillClimb.${key} is required`);
}

const blindSpotValidation = validateBlindSpotEvals({ version: suite.version });
for (const error of blindSpotValidation.errors) failures.push(`blind spots: ${error}`);

if (failures.length) {
  console.error("Launch-readiness eval contract failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Launch-readiness eval contract passed: v${suite.version}, ${suite.criteria.length} criteria, ${suite.protectedInvariants.length} protected invariants, ${fingerprint}.`);
console.log(blindSpotValidation.evidence);
