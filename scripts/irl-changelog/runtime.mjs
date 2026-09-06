// Private, operator-invoked RFC 0016 runtime. No collection, publication, or action authority.
import * as fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {createHash, randomUUID, verify} from "node:crypto";
import {isDeepStrictEqual} from "node:util";
import {ledgerFingerprint, evaluateIRLRecord, evaluateIRLProjection} from "../rfcs/irl-changelog-eval.mjs";

const sha=bytes=>createHash("sha256").update(bytes).digest("hex");
const json=value=>JSON.stringify(value,null,2)+"\n";
const fail=reason=>{throw new Error(reason);};
const text=value=>typeof value==="string" && value.trim().length>0;
const clock=()=>new Date().toISOString().replace(/\.\d{3}Z$/,"Z");
const digest=value=>/^[a-f0-9]{64}$/.test(value);
const flags={human_review_complete:false,publication_authorized:false,action_authorized:false};
const planDigest=p=>ledgerFingerprint({expected_prior:p.expected_prior,request_digest:p.request_digest,record:p.record,views:p.views});
const adapters=new WeakSet();

function assertRecord(record,previous) {
 const check=evaluateIRLRecord(record,{previous});
 if(check.decision==="deny") fail("invalid-ledger: "+check.reasons.join(","));
 if(previous && !previous.entities.every((entity,i)=>isDeepStrictEqual(entity,record.entities[i]))) fail("entity-history-rewritten");
 return check;
}
export function planAppend(previous,intake,{expectedPrior,idempotencyKey,now=clock}={}) {
 if(expectedPrior!==ledgerFingerprint(previous)) fail("stale-expected-prior");
 if(!text(idempotencyKey)||idempotencyKey.length>200) fail("idempotency-key-required");
 if(!intake || !Array.isArray(intake.entries) || !intake.entries.length ||
   ["sources","entities","views"].some(k=>intake[k]!==undefined&&!Array.isArray(intake[k]))) fail("invalid-intake");
 if(intake.entries.some(e=>!e || e.recorded_at!==undefined)) fail("recorded-at-is-runtime-owned");
 const recorded=now();
 const record={...structuredClone(previous),
  sources:[...structuredClone(previous.sources),...structuredClone(intake.sources??[])],
  entities:[...structuredClone(previous.entities),...structuredClone(intake.entities??[])],
  entries:[...structuredClone(previous.entries),...intake.entries.map(e=>({...structuredClone(e),recorded_at:recorded}))]};
 const check=assertRecord(record,previous);
 const plan={status:"append-plan",expected_prior:expectedPrior,idempotency_key:idempotencyKey,
  request_digest:ledgerFingerprint(intake),record,views:structuredClone(intake.views??[]),validation:check,...flags};
 plan.plan_digest=planDigest(plan);
 return plan;
}

