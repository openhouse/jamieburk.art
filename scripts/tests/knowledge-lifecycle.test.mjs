import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { knowledgeLifecycle } from "../../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { intakeAmendmentSchema, intakeReceiptSchema } from "../../apps/www/src/data/knowledge-bank/lifecycle-schema.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { validateIntakeReceipts, validateKnowledgeLifecycle } from "../lib/knowledge-lifecycle-validation.mjs";
import { retrieveKnowledgePalette } from "../lib/knowledge-palette.mjs";

function relationshipRole(observation, candidateClaimId) {
  return observation?.candidateRelationships.find((item) => item.candidateClaimId === candidateClaimId)?.evidenceRole
    ?? observation?.evidenceRole;
}

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
  const nerman = knowledgeLifecycle.observations.find(({ id }) => id === "OBS-NTER-CHNG-NERMAN-BOUNDARY");

  assert.equal(project?.status, "historical");
  assert.ok(project?.entityIds.includes("ENT-DREW-BOLTON"));
  assert.ok(project?.entityIds.includes("ENT-GARRETT-FUSELIER"));
  assert.equal(candidate?.maturity, "promoted");
  assert.equal(candidate?.targetCanonicalClaimId, canonical?.id);
  assert.ok(candidate?.antiClaims.some((item) => /solely created/i.test(item)));
  assert.ok(candidate?.antiClaims.some((item) => /Nerman Museum/i.test(item)));
  assert.equal(task?.status, "completed");
  assert.equal(task?.sourceIds.length, 6);
  assert.ok(task?.limitations.some((item) => /press release was not recovered/i.test(item)));
  assert.equal(decision?.decision, "promote");
  assert.deepEqual(decision?.allowedSurfaces, ["knowledge-bank", "future-cultural-technology-case-study"]);
  assert.equal(canonical?.projections[0]?.status, "hold");
  assert.deepEqual(canonical?.projections[0]?.surfaces, []);
  assert.equal(protectedPage?.visibility, "public-metadata-only");
  assert.equal(protectedPage?.protectedLocatorId, "WEB-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011-001");
  assert.equal(protectedPage?.canonicalUrl, undefined);
  assert.equal(protectedPage?.archiveUrl, undefined);
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
  assert.deepEqual(publicCallNyc.researchTasks, []);
  assert.deepEqual(publicCallNyc.mediaLeads, []);

  const homepageProofs = retrieveKnowledgePalette({ proofSurface: "/", publicationSafe: true });
  assert.equal(homepageProofs.proofSurfaceManifest?.id, "MANIFEST-PROOFS-HOMEPAGE");
  assert.deepEqual(
    homepageProofs.proofs.map(({ id }) => id),
    homepageProofs.proofSurfaceManifest?.proofIds
  );
  assert.deepEqual(homepageProofs.canonicalClaims, []);
  assert.deepEqual(homepageProofs.candidates, []);
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
  assert.deepEqual(resumePdf.projects.map(({ id }) => id), ["PRJ-NYC-ARTIST-COALITION", "PRJ-CALLNYC", "PRJ-SUNDAY-DINNER-196", "PRJ-KC-TOWN-HALL", "PRJ-FAIR-RENT-CRS", "PRJ-WOWLIST"]);
  assert.deepEqual(resumePdf.canonicalClaims.map(({ id }) => id), ["CLM-KC-TOWN-HALL-PUBLIC-RECORD-2019"]);
  assert.deepEqual(resumePdf.candidates.map(({ id }) => id), ["CND-KC-TOWN-HALL-PUBLIC-RECORD"]);
  assert.deepEqual(resumePdf.researchTasks, []);
  assert.deepEqual(resumePdf.mediaLeads, []);

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
