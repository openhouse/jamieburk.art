import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { intakeReceiptSchema } from "../../apps/www/src/data/knowledge-bank/lifecycle-schema.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  validateIntakeReceipts,
  validateKnowledgeLifecycle
} from "../lib/knowledge-lifecycle-validation.mjs";
import { retrieveKnowledgePalette } from "../lib/knowledge-palette.mjs";

function receipts() {
  return readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
}

test("the canonical lifecycle corpus is internally consistent", () => {
  assert.deepEqual(validateKnowledgeLifecycle(), []);
});

test("promoted candidates require canonical claims", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.candidateClaims.find(({ maturity }) => maturity === "promoted").targetCanonicalClaimId = undefined;
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /has no canonical target/);
});

test("unassigned intake remains valid while assigned intake cannot lose its project", () => {
  assert.equal(
    knowledgeLifecycle.leads.find(({ id }) => id === "LEAD-STRUCTURE-GROWS-FROM-MATERIAL")
      .projectAssociationStatus,
    "unassigned"
  );
  const broken = structuredClone(knowledgeLifecycle);
  broken.leads[0].projectIds = [];
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /Assigned lead .* no project association/);
});

test("public compositions cannot require unresolved candidates", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.editorialBriefs[0].candidateClaimIds.push("CND-STRUCTURE-GROWS-FROM-MATERIAL");
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /requires unpromoted candidate/);
});

test("private filesystem paths cannot enter public lifecycle metadata", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.leads[0].publicSummary = "/Users/example/secret/archive";
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /private filesystem locator/);
});

test("observations require candidate-specific evidence relationships", () => {
  const missing = structuredClone(knowledgeLifecycle);
  missing.observations[0].candidateRelationships = [];
  assert.match(validateKnowledgeLifecycle(missing).join("\n"), /candidate-specific relationship/);

  const unrelated = structuredClone(knowledgeLifecycle);
  unrelated.observations[0].candidateRelationships[0].candidateClaimId =
    "CND-CALLNYC-INDEPENDENT-FOLLOW-ON";
  assert.match(validateKnowledgeLifecycle(unrelated).join("\n"), /candidate-specific relationship/);
});

test("observed public sources retain explicit metadata verification", () => {
  const observedSourceIds = new Set(knowledgeLifecycle.observations.map(({ sourceId }) => sourceId));
  for (const source of knowledgeBank.sources.filter(
    ({ id, visibility }) => visibility === "public" && observedSourceIds.has(id)
  )) {
    assert.ok(source.metadataVerifiedAt, `${source.id} metadata review date`);
    assert.ok(source.metadataVerifiedBy, `${source.id} metadata reviewer`);
  }
});

test("promotion targets and exact-surface authorization stay coherent", () => {
  const target = structuredClone(knowledgeLifecycle);
  target.promotionDecisions[0].targetCanonicalClaimId = "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON";
  assert.match(validateKnowledgeLifecycle(target).join("\n"), /target differs/);

  const surface = structuredClone(knowledgeLifecycle);
  surface.promotionDecisions[0].allowedSurfaces = ["knowledge-bank"];
  assert.match(validateKnowledgeLifecycle(surface).join("\n"), /lacks active human approval/);
});

test("public briefs require real human approval", () => {
  const broken = structuredClone(knowledgeLifecycle);
  const decision = broken.promotionDecisions.find(
    ({ id }) => id === "DEC-CALLNYC-EVENT-TIME-PROMOTE"
  );
  decision.humanReviewStatus = "pending";
  decision.reviewAuthority = "research-review";
  decision.humanReviewer = undefined;
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /lacks active human approval/);
});

test("public briefs cannot bypass promotion or silently omit page claims", () => {
  const bypass = structuredClone(knowledgeLifecycle);
  bypass.editorialBriefs[0].candidateClaimIds = ["CND-CALLNYC-EVENT-TIME"];
  assert.match(validateKnowledgeLifecycle(bypass).join("\n"), /bypasses lifecycle promotion/);

  const omission = structuredClone(knowledgeLifecycle);
  omission.editorialBriefs[0].pageClaimExclusions = [];
  assert.match(validateKnowledgeLifecycle(omission).join("\n"), /neither selects nor explicitly excludes/);
});

test("offline lifecycle records are not exported through the application barrel", () => {
  const barrel = readFileSync("apps/www/src/data/knowledge-bank/index.ts", "utf8");
  assert.doesNotMatch(barrel, /lifecycle-(?:records|schema)/);
});

