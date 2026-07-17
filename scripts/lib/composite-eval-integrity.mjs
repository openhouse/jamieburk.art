import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync
} from "node:fs";
import path from "node:path";

export const COMPOSITE_CONTRACT_PATH = "docs/evals/composite-contract.json";

const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const PUBLIC_TEXT_EXTENSIONS = new Set([
  ".css",
  ".csv",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml"
]);

const REQUIRED_FAMILIES = [
  "candidate-identity",
  "evaluator-integrity",
  "provenance-frontier",
  "knowledge-lifecycle",
  "evidence-quality",
  "publication-governance",
  "cross-surface-consistency",
  "chad-lens",
  "margaret-morse-lens",
  "warren-sack-lens",
  "portfolio-mosaic",
  "blind-spots",
  "archive-population-controls",
  "privacy-and-rights",
  "selective-projection",
  "release-readiness",
  "application-readiness",
  "integration-governance"
];

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, sortObject(value[key])])
  );
}

export function stableJson(value) {
  return JSON.stringify(sortObject(value));
}

function relativePath(repoRoot, absolutePath) {
  return path.relative(repoRoot, absolutePath).split(path.sep).join("/");
}

function walkFiles(directory, files = []) {
  if (!existsSync(directory)) return files;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if ([".git", ".next", "node_modules", "reports"].includes(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) walkFiles(absolutePath, files);
    if (entry.isFile()) files.push(absolutePath);
  }
  return files;
}

function isExcluded(relative, excludes) {
  return excludes.some(
    (entry) => relative === entry.replace(/\/$/, "") || relative.startsWith(entry)
  );
}

export function collectMaterialFiles(repoRoot, contract) {
  const { exactFiles = [], prefixes = [], excludes = [] } = contract.materialInputs ?? {};
  const material = new Set();

  for (const relative of exactFiles) {
    const absolutePath = path.join(repoRoot, relative);
    if (existsSync(absolutePath) && statSync(absolutePath).isFile()) material.add(relative);
  }

  for (const prefix of prefixes) {
    const absolutePrefix = path.join(repoRoot, prefix);
    if (existsSync(absolutePrefix) && statSync(absolutePrefix).isFile()) {
      material.add(prefix);
      continue;
    }
    for (const absolutePath of walkFiles(absolutePrefix)) {
      material.add(relativePath(repoRoot, absolutePath));
    }
  }

  return [...material]
    .filter((relative) => !isExcluded(relative, excludes))
    .sort();
}

function hashFileSet(repoRoot, relativePaths) {
  const records = relativePaths.map((relative) => ({
    path: relative,
    sha256: sha256(readFileSync(path.join(repoRoot, relative)))
  }));
  return {
    digest: sha256(stableJson(records)),
    fileCount: records.length,
    records
  };
}

function git(repoRoot, args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  }).trim();
}

export function loadCompositeContract(repoRoot) {
  return JSON.parse(readFileSync(path.join(repoRoot, COMPOSITE_CONTRACT_PATH), "utf8"));
}

export function computeCandidateIdentity(repoRoot, contract = loadCompositeContract(repoRoot)) {
  const materialFiles = collectMaterialFiles(repoRoot, contract);
  const material = hashFileSet(repoRoot, materialFiles);
  const evaluatorFiles = materialFiles.filter(
    (relative) =>
      relative === COMPOSITE_CONTRACT_PATH ||
      relative === "package.json" ||
      relative === "scripts/run-launch-evals.mjs" ||
      relative === "scripts/certify-launch-evals.mjs" ||
      relative.startsWith("scripts/lib/") ||
      relative.startsWith("scripts/tests/")
  );
  const evaluator = hashFileSet(repoRoot, evaluatorFiles);
  const publicRegistryPath = "apps/www/src/data/knowledge-bank/public-registry.json";
  const publicRegistryDigest = sha256(
    readFileSync(path.join(repoRoot, publicRegistryPath))
  );
  const contractDigest = sha256(stableJson(contract));
  const gitSha = git(repoRoot, ["rev-parse", "HEAD"]);
  const branch = git(repoRoot, ["branch", "--show-current"]);
  const status = git(repoRoot, [
    "status",
    "--porcelain=v1",
    "--untracked-files=all"
  ]);
  const treeState = status ? "dirty" : "clean";
  const worktreeStateDigest = sha256(status);
  const candidateId = sha256(
    stableJson({
      gitSha,
      branch,
      treeState,
      worktreeStateDigest,
      contractDigest,
      materialDigest: material.digest,
      evaluatorDigest: evaluator.digest,
      publicRegistryDigest
    })
  );

  return {
    candidateId,
    gitSha,
    branch,
    treeState,
    worktreeStateDigest,
    contractVersion: contract.contractVersion,
    contractDigest,
    materialDigest: material.digest,
    materialFileCount: material.fileCount,
    evaluatorDigest: evaluator.digest,
    evaluatorFileCount: evaluator.fileCount,
    publicRegistryDigest,
    publicRegistryPath
  };
}

