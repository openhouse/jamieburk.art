import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateProjectComposition,
  loadCandidate
} from "./project-composition-eval.mjs";

test("the governed recomposable-project-system candidate passes", () => {
  const result = evaluateProjectComposition(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateProjectComposition(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "structural resemblance cannot be promoted to documented lineage",
  (candidate) => {
    candidate.systemSource += "\nAll component similarities prove direct historical transmission.\n";
  },
  /promotes structural resemblance to documented lineage/
);

expectFailure(
  "the cross-project claim cannot activate a public projection",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find(
      (item) => item.id === "CLM-RECOMPOSABLE-CIVIC-CULTURAL-SYSTEM"
    );
    claim.projections[0].status = "active";
    claim.projections[0].surfaces = ["/work"];
  },
  /must remain held from public surfaces/
);

expectFailure(
  "the canonical KC Spaces Fund name cannot be replaced by the incoming search phrase",
  (candidate) => {
    candidate.systemSource = candidate.systemSource.replaceAll(
      "KC Spaces Fund",
      "KC Safer Spaces Fund"
    );
  },
  /does not preserve KC Spaces Fund as the canonical project name/
);

expectFailure(
  "the system must retain a stop rule",
  (candidate) => {
    candidate.systemSource = candidate.systemSource.replace(
      "## When not to reuse",
      "## Optional reuse"
    );
  },
  /missing ## When not to reuse/
);
