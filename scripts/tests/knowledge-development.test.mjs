import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluateKnowledgeBank,
  validateHybridReportCandidate,
  validateKnowledgeDevelopmentSuite
} from "../check-knowledge-development.mjs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const suite = JSON.parse(
  readFileSync(".agents/evals/knowledge-bank-development.json", "utf8")
);
const hybridReport = JSON.parse(
  readFileSync(
    ".agents/evals/runs/knowledge-bank-development-hybrid-2026-07-13.json",
    "utf8"
  )
);
const hybridPass = hybridReport.results;

function normalizeCanonicalUrl(value) {
  const url = new URL(value);
  url.protocol = "https:";
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
  url.hash = "";
  url.search = "";
  url.pathname = url.pathname.replace(/\/$/, "");
  return url.toString();
}

test("knowledge-development suite is structurally valid", () => {
  assert.deepEqual(validateKnowledgeDevelopmentSuite(suite).errors, []);
});

test("hybrid scorecard matches the current knowledge-bank inputs", () => {
  assert.deepEqual(validateHybridReportCandidate(hybridReport), []);
});

test("current knowledge bank satisfies the frozen suite", () => {
  const result = evaluateKnowledgeBank(suite, knowledgeBank, 2, hybridPass);
  assert.equal(result.status, "threshold_met");
  assert.equal(result.weighted_score, 1);
  assert.ok(result.results.every((entry) => entry.pass));
});

test("campaign press corpus preserves all memberships without duplicating articles", () => {
  const pressIntake = knowledgeBank.intake.filter((item) =>
    item.id.includes("PRESS-CORPUS") && item.projects.includes("nyc-artist-coalition")
  );
  const indexIds = new Set([
    "SRC-NAC-LET-NYC-DANCE-PRESS-INDEX",
    "SRC-NAC-TALKS-NOT-RAIDS-PRESS-INDEX",
    "SRC-NAC-SAVE-NYC-SPACES-PRESS-INDEX",
    "SRC-NAC-FAIR-RENT-NYC-PRESS-INDEX-2021"
  ]);
  const articleMemberships = pressIntake.flatMap((item) =>
    item.sourceIds.filter((sourceId) => !indexIds.has(sourceId))
  );

  assert.equal(pressIntake.length, 4);
  assert.equal(articleMemberships.length, 45);
  const uniqueArticleIds = new Set(articleMemberships);
  assert.equal(uniqueArticleIds.size, 44);

  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  const normalizedCanonicalUrls = new Set(
    [...uniqueArticleIds].map((sourceId) =>
      normalizeCanonicalUrl(sourceById.get(sourceId).canonicalUrl)
    )
  );
  assert.equal(normalizedCanonicalUrls.size, 44);

  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NAC-CAMPAIGN-PRESS-CLOSE-READ"
  );
  assert.deepEqual(new Set(task.sourceIds), new Set(articleMemberships));

  const assertionSourceIds = new Set(
    knowledgeBank.sourceAssertions.map((assertion) => assertion.sourceId)
  );
  for (const sourceId of articleMemberships) {
    assert.equal(assertionSourceIds.has(sourceId), true, `${sourceId} lacks decomposition`);
  }

  const accessRestrictedSources = [...uniqueArticleIds]
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source) => source.publicNote?.includes("HTTP 403"));
  assert.equal(accessRestrictedSources.length, 5);
  assert.ok(accessRestrictedSources.every((source) => source.archiveUrl));
});

test("KC Town Hall preserves the CCED recommendation-to-Council-action chain", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-COUNCIL-APPROVAL-190649"
  );
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-KCTH-COUNCIL-ACTION-190649-2026"
  );
  const page = knowledgeBank.pages.find((item) => item.id === "kc-town-hall");

  assert.equal(claim.maturity, "confirmed-with-boundary");
  assert.equal(claim.projectionEligibility, "eligible");
  assert.match(claim.internalClaim, /CCED Board voted on July 16, 2019/);
  assert.match(claim.internalClaim, /Council adopted Resolution 190649/);
  assert.ok(claim.antiClaims.some((item) => /received \$490,539/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /alone secured/i.test(item)));
  assert.equal(inquiry.resultStatus, "recovered");
  assert.ok(inquiry.limitations.some((item) => /does not itself establish an executed funding agreement/i.test(item)));
  assert.deepEqual(page.sourceOrder, [
    "SRC-KCTH-KCMO-AUTHENTICATED-190649",
    "SRC-KCTH-KCMO-LEGISTAR-190649"
  ]);
  assert.equal(page.occurrences[0].claimId, claim.id);

  const mdx = readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8");
  const work = readFileSync("apps/www/src/data/work.ts", "utf8");
  assert.match(mdx, /occurrenceId="cced-council-approval"/);
  assert.match(mdx, /does not by itself establish that a funding agreement was executed/);
  assert.match(work, /years: "2017 onward"/);
  assert.doesNotMatch(work, /Council later accepted/);
});

test("an intake-linked source without decomposition fails KB-003", () => {
  const candidate = structuredClone(knowledgeBank);
  const sourceId = candidate.intake[0].sourceIds[0];
  candidate.sourceAssertions = candidate.sourceAssertions.filter(
    (assertion) => assertion.sourceId !== sourceId
  );

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const sourceDecomposition = result.results.find(
    (entry) => entry.eval_id === "KB-003"
  );
  assert.equal(sourceDecomposition.pass, false);
  assert.match(sourceDecomposition.findings.join("\n"), /no atomic assertion/);
});

test("a research-stage claim cannot become projection-eligible", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (entry) => entry.id === "CLM-NAC-CREATION-ROLE"
  );
  claim.projectionEligibility = "eligible";

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const maturityIntegrity = result.results.find(
    (entry) => entry.eval_id === "KB-004"
  );
  assert.equal(maturityIntegrity.pass, false);
  assert.match(maturityIntegrity.findings.join("\n"), /eligible before confirmation/);
});

test("hybrid criteria cannot pass without an independent scorecard", () => {
  const result = evaluateKnowledgeBank(suite, knowledgeBank, 2);
  assert.equal(result.status, "iterate");
  assert.equal(
    result.results.find((entry) => entry.eval_id === "KB-007").pass,
    false
  );
});
