import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defaultConfigPath, evaluatePublicText, repositoryRoot } from "./check-public-language.mjs";

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

function decodeEntities(value) {
  const named = { amp: "&", quot: '"', apos: "'", nbsp: " ", ensp: " ", emsp: " ", thinsp: " ", tab: " ", newline: " ", lt: "<", gt: ">", eacute: "é" };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|nbsp|ensp|emsp|thinsp|tab|newline|lt|gt|eacute);/gi, (entity, key) => {
    if (!key.startsWith("#")) return named[key.toLowerCase()] ?? entity;
    const point = key[1].toLowerCase() === "x"
      ? Number.parseInt(key.slice(2), 16)
      : Number.parseInt(key.slice(1), 10);
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
  });
}

export function evaluateRenderedMarkup({ config, html, relativePath }) {
  const markup = inspectablePublicMarkup(html);
  const findings = [];
  // Source-only exemptions cannot authorize the same text on a rendered page.
  const renderedConfig = { ...config, lineExemptions: [], standaloneTermExemptPaths: [] };
  let visibleText = "";
  const scan = (text, surface) => {
    findings.push(...evaluatePublicText({
      config: renderedConfig,
      relativePath,
      text: decodeEntities(text).replace(/\s+/g, " ").trim()
    }).map((finding) => ({ ...finding, surface })));
  };
  const flush = () => {
    scan(visibleText, "text");
    visibleText = "";
  };
  // Inspect Next-generated HTML, preserving inline prose but not combining
  // separate block elements, attributes, classes, URLs, or application scripts.
  for (const token of markup.matchAll(/<(?:[^"'<>]|"[^"]*"|'[^']*')*>|[^<]+/g)) {
    const value = token[0];
    if (!value.startsWith("<")) {
      visibleText += value;
      continue;
    }
    if (/^<br\b/i.test(value)) visibleText += " ";
    if (/^<\/?(?:html|head|body|main|header|footer|nav|section|article|aside|div|p|h[1-6]|li|ul|ol|dl|dt|dd|table|tr|td|th|blockquote|hr|meta|img|input|button)\b/i.test(value)) flush();
    const attributes = new Map([...value.matchAll(/\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)].map((attribute) => [
      attribute[1].toLowerCase(), attribute[2] ?? attribute[3] ?? attribute[4]
    ]));
    for (const [name, attributeValue] of attributes) {
      const readerAttribute = /^(?:aria-label|aria-description|alt|title|placeholder|content)$/.test(name);
      const buttonValue = name === "value" && /^<input\b/i.test(value) && /^(?:submit|button|reset)$/i.test(decodeEntities(attributes.get("type") ?? ""));
      if (readerAttribute || buttonValue) scan(attributeValue, "attribute:" + name);
    }
  }
  flush();
  return findings;
}

export async function evaluateRenderedPublicLanguage({
  buildRoot = defaultBuildRoot,
  configPath = defaultConfigPath
} = {}) {
  const config = JSON.parse(await readFile(configPath, "utf8"));
  const htmlFiles = await collectHtmlFiles(buildRoot);
  if (!htmlFiles.length) throw new Error("No built HTML pages found in " + buildRoot + "; build the public app before checking rendered language.");
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
    `Rendered public-language eval passed: ${result.renderedPages} built HTML pages contain no prohibited terms or configured phrases in reader-facing copy.`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
