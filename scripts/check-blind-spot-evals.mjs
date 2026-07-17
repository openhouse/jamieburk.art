import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";

const suitePath = ".agents/evals/blind-spot-readiness.json";

const registerPaths = {
  corroboration: "docs/knowledge-bank/collaborator-corroboration-queue.json",
  pathways: "docs/knowledge-bank/institutional-pathways.json",
  metrics: "docs/knowledge-bank/metric-register.json",
  argument: "docs/evals/application-argument.json",
  context: "docs/knowledge-bank/contextual-integrity-register.json",
  validation: "docs/evals/blind-spot-validation-state.json"
};

function readJson(relativePath) {
  return existsSync(relativePath)
    ? JSON.parse(readFileSync(relativePath, "utf8"))
    : null;
}

export function validateSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(suite?.version === 1, "suite.version must be 1");
  requireValue(
    suite?.suite_id === "blind-spot-readiness",
    "suite.suite_id must be blind-spot-readiness"
  );
  requireValue(
    Array.isArray(suite?.hard_constraints) && suite.hard_constraints.length >= 7,
    "suite.hard_constraints must cover the seven blind spots"
  );
  requireValue(
    Array.isArray(suite?.evals) && suite.evals.length === 7,
    "suite must contain exactly seven blind-spot evals"
  );

  const ids = new Set();
  const allowedGraders = new Set(["deterministic", "llm_judge", "hybrid"]);
  let totalWeight = 0;
  let blockingCount = 0;

  for (const [index, entry] of (suite?.evals ?? []).entries()) {
    const prefix = `suite.evals[${index}]`;
    requireValue(
      typeof entry.id === "string" && /^BS-00[1-7]$/.test(entry.id),
      `${prefix}.id must use BS-001 through BS-007`
    );
    requireValue(!ids.has(entry.id), `${prefix}.id must be unique`);
    ids.add(entry.id);
    requireValue(
      typeof entry.title === "string" && entry.title.trim(),
      `${prefix}.title is required`
    );
    requireValue(allowedGraders.has(entry.grader), `${prefix}.grader is invalid`);
    requireValue(typeof entry.blocking === "boolean", `${prefix}.blocking is required`);
    requireValue(
      Number.isInteger(entry.weight) && entry.weight > 0,
      `${prefix}.weight must be a positive integer`
    );
    for (const field of [
      "inputs",
      "procedure",
      "pass_criteria",
      "evidence_required"
    ]) {
      requireValue(
        Array.isArray(entry[field]) && entry[field].length > 0,
        `${prefix}.${field} must be non-empty`
      );
    }
    requireValue(
      typeof entry.remediation_hint === "string" && entry.remediation_hint.trim(),
      `${prefix}.remediation_hint is required`
    );
    totalWeight += Number.isInteger(entry.weight) ? entry.weight : 0;
    if (entry.blocking) blockingCount += 1;
  }

  requireValue(totalWeight === 100, `eval weights must total 100; received ${totalWeight}`);
  requireValue(blockingCount === 6, `suite must contain six blockers; received ${blockingCount}`);
  requireValue(
    [...ids].sort().join(",") ===
      ["BS-001", "BS-002", "BS-003", "BS-004", "BS-005", "BS-006", "BS-007"].join(","),
    "suite must represent every blind spot exactly once"
  );

  const validateThresholds = (name, thresholds, release = false) => {
    requireValue(typeof thresholds === "object" && thresholds, `${name} is required`);
    requireValue(
      typeof thresholds?.weighted_score_minimum === "number" &&
        thresholds.weighted_score_minimum >= 0 &&
        thresholds.weighted_score_minimum <= 1,
      `${name}.weighted_score_minimum is invalid`
    );
    for (const field of ["blocking_score_minimum", "nonblocking_score_minimum"]) {
      requireValue(
        Number.isInteger(thresholds?.[field]) &&
          thresholds[field] >= 0 &&
          thresholds[field] <= 4,
        `${name}.${field} is invalid`
      );
    }
    requireValue(
      thresholds?.all_blocking_evals_must_pass === true,
      `${name} must require all blockers`
    );
    requireValue(
      thresholds?.two_consecutive_passing_runs_required === true,
      `${name} must require two passing runs`
    );
    requireValue(
      thresholds?.human_approval_required === release,
      `${name}.human_approval_required is incorrect`
    );
    if (release) {
      for (const field of [
        "independent_holdout_required",
        "cold_reader_validation_required",
        "live_use_validation_required"
      ]) {
        requireValue(thresholds?.[field] === true, `${name}.${field} must be true`);
      }
    }
  };

  validateThresholds(
    "development_readiness_thresholds",
    suite?.development_readiness_thresholds
  );
  validateThresholds(
    "release_readiness_thresholds",
    suite?.release_readiness_thresholds,
    true
  );

  requireValue(
    suite?.optimization?.rubric_is_frozen_during_run === true,
    "optimizer must freeze the rubric"
  );
  requireValue(
    suite?.optimization?.optimizer_may_not_grade_own_patch === true,
    "optimizer may not grade its own patch"
  );
  requireValue(
    suite?.optimization?.holdout_judge_is_blind_to_patch_intent === true,
    "holdout judge must be blind to patch intent"
  );
  requireValue(
    suite?.optimization?.one_primary_failure_per_iteration === true,
    "each iteration must select one primary failure"
  );
  requireValue(
    suite?.iteration_record_schema?.allowed_decisions?.includes("stop_human_blocked"),
    "iteration records must support stop_human_blocked"
  );
  requireValue(
    suite?.run_record_schema?.allowed_targets?.includes("development-readiness") &&
      suite.run_record_schema.allowed_targets.includes("release-readiness"),
    "run records must support development and release targets"
  );

  return { errors, totalWeight, blockingCount, evalCount: suite?.evals?.length ?? 0 };
}

