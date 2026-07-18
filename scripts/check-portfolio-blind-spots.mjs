#!/usr/bin/env node

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";
import { buildKnowledgeMaintenanceReport } from
  "./report-knowledge-maintenance.mjs";

const suitePath = ".agents/evals/portfolio-blind-spots.json";
const evidencePath =
  "docs/knowledge-bank/data/portfolio-blind-spots-evidence-2026-07-15.json";

function read(relativePath) {
  return readFileSync(relativePath, "utf8");
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const itemPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(itemPath) : [itemPath];
  });
}

function countDuplicates(groups) {
  return Object.values(groups).reduce((total, values) => total + values.length, 0);
}

export function validateBlindSpotSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const allowedGraders = new Set([
    "deterministic",
    "hybrid",
    "human_approval"
  ]);
  const ids = new Set();
  let totalWeight = 0;

  requireValue(suite.version === 1, "suite.version must be 1");
  requireValue(
    suite.suite_id === "portfolio-blind-spots",
    "suite.suite_id must be portfolio-blind-spots"
  );
  requireValue(
    Array.isArray(suite.hard_constraints) && suite.hard_constraints.length >= 5,
    "suite must preserve at least five hard constraints"
  );
  requireValue(
    Array.isArray(suite.evals) && suite.evals.length === 9,
    "suite must define all nine blind-spot evals"
  );

  for (const [index, entry] of (suite.evals ?? []).entries()) {
    const prefix = `suite.evals[${index}]`;
    requireValue(/^BS-00[1-9]$/.test(entry.id), `${prefix}.id must use BS-001..BS-009`);
    requireValue(!ids.has(entry.id), `${prefix}.id must be unique`);
    ids.add(entry.id);
    requireValue(allowedGraders.has(entry.grader), `${prefix}.grader is invalid`);
    requireValue(
      typeof entry.human_evidence_required === "boolean",
      `${prefix}.human_evidence_required must be boolean`
    );
    requireValue(
      Number.isInteger(entry.weight) && entry.weight > 0,
      `${prefix}.weight must be a positive integer`
    );
    requireValue(
      Array.isArray(entry.pass_criteria) && entry.pass_criteria.length >= 4,
      `${prefix}.pass_criteria must contain at least four criteria`
    );
    requireValue(
      typeof entry.stopping_boundary === "string" &&
        entry.stopping_boundary.length > 0,
      `${prefix}.stopping_boundary is required`
    );
    totalWeight += Number.isInteger(entry.weight) ? entry.weight : 0;
  }

  requireValue(totalWeight === 100, `eval weights must total 100; received ${totalWeight}`);
  requireValue(
    (suite.evals ?? []).filter(({ human_evidence_required }) =>
      human_evidence_required
    ).length === 3,
    "exactly three evals must preserve human-evidence gates"
  );

  return { errors, totalWeight };
}

export function buildBlindSpotRepoState() {
  const publicFiles = walk("apps/www/public").map((file) => file.replaceAll("\\", "/"));
  return {
    hero: read("apps/www/src/components/Hero.tsx"),
    homepage: read("apps/www/src/app/page.tsx"),
    technicalOperations: read(
      "apps/www/src/app/work/technical-operations/page.tsx"
    ),
    about: read("apps/www/src/app/about/page.tsx"),
    resume: read(
      "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.txt"
    ),
    protocol: read("docs/knowledge-bank/evals/portfolio-blind-spots.md"),
    publicFiles,
    publicProjectImageFiles: publicFiles.filter((file) =>
      /\.(?:avif|gif|jpe?g|png|webp)$/i.test(file)
    ),
    maintenanceReport: buildKnowledgeMaintenanceReport(),
    proofIds: new Set(proofClaims.map(({ id }) => id)),
    claimIds: new Set(knowledgeBank.claims.map(({ id }) => id)),
    proofById: new Map(proofClaims.map((proof) => [proof.id, proof])),
    claimById: new Map(knowledgeBank.claims.map((claim) => [claim.id, claim])),
    sourceById: new Map(knowledgeBank.sources.map((source) => [source.id, source])),
    assertionIds: new Set(knowledgeBank.sourceAssertions.map(({ id }) => id)),
    pageById: new Map(knowledgeBank.pages.map((page) => [page.id, page]))
  };
}

