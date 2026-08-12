import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  appendIntakeItem,
  queryKnowledgeLifecycle
} from "../../apps/www/src/data/knowledge-bank/lifecycle-operations.ts";
import { validateKnowledgeBank } from "./citation-validation.mjs";
import { evaluateProfessorLenses } from "./professor-lens-eval.mjs";
import {
  buildEmploymentOutputs,
  evaluatePublicHiring,
  resolveHiringGaps,
  writeOrCheckOutputs
} from "../knowledge-wiki/employment-lib.mjs";
import { checkGeneratedOutputs, compileWiki } from "../knowledge-wiki/lib.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export const FROZEN_COMPOSITE_RUBRIC_SHA256 = "3fe95a2b9c1f22cdb7d95c3168af73e8eb659900ffd258cd65ebb6feb06e44c1";
export const FROZEN_BRANCH_HEADS_SHA256 = "efa94ea9c3b7190deca61024093d30e4d78a2efdebf04b78b5d6857d9df7a002";

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, entry]) => [key, canonicalize(entry)])
    );
  }
  return value;
}

function sha256(value) {
  return createHash("sha256")
    .update(Buffer.isBuffer(value)
      ? value
      : typeof value === "string"
        ? value
        : JSON.stringify(canonicalize(value)))
    .digest("hex");
}

export function computeCanonicalJsonDigest(value) {
  return sha256(value);
}

export function compositeRubricPayload(suite) {
  return {
    base_suite: suite.base_suite,
    integration_register: suite.integration_register,
    integration_register_sha256: suite.integration_register_sha256,
    blind_spot_controls: suite.blind_spot_controls,
    required_branch_ref_namespace: suite.required_branch_ref_namespace,
    required_branch_heads: suite.required_branch_heads,
    canonical_files: suite.canonical_files,
    forbidden_parallel_architectures: suite.forbidden_parallel_architectures,
    grader_separation: suite.grader_separation,
    optimization: suite.optimization,
    candidate_identity: suite.candidate_identity,
    holdout_provenance: suite.holdout_provenance,
    evidence_bundle_files: suite.evidence_bundle_files,
    holdout_runs: suite.holdout_runs,
    criteria: suite.criteria
  };
}

export function computeCompositeRubricDigest(suite) {
  return sha256(compositeRubricPayload(suite));
}

export function listCompositeCandidateFiles(suite) {
  const output = execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
    { cwd: repoRoot, encoding: "utf8" }
  );
  const excluded = new Set(suite.candidate_identity.exclude_only);
  return output
    .split("\0")
    .filter(Boolean)
    .filter((relativePath) => !excluded.has(relativePath))
    .filter((relativePath) => existsSync(path.join(repoRoot, relativePath)))
    .sort();
}

export function computeCompositeCandidateFingerprint(suite, { fileOverrides = {} } = {}) {
  const candidateFiles = listCompositeCandidateFiles(suite);
  const digest = createHash("sha256");
  for (const relativePath of candidateFiles) {
    const override = Object.hasOwn(fileOverrides, relativePath) ? fileOverrides[relativePath] : null;
    const bytes = override === null
      ? readFileSync(path.join(repoRoot, relativePath))
      : Buffer.isBuffer(override)
        ? override
        : Buffer.from(String(override), "utf8");
    digest.update(relativePath, "utf8");
    digest.update("\0");
    digest.update(String(bytes.byteLength), "utf8");
    digest.update("\0");
    digest.update(bytes);
    digest.update("\0");
  }
  return digest.digest("hex");
}

export function holdoutJudgmentPayload(run) {
  return {
    runVersion: run.runVersion,
    judgeId: run.judgeId,
    grader: run.grader,
    independentFromOptimizer: run.independentFromOptimizer,
    rubricSha256: run.rubricSha256,
    candidateFingerprint: run.candidateFingerprint,
    verdict: run.verdict,
    scores: run.scores,
    notObserved: run.notObserved,
    findings: run.findings,
    recommendation: run.recommendation,
    publicReview: run.publicReview
      ? {
          provider: run.publicReview.provider,
          reviewerLabel: run.publicReview.reviewerLabel,
          reviewedAt: run.publicReview.reviewedAt,
          attestation: run.publicReview.attestation
        }
      : null
  };
}

