import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import {
  sourceExpansionIntake,
  sourceExpansionSources
} from "../../apps/www/src/data/knowledge-bank/source-expansion.ts";
import {
  campaignPressArticleSourceIds,
  campaignPressClaims,
  campaignPressInquiries,
  campaignPressIntake,
  campaignPressManifests,
  campaignPressSources
} from "../../apps/www/src/data/knowledge-bank/campaign-press.ts";
import {
  kcTownHallCouncilActionCorrections,
  kcTownHallCouncilActionInquiries,
  kcTownHallCouncilActionIntake,
  kcTownHallCouncilActionSources
} from "../../apps/www/src/data/knowledge-bank/kc-town-hall-council-action.ts";
import {
  kcTownHallStewardshipTransitionInquiries,
  kcTownHallStewardshipTransitionIntake
} from "../../apps/www/src/data/knowledge-bank/kc-town-hall-stewardship-transition.ts";
import {
  kcTownHallPhaseOneNeighborhoodClaims,
  kcTownHallPhaseOneNeighborhoodInquiries,
  kcTownHallPhaseOneNeighborhoodIntake,
  kcTownHallPhaseOneNeighborhoodSources
} from "../../apps/www/src/data/knowledge-bank/kc-town-hall-phase-one-and-neighborhood-operations.ts";
import {
  nterChngClaims,
  nterChngInquiries,
  nterChngIntake,
  nterChngSources
} from "../../apps/www/src/data/knowledge-bank/nter-chng.ts";
import {
  knowledgeLifecycleReport,
  validateKnowledgeLifecycle
} from "../lib/knowledge-lifecycle-validation.mjs";

const cloneBank = () => structuredClone(knowledgeBank);
const campaignPressCaptureInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/campaign-press-capture-inventory.json",
    "utf8"
  )
);

const normalizeSourceUrl = (value) =>
  value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

test("canonical knowledge lifecycle is valid", () => {
  assert.deepEqual(validateKnowledgeLifecycle(), []);
});

test("ten-source expansion is complete and dispositioned", () => {
  assert.equal(sourceExpansionSources.length, 10);
  assert.equal(sourceExpansionIntake.length, 10);
  const sourceIds = new Set(sourceExpansionSources.map((source) => source.id));
  assert.deepEqual(
    new Set(sourceExpansionIntake.flatMap((record) => record.sourceIds)),
    sourceIds
  );
  assert.ok(
    sourceExpansionIntake.every(
      (record) => record.status === "matured" && record.claimIds.length > 0
    )
  );
});

test("KC Town Hall Council action is exact, complete, and dispositioned", () => {
  assert.equal(kcTownHallCouncilActionSources.length, 4);
  assert.equal(kcTownHallCouncilActionIntake.length, 1);
  assert.equal(kcTownHallCouncilActionInquiries.length, 1);
  assert.equal(kcTownHallCouncilActionCorrections.length, 1);

  const intake = kcTownHallCouncilActionIntake[0];
  const inquiry = kcTownHallCouncilActionInquiries[0];
  const correction = kcTownHallCouncilActionCorrections[0];
  const sourceIds = kcTownHallCouncilActionSources.map((source) => source.id);
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS"
  );
  const proof = proofClaims.find(
    (item) => item.id === "kc-town-hall-public-benefit-documentation"
  );
  const projection = claim.projections.find(
    (item) => item.key === "case-study" && item.status === "active"
  );

  assert.equal(intake.status, "matured");
  assert.equal(intake.disposition, "correction-created");
  assert.deepEqual(intake.sourceIds, sourceIds);
  assert.ok(sourceIds.every((sourceId) => inquiry.sourceIds.includes(sourceId)));
  assert.equal(inquiry.resultStatus, "recovered");
  assert.equal(correction.claimId, claim.id);
  assert.ok(correction.affectedSurfaces.includes("resume-pdf"));
  assert.ok(
    sourceIds.every((sourceId) =>
      claim.evidence.some((relationship) => relationship.sourceId === sourceId)
    )
  );
  assert.deepEqual(proof.canonicalClaimIds, [claim.id]);

  assert.match(projection.text, /CCED Board unanimously recommended \$490,539/);
  assert.match(projection.text, /City Council then adopted/);
  assert.match(projection.text, /companion ordinance appropriated that amount/);
  assert.match(projection.text, /withdrew before the funds were disbursed/);
  assert.doesNotMatch(projection.text, /Council (?:vote )?was unanimous/i);
  assert.ok(
    claim.antiClaims.some((item) => /Council vote was unanimous/i.test(item))
  );
  assert.ok(
    claim.antiClaims.some((item) => /received or spent/i.test(item))
  );
});

