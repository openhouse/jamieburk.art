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
      "docs/knowledge-bank/data/public-testimony-heteroglossia.json",
    ),
    "utf8",
  ),
);

test("corpus covers the seven recovered hearings and a substantial chorus", () => {
  assert.equal(data.hearings.length, 7);
  assert.equal(data.totals.hearing_count, 7);
  assert.ok(data.totals.contributor_count >= 180);
  assert.ok(data.totals.transcript_character_count >= 700_000);
});

test("every included contribution is attributed, positioned, and nonempty", () => {
  for (const hearing of data.hearings) {
    assert.ok(hearing.source_url.startsWith("https://legistar.council.nyc.gov/"));
    assert.match(hearing.source_text_sha256, /^[a-f0-9]{64}$/);
    assert.equal(hearing.contributor_count, hearing.contributors.length);
    assert.ok(hearing.unselected_labels.length > 0);
    for (const speaker of hearing.contributors) {
      assert.ok(speaker.name);
      assert.ok(speaker.role);
      assert.ok(speaker.position);
      assert.ok(speaker.issue_scope);
      assert.ok(speaker.official_labels.length > 0);
      assert.ok(speaker.turns.length > 0);
      assert.ok(speaker.turns.every((turn) => turn.official_label && turn.text));
    }
  }
});

test("public corpus contains no direct email address or phone number", () => {
  const serialized = JSON.stringify(data);
  assert.doesNotMatch(
    serialized,
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  );
  assert.doesNotMatch(
    serialized,
    /(?<!\d)(?:\+?1[\s.-]*)?\(?\d{3}\)?\s*[-.]?\s*\d{3}\s*[-.]\s*\d{4}(?!\d)/,
  );
});

test("each generated event record exists", () => {
  for (const hearing of data.hearings) {
    const sourcePath = path.join(
      root,
      "docs/knowledge-bank/sources/testimony-heteroglossia",
      `${hearing.date}.md`,
    );
    assert.ok(fs.existsSync(sourcePath), sourcePath);
    const content = fs.readFileSync(sourcePath, "utf8");
    assert.match(content, /## Inclusion ledger/);
    assert.match(content, /## Full attributed transcript text/);
    assert.match(content, /## Coverage and boundaries/);
  }
});

test("supportive public officials retain role and issue scope", () => {
  const officials = data.hearings
    .flatMap((hearing) => hearing.contributors)
    .filter((speaker) =>
      /elected official|Council Member|prime sponsor/i.test(speaker.role),
    );
  assert.ok(officials.length >= 5);
  assert.ok(officials.some((speaker) => speaker.name === "Stephen T. Levin"));
  assert.ok(officials.some((speaker) => speaker.name === "Gale Brewer"));
  assert.ok(
    officials.every(
      (speaker) => speaker.role && speaker.position && speaker.issue_scope,
    ),
  );
});
