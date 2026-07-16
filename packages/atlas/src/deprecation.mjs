import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const ignoredDirectories = new Set([".git", ".next", "node_modules", "dist", "coverage"]);
const sourceExtensions = new Set([".js", ".mjs", ".ts", ".tsx"]);

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return ignoredDirectories.has(entry.name) ? [] : walk(absolute);
    return entry.isFile() && sourceExtensions.has(path.extname(entry.name)) ? [absolute] : [];
  });
}

export function findDeprecatedKnowledgeBankImports(repoRoot) {
  const allowed = new Set([
    path.join(repoRoot, "packages/atlas/src/legacy.mjs")
  ]);
  const roots = [path.join(repoRoot, "apps/www/src"), path.join(repoRoot, "packages"), path.join(repoRoot, "scripts")];
  const pattern = /(?:from\s+|import\s*\()["'][^"']*knowledge-bank\/records(?:\.ts)?["']/;
  return roots.flatMap(walk).flatMap((file) => {
    if (allowed.has(file)) return [];
    const content = readFileSync(file, "utf8");
    return pattern.test(content) ? [path.relative(repoRoot, file)] : [];
  }).sort();
}
