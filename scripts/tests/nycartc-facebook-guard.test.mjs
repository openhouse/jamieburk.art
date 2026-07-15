import assert from "node:assert/strict";
import test from "node:test";
import { hasNycartcFacebookPublicArtifactRisk } from "../lib/nycartc-facebook-guard.mjs";

const prohibited = [
  "This is the complete Facebook post history.",
  "We recovered every Facebook post ever published.",
  "The 444 posts are the entire lifetime archive.",
  "Jamie authored all 444 Facebook posts.",
  "Jamie published every Page post.",
  "Jamie was the sole Page administrator.",
  "Jamie was the only publisher for the Page.",
  "Jamie was the predominant Facebook operator.",
  "Council-member references prove that Council members engaged.",
  "Tags show that agencies endorsed the campaign.",
  "Linked partners responded to the coalition.",
  "Mentions prove that stakeholders attended.",
  "Reactions demonstrate public reach.",
  "Shares prove campaign impact.",
  "Comments represent unique constituents.",
  "Interactions caused policy change.",
  "The authenticated dashboard exposed Jamie's administrator role.",
  "Meta Business Suite showed Jamie's task access.",
  "The signed-in account confirmed Jamie as Page owner."
];

for (const statement of prohibited) {
  test(`rejects public-safe regression: ${statement}`, () => {
    assert.equal(hasNycartcFacebookPublicArtifactRisk(statement), true);
  });
}

const bounded = [
  "This is complete coverage of the currently recoverable Page surface, not a lifetime archive.",
  "The current timeline does not establish every post ever published.",
  "Jamie recalls predominant but shared Page use; corroboration is required.",
  "Jamie did not author every Page post.",
  "No evidence establishes Jamie as sole administrator.",
  "Council references are routing signals, not verified engagement.",
  "Tags do not prove endorsement or response.",
  "Current reactions do not establish reach, attendance, conversion, or impact.",
  "The management control did not expose historic human-level publisher metadata.",
  "A current account relationship is not historical role proof."
];

for (const statement of bounded) {
  test(`allows bounded wording: ${statement}`, () => {
    assert.equal(hasNycartcFacebookPublicArtifactRisk(statement), false);
  });
}
