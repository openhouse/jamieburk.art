import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateChadLens,
  evaluateCampaignPressCorpus,
  evaluateEvidenceExpansion,
  evaluateKcTownHallCouncilAllocation,
  evaluateKnowledgeLifecycle,
  summarizeLaunchEvals
} from "../lib/launch-readiness-evals.mjs";

test("all passing weighted evals reach automated readiness", () => {
  const summary = summarizeLaunchEvals([
    { id: "a", weight: 60, hardGate: true, status: "pass" },
    { id: "b", weight: 40, hardGate: false, status: "pass" }
  ]);

  assert.equal(summary.score, 100);
  assert.equal(summary.hardGatesPass, true);
  assert.equal(summary.automatedReady, true);
});

test("a failed hard gate blocks readiness even above the score threshold", () => {
  const summary = summarizeLaunchEvals([
    { id: "a", weight: 95, hardGate: false, status: "pass" },
    { id: "b", weight: 5, hardGate: true, status: "fail" }
  ]);

  assert.equal(summary.score, 95);
  assert.equal(summary.hardGatesPass, false);
  assert.equal(summary.automatedReady, false);
  assert.deepEqual(summary.failedHardGateIds, ["b"]);
});

test("score threshold blocks an incomplete soft-criterion pass", () => {
  const summary = summarizeLaunchEvals([
    { id: "a", weight: 90, hardGate: true, status: "pass" },
    { id: "b", weight: 10, hardGate: false, status: "fail" }
  ]);

  assert.equal(summary.score, 90);
  assert.equal(summary.hardGatesPass, true);
  assert.equal(summary.automatedReady, false);
});

const compliantChadLensFixture = {
  hero: [
    "Technical Project Manager - Product Operations & Implementation",
    "I turn emerging work into usable systems for complex public-facing teams.",
    "I help teams",
    "View selected work",
    "Download resume",
    "Contact Jamie"
  ].join(" "),
  homePage:
    'Quick path through the portfolio emerging,\n high-context work href: "/work/technical-operations" href: "/resume"',
  technicalOperations: [
    "Role fit at a glance",
    "Where I enter",
    "What I coordinate",
    "What teams can use afterward",
    "A public-facing project has multiple stakeholders",
    "I coordinate requirements",
    "Teams leave with",
    ...Array.from({ length: 8 }, (_, index) => `proof:\n      "I proof ${index}"`)
  ].join(" "),
  resumePage: [
    "Technical Project Manager - Product Operations & Implementation",
    "I turn emerging work into usable systems for complex public-facing teams.",
    "Selected impact",
    "Download resume PDF",
    "Contact Jamie"
  ].join(" "),
  proofs: [
    'id: "career-operating-structure-14-years"',
    'id: "hje-revenue-growth-contribution"',
    'id: "fair-rent-campaign-memory"',
    'id: "callnyc-council-member-amplification"'
  ].join(" "),
  chadGuide: [
    "Is Jamie visible as the actor?",
    'Does the sentence answer "toward what end?"',
    "Does the language say what became usable?",
    "courageous precision"
  ].join(" ")
};

test("Chad lens passes when actor, end, outputs, proof, and path are explicit", () => {
  assert.deepEqual(evaluateChadLens(compliantChadLensFixture), []);
});

test("Chad lens reports reader burden and actorless proof summaries", () => {
  const failures = evaluateChadLens({
    ...compliantChadLensFixture,
    homePage: "ambiguous, high-context situations",
    technicalOperations: "systems systems systems"
  });

  assert.ok(failures.some((failure) => failure.includes("Where I enter")));
  assert.ok(failures.some((failure) => failure.includes("actor-led proof summaries")));
  assert.ok(failures.some((failure) => failure.includes("ambiguity")));
});

const lifecycleFixture = {
  schema:
    "intakeRecordSchema projectRecordSchema publicationDecisionSchema proofCoverageSchema publicSafety editorialStatus",
  records:
    "frameworkIntake frameworkProjects frameworkSources frameworkClaims frameworkInquiries frameworkPublicationDecisions frameworkProofCoverage",
  framework: [
    "No silent loss photoBrief",
    "LEAD-NYCARTC-COFOUNDING-MEMORY",
    "LEAD-CABARET-LAW-ROLE-MEMORY",
    "LEAD-OFFICE-NIGHTLIFE-ROLE-MEMORY",
    "LEAD-NIGHTLIFE-TOWN-HALLS-MEMORY",
    "LEAD-TALKS-NOT-RAIDS-MARCH-MEMORY",
    "LEAD-RAFT-GULF-MEMORY",
    "LEAD-WATERWAYS-PUBLIC-ENGAGEMENT-MEMORY",
    "LEAD-PITCH-RAFT-2007",
    "LEAD-CHARLOTTE-GREAT-ACCOMMODATIONS-2009",
    "LEAD-GOOD-TIMES-OPEN-HOUSE-2006",
    "LEAD-GOTHAMIST-CABARET-2017",
    "LEAD-NPR-CABARET-REPEAL-2017",
    "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
    "SRC-RAFT-PITCH-2007",
    "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009",
    "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
    "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAM",
    "CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM",
    "CLM-RIVER-RAFT-EXPEDITION",
    "CLM-NYCARTC-CABARET-ORGANIZING",
    "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL",
    'coverage("proof-a"'
  ].join(" "),
  knowledgeReadme:
    "No silent loss Evidentiary maturity Publication safety Editorial selection Publicly defensible does not mean selected",
  fairRentCase: "CLM-NYCARTC-CABARET-ORGANIZING cabaret-organizing",
  proofs: '    id: "proof-a"'
};

