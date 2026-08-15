import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluateHiringReaderPortfolio } from "./evaluate-hiring-reader-portfolio.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/resumes/hiring-reader-portfolio.json"), "utf8")
);
const readerSuite = JSON.parse(
  readFileSync(path.join(repoRoot, config.readerSuitePath), "utf8")
);

test("every named-reader opportunity resume advances through every modeled reader", () => {
  const result = evaluateHiringReaderPortfolio();
  assert.equal(result.overall, "pass", JSON.stringify(result, null, 2));
  assert.equal(result.summary.maintainedOpportunityVersions, 5);
  assert.equal(result.summary.passingOpportunityVersions, 5);
  assert.equal(result.summary.passingReaderOpportunityPairs, 7);
  assert.equal(result.actualPeopleParticipated, false);
  assert.equal(result.decision, "advance-to-structured-next-step");
  assert.deepEqual(result.methodologySkills, [
    "interviewing-evaluating-candidates",
    "review-resume"
  ]);
  for (const version of result.versions) {
    assert.equal(version.reviewResumeCriteriaPassed, 10);
    assert.equal(version.reviewResumeCriteriaRequired, 10);
  }
});

test("the single public resume advances every currently active modeled reader", () => {
  const result = evaluateHiringReaderPortfolio();
  assert.ok(result.publicResume, "public resume evaluation is missing");
  assert.equal(result.publicResume.overall, "pass", JSON.stringify(result.publicResume, null, 2));
  assert.deepEqual(result.publicResume.activeGateIds, [
    "gate.aclu-national-campaigns.deirdre-schifeling",
    "gate.asana-ai-implementation.arnab-bose",
    "gate.codepath-ai-operations.brian-madigan",
    "gate.codepath-ai-operations.quinton-ma",
    "gate.codepath-engineering.chris-coleman",
    "gate.codepath-engineering.zack-parker",
    "gate.permitflow-product-operations.francis-thumpasery"
  ]);
  assert.equal(result.publicResume.actualPeopleParticipated, false);
  assert.equal(result.publicResume.decision, "advance-to-structured-next-step");
  for (const reader of result.publicResume.readerResults) {
    assert.equal(reader.hardScreenPass, true);
    assert.ok(reader.constructiveCritique.length > 80);
    assert.ok(reader.validateNext.length > 60);
  }
});

test("the public resume fails closed when cross-opportunity quality evidence is removed", () => {
  const publicPath = config.publicResume.resumePath;
  const original = readFileSync(path.join(repoRoot, publicPath), "utf8");
  const mutation = original
    .replace(/issue reproduction/gi, "issue review")
    .replace(/test cases/gi, "checks")
    .replace(/release verification/gi, "release support");
  const result = evaluateHiringReaderPortfolio({
    resumeOverrides: { [publicPath]: mutation }
  });
  const zack = result.publicResume.readerResults.find(
    (reader) => reader.readerId === "reader.zack-parker"
  );
  assert.equal(zack.modeledVerdict, "fail");
  assert.ok(zack.missingSignalGroups.includes("quality-system"));
  assert.equal(result.publicResume.overall, "fail");
  assert.equal(result.overall, "fail");
});

test("a missing opportunity-specific resume fails closed", () => {
  const missingPath = config.versions[0].resumePath;
  const result = evaluateHiringReaderPortfolio({ resumeOverrides: { [missingPath]: null } });
  assert.equal(result.overall, "fail");
  assert.equal(result.summary.maintainedOpportunityVersions, 4);
  assert.equal(result.versions[0].overall, "fail");
});

test("loss of a reader-specific signal fails that modeled screen", () => {
  const version = config.versions.find(
    (entry) => entry.opportunityId === "opportunity.codepath.engineering-project-manager.5160542007"
  );
  const original = readFileSync(path.join(repoRoot, version.resumePath), "utf8");
  const mutation = original
    .replace(/quality assurance/gi, "release support")
    .replace(/bug triage/gi, "issue routing")
    .replace(/test cases/gi, "checks")
    .replace(/regression expectations/gi, "follow-up expectations");
  const result = evaluateHiringReaderPortfolio({
    resumeOverrides: { [version.resumePath]: mutation }
  });
  const zack = result.versions
    .find((entry) => entry.opportunityId === version.opportunityId)
    .readerResults.find((reader) => reader.readerId === "reader.zack-parker");
  assert.equal(zack.modeledVerdict, "fail");
  assert.ok(zack.missingSignalGroups.includes("quality-system"));
  assert.equal(result.overall, "fail");
});

