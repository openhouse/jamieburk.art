import test from "node:test";
import assert from "node:assert/strict";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { dclaListeningSession, dclaReview } from "../../apps/www/src/data/knowledge-bank/dcla-listening-session-2026-08.ts";
import { evaluateDclaIntake } from "./dcla-listening-session-eval.mjs";

const candidate = () => structuredClone({ review: dclaReview, knowledge: dclaListeningSession });

test("safe intake passes without pretending transcript reading or publication is complete", () => {
  const result = evaluateDclaIntake(candidate());
  assert.deepEqual(result.errors, []);
  assert.equal(result.passed, true);
  assert.equal(result.fullTranscriptReviewed, false);
  assert.equal(result.publicationReady, false);
});

test("every intake, observation, source and inquiry is integrated in the canonical graph", () => {
  for (const key of ["intakeItems", "observations", "sources", "researchInquiries"]) {
    for (const record of dclaListeningSession[key]) {
      assert.deepEqual(knowledgeBank[key].find(({ id }) => id === record.id), record);
    }
  }
});

test("a redacted interest-and-plans summary is not governed collaborator testimony", () => {
  const followups = dclaListeningSession.intakeItems.filter(item => item.id.startsWith("INTAKE-DCLA-FOLLOWUP-"));
  assert.equal(followups.length, 3);
  assert.ok(followups.every(item => item.kind === "analysis-note"));
});

const mutations = [
  ["a follow-up summary becomes collaborator testimony", c => { c.knowledge.intakeItems.find(item => item.id === "INTAKE-DCLA-FOLLOWUP-2026-08-28").kind = "collaborator-note"; }],
  ["three pasted copies become three independent exchanges", c => { c.review.correspondence.uniqueExchanges = 3; }],
  ["joining interest becomes completed membership", c => { c.review.correspondence.membershipCompleted = true; }],
  ["planned animation becomes delivered work", c => { c.review.correspondence.animationDelivered = true; }],
  ["helpful offer becomes a commission", c => { c.review.correspondence.commissionAccepted = true; }],
  ["warmth becomes endorsement", c => { c.review.correspondence.endorsementEstablished = true; }],
  ["hearing reference becomes enactment", c => { c.review.correspondence.enactmentEstablished = true; }],
  ["repair metadata becomes full transcript reading", c => { c.review.transcript.fullTextReviewed = true; }],
  ["an older staged derivative becomes the intended edition", c => { c.review.transcript.edition = "earlier-working-repair"; }],
  ["reported hash becomes independent custody verification", c => { c.review.transcript.localBytesVerified = true; }],
  ["machine comparison becomes human audio review", c => { c.review.transcript.humanAudioReviewed = true; }],
  ["repair becomes certified verbatim", c => { c.review.transcript.verbatimCertified = true; }],
  ["image clearance publishes correspondence", c => { c.review.correspondence.publicationAuthorized = true; }],
  ["image clearance publishes transcript", c => { c.review.transcript.publicationAuthorized = true; }],
  ["photo permissions silently disappear", c => { c.review.photos[0].portfolioPermission = false; }],
  ["unverified catalog association becomes verified", c => { c.review.photos[0].applePhotosBindingVerified = true; }],
  ["unverified person becomes photographer", c => { c.knowledge.sources.find(s => s.media).media.photographer = "Unverified Person"; }],
  ["courtesy credit becomes sole authorship", c => { c.review.photos[0].credit = "Photo by Jamie Burkart"; }],
  ["private source URL leaks", c => { c.knowledge.sources[0].canonicalUrl = "https://example.test/private-source"; }],
  ["private contact enters an observation", c => { c.knowledge.observations[0].text += " Contact person@example.test."; }],
  ["private locator enters a source", c => { c.knowledge.sources[0].publicNote = "/Users/example/private-record.md"; }],
  ["uncorroborated public claim is introduced", c => { c.knowledge.claims.push({ id: "CLM-UNREVIEWED" }); }],
  ["transcript access inquiry is removed", c => { c.knowledge.researchInquiries = []; }],
  ["exact image digest disappears", c => { c.review.photos[0].sha256 = ""; }],
  ["permission scope expands beyond portfolio", c => { c.review.photos[0].destination = "all-publications"; }],
  ["photo silently becomes public before editorial placement", c => { c.knowledge.sources.find(s => s.media).media.publicDisplayStatus = "cleared"; }]
];

for (const [name, mutate] of mutations) {
  test(`reject: ${name}`, () => {
    const changed = candidate();
    mutate(changed);
    assert.equal(evaluateDclaIntake(changed).passed, false);
  });
}
