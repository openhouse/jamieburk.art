import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const scanRoots = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/mdx-components.tsx",
  "apps/www/next.config.ts"
];

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt"
]);

const textBlockers = [
  {
    label: "approval TODO in public source",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "visible placeholder or launch replacement copy",
    pattern:
      /\b(?:placeholder|replace before launch|replace the placeholder|public email pending confirmation)\b/i
  },
  {
    label: "private font reference",
    pattern: /(?:\/s\/fonts\/|@font-face[\s\S]{0,240}(?:Trade Gothic|Verlag|Gotham Rounded|Risque|Maria|\/s\/fonts\/))/i
  },
  {
    label: "raw transcript marker",
    pattern: /(?:\botter\.ai\b|\braw transcript\b|\buncorrected transcript\b|\bSpeaker\s+\d+\s*:)/i
  },
  {
    label: "credential-looking assignment",
    pattern:
      /\b(?:password|passwd|pwd|api[_-]?key|secret|token|private[_-]?key)\b\s*[:=]\s*["'`][^"'`\s]{8,}["'`]/i
  },
  {
    label: "private local file path",
    pattern:
      /(?:\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio|\/Users\/jburkart|supporting-materials)/i
  }
];

const findings = [];

async function collectFiles(target) {
  const absolute = path.join(root, target);
  const info = await stat(absolute);

  if (info.isFile()) {
    return [absolute];
  }

  const entries = await readdir(absolute, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith("."))
      .map((entry) => collectFiles(path.join(target, entry.name)))
  );

  return nested.flat();
}

function addFinding(file, label, detail) {
  findings.push({
    file: path.relative(root, file),
    label,
    detail
  });
}

function scanText(file, text) {
  for (const blocker of textBlockers) {
    const match = text.match(blocker.pattern);

    if (match) {
      addFinding(file, blocker.label, match[0].replace(/\s+/g, " ").slice(0, 140));
    }
  }
}

function scanPdf(file, buffer) {
  const text = buffer.toString("latin1");

  if (/Placeholder resume PDF|Replace with approved current resume/i.test(text)) {
    addFinding(file, "placeholder resume PDF", "PDF contains placeholder resume copy");
  }

  if (
    path.basename(file) === "Jamie-Burkart-Resume-Technical-Project-Manager.pdf" &&
    buffer.byteLength < 10_000
  ) {
    addFinding(file, "resume PDF too small", "Resume PDF is small enough to look like a placeholder");
  }
}

for (const scanRoot of scanRoots) {
  const files = await collectFiles(scanRoot);

  for (const file of files) {
    const extension = path.extname(file);
    const buffer = await readFile(file);

    if (extension === ".pdf") {
      scanPdf(file, buffer);
      continue;
    }

    if (textExtensions.has(extension)) {
      scanText(file, buffer.toString("utf8"));
    }
  }
}

if (findings.length > 0) {
  console.error("Public-safety check failed:");

  for (const finding of findings) {
    console.error(`- ${finding.file}: ${finding.label} (${finding.detail})`);
  }

  process.exit(1);
}

console.log("Public-safety check passed.");
