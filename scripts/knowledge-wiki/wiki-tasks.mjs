#!/usr/bin/env node

import { compileKnowledgeWiki } from "./lib.mjs";

const compiled = compileKnowledgeWiki();
const protocols = [
  { id: "TASK-WIKI-SOURCE-ACCESS", owner: "Jamie as personal librarian or a delegated archive custodian", purpose: "Resolve an original source that is not materialized, not recovered, ambiguously identified, or inaccessible through the documented class without exposing its private locator.", artifact: "Bounded request naming the page, present question, public-safe source ID or description, attempted access class, smallest unblocker, privacy and retention plan, and what access cannot establish.", status: "available-when-needed" },
  { id: "TASK-WIKI-READER-STUDY", owner: "Jamie or delegated human researcher", purpose: "Observe whether a cold reader can locate a project, its strongest bounded claim, supporting source, correction, and boundary.", artifact: "Dated participant protocol, consent posture, task notes, completion evidence, and findings.", status: "not-run" },
  { id: "TASK-WIKI-COLLABORATOR-CREDIT", owner: "Jamie and relevant collaborators", purpose: "Review role language and collective credit before stronger public projection.", artifact: "Attributable approval, correction, or hold decision tied to exact wording.", status: "not-run" },
  { id: "TASK-WIKI-MEDIA-RIGHTS", owner: "Jamie or rights decision-maker", purpose: "Resolve rights, consent, and display posture for protected media.", artifact: "Dated rights and consent decision in the canonical source record.", status: "not-run" },
  { id: "TASK-WIKI-RELEASE-APPROVAL", owner: "Jamie", purpose: "Decide whether an exact candidate serves the current audience and may be released.", artifact: "Exact-candidate approval or hold decision; automated checks are supporting evidence only.", status: "not-run" },
];
console.log(JSON.stringify({ generated: true, result_claims: false, protocols, wanted_pages: compiled.health.wanted_pages }, null, 2));
