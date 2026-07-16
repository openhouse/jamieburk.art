import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const suitePath = path.join(repoRoot, "evals/launch-readiness/v23/evals.json");
const mapPath = path.join(repoRoot, "evals/launch-readiness/v23/blind-spots.json");

const expectedBlindSpotIds = [
  "BLIND-SELECTION",
  "BLIND-AUDIENCE",
  "BLIND-HUMAN-READER",
  "BLIND-VISUAL-PROOF",
  "BLIND-ARCHIVE-BIAS",
  "BLIND-CONSEQUENCE",
  "BLIND-CURRENT-RELEVANCE",
  "BLIND-COLLABORATOR-TRUTH",
  "BLIND-RUBRIC-OVERFITTING",
  "BLIND-MAINTAINABILITY",
  "BLIND-HUMAN-APPROVAL"
];

const requiredCriterionIds = [
  "BLINDSPOT-001",
  "SELECT-001",
  "READER-001",
  "PROOF-001",
  "ARCHBIAS-001",
  "CONSEQUENCE-001",
  "CURRENT-001",
  "COLLAB-001",
  "HOLDOUT-001",
  "MAINTAIN-001",
  "APPLICATION-001",
  "APPROVAL-001"
];

const allowedObservers = new Set(["deterministic", "browser", "semantic", "runtime", "human"]);
const allowedStates = new Set(["prepared", "human-required", "rights-required", "runtime-required"]);

function parseJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

export function validateBlindSpotEvals() {
  const errors = [];
  const suite = parseJson(suitePath);
  const map = parseJson(mapPath);
  const criteriaById = new Map(suite.criteria.map((criterion) => [criterion.id, criterion]));
  const entriesById = new Map();

  if (map.suiteVersion !== suite.version) {
    errors.push(`blind-spot map version ${map.suiteVersion} does not match suite version ${suite.version}`);
  }

  for (const criterionId of requiredCriterionIds) {
    if (!criteriaById.has(criterionId)) errors.push(`missing required blind-spot criterion ${criterionId}`);
  }

  for (const entry of map.blindSpots ?? []) {
    if (entriesById.has(entry.id)) errors.push(`duplicate blind-spot ID ${entry.id}`);
    entriesById.set(entry.id, entry);

    for (const field of ["label", "risk", "failureSignal", "nextEvidence", "stopBoundary"]) {
      if (typeof entry[field] !== "string" || entry[field].length < 24) {
        errors.push(`${entry.id} needs a specific ${field}`);
      }
    }

    if (!Array.isArray(entry.criterionIds) || entry.criterionIds.length === 0) {
      errors.push(`${entry.id} must map to at least one criterion`);
    }
    for (const criterionId of entry.criterionIds ?? []) {
      if (!criteriaById.has(criterionId)) errors.push(`${entry.id} references unknown criterion ${criterionId}`);
    }

    if (!allowedObservers.has(entry.requiredObserver)) {
      errors.push(`${entry.id} has invalid requiredObserver ${entry.requiredObserver}`);
    }
    if (!allowedStates.has(entry.currentState)) {
      errors.push(`${entry.id} has invalid currentState ${entry.currentState}`);
    }
    if (/\b(?:passed|resolved|approved|cleared)\b/i.test(entry.currentState)) {
      errors.push(`${entry.id} may not self-certify resolution in the coverage map`);
    }

    const mappedLayers = new Set(
      (entry.criterionIds ?? [])
        .map((criterionId) => criteriaById.get(criterionId)?.layer)
        .filter(Boolean)
    );
    if (entry.requiredObserver === "human" && !mappedLayers.has("human")) {
      errors.push(`${entry.id} requires a human observer but has no human-layer criterion`);
    }
    if (entry.requiredObserver === "browser" && !mappedLayers.has("browser")) {
      errors.push(`${entry.id} requires a browser observer but has no browser-layer criterion`);
    }
    if (entry.requiredObserver === "semantic" && !mappedLayers.has("semantic")) {
      errors.push(`${entry.id} requires a semantic observer but has no semantic-layer criterion`);
    }
  }

  for (const expectedId of expectedBlindSpotIds) {
    if (!entriesById.has(expectedId)) errors.push(`missing blind-spot coverage entry ${expectedId}`);
  }
  if (entriesById.size !== expectedBlindSpotIds.length) {
    errors.push(`expected ${expectedBlindSpotIds.length} blind-spot entries; found ${entriesById.size}`);
  }

  if (!Array.isArray(map.protocolFiles) || map.protocolFiles.length < 8) {
    errors.push("blind-spot map needs the complete protocol file set");
  }
  for (const relativePath of map.protocolFiles ?? []) {
    if (typeof relativePath !== "string" || !relativePath.startsWith("evals/launch-readiness/v23/")) {
      errors.push(`invalid blind-spot protocol path ${relativePath}`);
      continue;
    }
    if (!existsSync(path.join(repoRoot, relativePath))) {
      errors.push(`missing blind-spot protocol file ${relativePath}`);
    }
  }

  const humanOrRightsEntries = (map.blindSpots ?? []).filter((entry) =>
    entry.currentState === "human-required" || entry.currentState === "rights-required"
  );
  if (humanOrRightsEntries.length < 5) {
    errors.push("human and rights stop boundaries are underrepresented");
  }
  if (humanOrRightsEntries.some((entry) => !/\b(?:agent|rights|permission|approval|human|people|person)\b/i.test(entry.stopBoundary))) {
    errors.push("every human or rights blind spot needs an explicit non-agent stop boundary");
  }

  return {
    passed: errors.length === 0,
    errors,
    evidence: errors.length === 0
      ? `${expectedBlindSpotIds.length} blind spots map to current criteria, observers, failure signals, next evidence, and stop boundaries; ${map.protocolFiles.length} protocol files resolve.`
      : "Blind-spot coverage validation failed."
  };
}
