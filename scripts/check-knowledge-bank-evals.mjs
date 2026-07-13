#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";
import publicRegistry from "../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };

const suitePath = ".agents/evals/knowledge-bank-development.json";

export function validateKnowledgeContent(bank = knowledgeBank, registry = publicRegistry, proofs = proofClaims) {
  const errors = [];
  const sourceIds = new Set(bank.sources.map((source) => source.id));
  const claimIds = new Set(bank.claims.map((claim) => claim.id));
  const proofIds = new Set(proofs.map((proof) => proof.id));
  const publicText = JSON.stringify(registry);

  for (const source of bank.sources) {
    if (!source.supportsGenerally.length) {
      errors.push(`${source.id} does not state what it supports`);
    }
    if (!source.doesNotEstablish.length) {
      errors.push(`${source.id} does not state what it cannot establish`);
    }
  }

  for (const item of bank.intakeItems) {
    const propositionIds = new Set();
    const itemSourceIds = new Set(item.sourceIds);
    const supportedPropositionTexts = new Set();
    if (item.projectionStatus !== "no-public-projection") {
      errors.push(`${item.id} is projectable directly from intake`);
    }
    if (publicText.includes(item.id)) {
      errors.push(`${item.id} leaked into the generated public registry`);
    }
    if (item.boundaries.length < 3) {
      errors.push(`${item.id} needs at least three material boundaries`);
    }
    if (item.researchQuestions.length < 3 && item.status !== "integrated") {
      errors.push(`${item.id} needs at least three answerable research questions`);
    }
    for (const sourceId of item.sourceIds) {
      if (!sourceIds.has(sourceId)) errors.push(`${item.id} references unknown source ${sourceId}`);
    }
    for (const claimId of item.relatedClaimIds) {
      if (!claimIds.has(claimId)) errors.push(`${item.id} references unknown claim ${claimId}`);
    }
    for (const proofId of item.relatedProofIds) {
      if (!proofIds.has(proofId)) errors.push(`${item.id} references unknown proof ${proofId}`);
    }
    if (["source-associated", "researching", "claim-candidate"].includes(item.status) && !item.sourceIds.length) {
      errors.push(`${item.id} is ${item.status} without an associated source`);
    }
    if (item.status === "claim-candidate" && !item.candidateClaims.length) {
      errors.push(`${item.id} is a claim candidate without candidate wording`);
    }
    if (item.status === "integrated" && !item.relatedClaimIds.length) {
      errors.push(`${item.id} is integrated without a governed claim`);
    }
    if (item.kind === "memory-fragment" && !item.boundaries.some((boundary) => /memory|recollection|research lead/i.test(boundary))) {
      errors.push(`${item.id} does not label memory as a research lead`);
    }
    if (item.kind === "metric-lead") {
      const questions = item.researchQuestions.join(" ");
      if (!/denominator/i.test(questions) || !/time window/i.test(questions)) {
        errors.push(`${item.id} metric research omits a denominator or time window`);
      }
    }
    for (const claim of item.candidateClaims) {
      if (!/\bJamie\b/.test(claim)) errors.push(`${item.id} candidate claim does not name Jamie`);
      if (/Jamie (?:alone|single-handedly)|Jamie caused/i.test(claim)) {
        errors.push(`${item.id} candidate claim inflates sole causality`);
      }
    }
    for (const proposition of item.propositions) {
      if (propositionIds.has(proposition.id)) {
        errors.push(`${item.id} repeats proposition ${proposition.id}`);
      }
      propositionIds.add(proposition.id);
      for (const sourceId of proposition.sourceIds) {
        if (!sourceIds.has(sourceId)) {
          errors.push(`${proposition.id} references unknown source ${sourceId}`);
        }
        if (!itemSourceIds.has(sourceId)) {
          errors.push(`${proposition.id} uses ${sourceId} outside its intake source set`);
        }
      }
      if (proposition.sourceIds.length && !proposition.sourceSupport.length) {
        errors.push(`${proposition.id} does not decompose source support`);
      }
      if (["direct-support", "supported-with-boundary", "synthesis-with-boundary"].includes(proposition.status)) {
        supportedPropositionTexts.add(proposition.text);
      }
    }
    for (const claim of item.candidateClaims) {
      if (!supportedPropositionTexts.has(claim)) {
        errors.push(`${item.id} candidate claim is not a supported proposition`);
      }
    }
    const itemProofIds = new Set(item.relatedProofIds);
    for (const tension of item.tensions) {
      for (const propositionId of tension.propositionIds) {
        if (!propositionIds.has(propositionId)) {
          errors.push(`${tension.id} references unknown intake proposition ${propositionId}`);
        }
      }
      for (const proofId of tension.relatedProofIds) {
        if (!proofIds.has(proofId)) {
          errors.push(`${tension.id} references unknown proof ${proofId}`);
        }
        if (!itemProofIds.has(proofId)) {
          errors.push(`${tension.id} uses ${proofId} outside its intake proof set`);
        }
      }
      const tensionProofIds = new Set(tension.relatedProofIds);
      for (const trigger of tension.correctionTriggers) {
        if (!proofIds.has(trigger.targetProofId)) {
          errors.push(`${trigger.id} targets unknown proof ${trigger.targetProofId}`);
        }
        if (!tensionProofIds.has(trigger.targetProofId)) {
          errors.push(`${trigger.id} targets ${trigger.targetProofId} outside its tension proof set`);
        }
      }
    }
  }

  return errors;
}