function duplicates(values) {
  const seen = new Set();
  const repeated = new Set();
  for (const value of values) {
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  }
  return [...repeated];
}

function sameSet(left, right) {
  return stableJson([...new Set(left)].sort()) === stableJson([...new Set(right)].sort());
}

export function validateCandidateIdentity(identity) {
  const errors = [];
  for (const field of [
    "candidateId",
    "contractDigest",
    "materialDigest",
    "evaluatorDigest",
    "publicRegistryDigest",
    "worktreeStateDigest"
  ]) {
    if (!SHA256_PATTERN.test(identity[field] ?? "")) {
      errors.push(`Candidate identity has an invalid ${field}`);
    }
  }
  if (!/^[a-f0-9]{40}$/.test(identity.gitSha ?? "")) {
    errors.push("Candidate identity has an invalid Git SHA");
  }
  if (!identity.branch) errors.push("Candidate identity is missing the branch");
  if (!identity.contractVersion) errors.push("Candidate identity is missing the contract version");
  if (!Number.isInteger(identity.materialFileCount) || identity.materialFileCount < 20) {
    errors.push("Candidate identity binds too few material files");
  }
  if (!Number.isInteger(identity.evaluatorFileCount) || identity.evaluatorFileCount < 4) {
    errors.push("Candidate identity binds too few evaluator files");
  }
  return errors;
}