test("the intake command emits assigned and unassigned validated leads", () => {
  const assigned = JSON.parse(
    execFileSync(
      process.execPath,
      [
        "scripts/intake-knowledge-lead.mjs",
        "--title",
        "A useful new memory",
        "--kind",
        "memory",
        "--summary",
        "A public-safe reminder for later research.",
        "--project",
        "PRJ-CALLNYC",
        "--date",
        "2026-07-16"
      ],
      { encoding: "utf8" }
    )
  );
  assert.equal(assigned.projectAssociationStatus, "assigned");

  const unassigned = JSON.parse(
    execFileSync(
      process.execPath,
      [
        "scripts/intake-knowledge-lead.mjs",
        "--title",
        "An unassigned fragment",
        "--kind",
        "memory",
        "--summary",
        "A public-safe fragment whose project is not known yet.",
        "--date",
        "2026-07-16"
      ],
      { encoding: "utf8" }
    )
  );
  assert.equal(unassigned.projectAssociationStatus, "unassigned");
  assert.deepEqual(unassigned.projectIds, []);
});

test("tracked receipts preserve immutable capture facts", () => {
  assert.deepEqual(validateIntakeReceipts(receipts()), []);
  const broken = receipts();
  broken[0].publicSummary = "Rewritten capture fact";
  assert.match(validateIntakeReceipts(broken).join("\n"), /immutable field publicSummary differs/);
});

test("every incorporated lead retains an append-only receipt", () => {
  const broken = receipts().filter(({ id }) => id !== knowledgeLifecycle.leads[0].id);
  assert.match(validateIntakeReceipts(broken).join("\n"), /has no append-only intake receipt/);
});

test("candidate maturity cannot drift from append-only events", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.candidateEvents.find(
    ({ candidateClaimId }) => candidateClaimId === "CND-STRUCTURE-GROWS-FROM-MATERIAL"
  ).toMaturity = "promoted";
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /maturity differs from its latest event/);
});

test("intake rejects unknown graph associations", () => {
  const result = spawnSync(
    process.execPath,
    [
      "scripts/intake-knowledge-lead.mjs",
      "--title",
      "Unknown project",
      "--kind",
      "memory",
      "--summary",
      "A public-safe sentence.",
      "--project",
      "PRJ-NOT-REAL"
    ],
    { encoding: "utf8" }
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown project/);
});

test("intake requires explicit duplicate disposition", () => {
  const common = [
    "scripts/intake-knowledge-lead.mjs",
    "--title",
    "Politico New York CallNYC coverage",
    "--kind",
    "source-url",
    "--summary",
    "Independent reporting connects Jamie to the event, fuller data release, and subsequent development of CallNYC.",
    "--project",
    "PRJ-CALLNYC",
    "--url",
    "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf"
  ];
  const rejected = spawnSync(process.execPath, common, { encoding: "utf8" });
  assert.notEqual(rejected.status, 0);
  assert.match(rejected.stderr, /Likely duplicate/);
  const accepted = JSON.parse(
    execFileSync(
      process.execPath,
      [...common, "--duplicate-of", "LEAD-CALLNYC-POLITICO"],
      { encoding: "utf8" }
    )
  );
  assert.equal(accepted.duplicateOfLeadId, "LEAD-CALLNYC-POLITICO");
});

test("editorial queries return a selective, purpose-specific palette", () => {
  const palette = retrieveKnowledgePalette({ briefId: "BRIEF-CALLNYC-APPLICATION" });
  assert.deepEqual(palette.projects.map(({ id }) => id), ["PRJ-CALLNYC"]);
  assert.equal(palette.candidates.length, 2);
  assert.ok(palette.candidates.every(({ maturity }) => maturity === "promoted"));
  assert.ok(palette.proofs.some(({ id }) => id === "callnyc-civic-data-guidance"));
});

test("publication-safe retrieval fails closed to an exact authorized surface", () => {
  assert.throws(
    () => retrieveKnowledgePalette({ publicationSafe: true }),
    /requires an exact surface/
  );
  const publicCallNyc = retrieveKnowledgePalette({
    surface: "/work/callnyc",
    publicationSafe: true
  });
  assert.equal(publicCallNyc.candidates.length, 2);
  assert.ok(publicCallNyc.publicationAuthorizations.every(({ authorized }) => authorized));
  assert.ok(
    !publicCallNyc.candidates.some(({ id }) => id === "CND-STRUCTURE-GROWS-FROM-MATERIAL")
  );
});
