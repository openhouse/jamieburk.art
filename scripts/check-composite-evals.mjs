#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const suitePath = ".agents/evals/composite-system.json";
const expectedBranches = "ABCDEFGHIJKLMN".split("").map(
  (letter) => `feature/evals-${letter}`
);
const expectedObservers = [
  "deterministic",
  "browser",
  "llm_judge",
  "human_approval",
  "runtime",
  "hybrid"
];
const expectedStatuses = [
  "criteria_met",
  "governed_open",
  "human_blocked",
  "not_observed",
  "failed"
];
const expectedBrowserRoutes = [
  "/",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/contact",
  "/about",
  "/work/harry-j-epstein",
  "/work/fair-rent-nyc",
  "/work/callnyc",
  "/work/kc-town-hall",
  "/work/wowlist"
];
const expectedBrowserWidths = [320, 375, 768, 1440];
const browserCandidatePaths = [
  "apps/www/mdx-components.tsx",
  "apps/www/next.config.ts",
  "apps/www/public",
  "apps/www/src/app",
  "apps/www/src/components",
  "apps/www/src/content",
  "apps/www/src/data",
  "apps/www/src/lib",
  "apps/www/src/styles"
];

function sorted(values) {
  return [...values].sort();
}

function sameMembers(actual, expected) {
  return JSON.stringify(sorted(actual ?? [])) === JSON.stringify(sorted(expected));
}

export function fingerprint(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export function validateCompositeSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(suite?.version === 1, "suite.version must be 1");
  requireValue(
    suite?.suite_id === "feature-evals-composite",
    "suite_id must be feature-evals-composite"
  );
  requireValue(
    suite?.source_branch === "feature/knowledge-i",
    "source_branch must remain feature/knowledge-i"
  );
  requireValue(
    suite?.pull_request_base === "develop",
    "pull_request_base must remain develop"
  );

  const branches = (suite?.branch_family ?? []).map(({ branch }) => branch);
  requireValue(sameMembers(branches, expectedBranches), "branch_family must cover feature/evals-A through N exactly once");
  requireValue(new Set(branches).size === branches.length, "branch_family entries must be unique");
  for (const entry of suite?.branch_family ?? []) {
    requireValue(Number.isInteger(entry.pr) && entry.pr > 0, `${entry.branch} requires a PR number`);
    requireValue(["adopt", "adapt", "defer", "reject"].includes(entry.disposition), `${entry.branch} has an invalid disposition`);
    requireValue(typeof entry.mechanism === "string" && entry.mechanism.length >= 20, `${entry.branch} requires a substantive mechanism`);
  }

  requireValue(sameMembers(suite?.observer_types, expectedObservers), "observer_types must preserve all six observer classes");
  requireValue(sameMembers(suite?.statuses, expectedStatuses), "statuses must preserve criteria, open, blocked, unobserved, and failed states");
  requireValue(suite?.optimization?.rubric_frozen_during_run === true, "the rubric must be frozen during a run");
  requireValue(suite?.optimization?.optimizer_may_not_grade_own_patch === true, "the optimizer may not grade its own patch");
  requireValue(suite?.optimization?.two_unchanged_passes_required === true, "two unchanged passing runs must be required");
  requireValue(suite?.optimization?.maximum_iterations === 8, "maximum_iterations must remain 8");
  requireValue(suite?.optimization?.stop_after_no_improvement_iterations === 3, "no-improvement stop must remain 3 iterations");

  const layerIds = (suite?.canonical_layers ?? []).map(({ id }) => id);
  requireValue(layerIds.length === 4 && new Set(layerIds).size === 4, "four unique canonical layers are required");
  const canonicalStores = (suite?.canonical_layers ?? []).map(({ canonical_store }) => canonical_store);
  requireValue(new Set(canonicalStores).size === canonicalStores.length, "canonical layers may not introduce duplicate truth stores");

  const routes = (suite?.composition_profiles ?? []).map(({ route }) => route);
  requireValue(routes.includes("/") && routes.includes("/work/technical-operations") && routes.includes("/resume"), "composition profiles must govern the primary hiring path");
  requireValue((suite?.composition_profiles ?? []).every(({ claim_budget }) => Number.isInteger(claim_budget) && claim_budget > 0), "every composition profile requires a positive claim budget");

  for (const gate of suite?.external_gates ?? []) {
    requireValue(["human_approval", "runtime"].includes(gate.observer), `${gate.id} must remain human or runtime observed`);
    requireValue(["governed_open", "human_blocked", "not_observed"].includes(gate.status), `${gate.id} cannot be self-certified as complete`);
    requireValue(typeof gate.next_action === "string" && gate.next_action.length >= 20, `${gate.id} requires a next action`);
  }
  requireValue((suite?.external_gates ?? []).length >= 5, "external gates must cover collaborator, reader, market, rights, and production evidence");
  requireValue((suite?.anti_gaming ?? []).length >= 5, "at least five anti-gaming rules are required");

  return { errors };
}

