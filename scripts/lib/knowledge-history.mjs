import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const knowledgeEventTypes = [
  "intake-receipt",
  "amendment",
  "retirement",
  "promotion-decision"
];

export const knowledgeEventVisibilities = [
  "public-safe",
  "private-reference",
  "protected-reference"
];

export const knowledgeEventDispositions = [
  "promote",
  "defer",
  "not-for-current-purpose",
  "retire"
];

const STABLE_ID_PATTERN = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const PRIVATE_PATTERN = /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|Mobile Documents|supporting-materials)/i;

function lines(text) {
  return text.split("\n").filter(Boolean);
}

export function validateKnowledgeEvent(event) {
  const findings = [];
  if (event?.version !== 1) findings.push("Event version must be 1");
  if (!STABLE_ID_PATTERN.test(event?.id ?? "")) findings.push("Event ID must be stable and hyphenated");
  if (!knowledgeEventTypes.includes(event?.type)) findings.push(`Unknown event type ${event?.type ?? "missing"}`);
  if (!DATE_PATTERN.test(event?.occurredAt ?? "")) findings.push("Event date must be YYYY-MM-DD");
  if (!event?.actor) findings.push("Event actor is required");
  if (!STABLE_ID_PATTERN.test(event?.subjectId ?? "")) findings.push("Subject ID must be stable and hyphenated");
  if (!event?.summary) findings.push("A public-safe summary is required");
  if (!knowledgeEventVisibilities.includes(event?.visibility)) findings.push(`Unknown visibility ${event?.visibility ?? "missing"}`);
  if (PRIVATE_PATTERN.test(JSON.stringify(event))) findings.push("Event contains a private filesystem path");
  if (event?.visibility !== "public-safe" && !STABLE_ID_PATTERN.test(event?.protectedLocatorId ?? "")) {
    findings.push("Non-public events require an opaque protected locator ID");
  }
  if (event?.visibility === "public-safe" && event?.protectedLocatorId) {
    findings.push("Public-safe events must not expose a protected locator ID");
  }
  if (["amendment", "retirement"].includes(event?.type) && !STABLE_ID_PATTERN.test(event?.supersedesEventId ?? "")) {
    findings.push(`${event.type} events require a superseded event ID`);
  }
  if (event?.type === "promotion-decision" && !knowledgeEventDispositions.includes(event?.disposition)) {
    findings.push("Promotion decisions require a valid disposition");
  }
  if (event?.type !== "promotion-decision" && event?.disposition) {
    findings.push("Only promotion decisions may carry a disposition");
  }
  if (["defer", "not-for-current-purpose", "retire"].includes(event?.disposition) && !event?.reason) {
    findings.push(`${event.disposition} requires a reason`);
  }
  return findings;
}

export function parseKnowledgeHistory(text) {
  const events = [];
  const findings = [];
  for (const [index, line] of lines(text).entries()) {
    try {
      const event = JSON.parse(line);
      for (const finding of validateKnowledgeEvent(event)) findings.push(`Line ${index + 1}: ${finding}`);
      events.push(event);
    } catch (error) {
      findings.push(`Line ${index + 1}: invalid JSON (${error.message})`);
    }
  }
  const ids = new Set();
  for (const event of events) {
    if (ids.has(event.id)) findings.push(`Duplicate event ID ${event.id}`);
    ids.add(event.id);
  }
  for (const event of events) {
    if (event.supersedesEventId && !ids.has(event.supersedesEventId)) {
      findings.push(`${event.id} supersedes unknown event ${event.supersedesEventId}`);
    }
  }
  return { events, findings };
}

export function validateAppendOnlySnapshots(currentText, historicalSnapshots) {
  const findings = [];
  const currentLines = lines(currentText);
  for (const snapshot of historicalSnapshots) {
    const historicalLines = lines(snapshot);
    if (historicalLines.length > currentLines.length) {
      findings.push(`Deleted ${historicalLines.length - currentLines.length} append-only event(s)`);
      continue;
    }
    for (let index = 0; index < historicalLines.length; index += 1) {
      if (historicalLines[index] !== currentLines[index]) {
        findings.push(`Rewrote append-only event ${index + 1}`);
        break;
      }
    }
  }
  return findings;
}

export function validateAppendOnlyGitHistory(repoRoot, relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!existsSync(absolutePath)) return [`Missing append-only history ${relativePath}`];
  const currentText = readFileSync(absolutePath, "utf8");
  let revisions = [];
  try {
    revisions = execFileSync("git", ["log", "--format=%H", "--", relativePath], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).split("\n").filter(Boolean);
  } catch (error) {
    return [`Could not inspect Git history: ${error.message}`];
  }
  const snapshots = [];
  for (const revision of revisions) {
    try {
      snapshots.push(execFileSync("git", ["show", `${revision}:${relativePath}`], {
        cwd: repoRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      }));
    } catch {
      // The file did not exist at this revision.
    }
  }
  return [
    ...parseKnowledgeHistory(currentText).findings,
    ...validateAppendOnlySnapshots(currentText, snapshots)
  ];
}

export function appendKnowledgeEvent(filePath, event) {
  const findings = validateKnowledgeEvent(event);
  if (findings.length) throw new Error(findings.join("; "));
  const existingText = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  const existing = parseKnowledgeHistory(existingText);
  if (existing.findings.length) throw new Error(existing.findings.join("; "));
  if (existing.events.some((item) => item.id === event.id)) throw new Error(`Duplicate event ID ${event.id}`);
  if (event.supersedesEventId && !existing.events.some((item) => item.id === event.supersedesEventId)) {
    throw new Error(`Unknown superseded event ${event.supersedesEventId}`);
  }
  appendFileSync(filePath, `${JSON.stringify(event)}\n`);
}

export function publicKnowledgeEvent(event) {
  const { protectedLocatorId: _protectedLocatorId, ...publicEvent } = event;
  return publicEvent;
}
