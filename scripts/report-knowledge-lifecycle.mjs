#!/usr/bin/env node

import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { knowledgeLifecycleReport } from "./lib/knowledge-lifecycle-validation.mjs";

console.log(JSON.stringify({
  summary: knowledgeLifecycleReport(),
  promoted: knowledgeLifecycle.candidateClaims.filter(({ maturity }) => maturity === "promoted").map(({ id, proposition, targetCanonicalClaimId }) => ({ id, proposition, targetCanonicalClaimId })),
  researchQueue: knowledgeLifecycle.researchTasks.filter(({ status }) => status !== "completed").map(({ id, priority, question, nextActions }) => ({ id, priority, question, nextActions })),
  briefs: knowledgeLifecycle.editorialBriefs.map(({ id, title, publicationIntent, projectIds }) => ({ id, title, publicationIntent, projectIds }))
}, null, 2));
