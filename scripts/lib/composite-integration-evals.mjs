import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const PRIVATE_PATTERN = /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|Mobile Documents|supporting-materials)/i;
const SHA_PATTERN = /^[a-f0-9]{40}$/;

function unique(values) {
  return new Set(values).size === values.length;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function validateCompositeSuite(suite) {
  const findings = [];
  if (suite?.version !== 1) findings.push("Suite version must be 1");
  if (!suite?.id) findings.push("Suite requires an ID");
  if (!SHA_PATTERN.test(suite?.startSha ?? "")) findings.push("Suite start SHA is invalid");
  if (asArray(suite?.frozenBranches).length !== 14) findings.push("Suite must pin A through N");
  const branches = asArray(suite?.frozenBranches).map((item) => item.branch);
  const expected = Array.from({ length: 14 }, (_, index) => `feature/evals-${String.fromCharCode(65 + index)}`);
  if (expected.some((branch) => !branches.includes(branch))) findings.push("Frozen branch family is incomplete");
  if (!unique(branches)) findings.push("Frozen branch names must be unique");
  if (asArray(suite?.frozenBranches).some((item) => !SHA_PATTERN.test(item.sha ?? ""))) {
    findings.push("Every frozen branch requires a full SHA");
  }
  const gates = asArray(suite?.requiredHardGates);
  if (!gates.length || !unique(gates)) findings.push("Hard gates must be present and unique");
  const rubrics = asArray(suite?.rubrics);
  if (rubrics.reduce((total, item) => total + Number(item.weight ?? 0), 0) !== 100) {
    findings.push("Rubric weights must sum to 100");
  }
  if (!unique(rubrics.map((item) => item.id))) findings.push("Rubric IDs must be unique");
  if (rubrics.some((item) => !gates.includes(item.gate))) findings.push("Every rubric must map to a hard gate");
  if (!asArray(suite?.contractPaths).length) findings.push("Contract paths are required");
  if (!asArray(suite?.candidatePaths).length) findings.push("Candidate paths are required");
  if (!asArray(suite?.requiredMutationIds).length) findings.push("Semantic mutation IDs are required");
  return findings;
}

export function collectFiles(repoRoot, inputs, ignorePaths = []) {
  const ignored = ignorePaths.map((item) => item.replace(/\/$/, ""));
  const shouldIgnore = (relativePath) =>
    ignored.some((item) => relativePath === item || relativePath.startsWith(`${item}/`));
  const files = [];
  const visit = (relativePath) => {
    if (shouldIgnore(relativePath)) return;
    const absolutePath = path.join(repoRoot, relativePath);
    if (!existsSync(absolutePath)) return;
    const stat = statSync(absolutePath);
    if (stat.isDirectory()) {
      for (const entry of readdirSync(absolutePath).sort()) visit(path.join(relativePath, entry));
      return;
    }
    if (stat.isFile()) files.push(relativePath);
  };
  for (const input of inputs) visit(input);
  return [...new Set(files)].sort();
}

export function fingerprintPaths(repoRoot, inputs, ignorePaths = []) {
  const hash = createHash("sha256");
  for (const relativePath of collectFiles(repoRoot, inputs, ignorePaths)) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(readFileSync(path.join(repoRoot, relativePath)));
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}

export function evaluateBranchLedger(suite, ledger) {
  const findings = [];
  if (!ledger || ledger.version !== 1) {
    return { passed: false, frozenSourcePassed: false, accountingPassed: false, findings: ["Branch-family ledger is missing or invalid"] };
  }
  const entries = asArray(ledger.branches);
  const allowed = new Set(suite.allowedDispositions);
  for (const frozen of suite.frozenBranches) {
    const entry = entries.find((item) => item.branch === frozen.branch);
    if (!entry) {
      findings.push(`Missing ledger entry for ${frozen.branch}`);
      continue;
    }
    if (entry.sourceCommit !== frozen.sha) findings.push(`${frozen.branch} is not pinned to ${frozen.sha}`);
    if (!asArray(entry.decisions).length) findings.push(`${frozen.branch} has no integration decisions`);
    for (const decision of asArray(entry.decisions)) {
      if (!decision.capability) findings.push(`${frozen.branch} has a decision without a capability`);
      if (!allowed.has(decision.disposition)) findings.push(`${frozen.branch}/${decision.capability ?? "unknown"} has an invalid disposition`);
      if (!decision.reason) findings.push(`${frozen.branch}/${decision.capability ?? "unknown"} has no reason`);
      if (["adopt", "adapt"].includes(decision.disposition) && !decision.canonicalDestination) {
        findings.push(`${frozen.branch}/${decision.capability ?? "unknown"} has no canonical destination`);
      }
      if (!asArray(decision.verification).length) findings.push(`${frozen.branch}/${decision.capability ?? "unknown"} has no verification`);
    }
  }
  for (const entry of entries) {
    if (!suite.frozenBranches.some((item) => item.branch === entry.branch)) findings.push(`Unexpected branch ${entry.branch}`);
  }
  const frozenSourcePassed = suite.frozenBranches.every((frozen) =>
    entries.some((entry) => entry.branch === frozen.branch && entry.sourceCommit === frozen.sha)
  );
  const accountingPassed = findings.length === 0;
  return { passed: frozenSourcePassed && accountingPassed, frozenSourcePassed, accountingPassed, findings };
}

export function evaluateCanonicalArchitecture(repoRoot, suite) {
  const missing = suite.requiredCanonicalFiles.filter((item) => !existsSync(path.join(repoRoot, item)));
  const forbidden = suite.forbiddenArchitecturePaths.filter((item) => existsSync(path.join(repoRoot, item)));
  return {
    passed: missing.length === 0 && forbidden.length === 0,
    findings: [
      ...missing.map((item) => `Missing canonical file ${item}`),
      ...forbidden.map((item) => `Forbidden competing architecture ${item}`)
    ]
  };
}

export function findPrivatePaths(values) {
  const findings = [];
  for (const [label, value] of Object.entries(values)) {
    if (PRIVATE_PATTERN.test(typeof value === "string" ? value : JSON.stringify(value))) findings.push(label);
  }
  return findings;
}

export function detectSemanticMutation(fixture) {
  const original = fixture.original ?? {};
  const mutated = fixture.mutated ?? {};
  const text = String(mutated.text ?? "").toLowerCase();
  switch (fixture.type) {
    case "attribution-drop":
      return original.attributionRequired && !asArray(original.attributionTokens).some((token) => text.includes(String(token).toLowerCase()))
        ? "attribution-dropped" : null;
    case "sole-credit":
      return original.collective && /\b(single-handedly|sole(?:ly)?|alone|independently created)\b/i.test(text)
        ? "sole-credit-inflation" : null;
    case "mention-to-endorsement":
      return original.evidenceKind === "social-mention" && /\b(endorse(?:d|ment|s)?|support(?:ed|s)?)\b/i.test(text)
        ? "endorsement-inflation" : null;
    case "mutable-to-lifetime":
      return original.populationScope !== "immutable-lifetime" && /\b(lifetime|all ever|complete history|every post)\b/i.test(text)
        ? "population-inflation" : null;
    case "aggregate-to-impact":
      return /\b(row|record|account|signup)/i.test(String(original.unit ?? "")) && /\b(people|attend|reach|impact)/i.test(text)
        ? "aggregate-inflation" : null;
    case "photo-institutional":
      return original.soleSourceKind === "participant-photograph" && mutated.claimType === "institutional"
        ? "photo-role-substitution" : null;
    case "stage-inflation": {
      const order = ["plan", "recommendation", "allocation", "midpoint", "completed", "received"];
      return order.indexOf(mutated.claimedStage) > order.indexOf(original.supportedStage) ? "stage-inflation" : null;
    }
    case "url-role":
      return original.evidenceKind === "public-url-only" && mutated.roleClaim === true ? "url-role-substitution" : null;
    case "memory-confirmed":
      return original.knowledgeStatus === "memory" && mutated.knowledgeStatus === "confirmed" ? "memory-promotion" : null;
    case "negative-absolute":
      return original.finding === "not-recovered" && /\b(never existed|did not exist)\b/i.test(text)
        ? "negative-finding-inflation" : null;
    case "protected-public":
      return ["private", "protected"].includes(original.visibility) && mutated.publicationStatus === "public"
        ? "protected-projection" : null;
    case "non-support-positive":
      return original.relationship === "does-not-support" && mutated.positiveSupport === true
        ? "non-support-substitution" : null;
    case "anti-claim-conflict":
      return asArray(original.antiClaims).some((antiClaim) => text.includes(String(antiClaim).toLowerCase()))
        ? "anti-claim-conflict" : null;
    case "stale-candidate":
      return original.candidate !== mutated.candidate ? "stale-candidate" : null;
    case "stale-contract":
      return original.contract !== mutated.contract ? "stale-contract" : null;
    default:
      return null;
  }
}

export function evaluateSemanticFixtures(suite, fixtures) {
  const fixtureById = new Map(asArray(fixtures).map((fixture) => [fixture.id, fixture]));
  const findings = [];
  for (const id of suite.requiredMutationIds) {
    const fixture = fixtureById.get(id);
    if (!fixture) {
      findings.push(`Missing mutation fixture ${id}`);
      continue;
    }
    const code = detectSemanticMutation(fixture);
    if (code !== fixture.expectedCode) findings.push(`${id} expected ${fixture.expectedCode} but produced ${code ?? "no finding"}`);
  }
  return { passed: findings.length === 0, findings };
}

export function validateJudgments({ judgments, suite, candidate, contract }) {
  const valid = asArray(judgments).filter((judgment) =>
    judgment?.suite === suite.id &&
    judgment?.candidate === candidate &&
    judgment?.contract === contract &&
    judgment?.status === "pass" &&
    asArray(judgment.regressions).length === 0 &&
    judgment?.judgeId &&
    judgment?.lens
  );
  const judges = new Set(valid.map((item) => item.judgeId));
  const lenses = new Set(valid.map((item) => item.lens));
  const required = suite.profiles.integration_ready.requiredIndependentJudgments;
  return {
    passed: judges.size >= required && lenses.size >= required,
    valid,
    findings: judges.size >= required && lenses.size >= required
      ? []
      : [`Expected ${required} candidate-bound judgments from distinct judges and lenses; found ${judges.size} judges and ${lenses.size} lenses`]
  };
}

export function evaluateGovernance(suite, governance) {
  const findings = [];
  const layers = new Map(asArray(governance?.layers).map((item) => [item.id, item]));
  for (const id of suite.requiredGovernanceLayers) {
    const layer = layers.get(id);
    if (!layer) {
      findings.push(`Missing governance layer ${id}`);
      continue;
    }
    if (!suite.allowedGovernanceStatuses.includes(layer.status)) findings.push(`${id} has invalid status ${layer.status}`);
    if (!layer.evidence) findings.push(`${id} has no evidence or blocking reason`);
    if (["human-reader", "rights-review", "production", "jamie-approval"].includes(id) && layer.status === "pass" && !layer.externalEvidenceId) {
      findings.push(`${id} cannot pass without an external evidence ID`);
    }
  }
  return { passed: findings.length === 0, findings };
}

export function evaluateReviewability(stats, thresholds) {
  const findings = [];
  if (stats.changedFiles > thresholds.maximumChangedFiles) findings.push(`${stats.changedFiles} changed files exceeds ${thresholds.maximumChangedFiles}`);
  if (stats.addedLines > thresholds.maximumAddedLines) findings.push(`${stats.addedLines} added lines exceeds ${thresholds.maximumAddedLines}`);
  if (stats.maximumSingleFileAddedLines > thresholds.maximumSingleFileAddedLines) {
    findings.push(`${stats.maximumSingleFileAddedLines} added lines in ${stats.largestAddedFile} exceeds ${thresholds.maximumSingleFileAddedLines}`);
  }
  return { passed: findings.length === 0, findings };
}

export function scoreRubrics(suite, hardGates) {
  const scores = Object.fromEntries(
    suite.rubrics.map((rubric) => [rubric.id, hardGates[rubric.gate]?.status === "pass" ? 4 : 2])
  );
  const weightedScore = Number(
    (suite.rubrics.reduce((total, rubric) => total + rubric.weight * scores[rubric.id], 0) / 4).toFixed(2)
  );
  return { scores, weightedScore };
}
