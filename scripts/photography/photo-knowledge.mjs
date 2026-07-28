#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

export const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

export const canary = {
  assetPath:
    "docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md",
  setPath: "docs/knowledge-bank/indexes/photo-sets/east-river-canoe-2022.md",
  metadataPath:
    "docs/knowledge-bank/sources/photo-metadata/east-river-2022-public-safe.md",
  permissionPath:
    "docs/knowledge-bank/sources/permissions/elana-gordon-east-river-portfolio-2026.md",
  recollectionPath:
    "docs/knowledge-bank/sources/recollections/jamie-canoe-commuting-2026-07.md",
  evaluationPath:
    "docs/knowledge-bank/evaluations/curatorial/layout-c-home-east-river-v1.md",
  decisionPath:
    "docs/knowledge-bank/decisions/photography/layout-c-home-east-river-v1.md",
  projectionPath:
    "docs/knowledge-bank/projections/photography/layout-c-home-east-river.md",
  editionPath:
    "docs/knowledge-bank/projections/photography/edition-layout-c-2026-07.md",
  inquiryPath:
    "docs/knowledge-bank/research-inquiries/documented-canoe-bike-journeys.md",
  protectedAbsencePath:
    "docs/knowledge-bank/decisions/photography/intimate-gatherings-protected-absence.md",
  childHoldPath:
    "docs/knowledge-bank/decisions/photography/talks-not-raids-child-review-hold.md",
  rollbackDrillPath:
    "evals/photo-knowledge/rollback/layout-c-home-east-river-drill.json",
  curatorialReceiptPath:
    "evals/photo-knowledge/curatorial/layout-c-home-east-river/session-receipt.json",
  renderReceiptPath:
    "docs/qa/photo-knowledge/layout-c-render-receipt.json",
  mobileEvidencePath: "docs/qa/photo-knowledge/layout-c-home-360x800.png",
  desktopEvidencePath: "docs/qa/photo-knowledge/layout-c-home-1280x900.png",
  derivativePath:
    "apps/www/public/images/field-notes/jamie-east-river.webp",
  manifestPath: "apps/www/src/data/photography.ts",
  rfcPath: "rfcs/0003-living-photographic-knowledge-loop.md",
  assetId: "asset.photo.east-river-manhattan-bridge.2022.001",
  derivativeId: "derivative.photo.east-river.layout-c.v1",
  projectionId: "projection.photo.layout-c.home.east-river",
  editionId: "edition.layout-c.2026-07",
  permissionId: "source.permission.elana-gordon.east-river.2026-07",
  expectedDerivativeSha:
    "748b6f12e2845dd7dc1ca3fa3f35d61c26a468150b7e3d6d386ae3622d996621",
  historicalCommit: "fea303e54c6b5fae36caee872a2a7450501f9e11",
  correctedCandidateTree: "3059ab6209621cfbca60d352dd83cc596675600a",
  correctionPatchPath: "docs/qa/photo-knowledge/layout-c-credit-correction.patch",
  correctionPatchSha:
    "e2746073bf4dc7b3648b19c4e1eff8fbd4bdf8d5c196de2cc5a0f19d22aebd89",
  correctedPhotographySourceSha:
    "dc1cdbc6496cc1c5f70cd85c815ef840e1763bb1cbaf5c325a1f1d9a4501969f",
  rendererSources: [
    {
      path: "apps/www/src/components/Hero.tsx",
      snapshot:
        "docs/qa/photo-knowledge/layout-c-renderer-sources/apps/www/src/components/Hero.tsx",
      sha256:
        "9126f3fd6a1a0117b1270c796b7e4afe677fa755bc6beeec4aa90dd6de9cbf6d"
    },
    {
      path: "apps/www/src/app/page.tsx",
      snapshot:
        "docs/qa/photo-knowledge/layout-c-renderer-sources/apps/www/src/app/page.tsx",
      sha256:
        "6521616938ac69d27b8321b897892cd4fda32c318421e7cb666cc9c82b78d130"
    },
    {
      path: "apps/www/src/data/photography.ts",
      snapshot:
        "docs/qa/photo-knowledge/layout-c-renderer-sources/apps/www/src/data/photography.ts",
      sha256:
        "dc1cdbc6496cc1c5f70cd85c815ef840e1763bb1cbaf5c325a1f1d9a4501969f"
    },
    {
      path: "apps/www/src/app/globals.css",
      snapshot:
        "docs/qa/photo-knowledge/layout-c-renderer-sources/apps/www/src/app/globals.css",
      sha256:
        "d49422f139fcf57efbc620cf366b5cbe9e9e68d1a899ddaa854a995021577978"
    },
    {
      path: "apps/www/src/styles/tokens.css",
      snapshot:
        "docs/qa/photo-knowledge/layout-c-renderer-sources/apps/www/src/styles/tokens.css",
      sha256:
        "0a17667b30a657c5ea6c4c627453211660df3ef1b061ed4c83d90cd79aaab890"
    }
  ],
  renderReceiptSha:
    "0aa8126c4350396ba29aaa5b432a749c07217836b5ed1fed37e8666c6693085d",
  mobileEvidenceSha:
    "2765480352a9b561abfbf05630984b1bc1d6ed745d7ce70f5b59e9f41bb6362f",
  desktopEvidenceSha:
    "89ad3b6a6dc190e78e34b8ed682410aa827504bd22ab5557b5934f7d8e8ee6ae"
};

const teachingPaths = [
  "docs/photography/README.md",
  "docs/photography/east-river-canary.md",
  "docs/photography/curatorial-studio.md",
  "docs/photography/rights-and-permission.md",
  "docs/photography/source-binding.md",
  "docs/photography/portfolio-editions.md",
  "docs/photography/recollection-and-correction.md",
  "docs/photography/rollback.md",
  "docs/photography/contributor-pull-request-template.md"
];

const candidateExclusions = [
  /^docs\/knowledge-bank\/_generated\//,
  /^reports\/photo-knowledge\//,
  /^evals\/photo-knowledge\/holdouts\//,
  /^docs\/qa\/evals-H\/professor-candidate-receipt\.json$/,
  /^docs\/qa\/evals-H\/(?:margaret-morse|warren-sack)-final-[abc]\.json$/,
  /^docs\/evals\/runs\/2026-07-16-feature-evals-composite-final-[ab]\.json$/,
  /^apps\/www\/next-env\.d\.ts$/,
  /^node_modules\//,
  /^apps\/www\/\.next\//
];

