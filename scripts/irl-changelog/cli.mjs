#!/usr/bin/env node
import {readFileSync,realpathSync} from "node:fs";
import path from "node:path";
import {pathToFileURL} from "node:url";
import {createHash} from "node:crypto";
import {ledgerFingerprint} from "../rfcs/irl-changelog-eval.mjs";
import {createAdapter,openStore,inspectStore,planAppend,commitPlan,rollbackStore,planLegacy} from "./runtime.mjs";
const read=p=>JSON.parse(readFileSync(p,"utf8"));
const usage={usage:"irl <init|inspect|plan|append|rollback|legacy-plan> [options]",default_writes:false,
 help:"See scripts/irl-changelog/README.md. Policy and its independently approved digest are required; outputs are private."};
export function runCLI(argv) {
 const [command,...rest]=argv;
 if(!command||command==="--help")return usage;
 const accepted={
  init:["policy","policy-digest"],inspect:["policy","policy-digest"],
  plan:["policy","policy-digest","intake","expected-prior","idempotency-key"],
  append:["policy","policy-digest","intake","expected-prior","idempotency-key"],
  rollback:["policy","policy-digest","expected-generation","target-generation","reason"],
  "legacy-plan":["legacy","revision","sha256"]
 };
 if(!accepted[command])throw Error("unknown-command");
 const args={};
 for(let i=0;i<rest.length;i+=2) {
  const key=rest[i]?.replace(/^--/,"");
  if(!rest[i]?.startsWith("--")||!accepted[command].includes(key)||Object.hasOwn(args,key))throw Error("unknown-option");
  if(!rest[i+1]||rest[i+1].startsWith("--"))throw Error("option-value-required");
  args[key]=rest[i+1];
 }
 const requireKeys=keys=>{for(const key of keys)if(!args[key])throw Error(key+"-required");};
 if(command==="legacy-plan") {
  requireKeys(accepted[command]);
  const bytes=readFileSync(args.legacy);
  if(createHash("sha256").update(bytes).digest("hex")!==args.sha256)throw Error("legacy-bytes-mismatch");
  return planLegacy(JSON.parse(bytes),{revision:args.revision,sha256:args.sha256});
 }
 requireKeys(["policy-digest","policy"]);
 const policy=read(args.policy),policyPath=realpathSync(args.policy);
 // An independently managed trust record cannot be part of the mutable generated store.
 const candidate=path.resolve(policy.store_root??".");
 let root=candidate;
 try{root=realpathSync(candidate);}catch{}
 if(policyPath===root||policyPath.startsWith(root+path.sep))throw Error("policy-outside-store-required");
 const adapter=createAdapter(policy,{expectedDigest:args["policy-digest"]});
 if(command==="init")return openStore({root:candidate,adapter});
 if(command==="inspect")return inspectStore({root:candidate,adapter});
 if(command==="rollback"){
  requireKeys(["expected-generation","target-generation","reason"]);
  return rollbackStore({root:candidate,adapter,expectedGeneration:args["expected-generation"],targetGeneration:args["target-generation"],reason:args.reason});
 }
 requireKeys(["intake","expected-prior","idempotency-key"]);
 const previous=inspectStore({root:candidate,adapter}).record;
 // A retry can use its original saved plan via the runtime API; CLI plans are always CAS-bound to current history.
 if(args["expected-prior"]!==ledgerFingerprint(previous))throw Error("stale-expected-prior");
 const plan=planAppend(previous,read(args.intake),{expectedPrior:args["expected-prior"],idempotencyKey:args["idempotency-key"]});
 return command==="plan"?plan:commitPlan({root:candidate,plan,adapter});
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
 try{console.log(JSON.stringify(runCLI(process.argv.slice(2)),null,2));}
 catch(error){console.error(error.message);process.exitCode=1;}
}
