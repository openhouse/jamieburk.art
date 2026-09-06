import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, mkdirSync, symlinkSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { digest } from './journal.mjs';
import { inspectSources, appendToFile, rebuildFile } from './storage.mjs';
const namespace = '3d309e94-60c0-47c6-8bf3-b2589966a2e2';
function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'irl-v2-disk-'));
  const source = { id: 's', revision_id: 'r', path: 'source.txt', sha256: digest('synthetic source'), locator: 'whole fixture', evidence_class: 'attributed-report', issued_on: '2020-01-01', captured_at: '2020-01-02T00:00:00Z', custody: 'synthetic bytes', transformation_limit: 'report only', state: 'current' };
  const registry = { schema_version: 2, namespace, visibility: 'private', coverage: 'Synthetic corpus.', nodes: [{ id: 'p', title: 'Synthetic practice', type: 'practice', visibility: 'private' }], sources: [source] };
  const { path, state, ...citation } = source;
  const entry = { schema_version: 2, namespace, id: `irl:${namespace}:00000000-0000-4000-8000-000000000001`, legacy_aliases: [], title: 'Synthetic admission', before: 'Before', change: 'Reported change', significance: 'Consequence', working_implication: 'Consider', boundary: 'Not an action', kind: 'interpretation', event_start: '2020-01-01', event_end: '2020-01-01', event_precision: 'exact', event_basis: 'Dated synthetic report', evidence_as_of: '2020-01-02', recorded_at: new Date().toISOString(), learned_at: null, learning_basis: null, interpreter: 'Synthetic analyst', recording_agent: 'Synthetic recorder', representation: 'analysis', participant_authored: false, visibility: 'private', review_state: 'draft', review_receipt: null, citations: [citation], relations: [{ type: 'about', target_id: 'p' }], activates_work: false, publication_authorized: false };
  const journalPath = join(root, 'journal.jsonl'); const outputPath = join(root, 'view.md');
  writeFileSync(journalPath, ''); writeFileSync(join(root, 'source.txt'), 'synthetic source');
  return { root, registry, entry, journalPath, outputPath, expected_digest: digest(''), baseline: '' };
}
test('freshness reads actual bytes, never upgrades changed or missing source to current from a label', () => {
  const f = fixture();
  assert.equal(inspectSources(f.registry, { root: f.root }).sources[0].state, 'current');
  writeFileSync(join(f.root, 'source.txt'), 'new bytes');
  assert.equal(inspectSources(f.registry, { root: f.root }).sources[0].state, 'changed');
  f.registry.sources[0].path = 'absent';
  assert.equal(inspectSources(f.registry, { root: f.root }).sources[0].state, 'unavailable');
});
test('withdrawal suppresses source reads and never reactivates when bytes happen to match', () => {
  const f = fixture(); f.registry.sources[0].state = 'withdrawn';
  assert.equal(inspectSources(f.registry, { root: f.root }).sources[0].state, 'withdrawn');
});
test('source verification will not escape approved custody through traversal or symlinks', () => {
  const f = fixture(); const outside = fixture();
  symlinkSync(join(outside.root, 'source.txt'), join(f.root, 'escape'));
  for (const path of [join(outside.root, 'source.txt'), '../outside', 'escape']) {
    f.registry.sources[0].path = path;
    assert.equal(inspectSources(f.registry, { root: f.root }).sources[0].state, 'unavailable');
  }
});
test('append persists once, rebuilds Markdown, and retries identical requests without duplicate lines', () => {
  const f = fixture(); const result = appendToFile(f);
  assert.equal(result.appended, true);
  assert.match(readFileSync(f.outputPath, 'utf8'), /Reported change/);
  const bytes = readFileSync(f.journalPath, 'utf8');
  assert.equal(appendToFile({ ...f, expected_digest: digest(bytes) }).appended, false);
  assert.equal(readFileSync(f.journalPath, 'utf8'), bytes);
  assert.equal(existsSync(f.journalPath + '.lock'), false);
});
test('an occupied exclusive lock prevents a second writer without removing the owner lock', () => {
  const f = fixture(); writeFileSync(f.journalPath + '.lock', 'owner');
  assert.throws(() => appendToFile(f), /EEXIST|locked/);
  assert.equal(readFileSync(f.journalPath, 'utf8'), '');
  assert.equal(readFileSync(f.journalPath + '.lock', 'utf8'), 'owner');
});
test('changed source rejects admission before any journal write', () => {
  const f = fixture(); writeFileSync(join(f.root, 'source.txt'), 'changed');
  assert.throws(() => appendToFile(f), /source not current/);
  assert.equal(readFileSync(f.journalPath, 'utf8'), '');
});
test('render failure after durable append preserves valid canonical bytes and is repairable', () => {
  const f = fixture(); mkdirSync(f.outputPath);
  assert.throws(() => appendToFile(f), /EISDIR|ENOTDIR|projection/);
  const bytes = readFileSync(f.journalPath, 'utf8'); assert.ok(bytes.endsWith('\n'));
  const repaired = join(f.root, 'repaired.md');
  rebuildFile({ ...f, outputPath: repaired });
  assert.match(readFileSync(repaired, 'utf8'), /Reported change/);
  assert.equal(readFileSync(f.journalPath, 'utf8'), bytes);
});
test('append refuses a backdated admission instead of presenting imported history as a diary', () => {
  const f = fixture(); f.entry.recorded_at = '2020-01-03T00:00:00Z';
  assert.throws(() => appendToFile(f), /recording time/);
  assert.equal(readFileSync(f.journalPath, 'utf8'), '');
});
test('rebuild marks current dependent views stale when source bytes change', () => {
  const f = fixture(); appendToFile(f); writeFileSync(join(f.root, 'source.txt'), 'changed');
  const result = rebuildFile(f);
  assert.equal(result.entries[0].status, 'stale');
  assert.match(readFileSync(f.outputPath, 'utf8'), /source-not-current/);
});
test('the permissioned adapter can supply governed frontmatter in the atomic projection', () => {
  const f = fixture();
  rebuildFile({ ...f, projectionPrefix: '---\nvisibility: private\n---\n\n' });
  assert.ok(readFileSync(f.outputPath, 'utf8').startsWith('---\nvisibility: private\n---\n\n# IRL'));
});
test('rebuild respects the writer lock instead of racing an older projection over a new append', () => {
  const f = fixture(); writeFileSync(f.journalPath + '.lock', 'active writer');
  assert.throws(() => rebuildFile(f), /EEXIST|locked/);
  assert.equal(existsSync(f.outputPath), false);
  assert.equal(readFileSync(f.journalPath + '.lock', 'utf8'), 'active writer');
});
