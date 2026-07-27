import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { publicPhotoManifest } from "../../apps/www/src/data/photography.ts";
import {
  compileWiki,
  wikiRecordSchema
} from "../knowledge-wiki/lib.mjs";
import {
  applyPhotoRevocation,
  buildPhotoReports,
  buildWithdrawalPlan,
  comparePhotoEditions,
  compilePhotoEdition,
  defaultRepoRoot,
  evaluatePhotoKnowledge,
  loadPhotoAuthorityRegistry,
  loadPhotoKnowledge,
  validateRestorationDecision
} from "./lib.mjs";

function manifest() {
  return structuredClone(loadPhotoKnowledge());
}

function authorityRegistry() {
  return structuredClone(loadPhotoAuthorityRegistry());
}

const restorationPhotoId = "photo.east-river-manhattan-bridge.2022";
const restorationPlanId = `withdrawal.${restorationPhotoId}`;
const restorationRecordId = "decision.photo.restoration.east-river.2026-07-26";
const restorationRecordPath =
  "docs/knowledge-bank/decisions/photo-restoration-east-river-2026-07-26.md";
const restorationImplementedAt = "2026-07-24T10:00:00Z";
const restorationDecidedAt = "2026-07-26T20:00:00Z";
const restorationReviewedAt = "2026-07-26T12:00:00Z";
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
    id: `restoration.${restorationPhotoId}.2026-07-26`,
    photoId: restorationPhotoId,
    withdrawalPlanId: restorationPlanId,
    decisionRecordId: restorationRecordId,
    status: "approved",
    humanReviewed: true,
    approvedBy: "Jamie Burkart",
    decidedAt: restorationDecidedAt
  };
  const approvalStatement =
    `Jamie Burkart approved restoration of ${restorationPhotoId} after ` +
    `implemented withdrawal ${restorationPlanId}.`;
  const gateEvidence = {
    creator: ["source.permission.elana-gordon.east-river-portfolio"],
    rights: ["source.permission.elana-gordon.east-river-portfolio"],
    consent: [restorationPhotoId],
    "exact-credit": [
      "source.permission.elana-gordon.east-river-portfolio",
      restorationPhotoId
    ],
    crop: ["evaluation.photo-curation.home-east-river.2026-07-26"],
    caption: [restorationPhotoId],
    "represented-person": [restorationPhotoId],
    editorial: ["evaluation.photo-curation.home-east-river.2026-07-26"],
    production: ["edition.portfolio.layout-b.2026-07"],
    deployment: ["edition.portfolio.layout-b.2026-07"],
    indexing: ["edition.portfolio.layout-b.2026-07"]
  };
  const gatePolicy = {
    creator: [
      "cleared",
      "creator-or-rights-holder",
      ["Elana Gordon"]
    ],
    rights: [
      "cleared",
      "creator-or-rights-holder",
      ["Elana Gordon"]
    ],
    consent: [
      "cleared",
      "represented-person-or-consent-authority",
      ["Jamie Burkart"]
    ],
    "exact-credit": [
      "cleared",
      "creator-and-editorial-owner",
      ["Elana Gordon", "Jamie Burkart"]
    ],
    crop: [
      "cleared",
      "creator-and-editorial-owner",
      ["Elana Gordon", "Jamie Burkart"]
    ],
    caption: [
      "cleared",
      "creator-and-editorial-owner",
      ["Elana Gordon", "Jamie Burkart"]
    ],
    "represented-person": [
      "cleared",
      "represented-person",
      ["Jamie Burkart"]
    ],
    editorial: ["cleared", "portfolio-owner", ["Jamie Burkart"]],
    production: [
      "open-separated-gate",
      "production-owner",
      ["Jamie Burkart"]
    ],
    deployment: [
      "open-separated-gate",
      "deployment-owner",
      ["Jamie Burkart"]
    ],
    indexing: [
      "open-separated-gate",
      "indexing-owner",
      ["Jamie Burkart"]
    ]
  };
  const record = {
    id: restorationRecordId,
    title: "Restore the East River photograph to working review",
    kind: "decision",
    status: "governed-open",
    visibility: "public-safe",
    sensitivity: "moderate",
    last_reviewed: "2026-07-26",
    review_by: "2026-10-26",
    path: restorationRecordPath,
    canonical_path: restorationRecordPath,
    summary:
      "Jamie-reviewed restoration decision for a working-review projection; production, deployment, and indexing remain separate.",
    decision_period: "2026-07",
    decision_state: "documented",
    decision_question:
      `Should ${restorationPhotoId} be restored after ${restorationPlanId} as a new working-review projection?`,
    decision_actors: [
      "Jamie Burkart as portfolio decision owner",
      "Elana Gordon as creator and rights authority"
    ],
    constraints: [
      "Restoration cannot silently reverse an implemented withdrawal.",
      "Production, deployment, and indexing remain separate gates."
    ],
    options_considered: [
      {
        option:
          `Restore ${restorationPhotoId} after implemented withdrawal ${restorationPlanId} as a new working-review projection.`,
        disposition: "chosen",
        evidence_state: "documented"
      },
      {
        option: "Continue the current withdrawal.",
        disposition: "not-chosen",
        evidence_state: "documented"
      }
    ],
    human_review: "completed",
    chosen_course:
      `Restore ${restorationPhotoId} after implemented withdrawal ${restorationPlanId} as a new working-review projection. Production, deployment, and indexing remain open separate human gates.`,
    resulting_artifacts: [restorationPhotoId],
    outcome_boundary:
      "This restores a working-review projection only; production, deployment, and indexing remain open.",
    credit_scope: "individual-and-collective",
    unknowns: [
      "A later edition may require a different crop or caption."
    ],
    anti_claims: [
      "A later human-reviewed withdrawal remains available.",
      "Restoration does not broaden creator permission or represented-person consent.",
      "Working-review restoration is not production publication approval."
    ],
    projection: { status: "pending", surfaces: [] },
    restoration_action: "restore-photo-projection",
    restoration_photo_id: restorationPhotoId,
    restoration_withdrawal_plan_id: restorationPlanId,
    restoration_withdrawal_implemented_at: restorationImplementedAt,
    restoration_decided_at: restorationDecidedAt,
    restoration_approved_by: "Jamie Burkart",
    restoration_human_reviewed: true,
    restoration_approval_statement: approvalStatement,
    restoration_gate_reviews: restorationGates.map((gate) => {
      const [status, authority, reviewedBy] = gatePolicy[gate];
      return {
        gate,
        status,
        authority,
        reviewed_by: reviewedBy,
        reviewed_at: restorationReviewedAt,
        evidence_ids: gateEvidence[gate]
      };
    }),
    restoration_occurrence_ids: photo.placements.map(
      (placement) => placement.id
    ),
    restoration_public_surface_fingerprint:
      responsiveEvidence.publicSurfaceFingerprint
  };
  const recordText = [
    "# Restore photo projection",
    "",
    approvalStatement,
    "",
    "This record restores only the exact named working-review occurrences. Production, deployment, and indexing remain open separate human gates."
  ].join("\n");
  return {
    current,
    decision,
    record,
    recordText,
    responsiveEvidence
  };
}

