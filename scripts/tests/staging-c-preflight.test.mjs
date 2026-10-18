import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { cStagingEnvironment, cStagingRemote } from "../staging-c-preflight.mjs";

const remote = "dokku@staging.jamieburk.art:jamieburkart-staging-c";

test("C preflight supplies C URLs and non-indexable staging to the check process", () => {
  const environment = cStagingEnvironment(remote, { PATH: "/toolchain" });
  assert.equal(environment.SITE_URL, "https://staging-c.jamieburk.art");
  assert.equal(environment.NEXT_PUBLIC_SITE_URL, "https://staging-c.jamieburk.art");
  assert.equal(environment.APP_ENV, "staging");
  assert.equal(environment.SITE_ENV, "staging");
  assert.equal(environment.NEXT_PUBLIC_DEPLOY_ENV, "staging");
  assert.equal(environment.NEXT_PUBLIC_ROBOTS_POLICY, "noindex");
  assert.equal(environment.PATH, "/toolchain");
});

for (const wrong of [
  "dokku@staging.jamieburk.art:jamieburk-art-staging",
  "dokku@staging.jamieburk.art:jamieburk-art",
  "dokku@unexpected.example:jamieburkart-staging-c",
  ""
]) {
  test(`C preflight rejects a different or absent deployment remote: ${wrong}`, () => {
    assert.throws(() => cStagingEnvironment(wrong), /C staging remote/);
  });
}

for (const [key, value] of [
  ["APP_ENV", "production"],
  ["SITE_ENV", "production"],
  ["NEXT_PUBLIC_DEPLOY_ENV", "production"],
  ["SITE_URL", "https://staging.jamieburk.art"],
  ["NEXT_PUBLIC_SITE_URL", "https://jamieburk.art"],
  ["NEXT_PUBLIC_ROBOTS_POLICY", "index"]
]) {
  test(`C preflight rejects conflicting inherited ${key}`, () => {
    assert.throws(() => cStagingEnvironment(remote, { [key]: value }), /conflicts/);
  });
}

test("C preflight accepts an explicitly matching environment without changing unrelated settings", () => {
  assert.equal(cStagingEnvironment(remote, { APP_ENV: "staging", NEXT_TELEMETRY_DISABLED: "1" }).NEXT_TELEMETRY_DISABLED, "1");
});

function gitFixture(t) {
  const cwd = mkdtempSync(path.join(tmpdir(), "c-target-test-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const git = (...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  git("init", "--quiet");
  git("remote", "add", "staging-c", remote);
  return { cwd, git };
}

test("resolves an actual Git remote's effective C push destination", t => {
  const { cwd } = gitFixture(t);
  assert.equal(cStagingRemote(cwd), remote);
});

test("rejects a production pushurl even when the fetch URL still names C", t => {
  const { cwd, git } = gitFixture(t);
  git("config", "remote.staging-c.pushurl", "dokku@staging.jamieburk.art:jamieburk-art");
  assert.throws(() => cStagingRemote(cwd), /C staging.*push/);
});

test("rejects multiple push destinations rather than deploying to two apps", t => {
  const { cwd, git } = gitFixture(t);
  git("config", "--add", "remote.staging-c.pushurl", remote);
  git("config", "--add", "remote.staging-c.pushurl", "dokku@staging.jamieburk.art:jamieburk-art-staging");
  assert.throws(() => cStagingRemote(cwd), /C staging.*push/);
});

test("rejects Git pushInsteadOf rewriting the approved remote to another app", t => {
  const { cwd, git } = gitFixture(t);
  git("config", "url.dokku@staging.jamieburk.art:jamieburk-art.pushInsteadOf", remote);
  assert.throws(() => cStagingRemote(cwd), /C staging.*push/);
});
