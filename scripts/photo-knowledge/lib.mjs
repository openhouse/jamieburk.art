import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

import {
  computePublicSurfaceFingerprint
} from "../knowledge-wiki/accessibility-evidence.mjs";
import { compileWiki } from "../knowledge-wiki/lib.mjs";
import { publicPhotoManifest } from "../../apps/www/src/data/photography.ts";

export const defaultRepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

export const manifestPath = "docs/knowledge-bank/data/photo-knowledge.json";
const responsiveEvidencePath =
  "docs/qa/evals-H/responsive-route-matrix.json";

const requiredRecordIds = [
  "photo.east-river-manhattan-bridge.2022",
  "photo.raft-riverboat",
  "photo.kc-town-hall-before",
  "photo.tired-of-tires-load",
  "photo.paper-trimming",
  "photo.printed-editions",
  "index.photo-set.east-river-canoe.2022",
  "index.knowledge-wiki.photographic-knowledge-loop",
  "source.photo-metadata.east-river.2022",
  "source.permission.elana-gordon.east-river-portfolio",
  "source.recollection.jamie.canoe-commuting.2026-07",
  "research-inquiry.canoe-bike-journeys",
  "evaluation.photo-curation.home-east-river.2026-07-26",
  "decision.photo.home-east-river.layout-b",
  "decision.photo.protected-absence.layout-b",
  "portfolio.photo.home-east-river.layout-b",
  "edition.portfolio.layout-b.2026-07"
];

const photoRecordIds = [
  "photo.east-river-manhattan-bridge.2022",
  "photo.raft-riverboat",
  "photo.kc-town-hall-before",
  "photo.tired-of-tires-load",
  "photo.paper-trimming",
  "photo.printed-editions"
];

const expectedCommands = [
  "photos:check",
  "photos:report",
  "photos:placements",
  "photos:permissions",
  "photos:curatorial:check",
  "photos:curatorial:run",
  "photos:manifest",
  "photos:usage",
  "photos:impact",
  "photos:health",
  "photos:edition",
  "photos:withdrawal-plan",
  "photos:recollection",
  "photos:test"
];

const expectedReports = [
  "reports/photo-knowledge.json",
  "reports/photo-knowledge.md",
  "docs/knowledge-bank/_generated/photographic-knowledge-loop.md"
];

const introducedHistoryBase = "origin/features/layout-B";
const withdrawalPermissionStates = new Set([
  "revoked",
  "rights-blocked",
  "withdrawn"
]);
const requiredRestorationGates = [
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
const restorationGatePolicy = {
  creator: {
    authority: "creator-or-rights-holder",
    statuses: ["cleared"],
    evidenceKinds: ["source", "asset"]
  },
  rights: {
    authority: "creator-or-rights-holder",
    statuses: ["cleared"],
    evidenceKinds: ["source", "asset"]
  },
  consent: {
    authority: "represented-person-or-consent-authority",
    statuses: ["cleared", "not-applicable"],
    evidenceKinds: ["source", "asset", "decision"]
  },
  "exact-credit": {
    authority: "creator-and-editorial-owner",
    statuses: ["cleared"],
    evidenceKinds: ["source", "asset", "decision"]
  },
  crop: {
    authority: "creator-and-editorial-owner",
    statuses: ["cleared"],
    evidenceKinds: ["evaluation", "decision", "asset"]
  },
  caption: {
    authority: "creator-and-editorial-owner",
    statuses: ["cleared"],
    evidenceKinds: ["evaluation", "decision", "asset"]
  },
  "represented-person": {
    authority: "represented-person",
    statuses: ["cleared", "not-applicable"],
    evidenceKinds: ["asset", "decision", "source"]
  },
  editorial: {
    authority: "portfolio-owner",
    statuses: ["cleared"],
    evidenceKinds: ["evaluation", "decision"]
  },
  production: {
    authority: "production-owner",
    statuses: ["open-separated-gate"],
    evidenceKinds: ["projection"]
  },
  deployment: {
    authority: "deployment-owner",
    statuses: ["open-separated-gate"],
    evidenceKinds: ["projection"]
  },
  indexing: {
    authority: "indexing-owner",
    statuses: ["open-separated-gate"],
    evidenceKinds: ["projection"]
  }
};
let introducedHistoryCache;

function compareText(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function walkFiles(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .sort((a, b) => compareText(a.name, b.name))
    .flatMap((entry) => {
      const absolute = path.join(root, entry.name);
      return entry.isDirectory() ? walkFiles(absolute) : [absolute];
    });
}

function jsxStringAttribute(attributes, names) {
  for (const attribute of attributes.properties) {
    if (
      !ts.isJsxAttribute(attribute) ||
      !names.includes(attribute.name.getText()) ||
      !attribute.initializer ||
      !ts.isStringLiteral(attribute.initializer)
    ) {
      continue;
    }
    return attribute.initializer.text;
  }
  return null;
}

export function collectRenderedPhotoOccurrences(repoRoot = defaultRepoRoot) {
  const sourceRoot = path.join(repoRoot, "apps/www/src");
  return walkFiles(sourceRoot)
    .filter((file) => file.endsWith(".tsx"))
    .flatMap((absolute) => {
      const relative = path.relative(repoRoot, absolute);
      const text = readFileSync(absolute, "utf8");
      const sourceFile = ts.createSourceFile(
        absolute,
        text,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
      );
      const occurrences = [];
      const visit = (node) => {
        if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
          const placementId = jsxStringAttribute(node.attributes, [
            "placementId",
            "data-photo-placement"
          ]);
          if (placementId) {
            occurrences.push({
              placementId,
              photoId: jsxStringAttribute(node.attributes, [
                "photoId",
                "data-photo-id"
              ]),
              route: jsxStringAttribute(node.attributes, [
                "route",
                "data-photo-route"
              ]),
              crop: jsxStringAttribute(node.attributes, [
                "crop",
                "data-photo-crop"
              ]),
              component: relative,
              line:
                sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1
            });
          }
        }
        ts.forEachChild(node, visit);
      };
      visit(sourceFile);
      return occurrences;
    })
    .sort(
      (a, b) =>
        compareText(a.placementId, b.placementId) ||
        compareText(a.component, b.component) ||
        a.line - b.line
    );
}

function readIntroducedHistorySources(repoRoot = defaultRepoRoot) {
  if (
    repoRoot === defaultRepoRoot &&
    introducedHistoryCache !== undefined
  ) {
    return introducedHistoryCache;
  }
  try {
    const base = execFileSync(
      "git",
      ["merge-base", "HEAD", introducedHistoryBase],
      { cwd: repoRoot, encoding: "utf8" }
    ).trim();
    const commits = execFileSync(
      "git",
      ["rev-list", "--reverse", `${base}..HEAD`],
      { cwd: repoRoot, encoding: "utf8" }
    )
      .split("\n")
      .filter(Boolean);
    const entries = [];
    for (const commit of commits) {
      const changedPaths = execFileSync(
        "git",
        ["diff-tree", "--root", "--no-commit-id", "--name-only", "-r", "-z", commit],
        { cwd: repoRoot, encoding: "utf8" }
      )
        .split("\0")
        .filter(Boolean);
      for (const relativePath of changedPaths) {
        try {
          const bytes = execFileSync(
            "git",
            ["show", `${commit}:${relativePath}`],
            {
              cwd: repoRoot,
              encoding: "buffer",
              maxBuffer: 20 * 1024 * 1024,
              stdio: ["ignore", "pipe", "ignore"]
            }
          );
          if (bytes.includes(0)) continue;
          entries.push({
            commit,
            relativePath,
            text: bytes.toString("utf8")
          });
        } catch {
          // The path was deleted in this commit.
        }
      }
    }
    if (repoRoot === defaultRepoRoot) introducedHistoryCache = entries;
    return entries;
  } catch {
    if (repoRoot === defaultRepoRoot) introducedHistoryCache = null;
    return null;
  }
}

function collectHistoricalWithdrawalState(entries) {
  const photoIds = new Set();
  const implementedByPhoto = new Map();
  const pathVersions = new Map();
  const commitOrders = new Map();
  for (const [entryIndex, entry] of (entries ?? []).entries()) {
    if (
      typeof entry === "string"
    ) {
      continue;
    }
    const commitKey = entry.commit ?? `entry:${entryIndex}`;
    if (!commitOrders.has(commitKey)) {
      commitOrders.set(commitKey, commitOrders.size);
    }
    const commitOrder = commitOrders.get(commitKey);
    const versions = pathVersions.get(entry.relativePath) ?? [];
    versions.push({
      commit: commitKey,
      commitOrder,
      entryIndex,
      text: entry.text
    });
    pathVersions.set(entry.relativePath, versions);
    if (entry.relativePath !== manifestPath) continue;
    try {
      const snapshot = JSON.parse(entry.text);
      for (const photo of snapshot.photos ?? []) {
        if (withdrawalPermissionStates.has(photo.permissionState)) {
          photoIds.add(photo.id);
        }
      }
      for (const occurrence of snapshot.historicalOccurrences ?? []) {
        if (
          occurrence.photoId &&
          occurrence.renders === false &&
          occurrence.lifecycleState === "withdrawn"
        ) {
          photoIds.add(occurrence.photoId);
        }
      }
      for (const plan of snapshot.withdrawalPlans ?? []) {
        if (
          plan.photoId &&
          plan.status === "implemented" &&
          plan.writesApplied === true
        ) {
          photoIds.add(plan.photoId);
          const prior = implementedByPhoto.get(plan.photoId) ?? [];
          prior.push({
            photoId: plan.photoId,
            withdrawalPlanId: plan.id,
            implementedAt: plan.implementedAt,
            commit: commitKey,
            commitOrder,
            entryIndex
          });
          implementedByPhoto.set(plan.photoId, prior);
        }
      }
    } catch {
      // Only a structured historical manifest can establish a withdrawal.
    }
  }
  return { photoIds, implementedByPhoto, pathVersions };
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function canonicalJson(value) {
  if (Array.isArray(value)) return value.map(canonicalJson);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, entry]) => [key, canonicalJson(entry)])
    );
  }
  return value;
}

