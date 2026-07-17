#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";
import {
  isRecurringNycacMeeting,
  nycacEventIdentitySha256,
  nycacEventRecordSha256,
  normalizeNycacEventRouteUrl,
  validateNycacFacebookEventsManifest,
  validateNycacFacebookEventsCorpus
} from "./lib/nycac-facebook-events-validation.mjs";
import {
  nycacReviewer12MalformedMutations,
  nycacReviewer12SafeMutations,
  nycacReviewer12UnsafeMutations
} from "./lib/nycac-facebook-events-adversarial.mjs";

const read = (path) => readFileSync(path, "utf8");
const corpusPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.json";
const corpusText = read(corpusPath);
const corpus = JSON.parse(corpusText);
const manifest = JSON.parse(
  read(
    "docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.manifest.json"
  )
);
const receipt = read(
  "docs/knowledge-bank/runs/2026-07-15-nycac-facebook-events-full-population.md"
);
const projectNote = read(
  "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md"
);
const caseStudy = read("apps/www/src/content/work/fair-rent-nyc.mdx");
const workSource = read("apps/www/src/data/work.ts");
const docs = `${receipt}\n${projectNote}`.replace(/\s+/g, " ");

const checks = [];
const check = (dimension, label, points, passes) =>
  checks.push({ dimension, label, points, passes: Boolean(passes) });
const includesAll = (source, values) =>
  values.every((value) => source.includes(value));
const countBy = (items, selector) =>
  items.reduce((counts, item) => {
    const key = selector(item);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});

const events = corpus.events;
const population = corpus.populationReconciliation;
const eventIds = events.map((event) => event.id);
const sortedEventIdSha256 = createHash("sha256")
  .update([...eventIds].sort().join("\n"))
  .digest("hex");
const corpusSha256 = createHash("sha256").update(corpusText).digest("hex");
const eventIdentitySha256 = nycacEventIdentitySha256(events);
const ledgerRows = projectNote
  .split("\n")
  .filter((line) => /^\| \d{4}-\d{2}-\d{2} \|/.test(line));
