import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const PRIVATE_PATTERN = /(?:\/Users\/|\/Volumes\/|file:\/\/|\.photoslibrary|Apple Photos Library|private\/tmp|raw-transcripts|otter-exports|legal-review|client-private)/i;
const HUMAN_STATES = new Set(["not-yet-measured", "scheduled", "observed", "passed", "failed", "not-required", "human-blocked"]);
const EVALUATION_CLASSES = new Set(["deterministic", "llm-judge", "human", "external-outcome", "hybrid"]);
const RECOMMENDATIONS = new Set(["iterate", "system-ready", "application-ready", "production-ready"]);
const SCORECARD_KEYS = ["version", "evalId", "runId", "round", "evaluatedAt", "evaluator", "candidate", "rubricDigest", "criteria", "releaseRecommendation", "unresolvedHumanChecks"];
const CRITERION_KEYS = ["id", "score", "confidence", "evidence", "hardGatePassed", "repair", "antiGamingCheck"];
const PROVENANCE_KEYS = ["version", "runId", "candidateRevision", "candidateDigest", "rubricDigest", "iterationBudget", "acceptedIteration", "decision", "iterations", "judgeSessions", "limitations"];
const JUDGE_SESSION_KEYS = ["round", "role", "artifact", "artifactSha256", "sessionId", "sessionMode", "generatorWasJudge", "orchestratedAt"];

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function stableStringify(value) {
  if (Array.isArray(value)) return "[" + value.map(stableStringify).join(",") + "]";
  if (value && typeof value === "object") {
    return "{" + Object.keys(value).sort().map(function (key) {
      return JSON.stringify(key) + ":" + stableStringify(value[key]);
    }).join(",") + "}";
  }
  return JSON.stringify(value);
}

export function digestJson(value) {
  return sha256(stableStringify(value));
}

export function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function execGit(repoRoot, args, options) {
  const result = spawnSync("git", args, Object.assign({ cwd: repoRoot }, options || {}));
  if (result.status !== 0) {
    throw new Error("git " + args.join(" ") + " failed: " + String(result.stderr || "").trim());
  }
  return result.stdout;
}

function listCurrentFiles(root, candidatePaths) {
  const files = [];
  function walk(absolutePath) {
    const stat = statSync(absolutePath);
    if (stat.isDirectory()) {
      for (const entry of readdirSync(absolutePath).sort()) walk(path.join(absolutePath, entry));
      return;
    }
    files.push(path.relative(root, absolutePath).split(path.sep).join("/"));
  }
  for (const relativePath of candidatePaths) {
    const absolutePath = path.join(root, relativePath);
    if (!existsSync(absolutePath)) throw new Error("Candidate path is missing: " + relativePath);
    walk(absolutePath);
  }
  return Array.from(new Set(files)).sort();
}

function digestFiles(files, readContent) {
  const hash = createHash("sha256");
  for (const file of files.sort()) {
    hash.update(file);
    hash.update("\0");
    hash.update(readContent(file));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function candidateDigestAtRevision(repoRoot, rubric, revision) {
  const output = execGit(repoRoot, ["ls-tree", "-r", "--name-only", revision, "--"].concat(rubric.candidatePaths), { encoding: "utf8" });
  const files = output.split("\n").map(function (item) { return item.trim(); }).filter(Boolean).sort();
  if (!files.length) throw new Error("No candidate files found at " + revision);
  return digestFiles(files, function (file) {
    return execGit(repoRoot, ["show", revision + ":" + file]);
  });
}

export function currentCandidateDigest(repoRoot, rubric) {
  const files = listCurrentFiles(repoRoot, rubric.candidatePaths);
  return digestFiles(files, function (file) {
    return readFileSync(path.join(repoRoot, file));
  });
}

function pushIf(condition, failures, message) {
  if (condition) failures.push(message);
}

function exactKeys(value, keys, label, failures) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    failures.push(label + " must be an object");
    return;
  }
  const extras = Object.keys(value).filter(function (key) { return !keys.includes(key); });
  const missing = keys.filter(function (key) { return !(key in value); });
  if (extras.length) failures.push(label + " has unsupported keys: " + extras.join(", "));
  if (missing.length) failures.push(label + " lacks keys: " + missing.join(", "));
}

