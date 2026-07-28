#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const data = JSON.parse(
  fs.readFileSync(
    path.join(
      root,
      "docs/knowledge-bank/data/commercial-rent-stabilization-testimony.json",
    ),
    "utf8",
  ),
);

test("corpus preserves the municipal lineage and current state-resolution lineage", () => {
  assert.deepEqual(
    data.legislation.map((record) => record.file),
    ["Int 1796-2019", "Int 0093-2022", "Res 0496-2026"],
  );
  assert.match(data.legislation[0].status, /Filed/);
  assert.match(data.legislation[1].status, /Filed/);
  assert.equal(data.legislation[2].status, "Committee");
  assert.ok(
    data.legislation.every((record) =>
      record.source_url.startsWith("https://legistar.council.nyc.gov/"),
    ),
  );
});

test("stated-meeting records preserve substantive support and honest non-recovery", () => {
  assert.equal(data.stated_meetings.length, 2);
  const records = data.stated_meetings.flatMap((meeting) => meeting.speakers);
  const ayala = records.find((record) => record.name === "Diana I. Ayala");
  const hudson = records.find((record) => record.name === "Crystal Hudson");
  const rivera = records.find((record) => record.name === "Carlina Rivera");
  assert.equal(
    ayala.position,
    "procedural-record-no-substantive-crs-statement",
  );
  assert.deepEqual(
    ayala.turns.map((turn) => turn.text),
    ["Presente.", "Aye on all."],
  );
  assert.equal(hudson.position, "supportive");
  assert.equal(rivera.position, "supportive");
});

test("supportive public-official statements keep their exact scope boundaries", () => {
  const officials = data.oral_public_official_statements;
  assert.equal(officials.record_count, 5);
  assert.ok(officials.selected_turn_count >= 60);
  assert.deepEqual(
    officials.records
      .filter((record) => record.position === "direct-bill-support")
      .map((record) => record.name),
    ["Stephen T. Levin"],
  );
  for (const record of officials.records) {
    assert.ok(record.name);
    assert.ok(record.role);
    assert.ok(record.position);
    assert.ok(record.scope_note);
    assert.ok(record.turns.length > 0);
    assert.ok(
      record.turns.every(
        (turn) =>
          turn.official_label &&
          Number.isInteger(turn.turn_number_for_label) &&
          turn.text,
      ),
    );
  }
  assert.ok(
    officials.coverage_notes.some((note) => note.includes("Kalman Yeger")),
  );
  assert.ok(
    officials.coverage_notes.some((note) =>
      note.includes("did not endorse Intro 1796"),
    ),
  );
});

test("written support cohort and official resolution remain attributed and complete", () => {
  assert.equal(data.written_testimony.document_count, 41);
  assert.ok(
    data.written_testimony.documents.every(
      (document) =>
        document.name &&
        document.organization &&
        ["supportive", "qualified-support"].includes(document.position) &&
        document.text.length > 0,
    ),
  );
  assert.equal(data.official_support_documents.length, 1);
  const resolution = data.official_support_documents[0];
  assert.equal(resolution.file, "Res 0496-2026");
  assert.equal(resolution.attributed_sponsors.length, 11);
  assert.match(resolution.text, /By Council Members Cabán/);
  assert.match(
    resolution.text,
    /calls on the New York State Legislature to pass/,
  );
});

test("active Albany bills retain complete official sponsor memoranda and current scope", () => {
  assert.equal(data.state_legislation.length, 2);
  assert.deepEqual(
    data.state_legislation.map((record) => record.bill),
    ["A5568A", "S8319"],
  );
  for (const record of data.state_legislation) {
    assert.match(record.status, /Committee/);
    assert.equal(record.status_date, "2026-07-28");
    assert.match(record.sponsor_memo, /PURPOSE OR GENERAL IDEA OF BILL/);
    assert.match(record.sponsor_memo, /JUSTIFICATION/);
    assert.ok(record.sponsor_memo.length > 4_000);
    assert.ok(record.scope_note);
  }
  assert.equal(data.state_legislation[0].prime_sponsor, "Emily Gallagher");
  assert.equal(data.state_legislation[1].prime_sponsor, "Julia Salazar");
  assert.ok(data.coverage_notes.some((note) => note.includes("No official chamber")));
});

