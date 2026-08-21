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

function opportunityTailoredHomepageSource() {
  return readFileSync("apps/www/src/data/work.ts", "utf8");
}

test("the opportunity-tailored six-project homepage sequence passes", () => {
  const path = "apps/www/src/data/work.ts";
  const result = evaluateLayout(process.cwd(), {
    [path]: opportunityTailoredHomepageSource()
  });
  assert.equal(result.passed, true, JSON.stringify(result.failures, null, 2));
});

test("a changed live opportunity set invalidates the homepage hiring argument", () => {
  const path = "evals/public-resume/current.json";
  const current = JSON.parse(readFileSync(path, "utf8"));
  current.opportunities.push({
    opportunityId: "opportunity.example.new-role",
    opportunityPath: "docs/knowledge-bank/opportunities/example.md",
    requiredTerms: ["new requirement"],
    namedReaders: []
  });
  const result = evaluateLayout(process.cwd(), {
    [path]: `${JSON.stringify(current, null, 2)}\n`
  });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "hiring-argument-opportunity-set"
    )
  );
});

test("the homepage hiring argument fails when historical commercial work leads current civic work", () => {
  const path = "apps/www/src/data/work.ts";
  const source = opportunityTailoredHomepageSource()
    .replace(
      /title: "NYC Artist Coalition \/ FairRentNYC",([\s\S]*?)priority: 1,/,
      'title: "NYC Artist Coalition / FairRentNYC",$1priority: 3,'
    )
    .replace(
      /title: "Harry J\. Epstein Company",([\s\S]*?)priority: 3,/,
      'title: "Harry J. Epstein Company",$1priority: 1,'
    );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "hiring-argument-project-sequence"
    )
  );
});

test("the homepage hiring argument fails if Sunday Dinner is removed", () => {
  const path = "apps/www/src/data/work.ts";
  const source = opportunityTailoredHomepageSource().replace(
    /title: "196 Artists Residency \/ Sunday Dinner",([\s\S]*?)featured: true,/,
    'title: "196 Artists Residency / Sunday Dinner",$1featured: false,'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "hiring-argument-project-sequence"
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

test("homepage capability rows retain real filtered-work destinations", () => {
  const path = "apps/www/src/components/CapabilityGrid.tsx";
  const source = readFileSync(path, "utf8").replace("/work?tag=", "/work#");
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "capability-navigation-contract"
    )
  );
});

test("the Knowledge Wiki architecture fails if source custody disappears", () => {
  const colophonPath = "apps/www/src/app/colophon/page.tsx";
  const labPath = "apps/www/src/content/lab/source-backed-team-memory.mdx";
  const colophon = readFileSync(colophonPath, "utf8").replaceAll(
    "Source custody",
    "Archive handling"
  );
  const lab = readFileSync(labPath, "utf8")
    .replaceAll("Source custody", "Archive handling")
    .replaceAll("source custody", "archive handling");
  const result = evaluateLayout(process.cwd(), {
    [colophonPath]: colophon,
    [labPath]: lab
  });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "knowledge-wiki-architecture-contract"
    )
  );
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
