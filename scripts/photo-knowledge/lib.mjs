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
import { fileURLToPath, pathToFileURL } from "node:url";

import matter from "gray-matter";
import ts from "typescript";

export const defaultRepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

const generatedWarning = "<!-- GENERATED FILE. DO NOT EDIT. Run npm run photos:report. -->";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function parseWebP(buffer) {
  if (
    buffer.length < 20 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return { valid: false, width: null, height: null, chunks: [] };
  }

  const chunks = [];
  let width = null;
  let height = null;
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const type = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    chunks.push(type);

    if (type === "VP8X" && size >= 10) {
      width = 1 + buffer.readUIntLE(start + 4, 3);
      height = 1 + buffer.readUIntLE(start + 7, 3);
    } else if (type === "VP8 " && size >= 10) {
      if (buffer[start + 3] === 0x9d && buffer[start + 4] === 0x01 && buffer[start + 5] === 0x2a) {
        width = buffer.readUInt16LE(start + 6) & 0x3fff;
        height = buffer.readUInt16LE(start + 8) & 0x3fff;
      }
    } else if (type === "VP8L" && size >= 5 && buffer[start] === 0x2f) {
      const b1 = buffer[start + 1];
      const b2 = buffer[start + 2];
      const b3 = buffer[start + 3];
      const b4 = buffer[start + 4];
      width = 1 + (b1 | ((b2 & 0x3f) << 8));
      height = 1 + ((b2 >> 6) | (b3 << 2) | ((b4 & 0x0f) << 10));
    }

    offset = start + size + (size % 2);
  }

  return { valid: width !== null && height !== null, width, height, chunks };
}

async function loadTypeScriptModule(file) {
  const source = readFileSync(file, "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022
    },
    fileName: file,
    reportDiagnostics: true
  });
  const diagnostics = result.diagnostics ?? [];
  if (diagnostics.some((item) => item.category === ts.DiagnosticCategory.Error)) {
    throw new Error(`Unable to transpile ${file}`);
  }
  const encoded = Buffer.from(result.outputText).toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
}

function loadWikiRecords(repoRoot) {
  const root = path.join(repoRoot, "docs/knowledge-bank");
  const recordsById = {};
  const sourceById = {};
  for (const file of walk(root).filter((item) => item.endsWith(".md") && !item.includes(`${path.sep}_generated${path.sep}`))) {
    const source = readFileSync(file, "utf8");
    const parsed = matter(source);
    if (!parsed.data.id) continue;
    const relative = path.relative(repoRoot, file);
    recordsById[parsed.data.id] = { ...parsed.data, path: relative, body: parsed.content };
    sourceById[parsed.data.id] = source;
  }
  return { recordsById, sourceById };
}

function candidateFiles(repoRoot) {
  const fixed = [
    "apps/www/src/app/globals.css",
    "apps/www/src/components/Hero.tsx",
    "apps/www/src/components/CaseStudyLayout.tsx",
    "apps/www/src/components/WorkCard.tsx",
    "apps/www/src/data/photography.ts",
    "apps/www/src/data/work-covers.ts",
    "apps/www/public/images/field-notes/jamie-east-river.webp",
    "apps/www/public/images/field-notes/kc-town-hall-roof-work.webp",
    "apps/www/public/images/field-notes/nycac-market-hotel-banner.webp",
    "apps/www/public/images/field-notes/nycac-shoestring-facilitation.webp",
    "apps/www/public/images/field-notes/sunday-dinner-shared-map.webp",
    "apps/www/public/artifacts/wowlist/public-threshold.webp",
    "evals/photo-knowledge/canary.json",
    "evals/photo-knowledge/evals.json",
    "evals/photo-knowledge/curatorial/layout-c-home-east-river-v1.json",
    "rfcs/0003-living-photographic-knowledge-loop.md"
  ];
  const prefixes = [
    "docs/knowledge-bank/assets/photographs",
    "docs/knowledge-bank/corrections/east-river-credit-2026-07.md",
    "docs/knowledge-bank/decisions/photography",
    "docs/knowledge-bank/evaluations/curatorial",
    "docs/knowledge-bank/indexes/photography.md",
    "docs/knowledge-bank/indexes/photo-sets",
    "docs/knowledge-bank/people/elana-gordon.md",
    "docs/knowledge-bank/projections/photography",
    "docs/knowledge-bank/research-inquiries/documented-canoe-bike-journeys.md",
    "docs/knowledge-bank/sources/photo-metadata",
    "docs/knowledge-bank/sources/permissions",
    "docs/knowledge-bank/sources/recollections",
    "docs/knowledge-bank/workflows/photography-east-river-canary.md",
    "scripts/photo-knowledge",
    "scripts/check-photo-knowledge-evals.mjs",
    "scripts/tests/photo-knowledge.test.mjs"
  ];
  const files = [...fixed];
  for (const prefix of prefixes) {
    const absolute = path.join(repoRoot, prefix);
    if (!existsSync(absolute)) continue;
    if (statSync(absolute).isFile()) files.push(prefix);
    else files.push(...walk(absolute).map((item) => path.relative(repoRoot, item)));
  }
  return [...new Set(files)].filter((item) => existsSync(path.join(repoRoot, item))).sort();
}

