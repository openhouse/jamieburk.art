import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
export const manifestPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/external-source-editions/jamie-burkart-public-record.manifest.json"
);
export const lockPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/external-source-editions/jamie-burkart-public-record.lock.json"
);
export const wikiPath = path.join(
  repoRoot,
  "docs/knowledge-bank/indexes/jamie-public-record-source-edition.md"
);
export const rfcPath = path.join(
  repoRoot,
  "rfcs/0004-jamie-burkart-knowledge-ecosystem-and-public-source-editions.md"
);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function loadCandidate() {
  const manifestSource = readFileSync(manifestPath, "utf8");
  return {
    manifestSource,
    manifest: JSON.parse(manifestSource),
    lock: JSON.parse(readFileSync(lockPath, "utf8")),
    wikiSource: readFileSync(wikiPath, "utf8"),
    rfcSource: readFileSync(rfcPath, "utf8")
  };
}

export function evaluate(candidate) {
  const { manifest, manifestSource, lock, wikiSource, rfcSource } = candidate;
  const failures = [];
  const records = manifest.records ?? [];
  const canonical = records.filter((record) => record.kind === "canonical-reference");
  const gaps = records.filter((record) => record.kind === "public-coverage-gap");
  const publicSources = records.filter((record) => record.kind === "public-source-record");

  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };

  check(lock.source_repository === "openhouse/jamie-burkart-public-record", "unexpected source repository");
  check(/^[0-9a-f]{40}$/.test(lock.source_commit ?? ""), "source commit is not pinned");
  check(sha256(manifestSource) === lock.source_manifest_sha256, "manifest digest does not match lock");
  check(manifest.candidate_fingerprint === lock.source_candidate_fingerprint, "candidate fingerprint does not match lock");
  check(manifest.record_count === records.length && records.length === lock.record_count, "record counts drifted");
  check(manifest.public_release_authorized === false && lock.public_release_authorized === false, "public release was inferred");
  check(manifest.private_source_dependency === false && lock.private_runtime_dependency === false, "public build gained a private dependency");
  check(lock.projection_state === "knowledge-wiki-reference-only", "portfolio projection was authorized");
  check(canonical.length === 7, "canonical public-statement population drifted");
  check(gaps.length === 4, "public-coverage gap population drifted");
  check(publicSources.length === 1, "public source record population drifted");
  check(new Set(records.map((record) => record.id)).size === records.length, "duplicate record ID");
  check(new Set(records.map((record) => record.canonical_path)).size === records.length, "duplicate canonical path");
  check(records.every((record) => /^[0-9a-f]{64}$/.test(record.sha256 ?? "")), "record digest missing or invalid");
  check(canonical.every((record) => /^[0-9a-f]{40}$/.test(record.canonical_commit ?? "")), "canonical statement reference is not pinned");
  check(canonical.every((record) => record.canonical_repository === "openhouse/commercial-rent-stabilization-public-support"), "canonical statement body was reassigned");
  check(canonical.every((record) => /\/blob\/[0-9a-f]{40}\//.test(record.canonical_record_url ?? "")), "canonical statement URL is not content-addressed");
  check(gaps.every((record) => record.publication_state === "human-review-required"), "coverage gap was promoted");
  check(/no-photo-pixels-or-identifiers; publication-review-required/.test(manifest.photo_policy ?? ""), "photo boundary weakened");
  check(!/\/(?:Users|Volumes|private|tmp)\//.test(manifestSource), "local path leaked into manifest");
  check(!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(manifestSource), "email address leaked into manifest");
  check(!/communication_count|message_count|raw_body|transcript_body|photo_uuid|coordinates/i.test(manifestSource), "protected field leaked into manifest");
  check(/stage: implementing/.test(rfcSource), "RFC is not implementing");
  check(/implementation: https:\/\/github\.com\/openhouse\/jamieburk\.art\/pull\/269/.test(rfcSource), "RFC implementation link drifted");
  check(wikiSource.includes(lock.source_commit), "Wiki page does not cite pinned source commit");
  check(wikiSource.includes(lock.source_manifest_sha256), "Wiki page does not cite manifest digest");
  check(/no runtime dependency|no live dependency|without a live dependency/i.test(`${wikiSource}\n${rfcSource}`), "offline public-build boundary missing");
  check(/not.*portfolio|portfolio.*not|no portfolio projection authorized/i.test(`${wikiSource}\n${rfcSource}`), "portfolio gate missing");

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      records: records.length,
      canonicalReferences: canonical.length,
      publicCoverageGaps: gaps.length,
      publicSourceRecords: publicSources.length,
      manifestSha256: sha256(manifestSource),
      sourceCommit: lock.source_commit
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluate(loadCandidate());
  if (!result.passed) {
    console.error(result.failures.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`Professional-record import validated: ${result.metrics.records} records, ${result.metrics.canonicalReferences} canonical references, ${result.metrics.publicCoverageGaps} governed gaps.`);
  }
}