export function validateRestorationDecision({
  decision,
  record,
  recordText,
  withdrawal,
  materializedVersion,
  expectedOccurrenceIds,
  publicSurfaceFingerprint,
  recordById,
  now = Date.now()
}) {
  if (!decision || !record || !withdrawal || !materializedVersion) {
    return false;
  }
  const decidedAt = Date.parse(decision.decidedAt ?? "");
  const implementedAt = Date.parse(withdrawal.implementedAt ?? "");
  if (
    Number.isNaN(decidedAt) ||
    Number.isNaN(implementedAt) ||
    decidedAt <= implementedAt ||
    decidedAt > now
  ) {
    return false;
  }
  const gateReviews = Array.isArray(record.restoration_gate_reviews)
    ? record.restoration_gate_reviews
    : [];
  const gateNames = gateReviews.map((review) => review.gate);
  const gatesExact =
    gateReviews.length === requiredRestorationGates.length &&
    new Set(gateNames).size === requiredRestorationGates.length &&
    requiredRestorationGates.every((gate) => gateNames.includes(gate)) &&
    gateReviews.every((review) => {
      const reviewedAt = Date.parse(review.reviewed_at ?? "");
      const policy = restorationGatePolicy[review.gate];
      return (
        policy?.statuses.includes(review.status) &&
        review.authority === policy.authority &&
        typeof review.reviewed_by === "string" &&
        review.reviewed_by.trim().length > 0 &&
        Array.isArray(review.evidence_ids) &&
        review.evidence_ids.length > 0 &&
        new Set(review.evidence_ids).size === review.evidence_ids.length &&
        review.evidence_ids.every((id) => {
          const evidenceRecord = recordById?.get(id);
          const relevant =
            evidenceRecord?.id === decision.photoId ||
            evidenceRecord?.relations?.some(
              (relation) => relation.target === decision.photoId
            );
          return (
            policy.evidenceKinds.includes(evidenceRecord?.kind) &&
            relevant
          );
        }) &&
        !Number.isNaN(reviewedAt) &&
        reviewedAt >= implementedAt &&
        reviewedAt <= decidedAt &&
        reviewedAt <= now
      );
    });
  const occurrenceIds = Array.isArray(record.restoration_occurrence_ids)
    ? [...record.restoration_occurrence_ids].sort(compareText)
    : [];
  const expectedIds = [...(expectedOccurrenceIds ?? [])].sort(compareText);
  const approvalStatement =
    `Jamie Burkart approved restoration of ${decision.photoId} after ` +
    `implemented withdrawal ${decision.withdrawalPlanId}.`;
  const expectedChosenCourse =
    `Restore ${decision.photoId} after implemented withdrawal ` +
    `${decision.withdrawalPlanId} as a new working-review projection. ` +
    "Production, deployment, and indexing remain open separate human gates.";
  const expectedBody = [
    "# Restore photo projection",
    "",
    approvalStatement,
    "",
    "This record restores only the exact named working-review occurrences. " +
      "Production, deployment, and indexing remain open separate human gates."
  ].join("\n");
  const sourceParts =
    typeof recordText === "string"
      ? recordText.split(/^---\s*$/m)
      : [];
  const recordBody =
    sourceParts.length >= 3
      ? sourceParts.slice(2).join("\n---\n")
      : recordText;
  const chosenOptions = Array.isArray(record.options_considered)
    ? record.options_considered.filter(
      (option) => option.disposition === "chosen"
    )
    : [];
  const chosenOptionBound =
    chosenOptions.length === 1 &&
    chosenOptions[0].evidence_state === "documented" &&
    chosenOptions[0].option ===
      `Restore ${decision.photoId} after implemented withdrawal ${decision.withdrawalPlanId} as a new working-review projection.`;
  const recordTextBound =
    typeof recordText === "string" &&
    recordText.includes(decision.photoId) &&
    recordText.includes(decision.withdrawalPlanId) &&
    record.restoration_approval_statement === approvalStatement &&
    recordBody.trim() === expectedBody &&
    record.chosen_course === expectedChosenCourse;
  const materializationBound =
    materializedVersion.commitOrder > withdrawal.commitOrder &&
    materializedVersion.text === recordText;
  return (
    decision.status === "approved" &&
    decision.humanReviewed === true &&
    decision.approvedBy === "Jamie Burkart" &&
    decision.withdrawalPlanId === withdrawal.withdrawalPlanId &&
    record.kind === "decision" &&
    record.path === record.canonical_path &&
    record.path.startsWith("docs/knowledge-bank/decisions/") &&
    record.decision_state === "documented" &&
    record.human_review === "completed" &&
    record.restoration_action === "restore-photo-projection" &&
    record.restoration_photo_id === decision.photoId &&
    record.restoration_withdrawal_plan_id === decision.withdrawalPlanId &&
    record.restoration_withdrawal_implemented_at ===
      withdrawal.implementedAt &&
    record.restoration_decided_at === decision.decidedAt &&
    record.restoration_approved_by === "Jamie Burkart" &&
    record.restoration_human_reviewed === true &&
    chosenOptionBound &&
    record.last_reviewed === decision.decidedAt.slice(0, 10) &&
    record.projection?.status === "pending" &&
    record.resulting_artifacts?.includes(decision.photoId) &&
    record.chosen_course?.includes(decision.photoId) &&
    record.chosen_course?.includes(decision.withdrawalPlanId) &&
    record.restoration_public_surface_fingerprint ===
      publicSurfaceFingerprint &&
    JSON.stringify(occurrenceIds) === JSON.stringify(expectedIds) &&
    gatesExact &&
    recordTextBound &&
    materializationBound
  );
}

