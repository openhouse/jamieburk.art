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
  "docs/knowledge-bank/corpora/facebook-events-public-safe-manifest-2026-07-16.json"
);
const manifest = JSON.parse(manifestText);
const projectNote = read("docs/knowledge-bank/projects/facebook-events.md");
const wowListNote = read("docs/knowledge-bank/projects/wowlist.md");
const sundayDinnerPage = read(
  "apps/www/src/content/work/196-sunday-dinner.mdx"
);
const wowListPage = read("apps/www/src/content/work/wowlist.mdx");
const workSource = read("apps/www/src/data/work.ts");
const docs = `${projectNote}\n${wowListNote}`.replace(/\s+/g, " ");

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
const pageById = new Map(knowledgeBank.pages.map((page) => [page.id, page]));

const requiredSourceIds = [
  "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026",
  "SRC-FACEBOOK-JAMIE-PAST-EVENTS-RUN-2026",
  "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
  "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
  "SRC-FACEBOOK-WATER-PROJECT-EVENT-2007",
  "SRC-FACEBOOK-WOWLIST-PROFILE-2026",
  "SRC-FACEBOOK-WOWLIST-PAST-EVENTS-RUN-2026"
];

const requiredClaimIds = [
  "CLM-FACEBOOK-JAMIE-EVENT-INTERFACE-POPULATION-2026",
  "CLM-FACEBOOK-JAMIE-ORGANIZER-DISPLAY-FLOOR-2026",
  "CLM-FACEBOOK-PERSONAL-EVENT-STAKEHOLDER-LEADS-2026",
  "CLM-SUNDAY-DINNER-MILESTONES-2014-2016",
  "CLM-SUNDAY-DINNER-FACEBOOK-RESPONSE-LABELS-2026",
  "CLM-WATER-PARTICIPATORY-PROTOTYPE-2007",
  "CLM-WOWLIST-FACEBOOK-MISSION-STATEMENT-2026",
  "CLM-WOWLIST-FACEBOOK-EVENTS-NOT-RECOVERED-2026"
];

const requiredInquiryIds = [
  "INQ-FACEBOOK-JAMIE-OWNER-EXPORT-2026",
  "INQ-FACEBOOK-EVENT-DETAIL-MATURATION-2026",
  "INQ-WOWLIST-FACEBOOK-EVENT-RECOVERY-2026"
];

const requiredIntakeIds = [
  "INTAKE-FACEBOOK-JAMIE-EVENTS-FULL-POPULATION-2026",
  "INTAKE-FACEBOOK-SUNDAY-DINNER-MILESTONES-2026",
  "INTAKE-FACEBOOK-WOWLIST-EVENTS-FULL-POPULATION-2026",
  "INTAKE-FACEBOOK-WOWLIST-MISSION-2026"
];

const includesAll = (source, values) =>
  values.every((value) => source.includes(value));

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

function projectionFor(claimId, key) {
  return claimById
    .get(claimId)
    ?.projections.find((projection) => projection.key === key);
}

