import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateParticipationVisualSequence,
  loadCandidate
} from "../evals-participation-visual-sequence.mjs";

test("the governed participation visual sequence passes", () => {
  const result = evaluateParticipationVisualSequence(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateParticipationVisualSequence(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "the homepage hero cannot silently change",
  (candidate) => {
    candidate.hero = Buffer.concat([candidate.hero, Buffer.from("\n")]);
  },
  /homepage Hero component changed/
);

expectFailure(
  "the timed capture contract cannot silently select a different frame",
  (candidate) => {
    candidate.texts.media = candidate.texts.media.replaceAll(
      "selectedFrame: 5",
      "selectedFrame: 4"
    );
  },
  /ten-frame one-second selection contract drifted/
);

expectFailure(
  "asset bytes cannot drift from the governed derivative",
  (candidate) => {
    const target = candidate.config.assets[0].path;
    candidate.assets[target] = Buffer.concat([
      candidate.assets[target],
      Buffer.from([0])
    ]);
  },
  /asset checksum drift/
);

expectFailure(
  "collective campaign credit cannot disappear",
  (candidate) => {
    candidate.texts.media = candidate.texts.media.replaceAll(
      "collective",
      "individual"
    );
  },
  /collective-credit boundary/
);

expectFailure(
  "production release cannot be collapsed into asset permission",
  (candidate) => {
    candidate.texts.projection = candidate.texts.projection.replace(
      "exact_candidate_production_release: open",
      "exact_candidate_production_release: approved"
    );
  },
  /separate from exact candidate release/
);
