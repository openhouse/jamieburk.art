import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluateIRLRecord, evaluateIRLProjection, ledgerFingerprint } from "./irl-changelog-eval.mjs";

const suite = JSON.parse(readFileSync(new URL("../../evals/knowledge-bank/irl-changelog-rfc-evals.json", import.meta.url)));
const fresh = () => structuredClone(suite.baseline);

const privateUse={context:"synthetic:personal-work",recipient:"actor:synthetic-operator",
  purpose:"working-understanding",transformation:"bounded-summary"};
function contextReviews(record) {
  // Entirely synthetic current-adapter verdicts, never human authorization.
  return Object.fromEntries(record.sources.map(s=>[s.id,{
    receipt_id:"review:synthetic-"+s.id,reviewed_by:"actor:synthetic-reviewer",decision:"permitted",
    source_revision:s.revision,source_sha256:s.sha256,source_flow:structuredClone(s.flow),
    use:structuredClone(privateUse)
  }]));
}
function project(record, projection, reviews=contextReviews(record)) {
  return evaluateIRLProjection(record,{use:structuredClone(privateUse),...projection},{contextReviews:reviews});
}
function view(record, ids=["change:example-a"], scope=["entity:example-project"]) {
  return {ledger_fingerprint:ledgerFingerprint(record),entity_ids:scope,basis_entry_ids:ids};
}

for (const scenario of suite.cases) {
  test(scenario.id, () => {
    const record = fresh();
    for (const [keys, value] of scenario.changes) {
      let target = record;
      for (const key of keys.slice(0,-1)) target = target[key];
      target[keys.at(-1)] = value;
    }
    assert.deepEqual(evaluateIRLRecord(record), scenario.expected);
  });
}
function appended() {
  const record = fresh();
  record.entries.push({...structuredClone(record.entries[0]), id:"change:example-b",
    kind:"correction", learned_on:"2020-01-05", recorded_at:"2020-01-06T12:00:00Z",
    now:"The prior timing report was corrected.",
    corrections:[{entry_id:"change:example-a",field:"now",reason:"The later source corrects the reported timing."}]});
  return record;
}
test("append a scoped correction without changing historical understanding", () => {
  const previous = fresh();
  assert.equal(evaluateIRLRecord(appended(), {previous}).decision, "eligible-for-human-review");
  assert.equal(previous.entries[0].now, "The reported timing has become more specific.");
});
test("rewriting committed history is denied", () => {
  const record = appended(); record.entries[0].now = "Silently replaced.";
  assert.ok(evaluateIRLRecord(record,{previous:fresh()}).reasons.includes("history-rewritten"));
});
test("changing an old source pin is denied", () => {
  const record=fresh(); record.sources[0].sha256="c".repeat(64);
  assert.ok(evaluateIRLRecord(record,{previous:fresh()}).reasons.includes("history-rewritten"));
});
test("a correction cannot target itself or a future entry", () => {
  const record=appended(); record.entries[1].corrections[0].entry_id="change:example-b";
  assert.ok(evaluateIRLRecord(record).reasons.includes("invalid-correction"));
});
test("duplicate entry identity is denied", () => {
  const record=appended(); record.entries[1].id="change:example-a";
  assert.ok(evaluateIRLRecord(record).reasons.includes("duplicate-id"));
});
test("malformed input fails closed instead of throwing", () => {
  for (const record of [null, {}, {entries:[null]}, {...fresh(), sources:[null]}]) {
    assert.equal(evaluateIRLRecord(record).decision,"deny");
  }
});
test("a projection of the exact complete basis remains a non-authorizing candidate", () => {
  const record=fresh();
  assert.deepEqual(project(record,{
    ledger_fingerprint:ledgerFingerprint(record),
    entity_ids:["entity:example-project"], basis_entry_ids:["change:example-a"]
  }),{status:"current-candidate",publication_authorized:false,action_authorized:false});
});
test("a new correction makes an earlier projection stale", () => {
  assert.equal(project(appended(),{
    ledger_fingerprint:ledgerFingerprint(fresh()),
    entity_ids:["entity:example-project"], basis_entry_ids:["change:example-a"]
  }).status,"stale");
});
test("a matching fingerprint cannot hide an omitted correction", () => {
  const record=appended();
  assert.equal(project(record,{
    ledger_fingerprint:ledgerFingerprint(record),
    entity_ids:["entity:example-project"], basis_entry_ids:["change:example-a"]
  }).status,"stale");
});
test("unknown projection scope cannot look current", () => {
  const record=fresh();
  assert.equal(project(record,{
    ledger_fingerprint:ledgerFingerprint(record),
    entity_ids:["entity:missing"], basis_entry_ids:[]
  }).status,"hold");
});

