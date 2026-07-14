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
