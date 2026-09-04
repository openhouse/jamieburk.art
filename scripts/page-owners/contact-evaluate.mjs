#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");
export const configPath = "evals/page-owners/contact.json";

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

function readOptional(root, relativePath, encoding) {
  const absolutePath = path.join(root, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, encoding) : null;
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function loadContactCandidate(root = repoRoot) {
  const config = readJson(root, configPath);
  const packet = config.publicPacket;
  return {
    config,
    registry: readJson(root, config.registryPath),
    engagement: readJson(root, config.engagementPathwayPath),
    contract: readJson(root, config.contractPath),
    pageSource: readFileSync(path.join(root, config.pageSourcePath), "utf8"),
    supportingPageSource: readFileSync(
      path.join(root, config.supportingPageSourcePath),
      "utf8"
    ),
    supportingComponent: readFileSync(
      path.join(root, config.supportingComponentPath),
      "utf8"
    ),
    renderedText: readOptional(root, packet.renderedTextPath, "utf8"),
    desktopScreenshot: readOptional(root, packet.desktopScreenshotPath),
    mobileScreenshot: readOptional(root, packet.mobileScreenshotPath),
    run: existsSync(path.join(root, config.currentRunPath))
      ? readJson(root, config.currentRunPath)
      : null
  };
}

export function evaluateContactPageOwners(
  candidate,
  { deterministicOnly = false } = {}
) {
  const {
    config,
    registry,
    engagement,
    contract,
    pageSource,
    supportingPageSource,
    supportingComponent,
    renderedText,
    desktopScreenshot,
    mobileScreenshot,
    run
  } = candidate;
  const failures = [];
  const checks = [];
  const check = (id, pass, detail) => {
    checks.push({ id, pass, detail });
    if (!pass) failures.push(detail);
  };
  const page = registry.pages?.find((entry) => entry.pageId === config.pageId);
  const owners = page?.owners ?? [];
  const ownerIds = owners.map((owner) => owner.id);
  const normalizedPublicText = [
    JSON.stringify(engagement),
    pageSource,
    supportingPageSource,
    supportingComponent,
    renderedText ?? ""
  ]
    .join(" ")
    .replace(/\s+/g, " ");

  check(
    "registry-route-purpose",
    registry.model === "editorial-page-owner-pilot" &&
      page?.route === config.route &&
      page?.status === "candidate" &&
      typeof page?.purpose === "string" &&
      page.purpose.length >= 80,
    "The Contact candidate must retain one explicit route, purpose, and candidate status."
  );
  check(
    "owner-order-and-scope",
    owners.length === 3 &&
      JSON.stringify(ownerIds) === JSON.stringify(config.ownerOrder) &&
      new Set(owners.map((owner) => owner.focus)).size === owners.length &&
      owners.every(
        (owner) =>
          owner.question.length >= 70 &&
          owner.passDefinition.length >= 100 &&
          owner.publicProfileUrl.startsWith("https://")
      ),
    "The Contact candidate must retain three ordered page owners with distinct, specific questions and public bases."
  );
  check(
    "fictionalized-authority-boundary",
    registry.publicBoundary?.actualPeopleParticipated === false &&
      registry.publicBoundary?.actualApprovalOrEndorsement === false &&
      registry.publicBoundary?.publicationOwner === "Jamie Burkart" &&
      registry.publicBoundary?.humanFinalApprovalRequired === true &&
      /fictionalized editorial lenses/i.test(
        registry.publicBoundary?.publicLanguage ?? ""
      ) &&
      /not the participation, consent, approval, or endorsement/i.test(
        registry.publicBoundary?.publicLanguage ?? ""
      ),
    "The page-owner model must not imply real participation, approval, endorsement, or publication authority."
  );
  check(
    "owner-public-evidence-states",
    owners.every(
      (owner) =>
        owner.publicEvidenceState === config.ownerEvidenceStates[owner.id] &&
        owner.publicEvidenceState === "default-public-state"
    ),
    "Every Contact page owner must remain modeled from the declared default public state."
  );
  check(
    "deterministic-before-model",
    config.deterministicStages.at(-1) === "independent-owner-evaluations" &&
      config.deterministicStages.indexOf("public-packet-materialization") <
        config.deterministicStages.indexOf("independent-owner-evaluations") &&
      config.modelGate.maximumCallsPerOwner === 1 &&
      config.modelGate.aggregateRule === "all-pass",
    "Deterministic checks and an exact public packet must precede one independent call per owner, and every owner must pass."
  );

  const contractEngagementIds =
    contract.proposal_candidate?.engagements?.map((item) => item.id) ?? [];
  const implementationEngagementIds = engagement.engagements?.map(
    (item) => item.id
  ) ?? [];
  check(
    "implementation-authorized-not-published",
    contract.stage === "implementing" &&
      contract.policy?.authority?.implementation_authorized === true &&
      contract.policy?.authority?.publication_authorized === false &&
      engagement.implementation?.stage === "implementing" &&
      engagement.implementation?.authorizedBy === "Jamie Burkart",
    "RFC 0012 must authorize this bounded implementation while preserving publication as a separate human gate."
  );
  check(
    "implementation-matches-contract",
    engagement.route === contract.policy?.canonical_route &&
      JSON.stringify(implementationEngagementIds) ===
        JSON.stringify(contract.policy?.required_rung_ids) &&
      JSON.stringify(implementationEngagementIds) ===
        JSON.stringify(contractEngagementIds) &&
      engagement.supportingEntryCta?.destination === "/contact" &&
      engagement.contactAction?.destination === "email" &&
      engagement.employmentPath?.remainsDistinct === true,
    "The implemented routes, engagement ladder, truthful email action, and distinct employment path must match the RFC contract."
  );
  check(
    "separate-agreement-boundary",
    engagement.engagements?.length === 3 &&
      engagement.engagements.every((item) =>
        /separate agreement/i.test(item.boundary ?? "")
      ) &&
      /conversation is not an engagement/i.test(engagement.termsNote ?? "") &&
      /confirmed in writing before work begins/i.test(
        engagement.termsNote ?? ""
      ),
    "Each engagement level must require a separate agreement, and conversation must remain distinct from paid work."
  );
  check(
    "exact-pricing-held",
    engagement.pricing?.publicState ===
      contract.policy?.pricing?.public_state &&
      engagement.pricing?.publicState ===
        "withheld-pending-Jamie-decision" &&
      engagement.pricing?.display === null,
    "No exact public pricing may appear before Jamie approves that separate human gate."
  );
  check(
    "public-source-and-claim-allowlist",
    engagement.sourceBasis?.every((item) =>
      contract.policy?.allowed_source_classes?.includes(item)
    ) &&
      engagement.publicClaims?.every((item) =>
        contract.policy?.allowed_claims?.includes(item)
      ),
    "The implementation must rely only on allowed public source and claim classes."
  );
  check(
    "supporting-entry-is-contextual",
    /EngagementPathwayCTA/.test(supportingPageSource) &&
      /supportingEntryCta/.test(supportingComponent) &&
      !/href=["']\/services/.test(normalizedPublicText),
    "Technical Operations must use one contextual entry to Contact without adding a Services route."
  );

  for (const signal of config.requiredPublicSignals) {
    check(
      `public-signal-${sha256(signal).slice(0, 10)}`,
      normalizedPublicText.includes(signal),
      `The Contact implementation is missing its required public signal: ${signal}`
    );
  }

  check(
    "protected-material-excluded",
    !/\/(?:Users|Volumes|private|tmp)\/|private transcript|private email|signed url|Jonathan Marmor/i.test(
      JSON.stringify({
        config,
        registry,
        engagement,
        contract,
        pageSource,
        supportingPageSource,
        supportingComponent,
        run
      })
    ),
    "The public Contact packet exposes a private locator, private counterparty, or protected source class."
  );
  check(
    "public-packet-present",
    typeof renderedText === "string" &&
      renderedText.length >= 1400 &&
      Buffer.isBuffer(desktopScreenshot) &&
      desktopScreenshot.length >= 20000 &&
      Buffer.isBuffer(mobileScreenshot) &&
      mobileScreenshot.length >= 15000,
    "The exact public packet must contain substantial rendered text plus desktop and mobile screenshots."
  );

  if (!deterministicOnly) {
    check(
      "current-run-present",
      Boolean(run) && run.status === "complete",
      "The current fictionalized Contact page-owner run is missing or incomplete."
    );
    if (run?.status === "complete") {
      check(
        "exact-candidate-bindings",
        run.pageSourceSha256 === sha256(pageSource) &&
          run.registrySha256 === sha256(JSON.stringify(registry)) &&
          run.engagementPathwaySha256 === sha256(JSON.stringify(engagement)) &&
          run.promptVersion === config.modelGate.promptVersion &&
          run.publicPageTextSha256 === sha256(renderedText) &&
          run.desktopScreenshotSha256 === sha256(desktopScreenshot) &&
          run.mobileScreenshotSha256 === sha256(mobileScreenshot),
        "The page-owner run is stale or is not bound to this implementation and responsive public packet."
      );
      check(
        "public-fictionalized-run",
        run.publicOnly === true &&
          run.repositoryAvailableToModel === false &&
          run.actualPeopleParticipated === false,
        "The page-owner run must remain public-only and explicitly fictionalized."
      );
      check(
        "all-owner-assessments-present",
        run.assessments?.length === owners.length &&
          owners.every((owner) =>
            run.assessments?.some(
              (assessment) => assessment.ownerId === owner.id
            )
          ),
        "The run must contain exactly one assessment for each Contact page owner."
      );
      for (const owner of owners) {
        const assessment = run.assessments?.find(
          (entry) => entry.ownerId === owner.id
        );
        check(
          `owner-pass-${owner.id}`,
          assessment?.verdict === config.modelGate.requiredVerdict &&
            assessment.actualPersonParticipated === false,
          `${owner.name}'s fictionalized page-owner lens did not return Pass.`
        );
      }
      check(
        "aggregate-all-pass",
        run.aggregate?.verdict === "Pass" &&
          run.aggregate?.rule === "all-pass" &&
          run.aggregate?.humanFinalApprovalRequired === true,
        "The owner desk may pass only when every fictionalized owner passes and human final approval remains required."
      );
    }
  }

  return {
    pass: failures.length === 0,
    stage: deterministicOnly ? "deterministic" : "full",
    failures,
    checks,
    ownerIds,
    implementationAuthorized:
      contract.policy?.authority?.implementation_authorized === true,
    publicationAuthorized:
      contract.policy?.authority?.publication_authorized === true,
    boundary: config.modelGate.humanMeaning
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const deterministicOnly = process.argv.includes("--deterministic-only");
  const result = evaluateContactPageOwners(loadContactCandidate(), {
    deterministicOnly
  });
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.pass ? 0 : 1;
}
