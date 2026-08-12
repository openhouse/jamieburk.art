import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));

test("the complete official-hearing corpus preserves population closure", () => {
  const corpus = readJson(
    "docs/knowledge-bank/data/public-hearing-events-2026-07.json"
  );

  assert.equal(corpus.events.length, 6);

  const totals = corpus.events.reduce(
    (summary, event) => {
      const ledger = readJson(
        `docs/knowledge-bank/data/public-hearing-speakers/${event.ledgerFile}`
      );
      const sourcePath = path.join(
        repoRoot,
        "docs/knowledge-bank/sources/public-hearing-transcripts",
        `${event.slug}.md`
      );
      const eventPath = path.join(
        repoRoot,
        "docs/knowledge-bank/events",
        `${event.slug}.md`
      );

      assert.ok(fs.existsSync(sourcePath), `${event.slug} source record`);
      assert.ok(fs.existsSync(eventPath), `${event.slug} event record`);
      assert.equal(ledger.closure.allParsedTurnsAssignedToSpeaker, true);
      assert.equal(ledger.closure.jamieTranscriptRecovered, true);
      assert.equal(
        ledger.speakers.reduce(
          (count, speaker) => count + speaker.turnCount,
          0
        ),
        ledger.closure.turnCount
      );
      assert.match(
        ledger.source.publicRepositoryState,
        /raw transcript text is not republished/i
      );
      assert.doesNotMatch(JSON.stringify(ledger), /"turns"\s*:/);
      assert.doesNotMatch(JSON.stringify(ledger), /"text"\s*:/);

      summary.pages += ledger.closure.pageCount;
      summary.turns += ledger.closure.turnCount;
      summary.speakers += ledger.closure.speakerCount;
      return summary;
    },
    { pages: 0, turns: 0, speakers: 0 }
  );

  assert.deepEqual(totals, { pages: 1199, turns: 2258, speakers: 286 });
});

test("the complete corpus retains non-supportive and unresolved voices", () => {
  const corpus = readJson(
    "docs/knowledge-bank/data/public-hearing-events-2026-07.json"
  );

  for (const event of corpus.events) {
    const ledger = readJson(
      `docs/knowledge-bank/data/public-hearing-speakers/${event.ledgerFile}`
    );
    assert.ok(
      ledger.closure.alignmentReviewNeededCount > 0,
      `${event.slug} retains review-needed speakers`
    );
  }
});

test("raw official transcript derivatives remain outside public Git", () => {
  const transcriptDirectory = path.join(
    repoRoot,
    "docs/knowledge-bank/data/public-hearing-transcripts"
  );
  assert.ok(
    !fs.existsSync(transcriptDirectory) ||
      fs.readdirSync(transcriptDirectory).filter((entry) => entry.endsWith(".txt"))
        .length === 0
  );
});
