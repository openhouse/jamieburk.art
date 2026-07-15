#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
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
const collectiveCreditPolicy = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/policies/collective-credit-policy.json",
    "utf8"
  )
);
const projectionSurfaceBindings = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/policies/projection-surface-bindings.json",
    "utf8"
  )
);
const collectiveProjectEntries = collectiveCreditPolicy.collectiveProjects;
const individualProjectEntries = collectiveCreditPolicy.individualProjects;
const collectiveProjects = new Set(collectiveProjectEntries);
const individualProjects = new Set(individualProjectEntries);
const mixedProjects = new Map(
  Object.entries(collectiveCreditPolicy.mixedProjects)
);
const unassertedIndividualClaims = new Map(
  Object.entries(collectiveCreditPolicy.unassertedIndividualClaims)
);
const knownRouteProjectionSurfaces = new Set(
  Object.keys(projectionSurfaceBindings.routes)
);
const requiredPublicSurfaceRoots = new Map([
  ["apps/www/src/app", [".js", ".jsx", ".md", ".mdx", ".ts", ".tsx"]],
  ["apps/www/src/components", [".js", ".jsx", ".ts", ".tsx"]],
  ["apps/www/src/content", [".md", ".mdx"]],
  ["apps/www/public", [".html", ".htm", ".md", ".mdx", ".pdf", ".txt"]]
]);
const requiredPublicSurfaceFiles = new Set([
  "apps/www/mdx-components.tsx",
  "apps/www/next.config.ts",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "apps/www/src/data/knowledge-bank/public.ts",
  "apps/www/src/data/knowledge-bank/schema.ts",
  "apps/www/src/data/site.ts",
  "apps/www/src/data/work.ts",
  "apps/www/src/lib/work.ts",
  "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.html",
  "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.txt",
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
]);
const requiredCaseStudySharedFiles = new Set([
  "apps/www/src/app/work/[slug]/page.tsx",
  "apps/www/src/components/CaseStudyBlocks.tsx",
  "apps/www/src/components/CaseStudyLayout.tsx",
  "apps/www/src/data/work.ts"
]);
const requiredCollectiveRuntimeFiles = new Set([
  "apps/www/mdx-components.tsx",
  "apps/www/src/app/work/[slug]/page.tsx",
  "apps/www/src/components/CaseStudyLayout.tsx",
  "apps/www/src/components/citations/Claim.tsx",
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "apps/www/src/data/knowledge-bank/public.ts",
  "apps/www/src/lib/work.ts"
]);
const requiredResumeStatementIds = new Set([
  "profile-operating-structure",
  "hje-growth",
  "callnyc-guidance",
  "crs-memory",
  "nycac-public-systems",
  "wowlist-platform",
  "sunday-dinner-participation",
  "thick-arts-role",
  "nycac-role",
  "wowlist-role",
  "sunday-dinner-role",
  "kc-town-hall-role",
  "kc-town-hall-council-sequence",
  "ai-evals-course",
  "ucsc-degree",
  "work-authorization"
]);
const hybridCandidatePaths = [
  ".agents/evals/knowledge-bank-development.json",
  "apps/www/src/content/work",
  "apps/www/src/data/knowledge-bank",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/work.ts",
  "apps/www/src/lib",
  "apps/www/mdx-components.tsx",
  "apps/www/next.config.ts",
  "apps/www/public/resume",
  "docs/knowledge-bank",
  "scripts/check-knowledge-development.mjs",
  "scripts/lib/citation-validation.mjs",
  "scripts/tests/citations.test.mjs",
  "scripts/tests/knowledge-development.test.mjs"
];

export function validateHybridReportCandidate(report) {
  const errors = [];
  if (!/^[0-9a-f]{40}$/.test(report?.candidate_sha ?? "")) {
    return ["hybrid report requires a full candidate_sha"];
  }

  try {
    execFileSync("git", ["cat-file", "-e", `${report.candidate_sha}^{commit}`], {
      stdio: "ignore"
    });
  } catch {
    return [`hybrid report candidate ${report.candidate_sha} is not a local commit`];
  }

  try {
    execFileSync("git", ["diff", "--quiet", report.candidate_sha, "--", ...hybridCandidatePaths], {
      stdio: "ignore"
    });
  } catch {
    errors.push(
      `hybrid report candidate ${report.candidate_sha} does not match the current knowledge-bank inputs`
    );
  }
  return errors;
}

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

