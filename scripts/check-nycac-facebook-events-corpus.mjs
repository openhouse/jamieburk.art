#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.json";
const manifestPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.manifest.json";
const projectNotePath =
  "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md";
const expectedCorpusSha256 =
  "1562bb57fa58d788e8171f2efb98c71be47f42099482320ab113d631925e545e";
const expectedIdSha256 =
  "b9e63a508958e7b7ed71236803aef60bc597123b1ff5c497550df90c80fe09fc";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function countBy(items, selector) {
  return items.reduce((counts, item) => {
    const key = selector(item);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

const corpusText = read(corpusPath);
const corpus = JSON.parse(corpusText);
const manifest = JSON.parse(read(manifestPath));
const projectNote = read(projectNotePath);
const corpusSha256 = createHash("sha256").update(corpusText).digest("hex");
const events = corpus.events;
const eventIds = events.map((event) => event.id);
const eventIdSha256 = createHash("sha256")
  .update([...eventIds].sort().join("\n"))
  .digest("hex");
const eventIdentitySha256 = nycacEventIdentitySha256(events);

assert.deepEqual(validateNycacFacebookEventsCorpus(corpus), []);
assert.deepEqual(
  validateNycacFacebookEventsManifest(manifest, {
    corpusText,
    corpusSha256,
    sortedEventIdSha256: eventIdSha256,
    eventIdentitySha256
  }),
  []
);
assert.equal(corpus.schemaVersion, 3);
assert.equal(manifest.schemaVersion, 2);
assert.equal(manifest.corpusSchemaVersion, 3);
assert.equal(corpus.page.handle, "nycartc");
assert.equal(corpus.page.selectedSurface, "Past Events");
assert.equal(corpusSha256, expectedCorpusSha256);
assert.equal(manifest.corpusSha256, expectedCorpusSha256);
assert.equal(manifest.corpusBytes, Buffer.byteLength(corpusText));
assert.equal(eventIdSha256, expectedIdSha256);
assert.equal(manifest.sortedEventIdSha256, expectedIdSha256);
assert.equal(manifest.eventIdentitySha256, eventIdentitySha256);
assert.equal(manifest.currentReplay.sortedEventIdSha256, expectedIdSha256);

const population = corpus.populationReconciliation;
assert.equal(population.pageDisplayedPastEventCount, 34);
assert.equal(population.recoveredIndexEventCount, 33);
assert.equal(population.recoveredDetailEventCount, 33);
assert.equal(population.detailRetrievalFailureCount, 0);
assert.equal(population.unmaterializedCount, 1);
assert.equal(events.length, 33);
assert.equal(new Set(eventIds).size, 33);
assert.equal(manifest.pageDisplayedPastEventSlots, 34);
assert.equal(manifest.recoveredEventRecords, 33);
assert.equal(manifest.unresolvedControlSlots, 1);
assert.equal(manifest.currentReplay.recoveredEventRecords, 33);
assert.equal(manifest.currentReplay.performedAt, "2026-07-16");
assert.deepEqual(manifest.currentReplay.growthSequence, [8, 32, 33]);

assert.deepEqual(countBy(events, (event) => event.date.slice(0, 4)), {
  2017: 17,
  2018: 3,
  2019: 6,
  2020: 6,
  2021: 1
});
assert.equal(
  events.filter(
    (event) => event.relationToPage === "index-displayed-nycac-organizer"
  ).length,
  24
);
assert.equal(
  events.filter((event) => event.relationToPage === "allied-or-cohosted-listing")
    .length,
  9
);

const recurringClassification =
  corpus.derivedClassifications.recurringCoalitionMeetings;
const recurring = events.filter(isRecurringNycacMeeting);
const recurringMeetingIds = new Set(recurring.map((event) => event.id));
const physicalRecurring = recurring.filter(
  (event) => event.venueCategory !== "virtual"
);
assert.deepEqual(recurringClassification.eventIds, recurring.map((event) => event.id));
assert.equal(recurring.length, 12);
assert.equal(physicalRecurring.length, 10);
assert.equal(recurring.length - physicalRecurring.length, 2);
assert.equal(new Set(physicalRecurring.map((event) => event.venue)).size, 10);
assert.equal(recurringClassification.physicalEventCount, 10);
assert.equal(recurringClassification.virtualEventCount, 2);
assert.match(recurringClassification.method, /Deterministic classification/);

const topicCounts = {};
for (const event of events) {
  for (const topic of event.topics) {
    topicCounts[topic] = (topicCounts[topic] ?? 0) + 1;
  }
}
assert.deepEqual(topicCounts, {
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
});

const responses = events.filter(
  (event) => typeof event.responseSnapshot?.pointEstimate === "number"
);
assert.equal(responses.length, 32);
assert.equal(corpus.aggregateSnapshot.eventsWithDisplayedResponseCount, 32);
assert.equal(corpus.aggregateSnapshot.roundedResponseCountEvents, 3);
assert.ok(!("responseActionPointEstimate" in corpus.aggregateSnapshot));
assert.equal(
  responses.filter((event) => event.responseSnapshot.pointEstimate >= 100).length,
  corpus.aggregateSnapshot.eventsAtOrAbove100Responses
);
assert.equal(
  responses.filter((event) => event.responseSnapshot.pointEstimate >= 500).length,
  corpus.aggregateSnapshot.eventsAtOrAbove500Responses
);
assert.equal(
  responses.filter((event) => event.responseSnapshot.pointEstimate >= 1000).length,
  corpus.aggregateSnapshot.eventsAtOrAbove1000Responses
);

assert.equal(corpus.postedSourceArticles.length, 7);
const eventById = new Map(events.map((event) => [event.id, event]));
for (const article of corpus.postedSourceArticles) {
  const event = eventById.get(article.eventId);
  assert.ok(event, `Article route references unknown event ${article.eventId}`);
  assert.equal(
    article.eventTitle,
    event.title,
    `Article route title does not match event ${article.eventId}`
  );
  assert.match(article.url, /^https?:\/\//);
  assert.ok(
    event.outboundResources.some(
      (resource) =>
        resource.resourceType === "source-article" &&
        normalizeNycacEventRouteUrl(resource.url) ===
          normalizeNycacEventRouteUrl(article.url)
    ),
    `Article route is not present in event ${article.eventId} outbound resources`
  );
}
assert.equal(
  new Set(
    corpus.postedSourceArticles.map(
      (article) => `${article.eventId}\n${article.url}`
    )
  ).size,
  7
);
assert.deepEqual(
  corpus.postedSourceArticles.map((article) => article.publisher),
  [
    "New York Post",
    "WNYC",
    "Metro",
    "The New Yorker",
    "The Baffler",
    "Curbed",
    "Gothamist"
  ]
);
assert.equal(
  events.reduce((sum, event) => sum + event.withheldOutboundLinkCount, 0),
  13
);

const ledgerRows = projectNote
  .split("\n")
  .filter((line) => /^\| \d{4}-\d{2}-\d{2} \|/.test(line));
assert.equal(ledgerRows.length, events.length);
for (const row of ledgerRows) {
  const cells = row.split("|").slice(1, -1).map((cell) => cell.trim());
  const eventId = cells[1].match(/facebook\.com\/events\/(\d+)\//)?.[1];
  const event = events.find((candidate) => candidate.id === eventId);
  assert.ok(event, `Ledger row does not join to a canonical event: ${row}`);
  assert.equal(cells[0], event.date);
  assert.equal(
    cells[2],
    event.relationToPage === "index-displayed-nycac-organizer"
      ? "Direct"
      : "Cohosted"
  );
  assert.equal(cells[3], event.venue ?? "Virtual");
  assert.equal(
    cells[4],
    event.responseSnapshot?.respondedDisplay ?? "Not displayed"
  );
}

const recheck = population.detailAvailabilityRecheck;
assert.equal(recheck.recoveredEventIdCount, 33);
assert.equal(recheck.recoveredDetailCount, 28);
assert.equal(recheck.temporarilyUnavailableDetailCount, 5);
assert.equal(recheck.temporarilyUnavailableEventIds.length, 5);

const unsafeShape = structuredClone(corpus);
unsafeShape.events[0].rawBody = "Guest guest@example.com";
unsafeShape.events[0].attendees = ["Example attendee"];
unsafeShape.events[0].meetingPasscode = "123456";
assert.ok(validateNycacFacebookEventsCorpus(unsafeShape).length > 0);

const unsafeValue = structuredClone(corpus);
unsafeValue.events[0].venue = "guest@example.com / 212-555-1212";
assert.ok(validateNycacFacebookEventsCorpus(unsafeValue).length > 0);

const privateTitle = structuredClone(corpus);
privateTitle.events[0].title =
  "Attendee Jane Doe described a sensitive housing case in confidence";
assert.ok(validateNycacFacebookEventsCorpus(privateTitle).length > 0);

const privateVenue = structuredClone(corpus);
privateVenue.events[0].venue =
  "Full private coalition note follows with participant narrative";
assert.ok(validateNycacFacebookEventsCorpus(privateVenue).length > 0);

const unformattedPhone = structuredClone(corpus);
unformattedPhone.events[0].title = "Call 2125551212";
assert.ok(validateNycacFacebookEventsCorpus(unformattedPhone).length > 0);

const meetingAccessUrl = structuredClone(corpus);
meetingAccessUrl.events[0].outboundResources[0] = {
  url: "https://zoom.us/j/123456789",
  host: "zoom.us",
  resourceType: "mission-resource"
};
assert.ok(validateNycacFacebookEventsCorpus(meetingAccessUrl).length > 0);

const topicDrift = structuredClone(corpus);
topicDrift.events[0].topics.push("raw-participant-testimony");
assert.ok(validateNycacFacebookEventsCorpus(topicDrift).length > 0);

const recurrenceTitleContradiction = structuredClone(corpus);
recurrenceTitleContradiction.events.find(
  (event) => event.id === "406505576359490"
).title = "One-off unrelated fundraiser";
assert.ok(
  validateNycacFacebookEventsCorpus(recurrenceTitleContradiction).length > 0
);

const recurrenceIdSwap = structuredClone(corpus);
const recurrenceIds =
  recurrenceIdSwap.derivedClassifications.recurringCoalitionMeetings.eventIds;
recurrenceIds[recurrenceIds.indexOf("406505576359490")] = "1907948219437421";
assert.ok(validateNycacFacebookEventsCorpus(recurrenceIdSwap).length > 0);

const aggregateContradiction = structuredClone(corpus);
aggregateContradiction.aggregateSnapshot.eventsAtOrAbove100Responses = 999;
assert.ok(validateNycacFacebookEventsCorpus(aggregateContradiction).length > 0);

const responseContradiction = structuredClone(corpus);
responseContradiction.events[0].responseSnapshot.pointEstimate = 446;
assert.ok(validateNycacFacebookEventsCorpus(responseContradiction).length > 0);

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

const additionalUnsafeVariants = [
  (candidate) => {
    candidate.events[0].title =
      "Participant Jane Doe shared her eviction and medical history";
  },
  (candidate) => {
    candidate.events[0].dateLabel = "Participant Jane shared eviction";
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
    candidate.events[0].title = "Capture at /var/folders/ab/session.json";
  },
  (candidate) => {
    candidate.events[0].title = "Capture at /home/reviewer/session.json";
  },
  (candidate) => {
    candidate.events[0].title =
      "Join https://example.webex.com/meet/private-room";
  },
  (candidate) => {
    candidate.events[0].title = "Join https://meet.jit.si/private-room";
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/internal?api_key=supersecretvalue",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://admin:hunter2!@nycartc.com/internal",
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
  (candidate) => {
    candidate.events[0].title =
      "Jane told us she lost her apartment after a cancer diagnosis";
  },
  (candidate) => {
    candidate.events[0].title = "Call 212/555/1212 for details";
  },
  (candidate) => {
    candidate.events[0].title = "Call 212\u2013555\u20131212 for details";
  },
  ...[
    ["xox", "c-123456789012-abcdefghijklmnopqrstuvwxyz"].join(""),
    ["xox", "e.xoxp-1-abcdefghijklmnopqrstuvwxyz"].join(""),
    ["AI", "zaSyDUMMYDUMMYDUMMYDUMMYDUMMY12345"].join(""),
    ["S", "G.abcdefghijklmnopqrstuv.abcdefghijklmnopqrstuvwxyz1234567890"].join(""),
    ["S", "K0123456789abcdef0123456789abcdef"].join(""),
    ["AS", "IAIOSFODNN7EXAMPLE"].join(""),
    ["Bear", "er abcdefghijkl"].join("")
  ].map(
    (secret) => (candidate) => {
      candidate.events[0].title = secret;
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
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/public?phone=%2B1%20(212)%20555-1212",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/public?note=participant-Jane-shared-private-eviction-history-in-confidence",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/public?contact=guest%40example.com",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/public?token=xoxb%2D123456789012%2D123456789012%2Dabcdefghijklmnopqrstuv",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/public?source=%2FUsers%2Freviewer%2Fprivate.json",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/redirect?to=https://example.webex.com/meet/private-room",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/redirect?to=https://meet.jit.si/private-room",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/redirect?to=https%3A%2F%2Fzoom.us%2Fj%2F123456789",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/public?note=SmFuZSB3YXMgZXZpY3RlZCBhZnRlciBhIGNhbmNlciBkaWFnbm9zaXM=",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/public?contact=%2525252540example.com",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  (candidate) => {
    candidate.events[0].outboundResources[0] = {
      url: "https://nycartc.com/redirect?to=meet.google.com%2Fabc-defg-hij",
      host: "nycartc.com",
      resourceType: "mission-resource"
    };
  },
  ...[
    "/root/.ssh/id_rsa",
    "~/Library/Application Support/private/session.json",
    "/opt/private/session.json"
  ].map(
    (localPath) => (candidate) => {
      candidate.events[0].title = localPath;
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
const reviewedEventRecordSha256 = nycacEventRecordSha256(corpus.events);
for (const [mutationIndex, mutate] of outboundUnsafeMutations.entries()) {
  const candidate = structuredClone(corpus);
  mutate(candidate);
  assert.equal(
    nycacEventRecordSha256(candidate.events),
    reviewedEventRecordSha256
  );
  assert.ok(
    validateNycacFacebookEventsCorpus(candidate).length > 0,
    `outbound unsafe mutation ${mutationIndex} must be rejected`
  );
}
for (const [mutationIndex, mutate] of additionalUnsafeVariants.entries()) {
  const candidate = structuredClone(corpus);
  mutate(candidate);
  assert.ok(
    validateNycacFacebookEventsCorpus(candidate).length > 0,
    `additional unsafe mutation ${mutationIndex} must be rejected`
  );
}

const malformedResourceArray = structuredClone(corpus);
malformedResourceArray.events[0].outboundResources = null;
let malformedResourceFailures;
assert.doesNotThrow(() => {
  malformedResourceFailures = validateNycacFacebookEventsCorpus(
    malformedResourceArray
  );
});
assert.ok(malformedResourceFailures.length > 0);

const malformedResourceEntry = structuredClone(corpus);
malformedResourceEntry.events[0].outboundResources = [null];
let malformedResourceEntryFailures;
assert.doesNotThrow(() => {
  malformedResourceEntryFailures = validateNycacFacebookEventsCorpus(
    malformedResourceEntry
  );
});
assert.ok(malformedResourceEntryFailures.length > 0);

for (const malformedEvent of [null, {}, undefined]) {
  const candidate = structuredClone(corpus);
  candidate.events[1] = malformedEvent;
  let failures;
  assert.doesNotThrow(() => {
    failures = validateNycacFacebookEventsCorpus(candidate);
  });
  assert.ok(failures.length > 0);
}

const invalidArticleResource = structuredClone(corpus);
invalidArticleResource.events
  .find((event) => event.id === "472114119789400")
  .outboundResources.find(
    (resource) => resource.resourceType === "source-article"
  ).url = "not a url";
let invalidArticleResourceFailures;
assert.doesNotThrow(() => {
  invalidArticleResourceFailures = validateNycacFacebookEventsCorpus(
    invalidArticleResource
  );
});
assert.ok(invalidArticleResourceFailures.length > 0);

const nonStringResourceUrl = structuredClone(corpus);
nonStringResourceUrl.events[0].outboundResources[0].url = new URL(
  nonStringResourceUrl.events[0].outboundResources[0].url
);
assert.ok(validateNycacFacebookEventsCorpus(nonStringResourceUrl).length > 0);

const numericArticlePath = structuredClone(corpus);
numericArticlePath.events[0].outboundResources[0] = {
  url: "https://nycartc.com/archive/20191216190533/20953724/1234567890/public-article",
  host: "nycartc.com",
  resourceType: "mission-resource"
};
assert.deepEqual(validateNycacFacebookEventsCorpus(numericArticlePath), []);

const publicTreatmentPolicy = structuredClone(corpus);
publicTreatmentPolicy.events[0].outboundResources[0] = {
  url: "https://nycartc.com/public?metadata=treatment%20of%20artists%20under%20the%20law",
  host: "nycartc.com",
  resourceType: "mission-resource"
};
assert.deepEqual(validateNycacFacebookEventsCorpus(publicTreatmentPolicy), []);

const publicParticipantEditorial = structuredClone(corpus);
publicParticipantEditorial.events[0].outboundResources[0] = {
  url: "https://nycartc.com/public?metadata=Participant%20input%20informed%20the%20public%20meeting%20agenda",
  host: "nycartc.com",
  resourceType: "mission-resource"
};
assert.deepEqual(
  validateNycacFacebookEventsCorpus(publicParticipantEditorial),
  []
);

const publicTreatmentEditorial = structuredClone(corpus);
publicTreatmentEditorial.events[0].outboundResources[0] = {
  url: "https://nycartc.com/public?metadata=Editors%20discussed%20treatment%20of%20artists%20under%20the%20law",
  host: "nycartc.com",
  resourceType: "mission-resource"
};
assert.deepEqual(validateNycacFacebookEventsCorpus(publicTreatmentEditorial), []);

const arrayArticleUrl = structuredClone(corpus);
arrayArticleUrl.postedSourceArticles[0].url = [
  arrayArticleUrl.postedSourceArticles[0].url
];
let arrayArticleUrlFailures;
assert.doesNotThrow(() => {
  arrayArticleUrlFailures = validateNycacFacebookEventsCorpus(arrayArticleUrl);
});
assert.ok(arrayArticleUrlFailures.length > 0);

for (const { label, mutate } of nycacReviewer12UnsafeMutations) {
  const candidate = structuredClone(corpus);
  mutate(candidate);
  let failures;
  assert.doesNotThrow(() => {
    failures = validateNycacFacebookEventsCorpus(candidate);
  }, `${label} must fail closed without throwing`);
  assert.ok(failures.length > 0, `${label} must be rejected`);
}

for (const { label, mutate } of nycacReviewer12SafeMutations) {
  const candidate = structuredClone(corpus);
  mutate(candidate);
  assert.deepEqual(
    validateNycacFacebookEventsCorpus(candidate),
    [],
    `${label} must remain accepted`
  );
}

for (const { label, mutate } of nycacReviewer12MalformedMutations) {
  const candidate = structuredClone(corpus);
  mutate(candidate);
  let failures;
  assert.doesNotThrow(() => {
    failures = validateNycacFacebookEventsCorpus(candidate);
  }, `${label} must return controlled validation failures`);
  assert.ok(failures.length > 0, `${label} must be rejected`);
}

const unsafeManifest = structuredClone(manifest);
unsafeManifest.rawCaptureLocation =
  "/Users/reviewer/private/facebook-session-export.json";
assert.ok(
  validateNycacFacebookEventsManifest(unsafeManifest, {
    corpusText,
    corpusSha256,
    sortedEventIdSha256: eventIdSha256,
    eventIdentitySha256
  }).length > 0
);

console.log(
  JSON.stringify(
    {
      status: "pass",
      displayedControlSlots: 34,
      recoveredEvents: 33,
      unresolvedControlSlots: 1,
      eventIdSha256,
      corpusSha256
    },
    null,
    2
  )
);
