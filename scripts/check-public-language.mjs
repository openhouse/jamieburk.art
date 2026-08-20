import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
export const repositoryRoot = path.resolve(scriptDirectory, "..");
export const defaultConfigPath = path.join(
  repositoryRoot,
  "evals/public-language/public-surface-terminology.json"
);

function escapeRegularExpression(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function collectFiles(targetPath) {
  const targetStat = await stat(targetPath);
  if (targetStat.isFile()) return [targetPath];

  const entries = await readdir(targetPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const entryPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(entryPath)));
    if (entry.isFile()) files.push(entryPath);
  }
  return files;
}

export function evaluatePublicText({ config, relativePath, text }) {
  const exemptions = config.lineExemptions
    .filter((entry) => entry.path === relativePath)
    .map((entry) => new RegExp(entry.pattern, "i"));
  const termPattern = new RegExp(
    `\\b(?:${config.forbiddenStandaloneTerms
      .map(escapeRegularExpression)
      .join("|")})\\b`,
    "gi"
  );

  return text.split(/\r?\n/).flatMap((line, index) => {
    if (exemptions.some((pattern) => pattern.test(line))) return [];
    const matches = [...line.matchAll(termPattern)];
    return matches.map((match) => ({
      path: relativePath,
      line: index + 1,
      term: match[0],
      excerpt: line.trim()
    }));
  });
}

export async function evaluatePublicLanguage({
  configPath = defaultConfigPath,
  root = repositoryRoot
} = {}) {
  const config = JSON.parse(await readFile(configPath, "utf8"));
  const selected = new Map();

  for (const surface of config.surfaces) {
    const absoluteRoot = path.join(root, surface.root);
    const namePattern = surface.fileNamePattern
      ? new RegExp(surface.fileNamePattern)
      : null;
    for (const filePath of await collectFiles(absoluteRoot)) {
      if (!surface.extensions.includes(path.extname(filePath))) continue;
      if (namePattern && !namePattern.test(path.basename(filePath))) continue;
      selected.set(filePath, path.relative(root, filePath));
    }
  }

  const findings = [];
  for (const [filePath, relativePath] of selected) {
    findings.push(
      ...evaluatePublicText({
        config,
        relativePath,
        text: await readFile(filePath, "utf8")
      })
    );
  }

  return {
    config,
    findings,
    scannedFiles: selected.size
  };
}

async function main() {
  const result = await evaluatePublicLanguage();
  if (result.findings.length > 0) {
    console.error(
      `Public-language eval failed with ${result.findings.length} prohibited occurrence(s):`
    );
    for (const finding of result.findings) {
      console.error(
        `- ${finding.path}:${finding.line} [${finding.term}] ${finding.excerpt}`
      );
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `Public-language eval passed: ${result.scannedFiles} public-surface and hiring-artifact files contain no prohibited standalone terms.`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
