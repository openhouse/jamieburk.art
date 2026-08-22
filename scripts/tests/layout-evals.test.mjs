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

test("the homepage field-and-system synthesis introduces the selected projects", () => {
  const path = "apps/www/src/app/page.tsx";
  const source = readFileSync(path, "utf8");
  const fieldSection = '      <FieldSystemEvidence variant="home" />\n';
  const withoutFieldSection = source.replace(fieldSection, "");
  const afterSelectedSystems = withoutFieldSection.replace(
    '      </section>\n      <section className="jb-frame grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">',
    `      </section>\n${fieldSection}      <section className="jb-frame grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">`
  );
  const result = evaluateLayout(process.cwd(), { [path]: afterSelectedSystems });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(({ criterion }) => criterion === "editorial-not-decorative")
  );
});

test("the Knowledge Wiki Graph lab retains its governed collective-synthesis photograph", () => {
  const path = "apps/www/src/app/lab/source-backed-team-memory/page.tsx";
  const source = readFileSync(path, "utf8").replace(
    "portfolioPhotos.knowledgeWikiCollectiveSynthesis",
    "portfolioPhotos.eastRiver"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "knowledge-wiki-photographic-metaphor"
    )
  );
});

test("the collective-synthesis photograph introduces the long-form method", () => {
  const path = "apps/www/src/app/lab/source-backed-team-memory/page.tsx";
  const source = readFileSync(path, "utf8");
  const sectionStart = source.indexOf(
    '        <section className="mt-12 border-y border-jb-ink/12 py-10">'
  );
  const closing = "        </section>\n";
  const sectionEnd = source.indexOf(closing, sectionStart) + closing.length;
  const section = source.slice(sectionStart, sectionEnd);
  const withoutSection = source.slice(0, sectionStart) + source.slice(sectionEnd);
  const methodComponent = withoutSection.indexOf("<SourceBackedMemory />");
  const methodEnd =
    withoutSection.indexOf("        </div>\n", methodComponent) +
    "        </div>\n".length;
  const sourceWithLatePhoto =
    withoutSection.slice(0, methodEnd) +
    section +
    withoutSection.slice(methodEnd);
  const result = evaluateLayout(process.cwd(), { [path]: sourceWithLatePhoto });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "knowledge-wiki-photographic-metaphor"
    )
  );
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

test("the homepage sequence keeps the ranked three-project argument intact", () => {
  const path = "apps/www/src/data/work.ts";
  const source = readFileSync(path, "utf8").replace(
    '  "harry-j-epstein",\n  "kc-town-hall",',
    '  "callnyc",\n  "kc-town-hall",'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "hiring-argument-project-sequence"
    )
  );
});

test("the homepage sequence keeps Sunday Dinner inside the hiring argument", () => {
  const path = "apps/www/src/data/work.ts";
  const source = readFileSync(path, "utf8").replace(
    '  "196-sunday-dinner"\n',
    ""
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "hiring-argument-project-sequence"
    )
  );
});

test("a fourth quick-path route fails the hiring-reader attention budget", () => {
  const path = "apps/www/src/app/page.tsx";
  const source = readFileSync(path, "utf8").replace(
    '  {\n    href: "/resume",',
    '  {\n    href: "/work/wowlist",\n    label: "WOWList.org",\n    note: "Community platform case study."\n  },\n  {\n    href: "/resume",'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "hiring-reader-attention-budget"
    )
  );
});

test("a fourth homepage proof fails the hiring-reader attention budget", () => {
  const path = "apps/www/src/data/proofs.ts";
  const source = readFileSync(path, "utf8").replace(
    '  "fair-rent-campaign-memory"\n].map(requireReadyOrCarefulProof);',
    '  "fair-rent-campaign-memory",\n  "wowlist-community-platform"\n].map(requireReadyOrCarefulProof);'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "hiring-reader-attention-budget"
    )
  );
});

test("the hero does not regain a competing primary action", () => {
  const path = "apps/www/src/components/Hero.tsx";
  const source = `${readFileSync(path, "utf8")}\n<a href="/work">View selected work</a>\n`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(
    result.failures.some(
      ({ criterion }) => criterion === "hiring-reader-attention-budget"
    )
  );
});

test("the CallNYC cover stays on the clean launch-era capture", () => {
  const path = "apps/www/src/data/work-covers.ts";
  const source = readFileSync(path, "utf8").replace(
    'src: "/artifacts/callnyc/launch-2016.png",',
    'src: "/artifacts/callnyc/archived-prototype.png",'
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

test("homepage capability rows retain portfolio-filter destinations", () => {
  const path = "apps/www/src/components/CapabilityGrid.tsx";
  const source = readFileSync(path, "utf8").replace(
    "/work?tag=${encodeURIComponent(capability.tag)}#work-index",
    "/work#work-index"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "tag-navigation-contract"));
});
