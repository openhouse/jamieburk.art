import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "../..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

test("the technical-operations surface gives three hiring contexts a concrete evidence path", () => {
  const page = read("apps/www/src/app/work/technical-operations/page.tsx");

  for (const heading of [
    "Public product delivery",
    "Product operations",
    "Campaign project operations"
  ]) {
    assert.ok(page.includes(heading), `missing ${heading}`);
  }

  assert.ok(page.includes("What this proves"));
  assert.ok(page.includes("Scope boundary"));
  assert.ok(page.includes("CLM-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026"));
  assert.ok(page.includes("CLM-NYCAC-SBU-REPORT-REVIEW-2026"));
});

test("product-team transfer is explicit without inventing SaaS authority", () => {
  const page = read("apps/www/src/app/work/technical-operations/page.tsx");

  for (const heading of ["Before launch", "Prioritization", "After launch"]) {
    assert.ok(page.includes(heading), `missing ${heading}`);
  }
  assert.ok(page.includes("transferable operating pattern"));
  assert.match(page, /formal B2B\s+SaaS Product Operations tenure/);
  assert.ok(page.includes("go/no-go authority"));
  assert.ok(page.includes("retention-metric ownership"));
  assert.ok(page.includes("roadmap control"));
});

test("new hiring claims are active only on governed public surfaces", () => {
  const productFit = read(
    "apps/www/src/data/knowledge-bank/wowlist-product-fit-2026-08.ts"
  );
  const recentAdvocacy = read(
    "apps/www/src/data/knowledge-bank/nycac-recent-advocacy-2026-08.ts"
  );

  assert.match(
    productFit,
    /CLM-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026[\s\S]*key: "case-study"[\s\S]*status: "active"[\s\S]*surfaces: \["\/work\/technical-operations", "\/work\/wowlist"\]/
  );
  assert.match(
    recentAdvocacy,
    /CLM-NYCAC-SBU-REPORT-REVIEW-2026[\s\S]*key: "case-study"[\s\S]*status: "active"[\s\S]*surfaces: \["\/work\/technical-operations", "\/work\/fair-rent-nyc"\]/
  );
});

test("focus and hero text no longer depend on ochre or the image alone for contrast", () => {
  const globalStyles = read("apps/www/src/app/globals.css");
  const hero = read("apps/www/src/components/Hero.tsx");

  assert.ok(globalStyles.includes("outline: 3px solid var(--jb-broadway-blue)"));
  assert.match(
    globalStyles,
    /:focus-visible\s*\{[^}]*outline: 3px solid var\(--jb-broadway-blue\)/
  );
  assert.ok(hero.includes("jb-hero-copy"));
});

test("the homepage gives hiring readers clear routes into the evidence", () => {
  const home = read("apps/www/src/app/page.tsx");
  const capabilities = read("apps/www/src/components/CapabilityGrid.tsx");
  const hero = read("apps/www/src/components/Hero.tsx");
  const proofs = read("apps/www/src/data/proofs.ts");

  assert.ok(home.includes("CapabilityGrid"));
  assert.ok(capabilities.includes('from "next/link"'));
  assert.ok(capabilities.includes("/work?tag="));
  assert.ok(capabilities.includes("encodeURIComponent(capability.tag)"));
  assert.ok(!home.includes("transformations.map"));
  assert.ok(hero.includes('href="/work/technical-operations"'));
  assert.match(
    proofs,
    /export const homepageProofs = \[[\s\S]*career-operating-structure-14-years[\s\S]*hje-revenue-growth-contribution[\s\S]*fair-rent-campaign-memory[\s\S]*\]\.map/
  );
  const homepageProofBlock = proofs.match(
    /export const homepageProofs = \[[\s\S]*?\]\.map\(requireReadyOrCarefulProof\);/
  )?.[0];
  assert.ok(homepageProofBlock);
  assert.ok(!homepageProofBlock.includes("wowlist-community-platform"));
});

test("the colophon explains the capability-to-evidence navigation", () => {
  const colophon = read("apps/www/src/app/colophon/page.tsx");
  const capabilities = read("apps/www/src/components/CapabilityGrid.tsx");

  assert.ok(capabilities.includes("/work?tag="));
  assert.match(
    colophon,
    /Capability and project-topic links open a filtered work index/
  );
});

test("the public portfolio explains the federated three-graph knowledge practice", () => {
  const colophon = read("apps/www/src/app/colophon/page.tsx");
  const lab = read("apps/www/src/content/lab/source-backed-team-memory.mdx");
  const labPage = read(
    "apps/www/src/app/lab/source-backed-team-memory/page.tsx"
  );
  const work = read("apps/www/src/app/work/page.tsx");
  const knowledge = read(
    "apps/www/src/data/knowledge-bank/archive-production-2026-07.ts"
  );
  const proofs = read("apps/www/src/data/proofs.ts");
  const readiness = read(
    ".agents/evals/portfolio-production-readiness.json"
  );
  const publicSurface = [colophon, lab, labPage, work].join("\n");

  for (const layer of ["semantic graph", "evidence graph", "source custody"]) {
    assert.match(colophon, new RegExp(layer, "i"), `missing ${layer}`);
  }
  assert.match(colophon, /evaluations and human review/i);
  assert.match(lab, /Noting\.us/);
  assert.match(lab, /shared identity[\s\S]*without merging/i);
  assert.match(work, /Knowledge Wiki Graph \/ Source-Backed Team Memory/);
  assert.match(
    labPage,
    /CLM-SOURCE-BACKED-MEMORY-METHOD-2026/
  );
  assert.match(
    knowledge,
    /SRC-KNOWLEDGE-WIKI-GRAPH-ARCHITECTURE-2026[\s\S]*semantic, evidence, and source-custody separation/
  );
  assert.match(
    knowledge,
    /CLM-SOURCE-BACKED-MEMORY-METHOD-2026[\s\S]*SRC-KNOWLEDGE-WIKI-GRAPH-ARCHITECTURE-2026/
  );
  assert.match(proofs, /Developing the Knowledge Wiki Graph/);
  assert.match(
    readiness,
    /Knowledge Wiki Graph architecture is legible and governed/
  );

  for (const protectedRepositoryName of [
    "archival-research-projects",
    "commercial-rent-stabilization-public-support",
    "graph-packet",
    "wowlist-knowledge"
  ]) {
    assert.ok(
      !publicSurface.includes(protectedRepositoryName),
      `public surface exposes protected repository name ${protectedRepositoryName}`
    );
  }
});

test("persistent navigation exposes the current public section", () => {
  const header = read("apps/www/src/components/SiteHeader.tsx");

  assert.ok(header.startsWith('"use client"'));
  assert.ok(header.includes("usePathname"));
  assert.ok(header.includes('aria-current={isActive(item.href) ? "page" : undefined}'));
});