export function computePhotoCandidateFingerprint(repoRoot = defaultRepoRoot) {
  const files = candidateFiles(repoRoot);
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(file);
    hash.update("\0");
    hash.update(readFileSync(path.join(repoRoot, file)));
    hash.update("\0");
  }
  return { fingerprint: hash.digest("hex"), fileCount: files.length, files };
}

function bindingRelevantRecordIds(canary) {
  return [
    canary.assetId,
    canary.setId,
    canary.metadataSourceId,
    canary.permissionSourceId,
    canary.curatorialEvaluationId,
    canary.selectionDecisionId,
    canary.placementId,
    canary.editionId,
    canary.correctionId,
    canary.photographerId
  ];
}

export function computePhotoBindingFingerprintFromModel(model) {
  const entries = [
    ["canary", stableStringify(model.canary)],
    ["curatorial-config", stableStringify(model.curatorialConfig)],
    ["derivative-sha256", model.derivativeSha],
    ["derivative-webp", stableStringify(model.webp)],
    ["manifest-east-river", stableStringify(model.portfolioPhotos?.eastRiver ?? null)],
    [
      "public-manifest-east-river",
      stableStringify(
        model.publicPhotoManifest?.find((item) => item.id === "east-river") ?? null
      )
    ],
    [
      "hero-source",
      model.sourceTexts["apps/www/src/components/Hero.tsx"] ?? ""
    ],
    [
      "hero-styles",
      model.sourceTexts["apps/www/src/app/globals.css"] ?? ""
    ],
    ...bindingRelevantRecordIds(model.canary).map((id) => [
      `record:${id}`,
      model.sourceById[id] ?? ""
    ])
  ];
  const hash = createHash("sha256");
  for (const [key, value] of entries) {
    hash.update(key);
    hash.update("\0");
    hash.update(value);
    hash.update("\0");
  }
  return {
    fingerprint: hash.digest("hex"),
    itemCount: entries.length,
    items: entries.map(([key]) => key)
  };
}

function loadPrivateBinding(file, expectedOpaqueId, expectedDerivativeSha) {
  if (!file) return { attempted: false, passed: false, status: "not-run" };
  try {
    const mode = statSync(file).mode & 0o777;
    const data = readJson(file);
    const passed =
      mode === 0o600 &&
      data.publicOpaqueId === expectedOpaqueId &&
      data.sourceProvider === "apple-photos" &&
      typeof data.sourceAssetId === "string" &&
      data.sourceAssetId.length > 0 &&
      data.publicDerivative?.sha256 === expectedDerivativeSha &&
      data.verification?.result === "exact-visible-frame-match" &&
      data.privatePermissionEvidence?.rawCorrespondenceCommitted === false;
    return {
      attempted: true,
      passed,
      status: passed ? "verified" : "failed",
      mode: mode.toString(8)
    };
  } catch {
    return { attempted: true, passed: false, status: "unreadable" };
  }
}

