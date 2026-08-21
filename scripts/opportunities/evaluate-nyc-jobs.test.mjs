import assert from "node:assert/strict";
import { mkdtempSync, cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { evaluateOpportunitySystem } from "./evaluate-nyc-jobs.mjs";

const repoRoot = path.resolve(import.meta.dirname, "../..");

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "nyc-jobs-eval-"));
  const copy = (relative) => {
    const target = path.join(root, relative);
    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(path.join(repoRoot, relative), target, { recursive: true });
  };
  for (const relative of [
    "config/opportunities/nyc-jobs.json",
    "config/opportunities/sources.json",
    "config/opportunities/civic-match.json",
    "config/opportunities/betanyc-newsletter.json",
    "evals/opportunities/nyc-jobs.json",
    "evals/opportunities/civic-match.json",
    "evals/opportunities/betanyc-newsletter.json",
    "evals/opportunities/runs/2026-08-21-civic-match-hill-climb.json",
    "evals/resumes/public-resume-selection.json",
    "evals/resumes/artifacts/public-technical-project-manager-pdf.json",
    "evals/knowledge-wiki/named-hiring-readers.json",
    "reports/opportunities/nyc-jobs-qualified.json",
    "reports/opportunities/nyc-jobs-digest.md",
    "reports/opportunities/betanyc-newsletter-current.json",
    "docs/knowledge-bank/sources/nyc-jobs-open-data.md",
    "docs/knowledge-bank/sources/civic-match.md",
    "docs/knowledge-bank/sources/betanyc-newsletter.md",
    "docs/knowledge-bank/evaluations/civic-match-opportunity-source.md",
    "docs/knowledge-bank/evaluations/betanyc-newsletter-opportunity-source.md",
    "docs/knowledge-bank/evaluations/nyc-jobs-opportunity-feed.md",
    "docs/qa/hiring-acceptance/readers",
    "application-guides/2026-08-21/civic-match/Jamie-Burkart-Civic-Match-Signup-Guide.md",
    "rfcs/0007-nyc-jobs-opportunity-action-loop.md",
    ".env.example"
  ]) {
    copy(relative);
  }
  const report = JSON.parse(
    readFileSync(path.join(root, "reports/opportunities/nyc-jobs-qualified.json"), "utf8")
  );
  for (const opportunity of report.admitted) {
    const relative = `docs/knowledge-bank/opportunities/nyc-jobs-${opportunity.jobId}.md`;
    const target = path.join(root, relative);
    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(path.join(repoRoot, relative), target);
  }
  copy("docs/knowledge-bank/opportunities/polimorphic-product-manager-123173.md");
  const selection = JSON.parse(
    readFileSync(path.join(repoRoot, "evals/resumes/public-resume-selection.json"), "utf8")
  );
  for (const candidate of selection.candidates) copy(candidate.opportunityPath);
  for (const resumeSet of selection.resumeSets) copy(resumeSet.resumePath);
  return root;
}

test("the committed NYC Jobs opportunity loop clears every deterministic gate", () => {
  const result = evaluateOpportunitySystem({ root: repoRoot });

  assert.equal(result.overall, "pass");
  assert.ok(result.checks.every((check) => check.pass));
  assert.ok(result.admittedCount > 0);
  assert.ok(result.actionableCount >= result.admittedCount);
});

test("the opportunity system preserves each source's distinct affordances", () => {
  const result = evaluateOpportunitySystem({ root: repoRoot });
  const byId = Object.fromEntries(result.sourceRegistry.sources.map((source) => [source.id, source]));

  assert.equal(result.sourceRegistry.sources.length, 3);
  assert.equal(byId["nyc-jobs-open-data"].machineReadable, true);
  assert.equal(byId["nyc-jobs-open-data"].recruiterDiscovery, false);
  assert.equal(byId["civic-match"].machineReadable, false);
  assert.equal(byId["civic-match"].recruiterDiscovery, true);
  assert.equal(byId["civic-match"].profileVisibilityControls, true);
  assert.equal(byId["civic-match"].privateIntake, true);
  assert.equal(byId["betanyc-newsletter"].machineReadable, false);
  assert.equal(byId["betanyc-newsletter"].editorialCuration, true);
  assert.equal(byId["betanyc-newsletter"].recurringEmail, true);
  assert.equal(byId["betanyc-newsletter"].crossSourceEnrichment, true);
});

test("the current BetaNYC edition is fresh, public-safe, deduplicated, and strongly gated", () => {
  const result = evaluateOpportunitySystem({ root: repoRoot });

  assert.equal(result.betaNyc.deterministicPass, true);
  assert.equal(result.betaNyc.latestEditionDate, "2026-08-20");
  assert.deepEqual(result.betaNyc.promotedOpportunityIds, [
    "opportunity.nyc-jobs.792925",
    "opportunity.nyc-jobs.792692",
    "opportunity.polimorphic.product-manager.123173"
  ]);
  assert.deepEqual(result.betaNyc.newOpportunityIds, [
    "opportunity.polimorphic.product-manager.123173"
  ]);
  assert.equal(result.betaNyc.llmGate.status, "queued-not-run");
  assert.equal(result.betaNyc.llmGate.queuedCalls, 2);
});

