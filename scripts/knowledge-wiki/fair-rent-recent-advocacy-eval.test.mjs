import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const candidate = JSON.parse(readFileSync(
  path.join(repoRoot, "evals/knowledge-wiki/fair-rent-recent-advocacy.json"),
  "utf8"
));

function sha256(relativePath) {
  return createHash("sha256")
    .update(readFileSync(path.join(repoRoot, relativePath)))
    .digest("hex");
}

test("recent Fair Rent advocacy candidate is exact, governed, and non-inflationary", () => {
  assert.equal(candidate.candidate.branch, "feature/launch-2026-08-12-C");
  assert.equal(candidate.candidate.baseCommit, "780d2b898de899445b11e922c4a34fddd40bbd3c");
  assert.equal(
    sha256(candidate.candidate.knowledgeModule),
    candidate.candidate.knowledgeModuleSha256,
    "knowledge module differs from the reviewed candidate"
  );
  assert.equal(
    sha256(candidate.candidate.projectDocument),
    candidate.candidate.projectDocumentSha256,
    "project document differs from the reviewed candidate"
  );

  const claims = candidate.required.claimIds.map((id) =>
    knowledgeBank.claims.find((claim) => claim.id === id)
  );
  assert.ok(claims.every(Boolean), "missing a required recent-advocacy claim");
  assert.ok(
    claims.every((claim) => claim.projections.every((projection) =>
      ["hold", "disallowed"].includes(projection.status) && projection.surfaces.length === 0
    )),
    "recent claims must remain unprojected until Jamie approves public wording"
  );

  const reportRelation = knowledgeBank.agencyRelations.find(
    (relation) => relation.id === "REL-JAMIE-SBU-REPORT-REVIEW-2026"
  );
  assert.equal(reportRelation?.action, "reviewed");
  assert.equal(reportRelation?.creditScope, "individual");
  assert.match(reportRelation?.boundaries.join(" ") ?? "", /not (?:co-?author|authorship)/i);
  assert.match(reportRelation?.boundaries.join(" ") ?? "", /final editorial authority/i);

  const speechRelation = knowledgeBank.agencyRelations.find(
    (relation) => relation.id === "REL-JAMIE-SBU-REPORT-LAUNCH-SPEECH-2026"
  );
  assert.equal(speechRelation?.action, "spoke-at");
  assert.match(speechRelation?.boundaries.join(" ") ?? "", /media placement/i);
  assert.match(speechRelation?.boundaries.join(" ") ?? "", /passage|enactment/i);

  const coordination = knowledgeBank.claims.find(
    (claim) => claim.id === "CLM-FAIRRENT-RECENT-OFFICIAL-COORDINATION-2026-08"
  );
  assert.match(coordination?.internalClaim ?? "", /protected records/i);
  assert.match(coordination?.boundaries.join(" ") ?? "", /counterpart|approval/i);
  const coordinationSources = coordination?.evidence.map((evidence) =>
    knowledgeBank.sources.find((source) => source.id === evidence.sourceId)
  ) ?? [];
  assert.ok(coordinationSources.length > 0);
  assert.ok(coordinationSources.every((source) =>
    source && ["private", "protected"].includes(source.visibility) && !source.canonicalUrl
  ));

  const legislativeStatus = knowledgeBank.claims.find(
    (claim) => claim.id === "CLM-FAIRRENT-CURRENT-LEGISLATIVE-STATUS-2026-08-12"
  );
  assert.match(legislativeStatus?.internalClaim ?? "", /active|committee/i);
  assert.match(legislativeStatus?.antiClaims.join(" ") ?? "", /passed|enacted/i);

  const pressGap = knowledgeBank.claims.find(
    (claim) => claim.id === "CLM-FAIRRENT-PRESS-PLACEMENT-NOT-RECOVERED-2026"
  );
  assert.equal(pressGap?.status, "not-recovered");
  assert.match(pressGap?.boundaries.join(" ") ?? "", /nonexistence/i);

  const correction = knowledgeBank.corrections.find(
    (item) => item.id === candidate.required.correctionId
  );
  assert.equal(correction?.previousText, "84,000 businesses closed in Q2 2025");
  assert.equal(correction?.replacementText, "8,400 businesses closed in Q2 2025");
});
