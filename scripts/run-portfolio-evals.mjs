#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  baselineComparison,
  browserEvidenceMatches,
  findChadLensFriction,
  findGovernanceNarration,
  profileStatus,
  validateSuite,
  validModelJudgments
} from "./lib/portfolio-evals.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const profileArg = args.indexOf("--profile");
const profileId = profileArg >= 0 ? args[profileArg + 1] : "application_ready";
const writeReports = !args.includes("--no-report");
const jsonOnly = args.includes("--json");
const baselineCommit = "93c49ff8f943c7497dbf51c117b3403543ad2bf4";
const baselineRecordPath =
  "evals/portfolio-readiness/baselines/feature-evals-C-93c49ff8.json";

const suitePath = path.join(repoRoot, "evals/portfolio-readiness/suite.json");
const suite = JSON.parse(readFileSync(suitePath, "utf8"));
const suiteFailures = validateSuite(suite);

if (suiteFailures.length) {
  console.error("Portfolio evaluation suite is invalid:");
  suiteFailures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

if (!suite.profiles[profileId]) {
  console.error(`Unknown portfolio evaluation profile: ${profileId}`);
  process.exit(1);
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function runNodeScript(relativePath) {
  try {
    const output = execFileSync(process.execPath, [path.join(repoRoot, relativePath)], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
    return { status: "pass", evidence: output.trim().split("\n").at(-1) ?? "passed" };
  } catch (error) {
    const output = `${error.stdout ?? ""}\n${error.stderr ?? ""}`.trim();
    return { status: "fail", evidence: output || `${relativePath} failed` };
  }
}

function containsAll(content, values) {
  return values.every((value) => content.includes(value));
}

function contentFingerprint(paths) {
  const hash = createHash("sha256");
  for (const relativePath of [...paths].sort()) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(readFileSync(path.join(repoRoot, relativePath)));
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}

function contentFingerprintAtCommit(commit, paths) {
  const hash = createHash("sha256");
  for (const relativePath of [...paths].sort()) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(
      execFileSync("git", ["show", `${commit}:${relativePath}`], {
        cwd: repoRoot,
        encoding: null,
        stdio: ["ignore", "pipe", "ignore"]
      })
    );
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}

function readJsonIfPresent(relativePath) {
  const absolute = path.join(repoRoot, relativePath);
  if (!existsSync(absolute)) return null;
  return JSON.parse(readFileSync(absolute, "utf8"));
}

const requiredFiles = [
  "apps/www/src/app/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/app/resume/page.tsx",
  "apps/www/src/app/contact/page.tsx",
  "apps/www/src/app/api/health/route.ts",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/knowledge-bank/records.ts",
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  "docs/knowledge-bank/approval-register.md",
  "docs/knowledge-bank/launch-blockers.md",
  "evals/portfolio-readiness/suite.json",
  baselineRecordPath,
  "evals/portfolio-readiness/evidence/application-ready.json"
];

const evaluatedSurfacePaths = [
  "apps/www/src/app/page.tsx",
  "apps/www/src/app/work/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/app/resume/page.tsx",
  "apps/www/src/app/contact/page.tsx",
  "apps/www/src/app/about/page.tsx",
  "apps/www/src/app/colophon/page.tsx",
  "apps/www/src/app/lab/source-backed-team-memory/page.tsx",
  "apps/www/src/app/api/health/route.ts",
  "apps/www/src/app/layout.tsx",
  "apps/www/src/app/opengraph-image.tsx",
  "apps/www/src/app/robots.ts",
  "apps/www/src/app/sitemap.ts",
  "apps/www/src/app/globals.css",
  "apps/www/next.config.ts",
  "apps/www/src/components/Hero.tsx",
  "apps/www/src/components/citations/Cite.tsx",
  "apps/www/src/components/citations/References.tsx",
  "apps/www/src/components/citations/SourceNote.tsx",
  "apps/www/src/content/work/196-sunday-dinner.mdx",
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/content/work/harry-j-epstein.mdx",
  "apps/www/src/content/work/kc-town-hall.mdx",
  "apps/www/src/content/work/wowlist.mdx",
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/site.ts",
  "apps/www/src/data/work.ts",
  "apps/www/src/lib/metadata.ts",
  "apps/www/src/lib/site-url.ts",
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
];
const candidateFingerprint = contentFingerprint(evaluatedSurfacePaths);
const evaluatedContractPaths = [
  "AGENTS.md",
  "README.md",
  "package.json",
  "docs/evals/portfolio-readiness.md",
  "evals/portfolio-readiness/suite.json",
  "evals/portfolio-readiness/model-judge.md",
  "evals/portfolio-readiness/chad-lens-judge.md",
  baselineRecordPath,
  "evals/portfolio-readiness/evidence/application-ready.json",
  "scripts/lib/portfolio-evals.mjs",
  "scripts/run-portfolio-evals.mjs",
  "scripts/tests/portfolio-evals.test.mjs"
];
const contractFingerprint = contentFingerprint(evaluatedContractPaths);

const missingFiles = requiredFiles.filter((file) => !existsSync(path.join(repoRoot, file)));
const textFiles = requiredFiles.filter(
  (file) =>
    existsSync(path.join(repoRoot, file)) && /\.(?:md|mjs|ts|tsx|json)$/.test(file)
);
const mergeMarkerFiles = textFiles.filter((file) =>
  /^(?:<{7}|={7}|>{7})/m.test(read(file))
);

const homeSource = read("apps/www/src/app/page.tsx");
const heroSource = read("apps/www/src/components/Hero.tsx");
const operationsSource = read("apps/www/src/app/work/technical-operations/page.tsx");
const resumeSource = read("apps/www/src/app/resume/page.tsx");
const contactSource = read("apps/www/src/app/contact/page.tsx");
const layoutSource = read("apps/www/src/app/layout.tsx");
const metadataSource = read("apps/www/src/lib/metadata.ts");
const healthSource = read("apps/www/src/app/api/health/route.ts");
const workSource = read("apps/www/src/data/work.ts");
const caseStudySources = [
  "apps/www/src/content/work/196-sunday-dinner.mdx",
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/content/work/harry-j-epstein.mdx",
  "apps/www/src/content/work/kc-town-hall.mdx",
  "apps/www/src/content/work/wowlist.mdx"
].map((file) => [file, read(file)]);
const publicCitationRegistry = JSON.parse(
  read("apps/www/src/data/knowledge-bank/public-registry.json")
);
const publicSources = [
  ["apps/www/src/app/page.tsx", homeSource],
  ["apps/www/src/components/Hero.tsx", heroSource],
  ["apps/www/src/app/work/technical-operations/page.tsx", operationsSource],
  ["apps/www/src/app/resume/page.tsx", resumeSource],
  ["apps/www/src/app/contact/page.tsx", contactSource],
  ["apps/www/src/data/work.ts", workSource],
  ...caseStudySources
];
const governanceFindings = findGovernanceNarration(publicSources);
const chadLensFindings = findChadLensFriction(publicSources);

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);
let resumeText = "";
try {
  resumeText = execFileSync("pdftotext", [resumePath, "-"], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  });
} catch {
  resumeText = readFileSync(resumePath).toString("latin1");
}

const phonePattern = /(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]\d{3}[\s.-]\d{4}/;
const phoneInPublicSource = publicSources.some(([, content]) => phonePattern.test(content));
const applicationPathPass =
  containsAll(homeSource, ["/work/technical-operations", "/resume"]) &&
  containsAll(heroSource, ["/work", "/resume", "/contact"]) &&
  containsAll(operationsSource, ["How this maps to team operations", "Proof map", "ResumeCTA", "ContactCTA"]);
const semanticProxyPass =
  containsAll(operationsSource, ["<h1", "<h2", "<ul", "<dl"]) &&
  containsAll(resumeSource, ["<h1", "<h2", "<ul"]);
const resumeConsistencyPass =
  statSync(resumePath).size > 10_000 &&
  phonePattern.test(resumeText) &&
  !phoneInPublicSource &&
  /first CouncilStat hackathon/i.test(resumeText) &&
  resumeSource.includes("site.resumePath");

const baselineRecord = readJsonIfPresent(baselineRecordPath);
const baselineFingerprint = contentFingerprintAtCommit(
  baselineCommit,
  evaluatedSurfacePaths
);
const browserEvidence = readJsonIfPresent(
  "evals/portfolio-readiness/evidence/application-ready.json"
);
const requiredBrowserRoutes = [
  "/",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/contact",
  "/work/harry-j-epstein",
  "/work/fair-rent-nyc",
  "/work/callnyc"
];
const browserEvidencePass = browserEvidenceMatches({
  evidence: browserEvidence,
  candidate: candidateFingerprint,
  requiredRoutes: requiredBrowserRoutes
});

const claimCheck = runNodeScript("scripts/check-knowledge-bank.mjs");
const citationCheck = runNodeScript("scripts/check-citations.mjs");
const publicSafetyCheck = runNodeScript("scripts/check-public-safety.mjs");
const routeCheck = runNodeScript("scripts/check-routes.mjs");

const expectedSha = process.env.EVAL_EXPECTED_SHA;
const deployedSha = process.env.EVAL_DEPLOYED_SHA;
const productionOperationsPass =
  Boolean(expectedSha) &&
  expectedSha === deployedSha &&
  process.env.EVAL_PRODUCTION_SMOKE === "pass" &&
  process.env.EVAL_ROLLBACK_READY === "true" &&
  process.env.EVAL_PRODUCTION_INDEXING === "pass" &&
  process.env.EVAL_STAGING_NOINDEX === "pass";
const humanApprovalPass = process.env.EVAL_HUMAN_APPROVAL === "approved";

const hardGates = {
  repository_integrity: {
    status: missingFiles.length === 0 && mergeMarkerFiles.length === 0 ? "pass" : "fail",
    evidence:
      missingFiles.length || mergeMarkerFiles.length
        ? `missing: ${missingFiles.join(", ") || "none"}; merge markers: ${mergeMarkerFiles.join(", ") || "none"}`
        : "Required files exist and contain no merge markers."
  },
  baseline_improvement: {
    status: "pending",
    evidence: "Scored after rubric evaluation."
  },
  model_judgment: {
    status: "pending",
    evidence: "Validated after candidate fingerprint and rubric evaluation."
  },
  chad_lens_review: {
    status: "pending",
    evidence: "Validated after deterministic Chad-lens review and dedicated model judgment."
  },
  public_safety: publicSafetyCheck,
  claim_integrity: {
    status:
      claimCheck.status === "pass" && citationCheck.status === "pass" ? "pass" : "fail",
    evidence: `${claimCheck.evidence} ${citationCheck.evidence}`
  },
  resume_consistency: {
    status: resumeConsistencyPass ? "pass" : "fail",
    evidence: resumeConsistencyPass
      ? "Approved PDF is present, contains the phone and corrected CouncilStat chronology, and public source files contain no phone number."
      : "Resume PDF path, phone boundary, or CouncilStat chronology is inconsistent."
  },
  route_health: routeCheck,
  application_path: {
    status: applicationPathPass ? "pass" : "fail",
    evidence: applicationPathPass
      ? "Homepage and role-fit page expose work, resume, contact, operations mapping, and proof paths."
      : "A required application route or call to action is missing."
  },
  responsive_accessibility: {
    status: semanticProxyPass && browserEvidencePass ? "pass" : "fail",
    evidence:
      semanticProxyPass && browserEvidencePass
        ? "Semantic proxies and candidate-bound desktop/mobile browser evidence pass."
        : "Required semantic structure or candidate-bound browser evidence is missing."
  },
  production_operations: {
    status: productionOperationsPass ? "pass" : "blocked",
    evidence: productionOperationsPass
      ? "Reviewed and deployed SHA match; production smoke and rollback evidence are supplied."
      : "Supply matching deploy SHAs, production smoke and rollback evidence, production indexing verification, and staging noindex verification."
  },
  human_approval: {
    status: humanApprovalPass ? "pass" : "blocked",
    evidence: humanApprovalPass
      ? "Exact production candidate and deploy are explicitly approved."
      : "Set EVAL_HUMAN_APPROVAL=approved only after Jamie approves the exact production candidate and deploy."
  }
};

const roleClarityPass =
  heroSource.includes("Technical Project Manager") &&
  heroSource.includes("I create operating structure for complex public-facing teams");
const roleFitPass =
  operationsSource.includes("How this maps to team operations") &&
  operationsSource.includes("Proof map");
const citationRequiredProjections = publicCitationRegistry.claims.flatMap((claim) =>
  claim.projections
    .filter((projection) => projection.status === "active" && projection.citationRequired)
    .map((projection) => ({ claimId: claim.id, projection }))
);
const citationCarePass =
  citationRequiredProjections.length > 0 &&
  citationRequiredProjections.every(({ claimId, projection }) =>
      projection.surfaces.every((surface) =>
        publicCitationRegistry.pages.some(
          (page) =>
            page.surface === surface &&
            page.occurrences.some(
              (occurrence) =>
                occurrence.claimId === claimId &&
                occurrence.projection === projection.key &&
                read(`apps/www/src/content/work/${page.id}.mdx`).includes(
                  `occurrenceId="${occurrence.id}"`
                )
            )
        )
      )
    );
const visualAssetCount = (workSource.match(/\b(?:image|photograph|screenshot)\b/gi) ?? []).length;
const sharingPass =
  layoutSource.includes("opengraph-image") ||
  (metadataSource.includes("openGraph") && metadataSource.includes("twitter"));

const scores = {
  role_clarity: roleClarityPass ? 4 : 2,
  role_fit: roleFitPass ? 4 : 2,
  proof_defensibility:
    hardGates.claim_integrity.status === "pass" && hardGates.public_safety.status === "pass"
      ? 4
      : 1,
  citational_care: citationCarePass ? 4 : 2,
  reader_effort: governanceFindings.length === 0 ? 3 : 2,
  chad_lens: chadLensFindings.length === 0 ? 3 : 2,
  visual_evidence: visualAssetCount >= 12 ? 2 : 1,
  resume_alignment: hardGates.resume_consistency.status === "pass" ? 4 : 1,
  responsive_quality: hardGates.responsive_accessibility.status === "pass" ? 3 : 1,
  sharing_quality:
    sharingPass && contactSource.includes("LinkedIn") && browserEvidencePass ? 3 : 2,
  operational_confidence: productionOperationsPass ? 4 : baselineRecord ? 3 : 1
};

const baselineImproves = baselineComparison({
  baseline: baselineRecord,
  commit: baselineCommit,
  fingerprint: baselineFingerprint,
  profileId,
  scores
});

const judgmentDir = path.join(
  repoRoot,
  "evals/portfolio-readiness/judgments",
  profileId
);
const judgments = existsSync(judgmentDir)
  ? readdirSync(judgmentDir)
      .filter((file) => file.endsWith(".json"))
      .map((file) => JSON.parse(readFileSync(path.join(judgmentDir, file), "utf8")))
  : [];
const requiredModelJudgments = 3;
const validJudgments = validModelJudgments({
  judgments,
  candidate: candidateFingerprint,
  contract: contractFingerprint,
  profileId,
  requiredRubrics: suite.profiles[profileId].requiredRubrics,
  minimumScore: suite.profiles[profileId].minimumRequiredRubricScore
});
const validJudgeIds = new Set(validJudgments.map((judgment) => judgment.judgeId));
const validJudgeLenses = new Set(validJudgments.map((judgment) => judgment.lens));
const validChadJudgments = validJudgments.filter(
  (judgment) => judgment.lens === "chad-editorial" && judgment.scores?.chad_lens >= 3
);

hardGates.baseline_improvement = {
  status: baselineImproves ? "pass" : "fail",
  evidence: baselineImproves
    ? `Candidate ${candidateFingerprint} does not regress any baseline rubric.`
    : "The immutable baseline is missing, mismatched, or regressed."
};
hardGates.model_judgment = {
  status:
    validJudgments.length >= requiredModelJudgments &&
    validJudgeIds.size >= requiredModelJudgments &&
    validJudgeLenses.size >= requiredModelJudgments
      ? "pass"
      : "fail",
  evidence: `${validJudgments.length} candidate-bound passing judgments from ${validJudgeIds.size} unique judges using ${validJudgeLenses.size} distinct lenses; ${requiredModelJudgments} required.`
};
hardGates.chad_lens_review = {
  status:
    scores.chad_lens >= 3 && chadLensFindings.length === 0 && validChadJudgments.length >= 1
      ? "pass"
      : "fail",
  evidence:
    scores.chad_lens >= 3 && chadLensFindings.length === 0 && validChadJudgments.length >= 1
      ? "Deterministic Chad-lens scan and dedicated candidate-bound editorial judgment pass."
      : `${chadLensFindings.length} deterministic Chad-lens finding(s); ${validChadJudgments.length} valid dedicated judgment(s).`
};

const profile = profileStatus({ suite, profileId, hardGates, scores });
const result = {
  suite: suite.id,
  candidate: candidateFingerprint,
  contract: contractFingerprint,
  profile: profileId,
  evaluatedAt: new Date().toISOString(),
  hardGates,
  scores,
  weightedScore: profile.weightedScore,
  threshold: profile.threshold,
  passed: profile.passed,
  failedHardGates: profile.failedHardGates,
  failedRubrics: profile.failedRubrics,
  findings: {
    baselineFingerprint,
    governanceNarration: governanceFindings,
    chadLensFriction: chadLensFindings,
    citationScope: {
      requiredProjections: citationRequiredProjections.length,
      plannedPages: publicCitationRegistry.pages.length,
      occurrenceCount: publicCitationRegistry.pages.reduce(
        (total, page) => total + page.occurrences.length,
        0
      )
    },
    visualEvidence: visualAssetCount >= 12
      ? "Some artifact language is present; rendered and rights-approved visual evidence still needs independent review."
      : "The public portfolio has little or no rendered project imagery."
  },
  modelJudgments: judgments.map((judgment) => ({
    judgeId: judgment.judgeId,
    lens: judgment.lens,
    candidate: judgment.candidate,
    passes: judgment.passes,
    valid: validJudgments.includes(judgment)
  })),
  nextAction: profile.passed
    ? `Stop this optimization cycle after ${suite.profiles[profileId].consecutivePassingRuns} consecutive passing runs and independent model review.`
    : governanceFindings.length
      ? "Remove reader-irrelevant internal governance narration from public-facing copy without changing the underlying approval rules."
      : chadLensFindings.length
        ? "Rewrite the highest-value Chad-lens friction so Jamie, the actual work, and the useful outcome are legible without meta-narration or unsupported strengthening."
      : `Address ${profile.failedHardGates[0] ?? profile.failedRubrics[0] ?? "the weighted-score gap"} with the smallest defensible patch.`
};

if (writeReports) {
  const reportDir = path.join(repoRoot, "reports/generated");
  mkdirSync(reportDir, { recursive: true });
  writeFileSync(
    path.join(reportDir, `portfolio-evals-${profileId}.json`),
    `${JSON.stringify(result, null, 2)}\n`
  );
}

if (jsonOnly) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`Portfolio eval: ${profileId}`);
  console.log(`Score: ${result.weightedScore} / 100 (threshold ${result.threshold})`);
  console.log(`Result: ${result.passed ? "PASS" : "FAIL"}`);
  for (const [id, gate] of Object.entries(hardGates)) {
    console.log(`- ${id}: ${gate.status}`);
  }
  if (governanceFindings.length) {
    console.log("Reader-effort findings:");
    governanceFindings.forEach((finding) =>
      console.log(`- ${finding.file}:${finding.line} - ${finding.phrase}`)
    );
  }
  if (chadLensFindings.length) {
    console.log("Chad-lens findings:");
    chadLensFindings.forEach((finding) =>
      console.log(`- ${finding.file}:${finding.line} [${finding.id}] - ${finding.phrase}`)
    );
  }
  console.log(`Next action: ${result.nextAction}`);
}

process.exitCode = result.passed ? 0 : 1;
