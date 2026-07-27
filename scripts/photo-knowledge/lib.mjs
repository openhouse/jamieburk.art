import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

export const defaultRepoRoot = path.resolve(import.meta.dirname, "../..");

const stableIdSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/);

const recordSchema = z
  .object({
    id: stableIdSchema,
    title: z.string().min(1),
    kind: z.enum([
      "asset",
      "correction",
      "index",
      "source",
      "evaluation",
      "decision",
      "projection",
      "research-inquiry",
      "research-run",
      "event"
    ]),
    status: z.string().min(1),
    visibility: z.string().min(1),
    sensitivity: z.string().min(1),
    last_reviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    canonical_path: z.string().min(1),
    summary: z.string().min(1),
    relations: z
      .array(
        z.object({
          type: z.string().min(1),
          target: stableIdSchema,
          href: z.string().min(1),
          context: z.string().min(1).optional()
        })
      )
      .default([]),
    anti_claims: z.array(z.string().min(1)).default([])
  })
  .passthrough();

const statementSchema = z
  .object({
    id: stableIdSchema,
    property: z.string().min(1),
    value: z.union([z.string(), z.number()]),
    rank: z.enum(["preferred", "normal", "deprecated"]),
    confidence: z.enum(["high", "moderate", "limited"]),
    references: z.array(stableIdSchema).min(1),
    supersedes: z.array(stableIdSchema).optional(),
    superseded_by: stableIdSchema.optional()
  })
  .passthrough();

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|Mobile Documents|Library\/CloudStorage|\.photoslibrary\b|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;

const metadataMarkers = [
  Buffer.from("Exif\0\0", "binary"),
  Buffer.from("http://ns.adobe.com/xap/1.0/"),
  Buffer.from("Photoshop 3.0"),
  Buffer.from("GPSLatitude"),
  Buffer.from("XML ")
];

function imageDimensions(buffer) {
  if (
    buffer.length >= 30 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    const kind = buffer.subarray(12, 16).toString("ascii");
    if (kind === "VP8 ") {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff
      };
    }
    if (kind === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3)
      };
    }
    if (kind === "VP8L") {
      const bits = buffer.readUInt32LE(21);
      return {
        width: 1 + (bits & 0x3fff),
        height: 1 + ((bits >> 14) & 0x3fff)
      };
    }
  }

  return null;
}

function hasEmbeddedMetadata(buffer) {
  return metadataMarkers.some((marker) => buffer.includes(marker));
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function readSource(repoRoot, relativePath, overrides) {
  if (Object.hasOwn(overrides, relativePath)) return overrides[relativePath];
  const absolute = path.join(repoRoot, relativePath);
  return existsSync(absolute) ? readFileSync(absolute, "utf8") : null;
}

function readAsset(repoRoot, relativePath, overrides) {
  if (Object.hasOwn(overrides, relativePath)) return overrides[relativePath];
  const absolute = path.join(repoRoot, relativePath);
  return existsSync(absolute) ? readFileSync(absolute) : null;
}

function normalizeYaml(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (Array.isArray(value)) return value.map(normalizeYaml);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normalizeYaml(item)])
    );
  }
  return value;
}

function parseRecord(relativePath, source) {
  if (source === null) {
    return { relativePath, error: "missing", source: null, data: null, content: "" };
  }
  try {
    const parsed = matter(source);
    const data = recordSchema.parse(normalizeYaml(parsed.data));
    return { relativePath, error: null, source, data, content: parsed.content };
  } catch (error) {
    return {
      relativePath,
      error: error instanceof Error ? error.message : String(error),
      source,
      data: null,
      content: ""
    };
  }
}

function recordById(records, id) {
  return records.find((record) => record.data?.id === id)?.data ?? null;
}

function reportPathsFromSuite(suite) {
  return suite.required_reports;
}