test("KC Town Hall public surfaces preserve the no-disbursement boundary", () => {
  const proof = proofClaims.find(
    (item) => item.id === "kc-town-hall-public-benefit-documentation"
  );
  const technicalOperationsSource = readFileSync(
    "apps/www/src/app/work/technical-operations/page.tsx",
    "utf8"
  );
  const publicText = [
    readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8"),
    technicalOperationsSource,
    readFileSync("apps/www/src/data/work.ts", "utf8"),
    readFileSync("docs/knowledge-bank/proofs.md", "utf8"),
    proof.publicWording,
    proof.shortWording,
    proof.detailedPublicWording
  ].join("\n");

  assert.match(
    technicalOperationsSource,
    /requireReadyOrCarefulProof\(\s*"kc-town-hall-public-benefit-documentation"/
  );
  assert.match(publicText, /City Council (?:approval and appropriation|then adopted)/);
  assert.match(
    publicText,
    /withdrew before (?:(?:the )?funds were )?disburs(?:ed|ement)/
  );
  assert.doesNotMatch(publicText, /public funding recommendation/);
  assert.doesNotMatch(publicText, /Council (?:vote )?was unanimous/i);
  assert.doesNotMatch(
    publicText,
    /(?:received|was paid|spent) (?:the )?\$490,539|\$490,539 (?:received|paid|spent)/i
  );
});

test("KC Town Hall stewardship transition remains a separate research lead", () => {
  assert.equal(kcTownHallStewardshipTransitionIntake.length, 1);
  assert.equal(kcTownHallStewardshipTransitionInquiries.length, 1);

  const intake = kcTownHallStewardshipTransitionIntake[0];
  const inquiry = kcTownHallStewardshipTransitionInquiries[0];
  const municipalClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-MUNICIPAL-PROCESS"
  );

  assert.equal(intake.status, "researching");
  assert.equal(intake.disposition, "inquiry-opened");
  assert.deepEqual(intake.sourceIds, []);
  assert.deepEqual(intake.claimIds, []);
  assert.deepEqual(intake.inquiryIds, [inquiry.id]);
  assert.equal(inquiry.resultStatus, "open");
  assert.deepEqual(inquiry.sourceIds, []);
  assert.match(intake.description, /mission-aligned organization/);
  assert.ok(
    inquiry.limitations.some((item) =>
      /do not establish or explain the earlier stewardship transition/i.test(item)
    )
  );
  assert.ok(
    municipalClaim.researchInquiryIds.every((id) => id !== inquiry.id),
    "The source-backed municipal claim must not absorb the source-free handoff lead"
  );

  const publicSurfaces = [
    readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8"),
    readFileSync("apps/www/src/data/proofs.ts", "utf8"),
    readFileSync("apps/www/src/data/work.ts", "utf8"),
    readFileSync("apps/www/src/app/resume/page.tsx", "utf8")
  ].join("\n");
  assert.match(
    publicSurfaces,
    /Historical project for Jamie; current property or redevelopment status is not asserted\./
  );
  assert.doesNotMatch(publicSurfaces, /mission-aligned organization/i);
});

test("KC Town Hall Phase One preserves completed scope without overpromoting Jamie's title", () => {
  const claim = kcTownHallPhaseOneNeighborhoodClaims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-PHASE-ONE-RESTORATION"
  );
  const inquiry = kcTownHallPhaseOneNeighborhoodInquiries.find(
    (item) => item.id === "INQ-KC-TOWN-HALL-PHASE-ONE-ROLE"
  );
  const projection = claim.projections[0];
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019"
  );

  assert.equal(claim.status, "use-with-care");
  assert.equal(projection.status, "hold");
  assert.deepEqual(projection.surfaces, []);
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(source.supportsGenerally.includes("Phase One cold-shell work was labeled completed in 2019"));
  assert.ok(source.supportsGenerally.includes("the Phase One value was listed as $189,629"));
  assert.ok(source.doesNotEstablish.includes("Jamie's general-contractor title"));
  assert.match(claim.internalClaim, /roof and TPO membrane work/);
  assert.ok(claim.boundaries.some((item) => /firsthand account/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /every construction trade/i.test(item)));
});

