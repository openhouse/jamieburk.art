import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateChadLens,
  evaluateCampaignPressCorpus,
  evaluateEvidenceExpansion,
  evaluateGoogleSharedDriveArchiveProduction,
  evaluateICloudArchiveProduction,
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

const iCloudArchiveFixture = {
  framework: [
    "LEAD-ICLOUD-JAMIE-PROJECTS-HISTORY-PASS-2026",
    "LEAD-ICLOUD-CRS-OPERATING-BACKBONE-PASS-2026",
    "LEAD-ICLOUD-JOB-HUNT-PROOF-AUDIT-2026",
    "SRC-CLAUDETTE-MICHAEL-REES SRC-CLAUDETTE-MAKE-US-VISIBLE",
    "SRC-CRS-OPERATING-BACKBONE-ARCHIVE-2026",
    "SRC-JOB-HUNT-PROOF-AUDIT-2026",
    "CLM-CLAUDETTE-AR-COLLABORATION CLM-CRS-OPERATING-BACKBONE-2026",
    "INQ-JOB-HUNT-QUANTIFIED-PROOF-DEBT",
    "PUB-CLAUDETTE-AR-COLLABORATION PUB-CRS-OPERATING-BACKBONE-2026",
    'coverage("fair-rent-campaign-memory", "partially-backed"',
    "The plan establishes design intent; the running minutes establish subsequent use",
    "private-support renderCitation: false"
  ].join(" "),
  proofs: [
    'id: "fair-rent-campaign-memory"',
    "Designed and maintained a lightweight operating backbone",
    "running minutes, decision records, action ownership, open questions, source boundaries",
    "Jamie completed every proposed operating deliverable"
  ].join(" "),
  technicalOperations: [
    "I designed and maintained a lightweight operating backbone for multi-organization policy work",
    "running minutes, decision records, action ownership, open questions, source boundaries, and coordinated city/state work"
  ].join(" "),
  archiveDoc: [
    "Jamie Projects History CRS job-hunt",
    "not recovered in this pass does not mean it did not exist",
    "Private material excluded from ingestion",
    "Reserve Technical Operations INQ-JOB-HUNT-QUANTIFIED-PROOF-DEBT"
  ].join(" ")
};

test("iCloud archive production passes with asymmetric dispositions and privacy", () => {
  assert.deepEqual(evaluateICloudArchiveProduction(iCloudArchiveFixture), []);
});

test("iCloud archive production rejects local paths and missing archive lanes", () => {
  const failures = evaluateICloudArchiveProduction({
    ...iCloudArchiveFixture,
    archiveDoc: `${iCloudArchiveFixture.archiveDoc.replace("job-hunt", "")} /Users/example/private`
  });

  assert.ok(failures.some((failure) => failure.includes("job-hunt")));
  assert.ok(failures.some((failure) => failure.includes("local filesystem path")));
});

const googleSharedDriveArchiveFixture = {
  framework: [
    "LEAD-GDRIVE-SHARED-DRIVES-ARCHIVAL-PASS-2026",
    "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    "SRC-GDRIVE-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
    "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
    "SRC-GDRIVE-SUNDAY-DINNER-PHOTO-SET-2025",
    "SRC-GDRIVE-NYCARTC-MUTUAL-SUPPORT-FAQ-2017",
    "SRC-GDRIVE-NYCARTC-CURE-PERIODS-DATA-NOTE-2019",
    "SRC-GDRIVE-SOURCE-BACKED-SPRINT-PROPOSAL-2026",
    "CLM-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
    "CLM-196-RESIDENCY-ONBOARDING-2023",
    "CLM-NYCARTC-MUTUAL-SUPPORT-RESOURCE-2017",
    "INQ-NYCARTC-CURE-PERIODS-DATA-NOTE-AUTHORSHIP",
    "INQ-GDRIVE-DEFERRED-COLLECTION-REVIEW",
    "INQ-COMMERCIAL-VACANCY-PUBLICATION-OUTCOME",
    "PUB-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
    "PUB-196-RESIDENCY-ONBOARDING-2023",
    "PUB-NYCARTC-MUTUAL-SUPPORT-RESOURCE-2017",
    'coverage("commercial-vacancy-public-data-brief", "source-backed"',
    'coverage("source-backed-team-memory-method", "partially-backed"',
    "Shared Drive custody and file content establish that the proposal existed, not Jamie's authorship",
    "private-support renderCitation: false"
  ].join(" "),
  proofs: [
    'id: "commercial-vacancy-public-data-brief"',
    "privacy-preserving, geography-aggregated commercial vacancy, occupancy, and lease-cost indicators",
    "New York City adopted Jamie's proposal",
    'id: "sunday-dinner-196-participation-infrastructure"',
    "proposal review, resident onboarding, space configuration",
    "One onboarding record independently verifies the 20-plus resident aggregate"
  ].join(" "),
  technicalOperations: [
    'project: "Commercial Vacancy Data"',
    "privacy-preserving commercial vacancy and lease-cost indicators",
    "coverage, suppression, and methods requirements"
  ].join(" "),
  fairRentCase: [
    "CLM-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
    "not evidence that New York City adopted, implemented, or published"
  ].join(" "),
  sundayDinnerCase: [
    "CLM-196-RESIDENCY-ONBOARDING-2023",
    "does not independently verify the larger residency aggregate"
  ].join(" "),
  archiveDoc: [
    "110 Shared Drives",
    "collection-scale accession pass plus focused close reading",
    "access visibility as not verified",
    "Shared Drive presence was never treated as proof",
    "Selected public claims Reserve depth Research debt created rather than concealed",
    "Private material excluded from ingestion",
    "eleven candidate image files",
    "unreviewed archive is not evidence that records did not exist"
  ].join(" ")
};

test("Google Shared Drive archive production passes with bounded asymmetric dispositions", () => {
  assert.deepEqual(
    evaluateGoogleSharedDriveArchiveProduction(googleSharedDriveArchiveFixture),
    []
  );
});

test("Google Shared Drive archive production rejects private links and missing collection scope", () => {
  const failures = evaluateGoogleSharedDriveArchiveProduction({
    ...googleSharedDriveArchiveFixture,
    archiveDoc: `${googleSharedDriveArchiveFixture.archiveDoc.replace("110 Shared Drives", "Shared Drives")} https://docs.google.com/document/d/private`
  });

  assert.ok(failures.some((failure) => failure.includes("110 Shared Drives")));
  assert.ok(failures.some((failure) => failure.includes("private path or Drive link")));
});
