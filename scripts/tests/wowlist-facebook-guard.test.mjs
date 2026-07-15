import assert from "node:assert/strict";
import test from "node:test";
import { hasWowlistFacebookPublicArtifactRisk } from "../lib/wowlist-facebook-guard.mjs";

const prohibitedMutations = [
  "Members provided input on product design.",
  "Member input shaped the product.",
  "Members helped shape the service.",
  "Community feedback influenced the platform roadmap.",
  "The current Page administrator details were visible.",
  "The current account-management role was visible.",
  "The signed-in profile could administer the Page.",
  "Jamie could edit the Page settings during review.",
  "The logged-in view exposed owner controls for WOW List.",
  "The account showed a Page manager role.",
  "Community members co-designed the service.",
  "We incorporated member feedback into product design.",
  "Member feedback drove feature decisions for the site.",
  "The authenticated view exposed Page-control tools.",
  "Jamie retained control of the WOW List Page.",
  "Jamie had Page administrator access during review."
];

for (const mutation of prohibitedMutations) {
  test(`rejects public-safe regression: ${mutation}`, () => {
    assert.equal(hasWowlistFacebookPublicArtifactRisk(mutation), true);
  });
}

const boundedStatements = [
  "The project was community-shaped.",
  "The project invited community members to add events, establish local calendars, teach one another, and help shape the service.",
  "We invited community members to help shape the service.",
  "WOW List invited members to help shape the platform.",
  "A separate invitation asked members to help improve the site through a video conversation.",
  "Additional protected controls did not establish a lifetime denominator.",
  "The post does not identify the human author or administrator."
];

for (const statement of boundedStatements) {
  test(`allows bounded wording: ${statement}`, () => {
    assert.equal(hasWowlistFacebookPublicArtifactRisk(statement), false);
  });
}
