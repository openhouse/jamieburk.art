import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { dclaReview } from "../../apps/www/src/data/knowledge-bank/dcla-listening-session-2026-08.ts";
import { dclaAnimationPublication, dclaPublicationReview } from "../../apps/www/src/data/knowledge-bank/dcla-animation-publication-2026-10.ts";
import { evaluateDclaPublication } from "./dcla-animation-publication-eval.mjs";

const candidate = () => structuredClone({ review: dclaPublicationReview, knowledge: dclaAnimationPublication, graph: knowledgeBank });

test("current publication evidence passes without turning visual inspection into audio or release approval", () => {
  const result = evaluateDclaPublication(candidate());
  assert.deepEqual(result.errors, []);
  assert.equal(result.passed, true);
  assert.equal(result.websiteMediaReady, false);
});

test("schema-defaulted optional arrays are accepted without throwing", () => {
  const input = candidate();
  delete input.knowledge.observations[0].comparisonSourceIds;
  let result;
  assert.doesNotThrow(() => { result = evaluateDclaPublication(input); });
  assert.equal(result.passed, true);
});

test("later public animation credit is integrated without completing the August plan retroactively", () => {
  const claim = knowledgeBank.claims.find(item => item.id === "CLM-DCLA-ANIMATION-PUBLISHED-CREDIT");
  assert.ok(claim, "The later article attribution needs its own canonical claim.");
  assert.equal(claim.status, "confirmed-with-boundary");
  assert.ok(claim.projections.every(item => item.status === "hold" && item.surfaces.length === 0));
  assert.ok(claim.evidence.some(item => item.sourceId === "SRC-DCLA-CREATIVE-NEW-YORK-2026-10-03" && item.relationship === "direct-support"));
  assert.equal(dclaReview.reviewedAt, "2026-08-29");
  assert.equal(dclaReview.correspondence.animationDelivered, false);
  assert.equal(dclaReview.transcript.fullTextReviewed, false);
});

test("held publication evidence has no public citation occurrence or registry projection", () => {
  const claimId = "CLM-DCLA-ANIMATION-PUBLISHED-CREDIT";
  const registry = JSON.parse(readFileSync(new URL("../../apps/www/src/data/knowledge-bank/public-registry.json", import.meta.url)));
  assert.equal(knowledgeBank.pages.some(page => page.occurrences.some(item => item.claimId === claimId)), false);
  assert.equal(registry.claims.some(item => item.id === claimId), false);
  // Public article/reel sources can be shared by a separately reviewed active
  // outcome claim. The held credit and protected evidence must stay unexposed.
  const sourceIds = new Set(dclaAnimationPublication.sources.filter(item => item.visibility !== "public").map(item => item.id));
  assert.equal(registry.sources.some(item => sourceIds.has(item.id)), false);
});

test("canonical integration retains every publication record and its source links", () => {
  for (const key of ["intakeItems", "observations", "sources", "claims", "researchInquiries"]) {
    for (const record of dclaAnimationPublication[key]) {
      assert.deepEqual(knowledgeBank[key].find(item => item.id === record.id), record);
    }
  }
});

