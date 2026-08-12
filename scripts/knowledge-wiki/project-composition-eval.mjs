import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");

const paths = {
  system: "docs/knowledge-bank/methods/recomposable-civic-cultural-systems.md",
  campaignSiteSource: "docs/knowledge-bank/sources/campaign-site-repository-family-2020-2022.md",
  lineages: "docs/knowledge-bank/indexes/project-lineages.md"
};

function readIfExists(root, relative) {
  const file = path.join(root, relative);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

export function loadCandidate(root = repoRoot) {
  return {
    systemSource: readIfExists(root, paths.system),
    campaignSiteSource: readIfExists(root, paths.campaignSiteSource),
    lineagesSource: readIfExists(root, paths.lineages),
    knowledgeBank: structuredClone(knowledgeBank)
  };
}

export function evaluateProjectComposition(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const bank = candidate.knowledgeBank;
  const claim = bank.claims.find(
    (item) => item.id === "CLM-RECOMPOSABLE-CIVIC-CULTURAL-SYSTEM"
  );
  const observations = bank.observations.filter((item) =>
    item.claimIds.includes("CLM-RECOMPOSABLE-CIVIC-CULTURAL-SYSTEM")
  );
  const campaignSource = bank.sources.find(
    (item) => item.id === "SRC-CAMPAIGN-SITE-REPOSITORY-FAMILY-2020-2022"
  );

  for (const required of [
    "## Central finding",
    "## Evidence tiers",
    "## Component model",
    "## Documented artifact linkages",
    "## Project-to-component matrix",
    "## How recomposition operates in community practice",
    "## When not to reuse",
    "## Boundaries and open questions",
    "## Source notes",
    "KC Spaces Fund",
    "KC Safer Spaces Fund",
    "KC Town Hall",
    "196 Artists Residency",
    "Open House",
    "Great Accommodations",
    "adaptation is not duplication",
    "structural resemblance does not establish historical transmission",
    "collective credit"
  ]) {
    check(candidate.systemSource.includes(required), `project-system page is missing ${required}`);
  }

  for (const target of [
    "project.sunday-dinner-196",
    "project.wowlist",
    "project.nyc-artist-coalition",
    "project.callnyc",
    "project.kc-town-hall",
    "project.kc-spaces-fund",
    "method.source-backed-team-memory"
  ]) {
    check(candidate.systemSource.includes(`target: ${target}`), `project-system page does not link ${target}`);
  }

  check(
    !candidate.systemSource.includes("All component similarities prove direct historical transmission"),
    "project-system page promotes structural resemblance to documented lineage"
  );
  check(
    candidate.systemSource.includes("**KC Spaces Fund** is the canonical documented name"),
    "project-system page does not preserve KC Spaces Fund as the canonical project name"
  );
  check(
    !/\/(?:Users|Volumes|private|tmp)\//.test(candidate.systemSource + candidate.campaignSiteSource),
    "public-safe project-system material exposes a private path"
  );

  check(
    /id: source\.campaign-site\.repository-family\.2020-2022/.test(candidate.campaignSiteSource) &&
      /visibility: summary-only/.test(candidate.campaignSiteSource) &&
      /opaque_locator: archive\.campaign-site\.repository-family\.2020-2022/.test(candidate.campaignSiteSource),
    "campaign-site source note is missing or exposes the wrong boundary"
  );
  check(
    candidate.lineagesSource.includes("recomposable-civic-cultural-systems.md"),
    "project-lineages index does not link the component-system method"
  );

  check(Boolean(campaignSource), "structured campaign-site repository-family source is missing");
  if (campaignSource) {
    check(campaignSource.visibility === "protected", "campaign-site repository-family source must remain protected");
    check(campaignSource.preservationStatus === "private", "campaign-site repository-family source must remain private");
    check(
      !campaignSource.canonicalUrl && !campaignSource.archiveUrl && !campaignSource.assetUrl,
      "campaign-site repository-family source must expose no URL"
    );
  }

  check(Boolean(claim), "structured recomposable-project-system claim is missing");
  if (claim) {
    check(claim.status === "confirmed-with-boundary", "recomposable-project-system claim must retain its boundary status");
    check(
      claim.projections.length === 1 &&
        claim.projections[0].status === "hold" &&
        claim.projections[0].surfaces.length === 0,
      "recomposable-project-system claim must remain held from public surfaces"
    );
    check(
      claim.antiClaims.some((item) => /same blueprint/i.test(item)) &&
        claim.antiClaims.some((item) => /historical transmission/i.test(item)) &&
        claim.antiClaims.some((item) => /sole/i.test(item)) &&
        claim.antiClaims.some((item) => /impact/i.test(item)),
      "recomposable-project-system anti-claims omit blueprint, lineage, credit, or impact boundaries"
    );
  }

  check(observations.length >= 8, "recomposable-project-system claim requires at least eight observations");
  check(
    new Set(observations.map((item) => item.sourceId)).size >= 8,
    "recomposable-project-system observations collapse source distinction"
  );
  check(
    new Set(observations.map((item) => item.project)).size >= 7,
    "recomposable-project-system observations collapse project distinction"
  );

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      observations: observations.length,
      distinctSources: new Set(observations.map((item) => item.sourceId)).size,
      distinctProjects: new Set(observations.map((item) => item.project)).size,
      projectionStatus: claim?.projections?.[0]?.status ?? "missing"
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateProjectComposition(loadCandidate());
  if (!result.passed) {
    console.error(`Project composition eval failed:\n${result.failures.join("\n")}`);
    process.exit(1);
  }
  console.log(
    `Project composition eval passed: ${result.metrics.observations} observations across ${result.metrics.distinctSources} sources and ${result.metrics.distinctProjects} projects; projection ${result.metrics.projectionStatus}.`
  );
}
