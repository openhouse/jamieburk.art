import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const pathsToScan = [
  "apps/www/src",
  "apps/www/public",
  "README.md",
  "AGENTS.md",
  "docs"
];

const forbidden = [
  "TODO: Jamie approval required",
  "Placeholder resume PDF",
  "Replace the placeholder",
  "placeholder PDF",
  "Public email pending confirmation",
  "LinkedIn pending",
  "GitHub pending"
];

const resumePath = path.join(
  ROOT,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

function walk(filePath) {
  const stat = fs.statSync(filePath);

  if (stat.isDirectory()) {
    return fs
      .readdirSync(filePath)
      .flatMap((name) => walk(path.join(filePath, name)));
  }

  return [filePath];
}

function readSearchableText(filePath) {
  const buffer = fs.readFileSync(filePath);

  return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
}

const failures = [];

for (const relativePath of pathsToScan) {
  const absolutePath = path.join(ROOT, relativePath);

  if (!fs.existsSync(absolutePath)) {
    continue;
  }

  for (const file of walk(absolutePath)) {
    if (!fs.statSync(file).isFile()) {
      continue;
    }

    const text = readSearchableText(file);

    for (const pattern of forbidden) {
      if (text.includes(pattern)) {
        failures.push(
          `${path.relative(ROOT, file)} contains ${JSON.stringify(pattern)}`
        );
      }
    }
  }
}

if (fs.existsSync(resumePath)) {
  const resumeText = readSearchableText(resumePath);

  if (
    resumeText.includes("Placeholder resume PDF") ||
    resumeText.includes("Replace with approved current resume")
  ) {
    failures.push("Resume PDF is still the placeholder file.");
  }
} else {
  failures.push("Resume PDF is missing.");
}

if (failures.length) {
  console.error("Production safety check failed:");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Production safety check passed.");