export async function loadPhotoKnowledgeModel(repoRoot = defaultRepoRoot, options = {}) {
  const canary = readJson(path.join(repoRoot, "evals/photo-knowledge/canary.json"));
  const evalConfig = readJson(path.join(repoRoot, "evals/photo-knowledge/evals.json"));
  const curatorialConfig = readJson(
    path.join(repoRoot, "evals/photo-knowledge/curatorial/layout-c-home-east-river-v1.json")
  );
  const { recordsById, sourceById } = loadWikiRecords(repoRoot);
  const manifestModule = await loadTypeScriptModule(path.join(repoRoot, canary.manifestPath));
  const derivativeBuffer = readFileSync(path.join(repoRoot, canary.derivative.path));
  const candidate = computePhotoCandidateFingerprint(repoRoot);
  const receiptPath = path.join(repoRoot, canary.candidateReceiptPath);
  const candidateReceipt = existsSync(receiptPath) ? readJson(receiptPath) : null;
  const packageManifest = readJson(path.join(repoRoot, "package.json"));
  const scanFiles = candidateFiles(repoRoot).filter((item) => !item.endsWith(canary.candidateReceiptPath));
  const sourceTexts = Object.fromEntries(
    scanFiles
      .filter((item) => !item.endsWith(".webp"))
      .map((item) => [item, readFileSync(path.join(repoRoot, item), "utf8")])
  );
  const privateBinding = loadPrivateBinding(
    options.privateBindingPath ?? process.env[canary.privateBinding.environmentVariable],
    canary.privateBinding.opaqueId,
    canary.derivative.sha256
  );

  const model = {
    repoRoot,
    canary,
    evalConfig,
    curatorialConfig,
    recordsById,
    sourceById,
    portfolioPhotos: manifestModule.portfolioPhotos,
    publicPhotoManifest: manifestModule.publicPhotoManifest,
    derivativeSha: sha256(derivativeBuffer),
    webp: parseWebP(derivativeBuffer),
    candidate,
    candidateReceipt,
    packageManifest,
    sourceTexts,
    privateBinding
  };
  model.bindingRelevant = computePhotoBindingFingerprintFromModel(model);
  return model;
}

function hasStatement(asset, id) {
  return asset?.statements?.some((item) => item.id === id);
}

function allTrue(object, keys) {
  return keys.every((key) => object[key] === true);
}

function candidateReceiptState(model, bindingRelevant) {
  const receipt = model.candidateReceipt;
  const exactCandidate =
    receipt?.candidateFingerprint === model.candidate.fingerprint &&
    receipt?.candidateFileCount === model.candidate.fileCount &&
    receipt?.baseCommit === "fea303e54c6b5fae36caee872a2a7450501f9e11" &&
    receipt?.derivativeSha256 === model.canary.derivative.sha256 &&
    receipt?.automatedApproval === false &&
    receipt?.production === "open" &&
    receipt?.indexing === "open";
  const fresh = exactCandidate && receipt?.privateBindingVerification === "verified";
  const carriedForward =
    exactCandidate &&
    receipt?.privateBindingVerification === "verified-carried-forward" &&
    receipt?.carryForwardPolicyVersion === 1 &&
    receipt?.bindingRelevantFingerprint === bindingRelevant.fingerprint &&
    receipt?.bindingRelevantItemCount === bindingRelevant.itemCount &&
    receipt?.carriedForwardFromPrivateBindingVerification === "verified" &&
    /^[a-f0-9]{64}$/.test(receipt?.carriedForwardFromCandidateFingerprint ?? "") &&
    Number.isInteger(receipt?.carriedForwardFromCandidateFileCount) &&
    receipt.carriedForwardFromCandidateFileCount > 0 &&
    /^[a-f0-9]{40}$/.test(receipt?.carriedForwardFromSourceCommit ?? "") &&
    /^[a-f0-9]{64}$/.test(receipt?.carriedForwardFromReceiptSha256 ?? "");
  return { exactCandidate, fresh, carriedForward, valid: fresh || carriedForward };
}

