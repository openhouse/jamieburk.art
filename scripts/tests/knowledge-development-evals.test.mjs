import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validateKnowledgeDevelopmentSuite } from "../check-knowledge-development-evals.mjs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  campaignPressArchiveUrlFor,
  campaignPressArticleSourceIds,
  campaignPressCaptures,
  campaignPressClaims,
  campaignPressManifests,
  campaignPressObservations,
  campaignPressResearchTasks,
  campaignPressSources,
} from "../../apps/www/src/data/knowledge-bank/campaign-press.ts";
import {
  kcTownHallFundingCaptures,
  kcTownHallFundingClaims,
  kcTownHallFundingCorrections,
  kcTownHallFundingInquiries,
  kcTownHallFundingObservations,
  kcTownHallFundingSources,
} from "../../apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts";
import {
  teamsArchiveCaptures,
  teamsArchiveClaims,
  teamsArchiveInquiries,
  teamsArchiveObservations,
  teamsArchiveResearchTasks,
  teamsArchiveSources,
} from "../../apps/www/src/data/knowledge-bank/teams-archive.ts";
import {
  googleSharedDriveCaptures,
  googleSharedDriveClaims,
  googleSharedDriveInquiries,
  googleSharedDriveObservations,
  googleSharedDriveResearchTasks,
  googleSharedDriveReviewSummary,
  googleSharedDriveSources,
} from "../../apps/www/src/data/knowledge-bank/google-shared-drives.ts";

const suite = JSON.parse(
  readFileSync(".agents/evals/knowledge-development.json", "utf8"),
);
const cloneSuite = () => structuredClone(suite);
const campaignPressInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/campaign-press-capture-inventory.json",
    "utf8",
  ),
);

const normalizeSourceUrl = (value) =>
  value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

test("canonical knowledge-development suite is valid", () => {
  assert.deepEqual(validateKnowledgeDevelopmentSuite(suite).errors, []);
});

test("knowledge-development weights total 100", () => {
  const candidate = cloneSuite();
  candidate.evals[0].weight += 1;
  assert.match(
    validateKnowledgeDevelopmentSuite(candidate).errors.join("\n"),
    /weights must total 100/,
  );
});

test("suite requires a blocking eval", () => {
  const candidate = cloneSuite();
  candidate.evals.forEach((entry) => {
    entry.blocking = false;
  });
  assert.match(
    validateKnowledgeDevelopmentSuite(candidate).errors.join("\n"),
    /blocking eval/,
  );
});

test("optimizer cannot grade its own patch", () => {
  const candidate = cloneSuite();
  candidate.optimization.optimizer_may_not_grade_own_patch = false;
  assert.match(
    validateKnowledgeDevelopmentSuite(candidate).errors.join("\n"),
    /may not grade its own patch/,
  );
});

test("holdout judgments and repeat runs are required", () => {
  const candidate = cloneSuite();
  candidate.development_thresholds.holdout_judgments_required = false;
  candidate.development_thresholds.two_consecutive_passing_runs_required = false;
  const errors = validateKnowledgeDevelopmentSuite(candidate).errors.join("\n");
  assert.match(errors, /holdout judgments/);
  assert.match(errors, /two consecutive passing runs/);
});

