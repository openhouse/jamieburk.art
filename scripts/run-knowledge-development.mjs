import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  campaignPressArchiveUrlFor,
  campaignPressClaims,
  campaignPressManifests,
  campaignPressSources,
} from "../apps/www/src/data/knowledge-bank/campaign-press.ts";
import {
  kcTownHallFundingCaptures,
  kcTownHallFundingClaims,
  kcTownHallFundingCorrections,
  kcTownHallFundingInquiries,
  kcTownHallFundingObservations,
  kcTownHallFundingSources,
} from "../apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts";
import {
  kcTownHallPhaseOneCaptures,
  kcTownHallPhaseOneClaims,
  kcTownHallPhaseOneInquiries,
  kcTownHallPhaseOneObservations,
  kcTownHallPhaseOneResearchTasks,
  kcTownHallPhaseOneSources,
} from "../apps/www/src/data/knowledge-bank/kc-town-hall-phase-one.ts";
import {
  teamsArchiveCaptures,
  teamsArchiveClaims,
  teamsArchiveInquiries,
  teamsArchiveObservations,
  teamsArchiveResearchTasks,
  teamsArchiveSources,
} from "../apps/www/src/data/knowledge-bank/teams-archive.ts";
import {
  googleSharedDriveCaptures,
  googleSharedDriveClaims,
  googleSharedDriveInquiries,
  googleSharedDriveObservations,
  googleSharedDriveResearchTasks,
  googleSharedDriveReviewSummary,
  googleSharedDriveSources,
} from "../apps/www/src/data/knowledge-bank/google-shared-drives.ts";
import {
  projectSocialAccounts,
  socialMediaCaptures,
  socialMediaClaims,
  socialMediaInquiries,
  socialMediaObservations,
  socialMediaResearchTasks,
  socialMediaReviewSummary,
  socialMediaSources,
} from "../apps/www/src/data/knowledge-bank/social-media-production.ts";
import {
  urbanhermitCaptures,
  urbanhermitClaims,
  urbanhermitInquiries,
  urbanhermitObservations,
  urbanhermitResearchTasks,
  urbanhermitReviewSummary,
  urbanhermitSources,
} from "../apps/www/src/data/knowledge-bank/urbanhermit-production.ts";
import {
  nycacFacebookEventCaptures,
  nycacFacebookEventClaims,
  nycacFacebookEventInquiries,
  nycacFacebookEventObservations,
  nycacFacebookEventResearchTasks,
  nycacFacebookEventSources,
} from "../apps/www/src/data/knowledge-bank/nycac-facebook-events.ts";
import {
  jamieWowListFacebookEventCaptures,
  jamieWowListFacebookEventClaims,
  jamieWowListFacebookEventInquiries,
  jamieWowListFacebookEventObservations,
  jamieWowListFacebookEventResearchTasks,
  jamieWowListFacebookEventReviewSummary,
  jamieWowListFacebookEventSources,
} from "../apps/www/src/data/knowledge-bank/jamie-wowlist-facebook-events.ts";
import {
  wowListFacebookPostCaptures,
  wowListFacebookPostClaims,
  wowListFacebookPostInquiries,
  wowListFacebookPostObservations,
  wowListFacebookPostResearchTasks,
  wowListFacebookPostReviewSummary,
  wowListFacebookPostSources,
} from "../apps/www/src/data/knowledge-bank/wowlist-facebook-posts.ts";
import { validateKnowledgeBank } from "./lib/citation-validation.mjs";
import { nycacMissionSignalRules } from "./lib/nycac-mission-classifier.mjs";
import { urbanhermitMissionSignalRules } from "./lib/urbanhermit-mission-classifier.mjs";

const suite = JSON.parse(
  readFileSync(".agents/evals/knowledge-development.json", "utf8"),
);
const candidateFiles = [
  ".agents/evals/knowledge-development.json",
  "package.json",
  "scripts/run-knowledge-development.mjs",
  "apps/www/src/data/knowledge-bank/development-records.ts",
  "apps/www/src/data/knowledge-bank/nycac-research-2026-07-14.ts",
  "apps/www/src/data/knowledge-bank/campaign-press.ts",
  "apps/www/src/data/knowledge-bank/fixtures/campaign-press-capture-inventory.json",
  "apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts",
  "apps/www/src/data/knowledge-bank/kc-town-hall-phase-one.ts",
  "apps/www/src/data/knowledge-bank/teams-archive.ts",
  "apps/www/src/data/knowledge-bank/google-shared-drives.ts",
  "apps/www/src/data/knowledge-bank/social-media-production.ts",
  "apps/www/src/data/knowledge-bank/nterchng-production.ts",
  "apps/www/src/data/knowledge-bank/urbanhermit-production.ts",
  "apps/www/src/data/knowledge-bank/nycac-facebook-events.ts",
  "apps/www/src/data/knowledge-bank/jamie-wowlist-facebook-events.ts",
  "apps/www/src/data/knowledge-bank/wowlist-facebook-posts.ts",
  "apps/www/src/data/knowledge-bank/fixtures/social-media-capture-inventory.json",
  "apps/www/src/data/knowledge-bank/fixtures/callnyc-full-population.json",
  "apps/www/src/data/knowledge-bank/fixtures/nycartc-retrievable-population.json",
  "apps/www/src/data/knowledge-bank/fixtures/wowlist-full-population.json",
  "apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json",
  "apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json",
  "apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json",
  "apps/www/src/data/knowledge-bank/fixtures/jamie-wowlist-facebook-events-full-population.json",
  "apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json",
  "apps/www/src/data/knowledge-bank/schema.ts",
  "apps/www/src/data/knowledge-bank/records.ts",
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/work.ts",
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/wowlist.mdx",
  "apps/www/src/content/work/196-sunday-dinner.mdx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/content/work/kc-town-hall.mdx",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/README.md",
  "docs/knowledge-bank/proofs.md",
  "docs/knowledge-bank/sources.md",
  "docs/knowledge-bank/anti-claims.md",
  "docs/knowledge-bank/approval-register.md",
  "docs/knowledge-bank/projection-map.md",
  "docs/knowledge-bank/projects/waterways-and-participatory-art.md",
  "docs/knowledge-bank/projects/nterchng.md",
  "docs/knowledge-bank/projects/urbanhermit.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md",
  "docs/knowledge-bank/projects/jamie-wowlist-facebook-events.md",
  "docs/knowledge-bank/projects/wowlist-facebook-posts.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition-research.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition-press.md",
  "docs/knowledge-bank/projects/kc-town-hall-funding.md",
  "docs/knowledge-bank/projects/kc-town-hall-phase-one.md",
  "docs/knowledge-bank/projects/teams-archive-production.md",
  "docs/knowledge-bank/projects/google-shared-drives-production.md",
  "docs/knowledge-bank/projects/social-media-production.md",
  "scripts/lib/citation-validation.mjs",
  "scripts/lib/nycac-mission-classifier.mjs",
  "scripts/lib/urbanhermit-mission-classifier.mjs",
  "scripts/tests/citations.test.mjs",
  "scripts/tests/knowledge-development-evals.test.mjs",
  "docs/knowledge-bank/promotion-slate.md",
];

const campaignPressInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/campaign-press-capture-inventory.json",
    "utf8",
  ),
);
const socialMediaInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/social-media-capture-inventory.json",
    "utf8",
  ),
);
const callNycPopulationInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/callnyc-full-population.json",
    "utf8",
  ),
);
const nycacPopulationInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/nycartc-retrievable-population.json",
    "utf8",
  ),
);
const wowListPopulationInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/wowlist-full-population.json",
    "utf8",
  ),
);
const kcTownHallPopulationInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json",
    "utf8",
  ),
);
const urbanhermitPopulationInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json",
    "utf8",
  ),
);
const nycacFacebookEventInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json",
    "utf8",
  ),
);
const jamieWowListFacebookEventInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/jamie-wowlist-facebook-events-full-population.json",
    "utf8",
  ),
);
const wowListFacebookPostInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json",
    "utf8",
  ),
);

