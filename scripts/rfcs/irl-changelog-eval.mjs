#!/usr/bin/env node
// RFC reference evaluator only: no source access, graph writes, or authority transitions.
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import path from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";
import {isDeepStrictEqual} from "node:util";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const contractPath="rfcs/0016-irl-changelog-and-changes-in-understanding.contract.json";
const suitePath="evals/knowledge-bank/irl-changelog-rfc-evals.json";
const policy=JSON.parse(readFileSync(path.join(root,contractPath),"utf8"));
const text=v=>typeof v==="string" && v.trim().length>0;
const object=v=>v!==null && typeof v==="object" && !Array.isArray(v);
const prefix=(a,b)=>a.length>=b.length && b.every((v,i)=>isDeepStrictEqual(v,a[i]));
const date=v=>typeof v==="string" && /^\d{4}-\d{2}-\d{2}$/.test(v)
  && Number.isFinite(Date.parse(v)) && new Date(v).toISOString().slice(0,10)===v;
const canonical=v=>Array.isArray(v)?v.map(canonical):object(v)?
  Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;
export const ledgerFingerprint=record=>createHash("sha256").update(JSON.stringify(canonical(record))).digest("hex");
const result=(decision,reasons)=>({decision,reasons:[...new Set(reasons)],publication_authorized:false,action_authorized:false});

