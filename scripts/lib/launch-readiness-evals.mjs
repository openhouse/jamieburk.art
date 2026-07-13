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
  for (const proofId of proofIds) {
    if (
      !framework.includes(`proofId: "${proofId}"`) &&
      !framework.includes(`coverage("${proofId}"`)
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

  if (!/id: "kc-town-hall"[\s\S]{0,180}period: "2019"[\s\S]{0,80}status: "historical"/.test(framework)) {
    missing.push("KC Town Hall project metadata must record period 2019 and historical status.");
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
  const callNycCase = read(repoRoot, "apps/www/src/content/work/callnyc.mdx");
  const fairRentCase = read(repoRoot, "apps/www/src/content/work/fair-rent-nyc.mdx");
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
