import { readFileSync } from "node:fs";
import path from "node:path";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const privatePayloadPattern =
  /(?:\/(?:Users|Volumes)\/|Mobile Documents|Library\/CloudStorage|(?:[A-Z0-9._%+-]+)@(?:gmail|icloud|me|ohai)\.\w+|(?:iMessage|WhatsApp|direct message)\s+(?:text|count)|\bGPS\s*[:=])/i;

function loadJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

export function evaluateProfessionalRecord(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const result = options.result ?? compileWiki({ repoRoot });
  const suite = options.suite ??
    loadJson(repoRoot, "evals/professional-record/evals.json");
  const manifest = options.manifest ?? loadJson(repoRoot, suite.manifestPath);
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

  const wikiIds = [
    suite.indexId,
    suite.researchRunId,
    ...suite.personIds,
    ...suite.eventIds,
    suite.photoAssetId
  ];
  const publicSafeCorpus = [
    ...wikiIds.map(source),
    source("source.professional-record.research.2026-08"),
    source("source.professional-record.photo-field.2026-08"),
    read("apps/www/src/data/knowledge-bank/professional-record-2026-08.ts"),
    JSON.stringify(manifest)
  ].join("\n");
  const claims = suite.claimIds.map((id) =>
    knowledgeBank.claims.find((claim) => claim.id === id)
  );
  const photo = record(suite.photoAssetId);
  const indexSource = source(suite.indexId);
  const peopleSource = suite.personIds.map(source).join("\n");
  const manifestRecords = new Map(
    (manifest.records ?? []).map((item) => [item.id, item])
  );

  const checks = {
    professional_record_materialized:
      record(suite.indexId)?.kind === "index" &&
      record(suite.researchRunId)?.kind === "research-run" &&
      suite.personIds.every((id) => record(id)?.kind === "person") &&
      suite.eventIds.every((id) => record(id)?.kind === "event") &&
      photo?.kind === "asset",

    professional_record_reachable:
      result.reachable.has(suite.indexId) &&
      result.reachable.has(suite.researchRunId) &&
      suite.eventIds.every((id) => result.reachable.has(id)),

    exact_private_candidates_bound_by_fingerprint:
      manifest.inputReceipts?.length === 3 &&
      Object.entries(suite.inputFingerprints).every(([label, sha256]) =>
        manifest.inputReceipts.some(
          (item) =>
            item.label === label &&
            item.sha256 === sha256 &&
            item.publicUse === "protected-input-fingerprint-only"
        )
      ),

    private_payload_withheld:
      !privatePayloadPattern.test(publicSafeCorpus) &&
      !/full text of all communication/i.test(publicSafeCorpus) &&
      /raw correspondence, messages, private transcripts/i.test(
        source("source.professional-record.research.2026-08")
      ),

    relationship_categories_remain_distinct:
      [
        "public record",
        "encounter",
        "relationship",
        "reception",
        "recommendation",
        "endorsement"
      ].every((term) => new RegExp(`\\*\\*${term}`, "i").test(indexSource)),

    endorsement_fails_closed:
      suite.personIds.every(
        (id) => manifestRecords.get(id)?.endorsementState === "not-established"
      ) &&
      /does not establish/i.test(peopleSource) &&
      /recommendation/i.test(peopleSource) &&
      /endorsement/i.test(peopleSource) &&
      !/currently endorses Jamie|recommends Jamie without reservation/i.test(
        peopleSource
      ),

    claim_projections_remain_held:
      claims.every(
        (claim) =>
          claim &&
          claim.projections.length > 0 &&
          claim.projections.every(
            (projection) =>
              projection.status === "hold" && projection.surfaces.length === 0
          )
      ) &&
      manifest.portfolioProjection?.status === "hold" &&
      manifest.portfolioProjection?.surfaces?.length === 0,

    photographs_fail_closed:
      photo?.rights_state === "permission-needed" &&
      photo?.consent_state === "review-needed" &&
      photo?.public_display_status === "hold" &&
      photo?.projection?.status === "hold" &&
      photo?.projection?.surfaces?.length === 0 &&
      manifestRecords.get(suite.photoAssetId)?.publicUse === "metadata-only",

    public_sources_are_official_and_bounded:
      /film\.ucsc\.edu\/directory\/wsack\//.test(publicSafeCorpus) &&
      /nyc\.gov\/mayors-office\/news\/2026\/02\//.test(publicSafeCorpus) &&
      /calendar\.mit\.edu\/event\/interrogative-design-symposium/.test(
        publicSafeCorpus
      ) &&
      /studio3\.me\/studio3_event\/symposiumexhibition-studio3/.test(
        publicSafeCorpus
      ) &&
      /dieangewandte\.at\/en\/news\/detail/.test(publicSafeCorpus),

    correction_and_rollback_are_explicit:
      Boolean(manifest.correction?.route) &&
      Boolean(manifest.correction?.rollback) &&
      /Corrections may change/i.test(indexSource),

    no_public_archive_route_added:
      !/apps\/www\/src\/app\/(?:proofs|knowledge-bank|public-claims|professional-record)/.test(
        publicSafeCorpus
      ),

    human_authority_preserved:
      record(suite.researchRunId)?.source_encounter?.publication_authority ===
        "separate-human-review" &&
      /A passing eval\s+does not supply any human approval/i.test(
        read("evals/professional-record/human-review.md")
      )
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    result,
    manifest
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const evaluation = evaluateProfessionalRecord();
  for (const [name, passed] of Object.entries(evaluation.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
  }
  if (!evaluation.passed) process.exit(1);
}