function absolute(relativePath, root = repoRoot) {
  return path.join(root, relativePath);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function storedDigestMatches(entry, root = repoRoot) {
  return (
    typeof entry?.path === "string" &&
    /^[a-f0-9]{64}$/.test(entry?.sha256 ?? "") &&
    existsSync(absolute(entry.path, root)) &&
    sha256(readFileSync(absolute(entry.path, root))) === entry.sha256
  );
}

function readStoredJson(entry, root = repoRoot) {
  if (!storedDigestMatches(entry, root)) return null;
  try {
    return JSON.parse(readFileSync(absolute(entry.path, root), "utf8"));
  } catch {
    return null;
  }
}

export function validateCuratorialReceipt(receipt, root = repoRoot) {
  const files = [
    receipt.blind_pass?.candidate_field,
    receipt.blind_pass?.brief,
    receipt.blind_pass?.prompt,
    receipt.blind_pass?.result,
    receipt.blind_pass?.transport_receipt,
    receipt.contextual_pass?.provenance_field,
    receipt.contextual_pass?.prompt,
    receipt.contextual_pass?.context_bundle,
    receipt.contextual_pass?.blind_result_reused,
    receipt.contextual_pass?.result,
    receipt.contextual_pass?.transport_receipt,
    ...(receipt.contextual_pass?.screenshots ?? []),
    ...(receipt.contextual_pass?.wiki_context ?? []),
    receipt.historical_occurrence?.candidate_patch
  ];
  const blindTransport = readStoredJson(
    receipt.blind_pass?.transport_receipt,
    root
  );
  const contextualTransport = readStoredJson(
    receipt.contextual_pass?.transport_receipt,
    root
  );
  const blindDelivered = new Set(
    blindTransport?.delivered_items?.map((item) => item.sha256)
  );
  const contextualDelivered = new Set(
    contextualTransport?.delivered_items?.map((item) => item.sha256)
  );
  return {
    pass:
      receipt.receipt_status === "exact-public-inputs" &&
      receipt.execution_boundary?.private_archive === "not-provided" &&
      receipt.model_configuration?.artistic_authority === "none" &&
      receipt.authority?.jamie_final_editorial_authority === true &&
      receipt.authority?.production_approval === "open" &&
      receipt.authority?.indexing_approval === "open" &&
      blindTransport?.run === "blind" &&
      blindTransport?.separate_process_context === true &&
      blindTransport?.repository_context === "not-delivered" &&
      blindTransport?.private_archive === "not-delivered" &&
      blindDelivered.has(canary.expectedDerivativeSha) &&
      contextualTransport?.run === "contextual" &&
      contextualTransport?.separate_process_context === true &&
      contextualTransport?.private_archive === "not-delivered" &&
      contextualDelivered.has(receipt.contextual_pass?.prompt?.sha256) &&
      contextualDelivered.has(receipt.contextual_pass?.context_bundle?.sha256) &&
      contextualDelivered.has(receipt.contextual_pass?.blind_result_reused?.sha256) &&
      (receipt.contextual_pass?.screenshots ?? []).every((entry) =>
        contextualDelivered.has(entry.sha256)
      ) &&
      contextualTransport?.stored_result?.sha256 ===
        receipt.contextual_pass?.result?.sha256 &&
      files.length >= 13 &&
      files.every((entry) => storedDigestMatches(entry, root)),
    files
  };
}

export function validateRollbackDrill(receipt) {
  const requiredActions = [
    "manifest_reference_removed",
    "occurrence_marked_withdrawn",
    "correction_record_created",
    "credit_and_history_preserved",
    "route_verified_without_occurrence",
    "cache_review_recorded",
    "derived_reports_regenerated"
  ];
  return {
    pass:
      receipt.mode === "public-safe-simulation" &&
      receipt.before?.manifest_reference_present === true &&
      requiredActions.every((action) => receipt.actions?.[action] === true) &&
      receipt.after?.manifest_reference_present === false &&
      receipt.after?.public_route_resolves_without_occurrence === true &&
      receipt.after?.private_source_binding_unchanged === true &&
      receipt.after?.git_history_retained === true &&
      receipt.outcome === "pass",
    requiredActions
  };
}

export function validateRenderReceipt(receipt, root = repoRoot) {
  const viewports = receipt.viewports ?? [];
  const rendererSources = receipt.candidate?.renderer_sources ?? [];
  const expectedScreenshots = new Map([
    [`${canary.mobileEvidencePath}:360x800`, canary.mobileEvidenceSha],
    [`${canary.desktopEvidencePath}:1280x900`, canary.desktopEvidenceSha]
  ]);
  const viewportsPass =
    viewports.length === expectedScreenshots.size &&
    viewports.every((viewport) => {
      const key = `${viewport.screenshot}:${viewport.width}x${viewport.height}`;
      return (
        expectedScreenshots.get(key) === viewport.sha256 &&
        storedDigestMatches(
          { path: viewport.screenshot, sha256: viewport.sha256 },
          root
        ) &&
        viewport.http_status === 200 &&
        viewport.corrected_credit_present === true &&
        viewport.horizontal_overflow === false &&
        viewport.images_loaded === true &&
        viewport.failed_requests === 0
      );
    });
  return {
    pass:
      receipt.mode === "production-build" &&
      receipt.candidate?.base_commit === canary.historicalCommit &&
      receipt.candidate?.patch_path === canary.correctionPatchPath &&
      receipt.candidate?.patch_sha256 === canary.correctionPatchSha &&
      receipt.candidate?.tree === canary.correctedCandidateTree &&
      receipt.candidate?.corrected_source_sha256 ===
        canary.correctedPhotographySourceSha &&
      JSON.stringify(rendererSources) === JSON.stringify(canary.rendererSources) &&
      rendererSources.every((entry) =>
        storedDigestMatches(
          { path: entry.snapshot, sha256: entry.sha256 },
          root
        )
      ) &&
      viewportsPass &&
      /does not close/.test(receipt.release_boundary ?? ""),
    viewports
  };
}

export function readRecord(relativePath, root = repoRoot) {
  const file = absolute(relativePath, root);
  if (!existsSync(file)) throw new Error(`missing record: ${relativePath}`);
  return { ...matter(readFileSync(file, "utf8")), relativePath };
}

function walkFiles(rootPath) {
  if (!existsSync(rootPath)) return [];
  const files = [];
  for (const entry of readdirSync(rootPath, { withFileTypes: true })) {
    const next = path.join(rootPath, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(next));
    else if (entry.isFile()) files.push(next);
  }
  return files;
}

export function parseWebpDimensions(buffer) {
  if (
    buffer.length < 30 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    throw new Error("not a WebP image");
  }

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunk = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const data = offset + 8;

    if (chunk === "VP8X" && data + 10 <= buffer.length) {
      const width =
        1 + buffer[data + 4] + (buffer[data + 5] << 8) + (buffer[data + 6] << 16);
      const height =
        1 + buffer[data + 7] + (buffer[data + 8] << 8) + (buffer[data + 9] << 16);
      return { width, height };
    }

    if (
      chunk === "VP8 " &&
      data + 13 <= buffer.length &&
      buffer[data + 3] === 0x9d &&
      buffer[data + 4] === 0x01 &&
      buffer[data + 5] === 0x2a
    ) {
      return {
        width: buffer.readUInt16LE(data + 6) & 0x3fff,
        height: buffer.readUInt16LE(data + 8) & 0x3fff
      };
    }

    if (chunk === "VP8L" && data + 5 <= buffer.length && buffer[data] === 0x2f) {
      const bits = buffer.readUInt32LE(data + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1
      };
    }

    offset = data + size + (size % 2);
  }

  throw new Error("WebP dimensions were not found");
}

