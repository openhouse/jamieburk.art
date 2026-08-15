import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const sourceId = "SRC-NYCARTC-CULTURAL-SPACE-STORY-2026-08-15";
const claimId = "CLM-NYCARTC-CULTURAL-SPACE-STORY-2026";
const relationId = "REL-NYCARTC-CULTURAL-SPACE-STORY-ADVOCACY-2026";
const archiveCommit = "ea5497dd910f3402c01e8b560b149d6674f951cc";
const mediaSha256 = "24808b127cd7af7bf0e804db0e27ec59b82d57d96ebf62a2f1e617ed6845caef";
const sourceDocPath = "docs/knowledge-bank/sources/commercial-rent-public-support/nycartc-cultural-space-story-2026-08-15.md";
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

export function evaluateNycartcCulturalSpaceStory(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };

  const { source, claim, relation, sourceDoc, indexDoc, projectDoc } = candidate;
  const pinnedArchivePattern = new RegExp(
    `github\\.com/openhouse/commercial-rent-stabilization-public-support/blob/${archiveCommit}/`
  );
  const reviewedTranscriptPattern = new RegExp(
    `github\\.com/openhouse/commercial-rent-stabilization-public-support/blob/${archiveCommit}/sources/instagram/2026-08-15-nycartc-story-3964470891412306511/transcript\\.reviewed\\.md`
  );

  check(Boolean(source && claim && relation), "Story source, claim, and agency relation must all be materialized");
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
    claim?.status === "confirmed-with-boundary" &&
      claim?.evidence?.some(
        (item) => item.sourceId === sourceId && item.relationship === "direct-support"
      ),
    "Story claim must stay boundary-qualified and directly linked to its source"
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
    pinnedArchivePattern.test(sourceDoc) &&
      reviewedTranscriptPattern.test(sourceDoc) &&
      sourceDoc.includes(mediaSha256) &&
      /does not duplicate the transcript or media/i.test(sourceDoc) &&
      /Final human\s+listening\/approval remains separate/i.test(sourceDoc),
    "Story source document must stay checksum-bound, reference-only, and review-gated"
  );
  check(
    indexDoc.includes("nycartc-cultural-space-story-2026-08-15.md") &&
      projectDoc.includes("nycartc-cultural-space-story-2026-08-15.md"),
    "Story source must remain navigable from the campaign index and Fair Rent project"
  );

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      sources: source ? 1 : 0,
      claims: claim ? 1 : 0,
      agencyRelations: relation ? 1 : 0,
      activeProjections: claim?.projections?.filter((item) => item.status === "active").length ?? 0,
      guardedBoundaries: 4
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
      `NYC Artist Coalition Story validated: ${result.metrics.sources} source, ` +
        `${result.metrics.claims} claim, ${result.metrics.agencyRelations} agency relation, ` +
        `${result.metrics.activeProjections} active projection, and ` +
        `${result.metrics.guardedBoundaries} guarded boundaries.`
    );
  }
}