export function validateEvidenceContracts(registers = {}) {
  const errors = [];
  const value = (key) =>
    registers[key] === undefined ? readJson(registerPaths[key]) : registers[key];
  const corroboration = value("corroboration");
  const pathways = value("pathways");
  const metrics = value("metrics");
  const argument = value("argument");
  const context = value("context");
  const validation = value("validation");
  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  const proofIds = new Set(proofClaims.map((proof) => proof.id));
  const propositionIds = new Set(
    knowledgeBank.intakeItems.flatMap((item) =>
      item.propositions.map((proposition) => proposition.id)
    )
  );

  if (!corroboration) {
    errors.push(`missing ${registerPaths.corroboration}`);
  } else {
    if (!Array.isArray(corroboration.items) || corroboration.items.length < 6) {
      errors.push("collaborator corroboration queue must contain at least six priority items");
    }
    for (const item of corroboration.items ?? []) {
      if (!item.id || !item.project || !item.status) {
        errors.push("every corroboration item requires id, project, and status");
      }
      if (!Array.isArray(item.propositionIds) || !item.propositionIds.length) {
        errors.push(`${item.id} requires propositionIds`);
      }
      for (const id of item.propositionIds ?? []) {
        if (!propositionIds.has(id)) errors.push(`${item.id} references unknown proposition ${id}`);
      }
      for (const field of ["established", "neededEvidence", "confirmAction", "narrowAction"]) {
        if (!Array.isArray(item[field]) || !item[field].length) {
          errors.push(`${item.id}.${field} must be non-empty`);
        }
      }
    }
  }

  if (!pathways) {
    errors.push(`missing ${registerPaths.pathways}`);
  } else {
    if (!Array.isArray(pathways.items) || pathways.items.length < 4) {
      errors.push("institutional pathway register must contain at least four pathways");
    }
    for (const item of pathways.items ?? []) {
      if (!Array.isArray(item.stages) || item.stages.length < 4) {
        errors.push(`${item.id} requires at least four pathway stages`);
      }
      if (!item.firstMissingLink) errors.push(`${item.id} requires firstMissingLink`);
      if (!Array.isArray(item.nextSources) || !item.nextSources.length) {
        errors.push(`${item.id}.nextSources must be non-empty`);
      }
      if (!Array.isArray(item.antiClaims) || !item.antiClaims.length) {
        errors.push(`${item.id}.antiClaims must be non-empty`);
      }
      for (const id of item.sourceIds ?? []) {
        if (!sourceIds.has(id)) errors.push(`${item.id} references unknown source ${id}`);
      }
    }
  }

  if (!metrics) {
    errors.push(`missing ${registerPaths.metrics}`);
  } else {
    if (!Array.isArray(metrics.items) || metrics.items.length < 8) {
      errors.push("metric register must contain at least eight consequential metrics");
    }
    for (const item of metrics.items ?? []) {
      if (!proofIds.has(item.proofId)) errors.push(`${item.id} references unknown proof ${item.proofId}`);
      for (const field of [
        "displayValue",
        "definition",
        "unit",
        "timeWindow",
        "method",
        "supportStatus",
        "uncertainty",
        "projectionStatus",
        "nextStep"
      ]) {
        if (typeof item[field] !== "string" || !item[field].trim()) {
          errors.push(`${item.id}.${field} is required`);
        }
      }
      if (!Array.isArray(item.doNotInfer) || !item.doNotInfer.length) {
        errors.push(`${item.id}.doNotInfer must be non-empty`);
      }
    }
  }

  if (!argument) {
    errors.push(`missing ${registerPaths.argument}`);
  } else {
    for (const field of ["audience", "desiredAction", "category", "leadClaim"]) {
      if (typeof argument[field] !== "string" || !argument[field].trim()) {
        errors.push(`application argument requires ${field}`);
      }
    }
    if (!/Technical Project Manager/i.test(argument.category ?? "")) {
      errors.push("application argument category must name Technical Project Manager");
    }
    if (!Array.isArray(argument.proofPillars) || argument.proofPillars.length < 3) {
      errors.push("application argument requires at least three proof pillars");
    }
    for (const pillar of argument.proofPillars ?? []) {
      if (!pillar.job || !Array.isArray(pillar.proofIds) || !pillar.proofIds.length) {
        errors.push(`${pillar.id} requires an argumentative job and proofIds`);
      }
      for (const id of pillar.proofIds ?? []) {
        if (!proofIds.has(id)) errors.push(`${pillar.id} references unknown proof ${id}`);
      }
      if (!Array.isArray(pillar.routes) || !pillar.routes.length) {
        errors.push(`${pillar.id} requires routes`);
      }
    }
    if (!Array.isArray(argument.deferred) || argument.deferred.length < 3) {
      errors.push("application argument must name at least three deferred bodies of knowledge");
    }
  }

  if (!context) {
    errors.push(`missing ${registerPaths.context}`);
  } else {
    const requiredRisks = new Set([
      "public-is-not-consent",
      "shared-authorship",
      "vulnerable-community-context",
      "digital-trace-bias",
      "current-status-drift",
      "ai-synthesis"
    ]);
    const observed = new Set((context.risks ?? []).map((risk) => risk.id));
    for (const id of requiredRisks) {
      if (!observed.has(id)) errors.push(`contextual-integrity register is missing ${id}`);
    }
    for (const risk of context.risks ?? []) {
      if (!Array.isArray(risk.controls) || !risk.controls.length || !risk.reviewTrigger) {
        errors.push(`${risk.id} requires controls and a reviewTrigger`);
      }
    }
    if (!Array.isArray(context.offlineEvidenceCommitments) || context.offlineEvidenceCommitments.length < 4) {
      errors.push("contextual-integrity register must preserve at least four offline evidence commitments");
    }
  }

  if (!validation) {
    errors.push(`missing ${registerPaths.validation}`);
  } else {
    const allowedStatuses = new Set(["pending", "blocked", "complete"]);
    for (const key of ["independentHoldout", "coldReader", "liveUse"]) {
      const item = validation[key];
      if (!item || !allowedStatuses.has(item.status)) {
        errors.push(`validation state ${key} has an invalid status`);
        continue;
      }
      if (!item.owner || !item.nextAction) {
        errors.push(`validation state ${key} requires owner and nextAction`);
      }
      if (item.status === "blocked" && !item.blockedReason) {
        errors.push(`blocked validation state ${key} requires blockedReason`);
      }
      if (item.status === "complete" && !item.candidateSha) {
        errors.push(`complete validation state ${key} requires candidateSha`);
      }
    }
    if (validation.releaseReady === true) {
      for (const key of ["independentHoldout", "coldReader", "liveUse"]) {
        if (validation[key]?.status !== "complete") {
          errors.push("releaseReady cannot be true while validation remains incomplete");
        }
      }
    }
  }

  const serialized = JSON.stringify({
    corroboration,
    pathways,
    metrics,
    argument,
    context,
    validation
  });
  if (/\/(?:Users|Volumes)\//.test(serialized)) {
    errors.push("blind-spot registers expose a local private path");
  }
  if (existsSync("apps/www/src/app/proofs") || existsSync("apps/www/src/app/knowledge-bank")) {
    errors.push("blind-spot work created a public proofs or knowledge-bank route");
  }

  const nyca = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-NYCA-CULTURAL-SPACE-POLICY-2026-07-12"
  );
  for (const id of [
    "PROP-NYCA-JAMIE-ESPINAL-CABARET-TESTIMONY-2017",
    "PROP-NYCA-INSTITUTIONAL-USE-JAMIE-INTERPRETATION-2026"
  ]) {
    if (!nyca?.propositions.some((proposition) => proposition.id === id)) {
      errors.push(`NYCA blind-spot evidence is missing ${id}`);
    }
  }

  return errors;
}

function run() {
  const suite = readJson(suitePath);
  const suiteResult = validateSuite(suite);
  const evidenceErrors = validateEvidenceContracts();
  const errors = [...suiteResult.errors, ...evidenceErrors];

  if (errors.length) {
    console.error("Blind-spot eval validation failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(
    `Blind-spot eval suite passed: ${suiteResult.evalCount} evals, ` +
      `${suiteResult.blockingCount} blocking, weights total ${suiteResult.totalWeight}.`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
