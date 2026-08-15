import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateChiosseEmilyCommercialRentReel,
  loadCandidate
} from "./chiosse-emily-commercial-rent-reel-eval.mjs";

test("the governed Chi Ossé and Emily Gallagher Reel candidate passes", () => {
  const result = evaluateChiosseEmilyCommercialRentReel(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateChiosseEmilyCommercialRentReel(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "a mutable branch cannot replace the pinned Reel archive",
  (candidate) => {
    candidate.source.archiveUrl = candidate.source.archiveUrl.replace(
      "ea5497dd910f3402c01e8b560b149d6674f951cc",
      "main"
    );
  },
  /exact-commit archive/
);

expectFailure(
  "Reel media checksum drift is detected",
  (candidate) => {
    candidate.source.publicNote = candidate.source.publicNote.replace(
      "cdef31ffe73e50f70a0d09b32b7863810d39c55bcde4b06c949cafa7595bee01",
      "0".repeat(64)
    );
  },
  /checksum, diarization failure/
);

expectFailure(
  "the two named speakers cannot collapse into one actor",
  (candidate) => {
    candidate.relation.actorIds = ["ENT-EMILY-GALLAGHER"];
  },
  /both named speakers/
);

expectFailure(
  "unverified quantitative speech cannot become a fact-check",
  (candidate) => {
    candidate.claim.boundaries = candidate.claim.boundaries.filter(
      (item) => !/quantitative claims as transcribed speech/i.test(item)
    );
  },
  /quantitative-claim/
);

expectFailure(
  "campaign context cannot silently become an active Jamie projection",
  (candidate) => {
    candidate.claim.projections = [{
      key: "case-study",
      text: "Jamie led this Reel.",
      status: "active",
      citationRequired: true,
      surfaces: ["/work/fair-rent-nyc"]
    }];
  },
  /no portfolio projection/
);

expectFailure(
  "final human listening cannot be auto-approved",
  (candidate) => {
    candidate.source.publicNote = candidate.source.publicNote.replace(
      "Final human listening/approval remains separate.",
      "Final human listening and publication are approved."
    );
  },
  /final-human-gate evidence/
);

expectFailure(
  "the reviewed transcript cannot drift to a mutable branch",
  (candidate) => {
    candidate.sourceDoc = candidate.sourceDoc.replace(
      "blob/ea5497dd910f3402c01e8b560b149d6674f951cc/sources/instagram/2026-08-05-chiosse-instagram-reel-DbqIqG8PoAQ/transcript.reviewed.md",
      "blob/main/sources/instagram/2026-08-05-chiosse-instagram-reel-DbqIqG8PoAQ/transcript.reviewed.md"
    );
  },
  /reference-only, and human-gated/
);
