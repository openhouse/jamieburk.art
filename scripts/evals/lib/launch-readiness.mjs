import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "@jamie-burkart/atlas/records";
import {
  homepageProofs,
  proofClaims,
  resumeProofHighlights,
  technicalOperationsProofRows
} from "../../../apps/www/src/data/proofs.ts";

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

  const blindSpots = suite?.blindSpotCoverage;
  if (!Array.isArray(blindSpots) || blindSpots.length !== 10) {
    failures.push("blindSpotCoverage must contain exactly ten blind spots");
  } else {
    const repeated = duplicates(blindSpots.map((item) => item.id));
    if (repeated.length) failures.push(`blindSpotCoverage has duplicate IDs: ${repeated.join(", ")}`);
    const evaluationIds = new Set([
      ...(suite.sourceChecks ?? []).map((item) => item.id),
      ...(suite.browserChecks ?? []).map((item) => item.id),
      ...(suite.judgeCriteria ?? []).map((item) => item.id)
    ]);
    const humanGateIds = new Set((suite.humanGates ?? []).map((item) => item.id));
    for (const blindSpot of blindSpots) {
      if (!blindSpot.description) failures.push(`${blindSpot.id} needs a description`);
      if (!Array.isArray(blindSpot.evaluationIds) || blindSpot.evaluationIds.length === 0) {
        failures.push(`${blindSpot.id} needs at least one evaluation ID`);
      }
      for (const id of blindSpot.evaluationIds ?? []) {
        if (!evaluationIds.has(id)) failures.push(`${blindSpot.id} references unknown evaluation ${id}`);
      }
      for (const id of blindSpot.humanGateIds ?? []) {
        if (!humanGateIds.has(id)) failures.push(`${blindSpot.id} references unknown human gate ${id}`);
      }
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

const publicProofStatuses = new Set(["ready", "careful"]);

function publicProofSelections() {
  return [
    ...homepageProofs.map((proof) => ({ surface: "homepage", proof })),
    ...resumeProofHighlights.map((proof) => ({ surface: "resume", proof })),
    ...technicalOperationsProofRows.flatMap((row) =>
      row.proofs.map((proof) => ({ surface: "technical-operations", proof }))
    )
  ];
}

export function findProofProjectionSyncFailures({
  bank = knowledgeBank,
  proofs = proofClaims,
  selections = publicProofSelections()
} = {}) {
  const failures = [];
  const proofsById = new Map(proofs.map((proof) => [proof.id, proof]));
  const claimsById = new Map(bank.claims.map((claim) => [claim.id, claim]));
  const selectedIds = new Set(selections.map((item) => item.proof.id));

  for (const { surface, proof } of selections) {
    if (!publicProofStatuses.has(proof.status)) {
      failures.push({ proofId: proof.id, surface, reason: `${proof.status} proof selected publicly` });
    }
    if (!proof.surfaces.includes(surface)) {
      failures.push({ proofId: proof.id, surface, reason: "selector surface is not declared by proof" });
    }
  }

  for (const correction of bank.corrections.filter((item) => item.status === "active")) {
    const claim = claimsById.get(correction.claimId);
    const hasActiveProjection = Boolean(
      claim?.projections.some((projection) => projection.status === "active")
    );
    for (const proofId of correction.legacyProofIds ?? []) {
      const proof = proofsById.get(proofId);
      if (!proof) {
        failures.push({ correctionId: correction.id, proofId, reason: "linked legacy proof is missing" });
        continue;
      }
      if (!hasActiveProjection && publicProofStatuses.has(proof.status)) {
        failures.push({ correctionId: correction.id, proofId, reason: "held canonical claim has public proof status" });
      }
      if (!hasActiveProjection && selectedIds.has(proofId)) {
        failures.push({ correctionId: correction.id, proofId, reason: "held canonical claim is selected on a public surface" });
      }
    }
  }

  return failures;
}

export function findOutcomeChainFailures(bank = knowledgeBank) {
  const requiredFields = [
    "action",
    "intendedEnd",
    "usableResult",
    "audience",
    "collectiveCredit",
    "causalBoundary"
  ];
  return bank.claims
    .filter((claim) => claim.projections.some((projection) => projection.status === "active"))
    .flatMap((claim) => {
      if (!claim.composition) return [{ claimId: claim.id, reason: "active projection lacks composition" }];
      return requiredFields
        .filter((field) => !claim.composition[field]?.trim())
        .map((field) => ({ claimId: claim.id, reason: `composition is missing ${field}` }));
    });
}

export function findEditorialDecisionFailures(bank = knowledgeBank) {
  const failures = [];
  for (const claim of bank.claims) {
    const activeSurfaces = new Set(
      claim.projections
        .filter((projection) => projection.status === "active")
        .flatMap((projection) => projection.surfaces)
    );
    const decisions = bank.projectionDecisions.filter((decision) => decision.claimId === claim.id);
    if (claim.maturity === "public-ready" && activeSurfaces.size === 0 && decisions.length === 0) {
      failures.push({ claimId: claim.id, reason: "public-ready claim lacks an editorial decision" });
    }
    for (const surface of activeSurfaces) {
      if (!decisions.some((decision) => decision.surface === surface && decision.decision === "publish")) {
        failures.push({ claimId: claim.id, surface, reason: "active projection lacks publish decision" });
      }
    }
  }
  return failures;
}

export function findPopulationScopeFailures(bank = knowledgeBank) {
  const populationClaims = bank.claims.filter((claim) => /POPULATION|CENSUS/.test(claim.id));
  return populationClaims.flatMap((claim) => {
    const boundaryText = [...claim.boundaries, ...claim.antiClaims].join(" ");
    const failures = [];
    if (!/(surviving|current|recoverable|recovered|rendered|displayed|association|control slot)/i.test(boundaryText)) {
      failures.push({ claimId: claim.id, reason: "population scope is not tied to a recovered surface" });
    }
    if (!/(export|lifetime|deletion history|deleted|hidden|every historical|every .*ever)/i.test(boundaryText)) {
      failures.push({ claimId: claim.id, reason: "population scope lacks a historical-completeness boundary" });
    }
    return failures;
  });
}

function readJsonIfPresent(file) {
  return existsSync(file) ? readJson(file) : null;
}

function isHttpUrl(value) {
  try {
    return /^https?:$/.test(new URL(value).protocol);
  } catch {
    return false;
  }
}

export function evaluateSourceChecks({ repoRoot = defaultRepoRoot, suite = loadSuite() } = {}) {
  const checks = new Map(suite.sourceChecks.map((check) => [check.id, check]));
  const results = [];

  const workFile = path.join(repoRoot, "apps/www/src/data/work.ts");
  const homepageFile = path.join(repoRoot, "apps/www/src/app/page.tsx");
  const colophonFile = path.join(repoRoot, "apps/www/src/app/colophon/page.tsx");
  const launchFile = path.join(repoRoot, "docs/knowledge-bank/launch-blockers.md");
  const publicDir = path.join(repoRoot, "apps/www/public");
  const corroborationFile = path.join(repoRoot, "docs/knowledge-bank/corroboration-register.json");
  const blindReaderFile = path.join(repoRoot, "evals/launch-readiness/blind-reader-protocol.md");
  const blindScenariosFile = path.join(repoRoot, "evals/launch-readiness/blind-reader-scenarios.json");
  const publishingFile = path.join(repoRoot, "docs/knowledge-bank/publishing-governance.md");
  const mediaManifestFile = path.join(repoRoot, "docs/knowledge-bank/media-provenance.json");
  const productionRunbookFile = path.join(repoRoot, "docs/production-cutover.md");

  const workflowEvidence = matchEvidence(
    repoRoot,
    [workFile],
    /(?:screenshots?|materials?|approvals?|review)[^\n".]{0,36}\bpending\b|\bpending\s+(?:approval|approvals|review)\b|\b(?:needs?|requires?)\s+(?:Jamie\s+)?approval\b|\bbefore\s+(?:launch|publication)\b|\buse only\b|\bcollective-work language is required\b|\bthis page must\b|\bclaims? should\b|\bpublic wording should\b/gi
  );
  results.push(
    result(
      checks.get("public-copy-has-no-workflow-status"),
      workflowEvidence.length === 0,
      `${workflowEvidence.length} public workflow-status phrase(s)`,
      workflowEvidence
    )
  );

  const proofSyncFailures = findProofProjectionSyncFailures();
  results.push(
    result(
      checks.get("public-proof-projection-is-synchronized"),
      proofSyncFailures.length === 0,
      `${proofSyncFailures.length} proof-projection synchronization defect(s)`,
      proofSyncFailures
    )
  );

  const corroboration = readJsonIfPresent(corroborationFile);
  const corroborationItems = corroboration?.items ?? [];
  const requiredCorroborationClaims = [
    "CLM-HJE-REVENUE-GROWTH-CONTRIBUTION",
    "CLM-NYCARTC-CREATION-ROLE-SEED",
    "CLM-SOCIAL-ACCOUNT-ESTABLISHMENT-SEED",
    "CLM-KCTOWNHALL-PHASE-ONE-IMPLEMENTATION-2018-2019",
    "CLM-TIRED-OF-TIRES-DESIGN-AND-OPERATIONS-2019-2021",
    "CLM-CLEVELAND-AVE-UNIFY-TO-BEAUTIFY-CONTRIBUTION-2019"
  ];
  const corroborationFailures = [];
  for (const claimId of requiredCorroborationClaims) {
    const item = corroborationItems.find((entry) => entry.claimId === claimId);
    if (!item) {
      corroborationFailures.push({ claimId, reason: "missing from corroboration register" });
      continue;
    }
    for (const field of ["priority", "status", "ownerClass", "question", "acceptedEvidence", "stopCondition", "projectionRule"]) {
      if (!item[field] || (Array.isArray(item[field]) && item[field].length === 0)) {
        corroborationFailures.push({ claimId, reason: `missing ${field}` });
      }
    }
  }
  results.push(
    result(
      checks.get("corroboration-queue-is-actionable"),
      corroborationFailures.length === 0,
      `${corroborationFailures.length} corroboration-routing defect(s) across ${requiredCorroborationClaims.length} priority claims`,
      corroborationFailures
    )
  );

  const outcomeFailures = findOutcomeChainFailures();
  results.push(
    result(
      checks.get("projected-claims-have-complete-outcome-chains"),
      outcomeFailures.length === 0,
      `${outcomeFailures.length} projected outcome-chain defect(s)`,
      outcomeFailures
    )
  );

  const blindReader = existsSync(blindReaderFile) ? readFileSync(blindReaderFile, "utf8") : "";
  const blindScenarios = readJsonIfPresent(blindScenariosFile)?.scenarios ?? [];
  const blindRequirements = [
    /no-context/i,
    /task/i,
    /pass criteria/i,
    /privacy/i,
    /named human/i,
    /do not share/i
  ];
  const blindFailures = blindRequirements
    .filter((pattern) => !pattern.test(blindReader))
    .map((pattern) => ({ file: path.relative(repoRoot, blindReaderFile), reason: `missing ${pattern}` }));
  if (blindScenarios.length < 4) blindFailures.push({ reason: "fewer than four blind-reader scenarios" });
  for (const scenario of blindScenarios) {
    for (const field of ["id", "readerRole", "timeboxMinutes", "task", "questions", "passCriteria"]) {
      if (!scenario[field] || (Array.isArray(scenario[field]) && scenario[field].length === 0)) {
        blindFailures.push({ scenarioId: scenario.id ?? "unknown", reason: `missing ${field}` });
      }
    }
  }
  results.push(
    result(
      checks.get("blind-reader-protocol-is-operational"),
      blindFailures.length === 0,
      `${blindFailures.length} blind-reader protocol defect(s); ${blindScenarios.length} scenario(s)`,
      blindFailures
    )
  );

  const publishingSource = existsSync(publishingFile) ? readFileSync(publishingFile, "utf8") : "";
  const editorialFailures = findEditorialDecisionFailures();
  if (!/Selection test/i.test(publishingSource)) editorialFailures.push({ reason: "publishing governance lacks Selection test" });
  if (!/Review cadence/i.test(publishingSource)) editorialFailures.push({ reason: "publishing governance lacks Review cadence" });
  results.push(
    result(
      checks.get("editorial-decisions-cover-public-ready-claims"),
      editorialFailures.length === 0,
      `${editorialFailures.length} editorial decision defect(s)`,
      editorialFailures.slice(0, 20)
    )
  );

  const populationFailures = findPopulationScopeFailures();
  const renderedSurfaceFiles = [
    ...walk(path.join(repoRoot, "apps/www/src/app")),
    ...walk(path.join(repoRoot, "apps/www/src/components")),
    ...walk(path.join(repoRoot, "apps/www/src/content")),
    workFile,
    path.join(repoRoot, "apps/www/src/data/proofs.ts")
  ].filter((file) => existsSync(file) && /\.(?:ts|tsx|mdx)$/.test(file));
  const unqualifiedPopulationCopy = matchEvidence(
    repoRoot,
    renderedSurfaceFiles,
    /\b(?:100%|full[- ]population|complete lifetime|every (?:tweet|post|event) ever)\b/gi
  );
  populationFailures.push(...unqualifiedPopulationCopy.map((item) => ({ ...item, reason: "unqualified public completeness language" })));
  results.push(
    result(
      checks.get("population-claims-preserve-recovery-scope"),
      populationFailures.length === 0,
      `${populationFailures.length} archival-population scope defect(s)`,
      populationFailures.slice(0, 20)
    )
  );

  const mediaManifest = readJsonIfPresent(mediaManifestFile);
  const mediaEntries = mediaManifest?.assets ?? [];
  const artifactMedia = walk(path.join(publicDir, "images/work")).filter((file) =>
    [".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"].includes(path.extname(file).toLowerCase())
  );
  const mediaFailures = [];
  for (const file of artifactMedia) {
    const publicPath = `/${path.relative(publicDir, file).split(path.sep).join("/")}`;
    const entry = mediaEntries.find((item) => item.path === publicPath);
    if (!entry) {
      mediaFailures.push({ file: path.relative(repoRoot, file), reason: "missing provenance entry" });
      continue;
    }
    for (const field of ["sourceUrl", "capturedAt", "caption", "rightsBasis", "rightsReviewStatus", "consentStatus"]) {
      if (!entry[field]) mediaFailures.push({ path: publicPath, reason: `missing ${field}` });
    }
    if (entry.sourceUrl && !isHttpUrl(entry.sourceUrl)) mediaFailures.push({ path: publicPath, reason: "invalid source URL" });
    if (entry.rightsReviewStatus === "unknown") mediaFailures.push({ path: publicPath, reason: "unknown rights review status" });
  }
  for (const entry of mediaEntries) {
    if (!existsSync(path.join(publicDir, entry.path.replace(/^\//, "")))) {
      mediaFailures.push({ path: entry.path, reason: "manifest asset is missing" });
    }
  }
  results.push(
    result(
      checks.get("displayed-media-has-provenance"),
      mediaFailures.length === 0 && artifactMedia.length > 0,
      `${artifactMedia.length} displayed artifact(s); ${mediaFailures.length} provenance defect(s)`,
      mediaFailures.length ? mediaFailures : mediaEntries.map((item) => ({ path: item.path, sourceUrl: item.sourceUrl }))
    )
  );

  const productionRunbook = existsSync(productionRunbookFile)
    ? readFileSync(productionRunbookFile, "utf8")
    : "";
  const cutoverRequirements = [
    /## Preconditions/i,
    /## Cutover/i,
    /## Verification/i,
    /## Rollback/i,
    /human authorization/i,
    /preflight:production/i,
    /primary-domain-serves-current-portfolio/i,
    /X-Robots-Tag/i,
    /canonical/i
  ];
  const cutoverFailures = cutoverRequirements
    .filter((pattern) => !pattern.test(productionRunbook))
    .map((pattern) => ({ file: path.relative(repoRoot, productionRunbookFile), reason: `missing ${pattern}` }));
  results.push(
    result(
      checks.get("production-cutover-is-operationalized"),
      cutoverFailures.length === 0,
      `${cutoverFailures.length} production-cutover contract defect(s)`,
      cutoverFailures
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

  const citedClaimIds = new Set(
    knowledgeBank.pages.flatMap((page) => page.occurrences.map(({ claimId }) => claimId))
  );
  const citationProjects = [...new Set(
    knowledgeBank.claims
      .filter(({ id }) => citedClaimIds.has(id))
      .map(({ project }) => project)
      .filter(Boolean)
  )];
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
