import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { publicPhotoManifest } from "../../apps/www/src/data/photography.ts";
import { compileWiki } from "../knowledge-wiki/lib.mjs";
import {
  applyPhotoRevocation,
  buildPhotoReports,
  buildWithdrawalPlan,
  comparePhotoEditions,
  compilePhotoEdition,
  defaultRepoRoot,
  evaluatePhotoKnowledge,
  loadPhotoKnowledge,
  validateRestorationDecision
} from "./lib.mjs";

function manifest() {
  return structuredClone(loadPhotoKnowledge());
}

const restorationPhotoId = "photo.east-river-manhattan-bridge.2022";
const restorationPlanId = `withdrawal.${restorationPhotoId}`;
const restorationRecordId = "decision.photo.restoration.east-river.2026-07-27";
const restorationRecordPath =
  "docs/knowledge-bank/decisions/photo-restoration-east-river-2026-07-27.md";
const restorationImplementedAt = "2026-07-26T10:00:00Z";
const restorationDecidedAt = "2026-07-27T15:00:00Z";
const restorationGates = [
  "creator",
  "rights",
  "consent",
  "exact-credit",
  "crop",
  "caption",
  "represented-person",
  "editorial",
  "production",
  "deployment",
  "indexing"
];

function historicalWithdrawal() {
  const withdrawn = applyPhotoRevocation(manifest(), restorationPhotoId);
  withdrawn.historicalOccurrences[0].lifecycleState = "withdrawn";
  withdrawn.withdrawalPlans[0].status = "implemented";
  withdrawn.withdrawalPlans[0].writesApplied = true;
  withdrawn.withdrawalPlans[0].implementedAt = restorationImplementedAt;
  return withdrawn;
}

function restorationFixture() {
  const current = manifest();
  const photo = current.photos.find((item) => item.id === restorationPhotoId);
  const responsiveEvidence = JSON.parse(
    readFileSync(
      path.join(
        defaultRepoRoot,
        "docs/qa/evals-H/responsive-route-matrix.json"
      ),
      "utf8"
    )
  );
  const decision = {
    id: `restoration.${restorationPhotoId}.2026-07-27`,
    photoId: restorationPhotoId,
    withdrawalPlanId: restorationPlanId,
    decisionRecordId: restorationRecordId,
    status: "approved",
    humanReviewed: true,
    approvedBy: "Jamie Burkart",
    decidedAt: restorationDecidedAt
  };
  const record = {
    id: restorationRecordId,
    kind: "decision",
    path: restorationRecordPath,
    canonical_path: restorationRecordPath,
    decision_state: "documented",
    human_review: "completed",
    last_reviewed: "2026-07-27",
    chosen_course:
      `Restore ${restorationPhotoId} after ${restorationPlanId} as a new review candidate.`,
    resulting_artifacts: [restorationPhotoId],
    projection: { status: "pending", surfaces: [] },
    restoration_action: "restore-photo-projection",
    restoration_photo_id: restorationPhotoId,
    restoration_withdrawal_plan_id: restorationPlanId,
    restoration_decided_at: restorationDecidedAt,
    restoration_approved_by: "Jamie Burkart",
    restoration_human_reviewed: true,
    restoration_gate_reviews: restorationGates.map((gate) => ({
      gate,
      status: gate === "represented-person" ? "not-applicable" : "cleared",
      reviewed_by: gate === "creator" ? "Elana Gordon" : "Jamie Burkart",
      reviewed_at: "2026-07-27T12:00:00Z"
    })),
    restoration_occurrence_ids: photo.placements.map(
      (placement) => placement.id
    ),
    restoration_public_surface_fingerprint:
      responsiveEvidence.publicSurfaceFingerprint
  };
  const recordText = [
    "# Restore the East River photograph",
    "",
    `Jamie Burkart approves a new review candidate for ${restorationPhotoId}.`,
    `This decision follows implemented withdrawal plan ${restorationPlanId}.`
  ].join("\n");
  return {
    current,
    decision,
    record,
    recordText,
    responsiveEvidence
  };
}

