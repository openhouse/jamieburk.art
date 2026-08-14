import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const applicationPath = path.join(
  repoRoot,
  "docs/knowledge-bank/applications/wowlist-senior-product-manager-oti-782366.md"
);
const sourcePath = path.join(
  repoRoot,
  "docs/knowledge-bank/sources/jobs-oti-senior-product-manager-782366.md"
);
const caseStudyPath = path.join(repoRoot, "apps/www/src/content/work/wowlist.mdx");
const homepagePath = path.join(repoRoot, "apps/www/src/app/page.tsx");

test("WOW List Senior Product Manager fit remains source-backed and bounded", () => {
  const application = readFileSync(applicationPath, "utf8");
  const source = readFileSync(sourcePath, "utf8");
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026"
  );
  const job = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NYC-OTI-SENIOR-PRODUCT-MANAGER-782366"
  );

  assert.ok(claim, "missing canonical WOW List Senior Product Manager claim");
  assert.ok(job, "missing official OTI Job ID 782366 source");
  assert.equal(
    job.canonicalUrl,
    "https://cityjobs.nyc.gov/job/senior-product-manager-in-brooklyn-jid-44507"
  );
  assert.match(source, /Job ID 782366/);

  for (const required of [
    "Richard Caceres",
    "## Why the match is unusually strong",
    "## Evidence-backed requirement map",
    "## Explicit gaps and human gates",
    "civil-service minimum qualifications",
    "WCAG 2.1 AA",
    "does not guarantee"
  ]) {
    assert.ok(application.includes(required), `application page is missing ${required}`);
  }

  const boundaries = [...claim.boundaries, ...claim.antiClaims].join(" ").toLowerCase();
  for (const required of ["award", "civil-service", "accessibility", "sole"] ) {
    assert.ok(boundaries.includes(required), `canonical claim is missing ${required} boundary`);
  }
  assert.doesNotMatch(application, /solely built WOW List/);
  assert.doesNotMatch(application, /meets the civil-service minimum qualifications/);
  assert.doesNotMatch(application, /fully WCAG 2\.1 AA compliant/);
  assert.doesNotMatch(application, /guaranteed to be awarded/);
});

test("the public WOW List case projects the bounded senior-product evidence", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026"
  );
  const caseStudy = readFileSync(caseStudyPath, "utf8");
  const homepage = readFileSync(homepagePath, "utf8");
  const projection = claim?.projections.find((item) => item.key === "case-study");

  assert.ok(projection, "missing public case-study projection");
  assert.equal(projection.status, "active");
  assert.equal(projection.citationRequired, true);
  assert.deepEqual(projection.surfaces, ["/work/wowlist"]);
  assert.match(projection.text, /Richard Caceres co-built/);
  assert.match(projection.text, /product definition, implementation, participatory discovery/);
  assert.match(projection.text, /instrumentation, and stewardship/);
  assert.match(
    caseStudy,
    /claimId="CLM-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026"[\s\S]*projection="case-study"[\s\S]*occurrenceId="senior-product-practice"/
  );
  assert.match(homepage, /href: "\/work\/wowlist"/);
  assert.match(homepage, /natural-language entry/);
  assert.doesNotMatch(caseStudy, /sole (?:owner|founder|builder)/i);
});