export function evaluatePhotoKnowledgeModel(model) {
  const {
    canary,
    evalConfig,
    curatorialConfig,
    recordsById,
    portfolioPhotos,
    publicPhotoManifest,
    packageManifest
  } = model;
  const record = (id) => recordsById[id];
  const asset = record(canary.assetId);
  const set = record(canary.setId);
  const metadata = record(canary.metadataSourceId);
  const permission = record(canary.permissionSourceId);
  const recollection = record(canary.recollectionSourceId);
  const evaluation = record(canary.curatorialEvaluationId);
  const decision = record(canary.selectionDecisionId);
  const absence = record(canary.protectedAbsenceDecisionId);
  const placement = record(canary.placementId);
  const edition = record(canary.editionId);
  const correction = record(canary.correctionId);
  const inquiry = record(canary.inquiryId);
  const photographer = record(canary.photographerId);
  const east = portfolioPhotos?.eastRiver;
  const statementIds = new Set(asset?.statements?.map((item) => item.id) ?? []);
  const bindingRelevant = computePhotoBindingFingerprintFromModel(model);
  const receiptState = candidateReceiptState(model, bindingRelevant);
  const forbiddenMetadataChunks = model.webp.chunks.filter((item) => ["EXIF", "XMP ", "ICCP"].includes(item));
  const privateLeakPattern = /(?:\/(?:Users|Volumes)\/|Mobile Documents|supporting-materials|\bIMG_\d+\b|\b[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}\b|\bpfp-[a-f0-9]+\b|sourceAssetId|privatePreview)/i;
  const publicCensusLeakPattern = /(?:\/(?:Users|Volumes)\/|Mobile Documents|supporting-materials|\bIMG_\d+\b|\bpfp-[a-f0-9]+\b|sourceAssetId|privatePreview)/i;
  const projectSiteCensusPrefix = "docs/knowledge-bank/assets/photographs/project-sites/";
  const governanceTexts = Object.entries(model.sourceTexts)
    .filter(([file]) => !file.startsWith("scripts/"));
  const leakage = governanceTexts
    .filter(([file]) => !file.startsWith("scripts/"))
    .filter(([file, source]) =>
      (file.startsWith(projectSiteCensusPrefix)
        ? publicCensusLeakPattern
        : privateLeakPattern
      ).test(source)
    )
    .map(([file]) => file);
  const requiredRecords = [
    canary.assetId,
    canary.setId,
    canary.metadataSourceId,
    canary.permissionSourceId,
    canary.recollectionSourceId,
    canary.curatorialEvaluationId,
    canary.selectionDecisionId,
    canary.protectedAbsenceDecisionId,
    canary.placementId,
    canary.editionId,
    canary.correctionId,
    canary.inquiryId,
    canary.photographerId
  ];

  const expectedBoundPhotoIds = [
    "east-river",
    "kc-town-hall-roof-work",
    "nycac-market-hotel-banner",
    "nycac-shoestring-facilitation",
    "sunday-dinner-shared-map"
  ];
  const observedBoundPhotoIds = publicPhotoManifest
    ?.filter((item) => item.knowledgeStatus === "bound")
    .map((item) => item.id)
    .sort();
  const exactReviewedField =
    JSON.stringify(observedBoundPhotoIds) ===
      JSON.stringify([...expectedBoundPhotoIds].sort()) &&
    publicPhotoManifest?.length === expectedBoundPhotoIds.length;
  const everyBoundOccurrenceAligned = publicPhotoManifest?.every((item) => {
    const photoAsset = record(item.wikiId);
    const photoStatementIds = new Set(
      photoAsset?.statements?.map((statement) => statement.id) ?? []
    );
    const expectedDerivativePath = `apps/www/public${item.src}`;
    const derivativeAligned = photoAsset?.public_derivatives?.some(
      (derivative) =>
        derivative.id === item.derivativeId &&
        derivative.path === expectedDerivativePath &&
        derivative.width === item.width &&
        derivative.height === item.height &&
        derivative.metadata_stripped === true
    );
    const placementsAligned =
      item.placementIds?.length > 0 &&
      item.placementIds.every((placementId) => {
        const occurrence = record(placementId);
        return (
          occurrence?.asset === item.wikiId &&
          occurrence?.derivative === item.derivativeId &&
          occurrence?.caption?.text === item.caption &&
          occurrence?.credit?.text === item.credit &&
          occurrence?.caption?.assertions?.every((id) =>
            item.captionAssertionIds.includes(id)
          ) &&
          occurrence?.credit?.assertions?.every((id) =>
            item.creditAssertionIds.includes(id)
          ) &&
          occurrence?.approval?.public_git === "approved" &&
          occurrence?.approval?.staging === "approved" &&
          occurrence?.approval?.production === "open" &&
          occurrence?.approval?.indexing === "open" &&
          occurrence?.rollback?.preserves_history === true
        );
      });
    return (
      Boolean(photoAsset) &&
      derivativeAligned &&
      placementsAligned &&
      item.captionAssertionIds?.every((id) => photoStatementIds.has(id)) &&
      item.creditAssertionIds?.every((id) => photoStatementIds.has(id)) &&
      item.publicationStatus === "jamie-authorized" &&
      item.releaseState?.publicGit === "approved" &&
      item.releaseState?.staging === "approved" &&
      item.releaseState?.production === "open" &&
      item.releaseState?.indexing === "open"
    );
  });

  const manifestAligned =
    east?.wikiId === canary.assetId &&
    east?.derivativeId === canary.derivative.id &&
    east?.placementIds?.includes(canary.placementId) &&
    east?.caption === canary.publicCopy.caption &&
    east?.credit === canary.publicCopy.credit &&
    east?.knowledgeStatus === "bound" &&
    east?.releaseState?.production === "open" &&
    east?.releaseState?.indexing === "open" &&
    east?.captionAssertionIds?.every((id) => statementIds.has(id)) &&
    east?.creditAssertionIds?.every((id) => statementIds.has(id)) &&
    exactReviewedField &&
    everyBoundOccurrenceAligned;

  const privateResolutionAttested =
    asset?.private_source_binding?.opaque_id === canary.privateBinding.opaqueId &&
    /^pfwpub_[A-Za-z0-9_-]{8,}$/.test(asset?.private_source_binding?.opaque_id ?? "") &&
    asset?.private_source_binding?.resolution_state === "verified-private-2026-07-26";
  const receiptBindsPrivateVerification = receiptState.valid;

  const checks = {
    records_materialized: requiredRecords.every((id) => Boolean(record(id))),
    no_private_locator_leakage: leakage.length === 0,
    private_binding_opaque_and_resolvable:
      privateResolutionAttested && (model.privateBinding.passed || receiptBindsPrivateVerification),
    derivative_integrity_and_metadata_stripping:
      model.derivativeSha === canary.derivative.sha256 &&
      model.webp.valid &&
      model.webp.width === canary.derivative.width &&
      model.webp.height === canary.derivative.height &&
      forbiddenMetadataChunks.length === 0 &&
      asset?.public_derivatives?.some(
        (item) =>
          item.id === canary.derivative.id &&
          item.path === canary.derivative.path &&
          item.checksum === canary.derivative.sha256 &&
          item.metadata_stripped === true
      ),
    creator_credit_and_custody_distinct:
      hasStatement(asset, "statement.photo.east-river.creator.v2") &&
      hasStatement(asset, "statement.photo.east-river.custody.v1") &&
      asset?.statements?.some(
        (item) => item.id === "statement.photo.east-river.creator.unknown.v1" && item.rank === "deprecated"
      ) &&
      photographer?.title === "Elana Gordon" &&
      correction?.previous_text === "From Jamie Burkart's photo archive." &&
      correction?.replacement_text === canary.publicCopy.credit &&
      /Elana Gordon is credited as photographer/.test(east?.publicUseBoundary ?? "") &&
      /no broader rights are asserted/.test(east?.publicUseBoundary ?? "") &&
      !/no third-party authorship/.test(east?.publicUseBoundary ?? ""),
    permission_scope_exact_and_fail_closed:
      permission?.permission_capsule?.required_credit === "Photograph by Elana Gordon." &&
      permission?.permission_capsule?.derivative_scope === "Current Layout C crop and transform" &&
      permission?.permission_capsule?.public_git === "approved" &&
      permission?.permission_capsule?.staging === "approved" &&
      permission?.permission_capsule?.production === "open" &&
      permission?.permission_capsule?.indexing === "open" &&
      permission?.permission_capsule?.revocable === true &&
      permission?.permission_capsule?.private_evidence === "held-outside-git",
    caption_assertions_source_bound:
      placement?.caption?.text === canary.publicCopy.caption &&
      placement?.credit?.text === canary.publicCopy.credit &&
      placement?.caption?.assertions?.every((id) => statementIds.has(id)) &&
      placement?.credit?.assertions?.every((id) => statementIds.has(id)) &&
      asset?.statements?.every((item) => Array.isArray(item.references) && item.references.length > 0),
    manifest_wiki_placement_alignment:
      manifestAligned &&
      placement?.asset === canary.assetId &&
      placement?.derivative === canary.derivative.id &&
      placement?.route === canary.publicCopy.route &&
      placement?.component === canary.publicCopy.component &&
      edition?.occurrences?.includes(canary.placementId),
    revocation_and_rollback_available:
      placement?.rollback?.preserves_history === true &&
      /Remove the Hero image occurrence/.test(placement?.rollback?.action ?? "") &&
      permission?.permission_capsule?.revocable === true,
    protected_absence_not_auto_filled:
      absence?.chosen_course?.includes("no-photo occurrence") &&
      absence?.projection?.status === "hold" &&
      edition?.protected_absences?.includes(canary.protectedAbsenceDecisionId),
    recollection_does_not_auto_project:
      recollection?.projection?.status === "hold" &&
      recollection?.projection?.surfaces?.length === 0 &&
      recollection?.prompted_by === canary.placementId &&
      inquiry?.projection?.status === "hold",
    automated_selection_prohibited:
      curatorialConfig?.authority?.selectionMethod === "human editorial decision" &&
      ["ranked-choice voting", "majority vote", "aggregate model score", "aesthetic score"].every(
        (item) => curatorialConfig?.authority?.prohibitedMethods?.includes(item)
      ) &&
      evaluation?.panel?.simulation_notice === true &&
      Boolean(evaluation?.alternative) &&
      Boolean(evaluation?.dissent),
    production_and_indexing_human_gated:
      placement?.approval?.production === "open" &&
      placement?.approval?.indexing === "open" &&
      edition?.approval?.production === "open" &&
      edition?.approval?.indexing === "open" &&
      edition?.human_gates?.includes("Jamie production approval"),
    rfc_authority_and_scope_current:
      /^stage: implementing$/m.test(model.sourceTexts[canary.rfcPath] ?? "") &&
      /authorized implementation of RFC 0003/i.test(
        model.sourceTexts[canary.rfcPath] ?? ""
      ) &&
      /July 26,\s*(?:>\s*)?2026/i.test(
        model.sourceTexts[canary.rfcPath] ?? ""
      ) &&
      !/\bRFP\b|\brfps\b/i.test(governanceTexts.map(([, source]) => source).join("\n")),
    exact_candidate_receipt_current: receiptState.valid
  };

  const scripts = packageManifest.scripts ?? {};
  const firstViewportSource = `${model.sourceTexts["apps/www/src/components/Hero.tsx"] ?? ""}\n${
    model.sourceTexts["apps/www/src/data/photography.ts"] ?? ""
  }`;
  const criteria = {
    documentary_integrity: allTrue(checks, [
      "records_materialized",
      "private_binding_opaque_and_resolvable",
      "derivative_integrity_and_metadata_stripping",
      "creator_credit_and_custody_distinct",
      "permission_scope_exact_and_fail_closed",
      "caption_assertions_source_bound"
    ]),
    placement_coherence:
      checks.manifest_wiki_placement_alignment &&
      [
        "Jamie Burkart",
        "Technical Project Manager",
        "I help emerging work become usable systems.",
        "View selected work",
        "View resume"
      ].every((item) => firstViewportSource.includes(item)),
    artist_led_curation: checks.automated_selection_prohibited,
    living_return:
      checks.recollection_does_not_auto_project &&
      checks.creator_credit_and_custody_distinct &&
      Boolean(inquiry),
    selective_projection:
      checks.protected_absence_not_auto_filled &&
      exactReviewedField &&
      publicPhotoManifest
        ?.filter((item) => item.knowledgeStatus === "phase-2-reconciliation-pending")
        .every(
          (item) =>
            item.releaseState?.production === "open" &&
            item.releaseState?.indexing === "open"
        ),
    teammate_reproducibility:
      [
        "photos:check",
        "photos:report",
        "photos:placements",
        "photos:permissions",
        "photos:manifest",
        "photos:usage",
        "photos:impact",
        "photos:health",
        "photos:edition",
        "photos:recollection",
        "photos:test",
        "photos:hillclimb"
      ].every((name) => Boolean(scripts[name])) &&
      Boolean(model.sourceTexts["docs/knowledge-bank/workflows/photography-east-river-canary.md"])
  };

  const hardGateIds = new Set(evalConfig.hardGates);
  const unmappedHardGates = [...hardGateIds].filter((id) => !(id in checks));
  const failedHardGates = [...hardGateIds].filter((id) => checks[id] !== true);
  const failedCriteria = evalConfig.criteria
    .filter((item) => criteria[item.id] !== true)
    .map((item) => item.id);

  return {
    passed: unmappedHardGates.length === 0 && failedHardGates.length === 0 && failedCriteria.length === 0,
    checks,
    criteria,
    failedHardGates,
    failedCriteria,
    unmappedHardGates,
    diagnostics: {
      leakage,
      forbiddenMetadataChunks,
      privateBinding: model.privateBinding,
      bindingRelevant,
      receiptState,
      pendingReconciliation: publicPhotoManifest
        ?.filter((item) => item.knowledgeStatus === "phase-2-reconciliation-pending")
        .map((item) => item.id),
      candidate: model.candidate
    }
  };
}