test("KC Town Hall survey records listening evidence while protecting people and attribution", () => {
  const claim = kcTownHallPhaseOneNeighborhoodClaims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY"
  );
  const intake = kcTownHallPhaseOneNeighborhoodIntake.find(
    (item) => item.id === "INT-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY-2026-07-15"
  );
  const sourceIds = new Set(claim.evidence.map((item) => item.sourceId));

  assert.deepEqual(
    sourceIds,
    new Set([
      "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020"
    ])
  );
  assert.equal(claim.projections[0].status, "hold");
  assert.ok(claim.boundaries.some((item) => /response count/i.test(item)));
  assert.ok(claim.boundaries.some((item) => /phone numbers/i.test(item)));
  assert.ok(intake.boundaries.some((item) => /New Horizon Missionary Baptist Church/i.test(item)));
});

test("Tired of Tires remains a bounded project-level operating claim", () => {
  const claim = kcTownHallPhaseOneNeighborhoodClaims.find(
    (item) => item.id === "CLM-TIRED-OF-TIRES-NEIGHBORHOOD-OPERATIONS"
  );
  const archiveSource = kcTownHallPhaseOneNeighborhoodSources.find(
    (item) => item.id === "SRC-KC-TOWN-HALL-PUBLIC-SITE-ARCHIVE-2020"
  );
  const inquiry = kcTownHallPhaseOneNeighborhoodInquiries.find(
    (item) => item.id === "INQ-TIRED-OF-TIRES-JAMIE-ROLE"
  );

  assert.equal(claim.projections[0].status, "hold");
  assert.match(claim.internalClaim, /reports \$17,768/);
  assert.ok(claim.boundaries.some((item) => /project's published estimate/i.test(item)));
  assert.ok(claim.boundaries.some((item) => /Indian Mound.*pending/i.test(item)));
  assert.ok(archiveSource.doesNotEstablish.some((item) => /individual design/i.test(item)));
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(inquiry.limitations.some((item) => /No reviewed public source establishes the Indian Mound expansion/i.test(item)));
});

test("Cleveland Avenue remains an inquiry, not an accomplishment claim", () => {
  const intake = kcTownHallPhaseOneNeighborhoodIntake.find(
    (item) => item.id === "INT-CLEVELAND-UNIFY-BEAUTIFY-MEMORY-2026-07-15"
  );
  const inquiry = kcTownHallPhaseOneNeighborhoodInquiries.find(
    (item) => item.id === "INQ-CLEVELAND-UNIFY-BEAUTIFY-JAMIE-ROLE"
  );
  const source = kcTownHallPhaseOneNeighborhoodSources.find(
    (item) => item.id === "SRC-HENC-STRATEGIC-PLAN-2024"
  );

  assert.deepEqual(intake.claimIds, []);
  assert.deepEqual(intake.inquiryIds, [inquiry.id]);
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(source.doesNotEstablish.includes("the Cleveland Avenue Unify to Beautify program"));
  assert.ok(source.doesNotEstablish.includes("Jamie's role in HENC or the Cleveland Avenue program"));
  assert.ok(
    kcTownHallPhaseOneNeighborhoodClaims.every(
      (claim) => !/CLEVELAND-UNIFY-BEAUTIFY/.test(claim.id)
    )
  );
});

test("new KC fieldwork records do not silently project onto public hiring surfaces", () => {
  assert.equal(kcTownHallPhaseOneNeighborhoodSources.length, 3);
  assert.equal(kcTownHallPhaseOneNeighborhoodClaims.length, 3);
  assert.equal(kcTownHallPhaseOneNeighborhoodInquiries.length, 4);
  assert.equal(kcTownHallPhaseOneNeighborhoodIntake.length, 4);

  const publicSurfaces = [
    readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8"),
    readFileSync("apps/www/src/data/proofs.ts", "utf8"),
    readFileSync("apps/www/src/data/work.ts", "utf8"),
    readFileSync("apps/www/src/app/resume/page.tsx", "utf8")
  ].join("\n");

  assert.doesNotMatch(publicSurfaces, /general contractor/i);
  assert.doesNotMatch(publicSurfaces, /Tired of Tires/i);
  assert.doesNotMatch(publicSurfaces, /Unify to Beautify/i);
  assert.doesNotMatch(publicSurfaces, /\$189,629/);
  assert.doesNotMatch(
    JSON.stringify(kcTownHallPhaseOneNeighborhoodIntake),
    /\/Users\/|\/Volumes\/|supporting-materials|\.docx|\.xlsx/i
  );
});

test("NTER CHNG is source-backed, collectively credited, and held from hiring surfaces", () => {
  assert.equal(nterChngSources.length, 4);
  assert.equal(nterChngClaims.length, 1);
  assert.equal(nterChngInquiries.length, 1);
  assert.equal(nterChngIntake.length, 1);

  const claim = nterChngClaims[0];
  const archiveProjection = claim.projections.find(
    (item) => item.key === "archive-note"
  );
  const aboutProjection = claim.projections.find((item) => item.key === "about");
  const evidenceSourceIds = new Set(
    claim.evidence.map((relationship) => relationship.sourceId)
  );

  assert.equal(claim.status, "confirmed-with-boundary");
  assert.equal(archiveProjection.status, "active");
  assert.deepEqual(archiveProjection.surfaces, [
    "docs/knowledge-bank/projects/participatory-public-practice"
  ]);
  assert.equal(aboutProjection.status, "hold");
  assert.deepEqual(aboutProjection.surfaces, []);
  assert.deepEqual(
    evidenceSourceIds,
    new Set(nterChngSources.map((source) => source.id))
  );
  assert.match(claim.internalClaim, /Drew Bolton and Garrett Fuselier/);
  assert.ok(claim.boundaries.some((item) => /Mary Nichols/i.test(item)));
  assert.ok(claim.boundaries.some((item) => /Megan Mantia and Elisha Stetson/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /created NTER CHNG alone/i.test(item)));
});

test("NTER CHNG evidence distinguishes exhibition inclusion from the Nerman stop", () => {
  const sourceById = new Map(nterChngSources.map((source) => [source.id, source]));
  const projectArchive = sourceById.get("SRC-NTER-CHNG-WAYBACK-2011");
  const exhibitionSource = sourceById.get(
    "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011"
  );
  const nermanSource = sourceById.get("SRC-NERMAN-AMERICA-NOW-HERE-2011");
  const inquiry = nterChngInquiries[0];

  assert.match(projectArchive.archiveUrl, /20110128193350/);
  assert.match(exhibitionSource.archiveUrl, /20121017090512/);
  assert.ok(
    exhibitionSource.supportsGenerally.includes(
      "NTER CHNG was presented within America: Now and Here's Kansas City program"
    )
  );
  assert.ok(
    nermanSource.doesNotEstablish.includes(
      "that NTER CHNG appeared at the Nerman Museum stop"
    )
  );
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(
    inquiry.limitations.some((item) => /press-release link was not captured/i.test(item))
  );
  assert.ok(
    inquiry.limitations.some((item) => /exact America: Now and Here installation venue/i.test(item))
  );
});

test("NTER CHNG does not silently enter the current website or resume", () => {
  const publicSurfaces = [
    readFileSync("apps/www/src/app/about/page.tsx", "utf8"),
    readFileSync("apps/www/src/app/resume/page.tsx", "utf8"),
    readFileSync("apps/www/src/data/proofs.ts", "utf8"),
    readFileSync("apps/www/src/data/work.ts", "utf8")
  ].join("\n");

  assert.doesNotMatch(publicSurfaces, /NTER CHNG/i);
  assert.doesNotMatch(publicSurfaces, /I Text, Therefore I Am/i);
  assert.doesNotMatch(publicSurfaces, /Drew Bolton|Garrett Fuselier/i);
});

test("campaign press ingestion is complete, deduplicated, and archived", () => {
  assert.deepEqual(
    campaignPressManifests.map((manifest) => manifest.articleSourceIds.length),
    [21, 7, 8, 9]
  );
  assert.equal(
    campaignPressManifests.reduce(
      (count, manifest) => count + manifest.articleSourceIds.length,
      0
    ),
    45
  );
  assert.equal(campaignPressArticleSourceIds.length, 44);
  assert.equal(campaignPressSources.length, 45);
  assert.equal(campaignPressClaims.length, 1);
  assert.equal(campaignPressIntake.length, 4);
  assert.equal(campaignPressInquiries.length, 1);

  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  for (const sourceId of campaignPressArticleSourceIds) {
    const source = sourceById.get(sourceId);
    assert.ok(source, `Missing campaign press source ${sourceId}`);
    assert.match(source.archiveUrl ?? "", /^https:\/\/web\.archive\.org\/web\//);
  }
  for (const manifest of campaignPressManifests) {
    const indexSource = sourceById.get(manifest.indexSourceId);
    assert.ok(indexSource, `Missing campaign index ${manifest.indexSourceId}`);
    assert.match(
      indexSource.archiveUrl ?? "",
      /^https:\/\/web\.archive\.org\/web\//
    );
    assert.ok(indexSource.capturedAt, `${manifest.indexSourceId} lacks capturedAt`);
  }

  const duplicatePlacements = campaignPressManifests
    .flatMap((manifest) => manifest.articleSourceIds)
    .filter(
      (sourceId, index, placements) => placements.indexOf(sourceId) !== index
    );
  assert.deepEqual(duplicatePlacements, ["SRC-NYCAC-NPR-2017-09-20"]);
  assert.ok(
    campaignPressIntake.every(
      (record) =>
        record.status === "researching" &&
        record.inquiryIds.includes("INQ-NYCAC-CAMPAIGN-PRESS-CORPUS")
    )
  );
  assert.deepEqual(
    campaignPressClaims[0].evidence.map((relationship) => relationship.sourceId),
    campaignPressManifests.map((manifest) => manifest.indexSourceId)
  );
  assert.equal(campaignPressClaims[0].projections[0].status, "hold");
  assert.deepEqual(campaignPressClaims[0].projections[0].surfaces, []);
});

test("campaign press manifests are reproducible from capture-derived placements", () => {
  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  assert.equal(campaignPressCaptureInventory.version, 1);
  assert.equal(campaignPressCaptureInventory.captures.length, 4);
  assert.equal(campaignPressCaptureInventory.placements.length, 45);

  for (const manifest of campaignPressManifests) {
    const capture = campaignPressCaptureInventory.captures.find(
      (item) => item.campaignId === manifest.campaignId
    );
    const placements = campaignPressCaptureInventory.placements.filter(
      (item) => item.campaignId === manifest.campaignId
    );
    const indexSource = sourceById.get(manifest.indexSourceId);

    assert.ok(capture, `Missing capture fixture for ${manifest.campaignId}`);
    assert.equal(capture.indexSourceId, manifest.indexSourceId);
    assert.equal(capture.placementCount, placements.length);
    assert.equal(capture.captureUrl, indexSource.archiveUrl);
    assert.equal(capture.capturedAt, indexSource.capturedAt);
    assert.deepEqual(
      placements.map((item) => item.ordinal),
      Array.from({ length: placements.length }, (_, index) => index + 1)
    );
    assert.deepEqual(
      placements.map((item) => item.sourceId),
      manifest.articleSourceIds
    );

    for (const placement of placements) {
      assert.doesNotThrow(() => new URL(placement.listedUrl));
      const source = sourceById.get(placement.sourceId);
      assert.ok(source, `Missing source ${placement.sourceId}`);
      const archivedOriginalUrl = source.archiveUrl?.match(
        /^https:\/\/web\.archive\.org\/web\/\d{14}\/(.+)$/
      )?.[1];
      assert.ok(
        [source.canonicalUrl, archivedOriginalUrl]
          .filter(Boolean)
          .map(normalizeSourceUrl)
          .includes(normalizeSourceUrl(placement.listedUrl)),
        `${placement.sourceId} does not preserve its capture-listed URL`
      );
    }
  }

  const repeatedPlacements = campaignPressCaptureInventory.placements.filter(
    (item) => item.duplicateDisposition !== "unique"
  );
  assert.deepEqual(
    repeatedPlacements.map((item) => [
      item.campaignId,
      item.sourceId,
      item.duplicateDisposition
    ]),
    [
      [
        "let-nyc-dance",
        "SRC-NYCAC-NPR-2017-09-20",
        "shared-with-save-nyc-spaces"
      ],
      [
        "save-nyc-spaces",
        "SRC-NYCAC-NPR-2017-09-20",
        "shared-with-let-nyc-dance"
      ]
    ]
  );
});

test("campaign press sources cannot silently become personal claims", () => {
  const newArticleIds = new Set(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .map((source) => source.id)
  );
  const promotedRelationships = knowledgeBank.claims.flatMap((claim) =>
    claim.evidence.filter((relationship) =>
      newArticleIds.has(relationship.sourceId)
    )
  );
  assert.deepEqual(promotedRelationships, []);
  assert.ok(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .every((source) =>
        source.doesNotEstablish.some((boundary) =>
          boundary.includes("Jamie's authorship")
        )
      )
  );
  assert.ok(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .every(
        (source) =>
          source.supportsGenerally.length === 1 &&
          source.supportsGenerally[0].includes("Press section listed this article")
      )
  );

  const dossier = readFileSync(
    "docs/knowledge-bank/projects/nyc-artist-coalition-press.md",
    "utf8"
  );
  for (const sourceId of campaignPressArticleSourceIds) {
    assert.match(dossier, new RegExp(sourceId));
  }
});

test("new evidence returns to every linked research inquiry", () => {
  const inquiryById = new Map(
    knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
  );
  const newSourceIds = new Set(sourceExpansionSources.map((source) => source.id));
  const expandedClaims = knowledgeBank.claims.filter((claim) =>
    claim.evidence.some((relationship) => newSourceIds.has(relationship.sourceId))
  );

  for (const claim of expandedClaims) {
    for (const inquiryId of claim.researchInquiryIds) {
      const inquiry = inquiryById.get(inquiryId);
      const relevantSourceIds = claim.evidence
        .map((relationship) => relationship.sourceId)
        .filter((sourceId) => newSourceIds.has(sourceId));
      assert.ok(inquiry, `Missing inquiry ${inquiryId}`);
      assert.ok(
        relevantSourceIds.every((sourceId) => inquiry.sourceIds.includes(sourceId)),
        `${inquiryId} omits new evidence for ${claim.id}`
      );
    }
  }

  for (const intake of sourceExpansionIntake) {
    for (const inquiryId of intake.inquiryIds ?? []) {
      const inquiry = inquiryById.get(inquiryId);
      assert.ok(inquiry, `Missing inquiry ${inquiryId}`);
      assert.ok(
        intake.sourceIds.every((sourceId) => inquiry.sourceIds.includes(sourceId)),
        `${inquiryId} omits intake evidence for ${intake.id}`
      );
    }
  }
});

test("intake cannot reference unknown sources", () => {
  const candidate = cloneBank();
  candidate.intake[0].sourceIds.push("SRC-UNKNOWN");
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /references unknown source SRC-UNKNOWN/
  );
});

test("corrections cannot exist without an intake disposition", () => {
  const candidate = cloneBank();
  candidate.intake.forEach((item) => {
    item.correctionIds = [];
  });
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Correction COR-CALLNYC-CHRONOLOGY-2026 has no intake disposition/
  );
});

test("matured intake must retain a claim disposition", () => {
  const candidate = cloneBank();
  candidate.intake.find((item) => item.status === "matured").claimIds = [];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Matured intake .* has no claim/
  );
});