export function evaluatePhotoKnowledge(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const sourceOverrides = options.sourceOverrides ?? {};
  const assetOverrides = options.assetOverrides ?? {};
  const suite =
    options.suiteOverride ??
    JSON.parse(
      readFileSync(path.join(repoRoot, "evals/photo-knowledge/suite.json"), "utf8")
    );

  const source = (relativePath) =>
    readSource(repoRoot, relativePath, sourceOverrides);
  const records = suite.required_records.map((relativePath) =>
    parseRecord(relativePath, source(relativePath))
  );
  const ids = records.map((record) => record.data?.id).filter(Boolean);
  const recordMap = new Map(
    records.filter((record) => record.data).map((record) => [record.data.id, record.data])
  );

  const asset = recordById(records, suite.canary_asset_id);
  const occurrence = recordById(records, suite.canary_occurrence_id);
  const edition = recordById(records, suite.portfolio_edition_id);
  const protectedAbsence = recordById(records, suite.protected_absence_id);
  const permission = recordById(
    records,
    "source.permission.elana-gordon.east-river.2026-07"
  );
  const recollection = recordById(
    records,
    "source.recollection.jamie-canoe-commuting.2026-07"
  );
  const evaluation = recordById(
    records,
    "evaluation.curatorial.layout-d.home-east-river.v1"
  );
  const resumeDecision = recordById(
    records,
    "decision.photo.layout-d.resume.protected-absence"
  );
  const clearanceCorrection = recordById(
    records,
    suite.clearance_correction_id
  );
  const oralHistoryInquiry = recordById(
    records,
    "research-inquiry.photo.hardhat-worksite-oral-history"
  );
  const dclaEvent = recordById(
    records,
    "event.nycac.diy-spaces-post-ghost-ship-dcla.2017-01-27"
  );
  const dclaAsset = recordById(
    records,
    "asset.photo.nycac.dcla-listening-room.2017-01-27"
  );
  const dclaRun = recordById(
    records,
    "research.nycac.dcla-photograph-source-return.2026-07"
  );
  const dclaInquiry = recordById(
    records,
    "research-inquiry.nycac.dcla-audio-speaker-map"
  );
  const dclaOccurrence = recordById(
    records,
    "projection.photo.layout-d.home.dcla-listening-room"
  );
  const hardhatAsset = recordById(
    records,
    "asset.photo.kc-town-hall.hardhat-worksite.2018"
  );
  const collaboratorAsset = recordById(
    records,
    "asset.photo.kc-town-hall.collaborator-worksite.2018"
  );
  const hardhatRecollection = recordById(
    records,
    "source.recollection.kc-town-hall-hardhat.2026-07"
  );
  const collaboratorRecollection = recordById(
    records,
    "source.recollection.kc-town-hall-collaborator-photo.2026-07"
  );
  const collaboratorHomeOccurrence = recordById(
    records,
    "projection.photo.layout-d.home.kc-town-hall-collaborator"
  );
  const collaboratorWorkOccurrence = recordById(
    records,
    "projection.photo.layout-d.work.kc-town-hall-collaborator"
  );
  const proposalAsset = recordById(
    records,
    "asset.kc-town-hall.proposal-rendering.2019"
  );
  const councilAsset = recordById(
    records,
    "asset.photo.nyc-council.commercial-rent-fieldwork.2026"
  );
  const councilRecollection = recordById(
    records,
    "source.recollection.nyc-council-commercial-rent-fieldwork.2026-07"
  );
  const councilInquiry = recordById(
    records,
    "research-inquiry.photo.nyc-council-commercial-rent-fieldwork"
  );

  const recordsAreSchemaValidAndComplete =
    records.every((record) => !record.error && record.data) &&
    new Set(ids).size === suite.required_records.length &&
    suite.required_guides.every((relativePath) => source(relativePath) !== null) &&
    records.every((record) => record.data?.canonical_path === record.relativePath);

  let statements = [];
  let statementSchemaValid = false;
  try {
    statements = z.array(statementSchema).min(1).parse(asset?.statements);
    statementSchemaValid = true;
  } catch {
    statementSchemaValid = false;
  }

  const derivative = asset?.public_derivatives?.find(
    (item) => item.id === suite.canary_derivative_id
  );
  const derivativeBuffer = derivative?.path
    ? readAsset(repoRoot, derivative.path, assetOverrides)
    : null;
  const dimensions = derivativeBuffer ? imageDimensions(derivativeBuffer) : null;
  const derivativeIsExactAndMetadataMinimized =
    Boolean(derivativeBuffer) &&
    derivativeBuffer.length > 100_000 &&
    dimensions?.width === derivative?.width &&
    dimensions?.height === derivative?.height &&
    sha256(derivativeBuffer) === derivative?.checksum &&
    derivative?.metadata_stripped === true &&
    !hasEmbeddedMetadata(derivativeBuffer);

  const statementIds = new Set(statements.map((statement) => statement.id));
  const preferredCreator = statements.filter(
    (statement) =>
      statement.property === "creator" &&
      statement.rank === "preferred" &&
      statement.value === "Elana Gordon"
  );
  const deprecatedCreator = statements.find(
    (statement) =>
      statement.id === "statement.photo.east-river.creator.unknown.v1" &&
      statement.property === "creator" &&
      statement.rank === "deprecated" &&
      statement.value === "unknown"
  );
  const statementProvenanceAndCreatorCorrectionAreValid =
    statementSchemaValid &&
    preferredCreator.length === 1 &&
    preferredCreator[0].supersedes?.includes(
      "statement.photo.east-river.creator.unknown.v1"
    ) &&
    deprecatedCreator?.superseded_by ===
      "statement.photo.east-river.creator.v2" &&
    statements.every((statement) =>
      statement.references.every((id) => recordMap.get(id)?.kind === "source")
    );

  const permissionCapsuleIsBounded =
    permission?.kind === "source" &&
    permission?.source_kind === "private-permission-summary" &&
    permission?.visibility === "summary-only" &&
    permission?.permission?.status === "reported-granted" &&
    permission?.permission?.scope?.includes("portfolio-site-use") &&
    permission?.permission?.future_unrelated_uses === "not-granted" &&
    permission?.private_evidence?.reinspection_state ===
      "human-review-required-before-production" &&
    asset?.rights_state === "permission-needed" &&
    asset?.consent_state === "review-needed" &&
    asset?.public_display_status === "hold" &&
    !privatePattern.test(JSON.stringify(permission)) &&
    !/@/.test(permission?.summary ?? "");

  const captionAssertions = occurrence?.caption?.assertions ?? [];
  const creditAssertions = occurrence?.credit?.assertions ?? [];
  const captionAndCreditAssertionsResolve =
    occurrence?.caption?.text ===
      "At the East River beneath the Manhattan Bridge, 2022." &&
    occurrence?.credit?.text ===
      "Photograph by Elana Gordon. From Jamie Burkart's photo archive." &&
    [...captionAssertions, ...creditAssertions].every((id) =>
      statementIds.has(id)
    ) &&
    captionAssertions.includes("statement.photo.east-river.place.v1") &&
    captionAssertions.includes("statement.photo.east-river.capture-year.v1") &&
    creditAssertions.includes("statement.photo.east-river.creator.v2") &&
    creditAssertions.includes("statement.photo.east-river.custody.v1");

  const photographyData =
    source("apps/www/src/data/photography.ts") ?? "";
  const hero = source("apps/www/src/components/Hero.tsx") ?? "";
  const globals = source("apps/www/src/app/globals.css") ?? "";
  const home = source("apps/www/src/app/page.tsx") ?? "";
  const resume = source("apps/www/src/app/resume/page.tsx") ?? "";
  const applicationManifestResolvesToWiki =
    photographyData.includes(`wikiId: "${suite.canary_asset_id}"`) &&
    photographyData.includes(
      `derivativeId: "${suite.canary_derivative_id}"`
    ) &&
    photographyData.includes(
      `placementIds: ["${suite.canary_occurrence_id}"]`
    ) &&
    photographyData.includes(`src: "${derivative?.path?.replace("apps/www/public", "")}"`) &&
    photographyData.includes("Photograph by Elana Gordon") &&
    photographyData.includes('objectPosition: "50% 50%"') &&
    photographyData.includes('mobileObjectPosition: "70% 50%"') &&
    hero.includes("photographs.eastRiver") &&
    hero.includes('"--jb-photo-position": image.objectPosition') &&
    hero.includes(
      '"--jb-photo-mobile-position": image.mobileObjectPosition'
    ) &&
    globals.includes(
      "object-position: var(--jb-photo-position, 50% 46%)"
    ) &&
    globals.includes("--jb-photo-mobile-position");

  const occurrenceIsDestinationBoundAndReversible =
    occurrence?.asset === suite.canary_asset_id &&
    occurrence?.derivative === suite.canary_derivative_id &&
    occurrence?.portfolio_edition === suite.portfolio_edition_id &&
    occurrence?.route === "/" &&
    occurrence?.component === "Hero" &&
    occurrence?.crop?.desktop === "50% 50%" &&
    occurrence?.crop?.mobile === "70% 50%" &&
    occurrence?.approval?.public_git ===
      "jamie-authorized-branch-review" &&
    occurrence?.approval?.staging === "approved" &&
    occurrence?.approval?.production === "open" &&
    occurrence?.approval?.indexing === "open" &&
    typeof occurrence?.rollback?.action === "string" &&
    occurrence.rollback.action.length > 30;

  const recollectionRemainsDatedAndNonProjecting =
    recollection?.source_kind === "first-person-recollection" &&
    /^\d{4}-\d{2}-\d{2}$/.test(recollection?.recorded_at ?? "") &&
    recollection?.prompted_by === suite.canary_occurrence_id &&
    recollection?.projection?.status === "hold" &&
    recollection?.projection?.surfaces?.length === 0 &&
    !/IKEA futon|children'?s bicycle forks|recurring bicycle-canoe/i.test(
      `${hero}\n${home}`
    );

  const oralHistoryInquiryIsBoundedAndNonProjecting =
    oralHistoryInquiry?.kind === "research-inquiry" &&
    oralHistoryInquiry?.status === "governed-open" &&
    oralHistoryInquiry?.private_source_binding?.opaque_id ===
      "photo-inquiry-hardhat-worksite-001" &&
    oralHistoryInquiry?.private_source_binding?.status ===
      "oral-history-returned-private-reinspection-required" &&
    oralHistoryInquiry?.publication_status === "hold" &&
    oralHistoryInquiry?.projection?.status === "hold" &&
    oralHistoryInquiry?.projection?.surfaces?.length === 0 &&
    oralHistoryInquiry?.visible_observations?.length === 3 &&
    oralHistoryInquiry?.oral_history_questions?.length >= 8 &&
    oralHistoryInquiry?.research_follow_up?.length >= 4 &&
    oralHistoryInquiry?.anti_claims?.includes(
      "The photograph establishes the project, place, or date."
    ) &&
    oralHistoryInquiry?.anti_claims?.includes(
      "Jamie's recollection alone confirms an institutional or collective outcome."
    ) &&
    oralHistoryInquiry?.anti_claims?.includes(
      "Selection for oral history approves the photograph for the portfolio."
    ) &&
    !privatePattern.test(JSON.stringify(oralHistoryInquiry)) &&
    !privatePattern.test(
      source(
        "docs/knowledge-bank/research-inquiries/hardhat-worksite-oral-history.md"
      ) ?? ""
    ) &&
    !/hardhat-worksite|photo-inquiry-hardhat-worksite-001/i.test(
      `${photographyData}\n${hero}\n${home}`
    );

  const sourceReturnRecordsAreBounded =
    dclaAsset?.rights_state === "unknown" &&
    dclaAsset?.consent_state === "review-needed" &&
    dclaAsset?.public_display_status === "hold" &&
    dclaAsset?.creator?.value === "open" &&
    /not a photographer credit, quotation, endorsement, or consent grant/i.test(
      dclaAsset?.identity_assertions?.standing_participant
        ?.publication_boundary ?? ""
    ) &&
    dclaAsset?.frame_relationship?.status === "same-sequence-cluster" &&
    /different frame/i.test(dclaAsset?.frame_relationship?.boundary ?? "") &&
    /must not be merged across frames/i.test(
      dclaAsset?.frame_relationship?.boundary ?? ""
    ) &&
    dclaInquiry?.publication_status === "hold" &&
    dclaInquiry?.projection?.status === "hold" &&
    dclaInquiry?.projection?.surfaces?.length === 0 &&
    dclaInquiry?.anti_claims?.includes(
      "Recording a public meeting grants unrestricted publication rights to every voice."
    ) &&
    [hardhatRecollection, collaboratorRecollection, councilRecollection].every(
      (item) =>
        item?.source_kind === "first-person-recollection" &&
        item?.visibility === "summary-only" &&
        item?.projection?.status === "hold" &&
        item?.projection?.surfaces?.length === 0 &&
        typeof item?.protected_boundary === "string" &&
        item.protected_boundary.length > 60
    ) &&
    [hardhatAsset, collaboratorAsset, councilAsset].every(
      (item) =>
        item?.rights_state === "unknown" &&
        item?.consent_state === "review-needed" &&
        item?.public_display_status === "hold" &&
        item?.private_source_binding?.status ===
          "private-reinspection-required"
    ) &&
    hardhatAsset?.creator_statement?.confirmation_state === "open" &&
    collaboratorAsset?.creator_statement?.confirmation_state === "open" &&
    councilAsset?.creator?.value === "open" &&
    hardhatAsset?.anti_claims?.includes(
      "Archive custody establishes creator credit or publication rights."
    ) &&
    collaboratorAsset?.anti_claims?.includes(
      "Archive custody establishes copyright or creator credit."
    ) &&
    councilAsset?.anti_claims?.includes(
      "Archive custody establishes photographer credit or publication rights."
    ) &&
    hardhatRecollection?.anti_claims?.includes(
      "The recollection independently confirms every construction responsibility or project outcome."
    ) &&
    collaboratorRecollection?.anti_claims?.includes(
      "The photograph proves sole authorship or sole operational responsibility."
    ) &&
    councilRecollection?.anti_claims?.includes(
      "The photograph proves the Council adopted or endorsed the proposal."
    ) &&
    councilInquiry?.publication_status === "hold" &&
    councilInquiry?.projection?.status === "hold" &&
    councilInquiry?.projection?.surfaces?.length === 0 &&
    councilInquiry?.anti_claims?.includes(
      "Presence at 250 Broadway establishes Council employment, endorsement, or adoption."
    );

  const formationAndHostBoundariesArePreserved =
    /Department of Cultural Affairs hosted the official meeting/i.test(
      dclaEvent?.host_boundary ?? ""
    ) &&
    /coalition and Call Script infrastructure mobilized/i.test(
      dclaEvent?.host_boundary ?? ""
    ) &&
    /one real-world meeting/i.test(
      dclaEvent?.platform_record_boundary ?? ""
    ) &&
    /not a sole-founder or single-instant creation event/i.test(
      dclaEvent?.formation_boundary ?? ""
    ) &&
    dclaEvent?.anti_claims?.includes(
      "NYC Artist Coalition solely organized the official DCLA meeting."
    ) &&
    dclaEvent?.anti_claims?.includes(
      "Jamie alone founded NYC Artist Coalition at this meeting."
    ) &&
    dclaRun?.method_boundary ===
      "The February 6 selection was a participatory vote, not ranked-choice voting." &&
    dclaRun?.anti_claims?.includes(
      "A filename makes a coalition follow-up message DCLA-authored."
    ) &&
    dclaRun?.source_encounter?.publication_authority ===
      "separate-human-review" &&
    dclaRun?.source_encounter?.publication_decision ===
      "public-safe-synthesis-only";

  const pendingOccurrences = [
    dclaOccurrence,
    collaboratorHomeOccurrence,
    collaboratorWorkOccurrence
  ];
  const newOccurrencesPreserveOpenHumanGates =
    pendingOccurrences.every(
      (item) =>
        item?.projection_status === "pending" &&
        item?.approval?.public_git ===
          "jamie-authorized-branch-review" &&
        item?.approval?.production === "open" &&
        item?.approval?.indexing === "open" &&
        /not yet confirmed/i.test(item?.credit?.text ?? "") &&
        typeof item?.rollback?.action === "string" &&
        item.rollback.action.length > 30
    ) &&
    edition?.occurrences?.includes(dclaOccurrence?.id) &&
    edition?.occurrences?.includes(collaboratorHomeOccurrence?.id) &&
    edition?.occurrences?.includes(collaboratorWorkOccurrence?.id);

  const displayedPhotoGovernance = [
    {
      assetId: suite.canary_asset_id,
      derivativeId: suite.canary_derivative_id,
      occurrenceIds: [suite.canary_occurrence_id]
    },
    {
      assetId: "asset.photo.raft-in-fog.waterways",
      derivativeId: "derivative.photo.raft-in-fog.layout-d.v1",
      occurrenceIds: ["projection.photo.layout-d.home.raft-in-fog"]
    },
    {
      assetId: "asset.photo.cabaret-law-hearing.2017",
      derivativeId: "derivative.photo.cabaret-law-hearing.layout-d.v1",
      occurrenceIds: [
        "projection.photo.layout-d.home.cabaret-law-hearing"
      ]
    },
    {
      assetId: "asset.photo.fair-rent-rally.2019",
      derivativeId: "derivative.photo.fair-rent-rally.layout-d.v1",
      occurrenceIds: [
        "projection.photo.layout-d.work-index.fair-rent-rally",
        "projection.photo.layout-d.work.fair-rent-rally"
      ]
    },
    {
      assetId: "asset.photo.kc-town-hall.collaborator-worksite.2018",
      derivativeId:
        "derivative.photo.kc-town-hall.collaborator-worksite.layout-d.v1",
      occurrenceIds: [
        "projection.photo.layout-d.home.kc-town-hall-collaborator",
        "projection.photo.layout-d.work.kc-town-hall-collaborator"
      ]
    },
    {
      assetId: "asset.photo.sunday-dinner.preparation",
      derivativeId:
        "derivative.photo.sunday-dinner-preparation.layout-d.v1",
      occurrenceIds: [
        "projection.photo.layout-d.home.sunday-dinner-preparation",
        "projection.photo.layout-d.about.sunday-dinner-preparation",
        "projection.photo.layout-d.work-index.sunday-dinner-preparation",
        "projection.photo.layout-d.work.sunday-dinner-preparation"
      ]
    },
    {
      assetId: "asset.photo.nycac.dcla-listening-room.2017-01-27",
      derivativeId:
        "derivative.photo.nycac.dcla-listening-room.layout-d.v1",
      occurrenceIds: [
        "projection.photo.layout-d.home.dcla-listening-room"
      ]
    },
    {
      assetId: "asset.photo.nightlife-town-hall.2017",
      derivativeId: "derivative.photo.nightlife-town-hall.layout-d.v1",
      occurrenceIds: [
        "projection.photo.layout-d.work-index.nightlife-town-hall"
      ]
    }
  ];
  const allDisplayedPhotographsAreGoverned =
    displayedPhotoGovernance.every(
      ({ assetId, derivativeId, occurrenceIds }) => {
        const governedAsset = recordMap.get(assetId);
        const governedDerivative = governedAsset?.public_derivatives?.find(
          (item) => item.id === derivativeId
        );
        return (
          governedAsset?.kind === "asset" &&
          governedAsset?.media_type === "photograph" &&
          governedAsset?.public_display_status === "hold" &&
          ["unknown", "permission-needed"].includes(
            governedAsset?.rights_state
          ) &&
          governedAsset?.consent_state === "review-needed" &&
          typeof governedAsset?.private_source_binding?.status === "string" &&
          governedAsset.private_source_binding.status.length > 10 &&
          Boolean(governedDerivative?.path) &&
          photographyData.includes(`wikiId: "${assetId}"`) &&
          photographyData.includes(`"${derivativeId}"`) &&
          occurrenceIds.every((occurrenceId) => {
            const governedOccurrence = recordMap.get(occurrenceId);
            return (
              photographyData.includes(`"${occurrenceId}"`) &&
              governedOccurrence?.projection_type === "photo-occurrence" &&
              governedOccurrence?.projection_status === "pending" &&
              governedOccurrence?.portfolio_edition ===
                suite.portfolio_edition_id &&
              governedOccurrence?.asset === assetId &&
              governedOccurrence?.derivative === derivativeId &&
              /^\/(?:|[a-z0-9/-]+)$/.test(governedOccurrence?.route ?? "") &&
              governedOccurrence?.approval?.public_git ===
                "jamie-authorized-branch-review" &&
              governedOccurrence?.approval?.production === "open" &&
              governedOccurrence?.approval?.indexing === "open" &&
              typeof governedOccurrence?.rollback?.action === "string" &&
              governedOccurrence.rollback.action.length > 30 &&
              edition?.occurrences?.includes(occurrenceId)
            );
          })
        );
      }
    ) &&
    displayedPhotoGovernance.flatMap((item) => item.occurrenceIds).length === 13;

  const proposalDerivative = proposalAsset?.public_derivatives?.[0];
  const proposalBuffer = proposalDerivative?.path
    ? readAsset(repoRoot, proposalDerivative.path, assetOverrides)
    : null;
  const proposalDimensions = proposalBuffer
    ? imageDimensions(proposalBuffer)
    : null;
  const proposalDerivativeIsPublicSafe =
    proposalAsset?.rights_state === "cleared" &&
    proposalAsset?.consent_state === "not-applicable" &&
    proposalAsset?.public_display_status === "cleared" &&
    proposalDerivative?.id ===
      "derivative.kc-town-hall.proposal-rendering.public-safe.v1" &&
    Boolean(proposalBuffer) &&
    proposalDimensions?.width === 1400 &&
    proposalDimensions?.height === 840 &&
    sha256(proposalBuffer) === proposalDerivative?.checksum &&
    proposalDerivative?.metadata_stripped === true &&
    !hasEmbeddedMetadata(proposalBuffer) &&
    /Contact, financial, banking, personal, family, and support-letter pages are excluded/i.test(
      proposalAsset?.source_boundary ?? ""
    ) &&
    proposalAsset?.anti_claims?.includes(
      "The rendering proves the proposed program was completed."
    ) &&
    proposalAsset?.anti_claims?.includes(
      "Cropping the proposal clears its excluded private pages for publication."
    );

  const selectedResumeOption = resumeDecision?.options_considered?.filter(
    (option) => option.disposition === "chosen"
  );
  const protectedAbsenceIsGoverned =
    protectedAbsence?.projection_type === "protected-absence" &&
    protectedAbsence?.projection_status === "active" &&
    protectedAbsence?.route === "/resume" &&
    protectedAbsence?.asset === undefined &&
    protectedAbsence?.derivative === undefined &&
    selectedResumeOption?.length === 1 &&
    /photograph-free/i.test(selectedResumeOption[0]?.option ?? "") &&
    !/from "next\/image"|<Image/.test(resume);

  const curatorialProcessPreservesArtisticAuthority =
    evaluation?.evaluation_type === "curatorial-proposal" &&
    evaluation?.panel?.simulation_notice === true &&
    /not the named people'?s actual feedback/i.test(
      evaluation?.panel?.notice ?? ""
    ) &&
    Boolean(evaluation?.blind_pass) &&
    Boolean(evaluation?.contextual_pass) &&
    Boolean(evaluation?.lead_proposal) &&
    Boolean(evaluation?.alternative) &&
    Boolean(evaluation?.dissent) &&
    Boolean(evaluation?.no_photo_counterfactual) &&
    evaluation?.source_return_request?.state === "open" &&
    evaluation?.anti_claims?.includes(
      "An aggregate score, vote, or RCV selected or published the image."
    );

  const sourceParentCommit = evaluation?.source_parent_commit;
  const portfolioEditionIsComplete =
    edition?.projection_type === "portfolio-edition" &&
    edition?.occurrences?.includes(suite.canary_occurrence_id) &&
    edition?.occurrences?.includes(suite.protected_absence_id) &&
    edition?.source_parent_commit === sourceParentCommit &&
    /^[0-9a-f]{40}$/.test(sourceParentCommit ?? "") &&
    edition?.candidate_identity ===
      "governed-professor-and-composite-fingerprints" &&
    evaluation?.candidate_identity ===
      "governed-professor-and-composite-fingerprints" &&
    Array.isArray(edition?.human_gates) &&
    edition.human_gates.length >= 4;

  const feedbackCorrectionIsAppendOnlyAndFailClosed =
    clearanceCorrection?.kind === "correction" &&
    clearanceCorrection?.previous_text?.includes("rights_state: cleared") &&
    clearanceCorrection?.replacement_text?.includes(
      "rights_state: permission-needed"
    ) &&
    clearanceCorrection?.replacement_text?.includes(
      "consent_state: review-needed"
    ) &&
    clearanceCorrection?.replacement_text?.includes(
      "public_display_status: hold"
    ) &&
    clearanceCorrection?.human_review === "governed-open" &&
    clearanceCorrection?.production_effect === "remains-on-hold" &&
    clearanceCorrection?.affected_surfaces?.includes(
      suite.canary_asset_id
    ) &&
    clearanceCorrection?.affected_surfaces?.includes(
      suite.canary_occurrence_id
    );

  const boundaryFiles = [
    ...suite.required_records,
    ...suite.required_guides,
    "apps/www/src/app/globals.css",
    "apps/www/src/data/photography.ts",
    "apps/www/src/components/Hero.tsx",
    "rfcs/0003-living-photographic-knowledge-loop.md"
  ];
  const privateMaterialIsAbsent =
    boundaryFiles.every((relativePath) => {
      const text = source(relativePath);
      return text !== null && !privatePattern.test(text);
    }) &&
    asset?.private_source_binding?.status ===
      "pending-independent-verification" &&
    asset?.private_source_binding?.opaque_id === null;

  const packageManifest = JSON.parse(source("package.json") ?? "{}");
  const knowledgeWikiNameAndAliasesAreCanonical =
    source("README.md")?.includes("## Knowledge Wiki") &&
    source("AGENTS.md")?.includes("## Knowledge Wiki") &&
    packageManifest.scripts?.["knowledge-wiki"] ===
      "npm run wiki:check" &&
    packageManifest.scripts?.["check:knowledge-wiki"] ===
      "npm run wiki:check" &&
    typeof packageManifest.scripts?.["knowledge-bank"] === "string" &&
    existsSync(path.join(repoRoot, "docs/knowledge-bank")) &&
    !existsSync(path.join(repoRoot, "docs/knowledge-wiki"));
  const rfcTerminologyIsCanonical =
    source("rfcs/README.md")?.includes("# Requests for Comments") &&
    source("rfcs/0003-living-photographic-knowledge-loop.md")?.includes(
      "stage: implementing"
    ) &&
    packageManifest.scripts?.["check:rfcs"] ===
      "node scripts/check-rfcs.mjs" &&
    packageManifest.scripts?.["check:rfps"] === "npm run check:rfcs" &&
    !existsSync(path.join(repoRoot, "rfps")) &&
    !existsSync(path.join(repoRoot, "scripts/check-rfps.mjs"));

  const humanGatesRemainOpen =
    Object.values(suite.manual_gates ?? {}).every((state) => state === "open") &&
    suite.thresholds?.manual_gates_must_remain_explicit === true &&
    suite.thresholds?.implementing_does_not_imply_operational === true &&
    asset?.private_source_binding?.status ===
      "pending-independent-verification" &&
    permission?.permission?.status === "reported-granted" &&
    asset?.rights_state === "permission-needed" &&
    asset?.consent_state === "review-needed" &&
    asset?.public_display_status === "hold" &&
    occurrence?.approval?.production === "open" &&
    occurrence?.approval?.indexing === "open";

  const checksWithoutReports = {
    records_are_schema_valid_and_complete:
      recordsAreSchemaValidAndComplete,
    derivative_is_exact_and_metadata_minimized:
      derivativeIsExactAndMetadataMinimized,
    statement_provenance_and_creator_correction_are_valid:
      statementProvenanceAndCreatorCorrectionAreValid,
    permission_capsule_is_bounded: permissionCapsuleIsBounded,
    caption_and_credit_assertions_resolve:
      captionAndCreditAssertionsResolve,
    application_manifest_resolves_to_wiki:
      applicationManifestResolvesToWiki,
    occurrence_is_destination_bound_and_reversible:
      occurrenceIsDestinationBoundAndReversible,
    recollection_remains_dated_and_non_projecting:
      recollectionRemainsDatedAndNonProjecting,
    oral_history_inquiry_is_bounded_and_non_projecting:
      oralHistoryInquiryIsBoundedAndNonProjecting,
    source_return_records_are_bounded:
      sourceReturnRecordsAreBounded,
    formation_and_host_boundaries_are_preserved:
      formationAndHostBoundariesArePreserved,
    new_occurrences_preserve_open_human_gates:
      newOccurrencesPreserveOpenHumanGates,
    all_displayed_photographs_are_governed:
      allDisplayedPhotographsAreGoverned,
    proposal_derivative_is_public_safe:
      proposalDerivativeIsPublicSafe,
    protected_absence_is_governed: protectedAbsenceIsGoverned,
    curatorial_process_preserves_artistic_authority:
      curatorialProcessPreservesArtisticAuthority,
    portfolio_edition_is_complete: portfolioEditionIsComplete,
    feedback_correction_is_append_only_and_fail_closed:
      feedbackCorrectionIsAppendOnlyAndFailClosed,
    private_material_is_absent: privateMaterialIsAbsent,
    knowledge_wiki_name_and_aliases_are_canonical:
      knowledgeWikiNameAndAliasesAreCanonical,
    rfc_terminology_is_canonical: rfcTerminologyIsCanonical,
    human_gates_remain_open: humanGatesRemainOpen
  };

  let generatedReportsAreCurrent = true;
  if (!options.skipGenerated) {
    const expected = renderPhotoReports({
      suite,
      records,
      checks: checksWithoutReports
    });
    generatedReportsAreCurrent = reportPathsFromSuite(suite).every(
      (relativePath) => source(relativePath) === expected[relativePath]
    );
  }

  const checks = {
    ...checksWithoutReports,
    generated_reports_are_current: generatedReportsAreCurrent
  };
  const orderedChecks = Object.fromEntries(
    suite.criteria.map((criterion) => [criterion, checks[criterion] === true])
  );

  return {
    passed:
      suite.version === 1 &&
      suite.suite_id === "living-photographic-knowledge-loop" &&
      suite.thresholds?.all_deterministic_criteria_must_pass === true &&
      Object.values(orderedChecks).every(Boolean),
    status: Object.values(orderedChecks).every(Boolean)
      ? "IMPLEMENTING-PASS"
      : "IMPLEMENTING-FAIL",
    checks: orderedChecks,
    failures: Object.entries(orderedChecks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    manualGates: suite.manual_gates,
    records,
    counts: {
      records: records.filter((record) => record.data).length,
      statements: statements.length,
      occurrences: edition?.occurrences?.length ?? 0
    }
  };
}