function restorationEvidenceMap(fixture = restorationFixture()) {
  const records = new Map(compileWiki().byId);
  const reviews = new Map(
    fixture.record.restoration_gate_reviews.map((review) => [
      review.gate,
      {
        photo_id: restorationPhotoId,
        gate: review.gate,
        status: review.status,
        authority: review.authority,
        reviewed_by: review.reviewed_by,
        reviewed_at: review.reviewed_at,
        scope: "Exact working-review restoration occurrence."
      }
    ])
  );
  const withReviews = (id, gates, additions = {}) => {
    records.set(id, {
      ...records.get(id),
      ...additions,
      photo_gate_reviews: gates.map((gate) => reviews.get(gate))
    });
  };
  withReviews(
    "source.permission.elana-gordon.east-river-portfolio",
    ["creator", "rights", "exact-credit"],
    { credit_review_state: "cleared" }
  );
  withReviews(
    restorationPhotoId,
    ["consent", "exact-credit", "caption", "represented-person"],
    {
      credit_review_state: "cleared",
      caption_review_state: "cleared",
      represented_people: ["Jamie Burkart"],
      consent_authorities: ["Jamie Burkart"]
    }
  );
  withReviews(
    "evaluation.photo-curation.home-east-river.2026-07-26",
    ["crop", "editorial"],
    {
      review_resolution: "resolved",
      crop_review_state: "cleared",
      editorial_review_state: "cleared",
      projection: { status: "pending", surfaces: [] },
      dissent:
        "Resolved for the exact working-review occurrence; production remains open."
    }
  );
  withReviews(
    "edition.portfolio.layout-b.2026-07",
    ["production", "deployment", "indexing"]
  );
  return records;
}

