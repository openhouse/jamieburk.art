#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { nycacGovernmentValueBatch20260715 as batch } from
  "../apps/www/src/data/knowledge-bank/batches/nycac-government-value-2026-07-15.ts";
import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

const runNote = read(
  "docs/knowledge-bank/runs/2026-07-15-nycac-government-value.md"
);
const projectNote = read(
  "docs/knowledge-bank/projects/nyc-artist-coalition-government-value.md"
);
const corpus = JSON.parse(
  read("docs/knowledge-bank/corpora/nycac-government-value-2026-07-15.json")
);
const publicRecord = `${JSON.stringify(batch)}\n${JSON.stringify(corpus)}\n${runNote}\n${projectNote}`
  .replace(/\s+/g, " ");

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const assertionById = new Map(
  knowledgeBank.sourceAssertions.map((assertion) => [assertion.id, assertion])
);
const taskById = new Map(
  knowledgeBank.researchTasks.map((task) => [task.id, task])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);

function evaluatePublicRecord(candidate) {
  const errors = [];
  const normalized = candidate.replace(/\s+/g, " ");

  if (!normalized.includes("one-explicit-instance-recovered")) {
    errors.push("the bounded transcript-search result disappeared");
  }
  if (!normalized.includes("One recovered instance is not proof that no other mention exists")) {
    errors.push("the incomplete-census boundary disappeared");
  }
  if (!normalized.includes("Source-backed analysis")) {
    errors.push("institutional interpretation is no longer labeled as analysis");
  }
  if (/DCLA (?:created|founded|owned|owns) NYC Artist Coalition/i.test(normalized)) {
    errors.push("DCLA conditions were converted into ownership or sole creation");
  }
  if (/Jamie (?:alone |solely )?(?:founded|created|led) NYC Artist Coalition/i.test(normalized)) {
    errors.push("collective coalition work was converted into sole Jamie credit");
  }
  if (/(?:^|[.!?]\s+)(?:DCLA|Council|Espinal) (?:literally )?(?:needed|depended on) (?:Jamie|NYC Artist Coalition)/i.test(normalized)) {
    errors.push("institutional benefit was converted into literal dependency");
  }
  if (/(?:^|[.!?]\s+)(?:DCLA|Council|Espinal) could not (?:act|function|succeed) without (?:Jamie|NYC Artist Coalition)/i.test(normalized)) {
    errors.push("institutional benefit was converted into indispensability");
  }
  if (/(?:^|[.!?]\s+)(?:Jamie|NYC Artist Coalition) was indispensable to (?:DCLA|Council|Espinal)/i.test(normalized)) {
    errors.push("institutional benefit was converted into indispensability");
  }
  if (/(?:^|[.!?]\s+)Jamie authored (?:Intro(?:duction)?|Local Law)/i.test(normalized)) {
    errors.push("testimony was converted into legislative authorship");
  }
  if (/(?:^|[.!?]\s+)NYC Artist Coalition alone caused/i.test(normalized)) {
    errors.push("coalition participation was converted into sole causation");
  }
  if (/(?:^|[.!?]\s+)(?:Finkelpearl mentioned NYC Artist Coalition in every Council hearing|No other (?:Finkelpearl )?mention exists|The only Council (?:hearing )?mention)/i.test(normalized)) {
    errors.push("a partial transcript search was converted into a complete negative census");
  }
  if (
    /\/Users\/|\/Volumes\/|Library\/Mobile Documents|(?:cookie|access[_ -]?token|session[_ -]?id)\s*[:=]|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/i.test(
      normalized
    )
  ) {
    errors.push("a private locator, contact field, or authenticated value entered the record");
  }

  return errors;
}

const checks = [];
function check(id, title, points, passes) {
  checks.push({ id, title, points, passes: Boolean(passes) });
}

