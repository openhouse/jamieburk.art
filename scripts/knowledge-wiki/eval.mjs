#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { compileWiki, REPO_ROOT } from "./lib.mjs";

const config = JSON.parse(
  readFileSync(path.join(REPO_ROOT, "docs/qa/knowledge-wiki-foundation-M.json"), "utf8")
);
const first = compileWiki();
const second = compileWiki();
const nodeById = new Map(first.graph.nodes.map((node) => [node.id, node]));
const edgeKeys = new Set(
  first.graph.edges.map((edge) => `${edge.from}|${edge.type}|${edge.to}`)
);
const read = (relativePath) => readFileSync(path.join(REPO_ROOT, relativePath), "utf8");
const readme = read("docs/knowledge-bank/README.md");
const adr = read("docs/architecture/ADR-knowledge-wiki-name-and-model.md");
const callnyc = read("docs/knowledge-bank/projects/callnyc.md");
const correction = read("docs/knowledge-bank/corrections/callnyc-years.md");
const media = read("docs/knowledge-bank/media/digital-district-photo.md");
const technicalOperations = read("docs/knowledge-bank/capabilities/technical-operations.md");
const projectsIndex = read("docs/knowledge-bank/indexes/projects.md");
const sourceReturnMethod = read(
  "docs/knowledge-bank/methods/present-grounded-source-return.md"
);
const implementationAdoption = read(
  "docs/knowledge-bank/capabilities/implementation-adoption-and-handoff.md"
);
const campaignIdentity = read(
  "docs/knowledge-bank/capabilities/campaign-identity-and-web-systems.md"
);
const researchAgenda = read(
  "docs/knowledge-bank/indexes/research-agenda-and-held-claims.md"
);
const fragmentIntake = read("docs/knowledge-bank/intake-and-maturation.md");
const practicesOfCare = read(
  "docs/knowledge-bank/methods/practices-of-care-and-transition.md"
);
const publicKnowledge = read(
  "docs/knowledge-bank/methods/public-knowledge-in-peoples-own-terms.md"
);
const scenesOfWork = read("docs/knowledge-bank/indexes/scenes-of-work.md");
const canonicalStoryBank = read(
  "docs/knowledge-bank/indexes/canonical-story-bank.md"
);
const visualRightsQueue = read(
  "docs/knowledge-bank/indexes/visual-evidence-and-rights-queue.md"
);
const schema = read("docs/knowledge-bank/schema.md");

const missingPageIds = config.missingPageNodeIds;
const advisoryWishlistIds = config.advisoryWishlistNodeIds;
const sourceReturnConfig = config.sourceReturn;
const wantedIds = new Set(first.graph.wantedPages.map((item) => item.id));
const retrievalIds = new Set(
  config.retrievalTasks.flatMap((task) => task.expectedIds)
);

