import test from "node:test";
import assert from "node:assert/strict";
import { corpus, materialize } from "./knowledge-reading-cases.mjs";
import { reviewReturn as review } from "./knowledge-reading.mjs";
const reviewReturn = packet => review(packet, corpus.inventory);
for (const fixture of corpus.cases) {
  test(fixture.id, () => {
    const actual = reviewReturn(materialize(fixture));
    assert.equal(actual.decision, fixture.expected_decision);
    if (fixture.expected_reason) assert.ok(actual.reasons.includes(fixture.expected_reason), JSON.stringify(actual));
    if (fixture.expected_decision === "hold") assert.equal(actual.card, null);
  });
}
test("reader sees interpretation before mechanical observations and can return to dialogue", () => {
  const result = reviewReturn(structuredClone(corpus.base));
  assert.deepEqual(Object.keys(result.card), ["title", "change", "interpretation", "evidence", "uncertainty", "disposition", "context", "disagreements", "feedback", "retired_drafts", "scaffolds"]);
  assert.equal(result.card.context.previous, "turn-1");
  assert.equal(result.card.scaffolds.expanded, false);
  assert.equal(result.card.interpretation.status, "unreviewed-candidate");
  assert.deepEqual(result.card.retired_drafts, ["draft-introduction"]);
  assert.equal(result.card.disagreements[0].disposition, "unresolved");
});
test("an automatic scaffold has no authored interpretation", () => {
  const packet = materialize(corpus.cases.find(c => c.id === "scaffold-remains-scaffold"));
  assert.equal(reviewReturn(packet).card.interpretation, null);
});
test("completed introduction does not retire a booking draft", () => {
  const packet = structuredClone(corpus.base);
  packet.drafts.push({id:"draft-booking",scope:"booking",target_state:"booked"});
  assert.deepEqual(reviewReturn(packet).card.retired_drafts, ["draft-introduction"]);
});
test("review does not mutate the historical input", () => {
  const packet = structuredClone(corpus.base), before = structuredClone(packet);
  reviewReturn(packet);
  assert.deepEqual(packet, before);
});
test("a previous inventory is required rather than self-certified completeness", () => {
  assert.equal(review(structuredClone(corpus.base)).decision, "hold");
});
