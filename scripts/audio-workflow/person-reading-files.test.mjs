import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, symlinkSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';

async function runtime() {
  assert.ok(existsSync(new URL('./person-reading-files.mjs', import.meta.url)), 'private projection runtime must exist');
  return import('./person-reading-files.mjs');
}
function fixture() {
  const root = mkdtempSync(path.join(os.tmpdir(), 'person-readings-'));
  mkdirSync(path.join(root, 'config')); mkdirSync(path.join(root, 'sources'));
  writeFileSync(path.join(root, 'config/paired-workspace.private.json'), JSON.stringify({role:'private',repository_visibility:'PRIVATE'}));
  writeFileSync(path.join(root, 'sources/one-transcript.md'), 'Alex  00:01\nCould we check the scope before committing?\n');
  const manifest = { visibility:'private', date:'2026-09-05', output_dir:'wiki/voices', transcript_roots:['sources'], superseded_paths:[], people:[{id:'alex',name:'Alex'}], sources:[{id:'SRC-ONE',date:'2026-09-05',path:'sources/one-transcript.md',context:'A planning call.',state:'available',speakers:{Alex:'alex'}}], readings:[] };
  manifest.sources[0].restrictions_reviewed_sha256=createHash('sha256').update(readFileSync(path.join(root,'sources/one-transcript.md'))).digest('hex');
  writeFileSync(path.join(root,'manifest.json'),JSON.stringify(manifest));
  return {root,manifest_path:'manifest.json'};
}

test('dry run does not write, sync creates cited pages, check catches edits and source changes', async () => {
  const { runPersonReadings } = await runtime(); const options = fixture();
  assert.equal(runPersonReadings({...options, mode:'plan'}).write_count,0);
  assert.equal(existsSync(path.join(options.root,'wiki/voices/alex.md')),false);
  assert.equal(runPersonReadings({...options, mode:'write'}).write_count,3);
  assert.equal(runPersonReadings({...options, mode:'check'}).projection_current,true);
  const file = path.join(options.root,'wiki/voices/alex.md');
  const bytes = readFileSync(file,'utf8'); writeFileSync(file,bytes+'Manual edit\n');
  assert.equal(runPersonReadings({...options, mode:'check'}).projection_current,false);
  assert.throws(()=>runPersonReadings({...options,mode:'write'}),/generated-page-modified/);
  writeFileSync(file,bytes); writeFileSync(path.join(options.root,'sources/one-transcript.md'),'Alex  00:01\nChanged source.\n');
  assert.equal(runPersonReadings({...options,mode:'check'}).projection_current,false);
  assert.ok(runPersonReadings({...options,mode:'write'}).write_count>0);
  assert.equal(runPersonReadings({...options,mode:'write'}).write_count,0);
});

test('new local transcript gets automatic unresolved-speaker draft without editing the manifest', async () => {
  const { runPersonReadings } = await runtime(); const options=fixture();
  writeFileSync(path.join(options.root,'sources/new-transcript.md'),'Casey  00:03\nI think we should review the proposal.\n');
  const result=runPersonReadings({...options,mode:'write'});
  assert.equal(result.source_count,2); assert.equal(result.entry_count,2);
  assert.equal(result.unresolved_identity_count,1);
  assert.equal(JSON.stringify(result).includes('Casey'),false);
});

test('public or unmarked roots and symlink escapes cannot be used as private destinations or sources', async () => {
  const { runPersonReadings } = await runtime(); const options=fixture();
  writeFileSync(path.join(options.root,'config/paired-workspace.private.json'),'{}');
  assert.throws(()=>runPersonReadings({...options,mode:'write'}),/private-repository-required/);
  const safe=fixture(); const outside=fixture();
  symlinkSync(path.join(outside.root,'sources/one-transcript.md'),path.join(safe.root,'sources/escape-transcript.md'));
  assert.throws(()=>runPersonReadings({...safe,mode:'write'}),/symlink-not-allowed/);
});

test('participant-held sources are accounted for without reading their body or discovering them again', async () => {
  const { runPersonReadings } = await runtime(); const options=fixture();
  const file=path.join(options.root,'manifest.json'); const m=JSON.parse(readFileSync(file));
  m.sources[0].state='held-participant-restriction'; writeFileSync(file,JSON.stringify(m));
  const result=runPersonReadings({...options,mode:'write'});
  assert.equal(result.entry_count,1); assert.equal(result.close_reading_candidate_count,0);
  assert.equal(readFileSync(path.join(options.root,'wiki/voices/alex.md'),'utf8').includes('Could we check'),false);
});

test('job scope cannot evade unregistered sources and does not require unrelated historical gaps to be resolved', async () => {
  const { runPersonReadings } = await runtime(); const options=fixture();
  assert.throws(()=>runPersonReadings({...options,scope_source_ids:[],mode:'plan'}),/job-source-scope-required/);
  assert.throws(()=>runPersonReadings({...options,scope_source_ids:['SRC-NOT-REGISTERED'],mode:'plan'}),/job-source-unresolved/);
});

test('changed source bytes invalidate restriction review before any fresh extract is projected', async () => {
  const { runPersonReadings } = await runtime(); const options=fixture();
  runPersonReadings({...options,mode:'write'});
  writeFileSync(path.join(options.root,'sources/one-transcript.md'),'Alex  00:01\nNew confidential substance.\n');
  runPersonReadings({...options,mode:'write'});
  const page=readFileSync(path.join(options.root,'wiki/voices/alex.md'),'utf8');
  assert.equal(page.includes('New confidential substance'),false);
  assert.match(page,/held-source-review/);
});