function findStatement(asset, statementId) {
  return asset.statements?.find((statement) => statement.id === statementId);
}

function check(checks, name, condition, detail) {
  checks[name] = {
    pass: Boolean(condition),
    detail
  };
}

function containsSelectionAutomation(value) {
  const source = JSON.stringify(value).toLowerCase();
  return [
    "selected_by\":\"rcv",
    "selected_by\":\"majority",
    "selection_authority\":\"aggregate-score",
    "selection_authority\":\"model-rank",
    "panel_vote"
  ].some((needle) => source.includes(needle));
}

export function validateProjectionState({
  projection,
  permission,
  manifestSource
}) {
  const failures = [];
  if (permission.permission?.status !== "granted") {
    failures.push("permission must be granted");
  }
  if (projection.approval?.public_git !== "approved") {
    failures.push("public-Git approval must be explicit");
  }
  if (!["approved", "not-active-current-layout"].includes(projection.approval?.staging)) {
    failures.push("staging state must be explicit");
  }
  if (!["open", "approved"].includes(projection.approval?.production)) {
    failures.push("production must be explicitly open or approved");
  }
  if (!["open", "approved"].includes(projection.approval?.indexing)) {
    failures.push("indexing must be explicitly open or approved");
  }
  if (
    ["revoked", "withdrawn"].includes(projection.occurrence_status) &&
    manifestSource.includes(projection.id)
  ) {
    failures.push("revoked or withdrawn occurrence remains referenced by the app");
  }
  if (containsSelectionAutomation(projection)) {
    failures.push("vote, RCV, model rank, or aggregate score cannot authorize selection");
  }
  if (projection.occurrence_status === "candidate-hold") {
    const requiredOpenGates = [
      "jamie_exact_occurrence",
      "mobile_crop_dignity_review",
      "creator_exact_crop_review",
      "production",
      "indexing"
    ];
    if (
      projection.projection?.status !== "hold" ||
      projection.public_display_status !== "hold" ||
      projection.consent_state !== "review-needed"
    ) {
      failures.push("candidate hold must remain held across projection, display, and consent");
    }
    if (
      !requiredOpenGates.every(
        (gate) => projection.human_gates?.[gate] === "open"
      )
    ) {
      failures.push("candidate hold must retain every named human gate");
    }
  }
  return failures;
}