test("public-event corpus includes Hanif and Huntley with role-at-the-time fidelity", () => {
  assert.equal(data.public_events.length, 4);
  const speakers = data.public_events.flatMap((event) =>
    event.speakers.map((speaker) => ({ ...speaker, event_id: event.id })),
  );
  const hanif = speakers.find((speaker) => speaker.name === "Shahana Hanif");
  const lander = speakers.find((speaker) => speaker.name === "Brad Lander");
  const huntley = speakers.find((speaker) => speaker.name === "Eon Huntley");
  assert.equal(hanif.role_at_event, "New York City Council Member");
  assert.equal(hanif.turns[0].timestamp, "48:55");
  assert.match(hanif.turns[0].text, /commercial Rent Stabilization Act passed/i);
  assert.equal(lander.role_at_event, "New York City Comptroller");
  assert.equal(lander.turns[0].timestamp, "53:59");
  assert.equal(
    huntley.role_at_event,
    "Candidate for New York State Assembly District 56",
  );
  assert.match(huntley.current_context, /later won the June 2026 Democratic primary/);
  assert.equal(huntley.turns[0].timestamp, "1:08:11");
  assert.match(huntley.turns[0].text, /commercial rent stabilization bill/i);
  assert.doesNotMatch(huntley.role_at_event, /Assembly Member/);
});

test("public-event selections remain complete timestamp-bound turns", () => {
  assert.equal(data.totals.public_event_speaker_count, 18);
  assert.equal(data.totals.public_event_turn_count, 45);
  for (const event of data.public_events) {
    assert.ok(event.source_text_sha256);
    assert.ok(event.source_kind);
    assert.ok(event.coverage_notes.length > 0);
    for (const speaker of event.speakers) {
      assert.ok(speaker.role_at_event);
      assert.ok(speaker.current_context);
      assert.ok(speaker.scope_note);
      assert.ok(speaker.turns.length > 0);
      assert.ok(
        speaker.turns.every(
          (turn) => turn.official_label && turn.timestamp && turn.text.length > 0,
        ),
      );
    }
  }
});

test("official state releases remain written statements rather than invented speeches", () => {
  assert.equal(data.official_state_statements.length, 2);
  assert.equal(data.totals.official_state_statement_record_count, 9);
  const names = data.official_state_statements.flatMap((source) =>
    source.records.map((record) => record.name),
  );
  for (const required of [
    "Julia Salazar",
    "Emily Gallagher",
    "Olympia Kazi",
    "Small Business United",
    "Linda B. Rosenthal",
    "Jo Anne Simon",
  ]) {
    assert.ok(names.includes(required), required);
  }
  assert.ok(
    data.official_state_statements.every(
      (source) =>
        source.source_kind === "official New York State Senate press release",
    ),
  );
  assert.doesNotMatch(JSON.stringify(data.official_state_statements), /floor speech/i);
});

test("public corpus contains no direct contact coordinates", () => {
  const serialized = JSON.stringify(data);
  assert.doesNotMatch(
    serialized,
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  );
  assert.doesNotMatch(
    serialized,
    /(?<!\d)(?:\+?1[\s.-]*)?\(?\d{3}\)?\s*[-.]?\s*\d{3}\s*[-.]\s*\d{4}(?!\d)/,
  );
  assert.doesNotMatch(serialized, /\bP\.?\s*O\.?\s+Box\s+\d+\b/i);
});

test("all generated Commercial Rent Stabilization source pages exist", () => {
  const expected = [
    "legislative-lineage.md",
    "public-officials-2021-09-17.md",
    "resolution-0496-2026.md",
    "stated-2019-11-14.md",
    "stated-2022-03-24.md",
    "state-legislation-2025-2026.md",
    "public-events-2025-2026.md",
    "official-state-statements-2026.md",
    "written-2021-09-17.md",
  ];
  for (const filename of expected) {
    assert.ok(
      fs.existsSync(
        path.join(
          root,
          "docs/knowledge-bank/sources/commercial-rent-stabilization",
          filename,
        ),
      ),
      filename,
    );
  }
  assert.ok(
    fs.existsSync(
      path.join(
        root,
        "docs/knowledge-bank/indexes/commercial-rent-stabilization-testimony.md",
      ),
    ),
  );
});
