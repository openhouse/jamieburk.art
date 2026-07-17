import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const intakeQueuePath = "docs/knowledge-bank/intake/receipts.jsonl";

export const unsafePublicTextPatterns = [
  ["local user path", /\/Users\//i],
  ["local volume path", /\/Volumes\//i],
  ["temporary path", /\/(?:private\/)?tmp\//i],
  ["iCloud container path", /Mobile Documents\/com~apple~CloudDocs/i],
  ["credential-like value", /\b(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b/],
  ["private email", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ["raw transcript marker", /\b(?:raw transcript|otter\.ai|private correspondence)\b/i]
];

export function assertPublicSafeText(value, label = "value") {
  for (const [reason, pattern] of unsafePublicTextPatterns) {
    if (pattern.test(value ?? "")) throw new Error(`${label} contains ${reason}`);
  }
}

export function stableId(value) {
  return value
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

export function readJsonLines(repoRoot, relativePath = intakeQueuePath) {
  const absolute = path.join(repoRoot, relativePath);
  if (!existsSync(absolute)) return [];
  return readFileSync(absolute, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`${relativePath}:${index + 1} is invalid JSON: ${error.message}`);
      }
    });
}

export function publicSourceView(source) {
  const {
    protectedLocatorId: _protectedLocatorId,
    media: _media,
    ...safe
  } = source;
  return safe;
}