export function validateCompositeContract(contract, observedResults = []) {
  const errors = [];
  if (contract.schemaVersion !== 1) errors.push("Composite contract schemaVersion must be 1");
  if (!contract.contractVersion) errors.push("Composite contract requires contractVersion");
  if (contract.suite !== "jamieburk-art-launch-readiness") {
    errors.push("Composite contract suite is not the canonical launch suite");
  }
  if (contract.minimumScore !== 94) errors.push("Composite minimum score must remain 94");
  if (contract.certification?.consecutivePassingRuns !== 2) {
    errors.push("Composite certification requires two consecutive passing runs");
  }
  if (contract.certification?.unchangedCandidateRequired !== true) {
    errors.push("Composite certification requires an unchanged candidate");
  }
  if (contract.certification?.readOnlyHoldoutRequired !== true) {
    errors.push("Composite certification requires a read-only holdout");
  }
  if (contract.certification?.humanProductionApprovalRequired !== true) {
    errors.push("Composite certification requires human production approval");
  }
  if (!sameSet(contract.requiredFamilies ?? [], REQUIRED_FAMILIES)) {
    errors.push("Composite contract does not preserve every required evaluation family");
  }

  const legacy = contract.legacyCriteriaManifest ?? [];
  const composite = contract.compositeCriteria ?? [];
  const expected = [...legacy, ...composite];
  const expectedIds = new Set(expected.map((item) => item.id));
  for (const family of REQUIRED_FAMILIES) {
    const coveredBy = contract.familyCoverage?.[family];
    if (!Array.isArray(coveredBy) || !coveredBy.length) {
      errors.push(`Composite contract family ${family} has no criterion coverage`);
      continue;
    }
    for (const criterionId of coveredBy) {
      if (!expectedIds.has(criterionId)) {
        errors.push(`Composite contract family ${family} references unknown criterion ${criterionId}`);
      }
    }
  }
  const duplicateExpected = duplicates(expected.map((item) => item.id));
  if (duplicateExpected.length) {
    errors.push(`Composite contract has duplicate criterion IDs: ${duplicateExpected.join(", ")}`);
  }

  for (const criterion of composite) {
    for (const field of [
      "id",
      "family",
      "weight",
      "hardGate",
      "evidenceInputs",
      "passingCondition",
      "antiGamingRule",
      "stopCondition"
    ]) {
      if (criterion[field] === undefined || criterion[field] === "") {
        errors.push(`${criterion.id ?? "Composite criterion"} is missing ${field}`);
      }
    }
    if (!(contract.requiredFamilies ?? []).includes(criterion.family)) {
      errors.push(`${criterion.id} uses unknown family ${criterion.family}`);
    }
    if (!Array.isArray(criterion.evidenceInputs) || !criterion.evidenceInputs.length) {
      errors.push(`${criterion.id} requires at least one evidence input`);
    }
    if (criterion.hardGate !== true) errors.push(`${criterion.id} must remain a hard gate`);
  }

  const observedIds = observedResults.map((item) => item.id);
  const duplicateObserved = duplicates(observedIds);
  if (duplicateObserved.length) {
    errors.push(`Launch results have duplicate criterion IDs: ${duplicateObserved.join(", ")}`);
  }
  if (observedResults.length && !sameSet(expected.map((item) => item.id), observedIds)) {
    const expectedIds = new Set(expected.map((item) => item.id));
    const observedIdSet = new Set(observedIds);
    const missing = [...expectedIds].filter((id) => !observedIdSet.has(id));
    const unexpected = [...observedIdSet].filter((id) => !expectedIds.has(id));
    if (missing.length) errors.push(`Launch results are missing contracted criteria: ${missing.join(", ")}`);
    if (unexpected.length) errors.push(`Launch results contain uncontracted criteria: ${unexpected.join(", ")}`);
  }

  const observedById = new Map(observedResults.map((item) => [item.id, item]));
  for (const expectedCriterion of expected) {
    const observed = observedById.get(expectedCriterion.id);
    if (!observed) continue;
    if (observed.weight !== expectedCriterion.weight) {
      errors.push(`${expectedCriterion.id} weight drifted from the frozen contract`);
    }
    if (Boolean(observed.hardGate) !== Boolean(expectedCriterion.hardGate)) {
      errors.push(`${expectedCriterion.id} hard-gate status drifted from the frozen contract`);
    }
    if (!observed.label) errors.push(`${expectedCriterion.id} is missing a label`);
    if (!Array.isArray(observed.evidence) || !observed.evidence.length) {
      errors.push(`${expectedCriterion.id} is missing evaluator evidence`);
    }
    if (!Array.isArray(observed.failures)) {
      errors.push(`${expectedCriterion.id} is missing a failure list`);
    }
    if (!['pass', 'fail'].includes(observed.status)) {
      errors.push(`${expectedCriterion.id} has invalid status ${observed.status}`);
    }
  }
  return errors;
}

function indexById(items) {
  return new Map(items.map((item) => [item.id, item]));
}

function addDuplicateErrors(errors, label, items) {
  const duplicateIds = duplicates(items.map((item) => item.id));
  if (duplicateIds.length) errors.push(`${label} has duplicate IDs: ${duplicateIds.join(", ")}`);
}

function isPublicRoute(surface) {
  return typeof surface === "string" && surface.startsWith("/");
}

