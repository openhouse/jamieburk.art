import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from
  "../../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

const read = (relativePath) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");

const manifestText = read(
  "docs/knowledge-bank/corpora/wowlist-facebook-posts-public-safe-manifest-2026-07-16.json"
);
const manifest = JSON.parse(manifestText);
const researchNote = read(
  "docs/knowledge-bank/research/2026-07-16-wowlist-facebook-posts-full-population.md"
);
const projectNote = read("docs/knowledge-bank/projects/wowlist.md");
const publicPage = read("apps/www/src/content/work/wowlist.mdx");

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intakeById = new Map(
  knowledgeBank.intakes.map((intake) => [intake.id, intake])
);

const censusSourceId = "SRC-FACEBOOK-WOWLIST-POSTS-CENSUS-2026";
const closeReadSourceIds = [
  "SRC-WOWLIST-FACEBOOK-MEOW-WOLF-DIY-FUND-2016",
  "SRC-WOWLIST-FACEBOOK-DENVER-DIY-SPACES-2017",
  "SRC-WOWLIST-FACEBOOK-THE-KNOW-CLOSING-2016",
  "SRC-WOWLIST-FACEBOOK-GHOST-SHIP-SAFETY-2016",
  "SRC-WOWLIST-FACEBOOK-SHEA-KICKSTARTER-2017"
];
const claimIds = [
  "CLM-WOWLIST-FACEBOOK-POSTS-CENSUS-2026",
  "CLM-WOWLIST-FACEBOOK-OUTBOUND-SOURCE-FIELD-2026",
  "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-PRACTICE-2026",
  "CLM-WOWLIST-FACEBOOK-CULTURAL-SPACE-CONTINUITY-2026",
  "CLM-WOWLIST-FACEBOOK-VISIBLE-RECEPTION-2026",
  "CLM-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026"
];
const intakeIds = [
  "INTAKE-WOWLIST-FACEBOOK-POSTS-FULL-POPULATION-2026",
  "INTAKE-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY-2026"
];
const inquiryIds = [
  "INQ-WOWLIST-FACEBOOK-POSTS-2026",
  "INQ-WOWLIST-FACEBOOK-STEWARDSHIP-2026"
];

function makeCheck(evidence) {
  const errors = [];
  return {
    errors,
    evidence,
    require(condition, message) {
      if (!condition) errors.push(message);
    },
    finish() {
      return { passed: errors.length === 0, errors, evidence };
    }
  };
}

const allEvidenceForClaim = (claimId) =>
  claimById.get(claimId)?.evidence ?? [];