function compareMaintenanceSnapshot(snapshot, report) {
  const errors = [];
  const compare = (actual, expected, label) => {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      errors.push(`${label} does not match the reproducible maintenance report`);
    }
  };
  compare(snapshot.inventory, report.inventory, "maintenance inventory");
  compare(snapshot.fingerprint, report.fingerprint, "maintenance fingerprint");
  compare(snapshot.heldClaimCount, report.lifecycle.heldClaims.length, "held claim count");
  compare(
    snapshot.notRecoveredClaimCount,
    report.lifecycle.notRecoveredClaims.length,
    "not-recovered claim count"
  );
  compare(
    snapshot.inferenceClaimCount,
    report.lifecycle.inferenceClaims.length,
    "inference claim count"
  );
  compare(
    snapshot.contradictoryAssertionCount,
    report.lifecycle.contradictoryAssertions.length,
    "contradictory assertion count"
  );
  compare(
    snapshot.queuedResearchTaskCount,
    report.lifecycle.queuedResearchTasks.length,
    "queued research task count"
  );
  compare(
    snapshot.inProgressResearchTaskCount,
    report.lifecycle.inProgressResearchTasks.length,
    "in-progress research task count"
  );
  compare(snapshot.staleClaimCount, report.reviewAge.staleClaims.length, "stale claim count");
  compare(snapshot.staleProofCount, report.reviewAge.staleProofs.length, "stale proof count");
  compare(
    snapshot.unresolvedSourceIdCount,
    report.integrity.unresolvedSourceIds.length,
    "unresolved source count"
  );
  compare(
    snapshot.intakeSourcesWithoutAssertionCount,
    report.integrity.intakeSourcesWithoutAssertion.length,
    "intake source decomposition count"
  );
  compare(
    snapshot.unlinkedSourceCount,
    report.integrity.unlinkedSourceIds.length,
    "unlinked source count"
  );
  compare(
    snapshot.duplicateIdCount,
    countDuplicates(report.integrity.duplicateIds),
    "duplicate ID count"
  );
  for (const [dimension, minimum] of Object.entries(
    snapshot.targetRoleCoverageMinimum
  )) {
    if ((report.targetRoleCoverage[dimension]?.length ?? 0) < minimum) {
      errors.push(`${dimension} target-role coverage fell below ${minimum}`);
    }
  }
  return errors;
}

