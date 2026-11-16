import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, writeFileSync, readFileSync, mkdirSync, symlinkSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { completeStage, createJobManifest, STAGES } from "./core.mjs";

const sha = value => createHash("sha256").update(value).digest("hex");
const text = "## Fragment 1\n\nSpeaker A  00:01\nWhat would help?\n\nSpeaker B  00:03\nI can review a draft, not approve it.\n\n## Fragment 2\n\nSpeaker A  00:01\nLet us name the decision.\n";
const fixture = () => ({
  schema_version: 1, visibility: "private", authorized: true, reviewed_on: "2026-09-05",
  destination: "wiki/voices",
  people: [{ id: "person-a", name: "Example A" }, { id: "person-b", name: "Example B" }],
  transcripts: [{
    id: "transcript-a", source_id: "SRC-EXAMPLE-A", title: "Synthetic conversation",
    date: "2026-09-01", path: "artifacts/derived/example.md", sha256: sha(text),
    text, access: "authorized", speakers: [
      { label: "Speaker A", person_id: "person-a", status: "context-supported", basis: "Synthetic roster" },
      { label: "Speaker B", person_id: "person-b", status: "context-supported", basis: "Synthetic roster" }
    ]
  }],
  readings: [
    { transcript_id: "transcript-a", person_id: "person-a", source_sha256: sha(text),
      observations: [{ interpretation: "A asks for a useful outcome, then makes the decision explicit.",
        citations: [{ turn_id: "turn-0001", quote: "What would help?" }, { turn_id: "turn-0003", quote: "Let us name the decision." }] }],
      limits: "A question does not establish agreement.", review: "ai-draft" },
    { transcript_id: "transcript-a", person_id: "person-b", source_sha256: sha(text),
      observations: [{ interpretation: "B distinguishes review from decision authority.",
        citations: [{ turn_id: "turn-0002", quote: "not approve it" }] }],
      limits: "This is a situated statement, not a standing commitment.", review: "ai-draft" }
  ]
});
async function api() {
  const module = await import("./situated-voices.mjs").catch(() => ({}));
  assert.equal(typeof module.buildVoiceGraph, "function", "a source-bound per-speaker projector is required");
  return module;
}
function readyJob() {
  let job = createJobManifest({job_id:"job-example",disposition:"queued",provider:{processing:"local"},authority:{source_access:true,private_preservation:true}});
  for(const stage of STAGES.slice(0,7)) job=completeStage(job,stage,{status:"complete",input_fingerprint:"repair-a",output_fingerprint:"repair-a",artifact_count:1,unresolved_conditions:[],...(stage==="repair"?{transcript_sources:[{transcript_id:"transcript-a",sha256:sha(text)}]}:{})});
  return job;
}
const receipt = {status:"complete",input_fingerprint:"repair-a",output_fingerprint:"voice-a",artifact_count:2,unresolved_conditions:[]};

