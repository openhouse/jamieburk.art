#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const rfcPath = "rfcs/0012-public-paid-working-session-hiring-pathway.md";
const contractPath = "rfcs/0012-public-paid-working-session-hiring-pathway.contract.json";
const suitePath = "evals/knowledge-bank/public-hiring-pathway-rfc-evals.json";
const hillClimbPath =
  "evals/knowledge-bank/runs/2026-09-04-public-hiring-pathway-rfc-hill-climb.json";
const workingSessionPath = "apps/www/src/data/working-session.json";
const contactPagePath = "apps/www/src/app/contact/page.tsx";
const workingSessionComponentPath =
  "apps/www/src/components/WorkingSessionOffer.tsx";
const contactCtaPath = "apps/www/src/components/ContactCTA.tsx";
const technicalOperationsPath =
  "apps/www/src/app/work/technical-operations/page.tsx";
const homePagePath = "apps/www/src/app/page.tsx";
const aboutPagePath = "apps/www/src/app/about/page.tsx";
const pageOwnerRegistryPath = "apps/www/src/data/page-owner-registry.json";
const contactOwnerConfigPath = "evals/page-owners/contact.json";
const contactOwnerRunPath =
  "evals/page-owners/runs/2026-09-04-contact-page-owners.json";
const contactRenderedTextPath =
  "docs/qa/page-owners/contact-public-page.txt";
const contactDesktopScreenshotPath =
  "docs/qa/page-owners/contact-desktop.jpg";
const contactMobileScreenshotPath =
  "docs/qa/page-owners/contact-mobile.jpg";
const candidatePaths = [
  aboutPagePath,
  contactCtaPath,
  contactPagePath,
  homePagePath,
  pageOwnerRegistryPath,
  technicalOperationsPath,
  workingSessionComponentPath,
  workingSessionPath,
  contactDesktopScreenshotPath,
  contactMobileScreenshotPath,
  contactRenderedTextPath,
  hillClimbPath,
  suitePath,
  contactOwnerConfigPath,
  contactOwnerRunPath,
  "evals/page-owners/runs/2026-08-22-colophon-page-owners.json",
  "rfcs/README.md",
  rfcPath,
  contractPath,
  "scripts/page-owners/evaluate.mjs",
  "scripts/page-owners/evaluate.test.mjs",
  "scripts/check-rfcs.mjs",
  "scripts/rfcs/public-hiring-pathway-eval.mjs",
  "scripts/rfcs/public-hiring-pathway-eval.test.mjs"
];

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "en"));
}

function containsField(value, field) {
  if (!value || typeof value !== "object") return false;
  if (Object.hasOwn(value, field)) return true;
  return Object.values(value).some((child) => containsField(child, field));
}

export function evaluatePublicHiringPathway(contract, candidate) {
  const denialReasons = [];
  const holdReasons = [];

  for (const field of contract.public_boundary?.forbidden_fields ?? []) {
    if (containsField(candidate, field)) {
      denialReasons.push(`forbidden-public-field:${field}`);
    }
  }

  if (candidate.offer?.follow_on !== contract.offer?.follow_on) {
    denialReasons.push("follow-on-must-be-separately-scoped-and-authorized");
  }

  if (!(contract.surface?.allowed_cta_actions ?? []).includes(candidate.cta?.action)) {
    denialReasons.push(`cta-action-not-allowed:${candidate.cta?.action ?? "missing"}`);
  }

  if (candidate.cta?.implied_current_availability !== false) {
    denialReasons.push("current-availability-not-established");
  }

  if (candidate.public_contract?.published !== false || candidate.public_contract?.linked !== false) {
    denialReasons.push("public-contract-not-authorized");
  }

  if (denialReasons.length > 0) {
    return { decision: "deny", reasons: sortedUnique(denialReasons) };
  }

  if (candidate.offer?.model !== contract.offer?.model) {
    holdReasons.push("offer-model-not-fixed-fee-outcome");
  }
  if (candidate.offer?.currency !== contract.offer?.currency) {
    holdReasons.push("offer-currency-mismatch");
  }
  if (candidate.offer?.amount !== contract.offer?.proposed_amount) {
    holdReasons.push("proposed-fee-mismatch");
  }
  if (
    candidate.offer?.maximum_total_effort_minutes !==
    contract.offer?.maximum_total_effort_minutes
  ) {
    holdReasons.push("total-effort-boundary-mismatch");
  }

  for (const component of contract.offer?.required_components ?? []) {
    if (!(candidate.offer?.components ?? []).includes(component)) {
      holdReasons.push(`offer-component-missing:${component}`);
    }
  }

  if (candidate.offer?.intended_outcome_agreed_before_work !== true) {
    holdReasons.push("intended-outcome-agreement-required");
  }
  if (candidate.offer?.standalone !== contract.offer?.standalone) {
    holdReasons.push("standalone-offer-required");
  }
  if (candidate.surface?.primary_location !== contract.surface?.primary_location) {
    holdReasons.push("primary-location-mismatch");
  }
  if (candidate.surface?.homepage_role !== contract.surface?.homepage_role) {
    holdReasons.push("homepage-role-mismatch");
  }
  if (candidate.surface?.new_route_required !== contract.surface?.new_route_required) {
    holdReasons.push("new-route-not-authorized");
  }

  if (holdReasons.length > 0) {
    return { decision: "hold", reasons: sortedUnique(holdReasons) };
  }

  return {
    decision: "ready-for-human-review",
    next_state: contract.stage,
    implementation_authorized: contract.authority.implementation_authorized,
    publication_authorized: contract.authority.publication_authorized,
    reasons: []
  };
}

function loadJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function loadText(repoRoot, relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
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

export function evaluatePublicHiringPathwayRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const contract = options.contract ?? loadJson(repoRoot, contractPath);
  const suite = options.suite ?? loadJson(repoRoot, suitePath);
  const rfc = options.rfcSource ?? loadText(repoRoot, rfcPath);
  const hillClimb = loadJson(repoRoot, hillClimbPath);
  const workingSession = loadJson(repoRoot, workingSessionPath);
  const pageOwnerRegistry = loadJson(repoRoot, pageOwnerRegistryPath);
  const contactPage = loadText(repoRoot, contactPagePath);
  const workingSessionComponent = loadText(repoRoot, workingSessionComponentPath);
  const contactCta = loadText(repoRoot, contactCtaPath);
  const technicalOperations = loadText(repoRoot, technicalOperationsPath);
  const homePage = loadText(repoRoot, homePagePath);
  const aboutPage = loadText(repoRoot, aboutPagePath);
  const contactOwners =
    pageOwnerRegistry.pages?.find((page) => page.pageId === "contact")?.owners ?? [];
  const contactOwnerConfig = loadJson(repoRoot, contactOwnerConfigPath);
  const contactOwnerRun =
    options.contactOwnerRun ?? loadJson(repoRoot, contactOwnerRunPath);
  const contactRenderedText = readFileSync(
    path.join(repoRoot, contactRenderedTextPath)
  );
  const contactDesktopScreenshot = readFileSync(
    path.join(repoRoot, contactDesktopScreenshotPath)
  );
  const contactMobileScreenshot = readFileSync(
    path.join(repoRoot, contactMobileScreenshotPath)
  );
  const contactRegistryProjection = {
    model: pageOwnerRegistry.model,
    publicBoundary: pageOwnerRegistry.publicBoundary,
    page: pageOwnerRegistry.pages?.find((page) => page.pageId === "contact") ?? null
  };
  const ownerAssessments = contactOwnerRun.assessments ?? [];
  const scenarioResults = suite.cases.map((scenario) => {
    const actual = evaluatePublicHiringPathway(contract, scenario.candidate);
    return {
      id: scenario.id,
      passed: isDeepStrictEqual(actual, scenario.expected),
      actual,
      expected: scenario.expected
    };
  });

  const checks = {
    implementation_boundary:
      contract.rfc === 12 &&
      contract.stage === "implementing" &&
      contract.authority?.authorization_source ===
        "direct-user-instruction-2026-09-04" &&
      contract.authority?.implementation_authorized === true &&
      contract.authority?.exact_public_copy_authorized_for_candidate === true &&
      contract.authority?.displayed_price_authorized_for_candidate === true &&
      contract.authority?.publication_authorized === false &&
      contract.authority?.automatic_acceptance_authority === "none" &&
      /^stage:\s+implementing$/m.test(rfc) &&
      /^implementation:\s+apps\/www\/src\/app\/contact\/page\.tsx$/m.test(rfc),
    outcome_based_entry_unit:
      contract.offer?.model === "fixed-fee-outcome" &&
      contract.offer?.maximum_total_effort_minutes === 60 &&
      contract.offer?.required_components?.includes("agreed-preparation") &&
      contract.offer?.required_components?.includes("working-session-or-analysis") &&
      contract.offer?.required_components?.includes("short-written-recap") &&
      contract.offer?.standalone === true &&
      contract.offer?.follow_on === "separately-scoped-and-authorized",
    low_burden_surface:
      contract.surface?.primary_location === "/contact#working-session" &&
      contract.surface?.secondary_location === "/work/technical-operations" &&
      contract.surface?.homepage_role === "secondary" &&
      contract.surface?.secondary_link_limit === 1 &&
      contract.surface?.new_route_required === false &&
      contract.surface?.allowed_cta_actions?.includes("propose-working-session"),
    public_private_separation:
      contract.public_boundary?.named_private_opportunity === false &&
      contract.public_boundary?.private_provenance_publication === false &&
      [
        "private_transcript",
        "private_correspondence",
        "relationship_source",
        "client_negotiation",
        "private_repository_locator"
      ].every((field) => contract.public_boundary?.forbidden_fields?.includes(field)),
    contract_separation:
      contract.contract_boundary?.public_contract === false &&
      contract.contract_boundary?.agreement_occurs_after_fit_check === true &&
      contract.contract_boundary?.signature_authority_verified_separately === true,
    human_gates:
      ["exact-public-copy", "displayed-price", "implementation"].every((gate) =>
        contract.authority?.completed_human_decisions?.includes(gate)
      ) &&
      [
        "legal-and-commercial-terms",
        "deployment",
        "production-indexing"
      ].every((gate) =>
        contract.authority?.remaining_human_decisions?.includes(gate)
      ),
    implemented_contact_surface:
      workingSession.status === "implementation-candidate" &&
      workingSession.model === "fixed-fee-outcome" &&
      workingSession.price?.amount === 250 &&
      workingSession.price?.currency === "USD" &&
      workingSession.price?.display === "$250 fixed fee" &&
      workingSession.price?.approvedForCandidate === true &&
      workingSession.effort?.maximumTotalMinutes === 60 &&
      workingSession.intendedOutcome?.agreedBeforeWork === true &&
      JSON.stringify(workingSession.components?.map((component) => component.id)) ===
        JSON.stringify(["agree", "work", "recap"]) &&
      workingSession.standalone === true &&
      workingSession.followOn === "separately-scoped-and-authorized" &&
      workingSession.cta?.action === "propose-working-session" &&
      workingSession.cta?.impliedCurrentAvailability === false &&
      workingSession.publicContract?.published === false &&
      workingSession.publicContract?.linked === false &&
      workingSession.publication?.implementationAuthorized === true &&
      workingSession.publication?.deploymentAuthorized === false &&
      workingSession.publication?.productionIndexingAuthorized === false &&
      /import \{ WorkingSessionOffer \}/.test(contactPage) &&
      /<WorkingSessionOffer \/>/.test(contactPage) &&
      /id="working-session"/.test(workingSessionComponent) &&
      /workingSession\.components\.map/.test(workingSessionComponent) &&
      /It is an inquiry, not a confirmed booking\./.test(workingSessionComponent),
    single_secondary_path:
      contract.surface?.secondary_location === "/work/technical-operations" &&
      /showWorkingSession\?: boolean/.test(contactCta) &&
      /href="\/contact#working-session"/.test(contactCta) &&
      countMatches(technicalOperations, /<ContactCTA showWorkingSession \/>/g) === 1 &&
      !/showWorkingSession/.test(homePage) &&
      !/showWorkingSession/.test(aboutPage),
    contact_page_owners_registered:
      JSON.stringify(contactOwners.map((owner) => owner.id)) ===
        JSON.stringify(["katie-lane", "danielle-liss", "jonathan-stark"]) &&
      new Set(contactOwners.map((owner) => owner.focus)).size === 3 &&
      contactOwners.every(
        (owner) =>
          owner.publicProfileUrl.startsWith("https://") &&
          owner.publicEvidenceState === "default-public-state" &&
          owner.question.length >= 100 &&
          owner.passDefinition.length >= 140
      ) &&
      pageOwnerRegistry.publicBoundary?.actualPeopleParticipated === false &&
      pageOwnerRegistry.publicBoundary?.actualApprovalOrEndorsement === false &&
      pageOwnerRegistry.publicBoundary?.publicationOwner === "Jamie Burkart" &&
      pageOwnerRegistry.publicBoundary?.humanFinalApprovalRequired === true,
    contact_page_owner_run:
      contactOwnerConfig.pageId === "contact" &&
      contactOwnerConfig.route === "/contact" &&
      JSON.stringify(contactOwnerConfig.ownerOrder) ===
        JSON.stringify(["katie-lane", "danielle-liss", "jonathan-stark"]) &&
      contactOwnerConfig.modelGate?.aggregateRule === "all-pass" &&
      contactOwnerConfig.modelGate?.maximumCallsPerOwner === 1 &&
      contactOwnerConfig.modelGate?.publicOnly === true &&
      contactOwnerConfig.modelGate?.repositoryAvailableToModel === false &&
      contactOwnerRun.status === "complete" &&
      contactOwnerRun.promptVersion === contactOwnerConfig.modelGate.promptVersion &&
      contactOwnerRun.pageSourceSha256 === sha256(contactPage) &&
      contactOwnerRun.componentSourceSha256 === sha256(workingSessionComponent) &&
      contactOwnerRun.offerDataSha256 ===
        sha256(readFileSync(path.join(repoRoot, workingSessionPath))) &&
      contactOwnerRun.registryPageSha256 ===
        sha256(JSON.stringify(contactRegistryProjection)) &&
      contactOwnerRun.publicPageTextSha256 === sha256(contactRenderedText) &&
      contactOwnerRun.desktopScreenshotSha256 ===
        sha256(contactDesktopScreenshot) &&
      contactOwnerRun.mobileScreenshotSha256 === sha256(contactMobileScreenshot) &&
      contactDesktopScreenshot.length >= 20000 &&
      contactMobileScreenshot.length >= 15000 &&
      contactOwnerRun.publicOnly === true &&
      contactOwnerRun.repositoryAvailableToModel === false &&
      contactOwnerRun.actualPeopleParticipated === false &&
      contactOwnerRun.actualApprovalOrEndorsement === false &&
      ownerAssessments.length === contactOwners.length &&
      contactOwners.every((owner) => {
        const assessment = ownerAssessments.find(
          (entry) => entry.ownerId === owner.id
        );
        return (
          assessment?.verdict === "Pass" &&
          assessment?.actualPersonParticipated === false &&
          assessment?.publicEvidenceState === owner.publicEvidenceState &&
          assessment?.critique?.length >= 120 &&
          assessment?.evidence?.length >= 2 &&
          Array.isArray(assessment?.revisionRequests) &&
          /fictionalized analytical lens/i.test(assessment?.boundary ?? "") &&
          /did not participate/i.test(assessment?.boundary ?? "")
        );
      }) &&
      contactOwnerRun.aggregate?.rule === "all-pass" &&
      contactOwnerRun.aggregate?.verdict === "Pass" &&
      contactOwnerRun.aggregate?.passedOwners === 3 &&
      contactOwnerRun.aggregate?.totalOwners === 3 &&
      contactOwnerRun.aggregate?.humanFinalApprovalRequired === true &&
      contactOwnerRun.aggregate?.deploymentAuthorized === false &&
      contactOwnerRun.aggregate?.productionIndexingAuthorized === false &&
      contactOwnerRun.renderedChecks?.productionBuildPassed === true &&
      contactOwnerRun.renderedChecks?.desktopHorizontalOverflow === false &&
      contactOwnerRun.renderedChecks?.mobileHorizontalOverflow === false &&
      contactOwnerRun.renderedChecks?.technicalOperationsSecondaryLinkCount === 1 &&
      contactOwnerRun.renderedChecks?.homepageSecondaryLinkCount === 0 &&
      contactOwnerRun.renderedChecks?.aboutSecondaryLinkCount === 0 &&
      contactOwnerRun.renderedChecks?.actionableConsoleErrors === 0 &&
      contactOwnerRun.hillClimb?.baselineScore === 1 &&
      contactOwnerRun.hillClimb?.candidateScore === 4 &&
      contactOwnerRun.hillClimb?.decision === "keep-change",
    public_implementation_boundary:
      workingSession.privacy?.privateProvenancePublished === false &&
      workingSession.privacy?.clientRelationshipClaimed === false &&
      workingSession.privacy?.privateGraphTopologyPublished === false &&
      [
        "private_transcript",
        "private_correspondence",
        "relationship_source",
        "client_negotiation",
        "private_repository_locator"
      ].every((field) => !containsField(workingSession, field)) &&
      !/Jonathan Marmor|private vault|transcript|client negotiation/i.test(
        `${contactPage}\n${workingSessionComponent}\n${JSON.stringify(workingSession)}`
      ),
    hill_climb_evidence:
      hillClimb.rfc === 12 &&
      hillClimb.decision === "keep-change" &&
      hillClimb.baseline?.decision === "hold" &&
      hillClimb.candidate?.deterministic_score === 1 &&
      hillClimb.candidate?.rendered_reader_clarity_score === 4 &&
      hillClimb.candidate?.production_build_passed === true &&
      hillClimb.candidate?.modeled_page_owner_passes === 3 &&
      hillClimb.candidate?.modeled_page_owner_total === 3 &&
      hillClimb.candidate?.implementation_authorized === true &&
      hillClimb.candidate?.publication_authorized === false,
    scenario_coverage:
      scenarioResults.length >= 8 && scenarioResults.every((scenario) => scenario.passed)
  };

  const weight = 1 / Object.keys(checks).length;
  const score = Object.values(checks).reduce(
    (total, passed) => total + (passed ? weight : 0),
    0
  );
  const hardFailures = Object.entries(checks)
    .filter(([, passed]) => !passed)
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
    implementation_authorized: contract.authority.implementation_authorized,
    publication_authorized: contract.authority.publication_authorized
  };
}

function main() {
  const evaluation = evaluatePublicHiringPathwayRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length > 0 || evaluation.scenarios.failed > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