const ledgerIsCanonical =
  ledgerRows.length === events.length &&
  ledgerRows.every((row) => {
    const cells = row.split("|").slice(1, -1).map((cell) => cell.trim());
    const eventId = cells[1].match(/facebook\.com\/events\/(\d+)\//)?.[1];
    const event = events.find((candidate) => candidate.id === eventId);
    return Boolean(
      event &&
        cells[0] === event.date &&
        cells[2] ===
          (event.relationToPage === "index-displayed-nycac-organizer"
            ? "Direct"
            : "Cohosted") &&
        cells[3] === (event.venue ?? "Virtual") &&
        cells[4] ===
          (event.responseSnapshot?.respondedDisplay ?? "Not displayed")
    );
  });

check(
  "Population accounting",
  "Every displayed control slot has a recovered-or-unresolved disposition",
  16,
  corpus.page.handle === "nycartc" &&
    corpus.page.selectedSurface === "Past Events" &&
    population.pageDisplayedPastEventCount === 34 &&
    population.recoveredIndexEventCount === 33 &&
    population.recoveredDetailEventCount === 33 &&
    population.unmaterializedCount === 1 &&
    events.length === 33 &&
    new Set(eventIds).size === 33 &&
    ledgerIsCanonical &&
    sortedEventIdSha256 ===
      "b9e63a508958e7b7ed71236803aef60bc597123b1ff5c497550df90c80fe09fc" &&
    corpusSha256 ===
      "1562bb57fa58d788e8171f2efb98c71be47f42099482320ab113d631925e545e" &&
    manifest.currentReplay.terminalStableCount === 33 &&
    manifest.eventIdentitySha256 === eventIdentitySha256 &&
    includesAll(docs, [
      "33 recovered event records and one unresolved historical slot",
      "100 percent control-slot accounting",
      "not 100 percent historical content recovery",
      "native Meta owner export"
    ])
);

const years = countBy(events, (event) => event.date.slice(0, 4));
const direct = events.filter(
  (event) => event.relationToPage === "index-displayed-nycac-organizer"
);
const allied = events.filter(
  (event) => event.relationToPage === "allied-or-cohosted-listing"
);
check(
  "Chronology and relationships",
  "Dates and organizer relationships reproduce without becoming authorship",
  10,
  JSON.stringify(years) ===
    JSON.stringify({ 2017: 17, 2018: 3, 2019: 6, 2020: 6, 2021: 1 }) &&
    direct.length === 24 &&
    allied.length === 9 &&
    events[0].date === "2017-01-27" &&
    events.at(-1).date === "2021-01-29" &&
    includesAll(docs, [
      "Twenty-four index cards",
      "nine are allied or cohosted",
      "do not identify the individual author or producer"
    ])
);

const recurringClassification =
  corpus.derivedClassifications.recurringCoalitionMeetings;
const recurring = events.filter(isRecurringNycacMeeting);
const physicalRecurring = recurring.filter(
  (event) => event.venueCategory !== "virtual"
);
check(
  "Participation system",
  "The recurring rotating-space pattern and its limits remain explicit",
  14,
  recurring.length === 12 &&
    JSON.stringify(recurringClassification.eventIds) ===
      JSON.stringify(recurring.map((event) => event.id)) &&
    physicalRecurring.length === 10 &&
    recurring.length - physicalRecurring.length === 2 &&
    recurringClassification.physicalEventCount === 10 &&
    recurringClassification.virtualEventCount === 2 &&
    recurringClassification.method.includes("Deterministic classification") &&
    new Set(physicalRecurring.map((event) => event.venue)).size === 10 &&
    includesAll(docs, [
      "Magick City",
      "The Floasis",
      "Muchmore's",
      "The City Reliquary",
      "Shoestring Press",
      "Chinatown Soup",
      "Secret Project Robot",
      "Friends and Lovers",
      "Flowers for all Occasions",
      "Ode to Babel",
      "does not prove that a meeting occurred every calendar month"
    ])
);

const topicCounts = {};
for (const event of events) {
  for (const topic of event.topics) {
    topicCounts[topic] = (topicCounts[topic] ?? 0) + 1;
  }
}
check(
  "Mission classification",
  "Civic, cultural, safety, policy, and relief classifications reproduce",
  10,
  Object.entries({
    "participatory-convening": 29,
    "government-interface": 15,
    "cultural-planning": 12,
    "safety-and-compliance": 12,
    "cabaret-law-repeal": 11,
    "commercial-rent-and-displacement": 10,
    "cultural-space-defense": 8,
    "nightlife-governance": 7,
    "mutual-aid-and-relief": 6,
    "march-enforcement": 5,
    "cultural-fundraising": 1
  }).every(([topic, count]) => topicCounts[topic] === count) &&
    events.filter((event) =>
      ["cultural-or-community-space", "community-meeting-place"].includes(
        event.venueCategory
      )
    ).length === 15 &&
    events.filter((event) => event.venueCategory === "government").length === 9
);

const articlePublishers = corpus.postedSourceArticles.map(
  (article) => article.publisher
);
const articleSourceIds = [
  "SRC-NYCAC-NYPOST-FOOTLOOSE-2017-04-08",
  "SRC-PRESS-WNYC-BUREAUCRATIC-DANCE-2017",
  "SRC-PRESS-METRO-CABARET-LAWS-2017",
  "SRC-PRESS-NEW-YORKER-DANCE-OUTLAWS-2017",
  "SRC-PRESS-BAFFLER-CUT-THE-MUSIC",
  "SRC-PRESS-CURBED-COMMERCIAL-RENT-2019",
  "SRC-NYCAC-GOTHAMIST-COMMERCIAL-RENT-2019-11-06"
];
const eventById = new Map(events.map((event) => [event.id, event]));
const routedArticleSources = articleSourceIds.map((id) =>
  knowledgeBank.sources.find((source) => source.id === id)
);
const withheldLinks = events.reduce(
  (sum, event) => sum + event.withheldOutboundLinkCount,
  0
);
check(
  "Source routing",
  "Seven article routes and protected-link dispositions remain auditable",
  10,
  corpus.postedSourceArticles.length === 7 &&
    new Set(articlePublishers).size === 7 &&
    [
      "New York Post",
      "WNYC",
      "Metro",
      "The New Yorker",
      "The Baffler",
      "Curbed",
      "Gothamist"
    ].every((publisher) => articlePublishers.includes(publisher)) &&
    corpus.postedSourceArticles.every((article, index) => {
      const event = eventById.get(article.eventId);
      const source = routedArticleSources[index];
      return event?.title === article.eventTitle &&
        /^https?:\/\//.test(article.url) &&
        event.outboundResources.some(
          (resource) =>
            resource.resourceType === "source-article" &&
            normalizeNycacEventRouteUrl(resource.url) ===
              normalizeNycacEventRouteUrl(article.url)
        ) &&
        typeof source?.canonicalUrl === "string" &&
        normalizeNycacEventRouteUrl(source.canonicalUrl) ===
          normalizeNycacEventRouteUrl(article.url);
    }) &&
    new Set(
      corpus.postedSourceArticles.map(
        (article) => `${article.eventId}\n${article.url}`
      )
    ).size === 7 &&
    withheldLinks === 13 &&
    includesAll(docs, [
      "establishes a source route",
      "does not mean every host or participant adopted every statement",
      "does not turn that person or institution into an endorser"
    ])
);

const responses = events.filter(
  (event) => typeof event.responseSnapshot?.pointEstimate === "number"
);
check(
  "Traction boundary",
  "Response thresholds reproduce without becoming attendance or unique reach",
  10,
  responses.length === 32 &&
    corpus.aggregateSnapshot.eventsWithDisplayedResponseCount === 32 &&
    corpus.aggregateSnapshot.roundedResponseCountEvents === 3 &&
    !("responseActionPointEstimate" in corpus.aggregateSnapshot) &&
    !corpusText.includes('"responseActionPointEstimate"') &&
    responses.filter((event) => event.responseSnapshot.pointEstimate >= 100)
      .length === corpus.aggregateSnapshot.eventsAtOrAbove100Responses &&
    responses.filter((event) => event.responseSnapshot.pointEstimate >= 500)
      .length === corpus.aggregateSnapshot.eventsAtOrAbove500Responses &&
    responses.filter((event) => event.responseSnapshot.pointEstimate >= 1000)
      .length === corpus.aggregateSnapshot.eventsAtOrAbove1000Responses &&
    includesAll(docs, [
      "not verified attendance",
      "unique people",
      "not summed into a people-reached claim"
    ]) &&
    !caseStudy.includes("9,989")
);

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const populationIntake = knowledgeBank.intakes.find(
  (item) => item.id === "INTAKE-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026"
);
const memoryIntake = knowledgeBank.intakes.find(
  (item) => item.id === "INTAKE-NYCAC-FACEBOOK-EVENT-PRACTICE-MEMORY-2026"
);
const participationClaim = claimById.get("CLM-NYCAC-PARTICIPATION-SYSTEM");
const responseClaim = claimById.get(
  "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS"
);
const democracyClaim = claimById.get(
  "CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE"
);
const stakeholderClaim = claimById.get(
  "CLM-NYCAC-FACEBOOK-EVENT-STAKEHOLDER-INTERFACES"
);
const intakeSourceUnion = new Set([
  ...(populationIntake?.sourceIds ?? []),
  ...(memoryIntake?.sourceIds ?? [])
]);
check(
  "Lifecycle integration",
  "The pass reaches intakes, sources, claims, inquiries, and public-safe artifacts",
  14,
    populationIntake?.maturity === "decomposed" &&
    populationIntake.sourceIds.length === 10 &&
    populationIntake.claimIds.length === 5 &&
    memoryIntake?.maturity === "decomposed" &&
    memoryIntake.sourceIds.length === 5 &&
    memoryIntake.claimIds.length === 1 &&
    intakeSourceUnion.size === 14 &&
    docs.includes("Fourteen linked source records across the two intakes") &&
    sourceById.has("SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026") &&
    sourceById.has("SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026") &&
    sourceById.has("SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026") &&
    sourceById.has("SRC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-ROLE-2026") &&
    articleSourceIds.every((id) => sourceById.has(id)) &&
    participationClaim?.status === "confirmed-with-boundary" &&
    responseClaim?.status === "use-with-care" &&
    democracyClaim?.status === "inference" &&
    stakeholderClaim?.status === "confirmed-with-boundary" &&
    inquiryById.get("INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT")
      ?.resultStatus === "partially-recovered" &&
    inquiryById.get("INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE")
      ?.resultStatus === "partially-recovered" &&
    inquiryById.get("INQ-NYCAC-FACEBOOK-EVENT-ARTICLE-CLOSE-READING")
      ?.sourceIds.length === 7
);

const stakeholderNames = [
  "Department of Cultural Affairs",
  "Office of the NYC Public Advocate",
  "ANHD",
  "Cooper Square Committee",
  "TakeRoot Justice",
  "League of Independent Theater",
  "Dance Liberation Network",
  "House Coalition"
];
check(
  "Stakeholder interfaces",
  "Named cross-sector interfaces resolve to corpus metadata and preserve the endorsement boundary",
  8,
  stakeholderClaim?.projections.length === 1 &&
    stakeholderClaim.projections[0].status === "active" &&
    stakeholderClaim.projections[0].surfaces.length === 1 &&
    stakeholderClaim.projections[0].surfaces[0] ===
      "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events" &&
    stakeholderClaim.evidence.length === 1 &&
    stakeholderClaim.evidence[0].sourceId ===
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026" &&
    stakeholderNames.every(
      (name) => corpusText.includes(name) && docs.includes(name)
    ) &&
    !docs.includes("Council Member Rafael Espinal") &&
    !docs.includes("State Senator Julia Salazar") &&
    !docs.includes("Street Vendor Project") &&
    includesAll(docs, [
      "establishes an event-level interface",
      "prove attendance",
      "continuing partnership beyond the event"
    ])
);

const approvedProjection =
  "Beginning in 2017, I helped establish and produce NYC Artist Coalition's recurring participation system: public event pages, meetings rotating through small cultural spaces, practical safety and legal sessions, town halls, hearings, campaign actions, and relief convenings that connected artists' lived experience with civic pathways.";
const fairRentPage = knowledgeBank.pages.find((page) => page.id === "fair-rent-nyc");
const proof = proofClaims.find(
  (item) => item.id === "nyc-artist-coalition-participation-system"
);
check(
  "Projection discipline",
  "One attributed role claim is selected while fragile metrics and interpretations stay held",
  8,
  participationClaim?.projections.length === 1 &&
    participationClaim.projections[0].status === "active" &&
    participationClaim.projections[0].text === approvedProjection &&
    participationClaim.projections[0].surfaces.length === 1 &&
    participationClaim.projections[0].surfaces[0] === "/work/fair-rent-nyc" &&
    responseClaim?.projections.every(
      (projection) => projection.status === "hold" && !projection.surfaces.length
    ) &&
    democracyClaim?.projections.every(
      (projection) => projection.status === "hold" && !projection.surfaces.length
    ) &&
    fairRentPage?.occurrences.some(
      (occurrence) =>
        occurrence.id === "coalition-participation-system" &&
        occurrence.claimId === "CLM-NYCAC-PARTICIPATION-SYSTEM"
    ) &&
    proof?.publicWording ===
      "Jamie helped establish and produce NYC Artist Coalition's recurring participation system across rotating cultural-space meetings, practical support sessions, public actions, hearings, and relief convenings." &&
    proof.doNotSay.includes(
      "Jamie solely produced every NYC Artist Coalition event"
    ) &&
    proof.doNotSay.includes("Facebook responses equal attendance or unique reach") &&
    workSource.includes('"nyc-artist-coalition-participation-system"') &&
    includesAll(caseStudy, [
      'claimId="CLM-NYCAC-PARTICIPATION-SYSTEM"',
      "not a claim to authorship of every event or policy outcome",
      "Facebook responses are not attendance",
      "does not establish endorsement, a continuing partnership, or policy causality"
    ])
);

const unsafeShape = structuredClone(corpus);
unsafeShape.events[0].rawBody = "Guest guest@example.com";
unsafeShape.events[0].attendees = ["Example attendee"];
unsafeShape.events[0].meetingPasscode = "123456";
const unsafeValue = structuredClone(corpus);
unsafeValue.events[0].venue = "guest@example.com / 212-555-1212";
const privateTitle = structuredClone(corpus);
privateTitle.events[0].title =
  "Attendee Jane Doe described a sensitive housing case in confidence";
const privateVenue = structuredClone(corpus);
privateVenue.events[0].venue =
  "Full private coalition note follows with participant narrative";
const unformattedPhone = structuredClone(corpus);
unformattedPhone.events[0].title = "Call 2125551212";
const meetingAccessUrl = structuredClone(corpus);
meetingAccessUrl.events[0].outboundResources[0] = {
  url: "https://zoom.us/j/123456789",
  host: "zoom.us",
  resourceType: "mission-resource"
};
const topicDrift = structuredClone(corpus);
topicDrift.events[0].topics.push("raw-participant-testimony");
const recurrenceTitleContradiction = structuredClone(corpus);
recurrenceTitleContradiction.events.find(
  (event) => event.id === "406505576359490"
).title = "One-off unrelated fundraiser";
const recurrenceIdSwap = structuredClone(corpus);
const recurrenceIds =
  recurrenceIdSwap.derivedClassifications.recurringCoalitionMeetings.eventIds;
recurrenceIds[recurrenceIds.indexOf("406505576359490")] = "1907948219437421";
const aggregateContradiction = structuredClone(corpus);
aggregateContradiction.aggregateSnapshot.eventsAtOrAbove100Responses = 999;
const responseContradiction = structuredClone(corpus);
responseContradiction.events[0].responseSnapshot.pointEstimate = 446;
const setOutboundQueryValue = (candidate, parameter, value) => {
  candidate.events[0].outboundResources[0] = {
    url: `https://nycartc.com/public?${parameter}=${encodeURIComponent(value)}`,
    host: "nycartc.com",
    resourceType: "mission-resource"
  };
};
const encodeBase64 = (value) => Buffer.from(value).toString("base64");
const encodeBase64Twice = (value) => encodeBase64(encodeBase64(value));
const encodeBase64Repeatedly = (value, rounds) => {
  let encoded = value;
  for (let round = 0; round < rounds; round += 1) encoded = encodeBase64(encoded);
  return encoded;
};
const encodeUrlRepeatedly = (value, rounds) => {
  let encoded = value;
  for (let round = 0; round < rounds; round += 1) {
    encoded = encodeURIComponent(encoded);
  }
  return encoded;
};
const outboundSensitiveValues = [
  ["note", ["xapp", "-", "1234567890abcdefghijklmnop"].join("")],
  ["note", ["sk", "_live_", "1234567890abcdefghijklmnop"].join("")],
  ["note", ["rk", "_live_", "1234567890abcdefghijklmnop"].join("")],
  ["note", ["Bear", "er shortcred"].join("")],
  ["note", ["+44", " 20", " 7946", " 0958"].join("")],
  ["note", "A participant disclosed chemotherapy and housing instability"],
  ["note", "A participant was forced from their home"],
  ["note", encodeBase64Twice(["guest", "@example.com"].join(""))],
  [
    "note",
    encodeBase64Twice(["https://", "zoom.us/j/123456789"].join(""))
  ],
  ["note", encodeBase64(["meet.google.com", "/abc-defg-hij"].join(""))],
  ["note", ["/etc", "/private.conf"].join("")],
  ["note", ["/srv", "/private/session.json"].join("")],
  ["note", ["/Library", "/Application Support/private.json"].join("")],
  ["note", ["./private", "/session.json"].join("")],
  ["note", encodeBase64(["a", "@b.co"].join(""))],
  ["note", ["+44", " (0)20", " 7946", " 0958"].join("")],
  ["note", ["00", "44 20", " 7946", " 0958"].join("")],
  ["note", ["npm", "_", "123456789012345678901234567890"].join("")],
  ["note", ["glpat", "-", "12345678901234567890"].join("")],
  ["note", ["hf", "_", "123456789012345678901234567890"].join("")],
  ["note", ["Bear", "er abc123"].join("")],
  ["note", "Resident Jane disclosed a serious medical condition"],
  ["note", "Resident Jane is undergoing chemo for leukemia"],
  ["note", "Resident Jane faces eviction next week"],
  ["note", "Resident Jane is unhoused after losing housing"],
  ["note", "Resident Jane is receiving chemo"],
  ["note", "Resident Jane has cancer"],
  ["note", "Resident Jane is facing housing loss"],
  ["note", "Resident Jane is receiving chemotherapy"],
  ["note", "Resident Jane is living with cancer"],
  ["note", "Resident Jane reports housing loss"],
  ["note", "Resident Jane is at risk of eviction"],
  ["note", "Resident Jane was diagnosed with leukemia"],
  ["note", "Resident Jane discussed treatment"],
  ["note", "Resident Jane reports housing-loss"],
  ["note", "Resident Jane reports housing_loss"],
  ["note", "Resident Jane reports housing.loss"],
  ["note", "Resident Jane is at-risk of eviction"],
  ["note", "Resident Jane is at_risk of eviction"],
  ["note", "Resident Jane is living-with-cancer"],
  ["note", "Resident Jane was diagnosed-with-leukemia"],
  ["note", "Resident Jane discussed treatments"],
  ["note", "Resident Jane is being treated for leukemia"],
  ["note", "Resident Jane is treating cancer"],
  ["note", "Resident Jane has multiple cancer diagnoses"],
  ["note", "Resident Jane has housing lost"],
  ["note", "Resident Jane received chemotherapies"],
  ["note", "Resident Jane was medically treated"],
  ["note", "Resident Jane has medical conditions"],
  ["note", "RESIDENT JANE IS RECEIVING CHEMOTHERAPY"],
  ["note", "Resident Jane is livingWithCancer"],
  ["note", "Resident Jane faced eviction"],
  ["note", "Resident Jane is being evicted"],
  ["note", "Attendees include Jane"],
  ["note", "Participants include Jane"],
  ["note", "Guest lists include Jane"],
  ["note", "Attendance count 47"],
  ["note", "participantRoster includes Jane"],
  ["note", "secret-tokens=credentialvalue"],
  ["note", "accessTokens=credentialvalue"],
  ["note", "auth.tokens=credentialvalue"],
  ["note", "api_keys=credentialvalue"],
  ["note", "[credentials]=credentialvalue"],
  ["note", "x-amz-credential=credentialvalue"],
  ["note", ["person", "\uFF20", "example", "\uFF0E", "invalid"].join("")],
  ["note", ["person", "\u200B", "@example.invalid"].join("")],
  ["note", "Participants: Person Alpha, Person Beta"],
  ["note", "Roster of participants - Person Alpha; Person Beta"],
  ["note", "Resident Alpha receives dialysis"],
  ["note", "Resident Alpha takes insulin for diabetes"],
  ["note", "Resident Alpha became homeless"],
  ["note", "Resident Alpha faces foreclosure on their home"],
  ["note", "/mnt/workspace/private/session.json"],
  ["note", "D:\\Profiles\\Reviewer\\private\\session.json"],
  ["note", ["212", "555", "1212"].join("")],
  ["note", ["(212)", " 555", "-1212"].join("")],
  ["note", ["+1", " (212)", " 555", "-1212"].join("")],
  ["note", ["~/private", "/session.json"].join("")],
  ["note", ["private", "/session.json"].join("")],
  ["note", encodeBase64Repeatedly(["a", "@b.co"].join(""), 12)]
];
const additionalCredentialParameters = [
  "x-amz-signature",
  "x-amz-credential",
  "refresh_token",
  "private_key",
  "private_token",
  "access_key",
  "secret_key",
  "secret_token",
  "private-token",
  "secret-token",
  "access-token",
  "auth-token",
  "session_token",
  "x-amz-security-token",
  "access_key_id",
  "sig",
  "private_tokens",
  "secret_tokens",
  "access_tokens",
  "auth_tokens",
  "tokens",
  "api_keys",
  "credentials",
  "passwords",
  "passcodes",
  "secrets",
  "secret_keys",
  "private_keys",
  "access_keys",
  "signatures",
  "meeting_ids",
  "jwts",
  "codes",
  "apiToken",
  "apiTokens",
  "oauthToken",
  "clientToken",
  "meetingCode",
  "roomCode"
];
const outboundUnsafeMutations = [
  ...outboundSensitiveValues.flatMap(([parameter, value]) => [
    (candidate) => setOutboundQueryValue(candidate, parameter, value),
    (candidate) => {
      candidate.events[0].outboundResources[0] = {
        url: `https://nycartc.com/public?${parameter}=${encodeUrlRepeatedly(value, 3)}`,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    },
    (candidate) =>
      setOutboundQueryValue(
        candidate,
        parameter,
        encodeBase64Repeatedly(value, 3)
      ),
    (candidate) =>
      setOutboundQueryValue(candidate, parameter, encodeBase64(value)),
    (candidate) =>
      setOutboundQueryValue(
        candidate,
        parameter,
        encodeBase64Repeatedly(value, 12)
      ),
    (candidate) => {
      const encoded = Buffer.from(value).toString("base64url");
      candidate.events[0].outboundResources[0] = {
        url: `https://nycartc.com/public/${encoded}`,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    },
    (candidate) => {
      const encoded = Buffer.from(value).toString("base64url");
      candidate.events[0].outboundResources[0] = {
        url: `https://nycartc.com/public#${encoded}`,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    },
    (candidate) =>
      setOutboundQueryValue(
        candidate,
        parameter,
        encodeBase64(encodeUrlRepeatedly(encodeBase64(value), 3))
      )
  ]),
  ...additionalCredentialParameters.flatMap((parameter) => [
    (candidate) => setOutboundQueryValue(candidate, parameter, "credentialvalue"),
    (candidate) => setOutboundQueryValue(candidate, parameter, ""),
    (candidate) => {
      candidate.events[0].outboundResources[0] = {
        url: `https://nycartc.com/public?${encodeUrlRepeatedly(parameter, 3)}=credentialvalue`,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    },
    (candidate) => {
      const encodedKey = encodeBase64(parameter);
      candidate.events[0].outboundResources[0] = {
        url: `https://nycartc.com/public?${encodeURIComponent(encodedKey)}=credentialvalue`,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    },
    (candidate) => {
      const encodedKey = encodeBase64(parameter);
      candidate.events[0].outboundResources[0] = {
        url: `https://nycartc.com/public?${encodeURIComponent(encodedKey)}=`,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    },
    (candidate) => {
      const encodedKey = encodeBase64(
        encodeUrlRepeatedly(encodeBase64(parameter), 2)
      );
      candidate.events[0].outboundResources[0] = {
        url: `https://nycartc.com/public?${encodeURIComponent(encodedKey)}=credentialvalue`,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    },
    ...[1, 3, 12].map(
      (rounds) => (candidate) =>
        setOutboundQueryValue(
          candidate,
          parameter,
          encodeBase64Repeatedly("credentialvalue", rounds)
        )
    ),
    (candidate) =>
      setOutboundQueryValue(
        candidate,
        parameter,
        encodeBase64(
          encodeUrlRepeatedly(encodeBase64("credentialvalue"), 3)
        )
      )
  ])
];
const additionalUnsafeMutations = [
  (candidate) => {
    candidate.events[0].title =
      "Participant Jane Doe shared her eviction and medical history";
  },
  (candidate) => {
    candidate.events[0].title = "Call (212)555-1212 for details";
  },
  (candidate) => {
    candidate.events[0].title =
      `Token ${["xox", "b-123456789012-123456789012-abcdefghijklmnopqrstuv"].join("")}`;
  },
  (candidate) => {
    candidate.events[0].title =
      `Token ${["github", "_pat_11AA00_exampleexampleexample"].join("")}`;
  },
  (candidate) => {
    candidate.events[0].title = "Capture at /tmp/facebook-session.json";
  },
  (candidate) => {
    candidate.events[0].title =
      "Join https://example.webex.com/meet/private-room";
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/internal?api_key=supersecretvalue",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].title =
      "Private: Jane Doe was evicted and is HIV-positive";
  },
  (candidate) => {
    candidate.events[0].title =
      "Jane Doe was evicted after disclosing an HIV diagnosis";
  },
  (candidate) => {
    candidate.events[0].title =
      ["gh", "o_123456789012345678901234567890123456"].join("");
  },
  (candidate) => {
    candidate.events[0].title =
      ["gh", "u_123456789012345678901234567890123456"].join("");
  },
  (candidate) => {
    candidate.events[0].title =
      ["Bear", "er abcdefghijklmnopqrstuvwxyz123456"].join("");
  },
  ...[
    "Jane told us she lost her apartment after a cancer diagnosis",
    "Call 212/555/1212 for details",
    "Call 212\u2013555\u20131212 for details",
    ["xox", "c-123456789012-abcdefghijklmnopqrstuvwxyz"].join(""),
    ["xox", "e.xoxp-1-abcdefghijklmnopqrstuvwxyz"].join(""),
    ["AI", "zaSyDUMMYDUMMYDUMMYDUMMYDUMMY12345"].join(""),
    ["S", "G.abcdefghijklmnopqrstuv.abcdefghijklmnopqrstuvwxyz1234567890"].join(""),
    ["S", "K0123456789abcdef0123456789abcdef"].join(""),
    ["AS", "IAIOSFODNN7EXAMPLE"].join(""),
    ["Bear", "er abcdefghijkl"].join(""),
    "/root/.ssh/id_rsa",
    "~/Library/Application Support/private/session.json",
    "/opt/private/session.json"
  ].map(
    (value) => (candidate) => {
      candidate.events[0].title = value;
    }
  ),
  ...["token", "key", "code", "secret"].map(
    (parameter) => (candidate) => {
      candidate.events[0].outboundResources[0] = {
        url: `https://nycartc.com/public?${parameter}=supersecretvalue`,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    }
  ),
  ...[
    "api_secret",
    "authorization",
    "credential",
    "signature",
    "jwt"
  ].map(
    (parameter) => (candidate) => {
      candidate.events[0].outboundResources[0] = {
        url: `https://nycartc.com/public?${parameter}=supersecretvalue`,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    }
  ),
  ...outboundUnsafeMutations,
  ...[
    "https://nycartc.com/public?phone=%2B1%20(212)%20555-1212",
    "https://nycartc.com/public?note=participant-Jane-shared-private-eviction-history-in-confidence",
    "https://nycartc.com/public?contact=guest%40example.com",
    "https://nycartc.com/public?token=xoxb%2D123456789012%2D123456789012%2Dabcdefghijklmnopqrstuv",
    "https://nycartc.com/public?source=%2FUsers%2Freviewer%2Fprivate.json",
    "https://nycartc.com/redirect?to=https://example.webex.com/meet/private-room",
    "https://nycartc.com/redirect?to=https://meet.jit.si/private-room",
    "https://nycartc.com/redirect?to=https%3A%2F%2Fzoom.us%2Fj%2F123456789",
    "https://nycartc.com/public?note=SmFuZSB3YXMgZXZpY3RlZCBhZnRlciBhIGNhbmNlciBkaWFnbm9zaXM=",
    "https://nycartc.com/public?contact=%2525252540example.com",
    "https://nycartc.com/redirect?to=meet.google.com%2Fabc-defg-hij"
  ].map(
    (url) => (candidate) => {
      candidate.events[0].outboundResources[0] = {
        url,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    }
  ),
  (candidate) => {
    candidate.events[1].indexOrganizerDisplay = "Unrelated Private Company";
  },
  (candidate) => {
    candidate.events[0].indexOrganizerDisplay = "NYC Artist Coalition";
  },
  (candidate) => {
    candidate.postedSourceArticles[0].publisher = "Gothamist";
  },
  (candidate) => {
    candidate.postedSourceArticles[0].title = "Unrelated public article";
  },
  (candidate) => {
    const article = candidate.postedSourceArticles[0];
    const originalEvent = candidate.events.find(
      (event) => event.id === article.eventId
    );
    const targetEvent = candidate.events.find(
      (event) => event.id === "107158013279474"
    );
    const route = originalEvent.outboundResources.find(
      (resource) =>
        resource.resourceType === "source-article" &&
        resource.url.includes("nypost.com")
    );
    targetEvent.outboundResources.push(structuredClone(route));
    article.eventId = targetEvent.id;
    article.eventTitle = targetEvent.title;
  },
  (candidate) => {
    candidate.events[0].responseSnapshot.wentDisplay = "1";
    candidate.events[0].responseSnapshot.interestedDisplay = "1";
  },
  (candidate) => {
    candidate.events[0].responseSnapshot.wentDisplay = "1.2K";
  },
  (candidate) => {
    candidate.events[0].responseSnapshot.respondedDisplay = "0445";
  },
  (candidate) => {
    const response = candidate.events[0].responseSnapshot;
    response.respondedDisplay = "446";
    response.wentDisplay = "142";
    response.interestedDisplay = "304";
    response.pointEstimate = 446;
  },
  (candidate) => {
    const event = candidate.events.find(
      (item) => item.id === "107158013279474"
    );
    event.responseSnapshot.respondedDisplay = "101";
    event.responseSnapshot.wentDisplay = "40";
    event.responseSnapshot.interestedDisplay = "61";
    event.responseSnapshot.pointEstimate = 101;
    candidate.aggregateSnapshot.eventsAtOrAbove100Responses += 1;
  },
  (candidate) => {
    const event = candidate.events.find(
      (item) => item.id === "406505576359490"
    );
    event.venueCategory = "virtual";
    const recurring = candidate.events.filter(isRecurringNycacMeeting);
    const virtual = recurring.filter(
      (item) => item.venueCategory === "virtual"
    ).length;
    candidate.derivedClassifications.recurringCoalitionMeetings.physicalEventCount =
      recurring.length - virtual;
    candidate.derivedClassifications.recurringCoalitionMeetings.virtualEventCount =
      virtual;
  },
  (candidate) => {
    const first = candidate.events[1];
    const second = candidate.events[2];
    [first.id, second.id] = [second.id, first.id];
    first.url = `https://www.facebook.com/events/${first.id}/`;
    second.url = `https://www.facebook.com/events/${second.id}/`;
    candidate.derivedClassifications.recurringCoalitionMeetings.eventIds =
      candidate.events.filter(isRecurringNycacMeeting).map((event) => event.id);
  },
  (candidate) => {
    candidate.events.at(-1).date = "2021-02-31";
    candidate.events.at(-1).dateLabel = "Sun, Feb 31, 2021";
  }
];
const additionalUnsafeVariants = additionalUnsafeMutations.map((mutate) => {
  const candidate = structuredClone(corpus);
  mutate(candidate);
  return candidate;
});
const reviewedEventRecordSha256 = nycacEventRecordSha256(corpus.events);
const outboundUnsafeVariants = outboundUnsafeMutations.map((mutate) => {
  const candidate = structuredClone(corpus);
  mutate(candidate);
  return candidate;
});
const numericArticlePath = structuredClone(corpus);
numericArticlePath.events[0].outboundResources[0] = {
  url: "https://nycartc.com/archive/20191216190533/20953724/1234567890/public-article",
  host: "nycartc.com",
  resourceType: "mission-resource"
};
const publicTreatmentPolicy = structuredClone(corpus);
publicTreatmentPolicy.events[0].outboundResources[0] = {
  url: "https://nycartc.com/public?metadata=treatment%20of%20artists%20under%20the%20law",
  host: "nycartc.com",
  resourceType: "mission-resource"
};
const publicParticipantEditorial = structuredClone(corpus);
publicParticipantEditorial.events[0].outboundResources[0] = {
  url: "https://nycartc.com/public?metadata=Participant%20input%20informed%20the%20public%20meeting%20agenda",
  host: "nycartc.com",
  resourceType: "mission-resource"
};
const publicTreatmentEditorial = structuredClone(corpus);
publicTreatmentEditorial.events[0].outboundResources[0] = {
  url: "https://nycartc.com/public?metadata=Editors%20discussed%20treatment%20of%20artists%20under%20the%20law",
  host: "nycartc.com",
  resourceType: "mission-resource"
};
const malformedResourceArray = structuredClone(corpus);
malformedResourceArray.events[0].outboundResources = null;
let malformedResourceFailures = [];
let malformedResourceThrew = false;
try {
  malformedResourceFailures = validateNycacFacebookEventsCorpus(
    malformedResourceArray
  );
} catch {
  malformedResourceThrew = true;
}
const malformedResourceEntry = structuredClone(corpus);
malformedResourceEntry.events[0].outboundResources = [null];
let malformedResourceEntryFailures = [];
let malformedResourceEntryThrew = false;
try {
  malformedResourceEntryFailures = validateNycacFacebookEventsCorpus(
    malformedResourceEntry
  );
} catch {
  malformedResourceEntryThrew = true;
}
const malformedEventResults = [null, {}, undefined].map((malformedEvent) => {
  const candidate = structuredClone(corpus);
  candidate.events[1] = malformedEvent;
  try {
    return {
      failures: validateNycacFacebookEventsCorpus(candidate),
      threw: false
    };
  } catch {
    return { failures: [], threw: true };
  }
});
const invalidArticleResource = structuredClone(corpus);
invalidArticleResource.events
  .find((event) => event.id === "472114119789400")
  .outboundResources.find(
    (resource) => resource.resourceType === "source-article"
  ).url = "not a url";
let invalidArticleResourceFailures = [];
let invalidArticleResourceThrew = false;
try {
  invalidArticleResourceFailures = validateNycacFacebookEventsCorpus(
    invalidArticleResource
  );
} catch {
  invalidArticleResourceThrew = true;
}
const nonStringResourceUrl = structuredClone(corpus);
nonStringResourceUrl.events[0].outboundResources[0].url = new URL(
  nonStringResourceUrl.events[0].outboundResources[0].url
);
const arrayArticleUrl = structuredClone(corpus);
arrayArticleUrl.postedSourceArticles[0].url = [
  arrayArticleUrl.postedSourceArticles[0].url
];
let arrayArticleUrlFailures = [];
let arrayArticleUrlThrew = false;
try {
  arrayArticleUrlFailures = validateNycacFacebookEventsCorpus(arrayArticleUrl);
} catch {
  arrayArticleUrlThrew = true;
}
const runAdversarialMutation = ({ label, mutate }, expectRejected) => {
  const candidate = structuredClone(corpus);
  mutate(candidate);
  try {
    const failures = validateNycacFacebookEventsCorpus(candidate);
    return {
      label,
      passes: expectRejected ? failures.length > 0 : failures.length === 0
    };
  } catch {
    return { label, passes: false };
  }
};
const reviewer12UnsafeResults = nycacReviewer12UnsafeMutations.map((mutation) =>
  runAdversarialMutation(mutation, true)
);
const reviewer12SafeResults = nycacReviewer12SafeMutations.map((mutation) =>
  runAdversarialMutation(mutation, false)
);
const reviewer12MalformedResults = nycacReviewer12MalformedMutations.map(
  (mutation) => runAdversarialMutation(mutation, true)
);
const unsafeManifest = structuredClone(manifest);
unsafeManifest.rawCaptureLocation =
  "/Users/reviewer/private/facebook-session-export.json";
check(
  "Public safety",
  "The metadata-only corpus is hash-locked and excludes personal, raw, and authenticated data",
  8,
  corpus.publicSafety.rawDescriptionsPublished === false &&
    corpus.publicSafety.attendeeIdentitiesPublished === false &&
    corpus.publicSafety.contactDetailsPublished === false &&
    corpus.publicSafety.accessCredentialsPublished === false &&
    validateNycacFacebookEventsCorpus(corpus).length === 0 &&
    validateNycacFacebookEventsCorpus(unsafeShape).length > 0 &&
    validateNycacFacebookEventsCorpus(unsafeValue).length > 0 &&
    validateNycacFacebookEventsCorpus(privateTitle).length > 0 &&
    validateNycacFacebookEventsCorpus(privateVenue).length > 0 &&
    validateNycacFacebookEventsCorpus(unformattedPhone).length > 0 &&
    validateNycacFacebookEventsCorpus(meetingAccessUrl).length > 0 &&
    validateNycacFacebookEventsCorpus(topicDrift).length > 0 &&
    validateNycacFacebookEventsCorpus(recurrenceTitleContradiction).length > 0 &&
    validateNycacFacebookEventsCorpus(recurrenceIdSwap).length > 0 &&
    validateNycacFacebookEventsCorpus(aggregateContradiction).length > 0 &&
    validateNycacFacebookEventsCorpus(responseContradiction).length > 0 &&
    additionalUnsafeVariants.every(
      (candidate) => validateNycacFacebookEventsCorpus(candidate).length > 0
    ) &&
    outboundUnsafeVariants.every(
      (candidate) =>
        nycacEventRecordSha256(candidate.events) === reviewedEventRecordSha256 &&
        validateNycacFacebookEventsCorpus(candidate).length > 0
    ) &&
    validateNycacFacebookEventsCorpus(numericArticlePath).length === 0 &&
    validateNycacFacebookEventsCorpus(publicTreatmentPolicy).length === 0 &&
    validateNycacFacebookEventsCorpus(publicParticipantEditorial).length === 0 &&
    validateNycacFacebookEventsCorpus(publicTreatmentEditorial).length === 0 &&
    !malformedResourceThrew &&
    malformedResourceFailures.length > 0 &&
    !malformedResourceEntryThrew &&
    malformedResourceEntryFailures.length > 0 &&
    malformedEventResults.every(
      (result) => !result.threw && result.failures.length > 0
    ) &&
    !invalidArticleResourceThrew &&
    invalidArticleResourceFailures.length > 0 &&
    validateNycacFacebookEventsCorpus(nonStringResourceUrl).length > 0 &&
    !arrayArticleUrlThrew &&
    arrayArticleUrlFailures.length > 0 &&
    reviewer12UnsafeResults.every((result) => result.passes) &&
    reviewer12SafeResults.every((result) => result.passes) &&
    reviewer12MalformedResults.every((result) => result.passes) &&
    validateNycacFacebookEventsManifest(manifest, {
      corpusText,
      corpusSha256,
      sortedEventIdSha256,
      eventIdentitySha256
    }).length === 0 &&
    validateNycacFacebookEventsManifest(unsafeManifest, {
      corpusText,
      corpusSha256,
      sortedEventIdSha256,
      eventIdentitySha256
    }).length > 0 &&
    includesAll(docs, [
      "attendee and guest identities",
      "meeting IDs and passcodes",
      "authenticated-session state"
    ])
);

const possible = checks.reduce((sum, item) => sum + item.points, 0);
const earned = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earned / possible) * 100);
const failures = checks.filter((item) => !item.passes);

console.log(`NYCAC Facebook events eval: ${score}/100 (criterion: 100)`);
for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const group = checks.filter((item) => item.dimension === dimension);
  const groupEarned = group.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const groupPossible = group.reduce((sum, item) => sum + item.points, 0);
  console.log(`- ${dimension}: ${groupEarned}/${groupPossible}`);
}

for (const failure of failures) {
  console.error(`- FAILED: ${failure.label}`);
}
if (score < 100 || failures.length) process.exit(1);
console.log("Criterion met.");