test("close-reading cannot complete from a generic artifact-count receipt", () => {
  assert.throws(()=>completeStage(readyJob(),"close-reading",receipt),/situated-voice-corpus-required/);
});
test("one cited entry per transcript speaker and a graph edge in both directions", async()=>{
  const {buildVoiceGraph}=await api(); const result=buildVoiceGraph(fixture());
  assert.equal(result.complete,true); assert.equal(result.entries.length,2);
  assert.deepEqual(result.entries.map(e=>[e.person_id,e.status]),[["person-a","draft-close-reading"],["person-b","draft-close-reading"]]);
  assert.equal(result.edges.length,4); assert.equal(result.publication_authorized,false);
});
test("fragment-relative timestamps stay distinct and citations retain source lines",async()=>{
  const {parseTranscript,buildVoiceGraph}=await api();const turns=parseTranscript(text);
  assert.deepEqual(turns.map(t=>[t.id,t.fragment,t.timestamp,t.line]),[
    ["turn-0001","Fragment 1","00:01",3],["turn-0002","Fragment 1","00:03",6],["turn-0003","Fragment 2","00:01",11]]);
  const graph=buildVoiceGraph(fixture());assert.equal(graph.entries[0].observations[0].citations[1].line,11);
});
test("every speaker is discovered even if omitted from the roster or readings",async()=>{
  const {buildVoiceGraph}=await api();const input=fixture();input.transcripts[0].speakers.pop();input.readings.pop();
  const g=buildVoiceGraph(input);assert.equal(g.entries.length,2);assert.equal(g.complete,false);
  assert.equal(g.entries[1].status,"unresolved-speaker");assert.notEqual(g.entries[1].person_id,"person-a");
});
test("mentioned people do not become speakers",async()=>{
  const {buildVoiceGraph}=await api();const f=fixture();f.people.push({id:"mentioned",name:"Mentioned observer"});
  assert.equal(buildVoiceGraph(f).entries.some(e=>e.person_id==="mentioned"),false);
});
test("missing readings produce cited pending entries and block completion",async()=>{
  const {buildVoiceGraph}=await api();const f=fixture();f.readings=[];
  const g=buildVoiceGraph(f);assert.equal(g.complete,false);assert.equal(g.tasks.length,2);
  assert.equal(g.entries[0].status,"pending-reading");assert.equal(g.entries[0].source.source_id,"SRC-EXAMPLE-A");
  assert.throws(()=>completeStage(readyJob(),"close-reading",receipt,f),/situated-voice-coverage-incomplete/);
});
test("changed source bytes invalidate existing readings rather than retaining green",async()=>{
  const {buildVoiceGraph}=await api();const f=fixture();f.transcripts[0].text+="\nNew source text";
  f.transcripts[0].sha256=sha(f.transcripts[0].text);
  const g=buildVoiceGraph(f);assert.equal(g.complete,false);assert.ok(g.entries.every(e=>e.status==="stale-reading"));
});
test("a changed declared checksum is rejected",async()=>{
  const {buildVoiceGraph}=await api();const f=fixture();f.transcripts[0].sha256="0".repeat(64);
  assert.throws(()=>buildVoiceGraph(f),/source-checksum-mismatch/);
});
test("another speaker's words cannot support a person's voice claim",async()=>{
  const {buildVoiceGraph}=await api();const f=fixture();f.readings[0].observations[0].citations=[{turn_id:"turn-0002",quote:"not approve it"}];
  assert.throws(()=>buildVoiceGraph(f),/citation-speaker-mismatch/);
});
test("fabricated quotation or nonexistent turn is rejected",async()=>{
  const {buildVoiceGraph}=await api();
  for(const citation of [{turn_id:"turn-0001",quote:"I authorize it"},{turn_id:"turn-9999",quote:"What would help?"}]){
    const f=fixture();f.readings[0].observations[0].citations=[citation];
    assert.throws(()=>buildVoiceGraph(f),/citation-(quote|turn)-mismatch/);
  }
});
test("duplicate readings cannot mask an uncovered pair",async()=>{
  const {buildVoiceGraph}=await api();const f=fixture();f.readings[1]=structuredClone(f.readings[0]);
  assert.throws(()=>buildVoiceGraph(f),/duplicate-reading/);
});
test("source holds prevent analysis and quotation in generated entries",async()=>{
  const {buildVoiceGraph,renderVoicePages}=await api();const f=fixture();f.transcripts[0].access="held";
  const g=buildVoiceGraph(f);assert.equal(g.complete,false);
  const pages=JSON.stringify(renderVoicePages(g));assert.equal(pages.includes("not approve it"),false);
  assert.equal(pages.includes("A asks for a useful outcome"),false);
});
test("unknown speakers remain transcript-scoped, never merged by label",async()=>{
  const {buildVoiceGraph}=await api();const f=fixture();f.transcripts[0].speakers=[];f.readings=[];
  const another=structuredClone(f.transcripts[0]);another.id="transcript-b";f.transcripts.push(another);
  const g=buildVoiceGraph(f);assert.equal(new Set(g.entries.map(e=>e.person_id)).size,4);
});
test("a full cited bundle binds the close-reading receipt without speaking authority",async()=>{
  const f=fixture();await api();const job=completeStage(readyJob(),"close-reading",receipt,f);
  assert.match(job.receipts["close-reading"].voice_coverage.candidate_fingerprint,/^[a-f0-9]{64}$/);
  assert.equal(job.receipts["close-reading"].voice_coverage.pair_count,2);
  assert.equal(job.receipts["close-reading"].voice_coverage.publication_authorized,false);
});
test("nonprivate destinations and unbounded access fail closed",async()=>{
  const {buildVoiceGraph}=await api();for(const patch of [{visibility:"public"},{authorized:false}]){
    assert.throws(()=>buildVoiceGraph({...fixture(),...patch}),/private-authorized-corpus-required/);
  }
});
test("rendered entries carry quotations, interpretation, limits, source revision and provenance",async()=>{
  const {buildVoiceGraph,renderVoicePages}=await api();const pages=renderVoicePages(buildVoiceGraph(fixture()));
  assert.match(pages["person-a.md"],/What would help\?/);
  assert.match(pages["person-a.md"],/documented interpretation/i);
  assert.match(pages["person-a.md"],/Fragment 2.*00:01/);
  assert.match(pages["person-a.md"],/not establish agreement/);
  assert.ok(pages["person-a.md"].includes(sha(text)));assert.match(pages["person-a.md"],/not.*endorsement/i);
});
test("idempotent generation preserves authored content outside managed sections",async()=>{
  const {syncVoicePages}=await api();const root=mkdtempSync(path.join(os.tmpdir(),"voice-test-"));
  const f=fixture();const first=syncVoicePages(f,root,{write:true});assert.equal(first.changed_files.length,3);
  const file=path.join(root,"wiki/voices/person-a.md");writeFileSync(file,readFileSync(file,"utf8")+"\n## Authored note\nKeep this.\n");
  const next=syncVoicePages(f,root,{write:true});assert.deepEqual(next.changed_files,[]);
  assert.match(readFileSync(file,"utf8"),/Keep this/);
});
test("dry-run creates no page and check mode detects missing or stale output",async()=>{
  const {syncVoicePages}=await api();const root=mkdtempSync(path.join(os.tmpdir(),"voice-test-"));
  assert.equal(syncVoicePages(fixture(),root).changed_files.length,3);
  assert.throws(()=>readFileSync(path.join(root,"wiki/voices/person-a.md")),/ENOENT/);
});
test("projection refuses path traversal and symlink escape before writing",async()=>{
  const {syncVoicePages}=await api();const root=mkdtempSync(path.join(os.tmpdir(),"voice-test-"));
  const outside=mkdtempSync(path.join(os.tmpdir(),"voice-outside-"));mkdirSync(path.join(root,"wiki"));
  symlinkSync(outside,path.join(root,"wiki/voices"));
  assert.throws(()=>syncVoicePages(fixture(),root,{write:true}),/unsafe-output-path/);
  const f=fixture();f.destination="../escaped";assert.throws(()=>syncVoicePages(f,root,{write:true}),/unsafe-output-path/);
});
test("unmanaged page collisions are retained without overwrite",async()=>{
  const {syncVoicePages}=await api();const root=mkdtempSync(path.join(os.tmpdir(),"voice-test-"));
  mkdirSync(path.join(root,"wiki/voices"),{recursive:true});const file=path.join(root,"wiki/voices/person-a.md");writeFileSync(file,"Original page");
  assert.throws(()=>syncVoicePages(fixture(),root,{write:true}),/unmanaged-page-conflict/);
  assert.equal(readFileSync(file,"utf8"),"Original page");
});

