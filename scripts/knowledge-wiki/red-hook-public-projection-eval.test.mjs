import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { getClaimProjection } from "../../apps/www/src/data/knowledge-bank/public.ts";

const moduleUrl = new URL("./red-hook-public-projection-eval.mjs", import.meta.url);
async function implementation() {
  const module = await import(moduleUrl.href).catch(error => {
    if (error.code === "ERR_MODULE_NOT_FOUND") return {};
    throw error;
  });
  assert.equal(typeof module.evaluateRedHookProjection, "function", "the publication gate must evaluate candidate records");
  return module;
}

test("the public bank retains two separately scoped Red Hook contribution claims", () => {
  const claims = knowledgeBank.claims.filter(claim => claim.project === "red-hook-portraits" && claim.projections.some(projection => projection.status === "active"));
  assert.equal(claims.length, 2, "audio editing and exhibition help require separate support");
  assert.ok(claims.every(claim => claim.evidence.length && claim.boundaries.length));
});

test("the exact public candidate passes without releasing the photographs", async () => {
  const { evaluateRedHookProjection, loadRedHookCandidate } = await implementation();
  const result = evaluateRedHookProjection(loadRedHookCandidate());
  assert.equal(result.passed, true, JSON.stringify(result.errors));
  assert.equal(result.imagesPublished, false);
});

test("the page can resolve the two scoped claims but not the held photo credit", () => {
  const audio = getClaimProjection("CLM-RED-HOOK-SEVEN-ORAL-HISTORIES", "technical-operations", "/work/technical-operations");
  const exhibition = getClaimProjection("CLM-RED-HOOK-EXHIBITION-QR-SUPPORT", "technical-operations", "/work/technical-operations");
  assert.match(audio.text, /seven oral-history recordings/);
  assert.match(exhibition.text, /helped prepare, print, and install/);
  assert.throws(() => getClaimProjection("CLM-RED-HOOK-PHOTO-AUTHORSHIP", "photo-caption", "/work/technical-operations"), /Unknown public claim/);
});

const mutations = [
  ["rejects 50 recordings even when the exhibition contains 50 portraits", candidate => {
    candidate.knowledge.claims[0].projections[0].text = "I edited 50 oral-history recordings to accompany painted portraits of the subjects.";
  }, "audio-scope"],
  ["rejects sole production credit for collaborative exhibition help", candidate => {
    candidate.knowledge.claims[1].projections[0].text = "I alone prepared, printed, and installed QR codes for an exhibition of all 50 portraits.";
  }, "shared-credit"],
  ["rejects a portrait count substituted for an audio count in structured evidence", candidate => { candidate.review.audioRecordingCount = 50; }, "audio-scope"],
  ["rejects a completed playback claim without a verified listening path", candidate => { candidate.knowledge.claims[1].projections[0].text += " Every QR code played the correct recording."; }, "unverified-outcome"],
  ["keeps intended portrait accompaniment distinct from verified exhibition playback", candidate => {
    candidate.knowledge.claims[0].projections[0].text = "I edited seven oral-history recordings. Each accompanied a painted portrait of its subject.";
  }, "intended-use"],
  ["rejects private source paths in a public source note", candidate => { candidate.knowledge.sources[0].publicNote += " /Users/example/private-file"; }, "private-locator"],
  ["rejects confidential source IDs as public locators", candidate => { candidate.knowledge.sources[0].protectedLocatorId = "PRIVATE-RECEIPT-123"; }, "private-locator"],
  ["rejects an independently audited label on a self-reported contribution", candidate => { candidate.review.evidenceClass = "independently-audited"; }, "evidence-class"],
  ["rejects editing relabeled as originating the exhibition", candidate => { candidate.knowledge.agencyRelations[0].action = "originated"; }, "agency"],
  ["rejects an agency relation detached from its source support", candidate => { candidate.knowledge.agencyRelations[0].sourceIds = []; }, "agency"],
  ["does not turn photographer confirmation into artwork clearance", candidate => { candidate.review.photos.artworkUseCleared = true; }, "photo-clearance"],
  ["does not turn a staging request into photo publication permission", candidate => { candidate.review.photos.publicationAuthorized = true; }, "photo-clearance"],
  ["blocks a new image in the Red Hook section while clearance is unresolved", candidate => { candidate.pageSection += '<img src="/images/exhibition.jpg" alt="Portrait" />'; }, "photo-publication"],
  ["blocks imported image components as well as raw image tags", candidate => { candidate.pageSection += '<PortraitPhoto />'; }, "photo-publication"],
  ["blocks a held photo projection from receiving an active surface", candidate => { const projection = candidate.knowledge.claims[2].projections[0]; projection.status = "active"; projection.surfaces = ["/work/technical-operations"]; }, "photo-publication"],
  ["blocks internal clearance notes in visitor-facing copy", candidate => { candidate.pageSection += '<p>Photo publication is held pending clearance.</p>'; }, "visitor-copy"]
];

for (const [name, mutate, code] of mutations) {
  test(name, async () => {
    const { evaluateRedHookProjection, loadRedHookCandidate } = await implementation();
    const candidate = structuredClone(loadRedHookCandidate());
    mutate(candidate);
    const result = evaluateRedHookProjection(candidate);
    assert.equal(result.passed, false);
    assert.ok(result.errors.some(error => error.code === code), JSON.stringify(result.errors));
  });
}
