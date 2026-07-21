import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const disclosedIdentityDirective =
  /[Dd]o not (?:name|identify)\s+(?!the protected collaborator\b)[A-Z][a-z'-]+(?:\s+[A-Z][a-z'-]+)+/g;

export function disclosesProtectedIdentity(text) {
  disclosedIdentityDirective.lastIndex = 0;
  return disclosedIdentityDirective.test(text);
}

export function findDisclosedProtectedIdentityDirectives(repoRoot) {
  const files = execFileSync("git", ["ls-files", "docs/knowledge-bank"], {
    cwd: repoRoot,
    encoding: "utf8"
  })
    .trim()
    .split("\n")
    .filter((file) => file.endsWith(".md"));
  return files.filter((file) =>
    disclosesProtectedIdentity(readFileSync(path.join(repoRoot, file), "utf8"))
  );
}