test("a correction linked through history cannot disappear from a subject projection", () => {
  const record=appended();
  record.entities.push({id:"entity:another-project",type:"project",resolution:"resolved"});
  record.entries[1].about=[{id:"entity:another-project",type:"project"}];
  const projection={ledger_fingerprint:ledgerFingerprint(record),
    entity_ids:["entity:example-project"],basis_entry_ids:["change:example-a"]};
  assert.equal(project(record,projection).status,"stale");
  projection.basis_entry_ids.push("change:example-b");
  assert.equal(project(record,projection).status,"current-candidate");
});
test("malformed nested evidence and corrections cannot crash the boundary", () => {
  const inputs=[
    {...fresh(),entries:[{...fresh().entries[0],corrections:{}}]},
    {...fresh(),entries:[{...fresh().entries[0],kind:"attributed-report",evidence:[null],attribution:{entity_id:"person:example"}}]}
  ];
  for(const record of inputs) assert.equal(evaluateIRLRecord(record).decision,"deny");
});
test("an explicit unknown event date is held without inventing an occurrence date", () => {
  const record=fresh();
  record.entries[0].event_time={start:null,end:null,reason:"The source gives no occurrence date."};
  assert.deepEqual(evaluateIRLRecord(record),{
    decision:"hold",reasons:["event-time-unknown"],publication_authorized:false,action_authorized:false});
});

test("the prior reference schema is not silently reinterpreted as the revised contract", () => {
  const record=fresh(); record.schema_version=1;
  assert.equal(evaluateIRLRecord(record).decision,"deny");
});
test("changing the ledger observer cannot rewrite who knew the prior history", () => {
  const record=fresh(); record.observer_id="actor:a-different-observer";
  assert.ok(evaluateIRLRecord(record,{previous:fresh()}).reasons.includes("history-rewritten"));
});
test("projection requires an explicit requested use", () => {
  const record=fresh();
  assert.equal(evaluateIRLProjection(record,view(record),{contextReviews:contextReviews(record)}).status,"hold");
});
test("private storage does not authorize a new recipient purpose or transformation", () => {
  const record=fresh(), reviews=contextReviews(record);
  for(const [key,value] of [["context","synthetic:another-context"],["recipient","actor:another-reader"],
    ["purpose","relationship-ranking"],["transformation","verbatim-extract"]]) {
    assert.equal(project(record,{...view(record),use:{...privateUse,[key]:value}},reviews).status,"hold");
  }
});
test("a global permitted flag cannot replace a current contextual review", () => {
  const record=fresh();
  assert.equal(project(record,view(record),{}).status,"hold");
  const reviews=contextReviews(record); reviews["evidence:example"].decision="denied";
  assert.equal(project(record,view(record),reviews).status,"hold");
});
test("changed source context cannot reuse the old contextual review", () => {
  const record=fresh(), reviews=contextReviews(record);
  record.sources[0].flow.subjects=["actor:a-different-subject"];
  assert.equal(project(record,view(record),reviews).status,"hold");
});
test("changed source bytes cannot reuse the old contextual review", () => {
  const record=fresh(), reviews=contextReviews(record);
  record.sources[0].sha256="c".repeat(64);
  assert.equal(project(record,view(record),reviews).status,"hold");
});
test("an unrelated held entry does not block a complete subject view", () => {
  const record=appended();
  record.entries[1].kind="understanding"; record.entries[1].corrections=[];
  record.entities.push({id:"entity:another-project",type:"project",resolution:"resolved"});
  record.entries[1].about=[{id:"entity:another-project",type:"project"}];
  record.entries[1].event_time={start:null,end:null,reason:"Unknown from source."};
  assert.equal(evaluateIRLRecord(record).decision,"hold");
  assert.equal(project(record,view(record)).status,"current-candidate");
});
test("a held dependency still blocks the subject that relies on it", () => {
  const record=appended();
  record.entries[1].event_time={start:null,end:null,reason:"Unknown from source."};
  assert.equal(project(record,view(record,["change:example-a","change:example-b"])).status,"hold");
});
test("a correction-first subject view includes its historical target", () => {
  const record=appended();
  record.entities.push({id:"entity:another-project",type:"project",resolution:"resolved"});
  record.entries[1].about=[{id:"entity:another-project",type:"project"}];
  assert.equal(project(record,view(record,["change:example-a","change:example-b"],["entity:another-project"])).status,"current-candidate");
  assert.equal(project(record,view(record,["change:example-b"],["entity:another-project"])).status,"stale");
});
