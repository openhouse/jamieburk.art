import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  homepageProofs,
  proofClaims,
  resumeProofHighlights,
  technicalOperationsProofRows
} from "../../apps/www/src/data/proofs.ts";
import { workItems } from "../../apps/www/src/data/work.ts";

export const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

const expectedDonors = new Map([
  ["feature/evals-A", "3757c4f5"],
  ["feature/evals-B", "67fc3042"],
  ["feature/evals-C", "ff440a9c"],
  ["feature/evals-D", "5a7095ff"],
  ["feature/evals-E", "d7d8e0d0"],
  ["feature/evals-F", "ba746185"],
  ["feature/evals-G", "d97055d7"],
  ["feature/evals-H", "934c1bdf"],
  ["feature/evals-I", "793f7262"],
  ["feature/evals-J", "7e1b758b"],
  ["feature/evals-K", "5b0cbcd1"],
  ["feature/evals-L", "68846b1f"],
  ["feature/evals-M", "289dd449"],
  ["feature/evals-N", "10d20ecd"]
]);

const requiredRoutes = [
  "/",
  "/about",
  "/colophon",
  "/contact",
  "/lab/source-backed-team-memory",
  "/resume",
  "/work",
  "/work/technical-operations",
  ...workItems.map((item) => `/work/${item.slug}`)
];

const blockedPublicRoutes = [
  "apps/www/src/app/proofs",
  "apps/www/src/app/knowledge-bank",
  "apps/www/src/app/public-claims"
];

const semanticRiskPatterns = [
  {
    id: "sole-causality",
    pattern: /\b(single-handedly|solely caused|alone caused|personally caused|made (?:the )?law happen)\b/i
  },
  {
    id: "sole-collective-authorship",
    pattern: /\b(alone founded|sole founder|authored every|organized every)\b/i
  },
  {
    id: "appropriation-inflation",
    pattern: /\b(appropriation (?:was|means) (?:receipt|disbursement)|received and spent \$490,539)\b/i
  },
  {
    id: "platform-inflation",
    pattern: /\b(complete lifetime (?:archive|history)|entire archive|every post ever|reactions prove (?:reach|impact)|mentions prove endorsement|metrics demonstrate impact)\b/i
  },
  {
    id: "human-gate-inflation",
    pattern: /\b(ai review (?:is|counts as) collaborator testimony|automated (?:checks authorize|review cleared) production)\b/i
  }
];

const candidatePathExclusions = [
  "evals/composite-integration/runs/",
  "reports/generated/",
  "node_modules/",
  ".next/",
  "playwright-report/",
  "test-results/"
];

function absolute(root, relativePath) {
  return path.join(root, relativePath);
}

function readJson(root, relativePath) {
  const file = absolute(root, relativePath);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}

function isCandidatePath(relativePath) {
  return !candidatePathExclusions.some(
    (excluded) => {
      const directory = excluded.slice(0, -1);
      return relativePath === directory || relativePath.startsWith(excluded);
    }
  );
}

function gitLines(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
}

function candidateFiles(root) {
  return execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
    { cwd: root, encoding: "utf8" }
  )
    .split("\0")
    .filter(Boolean)
    .filter(isCandidatePath)
    .sort();
}

function candidateCommit(root) {
  for (const commit of gitLines(root, ["rev-list", "HEAD"])) {
    const changed = gitLines(root, [
      "diff-tree",
      "--root",
      "--no-commit-id",
      "--name-only",
      "-r",
      commit
    ]);
    if (changed.some(isCandidatePath)) return commit;
  }
  throw new Error("Could not identify a candidate commit");
}

function candidateDirtyPaths(root) {
  return gitLines(root, ["status", "--porcelain", "--untracked-files=normal"])
    .map((line) => line.slice(3))
    .filter(isCandidatePath);
}

function runEval(root, scripts) {
  const findings = [];
  for (const script of scripts) {
    try {
      execFileSync(process.execPath, [script], {
        cwd: root,
        encoding: "utf8",
        stdio: "pipe"
      });
    } catch (error) {
      const detail = error.stderr?.toString().trim() || error.message;
      findings.push(`${script} failed: ${detail.split("\n").at(-1)}`);
    }
  }
  return findings;
}

function sameSet(left, right) {
  if (left.length !== right.length) return false;
  const rightSet = new Set(right);
  return left.every((item) => rightSet.has(item));
}

function distinctWords(value) {
  return new Set(
    String(value ?? "")
      .toLowerCase()
      .match(/[a-z0-9]+/g) ?? []
  );
}

