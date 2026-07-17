import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const EXPECTED_GRADER_TYPE = {
  browser: "browser",
  semantic: "llm",
  runtime: "runtime",
  human: "human"
};

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalize(value[key])])
    );
  }
  return value;
}

export function contractFingerprint(suite) {
  const payload = JSON.stringify(canonicalize(suite));
  return `sha256:${createHash("sha256").update(payload).digest("hex")}`;
}

export function readActiveLaunchReadiness(repoRoot) {
  const pointerPath = path.join(repoRoot, "evals/launch-readiness/active.json");
  const pointer = JSON.parse(readFileSync(pointerPath, "utf8"));
  if (!Number.isInteger(pointer.version) || pointer.version < 1) {
    throw new Error("Launch-readiness active version must be a positive integer");
  }
  const expectedPath = `evals/launch-readiness/v${pointer.version}/evals.json`;
  if (pointer.path !== expectedPath) {
    throw new Error(`Launch-readiness active path must be ${expectedPath}`);
  }
  return pointer;
}

export function loadLaunchReadinessSuite(repoRoot, requestedVersion) {
  const active = readActiveLaunchReadiness(repoRoot);
  const version = requestedVersion ?? active.version;
  if (!Number.isInteger(version) || version < 1) {
    throw new Error("Requested launch-readiness version must be a positive integer");
  }
  const relativePath = version === active.version
    ? active.path
    : `evals/launch-readiness/v${version}/evals.json`;
  const suite = JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
  if (suite.version !== version) {
    throw new Error(`${relativePath} declares version ${suite.version}, expected ${version}`);
  }
  return {
    active,
    suite,
    version,
    relativePath,
    fingerprint: contractFingerprint(suite)
  };
}

export function currentGitCommit(repoRoot) {
  return execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: repoRoot,
    encoding: "utf8"
  }).trim();
}

export function expectedGraderType(layer) {
  return EXPECTED_GRADER_TYPE[layer];
}

export function validateObservationMeta({
  meta,
  suite,
  fingerprint,
  currentCommit,
  label = "observation"
}) {
  const errors = [];
  const criteriaById = new Map(suite.criteria.map((criterion) => [criterion.id, criterion]));
  const resultKeys = new Set();

  if (meta.suite !== suite.suite) errors.push(`${label}: suite does not match`);
  if (meta.suiteVersion !== suite.version) errors.push(`${label}: suiteVersion does not match`);
  if (meta.contractFingerprint !== fingerprint) {
    errors.push(`${label}: contractFingerprint does not match the evaluated contract`);
  }
  if (!meta.runId || /replace-with/.test(meta.runId)) {
    errors.push(`${label}: runId is missing or placeholder`);
  }
  if (!/^[0-9a-f]{40}$/i.test(meta.commit ?? "")) {
    errors.push(`${label}: commit must be a full Git SHA`);
  } else if (meta.commit !== currentCommit) {
    errors.push(`${label}: commit ${meta.commit} does not match current HEAD ${currentCommit}`);
  }
  if (!Array.isArray(meta.results)) errors.push(`${label}: results must be an array`);

  for (const result of meta.results ?? []) {
    const criterion = criteriaById.get(result.criterionId);
    if (!criterion) {
      errors.push(`${label}: unknown criterion ${result.criterionId}`);
      continue;
    }
    if (criterion.layer === "deterministic") {
      errors.push(`${label}: deterministic criterion ${result.criterionId} may not be self-reported`);
    }
    if (typeof result.score !== "number" || result.score < 0 || result.score > 1) {
      errors.push(`${label}: ${result.criterionId} score must be between 0 and 1`);
    }
    if (typeof result.passed !== "boolean") {
      errors.push(`${label}: ${result.criterionId} passed must be boolean`);
    }
    if (!Array.isArray(result.evidence) || result.evidence.length === 0) {
      errors.push(`${label}: ${result.criterionId} needs visible evidence`);
    }

    const grader = result.grader ?? {};
    const expectedType = expectedGraderType(criterion.layer);
    if (grader.type !== expectedType) {
      errors.push(`${label}: ${result.criterionId} requires grader type ${expectedType}`);
    }
    if (!grader.identity || !grader.name || !grader.runId) {
      errors.push(`${label}: ${result.criterionId} needs grader identity, name, and runId`);
    }
    if (["semantic", "human"].includes(criterion.layer) && grader.independentOfOptimizer !== true) {
      errors.push(`${label}: ${result.criterionId} requires an observer independent of the optimizer`);
    }
    if (criterion.layer === "human" && grader.isAgent !== false) {
      errors.push(`${label}: ${result.criterionId} requires a non-agent human observer`);
    }

    const threshold = criterion.gate === "hard"
      ? 1
      : suite.target.minimumScoredCriterion;
    if (result.passed === true && Number(result.score) < threshold) {
      errors.push(`${label}: ${result.criterionId} cannot pass below ${threshold}`);
    }

    const resultKey = [result.criterionId, grader.identity, grader.runId].join(":");
    if (resultKeys.has(resultKey)) {
      errors.push(`${label}: duplicate observation result ${resultKey}`);
    }
    resultKeys.add(resultKey);
  }

  return errors;
}

export function indexObservations(observations) {
  const observedById = new Map();
  for (const result of observations) {
    const list = observedById.get(result.criterionId) ?? [];
    list.push(result);
    observedById.set(result.criterionId, list);
  }
  return observedById;
}

export function resolveCriterionObservation({ criterion, observedById, suite }) {
  const candidates = observedById.get(criterion.id) ?? [];
  if (!candidates.length) {
    return { score: null, passed: false, source: "unobserved", evidence: [] };
  }

  const expectedType = expectedGraderType(criterion.layer);
  const typedCandidates = candidates.filter((item) => item.grader?.type === expectedType);
  const requiredGraders = criterion.layer === "semantic"
    ? suite.target.requiredIndependentSemanticGraders
    : 1;
  const identities = new Set(typedCandidates.map((item) => item.grader?.identity));
  const runIds = new Set(typedCandidates.map((item) => item.grader?.runId));

  if (identities.size < requiredGraders || runIds.size < requiredGraders) {
    return {
      score: null,
      passed: false,
      source: "invalid-observation",
      evidence: [
        `${criterion.name} requires ${requiredGraders} independent ${expectedType} grader identity and run ID pair(s).`
      ]
    };
  }

  const score = Math.min(...typedCandidates.map((item) => Number(item.score)));
  const threshold = criterion.gate === "scored"
    ? suite.target.minimumScoredCriterion
    : 1;
  const passed = typedCandidates.every((item) => item.passed === true) && score >= threshold;
  return {
    score,
    passed,
    source: "observation",
    evidence: typedCandidates.flatMap((item) => item.evidence ?? [])
  };
}
