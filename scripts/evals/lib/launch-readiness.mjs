import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const defaultRepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
);

export const suitePath = path.join(
  defaultRepoRoot,
  "evals/launch-readiness/suite.json"
);

export function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

export function loadSuite(file = suitePath) {
  return readJson(file);
}

function duplicates(values) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

export function validateSuite(suite) {
  const failures = [];

  if (!suite?.id || !suite?.version || !suite?.objective) {
    failures.push("Suite requires id, version, and objective");
  }

  for (const collectionName of [
    "sourceChecks",
    "browserChecks",
    "judgeCriteria",
    "humanGates"
  ]) {
    const collection = suite?.[collectionName];
    if (!Array.isArray(collection) || collection.length === 0) {
      failures.push(`${collectionName} must be a non-empty array`);
      continue;
    }
    const repeated = duplicates(collection.map((item) => item.id));
    if (repeated.length) failures.push(`${collectionName} has duplicate IDs: ${repeated.join(", ")}`);
  }

  const sourceKinds = new Set(["hard-gate", "quality-target"]);
  for (const check of suite?.sourceChecks ?? []) {
    if (!sourceKinds.has(check.kind)) failures.push(`${check.id} has invalid source-check kind`);
    if (!check.intent || !check.remediation) failures.push(`${check.id} needs intent and remediation`);
  }

  const weights = (suite?.judgeCriteria ?? []).reduce(
    (sum, criterion) => sum + (criterion.weight ?? 0),
    0
  );
  if (weights !== 100) failures.push(`Judge weights must sum to 100; received ${weights}`);

  for (const criterion of suite?.judgeCriteria ?? []) {
    if (!Number.isInteger(criterion.floor) || criterion.floor < 0 || criterion.floor > 4) {
      failures.push(`${criterion.id} has an invalid floor`);
    }
    if (!criterion.question) failures.push(`${criterion.id} needs a judge question`);
    if (
      criterion.minimumEvidence !== undefined &&
      (!Number.isInteger(criterion.minimumEvidence) || criterion.minimumEvidence < 2)
    ) {
      failures.push(`${criterion.id} has an invalid minimum-evidence requirement`);
    }
  }

  for (const score of ["0", "1", "2", "3", "4"]) {
    if (!suite?.scoreAnchors?.[score]) failures.push(`Missing score anchor ${score}`);
  }

  const viewportWidths = new Set((suite?.viewports ?? []).map((item) => item.width));
  for (const requiredWidth of [320, 375, 768, 1440]) {
    if (!viewportWidths.has(requiredWidth)) failures.push(`Missing ${requiredWidth}px viewport`);
  }

  for (const gate of suite?.humanGates ?? []) {
    if (gate.agentMaySelfCertify !== false) {
      failures.push(`${gate.id} must explicitly forbid agent self-certification`);
    }
  }

  return failures;
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function lineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}

function matchEvidence(repoRoot, files, pattern, limit = 12) {
  const evidence = [];
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    for (const match of content.matchAll(pattern)) {
      evidence.push({
        file: path.relative(repoRoot, file),
        line: lineNumber(content, match.index ?? 0),
        excerpt: match[0].replace(/\s+/g, " ").trim().slice(0, 180)
      });
      if (evidence.length >= limit) return evidence;
    }
  }
  return evidence;
}

function result(check, passed, observed, evidence = []) {
  return {
    id: check.id,
    kind: check.kind,
    passed,
    intent: check.intent,
    observed,
    evidence,
    remediation: passed ? null : check.remediation
  };
}

