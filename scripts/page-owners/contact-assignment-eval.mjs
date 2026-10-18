#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const registryPath = "apps/www/src/data/page-owner-registry.json";
const pageId = "contact-engagement-pathway";
const ownerOrder = ["katie-lane", "adrienne-r-fields", "blair-enns"];

export function loadContactOwnerAssignment(repoRoot = defaultRepoRoot) {
  const registry = JSON.parse(
    readFileSync(path.join(repoRoot, registryPath), "utf8")
  );
  return {
    registry,
    page: registry.pages?.find((entry) => entry.pageId === pageId) ?? null
  };
}

export function evaluateContactOwnerAssignment(candidate) {
  const failures = [];
  const check = (pass, message) => {
    if (!pass) failures.push(message);
  };
  const { registry, page } = candidate;
  const owners = page?.owners ?? [];

  check(
    registry.publicBoundary?.actualPeopleParticipated === false &&
      registry.publicBoundary?.actualApprovalOrEndorsement === false &&
      /fictionalized editorial lenses/i.test(
        registry.publicBoundary?.publicLanguage ?? ""
      ),
    "The owner desk must not imply real participation, approval, or endorsement."
  );
  check(
    page?.route === "/contact" &&
      page?.status === "proposed" &&
      page?.candidateState === "not-implemented-no-owner-acceptance",
    "The Contact owner assignment must remain proposed until a rendered implementation candidate exists."
  );
  check(
    owners.length === 3 &&
      JSON.stringify(owners.map((owner) => owner.id)) ===
        JSON.stringify(ownerOrder),
    "The Contact pathway must retain exactly three ordered fictionalized owners."
  );
  check(
    new Set(owners.map((owner) => owner.focus)).size === owners.length &&
      owners.every(
        (owner) =>
          owner.publicProfileUrl.startsWith("https://") &&
          owner.publicEvidenceState === "default-public-state" &&
          owner.question.length >= 120 &&
          owner.passDefinition.length >= 150
      ),
    "Every Contact owner needs a distinct criterion, public basis, public-only state, and substantive pass definition."
  );
  check(
    /every fictionalized page-owner lens returns Pass/i.test(
      page?.acceptanceRule ?? ""
    ) && /Jamie separately approves publication/i.test(page?.acceptanceRule ?? ""),
    "Modeled unanimity and Jamie's publication decision must remain separate gates."
  );

  return {
    pass: failures.length === 0,
    page_id: pageId,
    route: page?.route ?? null,
    owner_count: owners.length,
    owners: owners.map((owner) => ({ id: owner.id, focus: owner.focus })),
    acceptance_state:
      page?.candidateState === "not-implemented-no-owner-acceptance"
        ? "queued-for-implementation-candidate"
        : "invalid",
    registry_sha256: createHash("sha256")
      .update(JSON.stringify(registry))
      .digest("hex"),
    actual_people_participated: false,
    publication_authorized: false,
    failures
  };
}

function main() {
  const result = evaluateContactOwnerAssignment(loadContactOwnerAssignment());
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (!result.pass) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