export function computeHoldoutJudgmentDigest(run) {
  return sha256(holdoutJudgmentPayload(run));
}

export function checkCompositeDerivedCurrentness() {
  try {
    const wiki = compileWiki();
    const generatedIssues = checkGeneratedOutputs(wiki).map(
      (issue) => `${issue.code} ${issue.file}:${issue.line} - ${issue.message}`
    );
    const publicEvaluation = evaluatePublicHiring(wiki.repoRoot);
    const gapResolution = resolveHiringGaps(wiki, publicEvaluation.report);
    const employmentOutputs = buildEmploymentOutputs(wiki, publicEvaluation, gapResolution);
    const employmentIssues = writeOrCheckOutputs(wiki.repoRoot, employmentOutputs, true);
    const wikiErrors = wiki.errors.map(
      (issue) => `${issue.code} ${issue.file}:${issue.line} - ${issue.message}`
    );
    return {
      pass: wikiErrors.length === 0 && generatedIssues.length === 0 && employmentIssues.length === 0,
      wikiErrors,
      generatedIssues,
      employmentIssues
    };
  } catch (error) {
    return {
      pass: false,
      wikiErrors: [error instanceof Error ? error.message : String(error)],
      generatedIssues: [],
      employmentIssues: []
    };
  }
}

function criterion(id, pass, evidence, findings = []) {
  return { id, pass, score: pass ? 4 : 0, evidence, findings };
}

function loadHoldouts(suite) {
  return suite.holdout_runs.flatMap((relativePath) => {
    if (!existsSync(path.join(repoRoot, relativePath))) return [];
    return [{ relativePath, ...readJson(relativePath) }];
  });
}

