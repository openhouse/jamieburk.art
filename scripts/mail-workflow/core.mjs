import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";

export const sha256 = text => createHash("sha256").update(text).digest("hex");
const recipe = sha256(readFileSync(fileURLToPath(import.meta.url)));
const facets = new Set(["voice","need","strength","aptitude","affordance","kindness","expressed-interest","practice","process","progress","relationship"]);
const ownEvidence = new Set(["voice","need","strength","aptitude","affordance","kindness","expressed-interest"]);
const textRequired = (x, reason) => {if(typeof x!=="string"||!x.trim()) throw new Error(reason);};
function unique(rows,key,reason){const seen=new Set();for(const row of rows){const id=key(row);if(!id||seen.has(id))throw new Error(reason);seen.add(id);}}
function canonical(x){return Array.isArray(x)?x.map(canonical):x&&typeof x==="object"?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;}
function rejectSecrets(value){
  if(Array.isArray(value)){value.forEach(rejectSecrets);return;}
  if(value&&typeof value==="object")for(const [key,item] of Object.entries(value)){
    if(/^(password|secret|token|cookie|authorization|session_token|private_key)$/i.test(key))throw new Error("credential-or-protected-locator");
    rejectSecrets(item);
  }
  if(typeof value==="string"&&(/https?:\/\/\S+[?&](?:token|s|signature|auth|key)=/i.test(value)||/-----BEGIN .*PRIVATE KEY-----|\bghp_[A-Za-z0-9]{20,}|\bsk-proj-[A-Za-z0-9_-]{12,}/.test(value)))throw new Error("credential-or-protected-locator");
}

