#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import {
  loadCitationBundle,
  repoRoot,
  validateCitationBundle,
  validateMdxDrift,
  validatePublicCallnycCopy
} from "./lib/citation-model.mjs";

export function runCitationCheck(bundle = loadCitationBundle()) {
  const graph = validateCitationBundle(bundle);
  const failures = [
    ...graph.failures,
    ...validateMdxDrift(bundle),
    ...validatePublicCallnycCopy()
  ];

  const components = [
    "apps/www/src/components/citations/Cite.tsx",
    "apps/www/src/components/citations/References.tsx"
  ].map((file) => readFileSync(path.join(repoRoot, file), "utf8")).join("\n");
  for (const token of ["doc-noteref", "doc-endnotes", "doc-backlink", "aria-label", "<ol"] ) {
    if (!components.includes(token)) failures.push(`Citation components are missing ${token}`);
  }

  return { failures, warnings: graph.warnings };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const result = runCitationCheck();
    result.warnings.forEach((warning) => console.warn(`Citation warning: ${warning}`));
    if (result.failures.length) {
      result.failures.forEach((failure) => console.error(`Citation check failed: ${failure}`));
      process.exit(1);
    }
    console.log(`Citation check passed with ${result.warnings.length} warning(s).`);
    if (process.argv.includes("--links")) {
      console.warn("External link checking is intentionally manual; no URLs were fetched.");
    }
  } catch (error) {
    console.error(`Citation check failed: ${error.message}`);
    process.exit(1);
  }
}