export async function evaluatePhotoKnowledge(repoRoot = defaultRepoRoot, options = {}) {
  const model = await loadPhotoKnowledgeModel(repoRoot, options);
  return { model, evaluation: evaluatePhotoKnowledgeModel(model) };
}

function placementMarkdown(model) {
  const placement = model.recordsById[model.canary.placementId];
  return `${generatedWarning}\n\n# Public photo placements\n\n| Asset | Derivative | Route | Component | Caption | Credit | Public Git | Staging | Production | Indexing |\n|---|---|---|---|---|---|---|---|---|---|\n| ${placement.asset} | ${placement.derivative} | \`${placement.route}\` | ${placement.component} | ${placement.caption.text} | ${placement.credit.text} | ${placement.approval.public_git} | ${placement.approval.staging} | ${placement.approval.production} | ${placement.approval.indexing} |\n`;
}

function permissionsMarkdown(model) {
  const permission = model.recordsById[model.canary.permissionSourceId].permission_capsule;
  return `${generatedWarning}\n\n# Photo permissions\n\n| Asset | Destination | Credit | Public Git | Staging | Production | Indexing | Revocable |\n|---|---|---|---|---|---|---|---|\n| ${permission.asset} | ${permission.allowed_destination.join(", ")} | ${permission.required_credit} | ${permission.public_git} | ${permission.staging} | ${permission.production} | ${permission.indexing} | ${permission.revocable ? "yes" : "no"} |\n\nPrivate correspondence and protected locators are not included.\n`;
}

