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

test("professor lenses pass every bounded criterion", () => {
  const result = evaluateProfessorLenses({ suite, aboutText, sourceNoteText });
  assert.equal(result.pass, true);
  assert.equal(result.passed, result.total);
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
    .replace("Three systems loops", "Three current systems loops")
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

test("six copies of one review cannot substitute for three independent reviewers per lens", () => {
  const candidateFiles = Object.fromEntries(professorCandidateRelativePaths.map((file) => [file, readFileSync(path.join(repoRoot, file))]));
  const candidateSha256 = fingerprintProfessorCandidate(candidateFiles);
  const card = { phase: "holdout", score: 4, pass: true, candidateSha256, reviewerId: "duplicate-reviewer", lensId: "PR-015" };
  const result = evaluateProfessorLenses({ candidateFiles, finalScorecards: Array.from({ length: 6 }, () => ({ ...card })) });
  assert.equal(result.criteria.find((item) => item.id === "unanimous-holdouts").pass, false);
});

test("review roster requires exactly three scorecards for each professor lens", () => {
  const candidateFiles = Object.fromEntries(professorCandidateRelativePaths.map((file) => [file, readFileSync(path.join(repoRoot, file))]));
  const candidateSha256 = fingerprintProfessorCandidate(candidateFiles);
  const finalScorecards = Array.from({ length: 6 }, (_, i) => ({ phase: "holdout", score: 4, pass: true, candidateSha256, reviewerId: `reviewer-${i}`, lensId: i < 4 ? "PR-015" : "PR-016" }));
  const result = evaluateProfessorLenses({ candidateFiles, finalScorecards });
  assert.equal(result.criteria.find((item) => item.id === "unanimous-holdouts").pass, false);
});