export function validateKnowledgeFrontier(knowledgeBank) {
  const errors = [];
  const collections = [
    ["Intake", knowledgeBank.intake],
    ["Projects", knowledgeBank.projects],
    ["Sources", knowledgeBank.sources],
    ["Claims", knowledgeBank.claims],
    ["Research inquiries", knowledgeBank.researchInquiries],
    ["Corrections", knowledgeBank.corrections],
    ["Pages", knowledgeBank.pages],
    ["Publication decisions", knowledgeBank.publicationDecisions]
  ];
  for (const [label, items] of collections) addDuplicateErrors(errors, label, items);
  const duplicateProofCoverage = duplicates(
    knowledgeBank.proofCoverage.map((item) => item.proofId)
  );
  if (duplicateProofCoverage.length) {
    errors.push(`Proof coverage has duplicate proof IDs: ${duplicateProofCoverage.join(", ")}`);
  }

  const projects = indexById(knowledgeBank.projects);
  const sources = indexById(knowledgeBank.sources);
  const claims = indexById(knowledgeBank.claims);
  const inquiries = indexById(knowledgeBank.researchInquiries);
  const decisions = new Map(
    knowledgeBank.publicationDecisions.map((item) => [item.claimId, item])
  );

  const requireIds = (owner, ids, index, label) => {
    for (const id of ids ?? []) {
      if (!index.has(id)) errors.push(`${owner} references missing ${label} ${id}`);
    }
  };

  for (const intake of knowledgeBank.intake) {
    requireIds(intake.id, intake.projectIds, projects, "project");
    requireIds(intake.id, intake.sourceIds, sources, "source");
    requireIds(intake.id, intake.claimIds, claims, "claim");
    requireIds(intake.id, intake.inquiryIds, inquiries, "inquiry");
  }

  for (const project of knowledgeBank.projects) {
    requireIds(project.id, project.sourceIds, sources, "source");
    requireIds(project.id, project.claimIds, claims, "claim");
    requireIds(project.id, project.inquiryIds, inquiries, "inquiry");
  }

  for (const claim of knowledgeBank.claims) {
    if (!projects.has(claim.project)) {
      errors.push(`${claim.id} references missing project ${claim.project}`);
    }
    requireIds(
      claim.id,
      claim.evidence.map((item) => item.sourceId),
      sources,
      "source"
    );
    requireIds(claim.id, claim.researchInquiryIds, inquiries, "inquiry");
    if (!claim.evidence.length && claim.status !== "disallowed") {
      errors.push(`${claim.id} has no evidence relationship`);
    }
    if (claim.evidence.some((item) => item.relationship === "private-support" && item.renderCitation)) {
      errors.push(`${claim.id} renders a private-support relationship as a public citation`);
    }
    const decision = decisions.get(claim.id);
    if (!decision) {
      errors.push(`${claim.id} has no publication decision`);
      continue;
    }
    if (decision.decision !== claim.editorialStatus) {
      errors.push(`${claim.id} publication decision disagrees with editorial status`);
    }

    for (const projection of claim.projections) {
      for (const surface of projection.surfaces) {
        if (!isPublicRoute(surface) || projection.status !== "active") continue;
        if (claim.editorialStatus !== "selected" || decision.decision !== "selected") {
          errors.push(`${claim.id} has an active public projection without a selected decision`);
        }
        if (!decision.surfaces.includes(surface)) {
          errors.push(`${claim.id} public surface ${surface} is absent from its publication decision`);
        }
        if (["protected", "private"].includes(claim.publicSafety)) {
          errors.push(`${claim.id} projects protected or private material to ${surface}`);
        }
        if (projection.key === "photo-caption") {
          const mediaSources = claim.evidence
            .map((item) => sources.get(item.sourceId))
            .filter((source) => source?.media);
          if (mediaSources.some((source) => source.media.publicDisplayStatus !== "cleared")) {
            errors.push(`${claim.id} projects a photo caption before visual evidence is cleared`);
          }
        }
      }
    }
  }

  for (const inquiry of knowledgeBank.researchInquiries) {
    if (!projects.has(inquiry.project)) {
      errors.push(`${inquiry.id} references missing project ${inquiry.project}`);
    }
    requireIds(inquiry.id, inquiry.sourceIds, sources, "source");
  }
  for (const correction of knowledgeBank.corrections) {
    if (!claims.has(correction.claimId)) {
      errors.push(`${correction.id} references missing claim ${correction.claimId}`);
    }
  }
  for (const decision of knowledgeBank.publicationDecisions) {
    if (!claims.has(decision.claimId)) {
      errors.push(`${decision.id} references missing claim ${decision.claimId}`);
    }
  }
  for (const coverage of knowledgeBank.proofCoverage) {
    requireIds(coverage.proofId, coverage.sourceIds, sources, "source");
    requireIds(coverage.proofId, coverage.inquiryIds, inquiries, "inquiry");
  }

  for (const page of knowledgeBank.pages) {
    requireIds(page.id, page.sourceOrder, sources, "source");
    const duplicateOccurrences = duplicates(page.occurrences.map((item) => item.id));
    if (duplicateOccurrences.length) {
      errors.push(`${page.id} has duplicate occurrence IDs: ${duplicateOccurrences.join(", ")}`);
    }
    for (const occurrence of page.occurrences) {
      const claim = claims.get(occurrence.claimId);
      if (!claim) {
        errors.push(`${page.id}/${occurrence.id} references missing claim ${occurrence.claimId}`);
        continue;
      }
      const projection = claim.projections.find(
        (item) =>
          item.key === occurrence.projection &&
          item.status === "active" &&
          item.surfaces.includes(page.surface)
      );
      if (!projection) {
        errors.push(`${page.id}/${occurrence.id} has no active canonical projection for ${page.surface}`);
      }
      const evidenceSourceIds = new Set(claim.evidence.map((item) => item.sourceId));
      for (const sourceId of occurrence.sourceIds ?? []) {
        if (!sources.has(sourceId)) {
          errors.push(`${page.id}/${occurrence.id} references missing source ${sourceId}`);
        }
        if (!evidenceSourceIds.has(sourceId)) {
          errors.push(`${page.id}/${occurrence.id} cites ${sourceId} outside the canonical claim evidence`);
        }
        if (!page.sourceOrder.includes(sourceId)) {
          errors.push(`${page.id}/${occurrence.id} cites ${sourceId} outside the page source order`);
        }
      }
    }
  }

  for (const claim of knowledgeBank.claims) {
    for (const projection of claim.projections) {
      if (
        projection.status !== "active" ||
        !projection.citationRequired ||
        !projection.surfaces.some(isPublicRoute)
      ) {
        continue;
      }
      for (const surface of projection.surfaces.filter(isPublicRoute)) {
        const page = knowledgeBank.pages.find((item) => item.surface === surface);
        if (!page) {
          errors.push(`${claim.id} requires a citation on ${surface}, but the page is unregistered`);
          continue;
        }
        if (!page.occurrences.some(
          (item) => item.claimId === claim.id && item.projection === projection.key
        )) {
          errors.push(`${claim.id} requires a citation on ${surface}, but no occurrence is registered`);
        }
      }
    }
  }
  return errors;
}

