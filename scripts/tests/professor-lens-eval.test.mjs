import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  evaluateProfessorLenses,
  fingerprintProfessorCandidate,
  professorCandidateRelativePaths
} from "../lib/professor-lens-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const aboutText = readFileSync(path.join(repoRoot, "apps/www/src/app/about/page.tsx"), "utf8");
const sourceNoteText = readFileSync(
  path.join(repoRoot, "docs/knowledge-bank/projects/ucsc-professor-lenses-2026-07-15.md"),
  "utf8"
);
const publicRegistryText = readFileSync(
  path.join(repoRoot, "apps/www/src/data/knowledge-bank/public-registry.json"),
  "utf8"
);
const suite = JSON.parse(
  readFileSync(path.join(repoRoot, ".agents/evals/portfolio-production-readiness.json"), "utf8")
);

test("exact reviewed candidate remains held when the Sack holdout median is three", () => {
  const result = evaluateProfessorLenses({ suite, aboutText, sourceNoteText });
  assert.equal(result.criteria.find((item) => item.id === "candidate-fingerprint")?.pass, true);
  assert.equal(result.pass, false);
  assert.equal(result.passed, 17);
  assert.equal(result.total, 18);
  assert.deepEqual(result.criteria.filter((item) => !item.pass).map((item) => item.id),
    ["unanimous-holdouts"]);
  const holdouts = result.criteria.find((item) => item.id === "unanimous-holdouts");
  assert.match(holdouts.evidence, /6\/6 final scorecards match candidate/);
  assert.match(holdouts.evidence, /PR-015: scores 4, 4, 4; median 4; minimum 4/);
  assert.match(holdouts.evidence, /PR-016: scores 3, 3, 3; median 3; minimum 3/);
});

test("guard keeps the raw Open House article out of the public review packet", () => {
  const mutatedSuite = structuredClone(suite);
  const morse = mutatedSuite.evals.find((entry) => entry.id === "PR-015");
  morse.inputs = morse.inputs.map((item) =>
    item === "public-safe source note for the Open House article"
      ? "public Open House article"
      : item
  );

  const result = evaluateProfessorLenses({
    suite: mutatedSuite,
    aboutText,
    sourceNoteText
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "open-house-source-projection")?.pass, false);
});

test("guard rejects erasing collective Open House governance", () => {
  const result = evaluateProfessorLenses({
    suite,
    aboutText,
    sourceNoteText,
    publicRegistryText: publicRegistryText.replace(
      "participants used communal decision-making",
      "Jamie governed"
    )
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "open-house-boundary")?.pass, false);
});

test("guard rejects an incomplete recursive systems sequence", () => {
  const result = evaluateProfessorLenses({
    suite,
    aboutText: aboutText.replace("prototype an interface", "make an artifact"),
    sourceNoteText
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "recursive-sequence")?.pass, false);
});

test("guard rejects weakening the public analytical limits", () => {
  const result = evaluateProfessorLenses({
    suite,
    aboutText: aboutText.replace(
      /or peer-reviewed\s+research/,
      "an ongoing research direction"
    ),
    sourceNoteText
  });
  assert.equal(result.pass, false);
  assert.equal(
    result.criteria.find((item) => item.id === "explicit-analytical-limits")?.pass,
    false
  );
});

test("guard rejects labeling the ended HJE engagement as current", () => {
  const mutatedAbout = aboutText
    .replace("Three documented participation systems", "Three current systems loops")
    .replace(
      "Harry J. Epstein Company\n                  </Link>\n                </h3>",
      "Harry J. Epstein Company\n                  </Link>\n                </h3>\n                <span className=\"jb-section-label\">Current</span>"
    );
  const result = evaluateProfessorLenses({
    suite,
    aboutText: mutatedAbout,
    sourceNoteText
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "project-status-integrity")?.pass, false);
});

test("guard rejects removing the public-safe handoff specimens", () => {
  const result = evaluateProfessorLenses({
    suite,
    aboutText,
    sourceNoteText,
    hjeContentText: "Public storefront only.",
    sundayDinnerContentText: "Summary only."
  });
  assert.equal(result.pass, false);
  assert.equal(
    result.criteria.find((item) => item.id === "inspectable-handoff-specimens")?.pass,
    false
  );
});

test("guard rejects private educational-record identifiers", () => {
  const result = evaluateProfessorLenses({
    suite,
    aboutText,
    sourceNoteText: `${sourceNoteText}\nStudent ID: 7654321`
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "no-private-fragments")?.pass, false);
});

test("guard rejects weakening the Sack anti-overclaim rubric", () => {
  const mutatedSuite = structuredClone(suite);
  const sack = mutatedSuite.evals.find((entry) => entry.id === "PR-016");
  sack.procedure = sack.procedure.map((item) =>
    item.replace("current Max/Jitter proficiency", "historical software context")
  );
  sack.pass_criteria = sack.pass_criteria.map((item) =>
    item.replace("current Max/Jitter proficiency", "historical software context")
  );

  const result = evaluateProfessorLenses({
    suite: mutatedSuite,
    aboutText,
    sourceNoteText
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "sack-rubric")?.pass, false);
});