test("campaign press corpus is complete, ordered, deduplicated, and archived", () => {
  assert.deepEqual(
    campaignPressManifests.map((manifest) => manifest.articleSourceIds.length),
    [21, 7, 8, 9],
  );
  assert.equal(
    campaignPressManifests.reduce(
      (count, manifest) => count + manifest.articleSourceIds.length,
      0,
    ),
    45,
  );
  assert.equal(campaignPressArticleSourceIds.length, 44);
  assert.equal(campaignPressSources.length, 45);
  assert.equal(campaignPressObservations.length, 45);
  assert.equal(campaignPressCaptures.length, 4);
  assert.equal(campaignPressClaims.length, 1);
  assert.equal(campaignPressResearchTasks.length, 1);
  assert.equal(campaignPressInventory.captures.length, 4);
  assert.equal(campaignPressInventory.placements.length, 45);

  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source]),
  );
  const observedSourceIds = new Set(
    knowledgeBank.observations.map((observation) => observation.sourceId),
  );
  for (const sourceId of campaignPressArticleSourceIds) {
    assert.ok(
      sourceById.has(sourceId),
      `Missing campaign press source ${sourceId}`,
    );
    assert.ok(
      observedSourceIds.has(sourceId),
      `Missing observation for ${sourceId}`,
    );
    assert.match(
      campaignPressArchiveUrlFor(sourceId) ?? "",
      /^https:\/\/web\.archive\.org\/web\//,
    );
  }

  for (const manifest of campaignPressManifests) {
    const capture = campaignPressInventory.captures.find(
      (item) => item.campaignId === manifest.campaignId,
    );
    const placements = campaignPressInventory.placements.filter(
      (item) => item.campaignId === manifest.campaignId,
    );
    const indexSource = sourceById.get(manifest.indexSourceId);

    assert.ok(capture, `Missing capture for ${manifest.campaignId}`);
    assert.equal(capture.indexSourceId, manifest.indexSourceId);
    assert.equal(capture.placementCount, placements.length);
    assert.equal(capture.captureUrl, indexSource.archiveUrl);
    assert.deepEqual(
      placements.map((item) => item.ordinal),
      Array.from({ length: placements.length }, (_, index) => index + 1),
    );
    assert.deepEqual(
      placements.map((item) => item.sourceId),
      manifest.articleSourceIds,
    );

    for (const placement of placements) {
      const source = sourceById.get(placement.sourceId);
      const archiveOriginalUrl = campaignPressArchiveUrlFor(
        placement.sourceId,
      )?.match(/^https:\/\/web\.archive\.org\/web\/\d{14}\/(.+)$/)?.[1];
      assert.ok(source, `Missing source ${placement.sourceId}`);
      assert.ok(
        [source.canonicalUrl, archiveOriginalUrl]
          .filter(Boolean)
          .map(normalizeSourceUrl)
          .includes(normalizeSourceUrl(placement.listedUrl)),
        `${placement.sourceId} does not preserve its capture-listed URL`,
      );
    }
  }
});

test("campaign press metadata cannot silently become personal proof", () => {
  const newArticleIds = new Set(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .map((source) => source.id),
  );
  const promotedRelationships = knowledgeBank.claims.flatMap((claim) =>
    claim.evidence.filter((relationship) =>
      newArticleIds.has(relationship.sourceId),
    ),
  );

  assert.deepEqual(promotedRelationships, []);
  assert.equal(campaignPressClaims[0].publicationState, "public-safe");
  assert.equal(campaignPressClaims[0].selectionState, "dormant");
  assert.ok(
    campaignPressClaims[0].projections.every(
      (projection) =>
        projection.status === "hold" && projection.surfaces.length === 0,
    ),
  );
  assert.ok(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .every((source) =>
        source.doesNotEstablish.some((boundary) =>
          boundary.includes("Jamie's authorship"),
        ),
      ),
  );
});

test("campaign press duplicate is explicit and limited to the shared NPR article", () => {
  const repeatedPlacements = campaignPressInventory.placements.filter(
    (item) => item.duplicateDisposition !== "unique",
  );
  assert.deepEqual(
    repeatedPlacements.map((item) => [
      item.campaignId,
      item.sourceId,
      item.duplicateDisposition,
    ]),
    [
      [
        "let-nyc-dance",
        "SRC-NYCAC-NPR-KUAF-CABARET-2017-09-20",
        "shared-with-save-nyc-spaces",
      ],
      [
        "save-nyc-spaces",
        "SRC-NYCAC-NPR-KUAF-CABARET-2017-09-20",
        "shared-with-let-nyc-dance",
      ],
    ],
  );
});

test("Teams archival production covers all required corpora with a traversable graph", () => {
  assert.equal(teamsArchiveCaptures.length, 6);
  assert.equal(teamsArchiveSources.length, 10);
  assert.equal(teamsArchiveObservations.length, 23);
  assert.equal(teamsArchiveClaims.length, 5);
  assert.equal(teamsArchiveResearchTasks.length, 2);
  assert.equal(teamsArchiveInquiries.length, 1);

  for (const prefix of [
    "CAP-TEAMS-CRS",
    "CAP-TEAMS-JPH",
    "CAP-TEAMS-JOBHUNT",
  ]) {
    assert.ok(
      teamsArchiveCaptures.some((capture) => capture.id.startsWith(prefix)),
      `Missing required corpus prefix ${prefix}`,
    );
  }

  const observedSourceIds = new Set(
    teamsArchiveObservations.map((observation) => observation.sourceId),
  );
  for (const source of teamsArchiveSources) {
    assert.ok(observedSourceIds.has(source.id), `Unobserved source ${source.id}`);
  }
});

