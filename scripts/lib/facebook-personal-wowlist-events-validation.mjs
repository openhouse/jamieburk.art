import { createHash } from "node:crypto";

const digestPattern = /^[a-f0-9]{64}$/;
const facebookEventUrlPattern =
  /^https:\/\/www\.facebook\.com\/events\/(\d+)\/$/;
const localPathPattern =
  /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|(?:^|\s)~\/|[A-Z]:\\Users\\)/i;
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const phonePattern =
  /(?<!\d)(?:(?:\+?1[ .\-/]?)?\(?\d{3}\)?[ .\-/]\d{3}[ .\-/]\d{4})(?!\d)/;
const credentialValuePattern =
  /(?:Bearer\s+[A-Za-z0-9._~-]+|X-Amz-(?:Signature|Credential|Security-Token)=|access[_ -]?token|EAAB[A-Za-z0-9])/i;

export const facebookEventsIntegrityControls = {
  protectedCaptureSha256:
    "abcfdd059a87217fe671e9a9ff2d364768c2861ca3013f2e7159e94696c9e6ad",
  personalEventIdentitySha256:
    "a434043aafbbe20f6f23f2c77022b8807dc76d277568d558757829f8e5ccd77b",
  explicitOrganizerIdentitySha256:
    "8ce5db11955e039666d5d0ac4697641120c022d63028e8ed387e2cf826486336",
  identityDigestMethod:
    "SHA-256 over newline-joined, lexicographically sorted eventId:eventTimeId identities; null eventTimeId is empty.",
  byYear: {
    "2006": 1,
    "2007": 4,
    "2010": 1,
    "2011": 3,
    "2012": 2,
    "2013": 2,
    "2014": 3,
    "2015": 50,
    "2016": 52,
    "2017": 239,
    "2018": 105,
    "2019": 40,
    "2020": 6,
    "2022": 1,
    "2023": 2
  },
  displayedResponseCountDistribution: [
    2, 4, 5, 5, 5, 6, 7, 7, 14, 16, 16, 20, 21, 28, 38, 44, 119
  ]
};

const expectedBoundaries = {
  integrity:
    "Digests permit later integrity comparison without publishing the full personal-profile event index or a private locator.",
  population:
    "Complete accounting of the authenticated Past Events cards exposed on the capture date. Profile association is not attendance, interest, authorship, production, support, or endorsement. A one-count discrepancy against a separate host control remains unresolved because the controls may not represent the same unit, population, or interface state.",
  organizer:
    "Facebook response labels are dated event-level interface signals, not attendance, unique people, stakeholder identity, reach, endorsement, conversion, mandate, or impact. Selected examples omit ordinary-life and unnecessarily personal event detail.",
  association:
    "Organizer displays classify event cards surfaced on Jamie's profile. They are research leads only and do not prove that Jamie attended, organized, supported, partnered with, or was endorsed by any listed institution or person.",
  routes:
    "No external article destination was exposed as an anchor on the 20 reviewed organizer-detail pages. Absence from the current render is not proof that no destination was ever posted.",
  wowProfile:
    "Dated public profile metadata; follower counts are held from accomplishment messaging.",
  wowEvents:
    "The current page surface rendered zero event cards and exposed no Events section. This is not evidence that WOW List historically created no Facebook events. A Meta owner export or historical page capture is required."
};

const collectEntries = (value, path = "$", output = []) => {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      output.push({ path: `${path}[${index}]`, key: String(index), value: item });
      collectEntries(item, `${path}[${index}]`, output);
    });
    return output;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      output.push({ path: `${path}.${key}`, key, value: child });
      collectEntries(child, `${path}.${key}`, output);
    }
  }
  return output;
};

const asText = (value) => (typeof value === "string" ? value : "");

