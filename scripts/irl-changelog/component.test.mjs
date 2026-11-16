import test from 'node:test';
import assert from 'node:assert/strict';
import { digest, appendEntry } from './journal.mjs';
import * as component from './component.mjs';

// Entirely synthetic. No source or identity comes from a permissioned journal.
const namespace = '3d309e94-60c0-47c6-8bf3-b2589966a2e2';
const id = n => `irl:${namespace}:00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;
const source = { id: 's1', revision_id: 'r1', sha256: digest('synthetic'), locator: 'lines 1-2', evidence_class: 'attributed-report', issued_on: '2030-01-01', captured_at: '2030-01-02T00:00:00Z', custody: 'synthetic fixture', transformation_limit: 'report, not direct observation', state: 'current' };
const registry = () => ({ schema_version: 2, namespace, visibility: 'private', coverage: 'Synthetic bounded corpus; not complete-life coverage.', nodes: [
  { id: 'p1', type: 'person', title: 'Synthetic person', visibility: 'private' },
  { id: 'c1', type: 'claim', title: 'Synthetic claim', visibility: 'private', depends_on: ['p1'] },
  { id: 'd1', type: 'decision', title: 'Synthetic decision', visibility: 'private', depends_on: ['c1'] },
], sources: [structuredClone(source)] });
const citation = () => { const { state, ...value } = source; return value; };
const entry = (n = 1, patch = {}) => ({ schema_version: 2, namespace, id: id(n), legacy_aliases: [], title: 'Synthetic change', before: 'Invitation prepared.', change: 'A send was reported.', significance: 'A return is available.', working_implication: 'Inspect later returns before considering follow-up.', boundary: 'Not acceptance.', kind: 'interpretation', event_start: '2030-01-01', event_end: '2030-01-01', event_precision: 'exact', event_basis: 'Dated report.', evidence_as_of: '2030-01-02', recorded_at: `2030-01-0${n + 2}T12:00:00Z`, learned_at: null, learning_basis: null, interpreter: 'Synthetic analyst', recording_agent: 'Synthetic recorder', representation: 'analysis', participant_authored: false, visibility: 'private', review_state: 'draft', review_receipt: null, citations: [citation()], relations: [{ type: 'about', target_id: 'p1' }], activates_work: false, publication_authorized: false, ...patch });
const append = (text, value, reg = registry()) => component.appendChange(text, value, { registry: reg, expected_digest: digest(text) });
const one = () => append('', entry());
const revised = () => {
  let text = one();
  for (const [n, kind, type] of [[2, 'correction', 'corrects'], [3, 'challenge', 'challenges'], [4, 'development', 'updates']]) text = append(text, entry(n, { kind, relations: [{ type: 'about', target_id: 'p1' }, { type, target_id: id(1), assertion: 'The earlier account of acceptance.', reason: 'New evidence changes the account.', limits: 'No settled disagreement.' }] }));
  return text;
};

test('v2 append retains exact prefix and rejects stale competing writes', () => {
  const first = one(); const second = append(first, entry(2));
  assert.ok(second.startsWith(first));
  assert.equal(component.validateSegment(second, { registry: registry(), baseline: first }).length, 2);
  assert.throws(() => component.appendChange(first, entry(2), { registry: registry(), expected_digest: digest('') }), /stale/);
});
test('v2 retry is idempotent and same identity with different bytes conflicts', () => {
  const text = one(); assert.equal(append(text, entry()), text);
  assert.throws(() => append(text, entry(1, { change: 'Different account' })), /identity conflict/);
});
test('trusted prefix catches a recomputed historical rewrite', () => {
  assert.throws(() => component.validateSegment(append('', entry(1, { change: 'Rewritten' })), { registry: registry(), baseline: one() }), /history/);
});
for (const [name, patch, error] of [
  ['unknown schema', { schema_version: 3 }, /schema/],
  ['non-opaque identity', { id: 'irl:person-name:1' }, /identity/],
  ['unknown date backfill', { event_precision: 'unknown' }, /event/],
  ['approximate date without basis', { event_precision: 'bounded-approximate', event_basis: '' }, /event/],
  ['future event', { event_end: '2030-01-09' }, /event/],
  ['invalid calendar date', { evidence_as_of: '2030-02-30' }, /date/],
  ['invented learning date', { learned_at: '2030-01-02T12:00:00Z' }, /learning/],
  ['speaker impersonation', { participant_authored: true }, /authority/],
  ['work activation', { activates_work: true }, /authority/],
  ['publication authorization', { publication_authorized: true }, /authority/],
  ['empty boundary', { boundary: '' }, /account/],
  ['unbound citation', { citations: [{ ...citation(), sha256: 'a'.repeat(64) }] }, /citation/],
  ['erased custody limit', { citations: [{ ...citation(), transformation_limit: '' }] }, /citation/],
  ['unsupported relation', { relations: [{ type: 'endorses', target_id: 'p1' }] }, /relation/],
  ['wrong typed target', { relations: [{ type: 'about', target_id: 'c1' }] }, /relation/],
  ['self revision', { kind: 'correction', relations: [{ type: 'about', target_id: 'p1' }, { type: 'corrects', target_id: id(1), assertion: 'x', reason: 'x', limits: 'x' }] }, /revision/],
  ['human review invented from AI identity', { review_state: 'source-reviewed', review_receipt: { reviewer_type: 'ai', reviewer: 'model' } }, /review/],
]) test(`v2 rejects ${name}`, () => assert.throws(() => append('', entry(1, patch)), error));
test('learning time requires a named perspective and exact cited source revision', () => {
  const value = entry(1, { learned_at: '2030-01-02T12:00:00Z', learning_basis: { perspective: 'Synthetic analyst', citation: citation(), basis: 'Explicit dated acknowledgment.' } });
  assert.equal(component.validateSegment(append('', value), { registry: registry() })[0].learned_at, '2030-01-02T12:00:00Z');
});
test('a source-grounded human receipt binds the exact candidate and revisions', () => {
  const value = entry(1, { review_state: 'source-reviewed' });
  value.review_receipt = { reviewer_type: 'human', reviewer: 'Synthetic reviewer', reviewed_at: '2030-01-03T12:00:00Z', candidate_sha256: component.reviewFingerprint(value), source_revisions: ['s1@r1'], decision: 'approved' };
  assert.equal(component.validateSegment(append('', value), { registry: registry() })[0].review_state, 'source-reviewed');
  assert.throws(() => append('', { ...value, change: 'Changed after review' }), /review/);
});
test('newer updates never hide a correction or unresolved challenge', () => {
  const view = component.projectChanges(revised(), registry());
  assert.equal(view.entries[0].status, 'contested');
  assert.deepEqual(view.entries[0].revision_links.map(r => r.type), ['corrects', 'challenges', 'updates']);
  assert.ok(view.entries[0].hold_reasons.includes('unresolved-challenge'));
});
test('historical filtering reports journal contents, retains unknown intervals and whole approximate intervals', () => {
  let text = one();
  text = append(text, entry(2, { event_start: null, event_end: null, event_precision: 'unknown', event_basis: 'Not established.' }));
  text = append(text, entry(3, { event_start: '2030-01-01', event_end: '2030-01-02', event_precision: 'bounded-approximate' }));
  const view = component.projectChanges(text, registry(), { recorded_as_of: '2030-01-05T12:00:00Z', occurred_by: '2030-01-01' });
  assert.equal(view.entries.length, 3);
  assert.equal(view.entries[1].entry.event_start, null);
  assert.equal(view.entries[2].entry.event_end, '2030-01-02');
  assert.equal(component.projectChanges(text, registry(), { recorded_as_of: '2030-01-03T12:00:00Z' }).entries.length, 1);
  assert.equal(view.historical_semantics, 'journal-contents-not-person-knowledge');
});
test('present source checks override historical currentness and invalidate dependent graph views transitively', () => {
  const reg = registry(); reg.sources[0].state = 'changed';
  const view = component.projectChanges(one(), reg, { recorded_as_of: '2030-01-03T12:00:00Z' });
  assert.equal(view.entries[0].status, 'stale');
  assert.deepEqual(view.nodes.map(n => [n.id, n.status]), [['p1', 'stale'], ['c1', 'stale'], ['d1', 'stale']]);
  assert.equal(view.entries[0].source_currentness, 'present-verification');
});
test('withdrawal removes entry prose and all linked topology even in historical output', () => {
  const reg = registry(); reg.sources[0].state = 'withdrawn';
  const view = component.projectChanges(one(), reg);
  assert.equal(view.entries[0].status, 'withheld');
  assert.equal(view.entries[0].entry, undefined);
  const rendered = component.renderChanges(view);
  assert.doesNotMatch(rendered, /Invitation prepared|Synthetic person|lines 1-2/);
});
test('authorization is checked before storage load or error details can disclose private existence', async () => {
  let accessed = false;
  const result = await component.readPermissioned({ authorize: async () => false, load: async () => { accessed = true; throw new Error('secret path'); } });
  assert.deepEqual(result, { decision: 'unavailable' });
  assert.equal(accessed, false);
});
test('a permitted reader gets concise and full anchored accounts without invented speaker voice', async () => {
  const view = await component.readPermissioned({ authorize: async () => true, load: async () => ({ journal: one(), registry: registry() }) });
  const rendered = component.renderChanges(view);
  assert.match(rendered, /Earlier picture: Invitation prepared/);
  assert.match(rendered, /Synthetic analyst/);
  assert.match(rendered, /Not acceptance/);
  assert.match(rendered, /s1@r1/);
  assert.match(rendered, /#irl-/);
  assert.equal(view.nodes[0].entry_ids[0], id(1));
});

const oldEntry = () => ({ id: 'IRL-0001', recorded_at: '2030-01-03T12:00:00Z', event_start: '2030-01-01', event_end: '2030-01-01', evidence_as_of: '2030-01-02', kind: 'interpretation', title: 'Synthetic old account', before: 'Before', change: 'Change', significance: 'Why', boundary: 'Limit', working_implication: 'Possible consequence', related_pages: ['synthetic.md'], citations: [{ source_id: 's1', locator: 'lines 1-2', source_sha256: source.sha256, evidence_class: 'attributed-report' }], supersedes: [], activates_work: false, public_projection_authorized: false });
test('migration rehearsal inventories immutable aliases without inventing learning or graph decisions', () => {
  const legacy = appendEntry('', oldEntry(), digest(''));
  const result = component.rehearseMigration(legacy, { expected_digest: digest(legacy), namespace });
  assert.equal(result.legacy_sha256, digest(legacy));
  assert.equal(result.migration_authorized, false);
  assert.equal(result.entries[0].legacy_id, 'IRL-0001');
  assert.equal(result.entries[0].learned_at, null);
  assert.equal(result.entries[0].disposition, 'held-for-human-mapping');
  assert.deepEqual(component.rehearseMigration(legacy, { expected_digest: digest(legacy), namespace }), result);
});
test('migration rejects a changed baseline and records relation ambiguity rather than copying supersedes', () => {
  let legacy = appendEntry('', oldEntry(), digest(''));
  const baseline = legacy;
  legacy = appendEntry(legacy, { ...oldEntry(), id: 'IRL-0002', kind: 'correction', supersedes: ['IRL-0001'] }, digest(legacy));
  assert.throws(() => component.rehearseMigration(legacy, { expected_digest: digest(baseline), namespace }), /baseline/);
  const result = component.rehearseMigration(legacy, { expected_digest: digest(legacy), namespace });
  assert.deepEqual(result.entries[1].unresolved_legacy_targets, ['IRL-0001']);
  assert.equal(result.entries[1].relation_type, null);
});
test('divergent branch tails are held intact, never automatically concatenated or discarded', () => {
  const base = one(); const left = append(base, entry(2)); const right = append(base, entry(3));
  const result = component.reconcileBranches(base, left, right, registry());
  assert.equal(result.decision, 'hold-for-reviewed-reconciliation');
  assert.equal(result.journal, undefined);
  assert.equal(result.left_sha256, digest(left)); assert.equal(result.right_sha256, digest(right));
});
test('same-ID branch collisions are distinguished from disjoint branch tails', () => {
  const base = one(); const left = append(base, entry(2)); const right = append(base, entry(2, { change: 'Different account' }));
  assert.deepEqual(component.reconcileBranches(base, left, right, registry()).conflicting_ids, [id(2)]);
});

// Hill-climb: fail closed at the permission and schema boundaries. A revoked
// capability and a conflicting legacy authority flag must not slip through.
test('authorization errors return the same opaque denial without touching storage', async () => {
  const result = await component.readPermissioned({ authorize: async () => { throw new Error('private membership details'); }, load: async () => { throw new Error('must not load'); } });
  assert.deepEqual(result, { decision: 'unavailable' });
});
test('unknown persisted fields cannot smuggle contradictory legacy authority', () => {
  assert.throws(() => append('', entry(1, { public_projection_authorized: true })), /unknown entry field/);
});
test('partial JSONL records fail closed instead of dropping an interrupted append', () => {
  assert.throws(() => component.validateSegment(one() + '{', { registry: registry() }), /newline/);
});
test('withdrawal propagates into later revisions even if their own source is current', () => {
  const reg = registry(); reg.sources.push({ ...source, id: 's2', revision_id: 'r2' });
  let journal = append('', entry(), reg);
  journal = append(journal, entry(2, { kind: 'development', citations: [{ ...citation(), id: 's2', revision_id: 'r2' }], relations: [{ type: 'about', target_id: 'p1' }, { type: 'updates', target_id: id(1), reason: 'Depends on earlier account', limits: 'Not settled' }] }), reg);
  reg.sources[0].state = 'withdrawn';
  assert.deepEqual(component.projectChanges(journal, reg).entries.map(e => e.status), ['withheld', 'withheld']);
});
test('a withdrawn later correction cannot leak its existence through an earlier account badge', () => {
  const reg = registry(); reg.sources.push({ ...source, id: 's2', revision_id: 'r2' });
  let journal = append('', entry(), reg);
  journal = append(journal, entry(2, { kind: 'correction', citations: [{ ...citation(), id: 's2', revision_id: 'r2' }], relations: [{ type: 'about', target_id: 'p1' }, { type: 'corrects', target_id: id(1), assertion: 'Prior understanding', reason: 'New account', limits: 'Provisional' }] }), reg);
  reg.sources[1].state = 'withdrawn';
  const view = component.projectChanges(journal, reg);
  assert.equal(view.entries[0].status, 'recorded');
  assert.deepEqual(view.entries[0].revision_links, []);
});
