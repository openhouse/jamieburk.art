import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const sourceId = "SRC-NYCARTC-CULTURAL-SPACE-STORY-2026-08-15";
const reelSourceId = "SRC-NYCARTC-CULTURAL-SPACE-REEL-2026-08-16";
const claimId = "CLM-NYCARTC-CULTURAL-SPACE-STORY-2026";
const relationId = "REL-NYCARTC-CULTURAL-SPACE-STORY-ADVOCACY-2026";
const archiveCommit = "ea5497dd910f3402c01e8b560b149d6674f951cc";
const mediaSha256 = "24808b127cd7af7bf0e804db0e27ec59b82d57d96ebf62a2f1e617ed6845caef";
const reelArchiveCommit = "e23822538dd6a7464503df6c585dcc680d0cd823";
const reelMediaSha256 = "91ad379f6edabeea1d83f6970e97917480b6aed5fa4a537de136fcea85107636";
const decodedAudioPcmSha256 = "bffd96151404c8d23bac2a5ba10dcc147a0a2215d98975ad17fe254f94fbaacd";
const sourceDocPath = "docs/knowledge-bank/sources/commercial-rent-public-support/nycartc-cultural-space-story-2026-08-15.md";
const reelSourceDocPath = "docs/knowledge-bank/sources/commercial-rent-public-support/nycartc-cultural-space-reel-2026-08-16.md";
const indexPath = "docs/knowledge-bank/indexes/commercial-rent-public-support.md";
const projectPath = "docs/knowledge-bank/projects/fair-rent-nyc.md";

function getById(items, id) {
  return items.find((item) => item.id === id);
}

export function loadCandidate(root = repoRoot) {
  const reelSourceDoc = path.join(root, reelSourceDocPath);
  return structuredClone({
    source: getById(knowledgeBank.sources, sourceId),
    reelSource: getById(knowledgeBank.sources, reelSourceId),
    claim: getById(knowledgeBank.claims, claimId),
    relation: getById(knowledgeBank.agencyRelations, relationId),
    sourceDoc: readFileSync(path.join(root, sourceDocPath), "utf8"),
    reelSourceDoc: existsSync(reelSourceDoc) ? readFileSync(reelSourceDoc, "utf8") : "",
    indexDoc: readFileSync(path.join(root, indexPath), "utf8"),
    projectDoc: readFileSync(path.join(root, projectPath), "utf8")
  });
}

