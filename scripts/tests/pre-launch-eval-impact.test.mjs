import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  calculateImpact,
  changedPathsFromGit
} from "../pre-launch/eval-impact.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const contract = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/pre-launch/evaluation-budget.json"), "utf8")
);

test("knowledge-only changes defer semantic panels and avoid frontend build work", () => {
  const impact = calculateImpact(
    ["docs/knowledge-bank/assets/photographs/project-sites/example.md"],
    contract
  );
  assert.deepEqual(impact.domains.sort(), ["knowledge-wiki", "photography"]);
  assert.equal(impact.semanticPanelsDeferred, true);
  assert.ok(impact.deterministicCommands.includes("npm run wiki:check"));
  assert.ok(impact.deterministicCommands.includes("npm run photos:check"));
  assert.ok(!impact.deterministicCommands.includes("npm run build"));
});

test("public frontend changes select build, layout, accessibility, and safety checks", () => {
  const impact = calculateImpact(
    ["apps/www/src/app/lab/source-backed-team-memory/page.tsx"],
    contract
  );
  assert.deepEqual(impact.domains, ["public-frontend"]);
  assert.ok(impact.deterministicCommands.includes("npm run build"));
  assert.ok(impact.deterministicCommands.includes("npm run test:accessibility-evidence"));
  assert.ok(impact.deterministicCommands.includes("npm run public-safety"));
});

test("no candidate change does not invalidate prior evidence", () => {
  const impact = calculateImpact([], contract);
  assert.equal(impact.invalidatesPriorCandidateEvidence, false);
  assert.deepEqual(impact.deterministicCommands, []);
});

test("default Git discovery includes committed, working-tree, deleted, and untracked candidate paths", () => {
  const responses = new Map([
    [
      "diff --name-only --diff-filter=ACMRD origin/develop...HEAD",
      "apps/www/src/app/page.tsx\ndocs/knowledge-bank/README.md\n"
    ],
    [
      "diff --name-only --diff-filter=ACMRD HEAD",
      "docs/knowledge-bank/README.md\ndocs/knowledge-bank/old-record.md\n"
    ],
    [
      "ls-files --others --exclude-standard",
      "docs/knowledge-bank/new-record.md\n"
    ]
  ]);
  const run = (_command, args) => responses.get(args.join(" ")) ?? "";

  assert.deepEqual(changedPathsFromGit("origin/develop", run), [
    "apps/www/src/app/page.tsx",
    "docs/knowledge-bank/README.md",
    "docs/knowledge-bank/new-record.md",
    "docs/knowledge-bank/old-record.md"
  ]);
});
