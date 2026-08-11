import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateWowListSocialPractices,
  loadCandidate
} from "./wowlist-social-practices-eval.mjs";

test("the governed WOW List social-practice candidate passes", () => {
  const result = evaluateWowListSocialPractices(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateWowListSocialPractices(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "a protected repository source cannot expose a URL",
  (candidate) => {
    const source = candidate.knowledgeBank.sources.find((item) => item.id === "SRC-WOWLIST-KNOWLEDGE-REPOSITORY-2026");
    source.canonicalUrl = "https://example.com/private";
  },
  /must expose no URL/
);

expectFailure(
  "the relational-curation claim cannot activate a public projection",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find((item) => item.id === "CLM-WOWLIST-RELATIONAL-CURATION");
    claim.projections[0].status = "active";
    claim.projections[0].surfaces = ["/work/wowlist"];
  },
  /must remain held from public surfaces/
);

expectFailure(
  "the WOW List orientation must retain its method relation",
  (candidate) => {
    candidate.orientationSource = candidate.orientationSource.replace(
      "target: method.wowlist-relational-curation",
      "target: method.missing"
    );
  },
  /does not link the relational-curation method/
);

expectFailure(
  "the social-practice claim must retain the consent boundary",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find((item) => item.id === "CLM-WOWLIST-RELATIONAL-CURATION");
    claim.antiClaims = claim.antiClaims.filter((item) => !/consent/i.test(item));
  },
  /anti-claims omit experience, consent, or sole-credit boundaries/
);

expectFailure(
  "the synergy claim cannot activate a public projection",
  (candidate) => {
    const claim = candidate.knowledgeBank.claims.find((item) => item.id === "CLM-SUNDAY-DINNER-WOWLIST-NYCAC-SYNERGY");
    claim.projections[0].status = "active";
    claim.projections[0].surfaces = ["/work/wowlist"];
  },
  /synergy claim must remain held from public surfaces/
);

expectFailure(
  "synergy observations must remain project-distinct",
  (candidate) => {
    const observations = candidate.knowledgeBank.observations.filter((item) => item.claimIds.includes("CLM-SUNDAY-DINNER-WOWLIST-NYCAC-SYNERGY"));
    for (const observation of observations) observation.sourceId = "SRC-WOWLIST-SUNDAY-DINNER-POST-2014";
  },
  /synergy observations collapse project-distinct sources/
);

expectFailure(
  "the synergy page cannot assert causal succession",
  (candidate) => {
    candidate.synergySource += "\nWOW List therefore caused NYC Artist Coalition.\n";
  },
  /synergy page asserts causal succession/
);

expectFailure(
  "the Wildlist search term cannot replace the canonical WOW List name",
  (candidate) => {
    candidate.synergySource = candidate.synergySource.replace(
      "title: Sunday Dinner, WOW List, and NYC Artist Coalition Synergy",
      "title: Sunday Dinner, Wildlist, and NYC Artist Coalition Synergy"
    );
  },
  /unverified Wildlist search term as the canonical project name/
);

expectFailure(
  "the method page cannot assign sole authorship",
  (candidate) => {
    candidate.methodSource += "\nJamie alone created WOW List and its community outcomes.\n";
  },
  /method page asserts sole authorship/
);
