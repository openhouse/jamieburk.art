import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { run, exitCodeForResult } from './cli.mjs';
import { createJobManifest, completeStage } from './core.mjs';

const hash = value => createHash('sha256').update(value).digest('hex');
const receipt = (input, output = input) => ({status:'complete', input_fingerprint:input, output_fingerprint:output, artifact_count:1, unresolved_conditions:[]});

function fixture(t, {curated = false} = {}) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'repair-voices-'));
  t.after(() => rmSync(root, {recursive:true, force:true}));
  mkdirSync(path.join(root, 'config')); mkdirSync(path.join(root, 'sources'));
  writeFileSync(path.join(root, 'config/paired-workspace.private.json'), JSON.stringify({role:'private', repository_visibility:'PRIVATE'}));
  const source = 'Alex  00:01\nCould we check the scope before committing?\n';
  writeFileSync(path.join(root, 'sources/one-transcript.md'), source);
  const manifest = {visibility:'private', date:'2026-09-05', output_dir:'wiki/voices', transcript_roots:['sources'], people:[{id:'alex', name:'Alex'}], sources:[{id:'SRC-ONE', date:'2026-09-05', context:'A synthetic planning call.', state:'available', path:'sources/one-transcript.md', speakers:{Alex:'alex'}, restrictions_reviewed_sha256:hash(source)}], readings:curated ? [{source_id:'SRC-ONE', person_id:'alex', source_sha256:hash(source), interpretation:'The question makes scope clarification a prerequisite to commitment.', boundary:'Not an agreement or a lasting personality claim.', citations:[{fragment:1,timestamp:'00:01',quote:'check the scope before committing?'}]}] : []};
  writeFileSync(path.join(root, 'voices.json'), JSON.stringify(manifest));
  let job = createJobManifest({job_id:'job-repair-voices', disposition:'queued', provider:{processing:'local'}, authority:{source_access:true,private_preservation:true}, private_context:{transcript_source_ids:['SRC-ONE']}});
  for (const stage of ['intake','inventory','preservation','preparation','transcription','diarization']) job=completeStage(job,stage,receipt('upstream'));
  writeFileSync(path.join(root, 'job.json'), JSON.stringify(job));
  const repair = {...receipt('upstream','repair-output'), transcript_source_sha256:{'SRC-ONE':hash(source)}};
  writeFileSync(path.join(root, 'repair.json'), JSON.stringify(repair));
  writeFileSync(path.join(root, 'reading.json'), JSON.stringify(receipt('repair-output','reading-output')));
  const args = ['--manifest',path.join(root,'job.json'),'--private-root',root,'--voice-manifest','voices.json'];
  return {root, source, manifest, job, repair, args, repairArgs:['repair',...args,'--receipt',path.join(root,'repair.json')], wikiArgs:['wiki',...args,'--receipt',path.join(root,'reading.json')], page:path.join(root,'wiki/voices/alex.md')};
}

