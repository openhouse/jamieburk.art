import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defaultConfigPath, repositoryRoot } from "./check-public-language.mjs";

const defaultBuildRoot = path.join(repositoryRoot, "apps/www/.next/server/app");

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectHtmlFiles(entryPath)));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(entryPath);
  }
  return files;
}

export function inspectablePublicMarkup(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");
}

function excerptAround(markup, index, length) {
  return markup
    .slice(Math.max(0, index - 100), Math.min(markup.length, index + length + 160))
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:#x27|apos);/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function evaluateRenderedMarkup({ config, html, relativePath }) {
  const markup = inspectablePublicMarkup(html);
  const pattern = new RegExp(
    `\\b(?:${config.forbiddenStandaloneTerms.join("|")})\\b`,
    "gi"
  );
  return [...markup.matchAll(pattern)].map((match) => ({
    path: relativePath,
    term: match[0],
    excerpt: excerptAround(markup, match.index, match[0].length)
  }));
}

export async function evaluateRenderedPublicLanguage({
  buildRoot = defaultBuildRoot,
  configPath = defaultConfigPath
} = {}) {
  const config = JSON.parse(await readFile(configPath, "utf8"));
  const htmlFiles = await collectHtmlFiles(buildRoot);
  const findings = [];
  for (const filePath of htmlFiles) {
    findings.push(
      ...evaluateRenderedMarkup({
        config,
        html: await readFile(filePath, "utf8"),
        relativePath: path.relative(buildRoot, filePath)
      })
    );
  }
  return { findings, renderedPages: htmlFiles.length };
}

async function main() {
  const result = await evaluateRenderedPublicLanguage();
  if (result.findings.length > 0) {
    console.error(
      `Rendered public-language eval failed with ${result.findings.length} prohibited occurrence(s):`
    );
    for (const finding of result.findings) {
      console.error(`- ${finding.path} [${finding.term}] ${finding.excerpt}`);
    }
    process.exitCode = 1;
    return;
  }
  console.log(
    `Rendered public-language eval passed: ${result.renderedPages} built HTML pages contain no prohibited standalone terms outside application scripts.`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