test("a valid reading bundle for the wrong repair cannot advance the job",async()=>{
  await api();const f=fixture();f.transcripts[0].id="transcript-other";
  for(const r of f.readings)r.transcript_id="transcript-other";
  assert.throws(()=>completeStage(readyJob(),"close-reading",receipt,f),/voice-corpus-repair-binding-mismatch/);
});
test("projection and verification recheck voice coverage rather than trusting an old receipt",async()=>{
  await api();const f=fixture();const job=completeStage(readyJob(),"close-reading",receipt,f);
  f.readings.pop();
  assert.throws(()=>completeStage(job,"projection",{...receipt,input_fingerprint:"voice-a"},f),/situated-voice-coverage-incomplete/);
});
test("dangling symlinks cannot redirect an output write",async()=>{
  const {syncVoicePages}=await api();const root=mkdtempSync(path.join(os.tmpdir(),"voice-test-"));
  mkdirSync(path.join(root,"wiki"));symlinkSync(path.join(root,"not-created"),path.join(root,"wiki/voices"));
  assert.throws(()=>syncVoicePages(fixture(),root,{write:true}),/unsafe-output-path/);
});
test("an upstream hold deletes the formerly complete receipt at that same stage",async()=>{
  const {holdStage}=await import("./core.mjs");const job=readyJob();const held=holdStage(job,"repair",["source-changed"]);
  assert.equal(held.receipts.repair,undefined);
});
test("retired participant pages lose active generated claims but retain authored notes",async()=>{
  const {syncVoicePages}=await api();const root=mkdtempSync(path.join(os.tmpdir(),"voice-test-"));syncVoicePages(fixture(),root,{write:true});
  const f=fixture();f.transcripts[0].speakers[1].person_id="person-c";f.people.push({id:"person-c",name:"Example C"});f.readings[1].person_id="person-c";
  syncVoicePages(f,root,{write:true});
  assert.match(readFileSync(path.join(root,"wiki/voices/person-b.md"),"utf8"),/No current transcript entries/);
  assert.equal(readFileSync(path.join(root,"wiki/voices/person-b.md"),"utf8").includes("not approve it"),false);
});
test("restricted turns cannot enter a close reading",async()=>{
  const {buildVoiceGraph}=await api();const f=fixture();f.transcripts[0].restricted_turn_ids=["turn-0002"];
  assert.throws(()=>buildVoiceGraph(f),/restricted-turn-not-projectable/);
});

