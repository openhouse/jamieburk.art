import {
  existsSync,
  readFileSync,
  readdirSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

const suitePath = path.join(repoRoot, "evals/portfolio-effectiveness/evals.json");

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function readRepoFile(relativePath) {
  const absolute = path.join(repoRoot, relativePath);
  return existsSync(absolute) ? readFileSync(absolute, "utf8") : "";
}

function listFiles(relativeDirectory, extension) {
  const absolute = path.join(repoRoot, relativeDirectory);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute)
    .filter((name) => name.endsWith(extension))
    .map((name) => path.join(absolute, name));
}

function allStrings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(allStrings);
  }
  return [];
}

function unique(items) {
  return new Set(items).size === items.length;
}

function routeFile(route) {
  if (route === "/") return "apps/www/src/app/page.tsx";
  if (route.startsWith("/work/") && route !== "/work/technical-operations") {
    return `apps/www/src/content/work/${route.split("/").at(-1)}.mdx`;
  }
  return `apps/www/src/app${route}/page.tsx`;
}

function evidenceReferenceExists(reference, searchableText) {
  const [kind, id] = reference.split(":", 2);
  return ["proof", "claim", "source"].includes(kind) && Boolean(id) && searchableText.includes(id);
}

function scoreResult(id, score, evidence, nextEvidence) {
  return { criterionId: id, score, evidence: [evidence], nextEvidence };
}

export function loadPortfolioEvalSuite() {
  const suite = readJson(suitePath);
  const evidence = readJson(path.join(repoRoot, suite.evidencePath));
  return { suite, evidence };
}

export function validatePortfolioEvalSuite(suite, evidence) {
  const errors = [];
  if (suite.version !== 1) errors.push("suite version must be 1");
  if (evidence.version !== 1) errors.push("evidence version must be 1");
  if (!suite.id || !suite.objective) errors.push("suite id and objective are required");
  if (!Array.isArray(suite.criteria) || suite.criteria.length !== 7) {
    errors.push("exactly seven blind-spot criteria are required");
  }

  const ids = (suite.criteria ?? []).map((criterion) => criterion.id);
  if (!unique(ids)) errors.push("criterion IDs must be unique");
  const weight = (suite.criteria ?? []).reduce(
    (sum, criterion) => sum + Number(criterion.weight || 0),
    0
  );
  if (Math.abs(weight - 1) > 0.000001) {
    errors.push(`criterion weights must total 1, got ${weight}`);
  }
  for (const criterion of suite.criteria ?? []) {
    if (!(criterion.minimumScore >= 1 && criterion.minimumScore <= 5)) {
      errors.push(`${criterion.id} minimumScore must be between 1 and 5`);
    }
    for (const anchor of ["1", "3", "4", "5"]) {
      if (!criterion.anchors?.[anchor]) errors.push(`${criterion.id} needs score anchor ${anchor}`);
    }
  }

  if (!existsSync(path.join(repoRoot, suite.documentationPath))) {
    errors.push(`missing documentation: ${suite.documentationPath}`);
  }
  const privatePathPattern = /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/i;
  if (allStrings(evidence).some((value) => privatePathPattern.test(value))) {
    errors.push("portfolio-effectiveness evidence contains a private local path");
  }
  if (!suite.hillClimb?.stopWhen) errors.push("hillClimb.stopWhen is required");
  return errors;
}

