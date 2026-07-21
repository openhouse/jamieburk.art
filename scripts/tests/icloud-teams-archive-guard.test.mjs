import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { evaluateIcloudTeamsArchive } from "../lib/icloud-teams-archive-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const reportText = readFileSync(
  path.join(repoRoot, "docs/knowledge-bank/projects/icloud-teams-archive-delta-2026-07-15.md"),
  "utf8"
);

function cloneBank() {
  return structuredClone(knowledgeBank);
}

test("iCloud Teams archive delta passes every bounded criterion", () => {
  const result = evaluateIcloudTeamsArchive({ reportText });
  assert.equal(result.pass, true);
  assert.equal(result.passed, result.total);
});

test("guard rejects converting the route checkpoint into Gulf completion", () => {
  const bank = cloneBank();
  const claim = bank.claims.find((item) => item.id === "CLM-WATERWAYS-RAFT-EXPEDITION");
  claim.internalClaim = "Jamie completed the Gulf route after 1,100 miles.";
  claim.boundaries = claim.boundaries.filter((item) => !item.includes("1,100 miles"));
  claim.antiClaims = claim.antiClaims.filter((item) => !item.includes("exact Gulf destination"));

  const result = evaluateIcloudTeamsArchive({ bank, reportText });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "raft-route-boundary")?.pass, false);
});

test("guard rejects publishing the protected Kansas City Star clipping", () => {
  const bank = cloneBank();
  const source = bank.sources.find((item) => item.id === "SRC-WATERWAYS-KC-STAR-2007-11-15");
  source.visibility = "public";
  source.canonicalUrl = "https://example.com/protected-newspaper-scan";

  const result = evaluateIcloudTeamsArchive({ bank, reportText });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "protected-clipping")?.pass, false);
});

test("guard rejects collapsing the clipping back into an undecomposed source summary", () => {
  const bank = cloneBank();
  bank.observations = bank.observations.filter(
    (item) => item.id !== "OBS-WATERWAYS-RAFT-KCSTAR-RECOVERY-NETWORK"
  );

  const result = evaluateIcloudTeamsArchive({ bank, reportText });
  assert.equal(result.pass, false);
  assert.equal(
    result.criteria.find((item) => item.id === "protected-clipping-atomicity")?.pass,
    false
  );
});

test("guard rejects protected article prose entering a public-safe observation", () => {
  const bank = cloneBank();
  const observation = bank.observations.find(
    (item) => item.id === "OBS-WATERWAYS-RAFT-KCSTAR-PARTICIPATORY-PURPOSE"
  );
  observation.text = "Technology is as much a restriction as a liberty.";

  const result = evaluateIcloudTeamsArchive({ bank, reportText });
  assert.equal(result.pass, false);
  assert.equal(
    result.criteria.find((item) => item.id === "protected-clipping-copyright")?.pass,
    false
  );
});

test("guard rejects broadening clipping evidence beyond its governed supports", () => {
  const bank = cloneBank();
  const source = bank.sources.find((item) => item.id === "SRC-WATERWAYS-KC-STAR-2007-11-15");
  source.supportsGenerally = source.supportsGenerally.filter(
    (item) => item !== "community, legal, and material recovery support"
  );

  const result = evaluateIcloudTeamsArchive({ bank, reportText });
  assert.equal(result.pass, false);
  assert.equal(
    result.criteria.find((item) => item.id === "protected-clipping-scope")?.pass,
    false
  );
});

test("guard rejects publishing the protected faculty record as active testimony", () => {
  const bank = cloneBank();
  const source = bank.sources.find((item) => item.id === "SRC-SOCIAL-INFO-SPACES-EVALUATION-2006");
  const claim = bank.claims.find((item) => item.id === "CLM-SOCIAL-INFO-SPACES-PROTOTYPE");
  source.visibility = "public";
  source.canonicalUrl = "https://example.com/private-evaluation";
  claim.projections[0].status = "active";
  claim.projections[0].surfaces = ["/about"];
  claim.evidence[0].renderCitation = true;

  const result = evaluateIcloudTeamsArchive({ bank, reportText });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "faculty-source-protection")?.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "faculty-claim-boundary")?.pass, false);
});

test("guard rejects an archive report that omits a required working folder", () => {
  const result = evaluateIcloudTeamsArchive({
    reportText: reportText.replaceAll("job-hunt", "omitted-folder")
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "archive-scope")?.pass, false);
});
