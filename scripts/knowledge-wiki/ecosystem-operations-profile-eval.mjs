import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defaultRepoRoot } from "./lib.mjs";

const expectedBranches = [
  "work/2026-08-26-A",
  "work/2026-08-26-B",
  "work/2026-08-26-C",
  "work/2026-08-26-D",
  "work/2026-08-26-monday-A",
  "work/2026-08-26-monday-B",
  "work/2026-08-26-monday-C"
];

const expectedGraphs = [
  "evidence-provenance-custody",
  "agency-people-teams-authority",
  "projection-pages-evals-actions"
];

const expectedEvaluationOrder = [
  "source-freshness",
  "schema-and-reference",
  "privacy-rights-consent",
  "authority",
  "subjective-roleplay"
];

const expectedPublicSurfaceContract = [
  "affected-people",
  "purpose",
  "current-invitation",
  "human-action",
  "correction-route",
  "return-path"
];

const expectedInvalidationTriggers = [
  "remote-revision-changed",
  "new-source-branch-listed",
  "registered-source-route-changed",
  "private-source-coverage-changed",
  "decoder-contract-changed",
  "message-state-contract-changed",
  "governed-entity-registry-changed",
  "implementation-changed",
  "public-private-boundary-changed",
  "evaluation-contract-changed"
];

const expectedHumanDecisions = [
  "claim-maturity",
  "rights-and-consent",
  "publication",
  "external-action",
  "merge",
  "deployment"
];

const expectedSituatedRelations = [
  "legislative-sponsorship",
  "artifact-signatory",
  "supportive-testimony",
  "supportive-public-statement",
  "editorial-endorsement",
  "press-coverage",
  "social-amplification",
  "social-interaction",
  "attendance-or-participation",
  "relationship-warmth"
];

const expectedRelationshipContext = [
  "actor",
  "relation",
  "exact-object",
  "campaign-or-matter",
  "situated-context",
  "occurrence-date",
  "observation-date",
  "role-at-time",
  "source-basis",
  "does-not-establish",
  "correction-route"
];

const expectedDecoderHazards = [
  "reaction-echo",
  "mirrored-target-body",
  "serialization-debris",
  "attachment-placeholder"
];

const expectedMessageSignalStates = [
  "MESSAGE_PRESENT",
  "DELIVERY_REPORTED",
  "READ_REPORTED",
  "REACTION_RECORDED",
  "REPLY_RECORDED",
  "SCHEDULING_ACCEPTED",
  "ROLE_ACCEPTED",
  "ASSIGNMENT_ACCEPTED",
  "ACTION_COMPLETED",
  "ENDORSEMENT_EXPLICIT",
  "AUTHORITY_VERIFIED",
  "UNKNOWN_OR_OPEN"
];

const expectedCoverageReceiptFields = [
  "account-or-custody-boundary",
  "authorized-subjects-and-date-range",
  "query-or-selection-method",
  "access-time-result-count-pagination-and-cutoff",
  "attachments-or-media-coverage",
  "unread-state-policy",
  "can-and-cannot-establish",
  "known-blind-spots-and-likely-consequence",
  "next-review-trigger",
  "human-authority-before-action"
];

function sameOrdered(left = [], right = []) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

function sameSet(left = [], right = []) {
  return left.length === right.length && left.every((item) => right.includes(item));
}

export function loadEcosystemOperationsProfile(repoRoot = defaultRepoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/ecosystem-operations-profile.json"),
      "utf8"
    )
  );
}

