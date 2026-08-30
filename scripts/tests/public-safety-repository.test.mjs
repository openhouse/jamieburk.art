import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const transcriptDirectory = path.join(
  repoRoot,
  "docs/knowledge-bank/data/public-hearing-transcripts"
);
const evaluationRunDirectory = path.join(repoRoot, "docs/evals/runs");
const evaluationQaDirectory = path.join(repoRoot, "docs/qa");
const publicFontsDirectory = path.join(repoRoot, "apps/www/public/fonts");

test("public transcript indexes contain metadata and locators, not raw speech", () => {
  const roots = [
    "docs/knowledge-bank/data/public-hearing-speakers",
    "docs/knowledge-bank/testimony/heteroglossia",
    "docs/knowledge-bank/testimony/commercial-rent-public-support"
  ];
  for (const relativeRoot of roots) {
    const absoluteRoot = path.join(repoRoot, relativeRoot);
    for (const filename of readdirSync(absoluteRoot)) {
      if (!/\.(?:json|md)$/.test(filename)) continue;
      const source = readFileSync(path.join(absoluteRoot, filename), "utf8");
      assert.doesNotMatch(source, /"text"\s*:/);
      assert.doesNotMatch(source, /^#{2,4}\s+Transcript(?:\s+turns)?\s*$/im);
    }
  }
});

test("the public-safety gate rejects a raw transcript file anywhere in its forbidden directory", () => {
  mkdirSync(transcriptDirectory, { recursive: true });
  const mutationPath = path.join(transcriptDirectory, "__mutation__.txt");
  try {
    writeFileSync(mutationPath, "SPEAKER: raw third-party testimony\n");
    assert.throws(
      () =>
        execFileSync(
          process.execPath,
          [path.join(repoRoot, "scripts/check-public-safety.mjs")],
          {
            cwd: repoRoot,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"]
          }
        ),
      (error) =>
        /raw public-hearing transcript derivative must remain outside public Git/.test(
          error.stderr?.toString() ?? ""
        )
    );
  } finally {
    if (existsSync(mutationPath)) unlinkSync(mutationPath);
  }
});

test("the public-safety gate rejects private locators in published evaluation evidence", () => {
  mkdirSync(evaluationRunDirectory, { recursive: true });
  const mutationPath = path.join(evaluationRunDirectory, "__mutation__.json");
  try {
    writeFileSync(
      mutationPath,
      JSON.stringify({ prompt: "Inspect /private/tmp/private-candidate." })
    );
    assert.throws(
      () =>
        execFileSync(
          process.execPath,
          [path.join(repoRoot, "scripts/check-public-safety.mjs")],
          {
            cwd: repoRoot,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"]
          }
        ),
      (error) =>
        /published evaluation evidence contains a private local filesystem locator/.test(
          error.stderr?.toString() ?? ""
        )
    );
  } finally {
    if (existsSync(mutationPath)) unlinkSync(mutationPath);
  }
});

test("the public-safety gate scans the complete published QA evidence tree", () => {
  mkdirSync(evaluationQaDirectory, { recursive: true });
  const mutationPath = path.join(evaluationQaDirectory, "__mutation__.md");
  try {
    writeFileSync(
      mutationPath,
      "Review source: /Users/example/private-evaluation-source\n"
    );
    assert.throws(
      () =>
        execFileSync(
          process.execPath,
          [path.join(repoRoot, "scripts/check-public-safety.mjs")],
          {
            cwd: repoRoot,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"]
          }
        ),
      (error) =>
        /published evaluation evidence contains a private local filesystem locator/.test(
          error.stderr?.toString() ?? ""
        )
    );
  } finally {
    if (existsSync(mutationPath)) unlinkSync(mutationPath);
  }
});

test("the public-safety gate rejects an undeclared public font", () => {
  mkdirSync(publicFontsDirectory, { recursive: true });
  const mutationPath = path.join(publicFontsDirectory, "__mutation__.ttf");
  try {
    writeFileSync(mutationPath, "not an approved font");
    assert.throws(
      () =>
        execFileSync(
          process.execPath,
          [path.join(repoRoot, "scripts/check-public-safety.mjs")],
          {
            cwd: repoRoot,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"]
          }
        ),
      (error) =>
        /font file is not an exact licensed asset approved/.test(
          error.stderr?.toString() ?? ""
        )
    );
  } finally {
    if (existsSync(mutationPath)) unlinkSync(mutationPath);
  }
});

test("the public-safety gate rejects checksum drift in an approved font", () => {
  const fontPath = path.join(
    publicFontsDirectory,
    "karla/Karla-Medium.ttf"
  );
  const original = readFileSync(fontPath);
  try {
    writeFileSync(fontPath, Buffer.concat([original, Buffer.from("drift")]));
    assert.throws(
      () =>
        execFileSync(
          process.execPath,
          [path.join(repoRoot, "scripts/check-public-safety.mjs")],
          {
            cwd: repoRoot,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"]
          }
        ),
      (error) =>
        /approved social-preview font checksum drifted/.test(
          error.stderr?.toString() ?? ""
        )
    );
  } finally {
    writeFileSync(fontPath, original);
  }
});
