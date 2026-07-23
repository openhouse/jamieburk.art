import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { evaluateLayoutPhotography } from "../lib/layout-photography-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const photographyPath = "apps/www/src/data/photography.ts";
const globalsPath = "apps/www/src/app/globals.css";
const caseStudyPath = "apps/www/src/components/CaseStudyLayout.tsx";
const aboutPath = "apps/www/src/app/about/page.tsx";
const caseStudyBlocksPath = "apps/www/src/components/CaseStudyBlocks.tsx";
const sundayDinnerPath = "apps/www/src/content/work/196-sunday-dinner.mdx";
const reviewRegisterPath = "docs/qa/layout-A/photo-review-register.json";
const browserQaPath = "docs/qa/layout-A/browser-qa.json";
const photography = readFileSync(path.join(repoRoot, photographyPath), "utf8");
const globals = readFileSync(path.join(repoRoot, globalsPath), "utf8");
const caseStudy = readFileSync(path.join(repoRoot, caseStudyPath), "utf8");
const about = readFileSync(path.join(repoRoot, aboutPath), "utf8");
const caseStudyBlocks = readFileSync(path.join(repoRoot, caseStudyBlocksPath), "utf8");
const sundayDinner = readFileSync(path.join(repoRoot, sundayDinnerPath), "utf8");
const reviewRegister = readFileSync(path.join(repoRoot, reviewRegisterPath), "utf8");
const browserQa = readFileSync(path.join(repoRoot, browserQaPath), "utf8");

test("layout and photography integration passes every executable criterion", () => {
  const result = evaluateLayoutPhotography({ repoRoot });
  assert.equal(result.pass, true);
  assert.equal(result.passed, result.total);
});

test("guard rejects a photo held from public projection", () => {
  const result = evaluateLayoutPhotography({
    repoRoot,
    overrides: {
      [photographyPath]: photography.replace("WEB-CAND-039", "WEB-CAND-050")
    }
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "governed-photo-set")?.pass, false);
});

test("guard keeps unidentified process and identity-bearing hospitality images held", () => {
  for (const heldId of ["WEB-CAND-009", "WEB-CAND-024"]) {
    const result = evaluateLayoutPhotography({
      repoRoot,
      overrides: {
        [photographyPath]: photography.replace("WEB-CAND-039", heldId)
      }
    });
    assert.equal(result.pass, false, heldId);
    assert.equal(result.criteria.find((item) => item.id === "governed-photo-set")?.pass, false);
  }
});

test("guard rejects removal of the human publication boundary", () => {
  const result = evaluateLayoutPhotography({
    repoRoot,
    overrides: {
      [photographyPath]: photography.replace(
        "Final production publication remains subject",
        "Production publication is cleared"
      )
    }
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "metadata-and-boundary")?.pass, false);
});

test("guard rejects erasure of collective context", () => {
  const result = evaluateLayoutPhotography({
    repoRoot,
    overrides: {
      [caseStudyPath]: caseStudy.replace("They support collective context", "They document Jamie")
    }
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "editorial-projection")?.pass, false);
});

test("guard rejects palette drift and decorative gradients", () => {
  const result = evaluateLayoutPhotography({
    repoRoot,
    overrides: {
      [globalsPath]: `${globals.replace("#2f6f89", "#7b2cbf")}\nbody { background: linear-gradient(red, blue); }`
    }
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "human-index-theme")?.pass, false);
});

test("guard rejects collapsing recursive project traces back into generic capability copy", () => {
  const result = evaluateLayoutPhotography({
    repoRoot,
    overrides: {
      [aboutPath]: about.replace("Use and feedback:", "Capabilities:")
    }
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "recursive-project-traces")?.pass, false);
});

test("guard requires an inspectable public-safe 196 operating specimen", () => {
  for (const overrides of [
    {
      [caseStudyBlocksPath]: caseStudyBlocks.replace("Use and notice", "Capabilities")
    },
    {
      [sundayDinnerPath]: sundayDinner.replace(
        "<HostingHandoffTemplate />",
        "The workflow is available on request."
      )
    }
  ]) {
    const result = evaluateLayoutPhotography({ repoRoot, overrides });
    assert.equal(result.pass, false);
    assert.equal(
      result.criteria.find((item) => item.id === "public-safe-operating-specimen")?.pass,
      false
    );
  }
});

test("guard requires held archive aliases and honest people-bearing classifications", () => {
  const result = evaluateLayoutPhotography({
    repoRoot,
    overrides: {
      [reviewRegisterPath]: reviewRegister
        .replace('"photoFieldworkId": "PHOTO-FIELDWORK-009",\n', "")
        .replace("historical raft scene with crew member", "historical raft without people")
    }
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "held-image-provenance")?.pass, false);
});

test("guard rejects stale browser evidence containing held images", () => {
  const parsed = JSON.parse(browserQa);
  parsed[0].images.push({
    alt: "Held image",
    complete: true,
    naturalWidth: 100,
    naturalHeight: 100,
    src: "http://localhost/photos/welcome-196-artist.jpg"
  });
  const result = evaluateLayoutPhotography({
    repoRoot,
    overrides: {
      [browserQaPath]: `${JSON.stringify(parsed)}\n`
    }
  });
  assert.equal(result.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "current-rendered-evidence")?.pass, false);
});
