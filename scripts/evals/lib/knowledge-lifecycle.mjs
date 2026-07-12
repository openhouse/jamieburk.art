import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../../apps/www/src/data/knowledge-bank/records.ts";

export const defaultRepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
);

export const suitePath = path.join(
  defaultRepoRoot,
  "evals/knowledge-lifecycle/suite.json"
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

  for (const name of ["sourceChecks", "judgeCriteria", "humanGates"]) {
    const collection = suite?.[name];
    if (!Array.isArray(collection) || collection.length === 0) {
      failures.push(`${name} must be a non-empty array`);
      continue;
    }
    const repeated = duplicates(collection.map((item) => item.id));
    if (repeated.length) failures.push(`${name} has duplicate IDs: ${repeated.join(", ")}`);
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
    if (!Number.isInteger(criterion.minimumEvidence) || criterion.minimumEvidence < 2) {
      failures.push(`${criterion.id} needs at least two evidence items`);
    }
  }

  for (const score of ["0", "1", "2", "3", "4"]) {
    if (!suite?.scoreAnchors?.[score]) failures.push(`Missing score anchor ${score}`);
  }

  for (const gate of suite?.humanGates ?? []) {
    if (gate.agentMaySelfCertify !== false) {
      failures.push(`${gate.id} must forbid agent self-certification`);
    }
  }
  return failures;
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

function idMap(items) {
  return new Map(items.map((item) => [item.id, item]));
}

function duplicateEvidence(collections) {
  const evidence = [];
  for (const [name, items] of Object.entries(collections)) {
    for (const id of duplicates(items.map((item) => item.id))) evidence.push({ collection: name, id });
  }
  return evidence;
}

function unknownReference(type, ownerId, id) {
  return { type, ownerId, id };
}

export function evaluateLifecycle({ suite = loadSuite(), bank = knowledgeBank } = {}) {
  const checks = new Map(suite.sourceChecks.map((check) => [check.id, check]));
  const results = [];
  const entities = idMap(bank.entities);
  const intake = idMap(bank.intake);
  const sources = idMap(bank.sources);
  const readings = idMap(bank.sourceReadings);
  const claims = idMap(bank.claims);
  const tasks = idMap(bank.researchTasks);
  const decisions = idMap(bank.projectionDecisions);
  const propositionsById = new Map(
    bank.sourceReadings.flatMap((reading) => reading.propositions.map((item) => [item.id, { ...item, sourceId: reading.sourceId }]))
  );
  const propositionSource = new Map([...propositionsById].map(([id, item]) => [id, item.sourceId]));

  const intakeFailures = [];
  for (const item of bank.intake) {
    const linkedCount = item.sourceIds.length + item.claimIds.length + item.researchTaskIds.length;
    if (!linkedCount && item.disposition !== "held") intakeFailures.push({ id: item.id, reason: "no lifecycle output" });
    if (item.disposition === "held" && linkedCount) intakeFailures.push({ id: item.id, reason: "held intake has promoted links" });
    if (item.kind === "photo-observation") {
      if (item.rawMaterialPolicy !== "protected-outside-repo") intakeFailures.push({ id: item.id, reason: "photo observation is not protected" });
      if (!item.researchTaskIds.length) intakeFailures.push({ id: item.id, reason: "photo observation has no research task" });
      if (item.claimIds.some((id) => claims.get(id)?.projections.some((projection) => projection.status === "active"))) {
        intakeFailures.push({ id: item.id, reason: "photo observation reaches an active projection" });
      }
    }
  }
  for (const source of bank.sources) if (!source.intakeIds.length) intakeFailures.push({ id: source.id, reason: "source has no accession" });
  for (const claim of bank.claims) if (!claim.intakeIds.length) intakeFailures.push({ id: claim.id, reason: "claim has no accession" });
  results.push(result(
    checks.get("intake-is-accounted-for"),
    intakeFailures.length === 0,
    `${bank.intake.length} accessions; ${intakeFailures.length} accession defect(s)`,
    intakeFailures
  ));

  const readingFailures = [];
  for (const reading of bank.sourceReadings) {
    if (reading.status === "closely-read" && (!reading.propositions.length || !reading.limitations.length || !reading.readAt)) {
      readingFailures.push({ id: reading.id, reason: "close reading lacks propositions, limits, or date" });
    }
    if (reading.status === "needs-access" && !reading.researchTaskIds.length) {
      readingFailures.push({ id: reading.id, reason: "access failure has no research task" });
    }
  }
  results.push(result(
    checks.get("source-readings-are-atomic-and-bounded"),
    readingFailures.length === 0,
    `${bank.sourceReadings.length - readingFailures.length}/${bank.sourceReadings.length} readings bounded`,
    readingFailures
  ));

  const seedFailures = [];
  for (const claim of bank.claims.filter((item) => ["captured", "researching"].includes(item.maturity))) {
    const routed = bank.researchTasks.some((task) => task.claimIds.includes(claim.id) && ["open", "in-progress", "blocked"].includes(task.status));
    const active = claim.projections.some((projection) => projection.status === "active");
    if (!routed || active) seedFailures.push({ id: claim.id, routed, activeProjection: active });
  }
  results.push(result(
    checks.get("claim-seeds-have-research-routes"),
    seedFailures.length === 0,
    `${bank.claims.filter((item) => ["captured", "researching"].includes(item.maturity)).length - seedFailures.length} research-stage claim(s) safely routed`,
    seedFailures
  ));

  const promotionFailures = [];
  for (const claim of bank.claims.filter((item) => ["corroborated", "public-ready", "projected"].includes(item.maturity))) {
    if (!claim.evidence.length) promotionFailures.push({ id: claim.id, reason: "no evidence" });
    if (!claim.boundaries.length) promotionFailures.push({ id: claim.id, reason: "no boundaries" });
    if (!claim.antiClaims.length) promotionFailures.push({ id: claim.id, reason: "no anti-claims" });
    if (!claim.reviewedBy.length) promotionFailures.push({ id: claim.id, reason: "no reviewer" });
    const qualifying = claim.evidence.filter((item) => ["direct-support", "corroborating", "private-support"].includes(item.relationship) && item.confidence !== "limited");
    if (!qualifying.length) promotionFailures.push({ id: claim.id, reason: "no qualifying support relationship" });
    const migrationOnly = claim.intakeIds.length > 0 && claim.intakeIds.every((id) => intake.get(id)?.kind === "migration");
    if (claim.intakeIds.length && !migrationOnly) {
      for (const evidence of qualifying) {
        if (!evidence.propositionIds.length) promotionFailures.push({ id: claim.id, sourceId: evidence.sourceId, reason: "qualifying evidence lacks proposition IDs" });
        for (const propositionId of evidence.propositionIds) {
          if (!propositionSource.has(propositionId)) promotionFailures.push({ id: claim.id, propositionId, reason: "unknown proposition" });
          else if (propositionSource.get(propositionId) !== evidence.sourceId) promotionFailures.push({ id: claim.id, propositionId, reason: "proposition belongs to a different source" });
        }
      }
      if (!claim.requiredSupportTags.length) promotionFailures.push({ id: claim.id, reason: "mature lifecycle claim lacks required support tags" });
      const linkedTags = new Set(
        claim.evidence.flatMap((evidence) => evidence.propositionIds.flatMap((id) => propositionsById.get(id)?.supportTags ?? []))
      );
      for (const tag of claim.requiredSupportTags) if (!linkedTags.has(tag)) promotionFailures.push({ id: claim.id, tag, reason: "required semantic support tag is not linked" });
    }
    if (claim.maturity === "public-ready" && !claim.composition) {
      promotionFailures.push({ id: claim.id, reason: "public-ready claim lacks Chad-lens composition fields" });
    }
  }
  for (const claim of bank.claims.filter((item) => ["rejected", "superseded"].includes(item.maturity))) {
    if (!claim.disposition?.reason || !claim.disposition?.decidedAt) promotionFailures.push({ id: claim.id, reason: `${claim.maturity} claim lacks disposition history` });
    if (claim.maturity === "superseded" && !claim.disposition?.successorClaimIds.length) promotionFailures.push({ id: claim.id, reason: "superseded claim lacks a successor" });
  }
  results.push(result(
    checks.get("claim-promotion-is-evidence-backed"),
    promotionFailures.length === 0,
    `${promotionFailures.length} promotion defect(s)`,
    promotionFailures
  ));

  const projectionFailures = [];
  const decisionKeys = bank.projectionDecisions.map((decision) => `${decision.claimId}::${decision.surface}`);
  for (const key of duplicates(decisionKeys)) projectionFailures.push({ id: key, reason: "multiple decisions for one claim and surface" });
  for (const claim of bank.claims) {
    const activeSurfaces = new Set(claim.projections.filter((projection) => projection.status === "active").flatMap((projection) => projection.surfaces));
    const active = activeSurfaces.size > 0;
    if (["captured", "researching", "corroborated", "rejected", "superseded"].includes(claim.maturity) && active) {
      projectionFailures.push({ id: claim.id, reason: `${claim.maturity} claim has an active projection` });
    }
    if (claim.maturity === "public-ready" && !active) {
      const hasDecision = bank.projectionDecisions.some((decision) => decision.claimId === claim.id);
      if (!hasDecision) projectionFailures.push({ id: claim.id, reason: "public-ready claim lacks an explicit decision" });
    }
    if (claim.maturity === "projected" && !active && claim.status !== "not-recovered") {
      projectionFailures.push({ id: claim.id, reason: "projected claim has no active projection" });
    }
    for (const surface of activeSurfaces) {
      const decision = bank.projectionDecisions.find((item) => item.claimId === claim.id && item.surface === surface);
      if (!decision || decision.decision !== "publish") projectionFailures.push({ id: claim.id, surface, reason: "active surface lacks a publish decision" });
    }
    for (const decision of bank.projectionDecisions.filter((item) => item.claimId === claim.id)) {
      if (decision.decision === "publish" && !activeSurfaces.has(decision.surface)) projectionFailures.push({ id: claim.id, surface: decision.surface, reason: "publish decision has no active projection" });
      if (decision.decision !== "publish" && activeSurfaces.has(decision.surface)) projectionFailures.push({ id: claim.id, surface: decision.surface, reason: `${decision.decision} decision conflicts with active projection` });
    }
  }
  results.push(result(
    checks.get("publication-is-an-independent-decision"),
    projectionFailures.length === 0,
    `${projectionFailures.length} publication-state defect(s)`,
    projectionFailures
  ));

  const referenceFailures = duplicateEvidence({
    entities: bank.entities,
    intake: bank.intake,
    sources: bank.sources,
    sourceReadings: bank.sourceReadings,
    claims: bank.claims,
    researchTasks: bank.researchTasks,
    researchInquiries: bank.researchInquiries,
    projectionDecisions: bank.projectionDecisions,
    corrections: bank.corrections,
    pages: bank.pages
  });
  const propositionIds = bank.sourceReadings.flatMap((reading) => reading.propositions.map((item) => item.id));
  for (const id of duplicates(propositionIds)) referenceFailures.push({ collection: "atomicPropositions", id });
  const allStableIds = [
    ...bank.entities, ...bank.intake, ...bank.sources, ...bank.sourceReadings,
    ...bank.claims, ...bank.researchTasks, ...bank.researchInquiries,
    ...bank.projectionDecisions, ...bank.corrections, ...bank.pages
  ].map((item) => item.id).concat(propositionIds);
  for (const id of duplicates(allStableIds)) referenceFailures.push({ collection: "global", id });
  const projectKeys = new Set(bank.entities.map((entity) => entity.projectKey).filter(Boolean));
  for (const key of duplicates(bank.entities.map((entity) => entity.projectKey).filter(Boolean))) referenceFailures.push({ collection: "projectKeys", id: key });
  for (const entity of bank.entities) {
    for (const id of entity.relatedEntityIds) if (!entities.has(id)) referenceFailures.push(unknownReference("entity", entity.id, id));
  }
  for (const item of bank.intake) {
    for (const id of item.entityIds) if (!entities.has(id)) referenceFailures.push(unknownReference("entity", item.id, id));
    for (const id of item.sourceIds) {
      if (!sources.has(id)) referenceFailures.push(unknownReference("source", item.id, id));
      else if (!sources.get(id).intakeIds.includes(item.id)) referenceFailures.push({ type: "non-reciprocal-intake-source", ownerId: item.id, id });
    }
    for (const id of item.claimIds) {
      if (!claims.has(id)) referenceFailures.push(unknownReference("claim", item.id, id));
      else if (!claims.get(id).intakeIds.includes(item.id)) referenceFailures.push({ type: "non-reciprocal-intake-claim", ownerId: item.id, id });
    }
    for (const id of item.researchTaskIds) {
      if (!tasks.has(id)) referenceFailures.push(unknownReference("task", item.id, id));
      else if (!tasks.get(id).intakeIds.includes(item.id)) referenceFailures.push({ type: "non-reciprocal-intake-task", ownerId: item.id, id });
    }
  }
  for (const source of bank.sources) for (const id of source.intakeIds) {
    if (!intake.has(id)) referenceFailures.push(unknownReference("intake", source.id, id));
    else if (!intake.get(id).sourceIds.includes(source.id)) referenceFailures.push({ type: "non-reciprocal-source-intake", ownerId: source.id, id });
  }
  for (const reading of bank.sourceReadings) {
    if (!sources.has(reading.sourceId)) referenceFailures.push(unknownReference("source", reading.id, reading.sourceId));
    for (const id of reading.researchTaskIds) if (!tasks.has(id)) referenceFailures.push(unknownReference("task", reading.id, id));
    for (const id of reading.researchTaskIds) {
      const task = tasks.get(id);
      if (task && !task.sourceIds.includes(reading.sourceId)) referenceFailures.push({ type: "non-reciprocal-reading-task", ownerId: reading.id, id });
    }
  }
  for (const claim of bank.claims) {
    if (!projectKeys.has(claim.project)) referenceFailures.push({ type: "unknown-project-key", ownerId: claim.id, id: claim.project });
    for (const id of claim.intakeIds) {
      if (!intake.has(id)) referenceFailures.push(unknownReference("intake", claim.id, id));
      else if (!intake.get(id).claimIds.includes(claim.id)) referenceFailures.push({ type: "non-reciprocal-intake-claim", ownerId: claim.id, id });
    }
    for (const evidence of claim.evidence) if (!sources.has(evidence.sourceId)) referenceFailures.push(unknownReference("source", claim.id, evidence.sourceId));
    for (const id of claim.disposition?.predecessorClaimIds ?? []) {
      if (!claims.has(id)) referenceFailures.push(unknownReference("claim", claim.id, id));
      else if (!claims.get(id).disposition?.successorClaimIds.includes(claim.id)) referenceFailures.push({ type: "non-reciprocal-predecessor", ownerId: claim.id, id });
    }
    for (const id of claim.disposition?.successorClaimIds ?? []) {
      if (!claims.has(id)) referenceFailures.push(unknownReference("claim", claim.id, id));
      else if (!claims.get(id).disposition?.predecessorClaimIds.includes(claim.id)) referenceFailures.push({ type: "non-reciprocal-successor", ownerId: claim.id, id });
    }
  }
  for (const task of bank.researchTasks) {
    if (!projectKeys.has(task.project)) referenceFailures.push({ type: "unknown-project-key", ownerId: task.id, id: task.project });
    for (const id of task.intakeIds) {
      if (!intake.has(id)) referenceFailures.push(unknownReference("intake", task.id, id));
      else if (!intake.get(id).researchTaskIds.includes(task.id)) referenceFailures.push({ type: "non-reciprocal-task-intake", ownerId: task.id, id });
    }
    for (const id of task.sourceIds) if (!sources.has(id)) referenceFailures.push(unknownReference("source", task.id, id));
    for (const id of task.claimIds) if (!claims.has(id)) referenceFailures.push(unknownReference("claim", task.id, id));
  }
  for (const decision of bank.projectionDecisions) {
    if (!claims.has(decision.claimId)) referenceFailures.push(unknownReference("claim", decision.id, decision.claimId));
  }
  for (const inquiry of bank.researchInquiries) {
    if (!projectKeys.has(inquiry.project)) referenceFailures.push({ type: "unknown-project-key", ownerId: inquiry.id, id: inquiry.project });
    for (const id of inquiry.sourceIds) if (!sources.has(id)) referenceFailures.push(unknownReference("source", inquiry.id, id));
  }
  for (const correction of bank.corrections) {
    if (!claims.has(correction.claimId)) referenceFailures.push(unknownReference("claim", correction.id, correction.claimId));
    for (const id of correction.intakeIds) {
      if (!intake.has(id)) referenceFailures.push(unknownReference("intake", correction.id, id));
      else if (intake.get(id).kind !== "correction") referenceFailures.push({ type: "correction-intake-kind", ownerId: correction.id, id });
    }
  }
  for (const page of bank.pages) {
    for (const id of page.sourceOrder) if (!sources.has(id)) referenceFailures.push(unknownReference("source", page.id, id));
    for (const occurrence of page.occurrences) {
      if (!claims.has(occurrence.claimId)) referenceFailures.push(unknownReference("claim", page.id, occurrence.claimId));
      for (const id of occurrence.sourceIds ?? []) if (!sources.has(id)) referenceFailures.push(unknownReference("source", occurrence.id, id));
    }
  }
  results.push(result(
    checks.get("graph-references-are-valid"),
    referenceFailures.length === 0,
    `${referenceFailures.length} graph reference defect(s)`,
    referenceFailures.slice(0, 20)
  ));

  const serialized = JSON.stringify(bank);
  const unsafePatterns = [
    /\/Users\//i,
    /\/Volumes\//i,
    /\/private\//i,
    /[A-Za-z]:\\Users\\/i,
    /~\//,
    /Mobile Documents/i,
    /supporting-materials/i,
    /\.docx\b/i,
    /\.xlsx\b/i,
    /raw transcript/i,
    /\b(?:From|To|Subject):\s/i,
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
    /(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}/
  ];
  const unsafe = unsafePatterns.filter((pattern) => pattern.test(serialized)).map((pattern) => ({ pattern: String(pattern) }));
  results.push(result(
    checks.get("public-repo-boundary-is-enforced"),
    unsafe.length === 0,
    `${unsafe.length} private-path or raw-material marker(s)`,
    unsafe
  ));

  const quality = [
    ["intake-depth", bank.intake.length],
    ["close-reading-depth", bank.sourceReadings.filter((reading) => reading.status === "closely-read").length],
    ["mature-claim-depth", bank.claims.filter((claim) => claim.intakeIds.length && ["corroborated", "public-ready", "projected"].includes(claim.maturity)).length],
    ["research-queue-depth", bank.researchTasks.filter((task) => ["critical", "high"].includes(task.priority) && ["open", "in-progress", "blocked"].includes(task.status)).length]
  ];
  for (const [id, count] of quality) {
    const check = checks.get(id);
    results.push(result(check, count >= check.minimum, `${count}; target ${check.minimum}`));
  }

  const hard = results.filter((item) => item.kind === "hard-gate");
  const targets = results.filter((item) => item.kind === "quality-target");
  return {
    suiteId: suite.id,
    suiteVersion: suite.version,
    results,
    summary: {
      hardGateFailures: hard.filter((item) => !item.passed).length,
      hardGateTotal: hard.length,
      qualityTargetGaps: targets.filter((item) => !item.passed).length,
      qualityTargetTotal: targets.length
    }
  };
}

export function scoreAssessment(assessment, suite = loadSuite()) {
  const failures = [];
  if (assessment.suiteId !== suite.id || assessment.suiteVersion !== suite.version) {
    failures.push("Assessment suite id/version does not match");
  }
  const submitted = new Map((assessment.judge?.scores ?? []).map((item) => [item.criterionId, item]));
  let weighted = 0;
  const floorFailures = [];
  for (const criterion of suite.judgeCriteria) {
    const item = submitted.get(criterion.id);
    if (!item || !Number.isInteger(item.score) || item.score < 0 || item.score > 4) {
      failures.push(`${criterion.id} has no valid score`);
      continue;
    }
    if ((item.evidence ?? []).length < criterion.minimumEvidence) {
      failures.push(`${criterion.id} requires at least ${criterion.minimumEvidence} evidence items`);
    }
    const evidenceKeys = new Set((item.evidence ?? []).map((evidence) => `${evidence.file ?? ""}::${evidence.record ?? ""}`));
    if (evidenceKeys.size < criterion.minimumEvidence) {
      failures.push(`${criterion.id} requires ${criterion.minimumEvidence} distinct file-and-record evidence items`);
    }
    if ((item.evidence ?? []).some((evidence) => !evidence.file || !evidence.record)) {
      failures.push(`${criterion.id} evidence requires file and record`);
    }
    for (const evidence of item.evidence ?? []) {
      if (!evidence.file || !evidence.record) continue;
      const absolute = path.resolve(defaultRepoRoot, evidence.file);
      if (!absolute.startsWith(`${defaultRepoRoot}${path.sep}`) || !existsSync(absolute)) {
        failures.push(`${criterion.id} cites missing or out-of-repo evidence ${evidence.file}`);
      } else if (!readFileSync(absolute, "utf8").includes(evidence.record)) {
        failures.push(`${criterion.id} record ${evidence.record} is not present in ${evidence.file}`);
      }
    }
    weighted += (item.score / 4) * criterion.weight;
    if (item.score < criterion.floor) floorFailures.push(criterion.id);
  }
  const pendingHumanGates = suite.humanGates
    .filter((gate) => assessment.humanGates?.find((item) => item.gateId === gate.id)?.status !== "confirmed")
    .map((gate) => gate.id);
  for (const submittedGate of assessment.humanGates ?? []) {
    if (submittedGate.status === "confirmed" && (!submittedGate.confirmedBy || /codex|agent|assistant|llm/i.test(submittedGate.confirmedBy))) {
      failures.push(`${submittedGate.gateId} requires a named non-agent human confirmer`);
    }
  }
  const weightedJudgeScore = Math.round(weighted * 10) / 10;
  return {
    valid: failures.length === 0,
    failures,
    weightedJudgeScore,
    judgeThresholdMet: weightedJudgeScore >= suite.releaseThresholds.weightedJudgeScore && floorFailures.length === 0,
    judgeFloorFailures: floorFailures,
    pendingHumanGates
  };
}

export function requiredLifecycleFiles(repoRoot = defaultRepoRoot) {
  return [
    "apps/www/src/data/knowledge-bank/schema.ts",
    "apps/www/src/data/knowledge-bank/records.ts",
    "apps/www/src/data/knowledge-bank/lifecycle-records.ts",
    "docs/knowledge-bank/lifecycle.md",
    "evals/knowledge-lifecycle/suite.json",
    "evals/knowledge-lifecycle/agent-loop.md",
    "evals/knowledge-lifecycle/judge-prompt.md"
  ].filter((file) => !existsSync(path.join(repoRoot, file)));
}