export function evaluateIRLRecord(record,{previous}={}) {
  const deny=[],hold=[];
  if (!object(record) || !["entries","sources","entities"].every(k=>Array.isArray(record[k]) && record[k].every(object))) {
    return result("deny",["invalid-shape"]);
  }
  if(record.schema_version!==policy.record_schema_version || !text(record.scope)) deny.push("invalid-shape");
  if(!text(record.observer_id)) hold.push("observer-required");
  if(record.visibility!=="private") deny.push("private-ledger-required");
  if(record.automatic_collection!==false || !object(record.authority) ||
    policy.authority_fields.some(k=>record.authority[k]!==false) ||
    Object.values(record.authority??{}).some(v=>v!==false)) deny.push("authority-expansion");
  let formatter;
  try { formatter=new Intl.DateTimeFormat("en-CA",{timeZone:record.timezone,year:"numeric",month:"2-digit",day:"2-digit"}); }
  catch { deny.push("invalid-time"); }
  if(!text(record.timezone)) deny.push("invalid-time");
  if(previous) {
    // Current custody eligibility is not immutable historical permission.
    const pins=sources=>sources.map(({eligibility,...pin})=>pin);
    if(!prefix(record.entries,previous.entries) || !prefix(pins(record.sources),pins(previous.sources)) ||
      record.schema_version!==previous.schema_version || record.observer_id!==previous.observer_id ||
      record.scope!==previous.scope || record.timezone!==previous.timezone) deny.push("history-rewritten");
  }
  const sourceMap=new Map(), entityMap=new Map(), ids=new Set();
  for(const source of record.sources) {
    if(sourceMap.has(source.id)) deny.push("duplicate-id");
    sourceMap.set(source.id,source);
    if(!text(source.id)||!text(source.custody_ref)||!policy.source_kinds.includes(source.kind) ||
       !/^[a-f0-9]{40}$/.test(source.revision)||!/^[a-f0-9]{64}$/.test(source.sha256)) deny.push("invalid-source");
  }
  for(const entity of record.entities) {
    if(!text(entity.id) || !policy.entity_types.includes(entity.type) ||
      !["resolved","unresolved"].includes(entity.resolution)) deny.push("invalid-entity");
    if(entityMap.has(entity.id)) deny.push("duplicate-id");
    entityMap.set(entity.id,entity);
  }
  let priorRecorded="";
  for(const entry of record.entries) {
    if(!["about","evidence","corrections"].every(k=>Array.isArray(entry[k]) && entry[k].every(object))) {
      deny.push("invalid-shape");
      continue;
    }
    if(!text(entry.id)||!policy.entry_kinds.includes(entry.kind)) deny.push("invalid-shape");
    if(ids.has(entry.id)) deny.push("duplicate-id");
    const event=entry.event_time;
    const recorded=entry.recorded_at;
    const unknownEvent=event?.start===null && event?.end===null && text(event?.reason);
    if(unknownEvent) hold.push("event-time-unknown");
    const unknownLearning=entry.learned_on===null && text(entry.learning_time_reason);
    if(unknownLearning) hold.push("learning-time-unknown");
    if((!unknownEvent && (!date(event?.start)||!date(event?.end)||event.start>event.end))||(!unknownLearning && !date(entry.learned_on)) ||
      typeof recorded!=="string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(recorded) ||
      !Number.isFinite(Date.parse(recorded)) || new Date(recorded).toISOString().replace(".000Z","Z")!==recorded) {
      deny.push("invalid-time");
    } else {
      if(!unknownEvent && !unknownLearning && event.end>entry.learned_on) deny.push("event-after-learning");
      if(!unknownLearning && formatter && formatter.format(new Date(recorded))<entry.learned_on) deny.push("recording-before-learning");
      if(recorded<priorRecorded) deny.push("recording-order-invalid");
      priorRecorded=recorded;
    }
    if(!text(entry.before?.text)||!policy.before_bases.includes(entry.before?.basis) ||
      ["now","consequence","limitation","next_evidence"].some(k=>!text(entry[k]))) hold.push("interpretation-incomplete");
    if(!Array.isArray(entry.about)||!entry.about.length || entry.about.some(edge=>
      !object(edge)||!entityMap.has(edge.id)||entityMap.get(edge.id).resolution!=="resolved"||
      entityMap.get(edge.id).type!==edge.type)) hold.push("entity-unresolved");
    const evidence=Array.isArray(entry.evidence)?entry.evidence:[];
    if(!evidence.length || evidence.some(c=>!object(c)||!sourceMap.has(c.source_id)||
      !text(c.locator)||!text(c.limitation)||!policy.evidence_relations.includes(c.relation)||
      !policy.support_types.includes(c.supports))) hold.push("evidence-incomplete");
    for(const citation of evidence) {
      const source=sourceMap.get(citation?.source_id);
      if(source && source.eligibility!=="permitted") hold.push("source-not-eligible");
    }
    if(entry.kind==="event" && !evidence.some(c=>c?.relation==="supports" && c.supports==="occurrence" &&
      sourceMap.has(c.source_id) && !["operating-artifact","attributed-report"].includes(sourceMap.get(c.source_id).kind))) deny.push("occurrence-evidence-required");
    if(entry.kind==="attributed-report" && (!text(entry.attribution?.entity_id) ||
      entityMap.get(entry.attribution.entity_id)?.type!=="person" ||
      !evidence.some(c=>c.source_id===entry.attribution?.source_id && c.locator===entry.attribution?.locator))) hold.push("attribution-required");
    if(!Array.isArray(entry.corrections) || (entry.kind==="correction" && !entry.corrections.length) ||
      (entry.kind!=="correction" && entry.corrections?.length) ||
      (entry.corrections??[]).some(c=>!object(c)||!ids.has(c.entry_id)||c.entry_id===entry.id||
        !policy.correction_fields.includes(c.field)||!text(c.reason))) deny.push("invalid-correction");
    ids.add(entry.id);
  }
  return deny.length?result("deny",deny):hold.length?result("hold",hold):result("eligible-for-human-review",[]);
}

function contextualUseMatches(source,use,review) {
  const flow=source.flow;
  return object(flow) && ["context","sender","information_type","transmission_principle"].every(k=>text(flow[k])) &&
    Array.isArray(flow.subjects) && flow.subjects.length>0 && flow.subjects.every(text) &&
    object(review) && text(review.receipt_id) && text(review.reviewed_by) && review.decision==="permitted" &&
    review.source_revision===source.revision && review.source_sha256===source.sha256 &&
    isDeepStrictEqual(review.source_flow,flow) && isDeepStrictEqual(review.use,use);
}

