import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../../", import.meta.url);

function read(relativePath) {
  return readFileSync(new URL(relativePath, root), "utf8");
}

test("NYC Jobs source contract binds the dataset revision, strong-match gate, and public boundary", () => {
  const config = JSON.parse(read("evals/opportunity-intake/nyc-jobs.json"));
  assert.equal(config.schemaVersion, 1);
  assert.equal(config.source.datasetId, "pda4-rgn4");
  assert.equal(config.source.parentDatasetId, "kpav-sd4t");
  assert.equal(config.state.rowsUpdatedAt, 1787079680);
  assert.equal(config.state.rowsUpdatedAtIso, "2026-08-18T19:01:20.000Z");
  assert.equal(config.policy.salaryFloorAnnual, 100000);
  assert.ok(config.policy.strongMatchThreshold >= 80);
  assert.ok(config.policy.minimumFitScore >= 75);
  assert.ok(config.policy.minimumSecurabilityScore >= 65);
  assert.match(config.admissionBoundary, /candidate intake/i);
  assert.match(config.admissionBoundary, /individual official posting/i);
  assert.ok(config.humanGates.some((gate) => /application submission/i.test(gate)));
});

test("daily workflow keeps recipient and credentials in secrets and runs deterministic gates first", () => {
  const workflow = read(".github/workflows/nyc-jobs-opportunity-digest.yml");
  assert.match(workflow, /cron:/);
  assert.match(workflow, /opportunities:nyc:eval/);
  assert.match(workflow, /opportunities:nyc:daily/);
  assert.match(workflow, /OPPORTUNITY_DIGEST_TO:.*secrets\.OPPORTUNITY_DIGEST_TO/);
  assert.match(workflow, /RESEND_API_KEY:.*secrets\.RESEND_API_KEY/);
  assert.match(workflow, /--candidate-queue \.tmp\/nyc-jobs\/revision-marker\/candidate-queue\.json/);
  assert.match(workflow, /output\/nyc-jobs-candidate-queue\.json \.tmp\/nyc-jobs\/revision-marker\/candidate-queue\.json/);
  assert.doesNotMatch(workflow, /jamie@ohai\.us/i);
  assert.ok(workflow.indexOf("opportunities:nyc:eval") < workflow.indexOf("opportunities:nyc:daily"));
});

test("knowledge source records weekly cadence and discovery-only authority", () => {
  const source = read("docs/knowledge-bank/sources/nyc-jobs-open-data-pda4-rgn4.md");
  assert.match(source, /2026-08-18T19:01:20\.000Z/);
  assert.match(source, /weekly/i);
  assert.match(source, /discovery/i);
  assert.match(source, /individual official posting/i);
  assert.match(source, /community-created filtered view/i);
});

test("the committed candidate queue contains only public-safe threshold-clearing summaries", () => {
  const queue = JSON.parse(read("reports/opportunities/nyc-jobs-candidate-queue.json"));
  assert.equal(queue.sourceDatasetId, "pda4-rgn4");
  assert.ok(queue.candidates.length > 0);
  assert.ok(queue.candidates.every(({ admitted, subjectiveReviewEligible }) => admitted && subjectiveReviewEligible));
  assert.ok(queue.candidates.every(({ verificationState }) => verificationState === "candidate-needs-official-posting-verification"));
  assert.doesNotMatch(JSON.stringify(queue), /recruitment_contact|minimum_qual_requirements|job_description/);
});
