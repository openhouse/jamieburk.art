import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, symlinkSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('./cli.mjs', import.meta.url));
const hash = text => createHash('sha256').update(text).digest('hex');
const note = '# Selective reading notes; not raw email\n\n## p1 | person-a | authored\n\nCould we meet next week?\n\n## p2 | person-b | quoted\n\nI can share a draft.\n';
function fixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'mail-reading-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(path.join(root, 'config'));
  writeFileSync(path.join(root, 'config/paired-workspace.private.json'), JSON.stringify({ repository_visibility: 'PRIVATE' }));
  writeFileSync(path.join(root, 'note.md'), note);
  const manifest = {
    schema_version: 1, visibility: 'private', date: '2026-09-05', output_dir: 'wiki/mail',
    inventory: { status: 'unverified', mailboxes: [{ id: 'mailbox-a', status: 'verified', folders_complete: false, message_census_complete: false }] },
    entities: [{ id: 'person-a', name: 'Person A', kind: 'person', identity: 'source-assigned' }, { id: 'person-b', name: 'Person B', kind: 'person', identity: 'source-assigned' }],
    messages: [{ id: 'message-a', mailbox_id: 'mailbox-a', folder: 'Inbox', date: '2026-09-01', context: 'An invitation, not an accepted meeting.',
      source_locator: 'https://mail.example.test/#/mail/INBOX/1', body_read: true,
      capture_path: 'note.md', capture_sha256: hash(note),
      participants: [{ entity_id: 'person-a', role: 'sender' }, { entity_id: 'person-b', role: 'recipient' }] }],
    readings: [{ message_id: 'message-a', entity_id: 'person-a', interpretation: 'A question makes the next step available without presuming acceptance.', boundary: 'No acceptance or durable personality inferred.',
      citations: [{ passage_id: 'p1', quote: 'Could we meet next week?' }] }]
  };
  function run(args = ['--plan']) {
    writeFileSync(path.join(root, 'manifest.json'), JSON.stringify(manifest));
    return spawnSync(process.execPath, [cli, '--root', root, '--manifest', 'manifest.json', ...args], { encoding: 'utf8' });
  }
  return { root, manifest, run };
}

