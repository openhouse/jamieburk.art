import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

function lines(value) {
  return value.split("\n").filter(Boolean);
}

export function validateAppendOnlySnapshots(path, currentText, historicalSnapshots) {
  const errors = [];
  const currentLines = lines(currentText);
  for (const snapshot of historicalSnapshots) {
    const historicalLines = lines(snapshot);
    if (historicalLines.length > currentLines.length) {
      errors.push(`${path} deleted ${historicalLines.length - currentLines.length} append-only record(s)`);
      continue;
    }
    for (let index = 0; index < historicalLines.length; index += 1) {
      if (historicalLines[index] !== currentLines[index]) {
        errors.push(`${path} rewrote append-only record ${index + 1}`);
        break;
      }
    }
  }
  return errors;
}

export function validateAppendOnlyGitHistory(path) {
  const currentText = readFileSync(path, "utf8");
  let revisions = [];
  try {
    revisions = execFileSync("git", ["log", "--format=%H", "--", path], { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
  } catch {
    return [`${path} could not read Git history for append-only validation`];
  }
  const snapshots = [];
  for (const revision of revisions) {
    try {
      snapshots.push(execFileSync("git", ["show", `${revision}:${path}`], { encoding: "utf8" }));
    } catch {
      // The file did not exist at this revision.
    }
  }
  return validateAppendOnlySnapshots(path, currentText, snapshots);
}