export function validateSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(suite.version === 1, "suite.version must be 1");
  requireValue(suite.suite_id === "knowledge-bank-development", "suite_id must be knowledge-bank-development");
  requireValue(Array.isArray(suite.hard_constraints) && suite.hard_constraints.length >= 5, "hard constraints are incomplete");
  requireValue(Array.isArray(suite.evals) && suite.evals.length > 0, "evals must be non-empty");

  const ids = new Set();
  const allowedGraders = new Set(["deterministic", "llm_judge", "hybrid", "human_approval"]);
  let totalWeight = 0;
  let blockingCount = 0;

  for (const [index, entry] of (suite.evals ?? []).entries()) {
    const prefix = `suite.evals[${index}]`;
    requireValue(typeof entry.id === "string" && /^KB-\d{3}$/.test(entry.id), `${prefix}.id must use KB-### format`);
    requireValue(!ids.has(entry.id), `${prefix}.id must be unique`);
    ids.add(entry.id);
    requireValue(typeof entry.title === "string" && entry.title.trim(), `${prefix}.title is required`);
    requireValue(allowedGraders.has(entry.grader), `${prefix}.grader is invalid`);
    requireValue(typeof entry.blocking === "boolean", `${prefix}.blocking must be boolean`);
    requireValue(Number.isInteger(entry.weight) && entry.weight > 0, `${prefix}.weight must be positive`);
    for (const field of ["inputs", "procedure", "pass_criteria", "evidence_required"]) {
      requireValue(Array.isArray(entry[field]) && entry[field].length > 0, `${prefix}.${field} must be non-empty`);
    }
    requireValue(typeof entry.remediation_hint === "string" && entry.remediation_hint.trim(), `${prefix}.remediation_hint is required`);
    totalWeight += Number.isInteger(entry.weight) ? entry.weight : 0;
    if (entry.blocking) blockingCount += 1;
  }

  requireValue(totalWeight === 100, `eval weights must total 100; received ${totalWeight}`);
  for (const id of ["KB-001", "KB-002", "KB-003", "KB-006", "KB-009", "KB-010"]) {
    requireValue(suite.evals?.find((entry) => entry.id === id)?.blocking === true, `${id} must remain blocking`);
  }

  const validateThresholds = (name, thresholds, humanRequired) => {
    requireValue(typeof thresholds === "object" && thresholds !== null, `${name} is required`);
    requireValue(typeof thresholds?.weighted_score_minimum === "number" && thresholds.weighted_score_minimum >= 0 && thresholds.weighted_score_minimum <= 1, `${name}.weighted_score_minimum is invalid`);
    for (const field of ["blocking_score_minimum", "nonblocking_score_minimum"]) {
      requireValue(Number.isInteger(thresholds?.[field]) && thresholds[field] >= 0 && thresholds[field] <= 4, `${name}.${field} is invalid`);
    }
    requireValue(thresholds?.all_blocking_evals_must_pass === true, `${name} must require all blockers`);
    requireValue(thresholds?.two_consecutive_passing_runs_required === true, `${name} must require two passing runs`);
    requireValue(thresholds?.human_approval_required === humanRequired, `${name}.human_approval_required is incorrect`);
  };

  validateThresholds("claim_development_thresholds", suite.claim_development_thresholds, false);
  validateThresholds("projection_candidate_thresholds", suite.projection_candidate_thresholds, true);
  requireValue(suite.projection_candidate_thresholds?.holdout_regression_must_pass === true, "projection candidates require a holdout regression");
  requireValue(suite.optimization?.rubric_is_frozen_during_run === true, "rubric must be frozen during a run");
  requireValue(suite.optimization?.optimizer_may_not_grade_own_patch === true, "optimizer may not grade its own patch");
  requireValue(suite.optimization?.holdout_judge_is_blind_to_patch_intent === true, "holdout judge must be blind");
  requireValue(suite.optimization?.success_requires_two_consecutive_passing_runs === true, "success requires two passing runs");
  requireValue(suite.optimization?.one_primary_failure_per_iteration === true, "iterations must select one primary failure");
  requireValue(suite.run_record_schema?.allowed_targets?.includes("claim-development"), "run schema must support claim-development");
  requireValue(suite.run_record_schema?.allowed_targets?.includes("projection-candidate"), "run schema must support projection-candidate");
  requireValue(suite.iteration_record_schema?.allowed_decisions?.includes("stop_human_blocked"), "iteration schema must support human-blocked stops");

  return { errors, totalWeight, blockingCount, evalCount: suite.evals?.length ?? 0 };
}

function run() {
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const suiteResult = validateSuite(suite);
  const contentErrors = validateKnowledgeContent();
  if (suiteResult.errors.length || contentErrors.length) {
    console.error("Knowledge-bank eval validation failed:");
    for (const error of [...suiteResult.errors, ...contentErrors]) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Knowledge-bank eval suite passed: ${suiteResult.evalCount} evals, ${suiteResult.blockingCount} blocking, weights total ${suiteResult.totalWeight}.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
