import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const privatePayloadPattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|Library\/CloudStorage|@gmail\.com|\b(?:latitude|longitude|GPS)\s*[:=]|\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b)/i;

function hashFile(target) {
  return createHash("sha256").update(readFileSync(target)).digest("hex");
}

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/photographic-source-return.json"),
      "utf8"
    )
  );
}

export function evaluatePhotographicSourceReturn(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const result = options.result ?? compileWiki({ repoRoot });
  const manifest = options.manifest ?? loadManifest(repoRoot);
  const recordOverrides = options.recordOverrides ?? {};
  const sourceOverrides = options.sourceOverrides ?? {};

  const record = (id) =>
    Object.hasOwn(recordOverrides, id) ? recordOverrides[id] : result.byId.get(id);
  const source = (id) => {
    if (Object.hasOwn(sourceOverrides, id)) return sourceOverrides[id];
    const item = record(id);
    return item ? readFileSync(path.join(repoRoot, item.path), "utf8") : "";
  };
  const read = (relativePath) =>
    Object.hasOwn(sourceOverrides, relativePath)
      ? sourceOverrides[relativePath]
      : readFileSync(path.join(repoRoot, relativePath), "utf8");

  const run = record(manifest.researchRunId);
  const event = record(manifest.eventId);
  const heldPhotos = manifest.heldPhotoIds.map(record);
  const clusters = manifest.clusterIds.map(record);
  const sources = manifest.sourceIds.map(record);
  const map = record(manifest.mapAssetId);
  const runSource = source(manifest.researchRunId);
  const eventSource = source(manifest.eventId);
  const clusterSources = manifest.clusterIds.map(source);
  const photoSources = manifest.heldPhotoIds.map(source);
  const mapSource = source(manifest.mapAssetId);
  const oralPromptSource = source(
    "research-inquiry.photography.oral-history-stewardship-afterlife-001"
  );
  const allPublicSafeSource = [
    runSource,
    eventSource,
    mapSource,
    oralPromptSource,
    ...clusterSources,
    ...photoSources,
    ...manifest.sourceIds.map(source)
  ].join("\n");

  const derivativePath = path.join(repoRoot, manifest.mapDerivativePath);
  const derivative = map?.public_derivatives?.find(
    (item) => item.path === manifest.mapDerivativePath
  );

  const checks = {
    photographic_source_return_materialized:
      run?.kind === "research-run" &&
      event?.kind === "event" &&
      heldPhotos.every((item) => item?.kind === "asset") &&
      clusters.every((item) => item?.kind === "index") &&
      sources.every((item) => item?.kind === "source") &&
      map?.kind === "asset",

    photographic_source_return_reachable:
      result.reachable.has(manifest.researchRunId) &&
      result.reachable.has(manifest.eventId) &&
      manifest.clusterIds.every((id) => result.reachable.has(id)),

    photo_evidence_layers_distinct:
      photoSources.every(
        (text) =>
          /## Visible observation/i.test(text) &&
          /## First-person recollection/i.test(text) &&
          /## Corroboration/i.test(text) &&
          /does not (?:by itself )?(?:establish|prove)/i.test(text)
      ),

    photo_clusters_do_not_inflate_evidence:
      clusterSources.every((text) =>
        /Related frames improve retrieval; they do not multiply evidentiary weight/i.test(
          text
        )
      ),

    oral_history_received_without_auto_promotion:
      /Oral history: received; protected; public-safe capsule created/i.test(
        oralPromptSource
      ) &&
      /Claim state: none automatically created/i.test(oralPromptSource) &&
      /oral histories do not clear rights, consent, dignity, captions, claims,\s+or portfolio placement/i.test(
        source("source.kc-town-hall.photographic-oral-histories.2026-07")
      ) &&
      heldPhotos.every((item) => item?.projection?.status === "hold"),

    dcla_host_mobilization_and_participation_bounded:
      /Department of Cultural Affairs hosted/i.test(eventSource) &&
      /Coalition mobilization is not agency hosting/i.test(eventSource) &&
      /should not be described as the sole organizer/i.test(eventSource) &&
      /Platform response labels are not audited physical attendance/i.test(
        eventSource
      ) &&
      /top-three approval ballot, not ranked\s+choice voting/i.test(eventSource),

    photo_rights_and_consent_fail_closed:
      heldPhotos.every(
        (item) =>
          item?.public_display_status === "hold" &&
          item?.projection?.status === "hold" &&
          item?.projection?.surfaces?.length === 0 &&
          item?.rights_state !== "cleared"
      ) &&
      map?.rights_state === "cleared" &&
      map?.consent_state === "not-applicable" &&
      map?.public_display_status === "cleared",

    map_derivative_exact_and_bounded:
      existsSync(derivativePath) &&
      hashFile(derivativePath) === manifest.mapDerivativeChecksum &&
      derivative?.checksum === manifest.mapDerivativeChecksum &&
      derivative?.metadata_stripped === true &&
      derivative?.width === 977 &&
      derivative?.height === 1135 &&
      /obsolete URL, email address, phone number, and social handle/i.test(
        mapSource
      ) &&
      /does not clear the full bundle or the related photographs/i.test(mapSource),

    protected_photo_payload_not_published:
      !privatePayloadPattern.test(allPublicSafeSource) &&
      !/196 Clinton Avenue/i.test(allPublicSafeSource) &&
      !/apartment\s+d/i.test(allPublicSafeSource),

    apple_photos_capability_gap_explicit:
      /fresh live(?: Apple Photos)? authorization receipt did not\s+materialize/i.test(runSource) &&
      /No full-library scan, new album, catalog write, or source mutation\s+is claimed/i.test(
        runSource
      ) &&
      /No Apple Photos album, source asset, People association, favorite, metadata field, or existing collection was changed/i.test(
        runSource
      ),

    knowledge_wiki_naming_is_canonical: (() => {
      const readme = read("README.md");
      const agents = read("AGENTS.md");
      const packageSource = read("package.json");
      const citationReportSource = read("scripts/report-citations.mjs");
      return (
        /## Knowledge Wiki/i.test(readme) &&
        /## Knowledge Wiki/i.test(agents) &&
        /"knowledge-wiki": "node scripts\/check-knowledge-bank\.mjs"/i.test(
          packageSource
        ) &&
        /"knowledge-bank": "npm run knowledge-wiki"/i.test(packageSource) &&
        /machine-readable Knowledge Wiki citation registry/i.test(
          citationReportSource
        ) &&
        !/## Knowledge Bank/i.test(readme) &&
        !/## Knowledge Bank/i.test(agents)
      );
    })(),

    portfolio_projection_remains_selective:
      heldPhotos.every((item) => !item?.public_derivatives) &&
      map?.projection?.surfaces?.length === 1 &&
      map?.projection?.surfaces?.[0] === "/work/kc-town-hall" &&
      read("apps/www/src/data/work.ts").includes(
        'role: "Co-founder, Project Manager & CCED Developer/Presenter"'
      ) &&
      read("apps/www/src/data/work.ts").includes(
        'src: "/images/artifacts/kc-town-hall-walkshed.webp"'
      ),

    source_return_human_authority_preserved:
      run?.source_encounter?.publication_authority === "separate-human-review" &&
      run?.source_encounter?.publication_decision ===
        "public-safe-synthesis-only" &&
      run?.source_encounter?.librarian_requests?.length >= 4 &&
      derivative?.status === "staging-candidate" &&
      /portfolio remains subtractive/i.test(runSource)
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    result,
    manifest
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const evaluation = evaluatePhotographicSourceReturn();
  for (const [name, passed] of Object.entries(evaluation.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
  }
  if (!evaluation.passed) process.exit(1);
}