test("wiki CLI writes source-bound person pages and a receipt without leaking bodies in logs",async()=>{
  const {run,exitCodeForResult}=await import("./cli.mjs");
  const root=mkdtempSync(path.join(os.tmpdir(),"voice-cli-"));const f=fixture();
  mkdirSync(path.join(root,"artifacts/derived"),{recursive:true});
  writeFileSync(path.join(root,f.transcripts[0].path),text);
  delete f.transcripts[0].text;
  writeFileSync(path.join(root,"voices.json"),JSON.stringify(f));
  writeFileSync(path.join(root,"job.json"),JSON.stringify(readyJob()));
  writeFileSync(path.join(root,"receipt.json"),JSON.stringify(receipt));
  const args=["wiki","--manifest",path.join(root,"job.json"),"--receipt",path.join(root,"receipt.json"),"--private-root",root,"--voices","voices.json"];
  const preview=run(args);assert.equal(preview.dry_run,true);
  assert.throws(()=>readFileSync(path.join(root,"wiki/voices/person-a.md")),/ENOENT/);
  const result=run([...args,"--write"]);assert.equal(exitCodeForResult(result),0);
  assert.equal(JSON.parse(readFileSync(path.join(root,"job.json"))).stages["close-reading"].status,"complete");
  assert.match(readFileSync(path.join(root,"wiki/voices/person-a.md"),"utf8"),/What would help/);
  assert.equal(JSON.stringify(result).includes("What would help"),false);
});
test("wiki CLI materializes missing-reading holds and returns nonzero",async()=>{
  const {run,exitCodeForResult}=await import("./cli.mjs");
  const root=mkdtempSync(path.join(os.tmpdir(),"voice-cli-"));const f=fixture();f.readings=[];
  mkdirSync(path.join(root,"artifacts/derived"),{recursive:true});writeFileSync(path.join(root,f.transcripts[0].path),text);delete f.transcripts[0].text;
  writeFileSync(path.join(root,"voices.json"),JSON.stringify(f));writeFileSync(path.join(root,"job.json"),JSON.stringify(readyJob()));
  const result=run(["wiki","--manifest",path.join(root,"job.json"),"--private-root",root,"--voices","voices.json","--write"]);
  assert.equal(exitCodeForResult(result),2);
  assert.equal(JSON.parse(readFileSync(path.join(root,"job.json"))).stages["close-reading"].status,"held");
  assert.match(readFileSync(path.join(root,"wiki/voices/person-a.md"),"utf8"),/pending-reading/);
});

test("generated frontmatter retains source authority and refreshes graph relations on a new transcript",async()=>{
  const {syncVoicePages}=await api();const root=mkdtempSync(path.join(os.tmpdir(),"voice-test-"));const f=fixture();
  syncVoicePages(f,root,{write:true});
  const second=structuredClone(f.transcripts[0]);second.id="transcript-b";f.transcripts.push(second);
  f.readings.push(...f.readings.map(r=>({...r,transcript_id:"transcript-b"})));
  syncVoicePages(f,root,{write:true});
  const fm=readFileSync(path.join(root,"wiki/voices/person-a.md"),"utf8").split("---")[1];
  assert.match(fm,/authority:/);assert.match(fm,/source_basis:/);assert.match(fm,/date:/);assert.match(fm,/transcript-b/);
});

test("quoted source Markdown stays literal rather than loading a remote image",async()=>{
  const {buildVoiceGraph,renderVoicePages}=await api();const f=fixture();
  const quote="![beacon](https://example.invalid/pixel)";
  f.transcripts[0].text=f.transcripts[0].text.replace("What would help?","What would help? "+quote);
  f.transcripts[0].sha256=sha(f.transcripts[0].text);
  for(const r of f.readings)r.source_sha256=f.transcripts[0].sha256;
  f.readings[0].observations[0].citations[0].quote=quote;
  assert.equal(renderVoicePages(buildVoiceGraph(f))["person-a.md"].includes(quote),false);
});