export function detectSemanticRisks(statement) {
  return semanticRiskPatterns
    .filter(({ pattern }) => pattern.test(statement))
    .map(({ id }) => id);
}

export function validateDonorDispositions(dispositions) {
  const findings = [];
  if (!dispositions) return ["donor-dispositions.json is missing"];
  if (!Array.isArray(dispositions.donors)) {
    return ["donor-dispositions.json must contain a donors array"];
  }

  const branches = dispositions.donors.map((item) => item.branch);
  if (new Set(branches).size !== branches.length) {
    findings.push("Donor branches must be unique");
  }

  for (const [branch, head] of expectedDonors) {
    const donor = dispositions.donors.find((item) => item.branch === branch);
    if (!donor) {
      findings.push(`Missing donor disposition: ${branch}`);
      continue;
    }
    if (donor.head !== head) findings.push(`${branch} must pin ${head}`);
    if (!["adopt", "adapt", "hold", "reject"].includes(donor.decision)) {
      findings.push(`${branch} has an invalid decision`);
    }
    for (const field of ["mechanism", "destination", "boundary"]) {
      if (!donor[field] || donor[field].length < 20) {
        findings.push(`${branch} needs a substantive ${field}`);
      }
    }
    for (const field of ["risk", "verification"]) {
      if (!donor[field] || donor[field].length < 12) {
        findings.push(`${branch} needs a substantive ${field}`);
      }
    }
  }

  if (dispositions.donors.length !== expectedDonors.size) {
    findings.push(`Expected ${expectedDonors.size} donor dispositions`);
  }
  return findings;
}

export function validateCollectiveCreditPolicy(
  policy,
  proofs = proofClaims,
  claims = knowledgeBank.claims,
  bindings = null
) {
  const findings = [];
  if (!policy) return ["collective-credit-policy.json is missing"];
  if (!Array.isArray(policy.projects)) {
    return ["collective-credit policy must contain projects"];
  }

  const projectById = new Map(policy.projects.map((item) => [item.id, item]));
  if (projectById.size !== policy.projects.length) {
    findings.push("Collective-credit project IDs must be unique");
  }

  const referencedProjects = new Set([
    ...proofs.flatMap((proof) => proof.relatedProjects),
    ...claims
      .filter((claim) =>
        claim.projections?.some((projection) => projection.status === "active")
      )
      .map((claim) => claim.project),
    ...workItems.map((work) => work.slug)
  ]);
  for (const projectId of referencedProjects) {
    if (!projectById.has(projectId)) {
      findings.push(`Collective-credit policy is missing ${projectId}`);
    }
  }
  for (const project of policy.projects) {
    const projectId = project.id;
    if (!["individual", "collective", "mixed"].includes(project.creditScope)) {
      findings.push(`${projectId} has an invalid creditScope`);
    }
    const boundaries = project.boundaries ?? [];
    const normalizedBoundaries = boundaries.map((boundary) =>
      boundary.trim().toLowerCase()
    );
    if (
      project.publicRule?.length < 60 ||
      distinctWords(project.publicRule).size < 10 ||
      boundaries.length < 2 ||
      boundaries.some(
        (boundary) =>
          boundary.length < 20 || distinctWords(boundary).size < 6
      ) ||
      new Set(normalizedBoundaries).size !== boundaries.length
    ) {
      findings.push(`${projectId} needs a substantive publicRule and two boundaries`);
    }
  }

  for (const proof of proofs) {
    for (const projectId of proof.relatedProjects) {
      const project = projectById.get(projectId);
      if (
        ["collective", "mixed"].includes(project?.creditScope) &&
        (!proof.guardrail || !proof.doNotSay.length)
      ) {
        findings.push(`${proof.id} needs a collective-credit guardrail`);
      }
    }
  }
  return findings;
}

