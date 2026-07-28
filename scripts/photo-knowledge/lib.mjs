import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

import {
  compileWiki,
  defaultRepoRoot
} from "../knowledge-wiki/lib.mjs";

export const photoKnowledgeOutputPaths = [
  "reports/photo-knowledge-health.json",
  "reports/photo-knowledge-health.md",
  "reports/photo-knowledge-usage.json",
  "docs/knowledge-bank/_generated/photography-index.md",
  "docs/knowledge-bank/_generated/photo-rights-review.md",
  "docs/knowledge-bank/_generated/public-photo-placements.md",
  "docs/knowledge-bank/_generated/photography-backlinks.md",
  "docs/knowledge-bank/_generated/photo-source-return.md"
];

const photoRecordRootFragments = [
  "assets/photographs/",
  "decisions/photography/",
  "evaluations/curatorial/",
  "indexes/photography.md",
  "indexes/photo-sets/",
  "methods/artist-led-photographic-curation.md",
  "projections/photography/",
  "research-inquiries/photography/",
  "sources/photo-metadata/",
  "sources/permissions/",
  "sources/recollections/"
];

function read(repoRoot, relativePath, overrides = {}) {
  return overrides[relativePath] ??
    readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function walk(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, "en-US"))
    .flatMap((entry) => {
      const absolute = path.join(root, entry.name);
      return entry.isDirectory() ? walk(absolute) : [absolute];
    });
}

function getString(source, field) {
  return source.match(new RegExp(`${field}:\\s*"([^"]+)"`))?.[1] ?? null;
}