export function evaluateNycartcCulturalSpaceStory(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };

  const { source, reelSource, claim, relation, sourceDoc, reelSourceDoc, indexDoc, projectDoc } = candidate;
  const pinnedArchivePattern = new RegExp(
    `github\\.com/openhouse/commercial-rent-stabilization-public-support/blob/${archiveCommit}/`
  );
  const reviewedTranscriptPattern = new RegExp(
    `github\\.com/openhouse/commercial-rent-stabilization-public-support/blob/${archiveCommit}/sources/instagram/2026-08-15-nycartc-story-3964470891412306511/transcript\\.reviewed\\.md`
  );
  const reelPinnedArchivePattern = new RegExp(
    `github\\.com/openhouse/commercial-rent-stabilization-public-support/blob/${reelArchiveCommit}/`
  );
  const reelReviewedTranscriptPattern = new RegExp(
    `github\\.com/openhouse/commercial-rent-stabilization-public-support/blob/${reelArchiveCommit}/sources/instagram/2026-08-16-nycartc-instagram-reel-DcHBB6Ix2Pd/transcript\\.reviewed\\.md`
  );

  check(Boolean(source && claim && relation), "Story source, claim, and agency relation must all be materialized");
  check(Boolean(reelSource), "August 16 Reel source must be materialized as a distinct public publication");
  check(
    source?.canonicalUrl === "https://www.instagram.com/stories/nycartc/3964470891412306511/" &&
      pinnedArchivePattern.test(source?.archiveUrl ?? "") &&
      source?.preferredPublicUrl === "archive",
    "Story source must keep the original URL and prefer the immutable archive edition"
  );
  check(
    source?.publicNote?.includes(mediaSha256) &&
      source?.publicNote?.includes(archiveCommit) &&
      /corrected diarized transcript/i.test(source?.publicNote ?? "") &&
      /Final human listening\/approval remains separate/i.test(source?.publicNote ?? ""),
    "Story source must retain its commit, media checksum, corrected transcript state, and final human gate"
  );
  check(
    source?.media?.publicDisplayStatus === "metadata-only" &&
      source?.media?.rightsStatus === "permission-needed" &&
      source?.media?.consentStatus === "review-needed",
    "Story media must remain metadata-only pending rights and consent review"
  );
  check(
    reelSource?.canonicalUrl === "https://www.instagram.com/reel/DcHBB6Ix2Pd/" &&
      reelPinnedArchivePattern.test(reelSource?.archiveUrl ?? "") &&
      reelSource?.preferredPublicUrl === "archive",
    "Reel source must keep the original URL and prefer the immutable archive edition"
  );
  check(
    reelSource?.publicNote?.includes(reelMediaSha256) &&
      reelSource?.publicNote?.includes(decodedAudioPcmSha256) &&
      reelSource?.publicNote?.includes(reelArchiveCommit) &&
      /distinct publication/i.test(reelSource?.publicNote ?? "") &&
      /Final human listening\/approval remains separate/i.test(reelSource?.publicNote ?? ""),
    "Reel source must retain its commit, media and decoded-audio checksums, distinct-publication state, and final human gate"
  );
  check(
    reelSource?.media?.publicDisplayStatus === "metadata-only" &&
      reelSource?.media?.rightsStatus === "permission-needed" &&
      reelSource?.media?.consentStatus === "review-needed",
    "Reel media must remain metadata-only pending rights and consent review"
  );
  check(
    claim?.status === "confirmed-with-boundary" &&
      claim?.evidence?.some(
        (item) => item.sourceId === sourceId && item.relationship === "direct-support"
      ) &&
      claim?.evidence?.some(
        (item) => item.sourceId === reelSourceId && item.relationship === "corroborating"
      ),
    "Cultural-space publication claim must stay boundary-qualified and link both Story and Reel evidence"
  );
  check(
    claim?.projections?.length === 1 &&
      claim.projections[0].status === "active" &&
      claim.projections[0].citationRequired === true &&
      claim.projections[0].surfaces?.length === 1 &&
      claim.projections[0].surfaces[0] === "/work/fair-rent-nyc",
    "Story projection must remain a cited Fair Rent case-study projection"
  );
  check(
    claim?.boundaries?.some((item) => /not as a solely authored, edited, or published Jamie artifact/i.test(item)) &&
      claim?.boundaries?.some((item) => /tagged accounts or sponsor acknowledgements as endorsements/i.test(item)) &&
      claim?.boundaries?.some((item) => /same decoded audio.*distinct public objects/i.test(item)) &&
      claim?.boundaries?.some((item) => /invitation.*not attendance/i.test(item)) &&
      claim?.boundaries?.some((item) => /final human listening\/approval remains separate/i.test(item)),
    "Story claim must retain authorship, endorsement, and transcript-review boundaries"
  );
  check(
    relation?.actorIds?.length === 1 &&
      relation.actorIds[0] === "ENT-NYC-ARTIST-COALITION" &&
      relation.creditScope === "collective" &&
      relation.objectId === "ENT-COMMERCIAL-RENT-PROTECTIONS",
    "Story agency relation must preserve collective coalition credit"
  );
  check(
      relation?.sourceIds?.includes(sourceId) &&
      relation?.sourceIds?.includes(reelSourceId) &&
      /Story.*Reel/i.test(relation?.result ?? ""),
    "Agency relation must preserve both publication objects without duplicating the claim"
  );
  check(
    pinnedArchivePattern.test(sourceDoc) &&
      reviewedTranscriptPattern.test(sourceDoc) &&
      sourceDoc.includes(mediaSha256) &&
      /does not duplicate the transcript or media/i.test(sourceDoc) &&
      /Final human\s+listening\/approval remains separate/i.test(sourceDoc),
    "Story source document must stay checksum-bound, reference-only, and review-gated"
  );
  check(
    reelPinnedArchivePattern.test(reelSourceDoc) &&
      reelReviewedTranscriptPattern.test(reelSourceDoc) &&
      reelSourceDoc.includes(reelMediaSha256) &&
      reelSourceDoc.includes(decodedAudioPcmSha256) &&
      /does not duplicate the transcript or media/i.test(reelSourceDoc) &&
      /invitation is not attendance/i.test(reelSourceDoc) &&
      /Final human\s+listening\/approval remains separate/i.test(reelSourceDoc),
    "Reel source document must stay checksum-bound, reference-only, attribution-safe, and review-gated"
  );
  check(
    indexDoc.includes("nycartc-cultural-space-story-2026-08-15.md") &&
      projectDoc.includes("nycartc-cultural-space-story-2026-08-15.md") &&
      indexDoc.includes("nycartc-cultural-space-reel-2026-08-16.md") &&
      projectDoc.includes("nycartc-cultural-space-reel-2026-08-16.md"),
    "Story and Reel sources must remain navigable from the campaign index and Fair Rent project"
  );

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      sources: [source, reelSource].filter(Boolean).length,
      claims: claim ? 1 : 0,
      agencyRelations: relation ? 1 : 0,
      activeProjections: claim?.projections?.filter((item) => item.status === "active").length ?? 0,
      guardedBoundaries: 7
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateNycartcCulturalSpaceStory(loadCandidate());
  if (!result.passed) {
    console.error(result.failures.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      `NYC Artist Coalition Story/Reel publication family validated: ${result.metrics.sources} sources, ` +
        `${result.metrics.claims} claim, ${result.metrics.agencyRelations} agency relation, ` +
        `${result.metrics.activeProjections} active projection, and ` +
        `${result.metrics.guardedBoundaries} guarded boundaries.`
    );
  }
}