export function validateSurfaceBindings(
  bindings,
  proofs = proofClaims,
  works = workItems,
  claims = knowledgeBank.claims,
  root = repoRoot
) {
  const findings = [];
  if (!bindings) return ["projection-surface-bindings.json is missing"];
  if (!Array.isArray(bindings.routes)) {
    return ["Projection-surface bindings must contain routes"];
  }

  const proofById = new Map(proofs.map((proof) => [proof.id, proof]));
  const claimById = new Map(claims.map((claim) => [claim.id, claim]));
  const routeByPath = new Map(bindings.routes.map((route) => [route.path, route]));
  if (routeByPath.size !== bindings.routes.length) {
    findings.push("Projection route paths must be unique");
  }
  if (!sameSet(bindings.routes.map((route) => route.path), requiredRoutes)) {
    findings.push("Projection route registry must match the complete public route set");
  }

  for (const routePath of requiredRoutes) {
    const route = routeByPath.get(routePath);
    if (!route) {
      findings.push(`Projection policy is missing ${routePath}`);
      continue;
    }
    if (!route.sourceFiles?.length || !route.audience || !route.purpose) {
      findings.push(`${routePath} needs sourceFiles, audience, and purpose`);
    }
    if (!route.approvalState || !route.changeRule || !route.exclusions?.length) {
      findings.push(`${routePath} needs approvalState, changeRule, and exclusions`);
    }
    for (const sourceFile of route.sourceFiles ?? []) {
      const resolvedSource = absolute(root, sourceFile);
      const relativeSource = path.relative(root, resolvedSource);
      if (
        path.isAbsolute(sourceFile) ||
        relativeSource.startsWith("..") ||
        path.isAbsolute(relativeSource)
      ) {
        findings.push(`${routePath} references source file outside the repository`);
      } else if (!existsSync(resolvedSource)) {
        findings.push(`${routePath} references missing source file ${sourceFile}`);
      }
    }
    const expectedSurface =
      routePath === "/"
        ? "homepage"
        : routePath === "/resume"
          ? "resume"
          : routePath === "/about"
            ? "about"
            : routePath === "/work"
              ? "work-card"
              : routePath === "/work/technical-operations"
                ? "technical-operations"
                : routePath.startsWith("/lab/")
                  ? "lab"
                  : routePath.startsWith("/work/")
                    ? "case-study"
                    : null;
    for (const proofId of route.proofIds ?? []) {
      const proof = proofById.get(proofId);
      if (!proof) findings.push(`${routePath} references unknown proof ${proofId}`);
      if (proof && !["ready", "careful"].includes(proof.status)) {
        findings.push(`${routePath} selects non-public proof ${proofId}`);
      }
      if (proof && expectedSurface && !proof.surfaces.includes(expectedSurface)) {
        findings.push(`${routePath} selects ${proofId} without ${expectedSurface} approval`);
      }
    }
    const expectedClaims = claims
      .filter((claim) =>
        claim.projections.some(
          (projection) =>
            projection.status === "active" &&
            projection.surfaces.includes(routePath)
        )
      )
      .map((claim) => claim.id);
    if (!sameSet(route.claimIds ?? [], expectedClaims)) {
      findings.push(`${routePath} claim manifest does not match active projections`);
    }
    for (const claimId of route.claimIds ?? []) {
      const claim = claimById.get(claimId);
      if (!claim) findings.push(`${routePath} references unknown claim ${claimId}`);
      if (
        claim &&
        !claim.projections.some(
          (projection) =>
            projection.status === "active" &&
            projection.surfaces.includes(routePath)
        )
      ) {
        findings.push(`${routePath} selects inactive claim ${claimId}`);
      }
    }
  }

  const expectedHomepage = homepageProofs.map((proof) => proof.id);
  const expectedResume = resumeProofHighlights.map((proof) => proof.id);
  const expectedTechnical = [
    ...new Set(
      technicalOperationsProofRows.flatMap((row) => row.proofIds)
    )
  ];
  if (!sameSet(routeByPath.get("/")?.proofIds ?? [], expectedHomepage)) {
    findings.push("Homepage manifest does not match homepageProofs");
  }
  if (!sameSet(routeByPath.get("/resume")?.proofIds ?? [], expectedResume)) {
    findings.push("Resume manifest does not match resumeProofHighlights");
  }
  if (
    !sameSet(
      routeByPath.get("/work/technical-operations")?.proofIds ?? [],
      expectedTechnical
    )
  ) {
    findings.push("Technical Operations manifest does not match proof rows");
  }

  for (const work of works) {
    const route = routeByPath.get(`/work/${work.slug}`);
    if (!sameSet(route?.proofIds ?? [], work.proofBankIds)) {
      findings.push(`/work/${work.slug} manifest does not match work proofBankIds`);
    }
  }
  return findings;
}

