import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync
} from "node:fs";
import path from "node:path";

const PRIMARY_MESSAGE =
  "I turn emerging work into usable systems for complex public-facing teams.";

function read(repoRoot, relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readOptional(repoRoot, relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

function includesAll(content, fragments) {
  return fragments.filter((fragment) => !content.includes(fragment));
}

function result({ id, label, weight, hardGate = false, missing = [], evidence = [] }) {
  return {
    id,
    label,
    weight,
    hardGate,
    status: missing.length === 0 ? "pass" : "fail",
    evidence,
    failures: missing
  };
}

function extractResumeText(resumePath) {
  try {
    return execFileSync("pdftotext", [resumePath, "-"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return readFileSync(resumePath).toString("latin1");
  }
}

function extractResumePages(resumePath) {
  try {
    const info = execFileSync("pdfinfo", [resumePath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    const match = info.match(/^Pages:\s+(\d+)/m);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}

export function summarizeLaunchEvals(results, minimumScore = 94) {
  const totalWeight = results.reduce((sum, item) => sum + item.weight, 0);
  const passedWeight = results
    .filter((item) => item.status === "pass")
    .reduce((sum, item) => sum + item.weight, 0);
  const score = totalWeight === 0 ? 0 : Math.round((passedWeight / totalWeight) * 100);
  const failedHardGates = results.filter(
    (item) => item.hardGate && item.status !== "pass"
  );

  return {
    score,
    minimumScore,
    hardGatesPass: failedHardGates.length === 0,
    automatedReady: score >= minimumScore && failedHardGates.length === 0,
    failedHardGateIds: failedHardGates.map((item) => item.id)
  };
}

export function evaluateChadLens({
  hero,
  homePage,
  technicalOperations,
  resumePage,
  proofs,
  chadGuide
}) {
  const missing = [];

  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      const normalizedFragment = fragment.replace(/\s+/g, " ");
      if (!normalizedContent.includes(normalizedFragment)) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  requireFragments("Hero", hero, [
    "Technical Project Manager - Product Operations & Implementation",
    PRIMARY_MESSAGE,
    "I help teams",
    "View selected work",
    "Download resume",
    "Contact Jamie"
  ]);
  requireFragments("Homepage", homePage, [
    "Quick path through the portfolio",
    "emerging, high-context work",
    'href: "/work/technical-operations"',
    'href: "/resume"'
  ]);
  requireFragments("Technical Operations", technicalOperations, [
    "Role fit at a glance",
    "Where I enter",
    "What I coordinate",
    "What teams can use afterward",
    "A public-facing project has multiple stakeholders",
    "I coordinate requirements",
    "Teams leave with"
  ]);
  requireFragments("Resume", resumePage, [
    "Technical Project Manager - Product Operations & Implementation",
    PRIMARY_MESSAGE,
    "Selected impact",
    "Download resume PDF",
    "Contact Jamie"
  ]);
  requireFragments("Chad-lens guidance", chadGuide, [
    "Is Jamie visible as the actor?",
    'Does the sentence answer "toward what end?"',
    "Does the language say what became usable?",
    "courageous precision"
  ]);
  requireFragments("Proof bank", proofs, [
    'id: "career-operating-structure-14-years"',
    'id: "hje-revenue-growth-contribution"',
    'id: "fair-rent-campaign-memory"',
    'id: "callnyc-council-member-amplification"'
  ]);

  const actorLedProofs = technicalOperations.match(/proof:\s*\n?\s*"I\s/g) ?? [];
  if (actorLedProofs.length < 8) {
    missing.push(
      `Technical Operations needs eight actor-led proof summaries; found ${actorLedProofs.length}.`
    );
  }
  if (/ambiguous, high-context/i.test(homePage)) {
    missing.push(
      "Homepage makes ambiguity the reader's frame instead of describing emerging work."
    );
  }

  return missing;
}

export function evaluateKnowledgeLifecycle({
  schema,
  records,
  framework,
  socialArchive = "",
  coverageExtensions = "",
  knowledgeReadme,
  fairRentCase,
  proofs
}) {
  const missing = [];
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  requireFragments("Knowledge-bank schema", schema, [
    "intakeRecordSchema",
    "projectRecordSchema",
    "publicationDecisionSchema",
    "proofCoverageSchema",
    "publicSafety",
    "editorialStatus"
  ]);
  requireFragments("Canonical registry", records, [
    "frameworkIntake",
    "frameworkProjects",
    "frameworkSources",
    "frameworkClaims",
    "frameworkInquiries",
    "frameworkPublicationDecisions",
    "frameworkProofCoverage"
  ]);
  requireFragments("Knowledge-bank framework", framework, [
    "No silent loss",
    "photoBrief",
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
    "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL"
  ]);
  requireFragments("Knowledge-bank documentation", knowledgeReadme, [
    "No silent loss",
    "Evidentiary maturity",
    "Publication safety",
    "Editorial selection",
    "Publicly defensible does not mean selected"
  ]);
  requireFragments("Selective site projection", fairRentCase, [
    "CLM-NYCARTC-CABARET-ORGANIZING",
    "cabaret-organizing"
  ]);

  const proofIds = [...proofs.matchAll(/^\s+id:\s*"([^"]+)"/gm)].map(
    (match) => match[1]
  );
  const coverageSources = `${framework}\n${socialArchive}\n${coverageExtensions}`;
  for (const proofId of proofIds) {
    if (
      !coverageSources.includes(`proofId: "${proofId}"`) &&
      !coverageSources.includes(`coverage("${proofId}"`)
    ) {
      missing.push(`Source-coverage ledger is missing public proof: ${proofId}`);
    }
  }

  return missing;
}

export function evaluateEvidenceExpansion({
  framework,
  fairRentCase,
  sundayDinnerCase,
  kcTownHallCase
}) {
  const missing = [];
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  requireFragments("Ten-source research set", framework, [
    "SRC-GHFC-JAMIE-JULIA-QA-2017",
    "SRC-BEDFORD-BOWERY-DIY-SPACES-2017",
    "SRC-VICE-NYCARTC-DCA-2017",
    "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
    "SRC-SAVE-NYC-SPACES-CAMPAIGN",
    "SRC-EDGE-OF-SOUND-SAVE-NYC-SPACES-2017",
    "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
    "SRC-TALKS-NOT-RAIDS-CAMPAIGN",
    "SRC-NYC-COUNCIL-MARCH-REPORTING-2019",
    "SRC-KCMO-CCED-ROUND2-MINUTES-2019"
  ]);
  requireFragments("Bounded claims", framework, [
    "CLM-NYCARTC-EARLY-MUTUAL-AID-ORGANIZING",
    "CLM-NYCARTC-NIGHTLIFE-TOWN-HALL",
    "CLM-NYCARTC-MARCH-TRANSPARENCY",
    "CLM-SUNDAY-DINNER-WEEKLY-OPEN",
    "CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION",
    'coverage("wowlist-community-platform", "partially-backed"',
    'coverage("sunday-dinner-196-participation-infrastructure", "partially-backed"',
    'coverage("kc-town-hall-public-benefit-documentation", "source-backed"'
  ]);
  requireFragments("NYC Artist Coalition case study", fairRentCase, [
    "CLM-NYCARTC-EARLY-MUTUAL-AID-ORGANIZING",
    "CLM-NYCARTC-NIGHTLIFE-TOWN-HALL",
    "CLM-NYCARTC-MARCH-TRANSPARENCY",
    "early-mutual-aid-organizing",
    "nightlife-town-hall",
    "march-transparency"
  ]);
  requireFragments("Sunday Dinner case study", sundayDinnerCase, [
    "CLM-SUNDAY-DINNER-WEEKLY-OPEN",
    "weekly-open-gathering",
    'pageId="196-sunday-dinner"'
  ]);
  requireFragments("KC Town Hall case study", kcTownHallCase, [
    "CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION",
    "council-allocation"
  ]);

  return missing;
}

export function evaluateKcTownHallCouncilAllocation({
  framework,
  proofs,
  kcTownHallCase,
  councilAllocationDoc,
  stewardshipTransitionDoc,
  workData
}) {
  const missing = [];
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  requireFragments("Knowledge-bank framework", framework, [
    "LEAD-KCMO-KC-TOWN-HALL-COUNCIL-ACTION-2019",
    "SRC-KCMO-ORDINANCE-190642-2019",
    "SRC-KCMO-RESOLUTION-190649-2019",
    "CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION",
    "INQ-KC-TOWN-HALL-AGREEMENT-DISBURSEMENT",
    "LEAD-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-MEMORY",
    "INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION",
    "2019-09-26",
    "$490,539",
    "Committee Substitute for Ordinance No. 190642",
    "Second Committee Substitute for Resolution No. 190649",
    "executed funding agreement",
    "receipt or disbursement of funds"
  ]);
  requireFragments("KC Town Hall proof", proofs, [
    'id: "kc-town-hall-public-benefit-documentation"',
    "Council allocated $490,539",
    "executed agreement",
    "receipt or disbursement"
  ]);
  requireFragments("KC Town Hall case study", kcTownHallCase, [
    'claimId="CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION"',
    'occurrenceId="council-allocation"',
    "Council allocated $490,539",
    "does not establish an executed funding agreement, receipt or disbursement"
  ]);
  requireFragments("KC Town Hall work metadata", workData, [
    "after a unanimous board recommendation, the Council allocated $490,539",
    "Official Kansas City board minutes, Ordinance No. 190642, and Resolution No. 190649",
    "$490,539 Council allocation after unanimous board recommendation",
    'currentStatus: "Historical project."',
    "Funding-agreement execution, receipt or disbursement, later implementation, current property or operating status"
  ]);
  requireFragments("Council-allocation intake note", councilAllocationDoc, [
    "Ordinance No. 190642",
    "Resolution No. 190649",
    "September 26, 2019",
    "$490,539",
    "Council allocation",
    "executed funding agreement",
    "receipt or disbursement"
  ]);
  requireFragments("Stewardship-transition intake note", stewardshipTransitionDoc, [
    "Jamie Burkart firsthand correction",
    "mission-aligned organization",
    "not selected for public projection",
    "No personal circumstances are recorded",
    "INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION"
  ]);

  if (!/id: "kc-town-hall"[\s\S]{0,180}period: "2018-2022 public record"[\s\S]{0,80}status: "historical"/.test(framework)) {
    missing.push("KC Town Hall project metadata must record the 2018-2022 public record and historical status.");
  }

  if (/record stops at the board's recommendation/i.test(kcTownHallCase)) {
    missing.push(
      "KC Town Hall case study still says the public record stops at the board recommendation."
    );
  }
  if (/received\s+\$490,539|disbursed\s+\$490,539/i.test(kcTownHallCase)) {
    missing.push(
      "KC Town Hall case study conflates Council allocation with receipt or disbursement."
    );
  }

  return missing;
}

export function evaluateCampaignPressCorpus({
  schema,
  framework,
  campaignPress,
  campaignPressDoc
}) {
  const missing = [];
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  requireFragments("Knowledge-bank schema", schema, ["unverified"]);
  requireFragments("Campaign press corpus", campaignPress, [
    "campaignPressEntries",
    "campaignPressIndexes",
    "campaignPressExpectedCounts",
    '"let-nyc-dance": 21',
    '"talks-not-raids": 7',
    '"save-nyc-spaces": 8',
    '"fair-rent-nyc": 10',
    "totalOccurrences: 46",
    "uniqueArticles: 45",
    "https://letnycdance.nycartc.com/",
    "https://talksnotraids.com/",
    "https://savenycspaces.nycartc.com/",
    "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    "https://fairrentnyc.nycartc.com/library/",
    "Press-index membership is not evidence that Jamie appears in or authored the article"
  ]);
  requireFragments("Knowledge-bank framework", framework, [
    "campaignPressIntake",
    "campaignPressNewSourceIds",
    "campaignPressSources",
    "INQ-NYCARTC-CAMPAIGN-PRESS-CORPUS",
    "Preserve campaign membership while deduplicating shared articles"
  ]);
  requireFragments("Campaign press documentation", campaignPressDoc, [
    "46 index occurrences",
    "45 unique articles",
    "Let NYC Dance",
    "Talks Not Raids",
    "Save NYC Spaces",
    "Fair Rent NYC",
    "Index membership is not claim support"
  ]);

  return missing;
}

export function evaluateICloudArchiveProduction({
  framework,
  proofs,
  technicalOperations,
  archiveDoc
}) {
  const missing = [];
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  requireFragments("Knowledge-bank framework", framework, [
    "LEAD-ICLOUD-JAMIE-PROJECTS-HISTORY-PASS-2026",
    "LEAD-ICLOUD-CRS-OPERATING-BACKBONE-PASS-2026",
    "LEAD-ICLOUD-JOB-HUNT-PROOF-AUDIT-2026",
    "SRC-CLAUDETTE-MICHAEL-REES",
    "SRC-CLAUDETTE-MAKE-US-VISIBLE",
    "SRC-CRS-OPERATING-BACKBONE-ARCHIVE-2026",
    "SRC-JOB-HUNT-PROOF-AUDIT-2026",
    "CLM-CLAUDETTE-AR-COLLABORATION",
    "CLM-CRS-OPERATING-BACKBONE-2026",
    "INQ-JOB-HUNT-QUANTIFIED-PROOF-DEBT",
    "PUB-CLAUDETTE-AR-COLLABORATION",
    "PUB-CRS-OPERATING-BACKBONE-2026",
    'coverage("fair-rent-campaign-memory", "partially-backed"',
    "The plan establishes design intent; the running minutes establish subsequent use",
    "private-support",
    "renderCitation: false"
  ]);
  requireFragments("Fair Rent proof", proofs, [
    'id: "fair-rent-campaign-memory"',
    "Designed and maintained a lightweight operating backbone",
    "running minutes, decision records, action ownership, open questions, source boundaries",
    "Jamie completed every proposed operating deliverable"
  ]);
  requireFragments("Technical Operations", technicalOperations, [
    "I designed and maintained a lightweight operating backbone for multi-organization policy work",
    "running minutes, decision records, action ownership, open questions, source boundaries, and coordinated city/state work"
  ]);
  requireFragments("Archive-pass documentation", archiveDoc, [
    "Jamie Projects History",
    "CRS",
    "job-hunt",
    "not recovered in this pass",
    "does not mean it did not exist",
    "Private material excluded from ingestion",
    "Reserve",
    "Technical Operations",
    "INQ-JOB-HUNT-QUANTIFIED-PROOF-DEBT"
  ]);

  const publicBundle = [framework, proofs, technicalOperations, archiveDoc].join("\n");
  const privatePathMarkers = [
    /\/Users\//,
    /\/Volumes\//,
    /Mobile Documents/,
    /com~apple~CloudDocs/,
    /Library\/CloudStorage/
  ];
  if (privatePathMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push("Public archive production contains a local filesystem path marker.");
  }

  return missing;
}

export function evaluateGoogleSharedDriveArchiveProduction({
  framework,
  proofs,
  technicalOperations,
  fairRentCase,
  sundayDinnerCase,
  archiveDoc
}) {
  const missing = [];
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  requireFragments("Knowledge-bank framework", framework, [
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
    "private-support",
    "renderCitation: false"
  ]);
  requireFragments("Proof bank", proofs, [
    'id: "commercial-vacancy-public-data-brief"',
    "privacy-preserving, geography-aggregated commercial vacancy, occupancy, and lease-cost indicators",
    "New York City adopted Jamie's proposal",
    'id: "sunday-dinner-196-participation-infrastructure"',
    "proposal review, resident onboarding, space configuration",
    "One onboarding record independently verifies the 20-plus resident aggregate"
  ]);
  requireFragments("Technical Operations", technicalOperations, [
    'project: "Commercial Vacancy Data"',
    "privacy-preserving commercial vacancy and lease-cost indicators",
    "coverage, suppression, and methods requirements"
  ]);
  requireFragments("Fair Rent case study", fairRentCase, [
    "CLM-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
    "not evidence that New York City adopted, implemented, or published"
  ]);
  requireFragments("196 / Sunday Dinner case study", sundayDinnerCase, [
    "CLM-196-RESIDENCY-ONBOARDING-2023",
    "does not independently verify the larger residency aggregate"
  ]);
  requireFragments("Shared Drives archive documentation", archiveDoc, [
    "110 Shared Drives",
    "collection-scale accession pass plus focused close reading",
    "access visibility as not verified",
    "Shared Drive presence was never treated as proof",
    "Selected public claims",
    "Reserve depth",
    "Research debt created rather than concealed",
    "Private material excluded from ingestion",
    "eleven candidate image files",
    "unreviewed archive is not evidence that records did not exist"
  ]);

  const publicBundle = [proofs, technicalOperations, fairRentCase, sundayDinnerCase, archiveDoc].join("\n");
  const privateMarkers = [
    /\/Users\//,
    /\/Volumes\//,
    /Library\/CloudStorage/,
    /drive\.google\.com/i,
    /docs\.google\.com/i,
    /spreadsheets\/d\//i
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push("Public Shared Drive archival production contains a private path or Drive link marker.");
  }

  return missing;
}

export function evaluateProjectSocialArchiveProduction({
  framework,
  socialArchive,
  proofs,
  technicalOperations,
  fairRentCase,
  wowlistCase,
  archiveDoc,
  antiClaims
}) {
  const missing = [];
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  requireFragments("Social archive model", socialArchive, [
    "socialArchiveAccountMap",
    'handle: "@CallNYCApp"',
    'handle: "@NYCArtC"',
    'handle: "@wowlist"',
    'handle: "@KCTownHall"',
    "profilePostsObserved: 110",
    "followersObserved: 69",
    "timelineItemsRecovered: 107",
    "profilePostsObserved: 5124",
    "followersObserved: 1339",
    "timelineItemsRecovered: 3367",
    "profilePostsObserved: 38",
    "followersObserved: 47",
    "timelineItemsRecovered: 38",
    "profilePostsObserved: 183",
    "followersObserved: 132",
    "timelineItemsRecovered: 181",
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
    "3,367 item-level recoveries",
    "1,757 explicit unresolved",
    "At least seven is a recovered minimum",
    "Multiple teammates posted",
    "post-by-post authorship",
    "a complete platform export",
    "official NYC Council endorsement"
  ]);
  requireFragments("Knowledge-bank integration", framework, [
    "socialArchiveIntake",
    "socialArchiveSources",
    "socialArchiveClaims",
    "socialArchiveInquiries",
    "socialArchivePublicationDecisions",
    "socialArchiveProofCoverage",
    "council-social-engagement",
    "public-origin-and-use"
  ]);
  requireFragments("Proof bank", proofs, [
    'id: "project-social-identity-systems"',
    'id: "nyc-artist-coalition-social-engagement"',
    "shared systems collaborators carried across campaigns, programs, and changing stewardship",
    "24 direct public interactions from at least seven contemporaneous NYC Council-member accounts",
    "Jamie authored every @NYCArtC post"
  ]);
  requireFragments("Technical Operations", technicalOperations, [
    'project: "Project identity systems"',
    "I established public-facing identities for CallNYC, WOW List, NYC Artist Coalition, and KC Town Hall"
  ]);
  requireFragments("NYC Artist Coalition case study", fairRentCase, [
    "CLM-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT",
    "council-social-engagement",
    "account establishment and continuity remain distinct from post-by-post authorship",
    "not an official Council endorsement"
  ]);
  requireFragments("WOW List case study", wowlistCase, [
    "CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE",
    "public-origin-and-use",
    "do not independently verify the larger historical user, event, or geographic totals"
  ]);
  requireFragments("Social archive documentation", archiveDoc, [
    "Verified Account Map",
    "@CallNYCApp",
    "@NYCArtC",
    "@wowlist",
    "@KCTownHall",
    "No verified dedicated account was recovered",
    "Authenticated recovery found **24 direct interactions from at least seven**",
    "Carlina Rivera",
    "not yet serving on the Council",
    "Profile count observed: 5,124 posts",
    "1,339 followers observed",
    "3,367 public items",
    "1,757 profile-count slots remain explicitly unresolved",
    "The seven-member and 24-post figures are recovery floors",
    "multiple teammates posted",
    "Public-Safety Exclusions"
  ]);
  requireFragments("Social anti-claims", antiClaims, [
    "complete platform export",
    "Jamie authored every `@NYCArtC` post",
    "seven is the complete historical Council-member count",
    "official Council endorsement"
  ]);

  const publicBundle = [framework, proofs, technicalOperations, fairRentCase, wowlistCase, archiveDoc, antiClaims].join("\n");
  const secretPatterns = [
    /auth_token\s*[:=]/i,
    /ct0\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /bearer\s+[a-z0-9._-]{16,}/i,
    /password\s*[:=]\s*[^\s]+/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i
  ];
  if (secretPatterns.some((pattern) => pattern.test(publicBundle))) {
    missing.push("Public social archival production contains authentication or session material.");
  }

  return missing;
}

export function evaluateCallNycFullPopulationArchive({
  ledger,
  corpusModel,
  framework,
  records,
  proofs,
  workData,
  technicalOperations,
  callNycCase,
  archiveDoc,
  antiClaims
}) {
  const missing = [];
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };

  let parsed;
  try {
    parsed = JSON.parse(ledger);
  } catch {
    missing.push("CallNYC public-post ledger is not valid JSON.");
    return missing;
  }

  const population = parsed.populationAudit ?? {};
  const corpus = parsed.records ?? [];
  const unresolved = parsed.unresolvedItems ?? [];
  const aggregate = parsed.aggregateFindings ?? {};
  const relationshipCount = (relationship) =>
    corpus.filter((item) => item.relationship === relationship).length;

  expect(population.profileCountObserved === 110, "CallNYC observed profile population must remain 110.");
  expect(population.postsTabItemsRecovered === 106, "CallNYC Posts-tab recovery must remain 106.");
  expect(population.accountPostsRecovered === 86, "CallNYC original account-post count must remain 86.");
  expect(population.accountRepliesRecovered === 6, "CallNYC account-reply count must remain 6.");
  expect(population.accountAuthoredStatusesRecovered === 92, "CallNYC account-authored status count must remain 92.");
  expect(population.repostsRecovered === 15, "CallNYC repost count must remain 15.");
  expect(population.uniqueItemsRecovered === 107, "CallNYC unique item-level recovery must remain 107.");
  expect(population.unresolvedPopulationSlots === 3, "CallNYC must retain three explicit unresolved population slots.");
  expect(population.dispositionTotal === 110, "CallNYC disposition total must remain 110.");
  expect(
    population.uniqueItemsRecovered + population.unresolvedPopulationSlots === population.profileCountObserved,
    "Recovered and unresolved CallNYC slots must reconcile to the observed profile count."
  );
  expect(
    population.accountPostsRecovered + population.accountRepliesRecovered === population.accountAuthoredStatusesRecovered,
    "Original posts and replies must reconcile to account-authored statuses."
  );
  expect(
    population.accountAuthoredStatusesRecovered + population.repostsRecovered === population.uniqueItemsRecovered,
    "Account-authored statuses and reposts must reconcile to recovered items."
  );
  expect(corpus.length === 107, "CallNYC ledger must contain 107 item-level records.");
  expect(relationshipCount("account-post") === 86, "CallNYC ledger must contain 86 original account posts.");
  expect(relationshipCount("account-reply") === 6, "CallNYC ledger must contain six account replies.");
  expect(relationshipCount("repost") === 15, "CallNYC ledger must contain 15 reposts.");
  expect(new Set(corpus.map((item) => item.statusId)).size === corpus.length, "CallNYC ledger status IDs must be unique.");
  expect(new Set(corpus.map((item) => item.statusUrl)).size === corpus.length, "CallNYC ledger status URLs must be unique.");
  expect(
    unresolved.length === 3 && unresolved.every((item) => item.status === "not-recovered"),
    "CallNYC ledger must preserve three not-recovered placeholder slots."
  );

  const accountAuthored = corpus.filter((item) => item.relationship !== "repost");
  const recognitionPosts = accountAuthored.filter((item) =>
    /(?:provides|provided|gives) the most/i.test(item.text)
  );
  const recognitionHandles = new Set(
    recognitionPosts
      .map((item) => item.text.match(/@([A-Za-z0-9_]+)/)?.[1]?.toLowerCase())
      .filter(Boolean)
  );
  const allOutbound = corpus.flatMap((item) => item.outboundLinks ?? []);
  const recognitionDestinations = recognitionPosts.flatMap((item) =>
    (item.outboundLinks ?? [])
      .map((link) => link.destinationUrl)
      .filter((url) => /^https:\/\/(?:www\.)?callnyc\.org\//.test(url))
  );
  const recognitionCategories = new Set(
    recognitionDestinations
      .map((url) => new URL(url).pathname.split("/").filter(Boolean)[0])
      .filter(Boolean)
  );
  const uniqueShortUrls = new Set(allOutbound.map((link) => link.shortUrl));
  const uniqueDestinations = new Set(allOutbound.map((link) => link.destinationUrl));
  const uniqueCallNycDestinations = new Set(
    allOutbound
      .map((link) => link.destinationUrl)
      .filter((url) => /^https:\/\/(?:www\.)?callnyc\.org(?:\/|$)/.test(url))
  );

  expect(recognitionPosts.length === 71, "CallNYC recognition-post aggregate must recompute to 71.");
  expect(recognitionHandles.size === 26, "CallNYC recognition handles must recompute to 26.");
  expect(new Set(recognitionDestinations).size === 61, "CallNYC recognition issue pages must recompute to 61.");
  expect(recognitionCategories.size === 16, "CallNYC recognition categories must recompute to 16.");
  expect(
    accountAuthored.filter((item) => /@NYCCouncil/i.test(item.text)).length === 82,
    "CallNYC account-authored statuses mentioning @NYCCouncil must recompute to 82."
  );
  expect(allOutbound.length === 98, "CallNYC short-link occurrences must recompute to 98.");
  expect(uniqueShortUrls.size === 84, "CallNYC unique short URLs must recompute to 84.");
  expect(uniqueDestinations.size === 76, "CallNYC unique resolved destinations must recompute to 76.");
  expect(uniqueCallNycDestinations.size === 63, "CallNYC unique CallNYC destinations must recompute to 63.");
  expect(
    aggregate.issueRecognitionPosts === recognitionPosts.length &&
      aggregate.councilMemberHandlesNamedInRecognitions === recognitionHandles.size &&
      aggregate.uniqueIssuePagesLinkedFromRecognitions === new Set(recognitionDestinations).size &&
      aggregate.issueCategoriesLinkedFromRecognitions === recognitionCategories.size,
    "CallNYC stored aggregate findings must match the item-level ledger."
  );
  expect(
    allOutbound.every(
      (link) =>
        /^https:\/\/t\.co\//.test(link.shortUrl) &&
        /^https?:\/\//.test(link.destinationUrl) &&
        Number.isInteger(link.observedHttpStatus)
    ),
    "Every CallNYC outbound short link must have a public destination and observed HTTP status."
  );

  requireFragments("CallNYC corpus model", corpusModel, [
    "callNycPopulationAudit",
    "uniqueItemsRecovered: 107",
    "unresolvedPopulationSlots: 3",
    "issueRecognitionPosts: 71",
    "councilMemberHandlesNamedInRecognitions: 26",
    "uniqueIssuePagesLinkedFromRecognitions: 61",
    "issueCategoriesLinkedFromRecognitions: 16",
    "LEAD-CALLNYC-FULL-POPULATION-CORPUS-2026",
    "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
    "SRC-NYC-SCHOOL-OF-DATA-CALLNYC-2016",
    "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026",
    "CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE",
    "CLM-CALLNYC-SCHOOL-OF-DATA-RECOGNITION",
    "CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENT",
    "INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026",
    "INQ-CALLNYC-UNVERIFIED-ACCOUNT-METRICS",
    "INQ-CALLNYC-API-IMPLEMENTATION",
    "100 percent disposition coverage",
    "not a platform export",
    "rows and issues must not be equated with cases or unique people",
    "The project account does not establish Jamie's authorship of every post"
  ]);
  requireFragments("CallNYC framework integration", framework, [
    "callNycSocialCorpusIntake",
    "callNycSocialCorpusSources",
    "callNycSocialCorpusClaims",
    "callNycSocialCorpusInquiries",
    "callNycSocialCorpusPublicationDecisions",
    "callNycSocialCorpusProofCoverage"
  ]);
  requireFragments("CallNYC citation page", records, [
    "social-engagement-architecture",
    "school-of-data-recognition",
    "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
    "SRC-NYC-SCHOOL-OF-DATA-CALLNYC-2016",
    "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026"
  ]);
  requireFragments("CallNYC proof bank", proofs, [
    'id: "callnyc-public-engagement-architecture"',
    "71 recognition posts",
    "26 Council-member accounts",
    "61 issue pages",
    "Twenty-six Council members engaged with or endorsed CallNYC",
    "Jamie authored every @CallNYCApp post"
  ]);
  requireFragments("CallNYC work metadata", workData, [
    "Public-engagement system",
    "71 data-derived recognition posts",
    "NYC School of Data 2016 recap",
    "107-item public-account ledger with three unresolved count slots"
  ]);
  requireFragments("Technical Operations", technicalOperations, [
    "61 issue pathways and 26 Council-member accounts"
  ]);
  requireFragments("CallNYC case study", callNycCase, [
    "CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE",
    "CLM-CALLNYC-SCHOOL-OF-DATA-RECOGNITION",
    "A tag is not a reply",
    "an issue row is not a unique person helped"
  ]);
  requireFragments("CallNYC full-population documentation", archiveDoc, [
    "100 percent",
    "Unique item-level recoveries",
    "Explicit unresolved count slots",
    "71 data-derived issue-recognition posts",
    "26 Council-member handles",
    "61 unique linked issue pages",
    "13 unique external destination URLs",
    "Research debt",
    "does not mean X supplied a platform export"
  ]);
  requireFragments("CallNYC anti-claims", antiClaims, [
    "complete platform export",
    "26 reciprocal engagements",
    "71 recognition posts into service outcomes",
    "CouncilStat rows represent issues, not verified unique people helped",
    "94 percent, 96 percent",
    "2,330 helped in 365",
    "currently working, official, or adopted"
  ]);

  const publicBundle = [ledger, corpusModel, framework, records, proofs, workData, technicalOperations, callNycCase, archiveDoc, antiClaims].join("\n");
  const privateMarkers = [
    /auth_token\s*[:=]/i,
    /ct0\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /bearer\s+[a-z0-9._-]{16,}/i,
    /password\s*[:=]\s*[^\s]+/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push("Public CallNYC corpus contains authentication, session, or private-path material.");
  }

  return missing;
}

export function evaluateWowlistFullPopulationArchive({
  ledger,
  corpusModel,
  framework,
  proofs,
  workData,
  wowlistCase,
  archiveDoc,
  antiClaims
}) {
  const missing = [];
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  let parsed;
  try {
    parsed = JSON.parse(ledger);
  } catch {
    missing.push("WOWList public-post ledger is not valid JSON.");
    return missing;
  }

  const population = parsed.populationAudit ?? {};
  const aggregate = parsed.aggregateFindings ?? {};
  const corpus = parsed.records ?? [];
  const relationshipCount = (relationship) =>
    corpus.filter((item) => item.relationship === relationship).length;
  const themeCount = (theme) =>
    corpus.filter((item) => item.primaryTheme === theme).length;

  expect(population.profileCountObserved === 38, "WOWList observed profile population must remain 38.");
  expect(population.postsTabItemsRecovered === 37, "WOWList Posts-tab recovery must remain 37.");
  expect(population.repliesTabItemsRecovered === 38, "WOWList Replies-tab recovery must remain 38.");
  expect(population.accountPostsRecovered === 16, "WOWList account-post count must remain 16.");
  expect(population.accountRepliesRecovered === 6, "WOWList account-reply count must remain 6.");
  expect(population.accountAuthoredStatusesRecovered === 22, "WOWList account-authored count must remain 22.");
  expect(population.repostsRecovered === 16, "WOWList repost count must remain 16.");
  expect(population.distinctRepostSourceAccounts === 13, "WOWList distinct repost-source count must remain 13.");
  expect(population.uniqueItemsRecovered === 38, "WOWList unique item-level recovery must remain 38.");
  expect(population.unresolvedPopulationSlots === 0, "WOWList current-profile audit must retain zero unresolved slots.");
  expect(population.dispositionTotal === 38, "WOWList disposition total must remain 38.");
  expect(
    population.uniqueItemsRecovered + population.unresolvedPopulationSlots === population.profileCountObserved,
    "Recovered and unresolved WOWList slots must reconcile to the observed profile count."
  );
  expect(
    population.accountPostsRecovered + population.accountRepliesRecovered === population.accountAuthoredStatusesRecovered,
    "WOWList posts and replies must reconcile to account-authored statuses."
  );
  expect(
    population.accountAuthoredStatusesRecovered + population.repostsRecovered === population.uniqueItemsRecovered,
    "WOWList account-authored statuses and reposts must reconcile to recovered items."
  );

  expect(corpus.length === 38, "WOWList ledger must contain 38 item-level records.");
  expect(relationshipCount("account-post") === 16, "WOWList ledger must contain 16 account posts.");
  expect(relationshipCount("account-reply") === 6, "WOWList ledger must contain six account replies.");
  expect(relationshipCount("repost") === 16, "WOWList ledger must contain 16 reposts.");
  expect(new Set(corpus.map((item) => item.statusId)).size === corpus.length, "WOWList ledger status IDs must be unique.");
  expect(new Set(corpus.map((item) => item.statusUrl)).size === corpus.length, "WOWList ledger status URLs must be unique.");
  expect(
    corpus.every(
      (item) =>
        typeof item.contentSummary === "string" &&
        item.contentSummary.length > 12 &&
        typeof item.publishedAt === "string" &&
        /^https:\/\/x\.com\//.test(item.statusUrl)
    ),
    "Every WOWList record must retain a public-safe summary, date, and canonical status URL."
  );
  expect(
    corpus.every(
      (item) =>
        !("text" in item) &&
        !("fullText" in item) &&
        !("rawText" in item)
    ),
    "WOWList public ledger must not reproduce full post or third-party repost text."
  );

  const expectedThemes = {
    "product-support-and-onboarding": 6,
    "product-community-infrastructure": 3,
    "event-distribution": 5,
    "scene-knowledge-and-connection": 3,
    "civic-mobilization-and-care": 5,
    "civic-care-amplification": 5,
    "platform-use-and-event-amplification": 5,
    "community-scene-context": 6
  };
  for (const [theme, count] of Object.entries(expectedThemes)) {
    expect(themeCount(theme) === count, `WOWList ${theme} count must recompute to ${count}.`);
    expect(aggregate.themeCounts?.[theme] === count, `WOWList stored ${theme} aggregate must remain ${count}.`);
  }
  expect(
    Object.values(expectedThemes).reduce((sum, count) => sum + count, 0) === corpus.length,
    "WOWList theme dispositions must reconcile to all 38 records."
  );

  const repostAuthors = new Set(
    corpus
      .filter((item) => item.relationship === "repost")
      .map((item) => item.authorHandle.toLowerCase())
  );
  const allOutbound = corpus.flatMap((item) => item.outboundLinks ?? []);
  const uniqueShortUrls = new Set(allOutbound.map((link) => link.shortUrl));
  const uniqueDestinations = new Set(allOutbound.map((link) => link.destinationUrl));
  expect(repostAuthors.size === 13, "WOWList repost-source accounts must recompute to 13.");
  expect(allOutbound.length === 35, "WOWList short-link occurrences must recompute to 35.");
  expect(uniqueShortUrls.size === 35, "WOWList unique short URLs must recompute to 35.");
  expect(uniqueDestinations.size === 34, "WOWList unique resolved destinations must recompute to 34.");
  expect(
    allOutbound.every(
      (link) =>
        /^https?:\/\/t\.co\//.test(link.shortUrl) &&
        /^https?:\/\//.test(link.destinationUrl) &&
        Number.isInteger(link.observedHttpStatus)
    ),
    "Every WOWList outbound short link must retain a public destination and observed HTTP status."
  );
  expect(
    aggregate.directProductSupportReplies === themeCount("product-support-and-onboarding") &&
      aggregate.eventDistributionPosts === themeCount("event-distribution") &&
      aggregate.sceneKnowledgePosts === themeCount("scene-knowledge-and-connection") &&
      aggregate.productCommunityInfrastructurePosts === themeCount("product-community-infrastructure") &&
      aggregate.civicCareAuthoredPosts === themeCount("civic-mobilization-and-care") &&
      aggregate.civicCareReposts === themeCount("civic-care-amplification") &&
      aggregate.platformUseAndEventAmplificationReposts === themeCount("platform-use-and-event-amplification") &&
      aggregate.shortUrlOccurrences === allOutbound.length &&
      aggregate.uniqueShortUrls === uniqueShortUrls.size &&
      aggregate.uniqueResolvedDestinations === uniqueDestinations.size,
    "WOWList stored aggregate findings must match the item-level ledger."
  );

  requireFragments("WOWList corpus model", corpusModel, [
    "wowlistPopulationAudit",
    "uniqueItemsRecovered: 38",
    "unresolvedPopulationSlots: 0",
    "directProductSupportReplies: 6",
    "LEAD-WOWLIST-FULL-POPULATION-CORPUS-2026",
    "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026",
    "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015",
    "SRC-GOOD-TIMES-ZINES-2-2015",
    "SRC-KQED-GHOST-SHIP-VIGIL-2016",
    "SRC-MEOW-WOLF-DIY-FUND-2016",
    "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION",
    "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
    "CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING",
    "CLM-WOWLIST-CIVIC-CARE-CONTINUITY",
    "INQ-WOWLIST-FULL-POPULATION-2026",
    "not a platform export",
    "do not assign individual post authorship",
    "does not make WOWList the author or organizer"
  ]);
  requireFragments("WOWList framework integration", framework, [
    "wowlistSocialCorpusIntake",
    "wowlistSocialCorpusSources",
    "wowlistSocialCorpusClaims",
    "wowlistSocialCorpusInquiries",
    "wowlistSocialCorpusPublicationDecisions",
    "wowlistSocialCorpusProofCoverage",
    "public-support-surface"
  ]);
  requireFragments("WOWList proof bank", proofs, [
    'id: "wowlist-public-support-surface"',
    "six surviving replies",
    "Jamie personally wrote all six replies",
    "The social record proves adoption scale or impact"
  ]);
  requireFragments("WOWList work metadata", workData, [
    '"wowlist-public-support-surface"',
    "Public support surface",
    "six direct support and onboarding replies"
  ]);
  requireFragments("WOWList case study", wowlistCase, [
    "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
    "public-support-surface",
    "complete census of the 38 items",
    "does not identify which teammate composed each post"
  ]);
  requireFragments("WOWList full-population documentation", archiveDoc, [
    "100 percent recovery",
    "16 account posts",
    "6 account replies",
    "16 reposts from 13 other public accounts",
    "35 posted `t.co` URLs to 34 unique destinations",
    "All six account replies",
    "Scene knowledge",
    "Civic mobilization and care",
    "not press coverage, reviews, or endorsements of WOWList",
    "does not make WOWList or Jamie their organizer"
  ]);
  requireFragments("WOWList anti-claims", antiClaims, [
    "complete platform export or deletion history",
    "assign shared-account posts to Jamie without direct evidence",
    "proof of broad adoption, support volume, satisfaction, audience, or impact",
    "reposted and linked work as something WOWList organized or authored"
  ]);

  const publicBundle = [
    ledger,
    corpusModel,
    framework,
    proofs,
    workData,
    wowlistCase,
    archiveDoc,
    antiClaims
  ].join("\n");
  const privateMarkers = [
    /auth_token\s*[:=]/i,
    /ct0\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /bearer\s+[a-z0-9._-]{16,}/i,
    /password\s*[:=]\s*[^\s]+/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push("Public WOWList corpus contains authentication, session, or private-path material.");
  }

  return missing;
}

export function evaluateKcTownHallFullPopulationArchive({
  ledger,
  corpusModel,
  framework,
  proofs,
  workData,
  technicalOperations,
  kcTownHallCase,
  archiveDoc,
  antiClaims
}) {
  const missing = [];
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  let parsed;
  try {
    parsed = JSON.parse(ledger);
  } catch {
    missing.push("KC Town Hall public-post ledger is not valid JSON.");
    return missing;
  }

  const population = parsed.populationAudit ?? {};
  const aggregate = parsed.aggregateFindings ?? {};
  const corpus = parsed.records ?? [];
  const relationshipCount = (relationship) =>
    corpus.filter((item) => item.relationship === relationship).length;
  const themeCount = (theme, relationship = null) =>
    corpus.filter(
      (item) =>
        item.primaryTheme === theme &&
        (!relationship || item.relationship === relationship)
    ).length;

  expect(population.profileCountObserved === 183, "KC Town Hall observed profile control must remain 183.");
  expect(population.postsTabItemsRecovered === 121, "KC Town Hall Posts-tab recovery must remain 121.");
  expect(population.repliesTabPrimaryItemsRecovered === 181, "KC Town Hall Replies-tab primary recovery must remain 181.");
  expect(population.accountAuthoredStatusesRecovered === 155, "KC Town Hall account-authored count must remain 155.");
  expect(population.repostsRecovered === 26, "KC Town Hall repost count must remain 26.");
  expect(population.distinctRepostSourceAccounts === 16, "KC Town Hall distinct repost-source count must remain 16.");
  expect(population.uniqueItemsRecovered === 181, "KC Town Hall unique item-level recovery must remain 181.");
  expect(population.contextualConversationRecordsExcluded === 7, "KC Town Hall contextual conversation exclusion must remain seven.");
  expect(population.unresolvedPopulationSlots === 2, "KC Town Hall must retain two explicit unresolved slots.");
  expect(population.dispositionTotal === 183, "KC Town Hall disposition total must remain 183.");
  expect(
    population.uniqueItemsRecovered + population.unresolvedPopulationSlots === population.profileCountObserved,
    "Recovered and unresolved KC Town Hall slots must reconcile to the 183-post profile control."
  );
  expect(
    population.accountAuthoredStatusesRecovered + population.repostsRecovered === population.uniqueItemsRecovered,
    "KC Town Hall account-authored statuses and reposts must reconcile to recovered items."
  );

  expect(corpus.length === 181, "KC Town Hall ledger must contain 181 item-level records.");
  expect(relationshipCount("account-status") === 155, "KC Town Hall ledger must contain 155 account-authored statuses.");
  expect(relationshipCount("repost") === 26, "KC Town Hall ledger must contain 26 reposts.");
  const recoveredDates = corpus.map((item) => item.publishedAt).sort();
  expect(
    population.firstRecoveredAt === recoveredDates[0],
    "KC Town Hall population start must match the earliest recovered item."
  );
  expect(
    population.lastRecoveredAt === recoveredDates.at(-1),
    "KC Town Hall population end must match the latest recovered item, including reposts."
  );
  expect(new Set(corpus.map((item) => item.statusId)).size === corpus.length, "KC Town Hall ledger status IDs must be unique.");
  expect(new Set(corpus.map((item) => item.statusUrl)).size === corpus.length, "KC Town Hall ledger status URLs must be unique.");
  expect(
    corpus.every(
      (item) =>
        typeof item.contentSummary === "string" &&
        item.contentSummary.length > 12 &&
        typeof item.publishedAt === "string" &&
        /^https:\/\/x\.com\//.test(item.statusUrl)
    ),
    "Every KC Town Hall record must retain a public-safe summary, date, and canonical status URL."
  );
  expect(
    corpus.every(
      (item) =>
        !("text" in item) &&
        !("fullText" in item) &&
        !("rawText" in item)
    ),
    "KC Town Hall public ledger must not reproduce full account or third-party post text."
  );

  const expectedThemes = {
    "civic-information-and-public-participation": 9,
    "neighborhood-mutual-support": 13,
    "place-restoration-and-resident-input": 22,
    "project-conversation-and-context": 38,
    "tired-of-tires-operations": 99
  };
  const expectedAuthoredThemes = {
    "civic-information-and-public-participation": 6,
    "neighborhood-mutual-support": 5,
    "place-restoration-and-resident-input": 18,
    "project-conversation-and-context": 27,
    "tired-of-tires-operations": 99
  };
  for (const [theme, count] of Object.entries(expectedThemes)) {
    expect(themeCount(theme) === count, `KC Town Hall ${theme} count must recompute to ${count}.`);
    expect(aggregate.themeCounts?.[theme] === count, `KC Town Hall stored ${theme} aggregate must remain ${count}.`);
  }
  for (const [theme, count] of Object.entries(expectedAuthoredThemes)) {
    expect(themeCount(theme, "account-status") === count, `KC Town Hall authored ${theme} count must recompute to ${count}.`);
    expect(aggregate.authoredThemeCounts?.[theme] === count, `KC Town Hall stored authored ${theme} aggregate must remain ${count}.`);
  }
  expect(
    Object.values(expectedThemes).reduce((sum, count) => sum + count, 0) === corpus.length,
    "KC Town Hall theme dispositions must reconcile to all 181 records."
  );

  const repostAuthors = new Set(
    corpus
      .filter((item) => item.relationship === "repost")
      .map((item) => item.authorHandle.toLowerCase())
  );
  const authored = corpus.filter((item) => item.relationship === "account-status");
  const allOutbound = corpus.flatMap((item) => item.outboundLinks ?? []);
  const authoredOutbound = authored.flatMap((item) => item.outboundLinks ?? []);
  const uniqueShortUrls = new Set(allOutbound.map((link) => link.shortUrl));
  const authoredUniqueShortUrls = new Set(authoredOutbound.map((link) => link.shortUrl));
  const uniqueDestinations = new Set(allOutbound.map((link) => link.destinationUrl));
  expect(repostAuthors.size === 16, "KC Town Hall repost-source accounts must recompute to 16.");
  expect(authoredOutbound.length === 130, "KC Town Hall account-authored short-link occurrences must recompute to 130.");
  expect(authoredUniqueShortUrls.size === 28, "KC Town Hall account-authored unique short URLs must recompute to 28.");
  expect(allOutbound.length === 133, "KC Town Hall all-record short-link occurrences must recompute to 133.");
  expect(uniqueShortUrls.size === 31, "KC Town Hall all-record unique short URLs must recompute to 31.");
  expect(uniqueDestinations.size === 20, "KC Town Hall unique resolved destinations must recompute to 20.");
  expect(
    allOutbound.every(
      (link) =>
        /^https?:\/\/t\.co\//.test(link.shortUrl) &&
        /^https?:\/\//.test(link.destinationUrl)
    ),
    "Every KC Town Hall outbound short link must retain a public destination."
  );

  const visibleMetrics = authored.reduce(
    (totals, item) => {
      for (const key of Object.keys(totals)) {
        totals[key] += item.visibleMetricsObserved2026?.[key] ?? 0;
      }
      return totals;
    },
    { replies: 0, reposts: 0, likes: 0, bookmarks: 0 }
  );
  expect(visibleMetrics.replies === 22, "KC Town Hall visible reply total must recompute to 22.");
  expect(visibleMetrics.reposts === 70, "KC Town Hall visible repost total must recompute to 70.");
  expect(visibleMetrics.likes === 174, "KC Town Hall visible like total must recompute to 174.");
  expect(
    JSON.stringify(visibleMetrics) === JSON.stringify(aggregate.visibleAuthoredMetrics),
    "KC Town Hall stored visible metrics must match the item ledger."
  );

  const stakeholderFloor = aggregate.directPublicConversationStakeholderFloor?.electedOrCityServiceAccounts ?? [];
  expect(stakeholderFloor.length === 4, "KC Town Hall direct elected-or-service-account floor must remain four.");
  expect(
    ["@QuintonLucasKC", "@joliejustus", "@Robinson4kc", "@KCMO311"].every((handle) => stakeholderFloor.includes(handle)),
    "KC Town Hall stakeholder floor must preserve the four directly observed public accounts."
  );
  expect(aggregate.authoredMentionCounts?.["@quintonlucaskc"] === 25, "KC Town Hall Quinton Lucas outbound mention count must remain 25.");
  expect(aggregate.authoredMentionCounts?.["@robinson4kc"] === 22, "KC Town Hall Melissa Robinson outbound mention count must remain 22.");

  requireFragments("KC Town Hall corpus model", corpusModel, [
    "kcTownHallPopulationAudit",
    "profileCountObserved: 183",
    "uniqueItemsRecovered: 181",
    "unresolvedPopulationSlots: 2",
    "tiredOfTiresAuthoredStatuses: 99",
    "LEAD-KC-TOWN-HALL-FULL-POPULATION-CORPUS-2026",
    "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026",
    "SRC-X-KC-TOWN-HALL-TIRED-OF-TIRES-SAVINGS-2020",
    "SRC-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018",
    "SRC-KCUR-MISSOURI-PRIMARY-GUIDE-2018",
    "CLM-KC-TOWN-HALL-COMPLETE-SOCIAL-POPULATION",
    "CLM-KC-TOWN-HALL-DURABLE-PUBLIC-IDENTITY",
    "CLM-KC-TOWN-HALL-TIRED-OF-TIRES-RECORD",
    "CLM-KC-TOWN-HALL-CIVIC-EXCHANGE",
    "INQ-KC-TOWN-HALL-FULL-POPULATION-2026",
    "not a platform export",
    "later stewardship continued",
    "project-reported",
    "does not establish endorsement"
  ]);
  requireFragments("KC Town Hall framework integration", framework, [
    "kcTownHallSocialCorpusIntake",
    "kcTownHallSocialCorpusSources",
    "kcTownHallSocialCorpusClaims",
    "kcTownHallSocialCorpusInquiries",
    "kcTownHallSocialCorpusPublicationDecisions",
    "kcTownHallSocialCorpusProofCoverage",
    "durable-public-identity"
  ]);
  requireFragments("KC Town Hall proof bank", proofs, [
    'id: "kc-town-hall-public-identity-infrastructure"',
    "Established KC Town Hall's public-facing identity and participation surface",
    "Do not assign him every shared-account post or later program operation",
    "All 183 profile-count slots were recovered at item level"
  ]);
  requireFragments("KC Town Hall work metadata", workData, [
    '"kc-town-hall-public-identity-infrastructure"',
    "Durable public identity and participation surface",
    "181 recovered public account records"
  ]);
  requireFragments("Technical Operations", technicalOperations, [
    "I established public-facing identities for CallNYC, WOW List, NYC Artist Coalition, and KC Town Hall"
  ]);
  requireFragments("KC Town Hall case study", kcTownHallCase, [
    "CLM-KC-TOWN-HALL-DURABLE-PUBLIC-IDENTITY",
    "durable-public-identity",
    "spans 2018 to 2022",
    "not with authoring every post or operating every later program"
  ]);
  requireFragments("KC Town Hall full-population documentation", archiveDoc, [
    "100 percent disposition",
    "155 account-authored statuses",
    "26 reposts from 16 public accounts",
    "2 profile-count slots not recovered",
    "99 surviving account-authored records",
    "at least four elected or city-service accounts",
    "outbound mentions and cannot be recast as reciprocal engagement",
    "not press coverage, reviews, or endorsements of KC Town Hall",
    "not with writing every post or operating every later program"
  ]);
  requireFragments("KC Town Hall anti-claims", antiClaims, [
    "Do not assign every `@KCTownHall` post or later Tired of Tires operation to Jamie",
    "erase the two unresolved profile-count slots",
    "project-reported, not independently audited",
    "not pickups, households, participants, tires, or unique program events",
    "Outbound articles are mission context"
  ]);

  const publicBundle = [
    ledger,
    corpusModel,
    framework,
    proofs,
    workData,
    technicalOperations,
    kcTownHallCase,
    archiveDoc,
    antiClaims
  ].join("\n");
  const privateMarkers = [
    /auth_token\s*[:=]/i,
    /ct0\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /bearer\s+[a-z0-9._-]{16,}/i,
    /password\s*[:=]\s*[^\s]+/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push("Public KC Town Hall corpus contains authentication, session, or private-path material.");
  }

  return missing;
}

export function evaluateNycArtCFullPopulationArchive({
  populationLedger,
  engagementLedger,
  corpusModel,
  framework,
  socialArchive,
  proofs,
  technicalOperations,
  fairRentCase,
  archiveDoc,
  antiClaims
}) {
  const missing = [];
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  let populationParsed;
  let engagementParsed;
  try {
    populationParsed = JSON.parse(populationLedger);
  } catch {
    missing.push("NYC Artist Coalition public-post ledger is not valid JSON.");
    return missing;
  }
  try {
    engagementParsed = JSON.parse(engagementLedger);
  } catch {
    missing.push("NYC Artist Coalition engagement ledger is not valid JSON.");
    return missing;
  }

  const population = populationParsed.populationAudit ?? {};
  const aggregate = populationParsed.aggregateFindings ?? {};
  const dispositions = populationParsed.items ?? [];
  const recovered = dispositions.filter((item) => item.status === "recovered-public-status");
  const unresolved = dispositions.filter(
    (item) => item.status === "unresolved-profile-count-slot"
  );
  const engagement = engagementParsed.records ?? [];
  const engagementAggregate = engagementParsed.aggregateFindings ?? {};

  expect(population.profileCountObserved === 5124, "NYC Artist Coalition observed profile control must remain 5,124.");
  expect(population.repliesTabPopulationRecovered === 3007, "NYC Artist Coalition Replies-tab population recovery must remain 3,007.");
  expect(population.historicalAuthoredSearchRecovered === 358, "NYC Artist Coalition historical authored-search recovery must remain 358.");
  expect(population.postsTabCrosscheckRecovered === 764, "NYC Artist Coalition Posts-tab crosscheck must retain 764 records.");
  expect(population.postsTabNewItems === 2, "NYC Artist Coalition Posts-tab crosscheck must retain two new items.");
  expect(population.accountAuthoredStatusesRecovered === 715, "NYC Artist Coalition account-authored count must remain 715.");
  expect(population.repostsRecovered === 2652, "NYC Artist Coalition repost count must remain 2,652.");
  expect(population.uniqueItemsRecovered === 3367, "NYC Artist Coalition unique item-level recovery must remain 3,367.");
  expect(population.contextualConversationRecordsExcluded === 22, "NYC Artist Coalition contextual exclusions must remain 22.");
  expect(population.unresolvedPopulationSlots === 1757, "NYC Artist Coalition must retain 1,757 explicit unresolved slots.");
  expect(population.dispositionTotal === 5124, "NYC Artist Coalition disposition total must remain 5,124.");
  expect(
    population.uniqueItemsRecovered + population.unresolvedPopulationSlots === population.profileCountObserved,
    "Recovered and unresolved NYC Artist Coalition slots must reconcile to the 5,124-post profile control."
  );
  expect(
    population.accountAuthoredStatusesRecovered + population.repostsRecovered === population.uniqueItemsRecovered,
    "NYC Artist Coalition account-authored statuses and reposts must reconcile to recovered items."
  );
  expect(dispositions.length === 5124, "NYC Artist Coalition ledger must contain all 5,124 disposition records.");
  expect(recovered.length === 3367, "NYC Artist Coalition ledger must contain 3,367 recovered public items.");
  expect(unresolved.length === 1757, "NYC Artist Coalition ledger must contain 1,757 unresolved placeholder dispositions.");
  expect(
    unresolved.every(
      (item) =>
        item.statusId === null &&
        item.statusUrl === null &&
        item.publishedAt === null &&
        item.primaryTheme === "unresolved" &&
        /No status ID, date, type, text, theme, author, or deletion reason is inferred/.test(item.reason ?? "")
    ),
    "Unresolved NYC Artist Coalition slots must remain explicit and inference-free."
  );
  expect(
    new Set(recovered.map((item) => item.statusId)).size === recovered.length,
    "NYC Artist Coalition recovered status IDs must be unique."
  );
  expect(
    new Set(recovered.map((item) => item.statusUrl)).size === recovered.length,
    "NYC Artist Coalition recovered status URLs must be unique."
  );
  expect(
    recovered.every(
      (item) =>
        typeof item.contentSummary === "string" &&
        item.contentSummary.length > 12 &&
        typeof item.publishedAt === "string" &&
        /^https:\/\/x\.com\//.test(item.statusUrl) &&
        /^[a-f0-9]{64}$/.test(item.contentDigestSha256 ?? "")
    ),
    "Every recovered NYC Artist Coalition item must retain a public-safe summary, date, URL, and content digest."
  );
  expect(
    dispositions.every(
      (item) => !("text" in item) && !("fullText" in item) && !("rawText" in item)
    ) &&
      engagement.every(
        (item) => !("text" in item) && !("fullText" in item) && !("rawText" in item)
      ),
    "NYC Artist Coalition public ledgers must not reproduce full account or third-party post text."
  );

  const relationshipCount = (relationship) =>
    recovered.filter((item) => item.relationship === relationship).length;
  expect(relationshipCount("account-status") === 715, "NYC Artist Coalition ledger must contain 715 account-authored statuses.");
  expect(relationshipCount("repost") === 2652, "NYC Artist Coalition ledger must contain 2,652 reposts.");
  const expectedThemes = {
    "artist-labor-and-cultural-work": 132,
    "civic-participation": 210,
    "fair-rent-and-commercial-tenancy": 558,
    "general-cultural-and-civic-amplification": 1705,
    "let-nyc-dance-and-nightlife-policy": 119,
    "public-resources-and-opportunities": 415,
    "save-spaces-and-cultural-displacement": 86,
    "talks-not-raids-and-enforcement-accountability": 142
  };
  for (const [theme, count] of Object.entries(expectedThemes)) {
    expect(
      recovered.filter((item) => item.primaryTheme === theme).length === count,
      `NYC Artist Coalition ${theme} count must recompute to ${count}.`
    );
    expect(
      aggregate.byPrimaryTheme?.[theme] === count,
      `NYC Artist Coalition stored ${theme} aggregate must remain ${count}.`
    );
  }
  expect(
    Object.values(expectedThemes).reduce((sum, count) => sum + count, 0) === recovered.length,
    "NYC Artist Coalition theme dispositions must reconcile to all 3,367 recovered items."
  );

  const expectedAuthoredHashtags = {
    "#FairRentNYC": 191,
    "#SaveNYCSpaces": 110,
    "#LetNYCDance": 90,
    "#TalksNotRaids": 56
  };
  for (const [hashtag, count] of Object.entries(expectedAuthoredHashtags)) {
    const recomputed = recovered.filter(
      (item) =>
        item.relationship === "account-status" &&
        (item.hashtags ?? []).some(
          (candidate) => candidate.toLowerCase() === hashtag.toLowerCase()
        )
    ).length;
    expect(recomputed === count, `NYC Artist Coalition authored ${hashtag} floor must recompute to ${count}.`);
    expect(
      aggregate.campaignHashtagAuthoredStatusFloors?.[hashtag] === count,
      `NYC Artist Coalition stored authored ${hashtag} floor must remain ${count}.`
    );
  }

  const outbound = recovered.flatMap((item) => item.outboundLinks ?? []);
  const uniqueOutboundUrls = new Set(outbound.map((link) => link.shortUrl));
  expect(aggregate.outboundLinkOccurrences === 1772, "NYC Artist Coalition raw posted-link occurrence count must remain 1,772.");
  expect(uniqueOutboundUrls.size === 1241, "NYC Artist Coalition unique outbound URLs must recompute to 1,241.");
  expect(aggregate.uniqueOutboundUrls === 1241, "NYC Artist Coalition stored unique outbound URL count must remain 1,241.");

  expect(engagement.length === 501, "NYC Artist Coalition engagement ledger must retain 501 rendered search records.");
  expect(
    new Set(engagement.map((item) => item.statusId)).size === engagement.length,
    "NYC Artist Coalition engagement-ledger status IDs must be unique."
  );
  const explicitCount = engagement.filter(
    (item) => item.evidenceDisposition === "explicit-account-mention"
  ).length;
  const contextCount = engagement.filter(
    (item) => item.evidenceDisposition === "search-or-thread-context"
  ).length;
  expect(explicitCount === 347, "NYC Artist Coalition engagement ledger must retain 347 explicit account mentions.");
  expect(contextCount === 154, "NYC Artist Coalition engagement ledger must retain 154 search or thread-context records.");
  expect(explicitCount + contextCount === engagement.length, "NYC Artist Coalition engagement evidence dispositions must reconcile to 501 records.");
  expect(
    new Set(engagement.map((item) => item.authorHandle.toLowerCase())).size === 178,
    "NYC Artist Coalition engagement ledger must retain 178 distinct public accounts."
  );
  expect(engagementAggregate.renderedSearchRecords === 501, "NYC Artist Coalition stored inbound-search count must remain 501.");
  expect(engagementAggregate.explicitAccountMentionRecords === 347, "NYC Artist Coalition stored explicit-mention count must remain 347.");
  expect(engagementAggregate.searchOrThreadContextRecords === 154, "NYC Artist Coalition stored context count must remain 154.");
  expect(engagementAggregate.distinctPublicAccounts === 178, "NYC Artist Coalition stored distinct-account count must remain 178.");

  const council = engagement.filter(
    (item) => item.stakeholderGroup === "nyc-council-member-account"
  );
  const expectedCouncilHandles = new Set([
    "@rlespinal",
    "@stephenlevin33",
    "@justinbrannan",
    "@carlinarivera",
    "@jimmyvanbramer",
    "@marklevinenyc",
    "@bradlander"
  ]);
  const recoveredCouncilHandles = new Set(
    council.map((item) => item.authorHandle.toLowerCase())
  );
  expect(council.length === 24, "NYC Artist Coalition Council-member-account floor must remain 24 records.");
  expect(recoveredCouncilHandles.size === 7, "NYC Artist Coalition Council-member-account floor must remain seven accounts.");
  expect(
    [...expectedCouncilHandles].every((handle) => recoveredCouncilHandles.has(handle)),
    "NYC Artist Coalition Council-member-account floor must retain all seven reviewed handles."
  );
  expect(
    engagementAggregate.councilMemberAccountFloor?.recoveredInteractions === 24 &&
      engagementAggregate.councilMemberAccountFloor?.distinctAccounts === 7,
    "NYC Artist Coalition stored Council-member-account aggregates must remain 24 records across seven accounts."
  );
  const agencies = engagement.filter(
    (item) => item.stakeholderGroup === "nyc-city-agency-account"
  );
  expect(agencies.length === 16, "NYC Artist Coalition city-agency-account floor must remain 16 records.");
  expect(
    new Set(agencies.map((item) => item.authorHandle.toLowerCase())).size === 2,
    "NYC Artist Coalition city-agency-account floor must remain two accounts."
  );

  requireFragments("NYC Artist Coalition corpus model", corpusModel, [
    "nycArtCPopulationAudit",
    "profileCountObserved: 5124",
    "uniqueItemsRecovered: 3367",
    "unresolvedPopulationSlots: 1757",
    "explicitAccountMentionRecords: 347",
    "LEAD-NYCARTC-FULL-POPULATION-CORPUS-2026",
    "SRC-X-NYCARTC-FULL-POPULATION-AUDIT-2026",
    "SRC-X-NYCARTC-INBOUND-ENGAGEMENT-AUDIT-2026",
    "SRC-X-NYCARTC-BRAD-LANDER-FAIR-RENT-2021",
    "SRC-HELL-GATE-WHO-LEADS-NIGHTCLUB-RAIDS-2023",
    "SRC-NYT-COMMERCIAL-RENTS-SURGING-2023",
    "SRC-HELL-GATE-LUCYS-EVICTION-2024",
    "SRC-HELL-GATE-SAINT-VITUS-RAID-2024",
    "SRC-HELL-GATE-NIGHTCLUB-RAIDS-2025",
    "SRC-CITY-STATE-COMMERCIAL-RENT-2026",
    "SRC-GOTHAMIST-SMALL-BUSINESS-RENT-CONTROL-2026",
    "SRC-BUSHWICK-DAILY-LEASE-RENEWALS-2026",
    "CLM-NYCARTC-COMPLETE-SOCIAL-POPULATION",
    "CLM-NYCARTC-SOURCE-ROUTING-CONTINUITY",
    "INQ-NYCARTC-FULL-POPULATION-2026",
    "100 percent disposition",
    "not 100 percent item-level recovery",
    "shared-account posts"
  ]);
  requireFragments("Knowledge-bank integration", framework, [
    "nycArtCSocialCorpusIntake",
    "nycArtCSocialCorpusSources",
    "nycArtCSocialCorpusClaims",
    "nycArtCSocialCorpusInquiries",
    "nycArtCSocialCorpusPublicationDecisions",
    "INQ-NYCARTC-FULL-POPULATION-2026"
  ]);
  requireFragments("Social archive model", socialArchive, [
    "timelineItemsRecovered: 3367",
    "24 direct public interactions from at least seven contemporaneous NYC Council-member accounts",
    "347 explicit account mentions",
    "154 search or thread-context records",
    "SRC-X-NYCARTC-BRAD-LANDER-FAIR-RENT-2021"
  ]);
  requireFragments("Proof bank", proofs, [
    'id: "nyc-artist-coalition-social-engagement"',
    "24 direct public interactions from at least seven contemporaneous NYC Council-member accounts",
    "501 rendered public search records from 178 accounts",
    "347 explicit @NYCArtC mentions",
    "154 separately marked search or thread-context records",
    "Only seven Council members engaged"
  ]);
  requireFragments("Technical Operations", technicalOperations, [
    "technicalOperationsProofRows"
  ]);
  requireFragments("NYC Artist Coalition case study", fairRentCase, [
    "CLM-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT",
    "council-social-engagement",
    "not an official Council endorsement"
  ]);
  requireFragments("NYC Artist Coalition full-population documentation", archiveDoc, [
    "3,367",
    "1,757",
    "5,124",
    "100 percent disposition",
    "not 100 percent item-level recovery",
    "501",
    "347",
    "154",
    "178",
    "24 from at least 7 accounts",
    "Olympia Kazi",
    "1,772 posted link occurrences",
    "1,241 unique public URLs",
    "not a first-party platform export or deletion history",
    "Keep `not recovered` distinct from `did not exist`"
  ]);
  requireFragments("NYC Artist Coalition anti-claims", antiClaims, [
    "Jamie authored every `@NYCArtC` post",
    "seven is the complete historical Council-member count",
    "1,757 unresolved profile-count slots",
    "501 rendered inbound-search records into 501 explicit mentions",
    "official Council endorsement"
  ]);

  const publicBundle = [
    populationLedger,
    engagementLedger,
    corpusModel,
    framework,
    socialArchive,
    proofs,
    technicalOperations,
    fairRentCase,
    archiveDoc,
    antiClaims
  ].join("\n");
  const privateMarkers = [
    /auth_token\s*[:=]/i,
    /ct0\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /bearer\s+[a-z0-9._-]{16,}/i,
    /password\s*[:=]\s*[^\s]+/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push("Public NYC Artist Coalition corpus contains authentication, session, or private-path material.");
  }

  return missing;
}

export function evaluateUrbanHermitFullPopulationArchive({
  populationLedger,
  engagementLedger,
  corpusModel,
  framework,
  proofs,
  technicalOperations,
  archiveDoc,
  antiClaims
}) {
  const missing = [];
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  let population;
  let engagement;
  try {
    population = JSON.parse(populationLedger);
  } catch {
    missing.push("@urbanhermit public-post ledger is not valid JSON.");
    return missing;
  }
  try {
    engagement = JSON.parse(engagementLedger);
  } catch {
    missing.push("@urbanhermit public-engagement ledger is not valid JSON.");
    return missing;
  }

  const audit = population.populationAudit ?? {};
  const aggregate = population.aggregateFindings ?? {};
  const items = population.items ?? [];
  const relationshipCount = (relationship) =>
    items.filter((item) => item.relationship === relationship).length;
  const yearCount = (year) => items.filter((item) => item.year === year).length;
  const themeCount = (theme) =>
    items.filter((item) => item.primaryTheme === theme).length;

  expect(audit.profileCountObserved === 434, "@urbanhermit current profile control must remain 434.");
  expect(audit.postsSurfaceRecovered === 421, "@urbanhermit Posts-surface recovery must remain 421.");
  expect(audit.additionalAuthoredRepliesRecovered === 13, "@urbanhermit additional Replies-surface recovery must remain 13.");
  expect(audit.thirdPartyConversationContextExcluded === 2, "@urbanhermit excluded conversation-context count must remain two.");
  expect(audit.currentProfileRecordsRecovered === 434, "@urbanhermit current-profile recovery must remain 434.");
  expect(audit.authoredStandalonePosts === 338, "@urbanhermit authored standalone-post count must remain 338.");
  expect(audit.authoredReplies === 15, "@urbanhermit authored-reply count must remain 15.");
  expect(audit.reposts === 81, "@urbanhermit repost count must remain 81.");
  expect(audit.liveProfileControlClosed === true, "@urbanhermit current live-profile control must remain closed.");
  expect(
    audit.postsSurfaceRecovered + audit.additionalAuthoredRepliesRecovered === audit.currentProfileRecordsRecovered,
    "@urbanhermit Posts and additional Replies recoveries must reconcile to the current profile control."
  );
  expect(
    audit.authoredStandalonePosts + audit.authoredReplies + audit.reposts === audit.currentProfileRecordsRecovered,
    "@urbanhermit relationship counts must reconcile to the current profile control."
  );

  expect(items.length === 434, "@urbanhermit public ledger must retain 434 aggregate-only rows.");
  expect(relationshipCount("authored-post") === 338, "@urbanhermit ledger must contain 338 authored posts.");
  expect(relationshipCount("authored-reply") === 15, "@urbanhermit ledger must contain 15 authored replies.");
  expect(relationshipCount("repost") === 81, "@urbanhermit ledger must contain 81 reposts.");
  expect(new Set(items.map((item) => item.ledgerId)).size === items.length, "@urbanhermit ledger IDs must be unique.");
  expect(
    items.every(
      (item) =>
        item.accountingStatus === "recovered-current-profile-record" &&
        item.publicDetailStatus === "aggregate-only" &&
        item.hasExternalLink === (item.externalLinkCount > 0)
    ),
    "Every @urbanhermit row must remain aggregate-only and reconcile link presence to link count."
  );

  const forbiddenItemKeys = [
    "text",
    "fullText",
    "rawText",
    "contentSummary",
    "statusId",
    "statusUrl",
    "authorHandle",
    "publishedAt",
    "exactDate",
    "media",
    "metrics",
    "likes",
    "reposts",
    "replies",
    "views"
  ];
  expect(
    items.every((item) => forbiddenItemKeys.every((key) => !(key in item))),
    "@urbanhermit public ledger must not expose post text, exact identifiers, dates, media, handles, or raw reactions."
  );

  const expectedYears = {
    2008: 1,
    2009: 49,
    2010: 6,
    2011: 4,
    2012: 12,
    2013: 58,
    2014: 114,
    2015: 18,
    2016: 37,
    2017: 67,
    2018: 25,
    2019: 31,
    2020: 8,
    2021: 1,
    2022: 2,
    2023: 1
  };
  for (const [year, count] of Object.entries(expectedYears)) {
    expect(yearCount(Number(year)) === count, `@urbanhermit ${year} count must recompute to ${count}.`);
    expect(aggregate.byYear?.[year] === count, `@urbanhermit stored ${year} count must remain ${count}.`);
  }

  const expectedThemes = {
    "everyday-life-and-observation": 204,
    "civic-and-public-interest-work": 78,
    "culture-art-and-performance": 52,
    "community-and-hospitality": 37,
    "waterways-place-and-ecology": 20,
    "technical-and-digital-practice": 19,
    "care-memory-and-relationships": 14,
    "media-only-or-text-unavailable": 10
  };
  for (const [theme, count] of Object.entries(expectedThemes)) {
    expect(themeCount(theme) === count, `@urbanhermit ${theme} count must recompute to ${count}.`);
    expect(aggregate.byPrimaryTheme?.[theme] === count, `@urbanhermit stored ${theme} count must remain ${count}.`);
  }
  expect(
    Object.values(expectedThemes).reduce((sum, count) => sum + count, 0) === items.length,
    "@urbanhermit theme dispositions must reconcile to all 434 rows."
  );

  const linkOccurrences = items.reduce((sum, item) => sum + item.externalLinkCount, 0);
  const linkBearingRecords = items.filter((item) => item.hasExternalLink).length;
  expect(linkOccurrences === 345, "@urbanhermit external-link occurrences must recompute to 345.");
  expect(linkBearingRecords === 277, "@urbanhermit link-bearing records must recompute to 277.");
  expect(aggregate.externalLinkOccurrences === linkOccurrences, "@urbanhermit stored link occurrences must match the ledger.");
  expect(aggregate.recordsWithExternalLinks === linkBearingRecords, "@urbanhermit stored link-bearing count must match the ledger.");
  expect(aggregate.uniqueExternalShortUrls === 321, "@urbanhermit unique short-URL count must remain 321.");
  expect(aggregate.shortUrlsResolvedToLiveDestinations === 61, "@urbanhermit resolved short-URL count must remain 61.");
  expect(aggregate.shortUrlsNotResolvedInThisPass === 260, "@urbanhermit unresolved short-URL count must remain 260.");
  expect(
    aggregate.shortUrlsResolvedToLiveDestinations + aggregate.shortUrlsNotResolvedInThisPass === aggregate.uniqueExternalShortUrls,
    "@urbanhermit resolved and unresolved short URLs must reconcile to 321 unique URLs."
  );

  const searchAudit = engagement.searchAudit ?? {};
  const engagementAggregate = engagement.aggregateFindings ?? {};
  const records = engagement.records ?? [];
  const engagementCount = (key, value) => records.filter((record) => record[key] === value).length;
  expect(searchAudit.renderedRecordsRecovered === 26, "@urbanhermit inbound-search recovery must remain 26.");
  expect(searchAudit.distinctPublicAccounts === 17, "@urbanhermit inbound-search distinct-account floor must remain 17.");
  expect(searchAudit.oldestRecoveredYear === 2014 && searchAudit.newestRecoveredYear === 2023, "@urbanhermit inbound-search span must remain 2014 through 2023.");
  expect(searchAudit.searchIsHistoricalFloorNotPlatformExport === true, "@urbanhermit inbound search must remain labeled as a historical floor.");
  expect(records.length === 26, "@urbanhermit engagement ledger must retain 26 aggregate-only rows.");
  expect(new Set(records.map((record) => record.ledgerId)).size === records.length, "@urbanhermit engagement ledger IDs must be unique.");
  expect(
    records.every(
      (record) =>
        record.evidenceDisposition === "explicit-handle-visible" &&
        record.publicDetailStatus === "aggregate-only" &&
        forbiddenItemKeys.every((key) => !(key in record))
    ),
    "@urbanhermit engagement rows must remain aggregate-only and omit personal handles, text, exact identifiers, dates, and reactions."
  );

  const expectedStakeholders = {
    "community-peer-or-personal-context": 7,
    "professional-institution": 1,
    "cultural-or-technical-collaborator": 7,
    "journalist-designer-or-civic-peer": 5,
    "project-account": 6
  };
  for (const [group, count] of Object.entries(expectedStakeholders)) {
    expect(engagementCount("stakeholderGroup", group) === count, `@urbanhermit ${group} count must recompute to ${count}.`);
    expect(engagementAggregate.byStakeholderGroup?.[group] === count, `@urbanhermit stored ${group} count must remain ${count}.`);
  }

  const expectedEngagementThemes = {
    "community-and-relationship-context": 6,
    "public-digital-community-infrastructure": 1,
    "creative-technology-and-media": 4,
    "public-history-and-neighborhood-operations": 4,
    "cultural-history": 1,
    "civic-design-and-public-interfaces": 5,
    "civic-policy-and-cultural-space": 5
  };
  for (const [theme, count] of Object.entries(expectedEngagementThemes)) {
    expect(engagementCount("primaryTheme", theme) === count, `@urbanhermit inbound ${theme} count must recompute to ${count}.`);
    expect(engagementAggregate.byPrimaryTheme?.[theme] === count, `@urbanhermit stored inbound ${theme} count must remain ${count}.`);
  }

  const expectedContexts = {
    "general-public-conversation": 8,
    "role-or-project-attribution": 11,
    "mission-related-thread": 7
  };
  for (const [context, count] of Object.entries(expectedContexts)) {
    expect(engagementCount("interactionContext", context) === count, `@urbanhermit ${context} count must recompute to ${count}.`);
    expect(engagementAggregate.byInteractionContext?.[context] === count, `@urbanhermit stored ${context} count must remain ${count}.`);
  }
  expect(records.filter((record) => record.missionRelevantContext).length === 18, "@urbanhermit mission-relevant context count must recompute to 18.");
  expect(records.filter((record) => !record.missionRelevantContext).length === 8, "@urbanhermit general-conversation count must recompute to eight.");
  expect(engagementAggregate.missionRelevantContextRecords === 18, "@urbanhermit stored mission-relevant count must remain 18.");
  expect(engagementAggregate.generalPublicConversationRecords === 8, "@urbanhermit stored general-conversation count must remain eight.");

  requireFragments("@urbanhermit corpus model", corpusModel, [
    "LEAD-URBANHERMIT-FULL-POPULATION-CORPUS-2026",
    "SRC-X-URBANHERMIT-FULL-POPULATION-AUDIT-2026",
    "SRC-X-URBANHERMIT-INBOUND-ENGAGEMENT-AUDIT-2026",
    "SRC-X-MUSIC-HACKATHON-URBANHERMIT-WOWLIST-2015",
    "SRC-KCUR-8TH-STREET-TUNNEL-2016",
    "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
    "CLM-URBANHERMIT-CURRENT-POPULATION-ACCOUNTING",
    "CLM-URBANHERMIT-SOURCE-ROUTING",
    "CLM-URBANHERMIT-PRACTICE-THREADS",
    "CLM-HORSE-LORDS-TRUTHERS-VIDEO",
    "CLM-MUSIC-HACKATHON-WOWLIST-ROLE",
    "INQ-URBANHERMIT-FULL-POPULATION-2026",
    "421 unique Posts-surface records plus 13 additional Jamie-authored replies",
    "338 authored standalone posts, 15 authored replies, and 81 reposts",
    "345 external-link occurrences across 321 unique short URLs",
    "Sixty-one short URLs resolved",
    "Another 260 short URLs remain",
    "26 recoverable public inbound-search records from 17 accounts",
    "eleven role or project attributions, seven mission-related thread records, and eight general public-conversation records",
    "not every post Jamie ever made",
    "repost reactions belong to original source posts",
    "does not improve the current technical-operations hiring argument"
  ]);
  requireFragments("@urbanhermit framework integration", framework, [
    "urbanHermitSocialCorpusIntake",
    "urbanHermitSocialCorpusSources",
    "urbanHermitSocialCorpusClaims",
    "urbanHermitSocialCorpusInquiries",
    "urbanHermitSocialCorpusPublicationDecisions",
    "SRC-X-MUSIC-HACKATHON-URBANHERMIT-WOWLIST-2015",
    "SRC-KCUR-8TH-STREET-TUNNEL-2016"
  ]);
  requireFragments("WOW List proof basis", proofs, [
    "2015 Music Hackathon post identifying Jamie as a co-organizer",
    "describing WOW List as an event-sharing service"
  ]);
  requireFragments("@urbanhermit full-population documentation", archiveDoc, [
    "100 percent accounting of the **current live profile control**",
    "338 authored standalone posts, 15 authored replies, and 81 reposts",
    "345 external-link occurrences across 321 unique short",
    "61 resolved to live destinations",
    "260 did not",
    "26 records from 17 accounts",
    "Role or project attribution",
    "reactions displayed on the 81 reposts belong to the original source posts",
    "No new visible portfolio copy is selected"
  ]);
  requireFragments("@urbanhermit anti-claims", antiClaims, [
    "every post Jamie ever made",
    "353 Jamie-authored records and 81 reposts",
    "reactions displayed on reposts",
    "raw personal timeline",
    "26 recoverable inbound-search records",
    "Sixty-one resolved during this pass",
    "unresolved research debt"
  ]);
  expect(
    !technicalOperations.includes("CLM-HORSE-LORDS-TRUTHERS-VIDEO") &&
      !technicalOperations.includes("CLM-URBANHERMIT-PRACTICE-THREADS"),
    "Reserve personal-account findings must not silently appear on Technical Operations."
  );

  const publicBundle = [
    populationLedger,
    engagementLedger,
    corpusModel,
    framework,
    proofs,
    technicalOperations,
    archiveDoc,
    antiClaims
  ].join("\n");
  const privateMarkers = [
    /auth_token\s*[:=]/i,
    /ct0\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /bearer\s+[a-z0-9._-]{16,}/i,
    /password\s*[:=]\s*[^\s]+/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push("Public @urbanhermit corpus contains authentication, session, or private-path material.");
  }

  return missing;
}

export function evaluateNycArtCFacebookEventArchive({
  eventLedger,
  linkLedger,
  corpusModel,
  framework,
  proofs,
  workData,
  fairRentCase,
  archiveDoc,
  antiClaims
}) {
  const missing = [];
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  let events;
  let links;
  try {
    events = JSON.parse(eventLedger);
  } catch {
    missing.push("NYC Artist Coalition Facebook event ledger is not valid JSON.");
    return missing;
  }
  try {
    links = JSON.parse(linkLedger);
  } catch {
    missing.push("NYC Artist Coalition Facebook event link ledger is not valid JSON.");
    return missing;
  }

  const accounting = events.accounting ?? {};
  const records = events.records ?? [];
  const recovered = records.filter((record) => record.recoveryStatus !== "unresolved-control-slot");
  const unresolved = records.filter((record) => record.recoveryStatus === "unresolved-control-slot");
  const responseValues = recovered
    .map((record) => record.responseValue)
    .filter(Number.isFinite);
  const yearCount = (year) => recovered.filter((record) => record.date?.startsWith(year)).length;
  const recurring = recovered.filter((record) => record.isRecurringMeeting);
  const recurringVirtual = recurring.filter((record) => record.venueOrMode === "Virtual");
  const recurringPhysicalVenues = new Set(
    recurring
      .filter((record) => record.venueOrMode !== "Virtual")
      .map((record) => record.venueOrMode)
  );

  expect(accounting.controlSlots === 34, "NYC Artist Coalition Facebook event control must remain 34 slots.");
  expect(accounting.recoveredRecords === 33, "NYC Artist Coalition Facebook event recovery must remain 33 records.");
  expect(accounting.unresolvedSlots === 1, "NYC Artist Coalition Facebook event archive must retain one unresolved slot.");
  expect(records.length === 34, "NYC Artist Coalition Facebook event ledger must retain all 34 control-slot dispositions.");
  expect(recovered.length === 33, "NYC Artist Coalition Facebook event ledger must recompute to 33 recovered records.");
  expect(unresolved.length === 1, "NYC Artist Coalition Facebook event ledger must recompute to one unresolved slot.");
  expect(
    unresolved.every(
      (record) =>
        record.eventId === null &&
        record.date === null &&
        record.title === null &&
        record.sourceUrl === null
    ),
    "The unresolved Facebook event slot must not acquire an inferred ID, date, title, or URL."
  );
  expect(
    new Set(recovered.map((record) => record.eventId)).size === 33,
    "Recovered NYC Artist Coalition Facebook event IDs must remain unique."
  );

  const expectedYears = { "2017": 17, "2018": 3, "2019": 6, "2020": 6, "2021": 1 };
  for (const [year, count] of Object.entries(expectedYears)) {
    expect(yearCount(year) === count, `NYC Artist Coalition Facebook ${year} count must recompute to ${count}.`);
    expect(accounting.yearCounts?.[year] === count, `Stored NYC Artist Coalition Facebook ${year} count must remain ${count}.`);
  }
  expect(recurring.length === 12, "NYC Artist Coalition Facebook recurring-meeting count must recompute to 12.");
  expect(recurringVirtual.length === 2, "NYC Artist Coalition Facebook recurring virtual-meeting count must recompute to two.");
  expect(recurringPhysicalVenues.size === 10, "NYC Artist Coalition Facebook recurring physical-venue count must recompute to ten.");

  const responseAccounting = accounting.responseSignals ?? {};
  expect(responseValues.length === 32, "NYC Artist Coalition Facebook response-display count must recompute to 32.");
  expect(Math.min(...responseValues) === 9, "NYC Artist Coalition Facebook minimum response display must remain nine.");
  expect(Math.max(...responseValues) === 1700, "NYC Artist Coalition Facebook maximum response display must remain 1.7K.");
  expect(responseValues.filter((value) => value >= 100).length === 19, "NYC Artist Coalition Facebook events at or above 100 responses must recompute to 19.");
  expect(responseValues.filter((value) => value >= 400).length === 9, "NYC Artist Coalition Facebook events at or above 400 responses must recompute to nine.");
  expect(responseValues.filter((value) => value >= 1000).length === 3, "NYC Artist Coalition Facebook events at or above 1K responses must recompute to three.");
  expect(responseAccounting.displayed === responseValues.length, "Stored Facebook response-display count must match the event rows.");
  expect(responseAccounting.minimum === 9 && responseAccounting.maximum === 1700, "Stored Facebook response range must remain nine through 1.7K.");
  expect(/must not be summed/i.test(responseAccounting.boundary ?? ""), "Facebook response totals must remain explicitly non-summable.");

  const linkRows = links.rows ?? [];
  const linkAccounting = links.accounting ?? {};
  const linkOccurrences = linkRows.reduce((sum, row) => sum + row.occurrences, 0);
  const linkEventIds = new Set(linkRows.flatMap((row) => row.eventIds));
  expect(linkRows.length === 38, "NYC Artist Coalition Facebook link ledger must retain 38 normalized URL rows.");
  expect(linkOccurrences === 61, "NYC Artist Coalition Facebook outbound-link occurrences must recompute to 61.");
  expect(linkEventIds.size === 25, "NYC Artist Coalition Facebook link-bearing event count must recompute to 25.");
  expect(linkRows.filter((row) => row.category === "published-article").length === 7, "NYC Artist Coalition Facebook published-article destination count must recompute to seven.");
  expect(linkRows.filter((row) => row.disposition === "protected").length === 1, "NYC Artist Coalition Facebook protected link-row count must recompute to one.");
  expect(linkRows.filter((row) => row.disposition === "research-needed").length === 4, "NYC Artist Coalition Facebook unresolved short-link rows must recompute to four.");
  expect(linkAccounting.linkOccurrences === linkOccurrences, "Stored NYC Artist Coalition Facebook link occurrences must match the rows.");
  expect(linkAccounting.normalizedUrlRows === linkRows.length, "Stored NYC Artist Coalition Facebook normalized URL count must match the rows.");
  expect(linkAccounting.eventsWithOutboundLinks === linkEventIds.size, "Stored NYC Artist Coalition Facebook link-bearing event count must match the rows.");
  expect(
    linkRows
      .filter((row) => row.disposition === "protected" || row.host === "goo.gl")
      .every((row) => row.publicUrl === null),
    "Protected working-document and unresolved goo.gl locators must remain withheld."
  );

  requireFragments("NYC Artist Coalition Facebook event model", corpusModel, [
    "LEAD-NYCAC-FACEBOOK-EVENT-FULL-POPULATION-2026",
    "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
    "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
    "SRC-NYCAC-FACEBOOK-EVENT-LINK-INVENTORY-2026",
    "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
    "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
    "SRC-GOTHAMIST-COMMERCIAL-RENT-2019",
    "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
    "CLM-NYCAC-PARTICIPATION-SYSTEM",
    "CLM-NYCAC-FACEBOOK-RESPONSE-BOUNDARY",
    "CLM-NYCAC-FACEBOOK-EVENT-LINK-ROUTING",
    "INQ-NYCAC-FACEBOOK-EVENTS-2026",
    "61 outbound-link occurrences across 38 normalized URL rows on 25 events",
    "not automatic corroboration",
    "helped establish and produce",
    "not sole organization or authorship"
  ]);
  requireFragments("NYC Artist Coalition Facebook framework integration", framework, [
    "nycartcFacebookEventIntake",
    "nycartcFacebookEventSources",
    "nycartcFacebookEventClaims",
    "nycartcFacebookEventInquiries",
    "nycartcFacebookEventPublicationDecisions",
    "nycartcFacebookEventProofCoverage"
  ]);
  requireFragments("NYC Artist Coalition participation proof", proofs, [
    'id: "nyc-artist-coalition-participation-system"',
    "Helped establish and produce",
    "Twelve recurring-meeting records span ten named physical venues and two virtual meetings",
    "Facebook responses equal attendance",
    "All 34 event records were recovered"
  ]);
  requireFragments("NYC Artist Coalition work data", workData, [
    '"nyc-artist-coalition-participation-system"',
    "Participation event layer",
    "Twelve recovered recurring-meeting records across ten named physical venues and two virtual meetings"
  ]);
  requireFragments("Fair Rent case study", fairRentCase, [
    'claimId="CLM-NYCAC-PARTICIPATION-SYSTEM"',
    'occurrenceId="participation-system"',
    "building this participation layer was a substantial contribution",
    "do not assign Jamie authorship of every page"
  ]);
  requireFragments("NYC Artist Coalition Facebook archive documentation", archiveDoc, [
    "33 recovered event records + 1 unresolved control slot = 34/34 slots accounted",
    "same 33-ID set with no additions or omissions",
    "Twelve recovered records are recurring coalition meetings",
    "Thirty-two recovered event pages display a Facebook response total",
    "61 outbound-link occurrences across 38",
    "posting a URL does not establish",
    "helped establish and produce",
    "100 percent control-slot accounting, not 100 percent content recovery"
  ]);
  requireFragments("NYC Artist Coalition Facebook anti-claims", antiClaims, [
    "Facebook response totals equal attendance",
    "Jamie authored every NYC Artist Coalition Facebook event page",
    "every historical NYC Artist Coalition event",
    "posted URL is automatic corroboration",
    "one event caused a policy outcome"
  ]);

  const publicBundle = [eventLedger, linkLedger, corpusModel, framework, proofs, workData, fairRentCase, archiveDoc, antiClaims].join("\n");
  const privateMarkers = [
    /auth_token\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /zoom\.us\/j\//i,
    /docs\.google\.com\/document\/d\//i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push("Public NYC Artist Coalition Facebook event bundle contains access, session, working-document, or private-path material.");
  }

  return missing;
}

export function evaluatePersonalWowlistFacebookEventArchive({
  controlsLedger,
  hostedCensus,
  corpusModel,
  framework,
  proofs,
  archiveDoc,
  participatoryDoc,
  antiClaims,
  publicSite
}) {
  const missing = [];
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };
  const requireFragments = (surface, content, fragments) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  let controls;
  try {
    controls = JSON.parse(controlsLedger);
  } catch {
    missing.push("Personal and WOW List Facebook event controls are not valid JSON.");
    return missing;
  }

  const association = controls.personalAssociationSurface ?? {};
  const displayedHosts = association.displayedHostAccounting ?? {};
  const associationYears = Object.values(association.yearCounts ?? {}).reduce(
    (sum, count) => sum + count,
    0
  );
  expect(
    association.currentRecords === 502,
    "Personal Facebook event association control must remain 502 records."
  );
  expect(
    association.secondPassExactIdMatch === true,
    "Personal Facebook event control must retain the exact second-pass ID match."
  );
  expect(
    displayedHosts.jamie === 20 && displayedHosts.anotherHost === 482,
    "Personal Facebook displayed-host accounting must remain 20 Jamie and 482 another host."
  );
  expect(
    displayedHosts.jamie + displayedHosts.anotherHost === 502,
    "Personal Facebook displayed-host accounting must recompute to 502."
  );
  expect(
    displayedHosts.distinctHostLabelsIncludingUnresolved === 295,
    "Personal Facebook distinct displayed-host labels must remain 295."
  );
  expect(
    associationYears === 502,
    "Personal Facebook year counts must recompute to 502."
  );
  expect(
    /does not establish attendance, endorsement, participation, production, authorship, or professional significance/i.test(
      association.boundary ?? ""
    ),
    "Personal Facebook association control must preserve the non-attendance and non-authorship boundary."
  );

  const hosted = controls.jamieHostedControl ?? {};
  const formTotal = Object.values(hosted.primaryFormCounts ?? {}).reduce(
    (sum, count) => sum + count,
    0
  );
  const hostedYearTotal = Object.values(hosted.yearCounts ?? {}).reduce(
    (sum, count) => sum + count,
    0
  );
  expect(hosted.controlSlots === 21, "Jamie-hosted Facebook event control must remain 21 slots.");
  expect(hosted.recoveredPages === 20, "Jamie-hosted Facebook event recovery must remain 20 pages.");
  expect(hosted.unresolvedSlots === 1, "Jamie-hosted Facebook event archive must retain one unresolved slot.");
  expect(
    hosted.recoveredPages + hosted.unresolvedSlots === hosted.controlSlots,
    "Jamie-hosted Facebook event dispositions must recompute to all 21 control slots."
  );
  expect(formTotal === 20, "Jamie-hosted primary-form counts must recompute to 20 recovered pages.");
  expect(hostedYearTotal === 20, "Jamie-hosted year counts must recompute to 20 recovered pages.");
  expect(
    hosted.primaryFormCounts?.["cultural-performance-and-production"] === 7 &&
      hosted.primaryFormCounts?.["recurring-hospitality-and-care"] === 4 &&
      hosted.primaryFormCounts?.["participatory-place-travel-and-water"] === 4 &&
      hosted.primaryFormCounts?.["networked-culture-and-public-history"] === 3 &&
      hosted.primaryFormCounts?.["civic-learning-and-making"] === 2,
    "Jamie-hosted primary-form distribution must remain 7, 4, 4, 3, and 2."
  );
  expect(
    /must not be summed/i.test(hosted.responseSignalQuality?.boundary ?? ""),
    "Jamie-hosted Facebook response signals must remain explicitly non-summable."
  );

  const censusRows = hostedCensus
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .filter(Boolean);
  const recoveredRows = censusRows.filter((row) => row.includes(",recovered,"));
  const unresolvedRows = censusRows.filter((row) => row.includes(",unresolved,"));
  expect(censusRows.length === 21, "Hosted-event census must retain all 21 control-slot rows.");
  expect(recoveredRows.length === 20, "Hosted-event census must retain 20 recovered rows.");
  expect(unresolvedRows.length === 1, "Hosted-event census must retain one unresolved row.");
  expect(
    unresolvedRows[0] === "unresolved-021,unresolved,,",
    "The unresolved hosted-event row must not acquire an inferred year or form."
  );

  const wowlist = controls.wowlist ?? {};
  expect(
    wowlist.currentDisplayedRecords === 0 &&
      wowlist.facebookSearchNumericRecords === 0 &&
      wowlist.personalAssociationMatches === 0,
    "WOW List Facebook current, search, and personal-association controls must remain zero."
  );
  expect(
    wowlist.historicalDisposition === "not-recovered",
    "WOW List historical Facebook event disposition must remain not-recovered."
  );
  expect(
    /do not establish that no WOW List Facebook event ever existed/i.test(
      wowlist.boundary ?? ""
    ),
    "WOW List negative control must not become a historical nonexistence claim."
  );

  requireFragments("Personal and WOW List Facebook event model", corpusModel, [
    "LEAD-PERSONAL-WOWLIST-FACEBOOK-EVENT-FULL-POPULATION-2026",
    "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026",
    "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
    "SRC-JAMIE-FACEBOOK-EVENT-MICROPOP-2007",
    "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026",
    "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
    "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
    "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026",
    "INQ-WOWLIST-FACEBOOK-EVENTS-2026",
    "not automatic corroboration",
    "not sole production",
    "Not recovered does not mean did not exist",
    "decision: \"reserve\""
  ]);
  requireFragments("Personal and WOW List Facebook framework integration", framework, [
    "personalWowlistFacebookEventIntake",
    "personalWowlistFacebookEventSources",
    "personalWowlistFacebookEventClaims",
    "personalWowlistFacebookEventInquiries",
    "personalWowlistFacebookEventPublicationDecisions",
    "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
    "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-2014",
    "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017"
  ]);
  requireFragments("Sunday Dinner proof basis", proofs, [
    'id: "sunday-dinner-196-participation-infrastructure"',
    "public Facebook event pages document the hundredth dinner",
    "rotating eight-week New York City format",
    "civic sign-making potluck"
  ]);
  requireFragments("Personal and WOW List Facebook archive documentation", archiveDoc, [
    "same 502 event IDs with no additions or omissions",
    "20 recovered event pages and one unresolved historical slot",
    "Association does not establish attendance",
    "Twenty recovered hosted-event pages from 2006 through 2017",
    "not automatic corroboration",
    "Not recovered does not mean did not exist",
    "Do not add a new visible portfolio claim in this pass"
  ]);
  requireFragments("Participatory practice documentation", participatoryDoc, [
    "20 pages were recovered and one remains unresolved",
    "seven cultural performance and production events",
    "not sole production",
    "association control"
  ]);
  requireFragments("Personal and WOW List Facebook anti-claims", antiClaims, [
    "not recovered does not mean did not exist",
    "Association does not establish attendance",
    "Do not erase the unresolved slot",
    "Do not sum or compare unstable response displays",
    "Do not publish the record-level personal association graph"
  ]);

  const forbiddenLedgerKeys = [
    '"eventId"',
    '"eventTitle"',
    '"sourceUrl"',
    '"guestName"',
    '"exactLocation"'
  ];
  for (const key of forbiddenLedgerKeys) {
    expect(
      !controlsLedger.includes(key),
      `Aggregate personal Facebook controls must not expose record-level key ${key}.`
    );
  }
  const publicBundle = [
    controlsLedger,
    hostedCensus,
    corpusModel,
    framework,
    proofs,
    archiveDoc,
    participatoryDoc,
    antiClaims
  ].join("\n");
  const privateMarkers = [
    /auth_token\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push(
      "Public personal and WOW List Facebook event bundle contains authentication, session, or private-path material."
    );
  }
  expect(
    !publicSite.includes("CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017") &&
      !publicSite.includes("CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026") &&
      !publicSite.includes("CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026"),
    "Reserve personal and WOW List Facebook event claims must not silently appear on the public site."
  );

  return missing;
}

export function runLaunchEvals(repoRoot) {
  const hero = read(repoRoot, "apps/www/src/components/Hero.tsx");
  const homePage = read(repoRoot, "apps/www/src/app/page.tsx");
  const resumePage = read(repoRoot, "apps/www/src/app/resume/page.tsx");
  const ogImage = read(repoRoot, "apps/www/src/app/opengraph-image.tsx");
  const siteData = read(repoRoot, "apps/www/src/data/site.ts");
  const workData = read(repoRoot, "apps/www/src/data/work.ts");
  const agentGuide = read(repoRoot, "AGENTS.md");
  const readme = read(repoRoot, "README.md");
  const records = read(repoRoot, "apps/www/src/data/knowledge-bank/records.ts");
  const schema = read(repoRoot, "apps/www/src/data/knowledge-bank/schema.ts");
  const framework = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/framework.ts"
  );
  const campaignPress = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/campaign-press.ts"
  );
  const socialArchive = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/social-archive.ts"
  );
  const callNycSocialCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/callnyc-social-corpus.ts"
  );
  const callNycPostLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/callnyc-public-post-ledger.json"
  );
  const nycArtCSocialCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/nycartc-social-corpus.ts"
  );
  const nycArtCPostLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/nycartc-public-post-ledger.json"
  );
  const nycArtCEngagementLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/nycartc-public-engagement-ledger.json"
  );
  const nycArtCFacebookEventCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/nycartc-facebook-events-batch-2026-07-13.ts"
  );
  const nycArtCFacebookEventLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/nycartc-facebook-event-ledger.json"
  );
  const nycArtCFacebookEventLinkLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/nycartc-facebook-event-link-ledger.json"
  );
  const personalWowlistFacebookEventCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/personal-wowlist-facebook-events-batch-2026-07-14.ts"
  );
  const personalWowlistFacebookEventControls = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/personal-wowlist-facebook-event-controls.json"
  );
  const jamieFacebookHostedEventCensus = readOptional(
    repoRoot,
    "docs/knowledge-bank/jamie-facebook-hosted-event-census-2026-07-14.csv"
  );
  const wowlistSocialCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/wowlist-social-corpus.ts"
  );
  const wowlistPostLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/wowlist-public-post-ledger.json"
  );
  const kcTownHallSocialCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/kc-town-hall-social-corpus.ts"
  );
  const kcTownHallPostLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/kc-town-hall-public-post-ledger.json"
  );
  const urbanHermitSocialCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/urbanhermit-social-corpus.ts"
  );
  const urbanHermitPostLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/urbanhermit-public-post-ledger.json"
  );
  const urbanHermitEngagementLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/urbanhermit-public-engagement-ledger.json"
  );
  const knowledgeReadme = read(repoRoot, "docs/knowledge-bank/README.md");
  const campaignPressDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-12-campaign-press-corpus.md"
  );
  const kcTownHallCouncilAllocationDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-13-kc-town-hall-council-allocation.md"
  );
  const kcTownHallStewardshipTransitionDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-13-kc-town-hall-stewardship-transition.md"
  );
  const iCloudTeamsArchiveDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-13-icloud-teams-archive-pass.md"
  );
  const googleSharedDrivesArchiveDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-13-google-shared-drives-archive-pass.md"
  );
  const projectSocialArchiveDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-13-project-social-account-archive-pass.md"
  );
  const callNycFullPopulationDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-13-callnyc-full-population-social-corpus.md"
  );
  const nycArtCFullPopulationDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-nycartc-full-population-social-corpus.md"
  );
  const nycArtCFacebookEventDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/nycartc-facebook-events-2026-07-13.md"
  );
  const personalWowlistFacebookEventDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14.md"
  );
  const participatoryPublicProgramsDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/projects/participatory-public-programs.md"
  );
  const wowlistFullPopulationDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-wowlist-full-population-social-corpus.md"
  );
  const kcTownHallFullPopulationDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-kc-town-hall-full-population-social-corpus.md"
  );
  const urbanHermitFullPopulationDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-urbanhermit-full-population-social-corpus.md"
  );
  const callNycCase = read(repoRoot, "apps/www/src/content/work/callnyc.mdx");
  const fairRentCase = read(repoRoot, "apps/www/src/content/work/fair-rent-nyc.mdx");
  const wowlistCase = read(repoRoot, "apps/www/src/content/work/wowlist.mdx");
  const sundayDinnerCase = read(
    repoRoot,
    "apps/www/src/content/work/196-sunday-dinner.mdx"
  );
  const kcTownHallCase = read(
    repoRoot,
    "apps/www/src/content/work/kc-town-hall.mdx"
  );
  const proofs = read(repoRoot, "apps/www/src/data/proofs.ts");
  const technicalOperations = read(
    repoRoot,
    "apps/www/src/app/work/technical-operations/page.tsx"
  );
  const button = read(repoRoot, "apps/www/src/components/JBButton.tsx");
  const globalCss = read(repoRoot, "apps/www/src/app/globals.css");
  const deployment = read(repoRoot, "docs/deployment.md");
  const chadGuide = read(repoRoot, "docs/knowledge-bank/chad-lens.md");
  const antiClaims = read(repoRoot, "docs/knowledge-bank/anti-claims.md");
  const packageJson = JSON.parse(read(repoRoot, "package.json"));
  const resumePath = path.join(
    repoRoot,
    "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
  );

  const results = [];

  const messagingSources = [hero, resumePage, ogImage, siteData, agentGuide, readme];
  const messagingMissing = messagingSources.flatMap((content, index) =>
    includesAll(content, [index < 3 ? PRIMARY_MESSAGE : "emerging work"])
  );
  results.push(
    result({
      id: "message-alignment",
      label: "Emerging-work positioning is consistent on primary surfaces",
      weight: 14,
      missing: messagingMissing,
      evidence: [
        "Hero, resume HTML, and social preview use the canonical sentence.",
        "Site metadata and contributor guidance preserve the emerging-work frame."
      ]
    })
  );

  const callNycMissing = [
    ...includesAll(records, [
      "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION",
      "SRC-CALLNYC-HELEN-ROSENTHAL-780797474277511170",
      "SRC-CALLNYC-YDANIS-RODRIGUEZ-733089563334299648",
      "SRC-CALLNYC-ROSIE-MENDEZ-733410096915550208",
      "SRC-CALLNYC-MATHIEU-EUGENE-783305320508514304",
      "SRC-CALLNYC-PETER-KOO-RETWEET-725422714807267328",
      "At least five sitting NYC Council members publicly amplified CallNYC in 2016",
      "not an official NYC Council endorsement"
    ]),
    ...includesAll(callNycCase, [
      "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION",
      "council-member-amplification"
    ]),
    ...includesAll(proofs, ["callnyc-council-member-amplification"])
  ];
  results.push(
    result({
      id: "callnyc-external-validation",
      label: "CallNYC Council-member amplification is canonical and bounded",
      weight: 14,
      hardGate: true,
      missing: callNycMissing,
      evidence: [
        "Five action-specific public sources and Council officeholding context are recorded.",
        "The public claim says at least five and disallows official-endorsement framing."
      ]
    })
  );

  const responsiveMissing = [
    ...includesAll(technicalOperations, [
      'className="text-4xl font-bold text-jb-ink sm:text-5xl"'
    ]),
    ...includesAll(button, ["max-w-full", "whitespace-normal", "break-words"])
  ];
  if (/overflow-x\s*:\s*hidden|overflow-x-hidden/.test(globalCss)) {
    responsiveMissing.push("Do not mask layout failures with global overflow-x hiding.");
  }
  results.push(
    result({
      id: "responsive-contracts",
      label: "Known mobile overflow causes are repaired without concealment",
      weight: 14,
      hardGate: true,
      missing: responsiveMissing,
      evidence: [
        "Technical Operations scales its longest heading below the small breakpoint.",
        "Shared buttons wrap long labels within the available width."
      ]
    })
  );

  const resumeMissing = [];
  if (!existsSync(resumePath)) {
    resumeMissing.push("Approved resume PDF is missing.");
  } else {
    const resumeText = extractResumeText(resumePath);
    const phoneMatches = resumeText.match(
      /(?:\(\d{3}\)\s*|\b\d{3}[-.\s])\d{3}[-.\s]\d{4}\b/g
    );
    if (statSync(resumePath).size < 10_000) {
      resumeMissing.push("Resume PDF is unexpectedly small.");
    }
    if (!/Jamie\s+Burkart/i.test(resumeText)) {
      resumeMissing.push("Resume PDF is not text-readable as Jamie Burkart's resume.");
    }
    if (!/Technical Project Manager/i.test(resumeText)) {
      resumeMissing.push("Resume PDF does not contain the target role.");
    }
    if ((phoneMatches?.length ?? 0) !== 1) {
      resumeMissing.push("Resume PDF must contain exactly one phone number.");
    }
    const pages = extractResumePages(resumePath);
    if (pages !== null && pages !== 2) {
      resumeMissing.push(`Resume PDF must remain two pages; found ${pages}.`);
    }
  }
  results.push(
    result({
      id: "resume-application-artifact",
      label: "Approved application resume is present and machine-readable",
      weight: 14,
      hardGate: true,
      missing: resumeMissing,
      evidence: [
        "The approved PDF remains at its stable public path.",
        "Identity, role, phone-count, size, and page-count checks pass."
      ]
    })
  );

  const applicationMissing = [
    ...includesAll(siteData, [
      "jamie.burkart@gmail.com",
      "https://linkedin.com/in/jamie-burkart",
      "https://github.com/openhouse",
      "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
    ]),
    ...includesAll(resumePage, ["Download resume PDF", "Contact Jamie"])
  ];
  results.push(
    result({
      id: "application-path-integrity",
      label: "Application and contact paths use approved destinations",
      weight: 10,
      hardGate: true,
      missing: applicationMissing,
      evidence: ["Resume, email, LinkedIn, GitHub, and contact paths remain explicit."]
    })
  );

  const deploymentMissing = includesAll(deployment, [
    "## Production Cutover",
    "## Rollback",
    "dokku releases:report jamieburk-art",
    "dokku ps:rebuild jamieburk-art",
    "NEXT_PUBLIC_ROBOTS_POLICY=index",
    "curl -i https://jamieburk.art/api/health"
  ]);
  results.push(
    result({
      id: "production-cutover-readiness",
      label: "Production cutover and rollback are executable",
      weight: 10,
      hardGate: true,
      missing: deploymentMissing,
      evidence: [
        "The runbook records the release before deploy, verifies production invariants, and names rollback commands."
      ]
    })
  );

  const scripts = packageJson.scripts ?? {};
  const safetyMissing = [];
  for (const scriptName of [
    "check:citations",
    "test:citations",
    "knowledge-bank",
    "public-safety",
    "check:routes",
    "evals:launch",
    "test:evals",
    "prelaunch:production"
  ]) {
    if (!scripts[scriptName]) safetyMissing.push(`Missing npm script: ${scriptName}`);
  }
  results.push(
    result({
      id: "release-gate-wiring",
      label: "Release checks and evals are wired into repeatable commands",
      weight: 12,
      hardGate: true,
      missing: safetyMissing,
      evidence: [
        "Existing citation, public-safety, route, build, and environment gates remain authoritative.",
        "Launch evals add bounded static contracts and a production prelaunch command."
      ]
    })
  );

  const chadLensMissing = evaluateChadLens({
    hero,
    homePage,
    technicalOperations,
    resumePage,
    proofs,
    chadGuide
  });
  results.push(
    result({
      id: "chad-lens-legibility",
      label: "Chad lens: actor, purpose, usable result, and reader path are explicit",
      weight: 16,
      hardGate: true,
      missing: chadLensMissing,
      evidence: [
        "The primary path names Jamie's target role, entry condition, coordination work, usable outputs, proof, and next action.",
        "Project summaries use actor-led, bounded contribution language instead of noun piles or inflated ownership."
      ]
    })
  );

  const knowledgeLifecycleMissing = evaluateKnowledgeLifecycle({
    schema,
    records,
    framework,
    socialArchive: `${socialArchive}\n${callNycSocialCorpus}\n${wowlistSocialCorpus}`,
    coverageExtensions: `${kcTownHallSocialCorpus}\n${nycArtCSocialCorpus}\n${nycArtCFacebookEventCorpus}\n${personalWowlistFacebookEventCorpus}\n${urbanHermitSocialCorpus}`,
    knowledgeReadme,
    fairRentCase,
    proofs
  });
  results.push(
    result({
      id: "knowledge-bank-lifecycle",
      label: "Knowledge-bank lifecycle preserves intake and separates evidence from publication",
      weight: 18,
      hardGate: true,
      missing: knowledgeLifecycleMissing,
      evidence: [
        "Every supplied memory and URL has a durable intake record and disposition.",
        "Sources, claims, inquiries, publication decisions, proof-coverage debt, and photo research remain distinct and linked.",
        "Only a deliberately selected bounded claim is promoted to the public site."
      ]
    })
  );

  const evidenceExpansionMissing = evaluateEvidenceExpansion({
    framework,
    fairRentCase,
    sundayDinnerCase,
    kcTownHallCase
  });
  results.push(
    result({
      id: "portfolio-evidence-expansion",
      label: "Ten-source research strengthens proof coverage and selected public claims",
      weight: 18,
      hardGate: true,
      missing: evidenceExpansionMissing,
      evidence: [
        "Ten new public sources span independent reporting, campaign artifacts, and government records.",
        "Sources mature bounded claims and reduce proof debt instead of accumulating as orphans.",
        "Only reader-useful claims selected through the publication layer reach cited portfolio surfaces."
      ]
    })
  );

  const kcTownHallCouncilAllocationMissing = evaluateKcTownHallCouncilAllocation({
    framework,
    proofs,
    kcTownHallCase,
    councilAllocationDoc: kcTownHallCouncilAllocationDoc,
    stewardshipTransitionDoc: kcTownHallStewardshipTransitionDoc,
    workData
  });
  results.push(
    result({
      id: "kc-town-hall-council-allocation",
      label: "KC Town Hall Council allocation is primary-sourced and bounded",
      weight: 18,
      hardGate: true,
      missing: kcTownHallCouncilAllocationMissing,
      evidence: [
        "The board recommendation, appropriation ordinance, and accepting resolution form a dated public-record sequence.",
        "The selected projection distinguishes Jamie's documented presenter role from Council action and does not imply sole causation.",
        "The claim distinguishes allocation and negotiation authority from agreement execution, receipt, disbursement, completion, and later status.",
        "Jamie's involvement is historical; the stewardship transition remains bounded firsthand research context with personal circumstances omitted."
      ]
    })
  );

  const campaignPressMissing = evaluateCampaignPressCorpus({
    schema,
    framework,
    campaignPress,
    campaignPressDoc
  });
  results.push(
    result({
      id: "campaign-press-corpus",
      label: "All four campaign press indexes are complete, deduplicated, and bounded",
      weight: 18,
      hardGate: true,
      missing: campaignPressMissing,
      evidence: [
        "The corpus preserves 46 campaign-index appearances across 45 unique articles.",
        "Every unique article resolves to a canonical source or an existing close-read source record.",
        "Unreviewed articles remain linked to a recovery inquiry and cannot support public claims merely by appearing in a campaign index."
      ]
    })
  );

  const iCloudArchiveProductionMissing = evaluateICloudArchiveProduction({
    framework,
    proofs,
    technicalOperations,
    archiveDoc: iCloudTeamsArchiveDoc
  });
  results.push(
    result({
      id: "icloud-teams-archive-production",
      label: "iCloud Teams archival production matures evidence without leaking private records",
      weight: 18,
      hardGate: true,
      missing: iCloudArchiveProductionMissing,
      evidence: [
        "Jamie Projects History, CRS, and job-hunt each produce a durable source, claim, or inquiry disposition.",
        "A public cultural collaboration remains reserve while a protected-source-backed operating claim reaches Technical Operations.",
        "First-party job-hunt material creates proof debt rather than self-corroboration.",
        "Hydration uncertainty and local-path privacy are enforced explicitly."
      ]
    })
  );

  const googleSharedDriveArchiveProductionMissing =
    evaluateGoogleSharedDriveArchiveProduction({
      framework,
      proofs,
      technicalOperations,
      fairRentCase,
      sundayDinnerCase,
      archiveDoc: googleSharedDrivesArchiveDoc
    });
  results.push(
    result({
      id: "google-shared-drives-archive-production",
      label: "Google Shared Drive archival production strengthens proof without publishing the archive",
      weight: 18,
      hardGate: true,
      missing: googleSharedDriveArchiveProductionMissing,
      evidence: [
        "All 110 accessible Shared Drives receive a private collection-level inventory while the public repo retains only a bounded summary.",
        "Focused close reading produces selected, reserve, protected, photo, and research dispositions rather than automatic publication.",
        "A privacy-aware commercial-vacancy proposal and a concrete residency-onboarding workflow strengthen public role evidence.",
        "Custody, draft status, authorship, adoption, rights, and outcome boundaries remain explicit and machine-checked."
      ]
    })
  );

  const projectSocialArchiveMissing = evaluateProjectSocialArchiveProduction({
    framework,
    socialArchive,
    proofs,
    technicalOperations,
    fairRentCase,
    wowlistCase,
    archiveDoc: projectSocialArchiveDoc,
    antiClaims
  });
  results.push(
    result({
      id: "project-social-archive-production",
      label: "Project social accounts preserve engagement evidence and collective authorship boundaries",
      weight: 18,
      hardGate: true,
      missing: projectSocialArchiveMissing,
      evidence: [
        "Four verified project handles and four coalition campaign identities are mapped without inventing accounts for other projects.",
        "Authenticated recovery counts retain explicit population controls, unresolved slots, and platform-export boundaries.",
        "Council-member interaction counts distinguish direct engagement, campaign ecology, officeholding, and official endorsement.",
        "Jamie's account-establishment role remains distinct from shared post authorship and collective campaign outcomes."
      ]
    })
  );

  const callNycFullPopulationMissing = evaluateCallNycFullPopulationArchive({
    ledger: callNycPostLedger,
    corpusModel: callNycSocialCorpus,
    framework,
    records,
    proofs,
    workData,
    technicalOperations,
    callNycCase,
    archiveDoc: callNycFullPopulationDoc,
    antiClaims
  });
  results.push(
    result({
      id: "callnyc-full-population-archive",
      label: "CallNYC full-population archive reconciles every observed slot and bounds stakeholder claims",
      weight: 20,
      hardGate: true,
      missing: callNycFullPopulationMissing,
      evidence: [
        "All 110 observed profile-count slots are dispositioned as 107 item-level recoveries and three explicit unresolved slots.",
        "Item-level recomputation verifies post types, recognition posts, Council-member handles, issue pages, categories, and outbound URLs.",
        "Selected public claims distinguish intended reach from reciprocal engagement and issue rows from people or outcomes.",
        "Independent NYC School of Data recognition is selected while API announcements and unverifiable historical metrics remain reserve or research debt."
      ]
    })
  );

  const urbanHermitFullPopulationMissing = evaluateUrbanHermitFullPopulationArchive({
    populationLedger: urbanHermitPostLedger,
    engagementLedger: urbanHermitEngagementLedger,
    corpusModel: urbanHermitSocialCorpus,
    framework,
    proofs,
    technicalOperations,
    archiveDoc: urbanHermitFullPopulationDoc,
    antiClaims
  });
  results.push(
    result({
      id: "urbanhermit-full-population-archive",
      label: "Personal social archive reconciles the current population while protecting personal context",
      weight: 20,
      hardGate: true,
      missing: urbanHermitFullPopulationMissing,
      evidence: [
        "All 434 current live-profile records are recovered as 338 authored posts, 15 authored replies, and 81 reposts.",
        "Aggregate recomputation verifies every year, theme, relationship, link, stakeholder, and interaction-context total.",
        "The 26-record inbound floor remains distinct from endorsement, reach, causality, or complete historical engagement.",
        "NPR, Music Hackathon, and KCUR sources are promoted selectively while the personal timeline and raw reactions remain protected."
      ]
    })
  );

  const nycArtCFullPopulationMissing = evaluateNycArtCFullPopulationArchive({
    populationLedger: nycArtCPostLedger,
    engagementLedger: nycArtCEngagementLedger,
    corpusModel: nycArtCSocialCorpus,
    framework,
    socialArchive,
    proofs,
    technicalOperations,
    fairRentCase,
    archiveDoc: nycArtCFullPopulationDoc,
    antiClaims
  });
  results.push(
    result({
      id: "nycartc-full-population-archive",
      label: "NYC Artist Coalition full-population archive dispositions every slot and bounds engagement",
      weight: 20,
      hardGate: true,
      missing: nycArtCFullPopulationMissing,
      evidence: [
        "All 5,124 current profile-count slots are dispositioned as 3,367 item-level recoveries and 1,757 explicit unresolved slots.",
        "Item-level recomputation verifies relationships, eight theme families, campaign-hashtag floors, 1,241 unique outbound URLs, and all unresolved placeholders.",
        "The inbound ledger distinguishes 347 explicit account mentions from 154 search or thread-context records within 501 rendered results from 178 accounts.",
        "The selected public claim retains a 24-record floor across at least seven Council-member accounts without converting interaction into endorsement or causality."
      ]
    })
  );

  const nycArtCFacebookEventMissing = evaluateNycArtCFacebookEventArchive({
    eventLedger: nycArtCFacebookEventLedger,
    linkLedger: nycArtCFacebookEventLinkLedger,
    corpusModel: nycArtCFacebookEventCorpus,
    framework,
    proofs,
    workData,
    fairRentCase,
    archiveDoc: nycArtCFacebookEventDoc,
    antiClaims
  });
  results.push(
    result({
      id: "nycartc-facebook-event-archive",
      label: "NYC Artist Coalition Facebook events account for every control slot and expose a bounded participation system",
      weight: 20,
      hardGate: true,
      missing: nycArtCFacebookEventMissing,
      evidence: [
        "All 34 current host-card control slots are dispositioned as 33 recovered records and one unresolved slot, with an exact second-pass ID match.",
        "Recomputation verifies the year distribution, 12 recurring meetings, ten physical venues, two virtual meetings, and bounded response signals.",
        "Sixty-one outbound-link occurrences become a privacy-reviewed 38-row source and action-routing ledger rather than automatic claim evidence.",
        "The selected portfolio claim credits Jamie's substantial participation-system contribution while preserving collective authorship and policy-causality boundaries."
      ]
    })
  );

  const personalWowlistFacebookEventMissing =
    evaluatePersonalWowlistFacebookEventArchive({
      controlsLedger: personalWowlistFacebookEventControls,
      hostedCensus: jamieFacebookHostedEventCensus,
      corpusModel: personalWowlistFacebookEventCorpus,
      framework,
      proofs,
      archiveDoc: personalWowlistFacebookEventDoc,
      participatoryDoc: participatoryPublicProgramsDoc,
      antiClaims,
      publicSite: [
        homePage,
        technicalOperations,
        workData,
        fairRentCase,
        wowlistCase,
        sundayDinnerCase
      ].join("\n")
    });
  results.push(
    result({
      id: "personal-wowlist-facebook-event-archive",
      label: "Personal and WOW List Facebook events reconcile every current control while preserving privacy and semantic boundaries",
      weight: 20,
      hardGate: true,
      missing: personalWowlistFacebookEventMissing,
      evidence: [
        "Two authenticated terminal traversals returned the same 502 personal event IDs, split as 20 cards displaying Jamie as host and 482 displaying another host.",
        "All 21 current Jamie-hosted control slots are dispositioned as 20 recovered pages and one unresolved slot.",
        "The current WOW List event surface displays zero records; bounded historical recovery remains explicitly not recovered rather than never existed.",
        "Aggregate ledgers, collective-credit rules, response-signal boundaries, and reserve publication decisions keep personal data and unsupported impact claims off the public site."
      ]
    })
  );

  const wowlistFullPopulationMissing = evaluateWowlistFullPopulationArchive({
    ledger: wowlistPostLedger,
    corpusModel: wowlistSocialCorpus,
    framework,
    proofs,
    workData,
    wowlistCase,
    archiveDoc: wowlistFullPopulationDoc,
    antiClaims
  });
  results.push(
    result({
      id: "wowlist-full-population-archive",
      label: "WOWList full-population archive reconciles every current-profile item and bounds use claims",
      weight: 20,
      hardGate: true,
      missing: wowlistFullPopulationMissing,
      evidence: [
        "All 38 items in the current live-profile control are recovered and classified at item level.",
        "Item-level recomputation verifies post types, themes, repost sources, and all 35 posted short URLs.",
        "The selected portfolio claim makes public support and onboarding concrete without assigning individual post authorship.",
        "Scene knowledge and civic-care findings remain available in reserve without converting shared resources into authorship, adoption, or impact."
      ]
    })
  );

  const kcTownHallFullPopulationMissing = evaluateKcTownHallFullPopulationArchive({
    ledger: kcTownHallPostLedger,
    corpusModel: kcTownHallSocialCorpus,
    framework,
    proofs,
    workData,
    technicalOperations,
    kcTownHallCase,
    archiveDoc: kcTownHallFullPopulationDoc,
    antiClaims
  });
  results.push(
    result({
      id: "kc-town-hall-full-population-archive",
      label: "KC Town Hall full-population archive dispositions every profile slot and preserves stewardship boundaries",
      weight: 20,
      hardGate: true,
      missing: kcTownHallFullPopulationMissing,
      evidence: [
        "All 183 current-profile count slots are dispositioned as 181 item-level recoveries and two explicit unresolved slots.",
        "Item-level recomputation verifies account relationships, five theme families, 133 short-link occurrences, visible reactions, and stakeholder patterns.",
        "The selected portfolio claim credits Jamie with establishing a durable public identity while keeping shared authorship and later stewardship explicit.",
        "Tired of Tires and civic-exchange findings remain in reserve with project-reported, non-endorsement, and non-causality boundaries."
      ]
    })
  );

  const summary = summarizeLaunchEvals(results);
  const manualEvals = [
    {
      id: "hiring-manager-30-second-test",
      status: "manual-required",
      pass: "A reviewer can state Jamie's role, differentiated value, three proofs, and next action after reviewing the homepage, Technical Operations, and Resume."
    },
    {
      id: "resume-visual-balance",
      status: "manual-required",
      pass: "Rendered pages have no clipping or overlap and no role begins with an orphaned continuation bullet. Replacing the approved PDF requires Jamie's approval."
    },
    {
      id: "postdeploy-verification",
      status: "manual-required",
      pass: "Production health, robots, sitemap, canonicals, www redirect, key routes, and resume PDF pass after the explicitly approved deploy."
    },
    {
      id: "repository-hygiene",
      status: "manual-required",
      pass: "Every open PR targeting develop is active and owned; superseded branch-family PRs are closed or labeled."
    }
  ];

  return {
    suite: "jamieburk-art-launch-readiness",
    generatedAt: new Date().toISOString(),
    summary,
    results,
    manualEvals,
    antiGaming: [
      "Do not delete routes, claims, evidence, or content merely to reduce failures.",
      "Do not hide overflow globally instead of repairing the responsible element.",
      "Do not strengthen public claims before updating canonical evidence and boundaries.",
      "Do not publish private sources to satisfy a citation requirement.",
      "Do not make copy shorter by hiding Jamie as actor, omitting the purpose, or replacing usable outcomes with generic systems language.",
      "Do not satisfy no-silent-loss by auto-publishing intake or converting memories directly into confirmed claims.",
      "Do not satisfy evidence expansion with duplicate, orphaned, self-authored-only, or boundary-free source records.",
      "Do not equate a Council appropriation or funding-negotiation authorization with an executed agreement, receipt, disbursement, project completion, or current status.",
      "Do not satisfy press-corpus completeness by dropping duplicates across campaigns, treating index membership as claim support, or marking unreviewed articles as close-read.",
      "Do not satisfy archival-production coverage by exposing local paths, private records, or unhydrated files; not recovered is not evidence of nonexistence.",
      "Do not use first-party job-hunt documents as independent corroboration or promote every mature archive claim to the public site.",
      "Do not publish Shared Drive names, links, IDs, membership, participant rows, access details, or private filenames to prove archival depth.",
      "Do not treat Shared Drive custody, a private draft, or one dated workflow record as proof of authorship, distribution, institutional adoption, implementation, or aggregate scale.",
      "Do not treat an authenticated visible social timeline as a complete platform export, count one-way tags as reciprocal engagement, assign every team post to Jamie, expose authentication material, or convert individual-account interactions into official endorsement or policy causality.",
      "Do not turn personal Facebook event association into attendance, endorsement, authorship, production, or professional proof; erase an unresolved hosted-event slot; sum unstable response displays; infer WOW List historical nonexistence from a current zero display; or silently promote reserve event claims onto the site.",
      "Production deployment always requires explicit human approval."
    ]
  };
}

