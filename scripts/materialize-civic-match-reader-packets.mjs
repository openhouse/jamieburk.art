import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { deriveExpectedCivicMatchAudience, evaluateCivicMatchProfile } from "./evals-civic-match-profile.mjs";

function option(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? "" : process.argv[index + 1];
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const root = path.resolve(import.meta.dirname, "..");
const outputRoot = option("out-dir");
if (!outputRoot) throw new Error("Required: --out-dir <temporary-directory>");

const deterministic = evaluateCivicMatchProfile(root, { deterministicOnly: true });
if (!deterministic.pass) throw new Error(`Deterministic gate failed:\n${deterministic.failures.join("\n")}`);

const config = JSON.parse(readFileSync(path.join(root, "evals/opportunity-intake/civic-match.json"), "utf8"));
const manifest = JSON.parse(readFileSync(path.join(root, config.currentOpportunityManifest), "utf8"));
const audience = deriveExpectedCivicMatchAudience(root, config);
const guide = readFileSync(path.join(root, config.guidePath), "utf8");
const resume = readFileSync(path.join(root, manifest.resume.markdownPath), "utf8");
const source = readFileSync(path.join(root, "docs/knowledge-bank/sources/civic-match-candidate-network-2026-08-20.md"), "utf8");
const schema = readFileSync(path.join(root, "evals/civic-match/reader-output.schema.json"), "utf8");
const packetIndex = [];

for (const assignment of audience.all) {
  const packetId = slug(assignment.key);
  const directory = path.join(outputRoot, packetId);
  mkdirSync(directory, { recursive: true });
  const person = readFileSync(
    path.join(root, `docs/knowledge-bank/people/${assignment.personId.replace(/^person\./, "")}.md`),
    "utf8"
  );
  const opportunity = assignment.role === "hiring-reader"
    ? readFileSync(path.join(root, assignment.opportunityPath), "utf8")
    : source;
  const acceptance = assignment.acceptanceQuestion;
  const prompt = `# Reader task\n\nAct as a fictionalized analytical lens based only on the supplied public role context. You are not the real person and must not imply participation, quotation, endorsement, recommendation, or a hiring decision by them.\n\nReader: ${assignment.name}\nRelationship: ${assignment.relationship}\nAcceptance statement: ${acceptance}\nExact guide SHA-256: ${config.guideSha256}\n\nRead GUIDE.md, RESUME.md, OPPORTUNITY.md, and PERSON.md. Judge whether the candidate presentation creates serious, evidence-backed intent to hire or actively match this candidate, subject to the employer's normal application, interview, reference, and decision process. Use a demanding but evidence-based standard. Do not fail only because a separate employer-specific application component, interview, reference, or final authority is outside a Civic Match profile; list it as follow-up evidence. Do not inspect any other files, repository, account, or private source.\n\nReturn only JSON matching OUTPUT-SCHEMA.json. Copy the exact guide SHA-256 above into guideSha256. Set decision to pass exactly when acceptance is true. Give at least two concrete strengths, at least one honest risk, and at least one item of evidence to pursue in an interview or matching conversation.\n`;
  writeFileSync(path.join(directory, "PROMPT.md"), prompt);
  writeFileSync(path.join(directory, "GUIDE.md"), guide);
  writeFileSync(path.join(directory, "RESUME.md"), resume);
  writeFileSync(path.join(directory, "OPPORTUNITY.md"), opportunity);
  writeFileSync(path.join(directory, "PERSON.md"), person);
  writeFileSync(path.join(directory, "OUTPUT-SCHEMA.json"), schema);
  writeFileSync(path.join(directory, "assignment.json"), `${JSON.stringify(assignment, null, 2)}\n`);
  packetIndex.push({ packetId, key: assignment.key, role: assignment.role, name: assignment.name });
}

writeFileSync(path.join(outputRoot, "index.json"), `${JSON.stringify({
  schemaVersion: 1,
  guideSha256: config.guideSha256,
  accessScope: "guide-current-public-resume-and-public-opportunity-context-only",
  packets: packetIndex
}, null, 2)}\n`);

console.log(JSON.stringify({ outputRoot, packets: packetIndex.length }));
