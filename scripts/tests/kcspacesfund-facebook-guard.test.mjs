import assert from "node:assert/strict";
import test from "node:test";
import { hasKcSpacesFundFacebookPublicArtifactRisk } from "../lib/kcspacesfund-facebook-guard.mjs";

const prohibitedMutations = [
  "The archive contains every Facebook post KC Spaces Fund ever published.",
  "These are all 38 Facebook posts in the Page's lifetime history.",
  "Jamie alone named KC Spaces Fund.",
  "Jamie owned the KC Spaces Fund Facebook Page.",
  "Jamie managed every KC Spaces Fund Facebook post.",
  "Jamie published all the Page posts.",
  "The tagged stakeholder accounts engaged with and endorsed the campaign.",
  "The 119 reactions prove campaign impact.",
  "The 50 shares reached 50 people.",
  "The authenticated account exposed administrator controls.",
  "Meta Business Suite showed who managed the Page."
];

for (const mutation of prohibitedMutations) {
  test(`rejects KC Spaces Fund Facebook regression: ${mutation}`, () => {
    assert.equal(hasKcSpacesFundFacebookPublicArtifactRisk(mutation), true);
  });
}

const boundedStatements = [
  "Every row exposed by the surviving observed Page surface received a disposition.",
  "The 38-row control is not a lifetime archive or Meta export.",
  "Jamie supported selection of an available cross-channel project name.",
  "Jamie did not own, administer, or post from the Facebook Page.",
  "Outgoing tags do not establish stakeholder engagement or endorsement.",
  "The 119-reaction floor is not reach, endorsement, conversion, or impact.",
  "Authentication state and administrator context remain outside the public repository."
];

for (const statement of boundedStatements) {
  test(`allows bounded KC Spaces Fund wording: ${statement}`, () => {
    assert.equal(hasKcSpacesFundFacebookPublicArtifactRisk(statement), false);
  });
}
