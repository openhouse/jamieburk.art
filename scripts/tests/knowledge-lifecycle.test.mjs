import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { intakeAmendmentSchema, intakeReceiptSchema, mediaLeadSchema } from "../../apps/www/src/data/knowledge-bank/lifecycle-schema.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  personalFacebookPostClaimIds,
  personalFacebookPostSourceIds,
} from "../../apps/www/src/data/knowledge-bank/personal-facebook-posts.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { validateAppendOnlySnapshots } from "../lib/append-only-history.mjs";
import { integrityArtifactPaths, validateIntegrityCheckpoints, validateRetirementLedger } from "../lib/knowledge-integrity-validation.mjs";
import { validateIntakeReceipts, validateKnowledgeLifecycle } from "../lib/knowledge-lifecycle-validation.mjs";
import { retrieveKnowledgePalette } from "../lib/knowledge-palette.mjs";

function relationshipRole(observation, candidateClaimId) {
  return observation?.candidateRelationships.find((item) => item.candidateClaimId === candidateClaimId)?.evidenceRole
    ?? observation?.evidenceRole;
}

test("the canonical lifecycle corpus is internally consistent", () => {
  assert.deepEqual(validateKnowledgeLifecycle(), []);
});

test("KC Spaces Fund observations and exact-route proof lineage stay atomic and governed", () => {
  const operating = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-KCSF-FACEBOOK-MUTUAL-AID-OPERATING-SURFACE");
  const implementation = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-KCSF-DIGITAL-INFRASTRUCTURE-AND-IDENTITY");
  const observationIds = new Set([...operating.observationIds, ...implementation.observationIds]);
  const retiredCompoundIds = [
    "OBS-KCSF-FACEBOOK-OPERATING-PATTERNS",
    "OBS-KCSF-CAMPAIGN-SITE-PROGRAM",
    "OBS-KCSF-DIGITAL-OPERATIONS-IMPLEMENTATION",
  ];
  const proof = proofClaims.find(({ id }) => id === "kc-spaces-fund-digital-infrastructure");
  const manifest = knowledgeLifecycle.proofSurfaceManifests.find(({ id }) => id === "MANIFEST-PROOFS-TECHNICAL-OPERATIONS");

  assert.equal(retiredCompoundIds.some((id) => observationIds.has(id)), false);
  assert.equal([...observationIds].filter((id) => id.startsWith("OBS-KCSF-FACEBOOK-") || id.startsWith("OBS-KCSF-CAMPAIGN-SITE-") || id.startsWith("OBS-KCSF-DIGITAL-OPERATIONS-")).length, 23);
  assert.ok(proof.relatedProjects.includes("kc-spaces-fund"));
  assert.ok(proof.canonicalClaimIds.includes("CLM-KCSF-DIGITAL-INFRASTRUCTURE-AND-IDENTITY"));
  assert.ok(proof.requiredCanonicalClaimIds.includes("CLM-KCSF-DIGITAL-INFRASTRUCTURE-AND-IDENTITY"));
  assert.ok(manifest.canonicalClaimIds.includes("CLM-KCSF-DIGITAL-INFRASTRUCTURE-AND-IDENTITY"));

  const broken = structuredClone(knowledgeLifecycle);
  const brokenManifest = broken.proofSurfaceManifests.find(({ id }) => id === "MANIFEST-PROOFS-TECHNICAL-OPERATIONS");
  brokenManifest.canonicalClaimIds = brokenManifest.canonicalClaimIds.filter((id) => id !== "CLM-KCSF-DIGITAL-INFRASTRUCTURE-AND-IDENTITY");
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /Consequential proof kc-spaces-fund-digital-infrastructure lacks canonical claim/);
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

test("selected personal Facebook specimens remain close-read, atomic, and retrievable", () => {
  const selections = [
    [personalFacebookPostSourceIds.wowListPractice, "PRJ-WOWLIST"],
    [personalFacebookPostSourceIds.nycacMeeting, "PRJ-NYC-ARTIST-COALITION"],
    [personalFacebookPostSourceIds.cabaretHearing, "PRJ-NYC-ARTIST-COALITION"],
    [personalFacebookPostSourceIds.saveNycSpaces, "PRJ-NYC-ARTIST-COALITION"],
    [personalFacebookPostSourceIds.nightMayor, "PRJ-NYC-ARTIST-COALITION"],
    [personalFacebookPostSourceIds.kcTownHall, "PRJ-KC-TOWN-HALL"],
    [personalFacebookPostSourceIds.passSbjSA, "PRJ-FAIR-RENT-CRS"],
    [personalFacebookPostSourceIds.talksNotRaids, "PRJ-NYC-ARTIST-COALITION"],
    [personalFacebookPostSourceIds.waterways, "PRJ-WATERWAYS-PARTICIPATORY-ART"],
    [personalFacebookPostSourceIds.nterChng, "PRJ-NTER-CHNG"],
  ];
  const relay = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-FACEBOOK-JAMIE-CIVIC-RELAY-PRACTICE");
  const sourceTask = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-FACEBOOK-JAMIE-POSTED-SOURCE-REVIEW");
  const canonical = knowledgeBank.claims.find(({ id }) => id === personalFacebookPostClaimIds.civicRelay);
  const reserve = retrieveKnowledgePalette({ briefId: "BRIEF-FACEBOOK-JAMIE-PERSONAL-POST-RESERVE" });
  const reserveSourceIds = new Set(reserve.sources.map(({ id }) => id));

  assert.equal(selections.length, 10);
  for (const [sourceId, projectId] of selections) {
    const source = knowledgeBank.sources.find(({ id }) => id === sourceId);
    const observations = knowledgeLifecycle.observations.filter((observation) => observation.sourceId === sourceId);

    assert.equal(source?.reviewStatus, "close-read");
    assert.equal(source?.contentReviewedAt, "2026-07-16");
    assert.ok(source?.contentReviewedBy);
    assert.equal(observations.length, 1);
    assert.ok(observations[0].locator.includes("Public post dated"));
    assert.ok(observations[0].projectIds.includes(projectId));
    assert.ok(relay?.observationIds.includes(observations[0].id));
    assert.ok(sourceTask?.sourceIds.includes(sourceId));
    assert.ok(sourceTask?.observationIds.includes(observations[0].id));
    assert.ok(canonical?.evidence.some((evidence) => evidence.sourceId === sourceId));
    assert.ok(reserveSourceIds.has(sourceId));

    const projectPalette = retrieveKnowledgePalette({ projectId });
    assert.ok(projectPalette.sources.some(({ id }) => id === sourceId));
  }
});

test("the KC Town Hall Council lifecycle rejects appropriation-as-receipt", () => {
  const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-KC-TOWN-HALL-COUNCIL-LIFECYCLE");
  const transitionTask = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-KC-TOWN-HALL-TRANSITION-POSITIONING");
  const publicRecord = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-KC-TOWN-HALL-PUBLIC-RECORD");
  const transition = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION");
  const receiptClaim = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-KC-TOWN-HALL-FUNDING-RECEIVED");
  const correction = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-KC-TOWN-HALL-COUNCIL-LIFECYCLE-CORRECT");
  const transitionDecision = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-KC-TOWN-HALL-TRANSITION-PROMOTE");
  const rejection = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-KC-TOWN-HALL-FUNDING-RECEIVED-REJECT");
  const manifest = knowledgeLifecycle.proofSurfaceManifests.find(({ id }) => id === "MANIFEST-PROOFS-KC-TOWN-HALL-CASE-STUDY");

  assert.equal(task?.status, "completed");
  assert.equal(task?.sourceIds.length, 5);
  assert.equal(publicRecord?.maturity, "promoted");
  assert.equal(transition?.maturity, "promoted");
  assert.equal(transition?.publicEvidenceQualifier?.kind, "self-reported");
  assert.ok(transition?.antiClaims.some((item) => /abandoned/i.test(item)));
  assert.ok(transition?.boundaries.some((item) => /private circumstances/i.test(item)));
  assert.equal(receiptClaim?.maturity, "disallowed");
  assert.equal(correction?.decision, "correct");
  assert.equal(correction?.humanReviewStatus, "approved");
  assert.equal(transitionTask?.status, "completed");
  assert.equal(transitionDecision?.decision, "promote");
  assert.equal(transitionDecision?.humanReviewStatus, "approved");
  assert.deepEqual(transitionDecision?.allowedSurfaces, ["knowledge-bank", "/work/kc-town-hall"]);
  assert.equal(rejection?.decision, "reject");
  assert.ok(manifest?.guardrails.some((item) => /Appropriation is not receipt/i.test(item)));
  assert.ok(manifest?.canonicalClaimIds.includes("CLM-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION-2026"));
  assert.ok(manifest?.exclusions.some((item) => /Private personal circumstances/i.test(item)));

  const publicObservationRoles = publicRecord?.observationIds.map((id) =>
    relationshipRole(knowledgeLifecycle.observations.find((item) => item.id === id), publicRecord.id)
  );
  const receiptObservationRoles = receiptClaim?.observationIds.map((id) =>
    relationshipRole(knowledgeLifecycle.observations.find((item) => item.id === id), receiptClaim.id)
  );
  assert.ok(publicObservationRoles?.includes("supports-boundary"));
  assert.ok(publicObservationRoles?.includes("direct-support"));
  assert.ok(!publicObservationRoles?.includes("contradicts"));
  assert.ok(receiptObservationRoles?.includes("contradicts"));
});

test("KC Town Hall Phase One and neighborhood stewardship remain source-positioned research", () => {
  const source = knowledgeBank.sources.find(({ id }) => id === "SRC-KC-TOWN-HALL-PHASE-ONE-PROPOSAL-2019");
  const construction = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-KC-TOWN-HALL-PHASE-ONE-CONSTRUCTION-LEADERSHIP");
  const survey = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY-SYSTEM");
  const constructionTask = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-KC-TOWN-HALL-PHASE-ONE-ROLE-COMPLETION");
  const surveyTask = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-KC-TOWN-HALL-SURVEY-AUTHORSHIP");

  assert.equal(source?.visibility, "protected");
  assert.equal(source?.preservationStatus, "private");
  assert.equal(source?.protectedLocatorId, "DOC-KC-TOWN-HALL-CCED-PROPOSAL-2019-001");
  assert.equal(construction?.maturity, "researching");
  assert.equal(survey?.maturity, "researching");
  assert.ok(construction?.antiClaims.some((item) => /licensed general contractor/i.test(item)));
  assert.ok(construction?.antiClaims.some((item) => /full KC Town Hall redevelopment/i.test(item)));
  assert.equal(constructionTask?.status, "in-progress");
  assert.ok(constructionTask?.limitations.some((item) => /March 2019 packet cannot independently establish/i.test(item)));
  assert.equal(surveyTask?.status, "in-progress");
  assert.ok(surveyTask?.limitations.some((item) => /Raw responses and contact information are protected/i.test(item)));
});

test("TiredOfTires keeps individual attribution and disputed metrics out of public composition", () => {
  const operations = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-TIRED-OF-TIRES-OPERATIONS");
  const metric = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-TIRED-OF-TIRES-LEDGER-METRIC");
  const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-TIRED-OF-TIRES-ROLE-METRICS");
  const discrepancy = knowledgeLifecycle.observations.find(({ id }) => id === "OBS-TIRED-OF-TIRES-MAY-COUNT-DISCREPANCY");

  assert.equal(operations?.maturity, "researching");
  assert.equal(metric?.maturity, "researching");
  assert.equal(task?.status, "in-progress");
  assert.equal(relationshipRole(discrepancy, metric.id), "contradicts");
  assert.ok(task?.limitations.some((item) => /discrepancy remains unresolved/i.test(item)));
  assert.ok(metric?.antiClaims.some((item) => /independently verified/i.test(item)));
  assert.ok(knowledgeLifecycle.editorialBriefs.every(({ candidateClaimIds }) => !candidateClaimIds.includes(operations.id) && !candidateClaimIds.includes(metric.id)));
});

test("Cleveland Avenue and pro bono neighborhood communications stay in research for corroboration", () => {
  const cleveland = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-CLEVELAND-AVE-UNIFY-BEAUTIFY-ROLE");
  const communications = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-EAST-KC-PRO-BONO-COMMUNICATIONS");
  const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-CLEVELAND-AVE-ROLE-IMPACT");

  assert.equal(cleveland?.maturity, "researching");
  assert.equal(communications?.maturity, "researching");
  assert.equal(task?.status, "in-progress");
  assert.ok(cleveland?.boundaries.some((item) => /Pastor Lee/i.test(item)));
  assert.ok(task?.nextActions.some((item) => /official capital-improvement records/i.test(item)));
  assert.ok(knowledgeLifecycle.editorialBriefs.every(({ candidateClaimIds }) => !candidateClaimIds.includes(cleveland.id) && !candidateClaimIds.includes(communications.id)));
});

test("NTER CHNG preserves collective creation and bounded America: Now and Here inclusion", () => {
  const project = knowledgeLifecycle.projects.find(({ id }) => id === "PRJ-NTER-CHNG");
  const candidate = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-NTER-CHNG-COLLABORATION-EXHIBITION");
  const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-NTER-CHNG-ARCHIVAL-RECOVERY");
  const decision = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-NTER-CHNG-PROMOTE");
  const canonical = knowledgeBank.claims.find(({ id }) => id === "CLM-NTER-CHNG-COLLABORATION-EXHIBITION-2010-2011");
  const protectedPage = knowledgeBank.sources.find(({ id }) => id === "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011");
  const installerPlan = knowledgeBank.sources.find(({ id }) => id === "SRC-NTER-CHNG-ANH-INSTALLER-PLAN-2011");
  const workingCompilation = knowledgeBank.sources.find(({ id }) => id === "SRC-NTER-CHNG-2011-WORKING-COMPILATION");
  const nerman = knowledgeLifecycle.observations.find(({ id }) => id === "OBS-NTER-CHNG-NERMAN-BOUNDARY");
  const installerObservation = knowledgeLifecycle.observations.find(({ id }) => id === "OBS-NTER-CHNG-ANH-INSTALLER-PLAN");

  assert.equal(project?.status, "historical");
  assert.ok(project?.entityIds.includes("ENT-DREW-BOLTON"));
  assert.ok(project?.entityIds.includes("ENT-GARRETT-FUSELIER"));
  assert.equal(candidate?.maturity, "promoted");
  assert.equal(candidate?.targetCanonicalClaimId, canonical?.id);
  assert.ok(candidate?.antiClaims.some((item) => /solely created/i.test(item)));
  assert.ok(candidate?.antiClaims.some((item) => /Nerman Museum/i.test(item)));
  assert.equal(task?.status, "completed");
  assert.equal(task?.sourceIds.length, 8);
  assert.ok(task?.sourceIds.includes(installerPlan?.id));
  assert.ok(task?.sourceIds.includes(workingCompilation?.id));
  assert.ok(task?.limitations.some((item) => /press release was not recovered/i.test(item)));
  assert.equal(decision?.decision, "promote");
  assert.deepEqual(decision?.allowedSurfaces, ["knowledge-bank", "future-cultural-technology-case-study"]);
  assert.equal(canonical?.projections[0]?.status, "hold");
  assert.deepEqual(canonical?.projections[0]?.surfaces, []);
  assert.equal(protectedPage?.visibility, "public-metadata-only");
  assert.equal(protectedPage?.protectedLocatorId, "WEB-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011-001");
  assert.equal(protectedPage?.canonicalUrl, undefined);
  assert.equal(protectedPage?.archiveUrl, undefined);
  assert.equal(installerPlan?.visibility, "protected");
  assert.equal(workingCompilation?.visibility, "protected");
  assert.equal(installerPlan?.canonicalUrl, undefined);
  assert.equal(workingCompilation?.canonicalUrl, undefined);
  assert.ok(installerObservation?.statement.includes("intended installation site"));
  assert.ok(installerObservation?.doesNotEstablish.some((item) => /actual.*venue/i.test(item)));
  assert.ok(candidate?.boundaries.some((item) => /intended.*does not establish/i.test(item)));
  assert.equal(nerman?.evidenceRole, "context");
  assert.ok(nerman?.doesNotEstablish.some((item) => /NTER CHNG at the Nerman Museum/i.test(item)));
  assert.ok(knowledgeLifecycle.editorialBriefs.every(({ candidateClaimIds }) => !candidateClaimIds.includes(candidate.id)));
});

test("Teams archive production promotes bounded methods while holding unsupported outcomes", () => {
  const run = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-TEAMS-ICLOUD-ARCHIVE-PRODUCTION-2026-07-15");
  const raft = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-WATERWAYS-RAFT-EXPEDITION");
  const gulf = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-WATERWAYS-RAFT-GULF-ENDPOINT");
  const operatingPlan = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-CRS-SHARED-PUBLIC-GOODS-OPERATING-PLAN");
  const provenance = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-CRS-LEGISLATIVE-PROVENANCE-REDLINE");
  const sprint = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-SOURCE-BACKED-TEAM-MEMORY-SPRINT-DESIGN");
  const raftClaim = knowledgeBank.claims.find(({ id }) => id === "CLM-WATERWAYS-RAFT-EXPEDITION-2007");
  const sprintClaim = knowledgeBank.claims.find(({ id }) => id === "CLM-SOURCE-BACKED-TEAM-MEMORY-SPRINT-DESIGN-2026");
  const campaignProof = proofClaims.find(({ id }) => id === "fair-rent-campaign-memory");
  const sourceMapProof = proofClaims.find(({ id }) => id === "fair-rent-source-map");
  const sprintProof = proofClaims.find(({ id }) => id === "source-backed-team-memory-method");

  assert.equal(run?.status, "completed");
  assert.equal(run?.sourceIds.length, 7);
  assert.ok(run?.limitations.some((item) => /unavailable was not treated as nonexistent/i.test(item)));
  assert.equal(raft?.maturity, "promoted");
  assert.match(raft?.proposition ?? "", /more than 1,000 miles from Kansas City into Louisiana/);
  assert.match(raftClaim?.internalClaim ?? "", /regulatory pause with community support/);
  assert.equal(gulf?.maturity, "held");
  assert.ok(gulf?.antiClaims.some((item) => /Louisiana and the Gulf/i.test(item)));
  assert.equal(operatingPlan?.maturity, "promoted");
  assert.ok(operatingPlan?.antiClaims.some((item) => /completed every element/i.test(item)));
  assert.equal(provenance?.maturity, "promoted");
  assert.ok(provenance?.antiClaims.some((item) => /legal advice/i.test(item)));
  assert.equal(sprint?.maturity, "promoted");
  assert.ok(sprint?.antiClaims.some((item) => /proposal was accepted/i.test(item)));
  assert.ok(sprint?.antiClaims.some((item) => /deployed in production/i.test(item)));
  assert.equal(sprintClaim?.projections[0]?.status, "hold");
  assert.deepEqual(sprintClaim?.projections[0]?.surfaces, []);
  assert.deepEqual(campaignProof?.evidenceCanonicalClaimIds, ["CLM-CRS-SHARED-PUBLIC-GOODS-OPERATING-PLAN-2026"]);
  assert.ok(sourceMapProof?.evidenceCanonicalClaimIds?.includes("CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"));
  assert.deepEqual(sprintProof?.evidenceCanonicalClaimIds, ["CLM-SOURCE-BACKED-TEAM-MEMORY-SPRINT-DESIGN-2026"]);
  assert.equal(campaignProof?.canonicalClaimIds, undefined);
  assert.equal(sourceMapProof?.canonicalClaimIds, undefined);
  assert.equal(sprintProof?.canonicalClaimIds, undefined);
});

test("Teams archive follow-up deepens role evidence without leaking protected records or forcing website copy", () => {
  const run = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-TEAMS-ICLOUD-ARCHIVE-PRODUCTION-FOLLOW-UP-2026-07-16");
  const matmos = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-MATMOS-CONSUMING-FLAME-PARTICIPANT");
  const claudette = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-CLAUDETTE-AR-COLLABORATION");
  const claudetteProject = knowledgeLifecycle.projects.find(({ id }) => id === "PRJ-CLAUDETTE-THEATRE-AR");
  const claudetteSource = knowledgeBank.sources.find(({ id }) => id === "SRC-CLAUDETTE-AR-TECHNICAL-HANDOFF-2022");
  const crs = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-CRS-INSTITUTIONAL-MEMORY-CIVIC-ROUTING");
  const crsDecision = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-CRS-INSTITUTIONAL-MEMORY-HOLD-2026-07-16");
  const evals = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-AI-EVALS-COMPLETION-2026");
  const evalsClaim = knowledgeBank.claims.find(({ id }) => id === "CLM-AI-EVALS-COMPLETION-2026");
  const evalsProof = proofClaims.find(({ id }) => id === "ai-evals-professional-development");
  const certificate = knowledgeBank.sources.find(({ id }) => id === "SRC-AI-EVALS-CERTIFICATE-2026");

  assert.equal(run?.status, "completed");
  assert.equal(run?.sourceIds.length, 6);
  assert.ok(run?.limitations.some((item) => /sign-in screen/i.test(item)));
  assert.ok(run?.limitations.some((item) => /unavailable, not nonexistent/i.test(item)));

  assert.equal(matmos?.maturity, "held");
  assert.ok(matmos?.requiredEvidence.some((item) => /primary label/i.test(item)));
  assert.ok(matmos?.antiClaims.some((item) => /produced the album/i.test(item)));

  assert.equal(claudette?.maturity, "promoted");
  assert.ok(claudette?.observationIds.includes("OBS-CLAUDETTE-AR-TECHNICAL-HANDOFF-2022"));
  assert.equal(claudetteProject?.endYear, 2022);
  assert.equal(claudetteSource?.visibility, "protected");
  assert.equal(claudetteSource?.canonicalUrl, undefined);
  assert.equal(claudetteSource?.archiveUrl, undefined);

  assert.equal(crs?.maturity, "defensible");
  assert.equal(crsDecision?.decision, "hold");
  assert.ok(crs?.antiClaims.some((item) => /alone led/i.test(item)));
  assert.ok(crs?.boundaries.some((item) => /underlying protected record/i.test(item)));

  assert.equal(evals?.maturity, "promoted");
  assert.equal(evalsClaim?.projections[0]?.status, "hold");
  assert.deepEqual(evalsClaim?.projections[0]?.surfaces, []);
  assert.equal(certificate?.visibility, "public-metadata-only");
  assert.equal(certificate?.canonicalUrl, undefined);
  assert.deepEqual(evalsProof?.evidenceCanonicalClaimIds, ["CLM-AI-EVALS-COMPLETION-2026"]);
  assert.equal(evalsProof?.canonicalClaimIds, undefined);
});

test("Google Shared Drive production develops bounded claims and held media without treating custody as proof", () => {
  const run = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-GOOGLE-SHARED-DRIVE-ARCHIVE-PRODUCTION-2026-07-15");
  const pilotTask = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-COMMERCIAL-VACANCY-RPIE-PILOT-REVIEW-2026-07-15");
  const pilot = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-COMMERCIAL-VACANCY-RPIE-PILOT-DESIGN");
  const pilotClaim = knowledgeBank.claims.find(({ id }) => id === "CLM-COMMERCIAL-VACANCY-RPIE-PILOT-DESIGN-2026");
  const pilotDecision = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-COMMERCIAL-VACANCY-RPIE-PILOT-PROMOTE-2026-07-15");
  const residency = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-196-ARTISTS-RESIDENCY-FOUNDER-SCALE");
  const residencyClaim = knowledgeBank.claims.find(({ id }) => id === "CLM-196-ARTISTS-RESIDENCY-FOUNDER-SCALE");
  const communications = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-EAST-KC-PRO-BONO-COMMUNICATIONS");
  const sourceMapProof = proofClaims.find(({ id }) => id === "fair-rent-source-map");
  const driveSourceIds = run?.sourceIds ?? [];
  const driveSources = knowledgeBank.sources.filter(({ id }) => driveSourceIds.includes(id));
  const mediaIds = [
    "MEDIA-COMMERCIAL-VACANCY-MAPS-2026",
    "MEDIA-CHESTNUT-DUMPSTER-DAY-COMMS",
    "MEDIA-NYCA-SAVE-JIMMYS-CORNER-PHOTOS-2026",
    "MEDIA-SUNDAY-DINNER-ZOOM-ARCHIVE",
    "MEDIA-WOWLIST-MEMBERS-MEETING-2015"
  ];
  const media = knowledgeLifecycle.mediaLeads.filter(({ id }) => mediaIds.includes(id));

  assert.equal(run?.status, "completed");
  assert.equal(run?.sourceIds.length, 8);
  assert.ok(run?.limitations.some((item) => /technical access/i.test(item)));
  assert.ok(run?.limitations.some((item) => /custody/i.test(item)));
  assert.ok(driveSources.every(({ visibility }) => visibility === "protected"));
  assert.ok(driveSources.every(({ canonicalUrl, archiveUrl, assetUrl }) => !canonicalUrl && !archiveUrl && !assetUrl));

  assert.equal(pilotTask?.status, "completed");
  assert.equal(pilot?.maturity, "promoted");
  assert.equal(pilot?.targetCanonicalClaimId, pilotClaim?.id);
  assert.ok(pilot?.antiClaims.some((item) => /City adopted/i.test(item)));
  assert.equal(pilotClaim?.projections[0]?.status, "hold");
  assert.deepEqual(pilotClaim?.projections[0]?.surfaces, []);
  assert.deepEqual(pilotDecision?.allowedSurfaces, ["knowledge-bank"]);
  assert.ok(sourceMapProof?.evidenceCanonicalClaimIds?.includes(pilotClaim.id));

  assert.ok(residency?.observationIds.includes("OBS-196-ARTISTS-RESIDENCY-ONBOARDING-WORKFLOW-2023"));
  assert.equal(residency?.publicEvidenceQualifier?.kind, "self-reported");
  assert.ok(residencyClaim?.boundaries.some((item) => /supports methods, not scale/i.test(item)));
  assert.ok(communications?.observationIds.includes("OBS-CHESTNUT-DUMPSTER-DAY-COMMS-PACKAGE"));
  assert.equal(communications?.maturity, "researching");
  assert.ok(communications?.antiClaims.some((item) => /custody proves authorship/i.test(item)));

  assert.equal(media.length, mediaIds.length);
  assert.ok(media.every(({ displayStatus }) => ["hold", "metadata-only"].includes(displayStatus)));
  assert.ok(media.every(({ rightsStatus }) => rightsStatus !== "cleared"));
});

test("evidence-only canonical links cannot authorize or enter public composition", () => {
  const proof = proofClaims.find(({ id }) => id === "fair-rent-campaign-memory");
  const claim = knowledgeBank.claims.find(({ id }) => id === "CLM-CRS-SHARED-PUBLIC-GOODS-OPERATING-PLAN-2026");
  const decision = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-CRS-SHARED-PUBLIC-GOODS-PROMOTE-2026-07-15");
  const originalIds = proof.evidenceCanonicalClaimIds;
  const originalProjection = structuredClone(claim.projections[0]);
  const originalDecision = structuredClone(decision);

  try {
    proof.evidenceCanonicalClaimIds = ["CLM-NOT-REAL"];
    assert.match(validateKnowledgeLifecycle().join("\n"), /unknown evidence-only canonical claim/);
    proof.evidenceCanonicalClaimIds = ["CLM-WATERWAYS-RAFT-EXPEDITION-2007"];
    assert.match(validateKnowledgeLifecycle().join("\n"), /does not share a project/);
    proof.evidenceCanonicalClaimIds = [...originalIds];
    claim.projections[0] = { ...claim.projections[0], status: "active", surfaces: ["/resume"] };
    assert.match(validateKnowledgeLifecycle().join("\n"), /Evidence-only canonical claim .* is not an unsurfaced hold/);
    claim.projections[0] = originalProjection;
    Object.assign(decision, { humanReviewStatus: "approved", humanReviewer: "Jamie Burkart", allowedSurfaces: ["knowledge-bank", "/resume"] });
    assert.match(validateKnowledgeLifecycle().join("\n"), /Evidence-only canonical claim .* has public-route decision/);
  } finally {
    proof.evidenceCanonicalClaimIds = originalIds;
    claim.projections[0] = originalProjection;
    Object.assign(decision, originalDecision);
    if (!("humanReviewer" in originalDecision)) delete decision.humanReviewer;
  }

  const publicResume = retrieveKnowledgePalette({ proofSurface: "/resume", publicationSafe: true });
  assert.ok(publicResume.proofs.some(({ id }) => id === proof.id));
  assert.ok(!publicResume.canonicalClaims.some(({ id }) => id === claim.id));
  const publicResumeBySurface = retrieveKnowledgePalette({ surface: "/resume", publicationSafe: true });
  assert.ok(!publicResumeBySurface.canonicalClaims.some(({ id }) => id === claim.id));
  assert.ok(!publicResumeBySurface.candidates.some(({ targetCanonicalClaimId }) => targetCanonicalClaimId === claim.id));
});

test("shared observations carry candidate-specific evidence roles and limits", () => {
  const broken = structuredClone(knowledgeLifecycle);
  const observation = broken.observations.find(({ id }) => id === "OBS-KC-TOWN-HALL-COUNCIL-APPROPRIATION");
  observation.candidateRelationships = observation.candidateRelationships.filter(({ candidateClaimId }) => candidateClaimId !== "CND-KC-TOWN-HALL-FUNDING-RECEIVED");
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /must define a candidate-specific evidence relationship for every linked candidate/);

  const singleCandidateBroken = structuredClone(knowledgeLifecycle);
  singleCandidateBroken.observations.find(({ id }) => id === "OBS-WOWLIST-FACEBOOK-PUBLISHER-AUDIT").candidateRelationships = [];
  assert.match(validateKnowledgeLifecycle(singleCandidateBroken).join("\n"), /must define a candidate-specific evidence relationship for every linked candidate/);

  const allLinkedObservations = knowledgeLifecycle.observations.filter(({ candidateClaimIds }) => candidateClaimIds.length > 0);
  assert.ok(allLinkedObservations.every(({ candidateClaimIds, candidateRelationships }) =>
    candidateClaimIds.length === candidateRelationships.length &&
    candidateClaimIds.every((id) => candidateRelationships.some(({ candidateClaimId }) => candidateClaimId === id))
  ));

  const blanketRelationships = structuredClone(knowledgeLifecycle);
  const blanketObservation = blanketRelationships.observations.find(({ id }) => id === "OBS-WOWLIST-FACEBOOK-MISSION-AND-STAKEHOLDER-PATTERNS");
  blanketObservation.candidateRelationships = blanketObservation.candidateClaimIds.map((candidateClaimId) => ({
    candidateClaimId,
    evidenceRole: blanketObservation.evidenceRole,
    supports: blanketObservation.statement,
    limitations: blanketObservation.doesNotEstablish,
  }));
  assert.match(validateKnowledgeLifecycle(blanketRelationships).join("\n"), /identical blanket evidence relationships/);

  const cosmeticBlanketRelationships = structuredClone(knowledgeLifecycle);
  const cosmeticObservation = cosmeticBlanketRelationships.observations.find(({ id }) => id === "OBS-WOWLIST-FACEBOOK-MISSION-AND-STAKEHOLDER-PATTERNS");
  cosmeticObservation.candidateRelationships = cosmeticObservation.candidateClaimIds.map((candidateClaimId, index) => ({
    candidateClaimId,
    evidenceRole: cosmeticObservation.evidenceRole,
    supports: cosmeticObservation.statement,
    limitations: [...cosmeticObservation.doesNotEstablish, `Candidate label ${index + 1}`],
  }));
  assert.match(validateKnowledgeLifecycle(cosmeticBlanketRelationships).join("\n"), /cosmetically varied blanket evidence relationships/);

  const roleVariedBlanketRelationships = structuredClone(knowledgeLifecycle);
  const roleVariedObservation = roleVariedBlanketRelationships.observations.find(({ id }) => id === "OBS-WOWLIST-FACEBOOK-MISSION-AND-STAKEHOLDER-PATTERNS");
  roleVariedObservation.candidateRelationships = roleVariedObservation.candidateClaimIds.map((candidateClaimId, index) => ({
    candidateClaimId,
    evidenceRole: index ? "context" : "direct-support",
    supports: roleVariedObservation.statement,
    limitations: roleVariedObservation.doesNotEstablish,
  }));
  assert.match(validateKnowledgeLifecycle(roleVariedBlanketRelationships).join("\n"), /cosmetically varied blanket evidence relationships/);

  const directSupport = retrieveKnowledgePalette({
    projectId: "PRJ-NYC-ARTIST-COALITION",
    evidenceRole: "direct-support"
  });
  assert.ok(directSupport.candidates.some(({ id }) => id === "CND-NYCA-CABARET-ADVOCACY"));
  assert.ok(!directSupport.candidates.some(({ id }) => id === "CND-NYCA-CABARET-INSTRUMENTAL"));
});

