import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  evaluateCallNycFullPopulationArchive,
  evaluateChadLens,
  evaluateCampaignPressCorpus,
  evaluateEvidenceExpansion,
  evaluateGoogleSharedDriveArchiveProduction,
  evaluateICloudArchiveExpansion,
  evaluateICloudArchiveProduction,
  evaluateJamieFacebookPostArchive,
  evaluateKcSpacesFundFacebookPostArchive,
  evaluateKcTownHallCouncilAllocation,
  evaluateKcTownHallFullPopulationArchive,
  evaluateKnowledgeLifecycle,
  evaluateNycArtCFullPopulationArchive,
  evaluateNycArtCFacebookEventArchive,
  evaluateNycArtCFacebookPostArchive,
  evaluatePersonalWowlistFacebookEventArchive,
  evaluateProjectSocialArchiveProduction,
  evaluateUrbanHermitFullPopulationArchive,
  evaluateWowlistFacebookPostArchive,
  evaluateWowlistFullPopulationArchive,
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
    'id: "kc-town-hall" period: "2018-2022 public record" status: "historical"'
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
    'coverage("fair-rent-campaign-memory", "source-backed"',
    "The plan establishes design intent; the 34-page running minutes establish subsequent use",
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

const iCloudArchiveExpansionFixture = {
  framework: [
    "iCloudTeamsExpansionIntake iCloudTeamsExpansionProjects iCloudTeamsExpansionSources",
    "iCloudTeamsExpansionClaims iCloudTeamsExpansionInquiries",
    "iCloudTeamsExpansionPublicationDecisions iCloudTeamsExpansionProofCoverage",
    'coverage("fair-rent-campaign-memory", "source-backed"',
    "34-page running-minutes record",
    "An earlier April 29 snapshot is 12 pages",
    "exact NYC Artist Coalition co-founder wording"
  ].join(" "),
  expansionBatch: [
    "LEAD-ICLOUD-JPH-CREATIVE-TECHNOLOGY-EXPANSION-2026",
    "LEAD-ICLOUD-CRS-THIRTY-FOUR-PAGE-VERIFICATION-2026",
    "LEAD-ICLOUD-JOB-HUNT-JULY-RESUME-AUDIT-2026",
    "creative-technology-practice",
    "SRC-COOL-HUNTING-TIME-IS-LONG-2006 SRC-PITCH-NTER-CHNG-2010",
    "SRC-VIMEO-NTER-CHNG-2011 SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013",
    "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
    "CLM-TIME-IS-LONG-DELAY-INSTALLATION-2006",
    "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION-2010",
    "CLM-SORTED-AUDIO-MAX-MSP-2013",
    "CLM-CREATIVE-TECHNOLOGY-LONGITUDINAL-2006-2016",
    "INQ-CREATIVE-TECHNOLOGY-ROLE-ASSET-RECOVERY",
    "PUB-CREATIVE-TECHNOLOGY-LONGITUDINAL-2006-2016",
    'decision: "reserve"',
    "Drew Bolton Garrett Fuselier M.C. Schmidt",
    "not uninterrupted full-time practice"
  ].join(" "),
  archiveDoc: [
    "68 top-level items in Teams 15 project packets 175 top-level items in CRS",
    "58 top-level items in job-hunt authenticated iCloud Drive web session",
    "locally materialized working folders not materialized locally is not absent",
    "April 29 snapshot containing 12 pages",
    "April-May running-minutes document containing 34 pages",
    "first-party research maps do not independently corroborate",
    "phone number remains excluded from website HTML",
    "No new reserve claim is automatically projected"
  ].join(" "),
  creativeTechDoc: [
    "Time Is Long NTER CHNG A Sorted Audio File Truthers",
    "Drew Bolton Garrett Fuselier M.C. Schmidt",
    "not proof of uninterrupted full-time practice media-rights"
  ].join(" "),
  sourceCoverage: [
    "fair-rent-campaign-memory",
    "34-page April-May running-minutes document verifies the public",
    "earlier 12-page April 29 snapshot creative-technology-practice",
    "first-party research guides, not independent corroboration"
  ].join(" "),
  publicSite: "Technical project management, product operations, and implementation"
};

test("iCloud archive expansion passes with dual-surface controls and bounded reserve depth", () => {
  assert.deepEqual(evaluateICloudArchiveExpansion(iCloudArchiveExpansionFixture), []);
});

test("iCloud archive expansion rejects a missing lane and erased hydration boundary", () => {
  const failures = evaluateICloudArchiveExpansion({
    ...iCloudArchiveExpansionFixture,
    archiveDoc: iCloudArchiveExpansionFixture.archiveDoc
      .replace("58 top-level items in job-hunt", "")
      .replace("not materialized locally is not absent", "")
  });
  assert.ok(failures.some((failure) => failure.includes("58 top-level items in job-hunt")));
  assert.ok(failures.some((failure) => failure.includes("not materialized locally is not absent")));
});

test("iCloud archive expansion rejects sole credit and silent reserve projection", () => {
  const failures = evaluateICloudArchiveExpansion({
    ...iCloudArchiveExpansionFixture,
    publicSite: "Jamie solely created NTER CHNG and made a Max/MSP program that segmented audio."
  });
  assert.ok(failures.some((failure) => failure.includes("sole credit")));
  assert.ok(failures.some((failure) => failure.includes("silently projects reserve")));
});

test("iCloud archive expansion rejects private paths and phone numbers", () => {
  const failures = evaluateICloudArchiveExpansion({
    ...iCloudArchiveExpansionFixture,
    archiveDoc: `${iCloudArchiveExpansionFixture.archiveDoc} /Users/example/private 212-555-0123`
  });
  assert.ok(failures.some((failure) => failure.includes("local filesystem path or phone number")));
});