function impactMarkdown(model) {
  return `${generatedWarning}\n\n# East River correction impact\n\nA creator, permission, caption, derivative, or protected-state change requires review of:\n\n- \`${model.canary.assetId}\`\n- \`${model.canary.permissionSourceId}\`\n- \`${model.canary.correctionId}\`\n- \`${model.canary.selectionDecisionId}\`\n- \`${model.canary.placementId}\`\n- \`${model.canary.editionId}\`\n- \`apps/www/src/data/photography.ts\`\n- \`apps/www/src/components/Hero.tsx\`\n- the homepage at \`/\` across every required viewport\n\nNo change automatically grants production or indexing approval.\n`;
}

function healthMarkdown(model, evaluation) {
  const rows = Object.entries(evaluation.checks)
    .map(([id, passed]) => `| ${id} | ${passed ? "PASS" : "FAIL"} |`)
    .join("\n");
  return `${generatedWarning}\n\n# Photo knowledge health\n\nCandidate fingerprint: \`${model.candidate.fingerprint}\`\nCandidate files: ${model.candidate.fileCount}\n\n| Check | State |\n|---|---|\n${rows}\n\n## Open human gates\n\n- Jamie production approval\n- indexing approval\n- any later crop, context, destination, or permission change\n\nAutomated PASS is verification evidence, not publication authority.\n`;
}