function candidateFingerprint() {
  const hash = createHash("sha256");
  for (const path of candidateFiles) {
    hash.update(`${path}\0`);
    hash.update(readFileSync(path));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function scoreRatio(numerator, denominator) {
  if (!denominator) return 0;
  const ratio = numerator / denominator;
  if (ratio >= 0.95) return 4;
  if (ratio >= 0.8) return 3;
  if (ratio >= 0.6) return 2;
  if (ratio > 0) return 1;
  return 0;
}

function immutableGitHubFixtureMatches(source, fixturePath) {
  const match = source?.canonicalUrl?.match(
    /\/blob\/([0-9a-f]{40})\/(apps\/www\/src\/data\/knowledge-bank\/fixtures\/[a-z0-9-]+\.json)$/,
  );
  if (!match || match[2] !== fixturePath) return false;
  try {
    return execFileSync("git", ["show", `${match[1]}:${fixturePath}`], {
      maxBuffer: 4 * 1024 * 1024,
    }).equals(readFileSync(fixturePath));
  } catch {
    return false;
  }
}

function result(
  score,
  evidence,
  findings = [],
  recommendedNextMove = "No deterministic remediation required.",
) {
  return {
    score,
    pass: score >= 3,
    evidence,
    findings,
    recommended_next_move: recommendedNextMove,
    confidence: "high",
  };
}

function loadJudgments(path) {
  if (!path) return { judgments: new Map(), candidateFingerprint: undefined };
  const input = JSON.parse(readFileSync(path, "utf8"));
  return {
    judgments: new Map(
      (input.judgments ?? []).map((judgment) => [judgment.eval_id, judgment]),
    ),
    candidateFingerprint: input.candidate_fingerprint,
  };
}

function deterministicResults(judgments) {
  const sourceById = new Map(
    knowledgeBank.sources.map((item) => [item.id, item]),
  );
  const observationById = new Map(
    knowledgeBank.observations.map((item) => [item.id, item]),
  );
  const claimById = new Map(
    knowledgeBank.claims.map((item) => [item.id, item]),
  );
  const taskById = new Map(
    knowledgeBank.researchTasks.map((item) => [item.id, item]),
  );
  const developmentSourceIds = new Set(
    knowledgeBank.captures.flatMap((capture) => capture.sourceIds),
  );
  const developmentSources = knowledgeBank.sources.filter((source) =>
    developmentSourceIds.has(source.id),
  );
  const developmentObservations = knowledgeBank.observations.filter(
    (observation) => developmentSourceIds.has(observation.sourceId),
  );
  const developmentClaimIds = new Set(
    developmentObservations.flatMap(
      (observation) => observation.supportsClaimIds,
    ),
  );
  for (const task of knowledgeBank.researchTasks)
    task.claimIds.forEach((id) => developmentClaimIds.add(id));
  const developmentClaims = knowledgeBank.claims.filter((claim) =>
    developmentClaimIds.has(claim.id),
  );
  const routedCaptures = knowledgeBank.captures.filter(
    (capture) =>
      capture.sourceIds.length ||
      capture.researchTaskIds.length ||
      capture.status === "closed",
  );
  const unresolvedCaptures = knowledgeBank.captures.filter(
    (capture) => capture.status !== "integrated" && capture.status !== "closed",
  );
  const urlCaptures = knowledgeBank.captures.filter(
    (capture) => capture.kind === "url",
  );
  const routedUrls = urlCaptures.filter(
    (capture) => capture.sourceIds.length || capture.researchTaskIds.length,
  );
  const sourcesWithObservations = developmentSources.filter((source) =>
    developmentObservations.some(
      (observation) => observation.sourceId === source.id,
    ),
  );
  const campaignPressIntegrityViolations = [];
  const inventoryPlacements = campaignPressInventory.placements ?? [];
  const uniqueCampaignPressArticleIds = new Set(
    campaignPressManifests.flatMap((manifest) => manifest.articleSourceIds),
  );

  if ((campaignPressInventory.captures ?? []).length !== 4) {
    campaignPressIntegrityViolations.push(
      "Campaign press fixture must retain four captured indexes",
    );
  }
  if (
    inventoryPlacements.length !== 45 ||
    uniqueCampaignPressArticleIds.size !== 44
  ) {
    campaignPressIntegrityViolations.push(
      "Campaign press corpus must retain 45 placements and 44 unique article identities",
    );
  }
  for (const manifest of campaignPressManifests) {
    const placements = inventoryPlacements.filter(
      (item) => item.campaignId === manifest.campaignId,
    );
    const capture = campaignPressInventory.captures.find(
      (item) => item.campaignId === manifest.campaignId,
    );
    if (!capture || capture.indexSourceId !== manifest.indexSourceId) {
      campaignPressIntegrityViolations.push(
        `Missing captured index for ${manifest.campaignId}`,
      );
    }
    if (
      JSON.stringify(placements.map((item) => item.sourceId)) !==
      JSON.stringify(manifest.articleSourceIds)
    ) {
      campaignPressIntegrityViolations.push(
        `Source-page order mismatch for ${manifest.campaignId}`,
      );
    }
    for (const sourceId of manifest.articleSourceIds) {
      if (!sourceById.has(sourceId)) {
        campaignPressIntegrityViolations.push(
          `Missing normalized campaign press source ${sourceId}`,
        );
      }
      if (
        !campaignPressArchiveUrlFor(sourceId)?.startsWith(
          "https://web.archive.org/web/",
        )
      ) {
        campaignPressIntegrityViolations.push(
          `Missing Wayback recovery path for ${sourceId}`,
        );
      }
    }
  }
  const pressClaim = campaignPressClaims[0];
  const newPressArticleIds = new Set(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .map((source) => source.id),
  );
  const campaignPressSafetyViolations = [
    ...knowledgeBank.claims.flatMap((claim) =>
      claim.evidence
        .filter((relationship) => newPressArticleIds.has(relationship.sourceId))
        .map(
          (relationship) =>
            `${claim.id} promotes unread source ${relationship.sourceId}`,
        ),
    ),
    ...(pressClaim.selectionState !== "dormant" ||
    pressClaim.publicationState !== "public-safe"
      ? ["Campaign press aggregate must remain public-safe and dormant"]
      : []),
    ...pressClaim.projections
      .filter(
        (projection) =>
          projection.status !== "hold" || projection.surfaces.length,
      )
      .map(
        () => "Campaign press aggregate must remain held from public surfaces",
      ),
    ...pressClaim.evidence
      .filter(
        (relationship) =>
          !campaignPressManifests.some(
            (manifest) => manifest.indexSourceId === relationship.sourceId,
          ),
      )
      .map(
        (relationship) =>
          `Campaign press aggregate improperly cites article ${relationship.sourceId}`,
      ),
  ];
  const kcTownHallIntegrityViolations = [];
  const expectedKcTownHallOfficialSourceIds = [
    "SRC-KCTH-CCED-ROUND-TWO-PROPOSALS-2019",
    "SRC-KCTH-KCMO-RESOLUTION-190649-2019",
    "SRC-KCTH-KCMO-ORDINANCE-190642-2019",
    "SRC-KCTH-KCMO-ORDINANCE-240317-2024",
  ];
  const transitionSourceId =
    "SRC-KCTH-JAMIE-TRANSITION-CLARIFICATION-2026";
  const approvedTransitionStatement =
    "Jamie transitioned the KC Town Hall project to a mission-aligned organization.";
  const transitionCapture = kcTownHallFundingCaptures.find(
    (capture) => capture.id === "CAP-KCTH-MISSION-ALIGNED-TRANSITION-2026",
  );
  const transitionSource = kcTownHallFundingSources.find(
    (source) => source.id === transitionSourceId,
  );
  const roleClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-CCED-DEVELOPER-PRESENTER-ROLE",
  );
  const fundingClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-CCED-COUNCIL-FUNDING-CHAIN",
  );
  const transitionClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-MISSION-ALIGNED-TRANSITION",
  );
  const kcTownHallPage = knowledgeBank.pages.find(
    (page) => page.id === "kc-town-hall",
  );
  if (
    kcTownHallFundingCaptures.length !== 2 ||
    kcTownHallFundingSources.length !== 5 ||
    kcTownHallFundingObservations.length !== 6 ||
    kcTownHallFundingClaims.length !== 3 ||
    kcTownHallFundingInquiries.length !== 1 ||
    kcTownHallFundingCorrections.length !== 2
  ) {
    kcTownHallIntegrityViolations.push(
      "KC Town Hall funding graph has an unexpected record count",
    );
  }
  if (
    ![...expectedKcTownHallOfficialSourceIds, transitionSourceId].every((id) =>
      sourceById.has(id),
    ) ||
    JSON.stringify(
      kcTownHallPage?.sourceOrder.filter((id) =>
        expectedKcTownHallOfficialSourceIds.includes(id),
      ),
    ) !== JSON.stringify(expectedKcTownHallOfficialSourceIds)
  ) {
    kcTownHallIntegrityViolations.push(
      "KC Town Hall source set or citation order is incomplete",
    );
  }
  if (
    !roleClaim ||
    JSON.stringify(roleClaim.evidence.map((item) => item.sourceId)) !==
      JSON.stringify([expectedKcTownHallOfficialSourceIds[0]])
  ) {
    kcTownHallIntegrityViolations.push(
      "KC Town Hall developer/presenter role is not bound to the proposal list",
    );
  }
  if (
    !fundingClaim ||
    JSON.stringify(fundingClaim.evidence.map((item) => item.sourceId)) !==
      JSON.stringify(expectedKcTownHallOfficialSourceIds.slice(1))
  ) {
    kcTownHallIntegrityViolations.push(
      "KC Town Hall funding claim does not preserve resolution, appropriation, and reappropriation evidence",
    );
  }
  if (
    !transitionClaim ||
    JSON.stringify(transitionClaim.evidence.map((item) => item.sourceId)) !==
      JSON.stringify([transitionSourceId]) ||
    transitionClaim.evidence.some((item) => item.renderCitation)
  ) {
    kcTownHallIntegrityViolations.push(
      "KC Town Hall transition is not bound to non-citing first-hand evidence",
    );
  }
  const kcTownHallPublicText = [
    "apps/www/src/content/work/kc-town-hall.mdx",
    "apps/www/src/data/work.ts",
    "apps/www/src/data/proofs.ts",
  ]
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  const kcTownHallSafetyViolations = [
    ...(!roleClaim?.antiClaims.some((item) =>
      /caused the Council appropriation/i.test(item),
    )
      ? ["KC Town Hall role claim lacks a Council-causality anti-claim"]
      : []),
    ...(!fundingClaim?.boundaries.some((item) =>
      /receipt.*expenditure/i.test(item),
    )
      ? [
          "KC Town Hall funding claim does not separate appropriation from receipt and expenditure",
        ]
      : []),
    ...(!fundingClaim?.antiClaims.some((item) =>
      /received \$490,539/i.test(item),
    )
      ? ["KC Town Hall funding claim lacks a non-receipt anti-claim"]
      : []),
    ...(!fundingClaim?.evidence.some(
      (item) =>
        item.sourceId === expectedKcTownHallOfficialSourceIds[3] &&
        item.relationship === "supports-boundary",
    )
      ? [
          "KC Town Hall funding claim does not use the 2024 ordinance as a disposition boundary",
        ]
      : []),
    ...(!transitionClaim?.boundaries.some(
      (item) => /first-hand.*official City records/i.test(item),
    )
      ? [
          "KC Town Hall transition claim does not distinguish first-hand context from official records",
        ]
      : []),
    ...(!transitionClaim?.antiClaims.some((item) =>
      /official Council records document/i.test(item),
    )
      ? [
          "KC Town Hall transition claim lacks an official-record attribution anti-claim",
        ]
      : []),
    ...(!/transitioned the project to a mission-aligned organization/i.test(
      kcTownHallPublicText,
    )
      ? ["KC Town Hall public projection omits the mission-aligned transition"]
      : []),
    ...(!/Separately, the City/i.test(kcTownHallPublicText)
      ? [
          "KC Town Hall public projection does not separate the transition from the City record",
        ]
      : []),
    ...(transitionCapture?.summary !== approvedTransitionStatement ||
    transitionSource?.supportsGenerally.some(
      (item) => !/transitioned KC Town Hall to a mission-aligned organization/i.test(item),
    )
      ? [
          "KC Town Hall first-hand capture exceeds the approved professional transition statement",
        ]
      : []),
    ...(!/Council accepted and appropriated the amount in 2019/i.test(
      kcTownHallPublicText,
    )
      ? [
          "KC Town Hall public projection omits Council acceptance and appropriation",
        ]
      : []),
    ...(!/withdrew|withdrawal/i.test(kcTownHallPublicText) ||
    !/unused/i.test(kcTownHallPublicText)
      ? [
          "KC Town Hall public projection omits withdrawal or unused-funds disposition",
        ]
      : []),
    ...(/including a \$490,539 public funding recommendation/i.test(
      kcTownHallPublicText,
    )
      ? [
          "KC Town Hall public projection retains superseded recommendation-only wording",
        ]
      : []),
  ];

  const kcTownHallPhaseOneIntegrityViolations = [];
  const kcTownHallPhaseOneSafetyViolations = [];
  const phaseOneCompletionClaim = kcTownHallPhaseOneClaims.find(
    (claim) => claim.id === "CLM-KCTH-PHASE-ONE-COLD-SHELL-COMPLETION",
  );
  const phaseOneContractorClaim = kcTownHallPhaseOneClaims.find(
    (claim) => claim.id === "CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
  );
  const phaseOneSurveyClaim = kcTownHallPhaseOneClaims.find(
    (claim) => claim.id === "CLM-KCTH-SURVEY-DESIGN-AND-DECISION-INPUT",
  );
  const phaseOneTireClaim = kcTownHallPhaseOneClaims.find(
    (claim) => claim.id === "CLM-KCTH-TIRED-OF-TIRES-DESIGN-AND-OPERATIONS",
  );
  const clevelandSeedClaim = kcTownHallPhaseOneClaims.find(
    (claim) => claim.id === "CLM-KCTH-CLEVELAND-UNIFY-DESIGN-STUDIO-SEED",
  );
  const clevelandTask = kcTownHallPhaseOneResearchTasks.find(
    (task) => task.id === "RT-KCTH-CLEVELAND-UNIFY-ARCHIVE-RECOVERY",
  );
  if (
    kcTownHallPhaseOneCaptures.length !== 2 ||
    kcTownHallPhaseOneSources.length !== 3 ||
    kcTownHallPhaseOneObservations.length !== 7 ||
    kcTownHallPhaseOneClaims.length !== 5 ||
    kcTownHallPhaseOneResearchTasks.length !== 2 ||
    kcTownHallPhaseOneInquiries.length !== 1
  ) {
    kcTownHallPhaseOneIntegrityViolations.push(
      "KC Town Hall Phase One graph has an unexpected record count",
    );
  }
  if (
    kcTownHallPhaseOneSources.some(
      (source) =>
        !sourceById.has(source.id) ||
        source.visibility === "public" ||
        source.canonicalUrl ||
        source.archiveUrl ||
        source.assetUrl,
    ) ||
    kcTownHallPhaseOneClaims.some((claim) =>
      claim.evidence
        .filter((evidence) =>
          kcTownHallPhaseOneSources.some(
            (source) => source.id === evidence.sourceId,
          ),
        )
        .some((evidence) => evidence.renderCitation),
    )
  ) {
    kcTownHallPhaseOneSafetyViolations.push(
      "KC Town Hall Phase One protected evidence is exposed or cited",
    );
  }
  if (
    phaseOneCompletionClaim?.selectionState !== "selected" ||
    phaseOneCompletionClaim.publicationState !== "approved" ||
    !phaseOneCompletionClaim.antiClaims.some((item) =>
      /City appropriation paid for Phase One/i.test(item),
    ) ||
    phaseOneContractorClaim?.selectionState !== "selected" ||
    !phaseOneContractorClaim.boundaries.some((item) =>
      /packet.*founder\/project manager, not general contractor/i.test(item),
    ) ||
    phaseOneSurveyClaim?.selectionState !== "selected" ||
    !phaseOneSurveyClaim.boundaries.some((item) =>
      /raw survey.*phone numbers/i.test(item),
    ) ||
    phaseOneTireClaim?.selectionState !== "selected" ||
    !phaseOneTireClaim.boundaries.some((item) =>
      /exact aggregate tire and savings totals.*held/i.test(item),
    ) ||
    clevelandSeedClaim?.selectionState !== "dormant" ||
    clevelandTask?.status !== "open"
  ) {
    kcTownHallPhaseOneIntegrityViolations.push(
      "KC Town Hall Phase One claims do not preserve selection, attribution, or research boundaries",
    );
  }
  if (
    !/completed (?:a )?\$189,629 Phase One[^.]*in 2019|Phase One[^.]*completed in 2019/i.test(
      kcTownHallPublicText,
    ) ||
    !/\$189,629/i.test(kcTownHallPublicText) ||
    !/Jamie states that he served as Phase One general contractor/i.test(
      kcTownHallPublicText,
    ) ||
    !/resident survey handbill/i.test(kcTownHallPublicText) ||
    !/Phase Two proposal/i.test(kcTownHallPublicText)
  ) {
    kcTownHallPhaseOneSafetyViolations.push(
      "KC Town Hall public projection omits the completed Phase One, attribution, survey, or Phase Two boundary",
    );
  }

  const teamsArchiveIntegrityViolations = [];
  const teamsArchiveSafetyViolations = [];
  const teamsSourceIds = new Set(
    teamsArchiveSources.map((source) => source.id),
  );
  const teamsProtectedSourceIds = new Set(
    teamsArchiveSources
      .filter((source) => source.visibility !== "public")
      .map((source) => source.id),
  );
  const teamsObservedSourceIds = new Set(
    teamsArchiveObservations.map((observation) => observation.sourceId),
  );
  const raftClaim = teamsArchiveClaims.find(
    (claim) => claim.id === "CLM-WATERWAYS-RAFT-EXPEDITION-SCALE",
  );
  const hydrationCapture = teamsArchiveCaptures.find(
    (capture) =>
      capture.id === "CAP-TEAMS-JOBHUNT-JUNE-PACKET-HYDRATION-2026",
  );
  const hydrationTask = teamsArchiveResearchTasks.find(
    (task) => task.id === "RT-TEAMS-JOBHUNT-JUNE-PACKET-HYDRATION",
  );
  const hydrationInquiry = teamsArchiveInquiries.find(
    (inquiry) =>
      inquiry.id === "INQ-TEAMS-JOBHUNT-ICLOUD-HYDRATION-2026",
  );
  const fairRentPage = knowledgeBank.pages.find(
    (page) => page.id === "fair-rent-nyc",
  );
  const fairRentPublicText = [
    "apps/www/src/content/work/fair-rent-nyc.mdx",
    "apps/www/src/data/work.ts",
    "apps/www/src/data/proofs.ts",
  ]
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  if (
    teamsArchiveCaptures.length !== 6 ||
    teamsArchiveSources.length !== 10 ||
    teamsArchiveObservations.length !== 23 ||
    teamsArchiveClaims.length !== 5 ||
    teamsArchiveResearchTasks.length !== 2 ||
    teamsArchiveInquiries.length !== 1
  ) {
    teamsArchiveIntegrityViolations.push(
      "Teams archival-production graph has an unexpected record count",
    );
  }
  if (
    !["CAP-TEAMS-CRS", "CAP-TEAMS-JPH", "CAP-TEAMS-JOBHUNT"].every(
      (prefix) => teamsArchiveCaptures.some((capture) => capture.id.startsWith(prefix)),
    )
  ) {
    teamsArchiveIntegrityViolations.push(
      "Teams archival-production graph does not cover all three required corpora",
    );
  }
  for (const sourceId of teamsSourceIds) {
    if (!sourceById.has(sourceId) || !teamsObservedSourceIds.has(sourceId)) {
      teamsArchiveIntegrityViolations.push(
        `Teams source lacks a normalized observation path: ${sourceId}`,
      );
    }
  }
  if (
    hydrationCapture?.status !== "researching" ||
    hydrationCapture.sourceIds.length ||
    hydrationCapture.observationIds.length ||
    !hydrationTask ||
    hydrationTask.status !== "in-progress" ||
    hydrationInquiry?.resultStatus !== "partially-recovered"
  ) {
    teamsArchiveIntegrityViolations.push(
      "Cloud-only job-hunt packet is not preserved as partially recovered research state",
    );
  }
  if (
    !raftClaim?.antiClaims.some((item) => /arrival at the Gulf/i.test(item)) ||
    !raftClaim?.researchTaskIds?.includes(
      "RT-WATERWAYS-GULF-ENDPOINT-CORROBORATION",
    )
  ) {
    teamsArchiveIntegrityViolations.push(
      "Raft expedition claim does not preserve the unresolved Gulf endpoint",
    );
  }
  if (
    !fairRentPage?.occurrences.some(
      (item) => item.claimId === "CLM-CRS-COALITION-OPERATING-SYSTEM",
    ) ||
    !fairRentPage?.occurrences.some(
      (item) => item.claimId === "CLM-CRS-OPEN-DATA-IMPLEMENTATION-DESIGN",
    )
  ) {
    teamsArchiveIntegrityViolations.push(
      "Fair Rent case study does not register both selected Teams archive claims",
    );
  }
  for (const sourceId of teamsProtectedSourceIds) {
    const source = sourceById.get(sourceId);
    if (source?.canonicalUrl || source?.archiveUrl || source?.assetUrl) {
      teamsArchiveSafetyViolations.push(
        `Protected Teams source exposes a public URL: ${sourceId}`,
      );
    }
    for (const claim of knowledgeBank.claims) {
      if (
        claim.evidence.some(
          (item) => item.sourceId === sourceId && item.renderCitation,
        )
      ) {
        teamsArchiveSafetyViolations.push(
          `Protected Teams source renders as a public citation: ${sourceId}`,
        );
      }
    }
  }
  if (
    !/six-part coalition operating/i.test(fairRentPublicText) ||
    !/legislative (source map and )?provenance redline/i.test(
      fairRentPublicText,
    ) ||
    !/privacy-preserving public-data pilot/i.test(fairRentPublicText) ||
    !/not claims? that a City agency adopted/i.test(fairRentPublicText)
  ) {
    teamsArchiveSafetyViolations.push(
      "Fair Rent projection omits a selected deliverable or implementation boundary",
    );
  }
  const teamsPayload = JSON.stringify({
    captures: teamsArchiveCaptures,
    observations: teamsArchiveObservations,
    claims: teamsArchiveClaims,
    tasks: teamsArchiveResearchTasks,
    inquiries: teamsArchiveInquiries,
  });
  if (
    /\/Users\/|\/Volumes\/|Mobile Documents|Jonathan Marmor/i.test(
      teamsPayload,
    )
  ) {
    teamsArchiveSafetyViolations.push(
      "Teams archival-production payload exposes a local path or private collaborator identity",
    );
  }

  const googleSharedDriveIntegrityViolations = [];
  const googleSharedDriveSafetyViolations = [];
  const googleSharedDriveSourceIds = new Set(
    googleSharedDriveSources.map((source) => source.id),
  );
  const googleSharedDriveObservedSourceIds = new Set(
    googleSharedDriveObservations.map((observation) => observation.sourceId),
  );
  const googleSharedDriveProtectedSourceIds = new Set([
    ...googleSharedDriveSourceIds,
    "SRC-CRS-RUNNING-MINUTES-2026-05-15",
  ]);
  const remainingDriveTask = googleSharedDriveResearchTasks.find(
    (task) => task.id === "RT-GDRIVE-REMAINING-CORPUS-TRIAGE",
  );
  const photoReviewTask = googleSharedDriveResearchTasks.find(
    (task) => task.id === "RT-GDRIVE-SUNDAY-DINNER-PHOTO-REVIEW",
  );
  const residencyReuseTask = googleSharedDriveResearchTasks.find(
    (task) => task.id === "RT-GDRIVE-196-WORKFLOW-REUSE-CORROBORATION",
  );
  const guidanceUseTask = googleSharedDriveResearchTasks.find(
    (task) => task.id === "RT-GDRIVE-NYCAC-GUIDANCE-PUBLICATION-USE",
  );
  const workflowExecutionTask = googleSharedDriveResearchTasks.find(
    (task) => task.id === "RT-GDRIVE-ARCHIVE-WORKFLOW-EXECUTION",
  );
  const handoffClaim = googleSharedDriveClaims.find(
    (claim) => claim.id === "CLM-GDRIVE-PORTABLE-HANDOFF-PRACTICE",
  );
  const residencyHandoffClaim = googleSharedDriveClaims.find(
    (claim) => claim.id === "CLM-196-RESIDENCY-ONBOARDING-HANDOFF",
  );
  const actionGuidanceClaim = googleSharedDriveClaims.find(
    (claim) => claim.id === "CLM-NYCAC-MULTI-ACTION-GUIDANCE-DRAFT",
  );
  const archiveWorkflowClaim = googleSharedDriveClaims.find(
    (claim) => claim.id === "CLM-GDRIVE-ARCHIVE-OVERVIEW-WORKFLOW",
  );
  const styleGuideSeedClaim = googleSharedDriveClaims.find(
    (claim) => claim.id === "CLM-SBU-STYLE-GUIDE-HANDOFF-SEED",
  );
  const sharedDriveWorkData = readFileSync("apps/www/src/data/work.ts", "utf8");
  const sharedDriveProofData = readFileSync("apps/www/src/data/proofs.ts", "utf8");
  const sharedDrivePublicText = [
    "apps/www/src/app/work/technical-operations/page.tsx",
    "apps/www/src/content/work/fair-rent-nyc.mdx",
    "apps/www/src/content/work/196-sunday-dinner.mdx",
  ]
    .map((path) => readFileSync(path, "utf8"))
    .concat(sharedDriveWorkData, sharedDriveProofData)
    .join("\n");

  if (
    googleSharedDriveCaptures.length !== 9 ||
    googleSharedDriveSources.length !== 6 ||
    googleSharedDriveObservations.length !== 18 ||
    googleSharedDriveClaims.length !== 5 ||
    googleSharedDriveResearchTasks.length !== 7 ||
    googleSharedDriveInquiries.length !== 1
  ) {
    googleSharedDriveIntegrityViolations.push(
      "Google Shared Drive archival-production graph has an unexpected record count",
    );
  }
  if (
    googleSharedDriveReviewSummary.accessibleDriveCount !== 110 ||
    googleSharedDriveReviewSummary.selectedDriveCount !== 14 ||
    googleSharedDriveReviewSummary.unreviewedDriveCount !== 96 ||
    googleSharedDriveReviewSummary.closeReadTextArtifactCount !== 7 ||
    googleSharedDriveReviewSummary.revisionHistoryCount !== 4
  ) {
    googleSharedDriveIntegrityViolations.push(
      "Google Shared Drive review scope no longer matches the bounded research record",
    );
  }
  for (const sourceId of googleSharedDriveSourceIds) {
    if (!sourceById.has(sourceId) || !googleSharedDriveObservedSourceIds.has(sourceId)) {
      googleSharedDriveIntegrityViolations.push(
        `Google Shared Drive source lacks a normalized observation path: ${sourceId}`,
      );
    }
  }
  if (
    remainingDriveTask?.status !== "open" ||
    !remainingDriveTask.publicNote.includes("remaining 96") ||
    photoReviewTask?.status !== "open" ||
    !photoReviewTask.successCriteria.some((item) => /rights, consent/i.test(item)) ||
    residencyReuseTask?.status !== "open" ||
    guidanceUseTask?.status !== "open" ||
    workflowExecutionTask?.status !== "open"
  ) {
    googleSharedDriveIntegrityViolations.push(
      "Unreviewed-drive or photo-review research state is incomplete",
    );
  }
  if (
    handoffClaim?.selectionState !== "selected" ||
    residencyHandoffClaim?.selectionState !== "selected" ||
    actionGuidanceClaim?.selectionState !== "selected" ||
    archiveWorkflowClaim?.selectionState !== "selected" ||
    styleGuideSeedClaim?.selectionState !== "dormant" ||
    !residencyHandoffClaim.researchTaskIds?.includes(
      "RT-GDRIVE-196-WORKFLOW-REUSE-CORROBORATION",
    ) ||
    !actionGuidanceClaim.researchTaskIds?.includes(
      "RT-GDRIVE-NYCAC-GUIDANCE-PUBLICATION-USE",
    ) ||
    !archiveWorkflowClaim.researchTaskIds?.includes(
      "RT-GDRIVE-ARCHIVE-WORKFLOW-EXECUTION",
    ) ||
    !styleGuideSeedClaim.researchTaskIds?.includes(
      "RT-GDRIVE-SBU-STYLE-GUIDE-COMPLETION",
    )
  ) {
    googleSharedDriveIntegrityViolations.push(
      "Google Shared Drive promotion and hold states are incomplete",
    );
  }
  if (
    !knowledgeBank.claims
      .find((claim) => claim.id === "CLM-CRS-COALITION-OPERATING-SYSTEM")
      ?.observationIds.includes("OBS-GDRIVE-CRS-REVISION-CREDIT")
  ) {
    googleSharedDriveIntegrityViolations.push(
      "CRS operating-system claim does not include the later Shared Drive revision evidence",
    );
  }
  if (
    /Privacy-aware archive overview workflow/.test(sharedDriveWorkData) ||
    /community-platform work/i.test(sharedDriveProofData) ||
    !/Jamie-attributed multi-action working draft later edited by a collaborator/.test(
      sharedDriveWorkData,
    ) ||
    !/collaborative running minutes/.test(
      knowledgeBank.claims
        .find((claim) => claim.id === "CLM-CRS-COALITION-OPERATING-SYSTEM")
        ?.projections.map((projection) => projection.text)
        .join(" ") ?? "",
    ) ||
    /reusable residency|reusable 196|reusable workflow for schedule/i.test(
      sharedDrivePublicText,
    ) ||
    /reusable residency|reusable 196/i.test(
      `${residencyHandoffClaim?.internalClaim ?? ""} ${residencyHandoffClaim?.projections
        .map((projection) => projection.text)
        .join(" ") ?? ""}`,
    )
  ) {
    googleSharedDriveSafetyViolations.push(
      "Downstream projection drift weakens a Shared Drive claim boundary",
    );
  }
  for (const sourceId of googleSharedDriveProtectedSourceIds) {
    const source = sourceById.get(sourceId);
    if (!source) continue;
    if (source.canonicalUrl || source.archiveUrl || source.assetUrl) {
      googleSharedDriveSafetyViolations.push(
        `Protected Shared Drive source exposes a public URL: ${sourceId}`,
      );
    }
    for (const claim of knowledgeBank.claims) {
      if (
        claim.evidence.some(
          (item) => item.sourceId === sourceId && item.renderCitation,
        )
      ) {
        googleSharedDriveSafetyViolations.push(
          `Protected Shared Drive source renders as a public citation: ${sourceId}`,
        );
      }
    }
  }
  if (
    !/CLM-GDRIVE-PORTABLE-HANDOFF-PRACTICE/.test(sharedDrivePublicText) ||
    !/CLM-GDRIVE-ARCHIVE-OVERVIEW-WORKFLOW/.test(sharedDrivePublicText) ||
    !/CLM-NYCAC-MULTI-ACTION-GUIDANCE-DRAFT/.test(sharedDrivePublicText) ||
    !/CLM-196-RESIDENCY-ONBOARDING-HANDOFF/.test(sharedDrivePublicText) ||
    !/revision-attributed residency acceptance and access handoff/i.test(
      sharedDrivePublicText,
    )
  ) {
    googleSharedDriveSafetyViolations.push(
      "Website projection omits a selected Shared Drive claim or its bounded artifact wording",
    );
  }
  const googleSharedDrivePayload = JSON.stringify({
    captures: googleSharedDriveCaptures,
    sources: googleSharedDriveSources,
    observations: googleSharedDriveObservations,
    claims: googleSharedDriveClaims,
    tasks: googleSharedDriveResearchTasks,
    inquiries: googleSharedDriveInquiries,
  });
  if (
    /\/Users\/|\/Volumes\/|drive\.google\.com|docs\.google\.com|permissionId|fileId|[\w.+-]+@[\w.-]+/i.test(
      googleSharedDrivePayload,
    )
  ) {
    googleSharedDriveSafetyViolations.push(
      "Google Shared Drive payload exposes a local path, Drive locator, or email address",
    );
  }

  const socialMediaIntegrityViolations = [];
  const socialMediaSafetyViolations = [];
  const socialMediaSourceIds = new Set(
    socialMediaSources.map((source) => source.id),
  );
  const socialMediaObservedSourceIds = new Set(
    socialMediaObservations.map((observation) => observation.sourceId),
  );
  const callNycSocialClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-CALLNYC-COUNCIL-SOCIAL-ENGAGEMENT",
  );
  const callNycGuidanceClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-CALLNYC-SOCIAL-PUBLIC-GUIDANCE",
  );
  const nycacSocialClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-NYCAC-COUNCIL-SOCIAL-ENGAGEMENT",
  );
  const nycacIdentityClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-NYCAC-SHARED-IDENTITY-STEWARDSHIP",
  );
  const nycacInfrastructureClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-NYCAC-SOCIAL-INFRASTRUCTURE",
  );
  const wowListSocialClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-WOWLIST-SOCIAL-PRODUCT-SURFACE",
  );
  const kcTownHallSocialClaim = socialMediaClaims.find(
    (claim) => claim.id === "CLM-KCTH-SOCIAL-OPERATING-SURFACE",
  );
  const laterNycacTask = socialMediaResearchTasks.find(
    (task) => task.id === "RT-SOCIAL-NYCAC-POST-2020-MENTION-INVENTORY",
  );
  const accountCorroborationTask = socialMediaResearchTasks.find(
    (task) =>
      task.id === "RT-SOCIAL-NYCAC-ACCOUNT-ESTABLISHMENT-CORROBORATION",
  );
  const nycacOwnerArchiveTask = socialMediaResearchTasks.find(
    (task) => task.id === "RT-SOCIAL-NYCAC-OWNER-ARCHIVE",
  );
  const callNycMissingPostsTask = socialMediaResearchTasks.find(
    (task) => task.id === "RT-SOCIAL-CALLNYC-UNMATERIALIZED-POSTS",
  );
  const kcTownHallTireTask = socialMediaResearchTasks.find(
    (task) => task.id === "RT-SOCIAL-KCTH-TIRE-OUTCOME-CORROBORATION",
  );
  const kcTownHallSurveyTask = socialMediaResearchTasks.find(
    (task) => task.id === "RT-SOCIAL-KCTH-SURVEY-AND-SITE-RECOVERY",
  );
  const socialMediaPublicText = [
    "apps/www/src/content/work/callnyc.mdx",
    "apps/www/src/content/work/fair-rent-nyc.mdx",
    "apps/www/src/content/work/wowlist.mdx",
    "apps/www/src/content/work/kc-town-hall.mdx",
    "apps/www/src/data/work.ts",
    "apps/www/src/data/knowledge-bank/public-registry.json",
  ]
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  if (
    socialMediaCaptures.length !== 8 ||
    socialMediaSources.length !== 66 ||
    socialMediaObservations.length !== 69 ||
    socialMediaClaims.length !== 7 ||
    socialMediaResearchTasks.length !== 7 ||
    socialMediaInquiries.length !== 7
  ) {
    socialMediaIntegrityViolations.push(
      "Social-media archival-production graph has an unexpected record count",
    );
  }
  const nycacInventoryRecords =
    socialMediaInventory.inventories.nycArtistCoalitionIncomingMentions2017To2020
      .records;
  const wowListInventoryRecords =
    socialMediaInventory.inventories.wowListProfileTimeline.records;
  const callNycPopulationRecords = callNycPopulationInventory.records;
  const callNycIncomingRecords =
    callNycPopulationInventory.incomingMentionSearch.records;
  const nycacPopulationRecords = nycacPopulationInventory.records;
  const nycacIncomingRecords =
    nycacPopulationInventory.post2020IncomingMentionInventory.records;
  const callNycPostsTimelineRecords = callNycPopulationRecords.filter((record) =>
    record.recoveredFrom?.includes("posts"),
  );
  const callNycRepliesTimelineRecords = callNycPopulationRecords.filter((record) =>
    record.recoveredFrom?.includes("replies"),
  );
  const wowListPopulationRecords = wowListPopulationInventory.records;
  const wowListIncomingRecords = wowListPopulationInventory.stakeholderInventory.records;
  const wowListPostsTimelineRecords = wowListPopulationRecords.filter((record) =>
    record.recoveredFrom?.includes("posts"),
  );
  const wowListRepliesTimelineRecords = wowListPopulationRecords.filter((record) =>
    record.recoveredFrom?.includes("replies"),
  );
  const kcTownHallPopulationRecords = kcTownHallPopulationInventory.records;
  const kcTownHallContextRecords =
    kcTownHallPopulationInventory.conversationContextRecords;
  const kcTownHallPostsTimelineRecords = kcTownHallPopulationRecords.filter(
    (record) => record.recoveredFrom?.includes("posts"),
  );
  const kcTownHallRepliesTimelineRecords = kcTownHallPopulationRecords.filter(
    (record) => record.recoveredFrom?.includes("replies"),
  );
  if (
    nycacInventoryRecords.length !== 358 ||
    new Set(nycacInventoryRecords.map((record) => record.url)).size !== 358 ||
    wowListInventoryRecords.length !== 38 ||
    new Set(wowListInventoryRecords.map((record) => record.url)).size !== 38 ||
    callNycPopulationRecords.length !== 107 ||
    new Set(callNycPopulationRecords.map((record) => record.url)).size !== 107 ||
    callNycPostsTimelineRecords.length !== 106 ||
    callNycRepliesTimelineRecords.length !== 107 ||
    callNycPopulationRecords.some(
      (record) =>
        !Array.isArray(record.recoveredFrom) ||
        !record.recoveredFrom.length ||
        record.recoveredFrom.some(
          (timeline) => !["posts", "replies"].includes(timeline),
        ),
    ) ||
    callNycIncomingRecords.length !== 11 ||
    new Set(callNycIncomingRecords.map((record) => record.url)).size !== 11 ||
    nycacPopulationRecords.length !== 3123 ||
    new Set(nycacPopulationRecords.map((record) => record.url)).size !== 3123 ||
    nycacIncomingRecords.length !== 98 ||
    new Set(nycacIncomingRecords.map((record) => record.url)).size !== 98 ||
    wowListPopulationRecords.length !== 38 ||
    new Set(wowListPopulationRecords.map((record) => record.url)).size !== 38 ||
    wowListPostsTimelineRecords.length !== 37 ||
    wowListRepliesTimelineRecords.length !== 38 ||
    wowListIncomingRecords.length !== 16 ||
    new Set(wowListIncomingRecords.map((record) => record.url)).size !== 16 ||
    kcTownHallPopulationRecords.length !== 183 ||
    new Set(kcTownHallPopulationRecords.map((record) => record.url)).size !== 183 ||
    kcTownHallPostsTimelineRecords.length !== 170 ||
    kcTownHallRepliesTimelineRecords.length !== 183 ||
    kcTownHallContextRecords.length !== 5 ||
    new Set(kcTownHallContextRecords.map((record) => record.url)).size !== 5 ||
    kcTownHallContextRecords.some((context) =>
      kcTownHallPopulationRecords.some((record) => record.url === context.url),
    )
  ) {
    socialMediaIntegrityViolations.push(
      "Social-media capture inventory is incomplete or contains duplicate status URLs",
    );
  }
  if (
    projectSocialAccounts.map((account) => account.currentHandle).join("|") !==
      "@CallNYCApp|@NYCArtC|@wowlist|@KCTownHall" ||
    socialMediaReviewSummary.callNycCouncilMemberAccountCount !== 8 ||
    socialMediaReviewSummary.callNycRecoveredTimelineRecordCount !== 107 ||
    socialMediaReviewSummary.callNycUnmaterializedProfileRecordCount !== 3 ||
    socialMediaReviewSummary.callNycCouncilRecognitionRecordCount !== 71 ||
    socialMediaReviewSummary.callNycCouncilHandlesCreditedCount !== 26 ||
    socialMediaReviewSummary.callNycDistinctIssueOrApiPathCount !== 62 ||
    socialMediaReviewSummary.callNycDistinctServiceDomainCount !== 16 ||
    socialMediaReviewSummary.callNycIncomingMentionRecordCount !== 11 ||
    socialMediaReviewSummary.nycacCouncilMemberAuthorCount2017To2020 !== 6 ||
    socialMediaReviewSummary.nycacMissionRelevantCouncilMemberAccountCount2017To2020 !==
      4 ||
    socialMediaReviewSummary.nycacHistoricalMentionRecordCount2017To2020 !==
      358 ||
    socialMediaReviewSummary.nycacRecoveredTimelineAndSearchRecordCount !==
      3123 ||
    socialMediaReviewSummary.nycacProfileCountNotMaterialized !== 2001 ||
    socialMediaReviewSummary.nycacRecoveredOriginalPostCount !== 608 ||
    socialMediaReviewSummary.nycacRecoveredReplyCount !== 77 ||
    socialMediaReviewSummary.nycacRecoveredRepostCount !== 2438 ||
    socialMediaReviewSummary.nycacOriginalAndReplyRecordCount !== 685 ||
    socialMediaReviewSummary.nycacExternalSourceNativeRepostRecordCount !==
      2438 ||
    socialMediaReviewSummary.nycacTimelineNativeRepostAppearanceCount !== 2440 ||
    socialMediaReviewSummary
      .nycacAccountAuthoredStatusAlsoSeenAsSelfRepostCount !== 2 ||
    socialMediaReviewSummary.nycacDistinctSourceAuthorCount !== 623 ||
    socialMediaReviewSummary.nycacDistinctExternalShortUrlCount !== 1161 ||
    socialMediaReviewSummary.nycacPost2020IncomingSearchRecordCount !== 98 ||
    socialMediaReviewSummary.nycacPost2020IncomingAuthorCount !== 43 ||
    socialMediaReviewSummary.nycacPost2020DirectMentionRecordCount !== 75 ||
    socialMediaReviewSummary.nycacPost2020DirectMentionAuthorCount !== 34 ||
    socialMediaReviewSummary.nycacPost2020ConversationContextRecordCount !== 23 ||
    socialMediaReviewSummary.wowListRecoveredTimelineRecordCount !== 38 ||
    socialMediaReviewSummary.wowListRecoveredOriginalPostCount !== 16 ||
    socialMediaReviewSummary.wowListRecoveredReplyCount !== 6 ||
    socialMediaReviewSummary.wowListRecoveredRepostCount !== 16 ||
    socialMediaReviewSummary.wowListAuthoredRecordCount !== 22 ||
    socialMediaReviewSummary.wowListDistinctExternalShortUrlCount !== 35 ||
    socialMediaReviewSummary.wowListIncomingSearchRecordCount !== 16 ||
    socialMediaReviewSummary.wowListMissionRelevantThirdPartyAccountCount !== 10 ||
    socialMediaReviewSummary.kcTownHallRecoveredTimelineRecordCount !== 183 ||
    socialMediaReviewSummary.kcTownHallRecoveredOriginalPostCount !== 142 ||
    socialMediaReviewSummary.kcTownHallRecoveredReplyCount !== 13 ||
    socialMediaReviewSummary.kcTownHallRecoveredRepostCount !== 28 ||
    socialMediaReviewSummary.kcTownHallAuthoredRecordCount !== 155 ||
    socialMediaReviewSummary.kcTownHallDistinctExternalShortUrlCount !== 31 ||
    socialMediaReviewSummary.kcTownHallDirectCouncilMemberAccountCount !== 3
  ) {
    socialMediaIntegrityViolations.push(
      "Social-media inventory no longer matches the bounded authenticated research record",
    );
  }
  if (
    callNycPopulationInventory.populationReconciliation.profileReportedPostCount !==
      110 ||
    callNycPopulationInventory.populationReconciliation.postsTimelineUniqueCount !==
      106 ||
    callNycPopulationInventory.populationReconciliation.repliesTimelineUniqueCount !==
      107 ||
    callNycPopulationInventory.populationReconciliation.recoveredUnionRecordCount !==
      107 ||
    callNycPopulationInventory.populationReconciliation.profileCountNotMaterialized !==
      3 ||
    callNycPopulationInventory.recordTypeCounts.original !== 86 ||
    callNycPopulationInventory.recordTypeCounts.reply !== 6 ||
    callNycPopulationInventory.recordTypeCounts.repost !== 15 ||
    callNycPopulationInventory.publishingPattern.callNycAuthoredRecordCount !== 92 ||
    callNycPopulationInventory.publishingPattern.councilRecognitionPatternRecordCount !==
      71 ||
    callNycPopulationInventory.publishingPattern.distinctCouncilMemberHandlesCredited !==
      26 ||
    callNycPopulationInventory.publishingPattern.callNycDeepLinkOccurrences !== 75 ||
    callNycPopulationInventory.publishingPattern.distinctCallNycIssueOrApiPaths !==
      62 ||
    callNycPopulationInventory.publishingPattern.distinctServiceDomains !== 16 ||
    callNycPopulationInventory.postedUrlInventory.distinctExternalShortUrls !== 84
  ) {
    socialMediaIntegrityViolations.push(
      "CallNYC full-population reconciliation or publishing-pattern counts drifted",
    );
  }
  if (
    nycacPopulationInventory.populationReconciliation.profileReportedPostCount !==
      5124 ||
    nycacPopulationInventory.populationReconciliation.postsTimelineUniqueCount !==
      764 ||
    nycacPopulationInventory.populationReconciliation
      .postsAndRepliesTimelinePrimaryCount !== 2698 ||
    nycacPopulationInventory.populationReconciliation.recoveredUnionRecordCount !==
      3123 ||
    nycacPopulationInventory.populationReconciliation.profileCountNotMaterialized !==
      2001 ||
    nycacPopulationInventory.recordTypeCounts.original !== 608 ||
    nycacPopulationInventory.recordTypeCounts.reply !== 77 ||
    nycacPopulationInventory.recordTypeCounts.repost !== 2438 ||
    nycacPopulationInventory.publishingPattern
      .accountOriginalAndReplyRecordCount !== 685 ||
    nycacPopulationInventory.publishingPattern
      .timelineNativeRepostAppearanceCount !==
      2440 ||
    nycacPopulationInventory.publishingPattern
      .externalSourceNativeRepostRecordCount !==
      2438 ||
    nycacPopulationInventory.publishingPattern
      .accountAuthoredStatusAlsoSeenAsSelfRepostCount !== 2 ||
    nycacPopulationInventory.publishingPattern
      .accountQuotePostReplyInheritanceCorrectionCount !== 15 ||
    !nycacPopulationInventory.publishingPattern.accountQuotePostReplyInheritanceCorrectionUrls.includes(
      "https://x.com/NYCArtC/status/1621553786790596609",
    ) ||
    nycacPopulationRecords.some(
      (record) =>
        nycacPopulationInventory.publishingPattern.accountQuotePostReplyInheritanceCorrectionUrls.includes(
          record.url,
        ) && record.recordType !== "original",
    ) ||
    nycacPopulationInventory.publishingPattern.distinctSourceAuthorCount !== 623 ||
    nycacPopulationInventory.postedUrlInventory.distinctExternalShortUrls !== 1161 ||
    nycacPopulationInventory.post2020IncomingMentionInventory.renderedRecordCount !==
      98 ||
    nycacPopulationInventory.post2020IncomingMentionInventory.distinctAuthorCount !==
      43 ||
    nycacPopulationInventory.post2020IncomingMentionInventory
      .directlyMatchingRecordCount !== 75 ||
    nycacPopulationInventory.post2020IncomingMentionInventory
      .directlyMatchingAuthorCount !== 34 ||
    nycacPopulationInventory.post2020IncomingMentionInventory
      .conversationContextRecordCount !== 23
  ) {
    socialMediaIntegrityViolations.push(
      "NYC Artist Coalition retrievable-population reconciliation, source, or stakeholder counts drifted",
    );
  }
  if (
    wowListPopulationInventory.populationReconciliation.profileReportedPostCount !== 38 ||
    wowListPopulationInventory.populationReconciliation.postsTimelineUniqueCount !== 37 ||
    wowListPopulationInventory.populationReconciliation.repliesTimelineUniqueCount !== 38 ||
    wowListPopulationInventory.populationReconciliation.recoveredUnionRecordCount !== 38 ||
    wowListPopulationInventory.populationReconciliation.profileCountNotMaterialized !== 0 ||
    wowListPopulationInventory.recordTypeCounts.original !== 16 ||
    wowListPopulationInventory.recordTypeCounts.reply !== 6 ||
    wowListPopulationInventory.recordTypeCounts.repost !== 16 ||
    wowListPopulationInventory.publishingPattern.accountAuthoredRecordCount !== 22 ||
    wowListPopulationInventory.postedUrlInventory.distinctExternalShortUrls !== 35 ||
    wowListPopulationInventory.stakeholderInventory.missionRelevantThirdPartyAccountCount !== 10
  ) {
    socialMediaIntegrityViolations.push(
      "WOW List full-population reconciliation, source, or stakeholder counts drifted",
    );
  }
  if (
    kcTownHallPopulationInventory.populationReconciliation.profileReportedPostCount !==
      183 ||
    kcTownHallPopulationInventory.populationReconciliation.postsTimelineUniqueCount !==
      170 ||
    kcTownHallPopulationInventory.populationReconciliation
      .repliesTimelineRenderedArticleCount !== 188 ||
    kcTownHallPopulationInventory.populationReconciliation
      .repliesTimelineConversationContextCount !== 5 ||
    kcTownHallPopulationInventory.populationReconciliation
      .repliesTimelinePrimaryRecordCount !== 183 ||
    kcTownHallPopulationInventory.populationReconciliation.recoveredUnionRecordCount !==
      183 ||
    kcTownHallPopulationInventory.populationReconciliation.profileCountNotMaterialized !==
      0 ||
    kcTownHallPopulationInventory.recordTypeCounts.original !== 142 ||
    kcTownHallPopulationInventory.recordTypeCounts.reply !== 13 ||
    kcTownHallPopulationInventory.recordTypeCounts.repost !== 28 ||
    kcTownHallPopulationInventory.publishingPattern.accountAuthoredRecordCount !== 155 ||
    kcTownHallPopulationInventory.publishingPattern.tireRelatedRecordCount !== 100 ||
    kcTownHallPopulationInventory.publishingPattern.surveyLinkedRecordCount !== 12 ||
    kcTownHallPopulationInventory.postedUrlInventory.distinctExternalShortUrls !== 31 ||
    kcTownHallPopulationInventory.stakeholderResponseInventory
      .directCouncilMemberAccountCount !== 3
  ) {
    socialMediaIntegrityViolations.push(
      "KC Town Hall full-population reconciliation, source, or stakeholder counts drifted",
    );
  }
  for (const sourceId of socialMediaSourceIds) {
    if (!sourceById.has(sourceId) || !socialMediaObservedSourceIds.has(sourceId)) {
      socialMediaIntegrityViolations.push(
        `Social-media source lacks a normalized observation path: ${sourceId}`,
      );
    }
  }
  if (
    callNycSocialClaim?.selectionState !== "selected" ||
    callNycSocialClaim?.publicationState !== "approved" ||
    callNycGuidanceClaim?.selectionState !== "selected" ||
    callNycGuidanceClaim?.publicationState !== "approved" ||
    nycacSocialClaim?.selectionState !== "selected" ||
    nycacSocialClaim?.publicationState !== "approved" ||
    nycacInfrastructureClaim?.selectionState !== "selected" ||
    nycacInfrastructureClaim?.publicationState !== "approved" ||
    wowListSocialClaim?.selectionState !== "selected" ||
    wowListSocialClaim?.publicationState !== "approved" ||
    kcTownHallSocialClaim?.selectionState !== "selected" ||
    kcTownHallSocialClaim?.publicationState !== "approved" ||
    nycacIdentityClaim?.selectionState !== "dormant" ||
    !nycacIdentityClaim?.projections.every(
      (projection) => projection.status === "hold" && !projection.surfaces.length,
    ) ||
    laterNycacTask?.status !== "complete" ||
    nycacOwnerArchiveTask?.status !== "blocked" ||
    accountCorroborationTask?.status !== "open" ||
    callNycMissingPostsTask?.status !== "open" ||
    kcTownHallTireTask?.status !== "open" ||
    kcTownHallSurveyTask?.status !== "open"
  ) {
    socialMediaIntegrityViolations.push(
      "Social-media promotion, hold, or open-research states are incomplete",
    );
  }
  for (const claim of [
    callNycSocialClaim,
    callNycGuidanceClaim,
    nycacSocialClaim,
    nycacInfrastructureClaim,
    wowListSocialClaim,
    kcTownHallSocialClaim,
  ]) {
    if (
      !claim ||
      !claim.observationIds.length ||
      !claim.evidence.length ||
      !claim.boundaries.length ||
      !claim.antiClaims.length
    ) {
      socialMediaIntegrityViolations.push(
        `Social-media selected claim has an incomplete evidence boundary: ${claim?.id ?? "missing"}`,
      );
    }
  }
  if (
    !/CLM-CALLNYC-COUNCIL-SOCIAL-ENGAGEMENT/.test(socialMediaPublicText) ||
    !/CLM-CALLNYC-SOCIAL-PUBLIC-GUIDANCE/.test(socialMediaPublicText) ||
    !/CLM-NYCAC-COUNCIL-SOCIAL-ENGAGEMENT/.test(socialMediaPublicText) ||
    !/CLM-NYCAC-SOCIAL-INFRASTRUCTURE/.test(socialMediaPublicText) ||
    !/CLM-WOWLIST-SOCIAL-PRODUCT-SURFACE/.test(socialMediaPublicText) ||
    !/CLM-KCTH-SOCIAL-OPERATING-SURFACE/.test(socialMediaPublicText) ||
    !/at least eight distinct historical NYC Council Member accounts/i.test(
      socialMediaPublicText,
    ) ||
    !/62 distinct service or API pathways spanning 16 service domains/i.test(
      socialMediaPublicText,
    ) ||
    !/at least four NYC Council Member accounts/i.test(socialMediaPublicText) ||
    !/reviewed every one of the 3,123 unique status URLs X made retrievable/i.test(
      socialMediaPublicText,
    ) ||
    !/cited knowledge record preserves the complete taxonomy, platform limits, and owner-archive boundary/i.test(
      socialMediaPublicText,
    ) ||
    !/2,001 profile-counted records outside the reviewed public surfaces/i.test(
      socialMediaPublicText,
    ) ||
    !/all 38 profile-counted/i.test(socialMediaPublicText) ||
    !/10 mission-relevant third-party accounts/i.test(socialMediaPublicText) ||
    !/all 183 profile-counted records/i.test(socialMediaPublicText) ||
    !/three sitting Kansas City Council Member accounts/i.test(
      socialMediaPublicText,
    ) ||
    !/product support, community onboarding, source curation, event distribution, and rapid civic coordination/i.test(
      socialMediaPublicText,
    )
  ) {
    socialMediaSafetyViolations.push(
      "Website projection omits a selected social-media claim or bounded wording",
    );
  }
  const protectedAccountSource = sourceById.get(
    "SRC-SOCIAL-JAMIE-ACCOUNT-STEWARDSHIP-2026",
  );
  if (
    protectedAccountSource?.canonicalUrl ||
    protectedAccountSource?.archiveUrl ||
    protectedAccountSource?.assetUrl ||
    nycacIdentityClaim?.evidence.some((evidence) => evidence.renderCitation) ||
    nycacIdentityClaim?.projections.some(
      (projection) => projection.status === "active" || projection.surfaces.length,
    )
  ) {
    socialMediaSafetyViolations.push(
      "Held account-establishment evidence leaks into a public citation or projection",
    );
  }
  const socialMediaPayload = JSON.stringify({
    captures: socialMediaCaptures,
    sources: socialMediaSources,
    observations: socialMediaObservations,
    claims: socialMediaClaims,
    tasks: socialMediaResearchTasks,
    inquiries: socialMediaInquiries,
  });
  if (
    /\/Users\/|\/Volumes\/|cookie|session token|direct messages|private messages/i.test(
      socialMediaPayload,
    ) ||
    /Jamie authored every @NYCArtC post\.(?![\s\S]*antiClaims)/i.test(
      socialMediaPayload,
    )
  ) {
    socialMediaSafetyViolations.push(
      "Social-media payload exposes authenticated-session detail, private locators, or shared-account authorship drift",
    );
  }
  if (
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i.test(
      JSON.stringify(socialMediaInventory),
    )
  ) {
    socialMediaSafetyViolations.push(
      "Public social-media inventory contains post text, session state, or a private path",
    );
  }
  if (
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i.test(
      JSON.stringify(callNycPopulationInventory),
    ) ||
    !/107 of 110/i.test(
      callNycPopulationInventory.populationReconciliation.conclusion,
    )
  ) {
    socialMediaSafetyViolations.push(
      "Public CallNYC population fixture contains raw post/session data or obscures the unrecovered-record boundary",
    );
  }
  if (
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i.test(
      JSON.stringify(nycacPopulationInventory),
    ) ||
    !/3,123 unique records/i.test(
      nycacPopulationInventory.populationReconciliation.conclusion,
    ) ||
    !/2,001 profile-counted records/i.test(
      nycacPopulationInventory.populationReconciliation.conclusion,
    ) ||
    !/not a complete archive/i.test(
      nycacPopulationInventory.post2020IncomingMentionInventory.boundary,
    )
  ) {
    socialMediaSafetyViolations.push(
      "Public NYC Artist Coalition population fixture contains raw post/session data or obscures denominator, source-authorship, or engagement boundaries",
    );
  }
  if (
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i.test(
      JSON.stringify(wowListPopulationInventory),
    ) ||
    !/Every one of the 38 records/i.test(
      wowListPopulationInventory.populationReconciliation.conclusion,
    )
  ) {
    socialMediaSafetyViolations.push(
      "Public WOW List population fixture contains raw post/session data or obscures the complete displayed denominator",
    );
  }
  if (
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\/|816-\d{3}-\d{4}/i.test(
      JSON.stringify(kcTownHallPopulationInventory),
    ) ||
    !/Every one of the 183 records/i.test(
      kcTownHallPopulationInventory.populationReconciliation.conclusion,
    ) ||
    !/Tags and mentions alone are not engagement/i.test(
      kcTownHallPopulationInventory.stakeholderResponseInventory.boundary,
    )
  ) {
    socialMediaSafetyViolations.push(
      "Public KC Town Hall population fixture contains raw post/contact/session data or obscures population and engagement boundaries",
    );
  }

  const urbanhermitIntegrityViolations = [];
  const urbanhermitSafetyViolations = [];
  const urbanhermitRecords = urbanhermitPopulationInventory.records;
  const urbanhermitContextRecords =
    urbanhermitPopulationInventory.conversationContextRecords;
  const urbanhermitIncomingRecords =
    urbanhermitPopulationInventory.stakeholderInventory.records;
  const urbanhermitMissionRelevantIncoming = urbanhermitIncomingRecords.filter(
    (record) => record.classification === "mission-relevant-third-party",
  );
  const urbanhermitMissionContextIncoming = urbanhermitIncomingRecords.filter(
    (record) =>
      record.classification === "mission-relevant-conversation-context",
  );
  const urbanhermitContextLimitedIncoming = urbanhermitIncomingRecords.filter(
    (record) =>
      record.classification === "context-limited-personal-or-network",
  );
  const urbanhermitPostsRecords = urbanhermitRecords.filter((record) =>
    record.recoveredFrom.includes("posts"),
  );
  const urbanhermitRepliesRecords = urbanhermitRecords.filter((record) =>
    record.recoveredFrom.includes("replies"),
  );
  const urbanhermitExternalLinks = urbanhermitRecords.flatMap(
    (record) => record.externalLinks,
  );
  const urbanhermitAuthoredRecords = urbanhermitRecords.filter(
    (record) => record.sourceAuthorship === "account-authored",
  );
  const urbanhermitAuthoredExternalLinks = urbanhermitAuthoredRecords.flatMap(
    (record) => record.externalLinks,
  );
  const urbanhermitRecordTypeTotal = Object.values(
    urbanhermitPopulationInventory.recordTypeCounts,
  ).reduce((sum, count) => sum + count, 0);
  const urbanhermitFixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json";
  const urbanhermitFixtureSource = sourceById.get(
    "SRC-URBANHERM-FULL-POPULATION-2026-07-15",
  );
  const urbanhermitArchiveClaim = claimById.get(
    "CLM-URBANHERM-PERSONAL-PUBLIC-WORKING-SURFACE",
  );
  const urbanhermitHorseLordsClaim = claimById.get(
    "CLM-URBANHERM-HORSE-LORDS-VIDEO",
  );
  const urbanhermitTunnelClaim = claimById.get(
    "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING",
  );
  const urbanhermitTireClaim = claimById.get(
    "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
  );
  const urbanhermitRules = new Map(
    urbanhermitPopulationInventory.missionSignalClassification.rules.map(
      (rule) => [rule.signalId, rule],
    ),
  );
  const urbanhermitMissionManifestValid =
    urbanhermitRules.size === 6 &&
    JSON.stringify(
      urbanhermitPopulationInventory.missionSignalClassification.rules,
    ) ===
      JSON.stringify(
        urbanhermitMissionSignalRules.map((rule) => ({
          signalId: rule.id,
          pattern: rule.pattern.source,
          flags: rule.pattern.flags,
        })),
      ) &&
    JSON.stringify(
      urbanhermitPopulationInventory.missionSignalClassification.inputFields,
    ) ===
      JSON.stringify([
        "source-post-body",
        "hashtag",
        "displayed-link-destination",
      ]) &&
    urbanhermitRecords.every((record) => {
      if (!/^[a-f0-9]{64}$/.test(record.classificationInputDigest ?? "")) {
        return false;
      }
      if (
        record.missionSignals.join("|") !==
        record.missionSignalEvidence
          .map((evidence) => evidence.signalId)
          .join("|")
      ) {
        return false;
      }
      return record.missionSignalEvidence.every((evidence) => {
        const rule = urbanhermitRules.get(evidence.signalId);
        return (
          rule &&
          urbanhermitPopulationInventory.missionSignalClassification.inputFields.includes(
            evidence.inputField,
          ) &&
          new RegExp(rule.pattern, rule.flags).test(evidence.matchedValue)
        );
      });
    });
  const urbanhermitExpectedSignalCounts = {
    "community-platforms-and-gatherings": 35,
    "civic-participation-and-service": 8,
    "cultural-space-advocacy": 45,
    "public-history-place-and-waterways": 2,
    "creative-technology-and-media": 4,
    "neighborhood-mutual-aid": 1,
  };

  if (
    urbanhermitCaptures.length !== 1 ||
    urbanhermitSources.length !== 10 ||
    urbanhermitObservations.length !== 12 ||
    urbanhermitClaims.length !== 4 ||
    urbanhermitResearchTasks.length !== 3 ||
    urbanhermitInquiries.length !== 1
  ) {
    urbanhermitIntegrityViolations.push(
      "Urbanhermit archival-production graph has an unexpected record count",
    );
  }
  if (
    urbanhermitRecords.length !== 434 ||
    new Set(urbanhermitRecords.map((record) => record.url)).size !== 434 ||
    urbanhermitRecordTypeTotal !== 434 ||
    urbanhermitPostsRecords.length !== 421 ||
    urbanhermitRepliesRecords.length !== 434 ||
    urbanhermitContextRecords.length !== 2 ||
    new Set(urbanhermitContextRecords.map((record) => record.url)).size !== 2 ||
    urbanhermitContextRecords.some((context) =>
      urbanhermitRecords.some((record) => record.url === context.url),
    ) ||
    urbanhermitRecords.some(
      (record) =>
        !Array.isArray(record.recoveredFrom) ||
        !record.recoveredFrom.length ||
        record.recoveredFrom.some(
          (surface) => !["posts", "replies"].includes(surface),
        ),
    )
  ) {
    urbanhermitIntegrityViolations.push(
      "Urbanhermit live-profile population is incomplete, duplicated, or does not reconcile by tab and conversation context",
    );
  }
  if (
    urbanhermitPopulationInventory.populationReconciliation
      .profileReportedPostCount !== 434 ||
    urbanhermitPopulationInventory.populationReconciliation
      .postsTimelineUniqueCount !== 421 ||
    urbanhermitPopulationInventory.populationReconciliation
      .repliesTimelineRenderedArticleCount !== 436 ||
    urbanhermitPopulationInventory.populationReconciliation
      .repliesTimelineConversationContextCount !== 2 ||
    urbanhermitPopulationInventory.populationReconciliation
      .repliesTimelinePrimaryRecordCount !== 434 ||
    urbanhermitPopulationInventory.populationReconciliation
      .recoveredUnionRecordCount !== 434 ||
    urbanhermitPopulationInventory.populationReconciliation
      .recoveredPopulationReviewedPercent !== 100 ||
    urbanhermitPopulationInventory.populationReconciliation
      .profileCountNotMaterialized !== 0 ||
    !/does not establish that no older post was deleted/i.test(
      urbanhermitPopulationInventory.populationReconciliation.boundary,
    )
  ) {
    urbanhermitIntegrityViolations.push(
      "Urbanhermit 434-profile / 421-Posts / 436-Replies-cards / 2-context reconciliation boundary is incomplete",
    );
  }
  if (
    urbanhermitPopulationInventory.recordTypeCounts.original !== 340 ||
    urbanhermitPopulationInventory.recordTypeCounts.reply !== 13 ||
    urbanhermitPopulationInventory.recordTypeCounts.repost !== 81 ||
    urbanhermitAuthoredRecords.length !== 353 ||
    urbanhermitAuthoredRecords.some(
      (record) =>
        record.authorHandle.toLowerCase() !== "@urbanhermit" ||
        !["original", "reply"].includes(record.recordType),
    ) ||
    urbanhermitRecords
      .filter((record) => record.recordType === "repost")
      .some(
        (record) =>
          record.sourceAuthorship !== "external-source-native-repost" ||
          record.authorHandle.toLowerCase() === "@urbanhermit",
      )
  ) {
    urbanhermitIntegrityViolations.push(
      "Urbanhermit source-authorship or record-type separation drifted",
    );
  }
  if (
    urbanhermitExternalLinks.length !== 349 ||
    new Set(urbanhermitExternalLinks.map((link) => link.shortUrl)).size !== 321 ||
    urbanhermitAuthoredExternalLinks.length !== 292 ||
    new Set(urbanhermitAuthoredExternalLinks.map((link) => link.shortUrl)).size !==
      277 ||
    !urbanhermitMissionManifestValid ||
    JSON.stringify(
      urbanhermitPopulationInventory.publishingPattern
        .missionSignalRecordCounts,
    ) !== JSON.stringify(urbanhermitExpectedSignalCounts)
  ) {
    urbanhermitIntegrityViolations.push(
      "Urbanhermit posted-link or mission-signal findings do not reproduce from the public fixture",
    );
  }
  if (
    urbanhermitIncomingRecords.length !== 26 ||
    new Set(urbanhermitIncomingRecords.map((record) => record.url)).size !== 26 ||
    urbanhermitMissionRelevantIncoming.length !== 15 ||
    new Set(
      urbanhermitMissionRelevantIncoming.map((record) => record.authorHandle),
    ).size !== 9 ||
    urbanhermitMissionContextIncoming.length !== 2 ||
    urbanhermitContextLimitedIncoming.length !== 9 ||
    Object.values(
      urbanhermitPopulationInventory.stakeholderInventory
        .stakeholderGroupCounts,
    ).reduce((sum, count) => sum + count, 0) !== 15
  ) {
    urbanhermitIntegrityViolations.push(
      "Urbanhermit bounded incoming-stakeholder classifications drifted",
    );
  }
  if (
    urbanhermitReviewSummary.profileReportedPostCount !== 434 ||
    urbanhermitReviewSummary.recoveredPopulationCount !== 434 ||
    urbanhermitReviewSummary.profileCountNotMaterialized !== 0 ||
    urbanhermitReviewSummary.postsTimelineUniqueCount !== 421 ||
    urbanhermitReviewSummary.repliesTimelineRenderedArticleCount !== 436 ||
    urbanhermitReviewSummary.conversationContextCount !== 2 ||
    urbanhermitReviewSummary.accountAuthoredRecordCount !== 353 ||
    urbanhermitReviewSummary.externalSourceNativeRepostRecordCount !== 81 ||
    urbanhermitReviewSummary.externalLinkOccurrences !== 349 ||
    urbanhermitReviewSummary.distinctExternalShortUrlCount !== 321 ||
    urbanhermitReviewSummary.incomingSearchRecordCount !== 26 ||
    urbanhermitReviewSummary.missionRelevantIncomingRecordCount !== 15 ||
    urbanhermitReviewSummary.missionRelevantIncomingAccountCount !== 9
  ) {
    urbanhermitIntegrityViolations.push(
      "Urbanhermit review summary no longer matches the authenticated research record",
    );
  }
  if (
    !immutableGitHubFixtureMatches(
      urbanhermitFixtureSource,
      urbanhermitFixturePath,
    )
  ) {
    urbanhermitIntegrityViolations.push(
      "Urbanhermit population source does not pin a byte-identical committed fixture",
    );
  }
  const urbanhermitSourcePathIds = new Set([
    ...urbanhermitObservations.map((observation) => observation.sourceId),
    ...urbanhermitClaims.flatMap((claim) =>
      claim.evidence.map((evidence) => evidence.sourceId),
    ),
    ...urbanhermitInquiries.flatMap((inquiry) => inquiry.sourceIds),
  ]);
  for (const source of urbanhermitSources) {
    if (!sourceById.has(source.id) || !urbanhermitSourcePathIds.has(source.id)) {
      urbanhermitIntegrityViolations.push(
        `Urbanhermit source lacks a normalized evidence path: ${source.id}`,
      );
    }
  }
  if (
    urbanhermitArchiveClaim?.selectionState !== "dormant" ||
    urbanhermitHorseLordsClaim?.selectionState !== "candidate" ||
    urbanhermitTunnelClaim?.selectionState !== "candidate" ||
    urbanhermitTireClaim?.selectionState !== "dormant" ||
    urbanhermitClaims.some(
      (claim) =>
        claim.publicationState !== "public-safe" ||
        !claim.evidence.length ||
        !claim.boundaries.length ||
        !claim.antiClaims.length,
    ) ||
    urbanhermitResearchTasks.find(
      (task) => task.id === "RT-URBANHERM-POSTED-SOURCE-CLOSE-READ",
    )?.status !== "in-progress" ||
    urbanhermitResearchTasks
      .filter(
        (task) => task.id !== "RT-URBANHERM-POSTED-SOURCE-CLOSE-READ",
      )
      .some((task) => task.status !== "open")
  ) {
    urbanhermitIntegrityViolations.push(
      "Urbanhermit claim selection, evidence boundary, or open-research state is incomplete",
    );
  }
  const urbanhermitPayload = JSON.stringify({
    captures: urbanhermitCaptures,
    sources: urbanhermitSources,
    observations: urbanhermitObservations,
    claims: urbanhermitClaims,
    tasks: urbanhermitResearchTasks,
    inquiries: urbanhermitInquiries,
  });
  if (
    /\/Users\/|\/Volumes\/|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/i.test(
      urbanhermitPayload,
    )
  ) {
    urbanhermitSafetyViolations.push(
      "Urbanhermit knowledge graph exposes a local path, email address, or phone number",
    );
  }
  if (
    /"(?:text|cookie|cookies|session|sessionToken|profileBiography)"\s*:|\/Users\/|\/Volumes\/|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/i.test(
      JSON.stringify(urbanhermitPopulationInventory),
    ) ||
    !/Raw post text/i.test(
      urbanhermitPopulationInventory.publicSafety.excluded,
    ) ||
    !urbanhermitArchiveClaim?.boundaries.some((boundary) =>
      /353 Jamie-authored.*81 external-source/i.test(boundary),
    ) ||
    !urbanhermitArchiveClaim?.antiClaims.some((antiClaim) =>
      /authored all 434/i.test(antiClaim),
    ) ||
    !urbanhermitArchiveClaim?.antiClaims.some((antiClaim) =>
      /complete owner archive/i.test(antiClaim),
    )
  ) {
    urbanhermitSafetyViolations.push(
      "Urbanhermit fixture or claim obscures raw-data, authorship, live-profile, or privacy boundaries",
    );
  }
  const urbanhermitPublicRouteHits = [
    ...urbanhermitClaims.flatMap((claim) =>
      claim.projections.flatMap((projection) =>
        projection.surfaces.filter((surface) => surface.startsWith("/")),
      ),
    ),
    ...candidateFiles.filter((path) => /urbanhermit.*page\.tsx$/i.test(path)),
  ];
  if (urbanhermitPublicRouteHits.length) {
    urbanhermitSafetyViolations.push(
      "Urbanhermit archival depth was projected to a public route without editorial selection",
    );
  }

  const nycacFacebookEventIntegrityViolations = [];
  const nycacFacebookEventSafetyViolations = [];
  const nycacFacebookEvents = nycacFacebookEventInventory.events ?? [];
  const nycacFacebookResponseEvents = nycacFacebookEvents.filter(
    (event) => event.responseSnapshot?.pointEstimate !== null,
  );
  const nycacFacebookResponsePointEstimate = nycacFacebookResponseEvents.reduce(
    (sum, event) => sum + event.responseSnapshot.pointEstimate,
    0,
  );
  const nycacFacebookFixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json";
  const nycacFacebookFixtureSource = sourceById.get(
    "SRC-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15",
  );
  const nycacFacebookInfrastructureClaim = claimById.get(
    "CLM-NYCAC-RECURRING-EVENT-INFRASTRUCTURE",
  );
  const nycacFacebookResponseClaim = claimById.get(
    "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SNAPSHOT",
  );
  const nycacFacebookJamieRoleClaim = claimById.get(
    "CLM-NYCAC-JAMIE-EVENT-SYSTEM-ROLE",
  );
  const nycacFacebookDemocracyLabClaim = claimById.get(
    "CLM-NYCAC-EVENTS-DEMOCRACY-LAB-INTERPRETATION",
  );
  const nycacFacebookPage = knowledgeBank.pages.find(
    (page) => page.id === "fair-rent-nyc",
  );

  if (
    nycacFacebookEventCaptures.length !== 1 ||
    nycacFacebookEventSources.length !== 13 ||
    nycacFacebookEventObservations.length !== 19 ||
    nycacFacebookEventClaims.length !== 4 ||
    nycacFacebookEventResearchTasks.length !== 4 ||
    nycacFacebookEventInquiries.length !== 1
  ) {
    nycacFacebookEventIntegrityViolations.push(
      "NYC Artist Coalition Facebook event graph has an unexpected record count",
    );
  }
  if (
    nycacFacebookEventInventory.populationReconciliation
      ?.pageDisplayedPastEventCount !== 34 ||
    nycacFacebookEventInventory.populationReconciliation
      ?.recoveredIndexEventCount !== 33 ||
    nycacFacebookEventInventory.populationReconciliation
      ?.recoveredDetailEventCount !== 33 ||
    nycacFacebookEventInventory.populationReconciliation
      ?.detailRetrievalFailureCount !== 0 ||
    nycacFacebookEventInventory.populationReconciliation
      ?.unmaterializedCount !== 1 ||
    nycacFacebookEventInventory.populationReconciliation?.terminalState
      ?.scrollRounds !== 9 ||
    nycacFacebookEventInventory.populationReconciliation?.terminalState
      ?.stableRounds !== 4 ||
    !/unmaterialized, not as nonexistent/i.test(
      nycacFacebookEventInventory.populationReconciliation
        ?.reconciliationNote ?? "",
    )
  ) {
    nycacFacebookEventIntegrityViolations.push(
      "NYC Artist Coalition Facebook 34-displayed / 33-exposed event reconciliation drifted",
    );
  }
  if (
    nycacFacebookEvents.length !== 33 ||
    new Set(nycacFacebookEvents.map((event) => event.id)).size !== 33 ||
    new Set(nycacFacebookEvents.map((event) => event.url)).size !== 33 ||
    nycacFacebookEvents.some(
      (event) =>
        event.url !== `https://www.facebook.com/events/${event.id}/` ||
        event.retrievalState !== "retrieved" ||
        !Array.isArray(event.topics) ||
        !event.topics.length,
    ) ||
    nycacFacebookEvents[0]?.date !== "2017-01-27" ||
    nycacFacebookEvents.at(-1)?.date !== "2021-01-29"
  ) {
    nycacFacebookEventIntegrityViolations.push(
      "NYC Artist Coalition Facebook event identities, retrieval states, topics, or chronology drifted",
    );
  }
  if (
    nycacFacebookEventInventory.aggregateSnapshot?.exposedEvents !== 33 ||
    nycacFacebookEventInventory.aggregateSnapshot
      ?.indexDisplayedNycacOrganizerEvents !== 24 ||
    nycacFacebookEventInventory.aggregateSnapshot?.alliedOrCohostedListings !==
      9 ||
    nycacFacebookEventInventory.aggregateSnapshot
      ?.eventsWithDisplayedResponseCount !== 32 ||
    nycacFacebookResponseEvents.length !== 32 ||
    nycacFacebookEventInventory.aggregateSnapshot
      ?.responseActionPointEstimate !== 9989 ||
    nycacFacebookResponsePointEstimate !== 9989 ||
    nycacFacebookEventInventory.aggregateSnapshot
      ?.roundedResponseCountEvents !== 3 ||
    nycacFacebookEventInventory.aggregateSnapshot
      ?.eventsAtOrAbove100Responses !== 19 ||
    nycacFacebookEventInventory.aggregateSnapshot
      ?.eventsAtOrAbove500Responses !== 7 ||
    nycacFacebookEventInventory.aggregateSnapshot
      ?.eventsAtOrAbove1000Responses !== 3
  ) {
    nycacFacebookEventIntegrityViolations.push(
      "NYC Artist Coalition Facebook organizer or response snapshot no longer reproduces from event rows",
    );
  }
  if (
    nycacFacebookEventInventory.postedSourceArticles?.length !== 7 ||
    !nycacFacebookEventInventory.postedSourceArticles.some(
      (article) =>
        article.publisher === "Gothamist" &&
        article.eventId === "1014934072187610",
    ) ||
    nycacFacebookEvents
      .flatMap((event) => event.outboundResources ?? [])
      .some((resource) => /fbclid=|zoom\.us|docs\.google\.com/i.test(resource.url))
  ) {
    nycacFacebookEventIntegrityViolations.push(
      "NYC Artist Coalition Facebook posted-source manifest is incomplete or unsanitized",
    );
  }
  if (
    !immutableGitHubFixtureMatches(
      nycacFacebookFixtureSource,
      nycacFacebookFixturePath,
    )
  ) {
    nycacFacebookEventIntegrityViolations.push(
      "NYC Artist Coalition Facebook population source does not pin a byte-identical committed fixture",
    );
  }
  const nycacFacebookSourcePathIds = new Set([
    ...nycacFacebookEventObservations.map((observation) => observation.sourceId),
    ...nycacFacebookEventClaims.flatMap((claim) =>
      claim.evidence.map((evidence) => evidence.sourceId),
    ),
    ...nycacFacebookEventInquiries.flatMap((inquiry) => inquiry.sourceIds),
  ]);
  for (const source of nycacFacebookEventSources) {
    if (!sourceById.has(source.id) || !nycacFacebookSourcePathIds.has(source.id)) {
      nycacFacebookEventIntegrityViolations.push(
        `NYC Artist Coalition Facebook source lacks a normalized evidence path: ${source.id}`,
      );
    }
  }
  if (
    nycacFacebookInfrastructureClaim?.selectionState !== "selected" ||
    nycacFacebookInfrastructureClaim.publicationState !== "approved" ||
    nycacFacebookResponseClaim?.selectionState !== "selected" ||
    nycacFacebookResponseClaim.publicationState !== "approved" ||
    nycacFacebookJamieRoleClaim?.selectionState !== "candidate" ||
    nycacFacebookJamieRoleClaim.projections.some(
      (projection) =>
        projection.surfaces.some((surface) => surface.startsWith("/")) &&
        projection.status !== "hold",
    ) ||
    nycacFacebookDemocracyLabClaim?.selectionState !== "dormant" ||
    nycacFacebookDemocracyLabClaim.status !== "inference" ||
    nycacFacebookEventResearchTasks.find(
      (task) => task.id === "RT-NYCAC-FB-JAMIE-EVENT-ROLE-CORROBORATION",
    )?.status !== "in-progress" ||
    nycacFacebookEventResearchTasks.find(
      (task) => task.id === "RT-NYCAC-FB-OUT-OF-INDEX-EVENT-CROSSWALK",
    )?.status !== "in-progress"
  ) {
    nycacFacebookEventIntegrityViolations.push(
      "NYC Artist Coalition Facebook claim selection or open-research state is incomplete",
    );
  }
  if (
    !nycacFacebookPage?.occurrences.some(
      (occurrence) =>
        occurrence.id === "recurring-event-infrastructure" &&
        occurrence.claimId === "CLM-NYCAC-RECURRING-EVENT-INFRASTRUCTURE",
    ) ||
    !nycacFacebookPage?.occurrences.some(
      (occurrence) =>
        occurrence.id === "facebook-event-response-snapshot" &&
        occurrence.claimId === "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SNAPSHOT",
    ) ||
    !/CLM-NYCAC-RECURRING-EVENT-INFRASTRUCTURE/.test(
      readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8"),
    ) ||
    !/CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SNAPSHOT/.test(
      readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8"),
    )
  ) {
    nycacFacebookEventIntegrityViolations.push(
      "NYC Artist Coalition Facebook selected claims are missing from the Fair Rent page plan or MDX",
    );
  }

  const nycacFacebookPayload = JSON.stringify({
    captures: nycacFacebookEventCaptures,
    sources: nycacFacebookEventSources,
    observations: nycacFacebookEventObservations,
    claims: nycacFacebookEventClaims,
    tasks: nycacFacebookEventResearchTasks,
    inquiries: nycacFacebookEventInquiries,
  });
  if (
    /\/Users\/|\/Volumes\/|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/i.test(
      nycacFacebookPayload,
    )
  ) {
    nycacFacebookEventSafetyViolations.push(
      "NYC Artist Coalition Facebook knowledge graph exposes a local path, email address, or phone number",
    );
  }
  if (
    /"(?:detailsText|description|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\/|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b|zoom\.us|docs\.google\.com|fbclid=/i.test(
      JSON.stringify(nycacFacebookEventInventory),
    ) ||
    nycacFacebookEventInventory.publicSafety?.rawDescriptionsPublished !==
      false ||
    nycacFacebookEventInventory.publicSafety?.attendeeIdentitiesPublished !==
      false ||
    nycacFacebookEventInventory.publicSafety?.contactDetailsPublished !== false ||
    nycacFacebookEventInventory.publicSafety?.accessCredentialsPublished !==
      false
  ) {
    nycacFacebookEventSafetyViolations.push(
      "NYC Artist Coalition Facebook public fixture exposes raw text, contact data, meeting access, or authenticated state",
    );
  }
  if (
    !nycacFacebookInfrastructureClaim?.antiClaims.some((antiClaim) =>
      /Jamie alone created or produced every/i.test(antiClaim),
    ) ||
    !nycacFacebookInfrastructureClaim?.boundaries.some((boundary) =>
      /34.*33|33.*34/i.test(boundary),
    ) ||
    !nycacFacebookResponseClaim?.antiClaims.some((antiClaim) =>
      /9,989 people attended/i.test(antiClaim),
    ) ||
    !nycacFacebookResponseClaim?.boundaries.some((boundary) =>
      /RSVP actions.*not unique people.*attendance/i.test(boundary),
    ) ||
    !nycacFacebookJamieRoleClaim?.boundaries.some((boundary) =>
      /first-hand.*not yet independently corroborated/i.test(boundary),
    )
  ) {
    nycacFacebookEventSafetyViolations.push(
      "NYC Artist Coalition Facebook claims obscure collective credit, denominator, RSVP, or individual-role boundaries",
    );
  }
  const nycacFacebookPublicText = [
    readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8"),
    ...nycacFacebookInfrastructureClaim.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text),
    ...nycacFacebookResponseClaim.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text),
  ].join("\n");
  if (
    /9,989 (?:people|attendees)|as verified attendance|always at a different/i.test(
      nycacFacebookPublicText,
    ) ||
    !/RSVP actions, not unique people or verified attendance/i.test(
      nycacFacebookPublicText,
    )
  ) {
    nycacFacebookEventSafetyViolations.push(
      "NYC Artist Coalition Facebook public projection overstates response, attendance, or venue rotation",
    );
  }

  const jamieWowListFacebookEventIntegrityViolations = [];
  const jamieWowListFacebookEventSafetyViolations = [];
  const jamieFacebookAccount =
    jamieWowListFacebookEventInventory.accounts?.jamieBurkart;
  const wowListFacebookAccount =
    jamieWowListFacebookEventInventory.accounts?.wowList;
  const jamieFacebookEvents = jamieFacebookAccount?.events ?? [];
  const jamieFacebookResponseEvents = jamieFacebookEvents.filter(
    (event) => Number.isInteger(event.displayedResponseCount),
  );
  const jamieFacebookResponseActions = jamieFacebookResponseEvents.reduce(
    (sum, event) => sum + event.displayedResponseCount,
    0,
  );
  const jamieFacebookExternalLinks = jamieFacebookEvents.flatMap(
    (event) => event.sourceLinks ?? [],
  );
  const jamieWowListFacebookFixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/jamie-wowlist-facebook-events-full-population.json";
  const jamieWowListFacebookFixtureSource = sourceById.get(
    "SRC-JAMIE-WOWLIST-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15",
  );
  const jamieFacebookPracticeClaim = claimById.get(
    "CLM-JAMIE-RECURRING-HOSTED-EVENT-PRACTICE",
  );
  const sundayDinnerMilestoneClaim = claimById.get(
    "CLM-196-FACEBOOK-MILESTONE-CHRONOLOGY",
  );
  const jamieFacebookResponseClaim = claimById.get(
    "CLM-JAMIE-FACEBOOK-EVENT-RESPONSE-SNAPSHOT",
  );
  const wowListFacebookLegacyGapClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-EVENT-LEGACY-GAP",
  );
  const sundayDinnerPage = knowledgeBank.pages.find(
    (page) => page.id === "196-sunday-dinner",
  );

  if (
    jamieWowListFacebookEventCaptures.length !== 1 ||
    jamieWowListFacebookEventSources.length !== 8 ||
    jamieWowListFacebookEventObservations.length !== 15 ||
    jamieWowListFacebookEventClaims.length !== 4 ||
    jamieWowListFacebookEventResearchTasks.length !== 4 ||
    jamieWowListFacebookEventInquiries.length !== 1
  ) {
    jamieWowListFacebookEventIntegrityViolations.push(
      "Jamie and WOW List Facebook event graph has an unexpected record count",
    );
  }
  if (
    jamieFacebookAccount?.displayedEventCount !== 21 ||
    jamieFacebookAccount?.materializedEventCount !== 21 ||
    jamieFacebookAccount?.detailRecoveredCount !== 17 ||
    jamieFacebookAccount?.indexOnlyCount !== 4 ||
    jamieFacebookAccount?.terminalNoGrowthPasses !== 6 ||
    jamieFacebookAccount?.coverageState !== "complete-as-materialized" ||
    jamieFacebookAccount?.dateRange?.start !== "2006-12-02" ||
    jamieFacebookAccount?.dateRange?.end !== "2019-02-24"
  ) {
    jamieWowListFacebookEventIntegrityViolations.push(
      "Jamie's Facebook 21-record hosted-event population reconciliation drifted",
    );
  }
  if (
    jamieFacebookEvents.length !== 21 ||
    new Set(jamieFacebookEvents.map((event) => event.eventId)).size !== 21 ||
    new Set(jamieFacebookEvents.map((event) => event.canonicalUrl)).size !== 21 ||
    jamieFacebookEvents.some(
      (event) =>
        event.canonicalUrl !==
          `https://www.facebook.com/events/${event.eventId}/` ||
        !["recovered", "index-only"].includes(event.detailState) ||
        !Array.isArray(event.themes) ||
        !event.themes.length,
    ) ||
    jamieFacebookEvents.filter((event) => event.detailState === "recovered")
      .length !== 17 ||
    jamieFacebookEvents.filter((event) => event.detailState === "index-only")
      .length !== 4 ||
    jamieFacebookEvents[0]?.date !== "2019-02-24" ||
    jamieFacebookEvents.at(-1)?.date !== "2006-12-02"
  ) {
    jamieWowListFacebookEventIntegrityViolations.push(
      "Jamie's Facebook event identities, detail states, themes, or chronology drifted",
    );
  }
  if (
    jamieFacebookEvents.filter((event) => /Sunday Dinner/i.test(event.title))
      .length !== 6 ||
    !jamieFacebookEvents.some(
      (event) => event.eventId === "702417306475691" && /100/.test(event.title),
    ) ||
    !jamieFacebookEvents.some(
      (event) =>
        event.eventId === "551536301637994" &&
        /200/.test(event.title) &&
        event.sourceLinks.some(
          (link) =>
            link.url ===
            "https://wowlist.org/events/22791/sunday-dinner-200",
        ),
    ) ||
    jamieFacebookResponseEvents.length !== 17 ||
    jamieFacebookResponseActions !== 608 ||
    jamieFacebookResponseEvents.filter(
      (event) => event.displayedResponseCount >= 20,
    ).length !== 8 ||
    jamieFacebookResponseEvents.filter(
      (event) => event.displayedResponseCount >= 100,
    ).length !== 3 ||
    jamieFacebookEvents.filter((event) => event.sourceLinks.length).length !==
      7 ||
    jamieFacebookExternalLinks.length !== 16
  ) {
    jamieWowListFacebookEventIntegrityViolations.push(
      "Jamie's Sunday Dinner, response, or event-linked source findings no longer reproduce from event rows",
    );
  }
  if (
    wowListFacebookAccount?.materializedEventCount !== 0 ||
    wowListFacebookAccount?.coverageState !==
      "complete-as-materialized-with-legacy-gap" ||
    wowListFacebookAccount?.surfaceFindings?.length !== 2 ||
    wowListFacebookAccount.surfaceFindings.some(
      (surface) => surface.materializedEventCount !== 0,
    ) ||
    !/does not establish.*no historical/i.test(
      wowListFacebookAccount?.boundary ?? "",
    )
  ) {
    jamieWowListFacebookEventIntegrityViolations.push(
      "WOW List current-surface zero or legacy-recovery boundary drifted",
    );
  }
  if (
    !immutableGitHubFixtureMatches(
      jamieWowListFacebookFixtureSource,
      jamieWowListFacebookFixturePath,
    )
  ) {
    jamieWowListFacebookEventIntegrityViolations.push(
      "Jamie and WOW List Facebook population source does not pin a byte-identical committed fixture",
    );
  }
  const jamieWowListFacebookSourcePathIds = new Set([
    ...jamieWowListFacebookEventObservations.map(
      (observation) => observation.sourceId,
    ),
    ...jamieWowListFacebookEventClaims.flatMap((claim) =>
      claim.evidence.map((evidence) => evidence.sourceId),
    ),
    ...jamieWowListFacebookEventInquiries.flatMap(
      (inquiry) => inquiry.sourceIds,
    ),
  ]);
  for (const source of jamieWowListFacebookEventSources) {
    if (
      !sourceById.has(source.id) ||
      !jamieWowListFacebookSourcePathIds.has(source.id)
    ) {
      jamieWowListFacebookEventIntegrityViolations.push(
        `Jamie and WOW List Facebook source lacks a normalized evidence path: ${source.id}`,
      );
    }
  }
  if (
    jamieWowListFacebookEventReviewSummary.personalHostedEvents !== 21 ||
    jamieWowListFacebookEventReviewSummary.personalDetailsRecovered !== 17 ||
    jamieWowListFacebookEventReviewSummary.personalIndexOnly !== 4 ||
    jamieWowListFacebookEventReviewSummary.sundayDinnerRecords !== 6 ||
    jamieWowListFacebookEventReviewSummary.eventLinkedUrls !== 16 ||
    jamieWowListFacebookEventReviewSummary.eventsWithResponseTotals !== 17 ||
    jamieWowListFacebookEventReviewSummary.displayedResponseActions !== 608 ||
    jamieWowListFacebookEventReviewSummary.wowListCurrentMaterializedEvents !== 0 ||
    jamieFacebookPracticeClaim?.selectionState !== "candidate" ||
    sundayDinnerMilestoneClaim?.selectionState !== "selected" ||
    sundayDinnerMilestoneClaim.publicationState !== "approved" ||
    jamieFacebookResponseClaim?.selectionState !== "dormant" ||
    wowListFacebookLegacyGapClaim?.selectionState !== "dormant" ||
    wowListFacebookLegacyGapClaim?.status !== "not-recovered"
  ) {
    jamieWowListFacebookEventIntegrityViolations.push(
      "Jamie and WOW List Facebook review summary or claim selection state is incomplete",
    );
  }
  if (
    !sundayDinnerPage?.occurrences.some(
      (occurrence) =>
        occurrence.id === "facebook-milestone-chronology" &&
        occurrence.claimId === "CLM-196-FACEBOOK-MILESTONE-CHRONOLOGY",
    ) ||
    !/CLM-196-FACEBOOK-MILESTONE-CHRONOLOGY/.test(
      readFileSync("apps/www/src/content/work/196-sunday-dinner.mdx", "utf8"),
    )
  ) {
    jamieWowListFacebookEventIntegrityViolations.push(
      "The selected Sunday Dinner Facebook chronology is missing from the page plan or MDX",
    );
  }

  const jamieWowListFacebookPayload = JSON.stringify({
    captures: jamieWowListFacebookEventCaptures,
    sources: jamieWowListFacebookEventSources,
    observations: jamieWowListFacebookEventObservations,
    claims: jamieWowListFacebookEventClaims,
    tasks: jamieWowListFacebookEventResearchTasks,
    inquiries: jamieWowListFacebookEventInquiries,
  });
  if (
    /\/Users\/|\/Volumes\/|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/i.test(
      jamieWowListFacebookPayload,
    )
  ) {
    jamieWowListFacebookEventSafetyViolations.push(
      "Jamie and WOW List Facebook knowledge graph exposes a local path, email address, or phone number",
    );
  }
  const jamieWowListFacebookFixturePayload = JSON.stringify(
    jamieWowListFacebookEventInventory,
  );
  if (
    /"(?:description|attendees|friends|contact|cookie|cookies|session|sessionToken|credentials)"\s*:|\/Users\/|\/Volumes\/|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/i.test(
      jamieWowListFacebookFixturePayload,
    ) ||
    !/excludes raw event descriptions.*residential street addresses.*authenticated-session state/i.test(
      jamieWowListFacebookEventInventory.privacyBoundary ?? "",
    )
  ) {
    jamieWowListFacebookEventSafetyViolations.push(
      "Jamie and WOW List Facebook public fixture exposes raw text, private identity, address, contact, or authenticated state",
    );
  }
  if (
    !jamieFacebookPracticeClaim?.boundaries.some((boundary) =>
      /not sole producer/i.test(boundary),
    ) ||
    !jamieFacebookResponseClaim?.antiClaims.some((antiClaim) =>
      /608 people attended/i.test(antiClaim),
    ) ||
    !jamieFacebookResponseClaim?.boundaries.some((boundary) =>
      /not unique people.*attendance.*impact/i.test(boundary),
    ) ||
    !sundayDinnerMilestoneClaim?.boundaries.some((boundary) =>
      /not the full project population/i.test(boundary),
    ) ||
    !wowListFacebookLegacyGapClaim?.antiClaims.some((antiClaim) =>
      /never created Facebook events/i.test(antiClaim),
    )
  ) {
    jamieWowListFacebookEventSafetyViolations.push(
      "Jamie and WOW List Facebook claims obscure role, denominator, response, or legacy-history boundaries",
    );
  }
  const jamieWowListPublicText = [
    readFileSync("apps/www/src/content/work/196-sunday-dinner.mdx", "utf8"),
    ...sundayDinnerMilestoneClaim.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text),
  ].join("\n");
  if (
    /608 (?:people|attendees)|verified attendance|WOW List never (?:created|hosted)/i.test(
      jamieWowListPublicText,
    ) ||
    !/six Sunday Dinner event records.*100th.*200th/i.test(
      jamieWowListPublicText,
    )
  ) {
    jamieWowListFacebookEventSafetyViolations.push(
      "The Sunday Dinner public projection overstates response, history, or the selected chronology",
    );
  }

  const wowListFacebookPostIntegrityViolations = [];
  const wowListFacebookPostSafetyViolations = [];
  const wowListFacebookPosts = wowListFacebookPostInventory.records ?? [];
  const wowListFacebookPostFixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json";
  const wowListFacebookPostFixtureSource = sourceById.get(
    "SRC-WOWLIST-FACEBOOK-POSTS-FULL-POPULATION-2026-07-15",
  );
  const wowListFacebookStewardshipClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP",
  );
  const wowListFacebookDistributionClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-MISSION-DISTRIBUTION",
  );
  const wowListFacebookMetricClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-DASHBOARD-SNAPSHOT",
  );
  const wowListFacebookMigrationClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-MANAGEMENT-MIGRATION-GAP",
  );
  const wowListPage = knowledgeBank.pages.find((page) => page.id === "wowlist");

  if (
    wowListFacebookPostCaptures.length !== 1 ||
    wowListFacebookPostSources.length !== 4 ||
    wowListFacebookPostObservations.length !== 9 ||
    wowListFacebookPostClaims.length !== 4 ||
    wowListFacebookPostResearchTasks.length !== 4 ||
    wowListFacebookPostInquiries.length !== 1
  ) {
    wowListFacebookPostIntegrityViolations.push(
      "WOW List Facebook post graph has an unexpected record count",
    );
  }
  if (
    wowListFacebookPosts.length !== 54 ||
    new Set(wowListFacebookPosts.map((post) => post.postId)).size !== 54 ||
    new Set(wowListFacebookPosts.map((post) => post.canonicalUrl)).size !== 54 ||
    wowListFacebookPosts.some(
      (post, index) =>
        post.ordinal !== index + 1 ||
        post.canonicalUrl !==
          `https://www.facebook.com/wowlist/posts/${post.postId}` ||
        !["recovered", "table-only"].includes(post.detailRecovery) ||
        !Array.isArray(post.themes) ||
        !post.themes.length,
    ) ||
    wowListFacebookPosts[0]?.publishedOn !== "2018-03-22" ||
    wowListFacebookPosts.at(-1)?.publishedOn !== "2015-04-25"
  ) {
    wowListFacebookPostIntegrityViolations.push(
      "WOW List Facebook post identities, dispositions, themes, or chronology drifted",
    );
  }
  if (
    wowListFacebookPostInventory.populationReconciliation
      ?.coverageState !== "complete-as-materialized" ||
    wowListFacebookPostInventory.populationReconciliation
      ?.materializedRecordCount !== 54 ||
    wowListFacebookPostInventory.populationReconciliation
      ?.detailRecoveredCount !== 50 ||
    wowListFacebookPostInventory.populationReconciliation?.tableOnlyCount !==
      4 ||
    wowListFacebookPosts.filter(
      (post) => post.publisherAttribution === "Jamie Burkart",
    ).length !== 50 ||
    wowListFacebookPosts.filter(
      (post) => post.publisherAttribution === "not-recovered",
    ).length !== 4 ||
    wowListFacebookPostInventory.publishingAttribution
      ?.recoveredDetailsAttributedToJamieBurkart !== 50
  ) {
    wowListFacebookPostIntegrityViolations.push(
      "WOW List Facebook post denominator or publisher-attribution reconciliation drifted",
    );
  }
  const wowListFacebookNormalizedLinks = new Set(
    wowListFacebookPosts.flatMap((post) => post.sourceLinks ?? []),
  );
  if (
    wowListFacebookPostInventory.linkInventory?.normalizedDistinctUrlCount !==
      42 ||
    wowListFacebookNormalizedLinks.size !== 42 ||
    wowListFacebookPostInventory.linkInventory?.detailRawDistinctUrlCount !==
      48 ||
    wowListFacebookPostInventory.missionPatterns?.recordCounts?.[
      "community-calendar-onboarding"
    ] !== 18 ||
    wowListFacebookPostInventory.missionPatterns?.recordCounts?.[
      "event-and-artist-distribution"
    ] !== 17 ||
    wowListFacebookPostInventory.missionPatterns?.recordCounts?.[
      "cultural-space-support-and-mutual-aid"
    ] !== 19 ||
    wowListFacebookPostInventory.missionPatterns?.recordCounts?.[
      "civic-mobilization"
    ] !== 12 ||
    wowListFacebookPostInventory.missionPatterns?.recordCounts?.[
      "community-governance-and-product-feedback"
    ] !== 13
  ) {
    wowListFacebookPostIntegrityViolations.push(
      "WOW List Facebook link inventory or mission-pattern counts drifted",
    );
  }
  if (
    wowListFacebookPostInventory.adminMetricSnapshot?.interactions !== 108 ||
    wowListFacebookPostInventory.adminMetricSnapshot?.impressions !== 512 ||
    wowListFacebookPostInventory.adminMetricSnapshot?.comments !== 11 ||
    wowListFacebookPostInventory.currentPageSnapshot?.followers !== 185 ||
    wowListFacebookPostInventory.unresolvedRecords?.length !== 4
  ) {
    wowListFacebookPostIntegrityViolations.push(
      "WOW List Facebook metric snapshot or unresolved-record inventory drifted",
    );
  }
  if (
    !immutableGitHubFixtureMatches(
      wowListFacebookPostFixtureSource,
      wowListFacebookPostFixturePath,
    )
  ) {
    wowListFacebookPostIntegrityViolations.push(
      "WOW List Facebook post source does not pin a byte-identical committed fixture",
    );
  }
  const wowListFacebookPostSourcePathIds = new Set([
    ...wowListFacebookPostObservations.map((observation) => observation.sourceId),
    ...wowListFacebookPostClaims.flatMap((claim) =>
      claim.evidence.map((evidence) => evidence.sourceId),
    ),
    ...wowListFacebookPostInquiries.flatMap((inquiry) => inquiry.sourceIds),
  ]);
  for (const source of wowListFacebookPostSources) {
    if (
      !sourceById.has(source.id) ||
      !wowListFacebookPostSourcePathIds.has(source.id)
    ) {
      wowListFacebookPostIntegrityViolations.push(
        `WOW List Facebook post source lacks a normalized evidence path: ${source.id}`,
      );
    }
  }
  if (
    wowListFacebookPostReviewSummary.records !== 54 ||
    wowListFacebookPostReviewSummary.detailsRecovered !== 50 ||
    wowListFacebookPostReviewSummary.tableOnly !== 4 ||
    wowListFacebookPostReviewSummary.detailsAttributedToJamie !== 50 ||
    wowListFacebookPostReviewSummary.normalizedDestinations !== 42 ||
    wowListFacebookStewardshipClaim?.publicationState !== "approved" ||
    wowListFacebookStewardshipClaim?.selectionState !== "selected" ||
    wowListFacebookDistributionClaim?.selectionState !== "candidate" ||
    wowListFacebookMetricClaim?.selectionState !== "dormant" ||
    wowListFacebookMigrationClaim?.selectionState !== "dormant" ||
    wowListFacebookMigrationClaim?.status !== "not-recovered"
  ) {
    wowListFacebookPostIntegrityViolations.push(
      "WOW List Facebook review summary or claim selection state is incomplete",
    );
  }
  const wowListMdx = readFileSync(
    "apps/www/src/content/work/wowlist.mdx",
    "utf8",
  );
  const stewardshipMdxOccurrences = (
    wowListMdx.match(/CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP/g) ?? []
  ).length;
  if (
    stewardshipMdxOccurrences !== 1 ||
    !wowListPage?.occurrences.some(
      (occurrence) =>
        occurrence.id === "facebook-publishing-stewardship" &&
        occurrence.claimId ===
          "CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP",
    )
  ) {
    wowListFacebookPostIntegrityViolations.push(
      "The selected WOW List Facebook stewardship proof is not projected exactly once",
    );
  }

  const wowListFacebookPostPayload = JSON.stringify({
    captures: wowListFacebookPostCaptures,
    sources: wowListFacebookPostSources,
    observations: wowListFacebookPostObservations,
    claims: wowListFacebookPostClaims,
    tasks: wowListFacebookPostResearchTasks,
    inquiries: wowListFacebookPostInquiries,
  });
  const wowListFacebookPostFixturePayload = JSON.stringify(
    wowListFacebookPostInventory,
  );
  if (
    /\/Users\/|\/Volumes\/|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/i.test(
      wowListFacebookPostPayload,
    ) ||
    /"(?:content|text|description|commenters|reactors|friends|privateProfile|cookie|cookies|session|sessionToken|credentials)"\s*:/i.test(
      wowListFacebookPostFixturePayload,
    ) ||
    /\/Users\/|\/Volumes\/|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b/i.test(
      wowListFacebookPostFixturePayload,
    ) ||
    wowListFacebookPostInventory.publicSafety?.rawPostTextPublished !== false ||
    wowListFacebookPostInventory.publicSafety?.commenterIdentitiesPublished !==
      false ||
    wowListFacebookPostInventory.publicSafety
      ?.authenticatedSessionDataPublished !== false
  ) {
    wowListFacebookPostSafetyViolations.push(
      "WOW List Facebook public graph or fixture exposes raw text, private identity, contact, local path, or authenticated state",
    );
  }
  if (
    !wowListFacebookStewardshipClaim?.boundaries.some((boundary) =>
      /co-built.*Richard Album/i.test(boundary),
    ) ||
    !wowListFacebookStewardshipClaim?.boundaries.some((boundary) =>
      /not sole authorship/i.test(boundary),
    ) ||
    !wowListFacebookStewardshipClaim?.antiClaims.some((antiClaim) =>
      /all 54.*byline/i.test(antiClaim),
    ) ||
    !wowListFacebookMetricClaim?.boundaries.some((boundary) =>
      /not historical lifetime reach.*unique people.*attendance.*impact/i.test(
        boundary,
      ),
    ) ||
    !wowListFacebookMetricClaim?.antiClaims.some((antiClaim) =>
      /stakeholder groups/i.test(antiClaim),
    ) ||
    !wowListFacebookMigrationClaim?.antiClaims.some((antiClaim) =>
      /migrated-interface zero/i.test(antiClaim),
    )
  ) {
    wowListFacebookPostSafetyViolations.push(
      "WOW List Facebook claims obscure co-builder, authorship, metric, stakeholder, or migration boundaries",
    );
  }
  const wowListPublicText = [
    wowListMdx,
    ...wowListFacebookStewardshipClaim.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text),
  ].join("\n");
  if (
    /54 (?:posts|records).*Published by Jamie|512 (?:people|users)|108 historical|sole (?:creator|owner|author)/i.test(
      wowListPublicText,
    ) ||
    !/50 of 50.*four additional records remain table-only/i.test(
      wowListPublicText,
    ) ||
    !/co-built with Richard Album/i.test(wowListPublicText)
  ) {
    wowListFacebookPostSafetyViolations.push(
      "The WOW List public projection overstates attribution, metrics, ownership, or denominator completeness",
    );
  }

  const invalidClaimStates = knowledgeBank.claims.filter((claim) => {
    const activePublic = claim.projections.some(
      (projection) =>
        projection.status === "active" &&
        projection.surfaces.some((surface) => surface.startsWith("/")),
    );
    return (
      activePublic &&
      (!["sourced", "corroborated"].includes(claim.epistemicState) ||
        claim.publicationState !== "approved" ||
        claim.selectionState !== "selected")
    );
  });

  const promotedLineageViolations = developmentClaims.filter((claim) => {
    const isPromoted =
      claim.status === "confirmed" ||
      claim.status === "confirmed-with-boundary";
    if (!isPromoted) return false;
    if (!claim.evidence.length || !claim.observationIds.length) return true;
    return claim.observationIds.some((id) => {
      const observation = observationById.get(id);
      return (
        !observation ||
        !claim.evidence.some(
          (evidence) => evidence.sourceId === observation.sourceId,
        )
      );
    });
  });

  const activeDevelopmentProjectionViolations = developmentClaims.filter(
    (claim) =>
      claim.projections.some(
        (projection) =>
          projection.status === "active" &&
          projection.surfaces.some((surface) => surface.startsWith("/")) &&
          (claim.publicationState !== "approved" ||
            claim.selectionState !== "selected"),
      ),
  );

  const inferenceWithoutTask = developmentClaims.filter(
    (claim) =>
      claim.epistemicState === "unreviewed" &&
      !knowledgeBank.researchTasks.some(
        (task) =>
          task.claimIds.includes(claim.id) && task.status !== "complete",
      ),
  );
  const unresolvedWithoutTask = unresolvedCaptures.filter(
    (capture) => !capture.researchTaskIds.some((id) => taskById.has(id)),
  );
  const brokenCaptureRefs = knowledgeBank.captures.flatMap((capture) => [
    ...capture.sourceIds
      .filter((id) => !sourceById.has(id))
      .map((id) => `${capture.id}->${id}`),
    ...capture.observationIds
      .filter((id) => !observationById.has(id))
      .map((id) => `${capture.id}->${id}`),
    ...capture.researchTaskIds
      .filter((id) => !taskById.has(id))
      .map((id) => `${capture.id}->${id}`),
  ]);
  const brokenObservationRefs = knowledgeBank.observations.flatMap(
    (observation) => [
      ...(!sourceById.has(observation.sourceId)
        ? [`${observation.id}->${observation.sourceId}`]
        : []),
      ...observation.supportsClaimIds
        .filter((id) => !claimById.has(id))
        .map((id) => `${observation.id}->${id}`),
    ],
  );
  const integratedWithoutPath = knowledgeBank.captures.filter(
    (capture) =>
      capture.status === "integrated" &&
      !capture.researchTaskIds.length &&
      !(capture.sourceIds.length && capture.observationIds.length),
  );
  const validationErrors = validateKnowledgeBank({ includePublicFiles: false });
  const privateMarkerPattern =
    /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|raw transcript|private email/i;
  const privateMarkerHits =
    JSON.stringify({
      captures: knowledgeBank.captures,
      observations: knowledgeBank.observations,
      researchTasks: knowledgeBank.researchTasks,
    }).match(privateMarkerPattern) ?? [];
  const routeViolations = [
    "apps/www/src/app/proofs",
    "apps/www/src/app/knowledge-bank",
    "apps/www/src/app/public-claims",
  ].filter((path) => existsSync(path));

  const results = new Map();
  results.set(
    "KD-001",
    result(
      scoreRatio(routedCaptures.length, knowledgeBank.captures.length),
      [
        `${routedCaptures.length}/${knowledgeBank.captures.length} captures integrated, tasked, or closed`,
      ],
      unresolvedWithoutTask.map((capture) => `Unrouted capture: ${capture.id}`),
      "Route every capture to a normalized source or bounded research task.",
    ),
  );
  results.set(
    "KD-002",
    result(
      Math.min(
        scoreRatio(routedUrls.length, urlCaptures.length),
        developmentSources.length ? 4 : 0,
      ),
      [
        `${routedUrls.length}/${urlCaptures.length} URL captures routed`,
        `${developmentSources.length} normalized development sources`,
      ],
      urlCaptures
        .filter(
          (capture) =>
            !capture.sourceIds.length && !capture.researchTaskIds.length,
        )
        .map((capture) => `Unresolved URL: ${capture.id}`),
      "Normalize retrieved sources and create retrieval tasks for inaccessible candidates.",
    ),
  );
  results.set(
    "KD-003",
    result(
      Math.min(
        scoreRatio(sourcesWithObservations.length, developmentSources.length),
        developmentObservations.length ? 4 : 0,
      ),
      [
        `${sourcesWithObservations.length}/${developmentSources.length} development sources decomposed`,
        `${developmentObservations.length} atomic observations`,
      ],
      developmentSources
        .filter((source) => !sourcesWithObservations.includes(source))
        .map((source) => `No observation: ${source.id}`),
      "Decompose each integrated source into located, limited observations.",
    ),
  );
  results.set(
    "KD-004",
    result(
      invalidClaimStates.length
        ? Math.max(0, 4 - invalidClaimStates.length)
        : 4,
      [
        `${knowledgeBank.claims.length} claims declare three independent states`,
      ],
      invalidClaimStates.map(
        (claim) => `Invalid active-public state: ${claim.id}`,
      ),
      "Hold any projection whose epistemic, publication, or selection state is not ready.",
    ),
  );
  results.set(
    "KD-005",
    result(
      developmentClaims.length >= 4 &&
        !promotedLineageViolations.length &&
        !activeDevelopmentProjectionViolations.length
        ? 4
        : developmentClaims.length
          ? 2
          : 1,
      [
        `${developmentClaims.length} development claims`,
        `${promotedLineageViolations.length} promoted-lineage violations`,
        `${activeDevelopmentProjectionViolations.length} projection violations`,
      ],
      [
        ...promotedLineageViolations,
        ...activeDevelopmentProjectionViolations,
      ].map((claim) => `Unsafe promotion: ${claim.id}`),
      "Connect confirmed claims through observations and keep unearned projections held.",
    ),
  );
  for (const id of ["KD-006", "KD-012"]) {
    const judgment = judgments.get(id);
    results.set(
      id,
      judgment
        ? {
            score: judgment.score,
            pass: judgment.pass,
            evidence: judgment.evidence,
            findings: judgment.findings,
            recommended_next_move: judgment.recommended_next_move,
            confidence: judgment.confidence,
          }
        : result(
            0,
            ["No independent judgment supplied"],
            ["Holdout judgment required"],
            "Run a blind independent judge.",
          ),
    );
  }
  results.set(
    "KD-007",
    result(
      !unresolvedWithoutTask.length &&
        !inferenceWithoutTask.length &&
        knowledgeBank.researchTasks.length >= 5
        ? 4
        : knowledgeBank.researchTasks.length
          ? 2
          : 0,
      [
        `${knowledgeBank.researchTasks.length} research tasks`,
        `${unresolvedWithoutTask.length} unresolved captures without tasks`,
        `${inferenceWithoutTask.length} inference claims without tasks`,
      ],
      [
        ...unresolvedWithoutTask.map((item) => item.id),
        ...inferenceWithoutTask.map((item) => item.id),
      ],
      "Give every unresolved high-value lead and inference claim a prioritized task.",
    ),
  );
  results.set(
    "KD-008",
    result(
      activeDevelopmentProjectionViolations.length || routeViolations.length
        ? 0
        : 4,
      [
        `${activeDevelopmentProjectionViolations.length} unsafe active projections`,
        `${routeViolations.length} prohibited public routes`,
      ],
      routeViolations,
      "Keep developed claims dormant or held until a purpose-specific surface selects approved wording.",
    ),
  );
  results.set(
    "KD-009",
    result(
      brokenCaptureRefs.length ||
        brokenObservationRefs.length ||
        integratedWithoutPath.length ||
        campaignPressIntegrityViolations.length ||
        kcTownHallIntegrityViolations.length ||
        kcTownHallPhaseOneIntegrityViolations.length ||
        teamsArchiveIntegrityViolations.length ||
        googleSharedDriveIntegrityViolations.length ||
        socialMediaIntegrityViolations.length ||
        urbanhermitIntegrityViolations.length ||
        nycacFacebookEventIntegrityViolations.length ||
        jamieWowListFacebookEventIntegrityViolations.length ||
        wowListFacebookPostIntegrityViolations.length
        ? 0
        : routedCaptures.length === knowledgeBank.captures.length
          ? 4
          : 2,
      [
        `${brokenCaptureRefs.length + brokenObservationRefs.length} broken references`,
        `${integratedWithoutPath.length} integrated captures without paths`,
        `${inventoryPlacements.length} campaign press placements / ${uniqueCampaignPressArticleIds.size} unique articles`,
        `${campaignPressIntegrityViolations.length} campaign press integrity violations`,
        `${kcTownHallIntegrityViolations.length} KC Town Hall funding-chain integrity violations`,
        `${kcTownHallPhaseOneIntegrityViolations.length} KC Town Hall Phase One integrity violations`,
        `${teamsArchiveIntegrityViolations.length} Teams archive integrity violations`,
        `${googleSharedDriveIntegrityViolations.length} Google Shared Drive integrity violations`,
        `${socialMediaIntegrityViolations.length} social-media archive integrity violations`,
        `${urbanhermitIntegrityViolations.length} Urbanhermit archive integrity violations`,
        `${nycacFacebookEventIntegrityViolations.length} NYC Artist Coalition Facebook event integrity violations`,
        `${jamieWowListFacebookEventIntegrityViolations.length} Jamie and WOW List Facebook event integrity violations`,
        `${wowListFacebookPostIntegrityViolations.length} WOW List Facebook post integrity violations`,
      ],
      [
        ...brokenCaptureRefs,
        ...brokenObservationRefs,
        ...integratedWithoutPath.map((item) => item.id),
        ...campaignPressIntegrityViolations,
        ...kcTownHallIntegrityViolations,
        ...kcTownHallPhaseOneIntegrityViolations,
        ...teamsArchiveIntegrityViolations,
        ...googleSharedDriveIntegrityViolations,
        ...socialMediaIntegrityViolations,
        ...urbanhermitIntegrityViolations,
        ...nycacFacebookEventIntegrityViolations,
        ...jamieWowListFacebookEventIntegrityViolations,
        ...wowListFacebookPostIntegrityViolations,
      ],
      "Repair broken references and ensure each integrated capture has a traversable path.",
    ),
  );
  results.set(
    "KD-010",
    result(
      validationErrors.length ||
        privateMarkerHits.length ||
        routeViolations.length ||
        campaignPressSafetyViolations.length ||
        kcTownHallSafetyViolations.length ||
        kcTownHallPhaseOneSafetyViolations.length ||
        teamsArchiveSafetyViolations.length ||
        googleSharedDriveSafetyViolations.length ||
        socialMediaSafetyViolations.length ||
        urbanhermitSafetyViolations.length ||
        nycacFacebookEventSafetyViolations.length ||
        jamieWowListFacebookEventSafetyViolations.length ||
        wowListFacebookPostSafetyViolations.length
        ? 0
        : 4,
      [
        `${validationErrors.length} canonical validation errors`,
        `${privateMarkerHits.length} private-marker hits`,
        `${routeViolations.length} prohibited routes`,
        `${campaignPressSafetyViolations.length} campaign press promotion violations`,
        `${kcTownHallSafetyViolations.length} KC Town Hall projection-safety violations`,
        `${kcTownHallPhaseOneSafetyViolations.length} KC Town Hall Phase One projection-safety violations`,
        `${teamsArchiveSafetyViolations.length} Teams archive projection-safety violations`,
        `${googleSharedDriveSafetyViolations.length} Google Shared Drive safety violations`,
        `${socialMediaSafetyViolations.length} social-media projection-safety violations`,
        `${urbanhermitSafetyViolations.length} Urbanhermit projection-safety violations`,
        `${nycacFacebookEventSafetyViolations.length} NYC Artist Coalition Facebook event safety violations`,
        `${jamieWowListFacebookEventSafetyViolations.length} Jamie and WOW List Facebook event safety violations`,
        `${wowListFacebookPostSafetyViolations.length} WOW List Facebook post safety violations`,
      ],
      [
        ...validationErrors,
        ...privateMarkerHits,
        ...routeViolations,
        ...campaignPressSafetyViolations,
        ...kcTownHallSafetyViolations,
        ...kcTownHallPhaseOneSafetyViolations,
        ...teamsArchiveSafetyViolations,
        ...googleSharedDriveSafetyViolations,
        ...socialMediaSafetyViolations,
        ...urbanhermitSafetyViolations,
        ...nycacFacebookEventSafetyViolations,
        ...jamieWowListFacebookEventSafetyViolations,
        ...wowListFacebookPostSafetyViolations,
      ],
      "Remove unsafe payloads and satisfy canonical citation validation.",
    ),
  );
  const photoCapture = knowledgeBank.captures.find(
    (capture) => capture.kind === "photo-lead",
  );
  const photoTask =
    photoCapture &&
    knowledgeBank.researchTasks.find((task) =>
      task.captureIds.includes(photoCapture.id),
    );
  const photoDoc = existsSync("docs/knowledge-bank/photo-evidence-loop.md");
  results.set(
    "KD-011",
    result(
      photoCapture && photoTask && photoDoc ? 4 : photoCapture ? 1 : 0,
      [
        `photo capture: ${photoCapture?.id ?? "missing"}`,
        `photo task: ${photoTask?.id ?? "missing"}`,
        `workflow document: ${photoDoc ? "present" : "missing"}`,
      ],
      [],
      "Document the claim-to-brief and discovery-to-research loop with rights and corroboration gates.",
    ),
  );
  const callNycPopulationViolations = [];
  const populationReconciliation =
    callNycPopulationInventory.populationReconciliation;
  const populationRecordTypeTotal = Object.values(
    callNycPopulationInventory.recordTypeCounts,
  ).reduce((sum, count) => sum + count, 0);
  if (
    callNycPopulationRecords.length !== 107 ||
    new Set(callNycPopulationRecords.map((record) => record.url)).size !== 107 ||
    populationRecordTypeTotal !== 107 ||
    callNycPostsTimelineRecords.length !==
      populationReconciliation.postsTimelineUniqueCount ||
    callNycRepliesTimelineRecords.length !==
      populationReconciliation.repliesTimelineUniqueCount
  ) {
    callNycPopulationViolations.push(
      "The recovered CallNYC population is incomplete, duplicated, or does not reconcile by record type",
    );
  }
  if (
    populationReconciliation.profileReportedPostCount !== 110 ||
    populationReconciliation.recoveredUnionRecordCount !== 107 ||
    populationReconciliation.profileCountNotMaterialized !== 3 ||
    callNycMissingPostsTask?.status !== "open"
  ) {
    callNycPopulationViolations.push(
      "The 110-profile / 107-recovered / 3-unmaterialized boundary is not explicit and tasked",
    );
  }
  if (
    callNycPopulationInventory.postedUrlInventory.distinctExternalShortUrls !==
      84 ||
    callNycIncomingRecords.length !== 11 ||
    callNycPopulationInventory.publishingPattern.councilRecognitionPatternRecordCount !==
      71 ||
    callNycPopulationInventory.publishingPattern.distinctCouncilMemberHandlesCredited !==
      26 ||
    callNycPopulationInventory.publishingPattern.distinctCallNycIssueOrApiPaths !==
      62
  ) {
    callNycPopulationViolations.push(
      "The posted-URL, stakeholder, or publishing-pattern findings do not reproduce from the bounded inventory",
    );
  }
  if (
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i.test(
      JSON.stringify(callNycPopulationInventory),
    ) ||
    !callNycGuidanceClaim?.boundaries.some((boundary) => /107 unique records/i.test(boundary)) ||
    !callNycGuidanceClaim?.antiClaims.some((antiClaim) => /All 110.*recovered/i.test(antiClaim))
  ) {
    callNycPopulationViolations.push(
      "The public-safe fixture or promoted claim obscures raw-data, denominator, or authorship boundaries",
    );
  }
  const nycacPopulationViolations = [];
  const nycacReconciliation =
    nycacPopulationInventory.populationReconciliation;
  const nycacRecordTypeTotal = Object.values(
    nycacPopulationInventory.recordTypeCounts,
  ).reduce((sum, count) => sum + count, 0);
  const nycacExternalLinks = nycacPopulationRecords.flatMap(
    (record) => record.externalLinks,
  );
  const nycacPopulationFixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/nycartc-retrievable-population.json";
  const nycacPopulationSource = sourceById.get(
    "SRC-SOCIAL-NYCAC-RETRIEVABLE-POPULATION-2026-07-14",
  );
  const expectedNycacSelfRepostAppearanceUrls = [
    "https://x.com/NYCArtC/status/1674013523373068289",
    "https://x.com/NYCArtC/status/1995868766614462973",
  ];
  const nycacSelfRepostAppearanceRecords = nycacPopulationRecords
    .filter(
      (record) =>
        record.accountTimelineAppearances?.includes("native-self-repost-card"),
    )
    .sort((a, b) => a.url.localeCompare(b.url));
  const nycacExternalSourceReposts = nycacPopulationRecords.filter(
    (record) =>
      record.recordType === "repost" &&
      record.authorHandle.toLowerCase() !== "@nycartc",
  );
  const nycacAccountOriginalsAndReplies = nycacPopulationRecords.filter(
    (record) => ["original", "reply"].includes(record.recordType),
  );
  const nycacMissionRules = new Map(
    nycacPopulationInventory.missionSignalClassification.rules.map((rule) => [
      rule.signalId,
      rule,
    ]),
  );
  const nycacMissionSignalRows = [
    ...nycacPopulationRecords,
    ...nycacIncomingRecords,
  ];
  const nycacMissionSignalManifestValid =
    nycacMissionRules.size === 6 &&
    JSON.stringify(
      nycacPopulationInventory.missionSignalClassification.rules,
    ) ===
      JSON.stringify(
        nycacMissionSignalRules.map((rule) => ({
          signalId: rule.id,
          pattern: rule.pattern.source,
          flags: rule.pattern.flags,
        })),
      ) &&
    JSON.stringify(
      nycacPopulationInventory.missionSignalClassification.inputFields,
    ) ===
      JSON.stringify([
        "source-post-body",
        "hashtag",
        "displayed-link-destination",
      ]) &&
    nycacMissionSignalRows.every((record) => {
      if (!Array.isArray(record.missionSignals)) return false;
      if (!Array.isArray(record.missionSignalEvidence)) return false;
      if (!/^[a-f0-9]{64}$/.test(record.classificationInputDigest ?? "")) {
        return false;
      }
      if (
        record.missionSignals.join("|") !==
        record.missionSignalEvidence
          .map((evidence) => evidence.signalId)
          .join("|")
      ) {
        return false;
      }
      return record.missionSignalEvidence.every((evidence) => {
        const rule = nycacMissionRules.get(evidence.signalId);
        return (
          rule &&
          nycacPopulationInventory.missionSignalClassification.inputFields.includes(
            evidence.inputField,
          ) &&
          new RegExp(rule.pattern, rule.flags).test(evidence.matchedValue)
        );
      });
    });
  if (
    nycacPopulationRecords.length !== 3123 ||
    new Set(nycacPopulationRecords.map((record) => record.url)).size !== 3123 ||
    nycacRecordTypeTotal !== 3123 ||
    nycacPopulationRecords.some(
      (record) =>
        !Array.isArray(record.recoveredFrom) || !record.recoveredFrom.length,
    )
  ) {
    nycacPopulationViolations.push(
      "The recovered NYC Artist Coalition population is incomplete, duplicated, or does not reconcile by record type and retrieval provenance",
    );
  }
  if (
    nycacReconciliation.profileReportedPostCount !== 5124 ||
    nycacReconciliation.recoveredUnionRecordCount !== 3123 ||
    nycacReconciliation.recoveredPopulationReviewedPercent !== 100 ||
    nycacReconciliation.profileCountNotMaterialized !== 2001 ||
    nycacOwnerArchiveTask?.status !== "blocked" ||
    !nycacOwnerArchiveTask?.blockedReason
  ) {
    nycacPopulationViolations.push(
      "The 5,124-profile / 3,123-recovered / 2,001-owner-archive boundary is not explicit and tasked",
    );
  }
  if (
    nycacExternalLinks.length !== 1451 ||
    new Set(nycacExternalLinks.map((link) => link.shortUrl)).size !== 1161 ||
    nycacPopulationInventory.publishingPattern
      .accountOriginalAndReplyRecordCount !== 685 ||
    nycacPopulationInventory.publishingPattern
      .timelineNativeRepostAppearanceCount !==
      2440 ||
    nycacPopulationInventory.publishingPattern
      .externalSourceNativeRepostRecordCount !==
      2438 ||
    nycacPopulationInventory.publishingPattern
      .accountAuthoredStatusAlsoSeenAsSelfRepostCount !== 2 ||
    nycacAccountOriginalsAndReplies.length !== 685 ||
    nycacAccountOriginalsAndReplies.some(
      (record) => record.authorHandle.toLowerCase() !== "@nycartc",
    ) ||
    nycacExternalSourceReposts.length !== 2438 ||
    nycacSelfRepostAppearanceRecords.length !== 2 ||
    nycacSelfRepostAppearanceRecords.some(
      (record) =>
        record.recordType !== "original" ||
        record.authorHandle.toLowerCase() !== "@nycartc" ||
        !record.recoveredFrom.some((surface) =>
          surface.startsWith("search-authored-"),
        ),
    ) ||
    nycacSelfRepostAppearanceRecords
      .map((record) => record.url)
      .join("|") !== expectedNycacSelfRepostAppearanceUrls.join("|") ||
    nycacPopulationInventory.publishingPattern
      .accountAuthoredStatusAlsoSeenAsSelfRepostUrls
      .slice()
      .sort()
      .join("|") !== expectedNycacSelfRepostAppearanceUrls.join("|") ||
    !nycacMissionSignalManifestValid ||
    nycacPopulationInventory.publishingPattern.distinctSourceAuthorCount !==
      623 ||
    nycacIncomingRecords.length !== 98 ||
    nycacPopulationInventory.post2020IncomingMentionInventory.distinctAuthorCount !==
      43 ||
    nycacPopulationInventory.post2020IncomingMentionInventory
      .directlyMatchingRecordCount !== 75 ||
    nycacPopulationInventory.post2020IncomingMentionInventory
      .directlyMatchingAuthorCount !== 34 ||
    nycacPopulationInventory.post2020IncomingMentionInventory
      .conversationContextRecordCount !== 23 ||
    nycacPopulationInventory.publishingPattern.missionSignalRecordCounts[
      "fair-rent-nyc"
    ] !== 477 ||
    nycacPopulationInventory.publishingPattern.missionSignalRecordCounts[
      "save-nyc-spaces"
    ] !== 192 ||
    nycacPopulationInventory.publishingPattern.missionSignalRecordCounts[
      "let-nyc-dance"
    ] !== 97 ||
    nycacPopulationInventory.publishingPattern.missionSignalRecordCounts[
      "talks-not-raids"
    ] !== 62 ||
    nycacPopulationInventory.publishingPattern.missionSignalRecordCounts[
      "nightlife-governance"
    ] !== 57 ||
    nycacPopulationInventory.publishingPattern.missionSignalRecordCounts[
      "artist-labor"
    ] !== 98
  ) {
    nycacPopulationViolations.push(
      "The NYC Artist Coalition posted-URL, publishing, campaign-signal, or stakeholder findings do not reproduce from the inventory",
    );
  }
  if (
    !immutableGitHubFixtureMatches(
      nycacPopulationSource,
      nycacPopulationFixturePath,
    )
  ) {
    nycacPopulationViolations.push(
      "The NYC Artist Coalition population source does not pin a byte-identical committed fixture",
    );
  }
  if (
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i.test(
      JSON.stringify(nycacPopulationInventory),
    ) ||
    !nycacInfrastructureClaim?.boundaries.some((boundary) =>
      /3,123 of 5,124/i.test(boundary),
    ) ||
    !nycacInfrastructureClaim?.antiClaims.some((antiClaim) =>
      /All 5,124.*recovered/i.test(antiClaim),
    ) ||
    !nycacInfrastructureClaim?.boundaries.some((boundary) =>
      /source authorship/i.test(boundary),
    ) ||
    !nycacInfrastructureClaim?.antiClaims.some((antiClaim) =>
      /Jamie authored all/i.test(antiClaim),
    )
  ) {
    nycacPopulationViolations.push(
      "The NYC Artist Coalition fixture or promoted claim obscures public-safety, denominator, source-authorship, or individual-authorship boundaries",
    );
  }
  const wowListPopulationViolations = [];
  const wowListReconciliation = wowListPopulationInventory.populationReconciliation;
  const wowListRecordTypeTotal = Object.values(
    wowListPopulationInventory.recordTypeCounts,
  ).reduce((sum, count) => sum + count, 0);
  const wowListExternalLinks = wowListPopulationRecords.flatMap(
    (record) => record.externalLinks,
  );
  const wowListMissionRelevantIncoming = wowListIncomingRecords.filter(
    (record) => record.classification === "mission-relevant-third-party",
  );
  if (
    wowListPopulationRecords.length !== 38 ||
    new Set(wowListPopulationRecords.map((record) => record.url)).size !== 38 ||
    wowListRecordTypeTotal !== 38 ||
    wowListPostsTimelineRecords.length !== wowListReconciliation.postsTimelineUniqueCount ||
    wowListRepliesTimelineRecords.length !== wowListReconciliation.repliesTimelineUniqueCount ||
    wowListPopulationRecords.some(
      (record) =>
        !Array.isArray(record.recoveredFrom) ||
        !record.recoveredFrom.length ||
        record.recoveredFrom.some(
          (timeline) => !["posts", "replies"].includes(timeline),
        ),
    )
  ) {
    wowListPopulationViolations.push(
      "The recovered WOW List population is incomplete, duplicated, or does not reconcile by record type and tab provenance",
    );
  }
  if (
    wowListReconciliation.profileReportedPostCount !== 38 ||
    wowListReconciliation.recoveredUnionRecordCount !== 38 ||
    wowListReconciliation.recoveredPopulationReviewedPercent !== 100 ||
    wowListReconciliation.profileCountNotMaterialized !== 0 ||
    wowListPopulationRecords.filter(
      (record) => !record.recoveredFrom.includes("posts"),
    ).map((record) => record.url).join("|") !==
      "https://x.com/wowlist/status/665520472461860864"
  ) {
    wowListPopulationViolations.push(
      "The 38-profile / 38-recovered / one-Replies-only reconciliation is not explicit",
    );
  }
  if (
    wowListExternalLinks.length !== 35 ||
    new Set(wowListExternalLinks.map((link) => link.shortUrl)).size !== 35 ||
    wowListPopulationInventory.publishingPattern.accountAuthoredRecordCount !== 22 ||
    wowListIncomingRecords.length !== 16 ||
    wowListMissionRelevantIncoming.length !== 10 ||
    new Set(wowListMissionRelevantIncoming.map((record) => record.authorHandle)).size !== 10 ||
    Object.values(
      wowListPopulationInventory.stakeholderInventory.stakeholderGroupCounts,
    ).reduce((sum, count) => sum + count, 0) !== 10
  ) {
    wowListPopulationViolations.push(
      "The WOW List posted-URL, publishing, or stakeholder findings do not reproduce from the inventory",
    );
  }
  if (
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\//i.test(
      JSON.stringify(wowListPopulationInventory),
    ) ||
    !wowListSocialClaim?.boundaries.some((boundary) => /All 38 records/i.test(boundary)) ||
    !wowListSocialClaim?.antiClaims.some((antiClaim) => /Only 37.*38/i.test(antiClaim)) ||
    !wowListSocialClaim?.boundaries.some((boundary) => /Institutional account records/i.test(boundary))
  ) {
    wowListPopulationViolations.push(
      "The WOW List fixture or promoted claim obscures public-safety, denominator, or authorship boundaries",
    );
  }
  const kcTownHallPopulationViolations = [];
  const kcTownHallReconciliation =
    kcTownHallPopulationInventory.populationReconciliation;
  const kcTownHallRecordTypeTotal = Object.values(
    kcTownHallPopulationInventory.recordTypeCounts,
  ).reduce((sum, count) => sum + count, 0);
  const kcTownHallExternalLinks = kcTownHallPopulationRecords.flatMap(
    (record) => record.externalLinks,
  );
  const kcTownHallTireRelatedRecords = kcTownHallPopulationRecords.filter(
    (record) => record.classifications.includes("tire-related"),
  );
  const kcTownHallSurveyLinkedRecords = kcTownHallPopulationRecords.filter(
    (record) => record.classifications.includes("survey-linked"),
  );
  const kcTownHallPopulationFixturePath =
    "apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json";
  const kcTownHallPopulationSource = sourceById.get(
    "SRC-SOCIAL-KCTH-FULL-POPULATION-2026-07-14",
  );
  if (
    kcTownHallPopulationRecords.length !== 183 ||
    new Set(kcTownHallPopulationRecords.map((record) => record.url)).size !== 183 ||
    kcTownHallRecordTypeTotal !== 183 ||
    kcTownHallPostsTimelineRecords.length !==
      kcTownHallReconciliation.postsTimelineUniqueCount ||
    kcTownHallRepliesTimelineRecords.length !==
      kcTownHallReconciliation.repliesTimelinePrimaryRecordCount ||
    kcTownHallContextRecords.length !==
      kcTownHallReconciliation.repliesTimelineConversationContextCount ||
    kcTownHallContextRecords.some((context) =>
      kcTownHallPopulationRecords.some((record) => record.url === context.url),
    )
  ) {
    kcTownHallPopulationViolations.push(
      "The recovered KC Town Hall population is incomplete, duplicated, or does not reconcile by record type, tab provenance, and conversation context",
    );
  }
  if (
    kcTownHallReconciliation.profileReportedPostCount !== 183 ||
    kcTownHallReconciliation.repliesTimelineRenderedArticleCount !== 188 ||
    kcTownHallReconciliation.recoveredUnionRecordCount !== 183 ||
    kcTownHallReconciliation.recoveredPopulationReviewedPercent !== 100 ||
    kcTownHallReconciliation.profileCountNotMaterialized !== 0
  ) {
    kcTownHallPopulationViolations.push(
      "The 183-profile / 188-Replies-cards / 5-context / 183-primary reconciliation is not explicit",
    );
  }
  if (
    kcTownHallExternalLinks.length !== 133 ||
    new Set(kcTownHallExternalLinks.map((link) => link.shortUrl)).size !== 31 ||
    kcTownHallPopulationInventory.publishingPattern.accountAuthoredRecordCount !== 155 ||
    kcTownHallTireRelatedRecords.length !== 100 ||
    kcTownHallPopulationInventory.publishingPattern.tireRelatedRecordCount !==
      kcTownHallTireRelatedRecords.length ||
    kcTownHallSurveyLinkedRecords.length !== 12 ||
    kcTownHallPopulationInventory.publishingPattern.surveyLinkedRecordCount !==
      kcTownHallSurveyLinkedRecords.length ||
    kcTownHallSurveyLinkedRecords.some((record) =>
      record.externalLinks.every(
        (link) => !/survey/i.test(link.displayedDestination),
      ),
    ) ||
    !/close reading.*public post/i.test(
      kcTownHallPopulationInventory.publishingPattern.classificationMethod
        .tireRelated,
    ) ||
    kcTownHallPopulationInventory.stakeholderResponseInventory
      .directCouncilMemberAccountCount !== 3
  ) {
    kcTownHallPopulationViolations.push(
      "The KC Town Hall posted-URL, publishing, or stakeholder findings do not reproduce from the inventory",
    );
  }
  if (
    !immutableGitHubFixtureMatches(
      kcTownHallPopulationSource,
      kcTownHallPopulationFixturePath,
    )
  ) {
    kcTownHallPopulationViolations.push(
      "The KC Town Hall population source does not pin a byte-identical committed fixture",
    );
  }
  if (
    /"(?:text|cookie|cookies|session|sessionToken)"\s*:|\/Users\/|\/Volumes\/|816-\d{3}-\d{4}/i.test(
      JSON.stringify(kcTownHallPopulationInventory),
    ) ||
    !kcTownHallSocialClaim?.boundaries.some((boundary) =>
      /All 183 records/i.test(boundary),
    ) ||
    !kcTownHallSocialClaim?.antiClaims.some((antiClaim) =>
      /personally authored every/i.test(antiClaim),
    ) ||
    !kcTownHallSocialClaim?.boundaries.some((boundary) =>
      /exact tire and savings totals.*corroboration/i.test(boundary),
    )
  ) {
    kcTownHallPopulationViolations.push(
      "The KC Town Hall fixture or promoted claim obscures public-safety, denominator, outcome, or authorship boundaries",
    );
  }
  const fullPopulationViolations = [
    ...callNycPopulationViolations,
    ...nycacPopulationViolations,
    ...wowListPopulationViolations,
    ...kcTownHallPopulationViolations,
    ...urbanhermitIntegrityViolations,
    ...urbanhermitSafetyViolations,
    ...nycacFacebookEventIntegrityViolations,
    ...nycacFacebookEventSafetyViolations,
    ...jamieWowListFacebookEventIntegrityViolations,
    ...jamieWowListFacebookEventSafetyViolations,
    ...wowListFacebookPostIntegrityViolations,
    ...wowListFacebookPostSafetyViolations,
  ];
  results.set(
    "KD-013",
    result(
      fullPopulationViolations.length ? 0 : 4,
      [
        `CallNYC: ${callNycPopulationRecords.length}/110 profile-counted records recovered; 3 explicitly unmaterialized`,
        `CallNYC: ${callNycPostsTimelineRecords.length} Posts-tab / ${callNycRepliesTimelineRecords.length} Replies-tab records; ${callNycPopulationInventory.postedUrlInventory.distinctExternalShortUrls} distinct posted short URLs; ${callNycIncomingRecords.length} incoming records`,
        `NYC Artist Coalition: ${nycacPopulationRecords.length}/5,124 profile-counted records recovered; 2,001 owner-archive records explicit`,
        `NYC Artist Coalition: ${nycacPopulationInventory.publishingPattern.accountOriginalAndReplyRecordCount} account originals/replies / ${nycacPopulationInventory.publishingPattern.externalSourceNativeRepostRecordCount} external-source repost records / ${nycacPopulationInventory.publishingPattern.timelineNativeRepostAppearanceCount} native-repost appearances, including ${nycacPopulationInventory.publishingPattern.accountAuthoredStatusAlsoSeenAsSelfRepostCount} account-authored statuses also seen as self-repost cards; ${nycacPopulationInventory.postedUrlInventory.distinctExternalShortUrls} distinct posted short URLs; ${nycacIncomingRecords.length} bounded later incoming records`,
        `WOW List: ${wowListPopulationRecords.length}/38 profile-counted records recovered; 0 unmaterialized`,
        `WOW List: ${wowListPostsTimelineRecords.length} Posts-tab / ${wowListRepliesTimelineRecords.length} Replies-tab records; ${wowListExternalLinks.length} distinct posted short URLs`,
        `WOW List: ${wowListMissionRelevantIncoming.length}/16 bounded incoming records classified as mission-relevant third-party responses across ${Object.keys(wowListPopulationInventory.stakeholderInventory.stakeholderGroupCounts).length} stakeholder groups`,
        `KC Town Hall: ${kcTownHallPopulationRecords.length}/183 profile-counted records recovered; 0 unmaterialized`,
        `KC Town Hall: ${kcTownHallPostsTimelineRecords.length} Posts-tab / ${kcTownHallRepliesTimelineRecords.length} Replies-primary records; ${kcTownHallContextRecords.length} conversation-context cards excluded`,
        `KC Town Hall: ${kcTownHallExternalLinks.length} posted-link occurrences / ${new Set(kcTownHallExternalLinks.map((link) => link.shortUrl)).size} distinct short URLs; ${kcTownHallPopulationInventory.stakeholderResponseInventory.directCouncilMemberAccountCount} direct Council Member account responses`,
        `Urbanhermit: ${urbanhermitRecords.length}/434 live profile-counted records recovered; 0 unmaterialized`,
        `Urbanhermit: ${urbanhermitPostsRecords.length} Posts-tab / ${urbanhermitRepliesRecords.length} Replies-primary records; ${urbanhermitContextRecords.length} conversation-parent cards excluded`,
        `Urbanhermit: ${urbanhermitExternalLinks.length} posted-link occurrences / ${new Set(urbanhermitExternalLinks.map((link) => link.shortUrl)).size} distinct short URLs; ${urbanhermitMissionRelevantIncoming.length}/26 bounded incoming records mission-relevant across ${new Set(urbanhermitMissionRelevantIncoming.map((record) => record.authorHandle)).size} accounts`,
        `NYC Artist Coalition Facebook events: ${nycacFacebookEvents.length}/33 exposed event cards and details reviewed; 1 of the page's displayed 34 remains unmaterialized`,
        `NYC Artist Coalition Facebook events: ${nycacFacebookResponseEvents.length} response-counted records; 19 at or above 100, 7 at or above 500, 3 at or above 1,000; ${nycacFacebookEventInventory.postedSourceArticles.length} posted source articles`,
        `Jamie Facebook hosted events: ${jamieFacebookEvents.length}/21 materialized records reviewed; 17 detail pages recovered and 4 retained as index-only`,
        `Jamie Facebook hosted events: 6 Sunday Dinner records; ${jamieFacebookResponseEvents.length} response-counted records; ${jamieFacebookExternalLinks.length} event-linked public URLs`,
        `WOW List Facebook events: ${wowListFacebookAccount.materializedEventCount} records exposed by 2 current surfaces; legacy owner history remains unresolved`,
        `WOW List Facebook posts: ${wowListFacebookPosts.length}/54 surviving Lifetime-library records reviewed; 50 detail pages recovered and 4 retained as table-only`,
        `WOW List Facebook posts: 50/50 recovered details attributed to Jamie as publisher; ${wowListFacebookNormalizedLinks.size} normalized public destinations; stakeholder-group engagement remains unclaimed without an identity-complete denominator`,
      ],
      fullPopulationViolations,
      "Repair the denominator or classification before strengthening the public interpretation.",
    ),
  );

  return {
    results,
    metrics: {
      captures: knowledgeBank.captures.length,
      routedCaptures: routedCaptures.length,
      sources: knowledgeBank.sources.length,
      developmentSources: developmentSources.length,
      observations: knowledgeBank.observations.length,
      developmentClaims: developmentClaims.length,
      researchTasks: knowledgeBank.researchTasks.length,
      campaignPressPlacements: inventoryPlacements.length,
      campaignPressUniqueArticles: uniqueCampaignPressArticleIds.size,
      kcTownHallFundingSources: kcTownHallFundingSources.length,
      kcTownHallFundingClaims: kcTownHallFundingClaims.length,
      kcTownHallPhaseOneSources: kcTownHallPhaseOneSources.length,
      kcTownHallPhaseOneClaims: kcTownHallPhaseOneClaims.length,
      teamsArchiveCaptures: teamsArchiveCaptures.length,
      teamsArchiveSources: teamsArchiveSources.length,
      teamsArchiveObservations: teamsArchiveObservations.length,
      teamsArchiveClaims: teamsArchiveClaims.length,
      googleSharedDriveCaptures: googleSharedDriveCaptures.length,
      googleSharedDriveSources: googleSharedDriveSources.length,
      googleSharedDriveObservations: googleSharedDriveObservations.length,
      googleSharedDriveClaims: googleSharedDriveClaims.length,
      googleSharedDriveUnreviewed: googleSharedDriveReviewSummary.unreviewedDriveCount,
      socialMediaAccounts: projectSocialAccounts.length,
      socialMediaSources: socialMediaSources.length,
      socialMediaClaims: socialMediaClaims.length,
      callNycCouncilAccounts:
        socialMediaReviewSummary.callNycCouncilMemberAccountCount,
      callNycRecoveredTimelineRecords:
        socialMediaReviewSummary.callNycRecoveredTimelineRecordCount,
      callNycUnmaterializedProfileRecords:
        socialMediaReviewSummary.callNycUnmaterializedProfileRecordCount,
      callNycCouncilRecognitionPosts:
        socialMediaReviewSummary.callNycCouncilRecognitionRecordCount,
      callNycIssueOrApiPaths:
        socialMediaReviewSummary.callNycDistinctIssueOrApiPathCount,
      nycacMissionRelevantCouncilAccounts:
        socialMediaReviewSummary.nycacMissionRelevantCouncilMemberAccountCount2017To2020,
      nycacRecoveredTimelineAndSearchRecords:
        socialMediaReviewSummary.nycacRecoveredTimelineAndSearchRecordCount,
      nycacProfileCountNotMaterialized:
        socialMediaReviewSummary.nycacProfileCountNotMaterialized,
      nycacDistinctPostedUrls:
        socialMediaReviewSummary.nycacDistinctExternalShortUrlCount,
      wowListRecoveredTimelineRecords:
        socialMediaReviewSummary.wowListRecoveredTimelineRecordCount,
      wowListDistinctPostedUrls:
        socialMediaReviewSummary.wowListDistinctExternalShortUrlCount,
      wowListMissionRelevantThirdPartyAccounts:
        socialMediaReviewSummary.wowListMissionRelevantThirdPartyAccountCount,
      kcTownHallRecoveredTimelineRecords:
        socialMediaReviewSummary.kcTownHallRecoveredTimelineRecordCount,
      kcTownHallDistinctPostedUrls:
        socialMediaReviewSummary.kcTownHallDistinctExternalShortUrlCount,
      kcTownHallDirectCouncilMemberAccounts:
        socialMediaReviewSummary.kcTownHallDirectCouncilMemberAccountCount,
      urbanhermitRecoveredTimelineRecords:
        urbanhermitReviewSummary.recoveredPopulationCount,
      urbanhermitDistinctPostedUrls:
        urbanhermitReviewSummary.distinctExternalShortUrlCount,
      urbanhermitMissionRelevantIncomingAccounts:
        urbanhermitReviewSummary.missionRelevantIncomingAccountCount,
      nycacFacebookEventsRecovered: nycacFacebookEvents.length,
      nycacFacebookEventsUnmaterialized:
        nycacFacebookEventInventory.populationReconciliation.unmaterializedCount,
      nycacFacebookEventsWithResponseCount: nycacFacebookResponseEvents.length,
      nycacFacebookEventPostedSourceArticles:
        nycacFacebookEventInventory.postedSourceArticles.length,
      jamieFacebookHostedEventsRecovered: jamieFacebookEvents.length,
      jamieFacebookEventDetailsRecovered:
        jamieWowListFacebookEventReviewSummary.personalDetailsRecovered,
      jamieFacebookEventIndexOnly:
        jamieWowListFacebookEventReviewSummary.personalIndexOnly,
      jamieFacebookSundayDinnerRecords:
        jamieWowListFacebookEventReviewSummary.sundayDinnerRecords,
      jamieFacebookEventLinkedUrls:
        jamieWowListFacebookEventReviewSummary.eventLinkedUrls,
      wowListFacebookCurrentMaterializedEvents:
        jamieWowListFacebookEventReviewSummary.wowListCurrentMaterializedEvents,
      wowListFacebookPostsRecovered: wowListFacebookPostReviewSummary.records,
      wowListFacebookPostDetailsRecovered:
        wowListFacebookPostReviewSummary.detailsRecovered,
      wowListFacebookPostTableOnly: wowListFacebookPostReviewSummary.tableOnly,
      wowListFacebookPostPublisherAttributions:
        wowListFacebookPostReviewSummary.detailsAttributedToJamie,
      wowListFacebookPostNormalizedDestinations:
        wowListFacebookPostReviewSummary.normalizedDestinations,
      validationErrors: validationErrors.length,
    },
  };
}

