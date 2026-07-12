#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const suitePath = ".agents/evals/knowledge-bank-development.json";
const privateMarker = /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|raw[-_ ](?:transcript|export)|\.mbox|credential|password/i;
const publicProjectionKeys = new Set([
  "case-study",
  "work-card",
  "resume-html",
  "technical-operations",
  "homepage"
]);

export function validateKnowledgeDevelopmentSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(suite?.version === 1, "suite.version must be 1");
  requireValue(
    suite?.suite_id === "knowledge-bank-development",
    "suite.suite_id must be knowledge-bank-development"
  );
  requireValue(Array.isArray(suite?.hard_constraints) && suite.hard_constraints.length > 0, "suite requires hard constraints");
  requireValue(Array.isArray(suite?.evals) && suite.evals.length > 0, "suite requires evals");
  requireValue(suite?.optimization?.rubric_is_frozen_during_run === true, "the rubric must be frozen during a run");
  requireValue(suite?.optimization?.optimizer_may_not_grade_own_patch === true, "the optimizer may not grade its own patch");
  requireValue(suite?.optimization?.nothing_is_silently_discarded === true, "the suite must prohibit silent discard");
  requireValue(suite?.thresholds?.two_consecutive_passing_runs_required === true, "two consecutive passing runs are required");

  let totalWeight = 0;
  const ids = new Set();
  for (const [index, entry] of (suite?.evals ?? []).entries()) {
    const prefix = `suite.evals[${index}]`;
    requireValue(/^KB-\d{3}$/.test(entry.id ?? ""), `${prefix}.id must use KB-###`);
    requireValue(!ids.has(entry.id), `${prefix}.id must be unique`);
    ids.add(entry.id);
    requireValue(typeof entry.blocking === "boolean", `${prefix}.blocking must be boolean`);
    requireValue(Number.isInteger(entry.weight) && entry.weight > 0, `${prefix}.weight must be positive`);
    requireValue(Array.isArray(entry.procedure) && entry.procedure.length > 0, `${prefix}.procedure is required`);
    requireValue(Array.isArray(entry.pass_criteria) && entry.pass_criteria.length > 0, `${prefix}.pass_criteria is required`);
    requireValue(typeof entry.remediation_hint === "string" && entry.remediation_hint.length > 0, `${prefix}.remediation_hint is required`);
    totalWeight += Number.isInteger(entry.weight) ? entry.weight : 0;
  }
  requireValue(totalWeight === 100, `eval weights must total 100; received ${totalWeight}`);
  return { errors, totalWeight, evalCount: suite?.evals?.length ?? 0 };
}

function makeResult(id, findings, evidence) {
  return {
    eval_id: id,
    score: findings.length === 0 ? 4 : 0,
    pass: findings.length === 0,
    evidence,
    findings
  };
}