export function evaluateMailCorpus(input){
  if(input?.visibility!=="private"||input?.authorized!==true)throw new Error("private-authorized-corpus-required");
  rejectSecrets(input);
  for(const key of ["entities","messages","readings"])if(!Array.isArray(input[key]))throw new Error("corpus-array-required");
  if(!/^\d{4}-\d{2}-\d{2}$/.test(input.reviewed_on??""))throw new Error("review-date-required");
  unique(input.entities,e=>e.id,"duplicate-identity");unique(input.messages,m=>m.id,"duplicate-message");
  unique(input.readings,r=>r.message_id+"\0"+r.entity_id,"duplicate-reading");
  for(const entity of input.entities){
    if(!/^[a-z0-9][a-z0-9-]*$/.test(entity.id)||!["person","team","service"].includes(entity.kind))throw new Error("identity-required");
    textRequired(entity.name,"identity-required");
  }
  const entities = new Map(input.entities.map(e=>[e.id,e]));
  const inventory=input.inventory;
  if(!Array.isArray(inventory?.accounts))throw new Error("mailbox-inventory-required");
  unique(inventory.accounts,a=>a.id,"duplicate-account");
  const holds=[];
  if(inventory.services_verified!==true||inventory.domains_verified!==true||inventory.accounts_verified!==true)holds.push("live-inventory-unverified");
  if(!inventory.accounts.length)holds.push("no-account-inventory");
  for(const account of inventory.accounts){
    if(!["mailbox","forwarder","domain-alias","catch-all"].includes(account.kind))throw new Error("account-kind-required");
    if(account.kind!=="mailbox"){
      if(account.destination_scope==="external")holds.push("external-delivery-history-not-covered");
      else if(account.resolution!=="verified")holds.push("routing-unresolved");
      continue;
    }
    if(account.access_verified!==true||account.folders_verified!==true)holds.push("mailbox-or-folder-inventory-unverified");
    if(!Array.isArray(account.folders)||!account.folders.length){holds.push("folders-uninspected");continue;}
    unique(account.folders,f=>f.id,"duplicate-folder");
    for(const folder of account.folders){
      const count=input.messages.filter(m=>m.account_id===account.id&&m.folder_id===folder.id).length;
      if(folder.loading===true||folder.status!=="complete"||folder.unit!=="messages"||!Number.isSafeInteger(folder.observed_total)||folder.observed_total<0||folder.inspected_count!==folder.observed_total||count!==folder.inspected_count)holds.push("folder-message-coverage-incomplete");
    }
  }
  const entries=[],used=new Set();
  for(const message of input.messages){
    for(const field of ["id","source_id","date","subject","path","sha256","attribution_basis"])textRequired(message[field],"message-metadata-required");
    if(path.isAbsolute(message.path)||message.path.includes(":")||message.path.split(/[\\/]/).some(p=>p===".."||p===".")||message.path.includes("\0"))throw new Error("repository-relative-source-required");
    if(!/^[a-z0-9][a-z0-9-]*$/.test(message.id))throw new Error("safe-message-id-required");
    if(!["message","draft","automated"].includes(message.kind))throw new Error("message-kind-required");
    const account=inventory.accounts.find(a=>a.id===message.account_id);
    if(account?.kind!=="mailbox"||account.access_verified!==true||!account.folders?.some(f=>f.id===message.folder_id))throw new Error("message-mailbox-binding-required");
    if(typeof message.capture_text!=="string"||sha256(message.capture_text)!==message.sha256)throw new Error("source-checksum-mismatch");
    if(!entities.has(message.author_id))throw new Error("unknown-identity");
    const capture=JSON.parse(message.capture_text);
    rejectSecrets(capture);
    if(!Array.isArray(message.recipient_ids)||!Array.isArray(capture.recipient_ids)||capture.author_id!==message.author_id||capture.date!==message.date||capture.subject!==message.subject||JSON.stringify([...capture.recipient_ids].sort())!==JSON.stringify([...message.recipient_ids].sort()))throw new Error("source-header-mismatch");
    if(!Array.isArray(capture.segments)||!capture.segments.length)throw new Error("source-segments-required");
    unique(capture.segments,s=>s.id,"duplicate-source-segment");
    for(const segment of capture.segments)if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(segment.id))throw new Error("safe-segment-id-required");
    for(const segment of capture.segments){textRequired(segment.text,"source-segment-text-required");if(!["authored","quoted","signature","automation"].includes(segment.kind))throw new Error("source-segment-kind-required");if(segment.kind==="authored"&&segment.author_id!==message.author_id)throw new Error("source-author-mismatch");}
    const participants=[...new Set([message.author_id,...(message.recipient_ids??[]),...(message.related_entity_ids??[])])];
    for(const entityId of participants){
      if(!entities.has(entityId))throw new Error("unknown-identity");
      const role=entityId===message.author_id?"author":message.recipient_ids.includes(entityId)?"recipient":"associated-context";
      const index=input.readings.findIndex(r=>r.message_id===message.id&&r.entity_id===entityId);
      const reading=input.readings[index];if(reading)used.add(index);
      const status=!reading?"pending-reading":reading.source_sha256!==message.sha256?"stale-reading":"draft-reading";
      const observations=[];
      if(status==="draft-reading"){
        if(reading.review!=="ai-draft"||reading.scope!=="message-situated")throw new Error("draft-situated-reading-required");
        textRequired(reading.limits,"interpretive-limits-required");
        if(!Array.isArray(reading.observations)||!reading.observations.length)throw new Error("substantive-reading-required");
        for(const observation of reading.observations){
          if(!facets.has(observation.facet))throw new Error("unsupported-facet");
          if(!["attributed-report","documented-interpretation","open-question"].includes(observation.evidence_state))throw new Error("email-evidence-state-required");
          textRequired(observation.interpretation,"interpretation-required");
          if(!Array.isArray(observation.citations)||!observation.citations.length)throw new Error("citation-required");
          const citations=observation.citations.map(c=>{
            const segment=capture.segments.find(s=>s.id===c.segment_id);
            if(!segment||typeof c.quote!=="string"||!c.quote.trim()||!segment.text.includes(c.quote))throw new Error("quotation-mismatch");
            if(ownEvidence.has(observation.facet)&&(role!=="author"||segment.kind!=="authored"||segment.author_id!==entityId||message.kind!=="message"||(entities.get(entityId).kind==="team"&&message.collective_authorship_verified!==true)))throw new Error("own-authored-evidence-required");
            return {segment_id:segment.id,segment_kind:segment.kind,attributed_author_id:segment.author_id??null,quote:c.quote,source_id:message.source_id,source_sha256:message.sha256};
          });
          observations.push({...observation,citations});
        }
      }else holds.push(status);
      entries.push({id:message.id+"--"+entityId,message_id:message.id,entity_id:entityId,entity_name:entities.get(entityId).name,entity_kind:entities.get(entityId).kind,role,message_kind:message.kind,delivery_established:false,date:message.date,subject:message.subject,attribution_basis:message.attribution_basis,status,source:{source_id:message.source_id,path:message.path,sha256:message.sha256},observations,limits:status==="draft-reading"?reading.limits:"No substantive finding is asserted until a contextual cited reading is completed.",review:"ai-draft",scope:"message-situated",speaking_authority:false,publication_authorized:false});
    }
  }
  if(used.size!==input.readings.length)throw new Error("orphan-reading");
  return {schema_version:1,visibility:"private",reviewed_on:input.reviewed_on,recipe_digest:recipe,candidate_fingerprint:sha256(JSON.stringify(canonical({recipe,input}))),complete:holds.length===0,holds:[...new Set(holds)].sort(),entries,tasks:entries.filter(e=>e.status!=="draft-reading").map(e=>({entry_id:e.id,status:e.status,instruction:"Read the source in context; cite exact specimens, distinguish authorship from quotation and receipt, and name limits. Do not invent missing interpretations or infer sensitive traits."})),edges:entries.flatMap(e=>[{from:e.entity_id,to:e.message_id,relation:e.role,entry_id:e.id},{from:e.message_id,to:e.entity_id,relation:"has-situated-reading",entry_id:e.id}]),publication_authorized:false};
}
export function mailSummary(graph){return {entry_count:graph.entries.length,draft_reading_count:graph.entries.filter(e=>e.status==="draft-reading").length,task_count:graph.tasks.length,complete:graph.complete,holds:graph.holds,candidate_fingerprint:graph.candidate_fingerprint,publication_authorized:false};}

