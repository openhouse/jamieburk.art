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
const suite = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/knowledge-wiki/hiring-suites.json"), "utf8")
);
const namedReader = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/knowledge-wiki/named-reader-acceptance.json"), "utf8")
);

test("every priority and benchmark opportunity resume advances through every modeled reader", () => {
  const result = evaluateHiringReaderPortfolio();
  assert.equal(result.overall, "pass", JSON.stringify(result, null, 2));
  assert.equal(result.summary.maintainedOpportunityVersions, 5);
  assert.equal(result.summary.passingOpportunityVersions, 5);
  assert.equal(result.summary.passingReaderOpportunityPairs, 8);
  assert.equal(result.actualPeopleParticipated, false);
  assert.equal(result.decision, "advance-to-structured-next-step");
});

test("a missing opportunity-specific resume fails closed", () => {
  const missingPath = config.versions[0].resumePath;
  const result = evaluateHiringReaderPortfolio({ resumeOverrides: { [missingPath]: null } });
  assert.equal(result.overall, "fail");
  assert.equal(result.summary.maintainedOpportunityVersions, 4);
  assert.equal(result.versions[0].overall, "fail");
});

test("loss of a reader-specific signal fails that modeled screen", () => {
  const version = config.versions[0];
  const original = readFileSync(path.join(repoRoot, version.resumePath), "utf8");
  const mutation = original
    .replace(/quality assurance/gi, "release support")
    .replace(/bug triage/gi, "issue routing")
    .replace(/test cases/gi, "checks")
    .replace(/regression expectations/gi, "follow-up expectations");
  const result = evaluateHiringReaderPortfolio({
    resumeOverrides: { [version.resumePath]: mutation }
  });
  const zack = result.versions[0].readerResults.find(
    (reader) => reader.pairId === "codepath-zack-parker"
  );
  assert.equal(zack.modeledVerdict, "fail");
  assert.ok(zack.missingSignalGroups.includes("quality-system"));
  assert.equal(result.overall, "fail");
});

test("a fabricated named-reader endorsement fails the artifact safety gate", () => {
  const version = config.versions[0];
  const original = readFileSync(path.join(repoRoot, version.resumePath), "utf8");
  const result = evaluateHiringReaderPortfolio({
    resumeOverrides: {
      [version.resumePath]: `${original}\nZack Parker reviewed and approved this resume.\n`
    }
  });
  const safety = result.versions[0].artifactChecks.find(
    (check) => check.id === "claim-and-endorsement-safety"
  );
  assert.equal(safety.pass, false);
  assert.equal(result.overall, "fail");
});

test("omitting a current opportunity or named-reader pair fails suite coverage", () => {
  const missingOpportunity = structuredClone(config);
  missingOpportunity.versions = missingOpportunity.versions.slice(1);
  const opportunityResult = evaluateHiringReaderPortfolio({
    config: missingOpportunity,
    suite,
    namedReader
  });
  assert.equal(
    opportunityResult.portfolioChecks.find(
      (check) => check.id === "priority-and-benchmark-opportunity-coverage"
    ).pass,
    false
  );
  assert.equal(opportunityResult.overall, "fail");

  const missingPair = structuredClone(config);
  missingPair.versions[0].readerCriteria = missingPair.versions[0].readerCriteria.slice(1);
  const pairResult = evaluateHiringReaderPortfolio({ config: missingPair, suite, namedReader });
  assert.equal(
    pairResult.portfolioChecks.find((check) => check.id === "named-reader-pair-coverage").pass,
    false
  );
  assert.equal(pairResult.overall, "fail");
});

test("the maintained pass remains a next-step decision rather than a final-hire claim", () => {
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