test("photo leads cannot bypass research", () => {
  const candidate = cloneBank();
  const photoLead = candidate.intake.find((item) => item.kind === "photo-lead");
  photoLead.claimIds = [candidate.claims[0].id];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Photo lead .* bypasses research/
  );
});

test("reader feedback cannot become accomplishment evidence", () => {
  const candidate = cloneBank();
  const feedback = candidate.intake.find((item) => item.kind === "reader-feedback");
  feedback.claimIds = ["CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Reader feedback .* bypasses governance and links directly to a claim/
  );
});

test("every projection requires a compositional rationale", () => {
  const candidate = cloneBank();
  const claim = candidate.claims.find((item) =>
    item.projections.some((projection) => projection.status === "hold")
  );
  claim.projections.find((projection) => projection.status === "hold").rationale = undefined;
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Projection .* has no rationale/
  );
});

test("a claim cannot use a source for an explicitly excluded proposition", () => {
  const candidate = cloneBank();
  const relationship = candidate.claims[0].evidence[0];
  const source = candidate.sources.find((item) => item.id === relationship.sourceId);
  source.doesNotEstablish.push(relationship.supports[0]);
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /uses .* to support a proposition the source does not establish/
  );
});

test("high-risk projections retain their evidence posture", () => {
  const byId = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  assert.match(
    byId.get("CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS").projections[0].text,
    /portfolio presents .* historical evidence/i
  );
  assert.match(
    byId.get("CLM-WATERWAYS-RAFT-EXPEDITION").projections.find((item) => item.key === "about").text,
    /Gulf of Mexico/i
  );
  assert.match(
    byId.get("CLM-TALKS-NOT-RAIDS-ADVOCACY").projections.find((item) => item.key === "case-study").text,
    /Testified .* supported the coalition's .* campaign/i
  );
  const waterwaysProof = proofClaims.find(
    (proof) => proof.id === "waterways-participatory-practice"
  );
  assert.match(waterwaysProof.publicWording, /Gulf of Mexico/i);
  assert.ok(
    readFileSync("docs/knowledge-bank/claims.md", "utf8").includes(
      `**Public wording:** ${waterwaysProof.publicWording}`
    )
  );
  const participatoryProject = readFileSync(
    "docs/knowledge-bank/projects/participatory-public-practice.md",
    "utf8"
  );
  assert.match(participatoryProject, /Gulf of Mexico/);
  assert.match(participatoryProject, /8th Street Tunnel/);
  assert.match(participatoryProject, /Claudette/);
  assert.doesNotMatch(participatoryProject, /Use "reached salt water"/);
  const claudetteAbout = byId
    .get("CLM-CLAUDETTE-AR-COLLABORATION")
    .projections.find((item) => item.key === "about").text;
  for (const credit of [
    "Michael Rees",
    "Anne Dufy Burkart",
    "Julia Fredenberg",
    "Claudette"
  ]) {
    assert.match(claudetteAbout, new RegExp(credit));
  }
  const coalitionProject = readFileSync(
    "docs/knowledge-bank/projects/nyc-artist-coalition.md",
    "utf8"
  );
  assert.match(coalitionProject, /Save NYC Spaces/);
  assert.match(coalitionProject, /commercial-rent protections/);
  const marchProof = proofClaims.find(
    (proof) => proof.id === "march-transparency-to-cure"
  );
  assert.match(marchProof.publicWording, /^Advocated M\.A\.R\.C\.H\. transparency/);
  assert.match(marchProof.detailedPublicWording, /does not establish .* caused/i);
  assert.doesNotMatch(marchProof.publicWording, /^Contributed to/);
});