const checks = new Map([
  [
    "KW-001",
    readme.includes("# Knowledge Wiki") &&
      readme.includes("Knowledge Bank") &&
      !existsSync(path.join(REPO_ROOT, "docs/knowledge-wiki"))
  ],
  [
    "KW-002",
    adr.includes("Authored Markdown is canonical for page identity") &&
      adr.includes("apps/www/src/data/knowledge-bank/records.ts") &&
      adr.includes("Selective projection")
  ],
  [
    "KW-003",
    config.requiredNodeIds.every((id) => nodeById.has(id)) &&
      !first.health.hardFailures.some((item) => item.code.startsWith("identity.") || item.code.startsWith("schema."))
  ],
  [
    "KW-004",
    !first.health.hardFailures.some((item) => item.code.startsWith("link."))
  ],
  [
    "KW-005",
    !first.health.hardFailures.some((item) => item.code.startsWith("relation.")) &&
      first.health.metrics.typedRelations > 0
  ],
  [
    "KW-006",
    !first.health.hardFailures.some((item) => item.code.startsWith("authority.")) &&
      nodeById.get("claim.callnyc.independent-follow-on")?.canonicalRefs.includes("CLM-CALLNYC-INDEPENDENT-FOLLOW-ON")
  ],
  [
    "KW-007",
    nodeById.get("correction.callnyc-years")?.canonicalRefs.includes("COR-CALLNYC-CHRONOLOGY-2026") &&
      edgeKeys.has("correction.callnyc-years|supersedes|claim.callnyc.independent-follow-on") &&
      correction.includes("Previous wording") &&
      correction.includes("Corrected wording") &&
      correction.includes("../projections/callnyc-case-study.md")
  ],
  [
    "KW-008",
    !first.health.hardFailures.some((item) => item.code.startsWith("safety.") || item.code.startsWith("rights.") || item.code.startsWith("projection.pending-rights")) &&
      media.includes("public_asset_url: null") &&
      media.includes("public display remains held")
  ],
  [
    "KW-009",
    first.health.metrics.reachableDiscoverablePages === first.health.metrics.discoverablePages &&
      first.health.metrics.orphanCount === 0
  ],
  [
    "KW-010",
    nodeById.get("portfolio.work.callnyc")?.surface === "/work/callnyc" &&
      nodeById.get("portfolio.work.technical-operations")?.surface === "/work/technical-operations" &&
      first.health.metrics.activeProjectionCount === 2
  ],
  [
    "KW-011",
    config.forbiddenPublicPaths.every((relativePath) => !existsSync(path.join(REPO_ROOT, relativePath))) &&
      !existsSync(path.join(REPO_ROOT, "packages/knowledge-wiki"))
  ],
  ["KW-012", JSON.stringify(first.graph) === JSON.stringify(second.graph)],
  [
    "KW-013",
    config.retrievalTasks.every((task) => task.expectedIds.every((id) => nodeById.has(id))) &&
      callnyc.includes("## Related Wiki records") &&
      technicalOperations.includes("## What becomes usable")
  ],
  [
    "KW-014",
    config.humanEvaluationState === "not-run" &&
      config.machineCriteria.some((criterion) => criterion.id === "KW-014")
  ],
  [
    "KW-015",
    missingPageIds.every((id) => nodeById.has(id) && !wantedIds.has(id)) &&
      [
        "let-nyc-dance.md",
        "office-of-nightlife-town-halls.md",
        "talks-not-raids.md",
        "fair-rent-nyc.md",
        "save-nyc-spaces.md"
      ].every((filename) => projectsIndex.includes(filename))
  ],
  [
    "KW-016",
    sourceReturnConfig.requiredNodeIds.every((id) => nodeById.get(id)?.sourceReturn) &&
      first.health.metrics.sourceReturnCount >= sourceReturnConfig.minimumEncounterCount &&
      first.health.metrics.originalSourceReturnCount >=
        sourceReturnConfig.minimumOriginalSourceCount &&
      first.health.metrics.sourceReturnsDueCount === 0 &&
      first.health.wantedPages.length <= sourceReturnConfig.maximumOpenWantedPages &&
      !first.health.hardFailures.some((item) => item.code.startsWith("source-return."))
  ],
  [
    "KW-017",
    sourceReturnMethod.includes("ask Jamie, the personal") &&
      sourceReturnMethod.includes("npm run wiki:tasks") &&
      schema.includes("librarian_request") &&
      schema.includes("exact access method belongs in the authorized private source") &&
      first.graph.nodes
        .filter((node) => node.sourceReturn?.accessState === "blocked")
        .every((node) => Boolean(node.sourceReturn.librarianRequest)) &&
      !first.health.hardFailures.some((item) => item.code === "safety.private-path")
  ],
  [
    "KW-018",
    advisoryWishlistIds.length === 9 &&
      new Set(advisoryWishlistIds).size === advisoryWishlistIds.length &&
      advisoryWishlistIds.every(
        (id) =>
          nodeById.get(id)?.sourceReturn &&
          nodeById.get(id)?.discoverable &&
          !wantedIds.has(id) &&
          retrievalIds.has(id)
      ) &&
      first.health.metrics.reachableDiscoverablePages ===
        first.health.metrics.discoverablePages
  ],
  [
    "KW-019",
    implementationAdoption.includes("## Evidence states") &&
      implementationAdoption.includes("One state does not prove the next") &&
      campaignIdentity.includes("## Attribution boundary") &&
      researchAgenda.includes("not a second claim registry") &&
      researchAgenda.includes("### Adoption, transfer, and durability") &&
      edgeKeys.has(
        "capability.implementation-adoption-and-handoff|supports|capability.technical-operations"
      ) &&
      edgeKeys.has(
        "capability.campaign-identity-and-web-systems|supports|organization.nyc-artist-coalition"
      ) &&
      edgeKeys.has(
        "method.new-fragment-intake|supports|index.knowledge-wiki.research-agenda-and-held-claims"
      )
  ],
  [
    "KW-020",
    fragmentIntake.includes("The intake record is a promise to account") &&
      practicesOfCare.includes("Care is not a substitute for evidence") &&
      publicKnowledge.includes("people remain speakers and contributors") &&
      scenesOfWork.includes("not reconstructed dialogue or fictional") &&
      canonicalStoryBank.includes("Tailor the selection, not the facts") &&
      visualRightsQueue.includes("discovery as publication clearance") &&
      edgeKeys.has(
        "index.knowledge-wiki.canonical-story-bank|informed_by|index.knowledge-wiki.scenes-of-work"
      ) &&
      edgeKeys.has(
        "index.knowledge-wiki.visual-evidence-and-rights-queue|documents|asset.callnyc.digital-district-photo"
      ) &&
      edgeKeys.has(
        "method.public-knowledge-in-peoples-own-terms|uses_method|method.collective-credit-and-protected-absence"
      ) &&
      edgeKeys.has(
        "method.practices-of-care-and-transition|supports|capability.implementation-adoption-and-handoff"
      )
  ]
]);

const results = config.machineCriteria.map((criterion) => ({
  ...criterion,
  passed: Boolean(checks.get(criterion.id))
}));

console.log(`Knowledge Wiki foundation eval: ${results.filter((item) => item.passed).length}/${results.length}`);
for (const result of results) {
  console.log(`${result.passed ? "PASS" : "FAIL"} ${result.id}: ${result.name}`);
}

if (results.some((result) => !result.passed)) process.exit(1);
console.log("Knowledge Wiki foundation criteria met; human tasks remain explicitly not-run.");