function run() {
  const currentFingerprint = candidateFingerprint();
  const loadedJudgments = loadJudgments(argument("--judgments"));
  const fingerprintMissing =
    Boolean(argument("--judgments")) && !loadedJudgments.candidateFingerprint;
  const fingerprintMismatch = Boolean(
    loadedJudgments.candidateFingerprint &&
    loadedJudgments.candidateFingerprint !== currentFingerprint,
  );
  const judgments = fingerprintMismatch ? new Map() : loadedJudgments.judgments;
  const { results, metrics } = deterministicResults(judgments);
  const evalResults = suite.evals.map((entry) => ({
    eval_id: entry.id,
    title: entry.title,
    grader: entry.grader,
    blocking: entry.blocking,
    weight: entry.weight,
    ...results.get(entry.id),
  }));
  const weightedScore =
    evalResults.reduce(
      (sum, entry) => sum + (entry.score / 4) * entry.weight,
      0,
    ) / 100;
  const thresholds = suite.development_thresholds;
  const blockingFailures = evalResults.filter(
    (entry) =>
      entry.blocking && entry.score < thresholds.blocking_score_minimum,
  );
  const nonblockingFailures = evalResults.filter(
    (entry) =>
      !entry.blocking && entry.score < thresholds.nonblocking_score_minimum,
  );
  const missingJudgments = evalResults.filter(
    (entry) => entry.grader === "llm_judge" && entry.score === 0,
  );
  const criteriaMet =
    weightedScore >= thresholds.weighted_score_minimum &&
    !blockingFailures.length &&
    !nonblockingFailures.length &&
    !missingJudgments.length &&
    !fingerprintMismatch;
  const output = {
    suite_id: suite.suite_id,
    suite_version: suite.version,
    label: argument("--label") ?? "knowledge-development-run",
    run_at: new Date().toISOString(),
    candidate_files: candidateFiles,
    candidate_fingerprint: currentFingerprint,
    judgment_fingerprint: loadedJudgments.candidateFingerprint ?? null,
    judgment_fingerprint_missing: fingerprintMissing,
    judgment_fingerprint_mismatch: fingerprintMismatch,
    metrics,
    weighted_score: Number(weightedScore.toFixed(4)),
    threshold: thresholds.weighted_score_minimum,
    criteria_met: criteriaMet,
    blocking_failures: blockingFailures.map((entry) => entry.eval_id),
    nonblocking_failures: nonblockingFailures.map((entry) => entry.eval_id),
    missing_judgments: missingJudgments.map((entry) => entry.eval_id),
    evals: evalResults,
  };
  const outputPath = argument("--output");
  if (outputPath)
    writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(JSON.stringify(output, null, 2));
  if (
    process.argv.includes("--require-pass") &&
    (fingerprintMissing || !criteriaMet)
  )
    process.exit(1);
}

run();
