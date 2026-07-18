#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

const runNote = read(
  "docs/knowledge-bank/runs/2026-07-15-teams-archive-production-followup.md"
);
const projectNote = read(
  "docs/knowledge-bank/projects/claudettes-theater-on-wheels.md"
);
const docsText = `${runNote}\n${projectNote}`.replace(/\s+/g, " ");
const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const assertionById = new Map(
  knowledgeBank.sourceAssertions.map((assertion) => [assertion.id, assertion])
);
const taskById = new Map(
  knowledgeBank.researchTasks.map((task) => [task.id, task])
);
const intakeById = new Map(
  knowledgeBank.intake.map((intake) => [intake.id, intake])
);

function evaluatePublicRecord(candidate) {
  const errors = [];
  const normalized = candidate.replace(/\s+/g, " ");
  if (!normalized.includes("Jamie Burkart and Michael Rees")) {
    errors.push("the AR collaboration lost Michael Rees credit");
  }
  if (
    !normalized.includes(
      "Jamie Burkart, Anne Dufy Burkart, and Julia Fredenburg"
    )
  ) {
    errors.push("the source-video collaboration lost producer credit");
  }
  if (/Jamie (solely|alone) (created|built|produced|authored)/i.test(normalized)) {
    errors.push("sole authorship entered the public record");
  }
  if (/the coalition (adopted|completed) (the )?90-day plan/i.test(normalized)) {
    errors.push("the operating plan was converted into a completed outcome");
  }
  if (
    /\/Users\/|\/Volumes\/|Library\/Mobile Documents|@(?:gmail|icloud|ucsc)\.edu|\b\d{3}[-. ]\d{3}[-. ]\d{4}\b/i.test(
      normalized
    )
  ) {
    errors.push("a private locator or contact field entered the public record");
  }
  if (/job-hunt (outline|summary) independently proves/i.test(normalized)) {
    errors.push("a synthesis document was promoted to independent proof");
  }
  return errors;
}

const checks = [];
function check(id, title, points, passes) {
  checks.push({ id, title, points, passes: Boolean(passes) });
}

const claudetteSource = sourceById.get(
  "SRC-CLAUDETTES-MICHAEL-REES-PROJECT-PAGE-2022"
);
const claudetteEventSource = sourceById.get(
  "SRC-CLAUDETTES-MAKE-US-VISIBLE-MUNICH-2022"
);
const claudetteAssertion = assertionById.get(
  "AST-CLAUDETTES-AR-COLLABORATION"
);
const crsPlan = sourceById.get("SRC-TEAMS-CRS-90-DAY-ACTION-PLAN-2026");
const crsAssertion = assertionById.get(
  "AST-CRS-90-DAY-SHARED-PUBLIC-GOODS"
);

check(
  "TEAMS-001",
  "Authenticated and local collection coverage is explicit",
  15,
  docsText.includes("68 top-level items") &&
    docsText.includes("Jamie Projects History") &&
    docsText.includes("Commercial Rent Stabilization") &&
    docsText.includes("job-hunt") &&
    docsText.includes("not a claim that every private byte was read")
);

check(
  "TEAMS-002",
  "Claudette role credit is primary-source backed and collaborative",
  25,
  claudetteSource?.canonicalUrl === "https://michaelrees.org/claudette" &&
    claudetteSource.visibility === "public" &&
    claudetteSource.supportsGenerally.includes(
      "Jamie Burkart and Michael Rees as collaborators on the augmented-reality experience"
    ) &&
    claudetteEventSource?.visibility === "public-metadata-only" &&
    claudetteAssertion?.candidateClaimIds.length === 0 &&
    claudetteAssertion?.assertion.includes("Michael Rees") &&
    claudetteAssertion?.assertion.includes("Anne Dufy Burkart") &&
    projectNote.includes("not yet a website projection")
);

check(
  "TEAMS-003",
  "The unavailable-versus-absent distinction closes cleanly",
  10,
  intakeById.get("INT-TEAMS-CLAUDETTES-PLACEHOLDER-2026")?.status ===
    "integrated" &&
    taskById.get("TASK-CLAUDETTES-ROLE-SOURCE-RECOVERY")?.status ===
      "completed" &&
    docsText.includes("previously unresolved") &&
    docsText.includes("now has a live primary project page")
);

check(
  "TEAMS-004",
  "The CRS plan remains operating-design evidence, not an outcome",
  20,
  crsPlan?.visibility === "protected" &&
    crsPlan.doesNotEstablish.includes("coalition adoption of the plan") &&
    crsPlan.doesNotEstablish.includes(
      "completion of every proposed deliverable"
    ) &&
    crsAssertion?.candidateClaimIds.length === 0 &&
    taskById.get("TASK-CRS-90-DAY-IMPLEMENTATION-VERIFICATION")?.status ===
      "queued" &&
    docsText.includes("The plan is not treated as an outcome")
);

check(
  "TEAMS-005",
  "The job-hunt synthesis stays a routing map",
  10,
  intakeById
    .get("INT-TEAMS-JOB-HUNT-APPRAISAL-2026")
    ?.notes.some((note) => note.includes("did not upgrade quantified claims")) &&
    docsText.includes("No metric or accomplishment was upgraded") &&
    docsText.includes("routing map rather than independent proof")
);

check(
  "TEAMS-006",
  "Public records exclude private archive contents and locators",
  10,
  evaluatePublicRecord(docsText).length === 0 &&
    docsText.includes("no private messages") &&
    docsText.includes("no private path, contact field, or correspondence")
);

const mutationCases = [
  {
    id: "erase-michael-rees-credit",
    value: docsText.replaceAll(" and Michael Rees", "")
  },
  {
    id: "erase-video-producer-credit",
    value: docsText.replaceAll(
      "Jamie Burkart, Anne Dufy Burkart, and Julia Fredenburg",
      "Jamie Burkart"
    )
  },
  {
    id: "invent-sole-authorship",
    value: `${docsText} Jamie alone created the augmented-reality work.`
  },
  {
    id: "convert-plan-to-outcome",
    value: `${docsText} The coalition adopted the 90-day plan.`
  },
  {
    id: "leak-local-path",
    value: `${docsText} /Users/jamie/Library/Mobile Documents/private.txt`
  },
  {
    id: "promote-summary-to-proof",
    value: `${docsText} The job-hunt outline independently proves every accomplishment.`
  }
];

check(
  "TEAMS-007",
  "Adversarial mutations fail the gate",
  15,
  mutationCases.every(({ value }) => evaluatePublicRecord(value).length > 0)
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
console.log(`\nTeams archive follow-up score: ${earned}/${total}`);

if (earned !== total) process.exitCode = 1;