function normalizedText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableSha256(value) {
  return sha256(JSON.stringify(value));
}

export function collectiveCreditFingerprint(bank) {
  return stableSha256(
    bank.claims
      .filter((claim) => claim.collectiveWork)
      .map((claim) => ({
        id: claim.id,
        project: claim.project,
        internalClaim: claim.internalClaim,
        boundaries: claim.boundaries,
        antiClaims: claim.antiClaims,
        projections: claim.projections,
        collectiveWork: claim.collectiveWork
      }))
      .sort((left, right) => left.id.localeCompare(right.id))
  );
}

export function fileInventoryFingerprint(paths) {
  return stableSha256(
    [...paths]
      .sort()
      .map((path) => [path, sha256(readFileSync(path))])
  );
}

export function projectionDecisionFingerprint(bank) {
  return stableSha256({
    claims: bank.claims
      .map((claim) => ({
        id: claim.id,
        projectionEligibility: claim.projectionEligibility,
        projections: claim.projections
      }))
      .sort((left, right) => left.id.localeCompare(right.id)),
    pages: bank.pages
      .map((page) => ({
        id: page.id,
        surface: page.surface,
        occurrences: page.occurrences
      }))
      .sort((left, right) => left.id.localeCompare(right.id))
  });
}

function filesBelow(root, extensions) {
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path, extensions));
    else if (extensions.some((extension) => path.endsWith(extension))) files.push(path);
  }
  return files;
}

export function publicSurfaceFingerprint(
  policy = projectionSurfaceBindings
) {
  const paths = new Set(policy.publicSurfaceFiles);
  for (const root of policy.publicSurfaceRoots) {
    for (const path of filesBelow(root.path, root.extensions)) paths.add(path);
  }
  return stableSha256(
    [...paths].sort().map((path) => [path, sha256(readFileSync(path))])
  );
}

function routeFilesForSurface(surface) {
  const files = projectionSurfaceBindings.routes[surface] ?? [];
  if (!projectionSurfaceBindings.caseStudyRoutes.includes(surface)) return files;
  return [...new Set([...files, ...projectionSurfaceBindings.caseStudySharedFiles])];
}

function literalAttribute(tag, attribute) {
  return tag.match(new RegExp(`${attribute}=["']([^"']+)["']`))?.[1];
}