test("iCloud archive expansion rejects collapsed CRS snapshots and self-corroboration", () => {
  const failures = evaluateICloudArchiveExpansion({
    ...iCloudArchiveExpansionFixture,
    sourceCoverage: iCloudArchiveExpansionFixture.sourceCoverage
      .replace("earlier 12-page April 29 snapshot", "")
      .replace("first-party research guides, not independent corroboration", "")
  });
  assert.ok(failures.some((failure) => failure.includes("earlier 12-page April 29 snapshot")));
  assert.ok(failures.some((failure) => failure.includes("first-party research guides")));
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

const projectSocialArchiveFixture = {
  socialArchive: [
    "socialArchiveAccountMap",
    'handle: "@CallNYCApp" handle: "@NYCArtC" handle: "@wowlist" handle: "@KCTownHall"',
    "profilePostsObserved: 110 followersObserved: 69 timelineItemsRecovered: 107",
    "profilePostsObserved: 5124 followersObserved: 1339 timelineItemsRecovered: 3367",
    "profilePostsObserved: 38 followersObserved: 47 timelineItemsRecovered: 38",
    "profilePostsObserved: 183 followersObserved: 132 timelineItemsRecovered: 181",
    "LEAD-PROJECT-SOCIAL-ARCHIVE-PASS-2026",
    "SRC-X-CALLNYC-PROFILE-INVENTORY-2026",
    "SRC-X-NYCARTC-PROFILE-INVENTORY-2026",
    "SRC-X-WOWLIST-PROFILE-INVENTORY-2026",
    "SRC-X-KC-TOWN-HALL-PROFILE-INVENTORY-2026",
    "SRC-DOCUMENT-JOURNAL-NIGHTLIFE-2018",
    "SRC-NYC-NIGHTLIFE-ADVISORY-REPORT-2021",
    "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
    "CLM-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT",
    "CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE",
    "INQ-X-PROJECT-ACCOUNT-INVENTORY-2026",
    "INQ-NYCARTC-COUNCIL-ENGAGEMENT-2026",
    "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP",
    "3,367 item-level recoveries 1,757 explicit unresolved",
    "At least seven is a recovered minimum Multiple teammates posted post-by-post authorship",
    "not a complete platform export official NYC Council endorsement"
  ].join(" "),
  framework:
    "socialArchiveIntake socialArchiveSources socialArchiveClaims socialArchiveInquiries socialArchivePublicationDecisions socialArchiveProofCoverage council-social-engagement public-origin-and-use",
  proofs: [
    'id: "project-social-identity-systems"',
    'id: "nyc-artist-coalition-social-engagement"',
    "shared systems collaborators carried across campaigns, programs, and changing stewardship",
    "24 direct public interactions from at least seven contemporaneous NYC Council-member accounts",
    "Jamie authored every @NYCArtC post"
  ].join(" "),
  technicalOperations:
    'project: "Project identity systems" I established public-facing identities for CallNYC, WOW List, NYC Artist Coalition, and KC Town Hall',
  fairRentCase:
    "CLM-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT council-social-engagement account establishment and continuity remain distinct from post-by-post authorship not an official Council endorsement",
  wowlistCase:
    "CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE public-origin-and-use do not independently verify the larger historical user, event, or geographic totals",
  archiveDoc: [
    "Verified Account Map @CallNYCApp @NYCArtC @wowlist @KCTownHall",
    "No verified dedicated account was recovered",
    "Authenticated recovery found **24 direct interactions from at least seven**",
    "Carlina Rivera not yet serving on the Council",
    "Profile count observed: 5,124 posts",
    "1,339 followers observed",
    "3,367 public items 1,757 profile-count slots remain explicitly unresolved",
    "The seven-member and 24-post figures are recovery floors multiple teammates posted Public-Safety Exclusions"
  ].join(" "),
  antiClaims:
    "complete platform export Jamie authored every `@NYCArtC` post seven is the complete historical Council-member count official Council endorsement"
};

test("project social archive passes with account map, engagement floor, and authorship boundaries", () => {
  assert.deepEqual(
    evaluateProjectSocialArchiveProduction(projectSocialArchiveFixture),
    []
  );
});

test("project social archive rejects missing recovery boundaries and leaked session material", () => {
  const failures = evaluateProjectSocialArchiveProduction({
    ...projectSocialArchiveFixture,
    socialArchive: projectSocialArchiveFixture.socialArchive.replace(
      "not a complete platform export",
      ""
    ),
    archiveDoc: `${projectSocialArchiveFixture.archiveDoc} auth_token=not-a-real-secret-value`
  });

  assert.ok(failures.some((failure) => failure.includes("complete platform export")));
  assert.ok(failures.some((failure) => failure.includes("authentication or session")));
});

test("project social archive rejects sole-authorship and endorsement boundary removal", () => {
  const failures = evaluateProjectSocialArchiveProduction({
    ...projectSocialArchiveFixture,
    antiClaims: projectSocialArchiveFixture.antiClaims
      .replace("Jamie authored every `@NYCArtC` post", "")
      .replace("official Council endorsement", "")
  });

  assert.ok(failures.some((failure) => failure.includes("Jamie authored every")));
  assert.ok(failures.some((failure) => failure.includes("official Council endorsement")));
});

const readRepoFile = (relativePath) =>
  readFileSync(new URL(`../../${relativePath}`, import.meta.url), "utf8");

const callNycFullPopulationFixture = {
  ledger: readRepoFile("docs/knowledge-bank/data/callnyc-public-post-ledger.json"),
  corpusModel: readRepoFile("apps/www/src/data/knowledge-bank/callnyc-social-corpus.ts"),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  records: readRepoFile("apps/www/src/data/knowledge-bank/records.ts"),
  proofs: readRepoFile("apps/www/src/data/proofs.ts"),
  workData: readRepoFile("apps/www/src/data/work.ts"),
  technicalOperations: readRepoFile("apps/www/src/app/work/technical-operations/page.tsx"),
  callNycCase: readRepoFile("apps/www/src/content/work/callnyc.mdx"),
  archiveDoc: readRepoFile("docs/knowledge-bank/intake/2026-07-13-callnyc-full-population-social-corpus.md"),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md")
};

test("CallNYC full-population archive passes item-level reconciliation and public boundaries", () => {
  assert.deepEqual(
    evaluateCallNycFullPopulationArchive(callNycFullPopulationFixture),
    []
  );
});

test("CallNYC full-population archive rejects a silently dropped recovered item", () => {
  const ledger = JSON.parse(callNycFullPopulationFixture.ledger);
  ledger.records.pop();
  const failures = evaluateCallNycFullPopulationArchive({
    ...callNycFullPopulationFixture,
    ledger: JSON.stringify(ledger)
  });

  assert.ok(failures.some((failure) => failure.includes("107 item-level records")));
  assert.ok(failures.some((failure) => failure.includes("must contain")));
});

test("CallNYC full-population archive rejects erased unresolved slots and metric inflation boundaries", () => {
  const ledger = JSON.parse(callNycFullPopulationFixture.ledger);
  ledger.populationAudit.unresolvedPopulationSlots = 0;
  ledger.unresolvedItems = [];
  const failures = evaluateCallNycFullPopulationArchive({
    ...callNycFullPopulationFixture,
    ledger: JSON.stringify(ledger),
    antiClaims: callNycFullPopulationFixture.antiClaims
      .replace(/26 reciprocal\s+engagements/, "")
      .replace(/CouncilStat rows represent issues, not verified\s+unique people helped/, "")
  });

  assert.ok(failures.some((failure) => failure.includes("three explicit unresolved")));
  assert.ok(failures.some((failure) => failure.includes("26 reciprocal engagements")));
  assert.ok(failures.some((failure) => failure.includes("CouncilStat rows represent issues")));
});

test("CallNYC full-population archive rejects authentication and private-path material", () => {
  const failures = evaluateCallNycFullPopulationArchive({
    ...callNycFullPopulationFixture,
    archiveDoc: `${callNycFullPopulationFixture.archiveDoc}\nauth_token=not-a-real-secret\n/Users/example/private`
  });

  assert.ok(
    failures.some((failure) => failure.includes("authentication, session, or private-path"))
  );
});

const nycArtCFullPopulationFixture = {
  populationLedger: readRepoFile("docs/knowledge-bank/data/nycartc-public-post-ledger.json"),
  engagementLedger: readRepoFile("docs/knowledge-bank/data/nycartc-public-engagement-ledger.json"),
  corpusModel: readRepoFile("apps/www/src/data/knowledge-bank/nycartc-social-corpus.ts"),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  socialArchive: readRepoFile("apps/www/src/data/knowledge-bank/social-archive.ts"),
  proofs: readRepoFile("apps/www/src/data/proofs.ts"),
  technicalOperations: readRepoFile("apps/www/src/app/work/technical-operations/page.tsx"),
  fairRentCase: readRepoFile("apps/www/src/content/work/fair-rent-nyc.mdx"),
  archiveDoc: readRepoFile("docs/knowledge-bank/intake/2026-07-14-nycartc-full-population-social-corpus.md"),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md")
};

test("NYC Artist Coalition full-population archive passes slot, engagement, and source reconciliation", () => {
  assert.deepEqual(
    evaluateNycArtCFullPopulationArchive(nycArtCFullPopulationFixture),
    []
  );
});

test("NYC Artist Coalition full-population archive rejects erased unresolved slots", () => {
  const ledger = JSON.parse(nycArtCFullPopulationFixture.populationLedger);
  ledger.populationAudit.unresolvedPopulationSlots = 0;
  ledger.items = ledger.items.filter(
    (item) => item.status !== "unresolved-profile-count-slot"
  );
  const failures = evaluateNycArtCFullPopulationArchive({
    ...nycArtCFullPopulationFixture,
    populationLedger: JSON.stringify(ledger)
  });

  assert.ok(failures.some((failure) => failure.includes("1,757 explicit unresolved")));
  assert.ok(failures.some((failure) => failure.includes("5,124 disposition records")));
});

test("NYC Artist Coalition full-population archive rejects a silently dropped recovered item", () => {
  const ledger = JSON.parse(nycArtCFullPopulationFixture.populationLedger);
  const index = ledger.items.findIndex((item) => item.status === "recovered-public-status");
  ledger.items.splice(index, 1);
  const failures = evaluateNycArtCFullPopulationArchive({
    ...nycArtCFullPopulationFixture,
    populationLedger: JSON.stringify(ledger)
  });

  assert.ok(failures.some((failure) => failure.includes("5,124 disposition records")));
  assert.ok(failures.some((failure) => failure.includes("3,367 recovered public items")));
});

test("NYC Artist Coalition full-population archive rejects theme drift and stakeholder inflation", () => {
  const population = JSON.parse(nycArtCFullPopulationFixture.populationLedger);
  const engagement = JSON.parse(nycArtCFullPopulationFixture.engagementLedger);
  population.items.find((item) => item.status === "recovered-public-status").primaryTheme =
    "fair-rent-and-commercial-tenancy";
  engagement.records.find(
    (item) => item.stakeholderGroup === "other-public-account"
  ).stakeholderGroup = "nyc-council-member-account";
  const failures = evaluateNycArtCFullPopulationArchive({
    ...nycArtCFullPopulationFixture,
    populationLedger: JSON.stringify(population),
    engagementLedger: JSON.stringify(engagement)
  });

  assert.ok(failures.some((failure) => failure.includes("count must recompute")));
  assert.ok(failures.some((failure) => failure.includes("must remain 24 records")));
});

test("NYC Artist Coalition full-population archive rejects collapsed context and private browser material", () => {
  const engagement = JSON.parse(nycArtCFullPopulationFixture.engagementLedger);
  engagement.records[0].fullText = "Copied public post text";
  engagement.records.find(
    (item) => item.evidenceDisposition === "search-or-thread-context"
  ).evidenceDisposition = "explicit-account-mention";
  const failures = evaluateNycArtCFullPopulationArchive({
    ...nycArtCFullPopulationFixture,
    engagementLedger: JSON.stringify(engagement),
    archiveDoc: `${nycArtCFullPopulationFixture.archiveDoc}\nauth_token=not-a-real-secret\n/Users/example/private`
  });

  assert.ok(failures.some((failure) => failure.includes("347 explicit account mentions")));
  assert.ok(failures.some((failure) => failure.includes("must not reproduce full account")));
  assert.ok(
    failures.some((failure) => failure.includes("authentication, session, or private-path"))
  );
});

const wowlistFullPopulationFixture = {
  ledger: readRepoFile("docs/knowledge-bank/data/wowlist-public-post-ledger.json"),
  corpusModel: readRepoFile("apps/www/src/data/knowledge-bank/wowlist-social-corpus.ts"),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  proofs: readRepoFile("apps/www/src/data/proofs.ts"),
  workData: readRepoFile("apps/www/src/data/work.ts"),
  wowlistCase: readRepoFile("apps/www/src/content/work/wowlist.mdx"),
  archiveDoc: readRepoFile("docs/knowledge-bank/intake/2026-07-14-wowlist-full-population-social-corpus.md"),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md")
};

test("WOWList full-population archive passes item-level reconciliation and public boundaries", () => {
  assert.deepEqual(
    evaluateWowlistFullPopulationArchive(wowlistFullPopulationFixture),
    []
  );
});

test("WOWList full-population archive rejects a silently dropped item", () => {
  const ledger = JSON.parse(wowlistFullPopulationFixture.ledger);
  ledger.records.pop();
  const failures = evaluateWowlistFullPopulationArchive({
    ...wowlistFullPopulationFixture,
    ledger: JSON.stringify(ledger)
  });

  assert.ok(failures.some((failure) => failure.includes("38 item-level records")));
  assert.ok(failures.some((failure) => failure.includes("must contain")));
});

test("WOWList full-population archive rejects inflated aggregates and erased authorship boundaries", () => {
  const ledger = JSON.parse(wowlistFullPopulationFixture.ledger);
  ledger.aggregateFindings.directProductSupportReplies = 38;
  const failures = evaluateWowlistFullPopulationArchive({
    ...wowlistFullPopulationFixture,
    ledger: JSON.stringify(ledger),
    antiClaims: wowlistFullPopulationFixture.antiClaims
      .replace(/Fifty-one matching\s+records identify Jamie as publisher/, "")
      .replace("proof of broad adoption, support volume, satisfaction, audience, or impact", "")
  });

  assert.ok(failures.some((failure) => failure.includes("stored aggregate findings")));
  assert.ok(failures.some((failure) => failure.includes("Fifty-one matching records")));
  assert.ok(failures.some((failure) => failure.includes("proof of broad adoption")));
});

test("WOWList full-population archive rejects full post text and private browser material", () => {
  const ledger = JSON.parse(wowlistFullPopulationFixture.ledger);
  ledger.records[0].fullText = "A copied third-party status";
  const failures = evaluateWowlistFullPopulationArchive({
    ...wowlistFullPopulationFixture,
    ledger: JSON.stringify(ledger),
    archiveDoc: `${wowlistFullPopulationFixture.archiveDoc}\nauth_token=not-a-real-secret\n/Users/example/private`
  });

  assert.ok(failures.some((failure) => failure.includes("must not reproduce full post")));
  assert.ok(
    failures.some((failure) => failure.includes("authentication, session, or private-path"))
  );
});

const wowlistFacebookPostFixture = {
  census: readRepoFile("docs/knowledge-bank/data/wowlist-facebook-post-census-2026-07-14.csv"),
  corpusModel: readRepoFile("apps/www/src/data/knowledge-bank/wowlist-facebook-posts-batch-2026-07-14.ts"),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  proofs: readRepoFile("apps/www/src/data/proofs.ts"),
  workData: readRepoFile("apps/www/src/data/work.ts"),
  wowlistCase: readRepoFile("apps/www/src/content/work/wowlist.mdx"),
  archiveDoc: readRepoFile("docs/knowledge-bank/intake/2026-07-14-wowlist-facebook-posts.md"),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md")
};

test("WOW List Facebook post archive passes population, role, and privacy boundaries", () => {
  assert.deepEqual(
    evaluateWowlistFacebookPostArchive(wowlistFacebookPostFixture),
    []
  );
});

test("WOW List Facebook post archive rejects a silently dropped record", () => {
  const lines = wowlistFacebookPostFixture.census.trim().split("\n");
  lines.pop();
  const failures = evaluateWowlistFacebookPostArchive({
    ...wowlistFacebookPostFixture,
    census: `${lines.join("\n")}\n`
  });

  assert.ok(failures.some((failure) => failure.includes("57 post records")));
  assert.ok(failures.some((failure) => failure.includes("2018 count")));
});

test("WOW List Facebook post archive rejects duplicate identities and year drift", () => {
  const lines = wowlistFacebookPostFixture.census.trim().split("\n");
  const first = lines[1].split(",");
  const second = lines[2].split(",");
  second[1] = first[1];
  second[2] = "2016-05-11";
  lines[2] = second.join(",");
  const failures = evaluateWowlistFacebookPostArchive({
    ...wowlistFacebookPostFixture,
    census: `${lines.join("\n")}\n`
  });

  assert.ok(failures.some((failure) => failure.includes("post IDs must remain unique")));
  assert.ok(failures.some((failure) => failure.includes("2015 count")));
});

test("WOW List Facebook post archive rejects publisher inflation and erased collective credit", () => {
  const failures = evaluateWowlistFacebookPostArchive({
    ...wowlistFacebookPostFixture,
    corpusModel: wowlistFacebookPostFixture.corpusModel
      .replace("jamieBurkart: 51", "jamieBurkart: 57")
      .replace("unresolved: 6", "unresolved: 0"),
    antiClaims: wowlistFacebookPostFixture.antiClaims
      .replace("Jamie published all 57 records", "")
      .replace("Preserve Richard's shared-project credit", "")
  });

  assert.ok(failures.some((failure) => failure.includes("jamieBurkart: 51")));
  assert.ok(failures.some((failure) => failure.includes("unresolved: 6")));
  assert.ok(failures.some((failure) => failure.includes("shared-project credit")));
});

test("WOW List Facebook post archive rejects interaction inflation and reach semantics", () => {
  const census = wowlistFacebookPostFixture.census.replace(
    "439926419547504,2015-10-05,standalone-post,distributed-community-use,13,3,29",
    "439926419547504,2015-10-05,standalone-post,distributed-community-use,13,3,99"
  );
  const failures = evaluateWowlistFacebookPostArchive({
    ...wowlistFacebookPostFixture,
    census,
    archiveDoc: wowlistFacebookPostFixture.archiveDoc.replace(
      "not unique people,\nreach, impressions, attendance, endorsement, adoption, or impact",
      "proof of reach"
    )
  });

  assert.ok(failures.some((failure) => failure.includes("share total must remain 49")));
  assert.ok(failures.some((failure) => failure.includes("29 share signal")));
  assert.ok(failures.some((failure) => failure.includes("not unique people")));
});

test("WOW List Facebook post archive rejects publisher rows and private browser material", () => {
  const census = wowlistFacebookPostFixture.census.replace(
    "public_detail_status",
    "public_detail_status,publisher"
  ).replace(/,metadata-only$/gm, ",metadata-only,Jamie Burkart");
  const failures = evaluateWowlistFacebookPostArchive({
    ...wowlistFacebookPostFixture,
    census,
    archiveDoc: `${wowlistFacebookPostFixture.archiveDoc}\n__cft__=not-a-real-token\n/Users/example/private`
  });

  assert.ok(failures.some((failure) => failure.includes("11 public-safe columns")));
  assert.ok(failures.some((failure) => failure.includes("must not expose publisher rows")));
  assert.ok(
    failures.some((failure) => failure.includes("authentication, Page-session, or private-path"))
  );
});

const kcTownHallFullPopulationFixture = {
  ledger: readRepoFile("docs/knowledge-bank/data/kc-town-hall-public-post-ledger.json"),
  corpusModel: readRepoFile("apps/www/src/data/knowledge-bank/kc-town-hall-social-corpus.ts"),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  proofs: readRepoFile("apps/www/src/data/proofs.ts"),
  workData: readRepoFile("apps/www/src/data/work.ts"),
  technicalOperations: readRepoFile("apps/www/src/app/work/technical-operations/page.tsx"),
  kcTownHallCase: readRepoFile("apps/www/src/content/work/kc-town-hall.mdx"),
  archiveDoc: readRepoFile("docs/knowledge-bank/intake/2026-07-14-kc-town-hall-full-population-social-corpus.md"),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md")
};

test("KC Town Hall full-population archive passes slot disposition and stewardship boundaries", () => {
  assert.deepEqual(
    evaluateKcTownHallFullPopulationArchive(kcTownHallFullPopulationFixture),
    []
  );
});

test("KC Town Hall full-population archive rejects erased unresolved slots", () => {
  const ledger = JSON.parse(kcTownHallFullPopulationFixture.ledger);
  ledger.populationAudit.unresolvedPopulationSlots = 0;
  const failures = evaluateKcTownHallFullPopulationArchive({
    ...kcTownHallFullPopulationFixture,
    ledger: JSON.stringify(ledger)
  });

  assert.ok(failures.some((failure) => failure.includes("retain two explicit unresolved slots")));
  assert.ok(failures.some((failure) => failure.includes("reconcile to the 183-post profile control")));
});

test("KC Town Hall full-population archive rejects a truncated recovery range", () => {
  const ledger = JSON.parse(kcTownHallFullPopulationFixture.ledger);
  ledger.populationAudit.lastRecoveredAt = "2022-09-03T22:54:00.000Z";
  const failures = evaluateKcTownHallFullPopulationArchive({
    ...kcTownHallFullPopulationFixture,
    ledger: JSON.stringify(ledger)
  });

  assert.ok(
    failures.some((failure) => failure.includes("latest recovered item, including reposts"))
  );
});

test("KC Town Hall full-population archive rejects theme drift and stakeholder inflation", () => {
  const ledger = JSON.parse(kcTownHallFullPopulationFixture.ledger);
  ledger.records[0].primaryTheme = "tired-of-tires-operations";
  ledger.aggregateFindings.directPublicConversationStakeholderFloor.electedOrCityServiceAccounts.push("@UnverifiedActor");
  const failures = evaluateKcTownHallFullPopulationArchive({
    ...kcTownHallFullPopulationFixture,
    ledger: JSON.stringify(ledger)
  });

  assert.ok(failures.some((failure) => failure.includes("count must recompute")));
  assert.ok(failures.some((failure) => failure.includes("floor must remain four")));
});

test("KC Town Hall full-population archive rejects full post text and private browser material", () => {
  const ledger = JSON.parse(kcTownHallFullPopulationFixture.ledger);
  ledger.records[0].fullText = "Copied account text";
  const failures = evaluateKcTownHallFullPopulationArchive({
    ...kcTownHallFullPopulationFixture,
    ledger: JSON.stringify(ledger),
    archiveDoc: `${kcTownHallFullPopulationFixture.archiveDoc}\nauth_token=not-a-real-secret\n/Users/example/private`
  });

  assert.ok(failures.some((failure) => failure.includes("must not reproduce full account")));
  assert.ok(
    failures.some((failure) => failure.includes("authentication, session, or private-path"))
  );
});

const urbanHermitFullPopulationFixture = {
  populationLedger: readRepoFile("docs/knowledge-bank/data/urbanhermit-public-post-ledger.json"),
  engagementLedger: readRepoFile("docs/knowledge-bank/data/urbanhermit-public-engagement-ledger.json"),
  corpusModel: readRepoFile("apps/www/src/data/knowledge-bank/urbanhermit-social-corpus.ts"),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  proofs: readRepoFile("apps/www/src/data/proofs.ts"),
  technicalOperations: readRepoFile("apps/www/src/app/work/technical-operations/page.tsx"),
  archiveDoc: readRepoFile("docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus.md"),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md")
};

test("@urbanhermit full-population archive passes reconciliation and privacy boundaries", () => {
  assert.deepEqual(
    evaluateUrbanHermitFullPopulationArchive(urbanHermitFullPopulationFixture),
    []
  );
});

test("@urbanhermit full-population archive rejects a silently dropped current record", () => {
  const population = JSON.parse(urbanHermitFullPopulationFixture.populationLedger);
  population.items.pop();
  const failures = evaluateUrbanHermitFullPopulationArchive({
    ...urbanHermitFullPopulationFixture,
    populationLedger: JSON.stringify(population)
  });

  assert.ok(failures.some((failure) => failure.includes("434 aggregate-only rows")));
  assert.ok(failures.some((failure) => failure.includes("count must recompute")));
});

test("@urbanhermit full-population archive rejects raw timeline and browser leakage", () => {
  const population = JSON.parse(urbanHermitFullPopulationFixture.populationLedger);
  population.items[0].fullText = "Copied personal status text";
  population.items[0].statusUrl = "https://x.com/urbanhermit/status/example";
  population.items[0].likes = 10;
  const failures = evaluateUrbanHermitFullPopulationArchive({
    ...urbanHermitFullPopulationFixture,
    populationLedger: JSON.stringify(population),
    archiveDoc: `${urbanHermitFullPopulationFixture.archiveDoc}\nauth_token=not-a-real-secret\n/Users/example/private`
  });

  assert.ok(failures.some((failure) => failure.includes("must not expose post text")));
  assert.ok(
    failures.some((failure) => failure.includes("authentication, session, or private-path"))
  );
});

test("@urbanhermit full-population archive rejects stakeholder inflation and collapsed context", () => {
  const engagement = JSON.parse(urbanHermitFullPopulationFixture.engagementLedger);
  engagement.records[0].stakeholderGroup = "professional-institution";
  engagement.records.find(
    (record) => record.interactionContext === "general-public-conversation"
  ).interactionContext = "role-or-project-attribution";
  const failures = evaluateUrbanHermitFullPopulationArchive({
    ...urbanHermitFullPopulationFixture,
    engagementLedger: JSON.stringify(engagement)
  });

  assert.ok(failures.some((failure) => failure.includes("professional-institution count must recompute")));
  assert.ok(failures.some((failure) => failure.includes("general-public-conversation count must recompute")));
});

test("@urbanhermit full-population archive rejects denominator and repost-reaction boundary loss", () => {
  const failures = evaluateUrbanHermitFullPopulationArchive({
    ...urbanHermitFullPopulationFixture,
    corpusModel: urbanHermitFullPopulationFixture.corpusModel
      .replace("not every post Jamie ever made", "every post Jamie ever made")
      .replace("repost reactions belong to original source posts", "repost reactions are account traction"),
    antiClaims: urbanHermitFullPopulationFixture.antiClaims
      .replace("unresolved research debt", "dead links")
  });

  assert.ok(failures.some((failure) => failure.includes("not every post Jamie ever made")));
  assert.ok(failures.some((failure) => failure.includes("repost reactions belong to original source posts")));
  assert.ok(failures.some((failure) => failure.includes("unresolved research debt")));
});

test("@urbanhermit full-population archive rejects silent Technical Operations projection", () => {
  const failures = evaluateUrbanHermitFullPopulationArchive({
    ...urbanHermitFullPopulationFixture,
    technicalOperations: `${urbanHermitFullPopulationFixture.technicalOperations}\nCLM-HORSE-LORDS-TRUTHERS-VIDEO`
  });

  assert.ok(failures.some((failure) => failure.includes("must not silently appear")));
});

const nycArtCFacebookEventFixture = {
  eventLedger: readRepoFile("docs/knowledge-bank/data/nycartc-facebook-event-ledger.json"),
  linkLedger: readRepoFile("docs/knowledge-bank/data/nycartc-facebook-event-link-ledger.json"),
  corpusModel: readRepoFile("apps/www/src/data/knowledge-bank/nycartc-facebook-events-batch-2026-07-13.ts"),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  proofs: readRepoFile("apps/www/src/data/proofs.ts"),
  workData: readRepoFile("apps/www/src/data/work.ts"),
  fairRentCase: readRepoFile("apps/www/src/content/work/fair-rent-nyc.mdx"),
  archiveDoc: readRepoFile("docs/knowledge-bank/nycartc-facebook-events-2026-07-13.md"),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md")
};

test("NYC Artist Coalition Facebook event archive passes population, routing, and public-safety criteria", () => {
  assert.deepEqual(evaluateNycArtCFacebookEventArchive(nycArtCFacebookEventFixture), []);
});

test("NYC Artist Coalition Facebook event archive rejects a dropped record and erased unresolved slot", () => {
  const events = JSON.parse(nycArtCFacebookEventFixture.eventLedger);
  events.records.pop();
  events.accounting.unresolvedSlots = 0;
  const failures = evaluateNycArtCFacebookEventArchive({
    ...nycArtCFacebookEventFixture,
    eventLedger: JSON.stringify(events)
  });

  assert.ok(failures.some((failure) => failure.includes("34 control-slot dispositions")));
  assert.ok(failures.some((failure) => failure.includes("one unresolved slot")));
});

test("NYC Artist Coalition Facebook event archive rejects response inflation", () => {
  const events = JSON.parse(nycArtCFacebookEventFixture.eventLedger);
  events.accounting.responseSignals.boundary = "Facebook responses are total attendance.";
  const failures = evaluateNycArtCFacebookEventArchive({
    ...nycArtCFacebookEventFixture,
    eventLedger: JSON.stringify(events),
    antiClaims: nycArtCFacebookEventFixture.antiClaims.replace(
      "Facebook response totals equal attendance",
      "platform responses are attendance"
    )
  });

  assert.ok(failures.some((failure) => failure.includes("non-summable")));
  assert.ok(failures.some((failure) => failure.includes("anti-claims")));
});

test("NYC Artist Coalition Facebook event archive rejects link-accounting drift", () => {
  const links = JSON.parse(nycArtCFacebookEventFixture.linkLedger);
  links.rows[0].occurrences += 1;
  const failures = evaluateNycArtCFacebookEventArchive({
    ...nycArtCFacebookEventFixture,
    linkLedger: JSON.stringify(links)
  });

  assert.ok(failures.some((failure) => failure.includes("must recompute to 61")));
  assert.ok(failures.some((failure) => failure.includes("must match the rows")));
});

test("NYC Artist Coalition Facebook event archive rejects access and working-document leakage", () => {
  const links = JSON.parse(nycArtCFacebookEventFixture.linkLedger);
  links.rows.find((row) => row.disposition === "protected").publicUrl =
    "https://docs.google.com/document/d/not-a-real-document/edit";
  const failures = evaluateNycArtCFacebookEventArchive({
    ...nycArtCFacebookEventFixture,
    linkLedger: JSON.stringify(links),
    archiveDoc: `${nycArtCFacebookEventFixture.archiveDoc}\nhttps://zoom.us/j/000000000`
  });

  assert.ok(failures.some((failure) => failure.includes("locators must remain withheld")));
  assert.ok(failures.some((failure) => failure.includes("access, session, working-document")));
});

test("NYC Artist Coalition Facebook event archive rejects sole authorship and silent site removal", () => {
  const failures = evaluateNycArtCFacebookEventArchive({
    ...nycArtCFacebookEventFixture,
    corpusModel: nycArtCFacebookEventFixture.corpusModel.replace(
      "not sole organization or authorship",
      "sole organization and authorship"
    ),
    fairRentCase: nycArtCFacebookEventFixture.fairRentCase.replace(
      'claimId="CLM-NYCAC-PARTICIPATION-SYSTEM"',
      'claimId="CLM-NYCAC-CABARET-ORGANIZING"'
    )
  });

  assert.ok(failures.some((failure) => failure.includes("not sole organization or authorship")));
  assert.ok(failures.some((failure) => failure.includes('claimId="CLM-NYCAC-PARTICIPATION-SYSTEM"')));
});

const nycArtCFacebookPostFixture = {
  census: readRepoFile(
    "docs/knowledge-bank/data/nycartc-facebook-post-census-2026-07-14.csv"
  ),
  corpusModel: readRepoFile(
    "apps/www/src/data/knowledge-bank/nycartc-facebook-posts-batch-2026-07-14.ts"
  ),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  proofs: readRepoFile("apps/www/src/data/proofs.ts"),
  workData: readRepoFile("apps/www/src/data/work.ts"),
  fairRentCase: readRepoFile("apps/www/src/content/work/fair-rent-nyc.mdx"),
  archiveDoc: readRepoFile(
    "docs/knowledge-bank/intake/2026-07-14-nycartc-facebook-posts.md"
  ),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md")
};

test("NYC Artist Coalition Facebook post archive passes population, publication, and authorship boundaries", () => {
  assert.deepEqual(
    evaluateNycArtCFacebookPostArchive(nycArtCFacebookPostFixture),
    []
  );
});

test("NYC Artist Coalition Facebook post archive rejects a silently dropped record", () => {
  const lines = nycArtCFacebookPostFixture.census.trim().split("\n");
  lines.pop();
  const failures = evaluateNycArtCFacebookPostArchive({
    ...nycArtCFacebookPostFixture,
    census: `${lines.join("\n")}\n`
  });

  assert.ok(failures.some((failure) => failure.includes("441 post records")));
  assert.ok(failures.some((failure) => failure.includes("sequence must remain complete")));
});

test("NYC Artist Coalition Facebook post archive rejects duplicate identities and form drift", () => {
  const lines = nycArtCFacebookPostFixture.census.trim().split("\n");
  const first = lines[1].split(",");
  const second = lines[2].split(",");
  second[0] = first[0];
  second[2] = "standalone-post";
  lines[2] = second.join(",");
  const failures = evaluateNycArtCFacebookPostArchive({
    ...nycArtCFacebookPostFixture,
    census: `${lines.join("\n")}\n`
  });

  assert.ok(failures.some((failure) => failure.includes("record IDs must remain unique")));
  assert.ok(failures.some((failure) => failure.includes("event-route count")));
});

test("NYC Artist Coalition Facebook post archive rejects interaction inflation and people semantics", () => {
  const lines = nycArtCFacebookPostFixture.census.trim().split("\n");
  const values = lines[1].split(",");
  values[7] = String(Number(values[7]) + 100);
  lines[1] = values.join(",");
  const failures = evaluateNycArtCFacebookPostArchive({
    ...nycArtCFacebookPostFixture,
    census: `${lines.join("\n")}\n`,
    archiveDoc: nycArtCFacebookPostFixture.archiveDoc.replace(
      /not unique\s+people/,
      "proof of unique people"
    )
  });

  assert.ok(failures.some((failure) => failure.includes("reaction total must remain 2,366")));
  assert.ok(failures.some((failure) => failure.includes("not unique people")));
});

test("NYC Artist Coalition Facebook post archive rejects publisher inflation and erased collective credit", () => {
  const failures = evaluateNycArtCFacebookPostArchive({
    ...nycArtCFacebookPostFixture,
    corpusModel: nycArtCFacebookPostFixture.corpusModel
      .replace('status: "unresolved"', 'status: "resolved-to-jamie"')
      .replace("individuallyAttributedRecords: 0", "individuallyAttributedRecords: 441"),
    fairRentCase: nycArtCFacebookPostFixture.fairRentCase.replace(
      "remains research context rather than a public claim",
      "proves Jamie published every record"
    )
  });

  assert.ok(failures.some((failure) => failure.includes('status: "unresolved"')));
  assert.ok(failures.some((failure) => failure.includes("individuallyAttributedRecords: 0")));
  assert.ok(failures.some((failure) => failure.includes("remains research context")));
});

test("NYC Artist Coalition Facebook post archive rejects managed-content collapse and Council-reference inflation", () => {
  const failures = evaluateNycArtCFacebookPostArchive({
    ...nycArtCFacebookPostFixture,
    corpusModel: nycArtCFacebookPostFixture.corpusModel.replace(
      "equivalentToPublicTimeline: false",
      "equivalentToPublicTimeline: true"
    ),
    fairRentCase: `${nycArtCFacebookPostFixture.fairRentCase}\n86 Council members engaged with the Facebook Page.`
  });

  assert.ok(failures.some((failure) => failure.includes("equivalentToPublicTimeline: false")));
  assert.ok(failures.some((failure) => failure.includes("must not convert Council references")));
});

test("NYC Artist Coalition Facebook post archive rejects publisher columns and private management material", () => {
  const census = nycArtCFacebookPostFixture.census
    .replace("public_locator", "public_locator,publisher")
    .replace(/$/gm, ",Jamie Burkart");
  const failures = evaluateNycArtCFacebookPostArchive({
    ...nycArtCFacebookPostFixture,
    census,
    archiveDoc: `${nycArtCFacebookPostFixture.archiveDoc}\n__cft__=not-a-real-token\n/Users/example/private`
  });

  assert.ok(failures.some((failure) => failure.includes("11 public-safe columns")));
  assert.ok(failures.some((failure) => failure.includes("must not expose publisher rows")));
  assert.ok(
    failures.some((failure) =>
      failure.includes("authentication, Page-session, management-locator, or private-path")
    )
  );
});

const kcSpacesFundFacebookPostFixture = {
  census: readRepoFile(
    "docs/knowledge-bank/data/kcspacesfund-facebook-post-census-2026-07-14.csv"
  ),
  corpusModel: readRepoFile(
    "apps/www/src/data/knowledge-bank/kcspacesfund-facebook-posts-batch-2026-07-14.ts"
  ),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  proofs: readRepoFile("apps/www/src/data/proofs.ts"),
  technicalOperations: readRepoFile(
    "apps/www/src/app/work/technical-operations/page.tsx"
  ),
  archiveDoc: readRepoFile(
    "docs/knowledge-bank/intake/2026-07-14-kcspacesfund-facebook-posts.md"
  ),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md")
};

test("KC Spaces Fund Facebook post archive passes population, credit, and privacy boundaries", () => {
  assert.deepEqual(
    evaluateKcSpacesFundFacebookPostArchive(kcSpacesFundFacebookPostFixture),
    []
  );
});

test("KC Spaces Fund Facebook post archive rejects a silently dropped record", () => {
  const lines = kcSpacesFundFacebookPostFixture.census.trim().split("\n");
  lines.pop();
  const failures = evaluateKcSpacesFundFacebookPostArchive({
    ...kcSpacesFundFacebookPostFixture,
    census: `${lines.join("\n")}\n`
  });

  assert.ok(failures.some((failure) => failure.includes("38 post records")));
  assert.ok(
    failures.some((failure) => failure.includes("sequence must remain complete"))
  );
});

test("KC Spaces Fund Facebook post archive rejects identity, form, and reaction drift", () => {
  const lines = kcSpacesFundFacebookPostFixture.census.trim().split("\n");
  const first = lines[1].split(",");
  const second = lines[2].split(",");
  second[0] = first[0];
  second[2] = "status-update-remnant";
  second[8] = String(Number(second[8]) + 100);
  lines[2] = second.join(",");
  const failures = evaluateKcSpacesFundFacebookPostArchive({
    ...kcSpacesFundFacebookPostFixture,
    census: `${lines.join("\n")}\n`
  });

  assert.ok(
    failures.some((failure) => failure.includes("record IDs must remain unique"))
  );
  assert.ok(
    failures.some((failure) => failure.includes("original-media-post count"))
  );
  assert.ok(
    failures.some((failure) => failure.includes("reaction floor must remain 119"))
  );
});

test("KC Spaces Fund Facebook post archive rejects Page-publisher inflation", () => {
  const failures = evaluateKcSpacesFundFacebookPostArchive({
    ...kcSpacesFundFacebookPostFixture,
    corpusModel: kcSpacesFundFacebookPostFixture.corpusModel
      .replace(
        'jamieAccountPostingRole: "not-claimed"',
        'jamieAccountPostingRole: "publisher"'
      )
      .replace(
        "Jamie was not the stakeholder or owner posting on the Facebook account",
        "Jamie managed and published the Facebook account"
      ),
    technicalOperations: `${kcSpacesFundFacebookPostFixture.technicalOperations}\nJamie managed the KC Spaces Fund Facebook Page.`
  });

  assert.ok(
    failures.some((failure) =>
      failure.includes('jamieAccountPostingRole: "not-claimed"')
    )
  );
  assert.ok(
    failures.some((failure) =>
      failure.includes("not the stakeholder or owner posting")
    )
  );
  assert.ok(
    failures.some((failure) =>
      failure.includes("must not assign Page management or post authorship")
    )
  );
});

test("KC Spaces Fund Facebook post archive rejects private material and people semantics", () => {
  const census = kcSpacesFundFacebookPostFixture.census
    .replace("public_locator", "public_locator,publisher")
    .replace(/$/gm, ",Jamie Burkart");
  const failures = evaluateKcSpacesFundFacebookPostArchive({
    ...kcSpacesFundFacebookPostFixture,
    census,
    archiveDoc: `${kcSpacesFundFacebookPostFixture.archiveDoc}\n__cft__=not-a-real-token\ncontact@kcspacesfund.com`,
    technicalOperations: `${kcSpacesFundFacebookPostFixture.technicalOperations}\n119 people reached and endorsed the campaign.`
  });

  assert.ok(
    failures.some((failure) => failure.includes("11 public-safe columns"))
  );
  assert.ok(
    failures.some((failure) => failure.includes("must not expose publisher rows"))
  );
  assert.ok(
    failures.some((failure) =>
      failure.includes("authentication, Page-session, contact")
    )
  );
  assert.ok(
    failures.some((failure) =>
      failure.includes("must not convert reactions into people")
    )
  );
});

const jamieFacebookPostFixture = {
  census: readRepoFile(
    "docs/knowledge-bank/data/jamie-facebook-post-census-2026-07-14.csv"
  ),
  corpusModel: readRepoFile(
    "apps/www/src/data/knowledge-bank/jamie-facebook-posts-batch-2026-07-14.ts"
  ),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  archiveDoc: readRepoFile(
    "docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts.md"
  ),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md"),
  participatoryDoc: readRepoFile(
    "docs/knowledge-bank/projects/participatory-public-programs.md"
  )
};

test("Jamie Facebook post archive passes population, source, and privacy boundaries", () => {
  assert.deepEqual(
    evaluateJamieFacebookPostArchive(jamieFacebookPostFixture),
    []
  );
});

test("Jamie Facebook post archive rejects a silently dropped record", () => {
  const lines = jamieFacebookPostFixture.census.trim().split("\n");
  lines.pop();
  const failures = evaluateJamieFacebookPostArchive({
    ...jamieFacebookPostFixture,
    census: `${lines.join("\n")}\n`
  });

  assert.ok(
    failures.some((failure) => failure.includes("1,243 unique record"))
  );
  assert.ok(
    failures.some((failure) => failure.includes("terminate at recovered-1243"))
  );
});

test("Jamie Facebook post archive rejects duplicate IDs and classification drift", () => {
  const lines = jamieFacebookPostFixture.census.trim().split("\n");
  const first = lines[1].split(",");
  const second = lines[2].split(",");
  second[0] = first[0];
  second[2] = "text";
  second[4] = "project-specific";
  lines[2] = second.join(",");
  const failures = evaluateJamieFacebookPostArchive({
    ...jamieFacebookPostFixture,
    census: `${lines.join("\n")}\n`
  });

  assert.ok(failures.some((failure) => failure.includes("IDs must remain unique")));
  assert.ok(failures.some((failure) => failure.includes("form counts")));
  assert.ok(failures.some((failure) => failure.includes("relevance counts")));
});

test("Jamie Facebook post archive rejects private record-level material", () => {
  const census = jamieFacebookPostFixture.census
    .replace("public_detail_status", "public_detail_status,post_text")
    .replace(/$/gm, ",private post text");
  const failures = evaluateJamieFacebookPostArchive({
    ...jamieFacebookPostFixture,
    census,
    archiveDoc: `${jamieFacebookPostFixture.archiveDoc}\n__cft__=not-a-real-token\n/Users/example/private`
  });

  assert.ok(failures.some((failure) => failure.includes("seven aggregate-only columns")));
  assert.ok(failures.some((failure) => failure.includes("must not expose identifiers")));
  assert.ok(
    failures.some((failure) =>
      failure.includes("authentication, session, management-locator, or private-path")
    )
  );
});

test("Jamie Facebook post archive rejects zero-engagement and stakeholder inflation", () => {
  const failures = evaluateJamieFacebookPostArchive({
    ...jamieFacebookPostFixture,
    corpusModel: jamieFacebookPostFixture.corpusModel
      .replace('interactionMetrics: "not-recovered"', 'interactionMetrics: "zero"')
      .replace(
        'stakeholderIdentityCensus: "not-recovered"',
        'stakeholderIdentityCensus: "all-referenced"'
      ),
    archiveDoc: `${jamieFacebookPostFixture.archiveDoc}\nThe population had zero engagement. Referenced stakeholders engaged and endorsed the work.`
  });

  assert.ok(
    failures.some((failure) => failure.includes('interactionMetrics: "not-recovered"'))
  );
  assert.ok(
    failures.some((failure) =>
      failure.includes('stakeholderIdentityCensus: "not-recovered"')
    )
  );
  assert.ok(failures.some((failure) => failure.includes("zero engagement")));
  assert.ok(
    failures.some((failure) => failure.includes("outgoing references into inbound"))
  );
});

const personalWowlistFacebookEventFixture = {
  controlsLedger: readRepoFile(
    "docs/knowledge-bank/data/personal-wowlist-facebook-event-controls.json"
  ),
  hostedCensus: readRepoFile(
    "docs/knowledge-bank/jamie-facebook-hosted-event-census-2026-07-14.csv"
  ),
  corpusModel: readRepoFile(
    "apps/www/src/data/knowledge-bank/personal-wowlist-facebook-events-batch-2026-07-14.ts"
  ),
  framework: readRepoFile("apps/www/src/data/knowledge-bank/framework.ts"),
  proofs: readRepoFile("apps/www/src/data/proofs.ts"),
  archiveDoc: readRepoFile(
    "docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14.md"
  ),
  participatoryDoc: readRepoFile(
    "docs/knowledge-bank/projects/participatory-public-programs.md"
  ),
  antiClaims: readRepoFile("docs/knowledge-bank/anti-claims.md"),
  publicSite: [
    readRepoFile("apps/www/src/app/page.tsx"),
    readRepoFile("apps/www/src/app/work/technical-operations/page.tsx"),
    readRepoFile("apps/www/src/data/work.ts"),
    readRepoFile("apps/www/src/content/work/fair-rent-nyc.mdx"),
    readRepoFile("apps/www/src/content/work/wowlist.mdx"),
    readRepoFile("apps/www/src/content/work/196-sunday-dinner.mdx")
  ].join("\n")
};

test("personal and WOW List Facebook event archive passes population, privacy, and publication criteria", () => {
  assert.deepEqual(
    evaluatePersonalWowlistFacebookEventArchive(
      personalWowlistFacebookEventFixture
    ),
    []
  );
});

test("personal Facebook event archive rejects association-population drift", () => {
  const controls = JSON.parse(personalWowlistFacebookEventFixture.controlsLedger);
  controls.personalAssociationSurface.currentRecords = 501;
  controls.personalAssociationSurface.yearCounts[2017] = 238;
  const failures = evaluatePersonalWowlistFacebookEventArchive({
    ...personalWowlistFacebookEventFixture,
    controlsLedger: JSON.stringify(controls)
  });

  assert.ok(failures.some((failure) => failure.includes("remain 502 records")));
  assert.ok(failures.some((failure) => failure.includes("recompute to 502")));
});

test("personal Facebook hosted-event archive rejects an erased unresolved slot", () => {
  const controls = JSON.parse(personalWowlistFacebookEventFixture.controlsLedger);
  controls.jamieHostedControl.recoveredPages = 21;
  controls.jamieHostedControl.unresolvedSlots = 0;
  const census = personalWowlistFacebookEventFixture.hostedCensus.replace(
    "unresolved-021,unresolved,,",
    "recovered-021,recovered,2017,civic-learning-and-making"
  );
  const failures = evaluatePersonalWowlistFacebookEventArchive({
    ...personalWowlistFacebookEventFixture,
    controlsLedger: JSON.stringify(controls),
    hostedCensus: census
  });

  assert.ok(failures.some((failure) => failure.includes("retain one unresolved slot")));
  assert.ok(failures.some((failure) => failure.includes("retain one unresolved row")));
});

test("personal Facebook event archive rejects association-to-attendance inflation", () => {
  const controls = JSON.parse(personalWowlistFacebookEventFixture.controlsLedger);
  controls.personalAssociationSurface.boundary =
    "Association proves Jamie attended these events.";
  const failures = evaluatePersonalWowlistFacebookEventArchive({
    ...personalWowlistFacebookEventFixture,
    controlsLedger: JSON.stringify(controls),
    antiClaims: personalWowlistFacebookEventFixture.antiClaims.replace(
      "Association does not establish attendance",
      "Association establishes attendance"
    )
  });

  assert.ok(failures.some((failure) => failure.includes("non-attendance")));
  assert.ok(failures.some((failure) => failure.includes("anti-claims")));
});

test("WOW List Facebook event archive rejects never-existed inflation", () => {
  const controls = JSON.parse(personalWowlistFacebookEventFixture.controlsLedger);
  controls.wowlist.boundary = "WOW List never had a Facebook event.";
  const failures = evaluatePersonalWowlistFacebookEventArchive({
    ...personalWowlistFacebookEventFixture,
    controlsLedger: JSON.stringify(controls),
    corpusModel: personalWowlistFacebookEventFixture.corpusModel.replaceAll(
      "Not recovered does not mean did not exist",
      "No event ever existed"
    )
  });

  assert.ok(failures.some((failure) => failure.includes("historical nonexistence")));
  assert.ok(failures.some((failure) => failure.includes("Not recovered does not mean did not exist")));
});

test("personal Facebook event archive rejects private locator and record-level leakage", () => {
  const controls = JSON.parse(personalWowlistFacebookEventFixture.controlsLedger);
  controls.eventId = "123";
  const failures = evaluatePersonalWowlistFacebookEventArchive({
    ...personalWowlistFacebookEventFixture,
    controlsLedger: JSON.stringify(controls),
    archiveDoc: `${personalWowlistFacebookEventFixture.archiveDoc}\n/Users/example/private\nauth_token=not-a-real-secret`
  });

  assert.ok(failures.some((failure) => failure.includes('record-level key "eventId"')));
  assert.ok(
    failures.some((failure) => failure.includes("authentication, session, or private-path"))
  );
});

test("personal and WOW List Facebook event archive rejects silent reserve projection", () => {
  const failures = evaluatePersonalWowlistFacebookEventArchive({
    ...personalWowlistFacebookEventFixture,
    publicSite: `${personalWowlistFacebookEventFixture.publicSite}\nCLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017`
  });

  assert.ok(failures.some((failure) => failure.includes("must not silently appear")));
});