export function validateFacebookEventsArchive() {
  const checks = {};

  const population = makeCheck(
    "Two independent traversals reconcile 511 occurrence rows, 502 canonical event pages, nine occurrence-specific rows, four recurring pages, and matching digests."
  );
  const personal = manifest.personalPastEvents;
  const yearTotal = Object.values(personal.yearCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  population.require(manifest.schemaVersion === 1, "Unexpected manifest schema");
  population.require(manifest.capturedAt === "2026-07-16", "Unexpected capture date");
  population.require(
    personal.independentTraversalCount === 2,
    "Two independent traversals are required"
  );
  population.require(personal.occurrenceRows === 511, "Expected 511 occurrence rows");
  population.require(
    personal.canonicalEventPages === 502,
    "Expected 502 canonical event pages"
  );
  population.require(
    personal.occurrenceSpecificRows === 9,
    "Expected nine occurrence-specific rows"
  );
  population.require(
    personal.occurrenceRows - personal.canonicalEventPages === 9,
    "Occurrence and canonical counts do not reconcile"
  );
  population.require(
    personal.recurringCanonicalEventPages === 4,
    "Expected four recurring canonical event pages"
  );
  population.require(
    personal.sortedOccurrenceKeySha256 ===
      "a37f0bc93967f2c8cff36227c1624be820e67a3609aa0e70c91aed620e1e4d77",
    "Unexpected occurrence-key digest"
  );
  population.require(
    JSON.stringify(personal.stableTerminalObservations) === "[18,18]",
    "Both traversals need 18 terminal stability observations"
  );
  population.require(yearTotal === 511, "Year counts do not sum to 511");
  population.require(
    personal.organizerDisplayCoverage.populated +
        personal.organizerDisplayCoverage.missing ===
      511,
    "Organizer-display coverage does not reconcile"
  );
  population.require(
    personal.dateRange.first === "2006-12-02" &&
      personal.dateRange.last === "2023-08-26",
    "Date range is not preserved"
  );
  checks.population = population.finish();

  const minimization = makeCheck(
    "The public manifest retains aggregates, selected event metadata, and boundaries while excluding raw personal rows, addresses, identities, event bodies, credentials, sessions, and local paths."
  );
  const blockedMarkers = [
    "/Users/",
    "/Volumes/",
    "/private/tmp/",
    "file://",
    "supporting-materials",
    "rawBody",
    "attendees",
    "guestList",
    "meetingPasscode",
    "accessToken",
    "cookie"
  ];
  minimization.require(
    blockedMarkers.every((marker) => !manifestText.includes(marker)),
    "The public manifest contains a blocked private marker"
  );
  minimization.require(
    !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(manifestText),
    "The public manifest contains an email address"
  );
  minimization.require(
    !/\b(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b/.test(
      manifestText
    ),
    "The public manifest contains a phone number"
  );
  minimization.require(
    !manifest.selectedEventSummaries.some(
      (event) => "url" in event || "eventId" in event || "address" in event
    ),
    "Selected event summaries expose a URL, event ID, or address"
  );
  minimization.require(
    manifest.selectedEventSummaries.length === 3,
    "Only three selected event summaries should be public"
  );
  minimization.require(
    includesAll(manifest.publicSafety.excluded.join(" "), [
      "raw personal timeline",
      "addresses",
      "guest or attendee identities",
      "authenticated-session material",
      "machine-local paths"
    ]),
    "The minimization policy is incomplete"
  );
  for (const sourceId of [
    "SRC-FACEBOOK-JAMIE-PAST-EVENTS-RUN-2026",
    "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
    "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
    "SRC-FACEBOOK-WATER-PROJECT-EVENT-2007",
    "SRC-FACEBOOK-WOWLIST-PAST-EVENTS-RUN-2026"
  ]) {
    const source = sourceById.get(sourceId);
    minimization.require(Boolean(source), `Missing protected source ${sourceId}`);
    minimization.require(
      !source?.canonicalUrl && !source?.archiveUrl && !source?.assetUrl,
      `${sourceId} exposes an underlying URL`
    );
    minimization.require(
      Boolean(source?.protectedLocatorId),
      `${sourceId} needs an opaque protected locator`
    );
  }
  checks.minimization = minimization.finish();

  const lifecycle = makeCheck(
    "Four intakes separate protected populations from selected public claims across seven sources, eight atomic claims, three inquiries, and source-specific boundaries."
  );
  for (const id of requiredSourceIds) {
    const source = sourceById.get(id);
    lifecycle.require(Boolean(source), `Missing source ${id}`);
    lifecycle.require(
      Boolean(source?.supportsGenerally.length && source?.doesNotEstablish.length),
      `${id} needs supports and does-not-establish boundaries`
    );
  }
  for (const id of requiredClaimIds) {
    const claim = claimById.get(id);
    lifecycle.require(Boolean(claim), `Missing claim ${id}`);
    lifecycle.require(
      Boolean(claim?.evidence.length && claim?.boundaries.length && claim?.antiClaims.length),
      `${id} needs evidence, boundaries, and anti-claims`
    );
  }
  for (const id of requiredInquiryIds) {
    lifecycle.require(Boolean(inquiryById.get(id)), `Missing inquiry ${id}`);
  }
  for (const id of requiredIntakeIds) {
    const intake = intakeById.get(id);
    lifecycle.require(Boolean(intake), `Missing intake ${id}`);
    lifecycle.require(intake?.maturity === "decomposed", `${id} is not decomposed`);
    lifecycle.require(
      Boolean(intake?.sourceIds.length && intake?.claimIds.length && intake?.inquiryIds.length),
      `${id} lacks lifecycle edges`
    );
  }
  lifecycle.require(
    intakeById.get("INTAKE-FACEBOOK-JAMIE-EVENTS-FULL-POPULATION-2026")
      ?.publicUse === "protected",
    "The personal population intake must remain protected"
  );
  lifecycle.require(
    intakeById.get("INTAKE-FACEBOOK-WOWLIST-EVENTS-FULL-POPULATION-2026")
      ?.publicUse === "protected",
    "The WOW List negative-search intake must remain protected"
  );
  for (const intakeId of [
    "INTAKE-FACEBOOK-SUNDAY-DINNER-MILESTONES-2026",
    "INTAKE-FACEBOOK-WOWLIST-MISSION-2026"
  ]) {
    const intake = intakeById.get(intakeId);
    lifecycle.require(
      intake?.publicUse === "public-linkable" &&
        intake?.editorialState === "selected",
      `${intakeId} must carry explicit publication and selection approval`
    );
  }
  checks.lifecycle = lifecycle.finish();

  const selectedEvents = makeCheck(
    "The two Sunday Dinner milestones are publicly composed with collective credit; response labels and the 2007 water record remain held with explicit limits."
  );
  const milestones = claimById.get("CLM-SUNDAY-DINNER-MILESTONES-2014-2016");
  const milestoneProjection = projectionFor(
    "CLM-SUNDAY-DINNER-MILESTONES-2014-2016",
    "case-study"
  );
  const responseClaim = claimById.get(
    "CLM-SUNDAY-DINNER-FACEBOOK-RESPONSE-LABELS-2026"
  );
  const waterClaim = claimById.get(
    "CLM-WATER-PARTICIPATORY-PROTOTYPE-2007"
  );
  selectedEvents.require(
    milestones?.status === "confirmed-with-boundary",
    "Sunday Dinner milestone claim needs a confirmed boundary"
  );
  selectedEvents.require(
    milestoneProjection?.status === "active" &&
      milestoneProjection.surfaces.length === 1 &&
      milestoneProjection.surfaces[0] === "/work/196-sunday-dinner",
    "Sunday Dinner milestone projection is not narrowly selected"
  );
  selectedEvents.require(
    milestones?.evidence.some(
      (evidence) =>
        evidence.sourceId ===
          "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026" &&
        evidence.renderCitation
    ),
    "Sunday Dinner milestone lacks public redacted evidence"
  );
  selectedEvents.require(
    milestones?.evidence.filter(
      (evidence) => evidence.relationship === "private-support"
    ).length === 2,
    "Sunday Dinner milestone needs two precise protected source edges"
  );
  selectedEvents.require(
    responseClaim?.status === "use-with-care" &&
      responseClaim.projections.every(
        (projection) => projection.status === "hold" && !projection.surfaces.length
      ),
    "Response labels must remain held"
  );
  selectedEvents.require(
    waterClaim?.status === "confirmed-with-boundary" &&
      waterClaim.projections.every(
        (projection) => projection.status === "hold" && !projection.surfaces.length
      ),
    "The water-project record must remain knowledge-bank-only"
  );
  selectedEvents.require(
    includesAll(sundayDinnerPage, [
      'claimId="CLM-SUNDAY-DINNER-MILESTONES-2014-2016"',
      'occurrenceId="public-milestone-continuity"'
    ]),
    "Sunday Dinner page does not render the selected milestone claim"
  );
  selectedEvents.require(
    includesAll(workSource, [
      "100th gathering in 2014",
      "Julia Fredenburg and Jamie Burkart"
    ]),
    "Sunday Dinner metadata does not carry the selected proof"
  );
  checks.selectedEvents = selectedEvents.finish();

  const wowList = makeCheck(
    "WOW List's surviving mission language is selected while the empty current Events surface remains a bounded not-recovered result."
  );
  const wowMission = claimById.get(
    "CLM-WOWLIST-FACEBOOK-MISSION-STATEMENT-2026"
  );
  const wowMissing = claimById.get(
    "CLM-WOWLIST-FACEBOOK-EVENTS-NOT-RECOVERED-2026"
  );
  const wowProjection = projectionFor(
    "CLM-WOWLIST-FACEBOOK-MISSION-STATEMENT-2026",
    "case-study"
  );
  wowList.require(
    manifest.wowListPastEvents.displayedMessage === "No events to show" &&
      manifest.wowListPastEvents.recoveredEventCards === 0 &&
      manifest.wowListPastEvents.status === "not-recovered",
    "WOW List current empty surface is not preserved"
  );
  wowList.require(
    /does not establish that WOW List never/i.test(
      manifest.wowListPastEvents.limitation
    ),
    "WOW List negative search lost its historical boundary"
  );
  wowList.require(
    wowMissing?.status === "not-recovered" &&
      wowMissing.projections.every(
        (projection) => projection.status === "hold" && !projection.surfaces.length
      ),
    "WOW List not-recovered claim must remain held"
  );
  wowList.require(
    wowMissing?.antiClaims.some((claim) => /never created or hosted/i.test(claim)) &&
      wowMissing.antiClaims.some((claim) => /No WOW List event ever existed/i.test(claim)),
    "WOW List anti-claims do not block historical nonexistence"
  );
  wowList.require(
    wowMission?.status === "confirmed-with-boundary" &&
      wowProjection?.status === "active" &&
      wowProjection.surfaces.includes("/work/wowlist"),
    "WOW List mission language is not narrowly selected"
  );
  wowList.require(
    includesAll(wowListPage, [
      'claimId="CLM-WOWLIST-FACEBOOK-MISSION-STATEMENT-2026"',
      'occurrenceId="facebook-mission-language"'
    ]),
    "WOW List page does not render the mission claim"
  );
  wowList.require(
    includesAll(docs, [
      "No events to show",
      "not a claim that WOW List never created",
      "Being there changes everything"
    ]),
    "WOW List documentation lacks the finding, boundary, or mission language"
  );
  checks.wowList = wowList.finish();

  const sourceRouting = makeCheck(
    "Source routing, traction, and stakeholder leads are retained as bounded queues rather than promoted to attendance, reach, engagement, endorsement, or impact."
  );
  const stakeholderClaim = claimById.get(
    "CLM-FACEBOOK-PERSONAL-EVENT-STAKEHOLDER-LEADS-2026"
  );
  const organizerClaim = claimById.get(
    "CLM-FACEBOOK-JAMIE-ORGANIZER-DISPLAY-FLOOR-2026"
  );
  sourceRouting.require(
    manifest.sourceRouting.currentPersonalIndexEventLinks === 502 &&
      manifest.sourceRouting.selectedEventDetailPagesCloseRead === 3 &&
      manifest.sourceRouting.externalArticleUrlsRecoveredFromIndexCards === 0,
    "Source-routing controls do not match the research pass"
  );
  sourceRouting.require(
    /does not claim complete body-level URL recovery/i.test(
      manifest.sourceRouting.postedUrlStatus
    ),
    "Body-level URL incompleteness is hidden"
  );
  sourceRouting.require(
    personal.selectedOrganizerDisplayLeads.find(
      (lead) => lead.label === "Jamie Burkart"
    )?.cardCount === 20 &&
      personal.selectedOrganizerDisplayLeads.find(
        (lead) => lead.label === "NYC Artist Coalition"
      )?.cardCount === 21,
    "Selected organizer-display controls are incomplete"
  );
  sourceRouting.require(
    stakeholderClaim?.status === "use-with-care" &&
      stakeholderClaim.projections.every(
        (projection) => projection.status === "hold" && !projection.surfaces.length
      ),
    "Stakeholder leads must remain held"
  );
  sourceRouting.require(
    organizerClaim?.projections.every(
      (projection) => projection.status === "hold" && !projection.surfaces.length
    ),
    "Organizer-display floor must remain held"
  );
  sourceRouting.require(
    includesAll(docs, [
      "not attendance, unique people, reach, endorsement, mandate, or impact",
      "source lead",
      "no claim to 100 percent body-level article or posted-URL recovery"
    ]),
    "Traction, stakeholder, or URL boundaries are incomplete"
  );
  checks.sourceRouting = sourceRouting.finish();

  const projection = makeCheck(
    "Exactly two new claims reach the website; population metrics, response labels, stakeholder leads, the water record, and negative search result stay held."
  );
  const activeNewClaims = requiredClaimIds.filter((id) =>
    claimById
      .get(id)
      ?.projections.some(
        (candidate) => candidate.status === "active" && candidate.surfaces.length
      )
  );
  const sundayPage = pageById.get("196-sunday-dinner");
  const wowPage = pageById.get("wowlist");
  projection.require(
    JSON.stringify(activeNewClaims) ===
      JSON.stringify([
        "CLM-SUNDAY-DINNER-MILESTONES-2014-2016",
        "CLM-WOWLIST-FACEBOOK-MISSION-STATEMENT-2026"
      ]),
    "The selected projection set is broader than intended"
  );
  projection.require(
    sundayPage?.occurrences.some(
      (occurrence) =>
        occurrence.id === "public-milestone-continuity" &&
        occurrence.claimId === "CLM-SUNDAY-DINNER-MILESTONES-2014-2016"
    ),
    "Sunday Dinner citation occurrence is missing"
  );
  projection.require(
    wowPage?.occurrences.some(
      (occurrence) =>
        occurrence.id === "facebook-mission-language" &&
        occurrence.claimId === "CLM-WOWLIST-FACEBOOK-MISSION-STATEMENT-2026"
    ),
    "WOW List citation occurrence is missing"
  );
  projection.require(
    sundayPage?.sourceOrder.includes(
      "SRC-FACEBOOK-EVENTS-PUBLIC-SAFE-AGGREGATE-2026"
    ),
    "Sunday Dinner source order lacks the public-safe aggregate"
  );
  projection.require(
    wowPage?.sourceOrder.includes("SRC-FACEBOOK-WOWLIST-PROFILE-2026"),
    "WOW List source order lacks its public Page"
  );
  checks.projection = projection.finish();

  const errors = Object.values(checks).flatMap((check) => check.errors);
  return {
    passed: errors.length === 0,
    errors,
    checks,
    evidence:
      "Two matching 511-row traversals and a redacted manifest preserve the capture-date personal and WOW List Facebook event populations; three selected event pages are decomposed, two bounded claims reach the site, and all timeline, traction, stakeholder, URL-completeness, and historical-nonexistence risks remain held."
  };
}
