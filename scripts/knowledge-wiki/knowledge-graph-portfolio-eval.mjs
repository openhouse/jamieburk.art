import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");

const paths = {
  labPage: "apps/www/src/app/lab/source-backed-team-memory/page.tsx",
  labCopy: "apps/www/src/content/lab/source-backed-team-memory.mdx",
  colophon: "apps/www/src/app/colophon/page.tsx",
  work: "apps/www/src/app/work/page.tsx",
  about: "apps/www/src/app/about/page.tsx",
  method: "docs/knowledge-bank/methods/source-backed-team-memory.md"
};

function readIfExists(root, relative) {
  const file = path.join(root, relative);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

export function loadCandidate(root = repoRoot) {
  return {
    ...Object.fromEntries(
      Object.entries(paths).map(([key, relative]) => [key, readIfExists(root, relative)])
    ),
    knowledgeBank: structuredClone(knowledgeBank)
  };
}

export function evaluateKnowledgeGraphPortfolio(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const publicCopy = [
    candidate.labPage,
    candidate.labCopy,
    candidate.colophon,
    candidate.work,
    candidate.about
  ].join("\n");
  const claim = candidate.knowledgeBank.claims.find(
    (item) => item.id === "CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026"
  );

  check(candidate.labPage.includes("Knowledge Wiki Graphs"), "lab page lacks the successor title");
  check(candidate.labPage.includes("graphLayers"), "lab page lacks an at-a-glance graph model");
  for (const term of ["Semantic graph", "Evidence graph", "Source-custody graph"]) {
    check(publicCopy.includes(term), `public explanation is missing ${term}`);
  }
  check(
    /portfolio is not a fourth source of truth/i.test(candidate.labCopy) &&
      /selective projection/i.test(candidate.labCopy),
    "lab copy does not distinguish reviewed projection from source truth"
  );
  check(
    candidate.labCopy.includes("Source-Backed Team Memory") &&
      candidate.labCopy.includes("Noting.us") &&
      /earlier forms/i.test(candidate.labCopy),
    "lab copy loses the Source-Backed Team Memory and Noting.us lineage"
  );
  check(
    /Each repository retains local authority/i.test(candidate.labCopy) &&
      /Stable identities and\s+pinned revisions/i.test(candidate.labCopy) &&
      /do not map one-to-one/i.test(candidate.labCopy),
    "federated repository authority or graph-layer distinction is missing"
  );
  check(
    /access to a source to having evidence/i.test(candidate.labCopy) &&
      /evidence to having permission to publish/i.test(candidate.labCopy),
    "access, evidence, and publication permission are not kept distinct"
  );
  check(
    candidate.colophon.includes("knowledge-wiki-graph-method") &&
      candidate.colophon.includes("Read the evolving method") &&
      candidate.colophon.includes("References pageId=\"colophon\"") ,
    "colophon does not provide a cited doorway into the method"
  );
  check(
    candidate.work.includes("Knowledge Wiki Graph / Source-Backed Team Memory") &&
      candidate.work.includes("Noting.us") &&
      candidate.work.includes("knowledge-wiki-graph-method"),
    "work index does not present the successor and its lineage"
  );
  check(
    candidate.about.includes("Knowledge Wiki Graphs") &&
      candidate.about.includes("semantic meaning") &&
      candidate.about.includes("source custody"),
    "about page does not connect the practice to Jamie's systems lineage"
  );
  check(
    candidate.method.includes("## Three graph responsibilities") &&
      candidate.method.includes("## Repository authority") &&
      candidate.method.includes("do not map one-to-one"),
    "maintained method record does not encode the generalized architecture"
  );
  check(
    !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/)/.test(publicCopy),
    "public surfaces expose a private filesystem or repository locator"
  );
  check(
    /early research|evolving research|operating method in development/i.test(publicCopy) &&
      /not a finished platform|Not a finished\s+production/i.test(publicCopy),
    "public copy does not preserve the research-stage boundary"
  );

  check(Boolean(claim), "canonical Knowledge Wiki Graph claim is missing");
  if (claim) {
    const sourceIds = new Set(claim.evidence.map((item) => item.sourceId));
    check(claim.status === "confirmed-with-boundary", "canonical claim lost its boundary status");
    check(
      sourceIds.has("SRC-KNOWLEDGE-WIKI-RFC-0005-2026") &&
        sourceIds.has("SRC-KNOWLEDGE-WIKI-RFC-0006-2026"),
      "canonical claim lacks both architecture RFC sources"
    );
    check(
      claim.antiClaims.some((item) => /exactly one graph/i.test(item)) &&
        claim.antiClaims.some((item) => /finished production/i.test(item)) &&
        claim.antiClaims.some((item) => /client has adopted/i.test(item)) &&
        claim.antiClaims.some((item) => /publication permission/i.test(item)),
      "canonical anti-claims omit topology, maturity, adoption, or publication safeguards"
    );
    check(
      claim.projections.length === 1 &&
        claim.projections[0].status === "active" &&
        claim.projections[0].surfaces.length === 4,
      "canonical projection must remain active only on the four reviewed surfaces"
    );
  }

  const references = [
    ...publicCopy.matchAll(/claimId="CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026"/g)
  ].length;

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      publicClaimReferences: references,
      graphResponsibilities: ["Semantic graph", "Evidence graph", "Source-custody graph"]
        .filter((term) => publicCopy.includes(term)).length,
      reviewedSurfaces: claim?.projections?.[0]?.surfaces?.length ?? 0
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateKnowledgeGraphPortfolio(loadCandidate());
  if (!result.passed) {
    console.error(`Knowledge Graph portfolio eval failed:\n${result.failures.join("\n")}`);
    process.exit(1);
  }
  console.log(
    `Knowledge Graph portfolio eval passed: ${result.metrics.graphResponsibilities}/3 graph responsibilities, ${result.metrics.publicClaimReferences} cited renderings, ${result.metrics.reviewedSurfaces} reviewed surfaces.`
  );
}