export function evaluateBlindSpots(suite, evidence, state = buildBlindSpotRepoState()) {
  const errors = [...validateBlindSpotSuite(suite).errors];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const resultById = new Map();
  const allowedStatuses = new Set(suite.allowed_statuses);

  requireValue(evidence.version === 1, "evidence.version must be 1");
  requireValue(evidence.suiteId === suite.suite_id, "evidence.suiteId must match suite");
  requireValue(Array.isArray(evidence.results), "evidence.results must be an array");
  for (const [index, result] of (evidence.results ?? []).entries()) {
    const prefix = `evidence.results[${index}]`;
    requireValue(!resultById.has(result.evalId), `${prefix}.evalId must be unique`);
    resultById.set(result.evalId, result);
    requireValue(
      Number.isInteger(result.score) && result.score >= 0 && result.score <= 4,
      `${prefix}.score must fit the 0..4 scale`
    );
    requireValue(allowedStatuses.has(result.status), `${prefix}.status is invalid`);
    requireValue(
      Array.isArray(result.evidence) && result.evidence.length > 0,
      `${prefix}.evidence must be non-empty`
    );
    requireValue(
      Array.isArray(result.observations) && result.observations.length > 0,
      `${prefix}.observations must be non-empty`
    );
  }
  for (const entry of suite.evals) {
    requireValue(resultById.has(entry.id), `evidence is missing ${entry.id}`);
  }

  const externalReviewComplete =
    evidence.humanEvidence.independentExactCandidateReviews >= 2 &&
    evidence.humanEvidence.projectRelevantCollaboratorResponses >= 1;
  const bs1 = resultById.get("BS-001");
  requireValue(
    externalReviewComplete
      ? bs1?.status === "criteria_met" && bs1.score >= 3
      : bs1?.status === "human_blocked" && bs1.score <= 2,
    "BS-001 cannot pass without independent candidate and collaborator review"
  );

  const roleText = `${state.hero}\n${state.homepage}\n${state.technicalOperations}\n${state.about}\n${state.resume}`;
  const roleChecks = [
    state.hero.includes("Technical Project Manager"),
    state.hero.includes("Product Operations"),
    state.hero.includes("Implementation"),
    state.hero.includes("operating structure"),
    state.hero.includes("emerging stakeholder needs"),
    ["/work", "/resume", "/contact"].every((href) =>
      state.hero.includes(`href=\"${href}\"`)
    ),
    /still forming|emerging/i.test(roleText),
    !/dysfunctional|groundless state|organizational failure/i.test(state.hero)
  ];
  const bs2 = resultById.get("BS-002");
  requireValue(
    roleChecks.every(Boolean) && bs2?.status === "criteria_met" && bs2.score === 4,
    "BS-002 role conversion evidence does not meet the deterministic criterion"
  );

  const currentProofIds = evidence.currentEvidence.map(({ proofId }) => proofId);
  const currentProofsValid =
    currentProofIds.length >= 4 &&
    currentProofIds.every((id) => {
      const proof = state.proofById.get(id);
      return proof && !["pending", "private"].includes(proof.status);
    }) &&
    [
      "fair-rent-public-data-pilot",
      "commercial-vacancy-quarterly-corpus",
      "source-backed-team-memory-method",
      "ai-evals-professional-development"
    ].every((id) => currentProofIds.includes(id)) &&
    evidence.currentEvidence.every(({ period, boundary }) =>
      /2025|2026/.test(period) && boundary.length >= 20
    );
  const bs3 = resultById.get("BS-003");
  requireValue(
    currentProofsValid && bs3?.status === "criteria_met" && bs3.score === 4,
    "BS-003 current evidence is incomplete, unknown, or unbounded"
  );

  const hiringObservationComplete =
    evidence.humanEvidence.hiringReaderSessions >= 5 &&
    evidence.humanEvidence.relevantHiringPractitionerSessions >= 2 &&
    evidence.humanEvidence.publicSafeApplicationResponseObservations >= 1;
  const bs4 = resultById.get("BS-004");
  requireValue(
    hiringObservationComplete
      ? bs4?.status === "criteria_met" && bs4.score >= 3
      : bs4?.status === "human_blocked" && bs4.score <= 1,
    "BS-004 cannot pass without observed hiring-reader and market evidence"
  );
  requireValue(
    /Timed reader protocol/.test(state.protocol) &&
      /Market-response protocol/.test(state.protocol),
    "BS-004 protocols are missing"
  );

  const chainsValid =
    evidence.outcomeChains.length === 3 &&
    evidence.outcomeChains.every((chain) =>
      [
        chain.context,
        chain.jamieAction,
        chain.observableResult,
        chain.sourceBackedBoundary
      ].every((value) => typeof value === "string" && value.length >= 30) &&
      chain.workProducts.length > 0 &&
      chain.proofIds.length > 0 &&
      chain.proofIds.every((id) => state.proofIds.has(id)) &&
      chain.claimIds.every((id) => state.claimIds.has(id)) &&
      /does not|remained independent|not establish/i.test(
        chain.sourceBackedBoundary
      )
    );
  const bs5 = resultById.get("BS-005");
  requireValue(
    chainsValid && bs5?.status === "criteria_met" && bs5.score === 4,
    "BS-005 outcome chains are incomplete, unresolved, or causally unbounded"
  );

  const visualComplete =
    evidence.humanEvidence.photoEditorSelections >= 3 &&
    evidence.humanEvidence.rightsClearedLeadProjectVisuals >= 3 &&
    state.publicProjectImageFiles.length >= 3 &&
    evidence.visualEvidence.targetLeadProjects.length >= 3;
  const bs6 = resultById.get("BS-006");
  requireValue(
    evidence.visualEvidence.publicProjectImageFiles.length ===
      state.publicProjectImageFiles.length,
    "BS-006 public image inventory does not match the repository"
  );
  requireValue(
    visualComplete
      ? bs6?.status === "criteria_met" && bs6.score >= 3
      : bs6?.status === "human_blocked" && bs6.score <= 1,
    "BS-006 cannot pass without selected, rights-cleared project visuals"
  );
  requireValue(
    [
      "subject",
      "photographer",
      "rightsHolder",
      "permissionStatus",
      "consentStatus",
      "altText",
      "caption",
      "supportedClaimIds"
    ].every((field) => evidence.visualEvidence.requiredFields.includes(field)),
    "BS-006 rights and editorial fields are incomplete"
  );

  const maintenanceErrors = compareMaintenanceSnapshot(
    evidence.maintenanceSnapshot,
    state.maintenanceReport
  );
  errors.push(...maintenanceErrors);
  const bs7 = resultById.get("BS-007");
  requireValue(
    maintenanceErrors.length === 0 &&
      state.maintenanceReport.integrity.unresolvedSourceIds.length === 0 &&
      state.maintenanceReport.integrity.intakeSourcesWithoutAssertion.length === 0 &&
      state.maintenanceReport.integrity.unlinkedSourceIds.length === 0 &&
      countDuplicates(state.maintenanceReport.integrity.duplicateIds) === 0 &&
      bs7?.status === "criteria_met" &&
      bs7.score === 4,
    "BS-007 maintenance report is stale or integrity controls are failing"
  );

  const morse = evidence.professorLensEvidence?.margaretMorse;
  const morsePublicClaim = state.claimById.get(morse?.publicClaimId);
  const morseHistoricalClaim = state.claimById.get(morse?.historicalClaimId);
  const titleConflictClaim = state.claimById.get(morse?.titleConflictClaimId);
  const aboutPage = state.pageById.get("about");
  const morseLensValid =
    morse &&
    state.about.includes(`claimId="${morse.publicClaimId}"`) &&
    morsePublicClaim?.projectionEligibility === "eligible" &&
    morsePublicClaim.projections.some((projection) =>
      projection.key === "homepage" &&
      projection.status === "active" &&
      projection.citationRequired &&
      projection.surfaces.includes(morse.publicSurface) &&
      morse.practiceDimensions.every((term) =>
        projection.text.toLowerCase().includes(term.toLowerCase())
      )
    ) &&
    morseHistoricalClaim?.projectionEligibility === "hold" &&
    titleConflictClaim?.projectionEligibility === "hold" &&
    titleConflictClaim.status === "use-with-care" &&
    state.sourceById.get(morse.publicSourceId)?.visibility === "public" &&
    morse.protectedSourceIds.every((id) =>
      ["protected", "public-metadata-only"].includes(
        state.sourceById.get(id)?.visibility
      )
    ) &&
    morse.requiredAssertionIds.every((id) => state.assertionIds.has(id)) &&
    aboutPage?.occurrences.some((occurrence) =>
      occurrence.claimId === morse.publicClaimId &&
      occurrence.sourceIds?.length === 1 &&
      occurrence.sourceIds[0] === morse.publicSourceId
    ) &&
    !/student id|student identifier|A\+|A-|Time is Long|Art is Long/i.test(state.about);
  const bs8 = resultById.get("BS-008");
  requireValue(
    morseLensValid && bs8?.status === "criteria_met" && bs8.score === 4,
    "BS-008 Morse lens does not preserve the public threshold, protected boundary, and unresolved title conflict"
  );

  const sack = evidence.professorLensEvidence?.warrenSack;
  const sackHistoricalClaim = state.claimById.get(sack?.historicalClaimId);
  const publicSurfaceText = `${state.hero}\n${state.homepage}\n${state.technicalOperations}\n${state.about}`;
  const sackLensValid =
    sack &&
    state.about.includes(`claimId="${sack.publicClaimId}"`) &&
    sackHistoricalClaim?.projectionEligibility === "hold" &&
    state.sourceById.get(sack.protectedSourceId)?.visibility === "protected" &&
    sack.requiredAssertionIds.every((id) => state.assertionIds.has(id)) &&
    sack.continuityProofIds.length >= 4 &&
    sack.continuityProofIds.every((id) => {
      const proof = state.proofById.get(id);
      return proof && !["pending", "private"].includes(proof.status);
    }) &&
    /social-software/i.test(
      state.claimById.get(sack.publicClaimId)?.projections.find(
        ({ key }) => key === "homepage"
      )?.text ?? ""
    ) &&
    /relation to a place, a system, and one another/i.test(
      state.claimById.get(sack.publicClaimId)?.projections.find(
        ({ key }) => key === "homepage"
      )?.text ?? ""
    ) &&
    sack.forbiddenPublicClaims.every((claim) =>
      !publicSurfaceText.toLowerCase().includes(claim.toLowerCase())
    ) &&
    !/independently invented (?:the idea of )?structural equivalence/i.test(
      publicSurfaceText
    );
  const bs9 = resultById.get("BS-009");
  requireValue(
    sackLensValid && bs9?.status === "criteria_met" && bs9.score === 4,
    "BS-009 Sack lens does not preserve the recursive systems lineage and historical or collective boundaries"
  );

  const applicableResults = suite.evals.map((entry) => ({
    entry,
    result: resultById.get(entry.id)
  }));
  const weightedScore = applicableResults.reduce(
    (total, { entry, result }) =>
      total + entry.weight * (result.score / suite.score_scale.maximum),
    0
  ) / 100;
  const machineResults = applicableResults.filter(
    ({ entry }) => !entry.human_evidence_required
  );
  const humanResults = applicableResults.filter(
    ({ entry }) => entry.human_evidence_required
  );
  const weighted = (items) => {
    const weight = items.reduce((total, { entry }) => total + entry.weight, 0);
    return items.reduce(
      (total, { entry, result }) =>
        total + entry.weight * (result.score / suite.score_scale.maximum),
      0
    ) / weight;
  };
  const machineCriteriaMet = machineResults.every(
    ({ result }) => result.status === "criteria_met" && result.score === 4
  );
  const humanCriteriaMet = humanResults.every(
    ({ result }) => result.status === "criteria_met" && result.score >= 3
  );
  const status = errors.length > 0
    ? "iterate"
    : machineCriteriaMet && humanCriteriaMet
      ? "criteria_met"
      : machineCriteriaMet
        ? "human_blocked"
        : "iterate";

  return {
    status,
    errors,
    weightedScore: Number(weightedScore.toFixed(4)),
    machineScore: Number(weighted(machineResults).toFixed(4)),
    humanScore: Number(weighted(humanResults).toFixed(4)),
    machineCriteriaMet,
    humanCriteriaMet,
    results: applicableResults.map(({ entry, result }) => ({
      evalId: entry.id,
      title: entry.title,
      status: result.status,
      score: result.score,
      weight: entry.weight,
      nextStep: result.nextStep
    }))
  };
}

function run() {
  const suite = JSON.parse(read(suitePath));
  const evidence = JSON.parse(read(evidencePath));
  const assessment = evaluateBlindSpots(suite, evidence);
  console.log(JSON.stringify(assessment, null, 2));
  if (assessment.errors.length > 0) process.exitCode = 1;
  if (process.argv.includes("--require-human") && assessment.status !== "criteria_met") {
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