export function scanPhotoPublicSafety(root = repoRoot) {
  const roots = [
    absolute("docs/photography", root),
    absolute("docs/knowledge-bank/assets/photographs", root),
    absolute("docs/knowledge-bank/indexes/photo-sets", root),
    absolute("docs/knowledge-bank/evaluations/curatorial", root),
    absolute("docs/knowledge-bank/decisions/photography", root),
    absolute("docs/knowledge-bank/projections/photography", root),
    absolute("docs/knowledge-bank/sources/photo-metadata", root),
    absolute("docs/knowledge-bank/sources/permissions", root),
    absolute("docs/knowledge-bank/sources/recollections", root),
    absolute("docs/knowledge-bank/research-inquiries/documented-canoe-bike-journeys.md", root),
    absolute("docs/qa/photo-knowledge", root),
    absolute(canary.manifestPath, root)
  ];

  const files = roots.flatMap((entry) =>
    existsSync(entry) && statSync(entry).isDirectory() ? walkFiles(entry) : [entry]
  );
  const failures = [];
  const patterns = [
    { pattern: /\/(?:Users|Volumes)\//, label: "absolute private path" },
    { pattern: /\b[A-F0-9]{8}(?:-[A-F0-9]{4}){3}-[A-F0-9]{12}\b/i, label: "source UUID" },
    { pattern: /\b(?:IMG|DSC|PXL)_\d+\.(?:jpe?g|heic|png)\b/i, label: "source filename" },
    { pattern: /\b(?:latitude|longitude)\s*:\s*-?\d/i, label: "exact coordinate" },
    { pattern: /private[_]preview_sha256/i, label: "private preview fingerprint" },
    { pattern: /Photos\.sqlite|Photos Library\.photoslibrary/i, label: "private library locator" }
  ];

  for (const file of files.filter(existsSync)) {
    const source = stripPublicUrls(readFileSync(file, "utf8"));
    for (const { pattern, label } of patterns) {
      if (pattern.test(source)) {
        failures.push(`${path.relative(root, file)} contains ${label}`);
      }
    }
  }
  return failures;
}

function branchHistoryPublicSafety(root = repoRoot) {
  const refs = [
    process.env.PHOTO_KNOWLEDGE_BASE_REF,
    process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : null,
    "origin/features/layout-E",
    "features/layout-E",
    "origin/develop"
  ].filter(Boolean);
  const base = refs.find((ref) => {
    try {
      execFileSync("git", ["rev-parse", "--verify", "--quiet", ref], {
        cwd: root,
        stdio: "ignore"
      });
      return true;
    } catch {
      return false;
    }
  });
  if (!base) return ["no review base was available for branch-history scanning"];

  const patch = execFileSync(
    "git",
    [
      "log",
      "--format=",
      "--no-ext-diff",
      "-p",
      `${base}..HEAD`,
      "--",
      "AGENTS.md",
      "README.md",
      "rfcs",
      "docs/photography",
      "docs/knowledge-bank",
      "docs/qa/photo-knowledge",
      "evals/photo-knowledge",
      "scripts/photography",
      "apps/www/src/data/photography.ts"
    ],
    { cwd: root, encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
  );
  return scanAddedHistoryPublicSafety(patch);
}

export function scanAddedHistoryPublicSafety(patch) {
  const addedContent = stripPublicUrls(addedPatchContent(patch));
  const patterns = [
    { pattern: /\/(?:Users|Volumes)\//, label: "absolute private path" },
    {
      pattern: /\b[A-F0-9]{8}(?:-[A-F0-9]{4}){3}-[A-F0-9]{12}\b/i,
      label: "source UUID"
    },
    {
      pattern: /\b(?:IMG|DSC|PXL)_\d+\.(?:jpe?g|heic|png)\b/i,
      label: "source filename"
    },
    { pattern: /\b(?:latitude|longitude)\s*:\s*-?\d/i, label: "exact coordinate" },
    { pattern: /private[_]preview_sha256/i, label: "private preview fingerprint" },
    { pattern: /Photos\.sqlite|Photos Library\.photoslibrary/i, label: "private library locator" }
  ];
  return patterns
    .filter(({ pattern }) => pattern.test(addedContent))
    .map(({ label }) => `introduced branch history contains ${label}`);
}

function stripPublicUrls(value) {
  return String(value).replace(/https?:\/\/[^\s<>"')\]]+/gi, "");
}

export function addedPatchContent(patch) {
  return String(patch)
    .split(/\r?\n/)
    .filter((line) => line.startsWith("+") && !line.startsWith("+++"))
    .map((line) => line.slice(1))
    .join("\n");
}

export function quoteUntrustedSourceText(text) {
  return String(text)
    .split(/\r?\n/)
    .map((line) => `> ${line}`)
    .join("\n");
}

function rfcTerminologyFailures(root = repoRoot) {
  const roots = [
    "AGENTS.md",
    "README.md",
    "package.json",
    "rfcs",
    "scripts/check-rfcs.mjs",
    "evals/knowledge-wiki",
    "scripts/knowledge-wiki"
  ];
  const failures = [];
  if (existsSync(absolute("rfps", root))) failures.push("legacy rfps/ directory remains");
  if (existsSync(absolute("scripts/check-rfps.mjs", root))) {
    failures.push("legacy check-rfps.mjs remains");
  }
  for (const entry of roots) {
    const target = absolute(entry, root);
    const files =
      existsSync(target) && statSync(target).isDirectory() ? walkFiles(target) : [target];
    for (const file of files.filter(existsSync)) {
      if (!/\.(?:md|mjs|json)$/.test(file) && !file.endsWith("AGENTS.md")) continue;
      if (/\bRFPs?\b|rfps\/|check-rfps|rfp:/.test(readFileSync(file, "utf8"))) {
        failures.push(`${path.relative(root, file)} retains mistaken RFP terminology`);
      }
    }
  }
  return failures;
}

export function validateCanary({
  root = repoRoot,
  projectionOverride,
  permissionOverride,
  manifestSourceOverride,
  derivativeBufferOverride
} = {}) {
  const checks = {};
  const assetRecord = readRecord(canary.assetPath, root);
  const setRecord = readRecord(canary.setPath, root);
  const metadataRecord = readRecord(canary.metadataPath, root);
  const permissionRecord = readRecord(canary.permissionPath, root);
  const recollectionRecord = readRecord(canary.recollectionPath, root);
  const evaluationRecord = readRecord(canary.evaluationPath, root);
  const decisionRecord = readRecord(canary.decisionPath, root);
  const projectionRecord = readRecord(canary.projectionPath, root);
  const editionRecord = readRecord(canary.editionPath, root);
  const inquiryRecord = readRecord(canary.inquiryPath, root);
  const absenceRecord = readRecord(canary.protectedAbsencePath, root);
  const childHoldRecord = readRecord(canary.childHoldPath, root);
  const rollbackDrill = JSON.parse(
    readFileSync(absolute(canary.rollbackDrillPath, root), "utf8")
  );
  const renderReceipt = JSON.parse(
    readFileSync(absolute(canary.renderReceiptPath, root), "utf8")
  );
  const rfcRecord = readRecord(canary.rfcPath, root);

  const asset = assetRecord.data;
  const permission = permissionOverride ?? permissionRecord.data;
  const projection = projectionOverride ?? projectionRecord.data;
  const manifestSource =
    manifestSourceOverride ?? readFileSync(absolute(canary.manifestPath, root), "utf8");
  const derivativeBuffer =
    derivativeBufferOverride ?? readFileSync(absolute(canary.derivativePath, root));
  const derivative = asset.public_derivatives?.find(
    (candidate) => candidate.id === canary.derivativeId
  );

  check(
    checks,
    "canonical_rfc",
    rfcRecord.data.rfc === 3 &&
      rfcRecord.data.stage === "implementing" &&
      rfcRecord.data.implementation === "feature/photo-knowledge-E",
    "RFC 0003 is canonical and explicitly implementing on this branch."
  );

  const terminologyFailures = rfcTerminologyFailures(root);
  check(
    checks,
    "rfc_terminology",
    terminologyFailures.length === 0,
    terminologyFailures.join("; ") || "RFC terminology is consistent."
  );

  check(
    checks,
    "photo_asset",
    asset.id === canary.assetId &&
      asset.kind === "asset" &&
      asset.media_type === "photograph" &&
      asset.public_display_status === "cleared",
    "One public-safe photograph asset record is materialized."
  );

  check(
    checks,
    "private_binding",
    /^pfwpub_[a-f0-9]{20}$/.test(asset.private_source_binding?.opaque_id ?? "") &&
      asset.private_source_binding?.verification_status ===
        "independently-verified-local" &&
      asset.private_source_binding?.network_upload === false,
    "The public record contains only a random opaque ID and bounded local verification result."
  );

  let dimensions = { width: 0, height: 0 };
  let dimensionsError = "";
  try {
    dimensions = parseWebpDimensions(derivativeBuffer);
  } catch (error) {
    dimensionsError = error.message;
  }
  const derivativeSha = sha256(derivativeBuffer);
  const derivativeText = derivativeBuffer.toString("latin1");
  check(
    checks,
    "exact_derivative",
    derivative?.path === canary.derivativePath &&
      derivative?.checksum_sha256 === canary.expectedDerivativeSha &&
      derivativeSha === canary.expectedDerivativeSha &&
      dimensions.width === 1280 &&
      dimensions.height === 960 &&
      derivative?.metadata_stripped === true &&
      !/Exif\u0000\u0000|GPSLatitude|GPSLongitude/.test(derivativeText),
    dimensionsError ||
      `Derivative ${derivativeSha.slice(0, 12)}… is 1280x960 and metadata-minimized.`
  );

  const creator = findStatement(asset, "statement.photo.east-river.creator.v2");
  const formerCreator = findStatement(
    asset,
    "statement.photo.east-river.creator.unknown.v1"
  );
  check(
    checks,
    "creator_correction",
    creator?.value === "Elana Gordon" &&
      creator?.rank === "preferred" &&
      formerCreator?.value === "unknown" &&
      formerCreator?.rank === "deprecated" &&
      formerCreator?.superseded_by === creator?.id,
    "Preferred creator and deprecated former unknown state remain distinct."
  );

  check(
    checks,
    "bounded_permission",
    permission.id === canary.permissionId &&
      permission.permission?.holder === "Elana Gordon" &&
      permission.permission?.status === "granted" &&
      permission.permission?.scope?.includes("portfolio-site-use") &&
      permission.permission?.delivery_channel_interpretation?.interpreted_by ===
        "Jamie Burkart" &&
      permission.permission?.delivery_channel_interpretation?.public_repository_hosting ===
        "included-for-this-exact-portfolio-occurrence" &&
      permission.permission?.delivery_channel_interpretation?.staging_delivery ===
        "included-for-this-exact-portfolio-occurrence" &&
      permission.permission?.delivery_channel_interpretation
        ?.holder_used_technical_channel_terms === false &&
      permission.permission?.transferable === false &&
      permission.permission?.sublicensable === false &&
      permission.permission?.future_unrelated_uses === "not-granted",
    "Permission is exact-scope, non-transferable, and not a general license."
  );

  const captionAssertions = projection.caption?.assertions ?? [];
  const creditAssertions = projection.credit?.assertions ?? [];
  const statementIds = new Set(asset.statements?.map((statement) => statement.id));
  check(
    checks,
    "caption_assertions",
    [...captionAssertions, ...creditAssertions].every((id) => statementIds.has(id)) &&
      projection.caption?.text ===
        "At the East River beneath the Manhattan Bridge, 2022." &&
      projection.credit?.text ===
        "Photograph by Elana Gordon. From Jamie Burkart's photo archive.",
    "Every factual caption and credit assertion resolves to the asset record."
  );

  const projectionFailures = validateProjectionState({
    projection,
    permission,
    manifestSource
  });
  check(
    checks,
    "occurrence_gates",
    projection.id === canary.projectionId &&
      projection.asset === canary.assetId &&
      projection.derivative === canary.derivativeId &&
      projection.candidate_base_commit === canary.historicalCommit &&
      projection.candidate_patch?.path === canary.correctionPatchPath &&
      projection.candidate_patch?.sha256 === canary.correctionPatchSha &&
      projection.candidate_tree === canary.correctedCandidateTree &&
      projection.render_receipt?.path === canary.renderReceiptPath &&
      projection.render_receipt?.sha256 === canary.renderReceiptSha &&
      sha256(readFileSync(absolute(canary.correctionPatchPath, root))) ===
        canary.correctionPatchSha &&
      sha256(readFileSync(absolute(canary.renderReceiptPath, root))) ===
        canary.renderReceiptSha &&
      JSON.stringify(projection.renderer_sources) ===
        JSON.stringify(canary.rendererSources) &&
      projection.renderer_sources?.every((entry) =>
        storedDigestMatches(
          { path: entry.snapshot, sha256: entry.sha256 },
          root
        )
      ) &&
      projection.adjacent_copy?.role ===
        "Technical Project Manager - Product Operations & Implementation" &&
      projection.adjacent_copy?.value_proposition ===
        "I help emerging work become usable systems." &&
      projection.actions?.some(
        (action) => action.label === "View selected work" && action.href === "/work"
      ) &&
      projection.actions?.some(
        (action) => action.label === "View resume" && action.href === "/resume"
      ) &&
      projection.renderer_sources?.length >= 3 &&
      projection.viewport_behavior?.mobile?.screenshot_sha256 ===
        canary.mobileEvidenceSha &&
      projection.viewport_behavior?.mobile?.corrected_credit_present === true &&
      projection.viewport_behavior?.desktop?.screenshot_sha256 ===
        canary.desktopEvidenceSha &&
      projection.viewport_behavior?.desktop?.corrected_credit_present === true &&
      sha256(readFileSync(absolute(canary.mobileEvidencePath, root))) ===
        canary.mobileEvidenceSha &&
      sha256(readFileSync(absolute(canary.desktopEvidencePath, root))) ===
        canary.desktopEvidenceSha &&
      projectionFailures.length === 0,
    projectionFailures.join("; ") ||
      "Occurrence binds commit, composition, responsive evidence, and independent release gates."
  );

  check(
    checks,
    "portfolio_edition",
    editionRecord.data.id === canary.editionId &&
      editionRecord.data.occurrences?.includes(canary.projectionId) &&
      editionRecord.data.edition_status === "historical-staging-candidate" &&
      editionRecord.data.candidate_base_commit === canary.historicalCommit &&
      editionRecord.data.candidate_patch_sha256 === canary.correctionPatchSha &&
      editionRecord.data.candidate_tree === canary.correctedCandidateTree &&
      editionRecord.data.responsive_evidence?.every((entry) =>
        storedDigestMatches(entry, root)
      ),
    "The exact occurrence belongs to one Git-bound, responsive historical portfolio edition."
  );

  const evaluation = evaluationRecord.data;
  const curatorialReceipt = JSON.parse(
    readFileSync(absolute(canary.curatorialReceiptPath, root), "utf8")
  );
  const curatorialReceiptStatus = validateCuratorialReceipt(curatorialReceipt, root);
  check(
    checks,
    "curatorial_session",
    evaluation.evaluation_type === "curatorial-proposal" &&
      evaluation.panel?.simulation_notice === true &&
      evaluation.blind_pass?.observations?.length > 0 &&
      evaluation.contextual_pass?.changed_readings?.length > 0 &&
      Boolean(evaluation.lead_proposal) &&
      Boolean(evaluation.alternative) &&
      Boolean(evaluation.dissent) &&
      evaluation.session_receipt?.path === canary.curatorialReceiptPath &&
      evaluation.session_receipt?.status === "exact-public-inputs" &&
      evaluation.session_receipt?.portfolio_base_commit === canary.historicalCommit &&
      evaluation.session_receipt?.portfolio_candidate_tree ===
        canary.correctedCandidateTree &&
      curatorialReceiptStatus.pass &&
      !containsSelectionAutomation(evaluation),
    "Exact-input blind and contextual readings preserve lead, alternative, dissent, and simulation boundary."
  );

  check(
    checks,
    "selection_decision",
    decisionRecord.data.id === "decision.photo.layout-c.home-east-river.v1" &&
      decisionRecord.data.options_considered?.some(
        (option) => option.option === "No-photo homepage"
      ) &&
      decisionRecord.data.outcome_boundary?.includes("production") &&
      decisionRecord.data.projection?.status === "hold" &&
      Object.values(decisionRecord.data.human_gates ?? {}).every(
        (state) => state === "open"
      ) &&
      !containsSelectionAutomation(decisionRecord.data),
    "The decision records alternatives and does not automate artistic authority."
  );

  check(
    checks,
    "recollection_return",
    recollectionRecord.data.source_class === "first-person-recollection" &&
      recollectionRecord.data.public_claim_authority === "research-lead-only" &&
      /does\s+not authorize a journey count/.test(recollectionRecord.content),
    "The dated recollection opens research without silently expanding public copy."
  );

  check(
    checks,
    "research_inquiry",
    inquiryRecord.data.id === "research-inquiry.documented-canoe-bike-journeys" &&
      inquiryRecord.data.projection?.status === "hold" &&
      inquiryRecord.data.anti_claims?.includes("Photo count is not event count."),
    "The inquiry holds numerical claims until event-level human review."
  );

  check(
    checks,
    "protected_absence",
    absenceRecord.data.projection?.status === "hold" &&
      absenceRecord.data.public_display_status === "hold" &&
      absenceRecord.data.consent_state === "review-needed",
    "Intimate gathering images remain an affirmative protected absence."
  );

  check(
    checks,
    "photo_set",
    setRecord.data.id === "index.photo-set.east-river-canoe.2022" &&
      setRecord.data.private_population?.count_publication === "withheld" &&
      setRecord.data.public_members?.length === 1,
    "The public photo set exposes one governed member and withholds private population detail."
  );

  check(
    checks,
    "metadata_precision",
    metadataRecord.data.public_facts?.capture_year === 2022 &&
      metadataRecord.data.public_facts?.public_place_precision === "landmark" &&
      metadataRecord.data.public_facts?.network_upload === false,
    "Public date and place precision are bounded and no private upload occurred."
  );

  check(
    checks,
    "typed_manifest_binding",
    [canary.assetId, canary.derivativeId, canary.projectionId].every((id) =>
      manifestSource.includes(id)
    ) &&
      manifestSource.includes(
        "Photograph by Elana Gordon. From Jamie Burkart's photo archive."
      ) &&
      manifestSource.includes('governanceStatus: "candidate-hold"'),
    "The hand-authored TypeScript manifest carries the governed canary IDs and corrected credit."
  );

  const activeManifestStart = manifestSource.indexOf("export const photos = {");
  const activeManifestEnd = manifestSource.indexOf(
    "} satisfies Record<string, PhotoAsset>;",
    activeManifestStart
  );
  const activeManifest =
    activeManifestStart >= 0 && activeManifestEnd > activeManifestStart
      ? manifestSource.slice(activeManifestStart, activeManifestEnd)
      : "";
  check(
    checks,
    "active_candidate_separation",
    manifestSource.includes("export const governedPhotoCandidates = {") &&
      manifestSource.includes("eastRiverLayoutC") &&
      !activeManifest.includes("eastRiverLayoutC") &&
      !activeManifest.includes(canary.projectionId),
    "Inactive governed candidates are structurally separate from the active Layout E photo manifest."
  );

  check(
    checks,
    "legacy_child_hold",
    childHoldRecord.data.projection?.status === "hold" &&
      childHoldRecord.data.consent_state === "review-needed" &&
      childHoldRecord.data.public_display_status === "hold" &&
      !existsSync(
        absolute(
          "apps/www/public/images/photo-fieldwork/talks-not-raids.jpg",
          root
        )
      ) &&
      !manifestSource.includes("photo-nycac-talks-not-raids") &&
      !manifestSource.includes("talksNotRaids"),
    "The child-visible legacy event image is absent from the current tree and active composition pending human review."
  );

  check(
    checks,
    "teaching_path",
    teachingPaths.every((relativePath) => existsSync(absolute(relativePath, root))) &&
      readFileSync(absolute("docs/photography/README.md", root), "utf8").includes(
        "Artists choose. Archival production supports."
      ),
    "A teammate can follow the canary, rights, binding, edition, correction, and PR workflow."
  );

  const publicSafetyFailures = scanPhotoPublicSafety(root);
  check(
    checks,
    "public_safety",
    publicSafetyFailures.length === 0,
    publicSafetyFailures.join("; ") || "No protected photo locator pattern appears in public photo files."
  );

  const historyFailures = branchHistoryPublicSafety(root);
  check(
    checks,
    "branch_history_public_safety",
    historyFailures.length === 0,
    historyFailures.join("; ") ||
      "Introduced text history contains no protected photo locator pattern."
  );

  check(
    checks,
    "record_graph",
    setRecord.data.public_members?.includes(canary.assetId) &&
      projection.portfolio_edition === canary.editionId &&
      projection.permission_source === canary.permissionId &&
      recollectionRecord.data.prompting_occurrence === canary.projectionId,
    "Asset, set, permission, occurrence, edition, and recollection are connected."
  );

  const rollbackStatus = validateRollbackDrill(rollbackDrill);
  check(
    checks,
    "rollback_drill",
    rollbackStatus.pass,
    "Rollback removes placement references, records correction and cache review, regenerates reports, and preserves history."
  );

  const renderReceiptStatus = validateRenderReceipt(renderReceipt, root);
  check(
    checks,
    "responsive_render_receipt",
    renderReceiptStatus.pass,
    "Production rendering binds the corrected tree, credit, image load, overflow, request, and viewport evidence without closing release gates."
  );

  return {
    pass: Object.values(checks).every((entry) => entry.pass),
    checks,
    facts: {
      derivativeSha,
      dimensions,
      production: projection.approval?.production,
      indexing: projection.approval?.indexing
    }
  };
}

export function computeCandidateFingerprint(root = repoRoot) {
  const tracked = execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    {
    cwd: root,
    encoding: "utf8"
    }
  )
    .trim()
    .split("\n")
    .filter(Boolean)
    .filter((relativePath) => !candidateExclusions.some((pattern) => pattern.test(relativePath)))
    .filter((relativePath) => existsSync(absolute(relativePath, root)))
    .sort();

  const digest = createHash("sha256");
  for (const relativePath of tracked) {
    digest.update(relativePath);
    digest.update("\0");
    digest.update(readFileSync(absolute(relativePath, root)));
    digest.update("\0");
  }
  return { sha256: digest.digest("hex"), fileCount: tracked.length };
}

function holdoutStatus(root, candidateFingerprint) {
  const holdoutRoot = absolute("evals/photo-knowledge/holdouts", root);
  const files = walkFiles(holdoutRoot).filter((file) => file.endsWith(".md"));
  const valid = files.filter((file) => {
    const { data } = matter(readFileSync(file, "utf8"));
    return (
      data.candidate_fingerprint === candidateFingerprint &&
      data.verdict === "pass" &&
      data.independent_read_only === true
    );
  });
  return {
    files: files.map((file) => path.relative(root, file)),
    validCount: valid.length,
    pass: valid.length >= 2
  };
}

function candidateReceiptStatus(root, fingerprint) {
  const receiptPath = absolute("reports/photo-knowledge/candidate.json", root);
  if (!existsSync(receiptPath)) return { pass: false, reason: "candidate receipt is missing" };
  const receipt = JSON.parse(readFileSync(receiptPath, "utf8"));
  return {
    pass:
      receipt.candidate_fingerprint === fingerprint.sha256 &&
      receipt.candidate_file_count === fingerprint.fileCount,
    reason:
      receipt.candidate_fingerprint === fingerprint.sha256
        ? "candidate fingerprint matches"
        : "candidate fingerprint drifted",
    receipt
  };
}

export function evaluatePhotoKnowledge(root = repoRoot) {
  const deterministic = validateCanary({ root });
  const fingerprint = computeCandidateFingerprint(root);
  const receipt = candidateReceiptStatus(root, fingerprint);
  const holdouts = holdoutStatus(root, fingerprint.sha256);
  const definition = JSON.parse(
    readFileSync(absolute("evals/photo-knowledge/rfc-0003.json", root), "utf8")
  );
  const checks = {
    ...deterministic.checks,
    candidate_binding: {
      pass: receipt.pass,
      detail: receipt.reason
    },
    independent_holdouts: {
      pass: holdouts.pass,
      detail: `${holdouts.validCount} exact-candidate independent holdout(s)`
    }
  };

  const cases = definition.criteria.map((criterion) => {
    const result = checks[criterion.check];
    return {
      id: criterion.id,
      check: criterion.check,
      hard_gate: criterion.hard_gate,
      weight: criterion.weight,
      pass: Boolean(result?.pass),
      detail: result?.detail ?? "check is not implemented"
    };
  });
  const weightedTotal = cases.reduce((sum, item) => sum + item.weight, 0);
  const weightedPass = cases.reduce(
    (sum, item) => sum + (item.pass ? item.weight : 0),
    0
  );
  const hardGateFailures = cases.filter((item) => item.hard_gate && !item.pass);
  const score = weightedTotal === 0 ? 0 : weightedPass / weightedTotal;

  return {
    pass:
      hardGateFailures.length === 0 &&
      score >= definition.threshold &&
      deterministic.pass,
    score,
    threshold: definition.threshold,
    hardGateFailures: hardGateFailures.map((item) => item.id),
    candidate: fingerprint,
    cases,
    facts: deterministic.facts
  };
}

function reportPayload(root = repoRoot) {
  const result = validateCanary({ root });
  const projection = readRecord(canary.projectionPath, root).data;
  const asset = readRecord(canary.assetPath, root).data;
  const permission = readRecord(canary.permissionPath, root).data;
  const edition = readRecord(canary.editionPath, root).data;
  return {
    generated_at: "2026-07-26",
    asset: canary.assetId,
    derivative: canary.derivativeId,
    occurrence: canary.projectionId,
    edition: canary.editionId,
    creator: findStatement(asset, "statement.photo.east-river.creator.v2")?.value,
    permission_status: permission.permission?.status,
    approvals: projection.approval,
    routes: [projection.route],
    current_application_occurrence: false,
    candidate_derivative_sha256: result.facts.derivativeSha,
    notes: [
      "Layout C is preserved as a historical staging candidate.",
      "The corrected-credit occurrence is a reproducible candidate on hold, not an active placement.",
      "Layout E remains the current authored application composition.",
      "Exact-occurrence, dignity, creator crop review, production, and indexing remain human gates."
    ]
  };
}

function writeReports(root = repoRoot) {
  const payload = reportPayload(root);
  const deterministic = validateCanary({ root });
  const projection = readRecord(canary.projectionPath, root).data;
  const fingerprint = computeCandidateFingerprint(root);
  const reportsRoot = absolute("reports/photo-knowledge", root);
  const generatedRoot = absolute("docs/knowledge-bank/_generated", root);
  mkdirSync(reportsRoot, { recursive: true });
  mkdirSync(generatedRoot, { recursive: true });

  const sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8"
  }).trim();
  const candidateReceipt = {
    generated_at: "2026-07-26",
    source_commit: sourceCommit,
    candidate_fingerprint: fingerprint.sha256,
    candidate_file_count: fingerprint.fileCount,
    exclusions: candidateExclusions.map((pattern) => pattern.source),
    exact_candidate_note:
      "Any candidate-affecting change invalidates this receipt and every bound holdout."
  };
  writeFileSync(
    path.join(reportsRoot, "candidate.json"),
    `${JSON.stringify(candidateReceipt, null, 2)}\n`
  );

  const usage = {
    asset: canary.assetId,
    occurrences: [
      {
        id: canary.projectionId,
        edition: canary.editionId,
        route: "/",
        state: "candidate-hold",
        active_in_current_application: false
      }
    ]
  };
  writeFileSync(path.join(reportsRoot, "usage.json"), `${JSON.stringify(usage, null, 2)}\n`);

  const impact = {
    changed_property: "preferred creator attribution or permission",
    affected_records: [
      canary.assetId,
      canary.permissionId,
      canary.projectionId,
      canary.editionId
    ],
    affected_files: [
      canary.assetPath,
      canary.permissionPath,
      canary.projectionPath,
      canary.editionPath,
      canary.manifestPath
    ],
    required_human_review: [
      "credit",
      "caption",
      "exact crop and route",
      "Jamie exact-occurrence approval",
      "mobile crop dignity review",
      "creator exact-crop review",
      "production",
      "indexing"
    ]
  };
  writeFileSync(path.join(reportsRoot, "impact.json"), `${JSON.stringify(impact, null, 2)}\n`);

  const openHumanGates = Object.entries(projection.human_gates ?? {})
    .filter(([, state]) => state === "open")
    .map(([gate]) => gate);
  const health = {
    pass:
      deterministic.pass &&
      projection.projection?.status === "hold" &&
      projection.public_display_status === "hold" &&
      projection.consent_state === "review-needed" &&
      openHumanGates.length >= 5,
    public_derivatives_without_asset_records: [],
    active_occurrences_with_stale_permission: [],
    preferred_creator_credit_mismatches: [],
    unsupported_caption_assertions: [],
    revoked_occurrences_referenced_by_app: [],
    gate_state_conflicts: [],
    open_human_gates: openHumanGates
  };
  writeFileSync(path.join(reportsRoot, "health.json"), `${JSON.stringify(health, null, 2)}\n`);

  writeFileSync(
    path.join(generatedRoot, "photography-index.md"),
    `# Photography index\n\nGenerated from the governed photo records on 2026-07-26.\n\n- Asset: \`${payload.asset}\`\n- Derivative: \`${payload.derivative}\`\n- Creator: ${payload.creator}\n- Occurrence: \`${payload.occurrence}\`\n- Edition: \`${payload.edition}\`\n- Current application occurrence: no\n\nThis report describes authored records. It does not select or publish an image.\n`
  );
  writeFileSync(
    path.join(generatedRoot, "photography-rights-review.md"),
    `# Photography rights review\n\n| Occurrence | Permission | Public Git | Current staging | Exact occurrence | Dignity | Creator crop | Production | Indexing |\n|---|---|---|---|---|---|---|---|---|\n| \`${payload.occurrence}\` | ${payload.permission_status} | ${payload.approvals.public_git} | ${payload.approvals.staging} | open | open | open | ${payload.approvals.production} | ${payload.approvals.indexing} |\n\nPassing states are exact-surface facts, not future unrestricted permission. Open human gates are expected and must not be synthesized closed.\n`
  );
  writeFileSync(
    path.join(generatedRoot, "public-photo-placements.md"),
    `# Public photo placements\n\n| Asset | Derivative | Route | Component | Edition | Candidate state | Current app |\n|---|---|---|---|---|---|---|\n| \`${payload.asset}\` | \`${payload.derivative}\` | \`/\` | Hero | \`${payload.edition}\` | hold | no |\n\nThe occurrence is a reproducible corrected-credit Layout C candidate on hold. Layout E remains authored separately.\n`
  );

  return { payload, candidateReceipt };
}

function printResult(result) {
  for (const [name, value] of Object.entries(result.checks)) {
    console.log(`${value.pass ? "PASS" : "FAIL"} ${name}: ${value.detail}`);
  }
  console.log(
    `\nPhoto knowledge check ${result.pass ? "passed" : "failed"}: ${
      Object.values(result.checks).filter((entry) => entry.pass).length
    }/${Object.keys(result.checks).length}`
  );
}

function printPlacementTable(root = repoRoot) {
  const projection = readRecord(canary.projectionPath, root).data;
  console.log(
    "asset\tderivative\troute\tcomponent\tcrop\tcaption\tcredit\tcandidate\tstaging\tproduction\tindexing"
  );
  console.log(
    [
      projection.asset,
      projection.derivative,
      projection.route,
      projection.component,
      `${projection.viewport_behavior.mobile.object_position} / ${projection.viewport_behavior.desktop.object_position}`,
      projection.caption.text,
      projection.credit.text,
      projection.occurrence_status,
      projection.approval.staging,
      projection.approval.production,
      projection.approval.indexing
    ].join("\t")
  );
}

function printRecollectionScaffold(assetId = canary.assetId) {
  console.log(`---\nid: source.recollection.REPLACE\nkind: source\nsource_class: first-person-recollection\nasset: ${assetId}\nrecorded_at: YYYY-MM-DD\npublic_claim_authority: research-lead-only\n---\n\n# Recollection\n\n## Prompting encounter\n\n## What is remembered\n\n## What remains uncertain\n\n## Public-page decision\n\nNo automatic page change.\n`);
}

function main() {
  const command = process.argv[2] ?? "check";
  if (command === "check" || command === "manifest" || command === "curatorial-check") {
    const result = validateCanary();
    printResult(result);
    if (!result.pass) process.exit(1);
    return;
  }
  if (command === "test") {
    console.log("Use npm run photos:test.");
    return;
  }
  if (command === "report") {
    const result = validateCanary();
    if (!result.pass) {
      printResult(result);
      process.exit(1);
    }
    const written = writeReports();
    console.log(
      `Photo reports written for ${written.payload.occurrence}; candidate ${written.candidateReceipt.candidate_fingerprint}.`
    );
    return;
  }
  if (command === "placements") {
    printPlacementTable();
    return;
  }
  if (command === "permissions") {
    const permission = readRecord(canary.permissionPath).data.permission;
    console.log(
      JSON.stringify(
        {
          holder: permission.holder,
          status: permission.status,
          scope: permission.scope,
          public_repository_hosting:
            permission.delivery_channel_interpretation?.public_repository_hosting,
          staging_delivery:
            permission.delivery_channel_interpretation?.staging_delivery,
          transferable: permission.transferable,
          sublicensable: permission.sublicensable,
          future_unrelated_uses: permission.future_unrelated_uses
        },
        null,
        2
      )
    );
    return;
  }
  if (["usage", "impact", "health"].includes(command)) {
    const result = validateCanary();
    if (!result.pass) {
      printResult(result);
      process.exit(1);
    }
    writeReports();
    console.log(
      readFileSync(
        absolute(`reports/photo-knowledge/${command}.json`),
        "utf8"
      ).trim()
    );
    return;
  }
  if (command === "edition") {
    console.log(JSON.stringify(readRecord(canary.editionPath).data, null, 2));
    return;
  }
  if (command === "recollection") {
    printRecollectionScaffold(process.argv[3]);
    return;
  }
  if (command === "curatorial-run") {
    const receipt = JSON.parse(
      readFileSync(absolute(canary.curatorialReceiptPath), "utf8")
    );
    const status = validateCuratorialReceipt(receipt);
    console.log(
      JSON.stringify(
        {
          session_id: receipt.session_id,
          status: status.pass ? "verified" : "invalid",
          exact_public_input_count: status.files.length,
          separate_runs: receipt.model_configuration?.blind_and_contextual_runs,
          artistic_authority: receipt.model_configuration?.artistic_authority,
          production: receipt.authority?.production_approval,
          indexing: receipt.authority?.indexing_approval
        },
        null,
        2
      )
    );
    if (!status.pass) process.exit(1);
    return;
  }
  if (command === "rollback") {
    const receipt = JSON.parse(
      readFileSync(absolute(canary.rollbackDrillPath), "utf8")
    );
    const status = validateRollbackDrill(receipt);
    console.log(JSON.stringify({ ...receipt, verified: status.pass }, null, 2));
    if (!status.pass) process.exit(1);
    return;
  }
  if (command === "eval") {
    const result = evaluatePhotoKnowledge();
    for (const item of result.cases) {
      console.log(
        `${item.pass ? "PASS" : "FAIL"} ${item.id}${item.hard_gate ? " [hard]" : ""}: ${item.detail}`
      );
    }
    console.log(
      `\nPhoto RFC evaluation ${result.pass ? "passed" : "failed"}: ${(result.score * 100).toFixed(1)}% (threshold ${(result.threshold * 100).toFixed(1)}%)`
    );
    if (!result.pass) process.exit(1);
    return;
  }
  throw new Error(`unknown photo-knowledge command: ${command}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
