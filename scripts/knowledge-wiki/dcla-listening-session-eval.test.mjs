import assert from "node:assert/strict";
import test from "node:test";
import { evaluateDclaIntake, loadDclaIntake } from "./dcla-listening-session-eval.mjs";
import { compileWiki } from "./lib.mjs";

test("DCLA event, source, and portrait form valid typed wiki records", () => {
  const wiki = compileWiki();
  const ids = [
    "event.nyc.dcla.brooklyn-listening.2026-08-26",
    "source.nycac.dcla-listening-reading.2026-08-26",
    "asset.photo.nycac-dcla-portrait.2026-08-26"
  ];
  for (const id of ids) assert.ok(wiki.byId.has(id), `missing valid record: ${id}`);
  const paths = new Set(ids.map(id => wiki.byId.get(id).path));
  assert.deepEqual(wiki.issues.filter(issue => paths.has(issue.file)), []);
});

test("the reviewed DCLA intake passes without a model call", () => {
  const result = evaluateDclaIntake(loadDclaIntake());
  assert.deepEqual(result.failures, []);
  assert.equal(result.passed, true);
  assert.equal(result.modelCalls, 0);
});

const mutations = [
  ["three pasted copies become three exchanges", c => { c.receipt.followup.uniqueExchanges = 3; }],
  ["interest becomes completed enrollment", c => { c.receipt.followup.membership = "joined"; }],
  ["planned animation becomes a delivered film", c => { c.receipt.followup.animation = "delivered"; }],
  ["offered selects become delivered selects", c => { c.receipt.followup.photoSelects = "delivered"; }],
  ["acknowledgment becomes government endorsement", c => { c.receipt.agency.governmentEndorsement = "established"; }],
  ["participant becomes event host", c => { c.receipt.agency.jamieRole = "host"; }],
  ["policy discussion becomes enactment", c => { c.receipt.agency.policyOutcome = "enacted"; }],
  ["repair becomes a human audio audit", c => { c.receipt.transcript.humanAudioAudit = "complete"; }],
  ["edition disagreement is hidden", c => { c.receipt.transcript.closingRemarksAgreement = "confirmed"; }],
  ["transcript publication is inferred from photo permission", c => { c.receipt.transcript.publication = "cleared"; }],
  ["photo permission is needlessly reopened", c => { c.receipt.photo.rights = "permission-needed"; }],
  ["library presence becomes an exact binding", c => { c.receipt.photo.libraryBinding = "exact-match"; }],
  ["unverified photographer receives named credit", c => { c.receipt.photo.credit = "Photo by an unverified photographer"; }],
  ["old DCLA event is conflated with the new event", c => { c.receipt.eventDate = "2017-01-27"; }],
  ["incomplete transcript is reported as full reading", c => { c.receipt.transcript.contextual.readThroughLine = 176; }],
  ["source edition fingerprint is missing", c => { delete c.receipt.transcript.contextual.sha256; }],
  ["source edition fingerprint is silently replaced", c => { c.receipt.transcript.contextual.sha256 = "a".repeat(64); }],
  ["private source path is added", c => { c.receipt.sourcePath = "/private/source.md"; }],
  ["raw correspondence field is added", c => { c.receipt.followup.body = "private message body"; }],
  ["correspondence state summary becomes collaborator corroboration", c => {
    for (const records of [c.bank.intakeItems, c.registered.intakeItems]) {
      records.find(item => item.id === "INTAKE-DCLA-FOLLOWUP-2026-08-28").kind = "collaborator-note";
    }
  }],
  ["an observation is promoted to a public claim", c => { c.bank.observations[0].claimIds = ["CLM-UNREVIEWED"]; }],
  ["a private source URL is exposed", c => { c.bank.sources[0].canonicalUrl = "https://example.org/private-transcript"; }],
  ["source title leaks a contact address", c => { c.bank.sources[0].title = "person@example.org"; }],
  ["positive contribution is silently dropped", c => { c.bank.observations = c.bank.observations.filter(o => o.id !== "OBS-DCLA-POLICY-TRANSLATION-2026-08-26"); }],
  ["intake is disconnected from its source", c => { c.bank.intakeItems[0].sourceIds = []; }],
  ["new source-backed claim bypasses held intake", c => { c.bank.claims = [{ id: "CLM-UNREVIEWED" }]; }],
  ["registered observations drift from the module", c => { c.registered.observations[0].text = "different account"; }]
];

for (const [name, mutate] of mutations) {
  test(`rejects ${name}`, () => {
    const candidate = loadDclaIntake();
    mutate(candidate);
    const result = evaluateDclaIntake(candidate);
    assert.equal(result.passed, false);
    assert.ok(result.failures.length > 0);
    assert.equal(result.modelCalls, 0);
  });
}
