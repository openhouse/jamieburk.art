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

test("a missing public credit fails the manifest contract", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'credit: "Photo courtesy of KC Town Hall.",',
    ""
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "manifest-bound-publication"));
});

function projectCreditOverrides() {
  const photographyPath = "apps/www/src/data/photography.ts";
  const participationPath = "apps/www/src/data/participationMedia.ts";
  return {
    photographyPath,
    participationPath,
    photography: readFileSync(photographyPath, "utf8")
      .replace(
        '"From Jamie Burkart\'s photo archive. Photographer not identified in the retained export."',
        '"Photo courtesy of Sunday Dinner NYC."'
      )
      .replace(
        '"Photograph by Paul Mossine. From Jamie Burkart\'s photo archive."',
        '"Photo courtesy of KC Town Hall."'
      ),
    participation: readFileSync(participationPath, "utf8")
      .replace(
        '"Photograph by Paul Mossine. From the NYC Artist Coalition project archive."',
        '"Photo courtesy of NYC Artist Coalition."'
      )
      .replace(
        '"From the NYC Artist Coalition project archive; individual photographer not recorded."',
        '"Photo courtesy of NYC Artist Coalition."'
      )
  };
}

test("an unsupported individual attribution fails the public project-credit policy", () => {
  const sources = projectCreditOverrides();
  const result = evaluateLayout(process.cwd(), {
    [sources.photographyPath]: sources.photography,
    [sources.participationPath]: sources.participation.replace(
      '"Photo courtesy of NYC Artist Coalition."',
      '"Photograph by Example Person."'
    )
  });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "public-project-credit-policy"));
});

test("archive-processing commentary fails the public project-credit policy", () => {
  const sources = projectCreditOverrides();
  const result = evaluateLayout(process.cwd(), {
    [sources.photographyPath]: sources.photography.replace(
      '"Photo courtesy of Sunday Dinner NYC."',
      '"Photographer not identified in the retained export."'
    ),
    [sources.participationPath]: sources.participation
  });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "public-project-credit-policy"));
});

test("the homepage hero remains bound to the East River photograph", () => {
  const path = "apps/www/src/components/Hero.tsx";
  const source = readFileSync(path, "utf8").replace(
    "portfolioPhotos.eastRiver",
    "portfolioPhotos.kcTownHallRoofWork"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "editorial-not-decorative"));
});

test("every work item retains a truthful cover visual", () => {
  const path = "apps/www/src/data/work-covers.ts";
  const source = readFileSync(path, "utf8").replace(
    'src: "/artifacts/wowlist/public-threshold.webp",',
    'src: "/artifacts/hje/public-site.png",'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "truthful-project-cover-field"));
});

test("tag-shaped controls retain real destinations", () => {
  const path = "apps/www/src/components/TagList.tsx";
  const source = readFileSync(path, "utf8").replace("/work?tag=", "/work#");
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "tag-navigation-contract"));
});

test("a decorative gradient fails the material-system contract", () => {
  const path = "apps/www/src/app/globals.css";
  const source = `${readFileSync(path, "utf8")}\n.test { background: linear-gradient(red, blue); }\n`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "human-index-material-system"));
});

test("removing the off-Dokku image loader fails the delivery contract", () => {
  const path = "apps/www/next.config.ts";
  const source = readFileSync(path, "utf8").replace(
    'loaderFile: "./src/lib/cloudinary-image-loader.ts",',
    ""
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "reliable-image-delivery"));
});
