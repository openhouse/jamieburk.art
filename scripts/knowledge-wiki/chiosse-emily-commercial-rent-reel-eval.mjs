import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const sourceId = "SRC-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026-08-05";
const claimId = "CLM-CHIOSSE-EMILY-COMMERCIAL-RENT-REEL-2026";
const relationId = "REL-CHIOSSE-EMILY-ADVOCATED-SBRSA-REEL-2026";
const archiveCommit = "ea5497dd910f3402c01e8b560b149d6674f951cc";
const mediaSha256 = "cdef31ffe73e50f70a0d09b32b7863810d39c55bcde4b06c949cafa7595bee01";
const sourceDocPath = "docs/knowledge-bank/sources/commercial-rent-public-support/chiosse-emily-small-business-rent-reel-2026-08-05.md";
const indexPath = "docs/knowledge-bank/indexes/commercial-rent-public-support.md";
const projectPath = "docs/knowledge-bank/projects/fair-rent-nyc.md";

function getById(items, id) {
  return items.find((item) => item.id === id);
}

export function loadCandidate(root = repoRoot) {
  return structuredClone({
    source: getById(knowledgeBank.sources, sourceId),
    claim: getById(knowledgeBank.claims, claimId),
    relation: getById(knowledgeBank.agencyRelations, relationId),
    sourceDoc: readFileSync(path.join(root, sourceDocPath), "utf8"),
    indexDoc: readFileSync(path.join(root, indexPath), "utf8"),
    projectDoc: readFileSync(path.join(root, projectPath), "utf8")
  });
}

export function evaluateChiosseEmilyCommercialRentReel(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const { source, claim, relation, sourceDoc, indexDoc, projectDoc } = candidate;
  const pinnedArchivePattern = new RegExp(
    `github\\.com/openhouse/commercial-rent-stabilization-public-support/blob/${archiveCommit}/`
  );
  const reviewedTranscriptPattern = new RegExp(
    `blob/${archiveCommit}/sources/instagram/2026-08-05-chiosse-instagram-reel-DbqIqG8PoAQ/transcript\\.reviewed\\.md`
  );

  check(Boolean(source && claim && relation), "joint Reel source, claim, and agency relation must all be materialized");
  check(
    source?.canonicalUrl === "https://www.instagram.com/reel/DbqIqG8PoAQ/" &&
      pinnedArchivePattern.test(source?.archiveUrl ?? "") &&
      source?.preferredPublicUrl === "archive",
    "joint Reel must retain the public URL and prefer the exact-commit archive"
  );
  check(
    source?.publicNote?.includes(mediaSha256) &&
      source?.publicNote?.includes("32 speaker-attributed turns") &&
      /TinyDiarize omitted complete turns/i.test(source?.publicNote ?? "") &&
      /Final human listening\/approval remains separate/i.test(source?.publicNote ?? ""),
    "joint Reel must retain checksum, diarization failure, completeness, and final-human-gate evidence"
  );
  check(
    source?.media?.publicDisplayStatus === "metadata-only" &&
      source?.media?.rightsStatus === "permission-needed" &&
      source?.media?.consentStatus === "review-needed",
    "joint Reel media must remain metadata-only pending rights and consent review"
  );
  check(
    claim?.status === "confirmed-with-boundary" &&
      claim?.projections?.length === 0 &&
      claim?.evidence?.some((item) => item.sourceId === sourceId && item.relationship === "direct-support"),
    "joint Reel claim must remain campaign context with no portfolio projection"
  );
  check(
    claim?.boundaries?.some((item) => /Jamie does not speak or appear/i.test(item)) &&
      claim?.boundaries?.some((item) => /quantitative claims as transcribed speech/i.test(item)) &&
      claim?.boundaries?.some((item) => /Final human listening\/approval/i.test(item)),
    "joint Reel claim must retain Jamie, quantitative-claim, and human-review boundaries"
  );
  check(
    JSON.stringify(relation?.actorIds) === JSON.stringify(["ENT-CHI-OSSE", "ENT-EMILY-GALLAGHER"]) &&
      relation?.action === "advocated-for" &&
      relation?.objectId === "ENT-SBRSA-2026" &&
      relation?.creditScope === "shared",
    "joint Reel agency must preserve both named speakers, state-bill object, and shared credit"
  );
  check(
    pinnedArchivePattern.test(sourceDoc) &&
      reviewedTranscriptPattern.test(sourceDoc) &&
      sourceDoc.includes(mediaSha256) &&
      /does not duplicate the\s+transcript or media/i.test(sourceDoc) &&
      /Final human listening\/approval/i.test(sourceDoc),
    "joint Reel source document must remain checksum-bound, reference-only, and human-gated"
  );
  check(
    indexDoc.includes("chiosse-emily-small-business-rent-reel-2026-08-05.md") &&
      projectDoc.includes("chiosse-emily-small-business-rent-reel-2026-08-05.md") &&
      /Jamie does not speak or appear/i.test(projectDoc),
    "joint Reel must remain navigable as bounded campaign context"
  );

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      sources: source ? 1 : 0,
      claims: claim ? 1 : 0,
      agencyRelations: relation ? 1 : 0,
      activeProjections: claim?.projections?.filter((item) => item.status === "active").length ?? 0,
      attributedTurns: 32,
      guardedBoundaries: 5
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateChiosseEmilyCommercialRentReel(loadCandidate());
  if (!result.passed) {
    console.error(result.failures.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      `Joint commercial-rent Reel validated: ${result.metrics.sources} source, ` +
        `${result.metrics.claims} bounded claim, ${result.metrics.agencyRelations} shared-credit relation, ` +
        `${result.metrics.attributedTurns} turns, ${result.metrics.activeProjections} active projections, and ` +
        `${result.metrics.guardedBoundaries} guarded boundaries.`
    );
  }
}