function validIsoDateTime(value) {
  if (typeof value !== "string") return false;
  const date = new Date(value);
  return !Number.isNaN(date.valueOf()) && date.toISOString() === value;
}

function unique(values) {
  return new Set(values).size === values.length;
}

function safeRelativePath(repoRoot, value) {
  if (typeof value !== "string" || !value.trim() || path.isAbsolute(value) || PRIVATE_PATTERN.test(value)) return false;
  const absolute = path.resolve(repoRoot, value);
  const relative = path.relative(repoRoot, absolute);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

export function validateRubric(rubric) {
  const failures = [];
  pushIf(rubric && rubric.version !== 1, failures, "Rubric version must be 1");
  pushIf(rubric && rubric.id !== "portfolio-readiness-composite-v1", failures, "Rubric ID is invalid");
  pushIf(!Array.isArray(rubric && rubric.candidatePaths) || rubric.candidatePaths.length === 0, failures, "Rubric needs candidate paths");
  pushIf((rubric && rubric.candidatePaths || []).some(function (item) {
    return typeof item !== "string" || path.isAbsolute(item) || PRIVATE_PATTERN.test(item);
  }), failures, "Candidate paths must be public-safe repository-relative paths");
  pushIf(!Array.isArray(rubric && rubric.domainSuites) || rubric.domainSuites.length === 0, failures, "Rubric needs domain suites");
  pushIf(!unique((rubric && rubric.domainSuites || []).map(function (item) { return item.id; })), failures, "Domain suite IDs must be unique");
  pushIf(!Array.isArray(rubric && rubric.criteria) || rubric.criteria.length !== 13, failures, "Rubric must contain 13 criteria");

  const criteria = rubric && rubric.criteria || [];
  const ids = criteria.map(function (item) { return item.id; });
  pushIf(!unique(ids), failures, "Criterion IDs must be unique");
  const totalWeight = criteria.reduce(function (sum, criterion) { return sum + (criterion.weight || 0); }, 0);
  pushIf(totalWeight !== 100, failures, "Criterion weights total " + totalWeight + ", expected 100");

  for (const criterion of criteria) {
    const label = "Criterion " + (criterion.id || "unknown");
    pushIf(!EVALUATION_CLASSES.has(criterion.evaluationClass), failures, label + " has invalid evaluationClass");
    pushIf(typeof criterion.machineScored !== "boolean", failures, label + " needs machineScored");
    pushIf(!Number.isInteger(criterion.weight) || criterion.weight <= 0, failures, label + " has invalid weight");
    pushIf(typeof criterion.hardGate !== "boolean", failures, label + " needs hardGate");
    pushIf(!Number.isInteger(criterion.threshold) || criterion.threshold < 1 || criterion.threshold > 5, failures, label + " has invalid threshold");
    for (const field of ["name", "description", "remediationGuidance", "owner"]) {
      pushIf(typeof criterion[field] !== "string" || !criterion[field].trim(), failures, label + " needs " + field);
    }
    for (const field of ["evidenceRequirements", "failureExamples"]) {
      pushIf(!Array.isArray(criterion[field]) || criterion[field].length === 0, failures, label + " needs " + field);
    }
    if (criterion.evaluationClass === "human" || criterion.evaluationClass === "external-outcome") {
      pushIf(criterion.machineScored, failures, label + " cannot be machine-scored");
    }
  }

  for (const profileName of ["system-ready", "application-ready", "production-ready"]) {
    const profile = rubric && rubric.profiles && rubric.profiles[profileName];
    pushIf(!profile, failures, "Missing profile " + profileName);
    pushIf(!Number.isInteger(profile && profile.minimumMachineWeightedScore) || profile.minimumMachineWeightedScore < 1 || profile.minimumMachineWeightedScore > 100, failures, profileName + " has invalid weighted threshold");
    pushIf(!Number.isInteger(profile && profile.minimumMachineCriterionScore) || profile.minimumMachineCriterionScore < 1 || profile.minimumMachineCriterionScore > 5, failures, profileName + " has invalid criterion threshold");
    pushIf(!Array.isArray(profile && profile.requiredHumanChecks), failures, profileName + " needs requiredHumanChecks");
  }

  const stop = rubric && rubric.stopPolicy;
  pushIf(stop && stop.requiredConsecutivePassingRounds !== 2, failures, "Stop policy must require two rounds");
  pushIf(stop && stop.requiredIndependentJudgesPerRound !== 2, failures, "Stop policy must require two judges per round");
  pushIf(!Number.isInteger(stop && stop.maxIterations) || stop.maxIterations < 1 || stop.maxIterations > 12, failures, "Stop policy maxIterations must be 1-12");
  pushIf(stop && stop.maxRegressions !== 0, failures, "Stop policy must reject regressions");
  pushIf(stop && stop.candidateAndRubricMustRemainStable !== true, failures, "Stop policy must freeze candidate and rubric");
  return failures;
}

export function validateHumanStatus(humanStatus, rubric) {
  const failures = [];
  pushIf(humanStatus && humanStatus.version !== 1, failures, "Human status version must be 1");
  pushIf(!Array.isArray(humanStatus && humanStatus.states) || humanStatus.states.length === 0, failures, "Human status needs states");
  const states = humanStatus && humanStatus.states || [];
  const stateIds = states.map(function (state) { return state.id; });
  pushIf(!unique(stateIds), failures, "Human status IDs must be unique");
  const criterionIds = new Set(rubric.criteria.map(function (criterion) { return criterion.id; }));

  for (const state of states) {
    const label = "Human status " + (state.id || "unknown");
    pushIf(!criterionIds.has(state.criterionId), failures, label + " references unknown criterion " + state.criterionId);
    pushIf(!HUMAN_STATES.has(state.state), failures, label + " has invalid state");
    pushIf(typeof state.owner !== "string" || !state.owner.trim(), failures, label + " needs owner");
    pushIf(typeof state.note !== "string" || !state.note.trim(), failures, label + " needs note");
    pushIf(!Array.isArray(state.publicSafeEvidence), failures, label + " needs publicSafeEvidence");
    pushIf((state.publicSafeEvidence || []).some(function (item) {
      return typeof item !== "string" || PRIVATE_PATTERN.test(item);
    }), failures, label + " exposes unsafe evidence");
    if (state.state === "passed") {
      pushIf(!state.reviewedAt, failures, label + " passed without reviewedAt");
      pushIf(!state.publicSafeEvidence.length, failures, label + " passed without public-safe evidence");
    }
    if (state.candidateDigest !== null) {
      pushIf(!/^[a-f0-9]{64}$/.test(state.candidateDigest || ""), failures, label + " candidateDigest is invalid");
    }
  }

  const knownStateIds = new Set(stateIds);
  for (const profileName of Object.keys(rubric.profiles)) {
    for (const id of rubric.profiles[profileName].requiredHumanChecks) {
      pushIf(!knownStateIds.has(id), failures, profileName + " references unknown human check " + id);
    }
  }
  return failures;
}

export function expectedUnresolvedHumanChecks(humanStatus) {
  return humanStatus.states
    .filter(function (state) { return !["passed", "not-required"].includes(state.state); })
    .map(function (state) { return state.id; })
    .sort();
}

function evidenceIsSafe(evidence) {
  return evidence &&
    typeof evidence.path === "string" &&
    evidence.path.trim() &&
    !PRIVATE_PATTERN.test(evidence.path) &&
    typeof evidence.observation === "string" &&
    evidence.observation.trim() &&
    !PRIVATE_PATTERN.test(evidence.observation);
}

export function validateScorecard(scorecard, context) {
  const rubric = context.rubric;
  const failures = [];
  exactKeys(scorecard, SCORECARD_KEYS, "Scorecard", failures);
  pushIf(scorecard && scorecard.version !== 1, failures, "Scorecard version must be 1");
  pushIf(scorecard && scorecard.evalId !== rubric.id, failures, "Scorecard evalId must be " + rubric.id);
  pushIf(scorecard && scorecard.runId !== context.runId, failures, "Scorecard runId must be " + context.runId);
  pushIf(!Number.isInteger(scorecard && scorecard.round) || scorecard.round < 1, failures, "Scorecard round is invalid");
  pushIf(!validIsoDateTime(scorecard && scorecard.evaluatedAt), failures, "Scorecard evaluatedAt must be canonical ISO");
  pushIf(scorecard && scorecard.evaluator && scorecard.evaluator.kind !== "llm-judge", failures, "Scorecard evaluator must be an LLM judge");
  pushIf(scorecard && scorecard.evaluator && scorecard.evaluator.independentFromAuthor !== true, failures, "Scorecard evaluator must be independent from author");
  pushIf(!["hiring-and-comprehension-judge", "evidence-and-systems-judge"].includes(scorecard && scorecard.evaluator && scorecard.evaluator.role), failures, "Scorecard evaluator role is invalid");
  for (const field of ["id", "role", "kind", "provider", "model", "sessionId"]) {
    pushIf(typeof (scorecard && scorecard.evaluator && scorecard.evaluator[field]) !== "string" || !scorecard.evaluator[field].trim(), failures, "Scorecard evaluator needs " + field);
  }
  pushIf(scorecard && scorecard.candidate && scorecard.candidate.revision !== context.revision, failures, "Scorecard revision is stale");
  pushIf(scorecard && scorecard.candidate && scorecard.candidate.digest !== context.candidateDigest, failures, "Scorecard candidate digest is stale");
  pushIf(scorecard && scorecard.rubricDigest !== context.rubricDigest, failures, "Scorecard rubric digest is stale");
  pushIf(!RECOMMENDATIONS.has(scorecard && scorecard.releaseRecommendation), failures, "Scorecard release recommendation is invalid");

  const expectedHuman = expectedUnresolvedHumanChecks(context.humanStatus);
  const actualHuman = Array.from(scorecard && scorecard.unresolvedHumanChecks || []).sort();
  pushIf(JSON.stringify(actualHuman) !== JSON.stringify(expectedHuman), failures, "Scorecard unresolved human checks are incomplete or stale");

  const entries = scorecard && scorecard.criteria || [];
  pushIf(!Array.isArray(entries) || entries.length !== rubric.criteria.length, failures, "Scorecard must contain " + rubric.criteria.length + " criteria");
  const byId = new Map(entries.map(function (entry) { return [entry.id, entry]; }));
  pushIf(byId.size !== entries.length, failures, "Scorecard criterion IDs must be unique");

  let weightedPoints = 0;
  let machineWeight = 0;
  const belowMinimum = [];
  const hardGateFailures = [];

  for (const criterion of rubric.criteria) {
    const entry = byId.get(criterion.id);
    if (!entry) {
      failures.push("Missing scorecard criterion " + criterion.id);
      continue;
    }
    exactKeys(entry, CRITERION_KEYS, "Scorecard criterion " + criterion.id, failures);
    pushIf(!["low", "medium", "high", "not-applicable"].includes(entry.confidence), failures, criterion.id + " has invalid confidence");
    pushIf(!Array.isArray(entry.evidence), failures, criterion.id + " evidence must be an array");
    pushIf((entry.evidence || []).some(function (item) { return !evidenceIsSafe(item); }), failures, criterion.id + " has unsafe or incomplete evidence");
    pushIf(typeof entry.repair !== "string" || !entry.repair.trim(), failures, criterion.id + " needs repair guidance");
    pushIf(typeof entry.antiGamingCheck !== "string" || !entry.antiGamingCheck.trim(), failures, criterion.id + " needs antiGamingCheck");

    if (criterion.machineScored) {
      pushIf(!Number.isInteger(entry.score) || entry.score < 1 || entry.score > 5, failures, criterion.id + " score must be 1-5");
      pushIf((entry.evidence || []).length < 2, failures, criterion.id + " needs at least two observations");
      pushIf(typeof entry.hardGatePassed !== "boolean", failures, criterion.id + " needs a boolean hardGatePassed");
      if (Number.isInteger(entry.score)) {
        machineWeight += criterion.weight;
        weightedPoints += (entry.score / 5) * criterion.weight;
        if (entry.score < criterion.threshold) belowMinimum.push(criterion.id);
      }
      if (criterion.hardGate && entry.hardGatePassed !== true) hardGateFailures.push(criterion.id);
    } else {
      pushIf(entry.score !== null, failures, criterion.id + " must defer its score to human review");
      pushIf(entry.hardGatePassed !== null, failures, criterion.id + " hardGatePassed must defer to human review");
      pushIf(entry.confidence !== "not-applicable", failures, criterion.id + " confidence must be not-applicable");
      pushIf((entry.evidence || []).length < 1, failures, criterion.id + " needs a human-status evidence pointer");
    }
  }

  const weightedScore = machineWeight > 0 ? Number(((weightedPoints / machineWeight) * 100).toFixed(1)) : 0;
  const profile = rubric.profiles["system-ready"];
  const thresholdPass = weightedScore >= profile.minimumMachineWeightedScore &&
    belowMinimum.length === 0 &&
    hardGateFailures.length === 0;
  if (scorecard && scorecard.releaseRecommendation === "system-ready" && !thresholdPass) {
    failures.push("System-ready recommendation does not meet machine thresholds");
  }
  if (scorecard && ["application-ready", "production-ready"].includes(scorecard.releaseRecommendation)) {
    failures.push("LLM scorecards cannot grant human-owned readiness states");
  }

  return {
    failures,
    weightedScore,
    belowMinimum,
    hardGateFailures,
    passed: failures.length === 0 && thresholdPass
  };
}

export function validateApplicationArgument(argument, proofIds) {
  const failures = [];
  pushIf(argument && argument.version !== 1, failures, "Application argument version must be 1");
  for (const field of ["id", "decision", "targetRole", "governingArgument", "primaryAction", "compositionRule"]) {
    pushIf(typeof (argument && argument[field]) !== "string" || !argument[field].trim(), failures, "Application argument needs " + field);
  }
  for (const field of ["audience", "primaryProofIds", "primaryRoutes", "deferredDepth", "antiArgument"]) {
    pushIf(!Array.isArray(argument && argument[field]) || argument[field].length === 0, failures, "Application argument needs " + field);
  }
  const known = new Set(proofIds);
  for (const id of argument && argument.primaryProofIds || []) {
    pushIf(!known.has(id), failures, "Application argument references unknown proof " + id);
  }
  pushIf(PRIVATE_PATTERN.test(stableStringify(argument)), failures, "Application argument exposes a private path");
  return failures;
}

export function validateDeterministicReceipt(receipt, context) {
  const failures = [];
  pushIf(receipt && receipt.version !== 1, failures, "Deterministic receipt version must be 1");
  pushIf(receipt && receipt.runId !== context.runId, failures, "Deterministic receipt runId is stale");
  pushIf(receipt && receipt.candidateRevision !== context.revision, failures, "Deterministic receipt revision is stale");
  pushIf(receipt && receipt.candidateDigest !== context.candidateDigest, failures, "Deterministic receipt candidate digest is stale");
  pushIf(receipt && receipt.rubricDigest !== context.rubricDigest, failures, "Deterministic receipt rubric digest is stale");
  pushIf(!validIsoDateTime(receipt && receipt.evaluatedAt), failures, "Deterministic receipt evaluatedAt is invalid");
  pushIf(!Array.isArray(receipt && receipt.commands), failures, "Deterministic receipt needs commands");
  const expected = context.rubric.domainSuites.map(function (suite) { return { id: suite.id, command: suite.command }; });
  const actual = (receipt && receipt.commands || []).map(function (command) { return { id: command.id, command: command.command }; });
  pushIf(JSON.stringify(actual) !== JSON.stringify(expected), failures, "Deterministic command inventory differs from rubric");
  for (const command of receipt && receipt.commands || []) {
    pushIf(command.outcome !== "passed", failures, command.id + " did not pass");
    pushIf(!Number.isInteger(command.exitCode) || command.exitCode !== 0, failures, command.id + " exit code is not zero");
    pushIf(!/^[a-f0-9]{64}$/.test(command.outputDigest || ""), failures, command.id + " output digest is invalid");
  }
  pushIf(typeof (receipt && receipt.environment && receipt.environment.node) !== "string" || !receipt.environment.node.startsWith("v26."), failures, "Deterministic receipt must use Node 26");
  return failures;
}

export function validateBrowserReceipt(receipt, context) {
  const failures = [];
  pushIf(receipt && receipt.version !== 1, failures, "Browser receipt version must be 1");
  pushIf(receipt && receipt.runId !== context.runId, failures, "Browser receipt runId is stale");
  pushIf(receipt && receipt.candidateRevision !== context.revision, failures, "Browser receipt revision is stale");
  pushIf(receipt && receipt.candidateDigest !== context.candidateDigest, failures, "Browser receipt candidate digest is stale");
  pushIf(!validIsoDateTime(receipt && receipt.testedAt), failures, "Browser receipt testedAt is invalid");
  pushIf(typeof (receipt && receipt.browser) !== "string" || !receipt.browser.trim(), failures, "Browser receipt needs a browser");
  pushIf(receipt && receipt.serverMode !== "Next.js standalone production build", failures, "Browser receipt must test the standalone production build");
  pushIf(receipt && receipt.reducedMotion !== "reduce", failures, "Browser receipt must test reduced motion");

  const expectedViewports = [
    ["mobile-320", 320],
    ["mobile-375", 375],
    ["tablet-768", 768],
    ["desktop-1440", 1440]
  ];
  const actualViewports = (receipt && receipt.viewports || []).map(function (entry) { return [entry.label, entry.width]; });
  pushIf(JSON.stringify(actualViewports) !== JSON.stringify(expectedViewports), failures, "Browser receipt viewport inventory is incomplete or out of order");
  for (const viewport of receipt && receipt.viewports || []) {
    const routeMap = new Map((viewport.routes || []).map(function (entry) { return [entry.route, entry]; }));
    for (const route of ["/", "/work/callnyc"]) {
      const entry = routeMap.get(route);
      pushIf(!entry, failures, viewport.label + " lacks " + route);
      pushIf(entry && entry.status !== 200, failures, viewport.label + " " + route + " did not return 200");
      pushIf(entry && entry.overflow && entry.overflow.overflow !== false, failures, viewport.label + " " + route + " has horizontal overflow");
      pushIf(entry && !safeRelativePath(context.repoRoot, entry.screenshot), failures, viewport.label + " " + route + " screenshot path is unsafe");
      const screenshotExists = entry && safeRelativePath(context.repoRoot, entry.screenshot) && existsSync(path.join(context.repoRoot, entry.screenshot));
      pushIf(entry && !/^[a-f0-9]{64}$/.test(entry.screenshotSha256 || ""), failures, viewport.label + " " + route + " screenshot digest is invalid");
      pushIf(entry && !screenshotExists, failures, viewport.label + " " + route + " screenshot is missing");
      if (screenshotExists) {
        pushIf(sha256(readFileSync(path.join(context.repoRoot, entry.screenshot))) !== entry.screenshotSha256, failures, viewport.label + " " + route + " screenshot digest is stale");
      }
    }
  }

  const routeChecks = new Map((receipt && receipt.primaryRouteChecks || []).map(function (entry) { return [entry.route, entry]; }));
  for (const route of context.applicationArgument.primaryRoutes) {
    const entry = routeChecks.get(route);
    pushIf(!entry, failures, "Browser receipt lacks primary route " + route);
    pushIf(entry && entry.status !== 200, failures, "Primary route " + route + " did not return 200");
    pushIf(entry && entry.overflow && entry.overflow.overflow !== false, failures, "Primary route " + route + " has horizontal overflow");
  }

  const keyboard = receipt && receipt.keyboardChecks && receipt.keyboardChecks[0];
  pushIf(!keyboard || keyboard.route !== "/work/callnyc", failures, "Browser receipt lacks the CallNYC keyboard check");
  pushIf(keyboard && (!keyboard.citationFocused || !keyboard.backlinkFocused), failures, "Citation or backlink did not receive keyboard focus");
  pushIf(keyboard && (!String(keyboard.citationTarget || "").startsWith("#") || !String(keyboard.backlinkTarget || "").startsWith("#")), failures, "Citation or backlink target is missing");

  const noJs = receipt && receipt.javascriptDisabledChecks && receipt.javascriptDisabledChecks[0];
  pushIf(!noJs || noJs.route !== "/work/callnyc", failures, "Browser receipt lacks the JavaScript-disabled CallNYC check");
  pushIf(noJs && (noJs.status !== 200 || noJs.citationCount < 1 || noJs.referenceCount < 1), failures, "Citations or references failed without JavaScript");
  pushIf(noJs && noJs.overflow && noJs.overflow.overflow !== false, failures, "JavaScript-disabled CallNYC has horizontal overflow");
  pushIf(!Array.isArray(receipt && receipt.consoleErrors) || receipt.consoleErrors.length !== 0, failures, "Browser receipt contains console errors");
  pushIf(!Array.isArray(receipt && receipt.limitations) || receipt.limitations.length === 0, failures, "Browser receipt needs limitations");
  pushIf(PRIVATE_PATTERN.test(stableStringify(receipt)), failures, "Browser receipt exposes a private path");
  return failures;
}

export function profileBlockers(profileName, rubric, humanStatus) {
  const profile = rubric.profiles[profileName];
  if (!profile) return ["Unknown readiness profile " + profileName];
  const byId = new Map(humanStatus.states.map(function (state) { return [state.id, state]; }));
  return profile.requiredHumanChecks
    .filter(function (id) {
      const state = byId.get(id);
      return !state || !["passed", "not-required"].includes(state.state);
    })
    .map(function (id) {
      const state = byId.get(id);
      return id + ": " + (state ? state.state : "missing");
    });
}

export function weightedScoreRegressed(firstResult, secondResult) {
  return secondResult.weightedScore < firstResult.weightedScore;
}

export function validateRunArtifacts(options) {
  const repoRoot = options.repoRoot;
  const runRoot = options.runRoot;
  const rubric = options.rubric;
  const humanStatus = options.humanStatus;
  const failures = []
    .concat(validateRubric(rubric))
    .concat(validateHumanStatus(humanStatus, rubric))
    .concat(validateApplicationArgument(options.applicationArgument, options.proofIds));

  const provenance = readJson(path.join(runRoot, "provenance.json"));
  exactKeys(provenance, PROVENANCE_KEYS, "Provenance", failures);
  const revision = provenance.candidateRevision;
  const rubricDigest = digestJson(rubric);
  let candidateDigest = "";
  try {
    candidateDigest = candidateDigestAtRevision(repoRoot, rubric, revision);
  } catch (error) {
    failures.push(error.message);
  }
  pushIf(provenance.version !== 1, failures, "Provenance version must be 1");
  pushIf(provenance.runId !== path.basename(runRoot), failures, "Provenance runId must equal its directory");
  pushIf(provenance.candidateDigest !== candidateDigest, failures, "Provenance candidate digest is stale");
  pushIf(provenance.rubricDigest !== rubricDigest, failures, "Provenance rubric digest is stale");
  pushIf(provenance.iterationBudget !== rubric.stopPolicy.maxIterations, failures, "Provenance iteration budget differs from rubric");
  const iterations = Array.isArray(provenance.iterations) ? provenance.iterations : [];
  pushIf(iterations.length < 2, failures, "Provenance must preserve baseline and candidate iterations");
  pushIf(provenance.acceptedIteration !== iterations.at(-1)?.id, failures, "Accepted iteration must be the final recorded iteration");
  pushIf(provenance.decision !== "certify-system-ready", failures, "Run may only certify system-ready");
  pushIf(!Array.isArray(provenance.limitations) || provenance.limitations.length === 0, failures, "Provenance needs limitations");

  try {
    pushIf(currentCandidateDigest(repoRoot, rubric) !== candidateDigest, failures, "Current public candidate differs from the evaluated revision");
  } catch (error) {
    failures.push(error.message);
  }

  const ancestry = spawnSync("git", ["merge-base", "--is-ancestor", revision, "HEAD"], { cwd: repoRoot });
  pushIf(ancestry.status !== 0, failures, "Evaluated revision is not an ancestor of HEAD");

  const receipt = readJson(path.join(runRoot, "deterministic.json"));
  failures.push.apply(failures, validateDeterministicReceipt(receipt, {
    rubric,
    runId: provenance.runId,
    revision,
    candidateDigest,
    rubricDigest
  }));

  const browserReceipt = readJson(path.join(runRoot, "browser-qa.json"));
  failures.push.apply(failures, validateBrowserReceipt(browserReceipt, {
    repoRoot,
    runId: provenance.runId,
    revision,
    candidateDigest,
    applicationArgument: options.applicationArgument
  }));

  const cards = [];
  for (const round of [1, 2]) {
    for (const role of ["hiring", "evidence"]) {
      const file = path.join(runRoot, "judges", "round-" + round + "-" + role + ".json");
      if (!existsSync(file)) {
        failures.push("Missing judge artifact " + path.relative(repoRoot, file));
        continue;
      }
      const scorecard = readJson(file);
      const result = validateScorecard(scorecard, {
        rubric,
        runId: provenance.runId,
        revision,
        candidateDigest,
        rubricDigest,
        humanStatus
      });
      if (scorecard.round !== round) result.failures.push(path.basename(file) + " has wrong round");
      const expectedRole = role === "hiring" ? "hiring-and-comprehension-judge" : "evidence-and-systems-judge";
      if (scorecard.evaluator && scorecard.evaluator.role !== expectedRole) result.failures.push(path.basename(file) + " has wrong evaluator role");
      for (const message of result.failures) failures.push(path.basename(file) + ": " + message);
      cards.push({ round, role, scorecard, result });
    }
  }

  const sessions = cards.map(function (card) { return card.scorecard.evaluator && card.scorecard.evaluator.sessionId; }).filter(Boolean);
  pushIf(!unique(sessions), failures, "Every judge pass needs a distinct session ID");

  const judgeSessions = Array.isArray(provenance.judgeSessions) ? provenance.judgeSessions : [];
  pushIf(judgeSessions.length !== 4, failures, "Provenance must contain four judge-session receipts");
  const orchestrationSessions = [];
  const expectedArtifacts = new Set();
  for (const card of cards) {
    expectedArtifacts.add("evals/portfolio-readiness/runs/" + provenance.runId + "/judges/round-" + card.round + "-" + card.role + ".json");
  }
  const observedArtifacts = new Set();
  for (const entry of judgeSessions) {
    exactKeys(entry, JUDGE_SESSION_KEYS, "Judge-session receipt", failures);
    const label = "Judge-session round " + entry.round + " " + entry.role;
    pushIf(![1, 2].includes(entry.round), failures, label + " has an invalid round");
    pushIf(!["hiring", "evidence"].includes(entry.role), failures, label + " has an invalid role");
    pushIf(!safeRelativePath(repoRoot, entry.artifact), failures, label + " artifact path is unsafe");
    pushIf(!expectedArtifacts.has(entry.artifact), failures, label + " references an unexpected artifact");
    pushIf(observedArtifacts.has(entry.artifact), failures, label + " repeats an artifact");
    observedArtifacts.add(entry.artifact);
    if (safeRelativePath(repoRoot, entry.artifact) && existsSync(path.join(repoRoot, entry.artifact))) {
      pushIf(sha256(readFileSync(path.join(repoRoot, entry.artifact))) !== entry.artifactSha256, failures, label + " artifact digest is stale");
    }
    pushIf(!/^[a-f0-9]{64}$/.test(entry.artifactSha256 || ""), failures, label + " artifact digest is invalid");
    pushIf(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(entry.sessionId || ""), failures, label + " session ID is invalid");
    pushIf(entry.sessionMode !== "read-only-independent-agent", failures, label + " session mode is invalid");
    pushIf(entry.generatorWasJudge !== false, failures, label + " generatorWasJudge must be false");
    pushIf(!validIsoDateTime(entry.orchestratedAt), failures, label + " orchestratedAt is invalid");
    orchestrationSessions.push(entry.sessionId);
  }
  pushIf(!unique(orchestrationSessions), failures, "Every judge needs a distinct orchestration session");
  pushIf(observedArtifacts.size !== expectedArtifacts.size, failures, "Provenance judge artifacts are incomplete");
  for (const round of [1, 2]) {
    const roundCards = cards.filter(function (card) { return card.round === round; });
    pushIf(roundCards.length !== 2 || roundCards.some(function (card) { return !card.result.passed; }), failures, "Round " + round + " did not receive two passing independent judgments");
  }
  for (const role of ["hiring", "evidence"]) {
    const first = cards.find(function (card) { return card.round === 1 && card.role === role; });
    const second = cards.find(function (card) { return card.round === 2 && card.role === role; });
    if (!first || !second) continue;
    pushIf(
      weightedScoreRegressed(first.result, second.result),
      failures,
      role + " judge weighted score regressed between rounds"
    );
  }

  const machineScores = cards.map(function (card) { return card.result.weightedScore; });
  const machineState = failures.length === 0 ? "system-ready" : "invalid";
  const blockers = profileBlockers(options.profileName, rubric, humanStatus);
  const profileState = failures.length > 0 ? "invalid" : blockers.length > 0 ? "human-blocked" : options.profileName;
  return {
    failures,
    machineScores,
    machineState,
    profileName: options.profileName,
    profileState,
    humanBlockers: blockers,
    candidateRevision: revision,
    candidateDigest,
    rubricDigest,
    runId: provenance.runId
  };
}

export { PRIVATE_PATTERN };
