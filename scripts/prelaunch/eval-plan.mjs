#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const specPath = path.join(repoRoot, "evals/prelaunch/cost-aware.json");

export const evaluationGroups = {
  foundation: {
    cost: 1,
    executionClass: "deterministic-local",
    commands: [
      "npm run public-safety",
      "npm run check:rfcs",
      "npm run evals:prelaunch",
      "npm run test:prelaunch"
    ]
  },
  wiki: {
    cost: 2,
    executionClass: "deterministic-local",
    commands: [
      "npm run photos:campaign:check",
      "npm run wiki:check",
      "npm run wiki:employment:check",
      "npm run wiki:test",
      "npm run wiki:eval",
      "npm run knowledge-bank"
    ]
  },
  citations: {
    cost: 1,
    executionClass: "deterministic-local",
    commands: ["npm run check:citations", "npm run test:citations"]
  },
  webApp: {
    cost: 3,
    executionClass: "deterministic-local",
    commands: [
      "npm run check -w @jamie-burkart/www",
      "npm run check:routes",
      "npm run test:accessibility-contrast",
      "npm run evals:layout",
      "npm run test:layout"
    ]
  },
  photographyGovernance: {
    cost: 3,
    executionClass: "deterministic-candidate-bound",
    commands: [
      "npm run photos:check",
      "npm run photos:test",
      "npm run photos:eval"
    ]
  },
  legacyKnowledge: {
    cost: 3,
    executionClass: "deterministic-local",
    commands: [
      "npm run check:knowledge-evals",
      "npm run test:knowledge-evals",
      "npm run evals:participation-continuity",
      "npm run test:participation-continuity",
      "npm run evals:icloud-teams-archive",
      "npm run test:icloud-teams-archive-guard",
      "npm run evals:nycac-shared-folder",
      "npm run test:nycac-shared-folder"
    ]
  }
};

const allGroupIds = Object.keys(evaluationGroups);

const pathRules = [
  {
    id: "wiki",
    matches: (file) =>
      file.startsWith("docs/knowledge-bank/") ||
      file.startsWith("scripts/knowledge-wiki/") ||
      file.startsWith("evals/knowledge-wiki/"),
    groups: ["foundation", "wiki", "citations", "legacyKnowledge"]
  },
  {
    id: "citations",
    matches: (file) =>
      file.startsWith("apps/www/src/data/proofs") ||
      file.startsWith("apps/www/src/data/citations") ||
      file.startsWith("scripts/check-citations") ||
      file.startsWith("scripts/generate-public-citations"),
    groups: ["foundation", "citations", "webApp"]
  },
  {
    id: "web-app",
    matches: (file) =>
      file.startsWith("apps/www/") ||
      file.startsWith("scripts/check-layout") ||
      file.startsWith("scripts/check-routes") ||
      file.startsWith("evals/layout/"),
    groups: ["foundation", "citations", "webApp"]
  },
  {
    id: "photography-governance",
    matches: (file) =>
      file.startsWith("docs/photography/") ||
      file.startsWith("scripts/photography/") ||
      file.startsWith("evals/photo-knowledge/") ||
      file.startsWith("docs/qa/photo-knowledge/") ||
      file === "apps/www/src/data/photography.ts",
    groups: ["foundation", "wiki", "webApp", "photographyGovernance"]
  },
  {
    id: "evaluation-system",
    matches: (file) =>
      file.startsWith("scripts/prelaunch/") ||
      file.startsWith("evals/prelaunch/") ||
      file === "package.json" ||
      file === "package-lock.json",
    groups: allGroupIds
  },
  {
    id: "repository-governance",
    matches: (file) =>
      file.startsWith("rfcs/") ||
      file.startsWith(".github/") ||
      file.startsWith("docs/production/"),
    groups: ["foundation", "webApp"]
  }
];

export const exactCandidateExternalGates = [
  {
    id: "accessibility-browser-evidence",
    cost: 8,
    executionClass: "browser-external",
    authority: "verification-only"
  },
  {
    id: "professor-lens-independent-holdouts",
    cost: 20,
    executionClass: "independent-model",
    authority: "advisory-only"
  },
  {
    id: "composite-independent-holdouts",
    cost: 20,
    executionClass: "independent-model",
    authority: "advisory-only"
  },
  {
    id: "photo-knowledge-independent-holdouts",
    cost: 20,
    executionClass: "independent-model",
    authority: "advisory-only"
  }
];

const candidateEvidenceExclusions = [
  /^docs\/knowledge-bank\/_generated\//,
  /^reports\//,
  /^apps\/www\/next-env\.d\.ts$/
];

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function git(args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8"
  }).trim();
}

export function parsePorcelainZ(output) {
  if (!output) return [];
  const entries = output.split("\0");
  const files = [];
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (!entry) continue;
    const status = entry.slice(0, 2);
    files.push(entry.slice(3));
    if (/[RC]/.test(status)) {
      const sourcePath = entries[index + 1];
      if (sourcePath) files.push(sourcePath);
      index += 1;
    }
  }
  return files;
}

function workingTreeFiles() {
  const output = git(["status", "--porcelain=v1", "-z", "--untracked-files=all"]);
  return parsePorcelainZ(output);
}

function prFiles() {
  const base = git(["merge-base", "origin/develop", "HEAD"]);
  const output = git(["diff", "--name-only", "-z", `${base}...HEAD`]);
  return output ? output.split("\0").filter(Boolean) : [];
}

