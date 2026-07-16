import assert from "node:assert/strict";
import test from "node:test";
import { findPersonalFacebookPublicArtifactRisk } from "../lib/personal-facebook-posts-validation.mjs";

const prohibited = [
  "This is the complete Facebook history Jamie ever published.",
  "All 1,243 records were public.",
  "Mission-routing frequency proves Jamie's professional impact.",
  "All 549 links corroborate Jamie's record.",
  "Stakeholder mentions prove engagement and endorsement.",
  "The reactions measure reach and impact.",
  "Jamie was employed by the CouncilStat team.",
  "Jamie alone founded KC Town Hall."
];

for (const statement of prohibited) {
  test(`rejects personal Facebook overclaim: ${statement}`, () => {
    assert.ok(findPersonalFacebookPublicArtifactRisk(statement));
  });
}

const bounded = [
  "Every record returned by the owner-filtered surface received a disposition.",
  "The 1,243-record control is not a lifetime archive or native Meta export.",
  "Audience labels were not exposed for 973 records.",
  "Routing counts are research aids, not impact measures.",
  "Every destination remains a source lead until close reading.",
  "Stakeholder mentions do not establish engagement or endorsement.",
  "Current reactions are mutable observations rather than reach or impact.",
  "Jamie's CouncilStat wording does not establish employment or hiring authority.",
  "The KC Town Hall post credits Julia Fredenburg and does not establish sole founding."
];

for (const statement of bounded) {
  test(`allows bounded personal Facebook wording: ${statement}`, () => {
    assert.equal(findPersonalFacebookPublicArtifactRisk(statement), null);
  });
}
