import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
const readText = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

test("commercial-rent testimony binds both bills to exact official records", () => {
  const corpus = readJson(
    "docs/knowledge-bank/data/commercial-rent-testimony-corpus-2026-07-28.json"
  );

  assert.deepEqual(
    corpus.bills.map((bill) => bill.fileNumber),
    ["Int 1796-2019", "Int 0093-2022"]
  );
  assert.equal(corpus.events.length, 3);
  assert.deepEqual(
    corpus.events.map((event) => event.primeSponsorBillSpecificStatementStatus),
    ["not-recovered", "recovered-full", "not-recovered"]
  );

  for (const event of corpus.events) {
    assert.match(
      event.officialTranscriptUrl,
      /^https:\/\/legistar\.council\.nyc\.gov\//
    );
    assert.ok(
      fs.existsSync(
        path.join(
          repoRoot,
          "docs/knowledge-bank/data/public-hearing-speakers",
          event.speakerIndexFile
        )
      )
    );
  }
});

test("the 2021 supportive view preserves Levin and the configured full population", () => {
  const heteroglossia = readJson(
    "docs/knowledge-bank/data/hearing-heteroglossia-corpus-2026-07-28.json"
  );
  const event = heteroglossia.events.find(
    ({ id }) => id === "hearing.commercial-rent-stabilization.2021-09-17"
  );

  assert.ok(event);
  assert.equal(event.supportiveWitnessCount, 35);
  assert.equal(event.supportiveTurnCount, 161);

  const sponsor = event.speakers.find(
    ({ name }) => name === "Stephen Levin"
  );
  assert.ok(sponsor);
  assert.equal(sponsor.stance, "prime-sponsor-support");
  assert.ok(sponsor.turnCount > 1);
  assert.equal(sponsor.transcriptTextState, "protected-source-not-republished");
  assert.doesNotMatch(JSON.stringify(event), /"turns"\s*:/);
  assert.doesNotMatch(JSON.stringify(event), /"text"\s*:/);
});

test("supportive public officials remain explicit across the governed chapters", () => {
  const heteroglossia = readJson(
    "docs/knowledge-bank/data/hearing-heteroglossia-corpus-2026-07-28.json"
  );

  assert.equal(heteroglossia.summary.supportivePublicOfficialCount, 15);
  for (const event of heteroglossia.events) {
    assert.ok(
      event.supportivePublicOfficialCount > 0,
      `${event.id} includes at least one supportive public official`
    );
    for (const official of event.speakers.filter(
      ({ publicOfficial }) => publicOfficial
    )) {
      assert.ok(official.turnCount > 0, `${official.name} has attributed turns`);
      assert.ok(official.attribution, `${official.name} has a public role`);
      assert.ok(official.stance, `${official.name} has a bounded stance`);
    }
  }
});

test("written submissions remain queued until attribution and redaction review", () => {
  const corpus = readJson(
    "docs/knowledge-bank/data/commercial-rent-testimony-corpus-2026-07-28.json"
  );
  const hearing = corpus.events.find(
    ({ eventType }) => eventType === "committee-hearing"
  );

  assert.equal(
    hearing.writtenSubmissionBundle.status,
    "attribution-and-redaction-review-queued"
  );
  assert.equal(hearing.writtenSubmissionBundle.publicProjection, "held");
  assert.equal(hearing.writtenSubmissionBundle.pageCount, 237);
});

test("the public derivative excludes raw testimony and accidental personal identifiers", () => {
  const supportive = readText(
    "docs/knowledge-bank/testimony/heteroglossia/2021-09-17-commercial-rent-stabilization-supportive-speakers.md"
  );
  const speakerIndex = readText(
    "docs/knowledge-bank/data/public-hearing-speakers/commercial-rent-hearing-2021-09-17.json"
  );

  assert.doesNotMatch(supportive, /Social Security is/i);
  assert.doesNotMatch(speakerIndex, /Social Security is/i);
  assert.doesNotMatch(supportive, /### Transcript turns/i);
  assert.doesNotMatch(speakerIndex, /"text"\s*:/);
});
