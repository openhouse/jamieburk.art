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

function blend(foreground, background, opacity) {
  const back = rgb(background);
  return `#${rgb(foreground)
    .map((value, index) => Math.round((value * opacity + back[index] * (1 - opacity)) * 255))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`;
}

test("shared project labels and tags use WCAG AA color pairs", () => {
  const tokens = readFileSync(path.join(repoRoot, "apps/www/src/styles/tokens.css"), "utf8");
  const blocks = readFileSync(path.join(repoRoot, "apps/www/src/components/CaseStudyBlocks.tsx"), "utf8");
  const tags = readFileSync(path.join(repoRoot, "apps/www/src/components/TagList.tsx"), "utf8");
  const primary = tokens.match(/--jb-broadway-blue:\s*(#[0-9a-f]{6})/i)?.[1];
  const paper = tokens.match(/--jb-oil-white:\s*(#[0-9a-f]{6})/i)?.[1];
  assert.ok(primary && paper);
  assert.ok(contrast(paper, primary) >= 4.5);
  assert.ok(!blocks.includes("text-jb-paper/70"));
  assert.ok(blocks.includes('tone="inverted"'));
  assert.ok(tags.includes("border-white/45 text-white"));
});

test("small artifact and lab captions avoid low-opacity ink", () => {
  const blocks = readFileSync(path.join(repoRoot, "apps/www/src/components/CaseStudyBlocks.tsx"), "utf8");
  const lab = readFileSync(path.join(repoRoot, "apps/www/src/app/lab/source-backed-team-memory/page.tsx"), "utf8");
  assert.ok(!blocks.includes("text-jb-ink/64"));
  assert.ok(!lab.includes("text-jb-ink/68"));
  assert.ok(blocks.includes("text-jb-ink/76"));
  assert.ok(lab.includes("text-jb-ink/76"));
});

test("the lowest shared ink opacity remains AA on paper", () => {
  const tokens = readFileSync(path.join(repoRoot, "apps/www/src/styles/tokens.css"), "utf8");
  const ink = tokens.match(/--jb-oil-ink:\s*(#[0-9a-f]{6})/i)?.[1];
  const paper = tokens.match(/--jb-oil-white:\s*(#[0-9a-f]{6})/i)?.[1];
  assert.ok(ink && paper);
  assert.ok(contrast(blend(ink, paper, 0.62), paper) >= 4.5);
});

test("the Knowledge Wiki photo credit and numbered method steps remain AA", () => {
  const lab = readFileSync(
    path.join(repoRoot, "apps/www/src/app/lab/source-backed-team-memory/page.tsx"),
    "utf8"
  );
  assert.ok(lab.includes('className="mt-1 block text-jb-ink/70"'));
  assert.ok(lab.includes('className="font-semibold tabular-nums text-jb-blue"'));
  assert.ok(!lab.includes('className="mt-1 block text-jb-ink/60"'));
  assert.ok(!lab.includes('className="font-semibold tabular-nums text-jb-ochre"'));
});

test("Contact conversation and engagement-boundary text remain AA on the blue panel", () => {
  const tokens = readFileSync(path.join(repoRoot, "apps/www/src/styles/tokens.css"), "utf8");
  const contact = readFileSync(path.join(repoRoot, "apps/www/src/app/contact/page.tsx"), "utf8");
  const blue = tokens.match(/--jb-broadway-blue:\s*(#[0-9a-f]{6})/i)?.[1];
  const panel = contact.match(/<section aria-labelledby="discuss-a-working-session"[\s\S]*?<\/section>/)?.[0];
  assert.ok(blue && panel);
  const paragraphs = [...panel.matchAll(/<p className="([^"]+)"/g)];
  assert.equal(paragraphs.length, 2);
  for (const [, classes] of paragraphs) {
    const text = classes.match(/(?:^|\s)text-white(?:\/(\d+))?(?:\s|$)/);
    assert.ok(text, "The blue-panel text color must remain explicit for contrast verification");
    const opacity = text[1] ? Number(text[1]) / 100 : 1;
    const ratio = contrast(blend("#ffffff", blue, opacity), blue);
    assert.ok(ratio >= 4.5, `${classes}: measured ${ratio.toFixed(2)}:1; body text needs 4.5:1`);
  }
});