// This is an operator trust boundary, NOT a source of authorization in authored content.
// The expected digest must arrive independently (e.g. an approved operator configuration).
export function createAdapter(config,{expectedDigest,now=clock}={}) {
 if(!digest(expectedDigest)||ledgerFingerprint(config)!==expectedDigest) fail("trust-digest-mismatch");
 const policy=structuredClone(config);
 if(!path.isAbsolute(policy.store_root??"") || !text(policy.scope)) fail("invalid-operator-policy");
 if(!policy.checkpoint || ledgerFingerprint(policy.checkpoint.record)!==policy.checkpoint.fingerprint) fail("checkpoint-fingerprint-mismatch");
 assertRecord(policy.checkpoint.record);
 if(policy.checkpoint.record.scope!==policy.scope) fail("checkpoint-scope-mismatch");
 const adapter={
  policy_digest:expectedDigest,
  root:path.resolve(policy.store_root),
  checkpoint:()=>structuredClone(policy.checkpoint.record),
  now,
  assertScope(record) {if(record.scope!==policy.scope) fail("scope-mismatch");},
  assertWrite() {if(policy.write_enabled!==true) fail("write-disabled");},
  resolve(entity) {return (policy.entities??[]).some(e=>e.id===entity.id&&e.type===entity.type&&e.resolution==="resolved");},
  source(source) {
   const pin=policy.sources?.[source.id];
   if(pin?.read_allowed!==true || pin.eligibility!=="permitted" || source.eligibility!=="permitted") return {status:"hold",reason:"source-unavailable-or-restricted"};
   if(pin.revision!==source.revision || pin.sha256!==source.sha256 ||
    !path.isAbsolute(pin.repo??"") || !text(pin.path) || pin.path.startsWith("/") ||
    pin.path.split("/").some(s=>s===".."||s==="."||s==="") ||
    !/^[a-f0-9]{40}$/.test(pin.revision)) return {status:"hold",reason:"source-pin-mismatch"};
   try {
    // Local, pinned Git blob only. Does not read a mutable working file or follow its symlink.
    const bytes=execFileSync("git",["-C",pin.repo,"cat-file","blob",pin.revision+":"+pin.path],
     {stdio:["ignore","pipe","pipe"],maxBuffer:32*1024*1024,env:{...process.env,GIT_NO_LAZY_FETCH:"1",GIT_TERMINAL_PROMPT:"0"}});
    return sha(bytes)===source.sha256?{status:"verified"}:{status:"hold",reason:"source-bytes-mismatch"};
   } catch {return {status:"hold",reason:"source-unavailable-or-restricted"};}
  },
  review(source) {
   const receipt=policy.context_reviews?.[source.id],key=policy.review_keys?.[receipt?.key_id];
   try {
    if(!receipt || policy.context_heads?.[source.id]!==ledgerFingerprint(receipt) || !key ||
     receipt.payload?.reviewed_by!==key.reviewer || !text(receipt.signature) ||
     !Number.isFinite(Date.parse(receipt.payload.valid_until)) || Date.parse(receipt.payload.valid_until)<=Date.parse(now()) ||
     !verify(null,Buffer.from(ledgerFingerprint(receipt.payload)),key.public_key,Buffer.from(receipt.signature,"base64"))) return null;
    return structuredClone(receipt.payload);
   } catch {return null;}
  }
 };
 adapters.add(adapter);
 return Object.freeze(adapter);
}
function adapterFor(root,adapter,{write=false}={}) {
 if(!adapters.has(adapter)) fail("trusted-adapter-required");
 if(path.resolve(root)!==adapter.root) fail("store-root-mismatch");
 if(write) adapter.assertWrite();
 return adapter;
}
function basis(record,entityIds) {
 const selected=new Set(record.entries.filter(e=>e.about.some(a=>entityIds.includes(a.id))).map(e=>e.id));
 let changed=true;
 while(changed) {
  const size=selected.size;
  for(const entry of record.entries) {
   if(entry.corrections.some(c=>selected.has(c.entry_id))) selected.add(entry.id);
   if(selected.has(entry.id)) for(const correction of entry.corrections) selected.add(correction.entry_id);
  }
  changed=size!==selected.size;
 }
 return record.entries.filter(e=>selected.has(e.id));
}
export function projectView(record,spec,adapter) {
 if(!adapters.has(adapter)) fail("trusted-adapter-required");
 const output={id:spec?.id??null,status:"hold",ledger_fingerprint:ledgerFingerprint(record),
  basis_entry_ids:[],entity_ids:spec?.entity_ids??[],use:spec?.use??null,
  policy_digest:adapter.policy_digest,checked_at:adapter.now(),reasons:[],source_checks:[],...flags};
 adapter.assertScope(record);
 if(evaluateIRLRecord(record).decision==="deny" || !Array.isArray(spec?.entity_ids) || !spec.entity_ids.length) {
  output.reasons=["invalid-ledger-or-scope"];return output;
 }
 const entries=basis(record,spec.entity_ids);
 output.basis_entry_ids=entries.map(e=>e.id);
 const ids=new Set(entries.flatMap(e=>e.about.map(a=>a.id)).concat(spec.entity_ids));
 if([...ids].some(id=>!adapter.resolve(record.entities.find(e=>e.id===id)??{id}))) output.reasons.push("entity-unresolved");
 const sourceIds=new Set(entries.flatMap(e=>e.evidence.map(c=>c.source_id)));
 const reviews={};
 for(const id of sourceIds) {
  const source=record.sources.find(s=>s.id===id);
  const checked=source?adapter.source(source):{status:"hold",reason:"source-unavailable-or-restricted"};
  const review=source?adapter.review(source):null;
  output.source_checks.push({id,...checked,review_receipt:review?.receipt_id??null});
  if(checked.status!=="verified") output.reasons.push(checked.reason);
  if(review) reviews[id]=review;
  else output.reasons.push("contextual-review-unverified");
 }
 const projected=evaluateIRLProjection(record,output,{contextReviews:reviews});
 output.status=output.reasons.length?"hold":projected.status;
 if(output.status!=="current-candidate"&&!output.reasons.length) output.reasons.push("record-or-context-held");
 // No prose from held dependencies is rendered into a seemingly supported current view.
 output.reading=output.status==="current-candidate"?{
  current_picture:entries.map(e=>({id:e.id,now:e.now,limitation:e.limitation})),
  changes_and_disagreements:entries.map(e=>({id:e.id,before:e.before,consequence:e.consequence,corrections:e.corrections})),
  evidence_and_history:entries.map(e=>({id:e.id,event_time:e.event_time,learned_on:e.learned_on,recorded_at:e.recorded_at,evidence:e.evidence}))
 }:null;
 output.reasons=[...new Set(output.reasons)];
 return output;
}