function evaluateRestoration({
  recordMutation,
  decisionMutation,
  decisionHistoryFirst = false
} = {}) {
  const withdrawn = historicalWithdrawal();
  const fixture = restorationFixture();
  const decision = {
    ...fixture.decision,
    ...(decisionMutation ?? {})
  };
  const record = {
    ...fixture.record,
    ...(recordMutation ?? {})
  };
  fixture.current.restorationDecisions.push(decision);
  const wiki = compileWiki();
  wiki.byId.set(decision.decisionRecordId, record);
  const withdrawalEntry = {
    commit: "withdrawal-commit",
    relativePath: "docs/knowledge-bank/data/photo-knowledge.json",
    text: JSON.stringify(withdrawn)
  };
  const decisionEntry = {
    commit: "restoration-decision-commit",
    relativePath: record.path,
    text: fixture.recordText
  };
  return evaluatePhotoKnowledge({
    manifest: fixture.current,
    wiki,
    sourceOverrides: {
      [decision.decisionRecordId]: fixture.recordText
    },
    introducedHistorySources: decisionHistoryFirst
      ? [decisionEntry, withdrawalEntry]
      : [withdrawalEntry, decisionEntry]
  });
}

test("RFC 0003 photographic knowledge baseline passes", () => {
  const result = evaluatePhotoKnowledge();
  assert.equal(result.passed, true, result.failures.join(", "));
  assert.equal(result.counts.photos, 6);
  assert.equal(result.counts.placements, 11);
  assert.equal(result.counts.blockingCriteria, 22);
});

test("a derivative checksum drift fails closed", () => {
  const changed = manifest();
  changed.photos[0].sha256 = "0".repeat(64);
  const result = evaluatePhotoKnowledge({ manifest: changed });
  assert.equal(result.checks.photo_derivative_integrity, false);
});

test("an unregistered seventh photo cannot enter the edition", () => {
  const changed = manifest();
  changed.photos.push({
    ...structuredClone(changed.photos[0]),
    id: "photo.unreviewed",
    derivativeId: "derivative.unreviewed",
    src: "/images/field-notes/unreviewed.webp"
  });
  const result = evaluatePhotoKnowledge({ manifest: changed });
  assert.equal(result.checks.photo_manifest_exact_and_bound, false);
});

test("creator credit cannot regress to archive custody", () => {
  const sitePhotos = structuredClone(publicPhotoManifest);
  sitePhotos[0].credit = "Jamie Burkart archive.";
  const result = evaluatePhotoKnowledge({ publicPhotoManifest: sitePhotos });
  assert.equal(
    result.checks.photo_creator_correction_and_history_preserved,
    false
  );
});

test("the deprecated attribution state remains legible", () => {
  const wiki = compileWiki();
  const east = structuredClone(
    wiki.byId.get("photo.east-river-manhattan-bridge.2022")
  );
  east.creator_statements = east.creator_statements.filter(
    (statement) => statement.rank !== "deprecated"
  );
  wiki.byId.set(east.id, east);
  const result = evaluatePhotoKnowledge({ wiki });
  assert.equal(
    result.checks.photo_creator_correction_and_history_preserved,
    false
  );
});

test("permission cannot expand into an unrestricted license", () => {
  const wiki = compileWiki();
  const east = structuredClone(
    wiki.byId.get("photo.east-river-manhattan-bridge.2022")
  );
  east.permission_scope = "Unrestricted future use.";
  wiki.byId.set(east.id, east);
  const result = evaluatePhotoKnowledge({ wiki });
  assert.equal(result.checks.photo_permission_bounded_and_private, false);
});

test("production and indexing cannot be silently approved", () => {
  const changed = manifest();
  changed.edition.production = "approved";
  changed.edition.indexing = "approved";
  changed.photos[0].productionApproval = "approved";
  const result = evaluatePhotoKnowledge({ manifest: changed });
  assert.equal(result.checks.photo_human_gates_open, false);
  assert.equal(result.checks.photo_placements_and_edition_governed, false);
});