export function validateSelectiveProjection(knowledgeBank) {
  const errors = [];
  const decisions = new Map(
    knowledgeBank.publicationDecisions.map((item) => [item.claimId, item])
  );
  const sources = indexById(knowledgeBank.sources);
  for (const claim of knowledgeBank.claims) {
    const decision = decisions.get(claim.id);
    if (!decision) continue;
    const publicActive = claim.projections.flatMap((projection) =>
      projection.status === "active"
        ? projection.surfaces.filter(isPublicRoute).map((surface) => ({ projection, surface }))
        : []
    );
    if (claim.editorialStatus !== "selected" && publicActive.length) {
      errors.push(`${claim.id} is ${claim.editorialStatus} but has an active public route`);
    }
    if (["protected", "private"].includes(claim.publicSafety) && publicActive.length) {
      errors.push(`${claim.id} has protected public-safety status but is publicly projected`);
    }
    for (const { projection, surface } of publicActive) {
      if (!decision.surfaces.includes(surface)) {
        errors.push(`${claim.id} projects to ${surface} outside its selected decision`);
      }
      if (projection.key === "photo-caption") {
        for (const evidence of claim.evidence) {
          const source = sources.get(evidence.sourceId);
          if (source?.media && source.media.publicDisplayStatus !== "cleared") {
            errors.push(`${claim.id} exposes uncleared visual evidence on ${surface}`);
          }
        }
      }
    }
  }
  return errors;
}

function decodeNumericEntity(_match, radixMarker, digits) {
  const radix = radixMarker ? 16 : 10;
  const value = Number.parseInt(digits, radix);
  return Number.isFinite(value) ? String.fromCodePoint(value) : _match;
}

