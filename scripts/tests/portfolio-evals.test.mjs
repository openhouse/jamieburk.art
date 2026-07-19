import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { technicalOperationsProofRows } from "../../apps/www/src/data/proofs.ts";
import { validateSuite } from "../check-portfolio-evals.mjs";

const suite = JSON.parse(
  readFileSync(".agents/evals/portfolio-production-readiness.json", "utf8")
);

const cloneSuite = () => structuredClone(suite);
const nycacCaseStudy = readFileSync(
  "apps/www/src/content/work/nyc-artist-coalition.mdx",
  "utf8"
);
const technicalOperationsPage = readFileSync(
  "apps/www/src/app/work/technical-operations/page.tsx",
  "utf8"
);
const wowlistCaseStudy = readFileSync("apps/www/src/content/work/wowlist.mdx", "utf8");
const sundayDinnerCaseStudy = readFileSync(
  "apps/www/src/content/work/196-sunday-dinner.mdx",
  "utf8"
);
const aboutPage = readFileSync("apps/www/src/app/about/page.tsx", "utf8");
const ucscLensRecords = readFileSync(
  "apps/www/src/data/knowledge-bank/ucsc-lenses.ts",
  "utf8"
);

test("canonical portfolio eval suite is valid", () => {
  assert.deepEqual(validateSuite(suite).errors, []);
});

test("weights must total 100", () => {
  const candidate = cloneSuite();
  candidate.evals[0].weight += 1;
  assert.match(validateSuite(candidate).errors.join("\n"), /weights must total 100/);
});

test("application threshold cannot require an unknown eval", () => {
  const candidate = cloneSuite();
  candidate.application_share_thresholds.required_eval_ids.push("PR-999");
  assert.match(validateSuite(candidate).errors.join("\n"), /unknown eval PR-999/);
});

test("optimizer cannot grade its own patch", () => {
  const candidate = cloneSuite();
  candidate.optimization.optimizer_may_not_grade_own_patch = false;
  assert.match(validateSuite(candidate).errors.join("\n"), /may not grade its own patch/);
});

test("production requires repeat passing runs and human approval", () => {
  const candidate = cloneSuite();
  candidate.production_launch_thresholds.two_consecutive_passing_runs_required = false;
  candidate.production_launch_thresholds.human_production_approval_required = false;
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /two consecutive passing runs/);
  assert.match(errors, /human production approval/);
});

test("iteration records preserve the human-blocked stop state", () => {
  const candidate = cloneSuite();
  candidate.iteration_record_schema.allowed_decisions = ["accept", "reject"];
  assert.match(validateSuite(candidate).errors.join("\n"), /stop_human_blocked/);
});

test("Chad lens remains a blocking application-share eval", () => {
  const candidate = cloneSuite();
  const chadLens = candidate.evals.find((entry) => entry.id === "PR-015");
  chadLens.blocking = false;
  candidate.application_share_thresholds.required_eval_ids =
    candidate.application_share_thresholds.required_eval_ids.filter(
      (id) => id !== "PR-015"
    );
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /Chad lens eval must be blocking/);
  assert.match(errors, /application-share threshold must require PR-015/);
});

test("knowledge lifecycle keeps intake and maturation as blocking gates", () => {
  const candidate = cloneSuite();
  candidate.evals.find((entry) => entry.id === "PR-016").blocking = false;
  candidate.application_share_thresholds.required_eval_ids =
    candidate.application_share_thresholds.required_eval_ids.filter(
      (id) => id !== "PR-017"
    );
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /PR-016 knowledge-lifecycle eval must be blocking/);
  assert.match(errors, /application-share threshold must require PR-017/);
});

test("all seven blind-spot evals remain in the frozen suite", () => {
  const candidate = cloneSuite();
  candidate.evals = candidate.evals.filter((entry) => entry.id !== "PR-023");
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /suite must include PR-023 blind-spot eval/);
});

test("market validation and hands-on QA cannot become self-graded", () => {
  const candidate = cloneSuite();
  candidate.evals.find((entry) => entry.id === "PR-019").grader = "llm_judge";
  candidate.evals.find((entry) => entry.id === "PR-025").blocking = false;
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /PR-019 must remain a human-approval eval/);
  assert.match(errors, /PR-025 human eval must remain blocking/);
});

test("Morse and Sack lenses remain blocking application-share evals", () => {
  const candidate = cloneSuite();
  candidate.evals.find((entry) => entry.id === "PR-026").blocking = false;
  candidate.evals.find((entry) => entry.id === "PR-027").grader = "hybrid";
  candidate.application_share_thresholds.required_eval_ids =
    candidate.application_share_thresholds.required_eval_ids.filter(
      (id) => !["PR-026", "PR-027"].includes(id)
    );
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /PR-026 faculty-lens eval must be blocking/);
  assert.match(errors, /PR-027 faculty-lens eval must use an independent LLM judge/);
  assert.match(errors, /application-share threshold must require PR-026/);
  assert.match(errors, /application-share threshold must require PR-027/);
});

