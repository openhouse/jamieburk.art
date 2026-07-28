#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  buildCorpus,
  corpusRelativeRoot,
  defaultRepoRoot
} from "./lib.mjs";

const configPath = path.join(
  defaultRepoRoot,
  "scripts/public-testimony/configs/hearings.json"
);
const configs = JSON.parse(readFileSync(configPath, "utf8"));
const sources = new Map(
  process.argv
    .slice(2)
    .filter((argument) => argument.startsWith("--source="))
    .map((argument) => {
      const assignment = argument.slice("--source=".length);
      const separator = assignment.indexOf("=");
      if (separator === -1) {
        throw new Error(`Invalid source assignment: ${argument}`);
      }
      return [
        assignment.slice(0, separator),
        assignment.slice(separator + 1)
      ];
    })
);

if (!sources.size) {
  console.error(
    "Usage: node scripts/public-testimony/build.mjs " +
      "--source=<corpus-id>=<local-pdftotext-file> [...]"
  );
  process.exit(1);
}

const destination = path.join(defaultRepoRoot, corpusRelativeRoot);
mkdirSync(destination, { recursive: true });
const manifest = {
  schemaVersion: 1,
  generatedAt: "2026-07-28",
  boundary:
    "Each corpus is derived from an official public hearing transcript. " +
    "Support classification is editorial metadata, not institutional endorsement or causal proof.",
  corpora: []
};

for (const config of configs) {
  const sourcePath = sources.get(config.id);
  if (!sourcePath) continue;
  if (!existsSync(sourcePath)) {
    throw new Error(`Missing transcript source for ${config.id}`);
  }
  const transcript = readFileSync(sourcePath, "utf8");
  const corpus = buildCorpus({ transcript, config });
  const file = `${config.id}.json`;
  writeFileSync(
    path.join(destination, file),
    `${JSON.stringify(corpus, null, 2)}\n`
  );
  manifest.corpora.push({ id: corpus.id, file });
  console.log(
    `${corpus.id}: ${corpus.speakers.length} speakers, ` +
      `${corpus.speakers.filter((speaker) => speaker.fullTextIncluded).length} full-text inclusions`
  );
}

writeFileSync(
  path.join(destination, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`
);