export function writeLaunchEvalReports(repoRoot, report) {
  const reportDir = path.join(repoRoot, "reports/generated");
  mkdirSync(reportDir, { recursive: true });
  writeFileSync(
    path.join(reportDir, "launch-readiness.json"),
    `${JSON.stringify(report, null, 2)}\n`
  );

  const lines = [
    "# Launch Readiness Eval Report",
    "",
    `Generated: ${report.generatedAt}`,
    `Automated score: ${report.summary.score}/100`,
    `Automated hard gates: ${report.summary.hardGatesPass ? "PASS" : "FAIL"}`,
    `Automated readiness: ${report.summary.automatedReady ? "PASS" : "FAIL"}`,
    "",
    "## Automated Evals",
    ""
  ];

  for (const item of report.results) {
    lines.push(
      `- **${item.status.toUpperCase()}** ${item.label} (${item.weight})${
        item.hardGate ? " [hard gate]" : ""
      }`
    );
    for (const failure of item.failures) lines.push(`  - ${failure}`);
  }

  lines.push("", "## Manual Evals", "");
  for (const item of report.manualEvals) {
    lines.push(`- **MANUAL REQUIRED** ${item.id}: ${item.pass}`);
  }

  writeFileSync(path.join(reportDir, "launch-readiness.md"), `${lines.join("\n")}\n`);
}
