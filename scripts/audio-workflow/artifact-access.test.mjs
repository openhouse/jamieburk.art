import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateArtifactReading } from './artifact-access.mjs';
import { run, exitCodeForResult } from './cli.mjs';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';

const sha = 'a'.repeat(64);
const fixture = () => ({
  artifact: { id: 'artifact-independent', event_id: 'event-example', sha256: sha, provenance: 'separate recorder export' },
  authorization: { artifact_id: 'artifact-independent', sha256: sha, scope: 'private-existing-artifact-reading', source_ref: 'bounded-operator-clarification' },
  restrictions: [{ id: 'restriction-feature', scope: 'artifact', target_id: 'artifact-feature', source_ref: 'recorded-feature-objection' }],
  publication_authorized: false
});
test('a distinct authorized artifact is not held merely because its event has a restricted feature', () => {
  assert.equal(evaluateArtifactReading(fixture(), sha).allowed, true);
});
test('the feature artifact remains held even with an operator grant', () => {
  const x = fixture(); x.artifact.id = x.authorization.artifact_id = 'artifact-feature';
  assert.equal(evaluateArtifactReading(x, sha).allowed, false);
});
test('a real event-wide restriction still controls a separate recorder', () => {
  const x = fixture(); x.restrictions[0].scope = 'event'; x.restrictions[0].target_id = 'event-example';
  assert.equal(evaluateArtifactReading(x, sha).allowed, false);
});
test('ambiguous restriction scope fails closed', () => {
  const x = fixture(); x.restrictions[0].scope = 'unknown';
  assert.equal(evaluateArtifactReading(x, sha).allowed, false);
});
test('changed bytes or a different grant cannot inherit authorization', () => {
  for (const mutate of [x=>x.authorization.sha256='b'.repeat(64), x=>x.authorization.artifact_id='another', x=>x.artifact.sha256='c'.repeat(64)]) {
    const x=fixture(); mutate(x); assert.equal(evaluateArtifactReading(x,sha).allowed,false);
  }
});
test('private reading does not authorize external transcription or publication', () => {
  for (const mutate of [x=>x.authorization.scope='external-transcription', x=>x.publication_authorized=true]) {
    const x=fixture(); mutate(x); assert.equal(evaluateArtifactReading(x,sha).allowed,false);
  }
});
test('missing provenance, restriction evidence or observed digest fails closed', () => {
  for (const mutate of [x=>delete x.artifact.provenance, x=>delete x.restrictions[0].source_ref, x=>delete x.restrictions]) {
    const x=fixture(); mutate(x); assert.equal(evaluateArtifactReading(x,sha).allowed,false);
  }
  assert.equal(evaluateArtifactReading(fixture()).allowed,false);
});
test('malformed restriction inventory is a reason-coded hold, not a crash',()=>{
  const x=fixture();x.restrictions={};assert.equal(evaluateArtifactReading(x,sha).allowed,false);
});
test('read-access CLI hashes actual source bytes and never rewrites them',()=>{
  const root=mkdtempSync(tmpdir()+'/artifact-reading-test-');
  try {
    const source='synthetic private text';const hash=createHash('sha256').update(source).digest('hex');
    const x=fixture();x.artifact.sha256=x.authorization.sha256=hash;
    writeFileSync(root+'/source.txt',source);writeFileSync(root+'/access.json',JSON.stringify(x));
    const args=['read-access','--manifest',root+'/access.json','--source',root+'/source.txt'];
    assert.equal(exitCodeForResult(run(args)),0);assert.equal(readFileSync(root+'/source.txt','utf8'),source);
    writeFileSync(root+'/source.txt',source+' changed');assert.equal(exitCodeForResult(run(args)),1);
  }finally{rmSync(root,{recursive:true,force:true});}
});
test('read-access missing-source errors do not expose protected locators',()=>{
  assert.throws(()=>run(['read-access','--manifest','/synthetic-private-manifest','--source','/synthetic-private-source']),{message:'reading-input-unreadable-or-invalid'});
});