export function evaluateKnowledgeBank(suite, bank, consecutivePassingRuns = 1) {
  const sourceIds = new Set(bank.sources.map((item) => item.id));
  const claimIds = new Set(bank.claims.map((item) => item.id));
  const taskIds = new Set(bank.researchTasks.map((item) => item.id));
  const inquiryIds = new Set(bank.researchInquiries.map((item) => item.id));
  const assertionIds = new Set(bank.sourceAssertions.map((item) => item.id));
  const assertionSourceIds = new Set(bank.sourceAssertions.map((item) => item.sourceId));
  const findings = Object.fromEntries(suite.evals.map((entry) => [entry.id, []]));

  for (const item of bank.intake) {
    const linkedCount = item.sourceIds.length + item.claimIds.length + item.researchTaskIds.length;
    if (["captured", "triaged"].includes(item.status)) findings["KB-001"].push(`${item.id} has no completed disposition`);
    if (["decomposed", "integrated"].includes(item.status) && linkedCount === 0) findings["KB-001"].push(`${item.id} has no linked disposition`);
    if (item.status === "held" && item.notes.length === 0) findings["KB-001"].push(`${item.id} is held without a reason`);
    for (const id of item.sourceIds) if (!sourceIds.has(id)) findings["KB-005"].push(`${item.id} references missing source ${id}`);
    for (const id of item.claimIds) if (!claimIds.has(id)) findings["KB-005"].push(`${item.id} references missing claim ${id}`);
    for (const id of item.researchTaskIds) if (!taskIds.has(id)) findings["KB-005"].push(`${item.id} references missing task ${id}`);
    for (const id of item.sourceIds) if (!assertionSourceIds.has(id)) findings["KB-003"].push(`${item.id} source ${id} has no atomic assertion`);
  }

  const serialized = JSON.stringify(bank);
  if (privateMarker.test(serialized)) findings["KB-002"].push("knowledge bank contains a private path or raw-source marker");
  for (const source of bank.sources) {
    const hasUrl = Boolean(source.canonicalUrl || source.archiveUrl || source.assetUrl);
    if (source.visibility === "public" && !hasUrl) findings["KB-002"].push(`${source.id} is public without a public URL`);
    if (source.visibility !== "public" && hasUrl) findings["KB-002"].push(`${source.id} exposes a URL for a non-public source`);
    if (!source.publicCitation) findings["KB-002"].push(`${source.id} lacks a public-safe citation`);
  }

  for (const assertion of bank.sourceAssertions) {
    if (!sourceIds.has(assertion.sourceId)) findings["KB-005"].push(`${assertion.id} references missing source ${assertion.sourceId}`);
    for (const id of assertion.candidateClaimIds) if (!claimIds.has(id)) findings["KB-005"].push(`${assertion.id} references missing claim ${id}`);
    if (!assertion.publicSafe) findings["KB-002"].push(`${assertion.id} is marked unsafe in the public registry`);
  }

  for (const claim of bank.claims) {
    const confirmed = ["confirmed", "confirmed-with-boundary"].includes(claim.maturity);
    const directSupport = claim.evidence.some((item) => item.relationship === "direct-support");
    if (confirmed && !directSupport) findings["KB-004"].push(`${claim.id} is confirmed without direct support`);
    if (claim.projectionEligibility === "eligible" && !confirmed) findings["KB-004"].push(`${claim.id} is eligible before confirmation`);
    if (claim.maturity === "research-needed" && claim.projectionEligibility !== "hold") findings["KB-004"].push(`${claim.id} is research-needed but not held`);
    if (claim.collectiveWork && (claim.boundaries.length === 0 || claim.antiClaims.length === 0)) findings["KB-007"].push(`${claim.id} lacks a collective-credit boundary or anti-claim`);
    for (const evidence of claim.evidence) if (!sourceIds.has(evidence.sourceId)) findings["KB-005"].push(`${claim.id} references missing source ${evidence.sourceId}`);
    for (const id of claim.researchInquiryIds) if (!inquiryIds.has(id)) findings["KB-005"].push(`${claim.id} references missing inquiry ${id}`);

    const publicActive = claim.projections.some((projection) => projection.status === "active" && publicProjectionKeys.has(projection.key));
    if (publicActive && claim.projectionEligibility !== "eligible") findings["KB-008"].push(`${claim.id} has an active public projection while held`);
    if (claim.projectionEligibility === "eligible" && claim.projections.length === 0) findings["KB-009"].push(`${claim.id} has no use-now or hold disposition`);

    if (claim.maturity === "research-needed") {
      const hasTask = bank.researchTasks.some((task) => task.claimIds.includes(claim.id));
      const hasInquiry = claim.researchInquiryIds.length > 0;
      if (!hasTask && !hasInquiry) findings["KB-006"].push(`${claim.id} has no research task or inquiry`);
    }
  }

  for (const task of bank.researchTasks) {
    for (const id of task.sourceIds) if (!sourceIds.has(id)) findings["KB-005"].push(`${task.id} references missing source ${id}`);
    for (const id of task.claimIds) if (!claimIds.has(id)) findings["KB-005"].push(`${task.id} references missing claim ${id}`);
    if (task.status === "completed" && task.successCriteria.length === 0) findings["KB-006"].push(`${task.id} completed without success criteria`);
  }

  for (const correction of bank.corrections) if (!claimIds.has(correction.claimId)) findings["KB-005"].push(`${correction.id} references missing claim ${correction.claimId}`);
  for (const page of bank.pages) {
    for (const id of page.sourceOrder) if (!sourceIds.has(id)) findings["KB-005"].push(`${page.id} references missing source ${id}`);
    for (const occurrence of page.occurrences) {
      if (!claimIds.has(occurrence.claimId)) findings["KB-005"].push(`${page.id}/${occurrence.id} references missing claim ${occurrence.claimId}`);
      for (const id of occurrence.sourceIds ?? []) if (!sourceIds.has(id)) findings["KB-005"].push(`${page.id}/${occurrence.id} references missing source ${id}`);
    }
  }

  const allIds = [
    ...bank.intake.map((item) => item.id),
    ...bank.sources.map((item) => item.id),
    ...bank.sourceAssertions.map((item) => item.id),
    ...bank.claims.map((item) => item.id),
    ...bank.researchTasks.map((item) => item.id),
    ...bank.researchInquiries.map((item) => item.id),
    ...bank.corrections.map((item) => item.id)
  ];
  if (new Set(allIds).size !== allIds.length) findings["KB-005"].push("stable IDs are duplicated across record classes");
  if (assertionIds.size !== bank.sourceAssertions.length) findings["KB-005"].push("source assertion IDs are duplicated");

  const photoLeads = bank.intake.filter((item) => item.kind === "photo-lead");
  if (photoLeads.length === 0) findings["KB-010"].push("no photo-to-research intake path is represented");
  for (const item of photoLeads) {
    if (item.disposition !== "media-review" || item.researchTaskIds.length === 0) findings["KB-010"].push(`${item.id} bypasses media review or research routing`);
  }
  for (const source of bank.sources.filter((item) => item.kind === "participant-photograph")) {
    if (!source.media || source.media.publicDisplayStatus === "cleared" && source.media.rightsStatus !== "cleared") findings["KB-010"].push(`${source.id} lacks coherent rights and display controls`);
  }

  const evidence = {
    "KB-001": [`${bank.intake.length} intake records inspected`],
    "KB-002": [`${bank.sources.length} source records scanned for provenance and public safety`],
    "KB-003": [`${bank.sourceAssertions.length} atomic source assertions inspected`],
    "KB-004": [`${bank.claims.length} claims checked for maturity and eligibility`],
    "KB-005": ["all cross-record references and stable IDs checked"],
    "KB-006": [`${bank.researchTasks.length} research tasks and ${bank.researchInquiries.length} completed inquiries checked`],
    "KB-007": [`${bank.claims.filter((item) => item.collectiveWork).length} collective-work claims checked`],
    "KB-008": ["active public projections checked against claim eligibility"],
    "KB-009": ["eligible claims checked for explicit use-now or hold disposition"],
    "KB-010": [`${photoLeads.length} photo lead and ${bank.sources.filter((item) => item.kind === "participant-photograph").length} participant-photo source checked`]
  };
  const results = suite.evals.map((entry) => makeResult(entry.id, findings[entry.id], evidence[entry.id]));
  const weightedScore = results.reduce((total, result) => {
    const weight = suite.evals.find((entry) => entry.id === result.eval_id).weight;
    return total + weight * (result.score / suite.score_scale.maximum);
  }, 0) / 100;
  const failedBlocking = suite.evals.filter((entry) => entry.blocking && !results.find((result) => result.eval_id === entry.id).pass);
  const thresholdPassed = weightedScore >= suite.thresholds.weighted_score_minimum && failedBlocking.length === 0;
  const status = thresholdPassed && consecutivePassingRuns >= 2 ? "threshold_met" : "iterate";

  return {
    suite_id: suite.suite_id,
    status,
    weighted_score: Number(weightedScore.toFixed(4)),
    consecutive_passing_runs: thresholdPassed ? consecutivePassingRuns : 0,
    next_eval_id: failedBlocking[0]?.id ?? results.find((result) => !result.pass)?.eval_id ?? null,
    results
  };
}

async function run() {
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const validation = validateKnowledgeDevelopmentSuite(suite);
  if (validation.errors.length) {
    console.error("Knowledge-development suite validation failed:");
    for (const error of validation.errors) console.error(`- ${error}`);
    process.exit(1);
  }

  const { knowledgeBank } = await import("../apps/www/src/data/knowledge-bank/records.ts");
  const consecutiveArg = process.argv.find((value) => value.startsWith("--consecutive="));
  const consecutive = Number(consecutiveArg?.split("=")[1] ?? 1);
  const result = evaluateKnowledgeBank(suite, knowledgeBank, consecutive);
  console.log(JSON.stringify(result, null, 2));
  if (result.results.some((entry) => !entry.pass)) process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await run();
