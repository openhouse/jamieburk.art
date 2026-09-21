import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { admitOpportunities, packetState, STAGES, METHOD } from './opportunity-packets.mjs';
import { opportunityAdmissionRecord } from './sync-opportunity-packets.mjs';

const role = () => ({ id: 'example-123', kind: 'opportunity', opportunity_type: 'job', title: 'Program manager', employer: 'Example', job_id: '123', source_path: 'opportunities/example.md', source_hash: 'a'.repeat(64) });
test('one precheck preserves existing gates and runs automatic admission checks', () => {
  const raw = readFileSync(new URL('../package.json', import.meta.url), 'utf8');
  assert.equal([...raw.matchAll(/"precheck"\s*:/g)].length, 1);
  const command = JSON.parse(raw).scripts.precheck;
  for (const gate of ['test:audio-runtime', 'test:mail-runtime', 'test:irl-changelog', 'test:irl-rfc', 'packets:check', 'packets:test']) assert.ok(command.includes(gate), gate);
});
test('every new job enters the full OTI workflow without a separate allowlist', () => {
  const [packet] = admitOpportunities([role()]);
  assert.deepEqual(packet.required_stages, STAGES);
  assert.equal(packet.method, METHOD);
  assert.equal(packet.next_action, STAGES[0]);
  assert.equal(packet.ready, false);
});
test('duplicate job identities merge provenance, never duplicate work', () => {
  const packets = admitOpportunities([role(), { ...role(), id: 'another-page', source_path: 'other.md' }]);
  assert.equal(packets.length, 1);
  assert.equal(packets[0].sources.length, 2);
});
test('events and unknown opportunity types require routing, not invented job applications', () => {
  for (const type of ['event', undefined]) {
    const [p] = admitOpportunities([{ ...role(), opportunity_type: type, job_id: undefined }]);
    assert.equal(p.next_action, 'classify-opportunity');
    assert.equal(p.ready, false);
  }
});
test('all stages require exact candidate-bound evidence; a passing label is insufficient', () => {
  const [p] = admitOpportunities([role()]);
  assert.equal(packetState(p, { stages: Object.fromEntries(STAGES.map(s => [s, { status: 'passed' }])) }).ready, false);
});
test('source, method, artifact, or voice changes invalidate completed-stage receipts', () => {
  const [p] = admitOpportunities([role()]);
  const context = { artifact_hash: 'b'.repeat(64), voice_version: 'v1', policy_hash: 'c'.repeat(64) };
  const binding = { source_hash: p.source_hash, method: METHOD, ...context };
  const receipts = { context, stages: Object.fromEntries(STAGES.map(s => [s, { status: 'passed', binding, evidence: ['receipts/review.json'] }])) };
  assert.equal(packetState(p, receipts).ready, true);
  assert.equal(packetState({ ...p, source_hash: 'changed' }, receipts).ready, false);
  assert.equal(packetState({ ...p, method: 'changed' }, receipts).ready, false);
  for (const field of Object.keys(context)) {
    assert.equal(packetState(p, { ...receipts, context: { ...context, [field]: 'changed' } }).ready, false);
  }
});
test('closed roles and hard-screen failures are retained but do not start fresh applications', () => {
  for (const status of ['expired', 'closed', 'withdrawn']) {
    const [p] = admitOpportunities([{ ...role(), status }]);
    assert.equal(p.next_action, 'retain-history');
  }
  const [p] = admitOpportunities([{ ...role(), eligibility: 'failed' }]);
  assert.equal(p.next_action, 'resolve-eligibility');
});
test('input ordering does not invalidate work; removal cannot silently erase a packet', () => {
  const a = role(), b = { ...role(), source_path: 'other.md' };
  const first = admitOpportunities([a, b]);
  assert.deepEqual(first, admitOpportunities([b, a]));
  const retained = admitOpportunities([], first);
  assert.equal(retained[0].next_action, 'source-missing-review');
  assert.equal(retained[0].ready, false);
});
test('public hard-screen evidence and existing candidacy survive admission', () => {
  const failed = opportunityAdmissionRecord({ id: 'arch', source_type: 'official-employer', hard_screens: [{ state: 'not-met' }] }, 'arch.md', Buffer.from('source'));
  assert.equal(admitOpportunities([failed])[0].next_action, 'resolve-eligibility');
  const applied = opportunityAdmissionRecord({ id: 'oti', source_type: 'official-employer', application_state: 'submitted' }, 'oti.md', Buffer.from('source'));
  assert.equal(admitOpportunities([applied])[0].next_action, 'maintain-existing-candidacy');
});
