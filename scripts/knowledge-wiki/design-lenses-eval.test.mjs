import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateDesignLenses,
  loadDesignLensCandidate
} from "./design-lenses-eval.mjs";

test("the Knowledge Wiki comparative design-lens packet passes", () => {
  const result = evaluateDesignLenses(loadDesignLensCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
  assert.equal(result.metrics.lenses, 3);
  assert.equal(result.metrics.sources, 4);
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadDesignLensCandidate();
    mutate(candidate);
    const result = evaluateDesignLenses(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "a named lens cannot become a collaborator relation",
  (candidate) => {
    const relation = candidate.method.data.relations.find(
      (item) => item.target === "person.ward-cunningham"
    );
    relation.type = "collaborated_with";
  },
  /only as bounded design lenses/
);

expectFailure(
  "a fictionalized model review cannot become a named person's opinion",
  (candidate) => {
    candidate.config.authorityBoundary.modelReviewIsNamedPersonOpinion = true;
  },
  /Named-person non-participation/
);

expectFailure(
  "a public source cannot auto-project into the portfolio",
  (candidate) => {
    candidate.lenses[1].sources[0].data.projection = {
      status: "active",
      surfaces: ["/lab/source-backed-team-memory"]
    };
  },
  /held from direct projection/
);

expectFailure(
  "model work cannot run before deterministic gates",
  (candidate) => {
    candidate.config.modelReview.allowedOnlyAfterDeterministicPass = false;
  },
  /Deterministic gates must pass before/
);

expectFailure(
  "the exact design question cannot silently drift",
  (candidate) => {
    candidate.lenses[2].person.body = candidate.lenses[2].person.body.replace(
      /## Design question[\s\S]*?## Boundary/,
      "## Design question\n\nCan the system evolve?\n\n## Boundary"
    );
  },
  /yehuda-katz must retain the exact comparative design question/
);

expectFailure(
  "private locators cannot enter the public-safe packet",
  (candidate) => {
    candidate.lenses[0].sources[0].raw += "\n/private/tmp/source.txt\n";
  },
  /must not expose a private locator/
);