function resolveGitRef(relativeRef) {
  try {
    return execFileSync("git", ["rev-parse", "--verify", relativeRef], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return null;
  }
}

export function evaluateCompositeIntegration({
  suite = readJson(".agents/evals/feature-evals-composite.json"),
  register = readJson("docs/integration/feature-evals-composite.json"),
  portfolioSuite = readJson(".agents/evals/portfolio-production-readiness.json"),
  blindSpots = readJson("docs/knowledge-bank/data/blind-spot-controls-2026-07.json"),
  holdouts = loadHoldouts(suite),
  derivedCurrentness = checkCompositeDerivedCurrentness()
} = {}) {
  const results = [];
  const expectedBranches = Object.keys(suite.required_branch_heads).sort();
  const registeredBranches = register.decisions.map((decision) => decision.branch).sort();
  const missingFrozenCommits = expectedBranches.filter(
    (branch) => !resolveGitRef(`${suite.required_branch_heads[branch]}^{commit}`)
  );
  const branchRefMismatches = expectedBranches.flatMap((branch) => {
    const expectedHead = suite.required_branch_heads[branch];
    const ref = `${suite.required_branch_ref_namespace}/${branch}`;
    const actualHead = resolveGitRef(ref);
    return actualHead === expectedHead ? [] : [{ branch, ref, expectedHead, actualHead }];
  });
  const exactFamily = expectedBranches.length === 14 &&
    expectedBranches.every((branch, index) => branch === `feature/evals-${String.fromCharCode(65 + index)}`) &&
    sha256(suite.required_branch_heads) === FROZEN_BRANCH_HEADS_SHA256 &&
    JSON.stringify(expectedBranches) === JSON.stringify(registeredBranches) &&
    register.decisions.every((decision) => suite.required_branch_heads[decision.branch] === decision.head) &&
    missingFrozenCommits.length === 0;
  results.push(criterion(
    "COMP-001",
    exactFamily && register.writableBranch === "feature/knowledge-h" && register.pullRequestBase === "develop",
    `${registeredBranches.length}/14 frozen branch decisions match the rubric heads; ${missingFrozenCommits.length} frozen commit objects are missing.`,
    [
      ...(exactFamily ? [] : [
        "The A-N family inventory or frozen commit set is incomplete or inconsistent.",
        ...missingFrozenCommits.map((branch) =>
          `${branch}: frozen commit ${suite.required_branch_heads[branch]} is unavailable.`
        )
      ]),
      ...branchRefMismatches.map(({ branch, ref, expectedHead, actualHead }) =>
        `${branch}: mutable ${ref} now resolves to ${actualHead ?? "missing"}; frozen commit remains ${expectedHead}.`
      )
    ]
  ));

  const allowedDecisions = new Set(["adopt", "adapt", "already-present", "reject"]);
  const knownCriteria = new Set(suite.criteria.map((entry) => entry.id));
  const invalidDestinations = [];
  for (const decision of register.decisions) {
    for (const destination of decision.destinationPaths ?? []) {
      if (!existsSync(path.join(repoRoot, destination))) invalidDestinations.push(destination);
    }
  }
  const registerDigest = computeCanonicalJsonDigest(register);
  const decisionsInspectable = registerDigest === suite.integration_register_sha256 &&
    register.decisions.every((decision) =>
    allowedDecisions.has(decision.decision) &&
    decision.strength?.trim().length >= 30 &&
    decision.rationale?.trim().length >= 80 &&
    decision.destinationPaths?.length > 0 &&
    decision.verificationIds?.length > 0 &&
    decision.verificationIds.every((id) => knownCriteria.has(id))
  ) && register.websiteDecision?.trim().length >= 80 && invalidDestinations.length === 0;
  results.push(criterion(
    "COMP-002",
    Boolean(decisionsInspectable),
    `${register.decisions.length} branch decisions include rationale, destinations, verification, and reviewed digest ${registerDigest}.`,
    [
      ...(registerDigest === suite.integration_register_sha256 ? [] : ["The integration register differs from its reviewed digest."]),
      ...invalidDestinations.map((item) => `Missing integration destination: ${item}`)
    ]
  ));

  const missingCanonical = suite.canonical_files.filter(
    (relativePath) => !existsSync(path.join(repoRoot, relativePath))
  );
  const copiedParallel = suite.forbidden_parallel_architectures.filter(
    (relativePath) => existsSync(path.join(repoRoot, relativePath))
  );
  const publicRegistry = readJson("apps/www/src/data/knowledge-bank/public-registry.json");
  const baseSuiteDigest = computeCanonicalJsonDigest(portfolioSuite);
  const oneArchitecture = missingCanonical.length === 0 &&
    copiedParallel.length === 0 &&
    portfolioSuite.version === suite.base_suite.required_version &&
    baseSuiteDigest === suite.base_suite.sha256 &&
    portfolioSuite.composite_suite?.path === ".agents/evals/feature-evals-composite.json" &&
    JSON.stringify(Object.keys(publicRegistry).sort()) === JSON.stringify(["claims", "pages", "sources"]);
  results.push(criterion(
    "COMP-003",
    oneArchitecture,
    `${suite.canonical_files.length} canonical files exist; ${copiedParallel.length} parallel lifecycle roots were copied.`,
    [...missingCanonical.map((item) => `Missing canonical file: ${item}`), ...copiedParallel.map((item) => `Parallel architecture copied: ${item}`)]
  ));

  const sample = knowledgeBank.intakeItems.find((item) => item.kind === "public-url");
  let lifecycleOperationsPass = Boolean(sample);
  const lifecycleFindings = [];
  if (sample) {
    try {
      const replay = appendIntakeItem(knowledgeBank, sample);
      const duplicate = appendIntakeItem(knowledgeBank, {
        ...structuredClone(sample),
        id: "INTAKE-COMPOSITE-EVAL-DUPLICATE",
        submittedAt: "2026-07-16"
      });
      const report = queryKnowledgeLifecycle(knowledgeBank);
      lifecycleOperationsPass = replay.status === "already-present" &&
        duplicate.status === "duplicate-preserved" &&
        duplicate.intake.duplicateOfIntakeId === sample.id &&
        report.matureHeldClaimIds.length > 0 &&
        report.unresolvedInquiryIds.length > 0 &&
        report.correctionIds.length > 0 &&
        report.orphanSourceIds.length === 0;
    } catch (error) {
      lifecycleOperationsPass = false;
      lifecycleFindings.push(error instanceof Error ? error.message : String(error));
    }
  }
  results.push(criterion(
    "COMP-004",
    lifecycleOperationsPass,
    "Canonical intake replay, duplicate preservation, held-claim, inquiry, correction, and orphan queries were exercised.",
    lifecycleFindings
  ));

  const knowledgeErrors = validateKnowledgeBank({ includePublicFiles: true });
  const populationBoundaryPresent = knowledgeBank.sources.some((source) =>
    source.supportsGenerally.some((item) => /population|census|denominator/i.test(item)) &&
    source.doesNotEstablish.some((item) => /lifetime|complete|all|impact/i.test(item))
  );
  const agencyBounded = knowledgeBank.agencyRelations.every((relation) =>
    relation.boundaries.length > 0 && relation.sourceIds.length > 0
  );
  results.push(criterion(
    "COMP-005",
    knowledgeErrors.length === 0 && populationBoundaryPresent && agencyBounded && derivedCurrentness.pass,
    `${knowledgeBank.sources.length} sources, ${knowledgeBank.claims.length} claims, ${knowledgeBank.agencyRelations.length} agency relations, and ${knowledgeBank.corrections.length} corrections validated; derived Wiki and employment outputs ${derivedCurrentness.pass ? "are current" : "are stale"}.`,
    [
      ...knowledgeErrors,
      ...derivedCurrentness.wikiErrors,
      ...derivedCurrentness.generatedIssues,
      ...derivedCurrentness.employmentIssues
    ]
  ));

  const professorResult = evaluateProfessorLenses();
  const noProofsRoute = !existsSync(path.join(repoRoot, "apps/www/src/app/proofs/page.tsx"));
  const selectiveProjection = professorResult.pass && noProofsRoute &&
    queryKnowledgeLifecycle(knowledgeBank).matureHeldClaimIds.length > 0;
  results.push(criterion(
    "COMP-006",
    selectiveProjection,
    `${professorResult.passed}/${professorResult.total} professor-lens criteria pass; mature held claims remain off a public proofs route.`,
    professorResult.criteria.filter((item) => !item.pass).map((item) => item.id)
  ));

  const humanControlledIds = new Set([
    "BLIND-HUMAN-CORROBORATION",
    "BLIND-COLLECTIVE-REVIEW",
    "BLIND-HIRING-USABILITY",
    "BLIND-JOB-FUNNEL",
    "BLIND-EXTERNAL-VALIDITY"
  ]);
  const humanControls = blindSpots.controls.filter((control) => humanControlledIds.has(control.id));
  const blindSpotDigest = computeCanonicalJsonDigest(blindSpots);
  const honestBlindSpots = blindSpotDigest === suite.blind_spot_controls.sha256 &&
    blindSpots.evaluationSemantics.instrumentedIsNotValidated === true &&
    blindSpots.evaluationSemantics.externalEvidenceCannotBeSynthesized === true &&
    humanControls.length === humanControlledIds.size &&
    humanControls.every((control) =>
      control.status === "open" &&
      control.requiredEvidence.length > 0 &&
      control.antiGaming.length > 0 &&
      control.nextAction.trim() &&
      control.publicProjectionRule.trim()
    );
  results.push(criterion(
    "COMP-007",
    Boolean(honestBlindSpots),
    `${humanControls.length}/${humanControlledIds.size} human-evidence controls remain explicitly open under reviewed digest ${blindSpotDigest}.`,
    honestBlindSpots ? [] : ["A human-evidence gap was changed, synthesized, closed, or left without reviewed governance."]
  ));

  const actualRubricDigest = computeCompositeRubricDigest(suite);
  const frozenGovernance = actualRubricDigest === suite.rubric_sha256 &&
    actualRubricDigest === FROZEN_COMPOSITE_RUBRIC_SHA256 &&
    baseSuiteDigest === suite.base_suite.sha256 &&
    registerDigest === suite.integration_register_sha256 &&
    blindSpotDigest === suite.blind_spot_controls.sha256 &&
    suite.optimization.rubric_is_frozen_during_run === true &&
    suite.grader_separation.optimizer_may_grade_own_patch === false &&
    suite.grader_separation.not_observed_may_pass === false &&
    suite.grader_separation.instrumented_absence_counts_as_external_validation === false &&
    portfolioSuite.launch_thresholds.all_blocking_evals_must_pass === true &&
    portfolioSuite.launch_thresholds.human_production_approval_required === true &&
    derivedCurrentness.pass;
  results.push(criterion(
    "COMP-008",
    frozenGovernance,
    `Frozen rubric digest: ${actualRubricDigest}.`,
    frozenGovernance ? [] : [
      "Rubric lock, grader separation, or derived-output currentness does not match the frozen contract.",
      ...derivedCurrentness.wikiErrors,
      ...derivedCurrentness.generatedIssues,
      ...derivedCurrentness.employmentIssues
    ]
  ));

  const candidateFingerprint = computeCompositeCandidateFingerprint(suite);
  const candidateFiles = listCompositeCandidateFiles(suite);
  const candidateFileSet = new Set(candidateFiles);
  const sourceTreeBound = suite.candidate_identity.strategy === "git-source-tree" &&
    JSON.stringify([...suite.candidate_identity.exclude_only].sort()) ===
      JSON.stringify([...suite.holdout_runs].sort()) &&
    suite.canonical_files.every((relativePath) => candidateFileSet.has(relativePath)) &&
    suite.evidence_bundle_files.every((relativePath) => candidateFileSet.has(relativePath));
  const requiredCriterionIds = suite.criteria.map((entry) => entry.id);
  const reviewerLabels = holdouts.map((run) => run.publicReview?.reviewerLabel);
  const publicReviewPass = holdouts.length === 2 &&
    new Set(reviewerLabels).size === 2 &&
    holdouts.every((run) => {
      const publicReview = run.publicReview ?? {};
      const reviewedAt = Date.parse(publicReview.reviewedAt);
      return run.runVersion === suite.holdout_provenance.run_version &&
        publicReview.provider === suite.holdout_provenance.provider &&
        typeof publicReview.reviewerLabel === "string" &&
        publicReview.reviewerLabel.length > 0 &&
        /^[a-f0-9]{64}$/.test(publicReview.judgmentSha256 ?? "") &&
        publicReview.judgmentSha256 === computeHoldoutJudgmentDigest(run) &&
        publicReview.attestation === "Review judgment recorded for this exact candidate; this public receipt does not authenticate reviewer process identity, and private process identifiers and local machine locators are intentionally omitted." &&
        Number.isFinite(reviewedAt);
    });
  const stableHoldouts = sourceTreeBound && publicReviewPass && holdouts.length === 2 &&
    new Set(holdouts.map((run) => run.judgeId)).size === 2 &&
    holdouts.every((run) =>
      run.grader === "independent_llm_judge" &&
      run.independentFromOptimizer === true &&
      run.rubricSha256 === suite.rubric_sha256 &&
      run.candidateFingerprint === candidateFingerprint &&
      run.verdict === "accepted" &&
      Array.isArray(run.notObserved) && run.notObserved.length === 0 &&
      requiredCriterionIds.every((id) =>
        run.scores.some((score) => score.criterionId === id && score.score === 4 && score.pass === true)
      )
    );
  results.push(criterion(
    "COMP-009",
    stableHoldouts,
    `${holdouts.length}/2 public-safe holdout judgments target ${candidateFiles.length} source-tree files at candidate ${candidateFingerprint}.`,
    stableHoldouts ? [] : [
      "Two accepted, public-safe holdout judgments for the exact source-tree candidate are not yet present; separate commissioning is an orchestration gate outside public Git."
    ]
  ));

  return {
    suiteId: suite.suite_id,
    rubricSha256: actualRubricDigest,
    candidateFingerprint,
    criteria: results,
    accepted: results.every((item) => item.pass),
    score: results.reduce((sum, item) => sum + item.score, 0),
    scoreMaximum: results.length * 4,
    openHumanGates: blindSpots.knownLaunchTasksExcluded
  };
}
