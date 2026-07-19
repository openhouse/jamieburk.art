import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "../..");

function rgb(hex) {
  return hex.match(/[a-f\d]{2}/gi).map((value) => Number.parseInt(value, 16) / 255);
}

function luminance(hex) {
  return rgb(hex)
    .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(left, right) {
  const [lighter, darker] = [luminance(left), luminance(right)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

test("shared project labels and tags use WCAG AA color pairs", () => {
  assert.ok(contrast("#eeefec", "#0b5f81") >= 4.5);

  const blocks = readFileSync(path.join(repoRoot, "apps/www/src/components/CaseStudyBlocks.tsx"), "utf8");
  const tags = readFileSync(path.join(repoRoot, "apps/www/src/components/TagList.tsx"), "utf8");
  assert.ok(!blocks.includes("text-jb-paper/70"));
  assert.ok(blocks.includes('tone="inverted"'));
  assert.ok(tags.includes("border-jb-paper/45 bg-jb-paper text-jb-blue"));
});

test("small artifact and lab captions avoid low-opacity ink", () => {
  const blocks = readFileSync(path.join(repoRoot, "apps/www/src/components/CaseStudyBlocks.tsx"), "utf8");
  const lab = readFileSync(path.join(repoRoot, "apps/www/src/app/lab/source-backed-team-memory/page.tsx"), "utf8");
  assert.ok(!blocks.includes("text-jb-ink/64"));
  assert.ok(!lab.includes("text-jb-ink/68"));
  assert.ok(blocks.includes("text-jb-ink/76"));
  assert.ok(lab.includes("text-jb-ink/76"));
});
