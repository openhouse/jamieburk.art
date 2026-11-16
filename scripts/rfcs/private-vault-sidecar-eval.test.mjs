import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  evaluateWorkspacePair,
  switchWorkspacePair
} from "../workspace-pair.mjs";

const contract = {
  pair_id: "portfolio-public-private-v1",
  roles: ["public", "private"],
  lockstep: {
    branch_name: "exact",
    base_branch_name: "exact",
    pull_request_title: "exact",
    commit_identity: "independent"
  },
  visibility: {
    public: "PUBLIC",
    private: "PRIVATE"
  },
  public_boundary: {
    runtime_dependency_on_private: false,
    private_locator: "operator-local-only",
    forbidden_fields: [
      "private_repository",
      "private_repository_url",
      "private_pull_request_url",
      "private_local_path",
      "protected_locator",
      "raw_source_body"
    ]
  }
};

function pairedState(overrides = {}) {
  return {
    pair_id: contract.pair_id,
    public: {
      role: "public",
      visibility: "PUBLIC",
      branch: "work/2026-09-03-A",
      base_branch: "work/2026-09-01-A",
      clean: true,
      pull_request: {
        state: "OPEN",
        draft: true,
        title: "RFC 0010-0011: Federation canary and private vault sidecar",
        head_branch: "work/2026-09-03-A",
        base_branch: "work/2026-09-01-A"
      }
    },
    private: {
      role: "private",
      visibility: "PRIVATE",
      branch: "work/2026-09-03-A",
      base_branch: "work/2026-09-01-A",
      clean: true,
      pull_request: {
        state: "OPEN",
        draft: true,
        title: "RFC 0010-0011: Federation canary and private vault sidecar",
        head_branch: "work/2026-09-03-A",
        base_branch: "work/2026-09-01-A"
      }
    },
    public_manifest: {
      pair_id: contract.pair_id,
      role: "public",
      counterpart_locator: "operator-local-only",
      public_runtime_dependency: false
    },
    ...overrides
  };
}

test("matching public and private development lanes are ready for paired review", () => {
  assert.deepEqual(evaluateWorkspacePair(contract, pairedState()), {
    decision: "ready-for-paired-review",
    reasons: []
  });
});

test("a branch mismatch holds both repositories", () => {
  const state = pairedState();
  state.private.branch = "work/other";

  assert.deepEqual(evaluateWorkspacePair(contract, state), {
    decision: "hold",
    reasons: ["branch-name-mismatch"]
  });
});

test("a pull request title or base mismatch holds paired review", () => {
  const state = pairedState();
  state.private.pull_request.title = "Different review";
  state.private.pull_request.base_branch = "main";

  assert.deepEqual(evaluateWorkspacePair(contract, state), {
    decision: "hold",
    reasons: ["pull-request-base-mismatch", "pull-request-title-mismatch"]
  });
});

test("a counterpart that is not private is denied", () => {
  const state = pairedState();
  state.private.visibility = "PUBLIC";

  assert.deepEqual(evaluateWorkspacePair(contract, state), {
    decision: "deny",
    reasons: ["private-repository-visibility-unsafe"]
  });
});

test("a public manifest that reveals a private locator is denied", () => {
  const state = pairedState();
  state.public_manifest.private_repository_url = "https://example.invalid/private";

  assert.deepEqual(evaluateWorkspacePair(contract, state), {
    decision: "deny",
    reasons: ["public-manifest-forbidden-field:private_repository_url"]
  });
});

test("a public runtime dependency on the private repository is denied", () => {
  const state = pairedState();
  state.public_manifest.public_runtime_dependency = true;

  assert.deepEqual(evaluateWorkspacePair(contract, state), {
    decision: "deny",
    reasons: ["public-runtime-dependency-on-private"]
  });
});

test("a missing companion pull request holds the pair", () => {
  const state = pairedState();
  state.private.pull_request = null;

  assert.deepEqual(evaluateWorkspacePair(contract, state), {
    decision: "hold",
    reasons: ["private-pull-request-missing"]
  });
});

function git(root, ...args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

function createRepository(root) {
  mkdirSync(root, { recursive: true });
  git(root, "init", "-b", "main");
  git(root, "config", "user.name", "Pair Test");
  git(root, "config", "user.email", "pair-test@example.invalid");
  writeFileSync(path.join(root, ".gitignore"), ".workspace-pair.local.json\n");
  writeFileSync(path.join(root, "README.md"), "# Pair fixture\n");
  git(root, "add", ".gitignore", "README.md");
  git(root, "commit", "-m", "Initialize fixture");
}

test("the coordinated switch creates and selects the same branch in both repositories", () => {
  const fixture = mkdtempSync(path.join(tmpdir(), "workspace-pair-test-"));
  const publicRoot = path.join(fixture, "public");
  const privateRoot = path.join(fixture, "private");
  createRepository(publicRoot);
  createRepository(privateRoot);

  const result = switchWorkspacePair({
    publicRoot,
    privateRoot,
    branch: "feature/paired-test"
  });

  assert.equal(git(publicRoot, "branch", "--show-current"), "feature/paired-test");
  assert.equal(git(privateRoot, "branch", "--show-current"), "feature/paired-test");
  assert.deepEqual(result, {
    decision: "switched",
    branch: "feature/paired-test",
    public_previous_branch: "main",
    private_previous_branch: "main"
  });
});

test("the coordinated switch refuses dirty work before changing either repository", () => {
  const fixture = mkdtempSync(path.join(tmpdir(), "workspace-pair-dirty-test-"));
  const publicRoot = path.join(fixture, "public");
  const privateRoot = path.join(fixture, "private");
  createRepository(publicRoot);
  createRepository(privateRoot);
  writeFileSync(path.join(privateRoot, "README.md"), "# Dirty private fixture\n");

  assert.throws(
    () => switchWorkspacePair({ publicRoot, privateRoot, branch: "feature/refused" }),
    /private-worktree-dirty/
  );
  assert.equal(git(publicRoot, "branch", "--show-current"), "main");
  assert.equal(git(privateRoot, "branch", "--show-current"), "main");
});

test("the checked-in contract names independent commits and an operator-local locator", () => {
  const repositoryContract = JSON.parse(
    readFileSync(
      new URL("../../rfcs/0011-private-vault-sidecar.contract.json", import.meta.url),
      "utf8"
    )
  );

  assert.equal(repositoryContract.stage, "implementing");
  assert.equal(repositoryContract.lockstep.commit_identity, "independent");
  assert.equal(repositoryContract.public_boundary.private_locator, "operator-local-only");
  assert.equal(repositoryContract.public_boundary.runtime_dependency_on_private, false);
});
