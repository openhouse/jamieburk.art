import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';

async function engine() {
  assert.ok(existsSync(new URL('./person-readings.mjs', import.meta.url)), 'person-level close-reading engine must exist');
  return import('./person-readings.mjs');
}
const text = '## Fragment 1\n\nAlex  00:01\nCould we check the scope before committing?\n\nBlair  00:08\nI can review the draft, but cannot promise approval.\n\n## Fragment 2\n\nAlex  00:01\nI mentioned Casey, who is not here.\n';
const digest = value => createHash('sha256').update(value).digest('hex');

// Catches dropped connector-format turns, including simultaneous brief speech.
test('connector transcript keeps every timestamped turn and unresolved label', async () => {
  const { parseTranscript } = await engine();
  const turns = parseTranscript('[0:00:01] Alex: Please stop the platform assistant.\n[0:00:03] Blair: Done.\n[0:00:03] Speaker 1: Thanks.\n');
  assert.deepEqual(turns.map(t => [t.label,t.timestamp,t.text,t.line]), [
    ['Alex','0:00:01','Please stop the platform assistant.',1],
    ['Blair','0:00:03','Done.',2],
    ['Speaker 1','0:00:03','Thanks.',3]
  ]);
});

test('a held artifact stays unread while a separately registered source receives its own reading', async () => {
  const { buildPersonReadings } = await engine();
  const input = fixture();
  input.sources[0].state = 'held-participant-restriction';
  input.sources.push({...input.sources[0],id:'SRC-INDEPENDENT',path:'sources/independent.md',state:'available'});
  const reads = [];
  const result = buildPersonReadings(input, file => {
    reads.push(file);
    return '[0:00:09] Alex: Please hold the software work for now.';
  });
  assert.deepEqual(reads, ['sources/independent.md']);
  const independent = result.entries.find(e=>e.source_id==='SRC-INDEPENDENT' && e.person_id==='alex');
  assert.equal(independent.citations[0]?.quote,'Please hold the software work for now.');
  assert.equal(result.sources.find(s=>s.id==='SRC-ONE').status,'held-participant-restriction');
  assert.equal(result.complete,false);
});

function fixture() {
  return { visibility: 'private', sources: [{ id: 'SRC-ONE', path: 'sources/one.md', date: '2026-09-05', context: 'A planning conversation.', state: 'available', speakers: { Alex: 'alex', Blair: 'blair' }, excluded_ranges: [] }], people: [{ id: 'alex', name: 'Alex' }, { id: 'blair', name: 'Blair' }], readings: [] };
}

test('every observed speaker gets one cited source-bounded draft, not a page for someone merely mentioned', async () => {
  const { buildPersonReadings } = await engine();
  const result = buildPersonReadings(fixture(), () => text);
  assert.deepEqual(result.entries.map(x => x.person_id), ['alex', 'blair']);
  assert.equal(result.entries[0].turn_count, 2);
  assert.equal(result.entries[0].status, 'automated-evidence-draft');
  assert.equal(result.entries[0].citations[0].quote, 'Could we check the scope before committing?');
  assert.equal(result.entries[0].citations[0].line, 3);
  assert.match(result.entries[0].interpretation, /question/);
  assert.equal(result.complete, false);
});

test('fragment identity survives timestamp resets and both transcript formats parse', async () => {
  const { parseTranscript } = await engine();
  const turns = parseTranscript(text);
  assert.deepEqual(turns.map(x => [x.fragment, x.timestamp]), [[1, '00:01'], [1, '00:08'], [2, '00:01']]);
  const bold = parseTranscript('## Part 2\n\n**[approximately 0:08:33] Alex:** Exactly.\nA second line.\n');
  assert.equal(bold[0].label, 'Alex');
  assert.equal(bold[0].approximate, true);
  assert.equal(bold[0].text, 'Exactly.\nA second line.');
});

test('unmapped labels stay source-scoped rather than becoming named identity', async () => {
  const { buildPersonReadings } = await engine();
  const input = fixture(); input.sources[0].speakers = {};
  input.sources.push({ ...input.sources[0], id: 'SRC-TWO' });
  const result = buildPersonReadings(input, () => 'Speaker 1  00:01\nHello there.\n');
  assert.notEqual(result.entries[0].person_id, result.entries[1].person_id);
  assert.ok(result.entries.every(x => x.identity_status === 'unresolved-no-simulation'));
});