const sourceIds = batch.intake[0]?.sourceIds ?? [];
const sources = sourceIds.map((id) => sourceById.get(id));
const finkelpearlSource = sourceById.get(
  "SRC-NYCAC-COUNCIL-FINKELPEARL-TESTIMONY-2017"
);
const cabaretSource = sourceById.get(
  "SRC-NYCAC-COUNCIL-JAMIE-ESPINAL-TESTIMONY-2017"
);
const smallBusinessSource = sourceById.get(
  "SRC-NYCAC-COUNCIL-ESPINAL-COLLABORATION-2019"
);
const publicRecordErrors = evaluatePublicRecord(publicRecord);

check(
  "GOV-001",
  "Six public City sources cover Council, DCLA, CreateNYC, and coalition recommendations",
  15,
  sources.length === 6 &&
    sources.every((source) => source?.visibility === "public") &&
    sources.every((source) => source?.canonicalUrl?.startsWith("https://")) &&
    sources.filter((source) => source?.kind === "government-record").length === 5
);

check(
  "GOV-002",
  "The recovered Finkelpearl reference retains its exact hearing context",
  15,
  finkelpearlSource?.publishedAt === "2017-05-19" &&
    finkelpearlSource?.canonicalUrl?.includes(
      "GUID=68A2E207-53EA-43CA-A03E-F879A113464E"
    ) &&
    corpus.finkelpearlTranscriptSearch.positiveRecord.hearing ===
      "Fiscal 2018 Executive Budget hearing" &&
    corpus.finkelpearlTranscriptSearch.positiveRecord.finding.includes(
      "direct public feedback"
    ) &&
    assertionById.get("AST-NYCAC-FINKELPEARL-COUNCIL-MENTION-2017")
      ?.confidence === "high"
);

check(
  "GOV-003",
  "DCLA engagement outcome and coalition recommendation translation remain distinct",
  10,
  assertionById.get("AST-NYCAC-DCLA-ENGAGEMENT-OUTCOME-2017")
    ?.relationship === "corroborates" &&
    assertionById.get("AST-NYCAC-RECOMMENDATION-TRANSLATION-2017")
      ?.relationship === "supports" &&
    sourceById.get("SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017")
      ?.doesNotEstablish.includes("adoption or implementation of every recommendation")
);

check(
  "GOV-004",
  "Jamie and Espinal's 2017 exchange is directly sourced and bounded",
  15,
  cabaretSource?.publishedAt === "2017-09-14" &&
    cabaretSource?.publicNote?.includes("misspells Jamie's surname") &&
    assertionById.get("AST-NYCAC-COUNCIL-JAMIE-FIELD-TESTIMONY-2017")
      ?.relationship === "supports" &&
    assertionById.get("AST-NYCAC-ESPINAL-APPRECIATION-2017")
      ?.confidence === "high" &&
    cabaretSource?.doesNotEstablish.includes("that Jamie authored Intro 1652-A")
);

check(
  "GOV-005",
  "The 2019 record preserves sustained collaboration and Jamie's implementation recommendations",
  15,
  smallBusinessSource?.publishedAt === "2019-03-18" &&
    assertionById.get("AST-NYCAC-ESPINAL-SUSTAINED-WORKING-RELATIONSHIP-2019")
      ?.confidence === "high" &&
    assertionById.get("AST-NYCAC-JAMIE-SMALL-BUSINESS-DATA-RECOMMENDATIONS-2019")
      ?.assertion.includes("public datasets and online tools") &&
    smallBusinessSource?.doesNotEstablish.includes(
      "that Espinal adopted every recommendation"
    )
);

check(
  "GOV-006",
  "Institutional-value assertions are explicitly interpretive and moderately confident",
  15,
  [
    "AST-NYCAC-DCLA-INSTITUTIONAL-VALUE-2026",
    "AST-NYCAC-COUNCIL-INSTITUTIONAL-VALUE-2026",
    "AST-NYCAC-ESPINAL-INSTITUTIONAL-VALUE-2026"
  ].every((id) => {
    const assertion = assertionById.get(id);
    return assertion?.relationship === "contextualizes" &&
      assertion.confidence === "moderate" &&
      assertion.assertion.startsWith("Source-backed analysis:");
  }) &&
    corpus.institutionalAnalysis.status.startsWith("Source-backed interpretation")
);