function getStringArray(source, field) {
  const body = source.match(new RegExp(`${field}:\\s*\\[([^\\]]*)\\]`))?.[1] ?? "";
  return [...body.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function manifestObject(source, key) {
  const body = source.match(new RegExp(`\\n  ${key}:\\s*\\{([\\s\\S]*?)\\n  \\},`))?.[1];
  if (!body) return null;
  return {
    id: getString(body, "id"),
    candidateId: getString(body, "candidateId"),
    src: getString(body, "src"),
    alt: getString(body, "alt"),
    caption: getString(body, "caption"),
    archiveLabel: getString(body, "archiveLabel"),
    objectPosition: getString(body, "objectPosition"),
    wikiId: getString(body, "wikiId"),
    derivativeId: getString(body, "derivativeId"),
    placementIds: getStringArray(body, "placementIds")
  };
}

function relevantPhotoFiles(repoRoot) {
  const wikiRoot = path.join(repoRoot, "docs/knowledge-bank");
  const wikiFiles = walk(wikiRoot)
    .filter((file) => file.endsWith(".md"))
    .filter((file) => {
      const relative = path.relative(wikiRoot, file).split(path.sep).join("/");
      return photoRecordRootFragments.some((fragment) => relative.includes(fragment));
    });
  const operationalFiles = walk(path.join(repoRoot, "docs/photography"))
    .filter((file) => file.endsWith(".md"));
  return [...wikiFiles, ...operationalFiles].sort();
}

function legacyRfcNaming(repoRoot, overrides = {}) {
  const oldUpper = ["RF", "P"].join("");
  const oldLower = ["rf", "p"].join("");
  const oldPattern = new RegExp(
    `\\b${oldUpper}s?\\b|\\b${oldLower}s?\\b|check:${oldLower}s`
  );
  const relativePaths = [
    "README.md",
    "AGENTS.md",
    "package.json",
    "scripts/check-rfcs.mjs",
    "scripts/knowledge-wiki/family-closure-eval.mjs",
    "scripts/knowledge-wiki/family-closure-eval.test.mjs",
    ...walk(path.join(repoRoot, "rfcs"))
      .filter((file) => file.endsWith(".md"))
      .map((file) => path.relative(repoRoot, file))
  ];
  return relativePaths.flatMap((relativePath) => {
    const source = read(repoRoot, relativePath, overrides);
    return oldPattern.test(source) ? [relativePath] : [];
  });
}

function photoSourceFingerprint(repoRoot, overrides = {}) {
  const files = [
    ".agents/evals/photo-knowledge-loop.json",
    "apps/www/src/data/photography.ts",
    "apps/www/src/components/Hero.tsx",
    "apps/www/src/components/PhotoFigure.tsx",
    "rfcs/0003-living-photographic-knowledge-loop.md",
    "scripts/photo-knowledge/lib.mjs",
    "scripts/photo-knowledge/cli.mjs",
    ...relevantPhotoFiles(repoRoot).map((file) => path.relative(repoRoot, file))
  ].sort();
  const hash = createHash("sha256");
  for (const relativePath of files) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(read(repoRoot, relativePath, overrides));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function criteriaResult(id, pass, detail) {
  return { id, pass, detail };
}

export function evaluatePhotoKnowledge(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const overrides = options.overrides ?? {};
  const suite = JSON.parse(read(repoRoot, ".agents/evals/photo-knowledge-loop.json", overrides));
  const photographySource = read(repoRoot, "apps/www/src/data/photography.ts", overrides);
  const canary = manifestObject(photographySource, suite.canary.manifestKey);
  const wikiResult = options.records
    ? { records: options.records, errors: options.wikiErrors ?? [] }
    : compileWiki({ repoRoot });
  const records = wikiResult.records;
  const byId = new Map(records.map((record) => [record.id, record]));
  const asset = byId.get(suite.canary.assetId);
  const occurrence = byId.get(suite.canary.occurrenceId);
  const edition = byId.get(suite.canary.editionId);
  const evaluation = byId.get("evaluation.curatorial.layout-a.home-council-chamber.v1");
  const permission = byId.get("source.permission-status.layout-a.council-chamber.2026-07");
  const recollection = byId.get("source.recollection.jamie-public-facing-civic-work.2026-07");
  const inquiry = byId.get("research-inquiry.photography.layout-a.council-chamber");
  const derivative = asset?.public_derivatives?.find(
    (item) => item.id === suite.canary.derivativeId
  );
  const statementIds = new Set(asset?.statements?.map((item) => item.id) ?? []);
  const recordIds = new Set(records.map((record) => record.id));
  const statementReferences = asset?.statements?.flatMap((item) => item.references ?? []) ?? [];
  const captionAssertions = occurrence?.caption?.assertions ?? [];
  const creditAssertions = occurrence?.credit?.assertions ?? [];
  const candidateIds = [
    ...photographySource.matchAll(/candidateId:\s*"([^"]+)"/g)
  ].map((match) => match[1]);
  const governedPhotoAssets = records.filter(
    (record) =>
      record.kind === "asset" &&
      record.media_type === "photograph" &&
      record.photo_knowledge_version === 1
  );
  const photoOccurrences = records.filter(
    (record) =>
      record.kind === "projection" &&
      record.projection_type === "photo-occurrence"
  );
  const legacyNaming = legacyRfcNaming(repoRoot, overrides);
  const photoFiles = relevantPhotoFiles(repoRoot);
  const privateLeakPattern =
    /\/(?:Users|Volumes)\/|Mobile Documents|Library\/CloudStorage|private_source_binding:\s*[\s\S]{0,240}opaque_id:|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY/i;
  const privateLeakFiles = photoFiles
    .filter((file) => privateLeakPattern.test(readFileSync(file, "utf8")))
    .map((file) => path.relative(repoRoot, file));
  const rfcSource = read(repoRoot, "rfcs/0003-living-photographic-knowledge-loop.md", overrides);
  const rfcData = matter(rfcSource).data;
  const packageManifest = JSON.parse(read(repoRoot, "package.json", overrides));
  const evaluationSource = read(
    repoRoot,
    "docs/knowledge-bank/evaluations/curatorial/layout-a-home-council-chamber-v1.md",
    overrides
  );
  const editionSource = read(
    repoRoot,
    "docs/knowledge-bank/projections/photography/layout-a-branch-review-edition-2026-07.md",
    overrides
  );
  const assetPath = derivative?.path ? path.join(repoRoot, derivative.path) : null;
  const assetBytes = assetPath && existsSync(assetPath) ? readFileSync(assetPath) : null;
  const actualChecksum = assetBytes ? sha256(assetBytes) : null;
  const sourceFingerprint = photoSourceFingerprint(repoRoot, overrides);

  const allApprovalStates = occurrence?.approval
    ? Object.values(occurrence.approval)
    : [];
  const rightsRemainOpen =
    occurrence?.approval?.photographer_rights === "open" &&
    occurrence?.approval?.represented_people === "open" &&
    occurrence?.approval?.visible_artwork === "open" &&
    occurrence?.approval?.caption_credit_crop === "open" &&
    occurrence?.approval?.staging === "open" &&
    occurrence?.approval?.production === "open" &&
    occurrence?.approval?.indexing === "open";
  const productionCannotBeActive =
    occurrence?.projection_status !== "active" ||
    (
      occurrence?.approval?.production === "approved" &&
      occurrence?.approval?.photographer_rights === "approved" &&
      ["approved", "not-applicable"].includes(
        occurrence?.approval?.represented_people
      )
    );

  const criteria = [
    criteriaResult(
      "PHOTO-KNOWLEDGE-001",
      suite.version === 1 &&
        suite.rfc === 3 &&
        suite.criteria.reduce((sum, item) => sum + item.weight, 0) === 100 &&
        rfcData.rfc === 3 &&
        rfcData.stage === "implementing" &&
        packageManifest.scripts?.["check:rfcs"] === "node scripts/check-rfcs.mjs" &&
        packageManifest.scripts?.check?.includes("npm run check:rfcs") &&
        legacyNaming.length === 0 &&
        wikiResult.errors.length === 0,
      legacyNaming.length
        ? `Legacy proposal acronym remains in: ${legacyNaming.join(", ")}`
        : `RFC 0003, RFC validation, and ${records.length} Wiki records compile without hard errors.`
    ),
    criteriaResult(
      "PHOTO-KNOWLEDGE-002",
      Boolean(
        canary &&
        asset &&
        occurrence &&
        edition &&
        canary.wikiId === suite.canary.assetId &&
        canary.derivativeId === suite.canary.derivativeId &&
        canary.placementIds.length === 1 &&
        canary.placementIds[0] === suite.canary.occurrenceId &&
        occurrence.asset === asset.id &&
        occurrence.derivative === derivative?.id &&
        occurrence.portfolio_edition === edition.id &&
        edition.occurrences.includes(occurrence.id)
      ),
      "The application manifest resolves through the asset and derivative to one exact occurrence and edition."
    ),
    criteriaResult(
      "PHOTO-KNOWLEDGE-003",
      Boolean(
        asset?.private_source_binding?.provider === "photo-fieldwork" &&
        ["pending-private-verification", "verified-private"].includes(
          asset?.private_source_binding?.status
        ) &&
        /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(
          asset?.private_source_binding?.public_id ?? ""
        ) &&
        privateLeakFiles.length === 0 &&
        permission?.permission?.status === "not-recorded" &&
        inquiry
      ),
      privateLeakFiles.length
        ? `Private material detected in: ${privateLeakFiles.join(", ")}`
        : "The public binding exposes only a public ID and fail-closed state; permission research remains open."
    ),
    criteriaResult(
      "PHOTO-KNOWLEDGE-004",
      Boolean(
        derivative &&
        assetBytes &&
        actualChecksum === derivative.checksum &&
        derivative.metadata_stripped === true &&
        derivative.status === "branch-review" &&
        canary?.src &&
        derivative.path.endsWith(canary.src) &&
        !assetBytes.includes(Buffer.from("Exif\0\0")) &&
        !assetBytes.includes(Buffer.from("GPSInfo"))
      ),
      actualChecksum === derivative?.checksum
        ? `Derivative ${derivative?.id} matches checksum ${actualChecksum}.`
        : `Derivative checksum mismatch: expected ${derivative?.checksum ?? "missing"}, received ${actualChecksum ?? "missing"}.`
    ),
    criteriaResult(
      "PHOTO-KNOWLEDGE-005",
      Boolean(
        asset?.visible_observations?.length >= 3 &&
        asset?.interpretation_boundary &&
        statementReferences.every((id) => recordIds.has(id)) &&
        recollection?.source_class === "first-person-recollection" &&
        recollection?.projection?.status === "hold" &&
        recollection?.anti_claims?.length >= 3
      ),
      "Visible observation, source references, held recollection, and interpretation boundaries remain separate."
    ),
    criteriaResult(
      "PHOTO-KNOWLEDGE-006",
      Boolean(
        evaluation?.evaluation_type === "curatorial-proposal" &&
        evaluation?.panel?.simulation_notice === true &&
        evaluation?.panel?.lenses?.length === 8 &&
        evaluation?.human_gates?.length >= 6 &&
        evaluationSource.includes("simulated advisory lenses") &&
        evaluationSource.includes("did not participate") &&
        evaluationSource.includes("No majority vote or aggregate score selects")
      ),
      "The eight-lens proposal preserves dissent and discloses simulation, non-participation, and non-voting authority."
    ),
    criteriaResult(
      "PHOTO-KNOWLEDGE-007",
      Boolean(
        captionAssertions.length >= 2 &&
        creditAssertions.length >= 2 &&
        [...captionAssertions, ...creditAssertions].every((id) =>
          statementIds.has(id)
        ) &&
        occurrence?.credit?.text === canary?.archiveLabel &&
        asset?.statements?.some(
          (statement) =>
            statement.property === "creator" &&
            statement.value === "unknown"
        )
      ),
      "Caption and custody credit resolve to statements while creator attribution remains explicitly unknown."
    ),
    criteriaResult(
      "PHOTO-KNOWLEDGE-008",
      Boolean(
        allApprovalStates.length === 9 &&
        occurrence?.approval?.public_git === "approved" &&
        rightsRemainOpen &&
        occurrence?.projection_status === "pending" &&
        asset?.rights_state === "permission-needed" &&
        asset?.public_display_status === "branch-review" &&
        productionCannotBeActive
      ),
      "Nine approval dimensions remain independent; public Git is approved while downstream rights and release gates stay open."
    ),
    criteriaResult(
      "PHOTO-KNOWLEDGE-009",
      options.skipGenerated === true ||
        photoKnowledgeOutputPaths.every((relativePath) => {
          const outputPath = path.join(repoRoot, relativePath);
          return (
            existsSync(outputPath) &&
            readFileSync(outputPath, "utf8").includes(sourceFingerprint)
          );
        }),
      options.skipGenerated === true
        ? "Generated-output freshness is deferred during report construction."
        : "All deterministic photo-knowledge reports match the current source fingerprint."
    ),
    criteriaResult(
      "PHOTO-KNOWLEDGE-010",
      candidateIds.length === suite.migration.manifestCount &&
        new Set(candidateIds).size === suite.migration.manifestCount &&
        governedPhotoAssets.length === suite.migration.governedAssetCount &&
        photoOccurrences.length === suite.migration.governedOccurrenceCount &&
        edition?.occurrences?.length === suite.migration.governedOccurrenceCount &&
        candidateIds.length - governedPhotoAssets.length ===
          suite.migration.remainingCount &&
        /two of thirteen/i.test(editionSource) &&
        /remaining eleven/i.test(editionSource),
      `The pilot reports ${governedPhotoAssets.length} governed assets, ${photoOccurrences.length} exact occurrences, and ${candidateIds.length - governedPhotoAssets.length} migration items across ${candidateIds.length} branch-review photographs.`
    )
  ];

  const humanGates = suite.human_gate.open_by_design.map((name) => ({
    name,
    state: "open",
    authority: name.includes("Jamie") ? "Jamie Burkart" : "authorized human reviewer"
  }));

  return {
    pass: criteria.every((criterion) => criterion.pass),
    passed: criteria.filter((criterion) => criterion.pass).length,
    total: criteria.length,
    sourceFingerprint,
    suite,
    criteria,
    humanGates,
    records,
    canary,
    asset,
    occurrence,
    edition,
    evaluation,
    permission,
    recollection,
    inquiry,
    governedPhotoAssets,
    photoOccurrences,
    photoInquiries: records.filter(
      (record) =>
        record.kind === "research-inquiry" &&
        record.id.startsWith("research-inquiry.photography.")
    ),
    migration: {
      manifestPhotos: candidateIds.length,
      governedAssets: governedPhotoAssets.length,
      governedOccurrences: photoOccurrences.length,
      remaining: candidateIds.length - governedPhotoAssets.length
    }
  };
}

function generatedHeader(title, result) {
  return `<!-- GENERATED FILE. DO NOT EDIT. -->\n# ${title}\n\n` +
    `**Source fingerprint:** \`${result.sourceFingerprint}\`\n\n`;
}

function healthMarkdown(result) {
  const lines = [
    generatedHeader("Photo-knowledge health", result),
    `**Result:** ${result.pass ? "PASS" : "FAIL"} (${result.passed}/${result.total})`,
    "",
    ...result.criteria.map(
      (criterion) =>
        `- ${criterion.pass ? "PASS" : "FAIL"} \`${criterion.id}\`: ${criterion.detail}`
    ),
    "",
    "## Human gates",
    "",
    ...result.humanGates.map(
      (gate) => `- OPEN: ${gate.name} (${gate.authority})`
    ),
    "",
    "A machine pass verifies the representation and enforcement of these open",
    "gates. It does not close them."
  ];
  return `${lines.join("\n")}\n`;
}

function photographyIndexMarkdown(result) {
  return generatedHeader("Photography index", result) +
    `- Manifest photographs: ${result.migration.manifestPhotos}\n` +
    `- Governed RFC 0003 assets: ${result.migration.governedAssets}\n` +
    `- Governed exact occurrences: ${result.migration.governedOccurrences}\n` +
    `- Remaining migration items: ${result.migration.remaining}\n\n` +
    `## Governed occurrences\n\n` +
    result.photoOccurrences
      .map(
        (occurrence) =>
          `- \`${occurrence.id}\`: route \`${occurrence.route}\`, component \`${occurrence.component}\`, state \`${occurrence.projection_status}\``
      )
      .join("\n") +
    `\n\n` +
    `- Edition: [${result.edition.title}](../projections/photography/layout-a-branch-review-edition-2026-07.md)\n\n` +
    `This is a partial migration, not full publication clearance.\n`;
}

function rightsMarkdown(result) {
  const sections = result.governedPhotoAssets.map((asset) => {
    const occurrences = result.photoOccurrences.filter(
      (occurrence) => occurrence.asset === asset.id
    );
    return (
      `## ${asset.title}\n\n` +
      `- Asset rights: ${asset.rights_state}\n` +
      `- Asset consent: ${asset.consent_state}\n` +
      `- Public display: ${asset.public_display_status}\n` +
      occurrences
        .flatMap((occurrence) =>
          Object.entries(occurrence.approval).map(
            ([name, state]) =>
              `- ${occurrence.id} / ${name.replaceAll("_", " ")}: ${state}`
          )
        )
        .join("\n")
    );
  });
  return (
    generatedHeader("Photo rights review", result) +
    sections.join("\n\n") +
    `\n\nProduction and indexing remain open. Branch review is not unrestricted reuse.\n`
  );
}

function placementsMarkdown(result) {
  return generatedHeader("Public photo placements", result) +
    `| Occurrence | Route | Component | Derivative | State |\n` +
    `|---|---|---|---|---|\n` +
    result.photoOccurrences
      .map(
        (occurrence) =>
          `| \`${occurrence.id}\` | \`${occurrence.route}\` | ` +
          `\`${occurrence.component}\` | \`${occurrence.derivative}\` | ` +
          `\`${occurrence.projection_status}\` |`
      )
      .join("\n") +
    `\n\nEleven Layout A photographs remain in the migration queue.\n`;
}

function backlinksMarkdown(result) {
  const chains = result.photoOccurrences
    .map(
      (occurrence) =>
        `\`${occurrence.asset}\`\n` +
        `-> \`${occurrence.id}\`\n` +
        `-> \`${result.edition.id}\`\n` +
        `-> route \`${occurrence.route}\` / component \`${occurrence.component}\``
    )
    .join("\n\n");
  return generatedHeader("Photography backlinks and impact", result) +
    chains +
    `\n\n` +
    `A creator, permission, caption assertion, derivative, or dignity change must revisit every node above.\n`;
}

function sourceReturnMarkdown(result) {
  const inquiries = result.photoInquiries
    .map(
      (inquiry) =>
        `## ${inquiry.title}\n\n` +
        inquiry.unknowns.map((unknown) => `- ${unknown}`).join("\n")
    )
    .join("\n\n");
  return (
    generatedHeader("Photo source-return queue", result) +
    inquiries +
    `\n\nDo not close these questions from visual inference or model confidence.\n`
  );
}

export function buildPhotoKnowledgeOutputs(result) {
  const serializable = {
    pass: result.pass,
    passed: result.passed,
    total: result.total,
    sourceFingerprint: result.sourceFingerprint,
    criteria: result.criteria,
    humanGates: result.humanGates,
    migration: result.migration
  };
  const usage = {
    sourceFingerprint: result.sourceFingerprint,
    assets: result.governedPhotoAssets.map((asset) => {
      const occurrences = result.photoOccurrences.filter(
        (occurrence) => occurrence.asset === asset.id
      );
      return {
        id: asset.id,
        derivatives: occurrences.map((occurrence) => occurrence.derivative),
        occurrences: occurrences.map((occurrence) => occurrence.id),
        editions: [...new Set(occurrences.map((occurrence) => occurrence.portfolio_edition))],
        routes: occurrences.map((occurrence) => occurrence.route)
      };
    }),
    migration: result.migration
  };
  return {
    "reports/photo-knowledge-health.json": `${JSON.stringify(serializable, null, 2)}\n`,
    "reports/photo-knowledge-health.md": healthMarkdown(result),
    "reports/photo-knowledge-usage.json": `${JSON.stringify(usage, null, 2)}\n`,
    "docs/knowledge-bank/_generated/photography-index.md": photographyIndexMarkdown(result),
    "docs/knowledge-bank/_generated/photo-rights-review.md": rightsMarkdown(result),
    "docs/knowledge-bank/_generated/public-photo-placements.md": placementsMarkdown(result),
    "docs/knowledge-bank/_generated/photography-backlinks.md": backlinksMarkdown(result),
    "docs/knowledge-bank/_generated/photo-source-return.md": sourceReturnMarkdown(result)
  };
}

export function writePhotoKnowledgeOutputs(repoRoot, outputs) {
  for (const [relativePath, content] of Object.entries(outputs)) {
    const absolute = path.join(repoRoot, relativePath);
    writeFileSync(absolute, content);
  }
}

export function checkPhotoKnowledgeOutputs(repoRoot, outputs) {
  return Object.entries(outputs).flatMap(([relativePath, expected]) => {
    const absolute = path.join(repoRoot, relativePath);
    if (!existsSync(absolute)) return [`missing ${relativePath}`];
    const actual = readFileSync(absolute, "utf8");
    return actual === expected ? [] : [`stale ${relativePath}`];
  });
}

export function photoKnowledgeRepoRoot() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
}
