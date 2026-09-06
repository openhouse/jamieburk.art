#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");
export const configPath = "evals/page-owners/colophon.json";

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function pageRegistryBinding(registry, pageId) {
  return {
    publicBoundary: registry.publicBoundary,
    page: registry.pages?.find((entry) => entry.pageId === pageId) ?? null
  };
}

export function loadColophonCandidate(root = repoRoot) {
  const config = readJson(root, configPath);
  const packet = config.publicPacket;
  return {
    config,
    registry: readJson(root, config.registryPath),
    pageSource: readFileSync(path.join(root, config.pageSourcePath), "utf8"),
    publicAssetRecord: readFileSync(
      path.join(root, config.publicAssetRecordPath),
      "utf8"
    ),
    renderedText: existsSync(path.join(root, packet.renderedTextPath))
      ? readFileSync(path.join(root, packet.renderedTextPath), "utf8")
      : null,
    defaultRenderedText: existsSync(
      path.join(root, packet.defaultRenderedTextPath)
    )
      ? readFileSync(path.join(root, packet.defaultRenderedTextPath), "utf8")
      : null,
    desktopScreenshot: existsSync(path.join(root, packet.desktopScreenshotPath))
      ? readFileSync(path.join(root, packet.desktopScreenshotPath))
      : null,
    mobileScreenshot: existsSync(path.join(root, packet.mobileScreenshotPath))
      ? readFileSync(path.join(root, packet.mobileScreenshotPath))
      : null,
    run: existsSync(path.join(root, config.currentRunPath))
      ? readJson(root, config.currentRunPath)
      : null
  };
}

