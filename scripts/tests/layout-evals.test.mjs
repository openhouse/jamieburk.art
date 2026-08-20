import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { evaluateLayout } from "../check-layout-evals.mjs";

test("current photographic layout passes every hard gate", () => {
  const result = evaluateLayout();
  assert.equal(result.passed, true, JSON.stringify(result.failures, null, 2));
});

test("a private archive identifier fails closed", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = `// 12345678-1234-1234-1234-123456789ABC\n${readFileSync(path, "utf8")}`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "metadata-and-locator-safety"));
});

test("a missing caption fails the manifest contract", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'caption: "At the East River beneath the Manhattan Bridge, 2022.",',
    ""
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "manifest-bound-publication"));
});

test("a decorative gradient fails the material-system contract", () => {
  const path = "apps/www/src/app/globals.css";
  const source = `${readFileSync(path, "utf8")}\n.test { background: linear-gradient(red, blue); }\n`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "human-index-material-system"));
});

test("replacing the existing hero with an advocacy photograph fails closed", () => {
  const path = "apps/www/src/components/Hero.tsx";
  const source = readFileSync(path, "utf8").replace(
    "portfolioPhotos.eastRiver",
    "portfolioPhotos.saveNYCSpacesTownHall"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "editorial-not-decorative"));
});

test("removing album publication approval fails closed", () => {
  const path =
    "docs/knowledge-bank/sources/permissions/jamie-nycac-portfolio-album-clearance-2026-08.md";
  const source = readFileSync(path, "utf8").replace(
    "album_scope_publication: approved",
    "album_scope_publication: open"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "governed-photographic-field"));
});

test("removing the Fair Rent field-and-system pair fails closed", () => {
  const path = "apps/www/src/app/work/[slug]/page.tsx";
  const source = readFileSync(path, "utf8").replace(
    '<FieldSystemEvidence variant="fair-rent" />',
    ""
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "editorial-not-decorative"));
});

test("removing mobile-menu close-on-navigation behavior fails closed", () => {
  const path = "apps/www/src/components/SiteHeader.tsx";
  const source = readFileSync(path, "utf8").replace(
    "onClick={closeMobileNavigation}",
    ""
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "responsive-navigation"));
});

test("every work item retains a governed project-bound cover", () => {
  const path = "apps/www/src/data/work-covers.ts";
  const source = readFileSync(path, "utf8").replace(
    'src: "/artifacts/wowlist/public-threshold.webp",',
    'src: "/artifacts/hje/public-site.png",'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "truthful-project-cover-field"));
});

test("an unsupported named photographer fails the project-credit contract", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'credit: "Photo courtesy of NYC Artist Coalition.",',
    'credit: "Photograph by Paul Mossine.",'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "truthful-photo-credit"
    )
  );
});

test("archive-process language fails the public project-credit contract", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'credit: "Photo courtesy of NYC Artist Coalition.",',
    'credit: "Photographer not identified in the retained export.",'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "truthful-photo-credit"
    )
  );
});

test("tag-shaped controls retain real destinations", () => {
  const path = "apps/www/src/components/TagList.tsx";
  const source = readFileSync(path, "utf8").replace("/work?tag=", "/work#");
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "tag-navigation-contract"));
});
