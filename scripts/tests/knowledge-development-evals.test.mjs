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

test("KC Town Hall funding chain preserves proposal role, recommendation, appropriation, and later disposition", () => {
  assert.equal(kcTownHallFundingCaptures.length, 1);
  assert.equal(kcTownHallFundingSources.length, 4);
  assert.equal(kcTownHallFundingObservations.length, 5);
  assert.equal(kcTownHallFundingClaims.length, 2);
  assert.equal(kcTownHallFundingInquiries.length, 1);
  assert.equal(kcTownHallFundingCorrections.length, 1);

  const roleClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-CCED-DEVELOPER-PRESENTER-ROLE",
  );
  const fundingClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-CCED-COUNCIL-FUNDING-CHAIN",
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

  assert.deepEqual(page.sourceOrder, [
    "SRC-KCTH-CCED-ROUND-TWO-PROPOSALS-2019",
    "SRC-KCTH-KCMO-RESOLUTION-190649-2019",
    "SRC-KCTH-KCMO-ORDINANCE-190642-2019",
    "SRC-KCTH-KCMO-ORDINANCE-240317-2024",
  ]);
});

test("KC Town Hall public projection states authorization and the unused-funds ending together", () => {
  const publicText = [
    "apps/www/src/content/work/kc-town-hall.mdx",
    "apps/www/src/data/work.ts",
    "apps/www/src/data/proofs.ts",
  ]
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  assert.match(
    publicText,
    /Council accepted and appropriated the amount in 2019/i,
  );
  assert.match(publicText, /later withdrew/i);
  assert.match(publicText, /unused/i);
  assert.doesNotMatch(
    publicText,
    /including a \$490,539 public funding recommendation/i,
  );
  assert.match(
    readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8"),
    /recommendation, Council acceptance, appropriation,[\s\S]*receipt or expenditure/i,
  );
});
