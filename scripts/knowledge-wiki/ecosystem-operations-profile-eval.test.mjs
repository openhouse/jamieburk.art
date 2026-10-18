import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  evaluateEcosystemOperationsProfile,
  loadEcosystemOperationsProfile
} from "./ecosystem-operations-profile-eval.mjs";

const profile = loadEcosystemOperationsProfile();

function cloneProfile() {
  return structuredClone(profile);
}

test("the cross-repository ecosystem profile passes", () => {
  const evaluation = evaluateEcosystemOperationsProfile({ profile });
  assert.deepEqual(evaluation.failures, []);
  assert.deepEqual(evaluation.counts, { branches: 7, blockingCriteria: 18 });
});

test("a moved source branch invalidates its prior close reading", () => {
  const mutated = cloneProfile();
  mutated.branches[0].observedRevision = "a".repeat(40);
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.branch_review_exact, false);
});

test("a remote revision mismatch invalidates the exact candidate", () => {
  const remoteRevisions = Object.fromEntries(
    profile.branches.map((item) => [item.branch, item.reviewedRevision])
  );
  remoteRevisions[profile.branches[2].branch] = "b".repeat(40);
  const evaluation = evaluateEcosystemOperationsProfile({ profile, remoteRevisions });
  assert.equal(evaluation.checks.branch_review_exact, false);
});

test("all three graph responsibilities remain explicit", () => {
  const mutated = cloneProfile();
  mutated.graphResponsibilities.pop();
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.three_graph_responsibilities_explicit, false);
});

test("materialized views cannot become canonical truth", () => {
  const mutated = cloneProfile();
  mutated.canonicality.materializedViews = "canonical-source-of-truth";
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.generated_views_noncanonical, false);
});

test("subjective roleplay cannot run before deterministic gates", () => {
  const mutated = cloneProfile();
  mutated.evaluationOrder = [
    "subjective-roleplay",
    ...mutated.evaluationOrder.filter((item) => item !== "subjective-roleplay")
  ];
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.deterministic_checks_precede_roleplay, false);
});

test("a named lens cannot grant human approval", () => {
  const mutated = cloneProfile();
  mutated.roleplayContract.mayGrantHumanApproval = true;
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.roleplay_has_no_human_authority, false);
});

test("a situated voice contract cannot authorize impersonation", () => {
  const mutated = cloneProfile();
  mutated.situatedEditorialVoice.purpose = "Impersonate a named person.";
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.situated_voice_is_not_impersonation, false);
});

test("branch presence cannot be treated as agreement", () => {
  const mutated = cloneProfile();
  mutated.branchCoverageContract.branchPresenceIsAgreement = true;
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.exact_revision_source_disposition, false);
});

test("a responsible evidence stop remains a healthy editorial state", () => {
  const evaluation = evaluateEcosystemOperationsProfile({ profile });
  assert.equal(evaluation.checks.responsible_stop_is_healthy, true);

  const mutated = cloneProfile();
  mutated.editorialHealth.insufficientEvidenceMayStillBeHealthy = false;
  mutated.editorialHealth.inventedPatternsAllowed = true;
  const rejected = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(rejected.checks.responsible_stop_is_healthy, false);
});

test("every current governed entity needs an explicit packet state", () => {
  const mutated = cloneProfile();
  mutated.governedEntityPacketContract.legacyStubCountsAsCoverage = true;
  mutated.governedEntityPacketContract.minimumHealthRequirements.pop();
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.governed_entity_packets_complete, false);
});

test("situated support cannot silently become endorsement, authority, or outreach", () => {
  const evaluation = evaluateEcosystemOperationsProfile({ profile });
  assert.equal(evaluation.checks.situated_relationships_preserve_scope_and_authority, true);

  const mutated = cloneProfile();
  mutated.situatedRelationshipContract.attentionIsEndorsement = true;
  mutated.situatedRelationshipContract.relationshipRecommendationMayAuthorizeContact = true;
  mutated.situatedRelationshipContract.contextRequirements =
    mutated.situatedRelationshipContract.contextRequirements.filter(
      (item) => item !== "does-not-establish"
    );
  const rejected = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(
    rejected.checks.situated_relationships_preserve_scope_and_authority,
    false
  );
});