export function evaluateEcosystemOperationsProfile(options = {}) {
  const profile = options.profile ?? loadEcosystemOperationsProfile(options.repoRoot);
  const remoteInventory = options.remoteInventory;
  // Legacy revision maps can invalidate a review, but cannot prove complete,
  // dated coverage. Offline checks establish historical consistency only.
  const remoteRevisions = remoteInventory?.revisions ?? options.remoteRevisions;
  const branches = profile.branches ?? [];
  const branchNames = branches.map((item) => item.branch);
  const branchRevisionPattern = /^[0-9a-f]{40}$/;

  const profileMaterialized =
    profile.schemaVersion === 1 &&
    profile.profileId === "knowledge-wiki-graph-ecosystem-operations-2026-08-29" &&
    profile.sourceRepository ===
      "openhouse/jamie-burkart-nyc-artist-coalition-fair-rent-nyc-knowledge-operations" &&
    /^\d{4}-\d{2}-\d{2}$/.test(profile.reviewedAt ?? "") &&
    profile.reviewAuthority === "research-and-proposal-only" &&
    profile.publicationAuthority === "separate-human-review";

  const exactReviewedSnapshot =
    sameOrdered(branchNames, expectedBranches) &&
    branches.every(
      (item) =>
        branchRevisionPattern.test(item.observedRevision ?? "") &&
        item.observedRevision === item.reviewedRevision &&
        (!remoteRevisions || remoteRevisions[item.branch] === item.reviewedRevision)
    );

  const remoteRequested = options.requireRemote === true ||
    remoteInventory !== undefined || options.remoteRevisions !== undefined;
  const observedTime = Date.parse(remoteInventory?.observedAt ?? "");
  const remoteComplete = remoteInventory?.complete === true &&
    typeof remoteInventory.observedAt === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(remoteInventory.observedAt) &&
    Number.isFinite(observedTime) && observedTime <= Date.now() &&
    new Date(observedTime).toISOString().replace(".000Z", "Z") ===
      remoteInventory.observedAt.replace(".000Z", "Z") &&
    remoteRevisions !== null && typeof remoteRevisions === "object" &&
    !Array.isArray(remoteRevisions) && Object.keys(remoteRevisions).length > 0 &&
    Object.values(remoteRevisions).every((sha) => branchRevisionPattern.test(sha));
  const observedBranches = remoteRevisions && typeof remoteRevisions === "object"
    ? Object.keys(remoteRevisions) : [];
  const unreviewedBranches = observedBranches.filter((name) => !branchNames.includes(name)).sort();
  const missingBranches = branchNames.filter((name) => !observedBranches.includes(name)).sort();
  const changedBranches = branches.filter((item) => observedBranches.includes(item.branch) &&
    remoteRevisions[item.branch] !== item.reviewedRevision).map((item) => item.branch).sort();
  const currentAtObservation = remoteComplete && exactReviewedSnapshot &&
    unreviewedBranches.length === 0 && missingBranches.length === 0 && changedBranches.length === 0;
  const freshness = {
    status: !remoteRequested ? "not-checked" : !remoteComplete ? "incomplete" :
      currentAtObservation ? "observed-match" : "review-required",
    observedAt: remoteInventory?.observedAt ?? null,
    unreviewedBranches: remoteRequested ? unreviewedBranches : [],
    missingBranches: remoteRequested ? missingBranches : [],
    changedBranches: remoteRequested ? changedBranches : []
  };

  const branchReviewScopeComplete =
    sameSet(profile.reviewScope, expectedGraphs) &&
    branches.every(
      (item) =>
        typeof item.contribution === "string" &&
        item.contribution.length >= 30 &&
        ["adopted-pattern", "adapted-pattern", "held"].includes(item.disposition) &&
        item.publicSafe === true
    );

  const graphResponsibilitiesExplicit =
    sameOrdered(
      profile.graphResponsibilities?.map((item) => item.id),
      expectedGraphs
    ) && profile.graphResponsibilities?.every((item) => item.purpose.length >= 40);

  const generatedViewsNoncanonical =
    profile.canonicality?.governedRecords === "authored-source-of-truth" &&
    profile.canonicality?.materializedViews === "derived-noncanonical" &&
    profile.canonicality?.publicSurfaces === "selective-human-reviewed-projections";

  const deterministicChecksPrecedeRoleplay = sameOrdered(
    profile.evaluationOrder,
    expectedEvaluationOrder
  );

  const voice = profile.situatedEditorialVoice ?? {};
  const situatedVoiceIsNotImpersonation =
    sameSet(voice.requiredInputs, [
      "purpose",
      "audience",
      "source-basis",
      "uncertainty",
      "prohibited-inferences"
    ]) &&
    /without impersonating/i.test(voice.purpose ?? "") &&
    /No named lens is a quotation, endorsement, participation claim, availability claim, or authority grant\./.test(
      voice.publicClaimBoundary ?? ""
    );

  const coverage = profile.branchCoverageContract ?? {};
  const exactRevisionSourceDisposition =
    coverage.exactRevisionRequired === true &&
    coverage.everyReviewedBranchReceivesDisposition === true &&
    coverage.branchPresenceIsAgreement === false &&
    coverage.changedHeadReopensReview === true &&
    coverage.newlyListedBranchReopensReview === true;

  const editorialHealth = profile.editorialHealth ?? {};
  const responsibleStopIsHealthy =
    sameOrdered(editorialHealth.healthyStates, [
      "source-bounded-close-reading",
      "review-complete-responsible-stop"
    ]) &&
    editorialHealth.allRegisteredSourceRoutesDispositioned === true &&
    editorialHealth.pageLengthIsEvidence === false &&
    editorialHealth.memberSpeechBecomesTeamVoice === false &&
    editorialHealth.insufficientEvidenceMayStillBeHealthy === true &&
    editorialHealth.inventedPatternsAllowed === false;

  const entityPackets = profile.governedEntityPacketContract ?? {};
  const governedEntityPacketsComplete =
    entityPackets.everyCurrentEntityHasGovernedState === true &&
    sameOrdered(entityPackets.allowedStates, [
      "packet-backed",
      "insufficient-evidence"
    ]) &&
    entityPackets.legacyStubCountsAsCoverage === false &&
    sameOrdered(entityPackets.minimumHealthRequirements, [
      "source-basis",
      "current-reading",
      "known-gaps",
      "human-decision-owner"
    ]) &&
    entityPackets.teamVoiceRequiresAuthorityGovernance === true &&
    entityPackets.rawPacketBodiesMayEnterPublicProjection === false;

  const relationships = profile.situatedRelationshipContract ?? {};
  const situatedRelationshipsPreserveScopeAndAuthority =
    sameOrdered(relationships.typedRelations, expectedSituatedRelations) &&
    sameOrdered(relationships.contextRequirements, expectedRelationshipContext) &&
    relationships.attentionIsEndorsement === false &&
    relationships.coverageIsEndorsement === false &&
    relationships.historicalSupportIsCurrentSupport === false &&
    relationships.teamSupportGrantsMemberAuthority === false &&
    relationships.supportGrantsRepresentationAuthority === false &&
    relationships.relationshipRecommendationMayAuthorizeContact === false &&
    relationships.publicProjectionDefault === "default-deny-narrower-than-evidence" &&
    relationships.completenessRequiresScopedPopulationAndAsOf === true;

  const runtime = profile.projectionRuntimeContract ?? {};
  const projectionRuntimePreservesCandidateAndAuthorityState =
    runtime.deterministicMaterialization === true &&
    runtime.idempotentMaterialization === true &&
    runtime.referenceIntegrityChecked === true &&
    runtime.contentAddressedReceiptRequired === true &&
    runtime.publicCandidateIsPublished === false &&
    runtime.publicProjectionRequiresVerifiedPublicSource === true &&
    runtime.publicProjectionRequiresExplicitPublishableState === true &&
    sameOrdered(runtime.publicBackReferences, [
      "entity-id",
      "assertion-id",
      "source-ids"
    ]) &&
    runtime.privateOutreachViewRequiresHumanReview === true &&
    runtime.automatedOutreachAuthorized === false &&
    runtime.privateSourceLocatorsMayEnterPublicProjection === false;

  const sourceReturn = profile.privateSourceReturnContract ?? {};
  const privateSourceReturnsPreserveCoverageAuthorshipAndAuthority =
    sourceReturn.minimumNecessaryReturn === true &&
    sourceReturn.sourceCoverageStatesExplicit === true &&
    sourceReturn.configuredWithoutBaselineIsCovered === false &&
    sourceReturn.providerExportIsLiveCoverage === false &&
    sourceReturn.rawBodiesMayReturnToGitOrPublicProjection === false &&
    sourceReturn.contactDetailsMayReturnToGitOrPublicProjection === false &&
    sourceReturn.protectedLocatorsMayReturnToGitOrPublicProjection === false &&
    sameOrdered(sourceReturn.decoderHazards, expectedDecoderHazards) &&
    sourceReturn.reactionIsAuthoredProse === false &&
    sourceReturn.directionAndOriginalAuthorPreserved === true &&
    sourceReturn.identityMergeRequiresIndependentResolution === true &&
    sourceReturn.warmthOfferOrReactionIsCommitment === false &&
    sourceReturn.automaticCourseChangeAuthorized === false &&
    sourceReturn.externalActionAuthorized === false;

  const messageSignals = profile.messageSignalStateContract ?? {};
  const messageBoundaries = messageSignals.boundaries ?? {};
  const messageSignalStatesPreserveEvidenceAndAuthority =
    sameOrdered(messageSignals.orderedStates, expectedMessageSignalStates) &&
    sameOrdered(messageSignals.everyStateRequires, [
      "evidence-required",
      "does-not-establish",
      "human-authority",
      "correction-route"
    ]) &&
    messageBoundaries.messagePresenceProvesDelivery === false &&
    messageBoundaries.deliveryProvesReading === false &&
    messageBoundaries.readingProvesUnderstandingOrAgreement === false &&
    messageBoundaries.reactionProvesEndorsement === false &&
    messageBoundaries.replyAcceptsUnstatedProposal === false &&
    messageBoundaries.schedulingProvesAttendanceOrRole === false &&
    messageBoundaries.roleAcceptanceProvesCompletionOrIndefiniteService === false &&
    messageBoundaries.assignmentAcceptanceProvesCompletion === false &&
    messageBoundaries.completionProvesAcceptanceImpactOrPublication === false &&
    messageBoundaries.endorsementGrantsPermanentAdjacentOrContactAuthority === false &&
    messageBoundaries.verifiedAuthorityGrantsConsentEndorsementOrAction === false &&
    messageBoundaries.unknownStateMayBeInferredUpward === false &&
    sameOrdered(messageSignals.sourceCoverageReceiptFields, expectedCoverageReceiptFields) &&
    messageSignals.configuredSourceCountsAsCovered === false &&
    messageSignals.snapshotCurrentMeansLiveCurrent === false &&
    messageSignals.rawMessageBodiesAllowed === false &&
    messageSignals.automaticCommitmentInferenceAllowed === false &&
    messageSignals.automaticExternalActionAuthorized === false;

  const roleplay = profile.roleplayContract ?? {};
  const roleplayHasNoHumanAuthority =
    roleplay.status === "fictionalized-analytical-lens" &&
    roleplay.mayCritique === true &&
    roleplay.mayGrantHumanApproval === false &&
    roleplay.mayImpersonateOrClaimEndorsement === false &&
    roleplay.mayAuthorizePublicationMergeDeploymentOrExternalAction === false &&
    roleplay.outputState === "advisory-proposal-only" &&
    sameSet(profile.humanDecisionsRemainOpen, expectedHumanDecisions);

  const publicSurfaceContractComplete = sameOrdered(
    profile.publicSurfaceContract,
    expectedPublicSurfaceContract
  );

  const boundary = profile.projectionBoundary ?? {};
  const selectiveProjectionAndPrivateBoundaries =
    boundary.profileVisibility === "internal-public-safe-research-control" &&
    boundary.automaticPublicProjection === false &&
    boundary.rawPrivateMaterialAllowed === false &&
    boundary.protectedLocatorsAllowed === false &&
    boundary.namedRoleplayApprovalAllowed === false;

  const changeInvalidationTriggersComplete = sameSet(
    profile.invalidationTriggers,
    expectedInvalidationTriggers
  );

  const checks = {
    ecosystem_profile_materialized: profileMaterialized,
    branch_review_exact: exactReviewedSnapshot,
    branch_review_scope_complete: branchReviewScopeComplete,
    three_graph_responsibilities_explicit: graphResponsibilitiesExplicit,
    generated_views_noncanonical: generatedViewsNoncanonical,
    deterministic_checks_precede_roleplay: deterministicChecksPrecedeRoleplay,
    situated_voice_is_not_impersonation: situatedVoiceIsNotImpersonation,
    exact_revision_source_disposition: exactRevisionSourceDisposition,
    responsible_stop_is_healthy: responsibleStopIsHealthy,
    governed_entity_packets_complete: governedEntityPacketsComplete,
    situated_relationships_preserve_scope_and_authority:
      situatedRelationshipsPreserveScopeAndAuthority,
    projection_runtime_preserves_candidate_and_authority_state:
      projectionRuntimePreservesCandidateAndAuthorityState,
    private_source_returns_preserve_coverage_authorship_and_authority:
      privateSourceReturnsPreserveCoverageAuthorshipAndAuthority,
    message_signal_states_preserve_evidence_and_authority:
      messageSignalStatesPreserveEvidenceAndAuthority,
    roleplay_has_no_human_authority: roleplayHasNoHumanAuthority,
    public_surface_contract_complete: publicSurfaceContractComplete,
    selective_projection_and_private_boundaries: selectiveProjectionAndPrivateBoundaries,
    change_invalidation_triggers_complete: changeInvalidationTriggersComplete
  };

  if (remoteRequested) checks.remote_inventory_matches_review = currentAtObservation;

  return {
    passed: Object.values(checks).every(Boolean),
    currentAtObservation,
    freshness,
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: { branches: branches.length, blockingCriteria: Object.keys(checks).length }
  };
}