export function compareObjectiveVectors(before, after) {
  const keys = ["safetyFailures", "hardGateFailures", "blockingFailures", "weightedGap", "diffSize"];
  for (const key of keys) {
    if (after[key] < before[key]) return { accepted: true, decidingKey: key };
    if (after[key] > before[key]) return { accepted: false, decidingKey: key };
  }
  return { accepted: false, decidingKey: "no_improvement" };
}

export function selectNextAction(failures) {
  const rank = { safety: 0, hard_gate: 1, blocking: 2, semantic: 3, quality: 4 };
  return [...failures].sort((left, right) => {
    const category = rank[left.category] - rank[right.category];
    if (category !== 0) return category;
    if ((right.weight ?? 0) !== (left.weight ?? 0)) return (right.weight ?? 0) - (left.weight ?? 0);
    return (left.risk ?? 0) - (right.risk ?? 0);
  })[0] ?? null;
}

export function assessBlockingResults(results, threshold) {
  const blockingFailures = results.filter((result) => result.blocking && (!result.pass || result.score < threshold));
  const totalWeight = results.reduce((sum, result) => sum + result.weight, 0);
  const weightedScore = totalWeight === 0 ? 0 : results.reduce((sum, result) => sum + result.weight * (result.score / 4), 0) / totalWeight;
  return {
    pass: blockingFailures.length === 0 && weightedScore >= 0.8,
    blockingFailures: blockingFailures.map(({ id }) => id),
    weightedScore: Number(weightedScore.toFixed(4))
  };
}

export function evaluateCompositeRepository(suite, packageJson, fileExists = existsSync) {
  const errors = [...validateCompositeSuite(suite).errors];
  const scripts = packageJson?.scripts ?? {};
  for (const command of suite.required_commands ?? []) {
    if (typeof scripts[command] !== "string" || scripts[command].trim().length === 0) errors.push(`package.json is missing ${command}`);
  }
  for (const path of suite.required_files ?? []) if (!fileExists(path)) errors.push(`required file is missing: ${path}`);
  for (const layer of suite.canonical_layers ?? []) {
    for (const path of [layer.canonical_store, layer.contract, layer.runner, layer.test]) {
      if (!fileExists(path)) errors.push(`${layer.id} references missing ${path}`);
    }
  }

  const decisionLog = fileExists("docs/evals/composite-integration-decision-log.md")
    ? readFileSync("docs/evals/composite-integration-decision-log.md", "utf8")
    : "";
  for (const branch of expectedBranches) if (!decisionLog.includes(`\`${branch}\``)) errors.push(`decision ledger omits ${branch}`);
  const architecture = fileExists("docs/evals/composite-evaluation-system.md")
    ? readFileSync("docs/evals/composite-evaluation-system.md", "utf8")
    : "";
  for (const phrase of ["protocol is not evidence", "application cadence", "grader separation", "p0", "p1", "p2"]) {
    if (!architecture.toLowerCase().includes(phrase)) errors.push(`architecture omits ${phrase}`);
  }

  return {
    status: errors.length ? "failed" : "criteria_met",
    errors,
    suiteFingerprint: fingerprint(suite),
    branchCount: suite.branch_family?.length ?? 0,
    layerCount: suite.canonical_layers?.length ?? 0,
    externalGates: suite.external_gates ?? []
  };
}