export function evaluatePortfolioEffectiveness(suite, evidence, fixtures = {}) {
  const errors = validatePortfolioEvalSuite(suite, evidence);
  const packageText = fixtures.packageText ?? readRepoFile("package.json");
  const documentationText = fixtures.documentationText ?? readRepoFile(suite.documentationPath);
  const launchBlockersText = fixtures.launchBlockersText ?? readRepoFile(
    "docs/knowledge-bank/launch-blockers.md"
  );
  const knowledgeText = fixtures.knowledgeText ?? [
    readRepoFile("apps/www/src/data/proofs.ts"),
    ...listFiles("apps/www/src/data/knowledge-bank", ".ts").map((file) => readFileSync(file, "utf8")),
    ...listFiles("apps/www/src/content/work", ".mdx").map((file) => readFileSync(file, "utf8"))
  ].join("\n");

  const reader = evidence.readerValidation;
  const readerCasesReady = Boolean(
    reader?.taskCases?.length === 5 &&
    unique(reader.taskCases.map((item) => item.id)) &&
    reader.taskCases.every((item) =>
      item.persona && Number.isInteger(item.timeboxSeconds) && item.timeboxSeconds > 0 &&
      item.timeboxSeconds <= 180 && item.routes?.length && item.questions?.length >= 2 &&
      item.requiredSignals?.length >= 3 && item.routes.every((route) => readRepoFile(routeFile(route)))
    )
  );
  const readerAutomationReady = Boolean(
    readerCasesReady &&
    reader.automatedEvidence?.length >= 4 &&
    reader.automatedEvidence.every((item) => readRepoFile(item.file).includes(item.mustInclude)) &&
    /only privacy-safe aggregate records from real readers/i.test(reader.boundary)
  );
  const validHumanSessions = (reader?.humanSessions ?? []).filter((session) =>
    session.sessionId && session.reviewerClass && /^\d{4}-\d{2}-\d{2}$/.test(session.performedAt) &&
    session.comprehensionPassed === true && session.noPersonalData === true
  );
  const readerScore = validHumanSessions.length >= 5
    ? 5
    : readerAutomationReady
      ? 4
      : readerCasesReady
        ? 3
        : 1;

  const collaborator = evidence.collaboratorProof;
  const collaboratorQueueReady = Boolean(
    collaborator?.targets?.length === 5 &&
    unique(collaborator.targets.map((item) => item.id)) &&
    unique(collaborator.targets.map((item) => item.proofId)) &&
    collaborator.targets.every((item) =>
      item.project && item.reviewerClass && item.evidenceGap &&
      ["not-requested", "requested", "received", "declined"].includes(item.requestStatus) &&
      knowledgeText.includes(item.proofId)
    ) &&
    collaborator.requestTemplate?.questions?.length === 5 &&
    collaborator.requestTemplate.requiredPermissionStates?.length === 4 &&
    /cannot substitute/i.test(collaborator.requestTemplate.boundary)
  );
  const permissionStates = new Set(collaborator?.requestTemplate?.requiredPermissionStates ?? []);
  const validProofNotes = (collaborator?.receivedProofNotes ?? []).filter((note) =>
    collaborator.targets.some((target) => target.id === note.targetId) &&
    permissionStates.has(note.permissionState) &&
    note.receivedAt && note.publicSafeSummary && note.boundaries?.length >= 2
  );
  const collaboratorScore = validProofNotes.length >= 5
    ? 5
    : validProofNotes.length >= 3
      ? 4
      : collaboratorQueueReady
        ? 3
        : 1;

  const requiredSequenceFields = [
    "condition",
    "diagnosis",
    "intervention",
    "coordination",
    "changedBehavior",
    "outcome"
  ];
  const sequenceRecordsReady = Boolean(
    evidence.operatingSequences?.length >= 3 &&
    unique(evidence.operatingSequences.map((item) => item.id)) &&
    evidence.operatingSequences.every((item) =>
      requiredSequenceFields.every((field) => item[field]?.length >= 40) &&
      item.evidenceRefs?.length >= 3 &&
      item.evidenceRefs.every((reference) => evidenceReferenceExists(reference, knowledgeText)) &&
      item.boundaries?.length >= 3 &&
      readRepoFile(routeFile(item.route))
    )
  );
  const sequencesRouteAligned = Boolean(
    sequenceRecordsReady &&
    evidence.operatingSequences.every((item) => {
      const page = readRepoFile(routeFile(item.route));
      return page.includes("What was unclear") && page.includes("What became usable") &&
        page.includes("What I did") && page.includes("Transferable proof");
    }) &&
    evidence.operatingSequences.every((item) =>
      item.boundaries.some((boundary) => /collective|alone|not establish|not assign/i.test(boundary))
    )
  );
  const sequenceScore = sequencesRouteAligned ? 5 : sequenceRecordsReady ? 4 : 1;

  const recent = evidence.recentPractice ?? [];
  const recentRecordsReady = Boolean(
    recent.length >= 3 &&
    unique(recent.map((item) => item.id)) &&
    recent.every((item) =>
      /2024|2025|2026/.test(item.period) && item.practice && item.publicSurface &&
      readRepoFile(routeFile(item.publicSurface)) && item.boundary?.length >= 40 &&
      (
        item.evidenceRefs?.every((reference) => evidenceReferenceExists(reference, knowledgeText)) ||
        item.repositoryEvidencePaths?.every((relativePath) => existsSync(path.join(repoRoot, relativePath)))
      )
    ) &&
    recent.filter((item) => item.evidenceRefs?.some((reference) => reference.startsWith("source:"))).length >= 2 &&
    recent.some((item) => /not a claim that a client pilot was delivered/i.test(item.boundary))
  );
  const recentExternalOutcomes = recent.filter((item) => item.externalOutcomeEvidence === true).length;
  const recentScore = recentRecordsReady ? (recentExternalOutcomes >= 3 ? 5 : 4) : 1;

  const visual = evidence.visualEvidence;
  const validClearedArtifacts = (visual?.clearedArtifacts ?? []).filter((item) =>
    item.status === "cleared" && item.path && existsSync(path.join(repoRoot, item.path)) &&
    item.route && readRepoFile(routeFile(item.route)) && item.sourceId && knowledgeText.includes(item.sourceId) &&
    item.boundary?.length >= 40
  );
  const visualQueueReady = Boolean(
    validClearedArtifacts.length >= 1 && visual.selectionQueue?.length >= 4 &&
    unique(visual.selectionQueue.map((item) => item.id)) &&
    visual.selectionQueue.every((item) =>
      item.project && item.artifactClass && item.status && !item.path && !item.url
    ) &&
    visual.clearanceRequires?.length >= 7 &&
    /remain outside the public repository/i.test(visual.boundary)
  );
  const visualScore = validClearedArtifacts.length >= 3
    ? 5
    : validClearedArtifacts.length >= 2
      ? 4
      : visualQueueReady
        ? 3
        : 1;

  const release = evidence.exactShaRelease;
  const releaseProtocolReady = Boolean(
    release?.checklistPath && launchBlockersText.includes("Exact-Commit Release Actions") &&
    release.requiredLocalCommands?.length >= 6 &&
    release.requiredLocalCommands.includes("npm run check") &&
    release.requiredLocalCommands.includes("npm run preflight:staging") &&
    release.requiredLocalCommands.includes("npm run preflight:production") &&
    release.requiredManualEvidence?.length >= 6 &&
    release.requiredProductionEvidence?.length >= 8 &&
    /no branch result is represented as.*production evidence/i.test(release.boundary)
  );
  const candidate = release?.verifiedCandidate;
  const exactCandidateReady = Boolean(
    releaseProtocolReady && candidate && /^[a-f0-9]{40}$/.test(candidate.sha) &&
    candidate.localChecksPassed === true && candidate.dockerPassed === true &&
    candidate.stagingUrl && candidate.accessibilityPassed === true &&
    candidate.jamieApproved === true
  );
  const production = release?.productionVerification;
  const productionReady = Boolean(
    exactCandidateReady && production && production.sha === candidate.sha &&
    production.smokeChecksPassed === true && production.productionUrl === "https://jamieburk.art"
  );
  const releaseScore = productionReady ? 5 : exactCandidateReady ? 4 : releaseProtocolReady ? 3 : 1;

  const maintenance = evidence.maintenance;
  const reviewedAt = Date.parse(`${maintenance?.reviewedAt}T00:00:00Z`);
  const nextReviewBy = Date.parse(`${maintenance?.nextReviewBy}T00:00:00Z`);
  const maintenancePolicyReady = Boolean(
    maintenance?.owners?.length >= 3 && maintenance.owners.every((item) => item.area && item.owner) &&
    maintenance.cadences?.length >= 5 && maintenance.cadences.every((item) =>
      item.area && Number.isInteger(item.maximumDays) && item.maximumDays > 0 && item.maximumDays <= 90
    ) &&
    Number.isFinite(reviewedAt) && Number.isFinite(nextReviewBy) && nextReviewBy > reviewedAt &&
    (nextReviewBy - reviewedAt) / 86400000 <= 90 &&
    maintenance.sourceHealth?.command === "npm run report:citations" &&
    maintenance.sourceHealth.requireOriginalAndArchiveAwareness === true &&
    maintenance.complexityBudget?.maximumCriteriaInThisSuite >= suite.criteria.length &&
    maintenance.complexityBudget.maximumPublicRoutesAdded === 0 &&
    maintenance.complexityBudget.newFrameworksAllowed === 0 &&
    maintenance.complexityBudget.requireRetirementReview === true &&
    maintenance.changePolicy?.length >= 5 &&
    maintenance.changePolicy.some((item) => /evaluator's own assertion/i.test(item))
  );
  const maintenanceIntegrated = Boolean(
    maintenancePolicyReady &&
    packageText.includes("check:portfolio-evals") &&
    packageText.includes("test:portfolio-evals") &&
    packageText.includes("report:portfolio-evals") &&
    documentationText.includes("Scores below 5")
  );
  const maintenanceScore = maintenanceIntegrated ? 5 : maintenancePolicyReady ? 4 : 1;

  const criteria = [
    scoreResult(
      "PE-EVAL-READER-VALIDATION",
      readerScore,
      `${reader.taskCases?.length ?? 0} task cases and ${validHumanSessions.length} valid real-reader sessions`,
      validHumanSessions.length >= 5 ? "Continue periodic reader testing." : "Run five privacy-safe sessions with real hiring readers."
    ),
    scoreResult(
      "PE-EVAL-COLLABORATOR-PROOF",
      collaboratorScore,
      `${collaborator.targets?.length ?? 0} prioritized projects and ${validProofNotes.length} usable collaborator proof notes`,
      validProofNotes.length >= 5 ? "Refresh permissions when public wording changes." : "Request, receive, and permission five collaborator proof notes."
    ),
    scoreResult(
      "PE-EVAL-OPERATING-SEQUENCES",
      sequenceScore,
      `${evidence.operatingSequences?.length ?? 0} evidence-linked operating sequences with route and causal boundaries`,
      sequenceScore === 5 ? "Keep sequences aligned as case studies change." : "Complete three route-aligned operating sequences."
    ),
    scoreResult(
      "PE-EVAL-RECENT-PRACTICE",
      recentScore,
      `${recent.length} normalized recent-practice records; ${recentExternalOutcomes} have external outcome evidence`,
      recentExternalOutcomes >= 3 ? "Refresh the 2024-2026 window quarterly." : "Add external outcome corroboration to three recent records."
    ),
    scoreResult(
      "PE-EVAL-VISUAL-EVIDENCE",
      visualScore,
      `${validClearedArtifacts.length} cleared artifact(s) and ${visual.selectionQueue?.length ?? 0} rights-aware candidates`,
      validClearedArtifacts.length >= 3 ? "Recheck rights and accessibility when artifacts change." : "Clear decisive artifacts for two more flagship cases."
    ),
    scoreResult(
      "PE-EVAL-EXACT-SHA-RELEASE",
      releaseScore,
      productionReady ? "One exact SHA has production smoke evidence" : exactCandidateReady ? "One exact SHA has complete candidate evidence" : "Exact-SHA protocol exists; no candidate or production completion is claimed",
      productionReady ? "Repeat for the next production candidate." : "Attach staging, accessibility, approval, Docker, and production evidence to one exact SHA."
    ),
    scoreResult(
      "PE-EVAL-MAINTAINABILITY",
      maintenanceScore,
      `${maintenance.owners?.length ?? 0} ownership lanes, ${maintenance.cadences?.length ?? 0} cadences, and a ${maintenance.complexityBudget?.maximumCriteriaInThisSuite ?? 0}-criterion suite budget`,
      maintenanceScore === 5 ? `Review again by ${maintenance.nextReviewBy}.` : "Integrate the maintenance policy into root checks and reports."
    )
  ];

  const definitions = new Map(suite.criteria.map((criterion) => [criterion.id, criterion]));
  let weightedScore = 0;
  const belowMinimum = [];
  for (const result of criteria) {
    const definition = definitions.get(result.criterionId);
    weightedScore += result.score * definition.weight;
    if (result.score < definition.minimumScore) belowMinimum.push(result.criterionId);
  }
  weightedScore = Math.round(weightedScore * 1000) / 1000;
  const externalGates = criteria.filter((item) => item.score < 5).map((item) => ({
    criterionId: item.criterionId,
    nextEvidence: item.nextEvidence
  }));

  return {
    weightedScore,
    criteria,
    errors,
    belowMinimum,
    externalGates,
    accepted:
      errors.length === 0 && belowMinimum.length === 0 &&
      weightedScore >= suite.targets.weightedScoreAtLeast
  };
}
