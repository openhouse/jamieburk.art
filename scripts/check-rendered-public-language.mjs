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
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, "");
}

// Next's generated HTML has quoted attributes. Inspect reader text, metadata
// and accessible labels, not class names, URLs or serialized application state.
function readerText(markup) {
  const labels = [...markup.matchAll(/\s(?:content|alt|aria-label|aria-description|title)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)]
    .map((match) => match[1] ?? match[2]);
  const text = markup
    .replace(/<\/?(?:p|div|section|article|ul|ol|li|dl|dt|dd|table|tr|td|th|h[1-6]|br|hr|main|header|footer|nav)\b[^>]*>/gi, " ")
    .replace(/<[^>]*>/g, "");
  return [text, ...labels].join("\n")
    .replace(/&#(x[0-9a-f]+|\d+);/gi, (entity, code) => {
      const point = /^x/i.test(code) ? parseInt(code.slice(1), 16) : Number(code);
      return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    })
    .replace(/&(?:nbsp|Tab|NewLine);/gi, " ")
    .replace(/&(?:apos|#x27);/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, "&")
    .replace(/[\u2010\u2011]/g, "-")
    .replace(/\s+/g, " ").trim();
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
  const findings = [...markup.matchAll(pattern)].map((match) => ({
    path: relativePath,
    term: match[0],
    excerpt: excerptAround(markup, match.index, match[0].length)
  }));
  const text = readerText(markup);
  for (const rule of [...(config.forbiddenPatterns ?? []), ...(config.forbiddenRenderedPatterns ?? [])]) {
    for (const match of text.matchAll(new RegExp(rule.pattern, "gi"))) {
      findings.push({
        path: relativePath, term: match[0], patternId: rule.id,
        excerpt: excerptAround(text, match.index, match[0].length)
      });
    }
  }
  return findings;
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
    `Rendered public-language eval passed: ${result.renderedPages} built HTML pages contain no prohibited terms or editorial instructions in inspected reader text and metadata.`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
