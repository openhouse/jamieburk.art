#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const rfcPath = "rfcs/0012-public-engagement-pathway.md";
const contractPath = "rfcs/0012-public-engagement-pathway.contract.json";
const suitePath = "evals/knowledge-bank/public-engagement-pathway-rfc-evals.json";
const runReceiptPath = "evals/knowledge-bank/runs/2026-09-04-public-engagement-pathway-rfc.md";
const productionReadinessPath = ".agents/evals/portfolio-production-readiness.json";
const engagementPathwayPath = "apps/www/src/data/engagement-pathway.json";
const pageOwnerRegistryPath = "apps/www/src/data/page-owner-registry.json";
const candidatePaths = [
  productionReadinessPath,
  runReceiptPath,
  suitePath,
  "package.json",
  "rfcs/README.md",
  rfcPath,
  contractPath,
  "scripts/check-rfcs.mjs",
  "scripts/rfcs/public-engagement-pathway-eval.mjs",
  "scripts/rfcs/public-engagement-pathway-eval.test.mjs",
  engagementPathwayPath,
  pageOwnerRegistryPath,
  "apps/www/src/app/contact/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/components/EngagementPathwayCTA.tsx",
  "evals/page-owners/contact.json",
  "scripts/page-owners/contact-evaluate.mjs",
  "scripts/page-owners/contact-evaluate.test.mjs"
];

function loadJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function candidateFingerprint(repoRoot) {
  const digest = createHash("sha256");
  for (const relativePath of [...candidatePaths].sort()) {
    digest.update(relativePath);
    digest.update("\0");
    digest.update(readFileSync(path.join(repoRoot, relativePath)));
    digest.update("\0");
  }
  return digest.digest("hex");
}

function values(value) {
  return Array.isArray(value) ? value : [];
}

export function evaluateEngagementPathwayCandidate(policy, candidate) {
  const denyReasons = [];
  const holdReasons = [];
  const placement = candidate.placement ?? {};
  const primaryCta = candidate.primary_cta ?? {};

  for (const sourceClass of values(candidate.source_basis)) {
    if (values(policy.forbidden_source_classes).includes(sourceClass)) {
      denyReasons.push(`forbidden-public-source:${sourceClass}`);
    } else if (!values(policy.allowed_source_classes).includes(sourceClass)) {
      denyReasons.push(`unapproved-public-source:${sourceClass}`);
    }
  }

  for (const claim of values(candidate.claims)) {
    if (values(policy.forbidden_claims).includes(claim)) {
      denyReasons.push(`forbidden-public-claim:${claim}`);
    } else if (!values(policy.allowed_claims).includes(claim)) {
      denyReasons.push(`unapproved-public-claim:${claim}`);
    }
  }

  if (!values(policy.allowed_routes).includes(placement.canonical_route)) {
    denyReasons.push(`unapproved-canonical-route:${placement.canonical_route ?? "missing"}`);
  }
  if (
    placement.add_top_level_navigation === true &&
    policy.new_top_level_navigation_authorized === false
  ) {
    denyReasons.push("top-level-navigation-not-authorized");
  }
  if (primaryCta.destination !== policy.primary_cta_destination) {
    denyReasons.push(
      `untruthful-primary-cta-destination:${primaryCta.destination ?? "missing"}`
    );
  }
  if (primaryCta.checkout_or_payment === true || primaryCta.interaction === "checkout") {
    denyReasons.push("checkout-or-payment-not-authorized");
  }
  if (candidate.supporting_entry_cta?.destination !== policy.canonical_route) {
    denyReasons.push(
      `untruthful-supporting-entry-destination:${candidate.supporting_entry_cta?.destination ?? "missing"}`
    );
  }
  if (candidate.pricing?.public_state !== policy.pricing?.public_state) {
    denyReasons.push("pricing-publication-not-authorized");
  }

  const engagementById = new Map(
    values(candidate.engagements).map((engagement) => [engagement.id, engagement])
  );
  for (const id of values(policy.required_rung_ids)) {
    const engagement = engagementById.get(id);
    if (!engagement) {
      holdReasons.push(`required-rung-missing:${id}`);
      continue;
    }
    if (!engagement.buyer_decision?.trim()) {
      holdReasons.push(`buyer-decision-missing:${id}`);
    }
    if (!engagement.bounded_outcome?.trim()) {
      holdReasons.push(`bounded-outcome-missing:${id}`);
    }
    if (engagement.separately_authorized !== true) {
      denyReasons.push(`separate-authorization-missing:${id}`);
    }
    if (engagement.automatic_continuation !== false) {
      denyReasons.push(`automatic-continuation:${id}`);
    }
  }

  const reasons = [...new Set([...denyReasons, ...holdReasons])].sort();
  const decision = denyReasons.length > 0
    ? "deny"
    : holdReasons.length > 0
      ? "hold"
      : "ready-for-human-review";

  return {
    decision,
    reasons,
    implementation_authorized: policy.authority?.implementation_authorized === true,
    publication_authorized: policy.authority?.publication_authorized === true
  };
}

export function evaluatePublicEngagementPathwayRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const contract = options.contract ?? loadJson(repoRoot, contractPath);
  const suite = options.suite ?? loadJson(repoRoot, suitePath);
  const productionReadiness =
    options.productionReadiness ?? loadJson(repoRoot, productionReadinessPath);
  const engagementPathway =
    options.engagementPathway ?? loadJson(repoRoot, engagementPathwayPath);
  const pageOwnerRegistry =
    options.pageOwnerRegistry ?? loadJson(repoRoot, pageOwnerRegistryPath);
  const rfc = options.rfcSource ?? readFileSync(path.join(repoRoot, rfcPath), "utf8");

  const scenarioResults = suite.cases.map((scenario) => {
    const actual = evaluateEngagementPathwayCandidate(contract.policy, scenario.candidate);
    return {
      id: scenario.id,
      passed: isDeepStrictEqual(actual, scenario.expected),
      actual,
      expected: scenario.expected
    };
  });
  const productionCriterion = productionReadiness.evals.find(
    (item) => item.id === "PR-017"
  );
  const proposalCandidate = contract.proposal_candidate;

  const checks = {
    implementation_stage_and_authority:
      contract.rfc === 12 &&
      contract.stage === "implementing" &&
      contract.policy.authority?.decision_owner === "Jamie Burkart" &&
      contract.policy.authority?.implementation_authorized === true &&
      contract.policy.authority?.publication_authorized === false &&
      /^stage:\s+implementing$/m.test(rfc) &&
      /^implementation:\s+apps\/www\/src\/app\/contact\/page\.tsx$/m.test(rfc),
    existing_information_architecture:
      contract.policy.canonical_route === "/contact" &&
      contract.policy.primary_cta_destination === "email" &&
      contract.policy.allowed_routes.includes("/work/technical-operations") &&
      contract.policy.new_top_level_navigation_authorized === false &&
      proposalCandidate.placement.canonical_route === "/contact" &&
      proposalCandidate.placement.add_top_level_navigation === false &&
      proposalCandidate.supporting_entry_cta.destination === "/contact",
    buyer_decision_path:
      contract.policy.required_rung_ids.length === 3 &&
      proposalCandidate.engagements.length === 3 &&
      proposalCandidate.engagements.every(
        (item) => item.buyer_decision.trim() && item.bounded_outcome.trim()
      ),
    privacy_independence:
      contract.policy.forbidden_source_classes.includes("named-private-counterparty") &&
      contract.policy.forbidden_source_classes.includes("raw-transcript") &&
      contract.policy.forbidden_source_classes.includes("draft-private-agreement") &&
      contract.policy.allowed_source_classes.length === 2 &&
      contract.policy.allowed_source_classes.includes("existing-public-portfolio-evidence") &&
      contract.policy.allowed_source_classes.includes("self-authored-public-offer") &&
      contract.policy.allowed_claims.length === 1 &&
      contract.policy.allowed_claims.includes("availability-for-conversation") &&
      proposalCandidate.source_basis.every(
        (item) => contract.policy.allowed_source_classes.includes(item)
      ),
    separate_authorization:
      proposalCandidate.engagements.every(
        (item) => item.separately_authorized === true && item.automatic_continuation === false
      ),
    no_runtime_scope_expansion:
      proposalCandidate.primary_cta.destination === "email" &&
      proposalCandidate.primary_cta.checkout_or_payment === false &&
      contract.policy.forbidden_implementation.includes("checkout") &&
      contract.policy.forbidden_implementation.includes("payment-processing") &&
      contract.policy.forbidden_implementation.includes("new-runtime-dependency"),
    pricing_is_a_human_gate:
      contract.policy.pricing.public_state === "withheld-pending-Jamie-decision" &&
      proposalCandidate.pricing.public_state === contract.policy.pricing.public_state &&
      contract.human_gates.required.includes("exact-public-pricing"),
    implementation_matches_contract:
      engagementPathway.route === contract.policy.canonical_route &&
      engagementPathway.implementation?.stage === "implementing" &&
      engagementPathway.implementation?.authorizedBy === "Jamie Burkart" &&
      engagementPathway.employmentPath?.remainsDistinct === true &&
      engagementPathway.contactAction?.destination === "email" &&
      engagementPathway.supportingEntryCta?.destination === "/contact" &&
      engagementPathway.pricing?.publicState ===
        contract.policy.pricing.public_state &&
      engagementPathway.pricing?.display === null &&
      isDeepStrictEqual(
        engagementPathway.engagements.map((item) => item.id),
        contract.policy.required_rung_ids
      ) &&
      isDeepStrictEqual(
        pageOwnerRegistry.pages
          .find((page) => page.pageId === "contact")
          ?.owners.map((owner) => owner.id),
        contract.implementation.page_owner_ids
      ),
    portfolio_eval_integrated:
      productionCriterion?.blocking === true &&
      productionCriterion?.category === "hiring_legibility" &&
      productionCriterion?.pass_criteria?.some((item) =>
        item.includes("private relationship")
      ),
    hill_climb_receipt:
      contract.evaluation.run_receipt === runReceiptPath &&
      existsSync(path.join(repoRoot, runReceiptPath)) &&
      /## Baseline: RED/m.test(readFileSync(path.join(repoRoot, runReceiptPath), "utf8")) &&
      /## Final candidate: GREEN/m.test(
        readFileSync(path.join(repoRoot, runReceiptPath), "utf8")
      ),
    scenario_coverage:
      scenarioResults.length >= 6 && scenarioResults.every((scenario) => scenario.passed)
  };

  const rubric = Object.fromEntries(
    Object.keys(checks).map((id) => [id, { weight: 1 / Object.keys(checks).length, hard: true }])
  );
  const score = Object.entries(rubric).reduce(
    (total, [id, criterion]) => total + (checks[id] ? criterion.weight : 0),
    0
  );
  const hardFailures = Object.entries(rubric)
    .filter(([id, criterion]) => criterion.hard && !checks[id])
    .map(([id]) => id);

  return {
    schema_version: 1,
    rfc: 12,
    stage: contract.stage,
    candidate_files: candidatePaths,
    candidate_fingerprint: candidateFingerprint(repoRoot),
    score: Number(score.toFixed(3)),
    checks,
    hard_failures: hardFailures,
    scenarios: {
      total: scenarioResults.length,
      passed: scenarioResults.filter((scenario) => scenario.passed).length,
      failed: scenarioResults.filter((scenario) => !scenario.passed).length,
      results: scenarioResults
    },
    implementation: {
      canonical_route: engagementPathway.route,
      engagement_count: engagementPathway.engagements.length,
      page_owner_ids: contract.implementation.page_owner_ids,
      supporting_route: proposalCandidate.placement.supporting_routes[0],
      public_pricing_present: engagementPathway.pricing.display !== null
    },
    implementation_authorized: contract.policy.authority.implementation_authorized,
    publication_authorized: contract.policy.authority.publication_authorized
  };
}

function main() {
  const evaluation = evaluatePublicEngagementPathwayRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length > 0 || evaluation.scenarios.failed > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
