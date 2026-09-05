import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const sha256 = value => createHash("sha256").update(value).digest("hex");
const recipeDigest = sha256(readFileSync(fileURLToPath(import.meta.url)));
const START = "<!-- situated-voices:start -->";
const END = "<!-- situated-voices:end -->";
const slug = /^[a-z0-9][a-z0-9-]*$/;
const requireText = (value, reason) => {
  if (typeof value !== "string" || !value.trim() || value.includes("<!-- situated-voices:")) throw new Error(reason);
};
function unique(rows, key, reason) {
  const seen = new Set();
  for (const row of rows) {
    const value = key(row);
    if (!value || seen.has(value)) throw new Error(reason);
    seen.add(value);
  }
}
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])]));
  return value;
}

// Recognize explicit timestamped turns, never names mentioned in prose.
export function parseTranscript(text) {
  const lines = text.split(/\r?\n/);
  const turns = [];
  let fragment = "Transcript";
  let current;
  for (let i = 0; i < lines.length; i++) {
    const heading = lines[i].match(/^## (Fragment \d+)\b/);
    if (lines[i].startsWith("## ")) current = undefined;
    if (heading) fragment = heading[1];
    const match = lines[i].match(/^(?:\*\*)?(.+?)(?:\*\*)?\s{2,}(\d{1,2}:\d{2}(?::\d{2})?)\s*$/);
    if (match) {
      current = {
        id: "turn-" + String(turns.length + 1).padStart(4, "0"),
        speaker: match[1].replaceAll("**", ""), timestamp: match[2],
        fragment, line: i + 1, end_line: i + 1, text: ""
      };
      turns.push(current);
    } else if (current) {
      current.text += lines[i] + "\n";
      if (lines[i].trim()) current.end_line = i + 1;
    }
  }
  return turns.map(t=>({...t,text:t.text.trim()}));
}
export function buildVoiceGraph(input) {
  if (input?.visibility !== "private" || input?.authorized !== true) throw new Error("private-authorized-corpus-required");
  if (!Array.isArray(input.transcripts) || !input.transcripts.length) throw new Error("nonempty-transcript-corpus-required");
  if (!Array.isArray(input.people) || !Array.isArray(input.readings)) throw new Error("people-and-readings-required");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.reviewed_on ?? "")) throw new Error("review-date-required");
  unique(input.people, p=>p.id, "duplicate-person");
  unique(input.transcripts, t=>t.id, "duplicate-transcript");
  unique(input.readings, r=>r.transcript_id+"\0"+r.person_id, "duplicate-reading");
  for(const person of input.people) {
    if(!slug.test(person.id)) throw new Error("safe-person-id-required");
    requireText(person.name,"person-name-required");
  }
  const people = new Map(input.people.map(p=>[p.id,p]));
  const entries = [];
  const usedReadings = new Set();
  for (const transcript of input.transcripts) {
    if (!slug.test(transcript.id)) throw new Error("safe-transcript-id-required");
    for (const field of ["source_id","title","date","path","sha256"]) requireText(transcript[field],"transcript-metadata-required");
    if (!["authorized","held","unavailable"].includes(transcript.access)) throw new Error("source-access-state-required");
    if (!Array.isArray(transcript.speakers)) throw new Error("speaker-roster-required");
    unique(transcript.speakers,s=>s.label,"duplicate-speaker-mapping");
    for(const s of transcript.speakers) {
      if(!["context-supported","confirmed","unresolved"].includes(s.status)) throw new Error("speaker-status-required");
      requireText(s.basis,"speaker-basis-required");
      if(s.person_id && (!people.has(s.person_id)||s.status==="unresolved")) throw new Error("speaker-identity-not-supported");
    }
    const available = transcript.access === "authorized";
    if (available && sha256(transcript.text ?? "") !== transcript.sha256) throw new Error("source-checksum-mismatch");
    const turns = available ? parseTranscript(transcript.text) : [];
    if(available && !turns.length) throw new Error("timestamped-speaker-turns-required");
    const labels = [...new Set([...turns.map(t=>t.speaker), ...transcript.speakers.map(s=>s.label)])];
    const byPerson = new Map();
    for (const label of labels) {
      const mapping = transcript.speakers.find(s=>s.label===label);
      const personId = mapping?.person_id ?? "unresolved-"+sha256(transcript.id+"\0"+label).slice(0,16);
      if(!byPerson.has(personId)) byPerson.set(personId,{labels:[],mappings:[]});
      byPerson.get(personId).labels.push(label);
      if(mapping) byPerson.get(personId).mappings.push(mapping);
    }
    for(const [personId,participant] of byPerson) {
      const ownTurns = turns.filter(t=>participant.labels.includes(t.speaker));
      const readingIndex = input.readings.findIndex(r=>r.transcript_id===transcript.id && r.person_id===personId);
      const reading = input.readings[readingIndex];
      if(reading) usedReadings.add(readingIndex);
      const status = !available ? "held-source"
        : !people.has(personId) ? "unresolved-speaker"
        : !ownTurns.length ? "no-attributed-speech"
        : !reading ? "pending-reading"
        : reading.source_sha256 !== transcript.sha256 ? "stale-reading"
        : "draft-close-reading";
      const observations = [];
      if(status==="draft-close-reading") {
        requireText(reading.limits,"reading-limits-required");
        if(reading.review!=="ai-draft") throw new Error("explicit-draft-review-required");
        if(!Array.isArray(reading.observations)||!reading.observations.length) throw new Error("substantive-reading-required");
        for(const observation of reading.observations) {
          requireText(observation.interpretation,"interpretation-required");
          if(!Array.isArray(observation.citations)||!observation.citations.length) throw new Error("cited-interpretation-required");
          const citations=observation.citations.map(citation=>{
            const turn=turns.find(t=>t.id===citation.turn_id);
            if(!turn) throw new Error("citation-turn-mismatch");
            if(!ownTurns.includes(turn)) throw new Error("citation-speaker-mismatch");
            requireText(citation.quote,"citation-quote-mismatch");
            if(!turn.text.includes(citation.quote)) throw new Error("citation-quote-mismatch");
            if((transcript.restricted_turn_ids??[]).includes(turn.id)) throw new Error("restricted-turn-not-projectable");
            return {turn_id:turn.id,quote:citation.quote,fragment:turn.fragment,timestamp:turn.timestamp,line:turn.line,end_line:turn.end_line,speaker:turn.speaker};
          });
          observations.push({interpretation:observation.interpretation,citations});
        }
      }
      const entryId = transcript.id+"--"+personId;
      entries.push({
        id:entryId,transcript_id:transcript.id,person_id:personId,
        person_name:people.get(personId)?.name ?? "Unresolved speaker — "+participant.labels.join(" / "),
        status,date:transcript.date,title:transcript.title,
        identity:participant.mappings.map(m=>({label:m.label,status:m.status,basis:m.basis})),
        source:{source_id:transcript.source_id,path:transcript.path,sha256:transcript.sha256},
        turn_count:ownTurns.length,
        turn_references:ownTurns.map(t=>({id:t.id,fragment:t.fragment,timestamp:t.timestamp,line:t.line,end_line:t.end_line})),
        observations,limits:status==="draft-close-reading"?reading.limits:
          "No substantive voice finding is asserted. Resolve source, attribution, or reading coverage without guessing.",
        review:"ai-draft",audio_certified:false,publication_authorized:false
      });
    }
  }
  if(usedReadings.size!==input.readings.length) throw new Error("orphan-reading");
  const tasks=entries.filter(e=>e.status!=="draft-close-reading").map(e=>({
    entry_id:e.id,transcript_id:e.transcript_id,person_id:e.person_id,status:e.status,
    instruction:"Read the permitted source in context. Cite the speaker's own exact turns, distinguish interpretation from quotation, name uncertainty and counterevidence, and provide limits. Do not invent speech, infer private traits, or impersonate the person."
  }));
  return {
    schema_version:1,recipe_digest:recipeDigest,
    candidate_fingerprint:sha256(JSON.stringify(canonical({recipeDigest,...input}))),
    destination:input.destination,reviewed_on:input.reviewed_on,
    visibility:"private",publication_authorized:false,complete:entries.length>0&&tasks.length===0,
    entries,tasks,
    edges:entries.flatMap(e=>[
      {from:e.person_id,to:e.transcript_id,relation:"situated-in",entry_id:e.id},
      {from:e.transcript_id,to:e.person_id,relation:"has-speaker-reading",entry_id:e.id}
    ])
  };
}
function literalMarkdown(value) {
  let text = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  for (const character of ["\\", "[", "]", "*", "_", String.fromCharCode(96)]) {
    text = text.replaceAll(character, "\\" + character);
  }
  return text;
}
function citationLink(entry, citation, destination) {
  const target=path.posix.relative(destination,entry.source.path);
  return "["+entry.source.source_id+" · "+citation.fragment+" · "+citation.timestamp+" · L"+citation.line+"–"+citation.end_line+"]("+encodeURI(target)+"#L"+citation.line+")";
}
export function renderVoicePages(graph) {
  const pages={};
  for(const personId of [...new Set(graph.entries.map(e=>e.person_id))]) {
    const entries=graph.entries.filter(e=>e.person_id===personId).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
    const name=entries[0].person_name;
    const file=personId+".md";
    const lines=[
      "---","id: "+JSON.stringify("situated-voice-"+personId),
      "title: "+JSON.stringify(name+" — situated writer’s voice"),
      'kind: "analysis"','status: "draft"','visibility: "private"','sensitivity: "high"',
      "date: "+JSON.stringify(graph.reviewed_on),
      'authority: "Explicit bounded private corpus authorization; AI-assisted analysis only"',
      "source_basis: "+JSON.stringify([...new Set(entries.map(e=>e.source.source_id))].join("; ")),
      "last_reviewed: "+JSON.stringify(graph.reviewed_on),
      "canonical_path: "+JSON.stringify(graph.destination+"/"+file),
      'summary: "Source-bounded transcript readings; not a stable personality model or permission to speak."',
      "relations: "+JSON.stringify(entries.map(e=>e.transcript_id)),"---","",
      "# "+name+" — situated writer’s voice","",START,"",
      "These are AI-assisted documented interpretations, not the person's authored voice, endorsement, consent, diagnosis, or speaking authority. Transcript repairs and speaker mappings remain subject to review; no audio certification is claimed.",""
    ];
    for(const entry of entries) {
      lines.push('<a id="'+entry.id+'"></a>',"","## "+entry.date+" — "+entry.title,"",
        "Status: **"+entry.status+"** · Source revision: "+entry.source.sha256,"",
        "Source: ["+entry.source.source_id+"]("+encodeURI(path.posix.relative(graph.destination,entry.source.path))+").",
        "Attribution: "+(entry.identity.map(i=>i.label+" — "+i.status+" ("+i.basis+")").join("; ")||"Unresolved; no named identity inferred.")+".","");
      if(entry.observations.length) {
        for(const observation of entry.observations) {
          lines.push("### Documented interpretation","",observation.interpretation,"");
          for(const citation of observation.citations) lines.push("> "+literalMarkdown(citation.quote).replaceAll("\n","\n> "),"",citationLink(entry,citation,graph.destination),"");
        }
      } else {
        lines.push("### Coverage hold","",entry.limits,"");
        if(entry.status!=="held-source") for(const t of entry.turn_references.slice(0,3)) lines.push("- "+citationLink(entry,t,graph.destination));
        lines.push("");
      }
      lines.push("Limits: "+entry.limits,"","Observed attributed turns: "+entry.turn_count+". Full source and contradictory turns remain available through the source link; selected quotations do not replace the transcript.","");
    }
    lines.push(END,"");pages[file]=lines.join("\n");
  }
  return pages;
}
export function safePath(root,relative,reason="unsafe-output-path") {
  if(typeof relative!=="string"||!relative||path.isAbsolute(relative)||relative.split(/[\\/]/).some(p=>p===".."||p===".")||relative.includes("\0"))throw new Error(reason);
  const base=realpathSync(root);
  const target=path.resolve(base,relative);
  if(!target.startsWith(base+path.sep))throw new Error(reason);
  let current=base;
  for(const part of path.relative(base,target).split(path.sep)){
    current=path.join(current,part);
    try {
      if(lstatSync(current).isSymbolicLink())throw new Error(reason);
    } catch(error) {
      if(error.code!=="ENOENT")throw error;
    }
  }
  return target;
}
export function loadVoiceCorpus(root,manifestRelative) {
  const manifest=JSON.parse(readFileSync(safePath(root,manifestRelative,"unsafe-source-path"),"utf8"));
  if(manifest.visibility!=="private"||manifest.authorized!==true)throw new Error("private-authorized-corpus-required");
  return {...manifest,transcripts:manifest.transcripts.map(t=>({
    ...t,text:t.access==="authorized"?readFileSync(safePath(root,t.path,"unsafe-source-path"),"utf8"):undefined
  }))};
}
function managedBody(value) {
  const start=value.indexOf(START),end=value.indexOf(END);
  if(start<0||end<start||value.indexOf(START,start+START.length)>=0||value.indexOf(END,end+END.length)>=0)throw new Error("unmanaged-page-conflict");
  return {start,end:end+END.length};
}
function refreshFrontmatter(existing, generated) {
  const pattern = /^---\n([\s\S]*?)\n---\n/;
  const old = existing.match(pattern), fresh = generated.match(pattern);
  if (!old || !fresh) throw new Error("unmanaged-page-conflict");
  const keys = new Set(fresh[1].split("\n").map(line => line.split(":")[0]));
  const preserved = old[1].split("\n").filter(line => !keys.has(line.split(":")[0]));
  return "---\n" + fresh[1] + (preserved.length ? "\n" + preserved.join("\n") : "") +
    "\n---\n" + existing.slice(old[0].length);
}
export function syncVoicePages(input,root,{write=false}={}) {
  const graph=buildVoiceGraph(input);
  const desired=renderVoicePages(graph);
  const directory=safePath(root,graph.destination);
  // Retire only our managed sections. Never delete old pages or authored prose.
  if(existsSync(directory)) for(const name of readdirSync(directory)){
    if(!name.endsWith(".md")||Object.hasOwn(desired,name))continue;
    const existing=readFileSync(safePath(root,graph.destination+"/"+name),"utf8");
    if(existing.includes(START)){
      const block=managedBody(existing);
      desired[name]=existing.slice(0,block.start)+START+"\n\nNo current transcript entries. Prior generated readings are superseded; consult Git history. No present voice finding is asserted.\n\n"+END+existing.slice(block.end);
    }
  }
  const outputs=[];
  for(const [name,generated] of Object.entries(desired)){
    const target=safePath(root,graph.destination+"/"+name);
    const existing=existsSync(target)?readFileSync(target,"utf8"):null;
    let next=generated;
    if(existing!==null){
      const old=managedBody(existing),fresh=managedBody(generated);
      next=existing.slice(0,old.start)+generated.slice(fresh.start,fresh.end)+existing.slice(old.end);
      next=refreshFrontmatter(next,generated);
    }
    if(next!==existing)outputs.push({target,content:next,relative:graph.destination+"/"+name});
  }
  const graphRelative=graph.destination+"/graph.json";
  const graphTarget=safePath(root,graphRelative);
  const graphText=JSON.stringify(graph,null,2)+"\n";
  if(!existsSync(graphTarget)||readFileSync(graphTarget,"utf8")!==graphText)outputs.push({target:graphTarget,content:graphText,relative:graphRelative});
  // Validate every target and collision before the first write.
  if(write)for(const output of outputs){mkdirSync(path.dirname(output.target),{recursive:true});writeFileSync(output.target,output.content);}
  return {graph,changed_files:outputs.map(o=>o.relative),complete:graph.complete};
}
export function voiceSummary(graph) {
  return {
    pair_count:graph.entries.length,draft_reading_count:graph.entries.filter(e=>e.status==="draft-close-reading").length,
    unresolved_count:graph.tasks.length,complete:graph.complete,
    candidate_fingerprint:graph.candidate_fingerprint,publication_authorized:false
  };
}