test("a declared route must match a rendered occurrence", () => {
  const changed = manifest();
  changed.photos[0].placements[0].route = "/nonexistent-photo-route";
  const result = evaluatePhotoKnowledge({ manifest: changed });
  assert.equal(result.checks.photo_placements_and_edition_governed, false);
});

test("a declared component and crop must match the rendered occurrence", () => {
  const changed = manifest();
  changed.photos[0].placements[0].component =
    "apps/www/src/app/about/page.tsx";
  changed.photos[0].placements[0].crop = "object-contain";
  const result = evaluatePhotoKnowledge({ manifest: changed });
  assert.equal(result.checks.photo_placements_and_edition_governed, false);
});

test("browser evidence must match the actual route occurrence population", () => {
  const evidence = JSON.parse(
    readFileSync(
      path.join(
        defaultRepoRoot,
        "docs/qa/evals-H/responsive-route-matrix.json"
      ),
      "utf8"
    )
  );
  const changed = structuredClone(evidence);
  const workRow = changed.rows.find(
    (row) => row.viewport === 1280 && row.path === "/work"
  );
  workRow.photoOccurrences.push({
    ...workRow.photoOccurrences[0],
    placementId: "placement.work.kc-town-hall-before.layout-b",
    photoId: "photo.kc-town-hall-before"
  });
  const result = evaluatePhotoKnowledge({ responsiveEvidence: changed });
  assert.equal(result.checks.photo_browser_occurrences_bound, false);
});

test("alt text and caption drift cannot leave the site projection green", () => {
  const sitePhotos = structuredClone(publicPhotoManifest);
  sitePhotos[0].alt = "";
  sitePhotos[0].caption = "Unsupported replacement caption.";
  const result = evaluatePhotoKnowledge({ publicPhotoManifest: sitePhotos });
  assert.equal(result.checks.photo_manifest_exact_and_bound, false);
});

test("every rendered photo pathway must preserve caption and credit", () => {
  const workCardPath = "apps/www/src/components/WorkCard.tsx";
  const original = readFileSync(
    path.join(defaultRepoRoot, workCardPath),
    "utf8"
  );
  const changed = original.replace(
    '<FieldPhoto\n              crop="aspect-[4/3] object-cover object-top"',
    '<div\n              data-credit-omitted="true"'
  );
  const result = evaluatePhotoKnowledge({
    applicationSourceOverrides: { [workCardPath]: changed }
  });
  assert.equal(result.checks.photo_caption_credit_rendered, false);
});

test("a persisted revoked permission with active placements fails closed", () => {
  const changed = manifest();
  changed.photos[0].permissionState = "revoked";
  const result = evaluatePhotoKnowledge({ manifest: changed });
  assert.equal(result.checks.photo_revocation_fails_closed, false);
  assert.equal(result.passed, false);
});

test("unresolved rights work cannot be synthetically closed", () => {
  const wiki = compileWiki();
  for (const id of [
    "photo.raft-riverboat",
    "photo.kc-town-hall-before",
    "photo.tired-of-tires-load",
    "photo.paper-trimming",
    "photo.printed-editions"
  ]) {
    const record = structuredClone(wiki.byId.get(id));
    record.rights_state = "cleared";
    record.creator_state = "confirmed";
    wiki.byId.set(id, record);
  }
  const result = evaluatePhotoKnowledge({ wiki });
  assert.equal(result.checks.photo_human_gates_open, false);
});

test("introduced branch history leakage fails the public boundary", () => {
  const protectedLocator = ["/", "Volumes", "/private/photo-library"].join("");
  const result = evaluatePhotoKnowledge({
    introducedHistorySources: [
      {
        relativePath: "docs/knowledge-bank/assets/leaked.md",
        text: protectedLocator
      }
    ]
  });
  assert.equal(
    result.checks.photo_introduced_history_boundary_clean,
    false
  );
});

