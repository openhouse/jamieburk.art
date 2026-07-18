#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hasPersonalFacebookPostsRisk } from "./lib/personal-facebook-posts-guard.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const controlsPath =
  "docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json";

export function read(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

const sum = (object) =>
  Object.values(object).reduce((total, value) => total + value, 0);

export function evaluatePersonalFacebookControls(controls, serialized) {
  const errors = [];
  const fail = (message) => errors.push(message);
  const population = controls.populationControl ?? {};

  if (controls.schemaVersion !== 1) fail("schema version changed");
  if (controls.populationDefinition !== "Facebook Manage Posts filtered to Posted by You") {
    fail("owner-filtered population definition changed");
  }
  if (
    !/not a native Meta export, deletion history, or immutable lifetime population/i.test(
      controls.completenessBoundary ?? ""
    ) ||
    hasPersonalFacebookPostsRisk(controls.completenessBoundary ?? "")
  ) {
    fail("completeness boundary changed");
  }
  if (
    population.cursorPages !== 621 ||
    population.returnedNodes !== 3728 ||
    population.uniqueRecords !== 1243 ||
    population.terminalHasNextPage !== false ||
    population.missingDates !== 0 ||
    population.ownerAbsentRecords !== 0
  ) {
    fail("terminal population control changed");
  }
  if (
    population.recoveredStart !== "2006-12-19" ||
    population.recoveredEnd !== "2022-06-12" ||
    population.authenticatedFilterRecheckedAt !== "2026-07-15"
  ) {
    fail("chronology or authenticated replay control changed");
  }
  if (
    sum(population.audienceLabels ?? {}) !== 1243 ||
    population.audienceLabels?.public !== 268 ||
    population.audienceLabels?.friends !== 1 ||
    population.audienceLabels?.onlyMe !== 1 ||
    population.audienceLabels?.notExposed !== 973
  ) {
    fail("audience-state reconciliation changed");
  }
  if (sum(controls.recordsByYear ?? {}) !== 1243) {
    fail("year controls no longer reconcile");
  }
  if (sum(controls.recordForms ?? {}) !== 1243) {
    fail("record-form controls no longer reconcile");
  }
  if (
    controls.missionRouting?.uniqueRecords !== 181 ||
    !/not exclusive semantic judgments, effort measures, engagement, or impact/i.test(
      controls.missionRouting?.classificationBoundary ?? ""
    )
  ) {
    fail("mission-routing count or boundary changed");
  }
  if (
    controls.postedUrlInventory?.urlBearingRecords !== 430 ||
    controls.postedUrlInventory?.uniqueNormalizedExternalUrls !== 549 ||
    !/source lead until independently recovered, close-read/i.test(
      controls.postedUrlInventory?.routingBoundary ?? ""
    )
  ) {
    fail("posted-source controls changed");
  }
  const stakeholderCounts = controls.stakeholderRouting?.recordCounts ?? {};
  if (
    stakeholderCounts.newYorkCityCouncil !== 20 ||
    stakeholderCounts.rafaelEspinal !== 18 ||
    stakeholderCounts.marketHotel !== 9 ||
    stakeholderCounts.officeOfNightlife !== 6 ||
    stakeholderCounts.antonioReynoso !== 5 ||
    stakeholderCounts.quintonLucas !== 1 ||
    stakeholderCounts.helenRosenthal !== 1 ||
    !/not actions by the named stakeholders/i.test(
      controls.stakeholderRouting?.classificationBoundary ?? ""
    )
  ) {
    fail("stakeholder routing or inbound-action boundary changed");
  }
  if (
    controls.selectedPublicSourceControls?.length !== 6 ||
    new Set(
      controls.selectedPublicSourceControls?.map((source) => source.sourceId)
    ).size !== 6
  ) {
    fail("six-source public promotion control changed");
  }
  if (!/mutable interface observations/i.test(controls.engagementBoundary ?? "")) {
    fail("mutable-interaction boundary changed");
  }
  if (
    controls.privateArtifactId !==
    "jamie-personal-facebook-owner-post-census-2026-07"
  ) {
    fail("protected-artifact control changed");
  }

  const prohibited =
    /\/Users\/|\/Volumes\/|\/private\/tmp\/|cookie|session token|c_user|\bxs=|__cft__|__tn__|private@example\.com|story_fbid/i;
  if (prohibited.test(serialized)) fail("private path, identity, or authentication data entered controls");
  if (hasPersonalFacebookPostsRisk(serialized)) fail("public-risk wording entered controls");

  return { errors };
}

export function checkPersonalFacebookRepository() {
  const controlsText = read(controlsPath);
  const controls = JSON.parse(controlsText);
  const result = evaluatePersonalFacebookControls(controls, controlsText);
  const batch = read(
    "apps/www/src/data/knowledge-bank/batches/jamie-personal-facebook-posts-full-population-2026-07-15.ts"
  );
  const records = read("apps/www/src/data/knowledge-bank/records.ts");
  const project = read(
    "docs/knowledge-bank/projects/jamie-personal-facebook-posts.md"
  );
  const run = read(
    "docs/knowledge-bank/runs/2026-07-15-jamie-personal-facebook-posts-full-population.md"
  );
  const docs = `${project}\n${run}`.replace(/\s+/g, " ");

  if (
    !batch.includes(
      "blob/93ba7875d7bd379a602a7901790d351b95c63216/docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json"
    ) ||
    batch.includes("blob/feature/evals-I/") ||
    !records.includes("jamiePersonalFacebookPostsFullPopulationBatch20260715")
  ) {
    result.errors.push("immutable controls provenance or batch registration is missing");
  }
  if (
    !docs.includes("100 percent") ||
    !docs.includes("not mean a native Meta export") ||
    !docs.includes("record-level corpus therefore remains protected") ||
    !docs.includes("not actions by those stakeholders") ||
    !docs.includes("No public website copy changes")
  ) {
    result.errors.push("public documentation is missing a required boundary");
  }
  if (hasPersonalFacebookPostsRisk(docs)) {
    result.errors.push("public documentation contains a risky overclaim");
  }

  return { controls, result };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { controls, result } = checkPersonalFacebookRepository();
  if (result.errors.length) {
    console.error("Jamie personal Facebook posts check failed:");
    result.errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log(
    JSON.stringify(
      {
        status: "pass",
        uniqueRecords: controls.populationControl.uniqueRecords,
        cursorPages: controls.populationControl.cursorPages,
        missionRoutedRecords: controls.missionRouting.uniqueRecords,
        externalSourceLeads:
          controls.postedUrlInventory.uniqueNormalizedExternalUrls,
        selectedPublicSources: controls.selectedPublicSourceControls.length
      },
      null,
      2
    )
  );
}
