import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");

const paths = {
  inventory: "docs/knowledge-bank/data/project-website-live-inventory-2026-08-14.json",
  source: "docs/knowledge-bank/sources/project-website-live-audit-2026-08-14.md",
  work: "apps/www/src/data/work.ts",
  technicalOperations: "apps/www/src/app/work/technical-operations/page.tsx",
  resumes: "resumes/2026-08-14"
};

function read(root, relative) {
  const file = path.join(root, relative);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

function resumeSources(root) {
  const directory = path.join(root, paths.resumes);
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const jobDir = path.join(directory, entry.name);
      return readdirSync(jobDir)
        .filter((name) => name.endsWith(".md"))
        .map((name) => ({ name: `${entry.name}/${name}`, text: readFileSync(path.join(jobDir, name), "utf8") }));
    });
}

export function loadCandidate(root = repoRoot) {
  const inventoryText = read(root, paths.inventory);
  return {
    inventory: inventoryText ? JSON.parse(inventoryText) : null,
    source: read(root, paths.source),
    work: read(root, paths.work),
    technicalOperations: read(root, paths.technicalOperations),
    resumes: resumeSources(root),
    knowledgeBank: structuredClone(knowledgeBank)
  };
}

export function evaluateProjectWebsites(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const inventory = candidate.inventory;

  check(Boolean(inventory), "machine-readable project-site inventory is missing");
  if (!inventory) return { passed: false, failures, metrics: {} };

  const sites = inventory.projectSites ?? [];
  const direct = sites.filter((site) => String(site.jamieImplementationEvidence).startsWith("direct"));
  const bounded = sites.filter((site) => ["shared-project-context", "open"].includes(site.jamieImplementationEvidence));
  const urls = sites.map((site) => site.url);

  check(inventory.counts?.reachableProjectSites === 10, "reachable project-site count must remain 10");
  check(inventory.counts?.directJamieImplementationEvidence === 8, "direct Jamie implementation count must remain 8");
  check(inventory.counts?.boundedOrOpenImplementationAttribution === 2, "bounded/open attribution count must remain 2");
  check(inventory.counts?.separatePortfolioProperties === 1, "portfolio property must be counted separately once");
  check(sites.length === 10, "inventory must contain exactly 10 project-site rows");
  check(direct.length === 8, "exactly eight project sites must carry direct implementation evidence");
  check(bounded.length === 2, "exactly two project sites must retain bounded or open implementation attribution");
  check(new Set(urls).size === urls.length, "project-site URLs must be unique");
  check(sites.every((site) => site.httpStatus === 200), "every counted project site must have audit-time HTTP 200 evidence");

  const byId = Object.fromEntries(sites.map((site) => [site.projectId, site]));
  check(byId["kc-town-hall"]?.surfaceStatus === "live-restored-historical-project", "KC Town Hall must remain restored historical project evidence");
  check(byId["kc-town-hall"]?.jamieImplementationEvidence === "shared-project-context", "KC Town Hall page-level authorship must remain bounded");
  check(/not a current service schedule/i.test(byId["kc-town-hall"]?.boundary ?? ""), "KC Town Hall must retain the non-current-schedule boundary");
  check(byId.wowlist?.surfaceStatus === "live-noindex-tester-threshold", "WOW List must remain a noindex tester threshold");
  check(/not the restored calendar/i.test(byId.wowlist?.boundary ?? ""), "WOW List must not be described as the restored calendar");
  check(byId.callnyc?.surfaceStatus === "live-archived-prototype", "CallNYC must remain an archived prototype");
  check(/not current resident guidance/i.test(byId.callnyc?.boundary ?? ""), "CallNYC must retain the non-current-guidance boundary");
  check(byId["save-nyc-spaces"]?.jamieImplementationEvidence === "open", "Save NYC Spaces individual implementation attribution must remain open");

  check(inventory.separateProperties?.length === 1 && inventory.separateProperties[0]?.url === "https://jamieburk.art/", "jamieburk.art must remain a separate portfolio property");
  check(inventory.unavailableOrArchiveOnly?.some((item) => item.projectId === "nter-chng" && item.inventoryStatus === "archive-only"), "NTER CHNG must remain archive-only after the failed domain check");

  for (const required of [
    "## Count and attribution boundary",
    "## KC Town Hall close reading",
    "## WOW List close reading",
    "## CallNYC close reading",
    "## Editorial rule for direct project links",
    "10 distinct project websites",
    "Eight",
    "Historical pickup dates are not a current service schedule",
    "not the restored community calendar",
    "not current resident guidance",
    "49 images lacked `alt` attributes",
    "purpose-limited tester invitation"
  ]) {
    check(candidate.source.includes(required), `close-reading source is missing ${required}`);
  }

  const claim = candidate.knowledgeBank.claims.find((item) => item.id === "CLM-PROJECT-WEBSITE-LIVE-INVENTORY-2026-08-14");
  const observations = candidate.knowledgeBank.observations.filter((item) => item.intakeId === "INTAKE-PROJECT-WEBSITE-LIVE-AUDIT-2026-08-14");
  check(Boolean(claim), "canonical project-site inventory claim is missing");
  check(claim?.status === "confirmed-with-boundary", "project-site inventory claim must retain boundary status");
  check(claim?.antiClaims.some((item) => /solely authored all ten/i.test(item)), "project-site inventory claim must reject sole authorship");
  check(claim?.antiClaims.some((item) => /current services/i.test(item)), "project-site inventory claim must reject current-service inflation");
  check(observations.length === 5, "project-site intake must retain five atomic observations");

  check(candidate.work.includes('{ label: "Visit archived CallNYC", url: "https://callnyc.org/" }'), "CallNYC work entry needs an explicit archived-site link");
  check(candidate.work.includes('{ label: "Restored KC Town Hall site", url: "https://kctownhall.com/" }'), "KC Town Hall work entry needs an explicit restored-site link");
  check(candidate.technicalOperations.includes('href="https://kcspacesfund.com/"'), "KC Spaces Fund project name must link to its public site");

  const requiredResumeLinks = [
    "https://www.harryepstein.com/",
    "https://nycartc.com/",
    "https://fairrentnyc.nycartc.com/",
    "https://wowlist.org/",
    "https://callnyc.org/",
    "https://kctownhall.com/"
  ];
  check(candidate.resumes.length === 5, "exactly five maintained opportunity resumes are expected in the dated set");
  for (const resume of candidate.resumes) {
    for (const url of requiredResumeLinks) {
      check(resume.text.includes(url), `${resume.name} is missing project link ${url}`);
    }
  }

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      reachableProjectSites: sites.length,
      directImplementationRelationships: direct.length,
      boundedOrOpenRelationships: bounded.length,
      restoredCloseReadings: 3,
      linkedResumes: candidate.resumes.length
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateProjectWebsites(loadCandidate());
  if (!result.passed) {
    console.error(`Project website eval failed:\n${result.failures.join("\n")}`);
    process.exit(1);
  }
  console.log(`Project website eval passed: ${result.metrics.reachableProjectSites} project sites, ${result.metrics.directImplementationRelationships} direct implementation relationships, ${result.metrics.boundedOrOpenRelationships} attribution boundaries, and ${result.metrics.linkedResumes} linked resume variants.`);
}
