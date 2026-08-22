#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const config = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/page-owners/colophon.json"), "utf8")
);
const packet = config.publicPacket;
const combined = readFileSync(
  path.join(repoRoot, packet.renderedTextPath),
  "utf8"
);
const divider = "\n\nPUBLIC INTERACTION: SOURCE NOTES EXPANDED\n\n";
const parts = combined.split(divider);

if (parts.length !== 2 || parts.some((part) => part.trim().length < 700)) {
  throw new Error(
    "The rendered colophon packet must contain one substantial default state and one substantial expanded state."
  );
}

writeFileSync(
  path.join(repoRoot, packet.defaultRenderedTextPath),
  `${parts[0].trim()}\n`,
  "utf8"
);

console.log(
  `Wrote ${packet.defaultRenderedTextPath} from the exact default public state.`
);