const mutations = [
  ["article header becomes the first embed date", c => { c.review.article.embedFirstPublishedAt = "2026-10-03"; }],
  ["a malformed review date passes lexical chronology", c => { c.review.reviewedAt = "2099-99-99"; c.review.article.inspectedAt = "2099-99-99"; }],
  ["a nonexistent calendar day passes lexical chronology", c => { c.review.reviewedAt = "2027-02-30"; c.review.article.inspectedAt = "2027-02-30"; }],
  ["source access date disagrees with the inspection", c => { c.knowledge.sources[0].accessedAt = "2026-10-17"; }],
  ["claim review date disagrees with the inspection", c => { c.knowledge.claims[0].reviewedAt = "2026-10-17"; }],
  ["prose invents October 3 first publication", c => { c.knowledge.observations[1].text = "The animation was first published on October 3, 2026."; }],
  ["missing visual samples become a complete review", c => { c.review.inspection.sampledSecondBins.pop(); }],
  ["repeated sample seconds hide a missing second", c => { c.review.inspection.sampledSecondBins[29] = 28; }],
  ["a malformed derivative digest is accepted", c => { c.review.inspection.derivativeSha256 = "unknown"; }],
  ["another valid digest replaces the inspected derivative", c => { c.review.inspection.derivativeSha256 = "a".repeat(64); }],
  ["frame rate is changed without a new inspection", c => { c.review.inspection.framesPerSecond = 60; }],
  ["video codec is changed without a new inspection", c => { c.review.inspection.videoCodec = "H264"; }],
  ["audio codec is changed without a new inspection", c => { c.review.inspection.audioCodec = "MP3"; }],
  ["audio sample rate is changed without a new inspection", c => { c.review.inspection.audioSampleRate = 48000; }],
  ["audio channel count is changed without a new inspection", c => { c.review.inspection.audioChannels = 1; }],
  ["a declared human audio review replaces visual sampling", c => { c.review.inspection.humanAudioReviewed = true; }],
  ["visual inspection certifies speech", c => { c.review.inspection.verbatimCertified = true; }],
  ["a short reel becomes the full session", c => { c.review.inspection.fullSessionReviewed = true; }],
  ["an earlier history-transition intention becomes observed", c => { c.review.inspection.widerCoalitionHistoryObserved = true; }],
  ["prose asserts a history transition despite false state", c => { c.knowledge.observations[4].text = "The wider Coalition history is shown in the animation."; }],
  ["animation credit becomes photography", c => { c.knowledge.claims[0].internalClaim += " Jamie photographed the whole session."; }],
  ["animation credit becomes audio editing", c => { c.knowledge.claims[0].projections[0].text += " Jamie edited the audio."; }],
  ["animation credit becomes caption selection", c => { c.knowledge.observations[0].text += " Jamie selected the captions."; }],
  ["account display becomes institutional endorsement in prose", c => { c.knowledge.observations[5].text += " DCLA endorsed the requests."; }],
  ["account display becomes attendance", c => { c.review.collaborators.attendanceEstablished = true; }],
  ["a collaborator is invented in the inspection roster", c => { c.review.collaborators.accounts[0] = "unobserved-account"; }],
  ["discussion becomes adopted policy", c => { c.review.institutionalPolicyAdopted = true; }],
  ["media rights are cleared without evidence", c => { c.knowledge.sources[1].media.rightsStatus = "cleared"; }],
  ["deleting media metadata removes the release hold", c => { delete c.knowledge.sources[1].media; }],
  ["website media authorization is invented", c => { c.review.websiteMediaUse.authorized = true; }],
  ["a held projection is activated", c => { c.knowledge.claims[0].projections[0].status = "active"; }],
  ["a held projection selects a surface", c => { c.knowledge.claims[0].projections[0].surfaces = ["/work/fair-rent-nyc"]; }],
  ["a page silently begins citing the held claim", c => { c.graph.pages[0].occurrences.push({ id: "unapproved-dcla", claimId: "CLM-DCLA-ANIMATION-PUBLISHED-CREDIT", projection: "case-study" }); }],
  ["a collaborator screenshot replaces direct article support", c => { c.knowledge.claims[0].evidence[0].sourceId = "SRC-DCLA-COLLABORATOR-PANEL-2026-10-18"; }],
  ["support keys do not exist on their source", c => { c.knowledge.claims[0].evidence[0].supports = ["paid commission"]; }],
  ["an observation references an absent source", c => { c.knowledge.observations[0].sourceId = "SRC-MISSING"; }],
  ["an inquiry references an absent source", c => { c.knowledge.researchInquiries[0].sourceIds = ["SRC-MISSING"]; }],
  ["an observation source is omitted from its owning intake", c => { c.knowledge.intakeItems[0].sourceIds = c.knowledge.intakeItems[0].sourceIds.filter(id => id !== "SRC-DCLA-CREATIVE-NEW-YORK-2026-10-03"); }],
  ["an intake omits an observation", c => { c.knowledge.intakeItems[0].observationIds.pop(); }],
  ["a replay introduces a duplicate stable source", c => { c.knowledge.sources.push(structuredClone(c.knowledge.sources[1])); }],
  ["an alternate ID duplicates the reel URL", c => { c.knowledge.sources.push({ ...c.knowledge.sources[1], id: "SRC-DUPLICATE-REEL" }); }],
  ["a signed download URL replaces the canonical URL", c => { c.knowledge.sources[1].canonicalUrl = "https://video.example.test/video.mp4?signature=secret"; }],
  ["a media download becomes a public asset", c => { c.knowledge.sources[1].assetUrl = "https://example.test/video.mp4"; }],
  ["a private inspection path leaks", c => { c.knowledge.sources[2].publicNote += " /private/tmp/inspection/reel.mp4"; }],
  ["an unknown field conceals a private locator before schema parsing", c => { c.knowledge.sources[2].download = "/private/tmp/inspection/reel.mp4"; }],
  ["a review file claims an unobserved production role", c => { c.review.credit.audioEditingEstablished = true; }],
  ["a source note invents photography authorship", c => { c.knowledge.sources[0].publicNote = "Jamie photographed the whole session."; }],
  ["an inquiry finding invents photography authorship", c => { c.knowledge.researchInquiries[0].findings = ["Jamie photographed the whole session."]; }],
  ["a caption is used to identify a pictured speaker", c => { c.knowledge.observations[3].text += " The pictured speaker is Diya Vij."; }],
  ["inquiry deletion loses unresolved attribution and reuse", c => { c.knowledge.researchInquiries = []; }]
];