test("a fabricated named-reader endorsement fails the artifact safety gate", () => {
  const version = config.versions[0];
  const original = readFileSync(path.join(repoRoot, version.resumePath), "utf8");
  const result = evaluateHiringReaderPortfolio({
    resumeOverrides: {
      [version.resumePath]: `${original}\nDeirdre Schifeling reviewed and approved this resume.\n`
    }
  });
  const safety = result.versions[0].artifactChecks.find(
    (check) => check.id === "claim-and-endorsement-safety"
  );
  assert.equal(safety.pass, false);
  assert.equal(result.overall, "fail");
});

test("omitting a named-reader opportunity or pair fails suite coverage", () => {
  const missingOpportunity = structuredClone(config);
  missingOpportunity.versions = missingOpportunity.versions.slice(1);
  const opportunityResult = evaluateHiringReaderPortfolio({ config: missingOpportunity });
  assert.equal(
    opportunityResult.portfolioChecks.find(
      (check) => check.id === "named-reader-opportunity-coverage"
    ).pass,
    false
  );

  const missingPair = structuredClone(config);
  missingPair.versions[1].readerCriteria = missingPair.versions[1].readerCriteria.slice(1);
  const pairResult = evaluateHiringReaderPortfolio({ config: missingPair, readerSuite });
  assert.equal(
    pairResult.portfolioChecks.find((check) => check.id === "named-reader-pair-coverage").pass,
    false
  );
  assert.equal(pairResult.overall, "fail");
});

test("skill loss or drift fails the methodology dependency", () => {
  const result = evaluateHiringReaderPortfolio({ skillTextOverride: "# Different skill" });
  const skillCheck = result.portfolioChecks.find(
    (check) => check.id === "candidate-evaluation-skill-pinned"
  );
  assert.equal(skillCheck.pass, false);
  assert.equal(result.overall, "fail");
});

test("resume-review skill loss or drift fails the methodology dependency", () => {
  const result = evaluateHiringReaderPortfolio({
    resumeSkillTextOverride: "# Different resume-review skill"
  });
  const skillCheck = result.portfolioChecks.find(
    (check) => check.id === "resume-review-skill-pinned"
  );
  assert.equal(skillCheck.pass, false);
  assert.equal(result.overall, "fail");
});

test("a generic untailored summary fails the installed resume-review gate", () => {
  const version = config.versions[0];
  const original = readFileSync(path.join(repoRoot, version.resumePath), "utf8");
  const mutation = original.replace(
    /## Professional Summary[\s\S]*?(?=## Core Skills)/,
    "## Professional Summary\n\nPassionate about building great products and a strategic thinker.\n\n"
  );
  const result = evaluateHiringReaderPortfolio({
    resumeOverrides: { [version.resumePath]: mutation }
  });
  const summaryCheck = result.versions[0].reviewResumeChecks.find(
    (check) => check.id === "professional-summary"
  );
  assert.equal(summaryCheck.pass, false);
  assert.equal(result.versions[0].readerResults[0].modeledVerdict, "fail");
  assert.equal(result.overall, "fail");
});

test("a missing named-reader public-context profile fails closed", () => {
  const mutatedSuite = structuredClone(readerSuite);
  mutatedSuite.opportunityReaders[0].readerPath = "docs/qa/hiring-acceptance/readers/missing.md";
  const result = evaluateHiringReaderPortfolio({ readerSuite: mutatedSuite });
  const reader = result.versions[0].readerResults[0];
  assert.equal(reader.profileBound, false);
  assert.equal(reader.modeledVerdict, "fail");
  assert.equal(result.overall, "fail");
});

test("a maintained pass remains a next-step decision rather than a final-hire claim", () => {
  const result = evaluateHiringReaderPortfolio();
  assert.equal(result.decision, "advance-to-structured-next-step");
  assert.match(result.boundary, /not .* final hiring decision/i);
  for (const version of result.versions) {
    for (const reader of version.readerResults) {
      assert.equal(reader.actualPersonParticipated, false);
      assert.equal(reader.decision, "advance-to-structured-next-step");
      assert.ok(reader.validateNext.length > 20);
    }
  }
});