test("guard rejects a stale or weakened holdout scorecard", () => {
  const weakenedScorecards = [
    ...["margaret-morse", "warren-sack"].flatMap((lens) =>
      ["a", "b", "c"].map((judge) => JSON.parse(readFileSync(
        path.join(repoRoot, `docs/qa/evals-H/${lens}-final-${judge}.json`),
        "utf8"
      )))
    )
  ];
  weakenedScorecards[0].score = 3;

  const result = evaluateProfessorLenses({
    suite,
    aboutText,
    sourceNoteText,
    finalScorecards: weakenedScorecards
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "unanimous-holdouts")?.pass, false);
});

test("guard rejects a scorecard bound to another public candidate", () => {
  const staleScorecards = [
    ...["margaret-morse", "warren-sack"].flatMap((lens) =>
      ["a", "b", "c"].map((judge) => JSON.parse(readFileSync(
        path.join(repoRoot, `docs/qa/evals-H/${lens}-final-${judge}.json`),
        "utf8"
      )))
    )
  ];
  staleScorecards[0].candidateSha256 = "0".repeat(64);

  const result = evaluateProfessorLenses({
    suite,
    aboutText,
    sourceNoteText,
    finalScorecards: staleScorecards
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "unanimous-holdouts")?.pass, false);
});

test("guard binds visual-system and photo changes to a new candidate", () => {
  const candidateFiles = Object.fromEntries(professorCandidateRelativePaths.map((relativePath) => [
    relativePath,
    readFileSync(path.join(repoRoot, relativePath))
  ]));
  candidateFiles["apps/www/src/app/globals.css"] = Buffer.concat([
    candidateFiles["apps/www/src/app/globals.css"],
    Buffer.from("\n/* unreviewed visual change */\n")
  ]);

  const result = evaluateProfessorLenses({
    suite,
    aboutText,
    sourceNoteText,
    candidateFiles
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "candidate-fingerprint")?.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "unanimous-holdouts")?.pass, false);
});

function syntheticReviewerFixture() {
  const candidateFiles = Object.fromEntries(professorCandidateRelativePaths.map((relativePath) => [
    relativePath, readFileSync(path.join(repoRoot, relativePath))
  ]));
  candidateFiles["apps/www/src/components/Hero.tsx"] = Buffer.concat([
    candidateFiles["apps/www/src/components/Hero.tsx"],
    Buffer.from("\n// Synthetic unit-test candidate; not review evidence.\n")
  ]);
  const candidateSha256 = fingerprintProfessorCandidate(candidateFiles);
  const scorecards = ["PR-015", "PR-016"].flatMap((lensId) =>
    [1, 2, 3].map((reviewer) => ({
      evaluator: "Synthetic unit-test fixture; not an independent review.",
      reviewerId: `synthetic-${lensId}-${reviewer}`,
      lensId, phase: "holdout", candidateSha256, score: 4, pass: true
    }))
  );
  return { candidateFiles, scorecards };
}

test("guard requires three distinct reviewer records for each professor lens", () => {
  const { candidateFiles, scorecards } = syntheticReviewerFixture();
  const initial = evaluateProfessorLenses({ candidateFiles, finalScorecards: scorecards });
  assert.equal(initial.criteria.find((item) => item.id === "unanimous-holdouts")?.pass, true);
  assert.equal(initial.criteria.find((item) => item.id === "candidate-fingerprint")?.pass, false);
  scorecards[1].reviewerId = scorecards[0].reviewerId;

  const result = evaluateProfessorLenses({ candidateFiles, finalScorecards: scorecards });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "unanimous-holdouts")?.pass, false);
});

test("guard cannot count one professor lens six times", () => {
  const { candidateFiles, scorecards } = syntheticReviewerFixture();
  assert.equal(evaluateProfessorLenses({ candidateFiles, finalScorecards: scorecards })
    .criteria.find((item) => item.id === "unanimous-holdouts")?.pass, true);
  for (const scorecard of scorecards) scorecard.lensId = "PR-015";

  const result = evaluateProfessorLenses({ candidateFiles, finalScorecards: scorecards });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "unanimous-holdouts")?.pass, false);
});

test("holdout aggregation follows the frozen median-four and minimum-three rule", () => {
  for (const { scores, expected } of [
    { scores: [3, 4, 4], expected: true },
    { scores: [4, 3, 4], expected: true },
    { scores: [3, 3, 4], expected: false },
    { scores: [2, 4, 4], expected: false },
    { scores: [4, 4, 5], expected: false },
    { scores: [3.5, 4, 4], expected: false }
  ]) {
    const { candidateFiles, scorecards } = syntheticReviewerFixture();
    scorecards.filter((card) => card.lensId === "PR-015").forEach((card, index) => {
      card.score = scores[index];
      card.pass = card.score === 4;
    });
    const result = evaluateProfessorLenses({ candidateFiles, finalScorecards: scorecards });
    assert.equal(result.criteria.find((item) => item.id === "unanimous-holdouts")?.pass,
      expected, JSON.stringify(scores));
    assert.equal(result.pass, false, "Synthetic cards must never approve the real candidate");
  }
});

test("holdout aggregation rejects stale cards and explicit failure at score four", () => {
  for (const mutation of [
    (card) => { card.candidateSha256 = "0".repeat(64); },
    (card) => { card.pass = false; },
    (card) => { card.phase = "development"; }
  ]) {
    const { candidateFiles, scorecards } = syntheticReviewerFixture();
    mutation(scorecards[0]);
    const result = evaluateProfessorLenses({ candidateFiles, finalScorecards: scorecards });
    assert.equal(result.criteria.find((item) => item.id === "unanimous-holdouts")?.pass, false);
  }
});