mutations.push(
  ["deleting every observation and reciprocal link hides the evidence population", c => { c.knowledge.observations = []; c.knowledge.intakeItems[0].observationIds = []; }],
  ["deleting caption evidence and its reciprocal link hides one inspected record", c => { c.knowledge.observations = c.knowledge.observations.filter(item => item.id !== "OBS-DCLA-ANIMATION-CAPTION-SEQUENCE"); c.knowledge.intakeItems[0].observationIds = c.knowledge.intakeItems[0].observationIds.filter(id => id !== "OBS-DCLA-ANIMATION-CAPTION-SEQUENCE"); }],
  ["an observation is reassigned to another project", c => { c.knowledge.observations[0].project = "callnyc"; }],
  ["the credit claim is reassigned to another project", c => { c.knowledge.claims[0].project = "callnyc"; }],
  ["the inquiry is reassigned to another project", c => { c.knowledge.researchInquiries[0].project = "callnyc"; }],
  ["the intake is reassigned to another project", c => { c.knowledge.intakeItems[0].projectIds = ["callnyc"]; }],
  ["private inspection custody becomes a live public source", c => { Object.assign(c.knowledge.sources[2], { visibility: "public", preservationStatus: "live", canonicalUrl: "https://example.test/inspection" }); }],
  ["removing both protected inspection sources erases the reviewed evidence", c => {
    const removed = new Set(["SRC-DCLA-ANIMATION-VISUAL-REVIEW-2026-10-18", "SRC-DCLA-COLLABORATOR-PANEL-2026-10-18"]);
    c.knowledge.sources = c.knowledge.sources.filter(item => !removed.has(item.id));
    c.knowledge.observations = c.knowledge.observations.filter(item => !removed.has(item.sourceId));
    c.knowledge.intakeItems[0].sourceIds = c.knowledge.intakeItems[0].sourceIds.filter(id => !removed.has(id));
    c.knowledge.intakeItems[0].observationIds = c.knowledge.observations.map(item => item.id);
    c.knowledge.researchInquiries[0].sourceIds = c.knowledge.researchInquiries[0].sourceIds.filter(id => !removed.has(id));
  }],
  ["article-credit observation is rebound to collaborator screenshots", c => { c.knowledge.observations[0].sourceId = "SRC-DCLA-COLLABORATOR-PANEL-2026-10-18"; }],
  ["the claim loses its boundaries", c => { c.knowledge.claims[0].boundaries = []; }],
  ["the claim loses its anti-claims", c => { c.knowledge.claims[0].antiClaims = []; }],
  ["the claim loses its reviewer attribution", c => { c.knowledge.claims[0].reviewedBy = []; }],
  ["source scope limits are removed", c => { c.knowledge.sources.forEach(item => { item.doesNotEstablish = []; }); }],
  ["an observation loses its interpretation limits", c => { c.knowledge.observations[0].limitations = []; }],
  ["an observation is no longer public-safe", c => { c.knowledge.observations[0].publicSafe = false; }],
  ["a research source loses its custody identifier", c => { delete c.knowledge.sources[2].protectedLocatorId; }],
  ["the published article is relabeled as a personal research note", c => { c.knowledge.sources[0].kind = "research-run"; }]
);

for (const [name, mutate] of mutations) {
  test(`reject: ${name}`, () => {
    const changed = candidate();
    mutate(changed);
    assert.equal(evaluateDclaPublication(changed).passed, false);
  });
}

for (const { id } of dclaAnimationPublication.observations) {
  test(`reject: removing the source anchor from ${id}`, () => {
    const changed = candidate();
    delete changed.knowledge.observations.find(item => item.id === id).locator;
    assert.equal(evaluateDclaPublication(changed).passed, false);
  });
  test(`reject: a whitespace-only source anchor for ${id}`, () => {
    const changed = candidate();
    changed.knowledge.observations.find(item => item.id === id).locator = " \n\t ";
    assert.equal(evaluateDclaPublication(changed).passed, false);
  });
}