function restorationEvidenceVersions(records, commitOrder = 1) {
  const evidenceIds = [
    ...new Set(
      restorationFixture().record.restoration_gate_reviews.flatMap(
        (review) => review.evidence_ids
      )
    )
  ];
  return new Map(
    evidenceIds.map((id, entryIndex) => {
      const currentText = JSON.stringify(records.get(id));
      return [
        id,
        {
          commit: "evidence-review-commit",
          commitOrder,
          entryIndex,
          text: currentText,
          currentText
        }
      ];
    })
  );
}

function restorationAuthorityVersion(registry, commitOrder = 1) {
  const currentText = JSON.stringify(registry);
  return {
    commit: "authority-attestation-commit",
    commitOrder,
    entryIndex: 0,
    text: currentText,
    currentText
  };
}

function evaluateRestoration({
  recordMutation,
  decisionMutation,
  decisionHistoryFirst = false,
  evidenceHistoryAfterDecision = false,
  authorityHistoryAfterDecision = false,
  recordTextMutation,
  evidenceRecordsMutation,
  authorityRegistryMutation
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
  const evidenceRecords = restorationEvidenceMap(fixture);
  evidenceRecordsMutation?.(evidenceRecords);
  const authorities = authorityRegistry();
  authorityRegistryMutation?.(authorities);
  const authorityRegistryText = JSON.stringify(authorities);
  wiki.byId = evidenceRecords;
  wiki.byId.set(decision.decisionRecordId, record);
  const withdrawalEntry = {
    commit: "withdrawal-commit",
    relativePath: "docs/knowledge-bank/data/photo-knowledge.json",
    text: JSON.stringify(withdrawn)
  };
  const recordText = recordTextMutation ?? fixture.recordText;
  const decisionEntry = {
    commit: "restoration-decision-commit",
    relativePath: record.path,
    text: recordText
  };
  const evidenceIds = [
    ...new Set(
      record.restoration_gate_reviews.flatMap(
        (review) => review.evidence_ids
      )
    )
  ];
  const evidenceSourceOverrides = Object.fromEntries(
    evidenceIds.map((id) => [id, JSON.stringify(evidenceRecords.get(id))])
  );
  const evidenceEntries = evidenceIds.map((id) => ({
    commit: "evidence-review-commit",
    relativePath: evidenceRecords.get(id).path,
    text: evidenceSourceOverrides[id]
  }));
  const authorityEntry = {
    commit: "authority-attestation-commit",
    relativePath: "docs/knowledge-bank/data/photo-authorities.json",
    text: authorityRegistryText
  };
  return evaluatePhotoKnowledge({
    manifest: fixture.current,
    authorityRegistry: authorities,
    authorityRegistryText,
    wiki,
    sourceOverrides: {
      ...evidenceSourceOverrides,
      [decision.decisionRecordId]: recordText
    },
    introducedHistorySources: decisionHistoryFirst
      ? [
          decisionEntry,
          withdrawalEntry,
          authorityEntry,
          ...evidenceEntries
        ]
      : authorityHistoryAfterDecision
        ? [
            withdrawalEntry,
            ...evidenceEntries,
            decisionEntry,
            authorityEntry
          ]
        : evidenceHistoryAfterDecision
        ? [
            withdrawalEntry,
            authorityEntry,
            decisionEntry,
            ...evidenceEntries
          ]
        : [
            withdrawalEntry,
            authorityEntry,
            ...evidenceEntries,
            decisionEntry
          ]
  });
}

test("RFC 0003 photographic knowledge baseline passes", () => {
  const result = evaluatePhotoKnowledge();
  assert.equal(result.passed, true, result.failures.join(", "));
  assert.equal(result.counts.photos, 6);
  assert.equal(result.counts.placements, 11);
  assert.equal(result.counts.blockingCriteria, 23);
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
      decidedAt: "2026-07-23T15:00:00Z"
    },
    recordMutation: {
      restoration_decided_at: "2026-07-23T15:00:00Z",
      last_reviewed: "2026-07-23"
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("restoration binds every governed gate and regenerated occurrence evidence", () => {
  const fixture = restorationFixture();
  const recordById = restorationEvidenceMap(fixture);
  const authorities = authorityRegistry();
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
      fixture.responsiveEvidence.publicSurfaceFingerprint,
    recordById,
    evidenceMaterializedVersions:
      restorationEvidenceVersions(recordById),
    authorityRegistry: authorities,
    authorityRegistryMaterializedVersion:
      restorationAuthorityVersion(authorities),
    now: Date.parse("2026-07-26T23:59:59Z")
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
        fixture.responsiveEvidence.publicSurfaceFingerprint,
      recordById,
      evidenceMaterializedVersions:
        restorationEvidenceVersions(recordById),
      authorityRegistry: authorities,
      authorityRegistryMaterializedVersion:
        restorationAuthorityVersion(authorities),
      now: Date.parse("2026-07-26T23:59:59Z")
    }),
    false
  );

  const weakenedRecordById = new Map(recordById);
  weakenedRecordById.set(
    "source.permission.elana-gordon.east-river-portfolio",
    {
      ...recordById.get(
        "source.permission.elana-gordon.east-river-portfolio"
      ),
      permission_state: "review-needed"
    }
  );
  assert.equal(
    validateRestorationDecision({
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
        fixture.responsiveEvidence.publicSurfaceFingerprint,
      recordById: weakenedRecordById,
      evidenceMaterializedVersions:
        restorationEvidenceVersions(weakenedRecordById),
      authorityRegistry: authorities,
      authorityRegistryMaterializedVersion:
        restorationAuthorityVersion(authorities),
      now: Date.parse("2026-07-26T23:59:59Z")
    }),
    false
  );
});