function compareOccurrenceRows(left, right) {
  return compareText(left.placementId, right.placementId);
}

export function validateBrowserPhotoOccurrences({
  evidence,
  manifest,
  repoRoot = defaultRepoRoot
}) {
  const current = computePublicSurfaceFingerprint(repoRoot);
  const expectedByRoute = new Map();
  for (const photo of manifest.photos) {
    for (const placement of photo.placements) {
      const row = {
        placementId: placement.id,
        photoId: photo.id,
        declaredRoute: placement.route,
        renderedRoute: placement.route,
        crop: placement.crop,
        derivative: photo.src,
        alt: photo.alt,
        caption: photo.caption,
        credit: photo.credit
      };
      const existing = expectedByRoute.get(placement.route) ?? [];
      existing.push(row);
      expectedByRoute.set(placement.route, existing);
    }
  }
  const rows = Array.isArray(evidence?.rows) ? evidence.rows : [];
  const viewports = Array.isArray(evidence?.viewports) ? evidence.viewports : [];
  const routes = Array.isArray(evidence?.routes) ? evidence.routes : [];
  const matrixComplete =
    rows.length === viewports.length * routes.length &&
    viewports.every((viewport) =>
      routes.every((route) =>
        rows.some((row) => row.viewport === viewport && row.path === route)
      )
    );
  const rowsBound = matrixComplete && rows.every((row) => {
    const actual = Array.isArray(row.photoOccurrences)
      ? [...row.photoOccurrences].sort(compareOccurrenceRows)
      : null;
    const expected = [...(expectedByRoute.get(row.path) ?? [])]
      .sort(compareOccurrenceRows);
    return actual !== null &&
      JSON.stringify(canonicalJson(actual)) ===
        JSON.stringify(canonicalJson(expected));
  });
  const expectedCount = [...expectedByRoute.values()]
    .reduce((sum, routeRows) => sum + routeRows.length, 0);
  const desktopRows = rows.filter((row) => row.viewport === 1280);
  const observedDesktopCount = desktopRows.reduce(
    (sum, row) =>
      sum + (Array.isArray(row.photoOccurrences) ? row.photoOccurrences.length : 0),
    0
  );
  return {
    passed:
      evidence?.publicSurfaceFingerprint === current.fingerprint &&
      evidence?.publicSurfaceFileCount === current.fileCount &&
      rowsBound &&
      observedDesktopCount === expectedCount,
    expectedCount,
    observedDesktopCount,
    rowsBound,
    current
  };
}

function readWebpDimensions(bytes) {
  const marker = Buffer.from([0x9d, 0x01, 0x2a]);
  const markerIndex = bytes.indexOf(marker);
  if (markerIndex < 0 || markerIndex + 7 > bytes.length) return null;
  return {
    width: bytes.readUInt16LE(markerIndex + 3) & 0x3fff,
    height: bytes.readUInt16LE(markerIndex + 5) & 0x3fff
  };
}

function recordSource(repoRoot, record) {
  return record ? readFileSync(path.join(repoRoot, record.path), "utf8") : "";
}

export function loadPhotoKnowledge(repoRoot = defaultRepoRoot) {
  return JSON.parse(readFileSync(path.join(repoRoot, manifestPath), "utf8"));
}

export function buildWithdrawalPlan(
  manifest,
  photoId,
  sitePhotos = publicPhotoManifest
) {
  const photo = manifest.photos.find((item) => item.id === photoId);
  if (!photo) throw new Error(`Unknown photo: ${photoId}`);
  const activeProjection = sitePhotos.find((item) => item.wikiId === photoId);
  return {
    id: `withdrawal.${photoId}`,
    photoId,
    status: "human-review-required",
    writesApplied: false,
    implementedAt: null,
    activeProjectionPresent: Boolean(activeProjection),
    currentOccurrences: photo.placements.map((placement) => ({
      placementId: placement.id,
      route: placement.route,
      derivativeId: photo.derivativeId,
      priorState: {
        staging: placement.staging,
        production: placement.production,
        indexing: placement.indexing
      }
    })),
    requiredActions: [
      "Place every current occurrence and the containing edition on hold.",
      "Remove the photo from the public manifest and every rendered route.",
      "Remove the public derivative when no separately approved occurrence uses it.",
      "Append a tombstoned historical occurrence without a private source locator.",
      "When the reviewed removal is applied, record its ISO implementation time.",
      "Regenerate usage, impact, health, Wiki, accessibility, and public-safety evidence.",
      "Require Jamie and any applicable creator, rights, consent, credit, and represented-person reviewers to approve a later restoration."
    ],
    historicalOccurrencePolicy:
      "Retain route, placement, derivative identity, prior state, and withdrawal reason as a non-rendering tombstone; never retain a private source locator.",
    rollbackPolicy:
      "Restoration is a new human-reviewed publication decision, not an automatic reversal.",
    humanAuthority:
      "This plan is advisory. It does not remove, restore, publish, deploy, or index anything."
  };
}

export function applyPhotoRevocation(manifest, photoId) {
  const next = structuredClone(manifest);
  const photo = next.photos.find((item) => item.id === photoId);
  if (!photo) throw new Error(`Unknown photo: ${photoId}`);
  const plan = buildWithdrawalPlan(next, photoId);
  next.historicalOccurrences ??= [];
  next.withdrawalPlans ??= [];
  next.restorationDecisions ??= [];
  for (const placement of photo.placements) {
    next.historicalOccurrences.push({
      id: `history.${placement.id}.withdrawn`,
      photoId,
      placementId: placement.id,
      derivativeId: photo.derivativeId,
      route: placement.route,
      component: placement.component,
      crop: placement.crop,
      priorState: {
        staging: placement.staging,
        production: placement.production,
        indexing: placement.indexing
      },
      lifecycleState: "withdrawal-planned",
      renders: false
    });
  }
  next.withdrawalPlans = [
    ...next.withdrawalPlans.filter((item) => item.photoId !== photoId),
    plan
  ];
  photo.permissionState = "revoked";
  photo.productionApproval = "hold";
  for (const placement of photo.placements) {
    placement.staging = "hold";
    placement.production = "hold";
    placement.indexing = "hold";
  }
  if (next.edition) {
    next.edition.status = "withdrawal-review";
    next.edition.staging = "hold";
    next.edition.production = "hold";
    next.edition.indexing = "hold";
  }
  return next;
}

