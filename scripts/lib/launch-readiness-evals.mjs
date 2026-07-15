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

export function evaluateKcTownHallPhaseOneNeighborhoodPractice({
  framework,
  batch,
  intakeDoc,
  projectDoc,
  claimsDoc,
  sourcesDoc,
  sourceCoverage,
  antiClaims,
  approvalRegister,
  publicSite
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
    "kcTownHallPhaseOneNeighborhoodIntake",
    "kcTownHallPhaseOneNeighborhoodProjects",
    "kcTownHallPhaseOneNeighborhoodSources",
    "kcTownHallPhaseOneNeighborhoodClaims",
    "kcTownHallPhaseOneNeighborhoodInquiries",
    "kcTownHallPhaseOneNeighborhoodPublicationDecisions"
  ]);
  requireFragments("Phase One structured batch", batch, [
    "LEAD-KCTH-PHASE-ONE-NEIGHBORHOOD-PRACTICE-2026",
    "SRC-KCTH-CCED-PHASE-ONE-PACKET-2019",
    "SRC-JAMIE-KCTH-PHASE-ONE-NEIGHBORHOOD-ROLE-2026",
    "SRC-KCMO-SCOTT-TAYLOR-KCTH-SUPPORT-2019",
    "SRC-JULIA-COLE-KCTH-SUPPORT-2019",
    "CLM-KCTH-PHASE-ONE-FIELD-DELIVERY",
    "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
    "CLM-EAST-KC-TIRED-OF-TIRES-JAMIE-ROLE",
    "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
    "INQ-KCTH-PHASE-ONE-COMPLETION-ROLE",
    "INQ-KCTH-SURVEY-RESPONSES",
    "INQ-EAST-KC-TIRED-OF-TIRES-ROLE-SCALE",
    "INQ-EAST-KC-CLEVELAND-AVE-OUTCOMES",
    'id: "east-kansas-city-neighborhood-practice"',
    "general-contractor license or formal contractual title",
    "planned 2019 Phase One completion",
    "Pastor Lee's authorship of the Cleveland Avenue corridor idea",
    'decision: "reserve"'
  ]);
  requireFragments("Phase One intake note", intakeDoc, [
    "packet remains outside the public repository",
    "day-to-day general-contractor",
    "packet was assembled before the end of 2019",
    "4-by-6 handbill",
    "city services",
    "later expanded to Indian Mound",
    "credits Pastor Lee",
    "does not silently add them to the public hiring site"
  ]);
  requireFragments("KC Town Hall project note", projectDoc, [
    "Phase One delivery",
    "day-to-day general-contractor and project-management function",
    "not evidence of licensure",
    "Participation system",
    "planned completion rather than independent proof"
  ]);
  requireFragments("Human-readable claim register", claimsDoc, [
    "CLM-KCTH-PHASE-ONE-FIELD-DELIVERY",
    "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
    "CLM-EAST-KC-TIRED-OF-TIRES-JAMIE-ROLE",
    "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
    "packet independently proves Phase One completion",
    "The survey statistically represented the neighborhood",
    "program held 99 pickups",
    "Jamie originated the corridor concept"
  ]);
  requireFragments("Source-basis register", sourcesDoc, [
    "protected 2019 KC Town Hall CCED proposal packet",
    "support letters from Council Member Scott Taylor and Julia Cole",
    "Firsthand details remain explicitly distinct from independent corroboration"
  ]);
  requireFragments("Source-coverage ledger", sourceCoverage, [
    "2026-07-15 KC Town Hall Phase One And Neighborhood Practice",
    "planned 2019 cold-shell completion",
    "general-contractor title",
    "Cleveland Avenue funding influence remains open research",
    "silently changing the selected website claim"
  ]);
  requireFragments("Anti-claim register", antiClaims, [
    "claim of licensure or a formal contractual title",
    "statistically representative mandate",
    "Indian Mound expansion as independently verified",
    "Credit Pastor Lee with the Cleveland Avenue corridor concept"
  ]);
  requireFragments("Approval register", approvalRegister, [
    "KC Town Hall Phase One",
    "firsthand functional description",
    "East Kansas City neighborhood practice",
    "credit Pastor Lee"
  ]);

  const protectedSources = batch.match(/visibility:\s*"protected"/g)?.length ?? 0;
  const privatePreservation = batch.match(/preservationStatus:\s*"private"/g)?.length ?? 0;
  const protectedLocators = batch.match(/protectedLocatorId:/g)?.length ?? 0;
  if (protectedSources < 4 || privatePreservation < 4 || protectedLocators < 4) {
    missing.push(
      "All four mixed-sensitivity Phase One sources must remain protected, private-preservation records with protected locators."
    );
  }

  const publicSafeBundle = [batch, intakeDoc, projectDoc].join("\n");
  const privateMarkers = [
    /\/Users\//,
    /\/Volumes\//,
    /account\s+(?:number|routing)/i,
    /credit\s+score\s*[:=]\s*\d/i,
    /(?:\(\d{3}\)|\b\d{3}[-.\s])\s*\d{3}[-.\s]\d{4}\b/,
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicSafeBundle))) {
    missing.push(
      "Public Phase One knowledge-bank material contains a private path, contact detail, or financial identifier."
    );
  }

  if (
    /CLM-KCTH-PHASE-ONE-FIELD-DELIVERY|CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM|CLM-EAST-KC-TIRED-OF-TIRES-JAMIE-ROLE|CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE/.test(
      publicSite
    )
  ) {
    missing.push(
      "Reserve Phase One and neighborhood-practice claims entered the public hiring site without a publication decision."
    );
  }

  if (
    /licensed general contractor|Jamie (?:alone|solely) (?:delivered|operated|created)|(?:caused|secured) (?:the )?(?:capital|discretionary) (?:allocation|funding)|99 pickups/i.test(
      publicSite
    )
  ) {
    missing.push(
      "Public site inflates licensure, sole credit, capital causality, or Tired of Tires scale."
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
    'coverage("fair-rent-campaign-memory", "source-backed"',
    "The plan establishes design intent; the 34-page running minutes establish subsequent use",
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

export function evaluateICloudArchiveExpansion({
  framework,
  expansionBatch,
  archiveDoc,
  creativeTechDoc,
  sourceCoverage,
  publicSite
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
    "iCloudTeamsExpansionIntake",
    "iCloudTeamsExpansionProjects",
    "iCloudTeamsExpansionSources",
    "iCloudTeamsExpansionClaims",
    "iCloudTeamsExpansionInquiries",
    "iCloudTeamsExpansionPublicationDecisions",
    "iCloudTeamsExpansionProofCoverage",
    'coverage("fair-rent-campaign-memory", "source-backed"',
    "34-page running-minutes record",
    "An earlier April 29 snapshot is 12 pages",
    "exact NYC Artist Coalition co-founder wording"
  ]);

  requireFragments("iCloud expansion batch", expansionBatch, [
    "LEAD-ICLOUD-JPH-CREATIVE-TECHNOLOGY-EXPANSION-2026",
    "LEAD-ICLOUD-CRS-THIRTY-FOUR-PAGE-VERIFICATION-2026",
    "LEAD-ICLOUD-JOB-HUNT-JULY-RESUME-AUDIT-2026",
    "creative-technology-practice",
    "SRC-COOL-HUNTING-TIME-IS-LONG-2006",
    "SRC-PITCH-NTER-CHNG-2010",
    "SRC-VIMEO-NTER-CHNG-2011",
    "SRC-MUSIC-HACKATHON-SORTED-AUDIO-2013",
    "SRC-NPR-HORSE-LORDS-TRUTHERS-2016",
    "CLM-TIME-IS-LONG-DELAY-INSTALLATION-2006",
    "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION-2010",
    "CLM-SORTED-AUDIO-MAX-MSP-2013",
    "CLM-CREATIVE-TECHNOLOGY-LONGITUDINAL-2006-2016",
    "INQ-CREATIVE-TECHNOLOGY-ROLE-ASSET-RECOVERY",
    "PUB-CREATIVE-TECHNOLOGY-LONGITUDINAL-2006-2016",
    'decision: "reserve"',
    "Drew Bolton",
    "Garrett Fuselier",
    "M.C. Schmidt",
    "not uninterrupted full-time practice"
  ]);

  requireFragments("iCloud expansion documentation", archiveDoc, [
    "68 top-level items in Teams",
    "15 project packets",
    "175 top-level items in CRS",
    "58 top-level items in job-hunt",
    "authenticated iCloud Drive web session",
    "locally materialized working folders",
    "not materialized locally is not absent",
    "April 29 snapshot containing 12 pages",
    "April-May running-minutes document containing 34 pages",
    "first-party research maps",
    "do not independently corroborate",
    "phone number remains excluded from website HTML",
    "No new reserve claim is automatically projected"
  ]);

  requireFragments("Creative-technology project record", creativeTechDoc, [
    "Time Is Long",
    "NTER CHNG",
    "A Sorted Audio File",
    "Truthers",
    "Drew Bolton",
    "Garrett Fuselier",
    "M.C. Schmidt",
    "not proof of uninterrupted full-time practice",
    "media-rights"
  ]);

  requireFragments("Source-coverage ledger", sourceCoverage, [
    "fair-rent-campaign-memory",
    "34-page April-May running-minutes document verifies the public",
    "earlier 12-page April 29 snapshot",
    "creative-technology-practice",
    "first-party research guides, not independent corroboration"
  ]);

  const publicBundles = [framework, expansionBatch, archiveDoc, creativeTechDoc, sourceCoverage].join("\n");
  const forbiddenPrivateMarkers = [
    /\/Users\//,
    /\/Volumes\//,
    /Mobile Documents/,
    /com~apple~CloudDocs/,
    /Library\/CloudStorage/,
    /(?:\+?1[\s.-]?)?\(?[2-9]\d{2}\)?[\s.-]\d{3}[\s.-]\d{4}/
  ];
  if (forbiddenPrivateMarkers.some((pattern) => pattern.test(publicBundles))) {
    missing.push("Public iCloud expansion contains a local filesystem path or phone number.");
  }

  const reserveProjectionMarkers = [
    "Jamie made Time is Long",
    "created NTER CHNG",
    "made a Max/MSP program that segmented audio",
    "a decade of Jamie's creative-technology work"
  ];
  for (const marker of reserveProjectionMarkers) {
    if (publicSite.includes(marker)) {
      missing.push(`Public site silently projects reserve creative-technology copy: ${marker}`);
    }
  }
  if (/Jamie (?:solely|alone) (?:created|made|built)/i.test(publicSite)) {
    missing.push("Public site assigns sole credit where the expansion requires collective attribution.");
  }

  return missing;
}

export function evaluateNterChngArchiveExpansion({
  framework,
  expansionBatch,
  archiveDoc,
  creativeTechDoc,
  sourceCoverage,
  antiClaims,
  publicSite
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
    "nterChngArchiveIntake",
    "nterChngArchiveSources",
    "nterChngArchiveClaims",
    "nterChngArchiveInquiries",
    "nterChngArchivePublicationDecisions"
  ]);
  requireFragments("NTER CHNG expansion batch", expansionBatch, [
    "LEAD-NTER-CHNG-ARCHIVE-EXHIBITION-EXPANSION-2026",
    "SRC-NTER-CHNG-PROJECT-SITE-2011",
    "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011",
    "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011",
    "SRC-NERMAN-AMERICA-NOW-HERE-2011",
    "LEAD-NTER-CHNG-GDRIVE-ARTIFACTS-2026",
    "SRC-GDRIVE-NTER-CHNG-INSTALLER-2011",
    "SRC-GDRIVE-NTER-CHNG-PROJECT-TEXT-2011",
    "CLM-NTER-CHNG-AMERICA-NOW-HERE-2011",
    "CLM-NTER-CHNG-PRODUCTION-SYSTEM-2011",
    "INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY",
    "PUB-NTER-CHNG-AMERICA-NOW-HERE-2011",
    "PUB-NTER-CHNG-PRODUCTION-SYSTEM-2011",
    "Drew Bolton",
    "Jamie Burkart",
    "Garrett Fuselier",
    "The Nerman Museum page establishes institutional and launch context but does not itself name NTER CHNG",
    "Archived phone numbers and participant-submitted messages are excluded",
    "plan and task inventory, not proof that every task was completed",
    "contemporaneous-origin project material rather than a frozen 2011 revision",
    "neither the raw text nor either Google Drive link enters the public repository",
    'visibility: "protected"',
    'preservationStatus: "private"',
    "protectedLocatorId",
    "not recovered is not evidence that it did not exist",
    'decision: "reserve"'
  ]);
  requireFragments("NTER CHNG intake documentation", archiveDoc, [
    "Recovered Source Chain",
    "direct exhibition record",
    "observed use",
    "does not name NTER CHNG",
    "Archived phone numbers and participant-submitted messages are intentionally excluded",
    "Additional Protected Artifacts",
    "not as a frozen or immutable 2011 revision",
    "plan and task inventory",
    "underlying links are withheld",
    "does not prove recovery of the final linked press-release PDF",
    "Not recovered is not evidence that it did not exist",
    "does not automatically enter the current hiring site"
  ]);
  requireFragments("Creative-technology project record", creativeTechDoc, [
    "archived project site",
    "official archived",
    "lists the collaborators as visual artists",
    "observed visitor use",
    "It does not itself name NTER CHNG",
    "participant-submitted messages are excluded",
    "planned production system spanning software",
    "installer is a plan",
    "not treated as frozen 2011 revisions",
    "links, private production details, and full text are withheld"
  ]);
  requireFragments("Source-coverage ledger", sourceCoverage, [
    "nine public records spanning 2006-2016",
    "plus two protected NTER CHNG project records",
    "official Kansas City artist page",
    "direct exhibition evidence from contextual institutional evidence"
  ]);
  requireFragments("Creative-technology anti-claims", antiClaims, [
    "Do not say the Nerman Museum page names NTER CHNG",
    "Do not convert an official account of visitors using the installation",
    "Do not reproduce archived phone numbers or participant-submitted messages",
    "Do not publish the protected Google Drive links",
    "Do not treat the installer plan as proof that every task was completed",
    "untouched 2011 snapshots",
    "does not establish recovery of the final linked press-release PDF"
  ]);

  const protectedRecordCount = (expansionBatch.match(/visibility:\s*"protected"/g) ?? []).length;
  const protectedLocatorCount = (expansionBatch.match(/protectedLocatorId/g) ?? []).length;
  if (protectedRecordCount < 2 || protectedLocatorCount < 2) {
    missing.push("Both NTER CHNG Google Drive records must remain protected and use protected locators.");
  }

  const publicBundle = [
    framework,
    expansionBatch,
    archiveDoc,
    creativeTechDoc,
    sourceCoverage,
    antiClaims
  ].join("\n");
  const forbiddenPrivateMarkers = [
    /\/Users\//,
    /\/Volumes\//,
    /Mobile Documents/,
    /com~apple~CloudDocs/,
    /docs\.google\.com\/document\/d\//,
    /(?:\+?1[\s.-]?)?\(?[2-9]\d{2}\)?[\s.-]\d{3}[\s.-]\d{4}/
  ];
  if (forbiddenPrivateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push("Public NTER CHNG expansion contains a local filesystem path, raw Drive link, or phone number.");
  }

  if (
    publicSite.includes("CLM-NTER-CHNG-AMERICA-NOW-HERE-2011") ||
    publicSite.includes("CLM-NTER-CHNG-PRODUCTION-SYSTEM-2011") ||
    publicSite.includes("America: Now and Here's official sites document NTER CHNG") ||
    publicSite.includes("Protected project records show the operational depth behind NTER CHNG")
  ) {
    missing.push("Reserve NTER CHNG exhibition claim must not silently appear on the public site.");
  }
  if (/Jamie (?:solely|alone) (?:created|built|made|implemented|designed|produced) NTER CHNG/i.test(publicSite)) {
    missing.push("Public site assigns sole NTER CHNG credit where shared maker credit is required.");
  }
  if (/every installer task was completed|installer (?:proves|establishes) (?:the )?(?:work|tasks?) (?:was|were) completed/i.test(publicSite)) {
    missing.push("Public site converts the NTER CHNG installer plan into completion evidence.");
  }
  if (/Google Docs? (?:are|is) (?:an? )?(?:untouched|immutable|frozen) 2011/i.test(publicSite)) {
    missing.push("Public site treats modified NTER CHNG Google Docs as immutable 2011 snapshots.");
  }

  return missing;
}

