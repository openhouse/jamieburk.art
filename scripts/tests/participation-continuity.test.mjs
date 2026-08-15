import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { participationContinuityClaimIds } from "../../apps/www/src/data/knowledge-bank/participation-continuity-2026-07.ts";
import { evaluateParticipationContinuity } from "../lib/participation-continuity-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function loadControls() {
  return JSON.parse(readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/data/wowlist-sunday-dinner-callscript-controls.json"),
    "utf8"
  ));
}

test("participation-continuity eval accepts the governed candidate", () => {
  const result = evaluateParticipationContinuity();
  assert.equal(result.pass, true);
  assert.equal(result.passedPoints, 100);
  assert.equal(result.totalPoints, 100);
});

test("WOW List production counts and geography thresholds reject numeric mutations", () => {
  const mutations = [
    (copy) => { copy.wowListProductionSnapshot.counts.users = 1847; },
    (copy) => { copy.wowListProductionSnapshot.counts.postsEvents = 16141; },
    (copy) => { copy.wowListProductionSnapshot.counts.googleCalendarEvents = 15875; },
    (copy) => { copy.wowListProductionSnapshot.geography.cityRegionCountryKeysAtLeast50Posts = 36; },
    (copy) => { copy.wowListProductionSnapshot.boundaries = ["Official chapters in 35 cities."]; }
  ];

  for (const mutate of mutations) {
    const controls = loadControls();
    mutate(controls);
    assert.equal(evaluateParticipationContinuity({ controls }).pass, false);
  }
});

test("Sunday Dinner aggregates reject precision inflation and participant leakage", () => {
  const mutations = [
    (copy) => { copy.sundayDinnerAttendanceMatrix.eventLabeledColumns = 345; },
    (copy) => { copy.sundayDinnerAttendanceMatrix.eventNumberRange.uniqueNumbers = 345; },
    (copy) => { copy.sundayDinnerAttendanceMatrix.eventNumberRange.missingNumbers = []; },
    (copy) => { copy.sundayDinnerAttendanceMatrix.eventColumnsWithAtLeastOneExplicitAffirmativeMark = 346; },
    (copy) => { copy.sundayDinnerAttendanceMatrix.explicitAffirmativeMarks = 2781; },
    (copy) => { copy.sundayDinnerAttendanceMatrix.participantRowsCopiedToRepository = 1; },
    (copy) => { copy.sundayDinnerAttendanceMatrix.directIdentifiersCopiedToRepository = 1; },
    (copy) => { copy.sundayDinnerAttendanceMatrix.participants = [{ name: "Private Person" }]; }
  ];

  for (const mutate of mutations) {
    const controls = loadControls();
    mutate(controls);
    assert.equal(evaluateParticipationContinuity({ controls }).pass, false);
  }
});

test("Call Script signals cannot become attendance, audited reach, or a complete founding vote", () => {
  const mutations = [
    (copy) => { copy.callScriptContinuity.dclaEvent.displayedResponseLabel = "people attended"; },
    (copy) => { copy.callScriptContinuity.dclaEvent.displayedOrganizerIdentities = ["Jamie Burkart"]; },
    (copy) => { copy.callScriptContinuity.dclaEvent.callScriptNamingPoll.displayedLeadingPercentage = 100; },
    (copy) => { copy.callScriptContinuity.dclaEvent.callScriptNamingPoll.voteCountRecovered = true; },
    (copy) => { copy.callScriptContinuity.dclaEvent.callScriptSelfReportedTraction.independentlyAudited = true; },
    (copy) => { copy.callScriptContinuity.nextCoalitionMeeting.date = "2017-01-27"; }
  ];

  for (const mutate of mutations) {
    const controls = loadControls();
    mutate(controls);
    assert.equal(evaluateParticipationContinuity({ controls }).pass, false);
  }
});

test("active projections reject sole credit, current-product inflation, and causal overreach", () => {
  const mutations = [
    [participationContinuityClaimIds.callScriptContinuity, "Jamie single-handedly founded NYC Artist Coalition through Call Script."],
    [participationContinuityClaimIds.callScriptContinuity, "445 people attended and 10,000 unique people endorsed the coalition."],
    [participationContinuityClaimIds.wowScale, "WOW List has 1,846 current active users in official chapters across 35 cities."],
    [participationContinuityClaimIds.sundayDinnerScale, "The workbook proves 2,780 unique attendees." ]
  ];

  for (const [claimId, text] of mutations) {
    const claims = structuredClone(knowledgeBank.claims);
    const claim = claims.find((item) => item.id === claimId);
    claim.projections[0].text = text;
    assert.equal(evaluateParticipationContinuity({ claims }).pass, false, text);
  }
});

test("public WOWList projections lead with 35-plus city ecosystems and omit user and event-post counts", () => {
  const result = evaluateParticipationContinuity();
  assert.equal(
    result.criteria.find((criterion) => criterion.id === "PARTICIPATION-WOWLIST-PUBLIC-PROJECTION")?.pass,
    true
  );
});

test("source and site governance reject protected URLs and missing claim occurrences", () => {
  const sources = structuredClone(knowledgeBank.sources);
  const database = sources.find((source) => source.id === "SRC-WOWLIST-PRODUCTION-DATABASE-2017-07-22");
  database.visibility = "public";
  database.canonicalUrl = "https://example.com/raw-database";
  assert.equal(evaluateParticipationContinuity({ sources }).pass, false);

  const recordsSource = readFileSync(
    path.join(repoRoot, "apps/www/src/data/knowledge-bank/records.ts"),
    "utf8"
  ).replace('id: "callscript-participation-continuity"', 'id: "removed-continuity"');
  assert.equal(evaluateParticipationContinuity({ recordsSource }).pass, false);
});

test("public documentation rejects private locators and direct identifiers", () => {
  const projectReport = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/projects/wowlist-sunday-dinner-callscript-continuity.md"),
    "utf8"
  );
  assert.equal(evaluateParticipationContinuity({
    projectReport: `${projectReport}\nPrivate source: /Users/example/attendance.xlsx\n`
  }).pass, false);
  assert.equal(evaluateParticipationContinuity({
    projectReport: `${projectReport}\nContact: private.person@example.com\n`
  }).pass, false);
});
