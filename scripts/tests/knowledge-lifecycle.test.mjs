import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { intakeReceiptSchema } from "../../apps/www/src/data/knowledge-bank/lifecycle-schema.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { validateIntakeReceipts, validateKnowledgeLifecycle } from "../lib/knowledge-lifecycle-validation.mjs";
import { retrieveKnowledgePalette } from "../lib/knowledge-palette.mjs";

test("the canonical lifecycle corpus is internally consistent", () => {
  assert.deepEqual(validateKnowledgeLifecycle(), []);
});

test("promoted candidates require canonical claims", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.candidateClaims.find(({ maturity }) => maturity === "promoted").targetCanonicalClaimId = undefined;
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /has no canonical target/);
});

test("public compositions cannot require unresolved candidates", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.editorialBriefs[0].candidateClaimIds = ["CND-NYCA-MARCH-DISBANDMENT"];
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /requires unpromoted candidate/);
});

test("private filesystem paths cannot enter public lifecycle metadata", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.leads[0].publicSummary = "/Users/example/secret/archive";
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /private filesystem locator/);
});

test("semantic cross-links cannot be replaced with unrelated valid IDs", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.candidateClaims[0].observationIds = ["OBS-COUNCIL-CABARET-OUTCOME"];
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /not linked back|no project overlap/);
});

test("live-source publication dates and locator verification remain pinned", () => {
  const dates = Object.fromEntries(knowledgeBank.sources.map(({ id, publishedAt }) => [id, publishedAt]));
  assert.equal(dates["SRC-WATERWAYS-PITCH-HUCK-FINN-2007"], "2007-08-09");
  assert.equal(dates["SRC-WATERWAYS-CHARLOTTE-STREET-2009"], "2009-09-01");
  assert.equal(dates["SRC-NYC-MAYOR-MARCH-CURE-2023"], "2023-12-28");
  const observedPublicSources = new Set(knowledgeLifecycle.observations.map(({ sourceId }) => sourceId));
  for (const source of knowledgeBank.sources.filter(({ id, visibility }) => visibility === "public" && observedPublicSources.has(id))) {
    assert.ok(source.metadataVerifiedAt, `${source.id} metadata review date`);
    assert.ok(source.metadataVerifiedBy, `${source.id} metadata reviewer`);
  }
});

test("promotion targets and supersession references stay coherent", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.promotionDecisions[0].targetCanonicalClaimId = "CLM-NYCA-TALKS-NOT-RAIDS-ADVOCACY";
  broken.promotionDecisions[1].supersedesDecisionId = "DEC-NOT-REAL";
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /target differs/);
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /supersedes unknown/);
});

test("public briefs resolve to claims actually used on their target pages", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.editorialBriefs[0].canonicalClaimIds = ["CLM-WATERWAYS-RAFT-EXPEDITION-2007"];
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /not present on a target page/);
});

test("public briefs require active human approval for their exact surfaces", () => {
  const broken = structuredClone(knowledgeLifecycle);
  const decision = broken.promotionDecisions.find(({ id }) => id === "DEC-CALLNYC-EVENT-TIME-CORRECT");
  decision.humanReviewStatus = "pending";
  decision.reviewAuthority = "research-review";
  decision.humanReviewer = undefined;
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /lacks active human approval/);

  const held = structuredClone(knowledgeLifecycle);
  const heldDecision = held.promotionDecisions.find(({ id }) => id === "DEC-CALLNYC-EVENT-TIME-CORRECT");
  heldDecision.decision = "hold";
  assert.match(validateKnowledgeLifecycle(held).join("\n"), /lacks active human approval/);
});

test("public briefs cannot bypass lifecycle approval or silently omit page claims", () => {
  const bypass = structuredClone(knowledgeLifecycle);
  bypass.editorialBriefs[0].candidateClaimIds = bypass.editorialBriefs[0].candidateClaimIds.filter((id) => id !== "CND-CALLNYC-INDEPENDENT-FOLLOW-ON");
  assert.match(validateKnowledgeLifecycle(bypass).join("\n"), /bypasses lifecycle promotion/);
  const omission = structuredClone(knowledgeLifecycle);
  omission.editorialBriefs[0].pageClaimExclusions = [];
  assert.match(validateKnowledgeLifecycle(omission).join("\n"), /neither selects nor explicitly excludes/);
});