test("protected Teams sources stay URL-free and non-citing", () => {
  const protectedSourceIds = new Set(
    teamsArchiveSources
      .filter((source) => source.visibility !== "public")
      .map((source) => source.id),
  );

  for (const source of teamsArchiveSources.filter(
    (item) => item.visibility !== "public",
  )) {
    assert.equal(source.canonicalUrl, undefined);
    assert.equal(source.archiveUrl, undefined);
    assert.equal(source.assetUrl, undefined);
  }

  for (const claim of teamsArchiveClaims) {
    assert.ok(
      claim.evidence
        .filter((item) => protectedSourceIds.has(item.sourceId))
        .every((item) => item.renderCitation === false),
      `${claim.id} renders protected evidence`,
    );
  }
});

test("Google Shared Drive production preserves the bounded sample and graph", () => {
  assert.equal(googleSharedDriveReviewSummary.accessibleDriveCount, 110);
  assert.equal(googleSharedDriveReviewSummary.selectedDriveCount, 14);
  assert.equal(googleSharedDriveReviewSummary.unreviewedDriveCount, 96);
  assert.equal(googleSharedDriveReviewSummary.closeReadTextArtifactCount, 7);
  assert.equal(googleSharedDriveReviewSummary.revisionHistoryCount, 4);
  assert.equal(googleSharedDriveCaptures.length, 9);
  assert.equal(googleSharedDriveSources.length, 6);
  assert.equal(googleSharedDriveObservations.length, 18);
  assert.equal(googleSharedDriveClaims.length, 5);
  assert.equal(googleSharedDriveResearchTasks.length, 7);
  assert.equal(googleSharedDriveInquiries.length, 1);

  const observedSourceIds = new Set(
    googleSharedDriveObservations.map((observation) => observation.sourceId),
  );
  for (const source of googleSharedDriveSources) {
    assert.ok(observedSourceIds.has(source.id), `Unobserved source ${source.id}`);
  }
});

test("Google Shared Drive sources expose no locators and never render citations", () => {
  const protectedIds = new Set([
    ...googleSharedDriveSources.map((source) => source.id),
    "SRC-CRS-RUNNING-MINUTES-2026-05-15",
  ]);
  for (const source of googleSharedDriveSources) {
    assert.equal(source.canonicalUrl, undefined);
    assert.equal(source.archiveUrl, undefined);
    assert.equal(source.assetUrl, undefined);
  }
  for (const claim of googleSharedDriveClaims) {
    assert.ok(
      claim.evidence
        .filter((item) => protectedIds.has(item.sourceId))
        .every((item) => item.renderCitation === false),
      `${claim.id} renders protected evidence`,
    );
  }
  const payload = JSON.stringify({
    captures: googleSharedDriveCaptures,
    sources: googleSharedDriveSources,
    observations: googleSharedDriveObservations,
    claims: googleSharedDriveClaims,
    tasks: googleSharedDriveResearchTasks,
    inquiries: googleSharedDriveInquiries,
  });
  assert.doesNotMatch(
    payload,
    /\/Users\/|\/Volumes\/|drive\.google\.com|docs\.google\.com|permissionId|fileId|[\w.+-]+@[\w.-]+/i,
  );
});

test("Shared Drive claims distinguish selected proof from held research", () => {
  for (const id of [
    "CLM-GDRIVE-PORTABLE-HANDOFF-PRACTICE",
    "CLM-196-RESIDENCY-ONBOARDING-HANDOFF",
    "CLM-NYCAC-MULTI-ACTION-GUIDANCE-DRAFT",
    "CLM-GDRIVE-ARCHIVE-OVERVIEW-WORKFLOW",
  ]) {
    const claim = googleSharedDriveClaims.find((item) => item.id === id);
    assert.equal(claim.selectionState, "selected");
    assert.equal(claim.publicationState, "approved");
    assert.ok(
      claim.projections.some(
        (projection) =>
          projection.status === "active" &&
          projection.surfaces.some((surface) => surface.startsWith("/")),
      ),
    );
  }

  const held = googleSharedDriveClaims.find(
    (item) => item.id === "CLM-SBU-STYLE-GUIDE-HANDOFF-SEED",
  );
  assert.equal(held.selectionState, "dormant");
  assert.ok(held.projections.every((projection) => projection.status === "hold"));
  assert.deepEqual(held.researchTaskIds, [
    "RT-GDRIVE-SBU-STYLE-GUIDE-COMPLETION",
  ]);
});