test("restoration rejects arbitrary reviewer identities", () => {
  const fixture = restorationFixture();
  const arbitraryReviewer = {
    ...fixture.record,
    restoration_gate_reviews: fixture.record.restoration_gate_reviews.map(
      (review) => ({
        ...review,
        reviewed_by: ["Automated evaluator"]
      })
    )
  };
  const result = evaluateRestoration({
    recordMutation: {
      restoration_gate_reviews: arbitraryReviewer.restoration_gate_reviews
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("restoration rejects coordinated non-human reviewer substitution", () => {
  const fixture = restorationFixture();
  const automatedReviews = fixture.record.restoration_gate_reviews.map(
    (review) => ({
      ...review,
      reviewed_by: ["Automated evaluator"]
    })
  );
  const result = evaluateRestoration({
    recordMutation: {
      restoration_gate_reviews: automatedReviews
    },
    evidenceRecordsMutation(records) {
      for (const [id, record] of records) {
        if (!Array.isArray(record.photo_gate_reviews)) continue;
        records.set(id, {
          ...record,
          photo_gate_reviews: record.photo_gate_reviews.map((review) => ({
            ...review,
            reviewed_by: ["Automated evaluator"]
          }))
        });
      }
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("restoration evidence cannot redefine external human authority", () => {
  const cases = [
    {
      gate: "rights",
      evidenceId: "source.permission.elana-gordon.east-river-portfolio",
      mutate(record) {
        return { ...record, rights_holders: ["Automated evaluator"] };
      }
    },
    {
      gate: "consent",
      evidenceId: restorationPhotoId,
      mutate(record) {
        return {
          ...record,
          consent_authorities: ["Automated evaluator"]
        };
      }
    },
    {
      gate: "represented-person",
      evidenceId: restorationPhotoId,
      mutate(record) {
        return {
          ...record,
          represented_people: ["Automated evaluator"]
        };
      }
    }
  ];
  for (const attack of cases) {
    const result = evaluateRestoration({
      recordMutation: {
        restoration_gate_reviews:
          restorationFixture().record.restoration_gate_reviews.map(
            (review) =>
              review.gate === attack.gate
                ? {
                    ...review,
                    reviewed_by: ["Automated evaluator"]
                  }
                : review
          )
      },
      evidenceRecordsMutation(records) {
        const record = attack.mutate(records.get(attack.evidenceId));
        records.set(attack.evidenceId, {
          ...record,
          photo_gate_reviews: record.photo_gate_reviews.map((review) =>
            review.gate === attack.gate
              ? {
                  ...review,
                  reviewed_by: ["Automated evaluator"]
                }
              : review
          )
        });
      }
    });
    assert.equal(
      result.checks.photo_historical_revocation_monotonic,
      false,
      attack.gate
    );
  }
});

test("restoration requires cleared exact-credit state for every evidence record", () => {
  const result = evaluateRestoration({
    evidenceRecordsMutation(records) {
      records.set(restorationPhotoId, {
        ...records.get(restorationPhotoId),
        credit_review_state: "human-review-requested"
      });
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("restoration rejects unresolved or later evidence", () => {
  const fixture = restorationFixture();
  const authorities = authorityRegistry();
  const unresolvedRecords = restorationEvidenceMap(fixture);
  const evaluationId =
    "evaluation.photo-curation.home-east-river.2026-07-26";
  unresolvedRecords.set(evaluationId, compileWiki().byId.get(evaluationId));
  assert.equal(
    validateRestorationDecision({
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
        fixture.responsiveEvidence.publicSurfaceFingerprint,
      recordById: unresolvedRecords,
      evidenceMaterializedVersions:
        restorationEvidenceVersions(unresolvedRecords),
      authorityRegistry: authorities,
      authorityRegistryMaterializedVersion:
        restorationAuthorityVersion(authorities),
      now: Date.parse("2026-07-26T23:59:59Z")
    }),
    false
  );

  const laterRecords = restorationEvidenceMap(fixture);
  const sourceId =
    "source.permission.elana-gordon.east-river-portfolio";
  laterRecords.set(sourceId, {
    ...laterRecords.get(sourceId),
    last_reviewed: "2026-07-27"
  });
  assert.equal(
    validateRestorationDecision({
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
        fixture.responsiveEvidence.publicSurfaceFingerprint,
      recordById: laterRecords,
      evidenceMaterializedVersions:
        restorationEvidenceVersions(laterRecords),
      authorityRegistry: authorities,
      authorityRegistryMaterializedVersion:
        restorationAuthorityVersion(authorities),
      now: Date.parse("2026-07-27T23:59:59Z")
    }),
    false
  );
});

test("backdated evidence materialized after the decision fails closed", () => {
  const result = evaluateRestoration({
    evidenceHistoryAfterDecision: true
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("authority attestation materialized after the decision fails closed", () => {
  const result = evaluateRestoration({
    authorityHistoryAfterDecision: true
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("authority registry cannot grant publication authority", () => {
  const mutations = [
    (registry) => {
      registry.policy.purpose =
        "Approve production publication, deployment, and indexing.";
    },
    (registry) => {
      registry.policy.grants = [
        "production publication approval",
        "deployment approval",
        "indexing approval"
      ];
    },
    (registry) => {
      registry.policy.doesNotEstablish = [
        "production publication approval"
      ];
    },
    (registry) => {
      registry.photos.push({
        ...structuredClone(registry.photos[0]),
        photoId: "photo.kc-town-hall-before",
        basisRecordIds: ["photo.kc-town-hall-before"],
        gateReviewers: Object.fromEntries(
          restorationGates.map((gate) => [
            gate,
            ["Alex Example"]
          ])
        )
      });
    },
    (registry) => {
      registry.photos.push({
        ...structuredClone(registry.photos[0]),
        photoId: "photo.kc-town-hall-before",
        basisRecordIds: ["photo.kc-town-hall-before"],
        gateReviewers: Object.fromEntries(
          restorationGates.map((gate) => [
            gate,
            ["Automated evaluator"]
          ])
        )
      });
    },
    (registry) => {
      for (const gate of ["exact-credit", "crop", "caption"]) {
        registry.photos[0].gateReviewers[gate] = ["Jamie Burkart"];
      }
    },
    (registry) => {
      registry.photos[0].basisRecordIds.push(
        "photo.kc-town-hall-before"
      );
    },
    (registry) => {
      registry.photos[0].basisRecordIds = [
        restorationPhotoId,
        "evaluation.photo-curation.home-east-river.2026-07-26"
      ];
    }
  ];
  for (const mutate of mutations) {
    const result = evaluateRestoration({
      authorityRegistryMutation: mutate
    });
    assert.equal(
      result.checks.photo_authority_registry_bounded,
      false
    );
    assert.equal(
      result.checks.photo_historical_revocation_monotonic,
      false
    );
  }
});

test("the full Wiki schema rejects contradictory restoration semantics", () => {
  const fixture = restorationFixture();
  assert.equal(wikiRecordSchema.safeParse(fixture.record).success, true);

  const contradictory = {
    ...fixture.record,
    chosen_course: "Do not restore this photograph.",
    anti_claims: [
      "Jamie Burkart directed the team not to restore this photograph."
    ]
  };
  assert.equal(wikiRecordSchema.safeParse(contradictory).success, false);

  const result = evaluateRestoration({
    recordMutation: {
      chosen_course: contradictory.chosen_course,
      anti_claims: contradictory.anti_claims
    },
    recordTextMutation: [
      "# Do not restore",
      "",
      fixture.record.restoration_approval_statement,
      "",
      "Jamie Burkart did not approve publication and directed the team not to restore this photograph."
    ].join("\n")
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("restoration chosen course must use the affirmative canonical template", () => {
  const result = evaluateRestoration({
    recordMutation: {
      chosen_course:
        `Discuss ${restorationPhotoId} and ${restorationPlanId} at a later review.`
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("restoration body rejects equivalent contradictory additions", () => {
  const fixture = restorationFixture();
  for (const contradiction of [
    "Jamie later reversed that decision; the photograph must remain withdrawn.",
    "Restoration must not proceed.",
    "Keep the photograph withdrawn.",
    "The photograph remains prohibited from the working review."
  ]) {
    const result = evaluateRestoration({
      recordTextMutation: `${fixture.recordText}\n\n${contradiction}`
    });
    assert.equal(
      result.checks.photo_historical_revocation_monotonic,
      false,
      contradiction
    );
  }
});

test("always-applicable restoration gates cannot be waived", () => {
  const fixture = restorationFixture();
  const allNotApplicable = fixture.record.restoration_gate_reviews.map(
    (review) => ({
      ...review,
      status: "not-applicable",
      evidence_ids: []
    })
  );
  const result = evaluateRestoration({
    recordMutation: {
      restoration_gate_reviews: allNotApplicable
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
  assert.equal(
    wikiRecordSchema.safeParse({
      ...fixture.record,
      restoration_gate_reviews: allNotApplicable
    }).success,
    false
  );
});

test("restoration gate evidence must be relevant to the named photograph", () => {
  const fixture = restorationFixture();
  const unrelatedEvidence = fixture.record.restoration_gate_reviews.map(
    (review) => ({
      ...review,
      evidence_ids: ["person.jamie-burkart"]
    })
  );
  const result = evaluateRestoration({
    recordMutation: {
      restoration_gate_reviews: unrelatedEvidence
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("future-dated restoration review fails closed", () => {
  const fixture = restorationFixture();
  const future = "2099-01-01T12:00:00Z";
  const result = evaluateRestoration({
    decisionMutation: { decidedAt: future },
    recordMutation: {
      last_reviewed: "2099-01-01",
      restoration_decided_at: future,
      restoration_gate_reviews:
        fixture.record.restoration_gate_reviews.map((review) => ({
          ...review,
          reviewed_at: future
        }))
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});

test("stale restored occurrence evidence fails closed", () => {
  const result = evaluateRestoration({
    recordMutation: {
      restoration_public_surface_fingerprint: "0".repeat(64),
      restoration_occurrence_ids: ["placement.stale.example"]
    }
  });
  assert.equal(
    result.checks.photo_historical_revocation_monotonic,
    false
  );
});