export function validateProofTraceability(
  proofs,
  bindings,
  bank = knowledgeBank
) {
  const findings = [];
  const selectedProofIds = new Set(
    (bindings?.routes ?? []).flatMap((route) => route.proofIds ?? [])
  );
  const sourceById = new Map(bank.sources.map((source) => [source.id, source]));
  const claimById = new Map(bank.claims.map((claim) => [claim.id, claim]));

  for (const proof of proofs.filter((item) => selectedProofIds.has(item.id))) {
    const sourceIds = proof.sourceIds ?? [];
    const claimIds = proof.knowledgeClaimIds ?? [];
    if (!sourceIds.length && !claimIds.length) {
      findings.push(`${proof.id} lacks resolvable sourceIds or knowledgeClaimIds`);
    }
    for (const sourceId of sourceIds) {
      const source = sourceById.get(sourceId);
      if (!source) {
        findings.push(`${proof.id} references unknown source ${sourceId}`);
      } else if (!["public", "public-metadata-only"].includes(source.visibility)) {
        findings.push(`${proof.id} directly references protected source ${sourceId}`);
      }
    }
    for (const claimId of claimIds) {
      const claim = claimById.get(claimId);
      if (!claim) {
        findings.push(`${proof.id} references unknown claim ${claimId}`);
        continue;
      }
      if (!["confirmed", "confirmed-with-boundary", "use-with-care"].includes(claim.status)) {
        findings.push(`${proof.id} references non-public claim ${claimId}`);
      }
      if (!claim.evidence.length) {
        findings.push(`${proof.id} references claim ${claimId} without evidence`);
      }
      if (
        !claim.projections.some(
          (projection) => projection.status === "active"
        )
      ) {
        findings.push(`${proof.id} references claim ${claimId} without an active projection`);
      }
      for (const evidence of claim.evidence) {
        if (!sourceById.has(evidence.sourceId)) {
          findings.push(`${proof.id} claim ${claimId} has unknown source ${evidence.sourceId}`);
        }
      }
    }
  }
  return findings;
}

