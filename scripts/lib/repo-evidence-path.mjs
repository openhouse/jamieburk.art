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
  const allowed = normalizedRoots.some((root) => normalized === root || normalized.startsWith(`${root}/`));
  if (!allowed) {
    return { error: `evidence path is outside approved roots (${normalizedRoots.join(", ")}): ${candidate}` };
  }

  const absolute = path.resolve(repoRoot, normalized);
  const relative = path.relative(repoRoot, absolute);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    return { error: `evidence path escapes the repository: ${candidate}` };
  }
  return { path: absolute, relative: normalized };
}