test("reader feedback resolves to a public governance artifact", () => {
  const feedback = knowledgeBank.intake.find((item) => item.kind === "reader-feedback");
  assert.equal(feedback.disposition, "governance-updated");
  assert.ok(feedback.artifactPaths.length > 0);
  assert.deepEqual(feedback.inquiryIds, [
    "INQ-READER-FEEDBACK-PROJECTION-GOVERNANCE"
  ]);
  assert.deepEqual(validateKnowledgeLifecycle(), []);
});

test("governance artifacts alone cannot dispose active intake", () => {
  const candidate = cloneBank();
  const feedback = candidate.intake.find((item) => item.kind === "reader-feedback");
  feedback.inquiryIds = [];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Intake INT-READER-FEEDBACK-.* has no source, inquiry, claim, or correction disposition/
  );
});

test("a concrete claim-generated photo lead returns to inquiry", () => {
  const lead = knowledgeBank.intake.find(
    (item) => item.id === "INT-WATERWAYS-PHOTO-LEAD-2026-07-12"
  );
  assert.equal(lead.status, "researching");
  assert.deepEqual(lead.claimIds, []);
  assert.deepEqual(lead.inquiryIds, ["INQ-WATERWAYS-PHOTO-SELECTS"]);
});

test("unlinked proof claims remain visible research backlog", () => {
  const report = knowledgeLifecycleReport();
  assert.ok(report.canonicallyLinkedProofIds.length > 0);
  assert.ok(report.proofResearchBacklogIds.length > 0);
  assert.equal(
    report.canonicallyLinkedProofIds.length + report.proofResearchBacklogIds.length,
    proofClaims.length
  );
  assert.equal(report.proofProjectionDecisions.length, proofClaims.length);
  assert.ok(
    report.proofProjectionDecisions.every(
      (decision) =>
        decision.surfaces.length > 0 && decision.rationale && decision.guardrail
    )
  );
});
