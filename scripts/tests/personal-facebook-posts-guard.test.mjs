import assert from "node:assert/strict";
import test from "node:test";
import { hasPersonalFacebookPostsPublicArtifactRisk } from "../lib/personal-facebook-posts-guard.mjs";

const prohibited = [
  "This is the complete Facebook history Jamie ever published.",
  "Every Facebook post Jamie ever published was recovered.",
  "All 1,243 records were public.",
  "The 181 mission-routed records prove Jamie's professional priorities.",
  "All 549 links corroborate Jamie's professional claims.",
  "Stakeholder mentions prove engagement and endorsement.",
  "Twenty New York City Council accounts engaged with Jamie.",
  "The reactions show audience reach and impact.",
  "The selected counters represent 165 people.",
  "Jamie was employed by the CouncilStat team.",
  "Jamie controlled hiring for the City Council CouncilStat job.",
  "Jamie alone founded KC Town Hall.",
  "The authenticated tab exposed friends-only posts."
];

for (const value of prohibited) {
  test(`rejects personal Facebook regression: ${value}`, () => {
    assert.equal(hasPersonalFacebookPostsPublicArtifactRisk(value), true);
  });
}

const bounded = [
  "Every record returned by the owner-filtered surface received a disposition.",
  "The 1,243-record control is not a lifetime archive or native Meta export.",
  "Audience labels were not exposed for 973 records.",
  "Mission-routing counts are research aids, not priority or impact measures.",
  "Every posted destination remains a source lead until close reading.",
  "Stakeholder mentions do not establish engagement or endorsement.",
  "Current reactions are mutable observations rather than reach or impact.",
  "Jamie's CouncilStat wording does not establish employment or hiring authority.",
  "The KC Town Hall post credits Julia Fredenburg and does not establish sole founding.",
  "Authentication state and private records remain outside the public repository."
];

for (const value of bounded) {
  test(`allows bounded personal Facebook wording: ${value}`, () => {
    assert.equal(hasPersonalFacebookPostsPublicArtifactRisk(value), false);
  });
}