test("offline lifecycle records are not exported through the application barrel", () => {
  const barrel = readFileSync("apps/www/src/data/knowledge-bank/index.ts", "utf8");
  assert.doesNotMatch(barrel, /lifecycle-(?:records|schema)/);
});

test("the intake command emits a validated capture receipt", () => {
  const output = execFileSync(process.execPath, [
    "scripts/intake-knowledge-lead.mjs",
    "--title", "A useful new memory",
    "--kind", "memory",
    "--summary", "A public-safe reminder for later research.",
    "--project", "PRJ-CALLNYC",
    "--date", "2026-07-12"
  ], { encoding: "utf8" });
  const receipt = JSON.parse(output);
  assert.equal(receipt.state, "captured");
  assert.equal(receipt.visibility, "public-safe");
  assert.deepEqual(receipt.projectIds, ["PRJ-CALLNYC"]);
});

test("the tracked append-only intake receipts remain valid", () => {
  const receipts = readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8")
    .split("\n").filter(Boolean).map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
  assert.deepEqual(validateIntakeReceipts(receipts), []);
});

test("every incorporated lead retains its append-only capture receipt", () => {
  const receipts = readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8")
    .split("\n").filter(Boolean).map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
  const broken = receipts.filter(({ id }) => id !== knowledgeLifecycle.leads[0].id);
  assert.match(validateIntakeReceipts(broken).join("\n"), /has no append-only intake receipt/);
});

test("immutable receipts permit later lead triage and research associations", () => {
  const receipts = readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8")
    .split("\n").filter(Boolean).map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
  const evolved = structuredClone(knowledgeLifecycle);
  evolved.leads[0].state = "held";
  evolved.leads[0].researchTaskIds = ["TASK-WATERWAYS-RAFT-ENDPOINT", "TASK-WATERWAYS-PROGRAM-RANGE"];
  assert.deepEqual(validateIntakeReceipts(receipts, evolved), []);
});

test("candidate maturity and research-run implication histories cannot drift", () => {
  const brokenHistory = structuredClone(knowledgeLifecycle);
  brokenHistory.candidateEvents.find(({ candidateClaimId }) => candidateClaimId === "CND-WATERWAYS-RAFT-GULF-ENDPOINT").toMaturity = "promoted";
  assert.match(validateKnowledgeLifecycle(brokenHistory).join("\n"), /maturity differs from its latest event/);
  const brokenTask = structuredClone(knowledgeLifecycle);
  const ingestion = brokenTask.researchTasks.find(({ id }) => id === "TASK-INGESTION-2026-07-12");
  ingestion.candidateClaimIds = ingestion.candidateClaimIds.filter((id) => id !== "CND-NYCA-MARCH-DISBANDMENT");
  assert.match(validateKnowledgeLifecycle(brokenTask).join("\n"), /implicates unlinked candidate/);
});

