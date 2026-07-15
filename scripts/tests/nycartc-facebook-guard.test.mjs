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
  "The signed-in account confirmed Jamie as Page owner.",
  "Our audit accounts for the whole NYC Artist Coalition Facebook archive.",
  "The ledger covers the total Page posting history.",
  "No Facebook post is missing from this census.",
  "Jamie handled Facebook publishing for NYC Artist Coalition.",
  "Jamie led the coalition's Facebook operations.",
  "The Page was primarily run by Jamie.",
  "Council offices interacted with the campaign across 88 records.",
  "Agency tags demonstrate official support.",
  "Partner references show collaboration.",
  "The 2,374 reactions show broad public attention.",
  "The 611 shares amplified the campaign's reach.",
  "The response floor demonstrates traction.",
  "The first-party management view showed who administered the Page.",
  "Signed-in controls confirmed Page access.",
  "The Page dashboard exposed management permissions.",
  "The sole Page administrator was Jamie.",
  "Facebook publishing belonged exclusively to Jamie.",
  "Official engagement is proven by 88 Council references.",
  "Council offices participated across 88 posts.",
  "Broad public reach came from the 2,374 reactions.",
  "The campaign reached 2,374 people, measured by reactions.",
  "Jamie had access to the Page dashboard.",
  "The dashboard was available to Jamie as administrator.",
  "Although this is not a native Meta export, it is the complete Facebook archive.",
  "The currently recoverable Page surface proves the complete Facebook history.",
  "Jamie recalls being the sole administrator.",
  "Jamie recalls being the sole administrator, and the record confirms it."
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
  "A current account relationship is not historical role proof.",
  "The whole currently recoverable timeline received a disposition; historical posts may still be missing.",
  "Jamie recalls handling much of the Page publishing, but no record-level attribution was recovered.",
  "Council offices appear in the routing classification; this does not establish interaction or support.",
  "The response floor is preserved only as a mutable interface observation, not attention or traction."
];

for (const statement of bounded) {
  test(`allows bounded wording: ${statement}`, () => {
    assert.equal(hasNycartcFacebookPublicArtifactRisk(statement), false);
  });
}