test('write creates one cited entry per message participant and check detects stale pages', t => {
  const f = fixture(t);
  const run = f.run(['--write']);
  assert.equal(run.status, 0, run.stderr);
  const result = JSON.parse(run.stdout);
  assert.equal(result.message_count, 1);
  assert.equal(result.entry_count, 2);
  assert.equal(result.complete, false);
  const authored = readFileSync(path.join(f.root, 'wiki/mail/person-a.md'), 'utf8');
  assert.match(authored, /Could we meet next week/);
  assert.match(authored, /note.md#p1/);
  const recipient = readFileSync(path.join(f.root, 'wiki/mail/person-b.md'), 'utf8');
  assert.match(recipient, /no-attributed-language/);
  assert.doesNotMatch(recipient, /I can share a draft/);
  assert.equal(f.run(['--check']).status, 0);
  writeFileSync(path.join(f.root, 'wiki/mail/person-a.md'), 'stale');
  assert.equal(f.run(['--check']).status, 1);
});

test('repeated intake is idempotent and incomplete census cannot pass readiness', t => {
  const f = fixture(t);
  assert.equal(f.run(['--write']).status, 0);
  const before = readFileSync(path.join(f.root, 'wiki/mail/index.md'), 'utf8');
  assert.equal(f.run(['--write']).status, 0);
  assert.equal(readFileSync(path.join(f.root, 'wiki/mail/index.md'), 'utf8'), before);
  assert.equal(f.run(['--check', '--require-complete']).status, 2);
});

for (const [name, mutate] of [
  ['wrong-person citation', f => { f.manifest.readings[0].entity_id = 'person-b'; }],
  ['quoted text laundered into sender voice', f => { f.manifest.readings[0].citations = [{ passage_id: 'p2', quote: 'I can share a draft.' }]; }],
  ['invented quote', f => { f.manifest.readings[0].citations[0].quote = 'The meeting is accepted.'; }],
  ['stale source notes', f => writeFileSync(path.join(f.root, 'note.md'), note + 'Changed')],
  ['duplicate message', f => f.manifest.messages.push(structuredClone(f.manifest.messages[0]))],
  ['orphan reading', f => { f.manifest.readings[0].message_id = 'missing'; }],
  ['missing boundary', f => { delete f.manifest.readings[0].boundary; }],
  ['public manifest', f => { f.manifest.visibility = 'public'; }],
  ['public destination', f => writeFileSync(path.join(f.root, 'config/paired-workspace.private.json'), '{"repository_visibility":"PUBLIC"}')],
  ['path traversal', f => { f.manifest.output_dir = '../escaped'; }],
  ['source symlink', f => { symlinkSync(path.join(f.root, 'note.md'), path.join(f.root, 'linked.md')); f.manifest.messages[0].capture_path = 'linked.md'; }],
  ['credential field', f => { f.manifest.password = true; }],
  ['signed URL', f => { f.manifest.messages[0].source_locator = 'https://mail.example.test/body?token=synthetic'; }],
  ['unverified mailbox identity', f => { f.manifest.inventory.mailboxes[0].status = 'unverified'; }],
  ['unresolved person voice', f => { f.manifest.entities[0].identity = 'unresolved'; }],
  ['metadata-only close reading', f => { f.manifest.messages[0].body_read = false; }],
  ['quoted passage cannot establish recipient authorship', f => { f.manifest.readings.push({ ...f.manifest.readings[0], entity_id: 'person-b', citations: [{ passage_id: 'p2', quote: 'I can share a draft.' }] }); }]
]) test(name + ' fails closed without writing pages', t => {
  const f = fixture(t);
  assert.equal(f.run(['--plan']).status, 0);
  mutate(f);
  const run = f.run(['--write']);
  assert.equal(run.status, 1, run.stdout);
  assert.match(run.stderr, /mail-workflow-invalid/);
  assert.equal(existsSync(path.join(f.root, 'wiki/mail')), false);
});

test('missing census messages prevent completion even when flags claim completeness', t => {
  const f = fixture(t);
  f.manifest.inventory.status = 'verified';
  Object.assign(f.manifest.inventory.mailboxes[0], { folders_complete: true, message_census_complete: true, expected_message_ids: ['message-a', 'message-b'] });
  assert.equal(JSON.parse(f.run().stdout).complete, false);
  f.manifest.inventory.mailboxes[0].expected_message_ids = ['message-a'];
  assert.equal(JSON.parse(f.run().stdout).complete, true);
});

test('cited anchors resolve to the actual attributed section', t => {
  const f = fixture(t);
  assert.equal(f.run(['--write']).status, 0);
  const page = readFileSync(path.join(f.root, 'wiki/mail/person-a.md'), 'utf8');
  assert.match(page, /note.md#p1--person-a--authored/);
});

test('unmanaged output is never overwritten', t => {
  const f = fixture(t);
  mkdirSync(path.join(f.root, 'wiki/mail'), { recursive: true });
  writeFileSync(path.join(f.root, 'wiki/mail/person-a.md'), 'Human-authored work');
  assert.equal(f.run(['--write']).status, 1);
  assert.equal(readFileSync(path.join(f.root, 'wiki/mail/person-a.md'), 'utf8'), 'Human-authored work');
});

test('absence of authored reading remains an explicit draft', t => {
  const f = fixture(t); f.manifest.readings = [];
  const run = f.run(['--write']);
  assert.equal(run.status, 0, run.stderr);
  assert.match(readFileSync(path.join(f.root, 'wiki/mail/person-a.md'), 'utf8'), /close-reading-pending/);
});

test('an automated notice cannot be attributed to a human', t => {
  const f = fixture(t);
  const body = note.replace('person-a | authored', 'person-a | automated');
  writeFileSync(path.join(f.root, 'note.md'), body);
  f.manifest.messages[0].capture_sha256 = hash(body);
  assert.equal(f.run(['--write']).status, 1);
  f.manifest.entities[0].kind = 'team';
  assert.equal(f.run(['--write']).status, 0);
});
