import { test } from 'node:test';
import assert from 'node:assert/strict';
import { digest, validateJournal, appendEntry } from './journal.mjs';

const entry = (id = 'IRL-0001') => ({
  id, recorded_at: '2030-02-15T12:00:00Z',
  event_start: '2030-02-01', event_end: '2030-02-02', evidence_as_of: '2030-02-14',
  kind: 'interpretation', title: 'Synthetic invitation return',
  before: 'An invitation was drafted.', change: 'A source records that it was sent.',
  significance: 'There is now a return to inspect.',
  boundary: 'Sending is not acceptance; later replies have not been reviewed.',
  working_implication: 'Check later returns before considering a follow-up.',
  related_pages: ['people/synthetic-person.md'],
  citations: [{ source_id: 'SRC-SYNTHETIC', locator: 'lines 2-4',
    source_sha256: 'a'.repeat(64), evidence_class: 'attributed-report' }],
  supersedes: [], activates_work: false, public_projection_authorized: false,
});
const add = (text, value) => appendEntry(text, value, digest(text));

test('retains earlier entries byte-for-byte while adding a dated insight', () => {
  const first = add('', entry());
  const second = add(first, entry('IRL-0002'));
  assert.ok(second.startsWith(first));
  assert.equal(validateJournal(second, { baseline: first }).length, 2);
});
test('rejects an edited historical prefix even if the attacker rebuilds the chain', () => {
  const baseline = add('', entry());
  const changed = add('', { ...entry(), change: 'Rewritten history.' });
  assert.throws(() => validateJournal(changed, { baseline }), /history/);
});
test('rejects removal and reordering against the historical baseline', () => {
  const a = add('', entry());
  const b = add(a, entry('IRL-0002'));
  assert.throws(() => validateJournal(a, { baseline: b }), /history/);
  assert.throws(() => validateJournal(b.split('\n').filter(Boolean).reverse().join('\n') + '\n', { baseline: b }), /history/);
});
test('rejects stale concurrent append expectations', () => {
  const first = add('', entry());
  assert.throws(() => appendEntry(first, entry('IRL-0002'), digest('')), /stale/);
});
test('an identical retry is idempotent, a changed duplicate is rejected', () => {
  const first = add('', entry());
  assert.equal(add(first, entry()), first);
  assert.throws(() => add(first, { ...entry(), title: 'Different' }), /duplicate/);
});
test('a correction points backward and preserves the corrected entry', () => {
  const first = add('', entry());
  const corrected = add(first, { ...entry('IRL-0002'), kind: 'correction', supersedes: ['IRL-0001'] });
  assert.ok(corrected.startsWith(first));
  assert.deepEqual(validateJournal(corrected)[1].supersedes, ['IRL-0001']);
});
test('rejects missing, future and self correction targets', () => {
  for (const supersedes of [[], ['IRL-0009'], ['IRL-0001']]) {
    assert.throws(() => add('', { ...entry(), kind: 'correction', supersedes }), /correction|supersedes/);
  }
});
test('historical events can be learned later without backdating the record', () => {
  assert.equal(validateJournal(add('', entry()))[0].event_start, '2030-02-01');
});
test('rejects impossible dates and evidence or event dates after recording', () => {
  for (const patch of [{ event_end: '2030-02-30' }, { event_start: '2030-02-03' },
    { evidence_as_of: '2030-02-16' }, { event_end: '2030-02-15' },
    { recorded_at: 'not-a-date' }]) {
    assert.throws(() => add('', { ...entry(), ...patch }), /date|time/);
  }
});
test('rejects a backdated append but allows equal capture timestamps', () => {
  const first = add('', entry());
  assert.throws(() => add(first, { ...entry('IRL-0002'), recorded_at: '2030-02-15T11:00:00Z' }), /backdat/);
});
test('rejects missing or unbound citations', () => {
  for (const citations of [[], [{ source_id: 'X' }], [{ ...entry().citations[0], source_sha256: 'bad' }]]) {
    assert.throws(() => add('', { ...entry(), citations }), /citation/);
  }
});
test('rejects unknown evidence classes instead of treating summaries as direct testimony', () => {
  assert.throws(() => add('', { ...entry(), citations: [{ ...entry().citations[0], evidence_class: 'verified-personal-truth' }] }), /evidence class/);
});
test('a journal cannot activate work or authorize publication', () => {
  for (const patch of [{ activates_work: true }, { public_projection_authorized: true }]) {
    assert.throws(() => add('', { ...entry(), ...patch }), /authority/);
  }
});
test('rejects blank analysis and missing situated boundaries', () => {
  for (const key of ['before', 'change', 'significance', 'boundary', 'working_implication']) {
    assert.throws(() => add('', { ...entry(), [key]: ' ' }), /required/);
  }
});
test('detects tampered digest and truncated lines without a baseline', () => {
  const first = add('', entry());
  assert.throws(() => validateJournal(first.replace('was sent', 'was accepted')), /digest/);
  assert.throws(() => validateJournal(first.trimEnd()), /newline/);
});