test("intake rejects unknown graph associations", () => {
  const result = spawnSync(process.execPath, [
    "scripts/intake-knowledge-lead.mjs",
    "--title", "Unknown project",
    "--kind", "memory",
    "--summary", "A public-safe sentence.",
    "--project", "PRJ-NOT-REAL"
  ], { encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown project/);
});

test("intake preserves a bare public URL before canonical source registration", () => {
  const output = execFileSync(process.execPath, [
    "scripts/intake-knowledge-lead.mjs",
    "--title", "New public source",
    "--kind", "source-url",
    "--summary", "A public page requiring later source decomposition.",
    "--project", "PRJ-CALLNYC",
    "--url", "https://example.org/new-source"
  ], { encoding: "utf8" });
  const lead = JSON.parse(output);
  const receipt = intakeReceiptSchema.parse({
    receiptVersion: 1,
    id: lead.id,
    title: lead.title,
    kind: lead.kind,
    capturedAt: lead.capturedAt,
    capturedBy: lead.capturedBy,
    visibility: lead.visibility,
    publicSummary: lead.publicSummary,
    initialProjectIds: lead.projectIds,
    initialEntityIds: lead.entityIds,
    initialSourceIds: lead.sourceIds,
    publicUrl: lead.publicUrl
  });
  assert.equal(receipt.publicUrl, "https://example.org/new-source");
  assert.deepEqual(receipt.initialSourceIds, []);
});

test("intake requires explicit duplicate disposition", () => {
  const common = [
    "scripts/intake-knowledge-lead.mjs",
    "--title", "The Pitch raft profile",
    "--kind", "source-url",
    "--summary", "Contemporaneous reporting on Jamie's expedition concept and a collective raft crossing of Missouri.",
    "--project", "PRJ-WATERWAYS-PARTICIPATORY-ART",
    "--url", "https://www.thepitchkc.com/when-artists-turn-huck-finn/"
  ];
  const rejected = spawnSync(process.execPath, common, { encoding: "utf8" });
  assert.notEqual(rejected.status, 0);
  assert.match(rejected.stderr, /Likely duplicate/);
  const accepted = execFileSync(process.execPath, [...common, "--duplicate-of", "LEAD-PITCH-RAFT-2007"], { encoding: "utf8" });
  assert.equal(JSON.parse(accepted).duplicateOfLeadId, "LEAD-PITCH-RAFT-2007");
});

test("editorial briefs resolve a selective, purpose-specific palette", () => {
  const current = retrieveKnowledgePalette({ briefId: "BRIEF-JOB-APPLICATION-CURRENT" });
  assert.deepEqual(current.projects.map(({ id }) => id), ["PRJ-CALLNYC"]);
  assert.ok(current.canonicalClaims.some(({ id }) => id === "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"));
  assert.ok(!current.candidates.some(({ maturity }) => maturity !== "promoted"));

  const nightlife = retrieveKnowledgePalette({ briefId: "BRIEF-NIGHTLIFE-FUTURE" });
  assert.ok(nightlife.candidates.some(({ id }) => id === "CND-NYCA-MARCH-DISBANDMENT"));
  assert.ok(nightlife.proofs.some(({ id }) => id === "nyc-artist-coalition-civic-systems"));

  const publicCallNyc = retrieveKnowledgePalette({ surface: "/work/callnyc", publicationSafe: true });
  assert.equal(publicCallNyc.candidates.length, 3);
  assert.ok(publicCallNyc.publicationAuthorizations.every(({ authorized }) => authorized));

  const plannedNightlife = retrieveKnowledgePalette({ surface: "future-nightlife-case-study" });
  const publicNightlife = retrieveKnowledgePalette({ surface: "future-nightlife-case-study", publicationSafe: true });
  assert.ok(plannedNightlife.candidates.length > 0);
  assert.deepEqual(publicNightlife.candidates, []);
  assert.throws(() => retrieveKnowledgePalette({ publicationSafe: true }), /requires an exact surface/);
});

test("retrieval composes cross-project palettes by time, entity, evidence, priority, audience, and purpose", () => {
  const earlyPractice = retrieveKnowledgePalette({
    entityId: "ENT-JAMIE-BURKART",
    fromYear: 2006,
    toYear: 2009,
    evidenceRole: "direct-support"
  });
  assert.deepEqual(earlyPractice.projects.map(({ id }) => id), [
    "PRJ-WATERWAYS-PARTICIPATORY-ART",
    "PRJ-GREAT-ACCOMMODATIONS",
    "PRJ-OPEN-HOUSE"
  ]);
  assert.ok(earlyPractice.candidates.every(({ observationIds }) => observationIds.some((id) => knowledgeLifecycle.observations.find((item) => item.id === id)?.evidenceRole === "direct-support")));

  const policy = retrieveKnowledgePalette({
    sourceKind: "government-record",
    researchPriority: "high",
    audienceTag: "public-interest-operations",
    purposeTag: "cultural-infrastructure"
  });
  assert.deepEqual(policy.briefs.map(({ id }) => id), ["BRIEF-NIGHTLIFE-FUTURE"]);
  assert.ok(policy.candidates.some(({ id }) => id === "CND-NYCA-MARCH-DISBANDMENT"));

  const empty = retrieveKnowledgePalette({
    briefId: "BRIEF-NIGHTLIFE-FUTURE",
    capability: "product development"
  });
  assert.deepEqual(empty.projects, []);
  assert.deepEqual(empty.candidates, []);
  assert.deepEqual(empty.canonicalClaims, []);
  assert.deepEqual(empty.proofs, []);
  assert.deepEqual(empty.researchTasks, []);
  assert.deepEqual(empty.mediaLeads, []);
});