export function evaluateSourceChecks({ repoRoot = defaultRepoRoot, suite = loadSuite() } = {}) {
  const checks = new Map(suite.sourceChecks.map((check) => [check.id, check]));
  const results = [];

  const workFile = path.join(repoRoot, "apps/www/src/data/work.ts");
  const homepageFile = path.join(repoRoot, "apps/www/src/app/page.tsx");
  const colophonFile = path.join(repoRoot, "apps/www/src/app/colophon/page.tsx");
  const launchFile = path.join(repoRoot, "docs/knowledge-bank/launch-blockers.md");
  const recordsFile = path.join(repoRoot, "apps/www/src/data/knowledge-bank/records.ts");
  const publicDir = path.join(repoRoot, "apps/www/public");

  const workflowEvidence = matchEvidence(
    repoRoot,
    [workFile],
    /(?:screenshots?|materials?|approvals?|review)[^\n".]{0,36}\bpending\b|\bpending\s+(?:approval|approvals|review)\b|\b(?:needs?|requires?)\s+(?:Jamie\s+)?approval\b|\bbefore\s+(?:launch|publication)\b/gi
  );
  results.push(
    result(
      checks.get("public-copy-has-no-workflow-status"),
      workflowEvidence.length === 0,
      `${workflowEvidence.length} public workflow-status phrase(s)`,
      workflowEvidence
    )
  );

  const employerEvidence = matchEvidence(repoRoot, [homepageFile], /\bOTI\b/g);
  results.push(
    result(
      checks.get("permanent-copy-is-employer-neutral"),
      employerEvidence.length === 0,
      `${employerEvidence.length} unexplained employer-specific acronym occurrence(s)`,
      employerEvidence
    )
  );

  const colophon = existsSync(colophonFile) ? readFileSync(colophonFile, "utf8") : "";
  const hasCitationalCare = /Citational care/i.test(colophon) && /numbered|significant factual claims/i.test(colophon);
  results.push(
    result(
      checks.get("colophon-explains-citational-care"),
      hasCitationalCare,
      hasCitationalCare ? "Citational-care statement present" : "Citational-care statement missing"
    )
  );

  const launchSource = existsSync(launchFile) ? readFileSync(launchFile, "utf8") : "";
  const unresolved = [...launchSource.matchAll(/^- \[ \] (.+)$/gm)].map((match) => match[1]);
  results.push(
    result(
      checks.get("launch-register-is-resolved"),
      existsSync(launchFile) && unresolved.length === 0,
      `${unresolved.length} unresolved launch-register item(s)`,
      unresolved.slice(0, 12).map((excerpt) => ({
        file: path.relative(repoRoot, launchFile),
        excerpt
      }))
    )
  );

  const requiredRouteFiles = [
    "apps/www/src/app/work/page.tsx",
    "apps/www/src/app/work/technical-operations/page.tsx",
    "apps/www/src/app/resume/page.tsx",
    "apps/www/src/app/contact/page.tsx",
    "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
  ];
  const missingRouteFiles = requiredRouteFiles.filter((file) => !existsSync(path.join(repoRoot, file)));
  const applicationSourceFiles = [
    homepageFile,
    path.join(repoRoot, "apps/www/src/components/Hero.tsx"),
    path.join(repoRoot, "apps/www/src/components/ContactCTA.tsx"),
    path.join(repoRoot, "apps/www/src/components/SiteHeader.tsx")
  ];
  const applicationSource = applicationSourceFiles
    .filter((file) => existsSync(file))
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
  const missingHomepagePaths = ["/work/technical-operations", "/resume", "/contact"].filter(
    (route) => !applicationSource.includes(route)
  );
  const applicationGaps = [...missingRouteFiles, ...missingHomepagePaths];
  results.push(
    result(
      checks.get("application-path-is-complete"),
      applicationGaps.length === 0,
      applicationGaps.length ? `Missing: ${applicationGaps.join(", ")}` : "Role proof, resume, and contact paths present"
    )
  );

  const mediaExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
  const mediaFiles = walk(publicDir).filter((file) => mediaExtensions.has(path.extname(file).toLowerCase()));
  const mediaCheck = checks.get("public-artifact-media-depth");
  results.push(
    result(
      mediaCheck,
      mediaFiles.length >= mediaCheck.minimum,
      `${mediaFiles.length} public bitmap artifact(s); target ${mediaCheck.minimum}`,
      mediaFiles.slice(0, 12).map((file) => ({ file: path.relative(repoRoot, file) }))
    )
  );

  const records = existsSync(recordsFile) ? readFileSync(recordsFile, "utf8") : "";
  const citationProjects = [...new Set([...records.matchAll(/\bproject:\s*"([^"]+)"/g)].map((match) => match[1]))];
  const citationCheck = checks.get("structured-citation-project-depth");
  results.push(
    result(
      citationCheck,
      citationProjects.length >= citationCheck.minimum,
      `${citationProjects.length} project(s) with canonical structured citation claims; target ${citationCheck.minimum}`,
      citationProjects.map((project) => ({ project }))
    )
  );

  return {
    suiteId: suite.id,
    suiteVersion: suite.version,
    results,
    summary: summarizeSourceResults(results)
  };
}

export function summarizeSourceResults(results) {
  const hardGates = results.filter((item) => item.kind === "hard-gate");
  const qualityTargets = results.filter((item) => item.kind === "quality-target");
  return {
    hardGateFailures: hardGates.filter((item) => !item.passed).length,
    hardGateTotal: hardGates.length,
    qualityTargetGaps: qualityTargets.filter((item) => !item.passed).length,
    qualityTargetTotal: qualityTargets.length
  };
}

const disallowedHumanVerifier = /\b(?:agent|ai|assistant|chatgpt|codex|llm|model)\b/i;

export function scoreAssessment(assessment, suite = loadSuite()) {
  const failures = [];
  if (assessment?.suiteId !== suite.id || assessment?.suiteVersion !== suite.version) {
    failures.push("Assessment suite id/version does not match the active suite");
  }

  if (!assessment?.judge?.model || assessment?.judge?.independentPass !== true) {
    failures.push("Assessment requires a named independent judge pass");
  }

  const judgeScores = assessment?.judge?.scores ?? [];
  const duplicateJudgeScores = duplicates(judgeScores.map((item) => item.criterionId));
  if (duplicateJudgeScores.length) {
    failures.push(`Duplicate judge scores: ${duplicateJudgeScores.join(", ")}`);
  }
  const submittedScores = new Map(judgeScores.map((item) => [item.criterionId, item]));
  let weightedJudgeScore = 0;
  const judgeFloorFailures = [];

  for (const criterion of suite.judgeCriteria) {
    const submitted = submittedScores.get(criterion.id);
    if (!submitted) {
      failures.push(`Missing judge score: ${criterion.id}`);
      continue;
    }
    if (!Number.isInteger(submitted.score) || submitted.score < 0 || submitted.score > 4) {
      failures.push(`${criterion.id} score must be an integer from 0 through 4`);
      continue;
    }
    const minimumEvidence = criterion.minimumEvidence ?? 2;
    if (!Array.isArray(submitted.evidence) || submitted.evidence.length < minimumEvidence) {
      failures.push(`${criterion.id} requires at least ${minimumEvidence} evidence entries`);
    }
    weightedJudgeScore += (submitted.score / 4) * criterion.weight;
    if (submitted.score < criterion.floor) judgeFloorFailures.push(criterion.id);
  }

  const humanGates = assessment?.humanGates ?? [];
  const duplicateHumanGates = duplicates(humanGates.map((item) => item.gateId));
  if (duplicateHumanGates.length) {
    failures.push(`Duplicate human gates: ${duplicateHumanGates.join(", ")}`);
  }
  const humanSubmissions = new Map(humanGates.map((item) => [item.gateId, item]));
  const pendingHumanGates = [];
  for (const gate of suite.humanGates) {
    const submitted = humanSubmissions.get(gate.id);
    if (!submitted || submitted.status !== "confirmed") {
      pendingHumanGates.push(gate.id);
      continue;
    }
    if (!submitted.verifiedBy || disallowedHumanVerifier.test(submitted.verifiedBy)) {
      failures.push(`${gate.id} must be confirmed by a named human owner`);
      pendingHumanGates.push(gate.id);
    }
  }

  weightedJudgeScore = Math.round(weightedJudgeScore * 10) / 10;
  return {
    valid: failures.length === 0,
    failures,
    weightedJudgeScore,
    judgeFloorFailures,
    pendingHumanGates,
    judgeThresholdMet:
      weightedJudgeScore >= suite.releaseThresholds.weightedJudgeScore &&
      judgeFloorFailures.length === 0
  };
}

export function objectiveVector(report) {
  const summary = report.summary ?? report;
  return [
    summary.hardGateFailures ?? 1_000_000,
    summary.judgeFloorFailures?.length ?? summary.judgeFloorFailureCount ?? 0,
    -(summary.weightedJudgeScore ?? 0),
    summary.qualityTargetGaps ?? 0
  ];
}

export function compareObjective(before, after) {
  const beforeVector = objectiveVector(before);
  const afterVector = objectiveVector(after);
  let relation = "equal";
  for (let index = 0; index < beforeVector.length; index += 1) {
    if (afterVector[index] < beforeVector[index]) {
      relation = "improved";
      break;
    }
    if (afterVector[index] > beforeVector[index]) {
      relation = "regressed";
      break;
    }
  }
  return {
    accepted: relation === "improved",
    relation,
    before: beforeVector,
    after: afterVector
  };
}
