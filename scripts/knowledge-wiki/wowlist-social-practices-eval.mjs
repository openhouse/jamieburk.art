import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");

const paths = {
  method: "docs/knowledge-bank/methods/wowlist-relational-curation.md",
  synergy: "docs/knowledge-bank/methods/sunday-dinner-wowlist-nycac-synergy.md",
  repositorySource: "docs/knowledge-bank/sources/wowlist-knowledge-repository-2026.md",
  orientation: "docs/knowledge-bank/projects/wowlist-orientation.md"
};

function readIfExists(root, relative) {
  const file = path.join(root, relative);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

export function loadCandidate(root = repoRoot) {
  return {
    methodSource: readIfExists(root, paths.method),
    synergySource: readIfExists(root, paths.synergy),
    repositorySource: readIfExists(root, paths.repositorySource),
    orientationSource: readIfExists(root, paths.orientation),
    knowledgeBank: structuredClone(knowledgeBank)
  };
}

export function evaluateWowListSocialPractices(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const bank = candidate.knowledgeBank;
  const source = bank.sources.find((item) => item.id === "SRC-WOWLIST-KNOWLEDGE-REPOSITORY-2026");
  const claim = bank.claims.find((item) => item.id === "CLM-WOWLIST-RELATIONAL-CURATION");
  const synergyClaim = bank.claims.find((item) => item.id === "CLM-SUNDAY-DINNER-WOWLIST-NYCAC-SYNERGY");
  const observations = bank.observations.filter((item) => item.claimIds.includes("CLM-WOWLIST-RELATIONAL-CURATION"));
  const synergyObservations = bank.observations.filter((item) => item.claimIds.includes("CLM-SUNDAY-DINNER-WOWLIST-NYCAC-SYNERGY"));
  const repositoryFrontmatter =
    candidate.repositorySource.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";

  for (const required of [
    "## Central finding",
    "## Practice and product-affordance map",
    "## How participation moved",
    "## Power, limits, and unanswered questions",
    "## Source notes",
    "https://www.youtube.com/watch?v=nQg47LtixPI",
    "https://x.com/wowlist/status/433671630837919744",
    "https://x.com/wowlist/status/771457416298921985",
    "https://www.sbdiy.org/",
    "intended practice is not uniform experience",
    "visibility is not consent",
    "Richard Caceres",
    "guest writers"
  ]) {
    check(candidate.methodSource.includes(required), `method page is missing ${required}`);
  }
  check(
    !/Jamie alone created WOW List and its community outcomes/i.test(candidate.methodSource),
    "method page asserts sole authorship"
  );

  check(
    /type: uses_method\s+target: method\.wowlist-relational-curation/.test(candidate.orientationSource),
    "WOW List orientation does not link the relational-curation method"
  );
  check(
    /type: uses_source\s+target: source\.wowlist\.knowledge-repository\.2026/.test(candidate.orientationSource),
    "WOW List orientation does not link the governed repository source"
  );
  check(
    /^id: source\.wowlist\.knowledge-repository\.2026$/m.test(repositoryFrontmatter) &&
      /^visibility: summary-only$/m.test(repositoryFrontmatter) &&
      /^opaque_locator: federation\.repository\.wowlist-knowledge$/m.test(repositoryFrontmatter),
    "federated repository source note is missing or exposes the wrong boundary"
  );
  check(
    !/github\.com\/openhouse\/wowlist-knowledge/.test(candidate.repositorySource),
    "private repository source note exposes a live repository URL"
  );
  check(Boolean(source), "structured source for the governed WOW List repository is missing");
  if (source) {
    check(source.visibility === "protected", "governed repository source must remain protected");
    check(source.preservationStatus === "private", "governed repository source must remain private");
    check(!source.canonicalUrl && !source.archiveUrl && !source.assetUrl, "governed repository source must expose no URL");
  }
  check(Boolean(claim), "structured relational-curation claim is missing");
  if (claim) {
    check(claim.status === "confirmed-with-boundary", "relational-curation claim must retain its boundary status");
    check(
      claim.projections.length === 1 &&
        claim.projections[0].status === "hold" &&
        claim.projections[0].surfaces.length === 0,
      "relational-curation claim must remain held from public surfaces"
    );
    check(
      claim.evidence.some((item) => item.sourceId === "SRC-WOWLIST-KNOWLEDGE-REPOSITORY-2026" && item.relationship === "private-support" && item.renderCitation === false),
      "relational-curation claim does not preserve the private-source relationship"
    );
    check(
      claim.antiClaims.some((item) => /uniform experience/i.test(item)) &&
        claim.antiClaims.some((item) => /consent/i.test(item)) &&
        claim.antiClaims.some((item) => /sole/i.test(item)),
      "relational-curation anti-claims omit experience, consent, or sole-credit boundaries"
    );
  }
  check(observations.length >= 3, "relational-curation claim requires at least three source-linked observations");
  check(
    new Set(observations.map((item) => item.sourceId)).size >= 3,
    "relational-curation observations collapse distinct sources"
  );
  for (const required of [
    "## Central finding",
    "## Three containers",
    "## The reusable social-technical pattern",
    "## What changed across the transitions",
    "## Boundaries and open questions",
    "## Source notes",
    "continuity is not inevitability",
    "does not establish that WOW List caused NYC Artist Coalition",
    "Richard Caceres",
    "collective formation"
  ]) {
    check(candidate.synergySource.includes(required), `synergy page is missing ${required}`);
  }
  const synergyFrontmatter = candidate.synergySource.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  check(
    !/^title:\s.*\bWildlist\b/im.test(synergyFrontmatter),
    "synergy page uses the unverified Wildlist search term as the canonical project name"
  );
  check(
    !/WOW List therefore caused NYC Artist Coalition/i.test(candidate.synergySource),
    "synergy page asserts causal succession"
  );
  for (const target of ["project.sunday-dinner-196", "project.wowlist", "project.nyc-artist-coalition"]) {
    check(candidate.synergySource.includes(`target: ${target}`), `synergy page does not link ${target}`);
  }
  check(Boolean(synergyClaim), "structured Sunday Dinner–WOW List–NYCAC synergy claim is missing");
  if (synergyClaim) {
    check(synergyClaim.status === "confirmed-with-boundary", "synergy claim must retain its boundary status");
    check(
      synergyClaim.projections.length === 1 &&
        synergyClaim.projections[0].status === "hold" &&
        synergyClaim.projections[0].surfaces.length === 0,
      "synergy claim must remain held from public surfaces"
    );
    check(
      synergyClaim.antiClaims.some((item) => /caused/i.test(item)) &&
        synergyClaim.antiClaims.some((item) => /inevitable/i.test(item)) &&
        synergyClaim.antiClaims.some((item) => /sole/i.test(item)),
      "synergy anti-claims omit causality, inevitability, or sole-credit boundaries"
    );
  }
  check(synergyObservations.length >= 3, "synergy claim requires at least three source-linked observations");
  check(
    new Set(synergyObservations.map((item) => item.sourceId)).size >= 3,
    "synergy observations collapse project-distinct sources"
  );
  check(!/\/(?:Users|Volumes|private|tmp)\//.test(candidate.methodSource + candidate.synergySource + candidate.repositorySource), "public-safe Wiki prose exposes a private path");

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      observations: observations.length,
      distinctObservationSources: new Set(observations.map((item) => item.sourceId)).size,
      synergyObservations: synergyObservations.length,
      projectionStatus: claim?.projections?.[0]?.status ?? "missing"
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateWowListSocialPractices(loadCandidate());
  if (!result.passed) {
    console.error(`WOW List social-practice eval failed:\n${result.failures.join("\n")}`);
    process.exit(1);
  }
  console.log(
    `WOW List social-practice eval passed: ${result.metrics.observations} observations across ${result.metrics.distinctObservationSources} sources; projection ${result.metrics.projectionStatus}.`
  );
}
