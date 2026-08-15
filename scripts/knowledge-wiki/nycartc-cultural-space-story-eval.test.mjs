import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateNycartcCulturalSpaceStory,
  loadCandidate
} from "./nycartc-cultural-space-story-eval.mjs";

test("the governed NYC Artist Coalition Story candidate passes", () => {
  const result = evaluateNycartcCulturalSpaceStory(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateNycartcCulturalSpaceStory(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "a mutable branch cannot replace the pinned archive commit",
  (candidate) => {
    candidate.source.archiveUrl = candidate.source.archiveUrl.replace(
      "ea5497dd910f3402c01e8b560b149d6674f951cc",
      "main"
    );
  },
  /immutable archive edition/
);

expectFailure(
  "media checksum drift is detected",
  (candidate) => {
    candidate.source.publicNote = candidate.source.publicNote.replace(
      "24808b127cd7af7bf0e804db0e27ec59b82d57d96ebf62a2f1e617ed6845caef",
      "0".repeat(64)
    );
  },
  /media checksum/
);

expectFailure(
  "coalition publication cannot become sole Jamie authorship",
  (candidate) => {
    candidate.claim.boundaries = candidate.claim.boundaries.filter(
      (item) => !/solely authored/i.test(item)
    );
  },
  /authorship, endorsement, and transcript-review boundaries/
);

expectFailure(
  "tags cannot become endorsements",
  (candidate) => {
    candidate.claim.boundaries = candidate.claim.boundaries.filter(
      (item) => !/tagged accounts/i.test(item)
    );
  },
  /authorship, endorsement, and transcript-review boundaries/
);

expectFailure(
  "archived media cannot be displayed before rights review",
  (candidate) => {
    candidate.source.media.publicDisplayStatus = "cleared";
  },
  /metadata-only pending rights and consent review/
);

expectFailure(
  "the active projection cannot lose its citation requirement",
  (candidate) => {
    candidate.claim.projections[0].citationRequired = false;
  },
  /cited Fair Rent case-study projection/
);

expectFailure(
  "the reviewed transcript reference cannot drift to a mutable branch",
  (candidate) => {
    candidate.sourceDoc = candidate.sourceDoc.replace(
      "blob/ea5497dd910f3402c01e8b560b149d6674f951cc/sources/instagram/2026-08-15-nycartc-story-3964470891412306511/transcript.reviewed.md",
      "blob/main/sources/instagram/2026-08-15-nycartc-story-3964470891412306511/transcript.reviewed.md"
    );
  },
  /reference-only, and review-gated/
);

expectFailure(
  "cross-source editorial review cannot become final human approval",
  (candidate) => {
    candidate.source.publicNote = candidate.source.publicNote.replace(
      "Final human listening/approval remains separate.",
      "Final human listening and publication are approved."
    );
  },
  /final human gate/
);
