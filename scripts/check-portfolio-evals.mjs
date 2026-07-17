import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const suitePath = ".agents/evals/portfolio-production-readiness.json";

function walkSource(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkSource(absolute);
    return /\.(?:mdx|tsx)$/.test(entry.name) ? [absolute] : [];
  });
}

export function validatePublicSourceContracts(
  sourceFiles = walkSource("apps/www/src")
) {
  const errors = [];
  const mislabeledResumeAction =
    /<(?:JBButton|Link|a)\b(?=[^>]*\bhref=["']\/resume["'])[^>]*>[\s\S]*?\bDownload resume(?: PDF)?\b[\s\S]*?<\/(?:JBButton|Link|a)>/i;

  for (const file of sourceFiles) {
    const source = typeof file === "string" ? readFileSync(file, "utf8") : file.source;
    const label = typeof file === "string" ? file : file.path;

    if (mislabeledResumeAction.test(source)) {
      errors.push(
        `${label} labels an HTML /resume destination as a download; link to the PDF or use View resume`
      );
    }
    if (/\bambiguous goals\b/i.test(source)) {
      errors.push(`${label} uses ambiguous goals; use emerging goals or equivalent non-shaming language`);
    }
  }

  const homepage = sourceFiles.find((file) =>
    (typeof file === "string" ? file : file.path).endsWith("apps/www/src/app/page.tsx")
  );
  if (homepage) {
    const source = typeof homepage === "string" ? readFileSync(homepage, "utf8") : homepage.source;
    if (/\bOTI\b/.test(source)) {
      errors.push("apps/www/src/app/page.tsx contains an unexplained employer-specific acronym");
    }
  }

  return errors;
}

export function validateChadLensContracts(sources = {}) {
  const errors = [];
  const readSource = (key, relativePath) =>
    sources[key] ?? readFileSync(relativePath, "utf8");
  const hero = readSource("hero", "apps/www/src/components/Hero.tsx");
  const normalizedHero = hero.replace(/\s+/g, " ");
  const work = readSource("work", "apps/www/src/data/work.ts");
  const proofs = readSource("proofs", "apps/www/src/data/proofs.ts");
  const technicalOperations = readSource(
    "technicalOperations",
    "apps/www/src/app/work/technical-operations/page.tsx"
  );

  for (const expected of [
    "Technical Project Manager - Product Operations & Implementation",
    "I create operating structure",
    "requirements, workflows, documentation, decision trails",
    "launch support, onboarding, and durable handoffs"
  ]) {
    if (!normalizedHero.includes(expected)) {
      errors.push(`Hero is missing Chad-lens signal: ${expected}`);
    }
  }

  for (const expected of [
    "Jamie helped an 80+ year-old",
    "Jamie co-founded NYC Artist Coalition",
    "Jamie co-built a Django",
    "Jamie hosts Sunday Dinner"
  ]) {
    if (!work.includes(expected)) {
      errors.push(`Featured work summary is missing an explicit actor: ${expected}`);
    }
  }

  if (!work.includes('"CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"')) {
    errors.push("CallNYC work card is not projected from its governed claim");
  }
  if (/\blightweight\b/i.test(work)) {
    errors.push("Featured public work uses vague lightweight language");
  }

  for (const [label, source] of [
    ["Technical Operations", technicalOperations],
    ["proof bank", proofs]
  ]) {
    if (!/CallNYC[\s\S]{0,220}archived[\s\S]{0,120}unofficial/i.test(source)) {
      errors.push(`${label} does not carry the archived and unofficial CallNYC boundary`);
    }
  }

  return errors;
}

export function validateMorseLensContracts(sources = {}) {
  const errors = [];
  const readSource = (key, relativePath) =>
    sources[key] ?? readFileSync(relativePath, "utf8");
  const about = readSource("about", "apps/www/src/app/about/page.tsx");
  const normalizedAbout = about.replace(/\s+/g, " ");
  const proofs = readSource("proofs", "apps/www/src/data/proofs.ts");
  const records = readSource(
    "records",
    "apps/www/src/data/knowledge-bank/records.ts"
  );

  for (const expected of [
    "Structure grows from the material",
    "artistic, civic, technical, and social",
    "participation, memory, place, and how people inhabit structures"
  ]) {
    if (!normalizedAbout.includes(expected)) {
      errors.push(`About page is missing Margaret Morse lens signal: ${expected}`);
    }
  }

  for (const expected of [
    'id: "creative-technology-embodied-systems"',
    "media archaeology",
    "Art is Long"
  ]) {
    if (!proofs.includes(expected) && !records.includes(expected)) {
      errors.push(`Margaret Morse source contract is missing: ${expected}`);
    }
  }

  if (!records.includes("SRC-UCSC-MARGARET-MORSE-NARRATIVE-EVALS-2006")) {
    errors.push("Margaret Morse narrative evaluation is not registered as protected evidence");
  }
  if (!records.includes("Art is Long and Time Is Long may be title variants")) {
    errors.push("Margaret Morse source contract does not preserve the installation-title uncertainty");
  }

  return errors;
}

export function validateSackLensContracts(sources = {}) {
  const errors = [];
  const readSource = (key, relativePath) =>
    sources[key] ?? readFileSync(relativePath, "utf8");
  const about = readSource("about", "apps/www/src/app/about/page.tsx");
  const normalizedAbout = about.replace(/\s+/g, " ");
  const proofs = readSource("proofs", "apps/www/src/data/proofs.ts");
  const records = readSource(
    "records",
    "apps/www/src/data/knowledge-bank/records.ts"
  );

  for (const expected of [
    "recursively overlapping Flickr groups",
    "Max/MSP and Jitter",
    "social structure could become a usable interface"
  ]) {
    if (!normalizedAbout.includes(expected) && !proofs.includes(expected)) {
      errors.push(`Warren Sack lens is missing public signal: ${expected}`);
    }
  }

  for (const expected of [
    "SRC-UCSC-WARREN-SACK-NARRATIVE-EVALS-2004-2006",
    "PROP-UCSC-SACK-SOCIAL-SOFTWARE-PROTOTYPES-2004-2006",
    "Jamie invented structural equivalence"
  ]) {
    if (!records.includes(expected) && !proofs.includes(expected)) {
      errors.push(`Warren Sack source contract is missing: ${expected}`);
    }
  }

  return errors;
}

export function validateSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(suite.version === 1, "suite.version must be 1");
  requireValue(
    suite.suite_id === "portfolio-production-readiness",
    "suite.suite_id must be portfolio-production-readiness"
  );
  requireValue(
    Array.isArray(suite.hard_constraints) && suite.hard_constraints.length > 0,
    "suite.hard_constraints must be a non-empty array"
  );
  requireValue(
    Array.isArray(suite.evals) && suite.evals.length > 0,
    "suite.evals must be a non-empty array"
  );

  const ids = new Set();
  let totalWeight = 0;
  let blockingCount = 0;
  const allowedGraders = new Set([
    "deterministic",
    "llm_judge",
    "human_approval",
    "hybrid"
  ]);

  for (const [index, entry] of (suite.evals ?? []).entries()) {
    const prefix = `suite.evals[${index}]`;
    requireValue(
      typeof entry.id === "string" && /^PR-\d{3}$/.test(entry.id),
      `${prefix}.id must use PR-### format`
    );
    requireValue(!ids.has(entry.id), `${prefix}.id must be unique`);
    ids.add(entry.id);
    requireValue(
      typeof entry.title === "string" && entry.title.trim().length > 0,
      `${prefix}.title is required`
    );
    requireValue(allowedGraders.has(entry.grader), `${prefix}.grader is invalid`);
    requireValue(
      typeof entry.blocking === "boolean",
      `${prefix}.blocking must be boolean`
    );
    requireValue(
      Number.isInteger(entry.weight) && entry.weight > 0,
      `${prefix}.weight must be a positive integer`
    );
    requireValue(
      Array.isArray(entry.inputs) && entry.inputs.length > 0,
      `${prefix}.inputs must be non-empty`
    );
    requireValue(
      Array.isArray(entry.procedure) && entry.procedure.length > 0,
      `${prefix}.procedure must be non-empty`
    );
    requireValue(
      Array.isArray(entry.pass_criteria) && entry.pass_criteria.length > 0,
      `${prefix}.pass_criteria must be non-empty`
    );
    requireValue(
      Array.isArray(entry.evidence_required) && entry.evidence_required.length > 0,
      `${prefix}.evidence_required must be non-empty`
    );
    requireValue(
      typeof entry.remediation_hint === "string" &&
        entry.remediation_hint.trim().length > 0,
      `${prefix}.remediation_hint is required`
    );

    totalWeight += Number.isInteger(entry.weight) ? entry.weight : 0;
    if (entry.blocking) blockingCount += 1;
  }

  requireValue(
    totalWeight === 100,
    `eval weights must total 100; received ${totalWeight}`
  );
  requireValue(blockingCount > 0, "suite must include at least one blocking eval");
  const chadLensEval = suite.evals?.find((entry) => entry.id === "PR-015");
  requireValue(chadLensEval?.blocking === true, "PR-015 Chad lens eval must be blocking");
  requireValue(
    suite.application_share_thresholds?.required_eval_ids?.includes("PR-015"),
    "application sharing must require PR-015 Chad lens"
  );
  for (const [id, label] of [
    ["PR-016", "Margaret Morse"],
    ["PR-017", "Warren Sack"]
  ]) {
    const lens = suite.evals?.find((entry) => entry.id === id);
    requireValue(lens?.blocking === true, `${id} ${label} lens eval must be blocking`);
    requireValue(
      suite.application_share_thresholds?.required_eval_ids?.includes(id),
      `application sharing must require ${id} ${label} lens`
    );
  }

  const validateThresholds = (name, thresholds, production = false) => {
    requireValue(typeof thresholds === "object" && thresholds !== null, `${name} is required`);
    requireValue(
      typeof thresholds?.weighted_score_minimum === "number" &&
        thresholds.weighted_score_minimum >= 0 &&
        thresholds.weighted_score_minimum <= 1,
      `${name}.weighted_score_minimum must be between 0 and 1`
    );
    for (const field of ["blocking_score_minimum", "nonblocking_score_minimum"]) {
      requireValue(
        Number.isInteger(thresholds?.[field]) &&
          thresholds[field] >= suite.score_scale.minimum &&
          thresholds[field] <= suite.score_scale.maximum,
        `${name}.${field} must fit the score scale`
      );
    }
    if (Array.isArray(thresholds?.required_eval_ids)) {
      for (const id of thresholds.required_eval_ids) {
        requireValue(ids.has(id), `${name}.required_eval_ids contains unknown eval ${id}`);
      }
    }
    if (production) {
      requireValue(
        thresholds?.all_blocking_evals_must_pass === true,
        "all production blocking evals must pass"
      );
      requireValue(
        thresholds?.holdout_regression_must_pass === true,
        "production holdout regression must pass"
      );
      requireValue(
        thresholds?.two_consecutive_passing_runs_required === true,
        "production requires two consecutive passing runs"
      );
      requireValue(
        thresholds?.human_production_approval_required === true,
        "human production approval must be required"
      );
    } else {
      requireValue(
        thresholds?.human_approval_required === true,
        "human application-share approval must be required"
      );
    }
  };

  validateThresholds(
    "application_share_thresholds",
    suite.application_share_thresholds
  );
  validateThresholds(
    "production_launch_thresholds",
    suite.production_launch_thresholds,
    true
  );

  requireValue(
    suite.optimization?.rubric_is_frozen_during_run === true,
    "optimizer must freeze the rubric during a run"
  );
  requireValue(
    suite.optimization?.optimizer_may_not_grade_own_patch === true,
    "optimizer may not grade its own patch"
  );
  requireValue(
    suite.optimization?.holdout_judge_is_blind_to_patch_intent === true,
    "holdout judge must be blind to patch intent"
  );
  requireValue(
    suite.optimization?.success_requires_two_consecutive_passing_runs === true,
    "optimizer success requires two consecutive passing runs"
  );

  requireValue(
    Array.isArray(suite.grader_output_schema?.required) &&
      suite.grader_output_schema.required.length > 0,
    "grader_output_schema.required must be non-empty"
  );
  requireValue(
    Array.isArray(suite.iteration_record_schema?.required) &&
      suite.iteration_record_schema.required.length > 0,
    "iteration_record_schema.required must be non-empty"
  );
  requireValue(
    Array.isArray(suite.iteration_record_schema?.allowed_decisions) &&
      suite.iteration_record_schema.allowed_decisions.includes("stop_human_blocked"),
    "iteration records must support stop_human_blocked"
  );
  requireValue(
    Array.isArray(suite.run_record_schema?.required) &&
      suite.run_record_schema.required.includes("candidate_sha") &&
      suite.run_record_schema.required.includes("human_approval"),
    "run records must bind human approval to a candidate"
  );
  requireValue(
    Array.isArray(suite.run_record_schema?.allowed_targets) &&
      suite.run_record_schema.allowed_targets.includes("application-share") &&
      suite.run_record_schema.allowed_targets.includes("production-launch"),
    "run records must support application-share and production-launch targets"
  );

  return { errors, totalWeight, blockingCount, evalCount: suite.evals?.length ?? 0 };
}

function run() {
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const result = validateSuite(suite);
  const sourceErrors = validatePublicSourceContracts();
  const chadLensErrors = validateChadLensContracts();
  const morseLensErrors = validateMorseLensContracts();
  const sackLensErrors = validateSackLensContracts();

  if (
    result.errors.length ||
    sourceErrors.length ||
    chadLensErrors.length ||
    morseLensErrors.length ||
    sackLensErrors.length
  ) {
    console.error("Portfolio eval suite validation failed:");
    for (const error of [
      ...result.errors,
      ...sourceErrors,
      ...chadLensErrors,
      ...morseLensErrors,
      ...sackLensErrors
    ]) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `Portfolio eval suite passed: ${result.evalCount} evals, ` +
      `${result.blockingCount} blocking, weights total ${result.totalWeight}.`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