export function renderPhotoReport(model, evaluation, kind = "health") {
  if (kind === "placements" || kind === "usage" || kind === "edition") return placementMarkdown(model);
  if (kind === "permissions") return permissionsMarkdown(model);
  if (kind === "impact") return impactMarkdown(model);
  if (kind === "health") return healthMarkdown(model, evaluation);
  throw new Error(`Unknown photo report kind: ${kind}`);
}

export function writePhotoReports(model, evaluation) {
  const reportsRoot = path.join(model.repoRoot, "reports/photo-knowledge");
  const generatedRoot = path.join(model.repoRoot, "docs/knowledge-bank/_generated");
  mkdirSync(reportsRoot, { recursive: true });
  mkdirSync(generatedRoot, { recursive: true });
  const outputs = {
    "reports/photo-knowledge/health.json": `${JSON.stringify(
      {
        generated: true,
        passed: evaluation.passed,
        checks: evaluation.checks,
        criteria: evaluation.criteria,
        failedHardGates: evaluation.failedHardGates,
        failedCriteria: evaluation.failedCriteria,
        candidate: model.candidate,
        humanGates: ["Jamie production approval", "indexing approval"]
      },
      null,
      2
    )}\n`,
    "reports/photo-knowledge/health.md": healthMarkdown(model, evaluation),
    "reports/photo-knowledge/placements.md": placementMarkdown(model),
    "reports/photo-knowledge/permissions.md": permissionsMarkdown(model),
    "reports/photo-knowledge/impact.md": impactMarkdown(model),
    "docs/knowledge-bank/_generated/photography-index.md": healthMarkdown(model, evaluation),
    "docs/knowledge-bank/_generated/public-photo-placements.md": placementMarkdown(model)
  };
  for (const [relative, content] of Object.entries(outputs)) {
    writeFileSync(path.join(model.repoRoot, relative), content);
  }
  return Object.keys(outputs);
}