export function readRemoteRevisions(profile) {
  const remoteUrl = `https://github.com/${profile.sourceRepository}.git`;
  // Query all heads: filtering to already-reviewed refs hides new branches.
  const output = execFileSync("git", ["ls-remote", "--heads", remoteUrl], {
    encoding: "utf8"
  });
  return Object.fromEntries(
    output
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [revision, ref] = line.split(/\s+/);
        return [ref.replace("refs/heads/", ""), revision];
      })
  );
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const profile = loadEcosystemOperationsProfile();
  const requireRemote = process.argv.includes("--remote");
  let remoteInventory;
  if (requireRemote) {
    try {
      const revisions = readRemoteRevisions(profile);
      remoteInventory = { revisions, complete: true, observedAt: new Date().toISOString() };
    } catch {
      console.error("HOLD remote inventory unavailable; source coverage is unknown, not empty.");
      process.exit(1);
    }
  }
  const evaluation = evaluateEcosystemOperationsProfile({ profile, remoteInventory, requireRemote });
  for (const [id, passed] of Object.entries(evaluation.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${id}`);
  }
  console.log(`Source freshness: ${evaluation.freshness.status}; observation: ${evaluation.freshness.observedAt ?? "not performed"}.`);
  if (requireRemote) {
    // Do not print private repository branch locators in public CI output.
    console.log(`Review gaps: ${evaluation.freshness.unreviewedBranches.length} unreviewed, ${evaluation.freshness.missingBranches.length} missing, ${evaluation.freshness.changedBranches.length} changed branches.`);
  }
  if (!evaluation.passed) process.exit(1);
  console.log(
    `Ecosystem operations profile passed ${requireRemote ? "at the recorded remote observation" : "historical consistency checks only"}: ${evaluation.counts.blockingCriteria} blocking criteria across ${evaluation.counts.branches} reviewed revisions. No publication or release authority is granted.`
  );
}