test("obsolete homepage occurrence copy fails closed", () => {
  const id = "portfolio.photo.home-east-river.layout-b";
  const wiki = compileWiki();
  const record = wiki.byId.get(id);
  const original = readFileSync(
    path.join(defaultRepoRoot, record.path),
    "utf8"
  );
  const changed = original.replace(
    "I create operating structure for complex\npublic-facing teams",
    "I help emerging work become usable systems"
  );
  const result = evaluatePhotoKnowledge({
    wiki,
    sourceOverrides: { [id]: changed }
  });
  assert.equal(result.checks.photo_occurrence_copy_bound, false);
});

test("a recollection cannot automatically become a public projection", () => {
  const wiki = compileWiki();
  const id = "source.recollection.jamie.canoe-commuting.2026-07";
  const record = structuredClone(wiki.byId.get(id));
  record.projection = { status: "active", surfaces: ["/"] };
  wiki.byId.set(id, record);
  const result = evaluatePhotoKnowledge({ wiki });
  assert.equal(result.checks.photo_recollection_nonpublishing, false);
});

test("journey counts cannot be inferred from photo counts", () => {
  const wiki = compileWiki();
  const id = "research-inquiry.canoe-bike-journeys";
  const record = wiki.byId.get(id);
  const original = readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
  const temporary = original.replace(
    "Count journeys, not photographs.",
    "Count every photograph as a separate journey."
  );
  const result = evaluatePhotoKnowledge({
    wiki,
    sourceOverrides: { [id]: temporary }
  });
  assert.equal(result.checks.photo_inquiry_avoids_photo_counting, false);
  assert.match(original, /Count journeys, not photographs/);
});

test("curatorial ranking cannot become publication authority", () => {
  const wiki = compileWiki();
  const id = "evaluation.photo-curation.home-east-river.2026-07-26";
  const record = structuredClone(wiki.byId.get(id));
  record.panel_authority = "automatic-publication";
  wiki.byId.set(id, record);
  const result = evaluatePhotoKnowledge({ wiki });
  assert.equal(result.checks.photo_curatorial_authority_advisory, false);
});

test("protected absence cannot be auto-promoted", () => {
  const wiki = compileWiki();
  const id = "decision.photo.protected-absence.layout-b";
  const record = structuredClone(wiki.byId.get(id));
  record.projection = { status: "active", surfaces: ["/"] };
  wiki.byId.set(id, record);
  const changed = manifest();
  changed.protectedAbsences[0].status = "auto-promoted";
  const result = evaluatePhotoKnowledge({ wiki, manifest: changed });
  assert.equal(result.checks.photo_protected_absence_first_class, false);
});

test("revocation places the photo, occurrence, and edition on hold", () => {
  const changed = applyPhotoRevocation(
    manifest(),
    "photo.east-river-manhattan-bridge.2022"
  );
  const photo = changed.photos[0];
  assert.equal(photo.permissionState, "revoked");
  assert.equal(photo.productionApproval, "hold");
  assert(photo.placements.every((placement) => placement.production === "hold"));
  assert.equal(changed.edition.production, "hold");
  assert.equal(changed.edition.indexing, "hold");
  assert.equal(changed.historicalOccurrences.length, 1);
  assert.equal(changed.historicalOccurrences[0].renders, false);
  assert.equal(changed.withdrawalPlans.length, 1);
  assert.equal(changed.withdrawalPlans[0].writesApplied, false);
  assert.equal(changed.withdrawalPlans[0].activeProjectionPresent, true);
});

test("withdrawal planning is specific, historical, and non-executing", () => {
  const plan = buildWithdrawalPlan(
    manifest(),
    "photo.kc-town-hall-before"
  );
  assert.equal(plan.currentOccurrences.length, 3);
  assert.equal(plan.activeProjectionPresent, true);
  assert.equal(plan.writesApplied, false);
  assert.match(plan.historicalOccurrencePolicy, /non-rendering tombstone/i);
  assert.match(plan.rollbackPolicy, /new human-reviewed publication decision/i);
  assert(plan.requiredActions.some((action) => /public derivative/i.test(action)));
});