test("a stale BetaNYC edition fails before modeled-reader work", () => {
  const root = fixture();
  const configPath = path.join(root, "config/opportunities/betanyc-newsletter.json");
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  config.asOf = "2026-09-15";
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);

  const result = evaluateOpportunitySystem({ root });

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "betanyc-edition-freshness").pass, false);
  assert.equal(result.betaNyc.llmGate.queuedCalls, 0);
});

test("recipient tracking in a BetaNYC destination fails the public boundary", () => {
  const root = fixture();
  const reportPath = path.join(root, "reports/opportunities/betanyc-newsletter-current.json");
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  report.leads[0].canonicalUrl += "?mc_eid=private-recipient-token";
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  const result = evaluateOpportunitySystem({ root });

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "betanyc-public-safe-destinations").pass, false);
});

test("a below-threshold BetaNYC promotion fails before modeled-reader work", () => {
  const root = fixture();
  const reportPath = path.join(root, "reports/opportunities/betanyc-newsletter-current.json");
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  const promoted = report.leads.find((lead) => lead.opportunityId === "opportunity.polimorphic.product-manager.123173");
  promoted.combinedScore = report.threshold.combined - 0.1;
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  const result = evaluateOpportunitySystem({ root });

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "betanyc-strong-admission-threshold").pass, false);
  assert.equal(result.betaNyc.llmGate.queuedCalls, 0);
});

test("Civic Match releases audience-correct modeled-reader packets only after deterministic checks", () => {
  const result = evaluateOpportunitySystem({ root: repoRoot });
  const helperPackets = result.civicMatch.llmGate.queue.filter((item) => item.audience === "civic-match-helper");
  const hiringPackets = result.civicMatch.llmGate.queue.filter((item) => item.audience === "opportunity-hiring-reader");

  assert.equal(result.civicMatch.deterministicPass, true);
  assert.equal(helperPackets.length, 2);
  assert.ok(hiringPackets.length > 0);
  assert.ok(helperPackets.every((item) => item.materials.includes("private-intake-answers")));
  assert.ok(hiringPackets.every((item) => !item.materials.includes("private-intake-answers")));
  assert.ok(hiringPackets.every((item) => item.materials.includes("employer-visible-profile")));
});

test("a below-threshold admitted record fails the strong-match gate", () => {
  const root = fixture();
  const reportPath = path.join(root, "reports/opportunities/nyc-jobs-qualified.json");
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  report.admitted[0].combinedScore = report.threshold.combined - 0.1;
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  const result = evaluateOpportunitySystem({ root });

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "strong-admission-threshold").pass, false);
});

test("a literal digest recipient in public configuration fails the credential boundary", () => {
  const root = fixture();
  const configPath = path.join(root, "config/opportunities/nyc-jobs.json");
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  config.delivery.recipient = "person@example.org";
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);

  const result = evaluateOpportunitySystem({ root });

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "email-secret-boundary").pass, false);
});

test("an over-limit Civic Match essay blocks modeled-reader work", () => {
  const root = fixture();
  const guidePath = path.join(
    root,
    "application-guides/2026-08-21/civic-match/Jamie-Burkart-Civic-Match-Signup-Guide.md"
  );
  const guide = readFileSync(guidePath, "utf8");
  const overLimit = `${"word ".repeat(301).trim()}`;
  writeFileSync(
    guidePath,
    guide.replace(
      /(### Private answer 1 — government impact[\s\S]*?```text\n)[\s\S]*?(\n```)/,
      `$1${overLimit}$2`
    )
  );

  const result = evaluateOpportunitySystem({ root });

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "civic-private-essay-limits").pass, false);
  assert.equal(result.civicMatch.llmGate.allowed, false);
  assert.equal(result.civicMatch.llmGate.queue.length, 0);
});

test("leaking private intake to an opportunity reader blocks modeled-reader work", () => {
  const root = fixture();
  const rubricPath = path.join(root, "evals/opportunities/civic-match.json");
  const rubric = JSON.parse(readFileSync(rubricPath, "utf8"));
  rubric.audienceContracts["opportunity-hiring-reader"].materials.push("private-intake-answers");
  writeFileSync(rubricPath, `${JSON.stringify(rubric, null, 2)}\n`);

  const result = evaluateOpportunitySystem({ root });

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "civic-audience-packet-boundary").pass, false);
  assert.equal(result.civicMatch.llmGate.queue.length, 0);
});

test("granting Civic Match helpers government hiring authority fails closed", () => {
  const root = fixture();
  const rubricPath = path.join(root, "evals/opportunities/civic-match.json");
  const rubric = JSON.parse(readFileSync(rubricPath, "utf8"));
  rubric.audienceContracts["civic-match-helper"].authorityBoundary =
    "The helper makes the final government hiring decision.";
  writeFileSync(rubricPath, `${JSON.stringify(rubric, null, 2)}\n`);

  const result = evaluateOpportunitySystem({ root });

  assert.equal(result.overall, "fail");
  assert.equal(result.checks.find((check) => check.id === "civic-helper-authority-boundary").pass, false);
  assert.equal(result.civicMatch.llmGate.queue.length, 0);
});
