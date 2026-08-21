import { createHash } from "node:crypto";
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
  method: "docs/knowledge-bank/methods/source-backed-team-memory.md",
  photoManifest: "apps/www/src/data/photography.ts",
  photoAsset:
    "docs/knowledge-bank/assets/photographs/knowledge-wiki-collective-map-2017.md",
  photoProjection:
    "docs/knowledge-bank/projections/photography/knowledge-wiki-collective-map.md",
  photoPermission:
    "docs/knowledge-bank/sources/permissions/jamie-portfolio-album-2026-08-13.md",
  photoMetadata:
    "docs/knowledge-bank/sources/photo-metadata/nycac-participation-images-2017-public-safe.md",
  photoDerivative:
    "apps/www/public/images/field-notes/knowledge-wiki-collective-map.webp"
};

function readIfExists(root, relative) {
  const file = path.join(root, relative);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

export function loadCandidate(root = repoRoot) {
  const derivativePath = path.join(root, paths.photoDerivative);
  return {
    ...Object.fromEntries(
      Object.entries(paths)
        .filter(([key]) => key !== "photoDerivative")
        .map(([key, relative]) => [key, readIfExists(root, relative)])
    ),
    knowledgeBank: structuredClone(knowledgeBank),
    photoDerivativeExists: existsSync(derivativePath),
    photoDerivativeSha256: existsSync(derivativePath)
      ? createHash("sha256").update(readFileSync(derivativePath)).digest("hex")
      : null
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
  const expectedPhotoSha =
    "a596480d6276fd4fb02fcbc6822ef79e049bdeb27c3081a574892ee5b2c0d036";
  const governedPhotoText = [
    candidate.photoManifest,
    candidate.photoAsset,
    candidate.photoProjection,
    candidate.photoPermission,
    candidate.photoMetadata
  ].join("\n");

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
    candidate.labPage.includes("portfolioPhotos.knowledgeWikiCollectiveMap") &&
      candidate.labPage.includes("<ResponsiveMedia") &&
      /knowledge already present in people[\s\S]*language[\s\S]*artifacts[\s\S]*relationships/.test(
        candidate.labPage
      ) &&
      /visible, connected, and usable without claiming[\s\S]*ownership/.test(
        candidate.labPage
      ),
    "lab page does not make the collective-knowledge principle visible through the governed photo"
  );
  check(
    candidate.photoDerivativeExists &&
      candidate.photoDerivativeSha256 === expectedPhotoSha,
    "collective-map derivative is missing or does not match the reviewed pixels"
  );
  check(
    candidate.photoManifest.includes('id: "knowledge-wiki-collective-map"') &&
      candidate.photoManifest.includes('credit: "Photo courtesy of NYC Artist Coalition."') &&
      candidate.photoManifest.includes(expectedPhotoSha) &&
      candidate.photoManifest.includes('selectedVariant: "knowledge-wiki-collective-map"'),
    "photo manifest loses the reviewed derivative, courtesy credit, or exact human decision"
  );
  check(
    /rights_state: cleared/.test(candidate.photoAsset) &&
      /represented_person_review: no-identifiable-people/.test(candidate.photoAsset) &&
      candidate.photoAsset.includes(expectedPhotoSha) &&
      /does not identify the writers[\s\S]*prove agreement[\s\S]*assign ownership/.test(
        candidate.photoAsset
      ),
    "photo asset does not preserve rights, represented-person, checksum, or interpretation safeguards"
  );
  check(
    /route: \/lab\/source-backed-team-memory/.test(candidate.photoProjection) &&
      /production: approved/.test(candidate.photoProjection) &&
      /authority: Jamie Burkart/.test(candidate.photoProjection) &&
      /Photo courtesy of NYC Artist Coalition\./.test(candidate.photoProjection) &&
      candidate.photoProjection.includes(expectedPhotoSha),
    "exact portfolio occurrence loses its route, credit, checksum, or Jamie approval"
  );
  check(
    candidate.photoPermission.includes("asset.photo.knowledge-wiki.collective-map.2017.001") &&
      candidate.photoPermission.includes("approved_at: 2026-08-21") &&
      candidate.photoPermission.includes(expectedPhotoSha),
    "portfolio-album authorization does not record the exact collective-map occurrence"
  );
  check(
    !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}|20170217T032835)/i.test(
      governedPhotoText
    ),
    "public-safe photo records expose a private locator, identifier, or source filename"
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
  check(
    candidate.labPage.includes("Start with one team pressure people can feel") &&
      /fast-growing product and engineering team[\s\S]*focused discovery or prototype sprint/.test(
        candidate.labPage
      ) &&
      /new\s+teammate[\s\S]*why current choices[\s\S]*what remains open/.test(
        candidate.labPage
      ),
    "team-memory proposal does not make the use scene and focused first engagement legible"
  );
  check(
    candidate.labPage.includes("pilotSteps") &&
      /Find the knowledge friction[\s\S]*Start from approved material[\s\S]*Return usable operating memory[\s\S]*Test the handoff/.test(
        candidate.labPage
      ) &&
      /find an answer[\s\S]*trace[\s\S]*correct[\s\S]*continue, revise, or stop/.test(
        candidate.labPage
      ),
    "team-memory proposal lacks an adoptable source-to-handoff loop or observable continuation decision"
  );
  check(
    /proposed acceptance conditions[\s\S]*not a claim[\s\S]*client engagement/.test(
      candidate.labPage
    ),
    "team-memory proposal does not distinguish proposed acceptance conditions from completed client work"
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
      reviewedSurfaces: claim?.projections?.[0]?.surfaces?.length ?? 0,
      focusedPilotSignals: [
        "Find the knowledge friction",
        "Start from approved material",
        "Return usable operating memory",
        "Test the handoff"
      ].filter((term) => candidate.labPage.includes(term)).length,
      governedCollectiveMap:
        candidate.photoDerivativeSha256 === expectedPhotoSha ? 1 : 0
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
