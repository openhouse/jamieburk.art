import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const pathsToScan = [
  "apps/www/src",
  "apps/www/public",
  "docs",
  "README.md",
  "AGENTS.md"
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

function lineNumberFor(text, index) {
  return text.slice(0, index).split("\n").length;
}

function isAllowedDocumentationMention(relativePath, text, index, pattern) {
  if (pattern !== "TODO: Jamie approval required") {
    return false;
  }

  if (relativePath !== "README.md" && relativePath !== "AGENTS.md") {
    return false;
  }

  const lineStart = text.lastIndexOf("\n", index) + 1;
  const lineEnd = text.indexOf("\n", index);
  const line = text.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);

  return line.includes("When uncertain");
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

    const text = fs.readFileSync(file).toString("utf8");
    const fileRelativePath = path.relative(ROOT, file);

    for (const pattern of forbidden) {
      let index = text.indexOf(pattern);

      while (index !== -1) {
        if (!isAllowedDocumentationMention(fileRelativePath, text, index, pattern)) {
          failures.push(
            `${fileRelativePath}:${lineNumberFor(text, index)} contains ${JSON.stringify(
              pattern
            )}`
          );
        }

        index = text.indexOf(pattern, index + pattern.length);
      }
    }
  }
}

if (fs.existsSync(resumePath)) {
  const resumeText = fs.readFileSync(resumePath).toString("latin1");

  if (
    resumeText.includes("Placeholder resume PDF") ||
    resumeText.includes("Replace with approved current resume")
  ) {
    failures.push("Resume PDF is still the placeholder file.");
  }
} else {
  failures.push("Resume PDF is missing.");
}

if (failures.length > 0) {
  console.error("Production safety check failed:");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Production safety check passed.");
