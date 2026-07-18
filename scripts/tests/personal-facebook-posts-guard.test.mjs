import assert from "node:assert/strict";
import test from "node:test";
import { hasPersonalFacebookPostsPublicArtifactRisk } from "../lib/personal-facebook-posts-guard.mjs";

const prohibitedMutations = [
  "This is the complete Facebook history Jamie ever published.",
  "We recovered every Facebook post Jamie ever published.",
  "All 1,243 records were public.",
  "The full 1,243 posts are public.",
  "The 181 mission-routed records prove Jamie's professional priorities.",
  "Mission-routing counts measure Jamie's effort and impact.",
  "All 549 links corroborate Jamie's professional claims.",
  "Stakeholder mentions prove engagement and endorsement.",
  "Twenty New York City Council accounts engaged with Jamie.",
  "The reactions show audience reach and impact.",
  "The selected counters represent 165 people reached.",
  "Jamie was employed by the CouncilStat team.",
  "Jamie controlled hiring for the City Council CouncilStat job.",
  "Jamie alone founded KC Town Hall.",
  "The authenticated tab exposed friends-only posts."
];

for (const mutation of prohibitedMutations) {
  test(`rejects personal Facebook regression: ${mutation}`, () => {
    assert.equal(hasPersonalFacebookPostsPublicArtifactRisk(mutation), true);
  });
}

const boundedStatements = [
  "Every record returned by the July 13 owner-filtered surface received a disposition.",
  "The 1,243-record control is not a lifetime archive or native Meta export.",
  "Audience labels were not exposed for 973 records.",
  "The 181 mission-routed records are research-navigation aids, not professional priorities or impact measures.",
  "Every posted destination remains a source lead until close reading.",
  "Stakeholder mentions do not establish engagement or endorsement.",
  "Current reactions are mutable observations rather than reach or impact.",
  "Jamie's CouncilStat wording does not establish employment, title, or hiring authority.",
  "The KC Town Hall post credits Julia Fredenburg and does not establish sole founding.",
  "Authentication state and private records remain outside the public repository."
];

for (const statement of boundedStatements) {
  test(`allows bounded personal Facebook wording: ${statement}`, () => {
    assert.equal(hasPersonalFacebookPostsPublicArtifactRisk(statement), false);
  });
}
