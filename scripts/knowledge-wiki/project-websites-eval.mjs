import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(relativePath, root, overrides) {
  return JSON.parse(readText(relativePath, root, overrides));
}

function readText(relativePath, root, overrides) {
  if (Object.prototype.hasOwnProperty.call(overrides, relativePath)) {
    return overrides[relativePath];
  }
  const absolute = path.join(root, relativePath);
  return existsSync(absolute) ? readFileSync(absolute, "utf8") : "";
}

function unique(values) {
  return new Set(values).size === values.length;
}

function daysBetween(left, right) {
  return Math.floor((right.getTime() - left.getTime()) / 86_400_000);
}

export function evaluateProjectWebsites({
  root = repoRoot,
  config,
  now = new Date("2026-08-14T23:59:59-04:00"),
  fileOverrides = {}
} = {}) {
  const activeConfig = config ?? readJson("evals/knowledge-wiki/project-websites.json", root, fileOverrides);
  const sites = activeConfig.sites;
  const inventory = readText(activeConfig.inventoryPath, root, fileOverrides);
  const liveCheck = readText(activeConfig.liveCheckPath, root, fileOverrides);
  const research = readText(activeConfig.researchRunPath, root, fileOverrides);
  const work = readText("apps/www/src/data/work.ts", root, fileOverrides);
  const resumeRegistry = readJson(activeConfig.resumeRegistryPath, root, fileOverrides);
  const currentRun = readJson(activeConfig.currentRunPath, root, fileOverrides);
  const closeReadSites = sites.filter((site) => site.closeReadSourcePath);
  const portfolioSites = sites.filter((site) => site.portfolioLinkRequired);
  const verifiedAt = new Date(`${activeConfig.verifiedAt}T12:00:00Z`);

  const projectRecordsBound = sites.every((site) => {
    const text = readText(site.projectRecordPath, root, fileOverrides);
    return text.includes(`id: ${site.projectId}`);
  });

  const indexCoverage = sites.every(
    (site) => inventory.includes(site.url) && liveCheck.includes(site.url)
  );

  const closeReadsBound = closeReadSites.every((site) => {
    const text = readText(site.closeReadSourcePath, root, fileOverrides);
    return (
      text.includes(`canonical_url: ${site.url}`) &&
      text.includes(`target: ${site.projectId}`) &&
      research.includes(site.closeReadSourcePath.split("/").at(-1))
    );
  });

  const portfolioDirectLinks = portfolioSites.filter((site) => work.includes(site.url)).length;
  let resumeMentionLinkPairs = 0;
  let linkedResumeMentionPairs = 0;
  for (const version of resumeRegistry.versions) {
    const resume = readText(version.resumePath, root, fileOverrides);
    for (const site of sites) {
      const mentioned = site.resumeAliases.some((alias) => resume.includes(alias));
      if (!mentioned) continue;
      resumeMentionLinkPairs += 1;
      if (resume.includes(`](${site.url})`)) linkedResumeMentionPairs += 1;
    }
  }

  const summary = {
    maintainedInventoryExists: Boolean(inventory),
    governedSites: sites.length,
    closeReadSites: closeReadSites.length,
    portfolioDirectLinks,
    resumeMentionLinkPairs: linkedResumeMentionPairs
  };

  const checks = [
    {
      id: "exact-governed-count",
      pass: sites.length === activeConfig.expectedCount,
      detail: `${sites.length}/${activeConfig.expectedCount} sites.`
    },
    {
      id: "unique-projects-and-homes",
      pass: unique(sites.map((site) => site.projectId)) && unique(sites.map((site) => site.url)),
      detail: "Project IDs and public homes are unique."
    },
    {
      id: "freshness-window",
      pass: daysBetween(verifiedAt, now) >= 0 && daysBetween(verifiedAt, now) <= activeConfig.maxAgeDays,
      detail: `Verified ${activeConfig.verifiedAt}; maximum age ${activeConfig.maxAgeDays} days.`
    },
    {
      id: "http-and-content-evidence",
      pass: sites.every(
        (site) =>
          site.httpStatus === 200 &&
          site.finalUrl.startsWith("https://") &&
          site.contentType.startsWith("text/html")
      ),
      detail: `${sites.filter((site) => site.httpStatus === 200).length}/${sites.length} recorded HTTP 200.`
    },
    {
      id: "project-record-binding",
      pass: projectRecordsBound,
      detail: `${sites.length} sites are bound to governed project IDs.`
    },
    {
      id: "inventory-url-coverage",
      pass:
        indexCoverage &&
        /\*\*10 project websites\*\*/.test(inventory) &&
        /not an exhaustive lifetime census/i.test(inventory),
      detail: "Index and live-check source enumerate every home and qualify the count."
    },
    {
      id: "restored-site-close-readings",
      pass: closeReadSites.length === 3 && closeReadsBound,
      detail: `${closeReadSites.length}/3 restored sites have project-bound source records.`
    },
    {
      id: "method-boundary",
      pass:
        /does \*\*not\*\* claim a rendered visual, responsive, keyboard, screen-reader/.test(research) &&
        /No form was submitted/.test(research),
      detail: "The HTTP close reading does not masquerade as a rendered or transactional audit."
    },
    {
      id: "current-service-and-credit-boundary",
      pass:
        /Responding.*never means.*current service/is.test(inventory) &&
        /shared\s+or\s+independent\s+credit\s+scope/i.test(inventory) &&
        sites.every((site) => site.creditScope.length > 20),
      detail: "Availability, current service, and contribution scope remain distinct."
    },
    {
      id: "portfolio-direct-links",
      pass: portfolioDirectLinks === portfolioSites.length,
      detail: `${portfolioDirectLinks}/${portfolioSites.length} represented project homes link from portfolio data.`
    },
    {
      id: "resume-project-links",
      pass: resumeMentionLinkPairs > 0 && linkedResumeMentionPairs === resumeMentionLinkPairs,
      detail: `${linkedResumeMentionPairs}/${resumeMentionLinkPairs} maintained resume/project mentions link to governed homes.`
    },
    {
      id: "post-hillclimb-snapshot",
      pass:
        currentRun.overall === "pass" &&
        JSON.stringify(currentRun.summary) === JSON.stringify(summary),
      detail: "Committed post-hillclimb summary matches the current evaluated corpus."
    }
  ];

  return {
    passed: checks.every((check) => check.pass),
    summary,
    checks
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = evaluateProjectWebsites();
  for (const check of result.checks) {
    console.log(`${check.pass ? "PASS" : "FAIL"} ${check.id}: ${check.detail}`);
  }
  if (!result.passed) process.exit(1);
}
