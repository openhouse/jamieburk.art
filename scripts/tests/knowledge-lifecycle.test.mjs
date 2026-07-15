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

test("the July 13 ten-source ingestion remains complete and decomposed", () => {
  const sourceIds = [
    "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017",
    "SRC-SUNDAY-DINNER-PUBLIC-ARCHIVE",
    "SRC-NYCA-CABARET-CAMPAIGN-2017",
    "SRC-NYCA-SAVE-NYC-SPACES",
    "SRC-NYCA-MIXMAG-CABARET-2017",
    "SRC-NYCA-BEDFORD-BOWERY-TOWN-HALL-2017",
    "SRC-NYCA-COUNCIL-COMMERCIAL-RENT-2018",
    "SRC-KC-TOWN-HALL-CCED-2019",
    "SRC-KC-TOWN-HALL-CCED-2021",
    "SRC-CLAUDETTE-MICHAEL-REES"
  ];
  const canonicalSources = new Set(knowledgeBank.sources.map(({ id }) => id));
  const observedSources = new Set(knowledgeLifecycle.observations.map(({ sourceId }) => sourceId));
  const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-INGESTION-2026-07-13");

  assert.equal(sourceIds.length, 10);
  assert.ok(sourceIds.every((id) => canonicalSources.has(id)));
  assert.ok(sourceIds.every((id) => observedSources.has(id)));
  assert.deepEqual(task?.sourceIds, sourceIds);
  assert.equal(task?.status, "completed");
});

test("new public projections preserve exact-surface human approval", () => {
  const expected = new Map([
    ["CND-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING", "/work/196-sunday-dinner"],
    ["CND-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL", "/work/fair-rent-nyc"],
    ["CND-NYCA-COMMERCIAL-RENT-ADVOCACY", "/work/fair-rent-nyc"],
    ["CND-KC-TOWN-HALL-PUBLIC-RECORD", "/work/kc-town-hall"]
  ]);
  const superseded = new Set(
    knowledgeLifecycle.promotionDecisions.map(({ supersedesDecisionId }) => supersedesDecisionId).filter(Boolean)
  );

  for (const [candidateId, surface] of expected) {
    const candidate = knowledgeLifecycle.candidateClaims.find(({ id }) => id === candidateId);
    const decision = knowledgeLifecycle.promotionDecisions.find(({ id }) => candidate?.promotionDecisionIds.includes(id) && !superseded.has(id));
    assert.equal(candidate?.maturity, "promoted");
    assert.equal(decision?.reviewAuthority, "jamie-approved");
    assert.equal(decision?.humanReviewStatus, "approved");
    assert.ok(decision?.allowedSurfaces.includes(surface));
  }
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
  omission.editorialBriefs[0].canonicalClaimIds = omission.editorialBriefs[0].canonicalClaimIds.filter((id) => id !== "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON");
  assert.match(validateKnowledgeLifecycle(omission).join("\n"), /neither selects nor explicitly excludes/);
});

test("every active canonical projection requires current exact-surface human approval", () => {
  const broken = structuredClone(knowledgeLifecycle);
  const decision = broken.promotionDecisions.find(({ id }) => id === "DEC-CALLNYC-FIRST-COUNCILSTAT-PROMOTE");
  decision.humanReviewStatus = "pending";
  decision.reviewAuthority = "research-review";
  decision.humanReviewer = undefined;
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /Active canonical projection .* lacks current human approval/);
});

test("proof surface manifests prevent publication outside exact human-approved selections", () => {
  const missing = structuredClone(knowledgeLifecycle);
  const homepage = missing.proofSurfaceManifests.find(({ route }) => route === "/");
  homepage.proofIds = homepage.proofIds.filter((id) => id !== "hje-revenue-growth-contribution");
  assert.match(validateKnowledgeLifecycle(missing).join("\n"), /Public proof hje-revenue-growth-contribution lacks exact-surface human approval for homepage/);

  const wrongSurface = structuredClone(knowledgeLifecycle);
  wrongSurface.proofSurfaceManifests.find(({ route }) => route === "/lab/source-backed-team-memory").proofIds.push("hje-revenue-growth-contribution");
  assert.match(validateKnowledgeLifecycle(wrongSurface).join("\n"), /selects hje-revenue-growth-contribution outside lab/);

  const pending = structuredClone(knowledgeLifecycle);
  pending.proofSurfaceManifests.find(({ route }) => route === "/resume").humanReviewStatus = "pending";
  assert.match(validateKnowledgeLifecycle(pending).join("\n"), /lacks active human approval/);

  const duplicateRoute = structuredClone(knowledgeLifecycle);
  duplicateRoute.proofSurfaceManifests[1].route = "/";
  assert.match(validateKnowledgeLifecycle(duplicateRoute).join("\n"), /Multiple proof surface manifests govern \//);
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

test("self-reported aggregates retain their qualifier through public composition", () => {
  const broken = structuredClone(knowledgeLifecycle);
  const residency = broken.candidateClaims.find(({ id }) => id === "CND-196-ARTISTS-RESIDENCY-FOUNDER-SCALE");
  residency.publicEvidenceQualifier.acceptedPhrases = ["independently verified"];
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /drops the self-reported evidence qualifier/);

  const proof = knowledgeLifecycle.proofSurfaceManifests.find(({ route }) => route === "/work/196-sunday-dinner");
  assert.deepEqual(proof?.proofIds, ["sunday-dinner-196-participation-infrastructure"]);
  assert.match(readFileSync("apps/www/src/data/work.ts", "utf8"), /reports supporting 20\+ resident artists/);
  assert.match(readFileSync("apps/www/src/app/work/technical-operations/page.tsx", "utf8"), /report building repeatable support systems for 20\+ resident artists/);
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
  assert.equal(publicCallNyc.candidates.length, 5);
  assert.deepEqual(publicCallNyc.projects.map(({ id }) => id), ["PRJ-CALLNYC"]);
  assert.ok(publicCallNyc.publicationAuthorizations.every(({ authorized }) => authorized));

  const homepageProofs = retrieveKnowledgePalette({ proofSurface: "/", publicationSafe: true });
  assert.equal(homepageProofs.proofSurfaceManifest?.id, "MANIFEST-PROOFS-HOMEPAGE");
  assert.deepEqual(
    homepageProofs.proofs.map(({ id }) => id),
    homepageProofs.proofSurfaceManifest?.proofIds
  );

  const sundayDinnerProofs = retrieveKnowledgePalette({ proofSurface: "/work/196-sunday-dinner", publicationSafe: true });
  assert.deepEqual(sundayDinnerProofs.projects.map(({ id }) => id), ["PRJ-SUNDAY-DINNER-196"]);
  assert.deepEqual(sundayDinnerProofs.proofs.map(({ id }) => id), ["sunday-dinner-196-participation-infrastructure"]);

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