export function computeCandidateFingerprint(root) {
  const files = candidateFiles(root);

  const hash = createHash("sha256");
  for (const relativePath of files) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(readFileSync(absolute(root, relativePath)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function validateScorecardSchema(scorecard, schema) {
  const findings = [];
  if (!schema) return ["scorecard.schema.json is missing"];
  if (!scorecard || typeof scorecard !== "object" || Array.isArray(scorecard)) {
    return ["Scorecard must be an object"];
  }
  const allowed = new Set(Object.keys(schema.properties ?? {}));
  for (const key of schema.required ?? []) {
    if (!(key in scorecard)) findings.push(`Scorecard is missing ${key}`);
  }
  for (const key of Object.keys(scorecard)) {
    if (schema.additionalProperties === false && !allowed.has(key)) {
      findings.push(`Scorecard has unsupported property ${key}`);
    }
  }
  if (scorecard.rubricId !== schema.properties?.rubricId?.const) {
    findings.push("Scorecard rubricId does not match the schema");
  }
  if (!/^[a-f0-9]{40}$/.test(scorecard.candidateCommit ?? "")) {
    findings.push("Scorecard candidateCommit is invalid");
  }
  if (!/^[a-f0-9]{64}$/.test(scorecard.candidateFingerprint ?? "")) {
    findings.push("Scorecard candidateFingerprint is invalid");
  }
  if (typeof scorecard.rubricVersion !== "string" || !scorecard.rubricVersion) {
    findings.push("Scorecard rubricVersion is invalid");
  }
  if (typeof scorecard.workingTreeClean !== "boolean") {
    findings.push("Scorecard workingTreeClean is invalid");
  }
  if (
    typeof scorecard.generatedAt !== "string" ||
    !Number.isFinite(Date.parse(scorecard.generatedAt)) ||
    new Date(scorecard.generatedAt).toISOString() !== scorecard.generatedAt
  ) {
    findings.push("Scorecard generatedAt is invalid");
  }
  if (!Number.isInteger(scorecard.hardGateFailures) || scorecard.hardGateFailures < 0) {
    findings.push("Scorecard hardGateFailures is invalid");
  }
  if (
    typeof scorecard.weightedScore !== "number" ||
    scorecard.weightedScore < 0 ||
    scorecard.weightedScore > 1
  ) {
    findings.push("Scorecard weightedScore is invalid");
  }
  if (typeof scorecard.passes !== "boolean") {
    findings.push("Scorecard passes is invalid");
  }
  const expectedCriterionIds = Array.from(
    { length: 15 },
    (_, index) => `CI-${String(index + 1).padStart(3, "0")}`
  );
  if (!Array.isArray(scorecard.criteria) || scorecard.criteria.length !== 15) {
    findings.push("Scorecard must contain exactly 15 criteria");
  }
  const criterionIds = scorecard.criteria?.map((criterion) => criterion.id) ?? [];
  if (!sameSet(criterionIds, expectedCriterionIds)) {
    findings.push("Scorecard criterion IDs must be unique and complete");
  }
  if (
    !scorecard.criteria?.every(
      (criterion) =>
        Object.keys(criterion).every((key) =>
          ["id", "title", "kind", "passes", "score", "findings"].includes(key)
        ) &&
        /^CI-\d{3}$/.test(criterion.id) &&
        typeof criterion.title === "string" &&
        criterion.title.trim().length > 0 &&
        ["hard-gate", "quality"].includes(criterion.kind) &&
        typeof criterion.passes === "boolean" &&
        typeof criterion.score === "number" &&
        criterion.score >= 0 &&
        criterion.score <= 1 &&
        Array.isArray(criterion.findings) &&
        criterion.findings.every((finding) => typeof finding === "string")
    )
  ) {
    findings.push("Scorecard criteria do not match the schema contract");
  }
  if (
    !Array.isArray(scorecard.humanGates) ||
    scorecard.humanGates.length === 0 ||
    new Set(scorecard.humanGates.map((gate) => gate.id)).size !== scorecard.humanGates.length ||
    !scorecard.humanGates.every(
      (gate) =>
        Object.keys(gate).every((key) =>
          ["id", "state", "agentMaySelfCertify"].includes(key)
        ) &&
        typeof gate.id === "string" &&
        gate.id.length > 0 &&
        ["open", "met", "not-applicable"].includes(gate.state) &&
        gate.agentMaySelfCertify === false
    )
  ) {
    findings.push("Scorecard human gates do not match the schema contract");
  }
  const expectedHumanGateIds =
    schema.properties?.humanGates?.items?.properties?.id?.enum ?? [];
  if (
    expectedHumanGateIds.length &&
    !sameSet(
      scorecard.humanGates?.map((gate) => gate.id) ?? [],
      expectedHumanGateIds
    )
  ) {
    findings.push("Scorecard human gate IDs must be unique and complete");
  }
  const actualHardGateFailures = scorecard.criteria?.filter(
    (criterion) => criterion.kind === "hard-gate" && !criterion.passes
  ).length;
  if (
    Number.isInteger(scorecard.hardGateFailures) &&
    actualHardGateFailures !== scorecard.hardGateFailures
  ) {
    findings.push("Scorecard hardGateFailures does not match criterion results");
  }
  if (
    scorecard.passes === true &&
    (
      scorecard.workingTreeClean !== true ||
      scorecard.hardGateFailures !== 0 ||
      scorecard.weightedScore !== 1 ||
      !scorecard.criteria?.every((criterion) => criterion.passes === true)
    )
  ) {
    findings.push("Passing scorecards must satisfy every automated gate");
  }
  return findings;
}

export function validateHoldouts(
  root,
  candidateFingerprint,
  candidateCommitHash,
  requiredPasses,
  schema
) {
  const runsDirectory = absolute(root, "evals/composite-integration/runs");
  if (!existsSync(runsDirectory)) return ["Composite holdout directory is missing"];
  const files = readdirSync(runsDirectory)
    .filter((file) => file.endsWith(".json"))
    .sort();
  const matching = [];
  for (const file of files) {
    const relativePath = `evals/composite-integration/runs/${file}`;
    const run = readJson(root, relativePath);
    if (
      run?.candidateFingerprint === candidateFingerprint &&
      run?.candidateCommit === candidateCommitHash &&
      run?.passes === true &&
      run?.workingTreeClean === true &&
      run?.hardGateFailures === 0 &&
      run?.criteria?.every((criterion) => criterion.passes)
    ) {
      const schemaFindings = validateScorecardSchema(run, schema);
      if (!schemaFindings.length) matching.push({ relativePath, run });
    }
  }
  if (matching.length < requiredPasses) {
    return [`Expected ${requiredPasses} passing holdouts for the unchanged candidate; found ${matching.length}`];
  }
  const timestamps = new Set(matching.map(({ run }) => run.generatedAt));
  if (timestamps.size < requiredPasses) {
    return ["Passing holdouts must be independent records with distinct timestamps"];
  }
  const orderedTimestamps = [...timestamps]
    .map((timestamp) => Date.parse(timestamp))
    .sort((left, right) => left - right);
  if (
    orderedTimestamps.some((timestamp) => !Number.isFinite(timestamp)) ||
    orderedTimestamps.at(-1) - orderedTimestamps[0] < 1000
  ) {
    return ["Passing holdouts must be recorded by separate runs at least one second apart"];
  }
  const tracked = new Set(
    gitLines(root, ["ls-files", "evals/composite-integration/runs/*.json"])
  );
  for (const { relativePath } of matching.slice(0, requiredPasses)) {
    if (!tracked.has(relativePath)) {
      return [`Holdout ${relativePath} is not committed`];
    }
  }
  const dirtyRuns = gitLines(root, [
    "status",
    "--porcelain",
    "--",
    "evals/composite-integration/runs"
  ]);
  if (dirtyRuns.length) return ["Committed holdout records have uncommitted changes"];
  return [];
}

function result(id, title, kind, findings) {
  return {
    id,
    title,
    kind,
    passes: findings.length === 0,
    score: findings.length === 0 ? 1 : 0,
    findings
  };
}

export function evaluateComposite(
  root = repoRoot,
  { requireHoldouts = false } = {}
) {
  const rubric = readJson(root, "evals/composite-integration/rubric.json");
  const dispositions = readJson(
    root,
    "evals/composite-integration/donor-dispositions.json"
  );
  const collectivePolicy = readJson(
    root,
    "docs/knowledge-bank/policies/collective-credit-policy.json"
  );
  const surfaceBindings = readJson(
    root,
    "docs/knowledge-bank/policies/projection-surface-bindings.json"
  );
  const releaseStatus = readJson(root, "docs/qa/release-status.json");
  const scorecardSchema = readJson(
    root,
    "evals/composite-integration/scorecard.schema.json"
  );
  const packageJson = readJson(root, "package.json");
  const candidateCommitHash = candidateCommit(root);
  const candidateFingerprint = computeCandidateFingerprint(root);
  const dirtyCandidatePaths = candidateDirtyPaths(root);
  const workingTreeClean = dirtyCandidatePaths.length === 0;
  const criteriaById = new Map(
    (rubric?.criteria ?? []).map((criterion) => [criterion.id, criterion])
  );

  const criteria = [];
  const push = (id, findings) => {
    const criterion = criteriaById.get(id) ?? {
      title: `Missing rubric criterion ${id}`,
      kind: "hard-gate"
    };
    criteria.push(result(id, criterion.title, criterion.kind, findings));
  };

  const rubricFindings = [];
  if (!rubric) rubricFindings.push("rubric.json is missing");
  if ((rubric?.criteria ?? []).length !== 15) {
    rubricFindings.push("The composite rubric must contain 15 criteria");
  }
  if (
    (rubric?.criteria ?? [])
      .filter((criterion) => criterion.kind === "quality")
      .reduce((sum, criterion) => sum + criterion.weight, 0) !== 100
  ) {
    rubricFindings.push("Quality criterion weights must total 100");
  }
  rubricFindings.push(...validateDonorDispositions(dispositions));
  push("CI-001", rubricFindings);

  const vocabularyFindings = [];
  for (const required of [
    "docs/knowledge-bank/framework.md",
    "apps/www/src/data/knowledge-bank/records.ts",
    "apps/www/src/data/proofs.ts"
  ]) {
    if (!existsSync(absolute(root, required))) {
      vocabularyFindings.push(`Missing canonical lifecycle file ${required}`);
    }
  }
  for (const blocked of blockedPublicRoutes) {
    if (existsSync(absolute(root, blocked))) {
      vocabularyFindings.push(`${blocked} must not exist`);
    }
  }
  if (existsSync(absolute(root, "docs/proofs-bank.md"))) {
    vocabularyFindings.push("docs/proofs-bank.md duplicates the canonical bank");
  }
  push("CI-002", vocabularyFindings);

  const traceabilityFindings = [];
  const proofIds = new Set(proofClaims.map((proof) => proof.id));
  for (const work of workItems) {
    for (const proofId of work.proofBankIds) {
      if (!proofIds.has(proofId)) {
        traceabilityFindings.push(`${work.slug} references unknown proof ${proofId}`);
      }
    }
  }
  for (const proof of proofClaims) {
    if (!["ready", "careful", "pending", "private"].includes(proof.status)) {
      traceabilityFindings.push(`${proof.id} has invalid status`);
    }
    if (!proof.sourceBasis || !proof.guardrail || !proof.lastReviewed) {
      traceabilityFindings.push(`${proof.id} lacks source, guardrail, or review date`);
    }
  }
  traceabilityFindings.push(
    ...validateProofTraceability(proofClaims, surfaceBindings)
  );
  push("CI-003", traceabilityFindings);

  const semanticsFindings = [];
  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  for (const claim of knowledgeBank.claims) {
    for (const evidence of claim.evidence) {
      const source = sourceById.get(evidence.sourceId);
      if (!source) {
        semanticsFindings.push(`${claim.id} references unknown source ${evidence.sourceId}`);
        continue;
      }
      if (!evidence.supports.length) {
        semanticsFindings.push(`${claim.id} has empty support semantics`);
      }
      if (!source.doesNotEstablish.length) {
        semanticsFindings.push(`${source.id} needs doesNotEstablish boundaries`);
      }
    }
  }
  push("CI-004", semanticsFindings);

  const corpusFindings = [];
  for (const required of [
    "scripts/evals-callnyc-x-corpus.mjs",
    "scripts/evals-wowlist-x-corpus.mjs",
    "scripts/derive-nycartc-x-corpus.mjs",
    "scripts/evals-nycartc-x-corpus.mjs",
    "scripts/evals-urbanhermit-x-corpus.mjs",
    "scripts/evals-nycac-facebook-events.mjs",
    "scripts/evals-wowlist-facebook-posts.mjs",
    "scripts/evals-nycac-facebook-posts.mjs",
    "scripts/evals-kcspacesfund-facebook-posts.mjs",
    "scripts/evals-jamie-personal-facebook-posts.mjs"
  ]) {
    if (!existsSync(absolute(root, required))) corpusFindings.push(`Missing ${required}`);
  }
  const corpusBoundaryText = [
    "docs/knowledge-bank/archival-survivorship-register.json",
    "docs/qa/evals-L/recursive-protocol.md"
  ]
    .filter((file) => existsSync(absolute(root, file)))
    .map((file) => readFileSync(absolute(root, file), "utf8"))
    .join(" ");
  for (const phrase of ["not recovered", "lifetime archive", "authorship", "impact"] ) {
    if (!corpusBoundaryText.toLowerCase().includes(phrase)) {
      corpusFindings.push(`Corpus governance is missing ${phrase}`);
    }
  }
  push("CI-005", corpusFindings);

  push(
    "CI-006",
    validateCollectiveCreditPolicy(
      collectivePolicy,
      proofClaims,
      knowledgeBank.claims,
      surfaceBindings
    )
  );
  push(
    "CI-007",
    validateSurfaceBindings(
      surfaceBindings,
      proofClaims,
      workItems,
      knowledgeBank.claims,
      root
    )
  );

  const correctionFindings = [];
  const claimIds = new Set(knowledgeBank.claims.map((claim) => claim.id));
  if (!knowledgeBank.corrections.length) {
    correctionFindings.push("At least one correction record is required");
  }
  for (const correction of knowledgeBank.corrections) {
    if (!claimIds.has(correction.claimId)) {
      correctionFindings.push(`${correction.id} references an unknown claim`);
    }
    if (correction.previousText === correction.replacementText) {
      correctionFindings.push(`${correction.id} does not change the wording`);
    }
  }
  push("CI-008", correctionFindings);

  const qualityEvals = new Map([
    ["CI-009", ["scripts/evals-chad-lens.mjs"]],
    ["CI-010", ["scripts/evals-margaret-morse-lens.mjs"]],
    ["CI-011", ["scripts/evals-warren-sack-lens.mjs"]],
    [
      "CI-012",
      [
        "scripts/evals-hiring-comprehension.mjs",
        "scripts/evals-present-tense-offer.mjs"
      ]
    ],
    ["CI-013", ["scripts/evals-visual-artifact-proof.mjs"]]
  ]);
  for (const [id, scriptsToRun] of qualityEvals) {
    push(id, runEval(root, scriptsToRun));
  }

  const releaseGateById = new Map(
    (releaseStatus?.humanGates ?? []).map((gate) => [gate.id, gate])
  );
  const humanGates = (rubric?.humanGates ?? []).map((gate) => ({
    id: gate.id,
    state: releaseGateById.get(gate.id)?.state ?? "open",
    agentMaySelfCertify: false
  }));

  const releaseFindings = [];
  if (!releaseStatus) releaseFindings.push("docs/qa/release-status.json is missing");
  if (!releaseStatus?.applicationDecision) {
    releaseFindings.push("Release status must state an applicationDecision");
  }
  if (!releaseStatus?.productionDecision) {
    releaseFindings.push("Release status must state a productionDecision");
  }
  const expectedHumanGateIds = (rubric?.humanGates ?? []).map((gate) => gate.id);
  if (
    !sameSet(
      (releaseStatus?.humanGates ?? []).map((gate) => gate.id),
      expectedHumanGateIds
    )
  ) {
    releaseFindings.push("Release status human gates must match the rubric exactly");
  }
  for (const gateId of expectedHumanGateIds) {
    const gate = releaseGateById.get(gateId);
    const rubricGate = (rubric?.humanGates ?? []).find((item) => item.id === gateId);
    if (
      !gate?.owner ||
      gate.owner !== rubricGate?.owner ||
      !["open", "met", "not-applicable"].includes(gate.state) ||
      gate.agentMaySelfCertify !== false ||
      rubricGate?.agentMaySelfCertify !== false
    ) {
      releaseFindings.push(`${gateId} must match its human owner and prohibit agent self-certification`);
    }
  }
  if (requireHoldouts) {
    releaseFindings.push(
      ...validateHoldouts(
        root,
        candidateFingerprint,
        candidateCommitHash,
        rubric?.thresholds?.requiredUnchangedCandidatePasses ?? 2,
        scorecardSchema
      )
    );
  }
  push("CI-014", releaseFindings);

  const maintenanceFindings = [];
  const scripts = packageJson?.scripts ?? {};
  for (const name of [
    "check:composite-integration",
    "test:composite-integration",
    "test:knowledge-tools",
    "evals:composite-integration",
    "knowledge:intake",
    "knowledge:query"
  ]) {
    if (!scripts[name]) maintenanceFindings.push(`package.json is missing ${name}`);
  }
  if (!scripts.check?.includes("npm run check:composite-integration")) {
    maintenanceFindings.push("Root check does not include the composite checker");
  }
  if (!scripts.check?.includes("npm run test:composite-integration")) {
    maintenanceFindings.push("Root check does not include composite tests");
  }
  if (!scripts.check?.includes("npm run test:knowledge-tools")) {
    maintenanceFindings.push("Root check does not include knowledge-tool tests");
  }
  const maintenance = rubric?.maintenance;
  if (
    !maintenance?.owner ||
    !maintenance?.cadence ||
    !maintenance?.trigger ||
    !existsSync(absolute(root, maintenance?.runbook ?? ""))
  ) {
    maintenanceFindings.push("Rubric maintenance needs an owner, cadence, trigger, and runbook");
  }
  const scorecardContractProbe = {
    rubricId: rubric?.id ?? "feature-evals-composite-integration",
    rubricVersion: rubric?.version ?? "missing",
    candidateCommit: candidateCommitHash,
    candidateFingerprint,
    workingTreeClean,
    generatedAt: new Date().toISOString(),
    hardGateFailures: 0,
    weightedScore: 0,
    criteria: [
      ...criteria,
      result("CI-015", criteriaById.get("CI-015")?.title ?? "Maintenance burden", "quality", [])
    ],
    humanGates,
    passes: false
  };
  maintenanceFindings.push(
    ...validateScorecardSchema(scorecardContractProbe, scorecardSchema)
  );
  push("CI-015", maintenanceFindings);

  const hardGateFailures = criteria.filter(
    (criterion) => criterion.kind === "hard-gate" && !criterion.passes
  ).length;
  const qualityCriteria = criteria.filter(
    (criterion) => criterion.kind === "quality"
  );
  const weightedScore = qualityCriteria.reduce((sum, criterion) => {
    const weight = criteriaById.get(criterion.id)?.weight ?? 0;
    return sum + criterion.score * (weight / 100);
  }, 0);
  const roundedWeightedScore = Number(weightedScore.toFixed(4));
  const passes =
    workingTreeClean &&
    hardGateFailures === 0 &&
    criteria.every((criterion) => criterion.passes) &&
    roundedWeightedScore >= (rubric?.thresholds?.minimumWeightedScore ?? 1);

  return {
    rubricId: rubric?.id ?? "feature-evals-composite-integration",
    rubricVersion: rubric?.version ?? "missing",
    candidateCommit: candidateCommitHash,
    candidateFingerprint,
    workingTreeClean,
    generatedAt: new Date().toISOString(),
    hardGateFailures,
    weightedScore: roundedWeightedScore,
    criteria,
    humanGates,
    passes
  };
}
