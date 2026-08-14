import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const corpusPath =
  "docs/knowledge-bank/data/commercial-rent-public-support-corpus-2026-07-28.json";
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
const readText = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

const corpus = readJson(corpusPath);

test("the public-support eval contract declares every non-negotiable gate", () => {
  const evaluation = readJson(
    "evals/pre-launch/commercial-rent-public-support.json"
  );

  assert.equal(evaluation.id, "commercial-rent-public-support");
  assert.equal(evaluation.command, "npm run test:commercial-rent-public-support");
  assert.deepEqual(
    evaluation.criteria.map(({ id }) => id),
    ["CRPS-001", "CRPS-002", "CRPS-003", "CRPS-004", "CRPS-005", "CRPS-006"]
  );
  assert.ok(evaluation.criteria.every(({ type }) => type === "hard-gate"));
});

test("the active state bill pair is bound to official records", () => {
  assert.deepEqual(
    corpus.activeBills.map(({ bill }) => bill),
    ["S8319", "A5568A"]
  );
  assert.deepEqual(
    corpus.activeBills.map(({ sponsor }) => sponsor),
    ["Julia Salazar", "Emily Gallagher"]
  );
  for (const bill of corpus.activeBills) {
    assert.match(bill.officialUrl, /^https:\/\/www\.nysenate\.gov\//);
    assert.match(bill.status, /Committee/);
  }
});

test("the late-2025 event preserves Hanif, Lander, Gallagher, and Kazi", () => {
  const event = corpus.events.find(
    ({ id }) => id === "event.nyc.commercial-rent.public-event.2025-11-13"
  );

  assert.ok(event);
  assert.equal(event.sourceKind, "user-recorded-public-event-transcript");
  assert.equal(event.sourceSha256.length, 64);
  assert.deepEqual(
    event.speakers.map(({ name }) => name),
    ["Emily Gallagher", "Olympia Kazi", "Shahana Hanif", "Brad Lander"]
  );
  assert.equal(
    event.speakers.reduce((sum, { turnCount }) => sum + turnCount, 0),
    16
  );

  const transcript = readText(
    "docs/knowledge-bank/testimony/commercial-rent-public-support/2025-11-13-commissioner-supportive-remarks.md"
  );
  for (const name of ["Emily Gallagher", "Olympia Kazi", "Shahana Hanif", "Brad Lander"]) {
    assert.match(transcript, new RegExp(`## ${name}`));
  }
});

test("the July 29 report launch keeps Jamie and the two state sponsors in one bounded program", () => {
  const event = corpus.events.find(
    ({ id }) => id === "event.nyc.sbu-report-launch.2026-07-29"
  );

  assert.ok(event);
  assert.equal(event.sourceKind, "authenticated-public-event-transcript");
  assert.equal(event.sourceSha256.length, 64);
  assert.equal(event.completenessStatus, "three-selected-formal-program-speeches-indexed");
  assert.deepEqual(
    event.speakers.map(({ name }) => name),
    ["Julia Salazar", "Emily Gallagher", "Jamie Burkart"]
  );
  assert.deepEqual(
    event.speakers.map(({ speakerClass }) => speakerClass),
    ["public-official", "public-official", "advocate"]
  );

  const eventRecord = readText(
    "docs/knowledge-bank/events/sbu-report-launch-2026-07-29.md"
  ).replace(/\s+/g, " ");
  assert.match(eventRecord, /same formal program/i);
  assert.match(eventRecord, /does not establish that another speaker endorses Jamie/i);
  assert.match(eventRecord, /Council Member Marte did not speak/i);
});

test("Huntley remains a candidate when speaking and has a time-aware current status", () => {
  const huntleyEvents = corpus.events.filter((event) =>
    event.speakers.some(({ name }) => name === "Eon Huntley")
  );

  assert.equal(huntleyEvents.length, 2);
  for (const event of huntleyEvents) {
    const huntley = event.speakers.find(({ name }) => name === "Eon Huntley");
    assert.equal(huntley.speakerClass, "candidate");
    assert.match(huntley.roleAtEvent, /^Candidate for/);
  }

  assert.match(
    corpus.eonHuntleyStatus.statusOnReviewDate,
    /Apparent Democratic primary winner/
  );
  assert.match(corpus.eonHuntleyStatus.statusOnReviewDate, /not yet an Assembly Member/);
  assert.equal(corpus.eonHuntleyStatus.electionDistrictsReporting, "70 of 70");
  assert.equal(corpus.eonHuntleyStatus.votes, 8438);
  assert.equal(corpus.eonHuntleyStatus.voteShare, "57.12%");
});

test("official releases index every attributed speaker without calling the source a speech", () => {
  const introduction = corpus.events.find(
    ({ id }) =>
      id === "event.nys.commercial-rent.bill-introduction-release.2026-02-17"
  );
  const rally = corpus.events.find(
    ({ id }) =>
      id === "event.nys.commercial-rent.jimmys-corner-rally.2026-04-10"
  );

  assert.deepEqual(
    introduction.speakers.map(({ name }) => name),
    ["Julia Salazar", "Emily Gallagher", "Olympia Kazi", "Small Business United"]
  );
  assert.deepEqual(
    rally.speakers.map(({ name }) => name),
    [
      "Julia Salazar",
      "Emily Gallagher",
      "Olympia Kazi",
      "Linda B. Rosenthal",
      "Jo Anne Simon"
    ]
  );
  assert.equal(introduction.completenessStatus, "all-attributed-speakers-indexed");
  assert.equal(rally.completenessStatus, "all-attributed-speakers-indexed");
  assert.match(corpus.boundaries.join(" "), /press-release quotation is not labeled as a speech/i);
});

test("every corpus speaker has attribution, class, and counted statement units", () => {
  for (const event of corpus.events) {
    assert.ok(event.completenessStatus);
    assert.ok(event.sourceKind);
    assert.ok(event.publicRecordPath);
    assert.equal(event.transcriptPath, undefined);
    assert.ok(fs.existsSync(path.join(repoRoot, "docs/knowledge-bank/data", event.publicRecordPath)));

    for (const speaker of event.speakers) {
      assert.ok(speaker.name);
      assert.ok(speaker.roleAtEvent);
      assert.ok(speaker.speakerClass);
      assert.ok(
        (speaker.turnCount ?? speaker.statementCount) > 0,
        `${speaker.name} has at least one counted statement unit`
      );
    }
  }
});

test("the official-source null finding and public/private boundaries remain explicit", () => {
  assert.match(
    corpus.searchLog.findings.join(" "),
    /No Assembly or Senate floor speech/
  );

  const relevantFiles = [
    corpusPath,
    "docs/knowledge-bank/indexes/commercial-rent-public-support.md",
    "docs/knowledge-bank/sources/commercial-rent-public-support/active-state-bills-2025-2026.md",
    "docs/knowledge-bank/sources/commercial-rent-public-support/eon-huntley-2026-primary-result.md",
    ...corpus.events.map(({ publicRecordPath }) =>
      path.posix.normalize(
        path.posix.join("docs/knowledge-bank/data", publicRecordPath)
      )
    )
  ];
  const publicText = relevantFiles.map(readText).join("\n");

  assert.doesNotMatch(publicText, /\/Users\//);
  assert.doesNotMatch(publicText, /Mobile Documents/);
  assert.doesNotMatch(publicText, /jamie\.burkart@gmail/i);
  assert.doesNotMatch(publicText, /otter\.ai/i);
  assert.match(
    publicText,
    /Authenticated transcript URLs.*remain outside the public repository/i
  );
  assert.doesNotMatch(publicText, /### Transcript\b/i);
  assert.doesNotMatch(publicText, /complete attributed supportive remarks/i);
});