function literal(text){return text.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replace(/[\\`*_\[\]]/g,"\\$&");}
function page(graph,destination,file,id,title,body,relations){
  const meta={id,title,kind:"analysis",status:"draft",visibility:"private",sensitivity:"high",date:graph.reviewed_on,authority:"Bounded private correspondence request; AI-assisted analysis only",source_basis:[...new Set(graph.entries.map(e=>e.source.source_id))].join("; "),last_reviewed:graph.reviewed_on,canonical_path:destination+"/"+file,summary:"Cited message-situated interpretations and explicit coverage gaps.",relations};
  return "---\n"+Object.entries(meta).map(([k,v])=>k+": "+JSON.stringify(v)).join("\n")+"\n---\n\n# "+literal(title)+"\n\n<!-- mail-readings:start -->\n\n"+body+"\n\n<!-- mail-readings:end -->\n";
}
function sourceLink(entry,destination,file){return "["+literal(entry.source.source_id)+"]("+encodeURI(path.posix.relative(path.posix.dirname(destination+"/"+file),entry.source.path))+")";}
function renderEntry(entry,destination,file){
  const lines=['<a id="'+entry.id+'"></a>',"","## "+literal(entry.date+" — "+entry.subject),"", "Role: **"+entry.role+"**. Record: "+entry.message_kind+". Status: **"+entry.status+"**.","", "Source: "+sourceLink(entry,destination,file)+". SHA-256: "+entry.source.sha256+".","", "Attribution basis: "+literal(entry.attribution_basis)+".",""];
  for(const observation of entry.observations){
    lines.push("### "+observation.facet+" — "+observation.evidence_state,"",literal(observation.interpretation),"");
    for(const c of observation.citations)lines.push("> "+literal(c.quote).replaceAll("\n","\n> "),"",sourceLink(entry,destination,file)+" · segment `"+c.segment_id+"` · "+c.segment_kind,"");
  }
  lines.push("Limits: "+literal(entry.limits));return lines.join("\n");
}
export function renderMailPages(graph,destination){
  if(typeof destination!=="string"||!destination||path.isAbsolute(destination)||destination.includes(":")||destination.split(/[\\/]/).some(p=>p===".."||p==="."))throw new Error("repository-relative-destination-required");
  const pages={};
  for(const entityId of [...new Set(graph.entries.map(e=>e.entity_id))]){
    const entries=graph.entries.filter(e=>e.entity_id===entityId).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
    const entity=entries[0],voiceFile="voices/"+entityId+".md",personFile="people/"+entityId+".md";
    const boundaries="These are private AI-assisted readings, not the person's or team's authored profile, endorsement, diagnosis, standing commitment, or speaking authority. Recipient and associated-context entries document an encounter with a message; they do not attribute its words to the recipient.";
    pages[voiceFile]=page(graph,destination,voiceFile,"mail-voice-"+entityId,entity.entity_name+" — situated writer’s voice",boundaries+"\n\n[Person or team page](../people/"+entityId+".md) · [Practices and progress](../practices.md)\n\n"+entries.map(e=>renderEntry(e,destination,voiceFile)).join("\n\n"),entries.map(e=>e.message_id));
    pages[personFile]=page(graph,destination,personFile,"mail-entity-"+entityId,entity.entity_name,boundaries+"\n\nKind: "+entity.entity_kind+".\n\n[Situated writer’s voice](../voices/"+entityId+".md) · [Practices and progress](../practices.md)\n\n"+entries.map(e=>"- ["+literal(e.date+" — "+e.subject)+"](../messages/"+e.message_id+".md) · "+e.role+" · [cited reading](../voices/"+entityId+".md#"+e.id+")").join("\n"),entries.map(e=>e.message_id));
  }
  for(const messageId of [...new Set(graph.entries.map(e=>e.message_id))]){
    const entries=graph.entries.filter(e=>e.message_id===messageId),e=entries[0],file="messages/"+messageId+".md";
    pages[file]=page(graph,destination,file,"mail-message-"+messageId,e.subject,"Displayed date: "+literal(e.date)+". Record kind: "+e.message_kind+". A stored message is not proof of delivery, acceptance, or its factual assertions.\n\nSource: "+sourceLink(e,destination,file)+". SHA-256: "+e.source.sha256+". The source artifact states its capture and omission limits.\n\n"+entries.map(x=>"- ["+literal(x.entity_name)+"](../people/"+x.entity_id+".md) · "+x.role+" · [situated reading](../voices/"+x.entity_id+".md#"+x.id+")").join("\n"),entries.map(x=>x.entity_id));
  }
  const observations=graph.entries.flatMap(e=>e.observations.filter(o=>["practice","process","progress","relationship"].includes(o.facet)).map(o=>"- **"+o.facet+"** — "+literal(o.interpretation)+" ["+literal(e.entity_name+" · "+e.date)+"](voices/"+e.entity_id+".md#"+e.id+")"));
  pages["practices.md"]=page(graph,destination,"practices.md","mail-practices","Practices, processes and progress","Only source-bounded interpretations appear here. Proposed, requested, reported, accepted, delivered and verified remain different states. No stable personal trait or relationship score is inferred.\n\nCoverage: "+(graph.complete?"draft readings complete for the declared verified inventory":"incomplete — "+graph.holds.join(", "))+".\n\n"+observations.join("\n"),[...new Set(graph.entries.map(e=>e.entity_id))]);
  return pages;
}
