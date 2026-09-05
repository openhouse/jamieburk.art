#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const defaultPublicRoot = path.resolve(path.dirname(scriptPath), "..");
const localConfigName = ".workspace-pair.local.json";

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "en"));
}

function containsField(value, field) {
  if (!value || typeof value !== "object") return false;
  if (Object.hasOwn(value, field)) return true;
  return Object.values(value).some((child) => containsField(child, field));
}

export function evaluateWorkspacePair(contract, state) {
  const denyReasons = [];
  const holdReasons = [];

  if (state?.pair_id !== contract?.pair_id) holdReasons.push("pair-id-mismatch");
  if (state?.public?.role !== "public") holdReasons.push("public-role-mismatch");
  if (state?.private?.role !== "private") holdReasons.push("private-role-mismatch");
  if (state?.public?.visibility !== contract?.visibility?.public) {
    denyReasons.push("public-repository-visibility-unsafe");
  }
  if (state?.private?.visibility !== contract?.visibility?.private) {
    denyReasons.push("private-repository-visibility-unsafe");
  }
  if (
    contract?.public_boundary?.runtime_dependency_on_private !== false ||
    state?.public_manifest?.public_runtime_dependency !== false
  ) {
    denyReasons.push("public-runtime-dependency-on-private");
  }

  for (const field of contract?.public_boundary?.forbidden_fields ?? []) {
    if (containsField(state?.public_manifest, field)) {
      denyReasons.push(`public-manifest-forbidden-field:${field}`);
    }
  }

  if (state?.public?.branch !== state?.private?.branch) {
    holdReasons.push("branch-name-mismatch");
  }
  if (state?.public?.clean !== true) holdReasons.push("public-worktree-dirty");
  if (state?.private?.clean !== true) holdReasons.push("private-worktree-dirty");

  const publicPullRequest = state?.public?.pull_request;
  const privatePullRequest = state?.private?.pull_request;
  if (!publicPullRequest) holdReasons.push("public-pull-request-missing");
  if (!privatePullRequest) holdReasons.push("private-pull-request-missing");

  if (publicPullRequest && privatePullRequest) {
    if (publicPullRequest.title !== privatePullRequest.title) {
      holdReasons.push("pull-request-title-mismatch");
    }
    if (publicPullRequest.head_branch !== privatePullRequest.head_branch) {
      holdReasons.push("pull-request-head-mismatch");
    }
    if (publicPullRequest.base_branch !== privatePullRequest.base_branch) {
      holdReasons.push("pull-request-base-mismatch");
    }
    if (
      state.public.branch === state.private.branch &&
      (publicPullRequest.head_branch !== state.public.branch ||
        privatePullRequest.head_branch !== state.private.branch)
    ) {
      holdReasons.push("pull-request-head-not-current-branch");
    }
    if (publicPullRequest.state !== "OPEN" || privatePullRequest.state !== "OPEN") {
      holdReasons.push("paired-pull-request-not-open");
    }
    if (publicPullRequest.draft !== privatePullRequest.draft) {
      holdReasons.push("pull-request-draft-state-mismatch");
    }
  }

  if (denyReasons.length > 0) {
    return { decision: "deny", reasons: sortedUnique(denyReasons) };
  }
  if (holdReasons.length > 0) {
    return { decision: "hold", reasons: sortedUnique(holdReasons) };
  }
  return { decision: "ready-for-paired-review", reasons: [] };
}

function git(root, args, options = {}) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.stdio ?? ["ignore", "pipe", "pipe"]
  }).trim();
}

function currentBranch(root) {
  return git(root, ["branch", "--show-current"]);
}

function isClean(root) {
  return git(root, ["status", "--porcelain"]) === "";
}

function hasLocalBranch(root, branch) {
  return spawnSync("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`], {
    cwd: root
  }).status === 0;
}

function validateBranch(root, branch) {
  const result = spawnSync("git", ["check-ref-format", "--branch", branch], {
    cwd: root,
    encoding: "utf8"
  });
  if (result.status !== 0) throw new Error(`invalid-branch-name:${branch}`);
}

function switchRepository(root, branch) {
  if (currentBranch(root) === branch) return;
  if (hasLocalBranch(root, branch)) {
    git(root, ["switch", branch]);
  } else {
    git(root, ["switch", "-c", branch]);
  }
}

export function switchWorkspacePair({ publicRoot, privateRoot, branch }) {
  validateBranch(publicRoot, branch);
  validateBranch(privateRoot, branch);
  if (!isClean(publicRoot)) throw new Error("public-worktree-dirty");
  if (!isClean(privateRoot)) throw new Error("private-worktree-dirty");

  const publicPreviousBranch = currentBranch(publicRoot);
  const privatePreviousBranch = currentBranch(privateRoot);

  switchRepository(privateRoot, branch);
  try {
    switchRepository(publicRoot, branch);
  } catch (error) {
    if (currentBranch(privateRoot) !== privatePreviousBranch) {
      switchRepository(privateRoot, privatePreviousBranch);
    }
    throw error;
  }

  return {
    decision: "switched",
    branch,
    public_previous_branch: publicPreviousBranch,
    private_previous_branch: privatePreviousBranch
  };
}

function loadLocalConfig(publicRoot) {
  const configPath = path.join(publicRoot, localConfigName);
  if (!existsSync(configPath)) {
    throw new Error(`${localConfigName}-missing`);
  }
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  if (!config.counterpart_path) throw new Error("counterpart-path-missing");
  return {
    ...config,
    counterpart_path: path.resolve(publicRoot, config.counterpart_path)
  };
}

function localStatus(publicRoot, privateRoot) {
  return {
    pair_id: "portfolio-public-private-v1",
    public_branch: currentBranch(publicRoot),
    private_branch: currentBranch(privateRoot),
    public_clean: isClean(publicRoot),
    private_clean: isClean(privateRoot),
    branch_match: currentBranch(publicRoot) === currentBranch(privateRoot)
  };
}

function main() {
  const command = process.argv[2] ?? "status";
  const config = loadLocalConfig(defaultPublicRoot);
  const privateRoot = config.counterpart_path;

  if (command === "status") {
    const status = localStatus(defaultPublicRoot, privateRoot);
    process.stdout.write(`${JSON.stringify(status, null, 2)}\n`);
    if (!status.branch_match) process.exitCode = 1;
    return;
  }

  if (command === "switch") {
    const branch = process.argv[3];
    if (!branch) throw new Error("branch-argument-required");
    process.stdout.write(
      `${JSON.stringify(
        switchWorkspacePair({ publicRoot: defaultPublicRoot, privateRoot, branch }),
        null,
        2
      )}\n`
    );
    return;
  }

  if (command === "sync-from-hook") {
    const branchCheckout = process.argv[5];
    if (branchCheckout !== "1") return;
    if (!isClean(privateRoot)) throw new Error("private-worktree-dirty");
    switchRepository(privateRoot, currentBranch(defaultPublicRoot));
    return;
  }

  throw new Error(`unknown-command:${command}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`Paired workspace error: ${error.message}\n`);
    process.exitCode = 1;
  }
}