export function validateBrowserReceipt(receipt) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(receipt?.version === 1, "browser receipt version must be 1");
  requireValue(
    receipt?.suite_id === "feature-evals-composite-browser",
    "browser receipt suite_id is invalid"
  );
  requireValue(
    /^[0-9a-f]{40}$/.test(receipt?.candidate_sha ?? ""),
    "browser receipt requires a full candidate_sha"
  );
  requireValue(
    typeof receipt?.performed_at === "string" && !Number.isNaN(Date.parse(receipt.performed_at)),
    "browser receipt requires an ISO performed_at timestamp"
  );
  requireValue(receipt?.browser?.engine === "chromium", "browser receipt must identify Chromium");
  requireValue(receipt?.browser?.headless === true, "browser receipt must record headless execution");

  const routes = receipt?.routes ?? [];
  requireValue(
    sameMembers(routes.map(({ route }) => route), expectedBrowserRoutes),
    "browser receipt must cover the exact primary route population"
  );
  requireValue(
    new Set(routes.map(({ route }) => route)).size === routes.length,
    "browser receipt routes must be unique"
  );
  for (const result of routes) {
    const widths = (result.viewports ?? []).map(({ width }) => width);
    requireValue(
      sameMembers(widths, expectedBrowserWidths),
      `${result.route} must cover 320, 375, 768, and 1440 pixel widths`
    );
    requireValue(new Set(widths).size === widths.length, `${result.route} viewport widths must be unique`);
    for (const viewport of result.viewports ?? []) {
      requireValue(viewport.status === 200, `${result.route} at ${viewport.width}px did not return 200`);
      requireValue(viewport.overflow_x === false, `${result.route} at ${viewport.width}px overflows horizontally`);
      requireValue(
        Array.isArray(viewport.console_errors) && viewport.console_errors.length === 0,
        `${result.route} at ${viewport.width}px has browser console errors`
      );
      requireValue(
        typeof viewport.h1 === "string" && viewport.h1.trim().length > 0,
        `${result.route} at ${viewport.width}px requires a visible h1`
      );
    }
  }

  for (const field of ["keyboard", "citations", "resume_download", "metadata"]) {
    requireValue(receipt?.checks?.[field]?.passed === true, `browser receipt check ${field} must pass`);
  }
  const serialized = JSON.stringify(receipt);
  for (const marker of ["/Users/", "/Volumes/", "cookie", "authorization", "access_token"]) {
    requireValue(!serialized.toLowerCase().includes(marker.toLowerCase()), `browser receipt exposes protected marker ${marker}`);
  }

  return errors;
}

export function validateBrowserReceiptCandidate(receipt) {
  if (!/^[0-9a-f]{40}$/.test(receipt?.candidate_sha ?? "")) return [];
  try {
    execFileSync("git", ["cat-file", "-e", `${receipt.candidate_sha}^{commit}`], { stdio: "ignore" });
  } catch {
    return [`browser receipt candidate ${receipt.candidate_sha} is not a local commit`];
  }
  try {
    execFileSync("git", ["diff", "--quiet", receipt.candidate_sha, "--", ...browserCandidatePaths], {
      stdio: "ignore"
    });
    return [];
  } catch {
    return [`browser receipt candidate ${receipt.candidate_sha} does not match the current public surface`];
  }
}

export function assessProfile(suite, repositoryResult, profile, browserReceipt = null) {
  if (repositoryResult.errors.length) return { status: "failed", errors: repositoryResult.errors };
  if (profile === "fast") return { status: "criteria_met", errors: [] };
  if (profile === "browser") {
    if (!browserReceipt) {
      return {
        status: "not_observed",
        errors: [],
        nextAction: "Run the exact-candidate browser protocol and validate its public-safe receipt."
      };
    }
    const errors = [
      ...validateBrowserReceipt(browserReceipt),
      ...validateBrowserReceiptCandidate(browserReceipt)
    ];
    return {
      status: errors.length ? "failed" : "criteria_met",
      errors,
      candidateSha: browserReceipt.candidate_sha,
      routeCount: browserReceipt.routes?.length ?? 0
    };
  }
  const open = suite.external_gates.filter(({ status }) => status !== "criteria_met");
  return {
    status: open.length ? "human_blocked" : "criteria_met",
    errors: [],
    openGateIds: open.map(({ id }) => id),
    nextActions: open.map(({ next_action }) => next_action)
  };
}

function run() {
  const profileArg = process.argv.find((value) => value.startsWith("--profile="));
  const receiptArg = process.argv.find((value) => value.startsWith("--receipt="));
  const profile = profileArg?.slice("--profile=".length) ?? "fast";
  if (!["fast", "browser", "application", "release"].includes(profile)) {
    console.error(`Unknown composite profile: ${profile}`);
    process.exit(1);
  }
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  const repository = evaluateCompositeRepository(suite, packageJson);
  const receiptPath = receiptArg?.slice("--receipt=".length);
  const browserReceipt = receiptPath && existsSync(receiptPath)
    ? JSON.parse(readFileSync(receiptPath, "utf8"))
    : null;
  const assessment = assessProfile(suite, repository, profile, browserReceipt);
  console.log(JSON.stringify({ profile, repository, assessment }, null, 2));
  if (assessment.status === "failed" || (profile === "browser" && assessment.status !== "criteria_met")) {
    process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
