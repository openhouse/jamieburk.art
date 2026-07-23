import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { evaluateProfessorLenses } from "../lib/professor-lens-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const aboutText = readFileSync(path.join(repoRoot, "apps/www/src/app/about/page.tsx"), "utf8");
const sourceNoteText = readFileSync(
  path.join(repoRoot, "docs/knowledge-bank/projects/ucsc-professor-lenses-2026-07-15.md"),
  "utf8"
);
const historicalKnowledgeText = readFileSync(
  path.join(repoRoot, "apps/www/src/data/knowledge-bank/historical-knowledge.ts"),
  "utf8"
);
const suite = JSON.parse(
  readFileSync(path.join(repoRoot, ".agents/evals/portfolio-production-readiness.json"), "utf8")
);

test("professor lenses pass every bounded criterion", () => {
  const result = evaluateProfessorLenses({ suite, aboutText, sourceNoteText });
  assert.equal(result.pass, true);
  assert.equal(result.passed, result.total);
});

test("guard rejects erasing collective Open House governance", () => {
  const result = evaluateProfessorLenses({
    suite,
    aboutText: aboutText.replace("participants collectively governed", "Jamie governed"),
    sourceNoteText
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

test("guard rejects collapsing project-specific use and feedback into generic capability copy", () => {
  const result = evaluateProfessorLenses({
    suite,
    aboutText: aboutText
      .replaceAll("feedback:", "capabilities:")
      .replaceAll("Use and feedback:", "Capabilities:"),
    sourceNoteText
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "project-specific-loops")?.pass, false);
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

test("guard rejects raw evaluative praise or grades in the held derivative", () => {
  const result = evaluateProfessorLenses({
    suite,
    aboutText,
    sourceNoteText,
    historicalKnowledgeText: `${historicalKnowledgeText}\nGrade: A\nExcellent student`
  });
  assert.equal(result.pass, false);
  assert.equal(
    result.criteria.find((item) => item.id === "bounded-educational-derivative")?.pass,
    false
  );
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
