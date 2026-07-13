import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  baselineComparison,
  browserEvidenceMatches,
  findChadLensFriction,
  findGovernanceNarration,
  profileStatus,
  validateSuite,
  validModelJudgments,
  weightedScore
} from "../lib/portfolio-evals.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const suite = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/portfolio-readiness/suite.json"), "utf8")
);

const passingHardGates = Object.fromEntries(
  suite.hardGates.map((gate) => [gate.id, { status: "pass" }])
);

const baselineScores = {
  role_clarity: 4,
  role_fit: 4,
  proof_defensibility: 4,
  citational_care: 4,
  reader_effort: 3,
  chad_lens: 2,
  visual_evidence: 1,
  resume_alignment: 4,
  responsive_quality: 3,
  sharing_quality: 3,
  operational_confidence: 3
};

test("suite IDs, references, and weights are valid", () => {
  assert.deepEqual(validateSuite(suite), []);
  assert.equal(weightedScore(suite.rubrics, baselineScores), 83.5);
});

test("reader-irrelevant governance narration is located with evidence", () => {
  const findings = findGovernanceNarration([
    ["resume.tsx", "Useful copy.\nCurrent public resume PDF. Phone remains inside the approved resume artifact."]
  ]);

  assert.equal(findings.length, 2);
  assert.equal(findings[0].file, "resume.tsx");
  assert.equal(findings[0].line, 2);
});

test("Chad-lens friction is located with evidence", () => {
  const findings = findChadLensFriction([
    ["home.tsx", "The fastest role-fit proof surface for OTI."],
    ["hje.mdx", "For a hiring manager, this is implementation proof. Screenshot approvals pending."]
  ]);

  assert.deepEqual(
    findings.map((finding) => finding.id),
    ["unexplained-acronym", "proof-surface-meta", "audience-meta", "pending-approval-meta"]
  );
  assert.equal(findings[0].file, "home.tsx");
});

test("baseline misses the application-ready Chad-lens criterion", () => {
  const result = profileStatus({
    suite,
    profileId: "application_ready",
    hardGates: passingHardGates,
    scores: baselineScores
  });

  assert.equal(result.passed, false);
  assert.deepEqual(result.failedRubrics, ["chad_lens"]);
});

test("one bounded Chad-lens improvement reaches application-ready", () => {
  const candidateScores = { ...baselineScores, chad_lens: 3 };
  const result = profileStatus({
    suite,
    profileId: "application_ready",
    hardGates: passingHardGates,
    scores: candidateScores
  });

  assert.equal(weightedScore(suite.rubrics, candidateScores), 86.5);
  assert.equal(result.passed, true);
});

test("application-ready does not falsely imply production-ready", () => {
  const hardGates = {
    ...passingHardGates,
    production_operations: { status: "blocked" },
    human_approval: { status: "blocked" }
  };
  const candidateScores = { ...baselineScores, chad_lens: 3 };
  const result = profileStatus({
    suite,
    profileId: "production_ready",
    hardGates,
    scores: candidateScores
  });

  assert.equal(result.passed, false);
  assert.deepEqual(result.failedHardGates, ["production_operations", "human_approval"]);
  assert.ok(result.failedRubrics.includes("visual_evidence"));
});

test("baseline comparison rejects fingerprint drift and rubric regression", () => {
  const baseline = {
    commit: "base-sha",
    fingerprint: "sha256:base",
    profiles: ["application_ready", "production_ready"],
    scores: baselineScores
  };

  assert.equal(
    baselineComparison({
      baseline,
      commit: "base-sha",
      fingerprint: "sha256:base",
      profileId: "application_ready",
      scores: { ...baselineScores, chad_lens: 3 }
    }),
    true
  );
  assert.equal(
    baselineComparison({
      baseline,
      commit: "base-sha",
      fingerprint: "sha256:changed",
      profileId: "application_ready",
      scores: baselineScores
    }),
    false
  );
  assert.equal(
    baselineComparison({
      baseline,
      commit: "base-sha",
      fingerprint: "sha256:base",
      profileId: "production_ready",
      scores: baselineScores
    }),
    true
  );
});

test("browser evidence is candidate-bound and covers every required route", () => {
  const route = {
    route: "/",
    desktop: { status: 200, overflow: false },
    mobile: { status: 200, overflow: false }
  };
  const evidence = {
    candidate: "sha256:candidate",
    routes: [route],
    citations: { localLinks: true, backlinks: true, accessibleLabels: true },
    focusVisible: true,
    zoom200: { passed: true },
    keyboard: { passed: true },
    resumeDownload: true,
    metadata: true
  };

  assert.equal(
    browserEvidenceMatches({
      evidence,
      candidate: "sha256:candidate",
      requiredRoutes: ["/"]
    }),
    true
  );
  assert.equal(
    browserEvidenceMatches({
      evidence,
      candidate: "sha256:other",
      requiredRoutes: ["/"]
    }),
    false
  );
});

test("model judgments require matching candidates, passing scores, and no regressions", () => {
  const judgment = {
    judgeId: "judge-a",
    lens: "hiring-manager",
    candidate: "sha256:candidate",
    contract: "sha256:contract",
    profile: "application_ready",
    passes: true,
    evidence: [{ rubric: "reader_effort", observation: "Concise" }],
    regressions: [],
    scores: { role_clarity: 3, reader_effort: 3, chad_lens: 3 }
  };

  assert.equal(
    validModelJudgments({
      judgments: [judgment],
      candidate: "sha256:candidate",
      contract: "sha256:contract",
      profileId: "application_ready",
      requiredRubrics: ["role_clarity", "reader_effort", "chad_lens"],
      minimumScore: 3
    }).length,
    1
  );
  assert.equal(
    validModelJudgments({
      judgments: [{ ...judgment, regressions: ["new failure"] }],
      candidate: "sha256:candidate",
      contract: "sha256:contract",
      profileId: "application_ready",
      requiredRubrics: ["role_clarity", "reader_effort", "chad_lens"],
      minimumScore: 3
    }).length,
    0
  );
});