test("the July 14 campaign press corpus remains complete, deduplicated, and queued for bounded close reading", () => {
  const collections = knowledgeBank.sourceCollections;
  assert.equal(collections.length, 4);
  assert.equal(collections.reduce((total, collection) => total + collection.itemSourceIds.length, 0), 45);
  assert.equal(new Set(collections.flatMap(({ itemSourceIds }) => itemSourceIds)).size, 44);
  const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-NYCA-PRESS-CORPUS-CLOSE-READ");
  assert.equal(task?.status, "in-progress");
  assert.equal(task?.sourceIds.length, 48);
  assert.ok(task?.limitations.some((item) => /not yet been close-read/i.test(item)));
  assert.ok(task?.limitations.some((item) => /cannot create independent corroboration/i.test(item)));
});

test("new public projections preserve exact-surface human approval", () => {
  const expected = new Map([
    ["CND-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING", "/work/196-sunday-dinner"],
    ["CND-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL", "/work/fair-rent-nyc"],
    ["CND-NYCA-COMMERCIAL-RENT-ADVOCACY", "/work/fair-rent-nyc"],
    ["CND-KC-TOWN-HALL-PUBLIC-RECORD", "/work/kc-town-hall"],
    ["CND-WOWLIST-FACEBOOK-PUBLISHING-MANAGEMENT", "/work/wowlist"]
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

test("campaign press observations require close reading before decomposition", () => {
  const broken = structuredClone(knowledgeLifecycle);
  broken.observations.find(({ id }) => id === "OBS-NYCA-VICE-FORMATION-PURPOSE-2017").sourceId = "SRC-PRESS-LND-SFGATE-NO-DANCING-2017";
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /before close reading/);
});

test("promoted observations reconcile with canonical evidence or correction provenance", () => {
  const broken = structuredClone(knowledgeLifecycle);
  const candidate = broken.candidateClaims.find(({ id }) => id === "CND-NYCA-CABARET-ADVOCACY");
  const observation = broken.observations.find(({ id }) => id === "OBS-FAIR-RENT-ATLANTIC-VACANCY-CONTEXT-2018");
  candidate.observationIds.push(observation.id);
  observation.candidateClaimIds.push(candidate.id);
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /not reconciled with canonical evidence or correction provenance/);
});

test("rendered proof selections cannot outrun exact-route approval", () => {
  const broken = structuredClone(knowledgeLifecycle);
  const resume = broken.proofSurfaceManifests.find(({ route }) => route === "/resume");
  resume.proofIds = resume.proofIds.filter((id) => id !== "callnyc-civic-data-guidance");
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /Rendered proof inventory does not match exact manifest for \/resume; missing approvals: callnyc-civic-data-guidance/);
});

test("canonical corrections resolve to current human approval", () => {
  const broken = structuredClone(knowledgeLifecycle);
  const decision = broken.promotionDecisions.find(({ id }) => id === "DEC-CALLNYC-EVENT-TIME-CORRECT");
  decision.humanReviewStatus = "pending";
  decision.humanReviewer = undefined;
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /Correction COR-CALLNYC-EVENT-TIME-2026 lacks direct human approval or an approved linked decision/);
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
  const promoted = broken.promotionDecisions.find(({ id }) => id === "DEC-CALLNYC-COUNCIL-ENGAGEMENT-PROMOTE");
  const superseding = broken.promotionDecisions.find(({ id }) => id === "DEC-WOWLIST-SOCIAL-CASE-STUDY-RETIRE");
  promoted.targetCanonicalClaimId = "CLM-NYCA-TALKS-NOT-RAIDS-ADVOCACY";
  superseding.supersedesDecisionId = "DEC-NOT-REAL";
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /target differs/);
  assert.match(validateKnowledgeLifecycle(broken).join("\n"), /supersedes unknown/);
});

