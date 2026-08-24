import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateKnowledgeGraphPortfolio,
  loadCandidate
} from "./knowledge-graph-portfolio-eval.mjs";

test("the governed Knowledge Wiki Graph portfolio candidate passes", () => {
  const result = evaluateKnowledgeGraphPortfolio(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateKnowledgeGraphPortfolio(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "the colophon cannot lose its doorway into the method",
  (candidate) => {
    candidate.colophon = candidate.colophon.replace("See the knowledge method in practice", "More");
  },
  /colophon does not provide a cited doorway/
);

expectFailure(
  "the evidence graph cannot disappear from the public explanation",
  (candidate) => {
    candidate.labPage = candidate.labPage.replaceAll("Evidence graph", "Supporting records");
    candidate.labCopy = candidate.labCopy.replaceAll("Evidence graph", "Supporting records");
  },
  /missing Evidence graph/
);

expectFailure(
  "an evolving practice cannot be promoted to a finished product",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find(
      (item) => item.id === "CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026"
    );
    claim.antiClaims = claim.antiClaims.filter((item) => !/finished production/i.test(item));
  },
  /maturity/
);

expectFailure(
  "the colophon cannot reuse the full case-study projection as its only wording",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find(
      (item) => item.id === "CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026"
    );
    claim.projections = claim.projections.filter(
      (projection) => projection.key !== "colophon"
    );
  },
  /plain-language colophon wording/
);

expectFailure(
  "repository roles cannot be equated with graph layers",
  (candidate) => {
    candidate.labCopy = candidate.labCopy.replace(
      "Repository roles do not map one-to-one onto the three graph responsibilities.",
      "Every repository maps to exactly one graph responsibility."
    );
  },
  /graph-layer distinction/
);

expectFailure(
  "the Noting.us lineage cannot silently disappear",
  (candidate) => {
    candidate.labCopy = candidate.labCopy.replaceAll("Noting.us", "the earlier prototype");
  },
  /loses the Source-Backed Team Memory and Noting.us lineage/
);

expectFailure(
  "the collective-map photograph cannot disappear from the method",
  (candidate) => {
    candidate.labPage = candidate.labPage.replace(
      "portfolioPhotos.knowledgeWikiCollectiveMap",
      "portfolioPhotos.eastRiver"
    );
  },
  /collective-knowledge principle/
);

expectFailure(
  "the selected pixels cannot drift after Jamie's review",
  (candidate) => {
    candidate.photoDerivativeSha256 = "0".repeat(64);
  },
  /missing or does not match the reviewed pixels/
);

expectFailure(
  "the project courtesy credit cannot silently disappear",
  (candidate) => {
    candidate.photoManifest = candidate.photoManifest.replaceAll(
      "Photo courtesy of NYC Artist Coalition.",
      ""
    );
  },
  /courtesy credit/
);

expectFailure(
  "the exact occurrence must remain in the album authorization",
  (candidate) => {
    candidate.photoPermission = candidate.photoPermission.replaceAll(
      "asset.photo.knowledge-wiki.collective-map.2017.001",
      "asset.photo.removed"
    );
  },
  /authorization does not record/
);

expectFailure(
  "the proposal cannot lose its concrete team use scene",
  (candidate) => {
    candidate.labPage = candidate.labPage.replace(
      "Start with one team pressure people can feel",
      "Method details"
    );
  },
  /use scene and focused first engagement/
);

expectFailure(
  "the proposed pilot cannot be presented as completed client work",
  (candidate) => {
    candidate.labPage = candidate.labPage.replace(
      "These are proposed acceptance conditions, not a claim that a",
      "These acceptance conditions prove that a"
    );
  },
  /distinguish proposed acceptance conditions/
);

expectFailure(
  "private photo locators cannot enter the public-safe records",
  (candidate) => {
    candidate.photoAsset += "\nsource: /Volumes/private/photo.jpg\n";
  },
  /private locator/
);

expectFailure(
  "the public explanation cannot lose why agentic memory takes a wiki form",
  (candidate) => {
    candidate.labPage = candidate.labPage.replace(
      /shared agentic memory should take a\s+wiki form/gi,
      "shared memory should use a useful interface"
    );
    candidate.labCopy = candidate.labCopy.replace(
      /shared agentic memory should take a\s+wiki form/gi,
      "shared memory should use a useful interface"
    );
  },
  /wiki-form proposition/
);

expectFailure(
  "wiki form cannot be represented as an automatic consensus mechanism",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find(
      (item) => item.id === "CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026"
    );
    claim.antiClaims = claim.antiClaims.filter(
      (item) => !/automatically produces truth/i.test(item)
    );
  },
  /consensus/
);

expectFailure(
  "a named analytical lens cannot become an actual participant",
  (candidate) => {
    const config = JSON.parse(candidate.wikiFormEval);
    config.lenses[0].actualPersonParticipated = true;
    candidate.wikiFormEval = JSON.stringify(config);
  },
  /three independent fictionalized public-work lenses/
);

expectFailure(
  "the model stage cannot run before deterministic wiki-form gates",
  (candidate) => {
    const config = JSON.parse(candidate.wikiFormEval);
    config.deterministicStages = [
      "independent-model-lens-evaluations",
      ...config.deterministicStages.slice(0, -1)
    ];
    candidate.wikiFormEval = JSON.stringify(config);
  },
  /deterministic gates before the model stage/
);

expectFailure(
  "the canonical claim cannot lose its wiki-form RFC source",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find(
      (item) => item.id === "CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026"
    );
    claim.evidence = claim.evidence.filter(
      (item) => item.sourceId !== "SRC-KNOWLEDGE-WIKI-RFC-0009-2026"
    );
  },
  /three architecture and wiki-form RFC sources/
);