test("edition comparison reports additions, removals, and changed occurrences", () => {
  const current = compilePhotoEdition(manifest());
  const previous = structuredClone(current);
  previous.id = "edition.portfolio.layout-b.previous";
  previous.occurrences.shift();
  previous.occurrences[0].caption = "Earlier caption.";
  previous.occurrences.push({
    ...structuredClone(previous.occurrences[0]),
    placement: "placement.retired.example"
  });
  const comparison = comparePhotoEditions(current, previous);
  assert(comparison.added.length >= 1);
  assert.deepEqual(comparison.removed, ["placement.retired.example"]);
  assert(comparison.changed.length >= 1);
  assert.equal(comparison.automaticSelection, false);
});

test("edition CLI rejects an unavailable comparison snapshot", () => {
  const result = spawnSync(
    process.execPath,
    [
      "scripts/photo-knowledge/report.mjs",
      "--section",
      "edition",
      "--compare",
      "docs/knowledge-bank/data/photo-editions/missing.json"
    ],
    { cwd: defaultRepoRoot, encoding: "utf8" }
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown comparison edition/);
});

test("curatorial run is bound to a named asset and occurrence", () => {
  const output = execFileSync(
    process.execPath,
    [
      "scripts/photo-knowledge/curatorial.mjs",
      "--run",
      "--photo",
      "photo.kc-town-hall-before",
      "--placement",
      "placement.work.kc-town-hall-before.layout-b"
    ],
    { cwd: defaultRepoRoot, encoding: "utf8" }
  );
  const proposal = JSON.parse(output);
  assert.equal(proposal.asset.id, "photo.kc-town-hall-before");
  assert.equal(
    proposal.occurrence.id,
    "placement.work.kc-town-hall-before.layout-b"
  );
  assert.equal(proposal.occurrence.route, "/work");
  assert.equal(proposal.writesApplied, false);
  assert.equal(proposal.lead.automaticSelection, false);
});

test("curatorial run rejects an unknown asset", () => {
  const result = spawnSync(
    process.execPath,
    [
      "scripts/photo-knowledge/curatorial.mjs",
      "--run",
      "--photo",
      "photo.not-registered"
    ],
    { cwd: defaultRepoRoot, encoding: "utf8" }
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown photo/);
});

test("impact and health expose withdrawal and runtime consequences", () => {
  const report = JSON.parse(
    buildPhotoReports({
      impactPhotoId: "photo.kc-town-hall-before",
      impactChangeType: "withdrawal"
    })["reports/photo-knowledge.json"]
  );
  assert.equal(report.impact.withdrawalPlan.photoId, "photo.kc-town-hall-before");
  assert.equal(report.impact.withdrawalPlan.writesApplied, false);
  assert.equal(report.impact.routes.length, 3);
  assert.equal(report.health.runtimeOccurrenceEvidence.expectedDesktopOccurrences, 11);
  assert.equal(report.health.maintenance.automaticWithdrawal, false);
  assert.equal(report.health.maintenance.automaticRestoration, false);
});

test("an RFC stage regression fails the implementation contract", () => {
  const rfc = readFileSync(
    path.join(
      defaultRepoRoot,
      "rfcs/0003-living-photographic-knowledge-loop.md"
    ),
    "utf8"
  ).replace("stage: implementing", "stage: proposed");
  const result = evaluatePhotoKnowledge({ rfc });
  assert.equal(result.checks.photo_rfc_0003_implementing_and_indexed, false);
});

test("a protected local locator fails the public boundary", () => {
  const protectedLocator = ["/", "Volumes", "/private/photo-library"].join("");
  const result = evaluatePhotoKnowledge({
    publicBoundaryExtraSources: [protectedLocator]
  });
  assert.equal(result.checks.photo_public_boundary_clean, false);
});

test("a private tmp locator fails the public boundary", () => {
  const protectedLocator = ["/", "private", "/tmp/photo-original.jpg"].join("");
  const result = evaluatePhotoKnowledge({
    publicBoundaryExtraSources: [protectedLocator]
  });
  assert.equal(result.checks.photo_public_boundary_clean, false);
});