test("public briefs resolve to claims actually used on their target pages", () => {
  const broken = structuredClone(knowledgeLifecycle);
  const brief = broken.editorialBriefs.find(({ id }) => id === "BRIEF-JOB-APPLICATION-CURRENT");
  brief.canonicalClaimIds = ["CLM-WATERWAYS-RAFT-EXPEDITION-2007"];
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
  const bypassBrief = bypass.editorialBriefs.find(({ id }) => id === "BRIEF-JOB-APPLICATION-CURRENT");
  bypassBrief.candidateClaimIds = bypassBrief.candidateClaimIds.filter((id) => id !== "CND-CALLNYC-INDEPENDENT-FOLLOW-ON");
  assert.match(validateKnowledgeLifecycle(bypass).join("\n"), /bypasses lifecycle promotion/);
  const omission = structuredClone(knowledgeLifecycle);
  const omissionBrief = omission.editorialBriefs.find(({ id }) => id === "BRIEF-JOB-APPLICATION-CURRENT");
  omissionBrief.canonicalClaimIds = omissionBrief.canonicalClaimIds.filter((id) => id !== "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON");
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
  assert.match(validateKnowledgeLifecycle(missing).join("\n"), /Rendered proof inventory does not match exact manifest for \/; missing approvals: hje-revenue-growth-contribution/);

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

test("the downloadable resume is an exact governed destination", () => {
  const route = "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";

  const missingManifest = structuredClone(knowledgeLifecycle);
  missingManifest.proofSurfaceManifests = missingManifest.proofSurfaceManifests.filter((item) => item.route !== route);
  assert.match(validateKnowledgeLifecycle(missingManifest).join("\n"), /Rendered proof route \/resume\/Jamie-Burkart-Resume-Technical-Project-Manager\.pdf has no exact-route manifest/);

  const missingCanonicalLink = structuredClone(knowledgeLifecycle);
  missingCanonicalLink.proofSurfaceManifests.find((item) => item.route === route).canonicalClaimIds = [];
  assert.match(validateKnowledgeLifecycle(missingCanonicalLink).join("\n"), /Consequential proof kc-town-hall-public-benefit-documentation lacks canonical claim CLM-KC-TOWN-HALL-PUBLIC-RECORD-2019 on exact destination/);

  const unauthorized = structuredClone(knowledgeLifecycle);
  unauthorized.promotionDecisions.find(({ id }) => id === "DEC-KC-TOWN-HALL-COUNCIL-LIFECYCLE-CORRECT").allowedSurfaces = unauthorized.promotionDecisions.find(({ id }) => id === "DEC-KC-TOWN-HALL-COUNCIL-LIFECYCLE-CORRECT").allowedSurfaces.filter((surface) => surface !== route);
  assert.match(validateKnowledgeLifecycle(unauthorized).join("\n"), /Active canonical projection CLM-KC-TOWN-HALL-PUBLIC-RECORD-2019 lacks current human approval/);

  const manifest = knowledgeLifecycle.proofSurfaceManifests.find((item) => item.route === route);
  assert.ok(manifest?.selectionCriteria.includes("Render a compact public-record source path for citation-required claims"));
  assert.ok(manifest?.guardrails.some((item) => /public-record source note and path/i.test(item)));
  const kcTownHallProof = proofClaims.find(({ id }) => id === "kc-town-hall-public-benefit-documentation");
  assert.match(kcTownHallProof?.sourceNote ?? "", /downloadable resume.*public-record note.*source links/i);
  assert.ok(manifest?.canonicalClaimIds.includes("CLM-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING-2017"));
  assert.ok(manifest?.canonicalClaimIds.includes("CLM-196-ARTISTS-RESIDENCY-FOUNDER-SCALE"));
  const sundayDinnerDecision = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-SUNDAY-DINNER-WEEKLY-PROMOTE");
  const residencyDecision = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-196-ARTISTS-RESIDENCY-FOUNDER-SCALE-PROMOTE");
  assert.ok(sundayDinnerDecision?.allowedSurfaces.includes(route));
  assert.ok(residencyDecision?.allowedSurfaces.includes(route));
});

test("WOW List historical scale is governed from protected source through every public destination", () => {
  const sourceId = "SRC-WOWLIST-PRODUCTION-ARCHIVE-ANALYSIS-2026-07-15";
  const claimId = "CLM-WOWLIST-HISTORICAL-SCALE";
  const candidateId = "CND-WOWLIST-HISTORICAL-SCALE";
  const proof = proofClaims.find(({ id }) => id === "wowlist-community-platform");
  const source = knowledgeBank.sources.find(({ id }) => id === sourceId);
  const publicSummarySource = knowledgeBank.sources.find(({ id }) => id === "SRC-WOWLIST-PRODUCTION-ARCHIVE-PUBLIC-SUMMARY-2026-07-15");
  const observation = knowledgeLifecycle.observations.find(({ id }) => id === "OBS-WOWLIST-HISTORICAL-SCALE");
  const candidate = knowledgeLifecycle.candidateClaims.find(({ id }) => id === candidateId);
  const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-WOWLIST-PRODUCTION-ARCHIVE-SCALE");
  const decision = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-WOWLIST-HISTORICAL-SCALE-PROMOTE");
  const manifests = knowledgeLifecycle.proofSurfaceManifests.filter(({ proofIds }) => proofIds.includes(proof.id));

  assert.equal(source?.visibility, "protected");
  assert.equal(source?.preservationStatus, "private");
  assert.equal(source?.protectedLocatorId, "ARCHIVE-WOWLIST-PRODUCTION-DATABASE-ANALYSIS-2026-001");
  assert.equal(source?.contentReviewedAt, "2026-07-15");
  assert.equal(publicSummarySource?.visibility, "public");
  assert.equal(publicSummarySource?.preservationStatus, "live");
  assert.ok(!publicSummarySource?.protectedLocatorId);
  assert.equal(observation?.sourceId, sourceId);
  assert.equal(candidate?.maturity, "promoted");
  assert.deepEqual(candidate?.observationIds, [observation.id]);
  assert.equal(candidate?.targetCanonicalClaimId, claimId);
  assert.equal(task?.status, "completed");
  assert.equal(decision?.decision, "promote");
  assert.equal(decision?.humanReviewStatus, "approved");
  assert.ok(decision?.allowedSurfaces.includes("/work/wowlist"));
  assert.deepEqual(proof?.requiredCanonicalClaimIds, [claimId]);
  assert.ok(manifests.length >= 6);
  assert.ok(manifests.every(({ canonicalClaimIds }) => canonicalClaimIds.includes(claimId)));

  const caseStudy = readFileSync("apps/www/src/content/work/wowlist.mdx", "utf8");
  assert.match(caseStudy, /claimId="CLM-WOWLIST-HISTORICAL-SCALE"/);

  const omission = structuredClone(knowledgeLifecycle);
  const firstManifest = omission.proofSurfaceManifests.find(({ proofIds }) => proofIds.includes(proof.id));
  firstManifest.canonicalClaimIds = firstManifest.canonicalClaimIds.filter((id) => id !== claimId);
  assert.match(validateKnowledgeLifecycle(omission).join("\n"), /Consequential proof wowlist-community-platform lacks canonical claim CLM-WOWLIST-HISTORICAL-SCALE/);
});

test("the WOW List exact-route manifest inventories every rendered canonical claim", () => {
  const route = "/work/wowlist";
  const page = knowledgeBank.pages.find((item) => item.surface === route);
  const renderedClaimIds = [...new Set(page?.occurrences.map(({ claimId }) => claimId) ?? [])].sort();
  const manifest = knowledgeLifecycle.proofSurfaceManifests.find((item) => item.route === route);

  assert.deepEqual([...manifest.canonicalClaimIds].sort(), renderedClaimIds);

  const omission = structuredClone(knowledgeLifecycle);
  omission.proofSurfaceManifests.find((item) => item.route === route).canonicalClaimIds = [
    "CLM-WOWLIST-HISTORICAL-SCALE"
  ];
  assert.match(
    validateKnowledgeLifecycle(omission).join("\n"),
    /Rendered canonical claim CLM-WOWLIST-FACEBOOK-PUBLISHING-MANAGEMENT is missing from exact manifest for \/work\/wowlist/
  );
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
  assert.equal(receipt.projectAssociationStatus, "assigned");
  assert.deepEqual(receipt.projectIds, ["PRJ-CALLNYC"]);
});

test("intake preserves a lead before its project is known", () => {
  const output = execFileSync(process.execPath, [
    "scripts/intake-knowledge-lead.mjs",
    "--title", "An uncategorized archival fragment",
    "--kind", "memory",
    "--summary", "A public-safe fragment awaiting project triage.",
    "--date", "2026-07-15"
  ], { encoding: "utf8" });
  const lead = JSON.parse(output);
  assert.equal(lead.projectAssociationStatus, "unassigned");
  assert.deepEqual(lead.projectIds, []);
  assert.match(lead.nextAction, /Assign the lead to a project or create a project stub/);
});

test("the tracked append-only intake receipts remain valid", () => {
  const receipts = readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8")
    .split("\n").filter(Boolean).map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
  const amendments = readFileSync("docs/knowledge-bank/intake/amendments.jsonl", "utf8")
    .split("\n").filter(Boolean).map((line) => intakeAmendmentSchema.parse(JSON.parse(line)));
  assert.deepEqual(validateIntakeReceipts(receipts, undefined, amendments), []);
  const unassigned = receipts.find(({ id }) => id === "LEAD-STRUCTURE-GROWS-FROM-MATERIAL");
  assert.equal(unassigned?.initialProjectAssociationStatus, "unassigned");
  assert.deepEqual(unassigned?.initialProjectIds, []);
  const amendment = amendments.find(({ receiptId }) => receiptId === "LEAD-NYCA-LET-NYC-DANCE-PRESS-CORPUS");
  assert.match(amendment?.previousValue ?? "", /20-article/);
  assert.match(amendment?.replacementValue ?? "", /21-article/);
});

test("Git-anchored integrity rejects coordinated receipt and retirement erasure", () => {
  const receiptText = readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8");
  const rewrittenReceiptLines = receiptText.split("\n");
  const rewritten = JSON.parse(rewrittenReceiptLines[0]);
  rewritten.title = "Coordinated rewrite";
  rewrittenReceiptLines[0] = JSON.stringify(rewritten);
  assert.match(
    validateAppendOnlySnapshots("receipts", rewrittenReceiptLines.join("\n"), [receiptText]).join("\n"),
    /rewrote append-only record 1/,
  );

  const retirementText = readFileSync("docs/knowledge-bank/governance/retirements.jsonl", "utf8");
  assert.match(
    validateAppendOnlySnapshots("retirements", "", [retirementText]).join("\n"),
    /deleted 1 append-only record/,
  );

  const retirements = retirementText.split("\n").filter(Boolean).map((line) => JSON.parse(line));
  const erasedLifecycle = structuredClone(knowledgeLifecycle);
  erasedLifecycle.promotionDecisions = erasedLifecycle.promotionDecisions.filter(({ id }) => id !== "DEC-WOWLIST-SOCIAL-CASE-STUDY-RETIRE");
  erasedLifecycle.candidateClaims.find(({ id }) => id === "CND-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT").promotionDecisionIds = ["DEC-WOWLIST-SOCIAL-PROMOTE"];
  assert.match(validateRetirementLedger(retirements, erasedLifecycle, knowledgeBank).join("\n"), /has no current retire decision/);
});

test("knowledge-integrity checkpoints bind the governed artifact set", () => {
  const checkpointPath = "docs/knowledge-bank/governance/integrity-checkpoints.jsonl";
  const checkpoints = readFileSync(checkpointPath, "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line));
  const artifactTexts = Object.fromEntries(integrityArtifactPaths.map((path) => [path, readFileSync(path, "utf8")]));
  assert.deepEqual(validateIntegrityCheckpoints(checkpoints, artifactTexts), []);
  const tampered = { ...artifactTexts, [integrityArtifactPaths[0]]: `${artifactTexts[integrityArtifactPaths[0]]}tampered` };
  assert.match(validateIntegrityCheckpoints(checkpoints, tampered).join("\n"), /digest mismatch/);
});

test("every incorporated lead retains its append-only capture receipt", () => {
  const receipts = readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8")
    .split("\n").filter(Boolean).map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
  const amendments = readFileSync("docs/knowledge-bank/intake/amendments.jsonl", "utf8")
    .split("\n").filter(Boolean).map((line) => intakeAmendmentSchema.parse(JSON.parse(line)));
  const broken = receipts.filter(({ id }) => id !== knowledgeLifecycle.leads[0].id);
  assert.match(validateIntakeReceipts(broken, undefined, amendments).join("\n"), /has no append-only intake receipt/);
});

test("immutable receipts permit later lead triage and research associations", () => {
  const receipts = readFileSync("docs/knowledge-bank/intake/receipts.jsonl", "utf8")
    .split("\n").filter(Boolean).map((line) => intakeReceiptSchema.parse(JSON.parse(line)));
  const amendments = readFileSync("docs/knowledge-bank/intake/amendments.jsonl", "utf8")
    .split("\n").filter(Boolean).map((line) => intakeAmendmentSchema.parse(JSON.parse(line)));
  const evolved = structuredClone(knowledgeLifecycle);
  evolved.leads[0].state = "held";
  evolved.leads[0].researchTaskIds = ["TASK-WATERWAYS-RAFT-ENDPOINT", "TASK-WATERWAYS-PROGRAM-RANGE"];
  assert.deepEqual(validateIntakeReceipts(receipts, evolved, amendments), []);
});

test("candidate maturity and research-run implication histories cannot drift", () => {
  const brokenHistory = structuredClone(knowledgeLifecycle);
  brokenHistory.candidateEvents.filter(({ candidateClaimId }) => candidateClaimId === "CND-WATERWAYS-RAFT-GULF-ENDPOINT").at(-1).toMaturity = "promoted";
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

test("the HJE revenue contribution retains intake, research, and visible attribution", () => {
  const lead = knowledgeLifecycle.leads.find(({ id }) => id === "LEAD-HJE-REVENUE-GROWTH-CONTEXT");
  const candidate = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-HJE-REVENUE-GROWTH-CONTRIBUTION");
  const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-HJE-REVENUE-GROWTH-CORROBORATION");
  const canonical = knowledgeBank.claims.find(({ id }) => id === "CLM-HJE-REVENUE-GROWTH-CONTRIBUTION");

  assert.equal(lead?.state, "extracted");
  assert.deepEqual(lead?.candidateClaimIds, [candidate?.id]);
  assert.deepEqual(lead?.researchTaskIds, [task?.id]);
  assert.equal(task?.status, "open");
  assert.deepEqual(candidate?.researchTaskIds, [task?.id]);
  assert.equal(candidate?.publicEvidenceQualifier?.kind, "self-reported");
  assert.ok(canonical?.researchInquiryIds.includes("INQ-HJE-REVENUE-GROWTH-CORROBORATION-2026"));

  const activeMetricProjections = canonical?.projections.filter(
    ({ status, text }) => status === "active" && /2x revenue growth|revenue approximately doubled/i.test(text)
  ) ?? [];
  assert.equal(activeMetricProjections.length, 6);
  assert.ok(activeMetricProjections.every(({ text }) => /Jamie reports/i.test(text)));
  assert.ok(activeMetricProjections.every(({ text }) => /contribut/i.test(text)));
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
  assert.equal(publicCallNyc.candidates.length, 6);
  assert.deepEqual(publicCallNyc.projects.map(({ id }) => id), ["PRJ-CALLNYC"]);
  assert.ok(publicCallNyc.publicationAuthorizations.every(({ authorized }) => authorized));
  assert.deepEqual(publicCallNyc.researchTasks, []);
  assert.deepEqual(publicCallNyc.mediaLeads, []);

  const homepageProofs = retrieveKnowledgePalette({ proofSurface: "/", publicationSafe: true });
  assert.equal(homepageProofs.proofSurfaceManifest?.id, "MANIFEST-PROOFS-HOMEPAGE");
  assert.deepEqual(
    homepageProofs.proofs.map(({ id }) => id),
    homepageProofs.proofSurfaceManifest?.proofIds
  );
  assert.deepEqual(homepageProofs.canonicalClaims.map(({ id }) => id), ["CLM-HJE-REVENUE-GROWTH-CONTRIBUTION", "CLM-WOWLIST-HISTORICAL-SCALE"]);
  assert.deepEqual(homepageProofs.candidates.map(({ id }) => id), ["CND-HJE-REVENUE-GROWTH-CONTRIBUTION", "CND-WOWLIST-HISTORICAL-SCALE"]);
  assert.deepEqual(homepageProofs.researchTasks, []);
  assert.deepEqual(homepageProofs.mediaLeads, []);

  const sundayDinnerProofs = retrieveKnowledgePalette({ proofSurface: "/work/196-sunday-dinner", publicationSafe: true });
  assert.deepEqual(sundayDinnerProofs.projects.map(({ id }) => id), ["PRJ-SUNDAY-DINNER-196"]);
  assert.deepEqual(sundayDinnerProofs.proofs.map(({ id }) => id), ["sunday-dinner-196-participation-infrastructure"]);

  const kcProofs = retrieveKnowledgePalette({ proofSurface: "/work/kc-town-hall", publicationSafe: true });
  assert.deepEqual(kcProofs.projects.map(({ id }) => id), ["PRJ-KC-TOWN-HALL"]);
  assert.deepEqual(kcProofs.candidates.map(({ id }) => id), ["CND-KC-TOWN-HALL-PUBLIC-RECORD", "CND-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION"]);
  assert.deepEqual(kcProofs.canonicalClaims.map(({ id }) => id), ["CLM-KC-TOWN-HALL-PUBLIC-RECORD-2019", "CLM-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION-2026"]);
  assert.deepEqual(kcProofs.researchTasks, []);
  assert.deepEqual(kcProofs.mediaLeads, []);

  const resumePdf = retrieveKnowledgePalette({ proofSurface: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf", publicationSafe: true });
  assert.deepEqual(resumePdf.projects.map(({ id }) => id), ["PRJ-NYC-ARTIST-COALITION", "PRJ-CALLNYC", "PRJ-SUNDAY-DINNER-196", "PRJ-KC-TOWN-HALL", "PRJ-AI-EVALS-PROFESSIONAL-DEVELOPMENT", "PRJ-FAIR-RENT-CRS", "PRJ-WOWLIST", "PRJ-HARRY-J-EPSTEIN"]);
  assert.deepEqual(resumePdf.canonicalClaims.map(({ id }) => id), ["CLM-HJE-REVENUE-GROWTH-CONTRIBUTION", "CLM-KC-TOWN-HALL-PUBLIC-RECORD-2019", "CLM-WOWLIST-HISTORICAL-SCALE", "CLM-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING-2017", "CLM-196-ARTISTS-RESIDENCY-FOUNDER-SCALE"]);
  assert.deepEqual(resumePdf.candidates.map(({ id }) => id), ["CND-HJE-REVENUE-GROWTH-CONTRIBUTION", "CND-WOWLIST-HISTORICAL-SCALE", "CND-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING", "CND-196-ARTISTS-RESIDENCY-FOUNDER-SCALE", "CND-KC-TOWN-HALL-PUBLIC-RECORD"]);
  assert.deepEqual(resumePdf.researchTasks, []);
  assert.deepEqual(resumePdf.mediaLeads, []);

  const hjeProofs = retrieveKnowledgePalette({
    briefId: "BRIEF-HJE-CURRENT",
    surface: "/work/harry-j-epstein",
    proofSurface: "/work/harry-j-epstein",
    publicationSafe: true
  });
  assert.deepEqual(hjeProofs.projects.map(({ id }) => id), ["PRJ-HARRY-J-EPSTEIN"]);
  assert.deepEqual(hjeProofs.canonicalClaims.map(({ id }) => id), ["CLM-HJE-REVENUE-GROWTH-CONTRIBUTION"]);
  assert.deepEqual(hjeProofs.candidates.map(({ id }) => id), ["CND-HJE-REVENUE-GROWTH-CONTRIBUTION"]);
  assert.deepEqual(hjeProofs.researchTasks, []);
  assert.equal(hjeProofs.brief?.id, "BRIEF-HJE-CURRENT");
  assert.ok(hjeProofs.publicationAuthorizations.length > 0);
  assert.ok(hjeProofs.publicationAuthorizations.every(({ authorized }) => authorized));

  const plannedNightlife = retrieveKnowledgePalette({ surface: "future-nightlife-case-study" });
  const publicNightlife = retrieveKnowledgePalette({ surface: "future-nightlife-case-study", publicationSafe: true });
  assert.ok(plannedNightlife.candidates.length > 0);
  assert.deepEqual(publicNightlife.candidates, []);
  assert.deepEqual(publicNightlife.projects, []);
  assert.deepEqual(publicNightlife.canonicalClaims, []);
  assert.deepEqual(publicNightlife.proofs, []);
  assert.deepEqual(publicNightlife.researchTasks, []);
  assert.deepEqual(publicNightlife.mediaLeads, []);
  assert.throws(() => retrieveKnowledgePalette({ publicationSafe: true }), /requires an exact surface/);
});

test("WOW List retrieval preserves research depth and exact-route selectivity", () => {
  const project = retrieveKnowledgePalette({ projectId: "PRJ-WOWLIST" });
  const projectCandidateIds = new Set(project.candidates.map(({ id }) => id));
  const projectTaskIds = new Set(project.researchTasks.map(({ id }) => id));

  assert.ok(projectCandidateIds.has("CND-WOWLIST-FACEBOOK-PUBLISHING-MANAGEMENT"));
  assert.ok(projectCandidateIds.has("CND-WOWLIST-FACEBOOK-POST-POPULATION"));
  assert.ok(projectCandidateIds.has("CND-WOWLIST-FACEBOOK-CARE-ADVOCACY-ARC"));
  assert.ok(projectCandidateIds.has("CND-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT"));
  assert.ok(projectTaskIds.has("TASK-WOWLIST-FACEBOOK-NATIVE-EXPORT"));
  assert.ok(projectTaskIds.has("TASK-WOWLIST-FACEBOOK-ENGAGEMENT-CORROBORATION"));
  assert.ok(projectTaskIds.has("TASK-WOWLIST-MEMBERS-MEETING-VISUAL-RESEARCH"));
  assert.ok(project.mediaLeads.some(({ id, displayStatus }) => id === "MEDIA-WOWLIST-MEMBERS-MEETING-2015" && displayStatus === "hold"));

  const publicCaseStudy = retrieveKnowledgePalette({ surface: "/work/wowlist", publicationSafe: true });
  const publicCandidateIds = new Set(publicCaseStudy.candidates.map(({ id }) => id));
  const publicCanonicalIds = new Set(publicCaseStudy.canonicalClaims.map(({ id }) => id));
  assert.ok(publicCandidateIds.has("CND-WOWLIST-FACEBOOK-PUBLISHING-MANAGEMENT"));
  assert.ok(!publicCandidateIds.has("CND-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT"));
  assert.ok(!publicCanonicalIds.has("CLM-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT"));
  assert.ok(!publicCandidateIds.has("CND-WOWLIST-FACEBOOK-POST-POPULATION"));
  assert.ok(!publicCandidateIds.has("CND-WOWLIST-FACEBOOK-OPERATING-PRACTICE"));
  assert.ok(!publicCandidateIds.has("CND-WOWLIST-FACEBOOK-CARE-ADVOCACY-ARC"));
  assert.deepEqual(publicCaseStudy.researchTasks, []);
  assert.deepEqual(publicCaseStudy.mediaLeads, []);

  const retiredDecision = knowledgeLifecycle.promotionDecisions.find(({ id }) => id === "DEC-WOWLIST-SOCIAL-CASE-STUDY-RETIRE");
  assert.equal(retiredDecision?.decision, "retire");
  assert.equal(retiredDecision?.supersedesDecisionId, "DEC-WOWLIST-SOCIAL-PROMOTE");
  assert.deepEqual(retiredDecision?.allowedSurfaces, []);
  assert.deepEqual(retiredDecision?.retiredSurfaces, ["/work/wowlist"]);

  const staleRetirement = structuredClone(knowledgeLifecycle);
  staleRetirement.promotionDecisions.find(({ id }) => id === "DEC-WOWLIST-SOCIAL-CASE-STUDY-RETIRE").supersedesDecisionId = undefined;
  assert.match(validateKnowledgeLifecycle(staleRetirement).join("\n"), /Inactive canonical projection .* retains active route authorization/);

  const erasedRetirementHistory = structuredClone(knowledgeLifecycle);
  const retiredClaim = knowledgeBank.claims.find(({ id }) => id === "CLM-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT");
  const retiredProjection = retiredClaim.projections[0];
  const originalRetiredSurfaces = [...retiredProjection.surfaces];
  try {
    retiredProjection.surfaces = [];
    assert.match(validateKnowledgeLifecycle(erasedRetirementHistory).join("\n"), /has no inactive projection history/);
  } finally {
    retiredProjection.surfaces = originalRetiredSurfaces;
  }

  assert.throws(
    () => retrieveKnowledgePalette({ surface: "/work/wowlist", briefId: "BRIEF-WOWLIST-VISUAL-RESEARCH", publicationSafe: true }),
    /rejects non-public brief/,
  );
  assert.throws(
    () => retrieveKnowledgePalette({ surface: "/resume", briefId: "BRIEF-WOWLIST-CURRENT", publicationSafe: true }),
    /outside target surface \/resume/,
  );
});

test("WOW List visual research remains a rights-gated evidence feedback loop", () => {
  const task = knowledgeLifecycle.researchTasks.find(({ id }) => id === "TASK-WOWLIST-MEMBERS-MEETING-VISUAL-RESEARCH");
  const brief = knowledgeLifecycle.editorialBriefs.find(({ id }) => id === "BRIEF-WOWLIST-VISUAL-RESEARCH");
  const media = knowledgeLifecycle.mediaLeads.find(({ id }) => id === "MEDIA-WOWLIST-MEMBERS-MEETING-2015");

  assert.equal(task?.status, "open");
  assert.equal(task?.requiresContentReviewAuthorization, true);
  assert.deepEqual(task?.sourceIds, ["SRC-WOWLIST-MEMBERS-MEETING-VIDEO-2015"]);
  assert.ok(task?.methods.some((item) => /atomic observation/i.test(item)));
  assert.ok(task?.limitations.some((item) => /not authorized for public display/i.test(item)));
  assert.equal(brief?.publicationIntent, "internal-brief");
  assert.deepEqual(brief?.mediaLeadIds, ["MEDIA-WOWLIST-MEMBERS-MEETING-2015"]);
  assert.equal(media?.rightsStatus, "unknown");
  assert.equal(media?.consentStatus, "review-needed");
  assert.equal(media?.displayStatus, "hold");
  assert.equal(media?.contentReviewStatus, "not-authorized");
  assert.deepEqual(media?.contentReviewTaskIds, [task.id]);
  assert.ok(media?.researchTaskIds.includes(task.id));

  const unauthorizedReview = structuredClone(knowledgeLifecycle);
  unauthorizedReview.researchTasks.find(({ id }) => id === task.id).status = "in-progress";
  assert.match(
    validateKnowledgeLifecycle(unauthorizedReview).join("\n"),
    /cannot enter in-progress before media lead MEDIA-WOWLIST-MEMBERS-MEETING-2015 receives content-review authorization/,
  );

  const omittedTaskGate = structuredClone(knowledgeLifecycle);
  delete omittedTaskGate.researchTasks.find(({ id }) => id === task.id).requiresContentReviewAuthorization;
  assert.match(
    validateKnowledgeLifecycle(omittedTaskGate).join("\n"),
    /must declare content-review authorization/,
  );

  const omittedMediaAssignment = structuredClone(knowledgeLifecycle);
  delete omittedMediaAssignment.mediaLeads.find(({ id }) => id === media.id).contentReviewTaskIds;
  assert.match(
    validateKnowledgeLifecycle(omittedMediaAssignment).join("\n"),
    /must explicitly declare content-review task IDs/,
  );

  const coordinatedDowngrade = structuredClone(knowledgeLifecycle);
  coordinatedDowngrade.mediaLeads.find(({ id }) => id === media.id).contentReviewTaskIds = [];
  delete coordinatedDowngrade.researchTasks.find(({ id }) => id === task.id).requiresContentReviewAuthorization;
  assert.match(
    validateKnowledgeLifecycle(coordinatedDowngrade).join("\n"),
    /reviews protected content but has no media-assigned authorization gate/,
  );

  const paraphrasedDowngrade = structuredClone(knowledgeLifecycle);
  const downgradedTask = paraphrasedDowngrade.researchTasks.find(({ id }) => id === task.id);
  const downgradedMedia = paraphrasedDowngrade.mediaLeads.find(({ id }) => id === media.id);
  downgradedTask.methods[0] = "Do not inspect protected video frames until rights, consent, and participant-identity protections are resolved.";
  downgradedTask.actions = [];
  delete downgradedTask.requiresContentReviewAuthorization;
  downgradedMedia.contentReviewTaskIds = [];
  assert.match(
    validateKnowledgeLifecycle(paraphrasedDowngrade).join("\n"),
    /requires at least one protected-content review task/,
  );

  const ungovernedAuthorization = structuredClone(media);
  ungovernedAuthorization.contentReviewStatus = "authorized";
  assert.equal(mediaLeadSchema.safeParse(ungovernedAuthorization).success, false);

  const governedAuthorization = {
    ...ungovernedAuthorization,
    contentReviewAuthority: "jamie-approved",
    contentReviewAuthorizedBy: "Jamie Burkart",
    contentReviewAuthorizedAt: "2026-07-16",
  };
  assert.equal(mediaLeadSchema.safeParse(governedAuthorization).success, true);
});

test("retrieval composes cross-project palettes by time, entity, evidence, priority, audience, and purpose", () => {
  const earlyPractice = retrieveKnowledgePalette({
    entityId: "ENT-JAMIE-BURKART",
    fromYear: 2006,
    toYear: 2009,
    evidenceRole: "direct-support"
  });
  assert.deepEqual(earlyPractice.projects.map(({ id }) => id), [
    "PRJ-URBANHERM-PUBLIC-RECORD",
    "PRJ-WATERWAYS-PARTICIPATORY-ART",
    "PRJ-GREAT-ACCOMMODATIONS",
    "PRJ-OPEN-HOUSE",
    "PRJ-UCSC-MEDIA-SYSTEMS-PRACTICE"
  ]);
  assert.ok(earlyPractice.candidates.every((candidate) => candidate.observationIds.some((id) => relationshipRole(knowledgeLifecycle.observations.find((item) => item.id === id), candidate.id) === "direct-support")));

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