test('restriction excludes substance from drafts but preserves a cited held disposition', async () => {
  const { buildPersonReadings } = await engine();
  const input = fixture(); input.sources[0].excluded_ranges = [{ start: 1, end: 99, reason: 'restricted-working-custody' }];
  const result = buildPersonReadings(input, () => text);
  assert.ok(result.entries.every(x => x.status === 'held-restriction'));
  assert.equal(JSON.stringify(result).includes('Could we check'), false);
  assert.equal(result.entries.length, 2);
});

test('missing text and a whole-source restriction remain explicit coverage gaps without reading restricted bytes', async () => {
  const { buildPersonReadings } = await engine();
  const input = fixture(); input.sources[0].state = 'held-participant-restriction';
  let reads = 0;
  const held = buildPersonReadings(input, () => { reads++; return text; });
  assert.equal(reads, 0);
  assert.equal(held.sources[0].status, 'held-participant-restriction');
  assert.equal(held.complete, false);
  input.sources[0].state = 'available';
  const missing = buildPersonReadings(input, () => { throw new Error('ENOENT'); });
  assert.equal(missing.sources[0].status, 'source-unavailable');
  assert.equal(missing.entries.length, 2);
});

test('curated close reading cites its own speaker and becomes stale when the source changes', async () => {
  const { buildPersonReadings } = await engine();
  const input = fixture();
  input.readings = [{ source_id: 'SRC-ONE', person_id: 'alex', source_sha256: digest(text), interpretation: 'The question makes scope agreement a prerequisite to commitment.', boundary: 'Not proof of agreement or a stable personality trait.', citations: [{ fragment: 1, timestamp: '00:01', quote: 'check the scope before committing?' }] }];
  let result = buildPersonReadings(input, () => text);
  assert.equal(result.entries[0].status, 'close-reading-candidate');
  result = buildPersonReadings(input, () => text + '\n');
  assert.equal(result.entries[0].status, 'stale-close-reading');
  assert.equal(result.complete, false);
});

test('a quote from another speaker cannot substantiate a person close reading', async () => {
  const { buildPersonReadings } = await engine();
  const input = fixture(); input.readings = [{ source_id: 'SRC-ONE', person_id: 'alex', source_sha256: digest(text), interpretation: 'Unsupported.', boundary: 'Candidate only.', citations: [{ fragment: 1, timestamp: '00:08', quote: 'I can review the draft' }] }];
  assert.throws(() => buildPersonReadings(input, () => text), /citation-not-in-speaker-turn/);
});

test('duplicate source IDs and duplicate person-source readings are rejected', async () => {
  const { buildPersonReadings } = await engine();
  const input = fixture(); input.sources.push(input.sources[0]);
  assert.throws(() => buildPersonReadings(input, () => text), /duplicate-source/);
});

test('public destinations and path traversal are denied before reading a source', async () => {
  const { buildPersonReadings } = await engine();
  const input = fixture(); input.visibility = 'public';
  assert.throws(() => buildPersonReadings(input, () => text), /private-visibility-required/);
  input.visibility = 'private'; input.sources[0].path = '../outside.md';
  assert.throws(() => buildPersonReadings(input, () => text), /safe-relative-path-required/);
});

test('rendering is idempotent, bidirectional, and keeps interpretation separate from attributed speech', async () => {
  const { buildPersonReadings, renderPersonPages } = await engine();
  const result = buildPersonReadings(fixture(), () => text);
  const pages = renderPersonPages(result, { output_dir: 'wiki/voices', date: '2026-09-05' });
  assert.deepEqual(pages, renderPersonPages(result, { output_dir: 'wiki/voices', date: '2026-09-05' }));
  assert.match(pages['wiki/voices/alex.md'], /sources\/one.md#L3/);
  assert.match(pages['wiki/voices/alex.md'], /Analytical interpretation/);
  assert.match(pages['wiki/voices/index.md'], /alex.md/);
  assert.match(pages['wiki/voices/alex.md'], /not.*endorsement/i);
});