export function validateWowListFacebookPosts() {
  const checks = {};

  const population = makeCheck(
    "Three independent Page traversals reconcile 79, 81, and 90 raw card variants to the same 57 semantic posts and SHA-256 fingerprint."
  );
  const reconciliation = manifest.populationReconciliation;
  population.require(manifest.schemaVersion === 1, "Unexpected manifest schema");
  population.require(manifest.capturedAt === "2026-07-16", "Unexpected capture date");
  population.require(
    reconciliation.independentTraversalCount === 3,
    "Three independent traversals are required"
  );
  population.require(
    JSON.stringify(reconciliation.rawRenderedCardCounts) === "[79,81,90]",
    "Raw rendered-card counts changed"
  );
  population.require(
    JSON.stringify(reconciliation.semanticPostCounts) === "[57,57,57]",
    "All traversals must reconcile to 57 semantic posts"
  );
  population.require(
    JSON.stringify(reconciliation.stableTerminalObservations) === "[18,18,20]",
    "Terminal stability observations changed"
  );
  population.require(
    reconciliation.sortedSemanticKeySha256 ===
      "1c7a4c56506480e1b8f7d85f5257ad7d01c2f18298e430926dad4d586b0d1e45",
    "Unexpected semantic population fingerprint"
  );
  population.require(
    reconciliation.visiblePostDateRange.first === "2015-04-25" &&
      reconciliation.visiblePostDateRange.last === "2018-03-22",
    "Visible post-date range changed"
  );
  population.require(
    /not a native Meta owner export, deletion history/i.test(
      manifest.populationBoundary
    ),
    "Population boundary does not reject all-ever or owner-export framing"
  );
  checks.population = population.finish();

  const minimization = makeCheck(
    "The public corpus retains aggregates, safe URLs, fingerprints, and limitations while excluding raw posts, raw comments, direct-aid URLs, sessions, analytics, credentials, and local paths."
  );
  const blockedMarkers = [
    "/Users/",
    "/Volumes/",
    "/private/tmp/",
    "file://",
    "docs.google.com/document",
    "youcaring.com/firevictims",
    "accessToken",
    "cookie=",
    "sessionId"
  ];
  minimization.require(
    blockedMarkers.every((marker) => !manifestText.includes(marker)),
    "Public manifest exposes a blocked private or sensitive marker"
  );
  minimization.require(
    !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(manifestText),
    "Public manifest exposes an email address"
  );
  minimization.require(
    !/\b(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b/.test(
      manifestText
    ),
    "Public manifest exposes a phone number"
  );
  minimization.require(
    manifest.publicSafety.excluded.includes("raw post text") &&
      manifest.publicSafety.excluded.includes("raw comment text") &&
      manifest.publicSafety.excluded.includes("authenticated-session material"),
    "Public-safety exclusions are incomplete"
  );
  minimization.require(
    manifest.sourceRouting.withheldSensitiveDirectAidDestinations === 2,
    "Two sensitive direct-aid destinations must remain counted and withheld"
  );
  checks.minimization = minimization.finish();

  const lifecycle = makeCheck(
    "Two stable intakes route the public corpus and protected stewardship memory into six claims and two research inquiries."
  );
  for (const id of intakeIds) {
    lifecycle.require(intakeById.has(id), `Missing intake ${id}`);
  }
  for (const id of claimIds) {
    lifecycle.require(claimById.has(id), `Missing claim ${id}`);
  }
  for (const id of inquiryIds) {
    lifecycle.require(inquiryById.has(id), `Missing inquiry ${id}`);
  }
  const corpusIntake = intakeById.get(intakeIds[0]);
  lifecycle.require(
    corpusIntake?.maturity === "decomposed" &&
      corpusIntake?.editorialState === "unsurfaced",
    "Corpus intake must be decomposed and unsurfaced"
  );
  lifecycle.require(
    researchNote.includes(intakeIds[0]) && researchNote.includes(intakeIds[1]),
    "Research note does not report both intake dispositions"
  );
  checks.lifecycle = lifecycle.finish();

  const sourceRouting = makeCheck(
    "The corpus reconciles 57 destinations, publishes 24 safe external URLs, withholds three unsafe or unusable destinations, and close-reads five source records with explicit boundaries."
  );
  const routing = manifest.sourceRouting;
  sourceRouting.require(routing.uniquePostedDestinations === 57, "Expected 57 unique destinations");
  sourceRouting.require(routing.uniqueWowListDestinations === 30, "Expected 30 WOW List destinations");
  sourceRouting.require(routing.uniqueExternalDestinations === 27, "Expected 27 external destinations");
  sourceRouting.require(routing.publishedSafeExternalDestinations === 24, "Expected 24 published safe external destinations");
  sourceRouting.require(routing.safeExternalUrls.length === 24, "Safe URL list does not reconcile");
  sourceRouting.require(
    new Set(routing.safeExternalUrls).size === routing.safeExternalUrls.length,
    "Safe external URLs are not unique"
  );
  sourceRouting.require(
    routing.allExternalDestinationSha256 ===
      "84ee0cda894a113d0dfe88adbe5f0d8c001dfed0f0e96faa26f5efc1ad34cf3b",
    "All-external-destination fingerprint changed"
  );
  sourceRouting.require(
    manifest.closeReadSources.length === closeReadSourceIds.length &&
      closeReadSourceIds.every((id) =>
        manifest.closeReadSources.some((item) => item.sourceId === id)
      ),
    "Close-read source manifest is incomplete"
  );
  for (const sourceId of closeReadSourceIds) {
    const source = sourceById.get(sourceId);
    sourceRouting.require(Boolean(source), `Missing close-read source ${sourceId}`);
    sourceRouting.require(
      Boolean(source?.supportsGenerally.length && source?.doesNotEstablish.length),
      `${sourceId} lacks support or limitation boundaries`
    );
    sourceRouting.require(
      allEvidenceForClaim("CLM-WOWLIST-FACEBOOK-OUTBOUND-SOURCE-FIELD-2026")
        .some((edge) => edge.sourceId === sourceId),
      `${sourceId} lacks a claim edge`
    );
    sourceRouting.require(
      allEvidenceForClaim("CLM-WOWLIST-FACEBOOK-CULTURAL-SPACE-CONTINUITY-2026")
        .some((edge) => edge.sourceId === sourceId && edge.locator),
      `${sourceId} lacks a located cultural-space context edge`
    );
  }
  checks.sourceRouting = sourceRouting.finish();

  const engagement = makeCheck(
    "One identifiable incoming comment is retained as a bounded reception specimen; an unassigned body, reactions, followers, and inferred views remain outside direct engagement."
  );
  engagement.require(
    manifest.visibleReception.identifiableIncomingPublicComments === 1,
    "Expected one identifiable incoming public comment"
  );
  engagement.require(
    manifest.visibleReception.unresolvedCommentBodies === 1,
    "Expected one unresolved comment body"
  );
  engagement.require(
    manifest.visibleReception.reactionCensusStatus === "not-recovered",
    "Reaction census must remain not recovered"
  );
  engagement.require(
    /not traction, reach, conversion, adoption, attendance, endorsement, or impact/i.test(
      manifest.visibleReception.interpretation
    ),
    "Visible reception is not sufficiently bounded"
  );
  engagement.require(
    /Mutable capture-date profile controls only/i.test(
      manifest.profileControl.interpretation
    ),
    "Follower controls are not sufficiently bounded"
  );
  checks.engagement = engagement.finish();

  const authorship = makeCheck(
    "Jamie's stewardship memory is protected, limited, and held; Richard retains co-project credit and population-wide post authorship remains not recovered."
  );
  const memorySource = sourceById.get(
    "SRC-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026"
  );
  const memoryClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP-MEMORY-2026"
  );
  const memoryIntake = intakeById.get(
    "INTAKE-WOWLIST-FACEBOOK-SOCIAL-MANAGEMENT-MEMORY-2026"
  );
  authorship.require(
    memorySource?.visibility === "protected" &&
      memorySource?.preservationStatus === "private" &&
      !memorySource?.canonicalUrl,
    "Stewardship memory source must remain protected and unlinked"
  );
  authorship.require(memoryClaim?.status === "use-with-care", "Stewardship claim must remain use-with-care");
  authorship.require(
    memoryClaim?.projections.every((projection) => projection.status !== "active"),
    "Stewardship memory may not have an active public projection"
  );
  authorship.require(
    memoryClaim?.boundaries.some((item) => /Richard retains co-project credit/i.test(item)),
    "Richard's co-project credit is missing"
  );
  authorship.require(
    memoryClaim?.antiClaims.some((item) => /every WOW List Facebook post/i.test(item)),
    "Population-wide authorship anti-claim is missing"
  );
  authorship.require(
    memoryIntake?.publicUse === "protected" &&
      memoryIntake?.editorialState === "unsurfaced",
    "Stewardship memory intake must remain protected and unsurfaced"
  );
  checks.authorship = authorship.finish();

  const projection = makeCheck(
    "All new Facebook population claims remain held while the existing WOW List public page keeps its composed mission, role, product-use, and scale argument."
  );
  projection.require(
    claimIds.every((claimId) =>
      claimById.get(claimId)?.projections.every((item) => item.status !== "active")
    ),
    "A new Facebook population claim was projected without editorial selection"
  );
  projection.require(
    publicPage.includes("CLM-WOWLIST-FACEBOOK-MISSION-STATEMENT-2026") &&
      publicPage.includes("CLM-WOWLIST-JAMIE-PEER-ATTRIBUTION"),
    "Existing composed WOW List proof is missing"
  );
  projection.require(
    /No new public case-study sentence was selected/i.test(
      manifest.projectionDecision
    ),
    "Projection decision is not explicit"
  );
  projection.require(
    projectNote.includes("Facebook Page post population"),
    "Project documentation does not link the new archive"
  );
  checks.projection = projection.finish();

  const errors = Object.values(checks).flatMap((check) => check.errors);
  return {
    passed: errors.length === 0,
    errors,
    checks,
    evidence:
      "WOW List Facebook post census reconciles three traversals to 57 semantic posts, 57 posted destinations, five close-read sources, bounded reception, protected authorship memory, and no automatic public projection."
  };
}