export function normalizeInspectionText(value) {
  let output = String(value);
  for (let pass = 0; pass < 3; pass += 1) {
    output = output
      .replace(/\\u\{([0-9a-f]{1,6})\}/gi, (_match, digits) =>
        String.fromCodePoint(Number.parseInt(digits, 16))
      )
      .replace(/\\u([0-9a-f]{4})/gi, (_match, digits) =>
        String.fromCodePoint(Number.parseInt(digits, 16))
      )
      .replace(/\\x([0-9a-f]{2})/gi, (_match, digits) =>
        String.fromCodePoint(Number.parseInt(digits, 16))
      )
      .replace(/&#(x?)([0-9a-f]+);/gi, decodeNumericEntity)
      .replace(/\\\//g, "/");
  }
  return output
    .normalize("NFKC")
    .replace(/\p{Default_Ignorable_Code_Point}/gu, "")
    .replace(/[\u2044\u2215]/g, "/");
}

export function findSensitiveValues(value) {
  const text = normalizeInspectionText(value);
  const patterns = [
    ["private local filesystem path", /(?:^|[\s('"`=])\/(?:Users|Volumes)\/[^/\s]+\//im],
    ["private temporary filesystem path", /(?:^|[\s('"`=])\/private\/(?:tmp|var)\//im],
    ["private key block", /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/i],
    ["provider credential", /\b(?:sk-proj-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b/],
    ["bearer token", /\bbearer\s+[A-Za-z0-9._-]{20,}/i],
    ["secret assignment", /\b(?:api[_-]?key|secret|password|auth[_-]?token|access[_-]?token|refresh[_-]?token|session[_-]?token)\s*[:=]\s*["'][^"'\n]{12,}["']/i],
    ["unapproved phone-shaped value", /(?:^|\D)(?:\+?1[ .-]?)?(?:\([0-9]{3}\)|[0-9]{3})[ .-][0-9]{3}[ .-][0-9]{4}(?:\D|$)/]
  ];
  return patterns
    .filter(([, pattern]) => pattern.test(text))
    .map(([label]) => label);
}

export function scanGovernedPublicText(repoRoot, contract = loadCompositeContract(repoRoot)) {
  const issues = [];
  const files = collectMaterialFiles(repoRoot, contract).filter((relative) => {
    const governed =
      relative === "instructions-f.md" ||
      relative.startsWith("apps/www/src/") ||
      relative.startsWith("docs/knowledge-bank/") ||
      relative.startsWith("docs/evals/");
    return governed && PUBLIC_TEXT_EXTENSIONS.has(path.extname(relative).toLowerCase());
  });
  for (const relative of files) {
    const content = readFileSync(path.join(repoRoot, relative), "utf8");
    for (const label of findSensitiveValues(content)) issues.push(`${relative}: ${label}`);
  }
  return issues;
}

export function validateConsecutiveCertification(reports, contract) {
  const errors = [];
  const requiredRuns = contract.certification?.consecutivePassingRuns ?? 2;
  if (reports.length !== requiredRuns) {
    errors.push(`Certification requires exactly ${requiredRuns} passing runs`);
    return errors;
  }
  for (const [index, report] of reports.entries()) {
    if (!report.summary?.automatedReady) {
      errors.push(`Certification run ${index + 1} is not automated-ready`);
    }
    if (report.identity?.treeState !== "clean") {
      errors.push(`Certification run ${index + 1} used a dirty candidate`);
    }
    errors.push(...validateCandidateIdentity(report.identity ?? {}).map(
      (error) => `Certification run ${index + 1}: ${error}`
    ));
  }
  const fields = [
    "candidateId",
    "gitSha",
    "contractDigest",
    "materialDigest",
    "evaluatorDigest",
    "publicRegistryDigest"
  ];
  for (const field of fields) {
    if (!reports.every((report) => report.identity?.[field] === reports[0].identity?.[field])) {
      errors.push(`Certification runs do not share the same ${field}`);
    }
  }
  return errors;
}

export function candidateIdentityEvidence(identity) {
  return [
    `Candidate ${identity.candidateId} binds Git ${identity.gitSha} on ${identity.branch}.`,
    `${identity.materialFileCount} material files bind to ${identity.materialDigest}.`,
    `${identity.evaluatorFileCount} evaluator files bind to ${identity.evaluatorDigest}.`,
    `Contract ${identity.contractVersion} binds to ${identity.contractDigest}; public registry binds to ${identity.publicRegistryDigest}.`,
    `Worktree state is recorded as ${identity.treeState}, with digest ${identity.worktreeStateDigest}.`
  ];
}