// A store is private trusted operator storage, not a multi-user filesystem security boundary.
function safeRoot(root,io) {
 const stat=io.lstatSync(root,{throwIfNoEntry:false});
 if(stat?.isSymbolicLink()) fail("symlink-store-root");
 if(stat && (!stat.isDirectory() || (stat.mode&0o077)!==0)) fail("private-permissions-required");
}
function checkedPath(root,relative,io=fs) {
 if(!text(relative)||path.isAbsolute(relative)||relative.split("/").some(p=>p===".."||p==="."||p==="")) fail("unsafe-store-path");
 let current=root;
 for(const part of relative.split("/")) {
  current=path.join(current,part);
  if(io.lstatSync(current,{throwIfNoEntry:false})?.isSymbolicLink()) fail("symlink-store-path");
 }
 return current;
}
function syncDir(dir,io) {
 const fd=io.openSync(dir,"r");
 try {io.fsyncSync(fd);} finally {io.closeSync(fd);}
}
function writeNew(file,body,io) {
 const fd=io.openSync(file,"wx",0o600);
 try {io.writeFileSync(fd,body);io.fsyncSync(fd);} finally {io.closeSync(fd);}
}
function locked(root,adapter,io,fn) {
 adapterFor(root,adapter,{write:true});safeRoot(root,io);
 io.mkdirSync(root,{recursive:true,mode:0o700});
 const lock=checkedPath(root,".writer-lock",io);
 try {io.mkdirSync(lock,{mode:0o700});} catch(error) {if(error.code==="EEXIST") fail("writer-locked");throw error;}
 try {return fn();} finally {io.rmdirSync(lock);}
}
function readPointer(root,io=fs) {
 const pointer=JSON.parse(io.readFileSync(checkedPath(root,"CURRENT",io),"utf8"));
 if(!digest(pointer.generation)) fail("invalid-generation-pointer");
 return pointer;
}
function readGeneration(root,id,adapter,io=fs) {
 if(!digest(id)) fail("invalid-generation");
 const dir=checkedPath(root,"generations/"+id,io);
 const manifest=JSON.parse(io.readFileSync(checkedPath(root,"generations/"+id+"/manifest.json",io),"utf8"));
 if(ledgerFingerprint(manifest)!==id || manifest.schema_version!==1 || !manifest.files || Array.isArray(manifest.files)) fail("generation-integrity");
 const names=Object.keys(manifest.files).sort();
 if(!isDeepStrictEqual(io.readdirSync(dir).sort(),[...names,"manifest.json"].sort())) fail("generation-integrity-file-set");
 for(const name of names) {
  if(name.includes("/") || !digest(manifest.files[name]) ||
    sha(io.readFileSync(checkedPath(root,"generations/"+id+"/"+name,io)))!==manifest.files[name]) fail("generation-integrity");
 }
 for(const name of ["ledger.json","receipt.json","views.json","history.md","source-pointers.json"]) if(!names.includes(name)) fail("generation-integrity-missing-file");
 const record=JSON.parse(io.readFileSync(path.join(dir,"ledger.json"),"utf8"));
 adapter.assertScope(record);assertRecord(record,adapter.checkpoint());
 return {record,receipt:JSON.parse(io.readFileSync(path.join(dir,"receipt.json"),"utf8")),
  views:JSON.parse(io.readFileSync(path.join(dir,"views.json"),"utf8"))};
}
export function inspectStore({root,adapter,io=fs}) {
 adapterFor(root,adapter);safeRoot(root,io);
 const pointer=readPointer(root,io),current=readGeneration(root,pointer.generation,adapter,io);
 const known=new Set();let id=pointer.generation;
 while(id) {
  if(known.has(id)) fail("generation-history-cycle");
  known.add(id);id=readGeneration(root,id,adapter,io).receipt.parent_generation;
 }
 const dirs=io.readdirSync(checkedPath(root,"generations",io));
 return {status:pointer.disabled?"reconciliation-required":"readable",generation:pointer.generation,
  record:current.record,integrity:"verified",receipt:current.receipt,consumer_enabled:!pointer.disabled,
  // Always recheck current source permissions; saved views are historical receipts.
  views:current.views.map(v=>pointer.disabled?{...v,status:"hold",reading:null,reasons:["consumer-disabled"],...flags}:projectView(current.record,v,adapter)),
  recovery:{orphans:dirs.filter(n=>!known.has(n)),retained_generations:[...known],
   incomplete:io.readdirSync(root).filter(n=>n.startsWith(".stage-")||n.startsWith(".pointer-"))},...flags};
}
function historyMarkdown(record) {
 const lines=["# Private IRL history","","Generated, source-bounded history; not a public surface or action queue.",""];
 for(const e of record.entries) {
  lines.push("## "+e.id,"", "Event: "+JSON.stringify(e.event_time)+"; learned: "+(e.learned_on??"unknown")+"; recorded: "+e.recorded_at,
   "", "Before ("+e.before.basis+"): "+e.before.text,"","Now: "+e.now,"","Consequence: "+e.consequence,
   "","Limitation: "+e.limitation,"","Next evidence (not a task): "+e.next_evidence,"",
   "Corrections: "+JSON.stringify(e.corrections),"","Evidence: "+JSON.stringify(e.evidence),"");
 }
 return lines.join("\n")+"\n";
}
function seal(root,record,views,receipt,adapter,io) {
 const generations=checkedPath(root,"generations",io);io.mkdirSync(generations,{recursive:true,mode:0o700});
 const stage=checkedPath(root,".stage-"+randomUUID(),io);io.mkdirSync(stage,{mode:0o700});
 const files={
  "ledger.json":json(record),"receipt.json":json(receipt),"history.md":historyMarkdown(record),
  "views.json":json(views.map(v=>projectView(record,v,adapter))),
  "source-pointers.json":json(record.sources.map(s=>({...s,body_embedded:false})))
 };
 const manifest={schema_version:1,files:Object.fromEntries(Object.entries(files).map(([name,body])=>[name,sha(body)]))};
 for(const [name,body] of Object.entries(files)) writeNew(path.join(stage,name),body,io);
 writeNew(path.join(stage,"manifest.json"),json(manifest),io);syncDir(stage,io);
 const generation=ledgerFingerprint(manifest),destination=checkedPath(root,"generations/"+generation,io);
 if(io.existsSync(destination)) fail("generation-already-exists-reconcile");
 io.renameSync(stage,destination);syncDir(generations,io);
 return generation;
}
function switchPointer(root,pointer,io) {
 const temp=checkedPath(root,".pointer-"+randomUUID(),io);
 writeNew(temp,json(pointer),io);
 io.renameSync(temp,checkedPath(root,"CURRENT",io));syncDir(root,io);
}
export function openStore({root,adapter,io=fs}) {
 return locked(root,adapter,io,()=>{
  if(io.existsSync(checkedPath(root,"CURRENT",io))) return inspectStore({root,adapter,io});
  // Unattached generations from a failed initial write require explicit recovery, never overwrite.
  if(io.existsSync(checkedPath(root,"generations",io))&&io.readdirSync(path.join(root,"generations")).length) fail("initialization-recovery-required");
  const record=adapter.checkpoint();
  const generation=seal(root,record,[],{kind:"checkpoint",parent_generation:null,idempotency:[],policy_digest:adapter.policy_digest,...flags},adapter,io);
  switchPointer(root,{generation,disabled:false},io);
  return {status:"initialized",generation,...flags};
 });
}
export function commitPlan({root,plan,adapter,io=fs}) {
 return locked(root,adapter,io,()=>{
  const pointer=readPointer(root,io);
  if(pointer.disabled) fail("writes-disabled-pending-reconciliation");
  const current=inspectStore({root,adapter,io});
  if(current.recovery.orphans.length || current.recovery.incomplete.length) fail("recovery-required");
  if(!text(plan?.idempotency_key)) fail("idempotency-key-required");
  if(!digest(plan.request_digest)||planDigest(plan)!==plan.plan_digest) fail("plan-digest-mismatch");
  const retry=current.receipt.idempotency.find(r=>r.key===plan.idempotency_key);
  if(retry) {
   if(retry.request_digest!==plan.request_digest) fail("idempotency-conflict");
   const original=current.recovery.retained_generations.find(id=>ledgerFingerprint(readGeneration(root,id,adapter,io).record)===retry.record_fingerprint);
   if(!original) fail("idempotency-receipt-integrity");
   return {status:"idempotent",generation:original,current_generation:current.generation,original_record_fingerprint:retry.record_fingerprint,...flags};
  }
  if(plan.expected_prior!==ledgerFingerprint(current.record)) fail("stale-expected-prior");
  const record=structuredClone(plan.record);
  assertRecord(record,current.record);assertRecord(record,adapter.checkpoint());
  if(record.entries.length<=current.record.entries.length) fail("append-required");
  const actualRecorded=adapter.now();
  for(const entry of record.entries.slice(current.record.entries.length)) entry.recorded_at=actualRecorded;
  assertRecord(record,current.record);
  const receipt={kind:"append",parent_generation:current.generation,policy_digest:adapter.policy_digest,
   idempotency:[...current.receipt.idempotency,{key:plan.idempotency_key,request_digest:plan.request_digest,record_fingerprint:ledgerFingerprint(record)}],...flags};
  const generation=seal(root,record,plan.views,receipt,adapter,io);
  switchPointer(root,{generation,disabled:false},io);
  return {status:"committed",generation,record_fingerprint:ledgerFingerprint(record),...flags};
 });
}
export function rollbackStore({root,adapter,expectedGeneration,targetGeneration,reason,io=fs}) {
 return locked(root,adapter,io,()=>{
  const current=inspectStore({root,adapter,io});
  if(current.generation!==expectedGeneration) fail("stale-generation");
  if(!text(reason)) fail("rollback-reason-required");
  if(targetGeneration===current.generation||!current.recovery.retained_generations.includes(targetGeneration)) fail("rollback-target-not-ancestor");
  readGeneration(root,targetGeneration,adapter,io);
  switchPointer(root,{generation:targetGeneration,disabled:true,rollback:{from:current.generation,reason,recorded_at:adapter.now()}},io);
  return {status:"rolled-back-held",generation:targetGeneration,retained_generation:current.generation,...flags};
 });
}

// Read-only crosswalk: no inferred learning date, observer, source type or permission.
export function planLegacy(legacy,{revision,sha256}={}) {
 if(legacy?.schema_version!==1||!Array.isArray(legacy.entries)||!Array.isArray(legacy.sources) ||
  !/^[a-f0-9]{40}$/.test(revision)||!digest(sha256)) fail("invalid-legacy-checkpoint");
 return {schema_version:1,status:"migration-plan-held",migration_applied:false,
  checkpoint:{revision,sha256,semantic_fingerprint:ledgerFingerprint(legacy)},
  required_gates:["exact-corpus-approval","observer-mapping","entry-and-source-mapping","independent-checkpoint","contextual-review","representative-human-reading"],
  entries:legacy.entries.map(e=>({id:e.id,legacy_fingerprint:ledgerFingerprint(e),observed_on:e.observed_on??null,
   learned_on:null,learning_time_reason:"Not recorded separately in the legacy ledger; observation is not learning.",
   mapping_status:"held",entity_refs:structuredClone(e.entities??[]),source_refs:(e.evidence??[]).map(c=>c.source_id)})),
  sources:legacy.sources.map(s=>({id:s.id,legacy_fingerprint:ledgerFingerprint(s),mapping_status:"held"})),...flags};
}