test("remaining drives, photographs, and WOWList materials stay tasked research", () => {
  const remaining = googleSharedDriveResearchTasks.find(
    (item) => item.id === "RT-GDRIVE-REMAINING-CORPUS-TRIAGE",
  );
  const photo = googleSharedDriveResearchTasks.find(
    (item) => item.id === "RT-GDRIVE-SUNDAY-DINNER-PHOTO-REVIEW",
  );
  const wowlist = googleSharedDriveResearchTasks.find(
    (item) => item.id === "RT-GDRIVE-WOWLIST-MEETING-HANDOFF-REVIEW",
  );
  assert.equal(remaining.status, "open");
  assert.match(remaining.publicNote, /remaining 96/i);
  assert.equal(photo.status, "open");
  assert.match(photo.successCriteria.join("\n"), /rights, consent/i);
  assert.equal(wowlist.status, "open");
  assert.match(wowlist.publicNote, /protected research leads/i);
});

test("Shared Drive outcome gaps remain explicit research tasks", () => {
  const expected = [
    [
      "CLM-196-RESIDENCY-ONBOARDING-HANDOFF",
      "RT-GDRIVE-196-WORKFLOW-REUSE-CORROBORATION",
    ],
    [
      "CLM-NYCAC-MULTI-ACTION-GUIDANCE-DRAFT",
      "RT-GDRIVE-NYCAC-GUIDANCE-PUBLICATION-USE",
    ],
    [
      "CLM-GDRIVE-ARCHIVE-OVERVIEW-WORKFLOW",
      "RT-GDRIVE-ARCHIVE-WORKFLOW-EXECUTION",
    ],
  ];

  for (const [claimId, taskId] of expected) {
    const claim = googleSharedDriveClaims.find((item) => item.id === claimId);
    const task = googleSharedDriveResearchTasks.find((item) => item.id === taskId);
    assert.equal(task.status, "open");
    assert.ok(claim.researchTaskIds.includes(taskId));
    assert.ok(task.claimIds.includes(claimId));
  }
});

test("Shared Drive projections retain draft, collaboration, and selection boundaries", () => {
  const workData = readFileSync("apps/www/src/data/work.ts", "utf8");
  const proofData = readFileSync("apps/www/src/data/proofs.ts", "utf8");
  const technicalPage = readFileSync(
    "apps/www/src/app/work/technical-operations/page.tsx",
    "utf8",
  );
  const residencyClaim = googleSharedDriveClaims.find(
    (item) => item.id === "CLM-196-RESIDENCY-ONBOARDING-HANDOFF",
  );
  const crsClaim = teamsArchiveClaims.find(
    (item) => item.id === "CLM-CRS-COALITION-OPERATING-SYSTEM",
  );

  assert.doesNotMatch(workData, /Privacy-aware archive overview workflow/);
  assert.doesNotMatch(proofData, /community-platform work/i);
  assert.match(
    workData,
    /Jamie-attributed multi-action working draft later edited by a collaborator/,
  );
  assert.match(
    crsClaim.projections.map((projection) => projection.text).join("\n"),
    /collaborative running minutes/,
  );
  assert.doesNotMatch(workData, /reusable workflow for schedule/i);
  assert.doesNotMatch(technicalPage, /reusable residency/i);
  assert.doesNotMatch(
    `${residencyClaim.internalClaim}\n${residencyClaim.projections
      .map((projection) => projection.text)
      .join("\n")}`,
    /reusable residency|reusable 196/i,
  );
});

test("raft scale remains collective and does not promote the unrecovered Gulf endpoint", () => {
  const claim = teamsArchiveClaims.find(
    (item) => item.id === "CLM-WATERWAYS-RAFT-EXPEDITION-SCALE",
  );
  assert.equal(claim.epistemicState, "corroborated");
  assert.equal(claim.selectionState, "candidate");
  assert.ok(
    claim.boundaries.some((item) => /toward the Gulf/i.test(item)),
  );
  assert.ok(
    claim.antiClaims.some((item) => /confirm arrival at the Gulf/i.test(item)),
  );
  assert.deepEqual(claim.researchTaskIds, [
    "RT-WATERWAYS-GULF-ENDPOINT-CORROBORATION",
  ]);
  assert.ok(
    claim.projections
      .filter((projection) => projection.key === "case-study")
      .every(
        (projection) =>
          projection.status === "hold" && projection.surfaces.length === 0,
      ),
  );
});

