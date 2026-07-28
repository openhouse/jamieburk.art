import assert from "node:assert/strict";
import test from "node:test";

import {
  buildCorpus,
  evaluateTestimonyCorpora,
  parseOfficialTranscript
} from "./lib.mjs";

const fixture = `CITY COUNCIL
 1   COMMITTEE ON TEST                         1
 2   ALEX EXAMPLE: I support the bill because it helps
 3   people.
\f 1   COMMITTEE ON TEST                         2
 2   ALEX EXAMPLE: It should pass.
 3   CHAIRPERSON EXAMPLE: Thank you.
 4   COUNCIL MEMBER SUPPORT: I support this measure and urge my colleagues
 5   to vote yes.
`;

const config = {
  id: "testimony.fixture.2026",
  title: "Fixture hearing",
  hearingDate: "2026-07-28",
  committee: "Committee on Tests",
  issue: "Fixture issue",
  aliases: {},
  classifications: {
    "ALEX EXAMPLE": {
      position: "supportive",
      speakerType: "public-witness",
      classificationBasis: "The witness explicitly says the bill should pass."
    },
    "CHAIRPERSON EXAMPLE": {
      position: "neutral-procedural",
      speakerType: "council-member",
      classificationBasis: "Procedural thanks only."
    },
    "COUNCIL MEMBER SUPPORT": {
      position: "supportive",
      speakerType: "council-member",
      classificationBasis: "The official explicitly supports the measure."
    }
  },
  source: {
    title: "Fixture",
    officialUrl: "https://example.com/hearing.pdf",
    accessedAt: "2026-07-28",
    pageCount: 2,
    sourcePdfSha256:
      "0000000000000000000000000000000000000000000000000000000000000000"
  },
  transcriptionPolicy: "Fixture normalization.",
  classificationPolicy: "Fixture close reading.",
  scopeBoundary: "Fixture public speakers.",
  reviewedAt: "2026-07-28",
  reviewStatus: "complete",
  antiClaims: ["Support establishes sole causation."]
};

test("parses page-local transcript turns without page furniture", () => {
  const turns = parseOfficialTranscript(fixture);
  assert.equal(turns.length, 4);
  assert.equal(turns[0].pageStart, 1);
  assert.equal(turns[1].pageStart, 2);
  assert.doesNotMatch(turns[0].text, /COMMITTEE ON TEST/);
});

test("includes full text only for supportive speakers", () => {
  const corpus = buildCorpus({ transcript: fixture, config });
  const witness = corpus.speakers.find(
    (speaker) => speaker.displayName === "ALEX EXAMPLE"
  );
  const chair = corpus.speakers.find(
    (speaker) => speaker.displayName === "CHAIRPERSON EXAMPLE"
  );
  assert.equal(witness.fullTextIncluded, true);
  assert.equal(witness.turns.length, 2);
  assert.equal(chair.fullTextIncluded, false);
  assert.deepEqual(chair.turns, []);
});

test("includes attributable supportive statements by public officials", () => {
  const corpus = buildCorpus({ transcript: fixture, config });
  const official = corpus.speakers.find(
    (speaker) => speaker.displayName === "COUNCIL MEMBER SUPPORT"
  );
  assert.equal(official.speakerType, "council-member");
  assert.equal(official.position, "supportive");
  assert.equal(official.fullTextIncluded, true);
  assert.match(official.turns[0].text, /urge my colleagues to vote yes/);
});

test("rejects private coordinates in a corpus", () => {
  const corpus = buildCorpus({ transcript: fixture, config });
  const result = evaluateTestimonyCorpora({
    manifest: {
      corpora: [{ id: corpus.id, file: "fixture.json" }]
    },
    sources: {
      "fixture.json": JSON.stringify({
        ...corpus,
        scopeBoundary: "/private/tmp/private-source"
      })
    }
  });
  assert.match(result.errors.join("\n"), /private path or identifier/);
});