const validateExactKeys = (value, allowed, path, fail) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${path} must be an object.`);
    return;
  }
  const allowedKeys = new Set(allowed);
  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key)) fail(`Unexpected public key at ${path}.${key}.`);
  }
  for (const key of allowed) {
    if (!Object.hasOwn(value, key)) fail(`Missing required key at ${path}.${key}.`);
  }
};

export const validateFacebookPersonalWowListEventsLedger = (ledger) => {
  const errors = [];
  const fail = (message) => errors.push(message);

  if (!ledger || typeof ledger !== "object") {
    return ["Ledger must be an object."];
  }
  validateExactKeys(
    ledger,
    [
      "schemaVersion",
      "capturedAt",
      "surfaces",
      "acquisitionIntegrity",
      "personalProfile",
      "wowListPage",
      "privacy"
    ],
    "$",
    fail
  );
  validateExactKeys(
    ledger.surfaces,
    ["personalPastEvents", "wowListEvents"],
    "$.surfaces",
    fail
  );
  if (ledger.schemaVersion !== 1) fail("schemaVersion must equal 1.");
  if (ledger.capturedAt !== "2026-07-16") {
    fail("capturedAt must equal 2026-07-16.");
  }
  if (
    ledger.surfaces?.personalPastEvents !==
      "https://www.facebook.com/jburkart/events" ||
    ledger.surfaces?.wowListEvents !==
      "https://www.facebook.com/wowlist/events"
  ) {
    fail("Canonical Facebook surfaces are missing or changed.");
  }

  const integrity = ledger.acquisitionIntegrity ?? {};
  validateExactKeys(
    integrity,
    [
      "protectedCaptureSha256",
      "protectedCapturePublished",
      "personalEventIdentitySha256",
      "explicitOrganizerIdentitySha256",
      "identityDigestMethod",
      "boundary"
    ],
    "$.acquisitionIntegrity",
    fail
  );
  for (const key of [
    "protectedCaptureSha256",
    "personalEventIdentitySha256",
    "explicitOrganizerIdentitySha256"
  ]) {
    if (!digestPattern.test(integrity[key] ?? "")) {
      fail(`${key} must be a lowercase SHA-256 digest.`);
    }
    if (integrity[key] !== facebookEventsIntegrityControls[key]) {
      fail(`${key} does not match the verified capture control.`);
    }
  }
  if (integrity.protectedCapturePublished !== false) {
    fail("The protected capture must remain unpublished.");
  }
  if (
    integrity.identityDigestMethod !==
    facebookEventsIntegrityControls.identityDigestMethod
  ) {
    fail("Identity digest method changed.");
  }
  if (integrity.boundary !== expectedBoundaries.integrity) {
    fail("Integrity boundary changed.");
  }

  const population = ledger.personalProfile?.population ?? {};
  validateExactKeys(
    ledger.personalProfile,
    [
      "population",
      "explicitOrganizerEvidence",
      "postedSourceRoutes"
    ],
    "$.personalProfile",
    fail
  );
  validateExactKeys(
    population,
    [
      "displayedEventSlots",
      "distinctBaseEventIds",
      "recurringEventTimeInstances",
      "explicitJamieOrganizerRecords",
      "profileAssociatedRecords",
      "eventHostControlPastEvents",
      "unresolvedHostControlCountDifference",
      "range",
      "byYear",
      "boundary"
    ],
    "$.personalProfile.population",
    fail
  );
  const expectedPopulation = {
    displayedEventSlots: 511,
    distinctBaseEventIds: 502,
    recurringEventTimeInstances: 9,
    explicitJamieOrganizerRecords: 20,
    profileAssociatedRecords: 491,
    eventHostControlPastEvents: 21,
    unresolvedHostControlCountDifference: 1
  };
  for (const [key, expected] of Object.entries(expectedPopulation)) {
    if (population[key] !== expected) {
      fail(`population.${key} must equal ${expected}.`);
    }
  }
  if (
    population.explicitJamieOrganizerRecords +
      population.profileAssociatedRecords !==
    population.displayedEventSlots
  ) {
    fail("Organizer and profile-associated counts must reconcile to 511.");
  }
  if (
    population.distinctBaseEventIds +
      population.recurringEventTimeInstances !==
    population.displayedEventSlots
  ) {
    fail("Base IDs plus recurring instances must reconcile to 511.");
  }
  if (
    population.eventHostControlPastEvents -
      population.explicitJamieOrganizerRecords !==
    population.unresolvedHostControlCountDifference
  ) {
    fail("Host-control count discrepancy must remain unresolved and arithmetic.");
  }
  if (population.boundary !== expectedBoundaries.population) {
    fail("Population boundary changed.");
  }
  const byYearTotal = Object.values(population.byYear ?? {}).reduce(
    (sum, value) => sum + Number(value),
    0
  );
  if (byYearTotal !== 511) fail("Year counts must total 511.");
  if (
    JSON.stringify(population.byYear) !==
    JSON.stringify(facebookEventsIntegrityControls.byYear)
  ) {
    fail("Year distribution does not match the protected-capture derivation.");
  }
  if (
    JSON.stringify(population.range) !==
    JSON.stringify(["2006-12-02", "2023-08-26"])
  ) {
    fail("Population range must remain 2006-12-02 through 2023-08-26.");
  }

  const organizer = ledger.personalProfile?.explicitOrganizerEvidence ?? {};
  validateExactKeys(
    organizer,
    [
      "detailRoutesReviewed",
      "detailPagesWithDisplayedResponseCount",
      "eventsAtOrAbove20DisplayedResponses",
      "largestDisplayedResponseCount",
      "displayedResponseCountDistribution",
      "selectedPublicSafeEvents",
      "boundary"
    ],
    "$.personalProfile.explicitOrganizerEvidence",
    fail
  );
  if (organizer.detailRoutesReviewed !== 20) {
    fail("All 20 explicit organizer routes must be reviewed.");
  }
  if (organizer.detailPagesWithDisplayedResponseCount !== 17) {
    fail("Response-label coverage must remain 17 of 20.");
  }
  if (organizer.eventsAtOrAbove20DisplayedResponses !== 6) {
    fail("At-or-above-20 response threshold must remain six events.");
  }
  if (organizer.largestDisplayedResponseCount !== 119) {
    fail("Largest displayed response count must remain 119.");
  }
  if (organizer.boundary !== expectedBoundaries.organizer) {
    fail("Response boundary changed.");
  }
  const responseDistribution = organizer.displayedResponseCountDistribution ?? [];
  if (
    JSON.stringify(responseDistribution) !==
    JSON.stringify(
      facebookEventsIntegrityControls.displayedResponseCountDistribution
    )
  ) {
    fail("Response distribution does not match the protected-capture derivation.");
  }
  if (responseDistribution.length !== organizer.detailPagesWithDisplayedResponseCount) {
    fail("Response distribution must reconcile to detail-page coverage.");
  }
  if (
    responseDistribution.filter((value) => value >= 20).length !==
    organizer.eventsAtOrAbove20DisplayedResponses
  ) {
    fail("Response distribution must reconcile to the threshold aggregate.");
  }
  if (Math.max(...responseDistribution) !== organizer.largestDisplayedResponseCount) {
    fail("Response distribution must reconcile to the maximum.");
  }
  const selected = organizer.selectedPublicSafeEvents ?? [];
  if (selected.length !== 14) fail("Selected public-safe event count must be 14.");
  const selectedIds = new Set();
  for (const [index, event] of selected.entries()) {
    validateExactKeys(
      event,
      ["eventId", "date", "title", "canonicalUrl", "displayedResponses"],
      `$.personalProfile.explicitOrganizerEvidence.selectedPublicSafeEvents[${index}]`,
      fail
    );
    const match = asText(event.canonicalUrl).match(facebookEventUrlPattern);
    if (!match || match[1] !== event.eventId) {
      fail(`Event ${event.eventId ?? "unknown"} has a noncanonical route.`);
    }
    if (selectedIds.has(event.eventId)) {
      fail(`Duplicate selected event ID ${event.eventId}.`);
    }
    selectedIds.add(event.eventId);
    if (!asText(event.title) || !asText(event.date)) {
      fail(`Event ${event.eventId ?? "unknown"} requires title and date.`);
    }
    if (
      event.displayedResponses !== null &&
      (!Number.isInteger(event.displayedResponses) ||
        event.displayedResponses < 0 ||
        event.displayedResponses > 119)
    ) {
      fail(`Event ${event.eventId} has an invalid response display.`);
    }
  }
  const selectedResponses = selected
    .map((event) => event.displayedResponses)
    .filter((value) => Number.isInteger(value));
  if (Math.max(...selectedResponses) !== 119) {
    fail("Selected event response maximum must reconcile to 119.");
  }

  const routes = ledger.personalProfile?.postedSourceRoutes ?? {};
  validateExactKeys(
    routes,
    [
      "explicitOrganizerDetailPagesReviewed",
      "externalArticleDestinationsRecovered",
      "selectedDirectEventRoutes",
      "boundary"
    ],
    "$.personalProfile.postedSourceRoutes",
    fail
  );
  if (
    routes.explicitOrganizerDetailPagesReviewed !== 20 ||
    routes.externalArticleDestinationsRecovered !== 0 ||
    routes.selectedDirectEventRoutes !== 14
  ) {
    fail("Posted-source route accounting changed.");
  }
  if (routes.boundary !== expectedBoundaries.routes) {
    fail("Posted-source boundary changed.");
  }

  const wow = ledger.wowListPage ?? {};
  validateExactKeys(
    wow,
    ["currentProfile", "currentEventsSurface"],
    "$.wowListPage",
    fail
  );
  validateExactKeys(
    wow.currentProfile,
    ["followersDisplay", "followingDisplay", "statement", "publicRoutes", "boundary"],
    "$.wowListPage.currentProfile",
    fail
  );
  validateExactKeys(
    wow.currentEventsSurface,
    [
      "eventDetailAnchors",
      "eventsSectionExposed",
      "visibleAdditionalSectionLabels",
      "historicalPopulationStatus",
      "boundary"
    ],
    "$.wowListPage.currentEventsSurface",
    fail
  );
  if (
    wow.currentEventsSurface?.eventDetailAnchors !== 0 ||
    wow.currentEventsSurface?.eventsSectionExposed !== false ||
    wow.currentEventsSurface?.historicalPopulationStatus !== "unresolved"
  ) {
    fail("WOW List current-surface and historical-status controls changed.");
  }
  if (wow.currentEventsSurface?.boundary !== expectedBoundaries.wowEvents) {
    fail("WOW List event-history boundary changed.");
  }
  if (
    wow.currentProfile?.followersDisplay !== 185 ||
    wow.currentProfile?.followingDisplay !== 2
  ) {
    fail("WOW List dated profile displays changed.");
  }
  if (wow.currentProfile?.boundary !== expectedBoundaries.wowProfile) {
    fail("WOW List profile boundary changed.");
  }
  if (
    JSON.stringify(wow.currentProfile?.publicRoutes) !==
    JSON.stringify(["https://wowlist.org/", "https://wowlist.org/wowlists"])
  ) {
    fail("WOW List public routes changed.");
  }
  if (
    JSON.stringify(wow.currentEventsSurface?.visibleAdditionalSectionLabels) !==
    JSON.stringify(["Live", "Check-ins", "Reviews given"])
  ) {
    fail("WOW List visible section-label controls changed.");
  }

  validateExactKeys(ledger.privacy, ["status", "omitted"], "$.privacy", fail);
  if (ledger.privacy?.status !== "public-safe-minimized-ledger") {
    fail("Privacy status must remain public-safe-minimized-ledger.");
  }
  const omitted = ledger.privacy?.omitted ?? [];
  for (const required of [
    "full personal-profile event index",
    "ordinary-life and non-mission social records",
    "guest, invitee, attendee, friend, commenter, and reactor identities",
    "raw event descriptions, comments, reactions, private controls, and authenticated-session state"
  ]) {
    if (!omitted.includes(required)) {
      fail(`Privacy omissions must include: ${required}.`);
    }
  }

  for (const entry of collectEntries(ledger)) {
    if (typeof entry.value === "string") {
      if (localPathPattern.test(entry.value)) {
        fail(`Local path found at ${entry.path}.`);
      }
      if (emailPattern.test(entry.value)) {
        fail(`Email address found at ${entry.path}.`);
      }
      if (phonePattern.test(entry.value)) {
        fail(`Phone number found at ${entry.path}.`);
      }
      if (credentialValuePattern.test(entry.value)) {
        fail(`Credential-like value found at ${entry.path}.`);
      }
    }
  }
  if (
    Object.keys(organizer).some((key) =>
      /(?:sum|total)(?:Responses?|People|Reach|Engagement)/i.test(key)
    )
  ) {
    fail("Response labels must not be summed into an audience metric.");
  }

  return [...new Set(errors)];
};

export const validateFacebookPersonalWowListEventsManifest = (
  manifest,
  { ledgerText, ledgerSha256 }
) => {
  const errors = [];
  const fail = (message) => errors.push(message);
  validateExactKeys(
    manifest,
    [
      "schemaVersion",
      "capturedAt",
      "status",
      "publicLedger",
      "publicLedgerSha256",
      "publicLedgerBytes",
      "protectedCaptureSha256",
      "protectedCapturePublished",
      "personalProfileDisplayedEventSlots",
      "personalProfileDistinctBaseEventIds",
      "personalProfileExplicitJamieOrganizerRecords",
      "personalProfileAssociatedRecords",
      "personalHostControlPastEvents",
      "personalHostControlCountDifference",
      "wowListCurrentEventAnchors",
      "wowListHistoricalPopulationStatus",
      "scopeNote",
      "publicSafetyNote"
    ],
    "$manifest",
    fail
  );
  if (manifest?.schemaVersion !== 1) errors.push("Manifest schemaVersion must equal 1.");
  if (manifest?.capturedAt !== "2026-07-16") {
    errors.push("Manifest capturedAt must equal 2026-07-16.");
  }
  if (
    manifest?.status !==
    "complete-current-surface-accounting-with-protected-full-index-and-minimized-public-ledger"
  ) {
    errors.push("Manifest status changed.");
  }
  if (manifest?.publicLedgerSha256 !== ledgerSha256) {
    errors.push("Manifest publicLedgerSha256 does not match the ledger.");
  }
  if (manifest?.publicLedgerBytes !== Buffer.byteLength(ledgerText)) {
    errors.push("Manifest publicLedgerBytes does not match the ledger.");
  }
  if (manifest?.protectedCapturePublished !== false) {
    errors.push("Manifest must keep protectedCapturePublished false.");
  }
  if (
    manifest?.protectedCaptureSha256 !==
    facebookEventsIntegrityControls.protectedCaptureSha256
  ) {
    errors.push(
      "Manifest protectedCaptureSha256 does not match the verified capture control."
    );
  }
  if (
    manifest?.publicLedger !==
    "docs/knowledge-bank/corpora/facebook-personal-wowlist-events-public-ledger-2026-07-16.json"
  ) {
    errors.push("Manifest publicLedger path changed.");
  }
  if (manifest?.personalProfileDisplayedEventSlots !== 511) {
    errors.push("Manifest must preserve the 511-card control.");
  }
  if (manifest?.personalProfileDistinctBaseEventIds !== 502) {
    errors.push("Manifest must preserve 502 distinct base event IDs.");
  }
  if (manifest?.personalProfileExplicitJamieOrganizerRecords !== 20) {
    errors.push("Manifest must preserve 20 explicit organizer records.");
  }
  if (manifest?.personalProfileAssociatedRecords !== 491) {
    errors.push("Manifest must preserve 491 profile-associated records.");
  }
  if (manifest?.personalHostControlPastEvents !== 21) {
    errors.push("Manifest must preserve the 21-past-events host display.");
  }
  if (manifest?.personalHostControlCountDifference !== 1) {
    errors.push("Manifest must preserve the one-count host-control discrepancy.");
  }
  if (
    manifest?.wowListCurrentEventAnchors !== 0 ||
    manifest?.wowListHistoricalPopulationStatus !== "unresolved"
  ) {
    errors.push("Manifest must preserve the WOW List current-zero/historical-unresolved distinction.");
  }
  if (
    !/not a native Meta owner export|not a native Meta/i.test(
      manifest?.scopeNote ?? ""
    )
  ) {
    errors.push("Manifest scope note must preserve the owner-export boundary.");
  }
  if (!/full personal index remains protected/i.test(manifest?.publicSafetyNote ?? "")) {
    errors.push("Manifest public-safety note must keep the full index protected.");
  }
  return errors;
};

export const sha256 = (value) =>
  createHash("sha256").update(value).digest("hex");
