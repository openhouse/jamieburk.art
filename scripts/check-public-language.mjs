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
    .map((entry) => new RegExp(entry.pattern, "gi"));
  const termPattern = new RegExp(
    `\\b(?:${config.forbiddenStandaloneTerms
      .map(escapeRegularExpression)
      .join("|")})\\b`,
    "gi"
  );
  const scanStandaloneTerms = !(config.standaloneTermExemptPaths ?? []).includes(
    relativePath
  );

  const forbiddenPatterns = (config.forbiddenPatterns ?? []).map((entry) => ({
    ...entry,
    expression: new RegExp(entry.pattern, "gi")
  }));

  // Keep source offsets while exempting only the configured field expression.
  // An internal state must not hide neighboring public prose on the same line.
  const inspectable = exemptions.reduce((value, expression) =>
    value.replace(expression, (match) => match.replace(/[^\r\n]/g, " ")), text);
  const matches = scanStandaloneTerms
    ? [...inspectable.matchAll(termPattern)].map((match) => ({ match, patternId: null }))
    : [];
  for (const entry of forbiddenPatterns) {
    matches.push(...[...inspectable.matchAll(entry.expression)].map((match) => ({
      match,
      patternId: entry.id
    })));
  }
  return matches
    .sort((a, b) => (a.match.index ?? 0) - (b.match.index ?? 0))
    .map(({ match, patternId }) => {
      const line = inspectable.slice(0, match.index).split(/\r?\n/).length;
      return {
        path: relativePath,
        line,
        term: match[0],
        patternId,
        excerpt: match[0].includes("\n")
          ? match[0].replace(/\s+/g, " ").trim()
          : text.split(/\r?\n/)[line - 1].trim()
      };
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