export function evaluateIRLProjection(record,projection,{contextReviews={}}={}) {
  const output=status=>({status,publication_authorized:false,action_authorized:false});
  if(evaluateIRLRecord(record).decision==="deny" ||
    !Array.isArray(projection?.entity_ids)||!projection.entity_ids.length||
    projection.entity_ids.some(id=>!record.entities.some(e=>e.id===id && e.resolution==="resolved"))) return output("hold");
  const relevantSet=new Set(record.entries
    .filter(e=>e.about.some(edge=>projection.entity_ids.includes(edge.id))).map(e=>e.id));
  // Preserve both historical targets and later corrections, regardless of subject.
  let changed=true;
  while(changed) {
    const beforeSize=relevantSet.size;
    for(const entry of record.entries) {
      if(entry.corrections.some(c=>relevantSet.has(c.entry_id))) relevantSet.add(entry.id);
      if(relevantSet.has(entry.id)) for(const c of entry.corrections) relevantSet.add(c.entry_id);
    }
    changed=relevantSet.size!==beforeSize;
  }
  const selected=record.entries.filter(e=>relevantSet.has(e.id));
  const sourceIds=new Set(selected.flatMap(e=>e.evidence.map(c=>c.source_id)));
  const scoped={...record,entries:selected,sources:record.sources.filter(s=>sourceIds.has(s.id))};
  if(!selected.length || evaluateIRLRecord(scoped).decision!=="eligible-for-human-review") return output("hold");
  const relevant=selected.map(e=>e.id);
  if(!object(contextReviews) || policy.use_fields.some(k=>!text(projection.use?.[k]))) return output("hold");
  const usedSourceIds=new Set(record.entries.filter(e=>relevantSet.has(e.id)).flatMap(e=>e.evidence.map(c=>c.source_id)));
  for(const id of usedSourceIds) {
    const source=record.sources.find(s=>s.id===id);
    if(!source || !Object.hasOwn(contextReviews,id) ||
      !contextualUseMatches(source,projection.use,contextReviews[id])) return output("hold");
  }
  if(projection.ledger_fingerprint!==ledgerFingerprint(record) ||
    !isDeepStrictEqual(projection.basis_entry_ids,relevant)) return output("stale");
  return output("current-candidate");
}

export const candidatePaths=[
  "rfcs/0016-irl-changelog-and-changes-in-understanding.md",contractPath,suitePath,
  "scripts/rfcs/irl-changelog-eval.mjs","scripts/rfcs/irl-changelog-eval.test.mjs",
  "scripts/check-rfcs.mjs","rfcs/README.md","package.json",".github/workflows/portfolio-readiness.yml",
  "scripts/irl-changelog/runtime.mjs","scripts/irl-changelog/runtime.test.mjs",
  "scripts/irl-changelog/cli.mjs","scripts/irl-changelog/README.md"
];
export function evaluateIRLChangelogRFC({repoRoot=root}={}) {
  const suite=JSON.parse(readFileSync(path.join(repoRoot,suitePath),"utf8"));
  const scenarios=suite.cases.map(c=>{
    const record=structuredClone(suite.baseline);
    for(const [keys,value] of c.changes) {
      let target=record;
      for(const key of keys.slice(0,-1)) target=target[key];
      target[keys.at(-1)]=value;
    }
    const actual=evaluateIRLRecord(record);
    return {id:c.id,passed:isDeepStrictEqual(actual,c.expected),actual,expected:c.expected};
  });
  const hash=createHash("sha256");
  for(const p of [...candidatePaths].sort()) hash.update(p).update("\0").update(readFileSync(path.join(repoRoot,p))).update("\0");
  return {candidate:{fingerprint:hash.digest("hex"),paths:candidatePaths},hard_failures:[],
    scenarios:{total:scenarios.length,passed:scenarios.filter(c=>c.passed).length,results:scenarios},
    human_review_complete:false,implementation_authorized:false};
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  const evaluated=evaluateIRLChangelogRFC();
  console.log(JSON.stringify(evaluated,null,2));
  if(evaluated.hard_failures.length || evaluated.scenarios.passed!==evaluated.scenarios.total) process.exitCode=1;
}
