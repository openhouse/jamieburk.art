#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const source = resolve(
  "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.html"
);
const output = resolve(
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);
const extractedText = resolve(
  "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.txt"
);
const chrome =
  process.env.CHROME_BIN ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

mkdirSync(dirname(output), { recursive: true });
const result = spawnSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${output}`,
    pathToFileURL(source).href
  ],
  { encoding: "utf8" }
);

if (result.status !== 0 || result.error) {
  process.stderr.write(
    result.error?.stack ?? result.stderr ?? result.stdout ?? "Chrome PDF generation failed"
  );
  process.exit(result.status ?? 1);
}

const textResult = spawnSync("pdftotext", ["-layout", output, extractedText], {
  encoding: "utf8"
});
if (textResult.status !== 0 || textResult.error) {
  process.stderr.write(
    textResult.error?.stack ??
      textResult.stderr ??
      textResult.stdout ??
      "PDF text extraction failed"
  );
  process.exit(textResult.status ?? 1);
}

process.stdout.write(`Wrote ${output}\nWrote ${extractedText}\n`);