export function evaluatePhotoKnowledge(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const manifest = options.manifest ?? loadPhotoKnowledge(repoRoot);
  const sitePhotos = options.publicPhotoManifest ?? publicPhotoManifest;
  const wiki = options.wiki ?? compileWiki({ repoRoot });
  const packageManifest =
    options.packageManifest ??
    JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8"));
  const responsiveEvidence =
    options.responsiveEvidence ??
    JSON.parse(
      readFileSync(path.join(repoRoot, responsiveEvidencePath), "utf8")
    );
  const rfcIndex =
    options.rfcIndex ??
    readFileSync(path.join(repoRoot, "rfcs/README.md"), "utf8");
  const rfc =
    options.rfc ??
    readFileSync(
      path.join(repoRoot, "rfcs/0003-living-photographic-knowledge-loop.md"),
      "utf8"
    );
  const byId = wiki.byId;
  const sourceOverrides = options.sourceOverrides ?? {};
  const source = (id) => {
    if (Object.hasOwn(sourceOverrides, id)) return sourceOverrides[id];
    return recordSource(repoRoot, byId.get(id));
  };
  const applicationSource = (relativePath) => {
    if (
      Object.hasOwn(
        options.applicationSourceOverrides ?? {},
        relativePath
      )
    ) {
      return options.applicationSourceOverrides[relativePath];
    }
    return readFileSync(path.join(repoRoot, relativePath), "utf8");
  };
  const east = byId.get("photo.east-river-manhattan-bridge.2022");
  const permission = byId.get(
    "source.permission.elana-gordon.east-river-portfolio"
  );
  const recollection = byId.get(
    "source.recollection.jamie.canoe-commuting.2026-07"
  );
  const inquiry = byId.get("research-inquiry.canoe-bike-journeys");
  const curation = byId.get(
    "evaluation.photo-curation.home-east-river.2026-07-26"
  );
  const occurrence = byId.get("portfolio.photo.home-east-river.layout-b");
  const edition = byId.get("edition.portfolio.layout-b.2026-07");
  const absence = byId.get("decision.photo.protected-absence.layout-b");

  const recordsMaterialized = requiredRecordIds.every((id) => byId.has(id));
  const manifestIds = manifest.photos.map((photo) => photo.id);
  const restorationDecisionsWellFormed =
    Array.isArray(manifest.restorationDecisions) &&
    new Set(
      manifest.restorationDecisions.map((decision) => decision.id)
    ).size === manifest.restorationDecisions.length &&
    manifest.restorationDecisions.every((decision) => {
      return (
        typeof decision.id === "string" &&
        decision.id.startsWith(`restoration.${decision.photoId}.`) &&
        manifestIds.includes(decision.photoId) &&
        decision.status === "approved" &&
        decision.humanReviewed === true &&
        decision.approvedBy === "Jamie Burkart" &&
        decision.withdrawalPlanId === `withdrawal.${decision.photoId}` &&
        typeof decision.decisionRecordId === "string" &&
        decision.decisionRecordId.startsWith(
          "decision.photo.restoration."
        ) &&
        typeof decision.decidedAt === "string" &&
        !Number.isNaN(Date.parse(decision.decidedAt))
      );
    });
  const photoManifestExact =
    manifest.schemaVersion === 1 &&
    manifest.governingRfc === "rfcs/0003-living-photographic-knowledge-loop.md" &&
    Array.isArray(manifest.historicalOccurrences) &&
    Array.isArray(manifest.withdrawalPlans) &&
    Array.isArray(manifest.restorationDecisions) &&
    restorationDecisionsWellFormed &&
    manifest.photos.length === 6 &&
    new Set(manifestIds).size === manifestIds.length &&
    photoRecordIds.every((id) => manifestIds.includes(id));

  const rfcImplementing =
    /^rfc:\s*3$/m.test(rfc) &&
    /^stage:\s*implementing$/m.test(rfc) &&
    /^implementation:\s*feature\/photo-knowledge-B$/m.test(rfc) &&
    rfcIndex.includes("./0003-living-photographic-knowledge-loop.md") &&
    !existsSync(path.join(repoRoot, ["rf", "ps"].join(""))) &&
    existsSync(path.join(repoRoot, "rfcs")) &&
    packageManifest.scripts?.["check:rfcs"] === "node scripts/check-rfcs.mjs" &&
    !Object.keys(packageManifest.scripts ?? {}).some(
      (key) => key === ["check:rf", "ps"].join("")
    );

  const publicProjectionBound =
    sitePhotos.length === 6 &&
    sitePhotos.every((sitePhoto) => {
      const photo = manifest.photos.find((item) => item.id === sitePhoto.wikiId);
      return (
        photo &&
        photo.src === sitePhoto.src &&
        photo.derivativeId === sitePhoto.derivativeId &&
        photo.width === sitePhoto.width &&
        photo.height === sitePhoto.height &&
        photo.alt === sitePhoto.alt &&
        photo.caption === sitePhoto.caption &&
        photo.credit === sitePhoto.credit &&
        sitePhoto.editionId === manifest.edition.id &&
        sitePhoto.productionApproval === "open" &&
        JSON.stringify(photo.placements.map((item) => item.id)) ===
          JSON.stringify(sitePhoto.placementIds)
      );
    });
  const renderedOccurrences =
    options.renderedOccurrences ?? collectRenderedPhotoOccurrences(repoRoot);
  const declaredOccurrences = manifest.photos.flatMap((photo) =>
    photo.placements.map((placement) => ({
      ...placement,
      photoId: photo.id
    }))
  );
  const declaredPlacementIds = new Set(
    declaredOccurrences.map((placement) => placement.id)
  );
  const renderedOccurrencesBound =
    declaredPlacementIds.size === declaredOccurrences.length &&
    renderedOccurrences.length === declaredOccurrences.length &&
    renderedOccurrences.every((occurrence) =>
      declaredPlacementIds.has(occurrence.placementId)
    ) &&
    declaredOccurrences.every((placement) => {
      const matches = renderedOccurrences.filter(
        (occurrence) => occurrence.placementId === placement.id
      );
      return (
        matches.length === 1 &&
        matches[0].photoId === placement.photoId &&
        matches[0].route === placement.route &&
        matches[0].crop === placement.crop &&
        matches[0].component === placement.component
      );
    });
  const browserOccurrences = validateBrowserPhotoOccurrences({
    evidence: responsiveEvidence,
    manifest,
    repoRoot
  });

  const preferredCreatorAndHistory =
    east?.creator_statements?.some(
      (statement) =>
        statement.value === "Elana Gordon" && statement.rank === "preferred"
    ) &&
    east?.creator_statements?.some(
      (statement) =>
        statement.value === "Photographer credit under review" &&
        statement.rank === "deprecated"
    ) &&
    sitePhotos.some(
      (photo) =>
        photo.wikiId === east.id &&
        photo.credit ===
          "Photograph by Elana Gordon. From Jamie Burkart’s photo archive."
    );

  const eastManifest = manifest.photos.find((photo) => photo.id === east?.id);
  const privateBindingOpaque =
    /^pfwpub_[a-f0-9]{24}$/.test(eastManifest?.publicId ?? "") &&
    eastManifest?.sourceBinding === "verified-private" &&
    east?.public_binding_id === eastManifest?.publicId &&
    !source(east?.id).includes("privateSource");

  const permissionBounded =
    east?.rights_state === "cleared" &&
    east?.permission_scope ===
      "Portfolio use discussed with the photographer; no broader license is inferred." &&
    permission?.permission_state === "cleared-bounded" &&
    /raw correspondence remains private/i.test(source(permission?.id)) &&
    /does not establish copyright transfer/i.test(
      source(permission?.id)
    );

  const derivativesReconciled = photoRecordIds.every((id) => {
    const record = byId.get(id);
    const item = manifest.photos.find((photo) => photo.id === id);
    return (
      record?.kind === "asset" &&
      record?.derivative_id === item?.derivativeId &&
      record?.derivative_path === item?.src &&
      record?.derivative_sha256 === item?.sha256 &&
      record?.production_approval === "open" &&
      ["cleared", "unknown"].includes(record?.rights_state)
    );
  });

  const derivativeIntegrity = manifest.photos.every((photo) => {
    const relative = photo.src.replace(/^\//, "");
    const absolute = path.join(repoRoot, "apps/www/public", relative);
    if (!existsSync(absolute) || !statSync(absolute).isFile()) return false;
    const bytes = readFileSync(absolute);
    const dimensions = readWebpDimensions(bytes);
    const binary = bytes.toString("latin1");
    return (
      sha256(bytes) === photo.sha256 &&
      dimensions?.width === photo.width &&
      dimensions?.height === photo.height &&
      !/EXIF|Exif|GPSLatitude|GPSLongitude|<x:xmpmeta|Photoshop 3\.0/i.test(
        binary
      )
    );
  });

  const placementsGoverned =
    occurrence?.projection_status === "pending" &&
    occurrence?.staging_state === "pending" &&
    occurrence?.production_state === "open" &&
    occurrence?.indexing_state === "open" &&
    edition?.projection_status === "pending" &&
    edition?.production_state === "open" &&
    edition?.indexing_state === "open" &&
    manifest.photos.every(
      (photo) =>
        photo.productionApproval === "open" &&
        photo.placements.length > 0 &&
        photo.placements.every(
          (placement) =>
            placement.production === "open" &&
            placement.indexing === "open" &&
            placement.staging === "pending"
        )
    );

  const recollectionNonpublishing =
    recollection?.kind === "source" &&
    recollection?.projection?.status === "hold" &&
    recollection?.projection?.surfaces?.length === 0 &&
    /does not automatically\s+expand the homepage/i.test(
      source(recollection?.id)
    );

  const inquiryAvoidsPhotoCounting =
    inquiry?.status === "governed-open" &&
    /Count journeys, not photographs/i.test(source(inquiry?.id)) &&
    /cannot alone establish a numeric public claim/i.test(
      source(recollection?.id)
    );

  const curatorialAuthorityAdvisory =
    curation?.panel_authority === "advisory-only" &&
    Boolean(curation?.blind_pass) &&
    Boolean(curation?.contextual_pass) &&
    Boolean(curation?.lead) &&
    Boolean(curation?.alternative) &&
    Boolean(curation?.dissent) &&
    /No aggregate score or ranked-choice vote may become artistic or publication authority/i.test(
      source(curation?.id).replace(/\s+/g, " ")
    );

  const protectedAbsenceFirstClass =
    absence?.kind === "decision" &&
    absence?.chosen_course?.includes("protected absence") &&
    absence?.projection?.status === "hold" &&
    manifest.protectedAbsences?.some(
      (item) =>
        item.id === "absence.intimate-gatherings.layout-b" &&
        item.status === "chosen"
    );

  const heroPath = "apps/www/src/components/Hero.tsx";
  const fieldPhotoPath = "apps/www/src/components/FieldPhoto.tsx";
  const workCardPath = "apps/www/src/components/WorkCard.tsx";
  const heroSource = applicationSource(heroPath);
  const occurrenceCopyBound =
    /I create operating structure for complex\s+public-facing teams/i.test(
      source(occurrence?.id)
    ) &&
    /I create operating structure for complex public-facing teams/i.test(
      heroSource
    ) &&
    !/I help emerging work become usable systems/i.test(
      source(occurrence?.id)
    ) &&
    !/I help emerging work become usable systems/i.test(heroSource);
  const captionAndCreditRendered =
    /\{photo\.caption\}/.test(applicationSource(fieldPhotoPath)) &&
    /\{photo\.credit\}/.test(applicationSource(fieldPhotoPath)) &&
    /\{photo\.caption\}/.test(heroSource) &&
    /\{photo\.credit\}/.test(heroSource) &&
    /\{media\.caption\}/.test(applicationSource(workCardPath)) &&
    /<FieldPhoto/.test(applicationSource(workCardPath)) &&
    /photoId="photo\.kc-town-hall-before"/.test(
      applicationSource(workCardPath)
    ) &&
    /placementId="placement\.work\.kc-town-hall-before\.layout-b"/.test(
      applicationSource(workCardPath)
    );

  const surfaceFiles = [
    ...walkFiles(path.join(repoRoot, "rfcs")),
    ...requiredRecordIds
      .map((id) => byId.get(id))
      .filter(Boolean)
      .map((record) => path.join(repoRoot, record.path)),
    path.join(repoRoot, manifestPath),
    path.join(repoRoot, "apps/www/src/data/photography.ts")
  ];
  const protectedPathPattern = new RegExp(
    `(?:${["/", "Users", "/"].join("")}|${["/", "Volumes", "/"].join("")}|${["/", "private", "/", "(?:tmp|var/folders)", "/"].join("")}|${["/", "tmp", "/"].join("")}|${["/", "var", "/", "folders", "/"].join("")}|Mobile Documents|Photos\\.sqlite|Library/Photos|file://)`,
    "i"
  );
  const protectedAssetPattern =
    /(?:\b[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}\b|IMG_[0-9]{4}|_L0_001)/i;
  const currentBoundaryClean = surfaceFiles.every((file) => {
    const source = readFileSync(file, "utf8");
    return !protectedPathPattern.test(source) && !protectedAssetPattern.test(source);
  }) && (options.publicBoundaryExtraSources ?? []).every(
    (text) =>
      !protectedPathPattern.test(text) && !protectedAssetPattern.test(text)
  );
  const introducedHistory =
    options.introducedHistorySources ?? readIntroducedHistorySources(repoRoot);
  const introducedHistoryBoundaryClean =
    Array.isArray(introducedHistory) &&
    introducedHistory.every((entry) => {
      const relativePath =
        typeof entry === "string" ? "injected-public-surface" : entry.relativePath;
      const text = typeof entry === "string" ? entry : entry.text;
      const isPhotoBoundarySurface =
        relativePath === "AGENTS.md" ||
        relativePath === "README.md" ||
        relativePath === "package.json" ||
        relativePath.startsWith("apps/www/src/") ||
        relativePath.startsWith("docs/knowledge-bank/") ||
        relativePath.startsWith("reports/photo-knowledge") ||
        relativePath.startsWith("rfcs/") ||
        (
          relativePath.startsWith("scripts/photo-knowledge/") &&
          relativePath !== "scripts/photo-knowledge/lib.mjs" &&
          !relativePath.endsWith(".test.mjs")
        );
      return (
        !isPhotoBoundarySurface ||
        (
          !protectedPathPattern.test(text) &&
          !protectedAssetPattern.test(text)
        )
      );
    });
  const historicalWithdrawalState =
    collectHistoricalWithdrawalState(introducedHistory);
  const historicalWithdrawalPhotoIds =
    historicalWithdrawalState.photoIds;
  const restorationDecisionIsValid = (photoId) => {
    const events =
      historicalWithdrawalState.implementedByPhoto.get(photoId) ?? [];
    const withdrawal = [...events].sort(
      (left, right) =>
        right.commitOrder - left.commitOrder ||
        right.entryIndex - left.entryIndex
    )[0];
    if (!withdrawal) return false;
    const photo = manifest.photos.find((item) => item.id === photoId);
    const expectedOccurrenceIds =
      photo?.placements.map((placement) => placement.id) ?? [];
    return (manifest.restorationDecisions ?? []).some((decision) => {
      if (decision.photoId !== photoId) return false;
      const record = byId.get(decision.decisionRecordId);
      const recordText = source(decision.decisionRecordId);
      const materializedVersion = [
        ...(historicalWithdrawalState.pathVersions.get(record?.path) ?? [])
      ]
        .filter((version) => version.commitOrder > withdrawal.commitOrder)
        .sort(
          (left, right) =>
            right.commitOrder - left.commitOrder ||
            right.entryIndex - left.entryIndex
        )
        .find((version) => version.text === recordText);
      return validateRestorationDecision({
        decision,
        record,
        recordText,
        withdrawal,
        materializedVersion,
        expectedOccurrenceIds,
        publicSurfaceFingerprint:
          responsiveEvidence.publicSurfaceFingerprint,
        recordById: byId,
        now: options.now ?? Date.now()
      });
    });
  };
  const restorationDecisionConflicts = (
    manifest.restorationDecisions ?? []
  )
    .filter(
      (decision) =>
        !historicalWithdrawalPhotoIds.has(decision.photoId) ||
        !restorationDecisionIsValid(decision.photoId)
    )
    .map((decision) => decision.id);
  const historicalRevocationConflicts = [
    ...historicalWithdrawalPhotoIds
  ].filter((photoId) => {
    const photo = manifest.photos.find((item) => item.id === photoId);
    const activeProjection =
      photo &&
      !withdrawalPermissionStates.has(photo.permissionState) &&
      photo.productionApproval === "open" &&
      photo.placements.some(
        (placement) =>
          placement.production !== "hold" ||
          placement.indexing !== "hold"
      ) &&
      sitePhotos.some((sitePhoto) => sitePhoto.wikiId === photoId);
    return activeProjection && !restorationDecisionIsValid(photoId);
  });
  const historicalRevocationFailsClosed =
    Array.isArray(introducedHistory) &&
    historicalRevocationConflicts.length === 0 &&
    restorationDecisionConflicts.length === 0;
  const revoked = applyPhotoRevocation(manifest, east.id);
  const revokedEast = revoked.photos.find((photo) => photo.id === east.id);
  const simulatedRevocationFailsClosed =
    revokedEast.permissionState === "revoked" &&
    revokedEast.productionApproval === "hold" &&
    revokedEast.placements.every(
      (placement) =>
        placement.staging === "hold" &&
        placement.production === "hold" &&
        placement.indexing === "hold"
    ) &&
    revoked.edition.production === "hold" &&
    revoked.edition.indexing === "hold" &&
    revoked.historicalOccurrences.filter(
      (item) => item.photoId === east.id && item.renders === false
    ).length === eastManifest.placements.length &&
    revoked.withdrawalPlans.some(
      (plan) =>
        plan.photoId === east.id &&
        plan.status === "human-review-required" &&
        plan.writesApplied === false &&
        /new human-reviewed publication decision/i.test(plan.rollbackPolicy)
    );
  const sitePhotoIds = new Set(sitePhotos.map((photo) => photo.wikiId));
  const persistedRevocationFailsClosed = manifest.photos.every((photo) => {
    if (!withdrawalPermissionStates.has(photo.permissionState)) return true;
    const historicalPlacementIds = new Set(
      (manifest.historicalOccurrences ?? [])
        .filter(
          (item) =>
            item.photoId === photo.id &&
            item.renders === false &&
            item.lifecycleState === "withdrawn"
        )
        .map((item) => item.placementId)
    );
    const implementedPlan = (manifest.withdrawalPlans ?? []).find(
      (plan) =>
        plan.photoId === photo.id &&
        plan.status === "implemented" &&
        plan.writesApplied === true
    );
    return (
      photo.productionApproval === "hold" &&
      photo.placements.every(
        (placement) =>
          placement.staging === "hold" &&
          placement.production === "hold" &&
          placement.indexing === "hold"
      ) &&
      manifest.edition.status === "withdrawal-review" &&
      manifest.edition.staging === "hold" &&
      manifest.edition.production === "hold" &&
      manifest.edition.indexing === "hold" &&
      !sitePhotoIds.has(photo.id) &&
      !existsSync(
        path.join(
          repoRoot,
          "apps/www/public",
          photo.src.replace(/^\//, "")
        )
      ) &&
      photo.placements.every((placement) =>
        historicalPlacementIds.has(placement.id)
      ) &&
      Boolean(implementedPlan) &&
      !Number.isNaN(Date.parse(implementedPlan.implementedAt ?? ""))
    );
  });
  const revocationFailsClosed =
    simulatedRevocationFailsClosed && persistedRevocationFailsClosed;

  const commandsWired =
    expectedCommands.every((name) => packageManifest.scripts?.[name]) &&
    packageManifest.scripts?.check?.includes("npm run photos:check") &&
    packageManifest.scripts?.check?.includes("npm run photos:test");

  const humanGatesOpen =
    manifest.edition.production === "open" &&
    manifest.edition.indexing === "open" &&
    east?.production_approval === "open" &&
    sitePhotos.every((photo) => photo.productionApproval === "open") &&
    photoRecordIds
      .filter((id) => id !== east.id)
      .every((id) => {
        const record = byId.get(id);
        const item = manifest.photos.find((photo) => photo.id === id);
        return (
          record?.rights_state === "unknown" &&
          record?.creator_state === "under-review" &&
          item?.creatorState === "under-review" &&
          item?.permissionState === "review-needed"
        );
      });

  const checks = {
    photo_rfc_0003_implementing_and_indexed: rfcImplementing,
    photo_records_materialized: recordsMaterialized,
    photo_manifest_exact_and_bound: photoManifestExact && publicProjectionBound,
    photo_east_river_private_binding_opaque: privateBindingOpaque,
    photo_creator_correction_and_history_preserved: preferredCreatorAndHistory,
    photo_permission_bounded_and_private: permissionBounded,
    photo_public_derivatives_reconciled: derivativesReconciled,
    photo_derivative_integrity: derivativeIntegrity,
    photo_placements_and_edition_governed:
      placementsGoverned && renderedOccurrencesBound,
    photo_browser_occurrences_bound: browserOccurrences.passed,
    photo_occurrence_copy_bound: occurrenceCopyBound,
    photo_caption_credit_rendered: captionAndCreditRendered,
    photo_recollection_nonpublishing: recollectionNonpublishing,
    photo_inquiry_avoids_photo_counting: inquiryAvoidsPhotoCounting,
    photo_curatorial_authority_advisory: curatorialAuthorityAdvisory,
    photo_protected_absence_first_class: protectedAbsenceFirstClass,
    photo_public_boundary_clean: currentBoundaryClean,
    photo_introduced_history_boundary_clean: introducedHistoryBoundaryClean,
    photo_historical_revocation_monotonic: historicalRevocationFailsClosed,
    photo_revocation_fails_closed: revocationFailsClosed,
    photo_commands_wired: commandsWired,
    photo_human_gates_open: humanGatesOpen
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      photos: manifest.photos.length,
      placements: manifest.photos.reduce(
        (sum, photo) => sum + photo.placements.length,
        0
      ),
      requiredRecords: requiredRecordIds.length,
      blockingCriteria: Object.keys(checks).length,
      historicalRevocationConflicts: historicalRevocationConflicts.length,
      restorationDecisionConflicts: restorationDecisionConflicts.length,
      productionOpen: manifest.photos.filter(
        (photo) => photo.productionApproval === "open"
      ).length
    }
  };
}

export function compilePhotoEdition(manifest) {
  const occurrences = manifest.photos
    .flatMap((photo) =>
      photo.placements.map((placement) => ({
        placement: placement.id,
        asset: photo.id,
        derivative: photo.derivativeId,
        route: placement.route,
        component: placement.component,
        crop: placement.crop,
        caption: photo.caption,
        credit: photo.credit,
        staging: placement.staging,
        production: placement.production,
        indexing: placement.indexing
      }))
    )
    .sort((left, right) => compareText(left.placement, right.placement));
  return {
    ...manifest.edition,
    occurrences,
    historicalOccurrences: manifest.historicalOccurrences ?? [],
    protectedAbsences: manifest.protectedAbsences.map((item) => item.id),
    selectedByAutomation: false
  };
}

export function comparePhotoEditions(current, comparison) {
  const currentByPlacement = new Map(
    current.occurrences.map((item) => [item.placement, item])
  );
  const comparisonByPlacement = new Map(
    comparison.occurrences.map((item) => [item.placement, item])
  );
  const added = [...currentByPlacement.keys()]
    .filter((id) => !comparisonByPlacement.has(id))
    .sort();
  const removed = [...comparisonByPlacement.keys()]
    .filter((id) => !currentByPlacement.has(id))
    .sort();
  const changed = [...currentByPlacement.keys()]
    .filter((id) => comparisonByPlacement.has(id))
    .filter(
      (id) =>
        JSON.stringify(canonicalJson(currentByPlacement.get(id))) !==
        JSON.stringify(canonicalJson(comparisonByPlacement.get(id)))
    )
    .sort()
    .map((id) => ({
      placement: id,
      before: comparisonByPlacement.get(id),
      after: currentByPlacement.get(id)
    }));
  return {
    from: comparison.id,
    to: current.id,
    added,
    removed,
    changed,
    automaticSelection: false
  };
}

export function buildPhotoImpact({
  manifest,
  wiki,
  photoId = "photo.east-river-manhattan-bridge.2022",
  changeType = "record-change"
}) {
  const photo = manifest.photos.find((item) => item.id === photoId);
  const impactedWikiRecords = [...wiki.byId.values()]
    .filter(
      (record) =>
        record.id === photoId ||
        record.relations?.some((relation) => relation.target === photoId)
    )
    .map((record) => ({ id: record.id, path: record.path }))
    .sort((a, b) => compareText(a.id, b.id));
  return {
    photoId,
    changeType,
    found: Boolean(photo),
    wikiRecords: impactedWikiRecords,
    manifest: photo ? manifestPath : null,
    routes: photo?.placements.map((placement) => placement.route) ?? [],
    placements: photo?.placements.map((placement) => placement.id) ?? [],
    components: photo?.placements.map((placement) => placement.component) ?? [],
    derivative: photo?.src ?? null,
    portfolioEditions: photo ? [manifest.edition.id] : [],
    reports: expectedReports,
    humanReviews: photo
      ? [
          "creator and credit",
          "permission and rights",
          "represented-person consent when applicable",
          "caption and crop",
          "final editorial selection",
          "production deployment and indexing"
        ]
      : [],
    unmeasured: [
      "visitor understanding",
      "hiring outcome",
      "production performance",
      "indexing outcome"
    ],
    withdrawalPlan:
      photo && changeType === "withdrawal"
        ? buildWithdrawalPlan(manifest, photoId)
        : null
  };
}

export function buildPhotoReports(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const manifest = options.manifest ?? loadPhotoKnowledge(repoRoot);
  const sitePhotos = options.publicPhotoManifest ?? publicPhotoManifest;
  const responsiveEvidence =
    options.responsiveEvidence ??
    JSON.parse(
      readFileSync(path.join(repoRoot, responsiveEvidencePath), "utf8")
    );
  const evaluation =
    options.evaluation ??
    evaluatePhotoKnowledge({
      repoRoot,
      manifest,
      publicPhotoManifest: sitePhotos,
      responsiveEvidence
    });
  const wiki = options.wiki ?? compileWiki({ repoRoot });
  const renderedOccurrences =
    options.renderedOccurrences ?? collectRenderedPhotoOccurrences(repoRoot);
  const rows = manifest.photos
    .map((photo) => ({
      id: photo.id,
      derivativeId: photo.derivativeId,
      routes: photo.placements.map((placement) => placement.route),
      alt: photo.alt,
      caption: photo.caption,
      credit: photo.credit,
      creatorState: photo.creatorState,
      permissionState: photo.permissionState,
      sourceBinding: photo.sourceBinding,
      productionApproval: photo.productionApproval
    }))
    .sort((a, b) => compareText(a.id, b.id));
  const placementRows = manifest.photos
    .flatMap((photo) =>
      photo.placements.map((placement) => ({
        asset: photo.id,
        derivative: photo.derivativeId,
        photoId: photo.id,
        alt: photo.alt,
        caption: photo.caption,
        credit: photo.credit,
        ...placement
      }))
    )
    .sort(
      (a, b) =>
        compareText(a.route, b.route) || compareText(a.id, b.id)
    );
  const activeUsage = placementRows.map((row) => ({
    asset: row.asset,
    derivative: row.derivative,
    placement: row.id,
    route: row.route,
    component: row.component,
    crop: row.crop,
    staging: row.staging,
    production: row.production,
    indexing: row.indexing,
    lifecycle: "current",
    rendered:
      renderedOccurrences.filter(
        (occurrence) => occurrence.placementId === row.id
      ).length === 1
  }));
  const historicalUsage = (manifest.historicalOccurrences ?? []).map(
    (row) => ({
      asset: row.photoId,
      derivative: row.derivativeId,
      placement: row.placementId,
      route: row.route,
      component: row.component,
      crop: row.crop,
      staging: row.priorState?.staging ?? "unknown",
      production: row.priorState?.production ?? "unknown",
      indexing: row.priorState?.indexing ?? "unknown",
      lifecycle: row.lifecycleState,
      rendered: false
    })
  );
  const usage = [...activeUsage, ...historicalUsage];
  const permissionRows = rows.map(
    ({ id, creatorState, permissionState, sourceBinding, productionApproval }) => ({
      id,
      creatorState,
      permissionState,
      sourceBinding,
      productionApproval
    })
  );
  const impactPhotoId =
    options.impactPhotoId ?? "photo.east-river-manhattan-bridge.2022";
  const impactChangeType = options.impactChangeType ?? "record-change";
  const impact = buildPhotoImpact({
    manifest,
    wiki,
    photoId: impactPhotoId,
    changeType: impactChangeType
  });
  const browserOccurrenceValidation = validateBrowserPhotoOccurrences({
    evidence: responsiveEvidence,
    manifest,
    repoRoot
  });
  const withdrawalConflicts = manifest.photos
    .filter((photo) => withdrawalPermissionStates.has(photo.permissionState))
    .flatMap((photo) => {
      const findings = [];
      if (sitePhotos.some((sitePhoto) => sitePhoto.wikiId === photo.id)) {
        findings.push(`${photo.id}: active public manifest entry remains`);
      }
      if (
        existsSync(
          path.join(
            repoRoot,
            "apps/www/public",
            photo.src.replace(/^\//, "")
          )
        )
      ) {
        findings.push(`${photo.id}: public derivative remains`);
      }
      return findings;
    });
  const health = {
    evaluationPassed: evaluation.passed,
    staleReviewRecords: [...wiki.byId.values()]
      .filter(
        (record) =>
          photoRecordIds.includes(record.id) &&
          record.review_by &&
          record.review_by < "2026-07-26"
      )
      .map((record) => record.id),
    unresolvedCreatorOrPermission: rows
      .filter(
        (row) =>
          row.creatorState !== "confirmed" ||
          row.permissionState !== "cleared-bounded"
      )
      .map((row) => row.id),
    unrenderedPlacements: usage
      .filter((row) => row.lifecycle === "current" && !row.rendered)
      .map((row) => row.placement),
    unusedDerivatives: rows
      .filter((row) => row.routes.length === 0)
      .map((row) => row.derivativeId),
    protectedAbsences: manifest.protectedAbsences.map((item) => item.id),
    runtimeOccurrenceEvidence: {
      passed: browserOccurrenceValidation.passed,
      expectedDesktopOccurrences: browserOccurrenceValidation.expectedCount,
      observedDesktopOccurrences:
        browserOccurrenceValidation.observedDesktopCount
    },
    historicalOccurrenceCount: historicalUsage.length,
    withdrawalPlanCount: (manifest.withdrawalPlans ?? []).length,
    restorationDecisionCount: (manifest.restorationDecisions ?? []).length,
    withdrawalConflicts,
    maintenance: {
      publicSurfaceEvidenceCurrent:
        browserOccurrenceValidation.current.fingerprint ===
        responsiveEvidence.publicSurfaceFingerprint,
      currentOccurrencesAccountedFor:
        activeUsage.every((row) => row.rendered),
      historicalOccurrencesNeverRender:
        historicalUsage.every((row) => row.rendered === false),
      automaticWithdrawal: false,
      automaticRestoration: false
    },
    serendipity: {
      openRecollections: [
        "source.recollection.jamie.canoe-commuting.2026-07"
      ],
      openInquiries: ["research-inquiry.canoe-bike-journeys"],
      automaticPromotion: false
    }
  };
  const edition = compilePhotoEdition(manifest);
  const report = {
    schemaVersion: 1,
    generatedFor: "feature/photo-knowledge-B",
    governingRfc: manifest.governingRfc,
    edition,
    evaluation,
    photos: rows,
    placements: placementRows,
    usage,
    permissions: permissionRows,
    impact,
    health,
    protectedAbsences: manifest.protectedAbsences
  };

  const markdown = [
    "# Photographic Knowledge Loop Report",
    "",
    `- Photos: ${rows.length}`,
    `- Placements: ${placementRows.length}`,
    `- Blocking criteria: ${evaluation.counts.blockingCriteria}`,
    `- Deterministic status: ${evaluation.passed ? "PASS" : "FAIL"}`,
    `- Production: ${manifest.edition.production}`,
    `- Indexing: ${manifest.edition.indexing}`,
    "",
    "## Permissions and source binding",
    "",
    "| Photo | Creator | Permission | Source binding | Production |",
    "|---|---|---|---|---|",
    ...permissionRows.map(
      (row) =>
        `| ${row.id} | ${row.creatorState} | ${row.permissionState} | ${row.sourceBinding} | ${row.productionApproval} |`
    ),
    "",
    "## Placements",
    "",
    "| Route | Placement | Asset | Component | Crop | Caption | Credit | Staging | Production | Indexing |",
    "|---|---|---|---|---|---|---|---|---|---|",
    ...placementRows.map(
      (row) =>
        `| ${row.route} | ${row.id} | ${row.asset} | ${row.component} | ${row.crop} | ${row.caption} | ${row.credit} | ${row.staging} | ${row.production} | ${row.indexing} |`
    ),
    "",
    `## Impact: ${impact.photoId}`,
    "",
    `- Affected Wiki records: ${impact.wikiRecords.map((record) => `\`${record.id}\``).join(", ")}.`,
    `- Affected routes: ${impact.routes.map((route) => `\`${route}\``).join(", ")}.`,
    `- Affected edition: \`${manifest.edition.id}\`.`,
    ...impact.unmeasured.map((item) => `- Open human/outcome gate: ${item}.`),
    "",
    "## Protected absence",
    "",
    ...manifest.protectedAbsences.map(
      (item) => `- **${item.scope}:** ${item.reason}`
    ),
    "",
    "A green deterministic report does not approve production, indexing, rights,",
    "consent, final editorial selection, deployment, or reader response.",
    ""
  ].join("\n");

  const generatedWiki = [
    "<!-- GENERATED FILE. DO NOT EDIT. Run npm run photos:report. -->",
    "",
    "# Photographic knowledge loop: generated status",
    "",
    `- Edition: \`${manifest.edition.id}\``,
    `- Photos: ${rows.length}`,
    `- Placements: ${placementRows.length}`,
    `- Production: \`${manifest.edition.production}\``,
    `- Indexing: \`${manifest.edition.indexing}\``,
    "",
    "See the authored [Photographic knowledge loop](../indexes/photographic-knowledge-loop.md)",
    "and the machine-readable",
    "[photo manifest](../data/photo-knowledge.json).",
    "",
    "## Open production work",
    "",
    ...permissionRows
      .filter(
        (row) =>
          row.permissionState !== "cleared-bounded" ||
          row.sourceBinding !== "verified-private"
      )
      .map(
        (row) =>
          `- \`${row.id}\`: creator \`${row.creatorState}\`, permission \`${row.permissionState}\`, source \`${row.sourceBinding}\`.`
      ),
    ""
  ].join("\n");

  return {
    "reports/photo-knowledge.json": `${JSON.stringify(report, null, 2)}\n`,
    "reports/photo-knowledge.md": markdown,
    "docs/knowledge-bank/_generated/photographic-knowledge-loop.md": generatedWiki
  };
}

export function checkPhotoReports(repoRoot = defaultRepoRoot) {
  const expected = buildPhotoReports({ repoRoot });
  return expectedReports.filter(
    (relative) =>
      !existsSync(path.join(repoRoot, relative)) ||
      readFileSync(path.join(repoRoot, relative), "utf8") !== expected[relative]
  );
}
