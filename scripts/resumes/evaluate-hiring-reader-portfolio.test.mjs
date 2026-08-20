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
const selectionConfig = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/resumes/public-resume-selection.json"), "utf8")
);

test("every priority and benchmark opportunity resume clears deterministic reader preflight", () => {
  const result = evaluateHiringReaderPortfolio();
  assert.equal(result.overall, "pass", JSON.stringify(result, null, 2));
  assert.equal(result.summary.maintainedOpportunityVersions, 9);
  assert.equal(result.summary.passingOpportunityVersions, 9);
  assert.equal(result.summary.passingReaderOpportunityPreflights, 16);
  assert.equal(result.actualPeopleParticipated, false);
  assert.equal(result.decision, "eligible-for-fictionalized-model-review");
});

test("one public resume preflights through every lifecycle-selected reader lens", () => {
  const result = evaluateHiringReaderPortfolio();

  assert.ok(result.publicResume, "The evaluator must expose the maintained public resume.");
  assert.deepEqual(
    [...result.publicResume.activeOpportunityIds].sort(),
    [...selectionConfig.expectedCurrentSelection.opportunityIds].sort()
  );
  assert.equal(result.publicResume.overall, "pass", JSON.stringify(result.publicResume, null, 2));
  assert.equal(result.publicResume.readerResults.length, 2);
  assert.equal(
    result.publicResume.readerResults.filter((reader) => reader.preflightVerdict === "pass").length,
    2
  );
});

test("hard-screened high-affinity roles cannot enter the public resume target set", () => {
  assert.ok(Array.isArray(suite.excludedOpportunityIds));

  const studio3 = suite.excludedOpportunityIds.find(
    (entry) => entry.opportunityId === "opportunity.uibk.studio3.postdoc.arch-15927"
  );
  assert.equal(studio3?.disposition, "exclude-hard-screen");
  assert.ok(studio3?.hardScreens.includes("completed architecture doctorate or PhD"));
  assert.equal(
    selectionConfig.expectedCurrentSelection.opportunityIds.includes(studio3.opportunityId),
    false
  );
});

test("a missing opportunity-specific resume fails closed", () => {
  const missingPath = config.versions[0].resumePath;
  const result = evaluateHiringReaderPortfolio({ resumeOverrides: { [missingPath]: null } });
  assert.equal(result.overall, "fail");
  assert.equal(result.summary.maintainedOpportunityVersions, 8);
  assert.equal(result.versions[0].overall, "fail");
});

test("loss of a reader-specific signal blocks the model review preflight", () => {
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
  assert.equal(zack.preflightVerdict, "fail");
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

test("the maintained pass authorizes model review rather than claiming a hire decision", () => {
  const result = evaluateHiringReaderPortfolio();
  assert.equal(result.decision, "eligible-for-fictionalized-model-review");
  assert.match(result.boundary, /not .* final hiring decision/i);
  for (const version of result.versions) {
    for (const reader of version.readerResults) {
      assert.equal(reader.actualPersonParticipated, false);
      assert.equal(reader.decision, "eligible-for-fictionalized-model-review");
      assert.ok(reader.validateNext.length > 20);
    }
  }
});

test("every tracked open opportunity has an exact tailored Markdown and PDF path", () => {
  const tracked = new Set(suite.trackedOpenTruthfullyHirableOpportunityIds);
  const configured = new Map(
    selectionConfig.opportunities.map((opportunity) => [opportunity.opportunityId, opportunity])
  );

  for (const opportunityId of tracked) {
    const opportunity = configured.get(opportunityId);
    assert.ok(opportunity, `${opportunityId} must be lifecycle-configured`);
    assert.match(opportunity.resumeMarkdownPath ?? "", /^resumes\/.+\.md$/);
    assert.match(opportunity.resumePdfPath ?? "", /^resumes\/.+\.pdf$/);
  }
});