export function evaluateNycArtCGovernmentInstitutionalValue({
  framework,
  institutionalBatch,
  intakeDoc,
  projectDoc,
  sourcesDoc,
  antiClaims,
  approvalRegister,
  sourceCoverage,
  publicSite
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
    "nycArtCGovernmentValueIntake",
    "nycArtCGovernmentValueSources",
    "nycArtCGovernmentValueClaims",
    "nycArtCGovernmentValueInquiries",
    "nycArtCGovernmentValuePublicationDecisions",
    "INQ-NYCARTC-GOVERNMENT-RECEPTION-CAUSALITY-2017",
    "DCLA explicitly identified the coalition",
    "legislative causality remain only partly canonical"
  ]);
  requireFragments("Institutional-value batch", institutionalBatch, [
    "LEAD-NYCARTC-GOVERNMENT-INSTITUTIONAL-VALUE-2026",
    "SRC-DCLA-CREATENYC-NEXT-STEPS-TESTIMONY-2017",
    "SRC-DCLA-COMMISSIONER-NYCARTC-MESSAGE-2017",
    "SRC-NYCARTC-DCLA-RECOMMENDATIONS-2017",
    "SRC-NYCARTC-ESPINAL-REPEAL-LETTER-2017",
    "SRC-NYC-COUNCIL-CABARET-OVERSIGHT-2017",
    "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-LAW-2017",
    "SRC-MOME-OFFICE-NIGHTLIFE-SIGNING-2017",
    "SRC-NYC-COUNCIL-CABARET-REPEAL-LAW-2017",
    "CLM-NYCARTC-DCLA-PUBLIC-ENGAGEMENT-VALUE-2017",
    "CLM-NYCARTC-GOVERNMENT-TRANSLATION-VALUE-2017",
    "CLM-NYCARTC-ESPINAL-POLICY-SEQUENCE-2017",
    'status: "inference"',
    "does not name NYC Artist Coalition",
    "institutional-value interpretation is an inference",
    "alignment does not establish that the coalition authored the law or caused its enactment",
    'decision: "reserve"'
  ]);
  requireFragments("Institutional-value intake note", intakeDoc, [
    "Why was NYC Artist Coalition's work useful to DCLA, the NYC Council, and",
    "The language of \"need\" is retained as an interpretive prompt",
    "The testimony describes members of the DIY community",
    "later DCLA commissioner message",
    "Institutional interpretation",
    "For DCLA",
    "For Council",
    "For Espinal",
    "Functional alignment is not authorship",
    "do not automatically add copy to the current hiring site"
  ]);
  requireFragments("NYC Artist Coalition project record", projectDoc, [
    "Why the work mattered to government",
    "does not name NYC Artist Coalition",
    "translated experience",
    "For Espinal",
    "Functional alignment",
    "not proof that the coalition authored the law"
  ]);
  requireFragments("Source-basis documentation", sourcesDoc, [
    "Tom Finkelpearl's February 27, 2017, DCLA testimony",
    "DCLA's commissioner message explicitly identifying New York City Artist Coalition",
    "June 19, 2017, oversight hearing transcript",
    "enacted Espinal-sponsored Office of Nightlife and Cabaret Law repeal laws"
  ]);
  requireFragments("Anti-claims", antiClaims, [
    "Do not say Finkelpearl's February 27, 2017, testimony named NYC Artist Coalition",
    "Do not convert \"why did they need us?\" into a recovered motive or fact",
    "Do not say NYC Artist Coalition authored the Office of Nightlife or Cabaret Law repeal legislation"
  ]);
  requireFragments("Approval register", approvalRegister, [
    "NYC Artist Coalition government value",
    "explicitly labeled institutional interpretation",
    "Do not state officials' private motives"
  ]);
  requireFragments("Source-coverage ledger", sourceCoverage, [
    "2026-07-15 DCLA And Council Institutional Value",
    "Eight additional public records",
    "translated informal cultural-space experience into forms government could receive and use",
    "does not establish officials' private motives"
  ]);

  if (
    /February 27[^.\n]{0,160}(?:named|identified)[^.\n]{0,80}NYC Artist Coalition/i.test(
      `${intakeDoc}\n${projectDoc}`
    )
  ) {
    missing.push(
      "The February 27 testimony must not be represented as naming NYC Artist Coalition."
    );
  }
  const assertedInterpretation = `${intakeDoc}\n${projectDoc}`
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter(
      (sentence) =>
        !/do not|does not|not proof|not a claim|not authorship|not personal dependence|does not establish/i.test(
          sentence
        )
    )
    .join(" ");
  if (
    /(?:Finkelpearl|Espinal|the Council) (?:personally )?needed (?:Jamie|NYC Artist Coalition)|NYC Artist Coalition (?:authored|wrote) (?:the )?(?:Office of Nightlife|Cabaret Law repeal)|(?:coalition|testimony) caused (?:the )?(?:law|repeal|vote|enactment)/i.test(
      assertedInterpretation
    )
  ) {
    missing.push(
      "Institutional value must not become personal motive, bill authorship, or legislative causality."
    );
  }
  for (const marker of [
    "CLM-NYCARTC-DCLA-PUBLIC-ENGAGEMENT-VALUE-2017",
    "CLM-NYCARTC-GOVERNMENT-TRANSLATION-VALUE-2017",
    "CLM-NYCARTC-ESPINAL-POLICY-SEQUENCE-2017",
    "Institutional interpretation: NYC Artist Coalition made underrepresented cultural-space experience"
  ]) {
    if (publicSite.includes(marker)) {
      missing.push(`Reserve institutional-value claim silently appears on the public site: ${marker}`);
    }
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
    "separate Facebook audit distinguishes"
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
    "Fifty-one matching records identify Jamie as publisher",
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

export function evaluateWowlistFacebookPostArchive({
  census,
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

  const lines = census.trim().split(/\r?\n/).filter(Boolean);
  const headers = lines.shift()?.split(",") ?? [];
  const rows = lines.map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
  const count = (field, value) => rows.filter((row) => row[field] === value).length;
  const sum = (field) =>
    rows.reduce((total, row) => total + Number(row[field] ?? 0), 0);

  expect(headers.length === 11, "WOW List Facebook census must retain 11 public-safe columns.");
  expect(rows.length === 57, "WOW List Facebook census must contain 57 post records.");
  expect(
    new Set(rows.map((row) => row.post_id)).size === rows.length,
    "WOW List Facebook census post IDs must remain unique."
  );
  expect(count("record_type", "standalone-post") === 35, "WOW List Facebook census must contain 35 standalone posts.");
  expect(count("record_type", "reshared-story") === 22, "WOW List Facebook census must contain 22 reshared stories.");
  for (const [year, expected] of Object.entries({ "2015": 22, "2016": 27, "2017": 7, "2018": 1 })) {
    expect(
      rows.filter((row) => row.date?.startsWith(year)).length === expected,
      `WOW List Facebook ${year} count must remain ${expected}.`
    );
  }
  for (const [theme, expected] of Object.entries({
    "event-distribution": 11,
    "distributed-community-use": 12,
    "cultural-space-care": 19,
    "product-community-infrastructure": 6,
    "public-knowledge-and-storytelling": 1,
    "civic-routing": 8
  })) {
    expect(
      count("primary_theme", theme) === expected,
      `WOW List Facebook ${theme} count must recompute to ${expected}.`
    );
  }
  expect(sum("reactions") === 94, "WOW List Facebook reaction total must remain 94.");
  expect(sum("comments") === 16, "WOW List Facebook comment total must remain 16.");
  expect(sum("shares") === 49, "WOW List Facebook share total must remain 49.");
  expect(
    rows.filter((row) =>
      Number(row.reactions) + Number(row.comments) + Number(row.shares) > 0
    ).length === 47,
    "WOW List Facebook census must retain 47 records with a visible interaction."
  );
  const strongest = rows.find((row) => row.post_id === "439926419547504");
  expect(
    strongest?.reactions === "13" && strongest?.comments === "3" && strongest?.shares === "29",
    "WOW List Facebook nine-city record must retain the 13 reaction, three comment, 29 share signal."
  );
  expect(
    rows.every(
      (row) =>
        row.accounting_status === "recovered" &&
        row.public_detail_status === "metadata-only" &&
        /^https:\/\/www\.facebook\.com\/wowlist\/posts\//.test(row.source_url)
    ),
    "Every WOW List Facebook record must retain a public URL and metadata-only recovered disposition."
  );
  expect(
    !census.includes("publisher") &&
      !census.includes("full_text") &&
      !census.includes("commenter") &&
      !census.includes("session"),
    "Public WOW List Facebook census must not expose publisher rows, full text, commenters, or session data."
  );

  requireFragments("WOW List Facebook corpus model", corpusModel, [
    "ownerTimelineRecords: 57",
    "cursorPages: 19",
    "standalonePosts: 35",
    "resharedStories: 22",
    "postIdentitiesChecked: 57",
    "jamieBurkart: 51",
    "otherPublisher: 0",
    "unresolved: 6",
    "LEAD-WOWLIST-FACEBOOK-FULL-POPULATION-2026",
    "SRC-FB-WOWLIST-PUBLISHER-ATTRIBUTION-RUN-2026",
    "SRC-FB-WOWLIST-NINE-CITY-CALENDARS-2015",
    "SRC-FB-WOWLIST-LA-FORTY-ONE-EVENTS-2015",
    "SRC-FB-WOWLIST-PHXDIY-CONTINUITY-2018",
    "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
    "CLM-WOWLIST-FACEBOOK-PUBLISHING-ROLE",
    "six unavailable or redirected records remain unresolved",
    "Published by identifies the Page publisher",
    "shared project",
    "not every WOW List social channel"
  ]);
  requireFragments("WOW List Facebook framework integration", framework, [
    "wowlistFacebookPostIntake",
    "wowlistFacebookPostSources",
    "wowlistFacebookPostClaims",
    "wowlistFacebookPostInquiries",
    "wowlistFacebookPostPublicationDecisions",
    "INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026",
    "facebook-distributed-use",
    "facebook-publishing-role"
  ]);
  requireFragments("WOW List Facebook proof bank", proofs, [
    "member-led calendars in nine cities",
    "publisher on 51 matching records with six unresolved",
    "preserve Richard's shared-project credit",
    "Jamie published all 57 surviving Facebook records",
    "Jamie managed every WOW List social channel"
  ]);
  requireFragments("WOW List Facebook work metadata", workData, [
    "Distributed publishing operation",
    "57-record Facebook census",
    "six unresolved Facebook publisher records"
  ]);
  requireFragments("WOW List Facebook case study", wowlistCase, [
    "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
    "facebook-distributed-use",
    "CLM-WOWLIST-FACEBOOK-PUBLISHING-ROLE",
    "facebook-publishing-role",
    "separate Facebook audit distinguishes",
    "Neither corpus measures adoption or impact"
  ]);
  requireFragments("WOW List Facebook archival documentation", archiveDoc, [
    "57 unique WOW List Facebook records",
    "35 standalone posts and 22 reshared stories",
    "Jamie Burkart | 51",
    "Unavailable or redirected; unresolved | 6",
    "rather than inheriting attribution",
    "member-led city calendars",
    "41 upcoming DIY events",
    "Phoenix organizer",
    "Forty-seven of the 57 records",
    "not unique people",
    "Per-record publisher attribution and Page-management context remain protected"
  ]);
  requireFragments("WOW List Facebook anti-claims", antiClaims, [
    "Jamie published all 57 records",
    "authored every quoted or reshared word",
    "managed every WOW List social channel",
    "six unavailable or redirected records remain unresolved",
    "Preserve Richard's shared-project credit",
    "not necessarily the drafter or originator"
  ]);

  const publicBundle = [
    census,
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
    /cookie\s*:\s*[^\s]/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /__cft__/i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push(
      "Public WOW List Facebook bundle contains authentication, Page-session, or private-path material."
    );
  }

  return missing;
}

export function evaluateNycArtCFacebookPostArchive({
  census,
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

  const lines = census.trim().split(/\r?\n/).filter(Boolean);
  const headers = lines.shift()?.split(",") ?? [];
  const rows = lines.map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
  const count = (field, value) => rows.filter((row) => row[field] === value).length;
  const sum = (field) =>
    rows.reduce((total, row) => total + Number(row[field] ?? 0), 0);

  expect(headers.length === 11, "NYC Artist Coalition Facebook census must retain 11 public-safe columns.");
  expect(rows.length === 441, "NYC Artist Coalition Facebook census must contain 441 post records.");
  expect(
    new Set(rows.map((row) => row.record_id)).size === rows.length,
    "NYC Artist Coalition Facebook census record IDs must remain unique."
  );
  expect(
    rows.every((row, index) => Number(row.sequence_newest_to_oldest) === index + 1),
    "NYC Artist Coalition Facebook census sequence must remain complete from 1 through 441."
  );
  expect(
    Number(rows.at(-1)?.sequence_newest_to_oldest) === 441,
    "NYC Artist Coalition Facebook census sequence must remain complete through record 441."
  );
  for (const [form, expected] of Object.entries({
    "event-route": 148,
    "standalone-post": 136,
    "original-media-post": 78,
    "reshared-story": 53,
    "source-or-resource-route": 26
  })) {
    expect(
      count("record_form", form) === expected,
      `NYC Artist Coalition Facebook ${form} count must recompute to ${expected}.`
    );
  }
  for (const [theme, expected] of Object.entries({
    "nightlife-enforcement-and-governance": 157,
    "general-coalition-communication": 92,
    "commercial-rent-and-tenancy": 71,
    "cultural-space-care": 47,
    "public-meetings-and-participation": 25,
    "funding-and-operational-resources": 21,
    "event-and-cultural-distribution": 15,
    "press-and-public-knowledge": 11,
    "equity-solidarity-and-mutual-aid": 2
  })) {
    expect(
      count("primary_theme", theme) === expected,
      `NYC Artist Coalition Facebook ${theme} count must recompute to ${expected}.`
    );
  }
  expect(
    sum("outbound_url_count") === 64,
    "NYC Artist Coalition Facebook direct outbound-link occurrence total must remain 64."
  );
  expect(
    sum("reactions_observed_2026_07_14") === 2366,
    "NYC Artist Coalition Facebook reaction total must remain 2,366."
  );
  expect(
    sum("comments_observed_2026_07_14") === 212,
    "NYC Artist Coalition Facebook comment total must remain 212."
  );
  expect(
    sum("shares_observed_2026_07_14") === 611,
    "NYC Artist Coalition Facebook share total must remain 611."
  );
  expect(
    rows.filter(
      (row) =>
        Number(row.reactions_observed_2026_07_14) +
          Number(row.comments_observed_2026_07_14) +
          Number(row.shares_observed_2026_07_14) >
        0
    ).length === 386,
    "NYC Artist Coalition Facebook census must retain 386 records with a visible interaction."
  );
  expect(
    rows.filter((row) => row.public_locator?.includes("/photo/?fbid=")).length === 84,
    "NYC Artist Coalition Facebook census must retain 84 stable coalition-owned photo locators."
  );
  expect(
    rows.every(
      (row) =>
        /^nycac-fb-[a-f0-9]{16}$/.test(row.record_id) &&
        /^https:\/\/www\.facebook\.com\//.test(row.public_locator)
    ),
    "Every NYC Artist Coalition Facebook census row must retain an opaque record ID and public Facebook locator."
  );
  expect(
    !census.includes("publisher") &&
      !census.includes("full_text") &&
      !census.includes("commenter") &&
      !census.includes("asset_id") &&
      !census.includes("admin"),
    "Public NYC Artist Coalition Facebook census must not expose publisher rows, full text, commenters, asset IDs, or administration data."
  );

  requireFragments("NYC Artist Coalition Facebook corpus model", corpusModel, [
    "ownerTimelineRecords: 441",
    "startBoundary: \"2017-01-29\"",
    "endBoundary: \"2021-09-15\"",
    "terminalScrollsWithoutAddition: 40",
    "eventRoutes: 148",
    "sourceOrResourceRoutes: 26",
    "nycCouncilMembersAndCouncil: 86",
    "recordsWithVisibleInteraction: 386",
    "reactions: 2366",
    "comments: 212",
    "shares: 611",
    "status: \"unresolved\"",
    "individuallyAttributedRecords: 0",
    "equivalentToPublicTimeline: false",
    "LEAD-NYCAC-FACEBOOK-FULL-POPULATION-2026",
    "SRC-FB-NYCAC-MANAGED-CONTENT-CROSSCHECK-2026",
    "CLM-NYCAC-FACEBOOK-PUBLICATION-SYSTEM",
    "Jamie recalls being the predominant account operator",
    "individual publisher attribution remained unresolved",
    "not equivalent to all managed Page content"
  ]);
  requireFragments("NYC Artist Coalition Facebook framework integration", framework, [
    "nycartcFacebookPostIntake",
    "nycartcFacebookPostSources",
    "nycartcFacebookPostClaims",
    "nycartcFacebookPostInquiries",
    "nycartcFacebookPostPublicationDecisions",
    "INQ-NYCAC-FACEBOOK-POSTS-2026",
    "facebook-publication-system"
  ]);
  requireFragments("NYC Artist Coalition Facebook proof bank", proofs, [
    "441-record census of the surviving NYC Artist Coalition Facebook timeline",
    "did not expose individual publisher attribution",
    "Jamie published all 441 NYC Artist Coalition Facebook records"
  ]);
  requireFragments("NYC Artist Coalition Facebook work metadata", workData, [
    "Shared civic publication layer",
    "A 441-record census of the surviving coalition Facebook timeline",
    "individual Facebook publisher attribution remains unresolved"
  ]);
  requireFragments("NYC Artist Coalition Facebook case study", fairRentCase, [
    "CLM-NYCAC-FACEBOOK-PUBLICATION-SYSTEM",
    "facebook-publication-system",
    "predominant Page operator",
    "remains research context rather than a public claim"
  ]);
  requireFragments("NYC Artist Coalition Facebook archival documentation", archiveDoc, [
    "441 unique records",
    "100 percent of the surviving public owner-timeline population",
    "not an official Meta export",
    "Event route | 148",
    "NYC Council members or the Council | 86",
    "outgoing references and routes",
    "2,366",
    "not unique people",
    "predominant person who operated the Page",
    "not yet a public publisher-attribution claim",
    "later event-maintenance activity outside the 441-record public timeline"
  ]);
  requireFragments("NYC Artist Coalition Facebook anti-claims", antiClaims, [
    "complete managed-content population",
    "predominantly published them as a settled fact",
    "individual publisher attribution remains unresolved",
    "86 Council-member engagements",
    "2,366 reactions, 212 comments, and 611 shares",
    "post-level publisher data"
  ]);

  expect(
    !/Jamie (?:authored|published) all 441/.test(fairRentCase),
    "NYC Artist Coalition case study must not assign all 441 Facebook records to Jamie."
  );
  expect(
    !/(?:86|eighty-six) Council members engaged/i.test(fairRentCase),
    "NYC Artist Coalition case study must not convert Council references into Council-member engagement."
  );

  const publicBundle = [
    census,
    corpusModel,
    framework,
    proofs,
    workData,
    fairRentCase,
    archiveDoc,
    antiClaims
  ].join("\n");
  const privateMarkers = [
    /auth_token\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /__cft__/i,
    /asset_id\s*[:=]/i,
    /\/latest\/posts\/published_posts/i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push(
      "Public NYC Artist Coalition Facebook bundle contains authentication, Page-session, management-locator, or private-path material."
    );
  }

  return missing;
}

export function evaluateKcSpacesFundFacebookPostArchive({
  census,
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

  const lines = census.trim().split(/\r?\n/).filter(Boolean);
  const headers = lines.shift()?.split(",") ?? [];
  const rows = lines.map((line) => {
    const values = line.split(",");
    return Object.fromEntries(
      headers.map((header, index) => [header, values[index]])
    );
  });
  const count = (field, value) =>
    rows.filter((row) => row[field] === value).length;
  const sum = (field) =>
    rows.reduce((total, row) => total + Number(row[field] ?? 0), 0);

  expect(
    headers.length === 11,
    "KC Spaces Fund Facebook census must retain 11 public-safe columns."
  );
  expect(
    rows.length === 38,
    "KC Spaces Fund Facebook census must contain 38 post records."
  );
  expect(
    new Set(rows.map((row) => row.record_id)).size === rows.length,
    "KC Spaces Fund Facebook census record IDs must remain unique."
  );
  expect(
    rows.every(
      (row, index) => Number(row.sequence_newest_to_oldest) === index + 1
    ),
    "KC Spaces Fund Facebook census sequence must remain complete from 1 through 38."
  );
  expect(
    Number(rows.at(-1)?.sequence_newest_to_oldest) === 38,
    "KC Spaces Fund Facebook census sequence must remain complete through record 38."
  );
  for (const [form, expected] of Object.entries({
    "original-media-post": 20,
    "status-update-remnant": 11,
    "unavailable-attachment-remnant": 5,
    "video-or-gif-route": 2
  })) {
    expect(
      count("record_form", form) === expected,
      `KC Spaces Fund Facebook ${form} count must recompute to ${expected}.`
    );
  }
  for (const [theme, expected] of Object.entries({
    "interface-remnant": 19,
    "grantee-recognition": 10,
    "application-scope-and-eligibility": 5,
    "application-deadline": 2,
    "campaign-launch-and-action": 1,
    "mutual-aid-fundraising": 1
  })) {
    expect(
      count("primary_theme", theme) === expected,
      `KC Spaces Fund Facebook ${theme} count must recompute to ${expected}.`
    );
  }
  expect(
    count("readable_campaign_message", "true") === 19,
    "KC Spaces Fund Facebook census must retain 19 readable campaign messages."
  );
  expect(
    count("grantee_recognition", "true") === 10,
    "KC Spaces Fund Facebook census must retain ten grantee-recognition records."
  );
  expect(
    sum("destination_family_count") === 22,
    "KC Spaces Fund Facebook destination-family occurrences must recompute to 22."
  );
  expect(
    sum("stakeholder_group_count") === 33,
    "KC Spaces Fund Facebook stakeholder-reference occurrences must recompute to 33."
  );
  expect(
    sum("reactions_observed_2026_07_14") === 119,
    "KC Spaces Fund Facebook reaction floor must remain 119."
  );
  expect(
    rows.filter(
      (row) => Number(row.reactions_observed_2026_07_14) > 0
    ).length === 28,
    "KC Spaces Fund Facebook census must retain 28 records with a visible reaction."
  );
  expect(
    rows.filter((row) => row.public_locator?.includes("/photo/?fbid=")).length ===
      20,
    "KC Spaces Fund Facebook census must retain 20 stable photo locators."
  );
  expect(
    rows.every(
      (row) =>
        /^kcspaces-fb-[a-f0-9]{16}$/.test(row.record_id) &&
        /^https:\/\/www\.facebook\.com\//.test(row.public_locator)
    ),
    "Every KC Spaces Fund Facebook census row must retain an opaque record ID and public Facebook locator."
  );
  expect(
    count("record_status", "recovered-readable") === 19 &&
      count("record_status", "recovered-interface-remnant") === 14 &&
      count("record_status", "recovered-unavailable-remnant") === 5,
    "KC Spaces Fund Facebook record-status dispositions must reconcile all readable and remnant records."
  );
  expect(
    !census.includes("publisher") &&
      !census.includes("full_text") &&
      !census.includes("commenter") &&
      !census.includes("contact") &&
      !census.includes("admin"),
    "Public KC Spaces Fund Facebook census must not expose publisher rows, full text, commenters, contact details, or administration data."
  );

  requireFragments("KC Spaces Fund Facebook corpus model", corpusModel, [
    "ownerTimelineRecords: 38",
    "startBoundary: \"2020-04-07\"",
    "endBoundary: \"2020-07-09\"",
    "terminalScrollsWithoutAddition: 40",
    "originalMediaPosts: 20",
    "statusUpdateRemnants: 11",
    "readableCampaignMessages: 19",
    "granteeRecognitionRecords: 10",
    "campaignSite: 17",
    "sourceArticlesRecovered: 0",
    "recordsWithVisibleReactions: 28",
    "visibleReactionFloor: 119",
    "jamieAccountPostingRole: \"not-claimed\"",
    "CLM-KCSPACESFUND-DIGITAL-IDENTITY-SUPPORT",
    "Jamie was not the stakeholder or owner posting on the Facebook account",
    "not an official Meta export"
  ]);
  requireFragments("KC Spaces Fund Facebook framework integration", framework, [
    "kcSpacesFundFacebookIntake",
    "kcSpacesFundFacebookSources",
    "kcSpacesFundFacebookClaims",
    "kcSpacesFundFacebookInquiries",
    "kcSpacesFundFacebookPublicationDecisions",
    "kcSpacesFundFacebookProofCoverage",
    "id: \"kc-spaces-fund\"",
    "INQ-KCSPACESFUND-FACEBOOK-POSTS-2026"
  ]);
  requireFragments("KC Spaces Fund proof bank", proofs, [
    "cross-channel identity work",
    "38-record census of the surviving Facebook Page timeline",
    "not the stakeholder or owner posting on its Facebook account",
    "Jamie alone named KC Spaces Fund",
    "Jamie managed or posted from the KC Spaces Fund Facebook account"
  ]);
  requireFragments("KC Spaces Fund technical-operations projection", technicalOperations, [
    "collaborator-led 2020 mutual-aid campaign",
    "available cross-channel project name",
    "behind-the-scenes digital operations"
  ]);
  requireFragments("KC Spaces Fund archival documentation", archiveDoc, [
    "38 unique records",
    "100 percent of the surviving public Page timeline",
    "not an official Meta export",
    "Original-media post | 20",
    "ten grantee-recognition posts",
    "Campaign site | 17",
    "No source-article route was recovered",
    "119 reactions",
    "not 119 unique people",
    "not the stakeholder or owner posting on this account",
    "available consistently across social and domain surfaces"
  ]);
  requireFragments("KC Spaces Fund anti-claims", antiClaims, [
    "alone named KC Spaces Fund",
    "managed, authored, or published the KC Spaces Fund Facebook Page",
    "official Meta export",
    "119 visible reactions",
    "Outgoing tags and references are not inbound engagement"
  ]);

  expect(
    !/Jamie (?:managed|authored|published) (?:the|all).*KC Spaces Fund Facebook/i.test(
      technicalOperations
    ),
    "KC Spaces Fund site projection must not assign Page management or post authorship to Jamie."
  );
  expect(
    !/(?:119|one hundred nineteen) (?:people|stakeholders) (?:reached|endorsed)/i.test(
      technicalOperations
    ),
    "KC Spaces Fund site projection must not convert reactions into people, endorsement, or reach."
  );

  const publicBundle = [
    census,
    corpusModel,
    framework,
    proofs,
    technicalOperations,
    archiveDoc,
    antiClaims
  ].join("\n");
  const privateMarkers = [
    /auth_token\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /__cft__/i,
    /asset_id\s*[:=]/i,
    /contact@kcspacesfund/i,
    /816[- )]785[- ]5131/i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push(
      "Public KC Spaces Fund Facebook bundle contains authentication, Page-session, contact, management-locator, or private-path material."
    );
  }

  return missing;
}

export function evaluateJamieFacebookPostArchive({
  census,
  corpusModel,
  framework,
  archiveDoc,
  antiClaims,
  participatoryDoc
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

  const lines = census.trim().split(/\r?\n/).filter(Boolean);
  const headers = lines.shift()?.split(",") ?? [];
  const rows = lines.map((line) => line.split(","));
  const count = (index) => {
    const values = new Map();
    for (const row of rows) {
      values.set(row[index], (values.get(row[index]) ?? 0) + 1);
    }
    return values;
  };
  const matches = (actual, expected) =>
    actual.size === Object.keys(expected).length &&
    Object.entries(expected).every(([key, value]) => actual.get(key) === value);

  expect(
    headers.join(",") ===
      "ledger_id,year,record_type,primary_theme,professional_relevance,accounting_status,public_detail_status",
    "Jamie Facebook post census must retain seven aggregate-only columns."
  );
  expect(
    rows.length === 1243,
    "Jamie Facebook post census must contain 1,243 unique record dispositions."
  );
  expect(
    rows.every((row) => row.length === 7),
    "Every Jamie Facebook post census row must retain exactly seven columns."
  );
  expect(
    new Set(rows.map((row) => row[0])).size === rows.length,
    "Jamie Facebook post census ledger IDs must remain unique."
  );
  expect(
    rows.every(
      (row, index) =>
        row[0] === `recovered-${String(index + 1).padStart(4, "0")}` &&
        row[5] === "recovered" &&
        row[6] === "aggregate-only"
    ),
    "Jamie Facebook post census sequence and aggregate-only dispositions must remain complete."
  );
  expect(
    rows.at(-1)?.[0] === "recovered-1243",
    "Jamie Facebook post census sequence must terminate at recovered-1243."
  );
  expect(
    matches(count(1), {
      2006: 2,
      2007: 5,
      2008: 4,
      2009: 218,
      2010: 82,
      2011: 88,
      2012: 153,
      2013: 184,
      2014: 109,
      2015: 68,
      2016: 122,
      2017: 118,
      2018: 27,
      2019: 42,
      2020: 19,
      2022: 2
    }),
    "Jamie Facebook post year counts must recompute across all 1,243 records."
  );
  expect(
    matches(count(2), {
      event: 58,
      "external-link": 55,
      "media-or-text-unavailable": 159,
      photo: 221,
      "photo-album": 135,
      "shared-story": 244,
      text: 335,
      video: 36
    }),
    "Jamie Facebook post form counts must recompute across all 1,243 records."
  );
  expect(
    matches(count(3), {
      "care-memory-and-relationships": 45,
      "civic-and-public-interest-work": 78,
      "community-and-hospitality": 97,
      "culture-art-and-performance": 134,
      "everyday-life-and-observation": 620,
      "media-only-or-text-unavailable": 235,
      "small-business-and-commerce": 1,
      "technical-and-digital-practice": 12,
      "waterways-place-and-ecology": 21
    }),
    "Jamie Facebook post theme counts must recompute across all 1,243 records."
  );
  expect(
    matches(count(4), {
      contextual: 1021,
      "practice-related": 64,
      "project-specific": 158
    }),
    "Jamie Facebook post relevance counts must recompute across all 1,243 records."
  );
  expect(
    !/story_id|post_id|status_id|source_url|facebook\.com|exact_date|post_text|full_text|privacy|interaction|comment|email|phone|address|protected_locator/i.test(
      census
    ),
    "Jamie Facebook post census must not expose identifiers, URLs, text, privacy, interactions, contacts, or protected locators."
  );

  requireFragments("Jamie Facebook post corpus model", corpusModel, [
    "cursorPages: 621",
    "returnedNodes: 3728",
    "uniqueRecords: 1243",
    "recordsAppearingThreeTimes: 1242",
    "readableMessages: 998",
    "mediaLedOrUnavailable: 245",
    "projectSpecific: 158",
    "practiceRelated: 64",
    "recordsWithExternalUrls: 430",
    "urlOccurrences: 718",
    "uniqueUrls: 564",
    "uniqueDomains: 195",
    "uniqueMissionRelevantUrls: 176",
    'interactionMetrics: "not-recovered"',
    'stakeholderIdentityCensus: "not-recovered"',
    "SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009",
    "CLM-JAMIE-FACEBOOK-ENGAGEMENT-NOT-RECOVERED-2026",
    'decision: "reserve"',
    'decision: "hold"'
  ]);
  requireFragments("Jamie Facebook framework integration", framework, [
    "jamieFacebookPostIntake",
    "jamieFacebookPostSources",
    "jamieFacebookPostClaims",
    "jamieFacebookPostInquiries",
    "jamieFacebookPostPublicationDecisions",
    'id: "jamie-facebook-archive"',
    "SRC-GREAT-ACCOMMODATIONS-ARTTATTLER-2009",
    "independent exhibition review",
    "Missouri and Mississippi journey"
  ]);
  requireFragments("Jamie Facebook archival documentation", archiveDoc, [
    "100 percent of the surviving records",
    "621 cursor pages",
    "3,728 returned nodes",
    "1,243 unique stable story records",
    "1,242 unique records appeared three times",
    "430 records carried at least one external URL",
    "718 external-URL occurrences",
    "564 unique URLs across 195 domains",
    "176 unique URLs across 74 domains",
    "Blair Schulman's 2009 ArtTattler review",
    "outgoing references, not a census of inbound stakeholder engagement",
    "absent metrics must not be described as zero",
    "no public Facebook archive route"
  ]);
  requireFragments("Jamie Facebook anti-claims", antiClaims, [
    "every Facebook post Jamie ever created",
    "3,728 returned nodes into 3,728 unique posts",
    "Do not describe absent reaction, comment, or share metrics as zero",
    "posted links, tags, actor names, organizations, or stakeholder references",
    "Frequency is an archive-navigation aid"
  ]);
  requireFragments("Participatory programs source integration", participatoryDoc, [
    "Blair Schulman's independent ArtTattler review",
    "river as connective social infrastructure",
    "trust, mutual help, and public participation"
  ]);

  expect(
    !/(?:zero|0) (?:reactions|comments|shares|engagement)/i.test(archiveDoc),
    "Jamie Facebook archive must not convert omitted interaction fields into zero engagement."
  );
  expect(
    !/(?:referenced|tagged|linked) stakeholders? (?:engaged|endorsed|partnered)/i.test(
      archiveDoc
    ),
    "Jamie Facebook archive must not convert outgoing references into inbound stakeholder engagement."
  );

  const publicBundle = [census, corpusModel, framework, archiveDoc, antiClaims].join(
    "\n"
  );
  const privateMarkers = [
    /auth_token\s*[:=]/i,
    /cookie\s*:\s*[^\s]/i,
    /session[_-]?id\s*[:=]\s*[^\s]+/i,
    /__cft__/i,
    /asset_id\s*[:=]/i,
    /\/Users\//,
    /\/Volumes\//
  ];
  if (privateMarkers.some((pattern) => pattern.test(publicBundle))) {
    missing.push(
      "Public Jamie Facebook archive bundle contains authentication, session, management-locator, or private-path material."
    );
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

export function evaluateWowlistDatabaseScale({
  ledger,
  evidenceBatch,
  archiveDoc,
  projectDoc,
  framework,
  proofs,
  sourceCoverage,
  approvalRegister,
  antiClaims
}) {
  const missing = [];
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };
  const requireFragments = (surface, content, fragments) => {
    const normalized = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalized.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  let parsed;
  try {
    parsed = JSON.parse(ledger);
  } catch {
    missing.push("WOW List database aggregate ledger is not valid JSON.");
    return missing;
  }

  const counts = parsed.recordCounts ?? {};
  const geography = parsed.geographicActivity ?? {};
  const thresholds = geography.labelsAtOrAboveThreshold ?? {};
  expect(parsed.snapshot?.createdAt === "2017-07-22T08:00:01-04:00", "WOW List database snapshot date must remain July 22, 2017.");
  expect(parsed.snapshot?.postCreationRange?.first === "2012-11-26", "WOW List first post date must remain November 26, 2012.");
  expect(parsed.snapshot?.postCreationRange?.last === "2017-07-21", "WOW List last post date must remain July 21, 2017.");
  expect(counts.users === 1846, "WOW List user-record count must remain 1,846.");
  expect(counts.postsOrEvents === 16142, "WOW List post/event count must remain 16,142.");
  expect(counts.tagsOrLists === 23864, "WOW List tag/list count must remain 23,864.");
  expect(counts.tagFollows === 28837, "WOW List tag-follow count must remain 28,837.");
  expect(counts.stars === 20927, "WOW List star count must remain 20,927.");
  expect(counts.googleCalendarEvents === 15915, "WOW List Google Calendar event count must remain 15,915.");
  expect(parsed.primaryKeyQuality?.duplicatePrimaryKeys === 0, "WOW List checked tables must retain zero duplicate primary keys.");
  expect(
    geography.postsWithNonblankCityOrRegion + geography.postsWithBlankOrUnusableCityOrRegion === counts.postsOrEvents,
    "WOW List geographic dispositions must reconcile to all 16,142 posts or events."
  );
  expect(geography.postsWithMissingGeolocationReference === 0, "WOW List posts must retain zero missing geolocation references.");
  expect(thresholds["1"] === 709 && thresholds["5"] === 133 && thresholds["10"] === 79 && thresholds["25"] === 48 && thresholds["50"] === 35, "WOW List city/region thresholds must remain 709, 133, 79, 48, and 35.");
  expect(thresholds["1"] >= thresholds["5"] && thresholds["5"] >= thresholds["10"] && thresholds["10"] >= thresholds["25"] && thresholds["25"] >= thresholds["50"], "WOW List city/region thresholds must remain monotonic.");

  requireFragments("WOW List evidence batch", evidenceBatch, [
    "LEAD-WOWLIST-DATABASE-SCALE-2026",
    "SRC-WOWLIST-DATABASE-AGGREGATE-RUN-2017-2026",
    "CLM-WOWLIST-DATABASE-SCALE-2017",
    "PUB-WOWLIST-DATABASE-SCALE-2017",
    'visibility: "protected"',
    "protectedLocatorId",
    "35 nonblank city or region labels",
    "not official chapters",
    "not establish current platform status",
    "Preserve Richard's shared-project credit"
  ]);
  requireFragments("WOW List database archive note", archiveDoc, [
    "1,846 users",
    "16,142 posts or events",
    "35 nonblank city or region labels",
    "at least 50 geocoded posts or events",
    "not a current-platform or official-chapter claim",
    "contains no raw rows"
  ]);
  requireFragments("WOW List project note", projectDoc, [
    "protected July 22, 2017 database snapshot",
    "50 geocoded posts or events",
    "official chapters",
    "unique active users"
  ]);
  requireFragments("Knowledge-bank framework", framework, [
    "proofDebtEvidenceIntake",
    "proofDebtEvidenceSources",
    "proofDebtEvidenceClaims",
    "proofDebtEvidencePublicationDecisions",
    "SRC-WOWLIST-DATABASE-AGGREGATE-RUN-2017-2026",
    "CLM-WOWLIST-DATABASE-SCALE-2017"
  ]);
  requireFragments("WOW List public proof", proofs, [
    "deterministic public-safe aggregate run",
    "city or region labels with at least 50 geocoded posts or events",
    "All 1,846 records were unique active users"
  ]);
  requireFragments("Source coverage", sourceCoverage, [
    "Quantified Proof And Formation Pass",
    "1,846 users and 16,142 posts or events",
    "50-post/event threshold"
  ]);
  requireFragments("Approval register", approvalRegister, [
    "historical 1,800+ user and 16,000+ post/event floors",
    "Never publish raw database rows"
  ]);
  requireFragments("WOW List anti-claims", antiClaims, [
    "WOW List Database",
    "official chapters",
    "unique active users",
    "precise-location rows"
  ]);

  const forbiddenLedgerKeys = ["rawRows", "users", "emails", "passwordHashes", "eventText", "latitude", "longitude"];
  for (const key of forbiddenLedgerKeys) {
    if (Object.prototype.hasOwnProperty.call(parsed, key)) {
      missing.push(`WOW List public aggregate ledger must not expose top-level ${key}.`);
    }
  }
  const publicBundle = [ledger, evidenceBatch, archiveDoc, projectDoc, framework, proofs, sourceCoverage, approvalRegister, antiClaims].join("\n");
  if ([/\/Users\//, /\/Volumes\//, /password\s*[:=]\s*[^\s]+/i, /auth_token\s*[:=]/i].some((pattern) => pattern.test(publicBundle))) {
    missing.push("WOW List public aggregate bundle contains a private path, credential, or authentication marker.");
  }

  return missing;
}

export function evaluateSundayDinnerAttendanceArchive({
  ledger,
  evidenceBatch,
  archiveDoc,
  projectDoc,
  framework,
  proofs,
  sourceCoverage,
  approvalRegister,
  antiClaims
}) {
  const missing = [];
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };
  const requireFragments = (surface, content, fragments) => {
    const normalized = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalized.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  let parsed;
  try {
    parsed = JSON.parse(ledger);
  } catch {
    missing.push("Sunday Dinner attendance aggregate ledger is not valid JSON.");
    return missing;
  }

  const events = parsed.eventColumns ?? {};
  expect(parsed.workbook?.worksheets === 15, "Sunday Dinner worksheet count must remain 15.");
  expect(parsed.workbook?.mainWorksheetRows === 711, "Sunday Dinner main worksheet row count must remain 711.");
  expect(parsed.workbook?.mainWorksheetColumns === 393, "Sunday Dinner main worksheet column count must remain 393.");
  expect(parsed.workbook?.formulaCells === 11414, "Sunday Dinner formula-cell count must remain 11,414.");
  expect(events.count === 345, "Sunday Dinner event-column count must remain 345.");
  expect(events.positiveCachedYesCountColumns === 340, "Sunday Dinner positive cached yes-count columns must remain 340.");
  expect(events.zeroCachedYesCountColumns === 5, "Sunday Dinner zero cached yes-count columns must remain five.");
  expect(events.positiveCachedYesCountColumns + events.zeroCachedYesCountColumns === events.count, "Sunday Dinner cached yes-count dispositions must reconcile to 345 event columns.");
  expect(events.first === "001 Africa (1.22.2012)", "Sunday Dinner first event label must remain bounded to January 2012.");
  expect(events.last === "345 Persimmons (Livestream) 3/7/2021", "Sunday Dinner last event label must retain the March 2021 livestream boundary.");
  expect(JSON.stringify(parsed.numberingQuality?.duplicatePrefixes) === JSON.stringify([263, 264, 267, 268]), "Sunday Dinner duplicate event prefixes must remain explicit.");
  expect(JSON.stringify(parsed.numberingQuality?.missingPrefixes) === JSON.stringify([233, 279, 288, 292, 300]), "Sunday Dinner missing event prefixes must remain explicit.");

  requireFragments("Sunday Dinner evidence batch", evidenceBatch, [
    "LEAD-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2026",
    "SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021",
    "CLM-SUNDAY-DINNER-300-GATHERING-ARCHIVE-2012-2021",
    "PUB-SUNDAY-DINNER-300-GATHERING-ARCHIVE-2012-2021",
    'visibility: "protected"',
    "345 event-specific columns",
    "340 event columns with a positive cached yes count",
    "not sum cached yes counts",
    "does not verify the separate 20-plus resident-artist aggregate"
  ]);
  requireFragments("Sunday Dinner archive note", archiveDoc, [
    "300+ gatherings",
    "345 event-specific columns",
    "340 have a positive cached yes count",
    "numbering irregularities",
    "cannot be summed into unique attendees",
    "20-plus resident-artist aggregate",
    "no raw workbook row"
  ]);
  requireFragments("Sunday Dinner project note", projectDoc, [
    "directly verifies the 300-plus gathering floor",
    "numbering irregularities and livestream entries",
    "unique attendees, people, meals, or RSVPs"
  ]);
  requireFragments("Knowledge-bank framework", framework, [
    "SRC-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2012-2021",
    "CLM-SUNDAY-DINNER-300-GATHERING-ARCHIVE-2012-2021",
    "The separate 20-plus resident-artist methodology remains open"
  ]);
  requireFragments("Sunday Dinner public proof", proofs, [
    "345 event-specific columns",
    "never sum cached yes counts into attendees, people, meals, or RSVPs",
    "Exactly 345 unique in-person dinners"
  ]);
  requireFragments("Source coverage", sourceCoverage, [
    "300-plus gathering lane is now protected-source-backed",
    "No cached count becomes a unique-attendee claim"
  ]);
  requireFragments("Approval register", approvalRegister, [
    "protected workbook supports 300+ documented gatherings",
    "Do not convert event columns or cached yes counts"
  ]);
  requireFragments("Sunday Dinner anti-claims", antiClaims, [
    "protected workbook",
    "345 event columns",
    "unique people, meals, attendees, or RSVPs",
    "20-plus resident aggregate"
  ]);

  const forbiddenKeys = ["participantRows", "participants", "names", "emails", "phoneNumbers", "cachedYesTotal", "cachedInviteTotal", "attendanceRows"];
  for (const key of forbiddenKeys) {
    if (Object.prototype.hasOwnProperty.call(parsed, key)) {
      missing.push(`Sunday Dinner public aggregate ledger must not expose top-level ${key}.`);
    }
  }
  const sensitiveBundle = [ledger, evidenceBatch, archiveDoc, projectDoc, sourceCoverage, antiClaims].join("\n");
  if ([/\/Users\//, /\/Volumes\//, /docs\.google\.com\/spreadsheets\/d\//, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, /(?:\+?1[\s.-]?)?\(?[2-9]\d{2}\)?[\s.-]\d{3}[\s.-]\d{4}/].some((pattern) => pattern.test(sensitiveBundle))) {
    missing.push("Sunday Dinner public aggregate bundle contains a private path, workbook locator, email, or phone number.");
  }

  return missing;
}

export function evaluateCallscriptNycArtCFormation({
  ledger,
  evidenceBatch,
  archiveDoc,
  projectDoc,
  framework,
  proofs,
  sourceCoverage,
  approvalRegister,
  antiClaims,
  publicSite
}) {
  const missing = [];
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };
  const requireFragments = (surface, content, fragments) => {
    const normalized = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalized.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  let parsed;
  try {
    parsed = JSON.parse(ledger);
  } catch {
    missing.push("Call Script formation ledger is not valid JSON.");
    return missing;
  }

  const sequence = parsed.sequence ?? [];
  expect(sequence.length === 5, "Call Script formation ledger must retain five bounded sequence records.");
  expect(new Set(sequence.map((item) => item.date)).size === 5, "Call Script formation sequence dates must remain distinct.");
  expect(sequence[0]?.date === "2016-11-14" && sequence[0]?.surface === "@wowlist", "Call Script lineage must begin with the November 2016 @wowlist popular.vote route.");
  expect(sequence.some((item) => item.surface === "Call Script Facebook Page" && item.finding.includes("popular.vote")), "Call Script Page must retain its direct popular.vote link.");
  expect(sequence.some((item) => item.date === "2017-01-27" && item.finding.includes("445 people responded") && item.boundary.includes("not attendance")), "The DCLA event must retain the 445-response signal and attendance boundary.");
  expect(sequence.some((item) => item.date === "2017-02-03" && item.finding.includes("help choose the work")), "The event discussion must retain the open priority-setting invitation.");
  expect(sequence.some((item) => item.date === "2017-02-06" && item.finding.includes("coalition general meeting")), "The sequence must retain the February 6 coalition general meeting.");
  expect(sequence.every((item) => /^https:\/\/(?:www\.facebook\.com|x\.com)\//.test(item.record)), "Every Call Script formation record must use a canonical public Facebook or X URL.");

  requireFragments("Call Script evidence batch", evidenceBatch, [
    "LEAD-CALLSCRIPT-NYCARTC-FORMATION-LINEAGE-2026",
    "SRC-X-WOWLIST-POPULAR-VOTE-2016",
    "SRC-FB-CALLSCRIPT-PAGE-2026",
    "SRC-FB-NYCAC-DCLA-FORMATION-DISCUSSION-2017",
    "SRC-JAMIE-CALLSCRIPT-PARTICIPATION-LINEAGE-2026",
    "CLM-NYCARTC-CALLSCRIPT-FORMATION-LINEAGE-2016-2017",
    "PUB-NYCARTC-CALLSCRIPT-FORMATION-LINEAGE-2016-2017",
    'decision: "reserve"',
    "not sole-founder status",
    "remain distinct projects and collective contexts"
  ]);
  requireFragments("Call Script formation archive note", archiveDoc, [
    "November 14, 2016",
    "links directly to `popular.vote`",
    "January 27, 2017 DCLA meeting",
    "February 6 NYC Artist Coalition general meeting",
    "help choose what the coalition should work on",
    "not a complete founding record",
    "response total is not physical attendance"
  ]);
  requireFragments("NYC Artist Coalition project note", projectDoc, [
    "Formation lineage",
    "carrying participation-system lessons from WOW List",
    "not a complete founding record",
    "Facebook response totals remain mutable event-level signals"
  ]);
  requireFragments("Knowledge-bank framework", framework, [
    "SRC-X-WOWLIST-POPULAR-VOTE-2016",
    "SRC-FB-CALLSCRIPT-PAGE-2026",
    "SRC-FB-NYCAC-DCLA-FORMATION-DISCUSSION-2017",
    "CLM-NYCARTC-CALLSCRIPT-FORMATION-LINEAGE-2016-2017",
    "complete founding group and independently corroborated co-founder wording remain open"
  ]);
  requireFragments("NYC Artist Coalition public proof", proofs, [
    "source-backed formation sequence",
    "Call Script's popular.vote route",
    "campaign accomplishments remain collective"
  ]);
  requireFragments("Source coverage", sourceCoverage, [
    "dated public formation sequence",
    "complete founding group",
    "exact co-founder wording open"
  ]);
  requireFragments("Approval register", approvalRegister, [
    "Call Script / NYC Artist Coalition formation",
    "complete founding record",
    "assign shared-account posts to Jamie"
  ]);
  requireFragments("NYC Artist Coalition anti-claims", antiClaims, [
    "Jamie alone founded NYC Artist Coalition",
    "Call Script created the coalition",
    "complete founding record",
    "Facebook responses are not attendance"
  ]);

  const forbiddenKeys = ["participantNames", "comments", "profiles", "inviteContext", "friendContext", "authState", "cookies"];
  for (const key of forbiddenKeys) {
    if (Object.prototype.hasOwnProperty.call(parsed, key)) {
      missing.push(`Call Script public formation ledger must not expose top-level ${key}.`);
    }
  }
  const publicBundle = [ledger, evidenceBatch, archiveDoc, projectDoc, framework, proofs, sourceCoverage, approvalRegister, antiClaims].join("\n");
  if ([/\/Users\//, /\/Volumes\//, /auth_token\s*[:=]/i, /cookie\s*:\s*[^\s]/i, /session[_-]?id\s*[:=]/i].some((pattern) => pattern.test(publicBundle))) {
    missing.push("Call Script public formation bundle contains authentication, session, or private-path material.");
  }
  expect(
    !publicSite.includes("CLM-NYCARTC-CALLSCRIPT-FORMATION-LINEAGE-2016-2017") &&
      !publicSite.includes("carried an event-participation practice from WOW List and popular.vote"),
    "Reserve Call Script formation copy must not silently appear on the public site."
  );

  return missing;
}

export const PORTFOLIO_BLIND_SPOT_SPECS = [
  {
    id: "target-role-specificity",
    label: "Target-role specificity is tested against real opportunities",
    weight: 16,
    manualGateId: "five-real-role-fit-review",
    protocolFragments: [
      "five dated, real job descriptions",
      "Archetypes do not count as market evidence",
      "role vocabulary, must-have responsibilities, proof match, proof gap, and next action"
    ]
  },
  {
    id: "independent-comprehension-holdout",
    label: "Independent holdouts test comprehension without author briefing",
    weight: 16,
    manualGateId: "independent-hiring-holdout",
    protocolFragments: [
      "at least three unfamiliar reviewers",
      "only the public site",
      "Agents or people who authored the evaluated material are not independent holdouts"
    ]
  },
  {
    id: "individual-contribution-provenance",
    label: "Individual contribution provenance remains distinct from project existence",
    weight: 18,
    manualGateId: "collaborator-contribution-confirmation",
    protocolFragments: [
      "project existed",
      "Jamie did",
      "collaborator confirmation",
      "Do not inherit individual credit from a collective project's success"
    ]
  },
  {
    id: "outcome-chain-evidence",
    label: "Outputs, observed outcomes, and causality boundaries remain separate",
    weight: 18,
    manualGateId: "outcome-chain-review",
    protocolFragments: [
      "output, observed outcome, attribution boundary, and open outcome question",
      "Sequence is not causality",
      "Do not convert use, response, allocation, or enactment into Jamie's sole impact"
    ]
  },
  {
    id: "technical-implementation-depth",
    label: "Technical claims point to inspectable implementation evidence",
    weight: 18,
    manualGateId: "technical-evidence-review",
    protocolFragments: [
      "architecture, implementation decision, operating constraint, failure recovery, and inspectable artifact",
      "A source list is not an implementation account",
      "current tools and methods"
    ]
  },
  {
    id: "collaboration-role-mapping",
    label: "Collaboration maps preserve shared credit and Jamie's bounded role",
    weight: 18,
    manualGateId: "collaborator-role-map-review",
    protocolFragments: [
      "who contributed what",
      "what Jamie was trusted to carry",
      "permission to publish names or quotations",
      "Do not make Jamie legible by making collaborators disappear"
    ]
  },
  {
    id: "visual-proof-readiness",
    label: "Visual proof requires evidence, rights, consent, and caption readiness",
    weight: 16,
    manualGateId: "visual-proof-rights-review",
    protocolFragments: [
      "candidate, evidence value, rights, consent, and caption status",
      "No image becomes ready merely because it is visually strong",
      "one unmistakable visual proof package"
    ]
  },
  {
    id: "longitudinal-thesis-boundary",
    label: "The longitudinal practice thesis remains useful without flattening projects",
    weight: 16,
    manualGateId: "longitudinal-thesis-editorial-review",
    protocolFragments: [
      "remains on hold",
      "audience need",
      "cross-project corroboration",
      "Do not flatten distinct projects, collaborators, places, or communities"
    ]
  },
  {
    id: "application-execution-cadence",
    label: "Archive work has a stopping rule that returns effort to applications",
    weight: 16,
    manualGateId: "application-cadence-review",
    protocolFragments: [
      "90-minute research and composition timebox",
      "application, outreach, or conversation",
      "Archive volume is not a job-search outcome"
    ]
  },
  {
    id: "agency-without-inflation",
    label: "Agency language is direct without erasing collective boundaries",
    weight: 16,
    manualGateId: "agency-language-review",
    protocolFragments: [
      "initiated, designed, built, coordinated, maintained, produced, and made possible",
      "direct verb",
      "Do not repair understatement by weakening collective-credit or causality boundaries"
    ]
  },
  {
    id: "integration-governance",
    label: "Branch-local readiness remains distinct from merged and deployed reality",
    weight: 16,
    manualGateId: "branch-pr-production-integration-review",
    protocolFragments: [
      "branch-local 100/100",
      "pull-request owner and supersession decision",
      "exact candidate SHA",
      "Do not call an unmerged branch production-ready"
    ]
  }
];

export function evaluatePortfolioBlindSpot({
  id,
  register,
  protocol,
  registerDoc,
  launchBlockers,
  sourceCoverage,
  projectionMap,
  technicalOperations
}) {
  const missing = [];
  const spec = PORTFOLIO_BLIND_SPOT_SPECS.find((item) => item.id === id);
  if (!spec) return [`Unknown portfolio blind-spot eval: ${id}`];
  const expect = (condition, message) => {
    if (!condition) missing.push(message);
  };
  const requireFragments = (surface, content, fragments) => {
    const normalized = content.replace(/\s+/g, " ");
    for (const fragment of fragments) {
      if (!normalized.includes(fragment.replace(/\s+/g, " "))) {
        missing.push(`${surface} is missing: ${fragment}`);
      }
    }
  };

  let parsed;
  try {
    parsed = JSON.parse(register);
  } catch {
    return [`Portfolio blind-spot register is not valid JSON for ${id}.`];
  }

  const entries = parsed.blindSpots ?? [];
  const entry = entries.find((item) => item.id === id);
  expect(parsed.schemaVersion === 1, "Portfolio blind-spot register schemaVersion must remain one.");
  expect(parsed.scope?.blindSpotCount === PORTFOLIO_BLIND_SPOT_SPECS.length, "Portfolio blind-spot register count must match every eval.");
  expect(entries.length === PORTFOLIO_BLIND_SPOT_SPECS.length, "Portfolio blind-spot register must retain all eleven entries.");
  expect(new Set(entries.map((item) => item.id)).size === entries.length, "Portfolio blind-spot register IDs must remain unique.");
  if (!entry) return [...missing, `Portfolio blind-spot register is missing ${id}.`];

  expect(entry.label === spec.label, `${id} label must match the executable criterion.`);
  expect(entry.weight === spec.weight, `${id} weight must match the executable criterion.`);
  expect(entry.hardGate === true, `${id} must remain a hard gate.`);
  expect(entry.automatedStatus === "protocol-ready", `${id} automated status must remain protocol-ready.`);
  expect(entry.humanStatus === "required-not-run", `${id} must not claim an unperformed human pass.`);
  expect(entry.manualGateId === spec.manualGateId, `${id} manual gate ID must remain linked.`);
  expect(typeof entry.owner === "string" && entry.owner.length > 0, `${id} requires an owner.`);
  expect(typeof entry.risk === "string" && entry.risk.length > 0, `${id} requires a risk statement.`);
  expect(typeof entry.stopRule === "string" && entry.stopRule.length > 0, `${id} requires a stop rule.`);
  expect(typeof entry.nextAction === "string" && entry.nextAction.length > 0, `${id} requires a next action.`);
  expect((entry.requiredEvidence ?? []).length >= 3, `${id} requires at least three evidence requirements.`);
  expect((entry.antiGaming ?? []).length >= 1, `${id} requires an anti-gaming rule.`);
  expect((entry.completionEvidence ?? []).length === 0, `${id} must not contain completion evidence before the human gate is run.`);

  requireFragments("Portfolio blind-spot protocol", protocol, [
    `## ${spec.label}`,
    `Manual gate: \`${spec.manualGateId}\``,
    "Automated protocol readiness is not a human outcome",
    ...spec.protocolFragments
  ]);
  requireFragments("Portfolio blind-spot register documentation", registerDoc, [
    `\`${id}\``,
    "protocol-ready",
    "required-not-run",
    "No human result is inferred from the automated score"
  ]);

  const controls = parsed.controls ?? {};
  const rowsHave = (rows, keys) =>
    Array.isArray(rows) && rows.every((row) => keys.every((key) => {
      const value = row[key];
      return Array.isArray(value) ? value.length > 0 : typeof value === "string" ? value.length > 0 : value !== undefined;
    }));

  if (id === "target-role-specificity") {
    const control = controls.targetRoleSpecificity ?? {};
    expect(control.requiredRealJobDescriptions === 5, "Target-role control must require five real job descriptions.");
    expect(control.receivedRealJobDescriptions === 0, "Target-role control must remain zero until real job descriptions are supplied.");
    expect(control.archetypesCountAsEvidence === false, "Target-role control must reject archetypes as market evidence.");
  }
  if (id === "independent-comprehension-holdout") {
    const control = controls.independentHoldout ?? {};
    expect(control.minimumUnfamiliarReviewers === 3, "Independent holdout must require at least three unfamiliar reviewers.");
    expect(control.completedReviewers === 0, "Independent holdout must remain unrun until reviewer evidence exists.");
    expect(control.authoringAgentsEligible === false, "Authoring agents must not count as independent holdouts.");
    expect(control.briefingAllowed === false, "Independent holdouts must receive no author briefing.");
    expect((control.questions ?? []).length >= 4, "Independent holdout requires role, value, proof, and next-action questions.");
  }
  if (id === "individual-contribution-provenance") {
    const rows = controls.contributionProvenance ?? [];
    expect(rows.length >= 5, "Contribution provenance must track at least five priority projects.");
    expect(rowsHave(rows, ["projectId", "projectEvidence", "jamieRoleEvidence", "externalCorroboration", "nextEvidence"]), "Every contribution row must separate project, role, corroboration, and next evidence.");
    expect(rows.some((row) => row.externalCorroboration !== "complete"), "Contribution provenance must preserve unresolved corroboration debt.");
    requireFragments("Source coverage", sourceCoverage, ["individual web authorship", "complete founding group", "20-plus resident-artist aggregate remains open"]);
  }
  if (id === "outcome-chain-evidence") {
    const rows = controls.outcomeChains ?? [];
    expect(rows.length >= 5, "Outcome-chain control must track at least five priority projects.");
    expect(rowsHave(rows, ["projectId", "output", "observedOutcome", "attributionBoundary", "openOutcome"]), "Every outcome row must separate output, observed outcome, attribution, and open outcome.");
    expect(rows.every((row) => !/Jamie (?:alone )?caused|solely caused|Jamie's sole causality/i.test(row.observedOutcome)), "Outcome chains must not encode sole causality.");
  }
  if (id === "technical-implementation-depth") {
    const rows = controls.technicalEvidence ?? [];
    expect(rows.length >= 5, "Technical-evidence control must track at least five systems.");
    expect(rowsHave(rows, ["projectId", "system", "artifactStatus", "decisionEvidenceStatus", "nextArtifact"]), "Every technical row must track system, artifact, decision evidence, and next artifact.");
    expect(rows.some((row) => row.artifactStatus !== "source-backed"), "Technical-evidence control must preserve remaining implementation debt.");
    requireFragments("Source coverage", sourceCoverage, ["technical-operations-operating-backbone", "Treat this as a synthesis"]);
  }
  if (id === "collaboration-role-mapping") {
    const rows = controls.collaborationRoleMaps ?? [];
    expect(rows.length >= 5, "Collaboration control must track at least five collective projects.");
    expect(rowsHave(rows, ["projectId", "collectiveCredit", "jamieRoleStatus", "collaboratorConfirmationStatus", "publicationPermissionStatus"]), "Every collaboration row must track collective credit, Jamie's role, confirmation, and permission.");
    expect(rows.every((row) => row.publicationPermissionStatus !== "assumed"), "Collaborator publication permission must never be assumed.");
  }
  if (id === "visual-proof-readiness") {
    const rows = controls.visualProofs ?? [];
    expect(rows.length >= 5, "Visual-proof control must track at least five leading case studies.");
    expect(rowsHave(rows, ["projectId", "candidateStatus", "evidenceValueStatus", "rightsStatus", "consentStatus", "captionStatus"]), "Every visual row must track candidate, evidence, rights, consent, and caption status.");
    expect(rows.every((row) => !(row.rightsStatus === "cleared" && row.consentStatus === "cleared" && row.captionStatus === "ready")), "Visual control must not invent a fully cleared package.");
  }
  if (id === "longitudinal-thesis-boundary") {
    const control = controls.longitudinalSynthesis ?? {};
    expect(control.editorialStatus === "hold", "Longitudinal synthesis must remain on hold.");
    expect((control.projectIds ?? []).length >= 5, "Longitudinal synthesis must span at least five distinct projects.");
    expect((control.promotionRequires ?? []).length >= 3, "Longitudinal synthesis requires audience need, corroboration, and anti-flattening review.");
    requireFragments("Projection map", projectionMap, ["participatory-systems longitudinal frame remains on hold", "cross-project corroboration"]);
  }
  if (id === "application-execution-cadence") {
    const control = controls.applicationCadence ?? {};
    expect(control.researchAndCompositionTimeboxMinutes === 90, "Application cadence must retain the 90-minute timebox.");
    expect(control.archiveItemsCountAsJobSearchOutcome === false, "Archive volume must not count as a job-search outcome.");
    expect((control.outwardActions ?? []).includes("tailored application") && (control.outwardActions ?? []).includes("direct outreach") && (control.outwardActions ?? []).includes("professional conversation"), "Application cadence must return effort to application, outreach, or conversation.");
    expect((control.successMeasures ?? []).length >= 3, "Application cadence requires outward-facing success measures.");
  }
  if (id === "agency-without-inflation") {
    const control = controls.agencyCalibration ?? {};
    expect((control.requiredDirectVerbs ?? []).length >= 7, "Agency calibration must retain at least seven direct verbs.");
    expect(control.collectiveBoundaryRequired === true, "Agency calibration must preserve collective boundaries.");
    requireFragments("Technical Operations", technicalOperations, ["I helped", "I designed", "I built", "I established", "I created"]);
  }
  if (id === "integration-governance") {
    const control = controls.integrationGovernance ?? {};
    expect(control.baseBranch === "develop", "Integration governance base must remain develop.");
    expect(control.exactCandidateSha === null, "No exact production candidate SHA may be implied before approval.");
    expect(control.deploymentApproved === false, "Integration governance must not imply deployment approval.");
    expect(control.branchLocalScoreIsProductionApproval === false, "Branch-local scores must not authorize production.");
    expect(control.requiresPrOwnershipAndSupersession === true, "Integration governance must require PR ownership and supersession review.");
    requireFragments("Launch blockers", launchBlockers, ["Every open pull request targeting `develop`", "exact production candidate SHA", "Postdeploy health"]);
  }

  const publicBundle = [register, protocol, registerDoc].join("\n");
  if ([/\/Users\//, /\/Volumes\//, /auth_token\s*[:=]/i, /cookie\s*:\s*[^\s]/i].some((pattern) => pattern.test(publicBundle))) {
    missing.push(`${id} public control bundle contains private paths or authentication material.`);
  }

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
  const nycArtCFacebookPostCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/nycartc-facebook-posts-batch-2026-07-14.ts"
  );
  const nycArtCFacebookPostCensus = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/nycartc-facebook-post-census-2026-07-14.csv"
  );
  const kcSpacesFundFacebookPostCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/kcspacesfund-facebook-posts-batch-2026-07-14.ts"
  );
  const kcSpacesFundFacebookPostCensus = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/kcspacesfund-facebook-post-census-2026-07-14.csv"
  );
  const jamieFacebookPostCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/jamie-facebook-posts-batch-2026-07-14.ts"
  );
  const jamieFacebookPostCensus = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/jamie-facebook-post-census-2026-07-14.csv"
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
  const wowlistFacebookPostCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/wowlist-facebook-posts-batch-2026-07-14.ts"
  );
  const wowlistFacebookPostCensus = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/wowlist-facebook-post-census-2026-07-14.csv"
  );
  const kcTownHallSocialCorpus = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/kc-town-hall-social-corpus.ts"
  );
  const kcTownHallPostLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/kc-town-hall-public-post-ledger.json"
  );
  const kcTownHallPhaseOneNeighborhoodBatch = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/kc-town-hall-phase-one-neighborhood-batch-2026-07-15.ts"
  );
  const proofDebtEvidenceBatch = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/proof-debt-evidence-batch-2026-07-15.ts"
  );
  const wowlistDatabaseAggregateLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/wowlist-database-aggregate-ledger.json"
  );
  const sundayDinnerAttendanceAggregateLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/sunday-dinner-attendance-aggregate-ledger.json"
  );
  const callscriptNycArtCFormationLedger = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/callscript-nycartc-formation-ledger.json"
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
  const claimsDoc = readOptional(repoRoot, "docs/knowledge-bank/claims.md");
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
  const kcTownHallPhaseOneNeighborhoodDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-neighborhood-practice.md"
  );
  const wowlistDatabaseScaleDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-15-wowlist-database-scale.md"
  );
  const sundayDinnerAttendanceWorkbookDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-15-sunday-dinner-attendance-workbook.md"
  );
  const callscriptNycArtCFormationDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-15-callscript-nycartc-formation-lineage.md"
  );
  const kcTownHallProjectDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/projects/kc-town-hall.md"
  );
  const iCloudTeamsArchiveDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-13-icloud-teams-archive-pass.md"
  );
  const iCloudTeamsExpansionBatch = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/icloud-teams-expansion-batch-2026-07-14.ts"
  );
  const iCloudTeamsExpansionDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-icloud-teams-expansion.md"
  );
  const creativeTechnologyDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/projects/creative-technology-practice.md"
  );
  const nterChngArchiveExpansionBatch = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/nter-chng-archive-expansion-batch-2026-07-14.ts"
  );
  const nterChngArchiveExpansionDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-nter-chng-archive-expansion.md"
  );
  const nycArtCGovernmentValueBatch = readOptional(
    repoRoot,
    "apps/www/src/data/knowledge-bank/nycartc-government-value-batch-2026-07-15.ts"
  );
  const nycArtCGovernmentValueDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-15-nycartc-government-institutional-value.md"
  );
  const nycArtCProjectDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/projects/nyc-artist-coalition-nightlife.md"
  );
  const sourceCoverage = readOptional(
    repoRoot,
    "docs/knowledge-bank/source-coverage.md"
  );
  const sourcesDoc = readOptional(repoRoot, "docs/knowledge-bank/sources.md");
  const approvalRegister = readOptional(
    repoRoot,
    "docs/knowledge-bank/approval-register.md"
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
  const nycArtCFacebookPostDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-nycartc-facebook-posts.md"
  );
  const kcSpacesFundFacebookPostDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-kcspacesfund-facebook-posts.md"
  );
  const jamieFacebookPostDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-jamie-facebook-posts.md"
  );
  const personalWowlistFacebookEventDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/personal-wowlist-facebook-events-2026-07-14.md"
  );
  const participatoryPublicProgramsDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/projects/participatory-public-programs.md"
  );
  const wowlistProjectDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/projects/wowlist.md"
  );
  const sundayDinnerProjectDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/projects/sunday-dinner-196.md"
  );
  const wowlistFullPopulationDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-wowlist-full-population-social-corpus.md"
  );
  const wowlistFacebookPostDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/intake/2026-07-14-wowlist-facebook-posts.md"
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
  const blindSpotRegister = readOptional(
    repoRoot,
    "docs/knowledge-bank/data/portfolio-blind-spot-register.json"
  );
  const blindSpotProtocol = readOptional(
    repoRoot,
    "docs/evals/portfolio-blind-spots.md"
  );
  const blindSpotRegisterDoc = readOptional(
    repoRoot,
    "docs/knowledge-bank/blind-spot-register.md"
  );
  const launchBlockers = readOptional(
    repoRoot,
    "docs/knowledge-bank/launch-blockers.md"
  );
  const projectionMap = readOptional(
    repoRoot,
    "docs/knowledge-bank/projection-map.md"
  );
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
    coverageExtensions: `${kcTownHallSocialCorpus}\n${kcTownHallPhaseOneNeighborhoodBatch}\n${proofDebtEvidenceBatch}\n${nycArtCSocialCorpus}\n${nycArtCFacebookEventCorpus}\n${nycArtCFacebookPostCorpus}\n${personalWowlistFacebookEventCorpus}\n${urbanHermitSocialCorpus}\n${iCloudTeamsExpansionBatch}\n${nterChngArchiveExpansionBatch}\n${nycArtCGovernmentValueBatch}`,
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

  const wowlistDatabaseScaleMissing = evaluateWowlistDatabaseScale({
    ledger: wowlistDatabaseAggregateLedger,
    evidenceBatch: proofDebtEvidenceBatch,
    archiveDoc: wowlistDatabaseScaleDoc,
    projectDoc: wowlistProjectDoc,
    framework,
    proofs,
    sourceCoverage,
    approvalRegister,
    antiClaims
  });
  results.push(
    result({
      id: "wowlist-database-scale",
      label: "WOW List database scale is recomputable, historically bounded, and privacy-safe",
      weight: 20,
      hardGate: true,
      missing: wowlistDatabaseScaleMissing,
      evidence: [
        "The July 22, 2017 protected snapshot recomputes to 1,846 users and 16,142 posts or events.",
        "Thirty-five nonblank city or region labels meet an explicit 50-post/event threshold.",
        "Official-chapter, current-community, active-user, impact, and sole-ownership inflation are rejected.",
        "The public ledger contains aggregates and boundaries only, never raw database rows."
      ]
    })
  );

  const sundayDinnerAttendanceMissing = evaluateSundayDinnerAttendanceArchive({
    ledger: sundayDinnerAttendanceAggregateLedger,
    evidenceBatch: proofDebtEvidenceBatch,
    archiveDoc: sundayDinnerAttendanceWorkbookDoc,
    projectDoc: sundayDinnerProjectDoc,
    framework,
    proofs,
    sourceCoverage,
    approvalRegister,
    antiClaims
  });
  results.push(
    result({
      id: "sunday-dinner-attendance-archive",
      label: "Sunday Dinner's 300-plus gathering floor is source-backed without publishing attendance data",
      weight: 20,
      hardGate: true,
      missing: sundayDinnerAttendanceMissing,
      evidence: [
        "The protected workbook contains 345 event-specific columns across January 2012-March 2021.",
        "Three hundred forty columns carry positive cached yes counts, directly supporting the 300-plus floor.",
        "Numbering, livestream, formula, plus-one, and repeated-participant boundaries block unique-person inference.",
        "The separate 20-plus resident-artist aggregate remains open and participant rows remain protected."
      ]
    })
  );

  const callscriptFormationMissing = evaluateCallscriptNycArtCFormation({
    ledger: callscriptNycArtCFormationLedger,
    evidenceBatch: proofDebtEvidenceBatch,
    archiveDoc: callscriptNycArtCFormationDoc,
    projectDoc: nycArtCProjectDoc,
    framework,
    proofs,
    sourceCoverage,
    approvalRegister,
    antiClaims,
    publicSite: [homePage, resumePage, siteData, workData, technicalOperations, fairRentCase].join("\n")
  });
  results.push(
    result({
      id: "callscript-nycartc-formation-lineage",
      label: "Call Script formation lineage preserves participation-system value and collective credit",
      weight: 20,
      hardGate: true,
      missing: callscriptFormationMissing,
      evidence: [
        "A dated sequence connects @wowlist's popular.vote route, the Call Script identity, the January DCLA event, and the February coalition meeting.",
        "The discussion records a follow-up poll and an open invitation to help choose coalition priorities.",
        "Jamie's account-establishment and facilitation contribution remains distinct from the complete founding group.",
        "Sole-founder, single-cause, attendance, membership, shared-authorship, and silent-site-projection inflation are rejected."
      ]
    })
  );

  const nterChngArchiveExpansionMissing = evaluateNterChngArchiveExpansion({
    framework,
    expansionBatch: nterChngArchiveExpansionBatch,
    archiveDoc: nterChngArchiveExpansionDoc,
    creativeTechDoc: creativeTechnologyDoc,
    sourceCoverage,
    antiClaims,
    publicSite: [homePage, resumePage, siteData, workData, technicalOperations, fairRentCase].join("\n")
  });
  results.push(
    result({
      id: "nter-chng-archive-expansion",
      label: "NTER CHNG exhibition provenance preserves direct evidence, shared credit, and participant privacy",
      weight: 20,
      hardGate: true,
      missing: nterChngArchiveExpansionMissing,
      evidence: [
        "The archived project site preserves the installation description and three-person maker credit.",
        "America: Now and Here's official archives directly establish 2011 exhibition inclusion and observed visitor use.",
        "Nerman Museum context remains distinct from the project-specific inclusion evidence.",
        "Participant messages, contact details, unsupported audience claims, and silent site projection are hard-gated."
      ]
    })
  );

  const nycArtCGovernmentValueMissing =
    evaluateNycArtCGovernmentInstitutionalValue({
      framework,
      institutionalBatch: nycArtCGovernmentValueBatch,
      intakeDoc: nycArtCGovernmentValueDoc,
      projectDoc: nycArtCProjectDoc,
      sourcesDoc,
      antiClaims,
      approvalRegister,
      sourceCoverage,
      publicSite: [
        homePage,
        resumePage,
        siteData,
        workData,
        technicalOperations,
        fairRentCase
      ].join("\n")
    });
  results.push(
    result({
      id: "nycartc-government-institutional-value",
      label:
        "NYC Artist Coalition government value preserves evidence, interpretation, and causality boundaries",
      weight: 20,
      hardGate: true,
      missing: nycArtCGovernmentValueMissing,
      evidence: [
        "Finkelpearl's February testimony describes DIY recommendations and continued organizing; DCLA's later message supplies the explicit coalition name.",
        "Coalition recommendations, maps, forums, and Council testimony document a usable civic-translation function.",
        "Espinal's town-hall, hearing, sponsorship, enactment, and public-credit sequence remains distinct from bill authorship and sole causality.",
        "The institutional interpretation stays reserve and cannot silently enter the current hiring site."
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

  const kcTownHallPhaseOneNeighborhoodMissing =
    evaluateKcTownHallPhaseOneNeighborhoodPractice({
      framework,
      batch: kcTownHallPhaseOneNeighborhoodBatch,
      intakeDoc: kcTownHallPhaseOneNeighborhoodDoc,
      projectDoc: kcTownHallProjectDoc,
      claimsDoc,
      sourcesDoc,
      sourceCoverage,
      antiClaims,
      approvalRegister,
      publicSite: [
        homePage,
        resumePage,
        siteData,
        workData,
        technicalOperations,
        kcTownHallCase
      ].join("\n")
    });
  results.push(
    result({
      id: "kc-town-hall-phase-one-neighborhood-practice",
      label:
        "KC Town Hall Phase One and neighborhood practice preserve role depth, collective credit, and source boundaries",
      weight: 20,
      hardGate: true,
      missing: kcTownHallPhaseOneNeighborhoodMissing,
      evidence: [
        "The protected packet establishes Jamie's project-manager title, multidisciplinary team, survey instrument, cold-shell scope, 2018 progress, and planned 2019 completion.",
        "Jamie's firsthand account adds the day-to-day field-delivery function and actual 2019 completion without implying licensure or sole specialist performance.",
        "Tired of Tires and Cleveland Avenue records preserve operator, collective-credit, scale, expansion, and capital-causality boundaries.",
        "All four claims remain reserve and cannot silently enter the public hiring site."
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

  const iCloudArchiveExpansionMissing = evaluateICloudArchiveExpansion({
    framework,
    expansionBatch: iCloudTeamsExpansionBatch,
    archiveDoc: iCloudTeamsExpansionDoc,
    creativeTechDoc: creativeTechnologyDoc,
    sourceCoverage,
    publicSite: [homePage, resumePage, siteData, workData, technicalOperations, fairRentCase].join("\n")
  });
  results.push(
    result({
      id: "icloud-teams-archive-expansion",
      label: "iCloud Teams expansion deepens evidence while preserving credit, privacy, and editorial control",
      weight: 20,
      hardGate: true,
      missing: iCloudArchiveExpansionMissing,
      evidence: [
        "Authenticated iCloud web controls and local materialization are documented as complementary archive surfaces.",
        "Five public records support a bounded 2006-2016 creative-technology reserve layer with complete source-specific credit.",
        "A 34-page preserved CRS record resolves the 30-plus-page aggregate while an earlier 12-page snapshot remains distinct.",
        "The approved-resume audit narrows proof debt without using first-party job-hunt material as independent corroboration.",
        "Local paths, phone numbers, private archive material, and silent reserve projection are hard-gated."
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

  const nycArtCFacebookPostMissing = evaluateNycArtCFacebookPostArchive({
    census: nycArtCFacebookPostCensus,
    corpusModel: nycArtCFacebookPostCorpus,
    framework,
    proofs,
    workData,
    fairRentCase,
    archiveDoc: nycArtCFacebookPostDoc,
    antiClaims
  });
  results.push(
    result({
      id: "nycartc-facebook-post-archive",
      label: "NYC Artist Coalition Facebook posts close the surviving public timeline and preserve shared authorship",
      weight: 20,
      hardGate: true,
      missing: nycArtCFacebookPostMissing,
      evidence: [
        "All 441 unique records in the current surviving public owner timeline are dispositioned after a checkpointed terminal-scroll and wait check.",
        "Item-level recomputation verifies five record forms, nine primary themes, direct outbound-link counts, and mutable interaction totals.",
        "The selected portfolio claim presents the Page as cross-campaign civic publication infrastructure while keeping stakeholder references distinct from inbound engagement.",
        "A first-party crosscheck preserves the public-timeline versus managed-content boundary, and individual publisher attribution remains unresolved."
      ]
    })
  );

  const kcSpacesFundFacebookPostMissing =
    evaluateKcSpacesFundFacebookPostArchive({
      census: kcSpacesFundFacebookPostCensus,
      corpusModel: kcSpacesFundFacebookPostCorpus,
      framework,
      proofs,
      technicalOperations,
      archiveDoc: kcSpacesFundFacebookPostDoc,
      antiClaims
    });
  results.push(
    result({
      id: "kcspacesfund-facebook-post-archive",
      label:
        "KC Spaces Fund Facebook posts close the surviving public timeline and preserve Jamie's bounded non-posting role",
      weight: 20,
      hardGate: true,
      missing: kcSpacesFundFacebookPostMissing,
      evidence: [
        "All 38 unique records in the surviving public Page timeline are dispositioned after an authenticated traversal and 40 endpoint checks.",
        "Item-level recomputation verifies four record forms, 19 readable campaign messages, ten grantee-recognition records, route families, and the 119-reaction floor.",
        "The Page documents a campaign operating sequence and consistent public identity without converting outgoing references into stakeholder engagement.",
        "The selected site claim credits Jamie's website, digital-operations, and cross-channel naming support while preserving organizer, campaign-voice, and Page-publisher boundaries."
      ]
    })
  );

  const jamieFacebookPostMissing = evaluateJamieFacebookPostArchive({
    census: jamieFacebookPostCensus,
    corpusModel: jamieFacebookPostCorpus,
    framework,
    archiveDoc: jamieFacebookPostDoc,
    antiClaims,
    participatoryDoc: participatoryPublicProgramsDoc
  });
  results.push(
    result({
      id: "jamie-facebook-post-archive",
      label:
        "Jamie's personal Facebook posts reconcile the owner-filtered population and promote sources without publishing a personal dossier",
      weight: 20,
      hardGate: true,
      missing: jamieFacebookPostMissing,
      evidence: [
        "All 1,243 unique records returned by the terminal Posted by: You cursor are dispositioned after reconciling 3,728 replayed nodes across 621 pages.",
        "Item-level recomputation verifies every year, form, broad theme, and professional-relevance count in the aggregate-only census.",
        "A full external-destination inventory traces source and project routes while keeping personal URLs and relationship context protected.",
        "The pass promotes an independent ArtTattler review into Great Accommodations evidence and preserves missing interaction and stakeholder-engagement data as unknown rather than zero."
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

  const wowlistFacebookPostMissing = evaluateWowlistFacebookPostArchive({
    census: wowlistFacebookPostCensus,
    corpusModel: wowlistFacebookPostCorpus,
    framework,
    proofs,
    workData,
    wowlistCase,
    archiveDoc: wowlistFacebookPostDoc,
    antiClaims
  });
  results.push(
    result({
      id: "wowlist-facebook-post-archive",
      label: "WOW List Facebook posts close the surviving population and substantiate a bounded publishing role",
      weight: 20,
      hardGate: true,
      missing: wowlistFacebookPostMissing,
      evidence: [
        "The terminal owner-timeline cursor reconciles all 57 surviving records across 19 pages.",
        "Item-level recomputation verifies form, year, theme, public URL, and mutable interaction totals.",
        "Selected public posts document member-led calendars, community contribution, and later external-organizer continuity.",
        "A protected identity-matched audit attributes at least 51 records to Jamie, leaves six unresolved, and preserves shared-project and source-authorship boundaries."
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

  for (const spec of PORTFOLIO_BLIND_SPOT_SPECS) {
    const blindSpotMissing = evaluatePortfolioBlindSpot({
      id: spec.id,
      register: blindSpotRegister,
      protocol: blindSpotProtocol,
      registerDoc: blindSpotRegisterDoc,
      launchBlockers,
      sourceCoverage,
      projectionMap,
      technicalOperations
    });
    results.push(
      result({
        id: `blind-spot-${spec.id}`,
        label: spec.label,
        weight: spec.weight,
        hardGate: true,
        missing: blindSpotMissing,
        evidence: [
          "The structured register names an owner, risk, evidence requirements, stop rule, anti-gaming rule, next action, and linked manual gate.",
          "Automated protocol readiness remains distinct from a human result.",
          "The criterion preserves known evidence debt instead of manufacturing completion."
        ]
      })
    );
  }

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
    },
    ...PORTFOLIO_BLIND_SPOT_SPECS.map((spec) => ({
      id: spec.manualGateId,
      status: "manual-required",
      pass: `Complete and record the independent human evidence required by ${spec.label.toLowerCase()}; automated protocol readiness does not count as completion.`
    }))
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
      "Do not use contextual exhibition pages as project-specific proof, erase NTER CHNG's shared maker credit, convert observed use into audience impact, or republish archived participant messages and contact details.",
      "Do not publish Shared Drive names, links, IDs, membership, participant rows, access details, or private filenames to prove archival depth.",
      "Do not treat Shared Drive custody, a private draft, or one dated workflow record as proof of authorship, distribution, institutional adoption, implementation, or aggregate scale.",
      "Do not treat an authenticated visible social timeline as a complete platform export, count one-way tags as reciprocal engagement, assign every team post to Jamie, expose authentication material, or convert individual-account interactions into official endorsement or policy causality.",
      "Do not turn personal Facebook event association into attendance, endorsement, authorship, production, or professional proof; erase an unresolved hosted-event slot; sum unstable response displays; infer WOW List historical nonexistence from a current zero display; or silently promote reserve event claims onto the site.",
      "Do not count fictional role archetypes as real market evidence or allow an authoring agent to serve as an independent hiring holdout.",
      "Do not inherit Jamie's individual contribution from collective project evidence, convert outputs or sequence into sole causality, or treat a source list as technical implementation depth.",
      "Do not erase collaborators to make Jamie legible, publish uncleared visual material, flatten distinct projects into one thesis, count archive volume as job-search progress, or weaken boundaries to make agency sound stronger.",
      "Do not call a branch-local score merged, deployed, or production-approved.",
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