// Catches the old repair-only write, which left person pages absent until a
// separate wiki invocation. A draft is accounted for, never called complete.
test('repair completion automatically creates a cited person page and holds unfinished reading', t => {
  const f=fixture(t); const result=run([...f.repairArgs,'--write']);
  assert.equal(existsSync(f.page),true);
  assert.match(readFileSync(f.page,'utf8'),/sources\/one-transcript.md#L1/);
  assert.equal(result.stage_states.repair.status,'complete');
  assert.equal(result.stage_states['close-reading'].status,'held');
  assert.equal(exitCodeForResult(result),2);
  assert.equal(JSON.stringify(result).includes('Alex'),false);
  const first=readFileSync(path.join(f.root,'job.json'),'utf8');
  run([...f.repairArgs,'--write']);
  assert.equal(readFileSync(path.join(f.root,'job.json'),'utf8'),first);
});

test('repair plan never creates pages or changes the job', t => {
  const f=fixture(t); const before=readFileSync(path.join(f.root,'job.json'),'utf8');
  const result=run(f.repairArgs);
  assert.equal(existsSync(f.page),false);
  assert.equal(readFileSync(path.join(f.root,'job.json'),'utf8'),before);
  assert.equal(result.stage_states['close-reading'].status,'held');
});

test('repair cannot silently bypass the person manifest', t => {
  const f=fixture(t);
  assert.throws(()=>run(['repair','--manifest',path.join(f.root,'job.json'),'--receipt',path.join(f.root,'repair.json'),'--write']),/person-reading-manifest-required/);
  assert.equal(JSON.parse(readFileSync(path.join(f.root,'job.json'))).stages.repair.status,'not-started');
});

for (const [label,binding] of [['missing',undefined],['wrong revision',{'SRC-ONE':'f'.repeat(64)}],['extra source',{'SRC-ONE':'f'.repeat(64),'SRC-TWO':'a'.repeat(64)}],['empty',{}]]) {
  test(`repair rejects ${label} source binding before any page or job write`, t => {
    const f=fixture(t); f.repair.transcript_source_sha256=binding;
    writeFileSync(path.join(f.root,'repair.json'),JSON.stringify(f.repair));
    const before=readFileSync(path.join(f.root,'job.json'),'utf8');
    assert.throws(()=>run([...f.repairArgs,'--write']),/repair-source-binding/);
    assert.equal(existsSync(f.page),false);
    assert.equal(readFileSync(path.join(f.root,'job.json'),'utf8'),before);
  });
}

test('curated current pages still require a separate reading receipt, and a valid retry retains it', t => {
  const f=fixture(t,{curated:true});
  const repaired=run([...f.repairArgs,'--write']);
  assert.deepEqual(repaired.stage_states['close-reading'],{status:'held',reason_codes:['person-close-reading-receipt-required']});
  assert.equal(run([...f.wikiArgs,'--write']).stage_states['close-reading'].status,'complete');
  const job=JSON.parse(readFileSync(path.join(f.root,'job.json')));
  assert.equal(job.receipts['close-reading'].person_reading_coverage.source_binding_verified,true);
  const before=readFileSync(path.join(f.root,'job.json'),'utf8');
  run([...f.repairArgs,'--write']);
  assert.equal(readFileSync(path.join(f.root,'job.json'),'utf8'),before);
});

test('wiki rejects a changed source even when someone has refreshed its authored reading', t => {
  const f=fixture(t,{curated:true});
  const repaired=completeStage(f.job,'repair',f.repair);
  writeFileSync(path.join(f.root,'job.json'),JSON.stringify(repaired));
  const changed=f.source+'\n';
  writeFileSync(path.join(f.root,'sources/one-transcript.md'),changed);
  f.manifest.sources[0].restrictions_reviewed_sha256=hash(changed);
  f.manifest.readings[0].source_sha256=hash(changed);
  writeFileSync(path.join(f.root,'voices.json'),JSON.stringify(f.manifest));
  assert.throws(()=>run([...f.wikiArgs,'--write']),/repair-source-binding/);
  assert.equal(existsSync(f.page),false);
});

test('an invalid wiki receipt cannot create pages before the receipt is validated', t => {
  const f=fixture(t,{curated:true});
  writeFileSync(path.join(f.root,'job.json'),JSON.stringify(completeStage(f.job,'repair',f.repair)));
  writeFileSync(path.join(f.root,'reading.json'),JSON.stringify(receipt('wrong-input')));
  assert.throws(()=>run([...f.wikiArgs,'--write']),/receipt|coverage/);
  assert.equal(existsSync(f.page),false);
});

test('repair refuses private processing without preservation authority', t => {
  const f=fixture(t); f.job.authority.private_preservation=false;
  writeFileSync(path.join(f.root,'job.json'),JSON.stringify(f.job));
  assert.throws(()=>run([...f.repairArgs,'--write']),/private-close-reading-authority-required/);
  assert.equal(existsSync(f.page),false);
});

test('a malformed reading receipt cannot write draft pages either', t => {
  const f=fixture(t);
  writeFileSync(path.join(f.root,'job.json'),JSON.stringify(completeStage(f.job,'repair',f.repair)));
  writeFileSync(path.join(f.root,'reading.json'),JSON.stringify({input_fingerprint:'repair-output'}));
  assert.throws(()=>run([...f.wikiArgs,'--write']),/complete-receipt-required/);
  assert.equal(existsSync(f.page),false);
});

test('repairing changed bytes refreshes the page into a source-review hold without stale quotes', t => {
  const f=fixture(t,{curated:true});
  run([...f.repairArgs,'--write']); run([...f.wikiArgs,'--write']);
  const revised='Alex  00:01\nNew private passage awaiting restriction review.\n';
  writeFileSync(path.join(f.root,'sources/one-transcript.md'),revised);
  f.repair.output_fingerprint='repair-output-revised';
  f.repair.transcript_source_sha256['SRC-ONE']=hash(revised);
  writeFileSync(path.join(f.root,'repair.json'),JSON.stringify(f.repair));
  const result=run([...f.repairArgs,'--write']);
  assert.equal(result.stage_states['close-reading'].status,'held');
  const page=readFileSync(f.page,'utf8');
  assert.match(page,/held-source-review/);
  assert.equal(page.includes('Could we check'),false);
  assert.equal(page.includes('New private passage'),false);
  const job=JSON.parse(readFileSync(path.join(f.root,'job.json')));
  assert.equal(job.receipts['close-reading'],undefined);
});

test('automatic repair refresh refuses to overwrite manual page edits and leaves the job unchanged', t => {
  const f=fixture(t);
  run([...f.repairArgs,'--write']);
  const manual=readFileSync(f.page,'utf8')+'Human annotation\n';
  writeFileSync(f.page,manual);
  const jobBefore=readFileSync(path.join(f.root,'job.json'),'utf8');
  assert.throws(()=>run([...f.repairArgs,'--write']),/generated-page-modified/);
  assert.equal(readFileSync(f.page,'utf8'),manual);
  assert.equal(readFileSync(path.join(f.root,'job.json'),'utf8'),jobBefore);
});

test('unrelated historical gaps remain visible but do not block a source-bound current job', t => {
  const f=fixture(t,{curated:true});
  f.manifest.sources.push({id:'SRC-OLD', date:'unknown', context:'Source unavailable.', state:'source-unavailable',speakers:{}});
  writeFileSync(path.join(f.root,'voices.json'),JSON.stringify(f.manifest));
  run([...f.repairArgs,'--write']);
  assert.equal(run([...f.wikiArgs,'--write']).stage_states['close-reading'].status,'complete');
  assert.match(readFileSync(path.join(f.root,'wiki/voices/index.md'),'utf8'),/SRC-OLD/);
});