function executableSource(content) {
  return content
    .replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm, "")
    .replace(/`(?:\\[\s\S]|[^`])*`/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1")
    .replace(
      /(^|\n)[ \t]*(?!export\b)(?:async\s+)?function\s+[A-Za-z_$][\w$]*\s*\([^)]*\)\s*\{[\s\S]*?^[ \t]*\}/gm,
      "$1"
    )
    .replace(
      /(^|\n)[ \t]*(?!export\b)(?:const|let)\s+[A-Za-z_$][\w$]*\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*\([\s\S]*?^[ \t]*\);?/gm,
      "$1"
    )
    .replace(
      /\bprocess\.env(?:\.[A-Za-z0-9_]+|\[[^\]]+\])\s*&&\s*\([\s\S]*?\)\s*;?/g,
      ""
    )
    .replace(
      /\bif\s*\(\s*process\.env(?:\.[A-Za-z0-9_]+|\[[^\]]+\])\s*\)\s*\{[\s\S]*?\}/g,
      ""
    )
    .replace(/\bfalse\s*&&\s*\([\s\S]*?\)\s*;?/g, "")
    .replace(/\bif\s*\(\s*false\s*\)\s*\{[\s\S]*?\}/g, "");
}

export function documentRealizesProjection(content, projection) {
  return normalizedText(executableSource(content)).includes(
    normalizedText(projection.text)
  );
}

function matchingCitationOccurrence(bank, tag, claim, projection, surface) {
  const pageId = literalAttribute(tag, "pageId");
  const occurrenceId = literalAttribute(tag, "occurrenceId");
  if (!pageId && !occurrenceId) return !projection.citationRequired;
  if (!pageId || !occurrenceId) return false;
  const page = bank.pages.find(
    (item) => item.id === pageId && item.surface === surface
  );
  const occurrence = page?.occurrences.find(
    (item) => item.id === occurrenceId
  );
  const renderableDirectSupport = new Set(
    claim.evidence
      .filter(
        (evidence) =>
          evidence.relationship === "direct-support" &&
          evidence.renderCitation &&
          bank.sources.some(
            (source) =>
              source.id === evidence.sourceId && source.visibility === "public"
          )
      )
      .map((evidence) => evidence.sourceId)
  );
  return (
    occurrence?.claimId === claim.id &&
    occurrence.projection === projection.key &&
    occurrence.sourceIds.some((sourceId) => renderableDirectSupport.has(sourceId))
  );
}

export function routeRealizesProjection(
  content,
  claim,
  projection,
  surface,
  bank = { pages: [] }
) {
  const executable = executableSource(content);
  const claimTags =
    executable.match(
      /^[ \t]*<Claim\b[\s\S]*?\/>(?:[ \t]*\{\s*["']\s*["']\s*\})?[ \t]*$/gm
    ) ?? [];
  if (
    claimTags.some(
      (tag) =>
        literalAttribute(tag, "claimId") === claim.id &&
        literalAttribute(tag, "projection") === projection.key &&
        literalAttribute(tag, "surface") === surface &&
        matchingCitationOccurrence(bank, tag, claim, projection, surface)
    )
  ) {
    return true;
  }

  const resolverPattern = new RegExp(
    `^[ \\t]*(?:[A-Za-z_$][\\w$]*\\s*:\\s*|const\\s+[A-Za-z_$][\\w$]*\\s*=\\s*)getClaimProjection\\(\\s*["']${claim.id}["']\\s*,\\s*["']${projection.key}["']\\s*,\\s*["']${surface.replaceAll("/", "\\/")}["']\\s*\\)`,
    "m"
  );
  return !projection.citationRequired && resolverPattern.test(executable);
}

function projectionRealizationFindings(bank, claim, projection) {
  const findings = [];
  if (projection.status !== "active") return findings;
  if (projection.surfaces.length === 0) {
    return [`${claim.id}/${projection.key} is active without a surface`];
  }

  for (const surface of projection.surfaces) {
    if (surface.startsWith("docs/knowledge-bank/")) {
      const path = `${surface}.md`;
      let content;
      try {
        content = readFileSync(path, "utf8");
      } catch {
        findings.push(`${claim.id}/${projection.key} targets missing ${path}`);
        continue;
      }
      if (!documentRealizesProjection(content, projection)) {
        findings.push(
          `${claim.id}/${projection.key} is not realized on ${surface}`
        );
      }
      continue;
    }

    if (!knownRouteProjectionSurfaces.has(surface)) {
      findings.push(`${claim.id}/${projection.key} targets unknown ${surface}`);
      continue;
    }

    const routeFiles = routeFilesForSurface(surface);
    const routeContents = [];
    for (const path of routeFiles) {
      try {
        routeContents.push(readFileSync(path, "utf8"));
      } catch {
        findings.push(`${claim.id}/${projection.key} targets missing ${path}`);
      }
    }
    if (
      routeContents.length === routeFiles.length &&
      !routeContents.some((content) =>
        routeRealizesProjection(content, claim, projection, surface, bank)
      )
    ) {
      findings.push(`${claim.id}/${projection.key} is not realized on ${surface}`);
    }
  }
  return findings;
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

export function evaluateKnowledgeBank(
  suite,
  bank,
  consecutivePassingRuns = 1,
  hybridResults = []
) {
  const sourceIds = new Set(bank.sources.map((item) => item.id));
  const claimIds = new Set(bank.claims.map((item) => item.id));
  const taskIds = new Set(bank.researchTasks.map((item) => item.id));
  const inquiryIds = new Set(bank.researchInquiries.map((item) => item.id));
  const assertionIds = new Set(bank.sourceAssertions.map((item) => item.id));
  const assertionSourceIds = new Set(bank.sourceAssertions.map((item) => item.sourceId));
  const findings = Object.fromEntries(suite.evals.map((entry) => [entry.id, []]));

  if (collectiveCreditPolicy.version !== 6) {
    findings["KB-007"].push("collective-credit policy version must be 6");
  }
  if (projectionSurfaceBindings.version !== 3) {
    findings["KB-009"].push("projection-surface policy version must be 3");
  }
  if (
    collectiveCreditPolicy.collectiveClaimsSha256 !==
    collectiveCreditFingerprint(bank)
  ) {
    findings["KB-007"].push(
      "collective claim inventory, project ownership, or credit language changed without policy review"
    );
  }
  for (const path of requiredCollectiveRuntimeFiles) {
    if (!collectiveCreditPolicy.collectiveRuntimeFiles.includes(path)) {
      findings["KB-007"].push(
        `collective-credit policy omits runtime renderer ${path}`
      );
    }
  }
  try {
    if (
      collectiveCreditPolicy.collectiveRuntimeSha256 !==
      fileInventoryFingerprint(collectiveCreditPolicy.collectiveRuntimeFiles)
    ) {
      findings["KB-007"].push(
        "collective-claim runtime rendering changed without credit review"
      );
    }
  } catch (error) {
    findings["KB-007"].push(
      `collective-claim runtime inventory cannot be read: ${error.message}`
    );
  }
  if (
    projectionSurfaceBindings.projectionDecisionSha256 !==
    projectionDecisionFingerprint(bank)
  ) {
    findings["KB-009"].push(
      "claim use-now/hold decisions or citation occurrences changed without policy review"
    );
  }

  const configuredRoots = new Map(
    projectionSurfaceBindings.publicSurfaceRoots.map((root) => [
      root.path,
      root.extensions
    ])
  );
  for (const [path, extensions] of requiredPublicSurfaceRoots) {
    const configuredExtensions = configuredRoots.get(path) ?? [];
    if (extensions.some((extension) => !configuredExtensions.includes(extension))) {
      findings["KB-009"].push(
        `public-surface policy does not govern all ${path} ${extensions.join(", ")} files`
      );
    }
  }
  for (const path of requiredPublicSurfaceFiles) {
    if (!projectionSurfaceBindings.publicSurfaceFiles.includes(path)) {
      findings["KB-009"].push(
        `public-surface policy omits consequential file ${path}`
      );
    }
  }
  for (const path of requiredCaseStudySharedFiles) {
    if (!projectionSurfaceBindings.caseStudySharedFiles.includes(path)) {
      findings["KB-009"].push(
        `case-study policy omits shared claim renderer ${path}`
      );
    }
  }
  try {
    if (
      projectionSurfaceBindings.publicSurfaceSha256 !==
      publicSurfaceFingerprint()
    ) {
      findings["KB-009"].push(
        "a consequential public surface changed without reverse-coverage review"
      );
    }
  } catch (error) {
    findings["KB-009"].push(
      `public-surface inventory cannot be read: ${error.message}`
    );
  }

  const resumeArtifact = projectionSurfaceBindings.resumeArtifact;
  try {
    const source = readFileSync(resumeArtifact.sourcePath, "utf8");
    const extractedText = readFileSync(resumeArtifact.extractedTextPath, "utf8");
    const pdf = readFileSync(resumeArtifact.pdfPath);
    if (sha256(source) !== resumeArtifact.sourceSha256) {
      findings["KB-009"].push("resume HTML changed without artifact review");
    }
    if (sha256(extractedText) !== resumeArtifact.extractedTextSha256) {
      findings["KB-009"].push("resume text extraction changed without artifact review");
    }
    if (sha256(pdf) !== resumeArtifact.pdfSha256) {
      findings["KB-009"].push("downloadable resume PDF changed without artifact review");
    }
    for (const phrase of resumeArtifact.requiredText) {
      if (!normalizedText(source).includes(normalizedText(phrase))) {
        findings["KB-009"].push(`resume source omits required governed wording: ${phrase}`);
      }
      if (!normalizedText(extractedText).includes(normalizedText(phrase))) {
        findings["KB-009"].push(`resume PDF text omits required governed wording: ${phrase}`);
      }
    }
    for (const phrase of resumeArtifact.prohibitedText) {
      if (normalizedText(source).includes(normalizedText(phrase))) {
        findings["KB-009"].push(`resume source contains held wording: ${phrase}`);
      }
      if (normalizedText(extractedText).includes(normalizedText(phrase))) {
        findings["KB-009"].push(`resume PDF text contains held wording: ${phrase}`);
      }
    }
    const proofSource = readFileSync("apps/www/src/data/proofs.ts", "utf8");
    const proofIds = new Set(
      [...proofSource.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1])
    );
    const resumeStatementIds = new Set();
    for (const statement of resumeArtifact.statements) {
      if (resumeStatementIds.has(statement.id)) {
        findings["KB-009"].push(`resume manifest duplicates statement ${statement.id}`);
      }
      resumeStatementIds.add(statement.id);
      if (!normalizedText(source).includes(normalizedText(statement.text))) {
        findings["KB-009"].push(`resume source omits manifested statement ${statement.id}`);
      }
      if (!normalizedText(extractedText).includes(normalizedText(statement.text))) {
        findings["KB-009"].push(`resume PDF text omits manifested statement ${statement.id}`);
      }
      const linkedIds = [...statement.claimIds, ...statement.proofIds];
      if (linkedIds.length === 0) {
        findings["KB-009"].push(`resume statement ${statement.id} has no claim or proof identity`);
      }
      for (const id of statement.claimIds) {
        const claim = bank.claims.find((item) => item.id === id);
        if (!claim) findings["KB-009"].push(`resume statement ${statement.id} references missing claim ${id}`);
        else if (claim.projectionEligibility !== "eligible") findings["KB-009"].push(`resume statement ${statement.id} references held claim ${id}`);
      }
      for (const id of statement.proofIds) {
        if (!proofIds.has(id)) findings["KB-009"].push(`resume statement ${statement.id} references missing proof ${id}`);
      }
    }
    for (const id of requiredResumeStatementIds) {
      if (!resumeStatementIds.has(id)) {
        findings["KB-009"].push(`resume manifest omits consequential statement ${id}`);
      }
    }
  } catch (error) {
    findings["KB-009"].push(`resume artifact cannot be governed: ${error.message}`);
  }

  const projectClassifications = [
    ...collectiveProjectEntries,
    ...individualProjectEntries,
    ...mixedProjects.keys()
  ];
  if (
    projectClassifications.some(
      (project) => typeof project !== "string" || project.trim().length === 0
    )
  ) {
    findings["KB-007"].push("collective-credit policy has a blank project ID");
  }
  if (new Set(projectClassifications).size !== projectClassifications.length) {
    findings["KB-007"].push("collective-credit policy classifies a project more than once");
  }

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
    const projectIsCollective = collectiveProjects.has(claim.project);
    const projectIsIndividual = individualProjects.has(claim.project);
    const mixedPolicy = mixedProjects.get(claim.project);
    let policyRequiresCollective;
    if (projectIsCollective) policyRequiresCollective = true;
    else if (projectIsIndividual) policyRequiresCollective = false;
    else if (mixedPolicy) {
      const inCollective = mixedPolicy.collectiveClaims.includes(claim.id);
      const inIndividual = mixedPolicy.individualClaims.includes(claim.id);
      if (inCollective === inIndividual) {
        findings["KB-007"].push(`${claim.id} is not uniquely classified inside mixed project ${claim.project}`);
      } else {
        policyRequiresCollective = inCollective;
      }
    } else {
      findings["KB-007"].push(`${claim.id} belongs to unclassified project ${claim.project}`);
    }
    if (policyRequiresCollective === true && !claim.collectiveWork) findings["KB-007"].push(`${claim.id} is policy-scoped collective work but is not classified as collective`);
    if (policyRequiresCollective === false && claim.collectiveWork) findings["KB-007"].push(`${claim.id} is policy-scoped individual work but is classified as collective`);
    if (claim.collectiveWork && (claim.boundaries.some((item) => item.trim().length === 0) || claim.antiClaims.some((item) => item.trim().length === 0) || claim.boundaries.length === 0 || claim.antiClaims.length === 0)) findings["KB-007"].push(`${claim.id} lacks a substantive collective-credit boundary or anti-claim`);
    const assertionProjects = [
      ...new Set(bank.sourceAssertions
        .filter((assertion) => assertion.candidateClaimIds.includes(claim.id))
        .map((assertion) => assertion.project)
      )
    ];
    if (assertionProjects.length === 0) {
      const exceptionProject = unassertedIndividualClaims.get(claim.id);
      if (!exceptionProject) findings["KB-007"].push(`${claim.id} lacks a project-classification source assertion`);
      else if (exceptionProject !== claim.project) findings["KB-007"].push(`${claim.id} exception is pinned to ${exceptionProject}, not ${claim.project}`);
    } else {
      if (!assertionProjects.includes(claim.project)) findings["KB-007"].push(`${claim.id} project ${claim.project} conflicts with its source assertions`);
      if (unassertedIndividualClaims.has(claim.id)) findings["KB-007"].push(`${claim.id} has a stale unasserted-claim exception`);
    }
    for (const evidence of claim.evidence) if (!sourceIds.has(evidence.sourceId)) findings["KB-005"].push(`${claim.id} references missing source ${evidence.sourceId}`);
    for (const id of claim.researchInquiryIds) if (!inquiryIds.has(id)) findings["KB-005"].push(`${claim.id} references missing inquiry ${id}`);

    const publicActive = claim.projections.some((projection) => projection.status === "active" && publicProjectionKeys.has(projection.key));
    if (publicActive && claim.projectionEligibility !== "eligible") findings["KB-008"].push(`${claim.id} has an active public projection while held`);
    const hasEditorialDisposition = claim.projections.some((projection) =>
      ["active", "hold"].includes(projection.status)
    );
    if (claim.projectionEligibility === "eligible" && !hasEditorialDisposition) findings["KB-009"].push(`${claim.id} has no use-now or hold disposition`);
    const projectionKeys = new Set();
    for (const projection of claim.projections) {
      if (projectionKeys.has(projection.key)) {
        findings["KB-009"].push(`${claim.id} duplicates projection key ${projection.key}`);
      }
      projectionKeys.add(projection.key);
      findings["KB-009"].push(
        ...projectionRealizationFindings(bank, claim, projection)
      );
    }

    if (claim.maturity === "research-needed") {
      const hasTask = bank.researchTasks.some((task) => task.claimIds.includes(claim.id));
      const hasInquiry = claim.researchInquiryIds.length > 0;
      if (!hasTask && !hasInquiry) findings["KB-006"].push(`${claim.id} has no research task or inquiry`);
    }
  }

  for (const [project, mixedPolicy] of mixedProjects) {
    const classifiedClaims = [
      ...mixedPolicy.collectiveClaims,
      ...mixedPolicy.individualClaims
    ];
    if (
      classifiedClaims.some(
        (id) => typeof id !== "string" || id.trim().length === 0
      )
    ) {
      findings["KB-007"].push(`${project} mixed-project policy has a blank claim ID`);
    }
    if (new Set(classifiedClaims).size !== classifiedClaims.length) {
      findings["KB-007"].push(`${project} mixed-project policy classifies a claim more than once`);
    }
    for (const id of classifiedClaims) {
      if (!claimIds.has(id)) {
        findings["KB-007"].push(`collective-credit policy references missing claim ${id}`);
      }
    }
  }

  if ([...unassertedIndividualClaims].some(([id, project]) => typeof id !== "string" || id.trim().length === 0 || typeof project !== "string" || project.trim().length === 0)) {
    findings["KB-007"].push("unasserted individual-claim policy has a blank claim ID");
  }
  for (const [id, expectedProject] of unassertedIndividualClaims) {
    const claim = bank.claims.find((item) => item.id === id);
    if (!claim) findings["KB-007"].push(`unasserted individual-claim policy references missing claim ${id}`);
    else if (claim.project !== expectedProject || claim.collectiveWork || !individualProjects.has(claim.project)) findings["KB-007"].push(`${id} is not the expected individual-project exception`);
  }

  const pageIds = new Set();
  for (const page of bank.pages) {
    if (pageIds.has(page.id)) findings["KB-009"].push(`citation page ID ${page.id} is duplicated`);
    pageIds.add(page.id);
    const occurrenceIds = new Set();
    for (const occurrence of page.occurrences) {
      if (occurrenceIds.has(occurrence.id)) findings["KB-009"].push(`${page.id} duplicates occurrence ${occurrence.id}`);
      occurrenceIds.add(occurrence.id);
      const claim = bank.claims.find((item) => item.id === occurrence.claimId);
      const projection = claim?.projections.find(
        (item) => item.key === occurrence.projection
      );
      if (
        !projection ||
        projection.status !== "active" ||
        !projection.surfaces.includes(page.surface)
      ) {
        findings["KB-009"].push(`${page.id}/${occurrence.id} is disconnected from an active projection on ${page.surface}`);
      } else if (projection.citationRequired) {
        const renderableDirectSupport = new Set(
          claim.evidence
            .filter(
              (evidence) =>
                evidence.relationship === "direct-support" &&
                evidence.renderCitation &&
                bank.sources.some(
                  (source) =>
                    source.id === evidence.sourceId &&
                    source.visibility === "public"
                )
            )
            .map((evidence) => evidence.sourceId)
        );
        if (
          !occurrence.sourceIds.some((sourceId) =>
            renderableDirectSupport.has(sourceId)
          )
        ) {
          findings["KB-009"].push(
            `${page.id}/${occurrence.id} lacks renderable direct support`
          );
        }
      }
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
  const hybridById = new Map(hybridResults.map((entry) => [entry.eval_id, entry]));
  const results = suite.evals.map((entry) => {
    const deterministic = makeResult(entry.id, findings[entry.id], evidence[entry.id]);
    if (entry.grader !== "hybrid") return deterministic;

    const hybrid = hybridById.get(entry.id);
    if (!hybrid) {
      return makeResult(
        entry.id,
        [...deterministic.findings, `${entry.id} requires an independent hybrid scorecard`],
        deterministic.evidence
      );
    }

    const combinedFindings = [...deterministic.findings, ...(hybrid.findings ?? [])];
    return {
      eval_id: entry.id,
      score: deterministic.pass ? hybrid.score : 0,
      pass: deterministic.pass && hybrid.pass === true,
      evidence: [...deterministic.evidence, ...(hybrid.evidence ?? [])],
      findings: combinedFindings,
      confidence: hybrid.confidence
    };
  });
  const weightedScore = results.reduce((total, result) => {
    const weight = suite.evals.find((entry) => entry.id === result.eval_id).weight;
    return total + weight * (result.score / suite.score_scale.maximum);
  }, 0) / 100;
  const failedBlocking = suite.evals.filter((entry) => entry.blocking && !results.find((result) => result.eval_id === entry.id).pass);
  const belowNonblockingMinimum = suite.evals.filter((entry) => {
    if (entry.blocking) return false;
    const result = results.find((item) => item.eval_id === entry.id);
    return result.score < suite.thresholds.nonblocking_score_minimum;
  });
  const thresholdPassed =
    weightedScore >= suite.thresholds.weighted_score_minimum &&
    failedBlocking.length === 0 &&
    belowNonblockingMinimum.length === 0;
  const status = thresholdPassed && consecutivePassingRuns >= 2 ? "threshold_met" : "iterate";

  return {
    suite_id: suite.suite_id,
    status,
    weighted_score: Number(weightedScore.toFixed(4)),
    consecutive_passing_runs: thresholdPassed ? consecutivePassingRuns : 0,
    next_eval_id:
      failedBlocking[0]?.id ??
      belowNonblockingMinimum[0]?.id ??
      results.find((result) => !result.pass)?.eval_id ??
      null,
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
  const hybridArg = process.argv.find((value) => value.startsWith("--hybrid-report="));
  const consecutive = Number(consecutiveArg?.split("=")[1] ?? 1);
  const hybridReport = hybridArg
    ? JSON.parse(readFileSync(hybridArg.slice("--hybrid-report=".length), "utf8"))
    : { results: [] };
  const hybridCandidateErrors = hybridArg
    ? validateHybridReportCandidate(hybridReport)
    : [];
  if (hybridCandidateErrors.length) {
    console.error("Hybrid scorecard validation failed:");
    for (const error of hybridCandidateErrors) console.error(`- ${error}`);
    process.exit(1);
  }
  const result = evaluateKnowledgeBank(
    suite,
    knowledgeBank,
    consecutive,
    hybridReport.results
  );
  console.log(JSON.stringify(result, null, 2));
  if (result.results.some((entry) => !entry.pass)) process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await run();
