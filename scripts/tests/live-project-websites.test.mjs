import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateLiveProjectWebsites,
  loadCandidate
} from "../check-live-project-websites.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("the governed live-project website inventory passes its hard gates", () => {
  const result = spawnSync(
    process.execPath,
    [path.join(repoRoot, "scripts/check-live-project-websites.mjs")],
    { cwd: repoRoot, encoding: "utf8" }
  );

  assert.equal(
    result.status,
    0,
    [result.stdout, result.stderr].filter(Boolean).join("\n")
  );
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = structuredClone(loadCandidate(repoRoot));
    mutate(candidate);
    const result = evaluateLiveProjectWebsites(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "the declared total cannot drift from the site entries",
  ({ inventory }) => {
    inventory.counts.verified_live_project_homes = 11;
  },
  /verified live count 11 does not match 10 entries/
);

expectFailure(
  "an alias cannot inflate or duplicate a canonical project home",
  ({ inventory }) => {
    inventory.project_sites[0].alternate_urls.push(
      inventory.project_sites[1].canonical_url
    );
  },
  /duplicates a canonical project home/
);

expectFailure(
  "credit-open work cannot enter the Jamie-made count",
  ({ inventory }) => {
    const site = inventory.project_sites.find(
      (item) => item.id === "site.save-nyc-spaces"
    );
    site.counts_toward_verified_made_total = true;
    inventory.counts.verified_made_or_directly_implemented = 10;
  },
  /cannot count toward Jamie-made total while authorship is open/
);

expectFailure(
  "historical surfaces cannot lose their current-status caution",
  ({ inventory }) => {
    const site = inventory.project_sites.find(
      (item) => item.id === "site.kc-town-hall"
    );
    site.caution = "This is a useful public project site.";
  },
  /historical or archive state lacks a useful caution/
);

expectFailure(
  "portfolio projects cannot lose their canonical public link",
  (candidate) => {
    candidate.workSource = candidate.workSource.replaceAll(
      "https://callnyc.org/",
      "https://example.invalid/callnyc/"
    );
  },
  /site.callnyc canonical project home is missing from the portfolio work data/
);

expectFailure(
  "the restored-site cohort cannot silently lose a member",
  ({ inventory }) => {
    inventory.project_sites = inventory.project_sites.filter(
      (item) => item.id !== "site.wowlist"
    );
    inventory.counts.verified_live_project_homes = 9;
    inventory.counts.verified_made_or_directly_implemented = 8;
  },
  /missing restored project site site.wowlist/
);
