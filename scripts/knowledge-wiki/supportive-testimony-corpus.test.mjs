import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  renderCorpusMarkdown,
  validateCorpus,
} from "./supportive-testimony-corpus.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const corpusPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/supportive-public-testimony-corpus-2026-07.json",
);
const readingCopyPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/supportive-public-testimony-corpus-2026-07.md",
);

test("committed corpus is complete within its declared five-transcript scope", () => {
  const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf8"));
  assert.deepEqual(validateCorpus(corpus), []);
  assert.equal(corpus.events.length, 5);
  assert.equal(corpus.summary.supportive_contributors, 135);
  assert.equal(corpus.summary.supportive_transcript_labels, 145);
  assert.equal(corpus.summary.unclassified_substantive_labels, 0);
});

test("every contribution retains attribution, an official URL, and page location", () => {
  const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf8"));
  for (const event of corpus.events) {
    assert.match(event.source_url, /^https:\/\/legistar\.council\.nyc\.gov\//);
    for (const speaker of event.speakers) {
      assert.ok(speaker.display_name);
      assert.ok(speaker.official_transcript_labels.length);
      assert.ok(speaker.position);
      for (const contribution of speaker.contributions) {
        assert.ok(contribution.transcript_label);
        assert.match(contribution.source_pages, /^\d+(?:-\d+)?$/);
        assert.ok(contribution.text.length > 0);
      }
    }
  }
});

test("Markdown reading copy is an exact projection of the governed corpus", () => {
  const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf8"));
  const readingCopy = fs.readFileSync(readingCopyPath, "utf8");
  assert.equal(readingCopy, renderCorpusMarkdown(corpus));
  assert.match(readingCopy, /### Olympia Kazi/);
  assert.match(readingCopy, /### Jamie Burkart/);
  assert.match(readingCopy, /Official transcript label\(s\):/);
});

test("exclusion ledger preserves disagreement and uncertainty", () => {
  const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf8"));
  const exclusions = corpus.events.flatMap((event) => event.exclusion_ledger);
  const classifications = new Set(
    exclusions.map((entry) => entry.classification),
  );
  assert.ok(classifications.has("opposition"));
  assert.ok(classifications.has("opposition-as-written"));
  assert.ok(classifications.has("neutral-or-process-concern"));
  assert.ok(classifications.has("support-not-established-or-conditional"));
  assert.ok(classifications.has("fragment"));
});
