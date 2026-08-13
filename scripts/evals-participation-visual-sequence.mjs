#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");

const textPaths = {
  component: "apps/www/src/components/ParticipationSystem.tsx",
  media: "apps/www/src/data/participationMedia.ts",
  mdx: "apps/www/src/content/work/fair-rent-nyc.mdx",
  work: "apps/www/src/data/work.ts",
  approval: "docs/knowledge-bank/approval-register.md",
  permission: "docs/knowledge-bank/sources/permissions/photo-select-album-portfolio-2026-08-13.md",
  captures: "docs/knowledge-bank/sources/permissions/public-site-captures-2026-08-13.md",
  projection: "docs/knowledge-bank/projections/photography/fair-rent-participation-sequence-2026-08.md",
  decision: "docs/knowledge-bank/decisions/photography/fair-rent-participation-sequence-2026-08-13.md",
  letDanceAsset: "docs/knowledge-bank/assets/graphics/let-nyc-dance-public-surface-2026-08-13.md"
};

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function read(root, relativePath) {
  return readFileSync(path.join(root, relativePath));
}

export function loadCandidate(root = repoRoot) {
  const config = JSON.parse(
    read(root, "evals/pre-launch/participation-visual-sequence.json").toString("utf8")
  );
  return {
    config,
    hero: read(root, config.hero.path),
    assets: Object.fromEntries(
      config.assets.map((asset) => [asset.path, read(root, asset.path)])
    ),
    texts: Object.fromEntries(
      Object.entries(textPaths).map(([key, relativePath]) => [
        key,
        read(root, relativePath).toString("utf8")
      ])
    )
  };
}

function isEncoding(buffer, mediaType) {
  if (mediaType === "image/webp") {
    return (
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }
  if (mediaType === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8;
  }
  return false;
}

export function evaluateParticipationVisualSequence(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const { config, texts } = candidate;
  const orderedKeys = [
    "shoestringFacilitation",
    "letNycDanceSurface",
    "marketHotelTownHall"
  ];
  const sequencePositions = orderedKeys.map((key) => texts.component.indexOf(key));
  const publicCorpus = Object.values(texts).join("\n");
  const mdxOccurrences = texts.mdx.match(/<ParticipationSystem\s*\/>/g) ?? [];

  check(
    sha256(candidate.hero) === config.hero.requiredSha256,
    "existing homepage Hero component changed"
  );
  for (const asset of config.assets) {
    const bytes = candidate.assets[asset.path];
    check(Boolean(bytes), `asset missing: ${asset.path}`);
    if (!bytes) continue;
    check(sha256(bytes) === asset.sha256, `asset checksum drift: ${asset.path}`);
    check(isEncoding(bytes, asset.mediaType), `asset encoding mismatch: ${asset.path}`);
    if (asset.mediaType === "image/webp") {
      check(
        !bytes.includes(Buffer.from("EXIF")) && !bytes.includes(Buffer.from("XMP ")),
        `stripped WebP contains metadata chunk: ${asset.path}`
      );
    }
  }
  check(
    sequencePositions.every((position) => position >= 0) &&
      sequencePositions.every((position, index) => index === 0 || position > sequencePositions[index - 1]),
    "component must render facilitation, shared surface, and public assembly in order"
  );
  check(mdxOccurrences.length === 1, "Fair Rent MDX must contain exactly one ParticipationSystem");
  check(
    texts.media.includes("candidateCount: 10") &&
      texts.media.includes("cadenceSeconds: 1") &&
      texts.media.includes("selectedFrame: 5") &&
      texts.letDanceAsset.includes("candidate_count: 10") &&
      texts.letDanceAsset.includes("cadence_seconds: 1") &&
      texts.letDanceAsset.includes("selected_frame: 5"),
    "Let NYC Dance ten-frame one-second selection contract drifted"
  );
  check(
    config.captureSelection.unselectedCandidatesCommitted === 0 &&
      !Object.keys(candidate.assets).some((item) => /frame-(?!05)\d{2}/.test(item)),
    "unselected Let NYC Dance candidates must not be committed"
  );
  check(
    config.requiredRecords.every((id) => publicCorpus.includes(id)),
    "required permission, projection, or decision record is not connected"
  );
  check(
    (texts.approval.match(/^- \[x\]/gm) ?? []).length >= 5 &&
      texts.approval.includes("exact Apple Photos content set") &&
      texts.approval.includes("Frame 5"),
    "approval register does not record the exact album and selected capture decisions"
  );
  check(
    ["alt:", "caption:", "credit:", "permissionId:", "projectionId:"].every(
      (field) => texts.media.includes(field)
    ),
    "visible sequence media must bind alt text, caption, credit, permission, and projection"
  );
  check(
    texts.component.includes("Jamie helped produce that sequence") &&
      texts.component.includes("campaign surfaces") &&
      texts.component.includes("work and its outcomes remain collective") === false &&
      texts.media.includes("work and its outcomes remain collective") &&
      texts.media.includes("campaign credit remains collective"),
    "actor-action language or collective-credit boundary is missing"
  );
  check(
    !/(?:\/(?:Users|Volumes)\/|Apple Photos album title|Photos library UUID|local filesystem)/i.test(
      publicCorpus
    ),
    "public records expose a private locator or private source identity"
  );
  check(
    texts.projection.includes("exact_candidate_production_release: open") &&
      texts.projection.includes("indexing: open") &&
      texts.permission.includes("exact_candidate_release: separate-human-gate"),
    "asset approval must remain separate from exact candidate release and indexing"
  );
  check(
    texts.work.includes("Public landing and About experience live for tester recruitment") &&
      texts.work.includes("full platform restoration is not claimed") &&
      texts.work.includes("/artifacts/wowlist/public-relaunch.jpg"),
    "WOW List current proof must remain visible and bounded"
  );

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      assets: config.assets.length,
      sequenceSteps: sequencePositions.filter((item) => item >= 0).length,
      approvalChecks: (texts.approval.match(/^- \[x\]/gm) ?? []).length,
      selectedFrame: config.captureSelection.selectedFrame
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateParticipationVisualSequence(loadCandidate());
  if (!result.passed) {
    console.error(result.failures.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      `Participation visual sequence passed: ${result.metrics.assets} exact assets, ` +
        `${result.metrics.sequenceSteps} ordered steps, frame ${result.metrics.selectedFrame}, ` +
        `${result.metrics.approvalChecks} recorded visual approvals.`
    );
  }
}
