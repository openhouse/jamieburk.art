import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { scanTextForPublicSafetyTerms } from "../src/lib/public-safety.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(scriptDir, "..");
const contentRoot = path.join(appRoot, "content");

async function walkFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return walkFiles(entryPath);
      }

      return entry.isFile() && /\.(md|mdx)$/.test(entry.name) ? [entryPath] : [];
    })
  );

  return files.flat().sort();
}

const files = await walkFiles(contentRoot);
const findings = [];

for (const filePath of files) {
  const text = await fs.readFile(filePath, "utf8");
  const fileFindings = scanTextForPublicSafetyTerms(text);

  for (const finding of fileFindings) {
    findings.push({
      filePath: path.relative(appRoot, filePath),
      ...finding
    });
  }
}

if (findings.length > 0) {
  console.error("Public-safety tripwire found terms that need review:");

  for (const finding of findings) {
    console.error(`- ${finding.filePath}: "${finding.term}" near character ${finding.index}`);
  }

  process.exitCode = 1;
} else {
  console.log(`Public-safety tripwire passed for ${files.length} content files.`);
}