export function candidateReceipt(model, options = {}) {
  const receipt = {
    schemaVersion: options.privateBindingVerification === "verified-carried-forward" ? 2 : 1,
    runId: "2026-07-26-east-river-canary",
    recordedAt: options.recordedAt ?? "2026-07-26",
    baseBranch: "features/layout-C",
    baseCommit: "fea303e54c6b5fae36caee872a2a7450501f9e11",
    implementationBranch: options.implementationBranch ?? "feature/photo-knowledge-C",
    sourceCommit: options.sourceCommit ?? null,
    candidateFingerprint: model.candidate.fingerprint,
    candidateFileCount: model.candidate.fileCount,
    derivativeSha256: model.canary.derivative.sha256,
    privateBindingVerification: options.privateBindingVerification ?? "not-run",
    publicGit: "approved",
    staging: "approved",
    production: "open",
    indexing: "open",
    automatedApproval: false,
    simulationNotice: true,
    humanGates: [
      "Jamie production approval",
      "indexing approval",
      "new crop, destination, context, or permission review"
    ]
  };
  if (options.carryForward) Object.assign(receipt, options.carryForward);
  return receipt;
}

export function writeCandidateReceipt(model, options = {}) {
  const receipt = candidateReceipt(model, options);
  const file = path.join(model.repoRoot, model.canary.candidateReceiptPath);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(receipt, null, 2)}\n`);
  return receipt;
}

export function writeCarriedForwardCandidateReceipt(model, priorModel, options = {}) {
  const priorReceipt = priorModel.candidateReceipt;
  const priorReceiptValid =
    priorReceipt?.candidateFingerprint === priorModel.candidate.fingerprint &&
    priorReceipt?.candidateFileCount === priorModel.candidate.fileCount &&
    priorReceipt?.baseCommit === "fea303e54c6b5fae36caee872a2a7450501f9e11" &&
    priorReceipt?.derivativeSha256 === priorModel.canary.derivative.sha256 &&
    priorReceipt?.privateBindingVerification === "verified" &&
    priorReceipt?.automatedApproval === false;
  if (!priorReceiptValid) {
    throw new Error("The prior candidate does not have an exact verified private-binding receipt.");
  }

  const currentBinding = computePhotoBindingFingerprintFromModel(model);
  const priorBinding = computePhotoBindingFingerprintFromModel(priorModel);
  if (
    currentBinding.fingerprint !== priorBinding.fingerprint ||
    currentBinding.itemCount !== priorBinding.itemCount
  ) {
    throw new Error(
      `Binding-relevant material changed (${priorBinding.fingerprint} -> ${currentBinding.fingerprint}); private re-verification is required.`
    );
  }

  const priorReceiptPath = path.join(
    priorModel.repoRoot,
    priorModel.canary.candidateReceiptPath
  );
  const priorReceiptSha256 = sha256(readFileSync(priorReceiptPath));
  return writeCandidateReceipt(model, {
    sourceCommit: options.sourceCommit ?? null,
    recordedAt: options.recordedAt ?? "2026-07-28",
    implementationBranch: options.implementationBranch ?? "feature/pre-launch-C",
    privateBindingVerification: "verified-carried-forward",
    carryForward: {
      carryForwardPolicyVersion: 1,
      bindingRelevantFingerprint: currentBinding.fingerprint,
      bindingRelevantItemCount: currentBinding.itemCount,
      carriedForwardFromCandidateFingerprint: priorReceipt.candidateFingerprint,
      carriedForwardFromCandidateFileCount: priorReceipt.candidateFileCount,
      carriedForwardFromSourceCommit: priorReceipt.sourceCommit,
      carriedForwardFromReceiptSha256: priorReceiptSha256,
      carriedForwardFromPrivateBindingVerification:
        priorReceipt.privateBindingVerification
    }
  });
}
