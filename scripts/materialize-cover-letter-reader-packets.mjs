import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateCoverLetters } from "./evals-cover-letter-hiring-readers.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const outIndex = process.argv.indexOf("--out-dir");
const outDir = outIndex >= 0 ? path.resolve(process.argv[outIndex + 1] ?? "") : "";
const temporaryRoots = [...new Set([path.resolve(os.tmpdir()), path.resolve("/private/tmp"), path.resolve("/tmp")])];
if (!outDir || outDir.startsWith(root + path.sep) ||
    !temporaryRoots.some((temporaryRoot) => outDir.startsWith(temporaryRoot + path.sep))) {
  throw new Error("--out-dir must be an explicit temporary directory outside the repository");
}

const deterministic = evaluateCoverLetters(root, { deterministicOnly: true });
if (!deterministic.pass) throw new Error(`deterministic gates failed: ${deterministic.failures.join("; ")}`);

const manifest = JSON.parse(readFileSync(path.join(root, "evals/cover-letter-hiring-readers/current.json"), "utf8"));
const resumeManifest = JSON.parse(readFileSync(path.join(root, manifest.sourceResumeManifest), "utf8"));
mkdirSync(outDir, { recursive: true });
const packets = [];
for (const entry of manifest.opportunities) {
  const resumeEntry = resumeManifest.opportunities.find(({ opportunityId }) => opportunityId === entry.opportunityId);
  const packetBase = {
    acceptanceQuestion: manifest.acceptanceQuestion,
    opportunityId: entry.opportunityId,
    jobTitle: entry.jobTitle,
    hiringGoal: resumeEntry.hiringGoal,
    mustHaveEvidence: resumeEntry.mustHaveEvidence,
    biasChecks: resumeEntry.biasChecks,
    opportunityContext: readFileSync(path.join(root, entry.opportunityPath), "utf8"),
    resume: readFileSync(path.join(root, entry.resumePath), "utf8"),
    coverLetter: readFileSync(path.join(root, entry.coverLetterPath), "utf8"),
    exactDigests: {
      opportunitySha256: entry.opportunitySha256,
      resumeSha256: entry.resumeSha256,
      coverLetterSha256: entry.coverLetterSha256,
      voiceContractSha256: manifest.voiceContract.sha256
    },
    accessBoundary: "Use only this public packet. Do not inspect the repository, private sources, or prior reader outputs.",
    outputContract: {
      decision: "pass or fail",
      wouldAdvanceToInterview: "boolean answering the acceptance question literally",
      strengths: "two or more specific observations",
      risks: "zero or more specific concerns",
      interviewEvidenceNeeded: "zero or more concrete follow-up questions",
      rationale: "concise narrative judgment"
    }
  };
  for (const reader of entry.namedReaders) {
    const file = `${entry.opportunityId.replace(/[^a-z0-9]+/gi, "-")}-${reader.personId.replace(/^person\./, "").replace(/[^a-z0-9]+/gi, "-")}.json`;
    const packet = {
      ...packetBase,
      reader: {
        ...reader,
        simulatedPublicFigureLens: true,
        nonEndorsementBoundary: "Fictionalized public-context analytical lens, not participation, quotation, endorsement, or a real hiring decision by the named person."
      }
    };
    writeFileSync(path.join(outDir, file), `${JSON.stringify(packet, null, 2)}\n`, "utf8");
    packets.push(file);
  }
}
writeFileSync(path.join(outDir, "index.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), packets }, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ pass: true, outDir, packets: packets.length }));