test("a private tmp locator in introduced history fails closed", () => {
  const protectedLocator = ["/", "private", "/tmp/photo-original.jpg"].join("");
  const result = evaluatePhotoKnowledge({
    introducedHistorySources: [
      {
        relativePath: "docs/knowledge-bank/assets/leaked-private-tmp.md",
        text: protectedLocator
      }
    ]
  });
  assert.equal(
    result.checks.photo_introduced_history_boundary_clean,
    false
  );
});

test("an implemented withdrawal cannot be erased by repository rollback", () => {
  const withdrawn = applyPhotoRevocation(
    manifest(),
    "photo.east-river-manhattan-bridge.2022"
  );
  withdrawn.historicalOccurrences[0].lifecycleState = "withdrawn";
  withdrawn.withdrawalPlans[0].status = "implemented";
  withdrawn.withdrawalPlans[0].writesApplied = true;
  const result = evaluatePhotoKnowledge({
    introducedHistorySources: [
      {
        relativePath: "docs/knowledge-bank/data/photo-knowledge.json",
        text: JSON.stringify(withdrawn)
      }
    ]
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
  assert.equal(result.counts.historicalRevocationConflicts, 1);
  assert.equal(result.passed, false);
});

test("restoration requires a new canonical human-reviewed decision", () => {
  const result = evaluateRestoration();
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    true
  );
  assert.equal(result.counts.restorationDecisionConflicts, 0);
});

test("an unrelated or contradictory decision cannot authorize restoration", () => {
  const result = evaluateRestoration({
    recordMutation: {
      restoration_action: undefined,
      chosen_course:
        "Represent a protected absence and continue to withhold photographs."
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
  assert.equal(result.counts.restorationDecisionConflicts, 1);
});

test("a restoration decision must be materialized after the withdrawal", () => {
  const result = evaluateRestoration({ decisionHistoryFirst: true });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("manifest approval fields cannot replace canonical human review", () => {
  const result = evaluateRestoration({
    recordMutation: {
      human_review: "not-requested",
      restoration_human_reviewed: false,
      restoration_gate_reviews: []
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("restoration must postdate the implemented withdrawal", () => {
  const result = evaluateRestoration({
    decisionMutation: {
      decidedAt: "2026-07-25T15:00:00Z"
    },
    recordMutation: {
      restoration_decided_at: "2026-07-25T15:00:00Z",
      last_reviewed: "2026-07-25"
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("restoration binds every governed gate and regenerated occurrence evidence", () => {
  const fixture = restorationFixture();
  const valid = validateRestorationDecision({
    decision: fixture.decision,
    record: fixture.record,
    recordText: fixture.recordText,
    withdrawal: {
      photoId: restorationPhotoId,
      withdrawalPlanId: restorationPlanId,
      implementedAt: restorationImplementedAt,
      commitOrder: 0
    },
    materializedVersion: {
      commitOrder: 1,
      text: fixture.recordText
    },
    expectedOccurrenceIds:
      fixture.record.restoration_occurrence_ids,
    publicSurfaceFingerprint:
      fixture.responsiveEvidence.publicSurfaceFingerprint
  });
  assert.equal(valid, true);

  const missingRightsGate = {
    ...fixture.record,
    restoration_gate_reviews:
      fixture.record.restoration_gate_reviews.filter(
        (review) => review.gate !== "rights"
      )
  };
  assert.equal(
    validateRestorationDecision({
      decision: fixture.decision,
      record: missingRightsGate,
      recordText: fixture.recordText,
      withdrawal: {
        photoId: restorationPhotoId,
        withdrawalPlanId: restorationPlanId,
        implementedAt: restorationImplementedAt,
        commitOrder: 0
      },
      materializedVersion: {
        commitOrder: 1,
        text: fixture.recordText
      },
      expectedOccurrenceIds:
        fixture.record.restoration_occurrence_ids,
      publicSurfaceFingerprint:
        fixture.responsiveEvidence.publicSurfaceFingerprint
    }),
    false
  );
});
