import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("general hiring path contains no unexplained OTI shorthand", () => {
  const homepage = read("apps/www/src/app/page.tsx");
  assert.doesNotMatch(homepage, /\bOTI\b/);
  assert.doesNotMatch(
    read("apps/www/src/app/work/technical-operations/page.tsx"),
    /project: "HJE"/
  );
});

test("resume-page CTAs are labeled as views rather than downloads", () => {
  for (const path of [
    "apps/www/src/components/Hero.tsx",
    "apps/www/src/components/ContactCTA.tsx",
    "apps/www/src/components/CaseStudyLayout.tsx"
  ]) {
    const source = read(path);
    assert.match(source, /href="\/resume"/);
    assert.doesNotMatch(source, />\s*Download resume\s*</);
  }
});

test("shared buttons can wrap inside narrow viewports", () => {
  const button = read("apps/www/src/components/JBButton.tsx");
  assert.match(button, /max-w-full/);
  assert.match(button, /whitespace-normal/);
});

test("long application headings have a narrow-screen size", () => {
  for (const path of [
    "apps/www/src/app/work/technical-operations/page.tsx",
    "apps/www/src/app/lab/source-backed-team-memory/page.tsx"
  ]) {
    const source = read(path);
    assert.match(source, /text-4xl/);
    assert.match(source, /sm:text-5xl/);
  }
});

test("sitemap does not invent a new modification date per request", () => {
  assert.doesNotMatch(read("apps/www/src/app/sitemap.ts"), /new Date\(/);
});

test("only the phone-bearing resume PDF receives the route noindex header", () => {
  const config = read("apps/www/next.config.ts");
  assert.match(
    config,
    /source: "\/resume\/Jamie-Burkart-Resume-Technical-Project-Manager\.pdf"/
  );
  assert.doesNotMatch(config, /source: "\/resume\/:path\*"/);
});

test("top-level positioning frames work as emerging rather than deficient", () => {
  const projection = [
    read("apps/www/src/components/Hero.tsx"),
    read("apps/www/src/app/resume/page.tsx"),
    read("apps/www/src/app/opengraph-image.tsx")
  ].join("\n");
  assert.doesNotMatch(projection, /turn ambiguous work/i);
  assert.match(projection, /still taking shape|emerging work/i);
});

test("Chad-lens proof is actor-led, linked, and immediately follows the hero", () => {
  const homepage = read("apps/www/src/app/page.tsx");
  const proofStrip = read("apps/www/src/components/ProofStrip.tsx");
  const proofs = read("apps/www/src/data/proofs.ts");

  assert.ok(homepage.indexOf("<Hero />") < homepage.indexOf("<ProofStrip />"));
  assert.ok(homepage.indexOf("<ProofStrip />") < homepage.indexOf("Start here"));
  assert.match(proofStrip, /proof\.homepageWording/);
  assert.match(proofStrip, /View evidence/);
  assert.match(proofStrip, /href=\{href as Route\}/);

  for (const claim of [
    "I bring 14+ years",
    "I helped modernize",
    "I built and stewarded 30+ pages",
    "I co-built WOWList",
    "I created repeatable hosting"
  ]) {
    assert.match(proofs, new RegExp(claim.replaceAll("+", "\\+")));
  }
});

test("technical operations proof rows link to deeper evidence", () => {
  const page = read("apps/www/src/app/work/technical-operations/page.tsx");
  for (const href of [
    "/work/harry-j-epstein",
    "/work/fair-rent-nyc",
    "/work/callnyc",
    "/lab/source-backed-team-memory"
  ]) {
    assert.match(page, new RegExp(href.replaceAll("/", "\\/")));
  }
  assert.doesNotMatch(page, />\s*View proof\s*</);
  assert.match(page, /View \{projectLabels/);
});

test("OTI application packet is targeted, bounded, and production-only", () => {
  const packet = read("docs/applications/oti-technical-operations-packet.md");
  assert.match(packet, /jamieburk\.art\/work\/technical-operations/);
  assert.match(packet, /jamieburk\.art\/work\/harry-j-epstein/);
  assert.match(packet, /jamieburk\.art\/work\/fair-rent-nyc/);
  assert.doesNotMatch(packet, /staging\.jamieburk\.art/);
  assert.doesNotMatch(packet, /staging|do not send|internal editorial/i);
  assert.match(read("apps/www/src/data/work.ts"), /current collaboration 2026-Present/);
  assert.match(
    read("apps/www/src/content/work/fair-rent-nyc.mdx"),
    /current collaboration represented here began in 2026/
  );
});

test("AI professional development has an inspectable public credential", () => {
  const page = read("apps/www/src/app/resume/page.tsx");
  assert.match(page, /ai-evals-engineers-pms-certificate\.jpg/);
  assert.match(page, /View completion certificate/);
  assert.match(page, /Maven completion certificate, 2026/);
});

test("source-backed memory includes a bounded worked example", () => {
  const lab = read("apps/www/src/content/lab/source-backed-team-memory.mdx");
  assert.match(lab, /The following release-decision record is synthetic/);
  assert.match(lab, /\*\*Known:\*\*/);
  assert.match(lab, /\*\*Open:\*\*/);
  assert.match(lab, /\*\*Protected:\*\*/);
  assert.match(lab, /### Human correction/);
  assert.match(lab, /### Accepted team memory/);
});

test("lead case studies contain inspectable, bounded public artifacts", () => {
  const cases = [
    {
      content: "apps/www/src/content/work/harry-j-epstein.mdx",
      download: "apps/www/public/proofs/hje-public-operating-surface-inventory.json",
      source: /https:\/\/www\.harryepstein\.com\/collections\/tool-type/,
      boundary: /do not by themselves establish/
    },
    {
      content: "apps/www/src/content/work/fair-rent-nyc.mdx",
      download: "apps/www/public/proofs/fairrentnyc-public-campaign-surface-inventory.json",
      source: /https:\/\/fairrentnyc\.nycartc\.com/,
      boundary: /policy outcomes remain\s+collective work/
    },
    {
      content: "apps/www/src/content/work/callnyc.mdx",
      imageAsset: "apps/www/public/proofs/callnyc-council-hackathon-graphic.png",
      boundary: /not a claim that CallNYC was\s+an official Council submission or service/
    }
  ];

  for (const entry of cases) {
    const content = read(entry.content);
    const artifactPath = entry.download ?? entry.imageAsset;
    if (artifactPath) assert.equal(existsSync(artifactPath), true, `${artifactPath} must exist`);
    if (entry.source) assert.match(content, entry.source);
    assert.match(content, /<figure/);
    if (entry.imageAsset) assert.match(content, /alt="[^"]+"/);
    assert.match(content, /<figcaption/);
    assert.match(content, entry.boundary);
  }
});

test("public case-study layout keeps one concise governance layer", () => {
  const layout = read("apps/www/src/components/CaseStudyLayout.tsx");
  assert.match(layout, /KnownOpenProtected/);
  assert.doesNotMatch(layout, /ArtifactGallery/);
  assert.doesNotMatch(layout, /CareNote/);
  assert.doesNotMatch(layout, /PublicSafetyNote/);
  assert.doesNotMatch(layout, /SourceLayer/);
  assert.doesNotMatch(layout, /VisibilityNote/);
});
