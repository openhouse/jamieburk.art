import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { buildGeneratedOutputs, compileWiki, defaultRepoRoot } from "./lib.mjs";

// A's existing comparison edition, not a sibling branch's baseline.
const baselineCommit = "a8fdd57617c3667ac4d9db7d28f57e9022c11a81";
const result = compileWiki();

test("graph delta is unchanged when the mutable develop reference moves", () => {
  const temporary = mkdtempSync(path.join(tmpdir(), "wiki-delta-ref-test-"));
  const checkout = path.join(temporary, "repository");
  try {
    execFileSync("git", ["clone", "--quiet", "--shared", "--no-checkout", defaultRepoRoot, checkout]);
    const git = (args) => execFileSync("git", args, { cwd: checkout, encoding: "utf8" });
    git(["update-ref", "refs/remotes/origin/develop", baselineCommit]);
    const before = buildGeneratedOutputs({ ...result, repoRoot: checkout })["reports/wiki-graph-delta.md"];
    git(["update-ref", "refs/remotes/origin/develop", "HEAD"]);
    const after = buildGeneratedOutputs({ ...result, repoRoot: checkout })["reports/wiki-graph-delta.md"];
    assert.equal(after, before, "a remote-tracking update must not invalidate a committed report");
    assert.ok(after.includes(baselineCommit), "the report must identify its immutable comparison baseline");
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test("missing graph baseline fails rather than becoming an empty graph", () => {
  const temporary = mkdtempSync(path.join(tmpdir(), "wiki-delta-missing-test-"));
  try {
    execFileSync("git", ["init", "--quiet", temporary]);
    assert.throws(
      () => buildGeneratedOutputs({ ...result, repoRoot: temporary }),
      /immutable Wiki graph baseline.*full Git history/i
    );
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