test("knowledge lifecycle passes with intake, maturity, coverage, and selection", () => {
  assert.deepEqual(evaluateKnowledgeLifecycle(lifecycleFixture), []);
});

test("knowledge lifecycle catches lost intake and uncovered public proofs", () => {
  const failures = evaluateKnowledgeLifecycle({
    ...lifecycleFixture,
    framework: "No silent loss",
    proofs: '    id: "uncovered-proof"'
  });

  assert.ok(failures.some((failure) => failure.includes("LEAD-RAFT-GULF-MEMORY")));
  assert.ok(failures.some((failure) => failure.includes("uncovered-proof")));
});

const evidenceExpansionFixture = {
  framework: [
    "SRC-GHFC-JAMIE-JULIA-QA-2017",
    "SRC-BEDFORD-BOWERY-DIY-SPACES-2017",
    "SRC-VICE-NYCARTC-DCA-2017",
    "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
    "SRC-SAVE-NYC-SPACES-CAMPAIGN",
    "SRC-EDGE-OF-SOUND-SAVE-NYC-SPACES-2017",
    "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
    "SRC-TALKS-NOT-RAIDS-CAMPAIGN",
    "SRC-NYC-COUNCIL-MARCH-REPORTING-2019",
    "SRC-KCMO-CCED-ROUND2-MINUTES-2019",
    "CLM-NYCARTC-EARLY-MUTUAL-AID-ORGANIZING",
    "CLM-NYCARTC-NIGHTLIFE-TOWN-HALL",
    "CLM-NYCARTC-MARCH-TRANSPARENCY",
    "CLM-SUNDAY-DINNER-WEEKLY-OPEN",
    "CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION",
    'coverage("wowlist-community-platform", "partially-backed"',
    'coverage("sunday-dinner-196-participation-infrastructure", "partially-backed"',
    'coverage("kc-town-hall-public-benefit-documentation", "source-backed"'
  ].join(" "),
  fairRentCase: [
    "CLM-NYCARTC-EARLY-MUTUAL-AID-ORGANIZING",
    "CLM-NYCARTC-NIGHTLIFE-TOWN-HALL",
    "CLM-NYCARTC-MARCH-TRANSPARENCY",
    "early-mutual-aid-organizing nightlife-town-hall march-transparency"
  ].join(" "),
  sundayDinnerCase:
    'CLM-SUNDAY-DINNER-WEEKLY-OPEN weekly-open-gathering pageId="196-sunday-dinner"',
  kcTownHallCase:
    "CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION council-allocation"
};

test("evidence expansion passes with ten integrated sources and selected projections", () => {
  assert.deepEqual(evaluateEvidenceExpansion(evidenceExpansionFixture), []);
});

test("evidence expansion rejects source accumulation without public integration", () => {
  const failures = evaluateEvidenceExpansion({
    ...evidenceExpansionFixture,
    framework: "SRC-GHFC-JAMIE-JULIA-QA-2017",
    fairRentCase: ""
  });

  assert.ok(failures.some((failure) => failure.includes("SRC-NYC-COUNCIL-MARCH")));
  assert.ok(failures.some((failure) => failure.includes("march-transparency")));
});

test("evidence expansion rejects a citation page ID that cannot resolve on its route", () => {
  const failures = evaluateEvidenceExpansion({
    ...evidenceExpansionFixture,
    sundayDinnerCase: "CLM-SUNDAY-DINNER-WEEKLY-OPEN weekly-open-gathering"
  });

  assert.ok(failures.some((failure) => failure.includes('pageId="196-sunday-dinner"')));
});