test("application share keeps composition, impact, recency, and readers required", () => {
  const candidate = cloneSuite();
  candidate.application_share_thresholds.required_eval_ids =
    candidate.application_share_thresholds.required_eval_ids.filter(
      (id) => !["PR-019", "PR-020", "PR-022", "PR-024"].includes(id)
    );
  const errors = validateSuite(candidate).errors.join("\n");
  for (const id of ["PR-019", "PR-020", "PR-022", "PR-024"]) {
    assert.match(errors, new RegExp(`application-share threshold must require ${id}`));
  }
});

test("flagship civic composition retains its operating pattern and causality limits", () => {
  for (const requiredText of [
    "co-founded NYC Artist Coalition",
    "<NYCACOperatingTimeline />",
    "CLM-NYCAC-CABARET-ADVOCACY",
    "CLM-NYCAC-OFFICE-NIGHTLIFE-TOWN-HALL",
    "CLM-TALKS-NOT-RAIDS-ADVOCACY",
    "CLM-MARCH-TRANSPARENCY-TO-CURE",
    "not a single-person causal claim"
  ]) {
    assert.match(nycacCaseStudy, new RegExp(requiredText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("recent capability bridge remains on the primary role-fit path", () => {
  assert.match(technicalOperationsPage, /Recent evidence, clearly bounded/);
  assert.equal((technicalOperationsPage.match(/period: "2026"/g) ?? []).length, 3);
  for (const label of [
    "Source-backed team memory",
    "Public-data product framing",
    "AI evaluation practice"
  ]) {
    assert.match(technicalOperationsPage, new RegExp(label));
  }
});

test("three lead pages retain source-backed semantic figures", () => {
  assert.match(nycacCaseStudy, /<NYCACOperatingTimeline \/>/);
  assert.match(wowlistCaseStudy, /<WowlistArchiveSnapshot \/>/);
  assert.match(sundayDinnerCaseStudy, /<SundayDinnerOperationsFigure \/>/);
});

test("every Technical Operations capability has a deeper proof destination", () => {
  assert.ok(technicalOperationsProofRows.length >= 4);
  for (const row of technicalOperationsProofRows) {
    assert.ok(row.proofs.length > 0, `${row.capability} needs proof`);
    assert.ok(row.destinations.length > 0, `${row.capability} needs a destination`);
    assert.ok(
      row.destinations.every(({ href, label }) => href.startsWith("/") && label),
      `${row.capability} needs labeled internal destinations`
    );
  }
});

test("About preserves one source-backed artistic and recursive systems threshold", () => {
  for (const requiredText of [
    "One practice, many forms",
    "CLM-OPEN-HOUSE-PARTICIPATORY-PRACTICE",
    "CLM-UCSC-SACK-RECURSIVE-SOCIAL-SYSTEMS",
    "CLM-CALLNYC-RECURSIVE-METHOD",
    "CLM-NYCAC-RECURSIVE-METHOD",
    "open-house-throughline",
    "relational-systems-throughline",
    "create a structure people can enter",
    "what atmosphere makes possible",
    "A recursive method in practice",
    "open-house-recursive-method",
    "callnyc-recursive-method",
    "nycac-recursive-method"
  ]) {
    assert.match(aboutPage, new RegExp(requiredText));
  }

  const aboutCitations = knowledgeBank.pages.find((page) => page.id === "about");
  assert.deepEqual(aboutCitations?.sourceOrder, [
    "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
    "SRC-CALLNYC-POLITICO-2016-03-14",
    "SRC-CALLNYC-X-API-2016",
    "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
    "SRC-NYCAC-GOTHAMIST-2017-06-19"
  ]);
  assert.equal(aboutCitations?.occurrences.length, 5);
});

test("UCSC lens records expose summaries, not protected academic data", () => {
  for (const forbidden of [
    /0120470/,
    /EMERGENCY-BACKUP/,
    /memorse@/i,
    /morse@ucsc/i,
    /jamie@kc\.rr\.com/i,
    /831[ .-]?459/i
  ]) {
    assert.doesNotMatch(ucscLensRecords, forbidden);
  }

  const morse = knowledgeBank.sources.find(
    (source) => source.id === "SRC-UCSC-MORSE-NARRATIVE-EVALUATIONS-2006"
  );
  const sack = knowledgeBank.sources.find(
    (source) => source.id === "SRC-UCSC-SACK-NARRATIVE-EVALUATIONS-2004-2006"
  );
  assert.equal(morse?.visibility, "public-metadata-only");
  assert.equal(sack?.visibility, "public-metadata-only");

  for (const claimId of [
    "CLM-UCSC-MORSE-EMBODIED-MEDIA-PRACTICE",
    "CLM-UCSC-SACK-RECURSIVE-SOCIAL-SYSTEMS"
  ]) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    assert.ok(claim);
    assert.ok(
      claim.evidence
        .filter((item) => item.relationship === "private-support")
        .every((item) => item.renderCitation === false)
    );
  }
});
