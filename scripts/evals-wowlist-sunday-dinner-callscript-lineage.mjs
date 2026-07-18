#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { wowListSundayDinnerCallScriptLineageBatch20260715 as batch } from
  "../apps/www/src/data/knowledge-bank/batches/wowlist-sunday-dinner-callscript-lineage-2026-07-15.ts";
import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

const runNote = read(
  "docs/knowledge-bank/runs/2026-07-15-wowlist-sunday-dinner-callscript-lineage.md"
);
const projectNotes = [
  read("docs/knowledge-bank/projects/wowlist.md"),
  read("docs/knowledge-bank/projects/sunday-dinner.md"),
  read("docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md")
].join("\n");
const corpus = JSON.parse(
  read(
    "docs/knowledge-bank/corpora/wowlist-sunday-dinner-callscript-lineage-2026-07-15.json"
  )
);
const publicRecord = `${JSON.stringify(batch)}\n${JSON.stringify(corpus)}\n${runNote}\n${projectNotes}`
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

function evaluatePublicRecord(candidate) {
  const errors = [];
  const normalized = candidate.replace(/\s+/g, " ");

  if (!normalized.includes("Sunday Dinner collaborators")) {
    errors.push("Sunday Dinner collective credit disappeared");
  }
  if (!normalized.includes("NYC Artist Coalition, Call Script, and collaborators")) {
    errors.push("formation-era cohost credit disappeared");
  }
  if (!normalized.includes("not establish that Jamie alone founded")) {
    errors.push("the sole-founder boundary disappeared");
  }
  if (/(?:^|[.!?]\s+)Jamie (?:alone|single-handedly|solely) (?:founded|created|built)/i.test(normalized)) {
    errors.push("sole-founder or sole-creator language entered the record");
  }
  if (/445 (?:people )?(?:attended|showed up|participants)/i.test(normalized)) {
    errors.push("Facebook responses were converted into attendance");
  }
  if (/(?:933 (?:people|users) (?:reached|engaged|attended|participated)|(?:reached|engaged) 933 (?:people|users))/i.test(normalized)) {
    errors.push("linked records were converted into people or reach");
  }
  if (/(?:had|served|recorded|reached) 2,?783 (?:audited|verified|unique) (?:attendees|participants|people|meals)/i.test(normalized)) {
    errors.push("the unreconciled workbook value was promoted to an audited total");
  }
  if (
    /\/Users\/|\/Volumes\/|Library\/Mobile Documents|docs\.google\.com\/spreadsheets|(?:cookie|access[_ -]?token|session[_ -]?id)\s*[:=]|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/i.test(
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

const snapshotSource = sourceById.get(
  "SRC-WOWLIST-PRODUCTION-DB-SNAPSHOTS-2016-2017"
);
const commitSource = sourceById.get(
  "SRC-WOWLIST-POPULAR-VOTE-DOMAIN-COMMIT-2016"
);
const workbookSource = sourceById.get(
  "SRC-SUNDAY-DINNER-OPERATING-WORKBOOK-2026"
);
const pageSource = sourceById.get("SRC-CALLSCRIPT-FACEBOOK-PAGE-2026");
const eventSource = sourceById.get(
  "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017"
);
const publicRecordErrors = evaluatePublicRecord(publicRecord);

check(
  "LINEAGE-001",
  "Five governed sources cover every evidence layer",
  15,
  [snapshotSource, commitSource, workbookSource, pageSource, eventSource].every(Boolean) &&
    snapshotSource?.visibility === "protected" &&
    commitSource?.visibility === "protected" &&
    workbookSource?.visibility === "protected" &&
    pageSource?.visibility === "public" &&
    eventSource?.visibility === "public"
);

check(
  "LINEAGE-002",
  "Three WOW List snapshots preserve exact aggregate scale",
  15,
  JSON.stringify(corpus.wowListSnapshots) === JSON.stringify([
    { date: "2016-06-24", users: 995, postsEvents: 10136, tagsLists: 14813, listFollows: 18181, stars: 12935, goingRecords: 1864, googleCalendarPostEventLinks: 10650 },
    { date: "2017-06-01", users: 1775, postsEvents: 15559, tagsLists: 23296, listFollows: 28084, stars: 20193, goingRecords: 2871, googleCalendarPostEventLinks: 15363 },
    { date: "2017-07-22", users: 1846, postsEvents: 16142, tagsLists: 23864, listFollows: 28837, stars: 20927, goingRecords: 2965, googleCalendarPostEventLinks: 15875 }
  ]) &&
    snapshotSource?.doesNotEstablish.includes("unique reach or active-user counts")
);

const popularVote = corpus["focusListsAsOf2017-07-22"].find(
  (item) => item.name === "Popular Vote"
);
const nycacList = corpus["focusListsAsOf2017-07-22"].find(
  (item) => item.name === "NYC Artist Coalition"
);

check(
  "LINEAGE-003",
  "Civic-calendar aggregates retain chronology and contributor boundaries",
  15,
  popularVote?.linkedPostEventRecords === 933 &&
    popularVote?.listFollows === 196 &&
    popularVote?.anonymousDistinctContributorIds === 10 &&
    nycacList?.linkedPostEventRecords === 82 &&
    nycacList?.anonymousDistinctContributorIds === 2 &&
    assertionById.get("AST-NYCAC-WOWLIST-SNAPSHOT-LINEAGE-2017")?.relationship ===
      "contextualizes"
);

check(
  "LINEAGE-004",
  "The popular.vote implementation is directly attributed and bounded",
  10,
  corpus.popularVoteImplementation.author === "Jamie Burkart" &&
    corpus.popularVoteImplementation.commit ===
      "8337b8956050b66702748c727b51f26950b82a35" &&
    corpus.popularVoteImplementation.change.includes("routing") &&
    commitSource?.doesNotEstablish.includes("sole conception or ownership of Popular Vote")
);

check(
  "LINEAGE-005",
  "Sunday Dinner chronology and reconciliation gap remain protected",
  15,
  corpus.sundayDinnerWorkbook.numberedGatheringColumns === 345 &&
    corpus.sundayDinnerWorkbook.distinctNumberLabels === 340 &&
    corpus.sundayDinnerWorkbook.dateSpan.start === "2012-01-22" &&
    corpus.sundayDinnerWorkbook.dateSpan.end === "2021-03-07" &&
    corpus.sundayDinnerWorkbook.displayedMealsServedFormulaValue === 2783 &&
    corpus.sundayDinnerWorkbook.gatheringSequenceSum === 2769 &&
    corpus.sundayDinnerWorkbook.unreconciledDifference === 14 &&
    taskById.get("TASK-SUNDAY-DINNER-WORKBOOK-RECONCILIATION")?.status ===
      "queued" &&
    workbookSource?.doesNotEstablish.includes("2,783 unique people")
);

check(
  "LINEAGE-006",
  "Call Script evidence preserves the participatory bridge and response boundary",
  15,
  pageSource?.canonicalUrl === "https://www.facebook.com/callscript" &&
    eventSource?.canonicalUrl ===
      "https://www.facebook.com/events/388137698233507/?active_tab=discussion" &&
    corpus.callScriptPublicEvidence.pageLinksTo === "popular.vote" &&
    corpus.callScriptPublicEvidence.displayedResponses === 445 &&
    corpus.callScriptPublicEvidence.responseBoundary.includes("not attendance") &&
    corpus.callScriptPublicEvidence.discussionPatterns.length === 3 &&
    assertionById.get("AST-CALLSCRIPT-NYCAC-CAUSAL-BOUNDARY-2026")?.relationship ===
      "bounds"
);

check(
  "LINEAGE-007",
  "Collective-credit review governs projection",
  5,
  batch.claims.length === 0 &&
    batch.intake[0]?.claimIds.length === 0 &&
    runNote.replace(/\s+/g, " ").includes(
      "not a new active ClaimRecord or website projection"
    ) &&
    runNote.includes("collective-credit review")
);

check(
  "LINEAGE-008",
  "Public artifacts exclude participant data, private locators, and authenticated state",
  10,
  publicRecordErrors.length === 0 &&
    corpus.privacyExclusions.includes("Raw database rows and person identifiers") &&
    corpus.privacyExclusions.includes(
      "Sunday Dinner participant names, contact details, histories, notes, and addresses"
    )
);

const mutationCases = [
  { id: "sole-founder", value: `${publicRecord} Jamie alone founded NYC Artist Coalition.` },
  { id: "responses-to-attendance", value: `${publicRecord} 445 people attended the DCLA meeting.` },
  { id: "records-to-reach", value: `${publicRecord} The calendar reached 933 people.` },
  { id: "workbook-to-unique", value: `${publicRecord} Sunday Dinner had 2,783 unique attendees.` },
  { id: "erase-dinner-credit", value: publicRecord.replaceAll("Sunday Dinner collaborators", "Jamie Burkart") },
  {
    id: "erase-cohost-credit",
    value: publicRecord.replaceAll(
      "NYC Artist Coalition, Call Script, and collaborators",
      "Jamie Burkart"
    )
  },
  {
    id: "erase-founder-boundary",
    value: publicRecord.replaceAll(
      "not establish that Jamie alone founded",
      "establishes that Jamie founded"
    )
  },
  {
    id: "leak-local-path",
    value: `${publicRecord} /${["Volumes", "private", "archive.dump"].join("/")}`
  },
  {
    id: "leak-email",
    value: `${publicRecord} ${["guest", "example.com"].join("@")}`
  },
  {
    id: "leak-workbook-url",
    value: `${publicRecord} ${["https:", "", "docs.google.com", "spreadsheets", "private-roster"].join("/")}`
  }
];

const undetectedMutations = mutationCases.filter(
  ({ value }) => evaluatePublicRecord(value).length === 0
);

check(
  "LINEAGE-009",
  "Adversarial attribution, metric, and privacy mutations fail",
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
console.log(`\nWOW List/Sunday Dinner/Call Script lineage score: ${earned}/${total}`);

if (earned !== total) process.exitCode = 1;