export function makeEvaluationPlan(files, metadata = {}) {
  const normalized = [...new Set(files.map((file) => file.trim()).filter(Boolean))].sort();
  const selected = new Set(["foundation"]);
  const unknown = [];
  const mappings = normalized.map((file) => {
    const matches = pathRules.filter((rule) => rule.matches(file));
    if (!matches.length) {
      unknown.push(file);
      allGroupIds.forEach((group) => selected.add(group));
    } else {
      matches.flatMap((rule) => rule.groups).forEach((group) => selected.add(group));
    }
    return { file, rules: matches.map((rule) => rule.id) };
  });
  const candidateAffectingFiles = normalized.filter(
    (file) => !candidateEvidenceExclusions.some((pattern) => pattern.test(file))
  );
  const selectedGroups = allGroupIds.filter((id) => selected.has(id));
  const commands = selectedGroups.flatMap((id) => evaluationGroups[id].commands);
  const uniqueCommands = [...new Set(commands)];
  const candidateEvidenceRequired = candidateAffectingFiles.length > 0;

  return {
    schemaVersion: 1,
    mode: metadata.mode ?? "explicit",
    generatedAt: metadata.generatedAt ?? null,
    branch: metadata.branch ?? null,
    head: metadata.head ?? null,
    changedPathCount: normalized.length,
    changedPathsSha256: sha256(normalized.join("\0")),
    changedPaths: normalized,
    mappings,
    unknownPaths: unknown,
    selectedGroups: selectedGroups.map((id) => ({
      id,
      ...evaluationGroups[id],
      status: "selected-not-yet-run"
    })),
    unselectedGroups: allGroupIds
      .filter((id) => !selected.has(id))
      .map((id) => ({ id, status: "not-selected-not-passed" })),
    deterministicCommands: uniqueCommands,
    candidateAffectingFiles,
    exactCandidateEvidence: {
      required: candidateEvidenceRequired,
      status: candidateEvidenceRequired
        ? "required-not-yet-refreshed"
        : "not-triggered-by-declared-diff",
      gates: candidateEvidenceRequired ? exactCandidateExternalGates : []
    },
    finalRelease: {
      command: "npm run check",
      status: "required-not-yet-run",
      sameUnchangedCandidateRequired: true,
      incrementalPlanIsSubstitute: false
    },
    humanGates: {
      productionApproval: "open",
      indexingApproval: "open",
      rightsConsentCreditCropApproval: "open-as-applicable",
      jamieFinalReview: "open"
    }
  };
}

function validateSpec() {
  const spec = JSON.parse(readFileSync(specPath, "utf8"));
  const expected = new Set([
    "changed_paths_are_mapped",
    "cheap_checks_precede_external_work",
    "skipped_is_not_passed",
    "candidate_evidence_is_bound",
    "final_gate_is_complete",
    "unknown_paths_fail_closed",
    "plan_is_reproducible",
    "human_authority_remains_open",
    "cost_is_visible",
    "full_candidate_is_unchanged"
  ]);
  const actual = new Set(spec.criteria.map((criterion) => criterion.check));
  const missing = [...expected].filter((id) => !actual.has(id));
  const extra = [...actual].filter((id) => !expected.has(id));
  const hard = spec.criteria.every((criterion) => criterion.hard_gate === true);
  const groupsHaveCost = Object.values(evaluationGroups).every(
    (group) => Number.isFinite(group.cost) && group.executionClass
  );
  const pass =
    spec.version === 1 &&
    spec.threshold === 1 &&
    missing.length === 0 &&
    extra.length === 0 &&
    hard &&
    groupsHaveCost;
  if (!pass) {
    throw new Error(
      `Pre-launch eval spec failed: missing=${missing.join(",")} extra=${extra.join(",")}`
    );
  }
  return { pass, criteria: spec.criteria.length, groups: allGroupIds.length };
}

function runCommands(commands) {
  const results = [];
  for (const command of commands) {
    const [program, ...args] = command.split(" ");
    const result = spawnSync(program, args, {
      cwd: repoRoot,
      stdio: "inherit",
      env: process.env
    });
    results.push({ command, exitCode: result.status });
    if (result.status !== 0) break;
  }
  return results;
}

function parseArgs(argv) {
  const args = {
    mode: "working-tree",
    run: false,
    validate: false
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--run") args.run = true;
    else if (arg === "--validate") args.validate = true;
    else if (arg === "--mode") args.mode = argv[index += 1];
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  if (args.validate) {
    console.log(JSON.stringify(validateSpec(), null, 2));
  } else {
    const files =
      args.mode === "working-tree"
        ? workingTreeFiles()
        : args.mode === "pr"
          ? prFiles()
          : (() => {
              throw new Error(`Unknown mode: ${args.mode}`);
            })();
    const plan = makeEvaluationPlan(files, {
      mode: args.mode,
      generatedAt: new Date().toISOString(),
      branch: git(["branch", "--show-current"]),
      head: git(["rev-parse", "HEAD"])
    });
    if (args.run) {
      plan.runResults = runCommands(plan.deterministicCommands);
      plan.runStatus = plan.runResults.every((result) => result.exitCode === 0)
        ? "deterministic-selected-pass"
        : "deterministic-selected-fail";
      plan.exactCandidateEvidence.status = plan.exactCandidateEvidence.required
        ? "still-required-not-refreshed"
        : plan.exactCandidateEvidence.status;
      plan.finalRelease.status = "still-required-not-run";
    }
    console.log(JSON.stringify(plan, null, 2));
    if (args.run && plan.runStatus !== "deterministic-selected-pass") {
      process.exitCode = 1;
    }
  }
}
