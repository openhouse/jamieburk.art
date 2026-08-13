import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const runnerPath = path.join(repoRoot, "scripts/evals-hiring-reader-acceptance.mjs");

const readerPairs = [
  ["person.terence-dougherty", "Terence Dougherty", "opportunity.aclu.senior-project-manager-lps.8620968002", "senior-vision"],
  ["person.aileen-palmer", "Aileen Palmer", "opportunity.benepass.product-operations.7f963a7a", "likely-direct-report"],
  ["person.jaclyn-chen", "Jaclyn Chen", "opportunity.benepass.product-operations.7f963a7a", "senior-vision"],
  ["person.james-williams-aclu", "James Williams", "opportunity.aclu.senior-project-manager-national-campaigns.8631854002", "likely-direct-report"],
  ["person.deirdre-schifeling", "Deirdre Schifeling", "opportunity.aclu.senior-project-manager-national-campaigns.8631854002", "senior-vision"],
  ["person.luke-farrell", "Luke Farrell", "opportunity.nyc-oti.senior-product-manager.782366", "likely-direct-report"],
  ["person.lisa-gelobter", "Lisa Gelobter", "opportunity.nyc-oti.senior-product-manager.782366", "senior-vision"]
];

function passingRun() {
  return {
    schemaVersion: 1,
    target: {
      candidateGitRev: "0123456789abcdef0123456789abcdef01234567",
      publicSurfaceDigest: "a".repeat(64),
      url: "https://staging-c.jamieburk.art"
    },
    acceptanceQuestion: "I would hire this person for this job.",
    passPolicy: "unanimous-named-readers",
    evaluations: readerPairs.map(([personId, name, opportunityId, relationship], index) => ({
      id: `reader-${index + 1}`,
      opportunityId,
      reader: {
        personId,
        name,
        relationship,
        reportingLineConfirmed: personId === "person.aileen-palmer"
      },
      simulatedPublicFigureLens: true,
      nonEndorsementBoundary:
        "This is a fictionalized evaluation based on public role context, not participation or endorsement by the named person.",
      access: {
        scope: "public-web-only",
        repositoryAccess: false,
        privateSourceAccess: false
      },
      isolation: {
        taskId: `sandboxed-reader-${index + 1}`,
        separateChat: true,
        priorReaderOutputsAvailable: false
      },
      visitedRoutes: ["/", "/work/technical-operations", "/resume"],
      decision: "pass",
      wouldHireForRole: true,
      confidence: "moderate",
      evidence: [
        {
          route: "/work/technical-operations",
          observation: "The public page shows delivery coordination, risk visibility, and maintained operating documentation."
        }
      ],
      strengths: ["Role-relevant operating structure is visible."],
      risks: ["Interview evidence should make decision authority more concrete."],
      constructiveCritique: ["Lead with the strongest role-specific decision and outcome."],
      blockingReasons: []
    }))
  };
}

function run(candidate) {
  return spawnSync(process.execPath, [runnerPath, "--stdin"], {
    cwd: repoRoot,
    encoding: "utf8",
    input: JSON.stringify(candidate)
  });
}

test("seven public-surface hiring readers can unanimously satisfy the acceptance gate", () => {
  const result = run(passingRun());
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.passed, true);
  assert.equal(report.metrics.expectedReaders, 7);
  assert.equal(report.metrics.acceptedReaders, 7);
});

test("a contextual operating lead cannot be promoted into a confirmed direct manager", () => {
  const candidate = passingRun();
  const luke = candidate.evaluations.find(
    (evaluation) => evaluation.reader.personId === "person.luke-farrell"
  );
  luke.reader.reportingLineConfirmed = true;
  const result = run(candidate);
  assert.notEqual(result.status, 0, "unconfirmed reporting relationships must fail closed");
  const report = JSON.parse(result.stdout);
  assert.match(report.failures.join("\n"), /reporting-line certainty/);
});

test("repository and knowledge-bank paths cannot count as hiring-reader evidence", () => {
  const candidate = passingRun();
  candidate.evaluations[0].visitedRoutes.push(
    "/docs/knowledge-bank/opportunities/aclu-senior-project-manager-lps.md"
  );
  const result = run(candidate);
  assert.notEqual(result.status, 0, "non-public repository paths must fail closed");
  const report = JSON.parse(result.stdout);
  assert.match(report.failures.join("\n"), /canonical public portfolio routes/);
});

test("each named reader must come from a separate unanchored evaluation task", () => {
  const candidate = passingRun();
  candidate.evaluations[1].isolation.taskId = candidate.evaluations[0].isolation.taskId;
  const result = run(candidate);
  assert.notEqual(result.status, 0, "reused evaluator chats must fail closed");
  const report = JSON.parse(result.stdout);
  assert.match(report.failures.join("\n"), /separate sandboxed task/);
});