export function renderPhotoReports({ suite, records, checks }) {
  const reportChecks = Object.fromEntries(
    Object.entries(checks).filter(
      ([id]) => id !== "generated_reports_are_current"
    )
  );
  const recordData = records.filter((record) => record.data).map((record) => record.data);
  const asset = recordData.find((record) => record.id === suite.canary_asset_id);
  const occurrence = recordData.find(
    (record) => record.id === suite.canary_occurrence_id
  );
  const permission = recordData.find(
    (record) => record.id ===
      "source.permission.elana-gordon.east-river.2026-07"
  );
  const edition = recordData.find(
    (record) => record.id === suite.portfolio_edition_id
  );
  const dclaAsset = recordData.find(
    (record) =>
      record.id === "asset.photo.nycac.dcla-listening-room.2017-01-27"
  );
  const dclaOccurrence = recordData.find(
    (record) =>
      record.id === "projection.photo.layout-d.home.dcla-listening-room"
  );
  const hardhatAsset = recordData.find(
    (record) =>
      record.id === "asset.photo.kc-town-hall.hardhat-worksite.2018"
  );
  const collaboratorAsset = recordData.find(
    (record) =>
      record.id === "asset.photo.kc-town-hall.collaborator-worksite.2018"
  );
  const collaboratorHomeOccurrence = recordData.find(
    (record) =>
      record.id ===
      "projection.photo.layout-d.home.kc-town-hall-collaborator"
  );
  const collaboratorWorkOccurrence = recordData.find(
    (record) =>
      record.id ===
      "projection.photo.layout-d.work.kc-town-hall-collaborator"
  );
  const councilAsset = recordData.find(
    (record) =>
      record.id === "asset.photo.nyc-council.commercial-rent-fieldwork.2026"
  );
  const proposalAsset = recordData.find(
    (record) => record.id === "asset.kc-town-hall.proposal-rendering.2019"
  );

  const photographyIndex = `# Photography Index

Generated from governed RFC 0003 records. Do not edit by hand.

| Asset | Creator | Derivative | Current occurrence | Public display |
| --- | --- | --- | --- | --- |
| [East River beneath the Manhattan Bridge, 2022](../assets/photographs/east-river-manhattan-bridge-2022.md) | Elana Gordon | \`${asset?.public_derivatives?.[0]?.id ?? "missing"}\` | [Homepage hero](../projections/photography/layout-d-home-east-river.md) | ${asset?.public_display_status ?? "unknown"} |
| [DCLA listening room, 2017](../assets/photographs/nycac-dcla-listening-room-2017.md) | Open | \`${dclaAsset?.public_derivatives?.[0]?.id ?? "missing"}\` | [Homepage sequence](../projections/photography/layout-d-home-dcla-listening-room.md) | ${dclaAsset?.public_display_status ?? "unknown"} |
| [KC Town Hall hard-hat worksite](../assets/photographs/kc-town-hall-hardhat-worksite-2018.md) | Recollection; confirmation open | None | Research only | ${hardhatAsset?.public_display_status ?? "unknown"} |
| [KC Town Hall collaborator worksite](../assets/photographs/kc-town-hall-collaborator-worksite-2018.md) | Recollection; confirmation open | \`${collaboratorAsset?.public_derivatives?.[0]?.id ?? "missing"}\` | [Homepage](../projections/photography/layout-d-home-kc-town-hall-collaborator.md); [case study](../projections/photography/layout-d-work-kc-town-hall-collaborator.md) | ${collaboratorAsset?.public_display_status ?? "unknown"} |
| [Commercial-rent fieldwork at 250 Broadway](../assets/photographs/nyc-council-commercial-rent-fieldwork-2026.md) | Open | None | Research only | ${councilAsset?.public_display_status ?? "unknown"} |
| [KC Town Hall proposal rendering](../assets/kc-town-hall-proposal-rendering-2019.md) | Project proposal; individual visual authorship open | \`${proposalAsset?.public_derivatives?.[0]?.id ?? "missing"}\` | KC Town Hall case study | ${proposalAsset?.public_display_status ?? "unknown"} |

Private source identifiers, related-frame counts, and permission correspondence
are intentionally excluded.
`;

  const rightsReview = `# Photo Rights Review

Generated from public-safe permission and occurrence records. Do not edit by
hand. This report is not a rights grant.

| Occurrence or asset | Creator | Rights state | Consent state | Public Git | Production | Indexing |
| --- | --- | --- | --- | --- | --- | --- |
| \`${suite.canary_occurrence_id}\` | Elana Gordon | ${permission?.permission?.status ?? "unknown"}; ${asset?.rights_state ?? "unknown"} | ${asset?.consent_state ?? "unknown"} | ${occurrence?.approval?.public_git ?? "unknown"} | ${occurrence?.approval?.production ?? "unknown"} | ${occurrence?.approval?.indexing ?? "unknown"} |
| \`${dclaOccurrence?.id ?? "missing"}\` | Open | ${dclaAsset?.rights_state ?? "unknown"} | ${dclaAsset?.consent_state ?? "unknown"} | ${dclaOccurrence?.approval?.public_git ?? "unknown"} | ${dclaOccurrence?.approval?.production ?? "unknown"} | ${dclaOccurrence?.approval?.indexing ?? "unknown"} |
| \`${collaboratorHomeOccurrence?.id ?? "missing"}\` | Recollection; confirmation open | ${collaboratorAsset?.rights_state ?? "unknown"} | ${collaboratorAsset?.consent_state ?? "unknown"} | ${collaboratorHomeOccurrence?.approval?.public_git ?? "unknown"} | ${collaboratorHomeOccurrence?.approval?.production ?? "unknown"} | ${collaboratorHomeOccurrence?.approval?.indexing ?? "unknown"} |
| \`${collaboratorWorkOccurrence?.id ?? "missing"}\` | Recollection; confirmation open | ${collaboratorAsset?.rights_state ?? "unknown"} | ${collaboratorAsset?.consent_state ?? "unknown"} | ${collaboratorWorkOccurrence?.approval?.public_git ?? "unknown"} | ${collaboratorWorkOccurrence?.approval?.production ?? "unknown"} | ${collaboratorWorkOccurrence?.approval?.indexing ?? "unknown"} |
| \`${hardhatAsset?.id ?? "missing"}\` | Recollection; confirmation open | ${hardhatAsset?.rights_state ?? "unknown"} | ${hardhatAsset?.consent_state ?? "unknown"} | research only | not applicable | not applicable |
| \`${councilAsset?.id ?? "missing"}\` | Open | ${councilAsset?.rights_state ?? "unknown"} | ${councilAsset?.consent_state ?? "unknown"} | research only | not applicable | not applicable |

Private evidence reinspection, photographer confirmation, represented-person
review, production approval, and indexing approval remain open human gates.
`;

  const placements = `# Public Photo Placements

Generated from the current portfolio edition. Do not edit by hand.

| Occurrence | Status | Route | Component | Derivative | Caption | Credit |
| --- | --- | --- | --- | --- | --- | --- |
| \`${suite.canary_occurrence_id}\` | active on branch; production open | \`${occurrence?.route ?? "unknown"}\` | ${occurrence?.component ?? "unknown"} | \`${occurrence?.derivative ?? "unknown"}\` | ${occurrence?.caption?.text ?? "unknown"} | ${occurrence?.credit?.text ?? "unknown"} |
| \`${dclaOccurrence?.id ?? "missing"}\` | ${dclaOccurrence?.projection_status ?? "unknown"} | \`${dclaOccurrence?.route ?? "unknown"}\` | ${dclaOccurrence?.component ?? "unknown"} | \`${dclaOccurrence?.derivative ?? "unknown"}\` | ${dclaOccurrence?.caption?.text ?? "unknown"} | ${dclaOccurrence?.credit?.text ?? "unknown"} |
| \`${collaboratorHomeOccurrence?.id ?? "missing"}\` | ${collaboratorHomeOccurrence?.projection_status ?? "unknown"} | \`${collaboratorHomeOccurrence?.route ?? "unknown"}\` | ${collaboratorHomeOccurrence?.component ?? "unknown"} | \`${collaboratorHomeOccurrence?.derivative ?? "unknown"}\` | ${collaboratorHomeOccurrence?.caption?.text ?? "unknown"} | ${collaboratorHomeOccurrence?.credit?.text ?? "unknown"} |
| \`${collaboratorWorkOccurrence?.id ?? "missing"}\` | ${collaboratorWorkOccurrence?.projection_status ?? "unknown"} | \`${collaboratorWorkOccurrence?.route ?? "unknown"}\` | ${collaboratorWorkOccurrence?.component ?? "unknown"} | \`${collaboratorWorkOccurrence?.derivative ?? "unknown"}\` | ${collaboratorWorkOccurrence?.caption?.text ?? "unknown"} | ${collaboratorWorkOccurrence?.credit?.text ?? "unknown"} |
| \`${suite.protected_absence_id}\` | protected absence | \`/resume\` | ResumePage | Protected absence | No photograph in this edition. | Not applicable |
`;

  const impact = `# Photo Impact

Generated dependency view for the current photographic Wiki cohort. Do not
edit by hand.

Changing the creator, permission, derivative, caption assertions, or protected
state requires review of:

- [East River asset](../assets/photographs/east-river-manhattan-bridge-2022.md)
- [Clearance-scope correction](../corrections/photography/east-river-clearance-scope-2026-07.md)
- [Permission summary](../sources/permissions/elana-gordon-east-river-portfolio-2026.md)
- [Curatorial proposal](../evaluations/curatorial/layout-d-home-east-river-v1.md)
- [Selection decision](../decisions/photography/layout-d-home-east-river-v1.md)
- [Homepage occurrence](../projections/photography/layout-d-home-east-river.md)
- [Portfolio edition](../projections/photography/layout-d-portfolio-edition.md)
- [DCLA meeting and photographic source return](../research-runs/nycac-dcla-photograph-source-return-2026-07.md)
- [DCLA listening-room occurrence](../projections/photography/layout-d-home-dcla-listening-room.md)
- [KC Town Hall hard-hat oral-history source](../sources/recollections/kc-town-hall-hardhat-oral-history-2026-07.md)
- [KC Town Hall collaborator oral-history source](../sources/recollections/kc-town-hall-collaborator-photo-oral-history-2026-07.md)
- [KC Town Hall homepage occurrence](../projections/photography/layout-d-home-kc-town-hall-collaborator.md)
- [KC Town Hall case-study occurrence](../projections/photography/layout-d-work-kc-town-hall-collaborator.md)
- [250 Broadway source-return inquiry](../research-inquiries/nyc-council-commercial-rent-fieldwork-source-return.md)
- [KC Town Hall proposal rendering](../assets/kc-town-hall-proposal-rendering-2019.md)
- \`apps/www/src/data/photography.ts\`
- \`apps/www/src/components/Hero.tsx\`

The current edition contains ${edition?.occurrences?.length ?? 0} governed
occurrences, including one protected absence. Unresolved photo records remain
held even when their branch-review derivatives are present in public Git.
`;

  const reportJson = `${JSON.stringify(
    {
      suite_id: suite.suite_id,
      version: suite.version,
      status: Object.values(reportChecks).every(Boolean)
        ? "IMPLEMENTING-PASS"
        : "IMPLEMENTING-FAIL",
      records: recordData.map((record) => ({
        id: record.id,
        kind: record.kind,
        path: record.canonical_path
      })),
      checks: reportChecks,
      manual_gates: suite.manual_gates,
      public_boundary:
        "No private paths, source identifiers, raw correspondence, People associations, or exact coordinates are included."
    },
    null,
    2
  )}\n`;

  return {
    "docs/knowledge-bank/_generated/photography-index.md": photographyIndex,
    "docs/knowledge-bank/_generated/photo-rights-review.md": rightsReview,
    "docs/knowledge-bank/_generated/public-photo-placements.md": placements,
    "docs/knowledge-bank/_generated/photo-impact.md": impact,
    "reports/photo-knowledge.json": reportJson
  };
}