const kcTownHallCouncilAllocationFixture = {
  framework: [
    "LEAD-KCMO-KC-TOWN-HALL-COUNCIL-ACTION-2019",
    "SRC-KCMO-ORDINANCE-190642-2019",
    "SRC-KCMO-RESOLUTION-190649-2019",
    "CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION",
    "INQ-KC-TOWN-HALL-AGREEMENT-DISBURSEMENT",
    "LEAD-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-MEMORY",
    "INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION",
    "2019-09-26 $490,539",
    "Committee Substitute for Ordinance No. 190642",
    "Second Committee Substitute for Resolution No. 190649",
    "executed funding agreement receipt or disbursement of funds",
    'id: "kc-town-hall" period: "2019" status: "historical"'
  ].join(" "),
  proofs: [
    'id: "kc-town-hall-public-benefit-documentation"',
    "Council allocated $490,539",
    "executed agreement",
    "receipt or disbursement"
  ].join(" "),
  kcTownHallCase: [
    'claimId="CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION"',
    'occurrenceId="council-allocation"',
    "Council allocated $490,539",
    "does not establish an executed funding agreement, receipt or disbursement"
  ].join(" "),
  councilAllocationDoc: [
    "Ordinance No. 190642",
    "Resolution No. 190649",
    "September 26, 2019",
    "$490,539",
    "Council allocation",
    "executed funding agreement",
    "receipt or disbursement"
  ].join(" "),
  stewardshipTransitionDoc: [
    "Jamie Burkart firsthand correction",
    "mission-aligned organization",
    "not selected for public projection",
    "No personal circumstances are recorded",
    "INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION"
  ].join(" "),
  workData: [
    "after a unanimous board recommendation, the Council allocated $490,539",
    "Official Kansas City board minutes, Ordinance No. 190642, and Resolution No. 190649",
    "$490,539 Council allocation after unanimous board recommendation",
    'currentStatus: "Historical project."',
    "Funding-agreement execution, receipt or disbursement, later implementation, current property or operating status"
  ].join(" ")
};

test("KC Town Hall Council allocation passes with primary records and boundaries", () => {
  assert.deepEqual(
    evaluateKcTownHallCouncilAllocation(kcTownHallCouncilAllocationFixture),
    []
  );
});

test("KC Town Hall Council allocation rejects a missing ordinance", () => {
  const failures = evaluateKcTownHallCouncilAllocation({
    ...kcTownHallCouncilAllocationFixture,
    framework: kcTownHallCouncilAllocationFixture.framework.replace(
      "SRC-KCMO-ORDINANCE-190642-2019",
      ""
    )
  });

  assert.ok(
    failures.some((failure) => failure.includes("SRC-KCMO-ORDINANCE-190642-2019"))
  );
});

test("KC Town Hall Council allocation rejects receipt language", () => {
  const failures = evaluateKcTownHallCouncilAllocation({
    ...kcTownHallCouncilAllocationFixture,
    kcTownHallCase:
      `${kcTownHallCouncilAllocationFixture.kcTownHallCase} Jamie received $490,539.`
  });

  assert.ok(failures.some((failure) => failure.includes("conflates")));
});

test("KC Town Hall transition requires an explicit privacy boundary", () => {
  const failures = evaluateKcTownHallCouncilAllocation({
    ...kcTownHallCouncilAllocationFixture,
    stewardshipTransitionDoc: kcTownHallCouncilAllocationFixture.stewardshipTransitionDoc.replace(
      "No personal circumstances are recorded",
      ""
    )
  });

  assert.ok(
    failures.some((failure) => failure.includes("No personal circumstances are recorded"))
  );
});

const campaignPressFixture = {
  schema: "unverified",
  campaignPress: [
    "campaignPressEntries campaignPressIndexes campaignPressExpectedCounts",
    '"let-nyc-dance": 21 "talks-not-raids": 7 "save-nyc-spaces": 8 "fair-rent-nyc": 10',
    "totalOccurrences: 46 uniqueArticles: 45",
    "https://letnycdance.nycartc.com/ https://talksnotraids.com/",
    "https://savenycspaces.nycartc.com/",
    "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    "https://fairrentnyc.nycartc.com/library/",
    "Press-index membership is not evidence that Jamie appears in or authored the article"
  ].join(" "),
  framework:
    "campaignPressIntake campaignPressNewSourceIds campaignPressSources INQ-NYCARTC-CAMPAIGN-PRESS-CORPUS Preserve campaign membership while deduplicating shared articles",
  campaignPressDoc:
    "46 index occurrences 45 unique articles Let NYC Dance Talks Not Raids Save NYC Spaces Fair Rent NYC Index membership is not claim support"
};

test("campaign press corpus passes when four indexes are complete and bounded", () => {
  assert.deepEqual(evaluateCampaignPressCorpus(campaignPressFixture), []);
});

test("campaign press corpus rejects dropped cross-campaign membership", () => {
  const failures = evaluateCampaignPressCorpus({
    ...campaignPressFixture,
    campaignPress: "campaignPressEntries uniqueArticles: 45"
  });
  assert.ok(failures.some((failure) => failure.includes("totalOccurrences: 46")));
  assert.ok(failures.some((failure) => failure.includes("fair-rent-nyc")));
});
