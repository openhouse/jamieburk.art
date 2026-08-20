import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  evaluatePublicResume,
  selectResumeOpportunities
} from "../evals-public-resume-active-opportunities.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "public-resume-eval-"));
  for (const relativePath of [
    "docs/knowledge-bank/opportunities",
    "evals/public-resume",
    "resume-versions/2026-08-20/active-opportunity-portfolio",
    "apps/www/public/resume"
  ]) {
    cpSync(path.join(repoRoot, relativePath), path.join(root, relativePath), { recursive: true });
  }
  return root;
}

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

function writeJson(root, relativePath, value) {
  writeFileSync(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

test("current exact-resume reader run fails closed after the first rejection", () => {
  const result = evaluatePublicResume(repoRoot, { now: "2026-08-20" });
  assert.equal(result.pass, false);
  assert.deepEqual(result.metrics, {
    activeOpportunities: 7,
    coveredOpportunities: 7,
    namedReaders: 9,
    passingReaders: 0,
    readerAssessmentsEvaluated: 1
  });
  assert.equal(result.selectionTier, "open-truthfully-hirable");
  assert.deepEqual(result.phases, { deterministic: "pass", hiringReaders: "fail" });
  assert.match(result.failures.join("\n"), /reader coverage/i);
  assert.match(result.failures.join("\n"), /reader acceptance: Lisa Gelobter/i);
});

test("private active-application input takes precedence over posting state", () => {
  const records = [
    { id: "closed-but-under-consideration", opportunity_status: "closed", hirability_status: "historical-benchmark" },
    { id: "open-role", opportunity_status: "live", hirability_status: "truthfully-hirable" }
  ];
  const selection = selectResumeOpportunities(records, [], {
    activeApplicationOpportunityIds: ["closed-but-under-consideration"]
  });
  assert.deepEqual(selection, {
    tier: "active-applications",
    opportunityIds: ["closed-but-under-consideration"]
  });
});

test("unknown private active-application IDs fail closed", () => {
  const records = [
    { id: "known-role", opportunity_status: "live", hirability_status: "truthfully-hirable" }
  ];
  const selection = selectResumeOpportunities(records, [], {
    activeApplicationOpportunityIds: ["unknown-role"],
    now: "2026-08-20"
  });
  assert.deepEqual(selection, {
    tier: "active-applications-invalid",
    opportunityIds: [],
    unknownOpportunityIds: ["unknown-role"]
  });
});

test("open truthfully hirable roles precede the historical fallback", () => {
  const records = [
    { id: "open-role", opportunity_status: "live", hirability_status: "truthfully-hirable" },
    { id: "closed-best-fit", opportunity_status: "closed", hirability_status: "historical-benchmark" }
  ];
  const selection = selectResumeOpportunities(records, [
    { opportunityId: "closed-best-fit", fitScore: 100 }
  ]);
  assert.deepEqual(selection, {
    tier: "open-truthfully-hirable",
    opportunityIds: ["open-role"]
  });
});

test("a passed application deadline removes a nominally live role", () => {
  const records = [
    {
      id: "expired-live-role",
      opportunity_status: "live",
      hirability_status: "truthfully-hirable",
      application_deadline: "2026-08-19"
    },
    {
      id: "open-role",
      opportunity_status: "live",
      hirability_status: "truthfully-hirable",
      application_deadline: "2026-08-21"
    }
  ];
  const selection = selectResumeOpportunities(records, [], { now: "2026-08-20" });
  assert.deepEqual(selection, {
    tier: "open-truthfully-hirable",
    opportunityIds: ["open-role"]
  });
});

test("no active or open roles selects the top quarter of governed historical fit", () => {
  const records = Array.from({ length: 8 }, (_, index) => ({
    id: `role-${index + 1}`,
    opportunity_status: "closed",
    hirability_status: "historical-benchmark"
  }));
  const ranking = records.map((record, index) => ({
    opportunityId: record.id,
    fitScore: 100 - index
  }));
  const selection = selectResumeOpportunities(records, ranking);
  assert.equal(selection.tier, "top-quartile-historical-fit");
  assert.deepEqual(selection.opportunityIds, ["role-1", "role-2"]);
});

test("a newly active truthfully hirable opportunity cannot be omitted", () => {
  const root = fixture();
  try {
    const source = readFileSync(
      path.join(root, "docs/knowledge-bank/opportunities/asana-ai-implementation.md"),
      "utf8"
    );
    writeFileSync(
      path.join(root, "docs/knowledge-bank/opportunities/fixture-new-role.md"),
      source
        .replace("opportunity.asana.ai-implementation.8027437", "opportunity.fixture.new-role.1")
        .replace("canonical_path: docs/knowledge-bank/opportunities/asana-ai-implementation.md", "canonical_path: docs/knowledge-bank/opportunities/fixture-new-role.md"),
      "utf8"
    );
    const result = evaluatePublicResume(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.match(result.failures.join("\n"), /active opportunity coverage/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("a closed opportunity cannot remain in the public resume acceptance set", () => {
  const root = fixture();
  try {
    const manifestPath = "evals/public-resume/current.json";
    const manifest = readJson(root, manifestPath);
    const opportunityPath = path.join(root, manifest.opportunities[0].opportunityPath);
    const opportunity = readFileSync(opportunityPath, "utf8").replace(
      "opportunity_status: live",
      "opportunity_status: closed"
    );
    writeFileSync(opportunityPath, opportunity, "utf8");
    const result = evaluatePublicResume(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.match(result.failures.join("\n"), /active opportunity coverage/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("stale official-role verification fails closed", () => {
  const root = fixture();
  try {
    const manifestPath = "evals/public-resume/current.json";
    const manifest = readJson(root, manifestPath);
    const opportunityPath = path.join(root, manifest.opportunities[0].opportunityPath);
    const opportunity = readFileSync(opportunityPath, "utf8").replace(
      /verified_at: \d{4}-\d{2}-\d{2}/,
      "verified_at: 2026-08-01"
    );
    writeFileSync(opportunityPath, opportunity, "utf8");
    const result = evaluatePublicResume(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.match(result.failures.join("\n"), /verification freshness/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("missing role language fails the multi-opportunity tailoring gate", () => {
  const root = fixture();
  try {
    const manifestPath = "evals/public-resume/current.json";
    const manifest = readJson(root, manifestPath);
    manifest.opportunities[0].requiredTerms.push("unrepresented fixture capability");
    writeJson(root, manifestPath, manifest);
    const result = evaluatePublicResume(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.match(result.failures.join("\n"), /required role language/i);
    assert.equal(result.metrics.readerAssessmentsEvaluated, 0);
    assert.equal(result.phases.hiringReaders, "not-eligible");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("deterministic-only mode never evaluates reader judgments", () => {
  const result = evaluatePublicResume(repoRoot, {
    now: "2026-08-20",
    deterministicOnly: true
  });
  assert.equal(result.pass, true, JSON.stringify(result.failures, null, 2));
  assert.equal(result.phases.deterministic, "pass");
  assert.equal(result.phases.hiringReaders, "not-run");
  assert.equal(result.metrics.readerAssessmentsEvaluated, 0);
});

test("reader judgments are bound to the exact current resume", () => {
  const root = fixture();
  try {
    const manifestPath = "evals/public-resume/current.json";
    const manifest = readJson(root, manifestPath);
    manifest.readerAssessments[0].resumeSha256 = "0".repeat(64);
    writeJson(root, manifestPath, manifest);
    const result = evaluatePublicResume(root, { now: "2026-08-20" });
    assert.equal(result.pass, false);
    assert.match(result.failures.join("\n"), /reader acceptance/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the public PDF has an independent portfolio lineage", () => {
  const manifest = readJson(repoRoot, "evals/public-resume/current.json");
  const publicPdf = readFileSync(path.join(repoRoot, manifest.resume.publicPdfPath));
  const publicDigest = createHash("sha256").update(publicPdf).digest("hex");
  assert.equal(publicDigest, manifest.resume.pdfSha256);
  assert.notEqual(
    publicDigest,
    createHash("sha256")
      .update(readFileSync(path.join(
        repoRoot,
        "resume-versions/2026-08-14/nyc-oti-senior-product-manager-782366/Jamie-Burkart-Resume-NYC-OTI-Senior-Product-Manager-782366.pdf"
      )))
      .digest("hex")
  );
});
