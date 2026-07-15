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
  "Jamie had Page administrator access during review.",
  "The roadmap changed after members sent suggestions.",
  "We based product changes on comments from community members.",
  "Jamie remained an administrator of the WOW List Page.",
  "Jamie was listed as a Page editor.",
  "The signed-in Page let Jamie publish posts.",
  "Page settings were available to Jamie during review.",
  "The dashboard allowed posting as WOW List.",
  "WOW List invited members whose feedback shaped the product to help shape the service.",
  "Jamie still controls the WOW List Page.",
  "The signed-in account allowed Jamie to post as the Page.",
  "The product incorporated ideas from members.",
  "Member suggestions were implemented in the site.",
  "Members were invited to offer feedback, and their feedback shaped the product.",
  "The project invited community members to a design session where they shaped the roadmap.",
  "Jamie is the WOW List Page administrator.",
  "Jamie has admin rights for the WOW List Page.",
  "During review, Jamie was the Page manager.",
  "Jamie owns the WOW List Page.",
  "Jamie administers the WOW List Page.",
  "Jamie served as the Page administrator.",
  "The WOW List Page was administered by Jamie.",
  "Member feedback improved the site.",
  "The team adopted member suggestions.",
  "Jamie manages the WOW List Page."
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
  "WOW List invited members to help shape the site.",
  "Members were invited to provide feedback on product design.",
  "Additional protected controls did not establish a lifetime denominator.",
  "The post does not identify the human author or administrator.",
  "The archive does not establish that Jamie had Page administrator access.",
  "It has not been established that Jamie was the Page administrator.",
  "Jamie was not the Page manager.",
  "No evidence shows member input informed the roadmap.",
  "Member feedback did not improve the site.",
  "The project was not community-governed."
];

for (const statement of boundedStatements) {
  test(`allows bounded wording: ${statement}`, () => {
    assert.equal(hasWowlistFacebookPublicArtifactRisk(statement), false);
  });
}
