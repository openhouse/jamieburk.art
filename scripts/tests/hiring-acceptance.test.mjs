import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { employmentHealth, loadEmploymentContext } from "../knowledge-wiki/employment.mjs";
import { repoRoot } from "../knowledge-wiki/lib.mjs";
import { htmlToPublicText, loadReaderProfiles, loadSuite, sanitizeOpportunity, standardDisclaimer, validateJudgments, validateReaderProfile } from "../hiring-acceptance/lib.mjs";

test("priority roles pass official-source, freshness, coverage, and discovery gates", () => {
  const health = employmentHealth();
  assert.equal(health.status, "pass");
  assert.equal(health.discovery.top_k_recall, 1);
  assert.equal(health.discovery.precision, 1);
  assert.equal(health.discovery.hard_screen_detection, 1);
});

test("stale live-role mutation fails freshness", () => {
  const context = loadEmploymentContext();
  const original = context.opportunities[0].opportunity.reverify_by;
  context.opportunities[0].opportunity.reverify_by = "2026-07-17";
  const health = employmentHealth(context, { asOf: "2026-07-18" });
  context.opportunities[0].opportunity.reverify_by = original;
  assert.equal(health.gates.live_roles_current_as_of, false);
});

test("hiring role context strips Wiki evidence and private locators", () => {
  const context = loadEmploymentContext();
  for (const opportunity of context.opportunities) {
    const serialized = JSON.stringify(sanitizeOpportunity(opportunity));
    assert.doesNotMatch(serialized, /wiki_evidence|public_proof_ids|gap_type|\/Users\/|\/Volumes\//);
  }
});

test("named reader profiles have sources, panels, and full disclaimers", () => {
  const profiles = loadReaderProfiles();
  for (const profile of profiles.values()) assert.deepEqual(validateReaderProfile(profile), []);
  for (const profile of profiles.values()) if (!profile.id.startsWith("reader.generic-")) assert.equal(profile.disclaimer, standardDisclaimer);
  const suite = loadSuite();
  assert.deepEqual([...new Set(suite.developmentReaderIds)].filter((id) => suite.holdoutReaderIds.includes(id)), []);
});

test("missing review and optimizer self-judgment mutations fail", () => {
  const fakeContext = {
    suiteId: "suite", candidateSha: "candidate", portfolioSnapshotHash: "snapshot",
    roleContextHash: "role", readerContextHash: "reader", promptHash: "prompt",
    optimizerIdentity: "optimizer", readers: [{ id: "reader.one" }],
    opportunities: [{ id: "opportunity.one" }], requiredOutput: { disclaimer: "required" },
  };
  const payload = {
    suiteId: "suite", candidateSha: "candidate", portfolioSnapshotHash: "snapshot",
    roleContextHash: "role", readerContextHash: "reader", promptHash: "prompt",
    independentFromOptimizer: true, judgeId: "optimizer", reviews: [],
  };
  const errors = validateJudgments(payload, fakeContext);
  assert.ok(errors.some((item) => item.includes("Independent judgeId")));
  assert.ok(errors.some((item) => item.includes("Missing review")));
});

test("evaluator and resolver remain separate executable surfaces", () => {
  const evaluator = ["lib.mjs", "prepare-context.mjs", "run.mjs"].map((name) => readFileSync(path.join(repoRoot, "scripts/hiring-acceptance", name), "utf8")).join("\n");
  const resolver = readFileSync(path.join(repoRoot, "scripts/hiring-acceptance/resolve-wiki-gaps.mjs"), "utf8");
  assert.doesNotMatch(evaluator, /resolve-wiki-gaps/);
  assert.match(resolver, /reader-consensus\.json/);
  assert.match(resolver, /compileKnowledgeWiki/);
});

test("public snapshot normalization removes executable and style content", () => {
  const text = htmlToPublicText("<style>.hidden{display:none}</style><main>Visible work</main><script>privateVariable()</script>");
  assert.equal(text, "Visible work");
});
