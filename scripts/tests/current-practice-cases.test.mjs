import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

// Exact text is an authorization boundary: an accidental stronger projection
// must not inherit the approval granted to these two anonymous paragraphs.
const approved = [
  {
    id: "CLM-WRITTEN-PARTICIPATION-2026",
    project: "written-participation",
    sharedActors: ["ENT-JAMIE-BURKART", "ENT-GATHERING-PARTICIPANTS"],
    occurrence: "written-participation",
    text: "For an artist-coalition gathering, I brought the venue host and a co-organizer into one booking thread and prepared the venue's production sheet. I also worked on a written activity about places participants wanted to protect. Feedback about board legibility and the difficulty of taking notes live informed the proposed design. The gathering used activity sheets and a shared board, with handwritten responses on both. These materials gave the conversation a written record of places, concerns and suggestions for later review."
  },
  {
    id: "CLM-EDITORIAL-ANIMATION-2026",
    project: "editorial-animation",
    sharedActors: ["ENT-JAMIE-BURKART", "ENT-ANIMATION-EDITOR", "ENT-ANIMATION-COALITION"],
    occurrence: "editorial-animation",
    text: "I worked with an editor to focus a coalition animation on the arts gathering her article covered. We separated that brief from the broader coalition story, and I delivered revised square and vertical cuts for review. The project reached two public surfaces: the article included an animation credited to me for the coalition, and an Instagram collaboration post linked readers to the article. The work connected editorial direction, media production and publication while keeping the writer's authorship and the coalition's contribution visible."
  }
];

test("new case projection cannot silently strengthen the exact approved text or widen its destination", () => {
  for (const item of approved) {
    const claim = knowledgeBank.claims.find(({ id }) => id === item.id);
    assert.ok(claim, `Missing approved case ${item.id}`);
    assert.equal(claim.project, item.project);
    assert.deepEqual(claim.projections, [{ key: "case-study", text: item.text, status: "active", citationRequired: true, surfaces: ["/work/technical-operations"] }]);
    assert.equal(claim.status, "confirmed-with-boundary");
    assert.ok(claim.reviewedBy.includes("Jamie Burkart, exact anonymous text approval"));
  }
});

test("two publication surfaces cannot inflate the animation into two projects or duplicate a citation page", () => {
  assert.equal(knowledgeBank.pages.filter(({ id }) => id === "technical-operations").length, 1);
  const page = knowledgeBank.pages.find(({ id }) => id === "technical-operations");
  for (const item of approved) {
    assert.equal(page.occurrences.filter(({ claimId }) => claimId === item.id).length, 1);
    const occurrence = page.occurrences.find(({ id }) => id === item.occurrence);
    assert.equal(occurrence?.claimId, item.id);
    assert.equal(knowledgeBank.intakeItems.filter(({ projectIds }) => projectIds.includes(item.project)).length, 1);
    assert.ok(knowledgeBank.observations.filter(({ project }) => project === item.project).length >= 3);
  }
  assert.equal(new Set(approved.map(({ id }) => knowledgeBank.claims.find((claim) => claim.id === id)?.project)).size, 2);
});

test("approved accounts do not expose the underlying people, evidence locators or media as public sources", () => {
  for (const item of approved) {
    const claim = knowledgeBank.claims.find(({ id }) => id === item.id);
    assert.ok(claim, `Missing approved case ${item.id}`);
    assert.doesNotMatch(JSON.stringify(claim.boundaries), /delivered late|photographed form differs/i, "Public boundaries must not add unapproved historical facts");
    for (const evidence of claim.evidence) {
      const source = knowledgeBank.sources.find(({ id }) => id === evidence.sourceId);
      assert.equal(source?.author, "Jamie Burkart");
      assert.equal(source?.visibility, "public");
      assert.match(source.publicNote, /first-person account.*not independent verification/i);
      assert.doesNotMatch(JSON.stringify(source.doesNotEstablish), /delivered late|photographed form differs/i);
      for (const key of ["canonicalUrl", "archiveUrl", "assetUrl", "protectedLocatorId", "media"]) assert.equal(source[key], undefined, key);
      assert.equal(evidence.confidence, "moderate");
      assert.equal(evidence.renderCitation, true);
      assert.equal(evidence.locator, undefined);
      assert.equal(evidence.internalExcerpt, undefined);
    }
  }
});

test("shared project credit survives alongside Jamie's individual contribution", () => {
  for (const item of approved) {
    const relations = knowledgeBank.agencyRelations.filter(({ project }) => project === item.project);
    assert.equal(relations.length, 2, item.project);
    assert.deepEqual(relations.find(({ creditScope }) => creditScope === "individual")?.actorIds, ["ENT-JAMIE-BURKART"]);
    const shared = relations.find(({ creditScope }) => creditScope === "shared");
    assert.deepEqual(shared?.actorIds, item.sharedActors, "Only actors supported for this shared contribution belong on the relation");
    assert.ok(shared.boundaries.some((boundary) => /sole authorship|sole credit/i.test(boundary)));
    for (const relation of relations) {
      assert.ok(relation.claimIds.includes(item.id));
      assert.doesNotMatch(JSON.stringify(relation.boundaries), /delivered late|photographed form differs/i);
      assert.ok(relation.sourceSupportKeys.length > 0);
      for (const key of relation.sourceSupportKeys) assert.ok(relation.sourceIds.some((id) => knowledgeBank.sources.find((source) => source.id === id)?.supportsGenerally.includes(key)));
    }
  }
});

test("written participation retains unverified safeguards, edition identity and member return as gaps", () => {
  const inquiry = knowledgeBank.researchInquiries.find(({ project }) => project === "written-participation");
  assert.ok(inquiry);
  assert.equal(inquiry.resultStatus, "partially-recovered");
  const limits = inquiry.limitations.join(" ");
  assert.match(limits, /safeguard/i);
  assert.match(limits, /print-master/i);
  assert.match(limits, /completed return to members/i);
  assert.match(limits, /not independent verification/i);
});

test("publication does not become a paid client relationship, reach metric or verified export identity", () => {
  const inquiry = knowledgeBank.researchInquiries.find(({ project }) => project === "editorial-animation");
  assert.ok(inquiry);
  assert.equal(inquiry.resultStatus, "partially-recovered");
  const limits = inquiry.limitations.join(" ");
  assert.match(limits, /paid commission/i);
  assert.match(limits, /institutional client/i);
  assert.match(limits, /audience impact|audience reach/i);
  assert.match(limits, /binary match/i);
  assert.match(limits, /not independent verification/i);
});
