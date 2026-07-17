import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const governedRoots = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/eslint.config.mjs",
  "apps/www/mdx-components.tsx",
  "apps/www/next-env.d.ts",
  "apps/www/next.config.ts",
  "apps/www/postcss.config.mjs",
  "apps/www/tsconfig.json",
  "scripts",
  "evals/knowledge-lifecycle",
  "evals/launch-readiness",
  "docs/knowledge-bank",
  "docs/chad-lens.md",
  "docs/deployment.md",
  "docs/production-cutover.md",
  "docs/production-readiness.md",
  "DESIGN.md",
  "PRODUCT.md",
  "README.md",
  "Dockerfile",
  "app.json",
  "package.json",
  "package-lock.json",
  "apps/www/package.json"
];

const ignoredNames = new Set([
  ".DS_Store",
  "assessment.latest.json",
  "assessment.template.json"
]);

function walk(root, relative = "") {
  const absolute = path.join(root, relative);
  if (!existsSync(absolute)) return [];
  const entries = readdirSync(absolute, { withFileTypes: true });
  return entries.flatMap((entry) => {
    if (ignoredNames.has(entry.name)) return [];
    const child = path.join(relative, entry.name);
    return entry.isDirectory() ? walk(root, child) : [child];
  });
}

function governedFiles(repoRoot) {
  return governedRoots
    .flatMap((entry) => {
      const absolute = path.join(repoRoot, entry);
      if (!existsSync(absolute)) return [];
      return readdirSafe(absolute)
        ? walk(absolute).map((child) => path.join(entry, child))
        : [entry];
    })
    .sort();
}

function readdirSafe(file) {
  try {
    readdirSync(file);
    return true;
  } catch {
    return false;
  }
}

function hashFiles(repoRoot, files) {
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(file);
    hash.update("\0");
    hash.update(readFileSync(path.join(repoRoot, file)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function git(repoRoot, args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  }).trim();
}

export function suiteFingerprint(suite) {
  return createHash("sha256").update(JSON.stringify(suite)).digest("hex");
}

export function currentCandidateSnapshot({ repoRoot, suite }) {
  const files = governedFiles(repoRoot);
  return {
    commit: git(repoRoot, ["rev-parse", "HEAD"]),
    contentFingerprint: hashFiles(repoRoot, files),
    suiteFingerprint: suiteFingerprint(suite),
    governedFileCount: files.length
  };
}

export function validateCandidateSnapshot(
  candidate,
  { repoRoot, suite, requireCommitBinding = true }
) {
  const failures = [];
  if (!candidate?.commit || !/^[0-9a-f]{40}$/.test(candidate.commit)) {
    failures.push("Assessment requires a full candidate commit SHA");
  }
  if (!candidate?.contentFingerprint || !/^[0-9a-f]{64}$/.test(candidate.contentFingerprint)) {
    failures.push("Assessment requires a candidate content fingerprint");
  }
  if (!candidate?.suiteFingerprint || !/^[0-9a-f]{64}$/.test(candidate.suiteFingerprint)) {
    failures.push("Assessment requires an eval-suite fingerprint");
  }

  let current;
  try {
    current = currentCandidateSnapshot({ repoRoot, suite });
  } catch (error) {
    failures.push(`Could not fingerprint the current candidate: ${error.message}`);
    return failures;
  }

  if (candidate.contentFingerprint !== current.contentFingerprint) {
    failures.push("Assessment content fingerprint does not match the current governed candidate");
  }
  if (candidate.suiteFingerprint !== current.suiteFingerprint) {
    failures.push("Assessment suite fingerprint does not match the active eval contract");
  }
  if (candidate.governedFileCount !== current.governedFileCount) {
    failures.push("Assessment governed-file count does not match the current candidate");
  }

  if (requireCommitBinding && /^[0-9a-f]{40}$/.test(candidate?.commit ?? "")) {
    try {
      git(repoRoot, ["cat-file", "-e", `${candidate.commit}^{commit}`]);
      const pathspecs = [
        ...governedRoots,
        ":(exclude)evals/knowledge-lifecycle/assessment.latest.json",
        ":(exclude)evals/knowledge-lifecycle/assessment.template.json",
        ":(exclude)evals/launch-readiness/assessment.latest.json",
        ":(exclude)evals/launch-readiness/assessment.template.json"
      ];
      execFileSync("git", ["diff", "--quiet", candidate.commit, "--", ...pathspecs], {
        cwd: repoRoot,
        stdio: "ignore"
      });
    } catch {
      failures.push("Candidate commit does not contain the current governed files");
    }
  }

  return failures;
}

export function fingerprintJson(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}
