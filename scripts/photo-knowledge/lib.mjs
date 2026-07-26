import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki } from "../knowledge-wiki/lib.mjs";
import { publicPhotoManifest } from "../../apps/www/src/data/photography.ts";

export const defaultRepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

export const manifestPath = "docs/knowledge-bank/data/photo-knowledge.json";

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
  "photos:recollection",
  "photos:test"
];

const expectedReports = [
  "reports/photo-knowledge.json",
  "reports/photo-knowledge.md",
  "docs/knowledge-bank/_generated/photographic-knowledge-loop.md"
];

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

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
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

export function applyPhotoRevocation(manifest, photoId) {
  const next = structuredClone(manifest);
  const photo = next.photos.find((item) => item.id === photoId);
  if (!photo) throw new Error(`Unknown photo: ${photoId}`);
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
  const photoManifestExact =
    manifest.schemaVersion === 1 &&
    manifest.governingRfc === "rfcs/0003-living-photographic-knowledge-loop.md" &&
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
        sitePhoto.editionId === manifest.edition.id &&
        sitePhoto.productionApproval === "open" &&
        JSON.stringify(photo.placements.map((item) => item.id)) ===
          JSON.stringify(sitePhoto.placementIds)
      );
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
    `(?:${["/", "Users", "/"].join("")}|${["/", "Volumes", "/"].join("")}|Mobile Documents|Photos\\.sqlite|Library/Photos|file://)`,
    "i"
  );
  const protectedAssetPattern =
    /(?:\b[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}\b|IMG_[0-9]{4}|_L0_001)/i;
  const publicBoundaryClean = surfaceFiles.every((file) => {
    const source = readFileSync(file, "utf8");
    return !protectedPathPattern.test(source) && !protectedAssetPattern.test(source);
  }) && (options.publicBoundaryExtraSources ?? []).every(
    (text) =>
      !protectedPathPattern.test(text) && !protectedAssetPattern.test(text)
  );

  const revoked = applyPhotoRevocation(manifest, east.id);
  const revokedEast = revoked.photos.find((photo) => photo.id === east.id);
  const revocationFailsClosed =
    revokedEast.permissionState === "revoked" &&
    revokedEast.productionApproval === "hold" &&
    revokedEast.placements.every(
      (placement) =>
        placement.staging === "hold" &&
        placement.production === "hold" &&
        placement.indexing === "hold"
    ) &&
    revoked.edition.production === "hold" &&
    revoked.edition.indexing === "hold";

  const commandsWired =
    expectedCommands.every((name) => packageManifest.scripts?.[name]) &&
    packageManifest.scripts?.check?.includes("npm run photos:check") &&
    packageManifest.scripts?.check?.includes("npm run photos:test");

  const humanGatesOpen =
    manifest.edition.production === "open" &&
    manifest.edition.indexing === "open" &&
    east?.production_approval === "open" &&
    sitePhotos.every((photo) => photo.productionApproval === "open");

  const checks = {
    photo_rfc_0003_implementing_and_indexed: rfcImplementing,
    photo_records_materialized: recordsMaterialized,
    photo_manifest_exact_and_bound: photoManifestExact && publicProjectionBound,
    photo_east_river_private_binding_opaque: privateBindingOpaque,
    photo_creator_correction_and_history_preserved: preferredCreatorAndHistory,
    photo_permission_bounded_and_private: permissionBounded,
    photo_public_derivatives_reconciled: derivativesReconciled,
    photo_derivative_integrity: derivativeIntegrity,
    photo_placements_and_edition_governed: placementsGoverned,
    photo_recollection_nonpublishing: recollectionNonpublishing,
    photo_inquiry_avoids_photo_counting: inquiryAvoidsPhotoCounting,
    photo_curatorial_authority_advisory: curatorialAuthorityAdvisory,
    photo_protected_absence_first_class: protectedAbsenceFirstClass,
    photo_public_boundary_clean: publicBoundaryClean,
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
      productionOpen: manifest.photos.filter(
        (photo) => photo.productionApproval === "open"
      ).length
    }
  };
}

export function buildPhotoReports(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const manifest = options.manifest ?? loadPhotoKnowledge(repoRoot);
  const evaluation =
    options.evaluation ?? evaluatePhotoKnowledge({ repoRoot, manifest });
  const rows = manifest.photos
    .map((photo) => ({
      id: photo.id,
      derivativeId: photo.derivativeId,
      routes: photo.placements.map((placement) => placement.route),
      creatorState: photo.creatorState,
      permissionState: photo.permissionState,
      sourceBinding: photo.sourceBinding,
      productionApproval: photo.productionApproval
    }))
    .sort((a, b) => compareText(a.id, b.id));
  const placementRows = manifest.photos
    .flatMap((photo) =>
      photo.placements.map((placement) => ({
        photoId: photo.id,
        ...placement
      }))
    )
    .sort(
      (a, b) =>
        compareText(a.route, b.route) || compareText(a.id, b.id)
    );
  const permissionRows = rows.map(
    ({ id, creatorState, permissionState, sourceBinding, productionApproval }) => ({
      id,
      creatorState,
      permissionState,
      sourceBinding,
      productionApproval
    })
  );
  const impact = {
    photoId: "photo.east-river-manhattan-bridge.2022",
    currentPlacement: "placement.home.hero.east-river.layout-b",
    verifiedChanges: [
      "creator credit corrected",
      "private source binding verified",
      "permission scope summarized without raw correspondence",
      "recollection returned to research without automatic publication"
    ],
    unmeasured: [
      "visitor understanding",
      "hiring outcome",
      "production performance",
      "indexing outcome"
    ]
  };
  const report = {
    schemaVersion: 1,
    generatedFor: "feature/photo-knowledge-B",
    governingRfc: manifest.governingRfc,
    edition: manifest.edition,
    evaluation,
    photos: rows,
    placements: placementRows,
    permissions: permissionRows,
    impact,
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
    "| Route | Placement | Photo | Staging | Production | Indexing |",
    "|---|---|---|---|---|---|",
    ...placementRows.map(
      (row) =>
        `| ${row.route} | ${row.id} | ${row.photoId} | ${row.staging} | ${row.production} | ${row.indexing} |`
    ),
    "",
    "## East River impact",
    "",
    ...impact.verifiedChanges.map((item) => `- Verified: ${item}.`),
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