test("deterministic projections remain candidates until separate human decisions", () => {
  const evaluation = evaluateEcosystemOperationsProfile({ profile });
  assert.equal(
    evaluation.checks.projection_runtime_preserves_candidate_and_authority_state,
    true
  );

  const mutated = cloneProfile();
  mutated.projectionRuntimeContract.publicCandidateIsPublished = true;
  mutated.projectionRuntimeContract.automatedOutreachAuthorized = true;
  const rejected = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(
    rejected.checks.projection_runtime_preserves_candidate_and_authority_state,
    false
  );
});

test("private source returns preserve coverage, authorship, identity, and authority", () => {
  const evaluation = evaluateEcosystemOperationsProfile({ profile });
  assert.equal(
    evaluation.checks.private_source_returns_preserve_coverage_authorship_and_authority,
    true
  );

  const mutated = cloneProfile();
  mutated.privateSourceReturnContract.configuredWithoutBaselineIsCovered = true;
  mutated.privateSourceReturnContract.reactionIsAuthoredProse = true;
  mutated.privateSourceReturnContract.directionAndOriginalAuthorPreserved = false;
  mutated.privateSourceReturnContract.identityMergeRequiresIndependentResolution = false;
  mutated.privateSourceReturnContract.automaticCourseChangeAuthorized = true;
  const rejected = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(
    rejected.checks.private_source_returns_preserve_coverage_authorship_and_authority,
    false
  );
});

test("message signals cannot skip evidence states or grant authority", () => {
  const evaluation = evaluateEcosystemOperationsProfile({ profile });
  assert.equal(
    evaluation.checks.message_signal_states_preserve_evidence_and_authority,
    true
  );

  const mutated = cloneProfile();
  mutated.messageSignalStateContract.orderedStates =
    mutated.messageSignalStateContract.orderedStates.filter(
      (item) => item !== "UNKNOWN_OR_OPEN"
    );
  mutated.messageSignalStateContract.boundaries.reactionProvesEndorsement = true;
  mutated.messageSignalStateContract.sourceCoverageReceiptFields.pop();
  mutated.messageSignalStateContract.automaticExternalActionAuthorized = true;
  const rejected = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(
    rejected.checks.message_signal_states_preserve_evidence_and_authority,
    false
  );
});

test("a public surface keeps a correction route and return path", () => {
  const mutated = cloneProfile();
  mutated.publicSurfaceContract = mutated.publicSurfaceContract.filter(
    (item) => item !== "correction-route"
  );
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.public_surface_contract_complete, false);
});

test("private raw material cannot enter an automatic projection", () => {
  const mutated = cloneProfile();
  mutated.projectionBoundary.rawPrivateMaterialAllowed = true;
  mutated.projectionBoundary.automaticPublicProjection = true;
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.selective_projection_and_private_boundaries, false);
});

test("revision movement remains an explicit invalidation trigger", () => {
  const mutated = cloneProfile();
  mutated.invalidationTriggers = mutated.invalidationTriggers.filter(
    (item) => item !== "remote-revision-changed"
  );
  const evaluation = evaluateEcosystemOperationsProfile({ profile: mutated });
  assert.equal(evaluation.checks.change_invalidation_triggers_complete, false);
});

function remoteSnapshot(overrides = {}) {
  return {
    revisions: Object.fromEntries(profile.branches.map((item) => [item.branch, item.reviewedRevision])),
    observedAt: "2026-10-18T13:00:00.000Z",
    complete: true,
    ...overrides
  };
}