check(
  "GOV-007",
  "Dependency, authorship, and sole-causation boundaries remain explicit",
  10,
  assertionById.get("AST-NYCAC-GOVERNMENT-NEED-BOUNDARY-2026")
    ?.relationship === "bounds" &&
    corpus.causalBoundaries.length === 5 &&
    runNote.includes("not evidence of indispensability") &&
    runNote.includes("legislative authorship")
);

check(
  "GOV-008",
  "Incomplete transcript census remains an open, reproducible task",
  10,
  corpus.finkelpearlTranscriptSearch.completeCensus === false &&
    taskById.get("TASK-NYCAC-FINKELPEARL-TRANSCRIPT-CENSUS")?.status ===
      "queued" &&
    taskById.get("TASK-NYCAC-FINKELPEARL-TRANSCRIPT-CENSUS")
      ?.successCriteria.some((criterion) => criterion.includes("Inaccessible records")) &&
    inquiryById.get("INQ-NYCAC-GOVERNMENT-VALUE-2026")?.resultStatus ===
      "partially-recovered"
);

check(
  "GOV-009",
  "The source layer strengthens candidates without bypassing claim review",
  10,
  batch.claims.length === 0 &&
    batch.intake[0]?.claimIds.length === 0 &&
    corpus.projectionDecision.newClaimRecord === false &&
    corpus.projectionDecision.websiteUpdate === false &&
    runNote.replace(/\s+/g, " ").includes(
      "does not create a new active ClaimRecord or website projection"
    )
);

check(
  "GOV-010",
  "Baseline public record is public-safe and semantically bounded",
  10,
  publicRecordErrors.length === 0
);

const mutationCases = [
  { id: "dcla-created", value: `${publicRecord} DCLA created NYC Artist Coalition.` },
  { id: "dcla-owned", value: `${publicRecord} DCLA owned NYC Artist Coalition.` },
  { id: "jamie-founded", value: `${publicRecord} Jamie alone founded NYC Artist Coalition.` },
  { id: "dcla-needed", value: `${publicRecord} DCLA needed Jamie.` },
  { id: "council-dependent", value: `${publicRecord} Council depended on NYC Artist Coalition.` },
  { id: "espinal-without", value: `${publicRecord} Espinal could not act without Jamie.` },
  { id: "indispensable", value: `${publicRecord} NYC Artist Coalition was indispensable to Council.` },
  { id: "authorship", value: `${publicRecord} Jamie authored Intro 1652-A.` },
  { id: "sole-cause", value: `${publicRecord} NYC Artist Coalition alone caused Cabaret Law repeal.` },
  { id: "every-hearing", value: `${publicRecord} Finkelpearl mentioned NYC Artist Coalition in every Council hearing.` },
  { id: "no-other-mention", value: `${publicRecord} No other Finkelpearl mention exists.` },
  { id: "local-path", value: `${publicRecord} /${["Volumes", "private", "archive.pdf"].join("/")}` },
  { id: "contact", value: `${publicRecord} ${["witness", "example.com"].join("@")}` }
];

const undetectedMutations = mutationCases.filter(
  ({ value }) => evaluatePublicRecord(value).length === 0
);

check(
  "GOV-011",
  "Adversarial ownership, dependency, causation, census, and privacy mutations fail",
  15,
  undetectedMutations.length === 0
);

const total = checks.reduce((sum, item) => sum + item.points, 0);
const earned = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);

for (const item of checks) {
  console.log(
    `${item.passes ? "PASS" : "FAIL"} ${item.id} (${item.points}) ${item.title}`
  );
}
if (publicRecordErrors.length > 0) {
  console.log(`Baseline errors: ${publicRecordErrors.join("; ")}`);
}
if (undetectedMutations.length > 0) {
  console.log(
    `Undetected mutations: ${undetectedMutations.map(({ id }) => id).join(", ")}`
  );
}
console.log(`\nNYCAC government-value score: ${earned}/${total}`);

if (earned !== total) process.exitCode = 1;
