import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync
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
    pattern: /\b(single-handedly|solely caused|alone caused|personally caused)\b/i
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
    pattern: /\b(complete lifetime (?:archive|history)|every post ever|reactions prove (?:reach|impact)|mentions prove endorsement)\b/i
  },
  {
    id: "human-gate-inflation",
    pattern: /\b(ai review (?:is|counts as) collaborator testimony|automated checks authorize production)\b/i
  }
];

function absolute(root, relativePath) {
  return path.join(root, relativePath);
}

function readJson(root, relativePath) {
  const file = absolute(root, relativePath);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}

function walk(root, relativePath) {
  const start = absolute(root, relativePath);
  if (!existsSync(start)) return [];
  if (statSync(start).isFile()) return [relativePath];

  const files = [];
  for (const entry of readdirSync(start, { withFileTypes: true })) {
    const child = path.join(relativePath, entry.name);
    if (entry.isDirectory()) files.push(...walk(root, child));
    if (entry.isFile()) files.push(child);
  }
  return files;
}

function sameSet(left, right) {
  if (left.length !== right.length) return false;
  const rightSet = new Set(right);
  return left.every((item) => rightSet.has(item));
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

export function validateCollectiveCreditPolicy(policy, proofs = proofClaims) {
  const findings = [];
  if (!policy) return ["collective-credit-policy.json is missing"];
  if (!Array.isArray(policy.projects)) {
    return ["collective-credit policy must contain projects"];
  }

  const projectById = new Map(policy.projects.map((item) => [item.id, item]));
  if (projectById.size !== policy.projects.length) {
    findings.push("Collective-credit project IDs must be unique");
  }

  const referencedProjects = new Set(
    proofs.flatMap((proof) => proof.relatedProjects)
  );
  for (const projectId of referencedProjects) {
    const project = projectById.get(projectId);
    if (!project) {
      findings.push(`Collective-credit policy is missing ${projectId}`);
      continue;
    }
    if (!["individual", "collective", "mixed"].includes(project.creditScope)) {
      findings.push(`${projectId} has an invalid creditScope`);
    }
    if (!project.boundaries?.length || !project.publicRule) {
      findings.push(`${projectId} needs boundaries and a publicRule`);
    }
  }

  for (const proof of proofs) {
    for (const projectId of proof.relatedProjects) {
      const project = projectById.get(projectId);
      if (
        ["collective", "mixed"].includes(project?.creditScope) &&
        !proof.guardrail &&
        !proof.doNotSay.length
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
  claims = knowledgeBank.claims
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
    for (const proofId of route.proofIds ?? []) {
      const proof = proofById.get(proofId);
      if (!proof) findings.push(`${routePath} references unknown proof ${proofId}`);
      if (proof && !["ready", "careful"].includes(proof.status)) {
        findings.push(`${routePath} selects non-public proof ${proofId}`);
      }
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

export function computeCandidateFingerprint(root, candidatePaths) {
  const files = candidatePaths
    .flatMap((relativePath) => walk(root, relativePath))
    .filter((relativePath) => !relativePath.includes("/runs/"))
    .filter((relativePath) => !relativePath.includes("node_modules"))
    .sort();

  const hash = createHash("sha256");
  for (const relativePath of files) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(readFileSync(absolute(root, relativePath)));
    hash.update("\0");
  }
  return hash.digest("hex");
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

export function evaluateComposite(root = repoRoot) {
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
  const packageJson = readJson(root, "package.json");
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

  push("CI-006", validateCollectiveCreditPolicy(collectivePolicy));
  push("CI-007", validateSurfaceBindings(surfaceBindings));

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

  const qualityFiles = new Map([
    ["CI-009", ["scripts/evals-chad-lens.mjs", "apps/www/src/app/about/page.tsx"]],
    ["CI-010", ["scripts/evals-margaret-morse-lens.mjs", "docs/qa/evals-L/margaret-morse-lens.md"]],
    ["CI-011", ["scripts/evals-warren-sack-lens.mjs", "docs/qa/evals-L/warren-sack-lens.md"]],
    ["CI-012", ["docs/qa/hiring-review/README.md", "docs/knowledge-bank/opportunities/present-tense-offer.md"]],
    ["CI-013", ["docs/knowledge-bank/visual-proof-register.json", "docs/knowledge-bank/visual-proof-plan.md"]]
  ]);
  for (const [id, files] of qualityFiles) {
    const findings = files
      .filter((file) => !existsSync(absolute(root, file)))
      .map((file) => `Missing ${file}`);
    push(id, findings);
  }

  const releaseFindings = [];
  if (!releaseStatus) releaseFindings.push("docs/qa/release-status.json is missing");
  if (!releaseStatus?.applicationDecision) {
    releaseFindings.push("Release status must state an applicationDecision");
  }
  if (!releaseStatus?.productionDecision) {
    releaseFindings.push("Release status must state a productionDecision");
  }
  if (!releaseStatus?.humanGates?.every((gate) => gate.state === "open")) {
    releaseFindings.push("Human gates must remain explicitly open until observed");
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
  const humanGateState = new Map(
    (releaseStatus?.humanGates ?? []).map((gate) => [gate.gate, gate.state])
  );
  const humanGates = (rubric?.humanGates ?? []).map((gate) => ({
    id: gate.id,
    state:
      gate.id === "exact-candidate-release-approval" &&
      humanGateState.get("Jamie approval of the exact production candidate") !== "open"
        ? "met"
        : "open",
    agentMaySelfCertify: false
  }));
  const passes =
    hardGateFailures === 0 &&
    criteria.every((criterion) => criterion.passes) &&
    roundedWeightedScore >= (rubric?.thresholds?.minimumWeightedScore ?? 1);

  const candidateCommit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8"
  }).trim();
  const dirtyCandidatePaths = execFileSync(
    "git",
    ["status", "--porcelain", "--untracked-files=normal"],
    {
      cwd: root,
      encoding: "utf8"
    }
  )
    .split("\n")
    .filter(Boolean)
    .map((line) => line.slice(3))
    .filter(
      (relativePath) =>
        !relativePath.startsWith("evals/composite-integration/runs/")
    );
  const workingTreeClean = dirtyCandidatePaths.length === 0;

  return {
    rubricId: rubric?.id ?? "feature-evals-composite-integration",
    rubricVersion: rubric?.version ?? "missing",
    candidateCommit,
    candidateFingerprint: computeCandidateFingerprint(
      root,
      rubric?.candidatePaths ?? []
    ),
    workingTreeClean,
    generatedAt: new Date().toISOString(),
    hardGateFailures,
    weightedScore: roundedWeightedScore,
    criteria,
    humanGates,
    passes
  };
}