test("unmaterialized job-hunt packets remain research state, not inferred evidence", () => {
  const capture = teamsArchiveCaptures.find(
    (item) =>
      item.id === "CAP-TEAMS-JOBHUNT-JUNE-PACKET-HYDRATION-2026",
  );
  const task = teamsArchiveResearchTasks.find(
    (item) => item.id === "RT-TEAMS-JOBHUNT-JUNE-PACKET-HYDRATION",
  );
  const inquiry = teamsArchiveInquiries[0];

  assert.equal(capture.status, "researching");
  assert.deepEqual(capture.sourceIds, []);
  assert.deepEqual(capture.observationIds, []);
  assert.deepEqual(capture.researchTaskIds, [task.id]);
  assert.equal(task.status, "in-progress");
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.match(inquiry.limitations.join("\n"), /not evidence.*absent/i);
});

test("Fair Rent projects direct operating and data-design work with adoption boundaries", () => {
  const caseStudy = readFileSync(
    "apps/www/src/content/work/fair-rent-nyc.mdx",
    "utf8",
  );
  const workData = readFileSync("apps/www/src/data/work.ts", "utf8");
  const publicText = `${caseStudy}\n${workData}`;
  const page = knowledgeBank.pages.find((item) => item.id === "fair-rent-nyc");

  assert.match(publicText, /six-part coalition operating/i);
  assert.match(publicText, /legislative (source map and )?provenance redline/i);
  assert.match(publicText, /privacy-preserving public-data pilot/i);
  assert.match(publicText, /not claims? that a City agency adopted/i);
  assert.ok(
    page.occurrences.some(
      (item) => item.claimId === "CLM-CRS-COALITION-OPERATING-SYSTEM",
    ),
  );
  assert.ok(
    page.occurrences.some(
      (item) => item.claimId === "CLM-CRS-OPEN-DATA-IMPLEMENTATION-DESIGN",
    ),
  );
});