test("offline consistency cannot be reported as current GitHub coverage", () => {
  const evaluation = evaluateEcosystemOperationsProfile({ profile });
  assert.equal(evaluation.freshness?.status, "not-checked");
  assert.equal(evaluation.currentAtObservation, false);
  assert.equal(Object.hasOwn(evaluation.checks, "branch_review_exact_and_current"), false);
  assert.equal(evaluateEcosystemOperationsProfile({ profile, requireRemote: true }).passed, false);
});

test("a complete exact remote inventory establishes only its observation-time match", () => {
  const evaluation = evaluateEcosystemOperationsProfile({ profile, remoteInventory: remoteSnapshot() });
  assert.equal(evaluation.currentAtObservation, true);
  assert.equal(evaluation.freshness?.status, "observed-match");
  assert.equal(evaluation.freshness?.observedAt, "2026-10-18T13:00:00.000Z");
  assert.equal(evaluation.passed, true);
});

test("a newly discovered branch reopens review even when every old head matches", () => {
  const remoteInventory = remoteSnapshot();
  remoteInventory.revisions["work/new-source"] = "a".repeat(40);
  const evaluation = evaluateEcosystemOperationsProfile({ profile, remoteInventory });
  assert.equal(evaluation.passed, false);
  assert.equal(evaluation.currentAtObservation, false);
  assert.deepEqual(evaluation.freshness?.unreviewedBranches, ["work/new-source"]);
});

test("deleted and moved branches remain distinct review gaps", () => {
  const remoteInventory = remoteSnapshot();
  delete remoteInventory.revisions[profile.branches[0].branch];
  remoteInventory.revisions[profile.branches[1].branch] = "b".repeat(40);
  const evaluation = evaluateEcosystemOperationsProfile({ profile, remoteInventory });
  assert.equal(evaluation.passed, false);
  assert.deepEqual(evaluation.freshness?.missingBranches, [profile.branches[0].branch]);
  assert.deepEqual(evaluation.freshness?.changedBranches, [profile.branches[1].branch]);
});

for (const [name, overrides] of [
  ["partial", {complete: false}],
  ["undated", {observedAt: undefined}],
  ["impossible-calendar-date", {observedAt: "2026-02-30T13:00:00.000Z"}],
  ["future-dated", {observedAt: "2099-01-01T00:00:00.000Z"}],
  ["malformed", {revisions: {[profile.branches[0].branch]: "not-a-sha"}}]
]) {
  test(`${name} remote inventory cannot certify current coverage`, () => {
    const evaluation = evaluateEcosystemOperationsProfile({ profile, remoteInventory: remoteSnapshot(overrides) });
    assert.equal(evaluation.passed, false);
    assert.equal(evaluation.currentAtObservation, false);
    assert.equal(evaluation.freshness?.status, "incomplete");
  });
}

test("remote reader does not filter away branches absent from the review profile", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "ecosystem-remote-test-"));
  try {
    // A controlled Git transport responds to the requested ref scope. The
    // real reader and CLI parse its output; no network or credentials are used.
    writeFileSync(path.join(directory, "git"), `#!${process.execPath}\nconst refs = {"refs/heads/reviewed": "${"a".repeat(40)}", "refs/heads/newly-listed": "${"b".repeat(40)}"};\nconst filters = process.argv.slice(2).filter(arg => arg.startsWith("refs/heads/"));\nfor (const [ref, sha] of Object.entries(refs)) if (!filters.length || filters.includes(ref)) console.log(sha + "\\t" + ref);\n`, {mode: 0o755});
    const reader = new URL("./ecosystem-operations-profile-eval.mjs", import.meta.url).href;
    const output = execFileSync(process.execPath, ["--input-type=module", "-e", `import {readRemoteRevisions} from ${JSON.stringify(reader)}; console.log(JSON.stringify(readRemoteRevisions({sourceRepository:"example/synthetic",branches:[{branch:"reviewed"}]})));`], {
      encoding: "utf8", env: {...process.env, PATH: `${directory}${path.delimiter}${process.env.PATH}`}
    });
    assert.deepEqual(JSON.parse(output), {reviewed: "a".repeat(40), "newly-listed": "b".repeat(40)});
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
});
