import { existsSync, realpathSync } from "node:fs";
import path from "node:path";

const windowsAbsolutePath = /^[A-Za-z]:[\\/]/;

export function resolveRepoEvidencePath(repoRoot, candidate, allowedRoots) {
  if (typeof candidate !== "string" || !candidate.trim()) {
    return { error: "evidence path is required" };
  }

  const portable = candidate.replaceAll("\\", "/");
  const normalized = path.posix.normalize(portable);
  if (
    path.isAbsolute(candidate) ||
    windowsAbsolutePath.test(candidate) ||
    portable.startsWith("//") ||
    normalized === ".." ||
    normalized.startsWith("../") ||
    normalized.includes("/../")
  ) {
    return { error: `evidence path escapes the repository: ${candidate}` };
  }

  const normalizedRoots = allowedRoots.map((root) => path.posix.normalize(root).replace(/\/$/, ""));
  const matchedRoot = normalizedRoots.find((root) => normalized === root || normalized.startsWith(`${root}/`));
  if (!matchedRoot) {
    return { error: `evidence path is outside approved roots (${normalizedRoots.join(", ")}): ${candidate}` };
  }

  const absolute = path.resolve(repoRoot, normalized);
  const relative = path.relative(repoRoot, absolute);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    return { error: `evidence path escapes the repository: ${candidate}` };
  }
  if (existsSync(absolute)) {
    try {
      const realRepoRoot = realpathSync(repoRoot);
      const realCandidate = realpathSync(absolute);
      const realApprovedRoot = realpathSync(path.resolve(repoRoot, matchedRoot));
      const approvedRootRelative = path.relative(realRepoRoot, realApprovedRoot);
      if (
        approvedRootRelative === ".." ||
        approvedRootRelative.startsWith(`..${path.sep}`) ||
        path.isAbsolute(approvedRootRelative)
      ) {
        return { error: `approved evidence root resolves outside the repository: ${matchedRoot}` };
      }
      const realRelative = path.relative(realApprovedRoot, realCandidate);
      if (realRelative === ".." || realRelative.startsWith(`..${path.sep}`) || path.isAbsolute(realRelative)) {
        return { error: `evidence path resolves outside its approved root: ${candidate}` };
      }
      return { path: realCandidate, relative: normalized };
    } catch {
      return { error: `evidence path cannot be resolved safely: ${candidate}` };
    }
  }
  return { path: absolute, relative: normalized };
}