test("KC Town Hall funding chain preserves proposal role, recommendation, appropriation, and later disposition", () => {
  assert.equal(kcTownHallFundingCaptures.length, 2);
  assert.equal(kcTownHallFundingSources.length, 5);
  assert.equal(kcTownHallFundingObservations.length, 6);
  assert.equal(kcTownHallFundingClaims.length, 3);
  assert.equal(kcTownHallFundingInquiries.length, 1);
  assert.equal(kcTownHallFundingCorrections.length, 2);

  const roleClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-CCED-DEVELOPER-PRESENTER-ROLE",
  );
  const fundingClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-CCED-COUNCIL-FUNDING-CHAIN",
  );
  const transitionClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-MISSION-ALIGNED-TRANSITION",
  );
  const page = knowledgeBank.pages.find((item) => item.id === "kc-town-hall");

  assert.equal(roleClaim.epistemicState, "sourced");
  assert.equal(roleClaim.publicationState, "approved");
  assert.equal(roleClaim.selectionState, "selected");
  assert.deepEqual(
    roleClaim.evidence.map((item) => item.sourceId),
    ["SRC-KCTH-CCED-ROUND-TWO-PROPOSALS-2019"],
  );
  assert.ok(
    roleClaim.antiClaims.some((item) =>
      /caused the Council appropriation/i.test(item),
    ),
  );

  assert.equal(fundingClaim.epistemicState, "corroborated");
  assert.equal(fundingClaim.publicationState, "approved");
  assert.equal(fundingClaim.selectionState, "selected");
  assert.deepEqual(
    fundingClaim.evidence.map((item) => [item.sourceId, item.relationship]),
    [
      ["SRC-KCTH-KCMO-RESOLUTION-190649-2019", "direct-support"],
      ["SRC-KCTH-KCMO-ORDINANCE-190642-2019", "direct-support"],
      ["SRC-KCTH-KCMO-ORDINANCE-240317-2024", "supports-boundary"],
    ],
  );
  assert.ok(
    fundingClaim.boundaries.some((item) => /receipt.*expenditure/i.test(item)),
  );
  assert.ok(
    fundingClaim.antiClaims.some((item) => /received \$490,539/i.test(item)),
  );
  assert.ok(
    fundingClaim.antiClaims.some((item) => /spent \$490,539/i.test(item)),
  );

  assert.equal(transitionClaim.epistemicState, "sourced");
  assert.equal(transitionClaim.publicationState, "approved");
  assert.equal(transitionClaim.selectionState, "selected");
  assert.deepEqual(
    transitionClaim.evidence.map((item) => [item.sourceId, item.renderCitation]),
    [["SRC-KCTH-JAMIE-TRANSITION-CLARIFICATION-2026", false]],
  );
  assert.ok(
    transitionClaim.boundaries.some((item) =>
      /first-hand.*official City records/i.test(item),
    ),
  );
  assert.ok(
    transitionClaim.antiClaims.some((item) =>
      /official Council records document/i.test(item),
    ),
  );

  const transitionSource = kcTownHallFundingSources.find(
    (source) =>
      source.id === "SRC-KCTH-JAMIE-TRANSITION-CLARIFICATION-2026",
  );
  const transitionCapture = kcTownHallFundingCaptures.find(
    (capture) => capture.id === "CAP-KCTH-MISSION-ALIGNED-TRANSITION-2026",
  );
  assert.equal(
    transitionCapture.summary,
    "Jamie transitioned the KC Town Hall project to a mission-aligned organization.",
  );
  assert.equal(transitionSource.kind, "firsthand-statement");
  assert.equal(transitionSource.visibility, "public-metadata-only");
  assert.equal(transitionSource.canonicalUrl, undefined);

  assert.deepEqual(page.sourceOrder, [
    "SRC-KCTH-CCED-ROUND-TWO-PROPOSALS-2019",
    "SRC-KCTH-KCMO-RESOLUTION-190649-2019",
    "SRC-KCTH-KCMO-ORDINANCE-190642-2019",
    "SRC-KCTH-KCMO-ORDINANCE-240317-2024",
  ]);
  assert.deepEqual(
    page.occurrences.find(
      (occurrence) => occurrence.id === "mission-aligned-transition",
    ).sourceIds,
    undefined,
  );
});

test("KC Town Hall public projection states authorization and the unused-funds ending together", () => {
  const standaloneDataSurfaces = [
    "apps/www/src/data/work.ts",
    "apps/www/src/data/proofs.ts",
  ].map((path) => ({ path, text: readFileSync(path, "utf8") }));
  const caseStudy = readFileSync(
    "apps/www/src/content/work/kc-town-hall.mdx",
    "utf8",
  );
  const claimBank = readFileSync(
    "apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts",
    "utf8",
  );
  const publicText = [
    ...standaloneDataSurfaces.map(({ text }) => text),
    caseStudy,
    claimBank,
  ].join("\n");

  assert.match(
    publicText,
    /Council accepted and appropriated the amount in 2019/i,
  );
  assert.match(publicText, /withdrew|withdrawal/i);
  assert.match(publicText, /unused/i);
  assert.match(publicText, /Separately, the City/i);
  assert.doesNotMatch(publicText, /later transitioned/i);
  for (const { path, text } of standaloneDataSurfaces) {
    assert.match(
      text,
      /Jamie states that he transitioned the project to a mission-aligned organization/i,
      `${path} must carry the first-hand attribution on its own`,
    );
    assert.match(
      text,
      /Separately, the City/i,
      `${path} must separate Jamie's statement from the City record`,
    );
  }
  const workData = standaloneDataSurfaces.find(
    ({ path }) => path === "apps/www/src/data/work.ts",
  ).text;
  assert.match(workData, /years: "2019 proposal; 2024 disposition"/i);
  assert.match(
    workData,
    /in Jamie's first-hand account, continuity through a mission-aligned transition/i,
  );
  assert.match(
    claimBank,
    /Jamie states that he transitioned the project to a mission-aligned organization/i,
  );
  assert.match(caseStudy, /Jamie's approved first-hand account/i);
  assert.match(caseStudy, /not a fact established by the City\s+records/i);
  assert.doesNotMatch(
    publicText,
    /including a \$490,539 public funding recommendation/i,
  );
  assert.match(
    caseStudy,
    /recommendation, Council acceptance, appropriation,[\s\S]*receipt or expenditure/i,
  );
});