export function evaluateColophonPageOwners(
  candidate,
  { deterministicOnly = false } = {}
) {
  const {
    config,
    registry,
    pageSource,
    publicAssetRecord,
    renderedText,
    defaultRenderedText,
    desktopScreenshot,
    mobileScreenshot,
    run
  } = candidate;
  const failures = [];
  const checks = [];
  const normalizedPageSource = pageSource.replace(/\s+/g, " ");
  const normalizedRenderedText = renderedText?.replace(/\s+/g, " ") ?? "";
  const normalizedDefaultRenderedText =
    defaultRenderedText?.replace(/\s+/g, " ") ?? "";
  const check = (id, pass, detail) => {
    checks.push({ id, pass, detail });
    if (!pass) failures.push(detail);
  };
  const page = registry.pages?.find((entry) => entry.pageId === config.pageId);
  const owners = page?.owners ?? [];

  check(
    "registry-route-purpose",
    registry.model === "editorial-page-owner-pilot" &&
      page?.route === config.route &&
      page?.status === "pilot" &&
      typeof page?.purpose === "string" &&
      page.purpose.length >= 80,
    "The colophon pilot must retain one explicit route, purpose, and pilot status."
  );
  check(
    "owner-order-and-scope",
    JSON.stringify(owners.map((owner) => owner.id)) ===
      JSON.stringify(config.ownerOrder) &&
      new Set(owners.map((owner) => owner.focus)).size === owners.length &&
      owners.every(
        (owner) =>
          owner.question.length >= 70 &&
          owner.passDefinition.length >= 100 &&
          owner.publicProfileUrl.startsWith("https://")
      ),
    "The colophon must retain three ordered owners with distinct, specific questions and public bases."
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
    "deterministic-before-model",
    config.deterministicStages.at(-1) === "independent-owner-evaluations" &&
      config.deterministicStages.indexOf("page-purpose-and-signal-coverage") <
        config.deterministicStages.indexOf("independent-owner-evaluations") &&
      config.modelGate.maximumCallsPerOwner === 1 &&
      config.modelGate.aggregateRule === "all-pass",
    "Deterministic checks must precede one independent call per owner, and every owner must pass."
  );
  check(
    "registry-governs-evaluation",
    config.registryPath === "apps/www/src/data/page-owner-registry.json" &&
      config.currentRunPath.startsWith("evals/page-owners/runs/"),
    "The page-owner registry must govern the evaluation without becoming public page copy."
  );
  check(
    "owner-public-evidence-states",
    owners.every(
      (owner) =>
        owner.publicEvidenceState === config.ownerEvidenceStates[owner.id]
    ) &&
      config.ownerEvidenceStates["deborah-treisman"] ===
        "default-public-state" &&
      config.ownerEvidenceStates["shannon-mattern"] ===
        "expanded-public-interaction",
    "Each owner must retain the public interaction state appropriate to their editorial question."
  );

  check(
    "asset-placement-authorized",
    config.requiredAssetSignals.every((signal) =>
      publicAssetRecord.includes(signal)
    ),
    "The colophon photograph must retain an explicit approved occurrence in the public asset record."
  );

  for (const signal of config.requiredPublicSignals) {
    check(
      `public-signal-${sha256(signal).slice(0, 10)}`,
      normalizedPageSource.includes(signal) ||
        normalizedDefaultRenderedText.includes(signal) ||
        normalizedRenderedText.includes(signal) ||
        (signal === "Jamie remains the publication owner" &&
          registry.publicBoundary.publicLanguage.includes(signal)),
      `The colophon is missing its required public signal: ${signal}`
    );
  }

  check(
    "protected-material-excluded",
    !/\/(?:Users|Volumes|private|tmp)\/|private transcript|private email|signed url/i.test(
      JSON.stringify({ config, registry, pageSource, run })
    ),
    "The public page-owner packet exposes a private locator or protected source class."
  );

  check(
    "public-packet-present",
    typeof renderedText === "string" &&
      renderedText.length >= 900 &&
      typeof defaultRenderedText === "string" &&
      defaultRenderedText.length >= 700 &&
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
      "The current fictionalized editorial run is missing or incomplete."
    );
    if (run) {
      check(
        "exact-candidate-bindings",
        run.pageSourceSha256 === sha256(pageSource) &&
          run.registryBinding === "page-and-public-boundary-v1" &&
          run.pageRegistrySha256 ===
            sha256(JSON.stringify(pageRegistryBinding(registry, config.pageId))) &&
          run.promptVersion === config.modelGate.promptVersion &&
          run.defaultPublicPageTextSha256 === sha256(defaultRenderedText) &&
          run.publicPageTextSha256 === sha256(renderedText) &&
          run.desktopScreenshotSha256 === sha256(desktopScreenshot) &&
          run.mobileScreenshotSha256 === sha256(mobileScreenshot),
        "The editorial run is stale or is not bound to this page assignment, public authority boundary, rendered text, and responsive screenshots."
      );
      check(
        "public-fictionalized-run",
        run.publicOnly === true &&
          run.repositoryAvailableToModel === false &&
          run.actualPeopleParticipated === false,
        "The editorial run must remain public-only and explicitly fictionalized."
      );
      check(
        "all-owner-assessments-present",
        run.assessments?.length === owners.length &&
          owners.every((owner) =>
            run.assessments?.some((assessment) => assessment.ownerId === owner.id)
          ),
        "The run must contain exactly one assessment for each registered colophon owner."
      );
      check(
        "owner-assessments-use-declared-public-state",
        run.assessments?.every(
          (assessment) =>
            assessment.publicEvidenceState ===
            config.ownerEvidenceStates[assessment.ownerId]
        ),
        "Each assessment must be bound to its declared public interaction state."
      );
      for (const owner of owners) {
        const assessment = run.assessments?.find(
          (entry) => entry.ownerId === owner.id
        );
        check(
          `owner-pass-${owner.id}`,
          assessment?.verdict === config.modelGate.requiredVerdict &&
            assessment.actualPersonParticipated === false,
          `${owner.name}'s fictionalized editorial lens did not return Pass.`
        );
        check(
          `owner-constructive-record-${owner.id}`,
          typeof assessment?.critique === "string" &&
            assessment.critique.length >= 40 &&
            (assessment.evidence?.length ?? 0) >= 2 &&
            Array.isArray(assessment.revisionRequests) &&
            typeof assessment.boundary === "string" &&
            /fictionalized|did not participate|not .*endorsement/i.test(
              assessment.boundary
            ),
          `${owner.name}'s result must retain evidence, constructive critique, revision requests, and the no-endorsement boundary.`
        );
      }
      check(
        "aggregate-all-pass",
        run.aggregate?.verdict === "Pass" &&
          run.aggregate?.rule === "all-pass" &&
          run.aggregate?.humanFinalApprovalRequired === true,
        "The desk may pass only when every fictionalized owner passes and human final approval remains required."
      );
    }
  }

  return {
    pass: failures.length === 0,
    stage: deterministicOnly ? "deterministic" : "full",
    failures,
    checks,
    boundary: config.modelGate.humanMeaning
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const deterministicOnly = process.argv.includes("--deterministic-only");
  const result = evaluateColophonPageOwners(loadColophonCandidate(), {
    deterministicOnly
  });
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.pass ? 0 : 1;
}
