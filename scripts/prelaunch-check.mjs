import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const scanRoots = ["apps/www/src", "apps/www/public"];

const blockers = [
  { label: "TODO: Jamie approval required", pattern: /TODO: Jamie approval required/ },
  { label: "Placeholder resume PDF", pattern: /Placeholder resume PDF/ },
  { label: "visibility: private", pattern: /visibility: private/ },
  { label: "status: Draft", pattern: /status: Draft/ },
  { label: "PRIVATE", pattern: /PRIVATE/ },
  { label: "CONFIDENTIAL", pattern: /CONFIDENTIAL/ },
  { label: "raw Otter", pattern: /raw Otter/ },
  { label: "transcript", pattern: /transcript/ },
  { label: "api key", pattern: /api key/i },
  {
    label: "token",
    pattern: /\b(api|auth|access|bearer|refresh|session)[_-]?\s*token\b/i
  },
  { label: "password", pattern: /\bpassword\b/i },
  { label: "secret", pattern: /\bsecret\b/i }
];

const ignoredNames = new Set([".DS_Store"]);

async function collectFiles(target) {
  const absolute = path.join(root, target);
  const info = await stat(absolute);

  if (info.isFile()) {
    return [absolute];
  }

  const entries = await readdir(absolute, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => !ignoredNames.has(entry.name))
      .map((entry) => collectFiles(path.join(target, entry.name)))
  );

  return nested.flat();
}

const files = (await Promise.all(scanRoots.map(collectFiles))).flat();
const failures = [];

for (const file of files) {
  const content = await readFile(file, "utf8");
  const relative = path.relative(root, file);

  for (const blocker of blockers) {
    if (blocker.pattern.test(content)) {
      failures.push({ file: relative, pattern: blocker.label });
    }
  }
}

if (failures.length > 0) {
  console.error("Prelaunch blockers found:");
  for (const failure of failures) {
    console.error(`- ${failure.file}: ${failure.pattern}`);
  }
  process.exit(1);
}

console.log(`Prelaunch check passed across ${files.length} files.`);
