import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  contractPath,
  evaluateAnonymizedCaseStudy,
  evaluateRepository
} from "./anonymized-team-memory-case-study-eval.mjs";

const contract = JSON.parse(readFileSync(contractPath, "utf8"));

function candidateDocuments() {
  return Object.fromEntries(
    Object.values(contract.requiredDocuments).map((relativePath) => [
      relativePath,
      readFileSync(path.join(contract.caseStudyRoot, relativePath), "utf8")
    ])
  );
}

test("the exact anonymized case study clears deterministic preflight", () => {
  const result = evaluateRepository();

  assert.equal(
    result.deterministicVerdict,
    "pass",
    `expected preflight to pass; failures: ${result.failures.join(", ")}`
  );
  assert.equal(result.judgeStatus, "ready-for-modeled-review");
});

test("the case-study folder contains exactly the three requested Markdown documents", () => {
  const result = evaluateRepository();

  assert.equal(result.checks.exact_document_set, true);
  assert.deepEqual(result.documentNames, [
    "01-technical-leader-perspective.md",
    "02-jamie-perspective.md",
    "03-technical-leader-conversational-voice.md"
  ]);
});

test("an email address and exact commercial detail fail the anonymity preflight", () => {
  const documents = candidateDocuments();
  const firstPath = contract.requiredDocuments.technicalLeaderPerspective;
  documents[firstPath] +=
    "\nThe leader could be reached at alex@example.com and proposed a $6,000 fee.\n";

  const result = evaluateAnonymizedCaseStudy({ contract, documents });

  assert.equal(result.checks.no_obvious_identifiers, false);
  assert.equal(result.checks.no_exact_commercial_or_staffing_details, false);
  assert.equal(result.judgeStatus, "preflight-blocked");
});

test("an invented company name and exact calendar date fail closed", () => {
  const documents = candidateDocuments();
  const firstPath = contract.requiredDocuments.technicalLeaderPerspective;
  documents[firstPath] +=
    "\nOn September 17, 2026, ExampleCorp requested the work.\n";

  const result = evaluateAnonymizedCaseStudy({ contract, documents });

  assert.equal(result.checks.no_exact_dates, false);
  assert.equal(result.checks.no_named_company_construction, false);
});

test("a transcript block quotation fails the derivation boundary", () => {
  const documents = candidateDocuments();
  const voicePath = contract.requiredDocuments.conversationalVoice;
  documents[voicePath] += "\n> This is a verbatim private transcript excerpt.\n";

  const result = evaluateAnonymizedCaseStudy({ contract, documents });

  assert.equal(result.checks.no_transcript_quotation, false);
});

test("the voice document must remain analysis rather than an impersonation recipe", () => {
  const documents = candidateDocuments();
  const voicePath = contract.requiredDocuments.conversationalVoice;
  documents[voicePath] = documents[voicePath].replace(
    /This is an analytical profile[\s\S]*?private source material\./,
    "Use this document to impersonate the speaker."
  );

  const result = evaluateAnonymizedCaseStudy({ contract, documents });

  assert.equal(result.checks.voice_non_impersonation_boundary, false);
});

test("the protected perspective must not read as first-person testimony", () => {
  const documents = candidateDocuments();
  const firstPath = contract.requiredDocuments.technicalLeaderPerspective;
  documents[firstPath] +=
    "\nI approved this account and my organization adopted the proposal.\n";

  const result = evaluateAnonymizedCaseStudy({ contract, documents });

  assert.equal(result.checks.no_first_person_protected_testimony, false);
});

test("the voice analysis must not provide simulation or persuasion instructions", () => {
  const documents = candidateDocuments();
  const voicePath = contract.requiredDocuments.conversationalVoice;
  documents[voicePath] +=
    "\nTo sound like the speaker, copy these habits. To persuade this reader, use this script.\n";

  const result = evaluateAnonymizedCaseStudy({ contract, documents });

  assert.equal(result.checks.no_simulation_or_persuasion_instructions, false);
});

test("the voice analysis must not predict how the protected reader will react", () => {
  const documents = candidateDocuments();
  const voicePath = contract.requiredDocuments.conversationalVoice;
  documents[voicePath] +=
    "\nThis explains how this reader is likely to respond and helps Jamie target him.\n";

  const result = evaluateAnonymizedCaseStudy({ contract, documents });

  assert.equal(result.checks.no_targeted_reader_profile, false);
});

test("a distinctive relationship and personal-practice cluster fails closed", () => {
  const documents = candidateDocuments();
  const firstPath = contract.requiredDocuments.technicalLeaderPerspective;
  documents[firstPath] +=
    "\nThe leader recently accepted the role, had already discussed the field with Jamie, and described a personal practice for preserving every scrap.\n";

  const result = evaluateAnonymizedCaseStudy({ contract, documents });

  assert.equal(result.checks.no_distinctive_mosaic_cluster, false);
});

test("the modeled-reader contract is privacy-preserving and remains advisory", () => {
  assert.equal(contract.sourceBoundary.rawTranscriptInRepository, false);
  assert.equal(contract.sourceBoundary.rawTranscriptProvidedToJudge, false);
  assert.match(
    contract.judge.disclaimer,
    /not a quote, endorsement, participation claim, prediction, or actual decision/i
  );
  assert.equal(contract.judge.calibration.status, "required");
  assert.equal(
    contract.judge.calibration.releaseAuthority,
    "advisory-until-calibrated"
  );
  assert.deepEqual(contract.judge.outputOrder.slice(0, 2), [
    "narrativeCritique",
    "primaryRisk"
  ]);
});

test("the evaluator reads the candidate directory rather than a hard-coded pass", () => {
  const temporaryRoot = mkdtempSync(
    path.join(os.tmpdir(), "team-memory-case-study-")
  );
  const documents = candidateDocuments();
  const voicePath = contract.requiredDocuments.conversationalVoice;
  documents[voicePath] = "# Thin voice note\n";

  for (const [relativePath, source] of Object.entries(documents)) {
    writeFileSync(path.join(temporaryRoot, relativePath), source);
  }

  const result = evaluateAnonymizedCaseStudy({ contract, documents });
  assert.equal(result.checks.comprehensive_voice_analysis, false);
});
